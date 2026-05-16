import List "mo:core/List";
import LivestockLib "../lib/livestock";
import FarmLib "../lib/farm";
import LTypes "../types/livestock";
import FTypes "../types/farm";
import Common "../types/common";

mixin (
  animalRecords : List.List<LTypes.AnimalRecord>,
  animalListings : List.List<LTypes.AnimalListing>,
  vaccinationRecords : List.List<LTypes.VaccinationRecord>,
  treatmentRecords : List.List<LTypes.TreatmentRecord>,
  diagnosisRequests : List.List<FTypes.DiagnosisRequest>,
  diagnosisResults : List.List<FTypes.DiagnosisResult>,
  nextAnimalId : Nat,
  nextListingId : Nat,
  nextVaccinationId : Nat,
  nextTreatmentId : Nat,
  nextDiagnosisId : Nat
) {
  // Herd management
  public shared ({ caller }) func addAnimal(
    animalType : Text,
    breed : ?Text,
    count : Nat
  ) : async LTypes.AnimalRecordPublic {
    let id = animalRecords.size();
    let record = LivestockLib.addAnimalRecord(animalRecords, id, caller, animalType, breed, count);
    LivestockLib.toPublicAnimal(record);
  };

  public query ({ caller }) func getMyAnimals() : async [LTypes.AnimalRecordPublic] {
    LivestockLib.getAnimalsByKeeper(animalRecords, caller)
      .map<LTypes.AnimalRecord, LTypes.AnimalRecordPublic>(func(r) { LivestockLib.toPublicAnimal(r) });
  };

  public shared ({ caller }) func updateAnimalHealth(
    animalId : Nat,
    healthStatus : { #healthy; #sick; #under_treatment; #deceased },
    notes : Text
  ) : async Bool {
    LivestockLib.updateAnimalHealth(animalRecords, animalId, caller, healthStatus, notes);
  };

  // Animal listings
  public shared ({ caller }) func addAnimalListing(
    animalType : Text,
    breed : ?Text,
    count : Nat,
    pricePerHead : Float,
    description : Text,
    imageUrl : ?Text,
    location : Common.Location
  ) : async LTypes.AnimalListingPublic {
    let id = animalListings.size();
    let listing = LivestockLib.createAnimalListing(animalListings, id, caller, animalType, breed, count, pricePerHead, description, imageUrl, location);
    { listing with isAvailable = listing.isAvailable; inquiryCount = listing.inquiryCount; updatedAt = listing.updatedAt };
  };

  public query func getAnimalListings(keeperId : ?Common.UserId) : async [LTypes.AnimalListingPublic] {
    LivestockLib.getAnimalListings(animalListings, keeperId);
  };
  public query ({ caller }) func getMyAnimalListings() : async [LTypes.AnimalListingPublic] {
    LivestockLib.getAnimalListingsByKeeper(animalListings, caller);
  };

  public shared ({ caller }) func updateAnimalListing(
    listingId : Common.ListingId,
    count : ?Nat,
    pricePerHead : ?Float,
    description : ?Text,
    imageUrl : ?Text
  ) : async ?LTypes.AnimalListingPublic {
    LivestockLib.updateAnimalListing(animalListings, listingId, caller, count, pricePerHead, description, imageUrl);
  };

  public shared ({ caller }) func pauseAnimalListing(listingId : Common.ListingId) : async Bool {
    LivestockLib.toggleAnimalListingActive(animalListings, listingId, caller, false);
  };

  public shared ({ caller }) func resumeAnimalListing(listingId : Common.ListingId) : async Bool {
    LivestockLib.toggleAnimalListingActive(animalListings, listingId, caller, true);
  };

  public shared ({ caller }) func removeAnimalListing(listingId : Common.ListingId) : async Bool {
    LivestockLib.deactivateAnimalListing(animalListings, listingId, caller);
  };

  public shared func incrementAnimalInquiry(listingId : Common.ListingId) : async Bool {
    LivestockLib.incrementAnimalInquiry(animalListings, listingId);
  };


  // AI Animal health diagnosis
  public shared ({ caller }) func submitAnimalDiagnosis(
    description : Text,
    imageData : ?Text,
    symptoms : [Text],
    animalType : ?Text,
    animalId : ?Nat
  ) : async FTypes.DiagnosisResultPublic {
    let id = diagnosisRequests.size();
    let req = FarmLib.submitDiagnosis(
      diagnosisRequests, id, caller, #animal, description, null, imageData, symptoms, null, animalType, animalId, null
    );
    let result = FarmLib.simulateAnimalDiagnosis(req);
    diagnosisResults.add(result);
    FarmLib.toResultPublic(result);
  };

  // Review by veterinarian
  public shared ({ caller }) func reviewAnimalDiagnosis(
    diagnosisId : Common.DiagnosisId,
    newStatus : { #confirmed; #rejected },
    notes : ?Text
  ) : async ?FTypes.DiagnosisResultPublic {
    FarmLib.reviewDiagnosis(diagnosisResults, diagnosisId, caller, newStatus, notes);
  };

  public query ({ caller }) func getAnimalDiagnosisById(
    diagnosisId : Common.DiagnosisId
  ) : async ?(FTypes.DiagnosisRequest, ?FTypes.DiagnosisResultPublic) {
    FarmLib.getDiagnosisById(diagnosisRequests, diagnosisResults, diagnosisId, caller, #any);
  };

  // Vet functions
  public shared ({ caller }) func addVaccinationRecord(
    animalId : Nat,
    keeperId : Common.UserId,
    vaccineName : Text,
    nextDueAt : ?Common.Timestamp,
    notes : Text
  ) : async LTypes.VaccinationRecord {
    let id = vaccinationRecords.size();
    LivestockLib.addVaccinationRecord(vaccinationRecords, id, animalId, keeperId, vaccineName, ?caller, nextDueAt, notes);
  };

  public query func getVaccinationHistory(animalId : Nat) : async [LTypes.VaccinationRecord] {
    LivestockLib.getVaccinationHistory(vaccinationRecords, animalId);
  };

  public shared ({ caller }) func addTreatmentRecord(
    animalId : Nat,
    diagnosis : Text,
    treatment : Text,
    medication : [Text],
    notes : Text
  ) : async LTypes.TreatmentRecordPublic {
    let id = treatmentRecords.size();
    let record = LivestockLib.addTreatmentRecord(treatmentRecords, id, animalId, caller, diagnosis, treatment, medication, notes);
    LivestockLib.toPublicTreatment(record);
  };

  public query func getTreatmentHistory(animalId : Nat) : async [LTypes.TreatmentRecordPublic] {
    LivestockLib.getTreatmentHistory(treatmentRecords, animalId)
      .map<LTypes.TreatmentRecord, LTypes.TreatmentRecordPublic>(func(r) { LivestockLib.toPublicTreatment(r) });
  };
}
