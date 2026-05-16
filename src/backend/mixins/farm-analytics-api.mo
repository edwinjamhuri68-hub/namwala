import List "mo:core/List";
import Time "mo:core/Time";
import FarmAnalyticsLib "../lib/farm-analytics";
import Types "../types/farm-analytics";
import Common "../types/common";

mixin (
  analyticsSnapshots : List.List<Types.FarmAnalyticsSnapshot>
) {
  public shared ({ caller }) func generateFarmAnalytics(
    period : Types.AnalyticsPeriod
  ) : async Types.FarmAnalyticsSnapshot {
    FarmAnalyticsLib.generateSnapshot(analyticsSnapshots, caller, period);
  };

  public shared query ({ caller }) func listFarmAnalytics() : async [Types.FarmAnalyticsSnapshot] {
    FarmAnalyticsLib.listSnapshots(analyticsSnapshots, caller);
  };

  public shared query ({ caller }) func getLatestFarmAnalytics() : async ?Types.FarmAnalyticsSnapshot {
    FarmAnalyticsLib.getLatestSnapshot(analyticsSnapshots, caller);
  };
}
