import Common "common";

module {
  public type Payment = {
    id : Common.PaymentId;
    payerId : Common.UserId;
    payeeId : Common.UserId;
    orderId : ?Common.OrderId;
    amount : Float;
    currency : Text;
    method : Common.PaymentMethod;
    reference : Text;  // external reference or transaction ID
    var status : Common.PaymentStatus;
    var heldAt : ?Common.Timestamp;
    var releasedAt : ?Common.Timestamp;
    var escrowNote : ?Text;
    createdAt : Common.Timestamp;
    var updatedAt : Common.Timestamp;
  };

  // Public API type
  public type PaymentPublic = {
    id : Common.PaymentId;
    payerId : Common.UserId;
    payeeId : Common.UserId;
    orderId : ?Common.OrderId;
    amount : Float;
    currency : Text;
    method : Common.PaymentMethod;
    reference : Text;
    status : Common.PaymentStatus;
    heldAt : ?Common.Timestamp;
    releasedAt : ?Common.Timestamp;
    escrowNote : ?Text;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };
}
