import List "mo:core/List";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Types "../types/traceability";
import Common "../types/common";

module {
  public func createTraceability(
    records : List.List<Types.ProductTraceability>,
    nextId : Nat,
    caller : Common.UserId,
    listingId : Common.ListingId,
    farmName : Text,
    location : Common.Location,
    role : Text
  ) : Types.ProductTraceability {
    let qrCodeId = "QR-" # nextId.toText() # "-" # listingId.toText();
    let record : Types.ProductTraceability = {
      id = nextId;
      listingId;
      origin = {
        userId = caller;
        farmName;
        location;
        role;
      };
      productionHistory = [];
      specialistNotes = [];
      orderChain = [];
      qrCodeId;
      createdAt = Time.now();
    };
    records.add(record);
    record;
  };

  public func getTraceabilityByListingId(
    records : List.List<Types.ProductTraceability>,
    listingId : Common.ListingId
  ) : ?Types.ProductTraceability {
    records.find(func(r) { r.listingId == listingId });
  };

  public func getByQrCode(
    records : List.List<Types.ProductTraceability>,
    qrCodeId : Types.QrCodeId
  ) : ?Types.ProductTraceability {
    records.find(func(r) { r.qrCodeId == qrCodeId });
  };

  public func addTraceabilityEvent(
    records : List.List<Types.ProductTraceability>,
    id : Types.TraceabilityId,
    caller : Common.UserId,
    eventType : Text,
    description : Text
  ) : Bool {
    switch (records.find(func(r) { r.id == id })) {
      case null false;
      case (?_) {
        let event : Types.TraceabilityEvent = {
          eventType;
          date = Time.now();
          description;
          performedBy = caller;
        };
        records.mapInPlace(func(r) {
          if (r.id == id) { { r with productionHistory = r.productionHistory.concat([event]) } }
          else r
        });
        true;
      };
    };
  };

  public func addSpecialistNote(
    records : List.List<Types.ProductTraceability>,
    id : Types.TraceabilityId,
    caller : Common.UserId,
    specialistRole : Text,
    note : Text,
    photoUrls : [Text]
  ) : Bool {
    switch (records.find(func(r) { r.id == id })) {
      case null false;
      case (?_) {
        let noteEntry : Types.SpecialistNote = {
          specialistId = caller;
          specialistRole;
          note;
          date = Time.now();
          photoUrls;
        };
        records.mapInPlace(func(r) {
          if (r.id == id) { { r with specialistNotes = r.specialistNotes.concat([noteEntry]) } }
          else r
        });
        true;
      };
    };
  };
}
