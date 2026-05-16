import Common "common";

module {
  public type ReputationUpvote = {
    replyId : Nat;
    voterId : Principal;
    createdAt : Common.Timestamp;
  };

  public type UserReputation = {
    userId : Principal;
    userName : Text;
    userRole : Common.UserRole;
    region : Text;
    reputationScore : Nat;
    badges : [Text];
    earnedBadgesWithDates : [(Text, Int)]; // (badgeName, earnedAt timestamp)
  };

  public type ForumReplyWithUpvotes = {
    id : Nat;
    topicId : Nat;
    body : Text;
    authorId : Common.UserId;
    authorName : Text;
    authorRole : Common.UserRole;
    createdAt : Common.Timestamp;
    isAccepted : Bool;
    upvoteCount : Nat;
    hasVoted : Bool;
  };

  public type EmergencyContact = {
    userId : Principal;
    userName : Text;
    userRole : Text;
    region : Text;
    averageRating : Float;
    reviewCount : Nat;
    phone : ?Text;
  };

  public type WeeklyLeaderboardEntry = {
    userId : Principal;
    userName : Text;
    userRole : Text;
    region : Text;
    weeklyScore : Nat;
    badges : [Text];
  };
}
