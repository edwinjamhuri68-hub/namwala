import Common "common";

module {
  public type Notification = {
    id : Common.NotificationId;
    recipientId : Common.UserId;
    notificationType : Common.NotificationType;
    title : Text;
    body : Text;
    priority : Common.NotificationPriority;
    relatedId : ?Nat;  // optional ref to related record
    var isRead : Bool;
    createdAt : Common.Timestamp;
  };

  // Public API type
  public type NotificationPublic = {
    id : Common.NotificationId;
    recipientId : Common.UserId;
    notificationType : Common.NotificationType;
    title : Text;
    body : Text;
    priority : Common.NotificationPriority;
    relatedId : ?Nat;
    isRead : Bool;
    createdAt : Common.Timestamp;
  };
}
