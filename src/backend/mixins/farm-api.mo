import List "mo:core/List";
import FarmLib "../lib/farm";
import FTypes "../types/farm";
import Common "../types/common";

mixin (
  farms : List.List<FTypes.FarmRecord>,
  cropListings : List.List<FTypes.CropListing>,
  diagnosisRequests : List.List<FTypes.DiagnosisRequest>,
  diagnosisResults : List.List<FTypes.DiagnosisResult>,
  soilReports : List.List<FTypes.SoilReport>,
  nextFarmId : Nat,
  nextListingId : Nat,
  nextDiagnosisId : Nat,
  nextSoilReportId : Nat
) {
  // Farm management
  public shared ({ caller }) func createFarm(
    name : Text,
    location : Common.Location,
    sizeHectares : Float,
    cropTypes : [Text]
  ) : async FTypes.FarmRecord {
    let id = farms.size();
    FarmLib.createFarm(farms, id, caller, name, location, sizeHectares, cropTypes);
  };

  public query ({ caller }) func getMyFarms() : async [FTypes.FarmRecord] {
    FarmLib.getFarmsByFarmer(farms, caller);
  };

  // Crop listings
  public shared ({ caller }) func addCropListing(
    cropType : Text,
    quantityKg : Float,
    pricePerKg : Float,
    description : Text,
    imageUrl : ?Text,
    location : Common.Location
  ) : async FTypes.CropListingPublic {
    let id = cropListings.size();
    let listing = FarmLib.createCropListing(cropListings, id, caller, cropType, quantityKg, pricePerKg, description, imageUrl, location);
    { listing with isAvailable = listing.isAvailable; inquiryCount = listing.inquiryCount; updatedAt = listing.updatedAt };
  };

  public query func getCropListings(farmerId : ?Common.UserId) : async [FTypes.CropListingPublic] {
    FarmLib.getCropListings(cropListings, farmerId);
  };

  public shared ({ caller }) func removeCropListing(listingId : Common.ListingId) : async Bool {
    FarmLib.deactivateCropListing(cropListings, listingId, caller);
  };
  public query ({ caller }) func getMyCropListings() : async [FTypes.CropListingPublic] {
    FarmLib.getCropListingsByFarmer(cropListings, caller);
  };

  public shared ({ caller }) func updateCropListing(
    listingId : Common.ListingId,
    quantityKg : ?Float,
    pricePerKg : ?Float,
    description : ?Text,
    imageUrl : ?Text
  ) : async ?FTypes.CropListingPublic {
    FarmLib.updateCropListing(cropListings, listingId, caller, quantityKg, pricePerKg, description, imageUrl);
  };

  public shared ({ caller }) func pauseCropListing(listingId : Common.ListingId) : async Bool {
    FarmLib.toggleCropListingActive(cropListings, listingId, caller, false);
  };

  public shared ({ caller }) func resumeCropListing(listingId : Common.ListingId) : async Bool {
    FarmLib.toggleCropListingActive(cropListings, listingId, caller, true);
  };

  public shared func incrementCropInquiry(listingId : Common.ListingId) : async Bool {
    FarmLib.incrementCropInquiry(cropListings, listingId);
  };


  // AI Crop Diagnosis
  public shared ({ caller }) func submitCropDiagnosis(
    description : Text,
    imageData : ?Text,
    symptoms : [Text],
    cropType : ?Text,
    location : ?Common.Location
  ) : async FTypes.DiagnosisResultPublic {
    let id = diagnosisRequests.size();
    let req = FarmLib.submitDiagnosis(
      diagnosisRequests, id, caller, #crop, description, null, imageData, symptoms, cropType, null, null, location
    );
    let result = FarmLib.simulateCropDiagnosis(req);
    diagnosisResults.add(result);
    FarmLib.toResultPublic(result);
  };

  // AI Soil Analysis
  public shared ({ caller }) func submitSoilAnalysis(
    description : Text,
    imageData : ?Text
  ) : async FTypes.DiagnosisResultPublic {
    let id = diagnosisRequests.size();
    let req = FarmLib.submitDiagnosis(
      diagnosisRequests, id, caller, #soil, description, null, imageData, [], null, null, null, null
    );
    let result = FarmLib.simulateCropDiagnosis(req);
    diagnosisResults.add(result);
    FarmLib.toResultPublic(result);
  };

  public query ({ caller }) func getMyDiagnoses() : async [(FTypes.DiagnosisRequest, ?FTypes.DiagnosisResultPublic)] {
    FarmLib.getDiagnosisResults(diagnosisRequests, diagnosisResults, caller);
  };

  public query ({ caller }) func getDiagnosisById(diagnosisId : Common.DiagnosisId) : async ?(FTypes.DiagnosisRequest, ?FTypes.DiagnosisResultPublic) {
    FarmLib.getDiagnosisById(diagnosisRequests, diagnosisResults, diagnosisId, caller, #any);
  };

  // Review by agricultural specialist
  public shared ({ caller }) func reviewCropDiagnosis(
    diagnosisId : Common.DiagnosisId,
    newStatus : { #confirmed; #rejected },
    notes : ?Text
  ) : async ?FTypes.DiagnosisResultPublic {
    FarmLib.reviewDiagnosis(diagnosisResults, diagnosisId, caller, newStatus, notes);
  };

  // Weather
  public query func getWeather(location : Common.Location) : async FTypes.WeatherData {
    FarmLib.getWeatherForLocation(location);
  };

  // Soil reports (specialist creates, farmer views)
  public shared ({ caller }) func addSoilReport(
    farmId : Nat,
    phLevel : Float,
    nitrogen : Float,
    phosphorus : Float,
    potassium : Float,
    texture : Text,
    suitableCrops : [Text]
  ) : async FTypes.SoilReport {
    let id = soilReports.size();
    FarmLib.createSoilReport(soilReports, id, farmId, caller, phLevel, nitrogen, phosphorus, potassium, texture, suitableCrops);
  };

  public query func getSoilReports(farmId : Nat) : async [FTypes.SoilReport] {
    FarmLib.getSoilReports(soilReports, farmId);
  };
}
