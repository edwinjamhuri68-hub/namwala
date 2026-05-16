import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/messaging";
import Common "../types/common";

module {
  // Conversations
  public func getOrCreateConversation(
    conversations : List.List<Types.Conversation>,
    nextId : Common.ConversationId,
    participantA : Common.UserId,
    participantB : Common.UserId,
    subject : ?Text
  ) : Types.Conversation {
    // Return existing conversation between these two participants if any
    let existing = conversations.find(func(c) {
      let members = c.participants;
      members.size() == 2 and
      ((members[0] == participantA and members[1] == participantB) or
       (members[0] == participantB and members[1] == participantA))
    });
    switch (existing) {
      case (?conv) conv;
      case null {
        let now = Time.now();
        let conv : Types.Conversation = {
          id = nextId;
          participants = [participantA, participantB];
          subject;
          createdAt = now;
          var lastMessageAt = now;
          var lastMessagePreview = "";
        };
        conversations.add(conv);
        conv;
      };
    };
  };

  public func getConversationsForUser(
    conversations : List.List<Types.Conversation>,
    userId : Common.UserId
  ) : [Types.ConversationPublic] {
    conversations
      .filter(func(c) {
        var found = false;
        for (p in c.participants.values()) {
          if (p == userId) found := true;
        };
        found;
      })
      .map<Types.Conversation, Types.ConversationPublic>(func(c) {
        { c with lastMessageAt = c.lastMessageAt; lastMessagePreview = c.lastMessagePreview };
      })
      .toArray();
  };

  // Messages
  public func sendMessage(
    messages : List.List<Types.Message>,
    conversations : List.List<Types.Conversation>,
    nextId : Common.MessageId,
    conversationId : Common.ConversationId,
    senderId : Common.UserId,
    content : Text,
    imageUrl : ?Text
  ) : Types.MessagePublic {
    let now = Time.now();
    let msg : Types.Message = {
      id = nextId;
      conversationId;
      senderId;
      content;
      imageUrl;
      var isRead = false;
      sentAt = now;
    };
    messages.add(msg);
    // Update conversation preview
    switch (conversations.find(func(c) { c.id == conversationId })) {
      case (?conv) {
        conv.lastMessageAt := now;
        conv.lastMessagePreview := if (content.size() > 60) {
          var preview = "";
          var i = 0;
          for (ch in content.toIter()) {
            if (i < 60) { preview := preview # Text.fromChar(ch) };
            i += 1;
          };
          preview # "..."
        } else content;
      };
      case null {};
    };
    { msg with isRead = msg.isRead };
  };

  public func getMessages(
    messages : List.List<Types.Message>,
    conversationId : Common.ConversationId,
    _callerId : Common.UserId
  ) : [Types.MessagePublic] {
    messages
      .filter(func(m) { m.conversationId == conversationId })
      .map<Types.Message, Types.MessagePublic>(func(m) {
        { m with isRead = m.isRead };
      })
      .toArray();
  };

  public func markMessagesRead(
    messages : List.List<Types.Message>,
    conversationId : Common.ConversationId,
    userId : Common.UserId
  ) : Nat {
    var count = 0;
    messages.mapInPlace(func(m) {
      if (m.conversationId == conversationId and m.senderId != userId and not m.isRead) {
        m.isRead := true;
        count += 1;
        m;
      } else m;
    });
    count;
  };

  public func getUnreadCount(
    messages : List.List<Types.Message>,
    userId : Common.UserId
  ) : Nat {
    var count = 0;
    messages.forEach(func(m) {
      if (m.senderId != userId and not m.isRead) count += 1;
    });
    count;
  };
}
