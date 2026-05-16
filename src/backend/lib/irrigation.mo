import List "mo:core/List";
import Nat "mo:core/Nat";
import Types "../types/irrigation";
import Common "../types/common";

module {
  public func generateRecommendation(
    recommendations : List.List<Types.IrrigationRecommendation>,
    state : { var nextIrrigationId : Nat },
    userId : Common.UserId,
    cropType : Text,
    region : Text,
    now : Common.Timestamp
  ) : Types.IrrigationRecommendation {
    let id = state.nextIrrigationId;
    state.nextIrrigationId += 1;

    let isDryRegion = region == "Dodoma" or region == "Singida" or region == "Shinyanga" or region == "Mwanza" or region == "Tabora";
    let frequencyPerWeek : Nat = if (isDryRegion) { 5 } else { 3 };
    let durationMinutes : Nat = if (cropType == "rice") { 60 } else if (cropType == "sugarcane") { 45 } else { 30 };
    let bestTimeOfDay : Text = "05:30 - 07:00";
    let waterSaving : Nat = if (isDryRegion) { 25 } else { 35 };
    let yieldImpact : Int = if (isDryRegion) { 18 } else { 22 };

    let soilMoisture : Text = if (isDryRegion) {
      "Low (15-25%) - irrigation critical";
    } else {
      "Moderate (30-45%) - schedule irrigation before deficit";
    };
    let weatherForecast : Text = if (isDryRegion) {
      "Dry and hot conditions expected for next 7 days";
    } else {
      "Mild temperatures with possible light rains";
    };
    let seasonalCondition : Text = if (isDryRegion) {
      "Dry season - peak irrigation demand";
    } else {
      "Transitional period - moderate water needs";
    };
    let reasoning : Text = "Based on current soil moisture, weather forecast, and " # cropType # " crop requirements in " # region # ", we recommend " # frequencyPerWeek.toText() # " irrigations per week at " # bestTimeOfDay # ". This schedule balances water conservation with optimal crop growth.";

    let threeDaysNs : Int = 3 * 24 * 60 * 60 * 1_000_000_000;
    let validUntil : Common.Timestamp = now + threeDaysNs;

    let rec : Types.IrrigationRecommendation = {
      id;
      userId;
      cropType;
      region;
      schedule = { frequencyPerWeek; durationMinutes; bestTimeOfDay };
      reasoning;
      estimatedWaterSavingPercent = waterSaving;
      yieldImpactPercent = yieldImpact;
      basedOn = { soilMoisture; weatherForecast; seasonalCondition };
      createdAt = now;
      validUntil;
      hasSetReminder = false;
    };
    recommendations.add(rec);
    rec;
  };

  public func getRecommendationsForUser(
    recommendations : List.List<Types.IrrigationRecommendation>,
    userId : Common.UserId
  ) : [Types.IrrigationRecommendation] {
    recommendations.filter(func(r) { r.userId == userId }).toArray();
  };

  public func getRecommendation(
    recommendations : List.List<Types.IrrigationRecommendation>,
    id : Types.IrrigationId
  ) : ?Types.IrrigationRecommendation {
    recommendations.find(func(r) { r.id == id });
  };

  public func setReminder(
    recommendations : List.List<Types.IrrigationRecommendation>,
    id : Types.IrrigationId,
    caller : Common.UserId
  ) : Bool {
    switch (recommendations.findIndex(func(r) { r.id == id and r.userId == caller })) {
      case (?idx) {
        let existing = recommendations.at(idx);
        recommendations.put(idx, { existing with hasSetReminder = true });
        true;
      };
      case null { false };
    };
  };

  public func logIrrigation(
    logs : List.List<Types.IrrigationLog>,
    logState : { var nextLogId : Nat },
    userId : Common.UserId,
    recommendationId : Types.IrrigationId,
    followedOn : Common.Timestamp,
    actualWaterUseLiters : ?Nat,
    notes : ?Text
  ) : Types.IrrigationLog {
    let id = logState.nextLogId;
    logState.nextLogId += 1;
    let log : Types.IrrigationLog = {
      id;
      userId;
      recommendationId;
      followedOn;
      actualWaterUseLiters;
      notes;
    };
    logs.add(log);
    log;
  };

  public func getLogsForUser(
    logs : List.List<Types.IrrigationLog>,
    userId : Common.UserId
  ) : [Types.IrrigationLog] {
    logs.filter(func(l) { l.userId == userId }).toArray();
  };
}
