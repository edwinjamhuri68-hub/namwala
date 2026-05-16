import Principal "mo:core/Principal";

module {
  public type InsightSuggestionId = Nat;

  public type TopSeller = {
    seller : Principal;
    sellerName : Text;
    region : Text;
    salesVolume : Nat;
    averageRating : Float;
    listingCount : Nat;
  };

  public type TrendingCrop = {
    category : Text;
    listingCount : Nat;
    averagePrice : Nat;
    priceGrowthPct : Int;
  };

  public type MarketGap = {
    category : Text;
    demandScore : Nat;
    supplyCount : Nat;
    opportunityScore : Nat;
  };

  public type FarmBenchmark = {
    userId : Principal;
    region : Text;
    listingCount : Nat;
    orderCount : Nat;
    regionalAvgListings : Nat;
    regionalAvgOrders : Nat;
  };

  public type ImprovementSuggestion = {
    id : InsightSuggestionId;
    userId : Principal;
    suggestionText : Text;
    category : Text;
    createdAt : Int;
  };
};
