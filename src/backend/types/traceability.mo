import Common "common";

module {
  public type TraceabilityId = Nat;
  public type QrCodeId = Text;

  public type TraceabilityEvent = {
    eventType : Text;
    date : Common.Timestamp;
    description : Text;
    performedBy : Common.UserId;
  };

  public type SpecialistNote = {
    specialistId : Common.UserId;
    specialistRole : Text;
    note : Text;
    date : Common.Timestamp;
    photoUrls : [Text];
  };

  public type OrderChainEntry = {
    orderId : Common.OrderId;
    buyerId : Common.UserId;
    date : Common.Timestamp;
    status : Text;
  };

  public type ProductOrigin = {
    userId : Common.UserId;
    farmName : Text;
    location : Common.Location;
    role : Text;
  };

  public type ProductTraceability = {
    id : TraceabilityId;
    listingId : Common.ListingId;
    origin : ProductOrigin;
    productionHistory : [TraceabilityEvent];
    specialistNotes : [SpecialistNote];
    orderChain : [OrderChainEntry];
    qrCodeId : QrCodeId;
    createdAt : Common.Timestamp;
  };
}
