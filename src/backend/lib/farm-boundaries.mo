import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/farm-boundaries";
import Common "../types/common";

module {
  public func saveBoundary(
    boundaries : List.List<Types.FarmBoundary>,
    nextId : Nat,
    caller : Common.UserId,
    name : Text,
    boundaryType : Types.BoundaryType,
    coordinates : [Types.Coordinate],
    areaHectares : ?Float,
    areaLabel : ?Text,
    color : ?Text
  ) : Types.FarmBoundary {
    let now = Time.now();
    let boundary : Types.FarmBoundary = {
      id = nextId;
      userId = caller;
      name;
      boundaryType;
      coordinates;
      areaHectares;
      areaLabel;
      color;
      createdAt = now;
      updatedAt = now;
    };
    boundaries.add(boundary);
    boundary;
  };

  public func listBoundaries(
    boundaries : List.List<Types.FarmBoundary>,
    userId : Common.UserId
  ) : [Types.FarmBoundary] {
    boundaries.filter(func(b) { b.userId == userId }).toArray();
  };

  public func getBoundary(
    boundaries : List.List<Types.FarmBoundary>,
    id : Types.FarmBoundaryId
  ) : ?Types.FarmBoundary {
    boundaries.find(func(b) { b.id == id });
  };

  public func updateBoundary(
    boundaries : List.List<Types.FarmBoundary>,
    id : Types.FarmBoundaryId,
    caller : Common.UserId,
    name : Text,
    coordinates : [Types.Coordinate],
    areaHectares : ?Float,
    areaLabel : ?Text,
    color : ?Text
  ) : Bool {
    switch (boundaries.find(func(b) { b.id == id })) {
      case null false;
      case (?b) {
        if (b.userId != caller) return false;
        boundaries.mapInPlace(func(bnd) {
          if (bnd.id == id) {
            { bnd with name; coordinates; areaHectares; areaLabel; color; updatedAt = Time.now() }
          } else bnd
        });
        true;
      };
    };
  };

  public func deleteBoundary(
    boundaries : List.List<Types.FarmBoundary>,
    id : Types.FarmBoundaryId,
    caller : Common.UserId
  ) : Bool {
    switch (boundaries.find(func(b) { b.id == id })) {
      case null false;
      case (?b) {
        if (b.userId != caller) return false;
        let filtered = boundaries.filter(func(bnd) { bnd.id != id });
        boundaries.clear();
        boundaries.append(filtered);
        true;
      };
    };
  };
}
