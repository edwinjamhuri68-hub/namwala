import List "mo:core/List";
import NotifLib "../lib/notifications";
import NTypes "../types/notifications";
import Common "../types/common";

mixin (
  notifications : List.List<NTypes.Notification>,
  notifState : { var nextNotifId : Nat }
) {
  // Poll for notifications (frontend uses polling)
  public query ({ caller }) func getMyNotifications(unreadOnly : Bool) : async [NTypes.NotificationPublic] {
    NotifLib.getForUser(notifications, caller, unreadOnly);
  };

  public query ({ caller }) func getUnreadNotificationCount() : async Nat {
    NotifLib.getUnreadCount(notifications, caller);
  };

  public shared ({ caller }) func markNotificationRead(
    notificationId : Common.NotificationId
  ) : async Bool {
    NotifLib.markRead(notifications, notificationId, caller);
  };

  public shared ({ caller }) func markAllNotificationsRead() : async Nat {
    NotifLib.markAllRead(notifications, caller);
  };

  // Internal helper: broadcast a notification (used by other mixins)
  // Not exposed as public — called from within the actor
  func broadcastNotification(
    recipientId : Common.UserId,
    notificationType : Common.NotificationType,
    title : Text,
    body : Text,
    priority : Common.NotificationPriority,
    relatedId : ?Nat
  ) : NTypes.NotificationPublic {
    let id = notifState.nextNotifId;
    let notif = NotifLib.create(notifications, id, recipientId, notificationType, title, body, priority, relatedId);
    notifState.nextNotifId += 1;
    {
      id = notif.id;
      recipientId = notif.recipientId;
      notificationType = notif.notificationType;
      title = notif.title;
      body = notif.body;
      priority = notif.priority;
      relatedId = notif.relatedId;
      isRead = notif.isRead;
      createdAt = notif.createdAt;
    };
  };
}
