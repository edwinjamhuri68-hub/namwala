import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/marketplace";
import Common "../types/common";

module {
  // ---- Helpers ----

  public func toPublicListing(l : Types.Listing) : Types.ListingPublic {
    {
      id = l.id;
      sellerId = l.sellerId;
      listingType = l.listingType;
      title = l.title;
      description = l.description;
      price = l.price;
      quantity = l.quantity;
      unit = l.unit;
      location = l.location;
      imageUrls = l.imageUrls;
      tags = l.tags;
      isActive = l.isActive;
      inquiryCount = l.inquiryCount;
      createdAt = l.createdAt;
      updatedAt = l.updatedAt;
    };
  };

  public func toPublicOrder(o : Types.Order) : Types.OrderPublic {
    {
      id = o.id;
      buyerId = o.buyerId;
      sellerId = o.sellerId;
      listingId = o.listingId;
      quantity = o.quantity;
      totalPrice = o.totalPrice;
      status = o.status;
      notes = o.notes;
      createdAt = o.createdAt;
      updatedAt = o.updatedAt;
    };
  };

  public func toPublicInputProduct(p : Types.InputProduct) : Types.InputProductPublic {
    {
      id = p.id;
      sellerId = p.sellerId;
      name = p.name;
      category = p.category;
      description = p.description;
      pricePerUnit = p.pricePerUnit;
      unit = p.unit;
      stockQuantity = p.stockQuantity;
      imageUrl = p.imageUrl;
      isAvailable = p.isAvailable;
      inquiryCount = p.inquiryCount;
      createdAt = p.createdAt;
      updatedAt = p.updatedAt;
    };
  };

  public func toPublicServiceListing(s : Types.ServiceListing) : Types.ServiceListingPublic {
    {
      id = s.id;
      providerId = s.providerId;
      serviceType = s.serviceType;
      description = s.description;
      priceRange = s.priceRange;
      coverageAreas = s.coverageAreas;
      equipment = s.equipment;
      isAvailable = s.isAvailable;
      inquiryCount = s.inquiryCount;
      createdAt = s.createdAt;
      updatedAt = s.updatedAt;
    };
  };

  public func toPublicTransportListing(t : Types.TransportListing) : Types.TransportListingPublic {
    {
      id = t.id;
      providerId = t.providerId;
      vehicleType = t.vehicleType;
      capacityTons = t.capacityTons;
      pricePerKm = t.pricePerKm;
      coverageAreas = t.coverageAreas;
      isAvailable = t.isAvailable;
      inquiryCount = t.inquiryCount;
      createdAt = t.createdAt;
      updatedAt = t.updatedAt;
    };
  };

  public func toPublicBooking(b : Types.Booking) : Types.BookingPublic {
    {
      id = b.id;
      clientId = b.clientId;
      providerId = b.providerId;
      serviceId = b.serviceId;
      scheduledAt = b.scheduledAt;
      location = b.location;
      status = b.status;
      totalPrice = b.totalPrice;
      notes = b.notes;
      createdAt = b.createdAt;
    };
  };

  // ---- General listings ----

  public func createListing(
    listings : List.List<Types.Listing>,
    nextId : Common.ListingId,
    sellerId : Common.UserId,
    listingType : Common.ListingType,
    title : Text,
    description : Text,
    price : Float,
    quantity : ?Float,
    unit : ?Text,
    location : Common.Location,
    imageUrls : [Text],
    tags : [Text]
  ) : Types.Listing {
    let now = Time.now();
    let listing : Types.Listing = {
      id = nextId;
      sellerId;
      listingType;
      title;
      description;
      price;
      quantity;
      unit;
      location;
      imageUrls;
      tags;
      var isActive = true;
      var inquiryCount = 0;
      createdAt = now;
      var updatedAt = now;
    };
    listings.add(listing);
    listing;
  };

  public func getListings(
    listings : List.List<Types.Listing>,
    filter : Types.ListingFilter
  ) : [Types.ListingPublic] {
    listings.filter(func(l) {
      let typeMatch = switch (filter.listingType) {
        case (?t) l.listingType == t;
        case null true;
      };
      let regionMatch = switch (filter.region) {
        case (?r) l.location.region.toLower().contains(#text (r.toLower()));
        case null true;
      };
      let searchMatch = switch (filter.searchTerm) {
        case (?q) {
          let ql = q.toLower();
          l.title.toLower().contains(#text ql) or l.description.toLower().contains(#text ql);
        };
        case null true;
      };
      let priceMinMatch = switch (filter.priceMin) {
        case (?p) l.price >= p;
        case null true;
      };
      let priceMaxMatch = switch (filter.priceMax) {
        case (?p) l.price <= p;
        case null true;
      };
      let activeMatch = if (filter.activeOnly) l.isActive else true;
      typeMatch and regionMatch and searchMatch and priceMinMatch and priceMaxMatch and activeMatch;
    })
    .map<Types.Listing, Types.ListingPublic>(func(l) { toPublicListing(l) })
    .toArray();
  };

  public func getListingById(
    listings : List.List<Types.Listing>,
    id : Common.ListingId
  ) : ?Types.ListingPublic {
    switch (listings.find(func(l) { l.id == id })) {
      case (?l) ?toPublicListing(l);
      case null null;
    };
  };

  public func getListingsBySeller(
    listings : List.List<Types.Listing>,
    sellerId : Common.UserId
  ) : [Types.ListingPublic] {
    listings.filter(func(l) { l.sellerId == sellerId })
      .map<Types.Listing, Types.ListingPublic>(func(l) { toPublicListing(l) })
      .toArray();
  };

  /// Update mutable fields of a listing. Only the owner may update.
  public func updateListing(
    listings : List.List<Types.Listing>,
    id : Common.ListingId,
    callerId : Common.UserId,
    title : ?Text,
    description : ?Text,
    price : ?Float,
    quantity : ?Float,
    imageUrls : ?[Text]
  ) : ?Types.ListingPublic {
    let found = listings.find(func(l) { l.id == id and l.sellerId == callerId });
    switch (found) {
      case null null;
      case (?_l) {
        let now = Time.now();
        listings.mapInPlace(func(l2) {
          if (l2.id != id) return l2;
          {
            id = l2.id;
            sellerId = l2.sellerId;
            listingType = l2.listingType;
            title = switch (title) { case (?t) t; case null l2.title };
            description = switch (description) { case (?d) d; case null l2.description };
            price = switch (price) { case (?p) p; case null l2.price };
            quantity = switch (quantity) { case (?q) ?q; case null l2.quantity };
            unit = l2.unit;
            location = l2.location;
            imageUrls = switch (imageUrls) { case (?imgs) imgs; case null l2.imageUrls };
            tags = l2.tags;
            var isActive = l2.isActive;
            var inquiryCount = l2.inquiryCount;
            createdAt = l2.createdAt;
            var updatedAt = now;
          };
        });
        switch (listings.find(func(l2) { l2.id == id })) {
          case (?updated) ?toPublicListing(updated);
          case null null;
        };
      };
    };
  };

  /// Toggle isActive for the listing. Only the owner may toggle.
  public func toggleListingActive(
    listings : List.List<Types.Listing>,
    id : Common.ListingId,
    callerId : Common.UserId,
    active : Bool
  ) : Bool {
    let found = listings.find(func(l) { l.id == id and l.sellerId == callerId });
    if (found.isNull()) return false;
    listings.mapInPlace(func(l) {
      if (l.id != id) return l;
      l.isActive := active;
      l.updatedAt := Time.now();
      l;
    });
    true;
  };

  /// Permanently deactivates (soft-delete) a listing. Only the owner may call.
  public func deactivateListing(
    listings : List.List<Types.Listing>,
    id : Common.ListingId,
    sellerId : Common.UserId
  ) : Bool {
    toggleListingActive(listings, id, sellerId, false);
  };

  /// Increment the inquiry counter on a listing (called when a buyer opens a chat).
  public func incrementListingInquiry(
    listings : List.List<Types.Listing>,
    id : Common.ListingId
  ) : Bool {
    let found = listings.find(func(l) { l.id == id });
    if (found.isNull()) return false;
    listings.mapInPlace(func(l) {
      if (l.id != id) return l;
      l.inquiryCount := l.inquiryCount + 1;
      l.updatedAt := Time.now();
      l;
    });
    true;
  };

  // ---- Orders ----

  public func createOrder(
    orders : List.List<Types.Order>,
    nextId : Common.OrderId,
    buyerId : Common.UserId,
    sellerId : Common.UserId,
    listingId : Common.ListingId,
    quantity : Float,
    totalPrice : Float,
    deliveryAddress : Common.Location,
    notes : Text
  ) : Types.Order {
    let now = Time.now();
    let order : Types.Order = {
      id = nextId;
      buyerId;
      sellerId;
      listingId;
      quantity;
      totalPrice;
      var status = #pending;
      deliveryAddress;
      notes;
      createdAt = now;
      var updatedAt = now;
    };
    orders.add(order);
    order;
  };

  public func updateOrderStatus(
    orders : List.List<Types.Order>,
    orderId : Common.OrderId,
    callerId : Common.UserId,
    newStatus : Common.OrderStatus
  ) : Bool {
    let found = orders.find(func(o) { o.id == orderId and (o.sellerId == callerId or o.buyerId == callerId) });
    if (found.isNull()) return false;
    orders.mapInPlace(func(o) {
      if (o.id != orderId) return o;
      o.status := newStatus;
      o.updatedAt := Time.now();
      o;
    });
    true;
  };

  public func getOrdersByBuyer(
    orders : List.List<Types.Order>,
    buyerId : Common.UserId
  ) : [Types.OrderPublic] {
    orders.filter(func(o) { o.buyerId == buyerId })
      .map<Types.Order, Types.OrderPublic>(func(o) { toPublicOrder(o) })
      .toArray();
  };

  public func getOrdersBySeller(
    orders : List.List<Types.Order>,
    sellerId : Common.UserId
  ) : [Types.OrderPublic] {
    orders.filter(func(o) { o.sellerId == sellerId })
      .map<Types.Order, Types.OrderPublic>(func(o) { toPublicOrder(o) })
      .toArray();
  };

  // ---- Input products ----

  public func createInputProduct(
    products : List.List<Types.InputProduct>,
    nextId : Nat,
    sellerId : Common.UserId,
    name : Text,
    category : { #seeds; #fertilizer; #pesticide; #feed; #equipment; #other },
    description : Text,
    pricePerUnit : Float,
    unit : Text,
    stockQuantity : Float,
    imageUrl : ?Text
  ) : Types.InputProduct {
    let now = Time.now();
    let product : Types.InputProduct = {
      id = nextId;
      sellerId;
      name;
      category;
      description;
      pricePerUnit;
      unit;
      var stockQuantity;
      imageUrl;
      var isAvailable = true;
      var inquiryCount = 0;
      createdAt = now;
      var updatedAt = now;
    };
    products.add(product);
    product;
  };

  public func getInputProducts(
    products : List.List<Types.InputProduct>,
    sellerId : ?Common.UserId
  ) : [Types.InputProductPublic] {
    products.filter(func(p) {
      switch (sellerId) {
        case (?sid) p.sellerId == sid;
        case null p.isAvailable;
      };
    })
    .map<Types.InputProduct, Types.InputProductPublic>(func(p) { toPublicInputProduct(p) })
    .toArray();
  };

  public func updateInputProduct(
    products : List.List<Types.InputProduct>,
    id : Nat,
    callerId : Common.UserId,
    name : ?Text,
    description : ?Text,
    pricePerUnit : ?Float,
    stockQuantity : ?Float,
    imageUrl : ?Text
  ) : ?Types.InputProductPublic {
    let found = products.find(func(p) { p.id == id and p.sellerId == callerId });
    switch (found) {
      case null null;
      case (?_p) {
        let now = Time.now();
        products.mapInPlace(func(p) {
          if (p.id != id) return p;
          {
            id = p.id;
            sellerId = p.sellerId;
            name = switch (name) { case (?n) n; case null p.name };
            category = p.category;
            description = switch (description) { case (?d) d; case null p.description };
            pricePerUnit = switch (pricePerUnit) { case (?pr) pr; case null p.pricePerUnit };
            unit = p.unit;
            var stockQuantity = switch (stockQuantity) { case (?sq) sq; case null p.stockQuantity };
            imageUrl = switch (imageUrl) { case (?u) ?u; case null p.imageUrl };
            var isAvailable = p.isAvailable;
            var inquiryCount = p.inquiryCount;
            createdAt = p.createdAt;
            var updatedAt = now;
          };
        });
        switch (products.find(func(p) { p.id == id })) {
          case (?updated) ?toPublicInputProduct(updated);
          case null null;
        };
      };
    };
  };

  public func toggleInputAvailable(
    products : List.List<Types.InputProduct>,
    id : Nat,
    callerId : Common.UserId,
    available : Bool
  ) : Bool {
    let found = products.find(func(p) { p.id == id and p.sellerId == callerId });
    if (found.isNull()) return false;
    products.mapInPlace(func(p) {
      if (p.id != id) return p;
      p.isAvailable := available;
      p.updatedAt := Time.now();
      p;
    });
    true;
  };

  public func deleteInputProduct(
    products : List.List<Types.InputProduct>,
    id : Nat,
    callerId : Common.UserId
  ) : Bool {
    toggleInputAvailable(products, id, callerId, false);
  };

  public func incrementInputInquiry(
    products : List.List<Types.InputProduct>,
    id : Nat
  ) : Bool {
    let found = products.find(func(p) { p.id == id });
    if (found.isNull()) return false;
    products.mapInPlace(func(p) {
      if (p.id != id) return p;
      p.inquiryCount := p.inquiryCount + 1;
      p.updatedAt := Time.now();
      p;
    });
    true;
  };

  // ---- Service listings ----

  public func createServiceListing(
    services : List.List<Types.ServiceListing>,
    nextId : Nat,
    providerId : Common.UserId,
    serviceType : Text,
    description : Text,
    priceMin : Float,
    priceMax : Float,
    coverageAreas : [Text],
    equipment : [Text]
  ) : Types.ServiceListing {
    let now = Time.now();
    let service : Types.ServiceListing = {
      id = nextId;
      providerId;
      serviceType;
      description;
      priceRange = { min = priceMin; max = priceMax };
      coverageAreas;
      equipment;
      var isAvailable = true;
      var inquiryCount = 0;
      createdAt = now;
      var updatedAt = now;
    };
    services.add(service);
    service;
  };

  public func getServiceListings(
    services : List.List<Types.ServiceListing>,
    providerId : ?Common.UserId,
    area : ?Text
  ) : [Types.ServiceListingPublic] {
    services.filter(func(s) {
      let providerMatch = switch (providerId) {
        case (?pid) s.providerId == pid;
        case null s.isAvailable;
      };
      let areaMatch = switch (area) {
        case (?a) {
          let al = a.toLower();
          s.coverageAreas.any(func(ca) { ca.toLower().contains(#text al) });
        };
        case null true;
      };
      providerMatch and areaMatch;
    })
    .map<Types.ServiceListing, Types.ServiceListingPublic>(func(s) { toPublicServiceListing(s) })
    .toArray();
  };

  public func updateServiceListing(
    services : List.List<Types.ServiceListing>,
    id : Nat,
    callerId : Common.UserId,
    description : ?Text,
    priceMin : ?Float,
    priceMax : ?Float,
    coverageAreas : ?[Text],
    equipment : ?[Text]
  ) : ?Types.ServiceListingPublic {
    let found = services.find(func(s) { s.id == id and s.providerId == callerId });
    switch (found) {
      case null null;
      case (?_s) {
        let now = Time.now();
        services.mapInPlace(func(s) {
          if (s.id != id) return s;
          {
            id = s.id;
            providerId = s.providerId;
            serviceType = s.serviceType;
            description = switch (description) { case (?d) d; case null s.description };
            priceRange = {
              min = switch (priceMin) { case (?p) p; case null s.priceRange.min };
              max = switch (priceMax) { case (?p) p; case null s.priceRange.max };
            };
            coverageAreas = switch (coverageAreas) { case (?ca) ca; case null s.coverageAreas };
            equipment = switch (equipment) { case (?eq) eq; case null s.equipment };
            var isAvailable = s.isAvailable;
            var inquiryCount = s.inquiryCount;
            createdAt = s.createdAt;
            var updatedAt = now;
          };
        });
        switch (services.find(func(s) { s.id == id })) {
          case (?updated) ?toPublicServiceListing(updated);
          case null null;
        };
      };
    };
  };

  public func toggleServiceAvailable(
    services : List.List<Types.ServiceListing>,
    id : Nat,
    callerId : Common.UserId,
    available : Bool
  ) : Bool {
    let found = services.find(func(s) { s.id == id and s.providerId == callerId });
    if (found.isNull()) return false;
    services.mapInPlace(func(s) {
      if (s.id != id) return s;
      s.isAvailable := available;
      s.updatedAt := Time.now();
      s;
    });
    true;
  };

  public func deleteServiceListing(
    services : List.List<Types.ServiceListing>,
    id : Nat,
    callerId : Common.UserId
  ) : Bool {
    toggleServiceAvailable(services, id, callerId, false);
  };

  public func incrementServiceInquiry(
    services : List.List<Types.ServiceListing>,
    id : Nat
  ) : Bool {
    let found = services.find(func(s) { s.id == id });
    if (found.isNull()) return false;
    services.mapInPlace(func(s) {
      if (s.id != id) return s;
      s.inquiryCount := s.inquiryCount + 1;
      s.updatedAt := Time.now();
      s;
    });
    true;
  };

  // ---- Transport listings ----

  public func createTransportListing(
    transports : List.List<Types.TransportListing>,
    nextId : Nat,
    providerId : Common.UserId,
    vehicleType : Text,
    capacityTons : Float,
    pricePerKm : Float,
    coverageAreas : [Text]
  ) : Types.TransportListing {
    let now = Time.now();
    let transport : Types.TransportListing = {
      id = nextId;
      providerId;
      vehicleType;
      capacityTons;
      pricePerKm;
      coverageAreas;
      var isAvailable = true;
      var inquiryCount = 0;
      createdAt = now;
      var updatedAt = now;
    };
    transports.add(transport);
    transport;
  };

  public func getTransportListings(
    transports : List.List<Types.TransportListing>,
    area : ?Text
  ) : [Types.TransportListingPublic] {
    transports.filter(func(t) {
      let activeMatch = t.isAvailable;
      let areaMatch = switch (area) {
        case (?a) {
          let al = a.toLower();
          t.coverageAreas.any(func(ca) { ca.toLower().contains(#text al) });
        };
        case null true;
      };
      activeMatch and areaMatch;
    })
    .map<Types.TransportListing, Types.TransportListingPublic>(func(t) { toPublicTransportListing(t) })
    .toArray();
  };

  public func toggleTransportAvailable(
    transports : List.List<Types.TransportListing>,
    id : Nat,
    callerId : Common.UserId,
    available : Bool
  ) : Bool {
    let found = transports.find(func(t) { t.id == id and t.providerId == callerId });
    if (found.isNull()) return false;
    transports.mapInPlace(func(t) {
      if (t.id != id) return t;
      t.isAvailable := available;
      t.updatedAt := Time.now();
      t;
    });
    true;
  };

  // ---- Bookings ----

  public func createBooking(
    bookings : List.List<Types.Booking>,
    nextId : Nat,
    clientId : Common.UserId,
    providerId : Common.UserId,
    serviceId : Nat,
    scheduledAt : Common.Timestamp,
    location : Common.Location,
    totalPrice : Float,
    notes : Text
  ) : Types.Booking {
    let booking : Types.Booking = {
      id = nextId;
      clientId;
      providerId;
      serviceId;
      scheduledAt;
      location;
      var status = #pending;
      totalPrice;
      notes;
      createdAt = Time.now();
    };
    bookings.add(booking);
    booking;
  };

  public func updateBookingStatus(
    bookings : List.List<Types.Booking>,
    bookingId : Nat,
    callerId : Common.UserId,
    newStatus : { #pending; #confirmed; #in_progress; #completed; #cancelled }
  ) : Bool {
    let found = bookings.find(func(b) { b.id == bookingId and (b.clientId == callerId or b.providerId == callerId) });
    if (found.isNull()) return false;
    bookings.mapInPlace(func(b) {
      if (b.id != bookingId) return b;
      { b with var status = newStatus };
    });
    true;
  };

  public func getBookingsByProvider(
    bookings : List.List<Types.Booking>,
    providerId : Common.UserId
  ) : [Types.BookingPublic] {
    bookings.filter(func(b) { b.providerId == providerId })
      .map<Types.Booking, Types.BookingPublic>(func(b) { toPublicBooking(b) })
      .toArray();
  };

  public func getBookingsByClient(
    bookings : List.List<Types.Booking>,
    clientId : Common.UserId
  ) : [Types.BookingPublic] {
    bookings.filter(func(b) { b.clientId == clientId })
      .map<Types.Booking, Types.BookingPublic>(func(b) { toPublicBooking(b) })
      .toArray();
  };
}
