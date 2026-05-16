import Common "common";

module {
  public type FarmBoundaryId = Nat;

  public type BoundaryType = {
    #farm_field;
    #grazing_zone;
    #orchard;
    #other;
  };

  public type Coordinate = { lat : Float; lng : Float };

  public type FarmBoundary = {
    id : FarmBoundaryId;
    userId : Common.UserId;
    name : Text;
    boundaryType : BoundaryType;
    coordinates : [Coordinate];
    areaHectares : ?Float;
    areaLabel : ?Text;
    color : ?Text;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };
}
