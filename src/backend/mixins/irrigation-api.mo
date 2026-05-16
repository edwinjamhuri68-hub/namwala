import Time "mo:core/Time";
import List "mo:core/List";
import Lib "../lib/irrigation";
import Types "../types/irrigation";
import Common "../types/common";

mixin (
  irrigationRecommendations : List.List<Types.IrrigationRecommendation>,
  irrigationLogs : List.List<Types.IrrigationLog>,
  irrigationState : { var nextIrrigationId : Nat; var nextLogId : Nat }
) {
  public shared ({ caller }) func generateIrrigationRecommendation(
    cropType : Text,
    region : Text
  ) : async Types.IrrigationRecommendation {
    Lib.generateRecommendation(irrigationRecommendations, irrigationState, caller, cropType, region, Time.now());
  };

  public query ({ caller }) func getMyIrrigationRecommendations() : async [Types.IrrigationRecommendation] {
    Lib.getRecommendationsForUser(irrigationRecommendations, caller);
  };

  public query func getIrrigationRecommendation(id : Types.IrrigationId) : async ?Types.IrrigationRecommendation {
    Lib.getRecommendation(irrigationRecommendations, id);
  };

  public shared ({ caller }) func setIrrigationReminder(id : Types.IrrigationId) : async Bool {
    Lib.setReminder(irrigationRecommendations, id, caller);
  };

  public shared ({ caller }) func logIrrigation(
    recommendationId : Types.IrrigationId,
    followedOn : Common.Timestamp,
    actualWaterUseLiters : ?Nat,
    notes : ?Text
  ) : async Types.IrrigationLog {
    Lib.logIrrigation(irrigationLogs, irrigationState, caller, recommendationId, followedOn, actualWaterUseLiters, notes);
  };

  public query ({ caller }) func getMyIrrigationLogs() : async [Types.IrrigationLog] {
    Lib.getLogsForUser(irrigationLogs, caller);
  };
}
