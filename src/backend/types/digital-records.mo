import Common "common";

module {
  public type RecordId = Nat;

  public type RecordType = {
    #crop_planting;
    #harvest;
    #health_event;
    #vaccination;
    #sale;
    #expense;
  };

  public type DigitalRecord = {
    id : RecordId;
    userId : Common.UserId;
    recordType : RecordType;
    date : Common.Timestamp;
    title : Text;
    description : Text;
    amount : ?Float;
    unit : ?Text;
    category : ?Text;
    linkedId : ?Nat;
    createdAt : Common.Timestamp;
  };
}
