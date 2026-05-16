import Time "mo:core/Time";
import List "mo:core/List";
import Lib "../lib/drone-analysis";
import Types "../types/drone-analysis";

mixin (
  droneAnalyses : List.List<Types.DroneAnalysis>,
  droneState : { var nextAnalysisId : Nat }
) {
  public shared ({ caller }) func submitImageAnalysis(
    farmId : ?Nat,
    imageUrl : Text,
    imageType : Types.ImageType,
    analysisType : Types.AnalysisType
  ) : async Types.DroneAnalysis {
    Lib.submitAnalysis(droneAnalyses, droneState, caller, farmId, imageUrl, imageType, analysisType, Time.now());
  };

  public query func getAnalysesByFarm(farmId : Nat) : async [Types.DroneAnalysis] {
    Lib.getAnalysesByFarm(droneAnalyses, farmId);
  };

  public query func getAnalysisById(id : Types.AnalysisId) : async ?Types.DroneAnalysis {
    Lib.getAnalysisById(droneAnalyses, id);
  };

  public query ({ caller }) func getMyAnalyses() : async [Types.DroneAnalysis] {
    Lib.getAnalysesByUser(droneAnalyses, caller);
  };
}
