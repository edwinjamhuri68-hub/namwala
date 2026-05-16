import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import ReputationLib "../lib/reputation";
import RTypes "../types/reputation";
import FTypes "../types/forum";
import UTypes "../types/users";
import NTypes "../types/notifications";

mixin (
  reputationUpvotes : List.List<RTypes.ReputationUpvote>,
  forumReplies : List.List<FTypes.ForumReply>,
  users : List.List<UTypes.UserProfile>,
  notifications : List.List<NTypes.Notification>,
  notifState : { var nextNotifId : Nat },
  ratings : List.List<UTypes.RatingRecord>,
  weeklyState : { var weeklyActivities : [(Principal, Nat)]; var weekStart : Nat }
) {
  // Idempotent upvote on a forum reply
  public shared ({ caller }) func upvoteReply(
    replyId : Nat
  ) : async Bool {
    ReputationLib.upvoteReply(caller, replyId, forumReplies, reputationUpvotes, notifications, notifState, Time.now());
  };

  // Get total upvote count for a reply
  public query func getReplyUpvoteCount(
    replyId : Nat
  ) : async Nat {
    ReputationLib.getReplyUpvoteCount(replyId, reputationUpvotes);
  };

  // Check if the caller has already upvoted a reply
  public query ({ caller }) func hasUserUpvotedReply(
    replyId : Nat
  ) : async Bool {
    ReputationLib.hasUserUpvotedReply(caller, replyId, reputationUpvotes);
  };

  // Get reputation info for any user by Principal
  public query func getUserReputation(
    userId : Principal
  ) : async ?RTypes.UserReputation {
    ReputationLib.getUserReputation(userId, users, reputationUpvotes, forumReplies);
  };

  // Get leaderboard filtered by region and optionally role
  public query func getLeaderboard(
    region : Text,
    roleFilter : ?Text
  ) : async [RTypes.UserReputation] {
    ReputationLib.getLeaderboard(region, roleFilter, users, reputationUpvotes, forumReplies);
  };

  // Get the top contributor of the past 7 days
  public query func getTopContributorOfWeek() : async ?RTypes.UserReputation {
    ReputationLib.getTopContributorOfWeek(users, reputationUpvotes, forumReplies, Time.now());
  };

  // Get a reply with upvote count and hasVoted for caller
  public query ({ caller }) func getForumReplyWithUpvotes(
    replyId : Nat
  ) : async ?RTypes.ForumReplyWithUpvotes {
    ReputationLib.getForumReplyWithUpvotes(replyId, caller, forumReplies, reputationUpvotes);
  };

  // Get emergency contacts (vets, specialists, transport) sorted by rating for a region
  public query func getEmergencyContacts(
    region : Text
  ) : async [RTypes.EmergencyContact] {
    ReputationLib.getEmergencyContacts(region, users, ratings);
  };

  // Get weekly leaderboard for a region
  public query func getWeeklyLeaderboard(
    region : Text
  ) : async [RTypes.WeeklyLeaderboardEntry] {
    ReputationLib.getWeeklyLeaderboard(region, users, weeklyState.weeklyActivities);
  };
}
