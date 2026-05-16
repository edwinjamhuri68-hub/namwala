import Common "common";

module {
  public type ForecastId = Nat;

  public type ForecastType = {
    #crop_yield;
    #milk_production;
    #egg_production;
    #livestock_weight;
  };

  public type MonthlyBreakdown = {
    month : Text;
    value : Float;
  };

  public type ForecastBasis = {
    weatherScore : Float;
    soilScore : Float;
    feedingScore : Float;
    historyScore : Float;
  };

  public type ForecastRecord = {
    id : ForecastId;
    userId : Common.UserId;
    forecastType : ForecastType;
    title : Text;
    predictedValue : Float;
    unit : Text;
    confidenceScore : Float;
    keyDrivers : [Text];
    monthlyBreakdown : [MonthlyBreakdown];
    sensitivityNote : Text;
    basedOn : ForecastBasis;
    createdAt : Common.Timestamp;
    validUntil : Common.Timestamp;
  };

  public type ForecastFilter = {
    userId : ?Common.UserId;
    forecastType : ?ForecastType;
  };
}
