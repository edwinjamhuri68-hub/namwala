import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/drone-analysis";
import Common "../types/common";

module {

  func generateInsights(analysisType : Types.AnalysisType) : [Types.AiInsight] {
    switch (analysisType) {
      case (#crop_health) {
        [{
          category = "Crop Health";
          finding = "Moderate stress detected in northern quadrant";
          severity = #medium;
          recommendation = "Consider increasing irrigation frequency in affected area";
        }];
      };
      case (#irrigation_coverage) {
        [{
          category = "Irrigation";
          finding = "Coverage gaps detected on eastern edge";
          severity = #low;
          recommendation = "Adjust sprinkler alignment to cover eastern 10%";
        }];
      };
      case (#grazing_conditions) {
        [{
          category = "Grazing";
          finding = "Pasture density adequate; signs of overgrazing near water point";
          severity = #medium;
          recommendation = "Rotate livestock away from water point area for 2 weeks";
        }];
      };
      case (#disease_spread) {
        [{
          category = "Disease Spread";
          finding = "Possible fungal lesions in 15% of visible crop area";
          severity = #high;
          recommendation = "Apply fungicide treatment and isolate affected rows immediately";
        }];
      };
    };
  };

  public func submitAnalysis(
    analyses : List.List<Types.DroneAnalysis>,
    state : { var nextAnalysisId : Nat },
    userId : Common.UserId,
    farmId : ?Nat,
    imageUrl : Text,
    imageType : Types.ImageType,
    analysisType : Types.AnalysisType,
    now : Common.Timestamp
  ) : Types.DroneAnalysis {
    let id = state.nextAnalysisId;
    state.nextAnalysisId += 1;
    let insights = generateInsights(analysisType);
    let healthScore : ?Float = switch (analysisType) {
      case (#crop_health) { ?0.78 };
      case (#irrigation_coverage) { ?0.85 };
      case (#grazing_conditions) { ?0.70 };
      case (#disease_spread) { ?0.45 };
    };
    let record : Types.DroneAnalysis = {
      id;
      userId;
      farmId;
      imageUrl;
      imageType;
      analysisType;
      aiInsights = insights;
      overallHealthScore = healthScore;
      analysisDate = now;
      status = #complete;
    };
    analyses.add(record);
    record;
  };

  public func getAnalysesByFarm(
    analyses : List.List<Types.DroneAnalysis>,
    farmId : Nat
  ) : [Types.DroneAnalysis] {
    analyses.toArray().filter(func(a : Types.DroneAnalysis) : Bool {
      switch (a.farmId) {
        case (?fid) { fid == farmId };
        case null { false };
      };
    });
  };

  public func getAnalysisById(
    analyses : List.List<Types.DroneAnalysis>,
    id : Types.AnalysisId
  ) : ?Types.DroneAnalysis {
    analyses.find(func(a : Types.DroneAnalysis) : Bool { a.id == id });
  };

  public func getAnalysesByUser(
    analyses : List.List<Types.DroneAnalysis>,
    userId : Common.UserId
  ) : [Types.DroneAnalysis] {
    analyses.toArray().filter(func(a : Types.DroneAnalysis) : Bool {
      a.userId == userId;
    });
  };
}
