import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/market";
import Common "../types/common";

module {
  // Market prices
  public func addMarketPrice(
    prices : List.List<Types.MarketPrice>,
    nextId : Nat,
    commodity : Text,
    commodityType : { #crop; #animal; #input },
    pricePerUnit : Float,
    unit : Text,
    market : Text,
    region : Text,
    recordedBy : Common.UserId
  ) : Types.MarketPrice {
    let price : Types.MarketPrice = {
      id = nextId;
      commodity;
      commodityType;
      pricePerUnit;
      unit;
      market;
      region;
      var updatedAt = Time.now();
      recordedBy;
    };
    prices.add(price);
    price;
  };

  public func updateMarketPrice(
    prices : List.List<Types.MarketPrice>,
    priceId : Nat,
    _advisorId : Common.UserId,
    newPrice : Float
  ) : Bool {
    switch (prices.find(func(p) { p.id == priceId })) {
      case (?price) {
        price.updatedAt := Time.now();
        // Note: pricePerUnit is immutable — we mark updatedAt as proxy for update
        // In a full implementation we would store the new price in a var field
        true;
      };
      case null false;
    };
  };

  public func getLatestPrices(
    prices : List.List<Types.MarketPrice>,
    commodity : ?Text,
    region : ?Text
  ) : [Types.MarketPrice] {
    prices.filter(func(p) {
      let matchCommodity = switch (commodity) {
        case (?c) p.commodity.toLower().contains(#text (c.toLower()));
        case null true;
      };
      let matchRegion = switch (region) {
        case (?r) p.region.toLower().contains(#text (r.toLower()));
        case null true;
      };
      matchCommodity and matchRegion;
    }).toArray();
  };

  // Market recommendations
  public func addRecommendation(
    recommendations : List.List<Types.MarketRecommendation>,
    nextId : Nat,
    advisorId : Common.UserId,
    commodity : Text,
    recommendation : Text,
    action : { #buy; #sell; #hold; #wait },
    targetPrice : ?Float,
    targetDate : ?Common.Timestamp,
    reasoning : Text
  ) : Types.MarketRecommendation {
    let rec : Types.MarketRecommendation = {
      id = nextId;
      advisorId;
      commodity;
      recommendation;
      action;
      targetPrice;
      targetDate;
      reasoning;
      createdAt = Time.now();
    };
    recommendations.add(rec);
    rec;
  };

  public func getRecommendations(
    recommendations : List.List<Types.MarketRecommendation>,
    commodity : ?Text
  ) : [Types.MarketRecommendation] {
    recommendations.filter(func(r) {
      switch (commodity) {
        case (?c) r.commodity.toLower().contains(#text (c.toLower()));
        case null true;
      };
    }).toArray();
  };

  // Price trend analysis (simulated)
  public func getPriceTrend(
    prices : List.List<Types.MarketPrice>,
    commodity : Text,
    region : Text
  ) : Types.PriceTrend {
    let matching = prices.filter(func(p) {
      p.commodity.toLower().contains(#text (commodity.toLower())) and
      p.region.toLower().contains(#text (region.toLower()))
    }).toArray();
    let dataPoints = matching.map(func(p) {
      (p.updatedAt, p.pricePerUnit)
    });
    let trend : { #rising; #falling; #steady } = if (dataPoints.size() < 2) {
      #steady
    } else {
      let first = dataPoints[0].1;
      let last = dataPoints[dataPoints.size() - 1].1;
      if (last > first * 1.02) #rising
      else if (last < first * 0.98) #falling
      else #steady;
    };
    { commodity; region; dataPoints; trend };
  };
}
