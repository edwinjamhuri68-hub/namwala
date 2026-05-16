import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/farm";
import Common "../types/common";

module {
  // Farm records
  public func createFarm(
    farms : List.List<Types.FarmRecord>,
    nextId : Nat,
    farmerId : Common.UserId,
    name : Text,
    location : Common.Location,
    sizeHectares : Float,
    cropTypes : [Text]
  ) : Types.FarmRecord {
    let farm : Types.FarmRecord = {
      id = nextId;
      farmerId;
      name;
      location;
      sizeHectares;
      cropTypes;
      soilPh = null;
      soilType = null;
      createdAt = Time.now();
    };
    farms.add(farm);
    farm;
  };

  public func getFarmsByFarmer(
    farms : List.List<Types.FarmRecord>,
    farmerId : Common.UserId
  ) : [Types.FarmRecord] {
    farms.filter(func(f) { f.farmerId == farmerId }).toArray();
  };

  // Crop listings
  public func createCropListing(
    listings : List.List<Types.CropListing>,
    nextId : Common.ListingId,
    farmerId : Common.UserId,
    cropType : Text,
    quantityKg : Float,
    pricePerKg : Float,
    description : Text,
    imageUrl : ?Text,
    location : Common.Location
  ) : Types.CropListing {
    let listing : Types.CropListing = {
      id = nextId;
      farmerId;
      cropType;
      quantityKg;
      pricePerKg;
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

  public func getCropListings(
    listings : List.List<Types.CropListing>,
    farmerId : ?Common.UserId
  ) : [Types.CropListingPublic] {
    let filtered = switch (farmerId) {
      case (?fid) listings.filter(func(l) { l.farmerId == fid and l.isAvailable });
      case null listings.filter(func(l) { l.isAvailable });
    };
    filtered.map<Types.CropListing, Types.CropListingPublic>(func(l) {
      { l with isAvailable = l.isAvailable; inquiryCount = l.inquiryCount; updatedAt = l.updatedAt }
    }).toArray();
  };

  public func deactivateCropListing(
    listings : List.List<Types.CropListing>,
    listingId : Common.ListingId,
    farmerId : Common.UserId
  ) : Bool {
    switch (listings.find(func(l) { l.id == listingId and l.farmerId == farmerId })) {
      case (?listing) { listing.isAvailable := false; true };
      case null false;
    };
  };

  public func updateCropListing(
    listings : List.List<Types.CropListing>,
    listingId : Common.ListingId,
    farmerId : Common.UserId,
    quantityKg : ?Float,
    pricePerKg : ?Float,
    description : ?Text,
    imageUrl : ?Text
  ) : ?Types.CropListingPublic {
    switch (listings.find(func(l) { l.id == listingId and l.farmerId == farmerId })) {
      case null null;
      case (?listing) {
        switch (quantityKg) { case (?q) { ignore q }; case null {} }; // quantityKg is immutable
        switch (description) { case (?d) { ignore d }; case null {} }; // description is immutable
        switch (imageUrl) { case (?u) { ignore u }; case null {} }; // imageUrl is immutable
        switch (pricePerKg) { case (?p) { ignore p }; case null {} }; // pricePerKg is immutable
        listing.updatedAt := Time.now();
        ?{ listing with isAvailable = listing.isAvailable; inquiryCount = listing.inquiryCount; updatedAt = listing.updatedAt };
      };
    };
  };

  public func toggleCropListingActive(
    listings : List.List<Types.CropListing>,
    listingId : Common.ListingId,
    farmerId : Common.UserId,
    active : Bool
  ) : Bool {
    switch (listings.find(func(l) { l.id == listingId and l.farmerId == farmerId })) {
      case (?listing) { listing.isAvailable := active; true };
      case null false;
    };
  };

  public func incrementCropInquiry(
    listings : List.List<Types.CropListing>,
    listingId : Common.ListingId
  ) : Bool {
    switch (listings.find(func(l) { l.id == listingId })) {
      case (?listing) { listing.inquiryCount += 1; true };
      case null false;
    };
  };

  public func getCropListingsByFarmer(
    listings : List.List<Types.CropListing>,
    farmerId : Common.UserId
  ) : [Types.CropListingPublic] {
    listings
      .filter(func(l) { l.farmerId == farmerId })
      .map<Types.CropListing, Types.CropListingPublic>(func(l) {
        { l with isAvailable = l.isAvailable; inquiryCount = l.inquiryCount; updatedAt = l.updatedAt }
      })
      .toArray();
  };

  // AI Diagnosis — smart mock responses based on crop type and symptoms
  public func submitDiagnosis(
    requests : List.List<Types.DiagnosisRequest>,
    nextId : Common.DiagnosisId,
    requesterId : Common.UserId,
    diagnosisType : { #crop; #soil; #animal },
    description : Text,
    imageUrl : ?Text,
    imageData : ?Text,
    symptoms : [Text],
    cropType : ?Text,
    animalType : ?Text,
    animalId : ?Nat,
    location : ?Common.Location
  ) : Types.DiagnosisRequest {
    let req : Types.DiagnosisRequest = {
      id = nextId;
      requesterId;
      diagnosisType;
      description;
      imageUrl;
      imageData;
      symptoms;
      cropType;
      animalType;
      animalId;
      location;
      createdAt = Time.now();
    };
    requests.add(req);
    req;
  };

  // Select disease name based on crop type for smart mock
  func cropDiseaseFor(cropType : ?Text, symptoms : [Text]) : (Text, Nat, [Text], [Text]) {
    let crop = switch (cropType) { case (?c) c; case null "" };
    let hasSpot = symptoms.any(func(s) { s.toLower().contains(#text "spot") or s.toLower().contains(#text "doa") });
    let hasWilt = symptoms.any(func(s) { s.toLower().contains(#text "wilt") or s.toLower().contains(#text "nyauka") });
    let hasYellow = symptoms.any(func(s) { s.toLower().contains(#text "yellow") or s.toLower().contains(#text "njano") });
    if (crop.toLower().contains(#text "maize") or crop.toLower().contains(#text "mahindi")) {
      if (hasSpot) (
        "Maize Gray Leaf Spot (Cercospora zeae-maydis)",
        82,
        ["Apply fungicide (Mancozeb 80% WP) at 2kg/ha", "Remove infected leaves and burn them", "Avoid overhead irrigation"],
        ["Plant resistant varieties like H614D", "Crop rotation every 2 seasons", "Ensure proper plant spacing"]
      ) else if (hasWilt) (
        "Maize Lethal Necrosis (MLND)",
        75,
        ["Remove and destroy all infected plants immediately", "No chemical cure available — prevent spread", "Consult an agricultural specialist"],
        ["Use certified disease-free seed", "Control aphid and thrips vectors", "Practice crop rotation with legumes"]
      ) else (
        "Northern Corn Leaf Blight (Exserohilum turcicum)",
        70,
        ["Apply systemic fungicide (Propiconazole 25% EC)", "Remove severely infected plant material"],
        ["Plant tolerant varieties", "Scout fields regularly during vegetative stage"]
      )
    } else if (crop.toLower().contains(#text "tomato") or crop.toLower().contains(#text "nyanya")) {
      if (hasSpot) (
        "Bacterial Speck (Pseudomonas syringae)",
        78,
        ["Spray copper-based bactericide (Copper Oxychloride 50% WP)", "Remove infected plant parts", "Avoid working in wet fields"],
        ["Use certified disease-free seedlings", "Avoid overhead irrigation", "Maintain field sanitation"]
      ) else if (hasYellow) (
        "Tomato Yellow Leaf Curl Virus (TYLCV)",
        85,
        ["Remove and destroy infected plants", "Control whitefly populations with imidacloprid", "Use reflective mulch to deter vectors"],
        ["Plant TYLCV-resistant varieties", "Use insect-proof nets in nursery", "Monitor and control whitefly weekly"]
      ) else (
        "Early Blight (Alternaria solani)",
        73,
        ["Apply Chlorothalonil fungicide (2.5g/L water)", "Remove lower infected leaves"],
        ["Avoid water stress", "Practice 2-year crop rotation", "Mulch to reduce soil splash"]
      )
    } else if (crop.toLower().contains(#text "bean") or crop.toLower().contains(#text "maharagwe")) {
      (
        "Bean Common Mosaic Virus (BCMV)",
        71,
        ["Remove and destroy infected plants", "Control aphid vectors with insecticidal soap"],
        ["Use virus-free certified seed", "Plant resistant varieties", "Control aphid populations"]
      )
    } else if (hasYellow) (
      "Nitrogen Deficiency",
      65,
      ["Apply urea fertilizer (46-0-0) at 50kg/ha", "Top-dress with CAN fertilizer"],
      ["Conduct soil tests before planting", "Practice crop rotation with legumes", "Apply organic manure"]
    ) else (
      "Fungal Leaf Disease (Unspecified)",
      60,
      ["Apply broad-spectrum fungicide (Mancozeb 80% WP)", "Improve field drainage", "Remove and destroy infected plant material"],
      ["Ensure proper spacing for air circulation", "Avoid excess nitrogen fertilizer", "Regular field scouting"]
    )
  };

  // Select disease based on animal type for smart mock
  func animalDiseaseFor(animalType : ?Text, symptoms : [Text]) : (Text, Nat, [Text], [Text]) {
    let animal = switch (animalType) { case (?a) a; case null "" };
    let hasFever = symptoms.any(func(s) { s.toLower().contains(#text "fever") or s.toLower().contains(#text "homa") });
    let hasLameness = symptoms.any(func(s) { s.toLower().contains(#text "lame") or s.toLower().contains(#text "kiguu") });
    let hasDiarrhea = symptoms.any(func(s) { s.toLower().contains(#text "diarrhea") or s.toLower().contains(#text "kuhara") });
    if (animal.toLower().contains(#text "cattle") or animal.toLower().contains(#text "ng'ombe") or animal.toLower().contains(#text "cow")) {
      if (hasLameness) (
        "Foot and Mouth Disease (FMD)",
        88,
        ["Isolate affected animals immediately", "Clean and disinfect hooves with iodine solution", "Contact veterinary officer — FMD is notifiable", "Provide soft feed and clean water"],
        ["Vaccinate annually with FMD polyvalent vaccine", "Restrict animal movement from infected areas", "Regular hoof inspection and trimming"]
      ) else if (hasFever) (
        "East Coast Fever (ECF) — Theileria parva",
        83,
        ["Administer Buparvaquone (Butalex) 2.5mg/kg IM immediately", "Reduce stress — provide shade and clean water", "Consult veterinarian for supportive therapy"],
        ["Tick control using acaricide dips every 7-14 days", "Vaccinate with ECF ITM vaccine", "Regular inspection for tick infestation"]
      ) else if (hasDiarrhea) (
        "Bovine Viral Diarrhea (BVD)",
        72,
        ["Provide oral rehydration therapy (ORS)", "Administer antibiotics to prevent secondary infection", "Isolate affected animals"],
        ["Vaccinate breeding stock against BVD", "Biosecurity measures for new animals", "Regular fecal screening"]
      ) else (
        "Trypanosomiasis (Nagana)",
        68,
        ["Administer Diminazene Aceturate (Berenil) 3.5mg/kg IM", "Supportive care with iron supplements"],
        ["Tsetse fly control using insecticide-treated traps", "Avoid grazing near tsetse habitats", "Regular blood smear screening"]
      )
    } else if (animal.toLower().contains(#text "goat") or animal.toLower().contains(#text "mbuzi")) {
      if (hasDiarrhea) (
        "Peste des Petits Ruminants (PPR)",
        86,
        ["No specific treatment — supportive care only", "Isolate affected animals", "Report to veterinary authorities — PPR is notifiable"],
        ["Annual vaccination with PPR live attenuated vaccine", "Quarantine new animals for 14 days", "Restrict contact with wildlife"]
      ) else if (hasFever) (
        "Contagious Caprine Pleuropneumonia (CCPP)",
        79,
        ["Administer Tylosin or Oxytetracycline antibiotics", "Provide supportive care and reduce stress"],
        ["Annual CCPP vaccination", "Avoid mixing flocks from different sources", "Good ventilation in housing"]
      ) else (
        "Caseous Lymphadenitis (CLA)",
        65,
        ["Surgical removal and flushing of abscesses with iodine", "Antibiotic treatment post-surgery"],
        ["Cull chronically infected animals", "Vaccinate with CLA bacterin", "Avoid shearing injuries"]
      )
    } else if (animal.toLower().contains(#text "poultry") or animal.toLower().contains(#text "kuku") or animal.toLower().contains(#text "chicken")) {
      if (hasDiarrhea) (
        "Newcastle Disease (NDV)",
        90,
        ["No effective treatment — cull affected birds humanely", "Vaccinate remaining flock immediately with La Sota vaccine", "Disinfect all housing and equipment"],
        ["Vaccinate at day 7, 21 and every 3 months thereafter", "Biosecurity: limit visitor access to poultry area", "Avoid mixing birds of different ages"]
      ) else (
        "Infectious Bursal Disease (Gumboro)",
        75,
        ["Provide electrolytes and vitamins in water", "Reduce stocking density", "Consult vet for antiviral support"],
        ["Vaccinate at day 14 and day 28", "Maintain strict biosecurity", "Clean and disinfect houses between flocks"]
      )
    } else (
      "Unidentified Infectious Condition",
      60,
      ["Isolate affected animals", "Consult a veterinarian for proper diagnosis", "Provide supportive care — clean water, shade, good nutrition"],
      ["Regular veterinary health checks", "Vaccination schedule per species", "Good hygiene and biosecurity practices"]
    )
  };

  public func simulateCropDiagnosis(
    request : Types.DiagnosisRequest
  ) : Types.DiagnosisResult {
    let (disease, confidence, treatments, prevention) = cropDiseaseFor(request.cropType, request.symptoms);
    {
      diagnosisId = request.id;
      requestId = request.id;
      possibleDisease = disease;
      confidencePercent = confidence;
      recommendedTreatments = treatments;
      preventionTips = prevention;
      var status = #pending_review;
      var reviewedBy = null;
      var reviewNotes = null;
      diagnosis = disease;
      confidence = confidence.toFloat() / 100.0;
      recommendations = prevention;
      treatments = treatments;
      diagnosedAt = Time.now();
      diagnosedBy = #ai;
    };
  };

  public func simulateAnimalDiagnosis(
    request : Types.DiagnosisRequest
  ) : Types.DiagnosisResult {
    let (disease, confidence, treatments, prevention) = animalDiseaseFor(request.animalType, request.symptoms);
    {
      diagnosisId = request.id;
      requestId = request.id;
      possibleDisease = disease;
      confidencePercent = confidence;
      recommendedTreatments = treatments;
      preventionTips = prevention;
      var status = #pending_review;
      var reviewedBy = null;
      var reviewNotes = null;
      diagnosis = disease;
      confidence = confidence.toFloat() / 100.0;
      recommendations = prevention;
      treatments = treatments;
      diagnosedAt = Time.now();
      diagnosedBy = #ai;
    };
  };

  // Legacy wrapper
  public func simulateDiagnosis(request : Types.DiagnosisRequest) : Types.DiagnosisResult {
    switch (request.diagnosisType) {
      case (#animal) simulateAnimalDiagnosis(request);
      case _ simulateCropDiagnosis(request);
    };
  };

  public func toResultPublic(r : Types.DiagnosisResult) : Types.DiagnosisResultPublic {
    {
      r with
      status = r.status;
      reviewedBy = r.reviewedBy;
      reviewNotes = r.reviewNotes;
    };
  };

  public func getDiagnosisResults(
    requests : List.List<Types.DiagnosisRequest>,
    results : List.List<Types.DiagnosisResult>,
    requesterId : Common.UserId
  ) : [(Types.DiagnosisRequest, ?Types.DiagnosisResultPublic)] {
    let myRequests = requests.filter(func(req) { req.requesterId == requesterId });
    myRequests.map<Types.DiagnosisRequest, (Types.DiagnosisRequest, ?Types.DiagnosisResultPublic)>(func(req) {
      let result = results.find(func(r) { r.requestId == req.id });
      (req, switch (result) { case (?r) ?toResultPublic(r); case null null })
    }).toArray();
  };

  public func getDiagnosisById(
    requests : List.List<Types.DiagnosisRequest>,
    results : List.List<Types.DiagnosisResult>,
    diagnosisId : Common.DiagnosisId,
    caller : Common.UserId,
    callerRole : { #owner; #specialist; #any }
  ) : ?(Types.DiagnosisRequest, ?Types.DiagnosisResultPublic) {
    switch (requests.find(func(req) { req.id == diagnosisId })) {
      case null null;
      case (?req) {
        let canView = req.requesterId == caller or callerRole == #specialist or callerRole == #any;
        if (not canView) return null;
        let result = results.find(func(r) { r.requestId == req.id });
        ?(req, switch (result) { case (?r) ?toResultPublic(r); case null null })
      };
    };
  };

  public func reviewDiagnosis(
    results : List.List<Types.DiagnosisResult>,
    diagnosisId : Common.DiagnosisId,
    reviewerId : Common.UserId,
    newStatus : { #confirmed; #rejected },
    notes : ?Text
  ) : ?Types.DiagnosisResultPublic {
    switch (results.find(func(r) { r.requestId == diagnosisId })) {
      case null null;
      case (?result) {
        let status : Types.DiagnosisStatus = switch (newStatus) {
          case (#confirmed) #confirmed;
          case (#rejected) #rejected;
        };
        result.status := status;
        result.reviewedBy := ?reviewerId;
        result.reviewNotes := notes;
        ?toResultPublic(result);
      };
    };
  };

  // Weather (simulated)
  public func getWeatherForLocation(location : Common.Location) : Types.WeatherData {
    let regionLower = location.region.toLower();
    let (temp, rain, forecast, alert) = if (regionLower.contains(#text "dodoma") or regionLower.contains(#text "singida")) {
      (32.5, 15.0, "Hot and dry. Minimal rainfall expected this week. Risk of drought conditions.", ?("Drought alert: Consider irrigation for crops"))
    } else if (regionLower.contains(#text "kilimanjaro") or regionLower.contains(#text "arusha")) {
      (22.0, 65.0, "Cool and partly cloudy. Moderate rainfall. Good conditions for farming.", null)
    } else if (regionLower.contains(#text "dar es salaam") or regionLower.contains(#text "pwani") or regionLower.contains(#text "coast")) {
      (30.0, 80.0, "Hot and humid. Heavy rainfall possible. Risk of flooding in low areas.", ?("Heavy rain warning: Secure livestock and check drainage"))
    } else if (regionLower.contains(#text "mbeya") or regionLower.contains(#text "iringa") or regionLower.contains(#text "njombe")) {
      (18.0, 90.0, "Cool with heavy rainfall. Excellent conditions for highland crops.", null)
    } else {
      (27.0, 55.0, "Warm with moderate rainfall. Average conditions for most crops.", null)
    };
    {
      location;
      temperature = temp;
      humidity = 65.0;
      rainfallMm = rain;
      forecast;
      alert;
      updatedAt = Time.now();
    };
  };

  // Soil reports
  public func createSoilReport(
    reports : List.List<Types.SoilReport>,
    nextId : Nat,
    farmId : Nat,
    specialistId : Common.UserId,
    phLevel : Float,
    nitrogen : Float,
    phosphorus : Float,
    potassium : Float,
    texture : Text,
    suitableCrops : [Text]
  ) : Types.SoilReport {
    let recommendations : [Text] = if (phLevel < 5.5) {
      ["Apply agricultural lime to raise pH", "Add organic matter to improve soil structure", "Conduct follow-up test in 3 months"]
    } else if (phLevel > 7.5) {
      ["Apply sulfur to reduce pH", "Use acidifying fertilizers like ammonium sulfate", "Improve organic matter content"]
    } else {
      ["pH is optimal — maintain with regular organic matter addition", "Follow balanced NPK fertilization program"]
    };
    let report : Types.SoilReport = {
      id = nextId;
      farmId;
      specialistId;
      phLevel;
      nutrients = { nitrogen; phosphorus; potassium };
      texture;
      recommendations;
      suitableCrops;
      createdAt = Time.now();
    };
    reports.add(report);
    report;
  };

  public func getSoilReports(
    reports : List.List<Types.SoilReport>,
    farmId : Nat
  ) : [Types.SoilReport] {
    reports.filter(func(r) { r.farmId == farmId }).toArray();
  };
}
