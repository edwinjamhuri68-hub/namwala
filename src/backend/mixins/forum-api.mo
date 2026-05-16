import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import ForumLib "../lib/forum";
import FTypes "../types/forum";
import Common "../types/common";
import UTypes "../types/users";

mixin (
  forumTopics : List.List<FTypes.ForumTopic>,
  forumReplies : List.List<FTypes.ForumReply>,
  forumCategories : Map.Map<FTypes.CategoryId, FTypes.ForumCategory>,
  forumState : { var nextTopicId : Nat; var nextReplyId : Nat },
  users : List.List<UTypes.UserProfile>
) {
  func resolveCallerInfo(caller : Principal) : (Text, Common.UserRole) {
    var name = caller.toText();
    var role : Common.UserRole = #farmer;
    for (u in users.values()) {
      if (Principal.equal(u.id, caller)) {
        name := u.name;
        role := u.role;
      };
    };
    (name, role);
  };

  public shared ({ caller }) func createTopic(
    categoryId : FTypes.CategoryId,
    title : Text,
    body : Text,
    tags : [Text],
    language : Common.Language
  ) : async { #ok : Text; #err : Text } {
    let (callerName, callerRole) = resolveCallerInfo(caller);
    ForumLib.createTopic(
      forumTopics, forumCategories, forumState,
      caller, callerName, callerRole,
      categoryId, title, body, tags, language,
      Time.now()
    );
  };

  public shared ({ caller }) func replyToTopic(
    topicId : FTypes.TopicId,
    body : Text
  ) : async { #ok : Text; #err : Text } {
    let (callerName, callerRole) = resolveCallerInfo(caller);
    ForumLib.replyToTopic(
      forumReplies, forumTopics, forumState,
      caller, callerName, callerRole,
      topicId, body, Time.now()
    );
  };

  public query func getTopicsByCategory(
    categoryId : FTypes.CategoryId
  ) : async [FTypes.ForumTopicSummary] {
    ForumLib.getTopicsByCategory(forumTopics, categoryId);
  };

  public shared func getTopicById(
    topicId : FTypes.TopicId
  ) : async ?FTypes.ForumTopicPublic {
    ForumLib.getTopicById(forumTopics, topicId);
  };

  public query func getRepliesByTopic(
    topicId : FTypes.TopicId
  ) : async [FTypes.ForumReplyPublic] {
    ForumLib.getRepliesByTopic(forumReplies, topicId);
  };

  public query func getCategories() : async [FTypes.ForumCategoryPublic] {
    ForumLib.getCategories(forumCategories);
  };

  public shared ({ caller }) func markTopicResolved(
    topicId : FTypes.TopicId
  ) : async { #ok : Text; #err : Text } {
    ForumLib.markTopicResolved(forumTopics, topicId, caller);
  };

  public query func getRecentTopics(
    limit : Nat
  ) : async [FTypes.ForumTopicSummary] {
    ForumLib.getRecentTopics(forumTopics, limit);
  };
}
