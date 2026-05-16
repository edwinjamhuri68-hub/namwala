import Common "common";

module {
  public type FarmRecord = {
    id : Nat;
    farmerId : Common.UserId;
    name : Text;
    location : Common.Location;
    sizeHectares : Float;
    cropTypes : [Text];
    soilPh : ?Float;
    soilType : ?Text;
    createdAt : Common.Timestamp;
  };

  public type CropListing = {
    id : Common.ListingId;
    farmerId : Common.UserId;
    cropType : Text;
    quantityKg : Float;
    pricePerKg : Float;
    description : Text;
    imageUrl : ?Text;
    location : Common.Location;
    var isAvailable : Bool;
    var inquiryCount : Nat;
    createdAt : Common.Timestamp;
    var updatedAt : Common.Timestamp;
  };

  public type DiagnosisStatus = { #pending_review; #confirmed; #rejected };

  public type DiagnosisRequest = {
    id : Common.DiagnosisId;
    requesterId : Common.UserId;
    diagnosisType : { #crop; #soil; #animal };
    description : Text;
    imageUrl : ?Text;
    imageData : ?Text;  // base64
    symptoms : [Text];
    cropType : ?Text;
    animalType : ?Text;
    animalId : ?Nat;
    location : ?Common.Location;
    createdAt : Common.Timestamp;
  };

  public type DiagnosisResult = {
    diagnosisId : Common.DiagnosisId;
    requestId : Common.DiagnosisId;
    possibleDisease : Text;
    confidencePercent : Nat;  // 0-100
    recommendedTreatments : [Text];
    preventionTips : [Text];
    var status : DiagnosisStatus;
    var reviewedBy : ?Common.UserId;
    var reviewNotes : ?Text;
    diagnosis : Text;  // kept for backward compat
    confidence : Float;
    recommendations : [Text];
    treatments : [Text];
    diagnosedAt : Common.Timestamp;
    diagnosedBy : { #ai; #specialist : Common.UserId };
  };

  public type SoilReport = {
    id : Nat;
    farmId : Nat;
    specialistId : Common.UserId;
    phLevel : Float;
    nutrients : { nitrogen : Float; phosphorus : Float; potassium : Float };
    texture : Text;
    recommendations : [Text];
    suitableCrops : [Text];
    createdAt : Common.Timestamp;
  };

  public type WeatherData = {
    location : Common.Location;
    temperature : Float;
    humidity : Float;
    rainfallMm : Float;
    forecast : Text;
    alert : ?Text;
    updatedAt : Common.Timestamp;
  };

  // Public API types
  public type CropListingPublic = {
    id : Common.ListingId;
    farmerId : Common.UserId;
    cropType : Text;
    quantityKg : Float;
    pricePerKg : Float;
    description : Text;
    imageUrl : ?Text;
    location : Common.Location;
    isAvailable : Bool;
    inquiryCount : Nat;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  // Immutable public view of DiagnosisResult
  public type DiagnosisResultPublic = {
    diagnosisId : Common.DiagnosisId;
    requestId : Common.DiagnosisId;
    possibleDisease : Text;
    confidencePercent : Nat;
    recommendedTreatments : [Text];
    preventionTips : [Text];
    status : DiagnosisStatus;
    reviewedBy : ?Common.UserId;
    reviewNotes : ?Text;
    diagnosis : Text;
    confidence : Float;
    recommendations : [Text];
    treatments : [Text];
    diagnosedAt : Common.Timestamp;
    diagnosedBy : { #ai; #specialist : Common.UserId };
  };
}
