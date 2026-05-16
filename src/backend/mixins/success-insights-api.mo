import List "mo:core/List";
import Principal "mo:core/Principal";

import Types "../types/success-insights";
import Lib "../lib/success-insights";

mixin (
  improvementSuggestions : List.List<Types.ImprovementSuggestion>,
  insightState : { var nextSuggestionId : Nat },
) {

  public query func getTopSellersByRegion(
    region : Text,
    limit : Nat,
  ) : async [Types.TopSeller] {
    Lib.getTopSellersByRegion(region, limit);
  };

  public query func getTrendingCrops(limit : Nat) : async [Types.TrendingCrop] {
    Lib.getTrendingCrops(limit);
  };

  public query func getMarketGaps(limit : Nat) : async [Types.MarketGap] {
    Lib.getMarketGaps(limit);
  };

  public query ({ caller }) func getMyFarmBenchmark(region : Text) : async Types.FarmBenchmark {
    Lib.getFarmBenchmark(caller, region);
  };

  public query ({ caller }) func getMyImprovementSuggestions() : async [Types.ImprovementSuggestion] {
    Lib.getImprovementSuggestions(improvementSuggestions, insightState, caller);
  };

  public shared ({ caller }) func addImprovementSuggestion(
    suggestionText : Text,
    category : Text,
  ) : async Types.InsightSuggestionId {
    Lib.upsertSuggestion(improvementSuggestions, insightState, caller, suggestionText, category);
  };
};
