import Common "common";

module {
  public type TopicId = Nat;
  public type ReplyId = Nat;
  public type CategoryId = Nat;

  public type ForumCategory = {
    id : CategoryId;
    name : Text;
    nameSwahili : Text;
    description : Text;
    descriptionSwahili : Text;
    icon : Text;
    var postCount : Nat;
  };

  public type ForumTopic = {
    id : TopicId;
    categoryId : CategoryId;
    title : Text;
    body : Text;
    authorId : Common.UserId;
    authorName : Text;
    authorRole : Common.UserRole;
    createdAt : Common.Timestamp;
    var updatedAt : Common.Timestamp;
    var replyCount : Nat;
    var viewCount : Nat;
    var isResolved : Bool;
    tags : [Text];
    language : Common.Language;
  };

  public type ForumReply = {
    id : ReplyId;
    topicId : TopicId;
    body : Text;
    authorId : Common.UserId;
    authorName : Text;
    authorRole : Common.UserRole;
    createdAt : Common.Timestamp;
    var isAccepted : Bool;
    var upvoteCount : Nat;
  };

  // Public API types (shared — no var fields)
  public type ForumCategoryPublic = {
    id : CategoryId;
    name : Text;
    nameSwahili : Text;
    description : Text;
    descriptionSwahili : Text;
    icon : Text;
    postCount : Nat;
  };

  public type ForumTopicPublic = {
    id : TopicId;
    categoryId : CategoryId;
    title : Text;
    body : Text;
    authorId : Common.UserId;
    authorName : Text;
    authorRole : Common.UserRole;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
    replyCount : Nat;
    viewCount : Nat;
    isResolved : Bool;
    tags : [Text];
    language : Common.Language;
  };

  public type ForumReplyPublic = {
    id : ReplyId;
    topicId : TopicId;
    body : Text;
    authorId : Common.UserId;
    authorName : Text;
    authorRole : Common.UserRole;
    createdAt : Common.Timestamp;
    isAccepted : Bool;
    upvoteCount : Nat;
  };

  public type ForumTopicSummary = {
    id : TopicId;
    categoryId : CategoryId;
    title : Text;
    authorName : Text;
    authorRole : Common.UserRole;
    createdAt : Common.Timestamp;
    replyCount : Nat;
    viewCount : Nat;
    isResolved : Bool;
  };
}
