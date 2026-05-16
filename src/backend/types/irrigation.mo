import Common "common";

module {
  public type IrrigationId = Nat;
  public type IrrigationLogId = Nat;

  public type IrrigationSchedule = {
    frequencyPerWeek : Nat;
    durationMinutes : Nat;
    bestTimeOfDay : Text;
  };

  public type IrrigationBasis = {
    soilMoisture : Text;
    weatherForecast : Text;
    seasonalCondition : Text;
  };

  public type IrrigationRecommendation = {
    id : IrrigationId;
    userId : Common.UserId;
    cropType : Text;
    region : Text;
    schedule : IrrigationSchedule;
    reasoning : Text;
    estimatedWaterSavingPercent : Nat;
    yieldImpactPercent : Int;
    basedOn : IrrigationBasis;
    createdAt : Common.Timestamp;
    validUntil : Common.Timestamp;
    hasSetReminder : Bool;
  };

  public type IrrigationLog = {
    id : IrrigationLogId;
    userId : Common.UserId;
    recommendationId : IrrigationId;
    followedOn : Common.Timestamp;
    actualWaterUseLiters : ?Nat;
    notes : ?Text;
  };
}
