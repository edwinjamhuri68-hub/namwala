import Common "common";

module {
  public type MarketPrice = {
    id : Nat;
    commodity : Text;
    commodityType : { #crop; #animal; #input };
    pricePerUnit : Float;
    unit : Text;
    market : Text;
    region : Text;
    var updatedAt : Common.Timestamp;
    recordedBy : Common.UserId;
  };

  public type MarketRecommendation = {
    id : Nat;
    advisorId : Common.UserId;
    commodity : Text;
    recommendation : Text;
    action : { #buy; #sell; #hold; #wait };
    targetPrice : ?Float;
    targetDate : ?Common.Timestamp;
    reasoning : Text;
    createdAt : Common.Timestamp;
  };

  public type PriceTrend = {
    commodity : Text;
    region : Text;
    dataPoints : [(Common.Timestamp, Float)];
    trend : { #rising; #falling; #steady };
  };

  // Public API types (immutable — safe for shared functions)
  public type MarketPricePublic = {
    id : Nat;
    commodity : Text;
    commodityType : { #crop; #animal; #input };
    pricePerUnit : Float;
    unit : Text;
    market : Text;
    region : Text;
    updatedAt : Common.Timestamp;
    recordedBy : Common.UserId;
  };
}
