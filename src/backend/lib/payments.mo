import List "mo:core/List";
import Types "../types/payments";
import Common "../types/common";
import Time "mo:core/Time";

module {
  // Initiate a simulated payment
  public func initiatePayment(
    payments : List.List<Types.Payment>,
    nextId : Common.PaymentId,
    payerId : Common.UserId,
    payeeId : Common.UserId,
    orderId : ?Common.OrderId,
    amount : Float,
    method : Common.PaymentMethod
  ) : Types.Payment {
    let now = Time.now();
    let payment : Types.Payment = {
      id = nextId;
      payerId;
      payeeId;
      orderId;
      amount;
      currency = "TZS";
      method;
      reference = "PAY-" # nextId.toText();
      var status = #pending;
      var heldAt = null;
      var releasedAt = null;
      var escrowNote = null;
      createdAt = now;
      var updatedAt = now;
    };
    payments.add(payment);
    payment;
  };

  // Initiate an escrow payment — funds held until delivery is confirmed
  public func initiateEscrowPayment(
    payments : List.List<Types.Payment>,
    nextId : Common.PaymentId,
    payerId : Common.UserId,
    payeeId : Common.UserId,
    orderId : ?Common.OrderId,
    amount : Float,
    method : Common.PaymentMethod,
    escrowNote : ?Text
  ) : Types.Payment {
    let now = Time.now();
    let payment : Types.Payment = {
      id = nextId;
      payerId;
      payeeId;
      orderId;
      amount;
      currency = "TZS";
      method;
      reference = "ESC-" # nextId.toText();
      var status = #held;
      var heldAt = ?now;
      var releasedAt = null;
      var escrowNote = escrowNote;
      createdAt = now;
      var updatedAt = now;
    };
    payments.add(payment);
    payment;
  };

  // Simulate payment completion
  public func confirmPayment(
    payments : List.List<Types.Payment>,
    paymentId : Common.PaymentId,
    payerId : Common.UserId
  ) : Bool {
    let found = payments.find(func(p) { p.id == paymentId and p.payerId == payerId and p.status == #pending });
    if (found.isNull()) return false;
    payments.mapInPlace(func(p) {
      if (p.id != paymentId) return p;
      {
        id = p.id; payerId = p.payerId; payeeId = p.payeeId; orderId = p.orderId;
        amount = p.amount; currency = p.currency; method = p.method; reference = p.reference;
        var status = #completed; var heldAt = p.heldAt; var releasedAt = p.releasedAt;
        var escrowNote = p.escrowNote; createdAt = p.createdAt; var updatedAt = Time.now()
      };
    });
    true;
  };

  // Confirm delivery — releases escrow (#held → #completed)
  public func confirmDelivery(
    payments : List.List<Types.Payment>,
    paymentId : Common.PaymentId,
    callerId : Common.UserId
  ) : Bool {
    let found = payments.find(func(p) {
      p.id == paymentId and p.status == #held and
      (p.payerId == callerId or p.payeeId == callerId)
    });
    if (found.isNull()) return false;
    let now = Time.now();
    payments.mapInPlace(func(p) {
      if (p.id != paymentId) return p;
      {
        id = p.id; payerId = p.payerId; payeeId = p.payeeId; orderId = p.orderId;
        amount = p.amount; currency = p.currency; method = p.method; reference = p.reference;
        var status = #completed; var heldAt = p.heldAt; var releasedAt = ?now;
        var escrowNote = p.escrowNote; createdAt = p.createdAt; var updatedAt = now
      };
    });
    true;
  };

  // Auto-release escrow if held for more than 7 days
  public func autoReleaseEscrow(
    payments : List.List<Types.Payment>
  ) : Nat {
    let sevenDaysNs : Int = 7 * 24 * 60 * 60 * 1_000_000_000;
    let now = Time.now();
    var released = 0;
    payments.mapInPlace(func(p) {
      switch (p.status, p.heldAt) {
        case (#held, ?heldAt) {
          if (now > heldAt + sevenDaysNs) {
            released += 1;
            {
              id = p.id; payerId = p.payerId; payeeId = p.payeeId; orderId = p.orderId;
              amount = p.amount; currency = p.currency; method = p.method; reference = p.reference;
              var status = #completed; var heldAt = p.heldAt; var releasedAt = ?now;
              var escrowNote = p.escrowNote; createdAt = p.createdAt; var updatedAt = now
            };
          } else p;
        };
        case _ p;
      };
    });
    released;
  };

  public func getTransactionHistory(
    payments : List.List<Types.Payment>,
    userId : Common.UserId
  ) : [Types.PaymentPublic] {
    payments.filter(func(p) { p.payerId == userId or p.payeeId == userId })
      .map<Types.Payment, Types.PaymentPublic>(func(p) { toPublic(p) })
      .toArray();
  };

  public func getPaymentById(
    payments : List.List<Types.Payment>,
    paymentId : Common.PaymentId
  ) : ?Types.PaymentPublic {
    switch (payments.find(func(p) { p.id == paymentId })) {
      case null null;
      case (?p) ?(toPublic(p));
    };
  };

  public func toPublic(p : Types.Payment) : Types.PaymentPublic {
    {
      id = p.id;
      payerId = p.payerId;
      payeeId = p.payeeId;
      orderId = p.orderId;
      amount = p.amount;
      currency = p.currency;
      method = p.method;
      reference = p.reference;
      status = p.status;
      heldAt = p.heldAt;
      releasedAt = p.releasedAt;
      escrowNote = p.escrowNote;
      createdAt = p.createdAt;
      updatedAt = p.updatedAt;
    };
  };
}
