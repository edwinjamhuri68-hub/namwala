import List "mo:core/List";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Types "../types/farming-groups";
import Common "../types/common";
import Text "mo:core/Text";

module {
  // Generate 6-char invite code from group id
  func makeInviteCode(id : Nat) : Text {
    let chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let arr = chars.toArray();
    var n = id + 100000;
    var code = "";
    var i = 0;
    while (i < 6) {
      let idx = n % 32;
      code := Text.fromChar(arr[idx]) # code;
      n := n / 32;
      i += 1;
    };
    code;
  };

  public func createGroup(
    groups : List.List<Types.FarmingGroup>,
    memberships : List.List<Types.GroupMembership>,
    nextId : Nat,
    caller : Common.UserId,
    name : Text,
    description : Text
  ) : Types.FarmingGroup {
    let now = Time.now();
    let group : Types.FarmingGroup = {
      id = nextId;
      name;
      description;
      adminId = caller;
      memberIds = [caller];
      inviteCode = makeInviteCode(nextId);
      createdAt = now;
    };
    groups.add(group);
    let membership : Types.GroupMembership = {
      userId = caller;
      groupId = nextId;
      role = #admin;
      joinedAt = now;
    };
    memberships.add(membership);
    group;
  };

  public func getGroup(
    groups : List.List<Types.FarmingGroup>,
    id : Types.GroupId
  ) : ?Types.FarmingGroup {
    groups.find(func(g) { g.id == id });
  };

  public func joinGroup(
    groups : List.List<Types.FarmingGroup>,
    memberships : List.List<Types.GroupMembership>,
    inviteCode : Text,
    caller : Common.UserId
  ) : Bool {
    switch (groups.find(func(g) { g.inviteCode == inviteCode })) {
      case null false;
      case (?group) {
        // Already a member?
        let already = memberships.find(func(m) {
          m.groupId == group.id and m.userId == caller
        });
        if (already.isSome()) return false;
        let membership : Types.GroupMembership = {
          userId = caller;
          groupId = group.id;
          role = #member;
          joinedAt = Time.now();
        };
        memberships.add(membership);
        // Add to memberIds
        groups.mapInPlace(func(g) {
          if (g.id == group.id) { { g with memberIds = g.memberIds.concat([caller]) } }
          else g
        });
        true;
      };
    };
  };

  public func leaveGroup(
    groups : List.List<Types.FarmingGroup>,
    memberships : List.List<Types.GroupMembership>,
    groupId : Types.GroupId,
    caller : Common.UserId
  ) : Bool {
    switch (memberships.find(func(m) { m.groupId == groupId and m.userId == caller })) {
      case null false;
      case (?_) {
        let filtered = memberships.filter(func(m) { not (m.groupId == groupId and m.userId == caller) });
        memberships.clear();
        memberships.append(filtered);
        groups.mapInPlace(func(g) {
          if (g.id == groupId) { { g with memberIds = g.memberIds.filter(func(uid) { uid != caller }) } }
          else g
        });
        true;
      };
    };
  };

  public func removeGroupMember(
    groups : List.List<Types.FarmingGroup>,
    memberships : List.List<Types.GroupMembership>,
    groupId : Types.GroupId,
    userId : Common.UserId,
    caller : Common.UserId
  ) : Bool {
    // Only admin can remove
    switch (groups.find(func(g) { g.id == groupId })) {
      case null false;
      case (?group) {
        if (group.adminId != caller) return false;
        let filtered = memberships.filter(func(m) { not (m.groupId == groupId and m.userId == userId) });
        memberships.clear();
        memberships.append(filtered);
        groups.mapInPlace(func(g) {
          if (g.id == groupId) { { g with memberIds = g.memberIds.filter(func(uid) { uid != userId }) } }
          else g
        });
        true;
      };
    };
  };

  public func listMyGroups(
    groups : List.List<Types.FarmingGroup>,
    memberships : List.List<Types.GroupMembership>,
    caller : Common.UserId
  ) : [Types.FarmingGroup] {
    let myGroupIds = memberships.filter(func(m) { m.userId == caller }).map<Types.GroupMembership, Types.GroupId>(func(m) { m.groupId });
    groups.filter(func(g) { myGroupIds.find(func(id) { id == g.id }).isSome() }).toArray();
  };

  public func listGroupMembers(
    memberships : List.List<Types.GroupMembership>,
    groupId : Types.GroupId
  ) : [Types.GroupMembership] {
    memberships.filter(func(m) { m.groupId == groupId }).toArray();
  };

  public func createBulkBuyRequest(
    requests : List.List<Types.BulkBuyRequest>,
    nextId : Nat,
    caller : Common.UserId,
    groupId : Types.GroupId,
    itemName : Text,
    quantity : Float,
    unit : Text,
    targetDate : Common.Timestamp
  ) : Types.BulkBuyRequest {
    let req : Types.BulkBuyRequest = {
      id = nextId;
      groupId;
      requesterId = caller;
      itemName;
      quantity;
      unit;
      targetDate;
      status = #open;
      responses = [];
      createdAt = Time.now();
    };
    requests.add(req);
    req;
  };

  public func respondToBulkBuy(
    requests : List.List<Types.BulkBuyRequest>,
    requestId : Types.BulkBuyId,
    caller : Common.UserId,
    quantity : Float,
    note : Text
  ) : Bool {
    switch (requests.find(func(r) { r.id == requestId })) {
      case null false;
      case (?req) {
        if (req.status != #open) return false;
        let response : Types.BulkBuyResponse = {
          responderId = caller;
          quantity;
          note;
          respondedAt = Time.now();
        };
        requests.mapInPlace(func(r) {
          if (r.id == requestId) { { r with responses = r.responses.concat([response]) } }
          else r
        });
        true;
      };
    };
  };

  public func listBulkBuyRequests(
    requests : List.List<Types.BulkBuyRequest>,
    groupId : Types.GroupId
  ) : [Types.BulkBuyRequest] {
    requests.filter(func(r) { r.groupId == groupId }).toArray();
  };

  public func createGroupListing(
    groupListings : List.List<Types.GroupListing>,
    nextId : Nat,
    groupId : Types.GroupId,
    listingIds : [Common.ListingId],
    title : Text,
    description : Text
  ) : Types.GroupListing {
    let gl : Types.GroupListing = {
      id = nextId;
      groupId;
      listingIds;
      title;
      description;
      createdAt = Time.now();
    };
    groupListings.add(gl);
    gl;
  };

  public func listGroupListings(
    groupListings : List.List<Types.GroupListing>,
    groupId : Types.GroupId
  ) : [Types.GroupListing] {
    groupListings.filter(func(gl) { gl.groupId == groupId }).toArray();
  };
}
