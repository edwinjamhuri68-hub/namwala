import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";

import Types "../types/success-insights";

module {
  public func getTopSellersByRegion(
    region : Text,
    limit : Nat,
  ) : [Types.TopSeller] {
    // Returns computed sample data — no shared marketplace state injected
    let samples : [Types.TopSeller] = [
      { seller = Principal.fromText("aaaaa-aa"); sellerName = "Juma Farm"; region; salesVolume = 120; averageRating = 4.8; listingCount = 15 },
      { seller = Principal.fromText("aaaaa-aa"); sellerName = "Amina Feeds"; region; salesVolume = 95; averageRating = 4.6; listingCount = 12 },
      { seller = Principal.fromText("aaaaa-aa"); sellerName = "Kilimo Bora"; region; salesVolume = 80; averageRating = 4.5; listingCount = 9 },
    ];
    if (samples.size() <= limit) samples
    else samples.sliceToArray(0, limit.toInt());
  };

  public func getTrendingCrops(
    limit : Nat,
  ) : [Types.TrendingCrop] {
    let samples : [Types.TrendingCrop] = [
      { category = "Maize"; listingCount = 340; averagePrice = 45000; priceGrowthPct = 12 },
      { category = "Beans"; listingCount = 210; averagePrice = 90000; priceGrowthPct = 8 },
      { category = "Cassava"; listingCount = 180; averagePrice = 30000; priceGrowthPct = 5 },
      { category = "Tomatoes"; listingCount = 150; averagePrice = 60000; priceGrowthPct = 15 },
      { category = "Onions"; listingCount = 130; averagePrice = 75000; priceGrowthPct = 10 },
    ];
    if (samples.size() <= limit) samples
    else samples.sliceToArray(0, limit.toInt());
  };

  public func getMarketGaps(
    limit : Nat,
  ) : [Types.MarketGap] {
    let samples : [Types.MarketGap] = [
      { category = "Sunflower Seeds"; demandScore = 85; supplyCount = 12; opportunityScore = 73 },
      { category = "Sorghum"; demandScore = 78; supplyCount = 18; opportunityScore = 60 },
      { category = "Sweet Potatoes"; demandScore = 72; supplyCount = 25; opportunityScore = 47 },
    ];
    if (samples.size() <= limit) samples
    else samples.sliceToArray(0, limit.toInt());
  };

  public func getFarmBenchmark(
    userId : Principal,
    region : Text,
  ) : Types.FarmBenchmark {
    {
      userId;
      region;
      listingCount = 0;
      orderCount = 0;
      regionalAvgListings = 5;
      regionalAvgOrders = 3;
    };
  };

  public func seedDefaultSuggestions(
    suggestions : List.List<Types.ImprovementSuggestion>,
    state : { var nextSuggestionId : Nat },
    userId : Principal,
  ) : () {
    let defaults : [(Text, Text)] = [
      ("Upload clear product images to increase buyer interest", "Listings"),
      ("Check current market prices before setting your listing price", "Pricing"),
      ("Keep your farm calendar up to date to receive timely reminders", "Planning"),
    ];
    for ((text, category) in defaults.values()) {
      let id = state.nextSuggestionId;
      state.nextSuggestionId += 1;
      suggestions.add({
        id;
        userId;
        suggestionText = text;
        category;
        createdAt = Time.now();
      });
    };
  };

  public func getImprovementSuggestions(
    suggestions : List.List<Types.ImprovementSuggestion>,
    state : { var nextSuggestionId : Nat },
    userId : Principal,
  ) : [Types.ImprovementSuggestion] {
    let userSuggestions = suggestions.filter(func(s) { Principal.equal(s.userId, userId) });
    if (userSuggestions.size() == 0) {
      seedDefaultSuggestions(suggestions, state, userId);
      suggestions.filter(func(s) { Principal.equal(s.userId, userId) }).toArray();
    } else {
      userSuggestions.toArray();
    };
  };

  public func upsertSuggestion(
    suggestions : List.List<Types.ImprovementSuggestion>,
    state : { var nextSuggestionId : Nat },
    userId : Principal,
    suggestionText : Text,
    category : Text,
  ) : Types.InsightSuggestionId {
    let id = state.nextSuggestionId;
    state.nextSuggestionId += 1;
    suggestions.add({
      id;
      userId;
      suggestionText;
      category;
      createdAt = Time.now();
    });
    id;
  };
};
