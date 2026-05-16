import Common "common";

module {
  public type AnalysisId = Nat;

  public type ImageType = {
    #drone;
    #satellite;
  };

  public type AnalysisType = {
    #crop_health;
    #irrigation_coverage;
    #grazing_conditions;
    #disease_spread;
  };

  public type InsightSeverity = {
    #low;
    #medium;
    #high;
    #critical;
  };

  public type AnalysisStatus = {
    #pending;
    #complete;
    #failed;
  };

  public type AiInsight = {
    category : Text;
    finding : Text;
    severity : InsightSeverity;
    recommendation : Text;
  };

  public type DroneAnalysis = {
    id : AnalysisId;
    userId : Common.UserId;
    farmId : ?Nat;
    imageUrl : Text;
    imageType : ImageType;
    analysisType : AnalysisType;
    aiInsights : [AiInsight];
    overallHealthScore : ?Float;
    analysisDate : Common.Timestamp;
    status : AnalysisStatus;
  };
}
