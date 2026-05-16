import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/digital-records";
import Common "../types/common";

module {
  public func createRecord(
    records : List.List<Types.DigitalRecord>,
    nextId : Nat,
    caller : Common.UserId,
    recordType : Types.RecordType,
    date : Common.Timestamp,
    title : Text,
    description : Text,
    amount : ?Float,
    unit : ?Text,
    category : ?Text,
    linkedId : ?Nat
  ) : Types.DigitalRecord {
    let now = Time.now();
    let record : Types.DigitalRecord = {
      id = nextId;
      userId = caller;
      recordType;
      date;
      title;
      description;
      amount;
      unit;
      category;
      linkedId;
      createdAt = now;
    };
    records.add(record);
    record;
  };

  public func listRecords(
    records : List.List<Types.DigitalRecord>,
    userId : Common.UserId,
    recordType : ?Types.RecordType
  ) : [Types.DigitalRecord] {
    records.filter(func(r) {
      r.userId == userId and
      (switch (recordType) { case (?rt) r.recordType == rt; case null true })
    }).toArray();
  };

  public func getRecord(
    records : List.List<Types.DigitalRecord>,
    id : Types.RecordId
  ) : ?Types.DigitalRecord {
    records.find(func(r) { r.id == id });
  };

  public func updateRecord(
    records : List.List<Types.DigitalRecord>,
    id : Types.RecordId,
    caller : Common.UserId,
    title : Text,
    description : Text,
    amount : ?Float
  ) : Bool {
    switch (records.find(func(r) { r.id == id })) {
      case null false;
      case (?r) {
        if (r.userId != caller) return false;
        records.mapInPlace(func(rec) {
          if (rec.id == id) { { rec with title; description; amount } }
          else rec
        });
        true;
      };
    };
  };

  public func deleteRecord(
    records : List.List<Types.DigitalRecord>,
    id : Types.RecordId,
    caller : Common.UserId
  ) : Bool {
    switch (records.find(func(r) { r.id == id })) {
      case null false;
      case (?r) {
        if (r.userId != caller) return false;
        let filtered = records.filter(func(rec) { rec.id != id });
        records.clear();
        records.append(filtered);
        true;
      };
    };
  };
}
