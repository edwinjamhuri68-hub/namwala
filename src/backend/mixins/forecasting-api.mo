import Time "mo:core/Time";
import List "mo:core/List";
import Lib "../lib/forecasting";
import Types "../types/forecasting";
import Common "../types/common";

mixin (
  forecasts : List.List<Types.ForecastRecord>,
  forecastState : { var nextForecastId : Nat }
) {
  public shared ({ caller }) func generateForecast(
    forecastType : Types.ForecastType,
    title : Text,
    cropOrAnimalType : Text,
    region : Text
  ) : async Types.ForecastRecord {
    Lib.generateForecast(forecasts, forecastState, caller, forecastType, title, cropOrAnimalType, region, Time.now());
  };

  public query ({ caller }) func getMyForecasts() : async [Types.ForecastRecord] {
    Lib.getForecastsForUser(forecasts, caller);
  };

  public query func getForecast(id : Types.ForecastId) : async ?Types.ForecastRecord {
    Lib.getForecast(forecasts, id);
  };

  public query func getForecasts(filter : Types.ForecastFilter) : async [Types.ForecastRecord] {
    Lib.getForecasts(forecasts, filter);
  };

  public shared ({ caller }) func deleteForecast(id : Types.ForecastId) : async Bool {
    Lib.deleteForecast(forecasts, id, caller);
  };
}
