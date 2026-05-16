import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/livestock";
import Common "../types/common";

module {
  public func toPublicAnimal(r : Types.AnimalRecord) : Types.AnimalRecordPublic {
    { r with healthStatus = r.healthStatus; notes = r.notes };
  };

  public func toPublicTreatment(r : Types.TreatmentRecord) : Types.TreatmentRecordPublic {
    { r with completedAt = r.completedAt };
  };

  // Animal records
  public func addAnimalRecord(
    records : List.List<Types.AnimalRecord>,
    nextId : Nat,
    keeperId : Common.UserId,
    animalType : Text,
    breed : ?Text,
    count : Nat
  ) : Types.AnimalRecord {
    let record : Types.AnimalRecord = {
      id = nextId;
      keeperId;
      animalType;
      breed;
      count;
      var healthStatus = #healthy;
      var notes = "";
      createdAt = Time.now();
    };
    records.add(record);
    record;
  };

  public func getAnimalsByKeeper(
    records : List.List<Types.AnimalRecord>,
    keeperId : Common.UserId
  ) : [Types.AnimalRecord] {
    records.filter(func(r) { r.keeperId == keeperId }).toArray();
  };

  public func updateAnimalHealth(
    records : List.List<Types.AnimalRecord>,
    animalId : Nat,
    keeperId : Common.UserId,
    healthStatus : { #healthy; #sick; #under_treatment; #deceased },
    notes : Text
  ) : Bool {
    switch (records.find(func(r) { r.id == animalId and r.keeperId == keeperId })) {
      case (?record) {
        record.healthStatus := healthStatus;
        record.notes := notes;
        true;
      };
      case null false;
    };
  };

  // Animal listings
  public func createAnimalListing(
    listings : List.List<Types.AnimalListing>,
    nextId : Common.ListingId,
    keeperId : Common.UserId,
    animalType : Text,
    breed : ?Text,
    count : Nat,
    pricePerHead : Float,
    description : Text,
    imageUrl : ?Text,
    location : Common.Location
  ) : Types.AnimalListing {
    let listing : Types.AnimalListing = {
      id = nextId;
      keeperId;
      animalType;
      breed;
      count;
      pricePerHead;
      description;
      imageUrl;
      location;
      var isAvailable = true;
      var inquiryCount = 0;
      createdAt = Time.now();
      var updatedAt = Time.now();
    };
    listings.add(listing);
    listing;
  };

  public func getAnimalListings(
    listings : List.List<Types.AnimalListing>,
    keeperId : ?Common.UserId
  ) : [Types.AnimalListingPublic] {
    let filtered = switch (keeperId) {
      case (?kid) listings.filter(func(l) { l.keeperId == kid and l.isAvailable });
      case null listings.filter(func(l) { l.isAvailable });
    };
    filtered.map<Types.AnimalListing, Types.AnimalListingPublic>(func(l) {
      { l with isAvailable = l.isAvailable; inquiryCount = l.inquiryCount; updatedAt = l.updatedAt }
    }).toArray();
  };

  // Vaccination records
  public func addVaccinationRecord(
    records : List.List<Types.VaccinationRecord>,
    nextId : Nat,
    animalId : Nat,
    keeperId : Common.UserId,
    vaccineName : Text,
    administeredBy : ?Common.UserId,
    nextDueAt : ?Common.Timestamp,
    notes : Text
  ) : Types.VaccinationRecord {
    let record : Types.VaccinationRecord = {
      id = nextId;
      animalId;
      keeperId;
      vaccineName;
      administeredBy;
      administeredAt = Time.now();
      nextDueAt;
      notes;
    };
    records.add(record);
    record;
  };

  public func getVaccinationHistory(
    records : List.List<Types.VaccinationRecord>,
    animalId : Nat
  ) : [Types.VaccinationRecord] {
    records.filter(func(r) { r.animalId == animalId }).toArray();
  };

  // Treatment records
  public func addTreatmentRecord(
    records : List.List<Types.TreatmentRecord>,
    nextId : Nat,
    animalId : Nat,
    vetId : Common.UserId,
    diagnosis : Text,
    treatment : Text,
    medication : [Text],
    notes : Text
  ) : Types.TreatmentRecord {
    let record : Types.TreatmentRecord = {
      id = nextId;
      animalId;
      vetId;
      diagnosis;
      treatment;
      medication;
      startedAt = Time.now();
      var completedAt = null;
      notes;
    };
    records.add(record);
    record;
  };

  public func getTreatmentHistory(
    records : List.List<Types.TreatmentRecord>,
    animalId : Nat
  ) : [Types.TreatmentRecord] {
    records.filter(func(r) { r.animalId == animalId }).toArray();
  };

  public func updateAnimalListing(
    listings : List.List<Types.AnimalListing>,
    listingId : Common.ListingId,
    keeperId : Common.UserId,
    _count : ?Nat,
    _pricePerHead : ?Float,
    _description : ?Text,
    _imageUrl : ?Text
  ) : ?Types.AnimalListingPublic {
    switch (listings.find(func(l) { l.id == listingId and l.keeperId == keeperId })) {
      case null null;
      case (?listing) {
        listing.updatedAt := Time.now();
        ?{ listing with isAvailable = listing.isAvailable; inquiryCount = listing.inquiryCount; updatedAt = listing.updatedAt };
      };
    };
  };

  public func toggleAnimalListingActive(
    listings : List.List<Types.AnimalListing>,
    listingId : Common.ListingId,
    keeperId : Common.UserId,
    active : Bool
  ) : Bool {
    switch (listings.find(func(l) { l.id == listingId and l.keeperId == keeperId })) {
      case (?listing) { listing.isAvailable := active; true };
      case null false;
    };
  };

  public func deactivateAnimalListing(
    listings : List.List<Types.AnimalListing>,
    listingId : Common.ListingId,
    keeperId : Common.UserId
  ) : Bool {
    switch (listings.find(func(l) { l.id == listingId and l.keeperId == keeperId })) {
      case (?listing) { listing.isAvailable := false; true };
      case null false;
    };
  };

  public func incrementAnimalInquiry(
    listings : List.List<Types.AnimalListing>,
    listingId : Common.ListingId
  ) : Bool {
    switch (listings.find(func(l) { l.id == listingId })) {
      case (?listing) { listing.inquiryCount += 1; true };
      case null false;
    };
  };

  public func getAnimalListingsByKeeper(
    listings : List.List<Types.AnimalListing>,
    keeperId : Common.UserId
  ) : [Types.AnimalListingPublic] {
    listings
      .filter(func(l) { l.keeperId == keeperId })
      .map<Types.AnimalListing, Types.AnimalListingPublic>(func(l) {
        { l with isAvailable = l.isAvailable; inquiryCount = l.inquiryCount; updatedAt = l.updatedAt }
      })
      .toArray();
  };
}
