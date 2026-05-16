import List "mo:core/List";
import Time "mo:core/Time";
import FarmingGroupsLib "../lib/farming-groups";
import Types "../types/farming-groups";
import Common "../types/common";

mixin (
  farmingGroups : List.List<Types.FarmingGroup>,
  groupMemberships : List.List<Types.GroupMembership>,
  bulkBuyRequests : List.List<Types.BulkBuyRequest>,
  groupListings : List.List<Types.GroupListing>,
  state : { var nextGroupId : Nat; var nextBulkBuyId : Nat; var nextGroupListingId : Nat }
) {
  public shared ({ caller }) func createFarmingGroup(
    name : Text,
    description : Text
  ) : async Types.FarmingGroup {
    let id = state.nextGroupId;
    state.nextGroupId += 1;
    FarmingGroupsLib.createGroup(farmingGroups, groupMemberships, id, caller, name, description);
  };

  public shared ({ caller }) func joinFarmingGroup(inviteCode : Text) : async Bool {
    FarmingGroupsLib.joinGroup(farmingGroups, groupMemberships, inviteCode, caller);
  };

  public shared ({ caller }) func leaveFarmingGroup(groupId : Types.GroupId) : async Bool {
    FarmingGroupsLib.leaveGroup(farmingGroups, groupMemberships, groupId, caller);
  };

  public shared ({ caller }) func removeGroupMember(
    groupId : Types.GroupId,
    userId : Common.UserId
  ) : async Bool {
    FarmingGroupsLib.removeGroupMember(farmingGroups, groupMemberships, groupId, userId, caller);
  };

  public shared query ({ caller }) func listMyGroups() : async [Types.FarmingGroup] {
    FarmingGroupsLib.listMyGroups(farmingGroups, groupMemberships, caller);
  };

  public shared query ({ caller }) func getGroup(id : Types.GroupId) : async ?Types.FarmingGroup {
    FarmingGroupsLib.getGroup(farmingGroups, id);
  };

  public shared query ({ caller }) func listGroupMembers(groupId : Types.GroupId) : async [Types.GroupMembership] {
    FarmingGroupsLib.listGroupMembers(groupMemberships, groupId);
  };

  public shared ({ caller }) func createBulkBuyRequest(
    groupId : Types.GroupId,
    itemName : Text,
    quantity : Float,
    unit : Text,
    targetDate : Common.Timestamp
  ) : async Types.BulkBuyRequest {
    let id = state.nextBulkBuyId;
    state.nextBulkBuyId += 1;
    FarmingGroupsLib.createBulkBuyRequest(bulkBuyRequests, id, caller, groupId, itemName, quantity, unit, targetDate);
  };

  public shared ({ caller }) func respondToBulkBuy(
    requestId : Types.BulkBuyId,
    quantity : Float,
    note : Text
  ) : async Bool {
    FarmingGroupsLib.respondToBulkBuy(bulkBuyRequests, requestId, caller, quantity, note);
  };

  public shared query ({ caller }) func listBulkBuyRequests(groupId : Types.GroupId) : async [Types.BulkBuyRequest] {
    FarmingGroupsLib.listBulkBuyRequests(bulkBuyRequests, groupId);
  };

  public shared ({ caller }) func createGroupListing(
    groupId : Types.GroupId,
    listingIds : [Common.ListingId],
    title : Text,
    description : Text
  ) : async Types.GroupListing {
    let id = state.nextGroupListingId;
    state.nextGroupListingId += 1;
    FarmingGroupsLib.createGroupListing(groupListings, id, groupId, listingIds, title, description);
  };

  public shared query ({ caller }) func listGroupListings(groupId : Types.GroupId) : async [Types.GroupListing] {
    FarmingGroupsLib.listGroupListings(groupListings, groupId);
  };
}
