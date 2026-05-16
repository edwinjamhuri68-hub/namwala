import Common "common";

module {
  public type Message = {
    id : Common.MessageId;
    conversationId : Common.ConversationId;
    senderId : Common.UserId;
    content : Text;
    imageUrl : ?Text;
    var isRead : Bool;
    sentAt : Common.Timestamp;
  };

  public type Conversation = {
    id : Common.ConversationId;
    participants : [Common.UserId];
    subject : ?Text;
    createdAt : Common.Timestamp;
    var lastMessageAt : Common.Timestamp;
    var lastMessagePreview : Text;
  };

  // Public API types
  public type MessagePublic = {
    id : Common.MessageId;
    conversationId : Common.ConversationId;
    senderId : Common.UserId;
    content : Text;
    imageUrl : ?Text;
    isRead : Bool;
    sentAt : Common.Timestamp;
  };

  public type ConversationPublic = {
    id : Common.ConversationId;
    participants : [Common.UserId];
    subject : ?Text;
    createdAt : Common.Timestamp;
    lastMessageAt : Common.Timestamp;
    lastMessagePreview : Text;
  };
}
