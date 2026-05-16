import Common "common";

module {
  public type AuctionId = Nat;
  public type BidId = Nat;

  public type AuctionListingType = {
    #crop;
    #livestock;
  };

  public type AuctionStatus = {
    #active;
    #ended;
    #cancelled;
    #completed;
  };

  public type AuctionListing = {
    id : AuctionId;
    sellerId : Common.UserId;
    listingType : AuctionListingType;
    title : Text;
    description : Text;
    startingPrice : Nat;
    currentBid : Nat;
    currentBidderId : ?Common.UserId;
    bidCount : Nat;
    endTime : Common.Timestamp;
    startTime : Common.Timestamp;
    quantity : Nat;
    unit : Text;
    images : [Text];
    region : Text;
    status : AuctionStatus;
    isAnonymousBidding : Bool;
  };

  public type AuctionBid = {
    id : BidId;
    auctionId : AuctionId;
    bidderId : Common.UserId;
    bidAmount : Nat;
    placedAt : Common.Timestamp;
    isWinning : Bool;
  };

  public type AuctionResult = {
    auctionId : AuctionId;
    winnerId : ?Common.UserId;
    finalPrice : Nat;
    sellerAccepted : ?Bool;
    completedAt : ?Common.Timestamp;
  };
}
