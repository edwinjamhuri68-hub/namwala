import Common "common";

module {
  public type UserProfile = {
    id : Common.UserId;
    name : Text;
    email : Text;
    phone : Text;
    nationalId : ?Text;
    role : Common.UserRole;
    location : Common.Location;
    language : Common.Language;
    var passwordHash : Text;
    var isVerified : Bool;
    var isActive : Bool;
    var profilePictureUrl : ?Text;
    createdAt : Common.Timestamp;
  };

  // Role-specific profile extensions
  public type FarmerProfile = {
    userId : Common.UserId;
    farmSize : Float;  // hectares
    cropTypes : [Text];
    soilType : ?Text;
    irrigationType : ?Text;
  };

  public type LivestockProfile = {
    userId : Common.UserId;
    animalTypes : [Text];
    totalHeadCount : Nat;
    farmLocation : Common.Location;
  };

  public type SpecialistProfile = {
    userId : Common.UserId;
    specialization : Text;
    qualifications : [Text];
    yearsExperience : Nat;
    var isAvailable : Bool;
  };

  public type InputSellerProfile = {
    userId : Common.UserId;
    businessName : Text;
    businessLocation : Common.Location;
    productCategories : [Text];
  };

  public type ServiceProviderProfile = {
    userId : Common.UserId;
    businessName : Text;
    serviceTypes : [Text];
    coverageArea : [Text];
    var isAvailable : Bool;
  };

  public type TransportProfile = {
    userId : Common.UserId;
    businessName : Text;
    vehicleTypes : [Text];
    coverageAreas : [Text];
    var isAvailable : Bool;
  };

  public type BuyerProfile = {
    userId : Common.UserId;
    businessName : ?Text;
    preferredCategories : [Text];
  };

  // OTP for registration/login
  public type OtpRecord = {
    identifier : Text;  // phone or email
    otp : Text;
    expiresAt : Common.Timestamp;
    var isUsed : Bool;
  };

  // Public API types (no var fields, shared)
  public type UserProfilePublic = {
    id : Common.UserId;
    name : Text;
    email : Text;
    phone : Text;
    role : Common.UserRole;
    location : Common.Location;
    language : Common.Language;
    isVerified : Bool;
    profilePictureUrl : ?Text;
    averageRating : Float;
    ratingCount : Nat;
    createdAt : Common.Timestamp;
  };

  public type RatingRecord = {
    id : Nat;
    fromUserId : Common.UserId;
    toUserId : Common.UserId;
    rating : Nat;  // 1-5
    comment : ?Text;
    createdAt : Common.Timestamp;
  };
}
