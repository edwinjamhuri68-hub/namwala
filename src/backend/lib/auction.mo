import List "mo:core/List";
import Types "../types/auction";
import Common "../types/common";

module {
  public func createAuction(
    auctions : List.List<Types.AuctionListing>,
    state : { var nextAuctionId : Nat },
    sellerId : Common.UserId,
    listingType : Types.AuctionListingType,
    title : Text,
    description : Text,
    startingPrice : Nat,
    endTime : Common.Timestamp,
    quantity : Nat,
    unit : Text,
    images : [Text],
    region : Text,
    isAnonymousBidding : Bool,
    now : Common.Timestamp
  ) : Types.AuctionListing {
    let id = state.nextAuctionId;
    state.nextAuctionId += 1;
    let listing : Types.AuctionListing = {
      id;
      sellerId;
      listingType;
      title;
      description;
      startingPrice;
      currentBid = startingPrice;
      currentBidderId = null;
      bidCount = 0;
      endTime;
      startTime = now;
      quantity;
      unit;
      images;
      region;
      status = #active;
      isAnonymousBidding;
    };
    auctions.add(listing);
    listing;
  };

  public func getAuctions(
    auctions : List.List<Types.AuctionListing>,
    status : ?Types.AuctionStatus,
    listingType : ?Types.AuctionListingType,
    region : ?Text
  ) : [Types.AuctionListing] {
    auctions.filter(func(a) {
      let statusMatch = switch (status) {
        case (?s) { a.status == s };
        case null { true };
      };
      let typeMatch = switch (listingType) {
        case (?t) { a.listingType == t };
        case null { true };
      };
      let regionMatch = switch (region) {
        case (?r) { a.region == r };
        case null { true };
      };
      statusMatch and typeMatch and regionMatch;
    }).toArray();
  };

  public func getAuction(
    auctions : List.List<Types.AuctionListing>,
    id : Types.AuctionId
  ) : ?Types.AuctionListing {
    auctions.find(func(a) { a.id == id });
  };

  public func placeBid(
    auctions : List.List<Types.AuctionListing>,
    bids : List.List<Types.AuctionBid>,
    bidState : { var nextBidId : Nat },
    auctionId : Types.AuctionId,
    bidderId : Common.UserId,
    bidAmount : Nat,
    now : Common.Timestamp
  ) : { #ok : Types.AuctionBid; #err : Text } {
    switch (auctions.findIndex(func(a) { a.id == auctionId })) {
      case null { #err "Auction not found" };
      case (?idx) {
        let auction = auctions.at(idx);
        if (auction.status != #active) {
          return #err "Auction is not active";
        };
        if (bidAmount < auction.currentBid + 10000) {
          return #err "Bid must be at least 10000 above current bid";
        };
        bids.mapInPlace(func(b) {
          if (b.auctionId == auctionId and b.isWinning) {
            { b with isWinning = false };
          } else { b };
        });
        let bidId = bidState.nextBidId;
        bidState.nextBidId += 1;
        let bid : Types.AuctionBid = {
          id = bidId;
          auctionId;
          bidderId;
          bidAmount;
          placedAt = now;
          isWinning = true;
        };
        bids.add(bid);
        auctions.put(idx, {
          auction with
          currentBid = bidAmount;
          currentBidderId = ?bidderId;
          bidCount = auction.bidCount + 1;
        });
        #ok bid;
      };
    };
  };

  public func getBidsForAuction(
    bids : List.List<Types.AuctionBid>,
    auctionId : Types.AuctionId
  ) : [Types.AuctionBid] {
    let filtered = bids.filter(func(b) { b.auctionId == auctionId });
    let arr = filtered.toArray();
    arr.sort(func(a, b) {
      if (a.bidAmount > b.bidAmount) { #less }
      else if (a.bidAmount < b.bidAmount) { #greater }
      else { #equal };
    });
  };

  public func closeAuction(
    auctions : List.List<Types.AuctionListing>,
    results : List.List<Types.AuctionResult>,
    auctionId : Types.AuctionId,
    caller : Common.UserId,
    now : Common.Timestamp
  ) : { #ok : Types.AuctionResult; #err : Text } {
    switch (auctions.findIndex(func(a) { a.id == auctionId })) {
      case null { #err "Auction not found" };
      case (?idx) {
        let auction = auctions.at(idx);
        if (auction.sellerId != caller) {
          return #err "Only the seller can close the auction";
        };
        if (auction.status != #active) {
          return #err "Auction is not active";
        };
        auctions.put(idx, { auction with status = #ended });
        let result : Types.AuctionResult = {
          auctionId;
          winnerId = auction.currentBidderId;
          finalPrice = auction.currentBid;
          sellerAccepted = null;
          completedAt = ?now;
        };
        results.add(result);
        #ok result;
      };
    };
  };

  public func cancelAuction(
    auctions : List.List<Types.AuctionListing>,
    auctionId : Types.AuctionId,
    caller : Common.UserId
  ) : Bool {
    switch (auctions.findIndex(func(a) { a.id == auctionId and a.sellerId == caller })) {
      case (?idx) {
        let auction = auctions.at(idx);
        auctions.put(idx, { auction with status = #cancelled });
        true;
      };
      case null { false };
    };
  };

  public func getAuctionResult(
    results : List.List<Types.AuctionResult>,
    auctionId : Types.AuctionId
  ) : ?Types.AuctionResult {
    results.find(func(r) { r.auctionId == auctionId });
  };

  public func getAuctionsBySeller(
    auctions : List.List<Types.AuctionListing>,
    sellerId : Common.UserId
  ) : [Types.AuctionListing] {
    auctions.filter(func(a) { a.sellerId == sellerId }).toArray();
  };
}
