import List "mo:core/List";
import Time "mo:core/Time";
import TraceabilityLib "../lib/traceability";
import Types "../types/traceability";
import Common "../types/common";

mixin (
  traceabilityRecords : List.List<Types.ProductTraceability>,
  state : { var nextTraceabilityId : Nat }
) {
  public shared ({ caller }) func createProductTraceability(
    listingId : Common.ListingId,
    farmName : Text,
    location : Common.Location
  ) : async Types.ProductTraceability {
    let id = state.nextTraceabilityId;
    state.nextTraceabilityId += 1;
    TraceabilityLib.createTraceability(traceabilityRecords, id, caller, listingId, farmName, location, "producer");
  };

  public shared query ({ caller }) func getProductTraceability(
    listingId : Common.ListingId
  ) : async ?Types.ProductTraceability {
    TraceabilityLib.getTraceabilityByListingId(traceabilityRecords, listingId);
  };

  public shared query ({ caller }) func getTraceabilityByQrCode(
    qrCodeId : Types.QrCodeId
  ) : async ?Types.ProductTraceability {
    TraceabilityLib.getByQrCode(traceabilityRecords, qrCodeId);
  };

  public shared ({ caller }) func addTraceabilityEvent(
    id : Types.TraceabilityId,
    eventType : Text,
    description : Text
  ) : async Bool {
    TraceabilityLib.addTraceabilityEvent(traceabilityRecords, id, caller, eventType, description);
  };

  public shared ({ caller }) func addSpecialistProductNote(
    id : Types.TraceabilityId,
    note : Text,
    photoUrls : [Text]
  ) : async Bool {
    TraceabilityLib.addSpecialistNote(traceabilityRecords, id, caller, "specialist", note, photoUrls);
  };

  // Legacy alias
  public shared ({ caller }) func addSpecialistNote(
    id : Types.TraceabilityId,
    note : Text,
    photoUrls : [Text]
  ) : async Bool {
    TraceabilityLib.addSpecialistNote(traceabilityRecords, id, caller, "specialist", note, photoUrls);
  };
}
