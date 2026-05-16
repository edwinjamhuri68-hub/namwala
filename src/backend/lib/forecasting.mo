import List "mo:core/List";
import Float "mo:core/Float";
import Types "../types/forecasting";
import Common "../types/common";

module {
  public func generateForecast(
    forecasts : List.List<Types.ForecastRecord>,
    state : { var nextForecastId : Nat },
    userId : Common.UserId,
    forecastType : Types.ForecastType,
    title : Text,
    cropOrAnimalType : Text,
    region : Text,
    now : Common.Timestamp
  ) : Types.ForecastRecord {
    let id = state.nextForecastId;
    state.nextForecastId += 1;

    let isDryRegion = region == "Dodoma" or region == "Singida" or region == "Shinyanga";

    let (predictedValue, unit, keyDrivers, sensitivityNote, monthlyBreakdown, basedOn) : (Float, Text, [Text], Text, [Types.MonthlyBreakdown], Types.ForecastBasis) =
      switch forecastType {
        case (#crop_yield) {
          let weatherScore : Float = if (isDryRegion) { 0.62 } else { 0.78 };
          let soilScore : Float = 0.74;
          let base : Float = if (cropOrAnimalType == "maize") { 2800.0 } else if (cropOrAnimalType == "rice") { 2200.0 } else { 1900.0 };
          let predicted = base * weatherScore * soilScore;
          let months : [Types.MonthlyBreakdown] = [
            { month = "Month 1"; value = predicted * 0.08 },
            { month = "Month 2"; value = predicted * 0.12 },
            { month = "Month 3"; value = predicted * 0.18 },
            { month = "Month 4"; value = predicted * 0.22 },
            { month = "Month 5"; value = predicted * 0.25 },
            { month = "Month 6"; value = predicted * 0.15 },
          ];
          let basis : Types.ForecastBasis = {
            weatherScore;
            soilScore;
            feedingScore = 0.0;
            historyScore = 0.82;
          };
          (predicted, "kg/acre", ["Rainfall patterns", "Soil quality", "Planting density", "Historical yields"], "Yield sensitive to late rains", months, basis);
        };
        case (#milk_production) {
          let feedingScore : Float = 0.85;
          let base : Float = if (cropOrAnimalType == "dairy cow") { 18.5 } else { 9.2 };
          let predicted = base * feedingScore;
          let months : [Types.MonthlyBreakdown] = [
            { month = "Month 1"; value = predicted * 0.95 },
            { month = "Month 2"; value = predicted },
            { month = "Month 3"; value = predicted * 1.05 },
            { month = "Month 4"; value = predicted * 1.02 },
            { month = "Month 5"; value = predicted * 0.98 },
            { month = "Month 6"; value = predicted * 0.96 },
          ];
          let basis : Types.ForecastBasis = {
            weatherScore = 0.72;
            soilScore = 0.0;
            feedingScore;
            historyScore = 0.79;
          };
          (predicted, "liters/day", ["Feed quality", "Breed genetics", "Health status", "Seasonal temperature"], "Output varies with dry season", months, basis);
        };
        case (#egg_production) {
          let feedingScore : Float = 0.88;
          let base : Float = if (cropOrAnimalType == "layer hen") { 280.0 } else { 220.0 };
          let predicted = base * feedingScore;
          let months : [Types.MonthlyBreakdown] = [
            { month = "Month 1"; value = predicted * 0.92 },
            { month = "Month 2"; value = predicted },
            { month = "Month 3"; value = predicted * 1.03 },
            { month = "Month 4"; value = predicted * 1.05 },
            { month = "Month 5"; value = predicted * 0.97 },
            { month = "Month 6"; value = predicted * 0.94 },
          ];
          let basis : Types.ForecastBasis = {
            weatherScore = 0.68;
            soilScore = 0.0;
            feedingScore;
            historyScore = 0.81;
          };
          (predicted, "eggs/year", ["Feed composition", "Lighting schedule", "Flock age", "Disease prevention"], "Egg count sensitive to heat stress", months, basis);
        };
        case (#livestock_weight) {
          let feedingScore : Float = 0.80;
          let base : Float = if (cropOrAnimalType == "cattle") { 450.0 } else if (cropOrAnimalType == "goat") { 55.0 } else { 80.0 };
          let predicted = base * feedingScore;
          let months : [Types.MonthlyBreakdown] = [
            { month = "Month 1"; value = base * 0.70 },
            { month = "Month 2"; value = base * 0.74 },
            { month = "Month 3"; value = base * 0.78 },
            { month = "Month 4"; value = base * 0.82 },
            { month = "Month 5"; value = base * 0.86 },
            { month = "Month 6"; value = predicted },
          ];
          let basis : Types.ForecastBasis = {
            weatherScore = 0.74;
            soilScore = 0.0;
            feedingScore;
            historyScore = 0.77;
          };
          (predicted, "kg", ["Grazing quality", "Supplement feeding", "Breed characteristics", "Water availability"], "Weight gain slows in dry season", months, basis);
        };
      };

    // Confidence between 0.70 and 0.95 — vary by id to simulate diversity
    let idFloat : Float = (id % 5).toFloat();
    let confidenceScore : Float = 0.70 + idFloat * 0.05 + 0.05;
    let sevenDaysNs : Int = 7 * 24 * 60 * 60 * 1_000_000_000;
    let validUntil : Common.Timestamp = now + sevenDaysNs;

    let record : Types.ForecastRecord = {
      id;
      userId;
      forecastType;
      title;
      predictedValue;
      unit;
      confidenceScore;
      keyDrivers;
      monthlyBreakdown;
      sensitivityNote;
      basedOn;
      createdAt = now;
      validUntil;
    };
    forecasts.add(record);
    record;
  };

  public func getForecasts(
    forecasts : List.List<Types.ForecastRecord>,
    filter : Types.ForecastFilter
  ) : [Types.ForecastRecord] {
    forecasts.filter(func(f) {
      let userMatch = switch (filter.userId) {
        case (?uid) { f.userId == uid };
        case null { true };
      };
      let typeMatch = switch (filter.forecastType) {
        case (?t) { f.forecastType == t };
        case null { true };
      };
      userMatch and typeMatch;
    }).toArray();
  };

  public func getForecast(
    forecasts : List.List<Types.ForecastRecord>,
    id : Types.ForecastId
  ) : ?Types.ForecastRecord {
    forecasts.find(func(f) { f.id == id });
  };

  public func getForecastsForUser(
    forecasts : List.List<Types.ForecastRecord>,
    userId : Common.UserId
  ) : [Types.ForecastRecord] {
    forecasts.filter(func(f) { f.userId == userId }).toArray();
  };

  public func deleteForecast(
    forecasts : List.List<Types.ForecastRecord>,
    id : Types.ForecastId,
    caller : Common.UserId
  ) : Bool {
    switch (forecasts.findIndex(func(f) { f.id == id and f.userId == caller })) {
      case (?_idx) {
        let remaining = forecasts.filter(func(f) { f.id != id });
        forecasts.clear();
        forecasts.append(remaining);
        true;
      };
      case null { false };
    };
  };
}
