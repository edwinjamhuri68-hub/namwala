import List "mo:core/List";
import Principal "mo:core/Principal";
import Common "../types/common";
import FTypes "../types/forum";
import RTypes "../types/reputation";
import UTypes "../types/users";
import NTypes "../types/notifications";import Array "mo:core/Array";

module {
  // Badge thresholds and labels (EN / SW)
  let BADGE_HELPFUL_EN = "Helpful Expert";
  let BADGE_HELPFUL_SW = "Mtaalamu Msaada";
  let BADGE_TRUSTED_EN = "Trusted Advisor";
  let BADGE_TRUSTED_SW = "Mshauri wa Kuaminiwa";
  let BADGE_LEADER_EN = "Community Leader";
  let BADGE_LEADER_SW = "Kiongozi wa Jamii";

  // Compute badges array from score
  func computeBadges(score : Nat) : [Text] {
    if (score >= 50) {
      [BADGE_HELPFUL_EN, BADGE_HELPFUL_SW, BADGE_TRUSTED_EN, BADGE_TRUSTED_SW, BADGE_LEADER_EN, BADGE_LEADER_SW];
    } else if (score >= 20) {
      [BADGE_HELPFUL_EN, BADGE_HELPFUL_SW, BADGE_TRUSTED_EN, BADGE_TRUSTED_SW];
    } else if (score >= 5) {
      [BADGE_HELPFUL_EN, BADGE_HELPFUL_SW];
    } else {
      [];
    };
  };

  // Compute earnedBadgesWithDates: estimate earnedAt as the timestamp of the Nth upvote
  // (5th for Helpful Expert, 20th for Trusted Advisor, 50th for Community Leader)
  func computeEarnedBadgesWithDates(
    userId : Principal,
    replies : List.List<FTypes.ForumReply>,
    upvotes : List.List<RTypes.ReputationUpvote>
  ) : [(Text, Int)] {
    // Collect timestamps of all upvotes received by this user's replies, sorted ascending
    let timestamps = List.empty<Int>();
    for (r in replies.values()) {
      if (Principal.equal(r.authorId, userId)) {
        for (uv in upvotes.values()) {
          if (uv.replyId == r.id) {
            timestamps.add(uv.createdAt);
          };
        };
      };
    };
    let sorted = timestamps.sort(func(a, b) {
      if (a < b) #less else if (a > b) #greater else #equal
    });
    let arr = sorted.toArray();
    let total = arr.size();
    let result = List.empty<(Text, Int)>();
    // Helpful Expert: 5th upvote
    if (total >= 5) {
      result.add((BADGE_HELPFUL_EN, arr[4]));
      result.add((BADGE_HELPFUL_SW, arr[4]));
    };
    // Trusted Advisor: 20th upvote
    if (total >= 20) {
      result.add((BADGE_TRUSTED_EN, arr[19]));
      result.add((BADGE_TRUSTED_SW, arr[19]));
    };
    // Community Leader: 50th upvote
    if (total >= 50) {
      result.add((BADGE_LEADER_EN, arr[49]));
      result.add((BADGE_LEADER_SW, arr[49]));
    };
    result.toArray();
  };

  // Count upvotes received by a user within the past N days
  public func countUpvotesInPastDays(
    userId : Principal,
    days : Nat,
    replies : List.List<FTypes.ForumReply>,
    upvotes : List.List<RTypes.ReputationUpvote>,
    now : Int
  ) : Nat {
    let cutoff : Int = now - days.toInt() * 86_400_000_000_000;
    var count : Nat = 0;
    for (r in replies.values()) {
      if (Principal.equal(r.authorId, userId)) {
        for (uv in upvotes.values()) {
          if (uv.replyId == r.id and uv.createdAt >= cutoff) {
            count += 1;
          };
        };
      };
    };
    count;
  };

  // Count upvotes received by a user across all replies
  func countReceivedUpvotes(
    userId : Principal,
    replies : List.List<FTypes.ForumReply>,
    upvotes : List.List<RTypes.ReputationUpvote>
  ) : Nat {
    // Collect reply IDs authored by userId
    var score : Nat = 0;
    for (r in replies.values()) {
      if (Principal.equal(r.authorId, userId)) {
        // Count upvotes for this reply
        for (uv in upvotes.values()) {
          if (uv.replyId == r.id) {
            score += 1;
          };
        };
      };
    };
    score;
  };

  // Idempotent upvote: adds an upvote record if not already present.
  // Increments the reply's upvoteCount.
  // Returns false if the upvote already existed (idempotent), true if newly added.
  public func upvoteReply(
    voterId : Principal,
    replyId : Nat,
    replies : List.List<FTypes.ForumReply>,
    upvotes : List.List<RTypes.ReputationUpvote>,
    notifications : List.List<NTypes.Notification>,
    notifState : { var nextNotifId : Nat },
    now : Common.Timestamp
  ) : Bool {
    // Check idempotency
    let alreadyVoted = upvotes.find(func(uv) {
      uv.replyId == replyId and Principal.equal(uv.voterId, voterId)
    });
    switch (alreadyVoted) {
      case (?_) { false }; // already voted
      case null {
        // Find reply author before mutating
        let replyAuthor : ?Principal = switch (replies.find(func(r) { r.id == replyId })) {
          case null null;
          case (?r) ?r.authorId;
        };
        // Verify reply exists and increment upvoteCount
        var found = false;
        for (r in replies.values()) {
          if (r.id == replyId) {
            r.upvoteCount += 1;
            found := true;
          };
        };
        if (not found) { return false };
        upvotes.add({ replyId; voterId; createdAt = now });
        // Badge notification check after upvote recorded
        switch (replyAuthor) {
          case null {};
          case (?authorId) {
            let newScore = countReceivedUpvotes(authorId, replies, upvotes);
            // Check each threshold: use relatedId 1/2/3 as a stable badge level key
            let badgeChecks : [(Nat, Nat, Text, Text)] = [
              (5,  1, "Badge Earned: Helpful Expert",   "You have earned the Helpful Expert badge for receiving 5 upvotes!"),
              (20, 2, "Badge Earned: Trusted Advisor",  "You have earned the Trusted Advisor badge for receiving 20 upvotes!"),
              (50, 3, "Badge Earned: Community Leader", "You have earned the Community Leader badge for receiving 50 upvotes!")
            ];
            for ((threshold, badgeLevel, title, body) in badgeChecks.values()) {
              if (newScore == threshold) {
                // Only notify if not already sent (idempotent: check by type + recipient + relatedId)
                let alreadyNotified = notifications.find(func(n) {
                  n.notificationType == #badge_earned
                  and Principal.equal(n.recipientId, authorId)
                  and n.relatedId == ?badgeLevel
                });
                if (alreadyNotified.isNull()) {
                  let notif : NTypes.Notification = {
                    id = notifState.nextNotifId;
                    recipientId = authorId;
                    notificationType = #badge_earned;
                    title;
                    body;
                    priority = #normal;
                    relatedId = ?badgeLevel;
                    var isRead = false;
                    createdAt = now;
                  };
                  notifications.add(notif);
                  notifState.nextNotifId += 1;
                };
              };
            };
          };
        };
        true;
      };
    };
  };

  // Count upvotes for a specific reply
  public func getReplyUpvoteCount(
    replyId : Nat,
    upvotes : List.List<RTypes.ReputationUpvote>
  ) : Nat {
    var count : Nat = 0;
    for (uv in upvotes.values()) {
      if (uv.replyId == replyId) { count += 1 };
    };
    count;
  };

  // Check if a specific voter has upvoted a reply
  public func hasUserUpvotedReply(
    voterId : Principal,
    replyId : Nat,
    upvotes : List.List<RTypes.ReputationUpvote>
  ) : Bool {
    switch (upvotes.find(func(uv) {
      uv.replyId == replyId and Principal.equal(uv.voterId, voterId)
    })) {
      case (?_) true;
      case null false;
    };
  };

  // Build UserReputation for a single user
  public func getUserReputation(
    userId : Principal,
    users : List.List<UTypes.UserProfile>,
    upvotes : List.List<RTypes.ReputationUpvote>,
    replies : List.List<FTypes.ForumReply>
  ) : ?RTypes.UserReputation {
    switch (users.find(func(u) { Principal.equal(u.id, userId) })) {
      case null null;
      case (?user) {
        let score = countReceivedUpvotes(userId, replies, upvotes);
        ?{
          userId;
          userName = user.name;
          userRole = user.role;
          region = user.location.region;
          reputationScore = score;
          badges = computeBadges(score);
          earnedBadgesWithDates = computeEarnedBadgesWithDates(userId, replies, upvotes);
        };
      };
    };
  };

  // Build leaderboard: top 20 users by reputation, optionally filtered by region and role
  // Build leaderboard: top 20 users by reputation, optionally filtered by region and role
  public func getLeaderboard(
    region : Text,
    roleFilter : ?Text,
    users : List.List<UTypes.UserProfile>,
    upvotes : List.List<RTypes.ReputationUpvote>,
    replies : List.List<FTypes.ForumReply>
  ) : [RTypes.UserReputation] {
    let buf = List.empty<RTypes.UserReputation>();
    for (user in users.values()) {
      // Region filter (empty string = all regions)
      let regionMatch = region.size() == 0 or user.location.region == region;
      // Role filter
      let roleMatch = switch (roleFilter) {
        case null true;
        case (?rf) {
          if (rf == "specialists") {
            switch (user.role) {
              case (#agri_specialist or #veterinarian or #weather_soil_specialist or #market_advisor) true;
              case (_) false;
            };
          } else if (rf == "farmers") {
            switch (user.role) {
              case (#farmer or #livestock_keeper) true;
              case (_) false;
            };
          } else {
            roleToText(user.role) == rf;
          };
        };
      };
      if (regionMatch and roleMatch) {
        let score = countReceivedUpvotes(user.id, replies, upvotes);
        buf.add({
          userId = user.id;
          userName = user.name;
          userRole = user.role;
          region = user.location.region;
          reputationScore = score;
          badges = computeBadges(score);
          earnedBadgesWithDates = computeEarnedBadgesWithDates(user.id, replies, upvotes);
        });
      };
    };
    // Sort descending by score, take top 20
    let sorted = buf.sort(func(a, b) {
      if (a.reputationScore > b.reputationScore) { #less }
      else if (a.reputationScore < b.reputationScore) { #greater }
      else { #equal };
    });
    let result = List.empty<RTypes.UserReputation>();
    var i = 0;
    for (rep in sorted.values()) {
      if (i < 20) {
        result.add(rep);
        i += 1;
      };
    };
    result.toArray();
  };

  // Return the top contributor of the current week (last 7 days)
  public func getTopContributorOfWeek(
    users : List.List<UTypes.UserProfile>,
    upvotes : List.List<RTypes.ReputationUpvote>,
    replies : List.List<FTypes.ForumReply>,
    now : Int
  ) : ?RTypes.UserReputation {
    let cutoff : Int = now - 7 * 86_400_000_000_000;
    var topUserId : ?Principal = null;
    var topCount : Nat = 0;
    for (user in users.values()) {
      var weekCount : Nat = 0;
      for (r in replies.values()) {
        if (Principal.equal(r.authorId, user.id)) {
          for (uv in upvotes.values()) {
            if (uv.replyId == r.id and uv.createdAt >= cutoff) {
              weekCount += 1;
            };
          };
        };
      };
      if (weekCount > topCount) {
        topCount := weekCount;
        topUserId := ?user.id;
      };
    };
    if (topCount == 0) { return null };
    switch (topUserId) {
      case null null;
      case (?uid) getUserReputation(uid, users, upvotes, replies);
    };
  };

  // Build a ForumReplyWithUpvotes for a given reply
  public func getForumReplyWithUpvotes(
    replyId : Nat,
    caller : Principal,
    replies : List.List<FTypes.ForumReply>,
    upvotes : List.List<RTypes.ReputationUpvote>
  ) : ?RTypes.ForumReplyWithUpvotes {
    switch (replies.find(func(r) { r.id == replyId })) {
      case null null;
      case (?r) {
        let upvoteCount = getReplyUpvoteCount(replyId, upvotes);
        let hasVoted = hasUserUpvotedReply(caller, replyId, upvotes);
        ?{
          id = r.id;
          topicId = r.topicId;
          body = r.body;
          authorId = r.authorId;
          authorName = r.authorName;
          authorRole = r.authorRole;
          createdAt = r.createdAt;
          isAccepted = r.isAccepted;
          upvoteCount;
          hasVoted;
        };
      };
    };
  };

  // Helper: compute average rating for a user from ratings list
  func computeAverageRating(
    userId : Principal,
    ratings : List.List<UTypes.RatingRecord>
  ) : (Float, Nat) {
    var total : Nat = 0;
    var count : Nat = 0;
    for (r in ratings.values()) {
      if (Principal.equal(r.toUserId, userId)) {
        total += r.rating;
        count += 1;
      };
    };
    if (count == 0) { (0.0, 0) }
    else { (total.toFloat() / count.toFloat(), count) };
  };

  // Return top 5 emergency contacts per emergency type (Vet, Specialist, Transport)
  // Falls back to national top 5 if fewer than 5 in the requested region
  public func getEmergencyContacts(
    region : Text,
    users : List.List<UTypes.UserProfile>,
    ratings : List.List<UTypes.RatingRecord>
  ) : [RTypes.EmergencyContact] {
    let emergencyRoles : [Common.UserRole] = [
      #veterinarian,
      #agri_specialist,
      #transport_provider
    ];
    let result = List.empty<RTypes.EmergencyContact>();
    for (targetRole in emergencyRoles.values()) {
      // Collect matching users in region first
      let inRegion = List.empty<RTypes.EmergencyContact>();
      for (u in users.values()) {
        if (u.role == targetRole and u.location.region == region) {
          let (avg, cnt) = computeAverageRating(u.id, ratings);
          inRegion.add({
            userId = u.id;
            userName = u.name;
            userRole = roleToText(u.role);
            region = u.location.region;
            averageRating = avg;
            reviewCount = cnt;
            phone = if (u.phone.size() > 0) ?u.phone else null;
          });
        };
      };
      // Sort descending by averageRating
      let sortedRegion = inRegion.sort(func(a, b) {
        if (a.averageRating > b.averageRating) #less
        else if (a.averageRating < b.averageRating) #greater
        else #equal
      });
      let regionArr = sortedRegion.toArray();
      if (regionArr.size() >= 5) {
        var i = 0;
        for (ec in regionArr.values()) {
          if (i < 5) { result.add(ec); i += 1; };
        };
      } else {
        // Fallback: national top 5 for this role
        let national = List.empty<RTypes.EmergencyContact>();
        for (u in users.values()) {
          if (u.role == targetRole) {
            let (avg, cnt) = computeAverageRating(u.id, ratings);
            national.add({
              userId = u.id;
              userName = u.name;
              userRole = roleToText(u.role);
              region = u.location.region;
              averageRating = avg;
              reviewCount = cnt;
              phone = if (u.phone.size() > 0) ?u.phone else null;
            });
          };
        };
        let sortedNational = national.sort(func(a, b) {
          if (a.averageRating > b.averageRating) #less
          else if (a.averageRating < b.averageRating) #greater
          else #equal
        });
        let natArr = sortedNational.toArray();
        var i = 0;
        for (ec in natArr.values()) {
          if (i < 5) { result.add(ec); i += 1; };
        };
      };
    };
    result.toArray();
  };

  // Detect week boundary (Sunday 00:00 UTC) using seconds since epoch.
  // Returns updated (weeklyActivities, weekStart).
  // If a new week has started, resets all scores to 0 and updates weekStart.
  public func recordWeeklyActivity(
    userId : Principal,
    weeklyActivities : [(Principal, Nat)],
    weekStart : Nat,
    now : Nat
  ) : ([(Principal, Nat)], Nat) {
    // Seconds per week = 604800
    let currentWeek : Nat = now / 604800;
    let storedWeek : Nat = if (weekStart == 0) currentWeek else weekStart / 604800;
    // If week has rolled over, reset all scores and update weekStart
    let (activities, newWeekStart) : ([(Principal, Nat)], Nat) =
      if (currentWeek > storedWeek) {
        ([], now)
      } else {
        (weeklyActivities, weekStart)
      };
    // Increment activity count for userId
    var found = false;
    let updated = activities.map(func((uid, cnt)) {
      if (Principal.equal(uid, userId)) {
        found := true;
        (uid, cnt + 1);
      } else {
        (uid, cnt);
      };
    });
    if (found) {
      (updated, newWeekStart);
    } else {
      let appended = Array.tabulate(
        updated.size() + 1,
        func(i) {
          if (i < updated.size()) updated[i]
          else (userId, 1)
        }
      );
      (appended, newWeekStart);
    };
  };

  // Weekly leaderboard: top 20 users by weeklyScore in the given region
  public func getWeeklyLeaderboard(
    region : Text,
    users : List.List<UTypes.UserProfile>,
    weeklyActivities : [(Principal, Nat)]
  ) : [RTypes.WeeklyLeaderboardEntry] {
    let buf = List.empty<RTypes.WeeklyLeaderboardEntry>();
    for (u in users.values()) {
      let regionMatch = region.size() == 0 or u.location.region == region;
      if (regionMatch) {
        // Look up weekly score
        var score : Nat = 0;
        for ((uid, cnt) in weeklyActivities.vals()) {
          if (Principal.equal(uid, u.id)) { score := cnt; };
        };
        buf.add({
          userId = u.id;
          userName = u.name;
          userRole = roleToText(u.role);
          region = u.location.region;
          weeklyScore = score;
          badges = computeBadges(score);
        });
      };
    };
    let sorted = buf.sort(func(a, b) {
      if (a.weeklyScore > b.weeklyScore) #less
      else if (a.weeklyScore < b.weeklyScore) #greater
      else #equal
    });
    let result = List.empty<RTypes.WeeklyLeaderboardEntry>();
    var i = 0;
    for (entry in sorted.values()) {
      if (i < 20) { result.add(entry); i += 1; };
    };
    result.toArray();
  };

  // Helper: convert UserRole to text for filtering
  func roleToText(role : Common.UserRole) : Text {
    switch (role) {
      case (#farmer) "farmer";
      case (#livestock_keeper) "livestock_keeper";
      case (#agri_specialist) "agri_specialist";
      case (#veterinarian) "veterinarian";
      case (#input_seller) "input_seller";
      case (#input_service_provider) "input_service_provider";
      case (#weather_soil_specialist) "weather_soil_specialist";
      case (#market_advisor) "market_advisor";
      case (#transport_provider) "transport_provider";
      case (#buyer) "buyer";
    };
  };
}
