import Time "mo:core/Time";
import List "mo:core/List";
import Lib "../lib/disease-outbreak";
import Types "../types/disease-outbreak";
import Common "../types/common";

mixin (
  outbreaks : List.List<Types.OutbreakRecord>,
  outbreakAlerts : List.List<Types.OutbreakAlert>,
  outbreakState : { var nextOutbreakId : Nat; var nextAlertId : Nat }
) {
  public shared ({ caller }) func reportOutbreak(
    region : Text,
    district : ?Text,
    outbreakType : Types.OutbreakType,
    diseaseName : Text,
    severity : Types.OutbreakSeverity,
    description : Text,
    affectedArea : ?Text,
    coordinates : ?{ lat : Float; lng : Float }
  ) : async Types.OutbreakRecord {
    Lib.reportOutbreak(
      outbreaks,
      outbreakState,
      caller,
      region,
      district,
      outbreakType,
      diseaseName,
      severity,
      description,
      affectedArea,
      coordinates,
      Time.now()
    );
  };

  public query func getOutbreaks(filter : Types.OutbreakFilter) : async [Types.OutbreakRecord] {
    Lib.getOutbreaks(outbreaks, filter);
  };

  public query func getOutbreak(id : Types.OutbreakId) : async ?Types.OutbreakRecord {
    Lib.getOutbreak(outbreaks, id);
  };

  public shared ({ caller }) func deactivateOutbreak(id : Types.OutbreakId) : async Bool {
    Lib.deactivateOutbreak(outbreaks, id, caller);
  };

  public shared ({ caller }) func sendOutbreakAlert(
    outbreakId : Types.OutbreakId,
    recipientId : Common.UserId,
    message : Text
  ) : async Types.OutbreakAlert {
    Lib.sendAlert(outbreakAlerts, outbreakState, outbreakId, recipientId, message, Time.now());
  };

  public query ({ caller }) func getMyOutbreakAlerts() : async [Types.OutbreakAlert] {
    Lib.getAlertsForUser(outbreakAlerts, caller);
  };
}
