import Iter "mo:core/Iter";
import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Types "../types/forum";
import Common "../types/common";

module {
  let defaultCategories : [(Types.CategoryId, Text, Text, Text, Text, Text)] = [
    (0, "Crops", "Mazao", "Discuss crop farming, planting tips, and harvesting techniques", "Jadili kilimo cha mazao, vidokezo vya upandaji na mbinu za uvunaji", "\u{1F33D}"),
    (1, "Livestock", "Mifugo", "Share experiences about cattle, goats, poultry, and other animals", "Shiriki uzoefu kuhusu ng'ombe, mbuzi, kuku na wanyama wengine", "\u{1F404}"),
    (2, "Marketplace", "Soko", "Buying, selling, pricing, and trading discussions", "Majadiliano ya ununuzi, uuzaji, bei na biashara", "\u{1F6D2}"),
    (3, "Weather & Climate", "Hali ya Hewa", "Weather updates, seasonal patterns, and climate impacts on farming", "Habari za hali ya hewa, misimu na athari za hali ya hewa kwa kilimo", "\u{1F326}"),
    (4, "Pest & Disease", "Wadudu na Magonjwa", "Identify and manage pests, crop diseases, and animal illnesses", "Tambua na dhibiti wadudu, magonjwa ya mazao na mifugo", "\u{1F41B}"),
    (5, "General Discussion", "Mazungumzo ya Jumla", "Any farming topic not covered above \u{2014} share freely", "Mada yoyote ya kilimo ambayo haijashughulikiwa hapo juu", "\u{1F4AC}")
  ];

  public func seedDefaultCategories(categories : Map.Map<Types.CategoryId, Types.ForumCategory>) : () {
    if (categories.size() > 0) { return };
    for ((id, name, nameSwahili, desc, descSwahili, icon) in defaultCategories.values()) {
      categories.add(id, {
        id;
        name;
        nameSwahili;
        description = desc;
        descriptionSwahili = descSwahili;
        icon;
        var postCount = 0;
      });
    };
  };

  public func getCategories(_categories : Map.Map<Types.CategoryId, Types.ForumCategory>) : [Types.ForumCategoryPublic] {
    let buf = List.empty<Types.ForumCategoryPublic>();
    for ((_, cat) in _categories.entries()) {
      buf.add({
        id = cat.id;
        name = cat.name;
        nameSwahili = cat.nameSwahili;
        description = cat.description;
        descriptionSwahili = cat.descriptionSwahili;
        icon = cat.icon;
        postCount = cat.postCount;
      });
    };
    buf.toArray();
  };

  public func createTopic(
    _topics : List.List<Types.ForumTopic>,
    _categories : Map.Map<Types.CategoryId, Types.ForumCategory>,
    _state : { var nextTopicId : Nat; var nextReplyId : Nat },
    _caller : Common.UserId,
    _callerName : Text,
    _callerRole : Common.UserRole,
    _categoryId : Types.CategoryId,
    _title : Text,
    _body : Text,
    _tags : [Text],
    _language : Common.Language,
    _now : Common.Timestamp
  ) : { #ok : Text; #err : Text } {
    if (_title.size() == 0) { return #err("Title cannot be empty") };
    if (_body.size() == 0) { return #err("Body cannot be empty") };
    switch (_categories.get(_categoryId)) {
      case null { #err("Category not found") };
      case (?cat) {
        let id = _state.nextTopicId;
        _state.nextTopicId += 1;
        _topics.add({
          id;
          categoryId = _categoryId;
          title = _title;
          body = _body;
          authorId = _caller;
          authorName = _callerName;
          authorRole = _callerRole;
          createdAt = _now;
          var updatedAt = _now;
          var replyCount = 0;
          var viewCount = 0;
          var isResolved = false;
          tags = _tags;
          language = _language;
        });
        cat.postCount += 1;
        #ok("Topic created");
      };
    };
  };

  public func replyToTopic(
    _replies : List.List<Types.ForumReply>,
    _topics : List.List<Types.ForumTopic>,
    _state : { var nextTopicId : Nat; var nextReplyId : Nat },
    _caller : Common.UserId,
    _callerName : Text,
    _callerRole : Common.UserRole,
    _topicId : Types.TopicId,
    _body : Text,
    _now : Common.Timestamp
  ) : { #ok : Text; #err : Text } {
    if (_body.size() == 0) { return #err("Reply body cannot be empty") };
    var topicFound : ?Types.ForumTopic = null;
    for (t in _topics.values()) {
      if (t.id == _topicId) { topicFound := ?t };
    };
    switch (topicFound) {
      case null { #err("Topic not found") };
      case (?topic) {
        let id = _state.nextReplyId;
        _state.nextReplyId += 1;
        _replies.add({
          id;
          topicId = _topicId;
          body = _body;
          authorId = _caller;
          authorName = _callerName;
          authorRole = _callerRole;
          createdAt = _now;
          var isAccepted = false;
          var upvoteCount = 0;
        });
        topic.replyCount += 1;
        topic.updatedAt := _now;
        #ok("Reply added");
      };
    };
  };

  public func getTopicsByCategory(_topics : List.List<Types.ForumTopic>, _categoryId : Types.CategoryId) : [Types.ForumTopicSummary] {
    let buf = List.empty<Types.ForumTopicSummary>();
    for (t in _topics.values()) {
      if (t.categoryId == _categoryId) {
        buf.add({
          id = t.id;
          categoryId = t.categoryId;
          title = t.title;
          authorName = t.authorName;
          authorRole = t.authorRole;
          createdAt = t.createdAt;
          replyCount = t.replyCount;
          viewCount = t.viewCount;
          isResolved = t.isResolved;
        });
      };
    };
    buf.toArray();
  };

  public func getTopicById(_topics : List.List<Types.ForumTopic>, _topicId : Types.TopicId) : ?Types.ForumTopicPublic {
    var result : ?Types.ForumTopicPublic = null;
    for (t in _topics.values()) {
      if (t.id == _topicId) {
        t.viewCount += 1;
        result := ?{
          id = t.id;
          categoryId = t.categoryId;
          title = t.title;
          body = t.body;
          authorId = t.authorId;
          authorName = t.authorName;
          authorRole = t.authorRole;
          createdAt = t.createdAt;
          updatedAt = t.updatedAt;
          replyCount = t.replyCount;
          viewCount = t.viewCount;
          isResolved = t.isResolved;
          tags = t.tags;
          language = t.language;
        };
      };
    };
    result;
  };

  public func getRepliesByTopic(_replies : List.List<Types.ForumReply>, _topicId : Types.TopicId) : [Types.ForumReplyPublic] {
    let buf = List.empty<Types.ForumReplyPublic>();
    for (r in _replies.values()) {
      if (r.topicId == _topicId) {
        buf.add({
          id = r.id;
          topicId = r.topicId;
          body = r.body;
          authorId = r.authorId;
          authorName = r.authorName;
          authorRole = r.authorRole;
          createdAt = r.createdAt;
          isAccepted = r.isAccepted;
          upvoteCount = r.upvoteCount;
        });
      };
    };
    buf.toArray();
  };

  public func markTopicResolved(_topics : List.List<Types.ForumTopic>, _topicId : Types.TopicId, _caller : Common.UserId) : { #ok : Text; #err : Text } {
    var found = false;
    var authorized = true;
    for (t in _topics.values()) {
      if (t.id == _topicId) {
        found := true;
        if (not Principal.equal(t.authorId, _caller)) {
          authorized := false;
        } else {
          t.isResolved := true;
        };
      };
    };
    if (not found) { return #err("Topic not found") };
    if (not authorized) { return #err("Only the topic author can mark it as resolved") };
    #ok("Topic marked as resolved");
  };

  public func getRecentTopics(_topics : List.List<Types.ForumTopic>, _limit : Nat) : [Types.ForumTopicSummary] {
    let size = _topics.size();
    let count = if (_limit < size) { _limit } else { size };
    let buf = List.empty<Types.ForumTopicSummary>();
    for (t in _topics.reverseValues()) {
      if (buf.size() >= count) {
        return buf.toArray();
      };
      buf.add({
        id = t.id;
        categoryId = t.categoryId;
        title = t.title;
        authorName = t.authorName;
        authorRole = t.authorRole;
        createdAt = t.createdAt;
        replyCount = t.replyCount;
        viewCount = t.viewCount;
        isResolved = t.isResolved;
      });
    };
    ignore size;
    buf.toArray();
  };
}
