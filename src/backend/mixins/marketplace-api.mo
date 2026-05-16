import List "mo:core/List";
import MarketplaceLib "../lib/marketplace";
import MTypes "../types/marketplace";
import Common "../types/common";

mixin (
  listings : List.List<MTypes.Listing>,
  orders : List.List<MTypes.Order>,
  inputProducts : List.List<MTypes.InputProduct>,
  serviceListings : List.List<MTypes.ServiceListing>,
  transportListings : List.List<MTypes.TransportListing>,
  bookings : List.List<MTypes.Booking>,
  nextListingId : Nat,
  nextOrderId : Nat,
  nextProductId : Nat,
  nextServiceId : Nat,
  nextTransportId : Nat,
  nextBookingId : Nat
) {
  // ---- General listings ----

  public shared ({ caller }) func createListing(
    listingType : Common.ListingType,
    title : Text,
    description : Text,
    price : Float,
    quantity : ?Float,
    unit : ?Text,
    location : Common.Location,
    imageUrls : [Text],
    tags : [Text]
  ) : async MTypes.ListingPublic {
    let id = listings.size();

    let listing = MarketplaceLib.createListing(listings, id, caller, listingType, title, description, price, quantity, unit, location, imageUrls, tags);
    MarketplaceLib.toPublicListing(listing);
  };

  public query func getListings(
    listingType : ?Common.ListingType,
    region : ?Text,
    searchTerm : ?Text,
    priceMin : ?Float,
    priceMax : ?Float
  ) : async [MTypes.ListingPublic] {
    let filter : MTypes.ListingFilter = {
      listingType;
      region;
      searchTerm;
      priceMin;
      priceMax;
      activeOnly = true;
    };
    MarketplaceLib.getListings(listings, filter);
  };

  public query func getListingById(id : Common.ListingId) : async ?MTypes.ListingPublic {
    MarketplaceLib.getListingById(listings, id);
  };

  public query ({ caller }) func getMyListings() : async [MTypes.ListingPublic] {
    MarketplaceLib.getListingsBySeller(listings, caller);
  };

  /// Update mutable fields of a caller-owned listing.
  public shared ({ caller }) func updateListing(
    id : Common.ListingId,
    title : ?Text,
    description : ?Text,
    price : ?Float,
    quantity : ?Float,
    imageUrls : ?[Text]
  ) : async ?MTypes.ListingPublic {
    MarketplaceLib.updateListing(listings, id, caller, title, description, price, quantity, imageUrls);
  };

  /// Pause (deactivate) a caller-owned listing without deleting it.
  public shared ({ caller }) func pauseListing(id : Common.ListingId) : async Bool {
    MarketplaceLib.toggleListingActive(listings, id, caller, false);
  };

  /// Resume (reactivate) a caller-owned paused listing.
  public shared ({ caller }) func resumeListing(id : Common.ListingId) : async Bool {
    MarketplaceLib.toggleListingActive(listings, id, caller, true);
  };

  /// Permanently deactivate / soft-delete a caller-owned listing.
  public shared ({ caller }) func deactivateListing(id : Common.ListingId) : async Bool {
    MarketplaceLib.deactivateListing(listings, id, caller);
  };

  /// Called when a buyer opens a conversation linked to this listing.
  public shared func incrementListingInquiry(id : Common.ListingId) : async Bool {
    MarketplaceLib.incrementListingInquiry(listings, id);
  };

  // ---- Orders ----

  public shared ({ caller }) func placeOrder(
    listingId : Common.ListingId,
    sellerId : Common.UserId,
    quantity : Float,
    totalPrice : Float,
    deliveryAddress : Common.Location,
    notes : Text
  ) : async MTypes.OrderPublic {
    let id = orders.size();
    let order = MarketplaceLib.createOrder(orders, id, caller, sellerId, listingId, quantity, totalPrice, deliveryAddress, notes);
    MarketplaceLib.toPublicOrder(order);
  };

  public shared ({ caller }) func updateOrderStatus(
    orderId : Common.OrderId,
    newStatus : Common.OrderStatus
  ) : async Bool {
    MarketplaceLib.updateOrderStatus(orders, orderId, caller, newStatus);
  };

  public query ({ caller }) func getMyOrders() : async [MTypes.OrderPublic] {
    MarketplaceLib.getOrdersByBuyer(orders, caller);
  };

  public query ({ caller }) func getMySales() : async [MTypes.OrderPublic] {
    MarketplaceLib.getOrdersBySeller(orders, caller);
  };

  // ---- Input products ----

  public shared ({ caller }) func addInputProduct(
    name : Text,
    category : { #seeds; #fertilizer; #pesticide; #feed; #equipment; #other },
    description : Text,
    pricePerUnit : Float,
    unit : Text,
    stockQuantity : Float,
    imageUrl : ?Text
  ) : async MTypes.InputProductPublic {
    let id = inputProducts.size();
    let product = MarketplaceLib.createInputProduct(inputProducts, id, caller, name, category, description, pricePerUnit, unit, stockQuantity, imageUrl);
    MarketplaceLib.toPublicInputProduct(product);
  };

  public query func getInputProducts(sellerId : ?Common.UserId) : async [MTypes.InputProductPublic] {
    MarketplaceLib.getInputProducts(inputProducts, sellerId);
  };

  public query ({ caller }) func getMyInputProducts() : async [MTypes.InputProductPublic] {
    MarketplaceLib.getInputProducts(inputProducts, ?caller);
  };

  public shared ({ caller }) func updateInputProduct(
    id : Nat,
    name : ?Text,
    description : ?Text,
    pricePerUnit : ?Float,
    stockQuantity : ?Float,
    imageUrl : ?Text
  ) : async ?MTypes.InputProductPublic {
    MarketplaceLib.updateInputProduct(inputProducts, id, caller, name, description, pricePerUnit, stockQuantity, imageUrl);
  };

  public shared ({ caller }) func pauseInputProduct(id : Nat) : async Bool {
    MarketplaceLib.toggleInputAvailable(inputProducts, id, caller, false);
  };

  public shared ({ caller }) func resumeInputProduct(id : Nat) : async Bool {
    MarketplaceLib.toggleInputAvailable(inputProducts, id, caller, true);
  };

  public shared ({ caller }) func deleteInputProduct(id : Nat) : async Bool {
    MarketplaceLib.deleteInputProduct(inputProducts, id, caller);
  };

  public shared func incrementInputInquiry(id : Nat) : async Bool {
    MarketplaceLib.incrementInputInquiry(inputProducts, id);
  };

  // ---- Service listings ----

  public shared ({ caller }) func addServiceListing(
    serviceType : Text,
    description : Text,
    priceMin : Float,
    priceMax : Float,
    coverageAreas : [Text],
    equipment : [Text]
  ) : async MTypes.ServiceListingPublic {
    let id = serviceListings.size();
    let service = MarketplaceLib.createServiceListing(serviceListings, id, caller, serviceType, description, priceMin, priceMax, coverageAreas, equipment);
    MarketplaceLib.toPublicServiceListing(service);
  };

  public query func getServiceListings(area : ?Text) : async [MTypes.ServiceListingPublic] {
    MarketplaceLib.getServiceListings(serviceListings, null, area);
  };

  public query ({ caller }) func getMyServiceListings() : async [MTypes.ServiceListingPublic] {
    MarketplaceLib.getServiceListings(serviceListings, ?caller, null);
  };

  public shared ({ caller }) func updateServiceListing(
    id : Nat,
    description : ?Text,
    priceMin : ?Float,
    priceMax : ?Float,
    coverageAreas : ?[Text],
    equipment : ?[Text]
  ) : async ?MTypes.ServiceListingPublic {
    MarketplaceLib.updateServiceListing(serviceListings, id, caller, description, priceMin, priceMax, coverageAreas, equipment);
  };

  public shared ({ caller }) func pauseServiceListing(id : Nat) : async Bool {
    MarketplaceLib.toggleServiceAvailable(serviceListings, id, caller, false);
  };

  public shared ({ caller }) func resumeServiceListing(id : Nat) : async Bool {
    MarketplaceLib.toggleServiceAvailable(serviceListings, id, caller, true);
  };

  public shared ({ caller }) func deleteServiceListing(id : Nat) : async Bool {
    MarketplaceLib.deleteServiceListing(serviceListings, id, caller);
  };

  public shared func incrementServiceInquiry(id : Nat) : async Bool {
    MarketplaceLib.incrementServiceInquiry(serviceListings, id);
  };

  // ---- Transport listings ----

  public shared ({ caller }) func addTransportListing(
    vehicleType : Text,
    capacityTons : Float,
    pricePerKm : Float,
    coverageAreas : [Text]
  ) : async MTypes.TransportListingPublic {
    let id = transportListings.size();
    let transport = MarketplaceLib.createTransportListing(transportListings, id, caller, vehicleType, capacityTons, pricePerKm, coverageAreas);
    MarketplaceLib.toPublicTransportListing(transport);
  };

  public query func getTransportListings(area : ?Text) : async [MTypes.TransportListingPublic] {
    MarketplaceLib.getTransportListings(transportListings, area);
  };

  public shared ({ caller }) func pauseTransportListing(id : Nat) : async Bool {
    MarketplaceLib.toggleTransportAvailable(transportListings, id, caller, false);
  };

  public shared ({ caller }) func resumeTransportListing(id : Nat) : async Bool {
    MarketplaceLib.toggleTransportAvailable(transportListings, id, caller, true);
  };

  // ---- Bookings ----

  public shared ({ caller }) func requestBooking(
    providerId : Common.UserId,
    serviceId : Nat,
    scheduledAt : Common.Timestamp,
    location : Common.Location,
    totalPrice : Float,
    notes : Text
  ) : async MTypes.BookingPublic {
    let id = bookings.size();
    let booking = MarketplaceLib.createBooking(bookings, id, caller, providerId, serviceId, scheduledAt, location, totalPrice, notes);
    MarketplaceLib.toPublicBooking(booking);
  };

  public shared ({ caller }) func updateBookingStatus(
    bookingId : Nat,
    newStatus : { #pending; #confirmed; #in_progress; #completed; #cancelled }
  ) : async Bool {
    MarketplaceLib.updateBookingStatus(bookings, bookingId, caller, newStatus);
  };

  public query ({ caller }) func getMyBookings() : async [MTypes.BookingPublic] {
    MarketplaceLib.getBookingsByClient(bookings, caller);
  };

  public query ({ caller }) func getMyServiceRequests() : async [MTypes.BookingPublic] {
    MarketplaceLib.getBookingsByProvider(bookings, caller);
  };
}
