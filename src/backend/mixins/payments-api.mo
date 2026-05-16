import List "mo:core/List";
import PaymentsLib "../lib/payments";
import PTypes "../types/payments";
import Common "../types/common";

mixin (
  payments : List.List<PTypes.Payment>,
  nextPaymentId : Nat
) {
  public shared ({ caller }) func initiatePayment(
    payeeId : Common.UserId,
    orderId : ?Common.OrderId,
    amount : Float,
    method : Common.PaymentMethod
  ) : async PTypes.PaymentPublic {
    let id = payments.size();
    let payment = PaymentsLib.initiatePayment(payments, id, caller, payeeId, orderId, amount, method);
    PaymentsLib.toPublic(payment);
  };

  public shared ({ caller }) func confirmPayment(
    paymentId : Common.PaymentId
  ) : async Bool {
    PaymentsLib.confirmPayment(payments, paymentId, caller);
  };

  public query ({ caller }) func getMyTransactions() : async [PTypes.PaymentPublic] {
    PaymentsLib.getTransactionHistory(payments, caller);
  };

  public query func getPaymentById(
    paymentId : Common.PaymentId
  ) : async ?PTypes.PaymentPublic {
    PaymentsLib.getPaymentById(payments, paymentId);
  };

  public shared ({ caller }) func initiateEscrowPayment(
    payeeId : Common.UserId,
    orderId : ?Common.OrderId,
    amount : Float,
    method : Common.PaymentMethod,
    escrowNote : ?Text
  ) : async PTypes.PaymentPublic {
    let id = payments.size();
    let payment = PaymentsLib.initiateEscrowPayment(payments, id, caller, payeeId, orderId, amount, method, escrowNote);
    PaymentsLib.toPublic(payment);
  };

  public shared ({ caller }) func confirmDelivery(
    paymentId : Common.PaymentId
  ) : async Bool {
    PaymentsLib.confirmDelivery(payments, paymentId, caller);
  };
}
