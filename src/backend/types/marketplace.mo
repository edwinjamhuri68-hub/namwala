import Common "common";

module {
  public type Listing = {
    id : Common.ListingId;
    sellerId : Common.UserId;
    listingType : Common.ListingType;
    title : Text;
    description : Text;
    price : Float;
    quantity : ?Float;
    unit : ?Text;
    location : Common.Location;
    imageUrls : [Text];
    tags : [Text];
    var isActive : Bool;
    var inquiryCount : Nat;
    createdAt : Common.Timestamp;
    var updatedAt : Common.Timestamp;
  };

  public type Order = {
    id : Common.OrderId;
    buyerId : Common.UserId;
    sellerId : Common.UserId;
    listingId : Common.ListingId;
    quantity : Float;
    totalPrice : Float;
    var status : Common.OrderStatus;
    deliveryAddress : Common.Location;
    notes : Text;
    createdAt : Common.Timestamp;
    var updatedAt : Common.Timestamp;
  };

  public type InputProduct = {
    id : Nat;
    sellerId : Common.UserId;
    name : Text;
    category : { #seeds; #fertilizer; #pesticide; #feed; #equipment; #other };
    description : Text;
    pricePerUnit : Float;
    unit : Text;
    var stockQuantity : Float;
    imageUrl : ?Text;
    var isAvailable : Bool;
    var inquiryCount : Nat;
    createdAt : Common.Timestamp;
    var updatedAt : Common.Timestamp;
  };

  public type ServiceListing = {
    id : Nat;
    providerId : Common.UserId;
    serviceType : Text;
    description : Text;
    priceRange : { min : Float; max : Float };
    coverageAreas : [Text];
    equipment : [Text];
    var isAvailable : Bool;
    var inquiryCount : Nat;
    createdAt : Common.Timestamp;
    var updatedAt : Common.Timestamp;
  };

  public type TransportListing = {
    id : Nat;
    providerId : Common.UserId;
    vehicleType : Text;
    capacityTons : Float;
    pricePerKm : Float;
    coverageAreas : [Text];
    var isAvailable : Bool;
    var inquiryCount : Nat;
    createdAt : Common.Timestamp;
    var updatedAt : Common.Timestamp;
  };

  public type Booking = {
    id : Nat;
    clientId : Common.UserId;
    providerId : Common.UserId;
    serviceId : Nat;
    scheduledAt : Common.Timestamp;
    location : Common.Location;
    var status : { #pending; #confirmed; #in_progress; #completed; #cancelled };
    totalPrice : Float;
    notes : Text;
    createdAt : Common.Timestamp;
  };

  // ---- Public (immutable, shareable) types ----

  public type ListingPublic = {
    id : Common.ListingId;
    sellerId : Common.UserId;
    listingType : Common.ListingType;
    title : Text;
    description : Text;
    price : Float;
    quantity : ?Float;
    unit : ?Text;
    location : Common.Location;
    imageUrls : [Text];
    tags : [Text];
    isActive : Bool;
    inquiryCount : Nat;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type OrderPublic = {
    id : Common.OrderId;
    buyerId : Common.UserId;
    sellerId : Common.UserId;
    listingId : Common.ListingId;
    quantity : Float;
    totalPrice : Float;
    status : Common.OrderStatus;
    notes : Text;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type InputProductPublic = {
    id : Nat;
    sellerId : Common.UserId;
    name : Text;
    category : { #seeds; #fertilizer; #pesticide; #feed; #equipment; #other };
    description : Text;
    pricePerUnit : Float;
    unit : Text;
    stockQuantity : Float;
    imageUrl : ?Text;
    isAvailable : Bool;
    inquiryCount : Nat;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type ServiceListingPublic = {
    id : Nat;
    providerId : Common.UserId;
    serviceType : Text;
    description : Text;
    priceRange : { min : Float; max : Float };
    coverageAreas : [Text];
    equipment : [Text];
    isAvailable : Bool;
    inquiryCount : Nat;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type TransportListingPublic = {
    id : Nat;
    providerId : Common.UserId;
    vehicleType : Text;
    capacityTons : Float;
    pricePerKm : Float;
    coverageAreas : [Text];
    isAvailable : Bool;
    inquiryCount : Nat;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type BookingPublic = {
    id : Nat;
    clientId : Common.UserId;
    providerId : Common.UserId;
    serviceId : Nat;
    scheduledAt : Common.Timestamp;
    location : Common.Location;
    status : { #pending; #confirmed; #in_progress; #completed; #cancelled };
    totalPrice : Float;
    notes : Text;
    createdAt : Common.Timestamp;
  };

  // ---- Filter types ----

  public type ListingFilter = {
    listingType : ?Common.ListingType;
    region : ?Text;
    searchTerm : ?Text;
    priceMin : ?Float;
    priceMax : ?Float;
    activeOnly : Bool;
  };
}
