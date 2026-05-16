import List "mo:core/List";
import Time "mo:core/Time";
import SustainabilityLib "../lib/sustainability";
import Types "../types/sustainability";
import Common "../types/common";

mixin (
  sustainabilityRecords : List.List<Types.SustainabilityRecord>,
  sustainabilityContent : List.List<Types.SustainabilityContent>,
  state : { var nextSustainabilityRecordId : Nat; var nextSustainabilityContentId : Nat }
) {
  public shared ({ caller }) func logSustainabilityPractice(
    practiceType : Types.PracticeType,
    description : Text,
    dateImplemented : Common.Timestamp,
    impactScore : ?Float
  ) : async Types.SustainabilityRecord {
    let id = state.nextSustainabilityRecordId;
    state.nextSustainabilityRecordId += 1;
    SustainabilityLib.logPractice(sustainabilityRecords, id, caller, practiceType, description, dateImplemented, impactScore);
  };

  public shared query ({ caller }) func listMySustainabilityPractices() : async [Types.SustainabilityRecord] {
    SustainabilityLib.listMyPractices(sustainabilityRecords, caller);
  };

  public shared ({ caller }) func deleteSustainabilityPractice(id : Types.SustainabilityRecordId) : async Bool {
    SustainabilityLib.deletePractice(sustainabilityRecords, id, caller);
  };

  public shared query ({ caller }) func listSustainabilityContent(
    category : ?Types.ContentCategory
  ) : async [Types.SustainabilityContent] {
    SustainabilityLib.listContent(sustainabilityContent, category);
  };

  public shared ({ caller }) func addSustainabilityContent(
    contentType : Types.ContentType,
    title : Text,
    bodyEn : Text,
    bodySw : Text,
    category : Types.ContentCategory
  ) : async Types.SustainabilityContent {
    let id = state.nextSustainabilityContentId;
    state.nextSustainabilityContentId += 1;
    SustainabilityLib.addContent(sustainabilityContent, id, contentType, title, bodyEn, bodySw, category);
  };
}
