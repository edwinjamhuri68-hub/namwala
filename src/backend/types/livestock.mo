import Common "common";

module {
  public type AnimalRecord = {
    id : Nat;
    keeperId : Common.UserId;
    animalType : Text;
    breed : ?Text;
    count : Nat;
    var healthStatus : { #healthy; #sick; #under_treatment; #deceased };
    var notes : Text;
    createdAt : Common.Timestamp;
  };

  public type AnimalListing = {
    id : Common.ListingId;
    keeperId : Common.UserId;
    animalType : Text;
    breed : ?Text;
    count : Nat;
    pricePerHead : Float;
    description : Text;
    imageUrl : ?Text;
    location : Common.Location;
    var isAvailable : Bool;
    var inquiryCount : Nat;
    createdAt : Common.Timestamp;
    var updatedAt : Common.Timestamp;
  };

  public type VaccinationRecord = {
    id : Nat;
    animalId : Nat;
    keeperId : Common.UserId;
    vaccineName : Text;
    administeredBy : ?Common.UserId;  // vet
    administeredAt : Common.Timestamp;
    nextDueAt : ?Common.Timestamp;
    notes : Text;
  };

  public type TreatmentRecord = {
    id : Nat;
    animalId : Nat;
    vetId : Common.UserId;
    diagnosis : Text;
    treatment : Text;
    medication : [Text];
    startedAt : Common.Timestamp;
    var completedAt : ?Common.Timestamp;
    notes : Text;
  };

  // Public API types (immutable — safe for shared functions)
  public type AnimalRecordPublic = {
    id : Nat;
    keeperId : Common.UserId;
    animalType : Text;
    breed : ?Text;
    count : Nat;
    healthStatus : { #healthy; #sick; #under_treatment; #deceased };
    notes : Text;
    createdAt : Common.Timestamp;
  };

  public type TreatmentRecordPublic = {
    id : Nat;
    animalId : Nat;
    vetId : Common.UserId;
    diagnosis : Text;
    treatment : Text;
    medication : [Text];
    startedAt : Common.Timestamp;
    completedAt : ?Common.Timestamp;
    notes : Text;
  };

  public type AnimalListingPublic = {
    id : Common.ListingId;
    keeperId : Common.UserId;
    animalType : Text;
    breed : ?Text;
    count : Nat;
    pricePerHead : Float;
    description : Text;
    imageUrl : ?Text;
    location : Common.Location;
    isAvailable : Bool;
    inquiryCount : Nat;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };
}
