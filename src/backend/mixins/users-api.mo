import List "mo:core/List";
import Time "mo:core/Time";
import Option "mo:core/Option";
import Runtime "mo:core/Runtime";
import UserLib "../lib/users";
import Types "../types/users";
import Common "../types/common";

mixin (
  users : List.List<Types.UserProfile>,
  farmerProfiles : List.List<Types.FarmerProfile>,
  livestockProfiles : List.List<Types.LivestockProfile>,
  specialistProfiles : List.List<Types.SpecialistProfile>,
  otps : List.List<Types.OtpRecord>,
  ratings : List.List<Types.RatingRecord>,
  nextRatingId : Nat
) {
  // Registration
  public shared ({ caller }) func registerUser(
    name : Text,
    email : Text,
    phone : Text,
    nationalId : ?Text,
    role : Common.UserRole,
    location : Common.Location,
    passwordHash : Text
  ) : async Types.UserProfilePublic {
    // Check duplicate email/phone
    if (UserLib.getByEmail(users, email).isSome()) {
      Runtime.trap("Email already registered");
    };
    let user = UserLib.registerWithId(users, caller, name, email, phone, nationalId, role, location, passwordHash);
    UserLib.toPublic(user, ratings);
  };

  // OTP management
  public shared func requestOtp(identifier : Text) : async Text {
    UserLib.generateOtp(otps, identifier);
  };

  public shared func verifyOtp(identifier : Text, otp : Text) : async Bool {
    UserLib.verifyOtp(otps, identifier, otp);
  };

  // Login
  public shared ({ caller }) func login(
    identifier : Text,
    passwordHash : Text
  ) : async ?Types.UserProfilePublic {
    switch (UserLib.authenticate(users, identifier, passwordHash)) {
      case (?user) ?UserLib.toPublic(user, ratings);
      case null null;
    };
  };

  // Profile
  public query ({ caller }) func getMyProfile() : async ?Types.UserProfilePublic {
    switch (UserLib.getById(users, caller)) {
      case (?user) ?UserLib.toPublic(user, ratings);
      case null null;
    };
  };

  public shared ({ caller }) func updateMyProfile(
    name : ?Text,
    location : ?Common.Location,
    language : ?Common.Language,
    profilePictureData : ?Text
  ) : async Bool {
    UserLib.updateProfile(users, caller, name, location, language, profilePictureData);
  };

  public shared ({ caller }) func changePassword(
    oldPasswordHash : Text,
    newPasswordHash : Text
  ) : async Bool {
    switch (UserLib.getById(users, caller)) {
      case (?user) {
        if (user.passwordHash != oldPasswordHash) return false;
        user.passwordHash := newPasswordHash;
        true;
      };
      case null false;
    };
  };

  // Specialist lookup with optional filters
  public query func listSpecialists(
    roleFilter : ?Common.UserRole,
    searchQuery : ?Text,
    location : ?Common.Location
  ) : async [Types.UserProfilePublic] {
    UserLib.searchSpecialists(users, ratings, roleFilter, searchQuery, location);
  };

  public query func getUserProfile(userId : Common.UserId) : async ?Types.UserProfilePublic {
    switch (UserLib.getById(users, userId)) {
      case (?user) ?UserLib.toPublic(user, ratings);
      case null null;
    };
  };

  public query func getUserRatings(userId : Common.UserId) : async [Types.RatingRecord] {
    ratings.filter(func(r) { r.toUserId == userId }).toArray();
  };

  // Ratings
  public query func getUserRating(userId : Common.UserId) : async Float {
    UserLib.getUserRating(ratings, userId);
  };

  public shared ({ caller }) func rateUser(
    userId : Common.UserId,
    rating : Nat,
    comment : ?Text
  ) : async Bool {
    if (rating < 1 or rating > 5) Runtime.trap("Rating must be between 1 and 5");
    if (caller == userId) Runtime.trap("Cannot rate yourself");
    // Only allow rating if target user exists
    if (UserLib.getById(users, userId).isNull()) return false;
    let id = ratings.size();
    UserLib.addRating(ratings, id, caller, userId, rating, comment);
  };

  // Role-specific profile setup
  public shared ({ caller }) func setupFarmerProfile(
    farmSize : Float,
    cropTypes : [Text],
    soilType : ?Text
  ) : async Bool {
    let profile : Types.FarmerProfile = {
      userId = caller;
      farmSize;
      cropTypes;
      soilType;
      irrigationType = null;
    };
    farmerProfiles.add(profile);
    true;
  };

  public shared ({ caller }) func setupLivestockProfile(
    animalTypes : [Text],
    totalHeadCount : Nat
  ) : async Bool {
    switch (UserLib.getById(users, caller)) {
      case (?user) {
        let profile : Types.LivestockProfile = {
          userId = caller;
          animalTypes;
          totalHeadCount;
          farmLocation = user.location;
        };
        livestockProfiles.add(profile);
        true;
      };
      case null false;
    };
  };
}
