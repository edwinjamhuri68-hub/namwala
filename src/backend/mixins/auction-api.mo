import Time "mo:core/Time";
import List "mo:core/List";
import Lib "../lib/auction";
import Types "../types/auction";
import Common "../types/common";

mixin (
  auctions : List.List<Types.AuctionListing>,
  auctionBids : List.List<Types.AuctionBid>,
  auctionResults : List.List<Types.AuctionResult>,
  auctionState : { var nextAuctionId : Nat; var nextBidId : Nat }
) {
  public shared ({ caller }) func createAuction(
    listingType : Types.AuctionListingType,
    title : Text,
    description : Text,
    startingPrice : Nat,
    endTime : Common.Timestamp,
    quantity : Nat,
    unit : Text,
    images : [Text],
    region : Text,
    isAnonymousBidding : Bool
  ) : async Types.AuctionListing {
    Lib.createAuction(
      auctions,
      auctionState,
      caller,
      listingType,
      title,
      description,
      startingPrice,
      endTime,
      quantity,
      unit,
      images,
      region,
      isAnonymousBidding,
      Time.now()
    );
  };

  public query func getAuctions(
    status : ?Types.AuctionStatus,
    listingType : ?Types.AuctionListingType,
    region : ?Text
  ) : async [Types.AuctionListing] {
    Lib.getAuctions(auctions, status, listingType, region);
  };

  public query func getAuction(id : Types.AuctionId) : async ?Types.AuctionListing {
    Lib.getAuction(auctions, id);
  };

  public shared ({ caller }) func placeBid(
    auctionId : Types.AuctionId,
    bidAmount : Nat
  ) : async { #ok : Types.AuctionBid; #err : Text } {
    Lib.placeBid(auctions, auctionBids, auctionState, auctionId, caller, bidAmount, Time.now());
  };

  public query func getBidsForAuction(auctionId : Types.AuctionId) : async [Types.AuctionBid] {
    Lib.getBidsForAuction(auctionBids, auctionId);
  };

  public shared ({ caller }) func closeAuction(auctionId : Types.AuctionId) : async { #ok : Types.AuctionResult; #err : Text } {
    Lib.closeAuction(auctions, auctionResults, auctionId, caller, Time.now());
  };

  public shared ({ caller }) func cancelAuction(auctionId : Types.AuctionId) : async Bool {
    Lib.cancelAuction(auctions, auctionId, caller);
  };

  public query func getAuctionResult(auctionId : Types.AuctionId) : async ?Types.AuctionResult {
    Lib.getAuctionResult(auctionResults, auctionId);
  };

  public query ({ caller }) func getMyAuctions() : async [Types.AuctionListing] {
    Lib.getAuctionsBySeller(auctions, caller);
  };
}
