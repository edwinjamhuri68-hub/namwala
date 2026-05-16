import List "mo:core/List";
import Time "mo:core/Time";
import MessagingLib "../lib/messaging";
import MsgTypes "../types/messaging";
import Common "../types/common";

mixin (
  conversations : List.List<MsgTypes.Conversation>,
  messages : List.List<MsgTypes.Message>,
  nextConvId : Nat,
  nextMsgId : Nat
) {
  public shared ({ caller }) func startConversation(
    recipientId : Common.UserId,
    subject : ?Text,
    firstMessage : Text
  ) : async MsgTypes.ConversationPublic {
    let convId = conversations.size();
    let conv = MessagingLib.getOrCreateConversation(
      conversations, convId, caller, recipientId, subject
    );
    let msgId = messages.size();
    ignore MessagingLib.sendMessage(
      messages, conversations, msgId, conv.id, caller, firstMessage, null
    );
    { conv with lastMessageAt = conv.lastMessageAt; lastMessagePreview = conv.lastMessagePreview };
  };

  public query ({ caller }) func getMyConversations() : async [MsgTypes.ConversationPublic] {
    MessagingLib.getConversationsForUser(conversations, caller);
  };

  public shared ({ caller }) func sendMessage(
    conversationId : Common.ConversationId,
    content : Text,
    imageUrl : ?Text
  ) : async MsgTypes.MessagePublic {
    let msgId = messages.size();
    MessagingLib.sendMessage(
      messages, conversations, msgId, conversationId, caller, content, imageUrl
    );
  };

  public query ({ caller }) func getMessages(
    conversationId : Common.ConversationId
  ) : async [MsgTypes.MessagePublic] {
    MessagingLib.getMessages(messages, conversationId, caller);
  };

  public shared ({ caller }) func markMessagesRead(
    conversationId : Common.ConversationId
  ) : async Nat {
    MessagingLib.markMessagesRead(messages, conversationId, caller);
  };

  public query ({ caller }) func getUnreadMessageCount() : async Nat {
    MessagingLib.getUnreadCount(messages, caller);
  };
}
