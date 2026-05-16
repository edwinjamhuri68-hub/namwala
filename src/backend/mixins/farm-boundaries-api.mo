import List "mo:core/List";
import Time "mo:core/Time";
import FarmBoundariesLib "../lib/farm-boundaries";
import Types "../types/farm-boundaries";
import Common "../types/common";

mixin (
  farmBoundaries : List.List<Types.FarmBoundary>,
  state : { var nextBoundaryId : Nat }
) {
  public shared ({ caller }) func saveFarmBoundary(
    name : Text,
    boundaryType : Types.BoundaryType,
    coordinates : [Types.Coordinate],
    areaHectares : ?Float,
    areaLabel : ?Text,
    color : ?Text
  ) : async Types.FarmBoundary {
    let id = state.nextBoundaryId;
    state.nextBoundaryId += 1;
    FarmBoundariesLib.saveBoundary(farmBoundaries, id, caller, name, boundaryType, coordinates, areaHectares, areaLabel, color);
  };

  public shared query ({ caller }) func listFarmBoundaries() : async [Types.FarmBoundary] {
    FarmBoundariesLib.listBoundaries(farmBoundaries, caller);
  };

  public shared query ({ caller }) func getFarmBoundary(id : Types.FarmBoundaryId) : async ?Types.FarmBoundary {
    FarmBoundariesLib.getBoundary(farmBoundaries, id);
  };

  public shared ({ caller }) func updateFarmBoundary(
    id : Types.FarmBoundaryId,
    name : Text,
    coordinates : [Types.Coordinate],
    areaHectares : ?Float,
    areaLabel : ?Text,
    color : ?Text
  ) : async Bool {
    FarmBoundariesLib.updateBoundary(farmBoundaries, id, caller, name, coordinates, areaHectares, areaLabel, color);
  };

  public shared ({ caller }) func deleteFarmBoundary(id : Types.FarmBoundaryId) : async Bool {
    FarmBoundariesLib.deleteBoundary(farmBoundaries, id, caller);
  };

  public query func getFarmBoundariesForUser(
    userId : Common.UserId
  ) : async [Types.FarmBoundary] {
    FarmBoundariesLib.listBoundaries(farmBoundaries, userId);
  };
}
