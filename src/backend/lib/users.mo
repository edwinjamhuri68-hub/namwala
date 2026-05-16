import Option "mo:core/Option";
import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Types "../types/users";
import Common "../types/common";

module {
  // Registration
  public func register(
    users : List.List<Types.UserProfile>,
    name : Text,
    email : Text,
    phone : Text,
    nationalId : ?Text,
    role : Common.UserRole,
    location : Common.Location,
    passwordHash : Text
  ) : Types.UserProfile {
    let user : Types.UserProfile = {
      id = Principal.fromText("aaaaa-aa");  // placeholder — replaced by caller principal at API layer
      name;
      email;
      phone;
      nationalId;
      role;
      location;
      language = #english;
      var passwordHash;
      var isVerified = false;
      var isActive = true;
      var profilePictureUrl = null;
      createdAt = Time.now();
    };
    users.add(user);
    user;
  };

  // Register with a specific principal ID (used by mixin)
  public func registerWithId(
    users : List.List<Types.UserProfile>,
    id : Common.UserId,
    name : Text,
    email : Text,
    phone : Text,
    nationalId : ?Text,
    role : Common.UserRole,
    location : Common.Location,
    passwordHash : Text
  ) : Types.UserProfile {
    let user : Types.UserProfile = {
      id;
      name;
      email;
      phone;
      nationalId;
      role;
      location;
      language = #english;
      var passwordHash;
      var isVerified = false;
      var isActive = true;
      var profilePictureUrl = null;
      createdAt = Time.now();
    };
    users.add(user);
    user;
  };

  // OTP generation (simulated)
  public func generateOtp(
    otps : List.List<Types.OtpRecord>,
    identifier : Text
  ) : Text {
    let otp = "123456";  // Simulated fixed OTP for demo; real impl would use random
    let record : Types.OtpRecord = {
      identifier;
      otp;
      expiresAt = Time.now() + 600_000_000_000;  // 10 minutes in nanoseconds
      var isUsed = false;
    };
    otps.add(record);
    otp;
  };

  // OTP verification
  public func verifyOtp(
    otps : List.List<Types.OtpRecord>,
    identifier : Text,
    otp : Text
  ) : Bool {
    switch (otps.find(func(r) {
      r.identifier == identifier and r.otp == otp and not r.isUsed and r.expiresAt > Time.now()
    })) {
      case (?record) { record.isUsed := true; true };
      case null false;
    };
  };

  // Find user by principal
  public func getById(
    users : List.List<Types.UserProfile>,
    id : Common.UserId
  ) : ?Types.UserProfile {
    users.find(func(u) { u.id == id });
  };

  // Find user by email
  public func getByEmail(
    users : List.List<Types.UserProfile>,
    email : Text
  ) : ?Types.UserProfile {
    users.find(func(u) { u.email == email });
  };

  // Find user by phone
  public func getByPhone(
    users : List.List<Types.UserProfile>,
    phone : Text
  ) : ?Types.UserProfile {
    users.find(func(u) { u.phone == phone });
  };

  // Authenticate: check email or phone against password hash
  public func authenticate(
    users : List.List<Types.UserProfile>,
    identifier : Text,
    passwordHash : Text
  ) : ?Types.UserProfile {
    users.find(func(u) {
      (u.email == identifier or u.phone == identifier) and u.passwordHash == passwordHash and u.isActive
    });
  };

  // Update profile
  public func updateProfile(
    users : List.List<Types.UserProfile>,
    userId : Common.UserId,
    name : ?Text,
    location : ?Common.Location,
    language : ?Common.Language,
    profilePictureUrl : ?Text
  ) : Bool {
    let found = users.find(func(u) { u.id == userId });
    if (found.isNull()) return false;
    users.mapInPlace(func(u) {
      if (u.id != userId) return u;
      {
        id = u.id;
        name = switch (name) { case (?n) n; case null u.name };
        email = u.email;
        phone = u.phone;
        nationalId = u.nationalId;
        role = u.role;
        location = switch (location) { case (?l) l; case null u.location };
        language = switch (language) { case (?l) l; case null u.language };
        var passwordHash = u.passwordHash;
        var isVerified = u.isVerified;
        var isActive = u.isActive;
        var profilePictureUrl = switch (profilePictureUrl) { case (?url) ?url; case null u.profilePictureUrl };
        createdAt = u.createdAt;
      };
    });
    true;
  };

  // Convert to public type
  public func toPublic(
    user : Types.UserProfile,
    ratings : List.List<Types.RatingRecord>
  ) : Types.UserProfilePublic {
    let userRatings = ratings.filter(func(r) { r.toUserId == user.id });
    let count = userRatings.size();
    let sum = userRatings.foldLeft(0.0, func(acc, r) { acc + r.rating.toFloat() });
    let avg = if (count == 0) 0.0 else sum / count.toFloat();
    {
      id = user.id;
      name = user.name;
      email = user.email;
      phone = user.phone;
      role = user.role;
      location = user.location;
      language = user.language;
      isVerified = user.isVerified;
      profilePictureUrl = user.profilePictureUrl;
      averageRating = avg;
      ratingCount = count;
      createdAt = user.createdAt;
    };
  };

  // List users by role
  public func listByRole(
    users : List.List<Types.UserProfile>,
    ratings : List.List<Types.RatingRecord>,
    role : Common.UserRole
  ) : [Types.UserProfilePublic] {
    users.filter(func(u) { u.role == role and u.isActive })
      .map<Types.UserProfile, Types.UserProfilePublic>(func(u) { toPublic(u, ratings) })
      .toArray();
  };

  // Search specialists with optional filters
  public func searchSpecialists(
    users : List.List<Types.UserProfile>,
    ratings : List.List<Types.RatingRecord>,
    roleFilter : ?Common.UserRole,
    searchQuery : ?Text,
    location : ?Common.Location
  ) : [Types.UserProfilePublic] {
    let specialistRoles : [Common.UserRole] = [
      #agri_specialist, #veterinarian, #input_seller, #input_service_provider
    ];
    let isSpecialistRole = func(r : Common.UserRole) : Bool {
      specialistRoles.any(func(sr) { sr == r })
    };
    users.filter(func(u) {
      let roleMatch = switch (roleFilter) {
        case (?r) u.role == r;
        case null isSpecialistRole(u.role);
      };
      let queryMatch = switch (searchQuery) {
        case (?q) {
          let ql = q.toLower();
          u.name.toLower().contains(#text ql) or
          u.location.district.toLower().contains(#text ql) or
          u.location.region.toLower().contains(#text ql);
        };
        case null true;
      };
      let locationMatch = switch (location) {
        case (?loc) u.location.region == loc.region;
        case null true;
      };
      u.isActive and roleMatch and queryMatch and locationMatch;
    })
    .map<Types.UserProfile, Types.UserProfilePublic>(func(u) { toPublic(u, ratings) })
    .toArray();
  };

  // Rating helpers
  public func addRating(
    ratings : List.List<Types.RatingRecord>,
    nextId : Nat,
    fromUserId : Common.UserId,
    toUserId : Common.UserId,
    rating : Nat,
    comment : ?Text
  ) : Bool {
    if (rating < 1 or rating > 5) return false;
    if (fromUserId == toUserId) return false;
    let record : Types.RatingRecord = {
      id = nextId;
      fromUserId;
      toUserId;
      rating;
      comment;
      createdAt = Time.now();
    };
    ratings.add(record);
    true;
  };

  public func getUserRating(
    ratings : List.List<Types.RatingRecord>,
    userId : Common.UserId
  ) : Float {
    let userRatings = ratings.filter(func(r) { r.toUserId == userId });
    let count = userRatings.size();
    if (count == 0) return 0.0;
    let sum = userRatings.foldLeft(0.0, func(acc, r) { acc + r.rating.toFloat() });
    sum / count.toFloat();
  };
}
