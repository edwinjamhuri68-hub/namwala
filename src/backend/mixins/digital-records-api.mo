import List "mo:core/List";
import Time "mo:core/Time";
import DigitalRecordsLib "../lib/digital-records";
import Types "../types/digital-records";
import Common "../types/common";

mixin (
  digitalRecords : List.List<Types.DigitalRecord>,
  state : { var nextRecordId : Nat }
) {
  public shared ({ caller }) func addDigitalRecord(
    recordType : Types.RecordType,
    date : Common.Timestamp,
    title : Text,
    description : Text,
    amount : ?Float,
    unit : ?Text,
    category : ?Text,
    linkedId : ?Nat
  ) : async Types.DigitalRecord {
    let id = state.nextRecordId;
    state.nextRecordId += 1;
    DigitalRecordsLib.createRecord(digitalRecords, id, caller, recordType, date, title, description, amount, unit, category, linkedId);
  };

  public shared query ({ caller }) func listDigitalRecords() : async [Types.DigitalRecord] {
    DigitalRecordsLib.listRecords(digitalRecords, caller, null);
  };

  public shared query ({ caller }) func listDigitalRecordsByType(recordType : Types.RecordType) : async [Types.DigitalRecord] {
    DigitalRecordsLib.listRecords(digitalRecords, caller, ?recordType);
  };

  public shared query ({ caller }) func getDigitalRecord(id : Types.RecordId) : async ?Types.DigitalRecord {
    DigitalRecordsLib.getRecord(digitalRecords, id);
  };

  public shared ({ caller }) func updateDigitalRecord(
    id : Types.RecordId,
    title : Text,
    description : Text,
    amount : ?Float
  ) : async Bool {
    DigitalRecordsLib.updateRecord(digitalRecords, id, caller, title, description, amount);
  };

  public shared ({ caller }) func deleteDigitalRecord(id : Types.RecordId) : async Bool {
    DigitalRecordsLib.deleteRecord(digitalRecords, id, caller);
  };

  public query func listDigitalRecordsByUserId(userId : Common.UserId) : async [Types.DigitalRecord] {
    DigitalRecordsLib.listRecords(digitalRecords, userId, null);
  };
}
