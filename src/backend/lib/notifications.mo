import List "mo:core/List";
import Types "../types/notifications";
import Common "../types/common";
import Time "mo:core/Time";

module {
  public func create(
    notifications : List.List<Types.Notification>,
    nextId : Common.NotificationId,
    recipientId : Common.UserId,
    notificationType : Common.NotificationType,
    title : Text,
    body : Text,
    priority : Common.NotificationPriority,
    relatedId : ?Nat
  ) : Types.Notification {
    let notif : Types.Notification = {
      id = nextId;
      recipientId;
      notificationType;
      title;
      body;
      priority;
      relatedId;
      var isRead = false;
      createdAt = Time.now();
    };
    notifications.add(notif);
    notif;
  };

  public func getForUser(
    notifications : List.List<Types.Notification>,
    userId : Common.UserId,
    unreadOnly : Bool
  ) : [Types.NotificationPublic] {
    notifications.filter(func(n) {
      n.recipientId == userId and (if (unreadOnly) not n.isRead else true);
    })
    .map<Types.Notification, Types.NotificationPublic>(func(n) {
      {
        id = n.id;
        recipientId = n.recipientId;
        notificationType = n.notificationType;
        title = n.title;
        body = n.body;
        priority = n.priority;
        relatedId = n.relatedId;
        isRead = n.isRead;
        createdAt = n.createdAt;
      };
    })
    .toArray();
  };

  public func markRead(
    notifications : List.List<Types.Notification>,
    notificationId : Common.NotificationId,
    userId : Common.UserId
  ) : Bool {
    let found = notifications.find(func(n) { n.id == notificationId and n.recipientId == userId });
    if (found.isNull()) return false;
    notifications.mapInPlace(func(n) {
      if (n.id != notificationId) return n;
      { n with var isRead = true };
    });
    true;
  };

  public func markAllRead(
    notifications : List.List<Types.Notification>,
    userId : Common.UserId
  ) : Nat {
    var count = 0;
    notifications.mapInPlace(func(n) {
      if (n.recipientId == userId and not n.isRead) {
        count += 1;
        { n with var isRead = true };
      } else n;
    });
    count;
  };

  public func getUnreadCount(
    notifications : List.List<Types.Notification>,
    userId : Common.UserId
  ) : Nat {
    notifications.filter(func(n) { n.recipientId == userId and not n.isRead }).size();
  };
}
