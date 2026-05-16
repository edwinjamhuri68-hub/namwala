import Common "common";

module {
  public type GroupId = Nat;
  public type BulkBuyId = Nat;
  public type GroupListingId = Nat;

  public type GroupMemberRole = { #admin; #member };

  public type BulkBuyStatus = { #open; #fulfilled; #cancelled };

  public type FarmingGroup = {
    id : GroupId;
    name : Text;
    description : Text;
    adminId : Common.UserId;
    memberIds : [Common.UserId];
    inviteCode : Text;
    createdAt : Common.Timestamp;
  };

  public type GroupMembership = {
    userId : Common.UserId;
    groupId : GroupId;
    role : GroupMemberRole;
    joinedAt : Common.Timestamp;
  };

  public type BulkBuyResponse = {
    responderId : Common.UserId;
    quantity : Float;
    note : Text;
    respondedAt : Common.Timestamp;
  };

  public type BulkBuyRequest = {
    id : BulkBuyId;
    groupId : GroupId;
    requesterId : Common.UserId;
    itemName : Text;
    quantity : Float;
    unit : Text;
    targetDate : Common.Timestamp;
    status : BulkBuyStatus;
    responses : [BulkBuyResponse];
    createdAt : Common.Timestamp;
  };

  public type GroupListing = {
    id : GroupListingId;
    groupId : GroupId;
    listingIds : [Common.ListingId];
    title : Text;
    description : Text;
    createdAt : Common.Timestamp;
  };
}
