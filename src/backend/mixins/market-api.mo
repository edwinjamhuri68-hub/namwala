import List "mo:core/List";
import MarketLib "../lib/market";
import MktTypes "../types/market";
import Common "../types/common";

mixin (
  marketPrices : List.List<MktTypes.MarketPrice>,
  marketRecommendations : List.List<MktTypes.MarketRecommendation>,
  nextPriceId : Nat,
  nextRecommendationId : Nat
) {
  // Market prices (market advisor manages)
  public shared ({ caller }) func addMarketPrice(
    commodity : Text,
    commodityType : { #crop; #animal; #input },
    pricePerUnit : Float,
    unit : Text,
    market : Text,
    region : Text
  ) : async MktTypes.MarketPricePublic {
    let id = marketPrices.size();
    let price = MarketLib.addMarketPrice(
      marketPrices, id, commodity, commodityType, pricePerUnit, unit, market, region, caller
    );
    { price with updatedAt = price.updatedAt };
  };

  public shared ({ caller }) func updateMarketPrice(
    priceId : Nat,
    newPrice : Float
  ) : async Bool {
    MarketLib.updateMarketPrice(marketPrices, priceId, caller, newPrice);
  };

  public query func getLatestPrices(
    commodity : ?Text,
    region : ?Text
  ) : async [MktTypes.MarketPricePublic] {
    let prices = MarketLib.getLatestPrices(marketPrices, commodity, region);
    prices.map<MktTypes.MarketPrice, MktTypes.MarketPricePublic>(func(p) {
      { p with updatedAt = p.updatedAt };
    });
  };

  // Market recommendations
  public shared ({ caller }) func addMarketRecommendation(
    commodity : Text,
    recommendation : Text,
    action : { #buy; #sell; #hold; #wait },
    targetPrice : ?Float,
    targetDate : ?Common.Timestamp,
    reasoning : Text
  ) : async MktTypes.MarketRecommendation {
    let id = marketRecommendations.size();
    MarketLib.addRecommendation(
      marketRecommendations, id, caller, commodity, recommendation, action, targetPrice, targetDate, reasoning
    );
  };

  public query func getMarketRecommendations(
    commodity : ?Text
  ) : async [MktTypes.MarketRecommendation] {
    MarketLib.getRecommendations(marketRecommendations, commodity);
  };

  public query func getPriceTrend(
    commodity : Text,
    region : Text
  ) : async MktTypes.PriceTrend {
    MarketLib.getPriceTrend(marketPrices, commodity, region);
  };
}
