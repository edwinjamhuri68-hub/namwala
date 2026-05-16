import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Types "../types/transport-booking";
import Common "../types/common";

module {
  public func createTransportBooking(
    bookings : List.List<Types.TransportBooking>,
    nextId : Nat,
    userId : Common.UserId,
    providerId : Common.UserId,
    distanceKm : Float,
    ratePerKm : Float,
    selectedTimeSlot : Text,
    pickupAddress : Text,
    deliveryAddress : Text,
    createdAt : Common.Timestamp,
  ) : Types.TransportBooking {
    let booking : Types.TransportBooking = {
      id = nextId;
      userId;
      providerId;
      distanceKm;
      ratePerKm;
      totalCost = distanceKm * ratePerKm;
      selectedTimeSlot;
      pickupAddress;
      deliveryAddress;
      status = #pending;
      createdAt;
    };
    bookings.add(booking);
    booking;
  };

  public func getMyTransportBookings(
    bookings : List.List<Types.TransportBooking>,
    userId : Common.UserId,
  ) : [Types.TransportBooking] {
    bookings.filter(func(b) { b.userId == userId or b.providerId == userId }).toArray();
  };

  public func setTransportTimeSlots(
    timeSlots : Map.Map<Common.UserId, Types.TransportTimeSlot>,
    providerId : Common.UserId,
    slots : [Text],
    availabilityStatus : Types.TransportAvailabilityStatus,
  ) {
    let slot : Types.TransportTimeSlot = {
      providerId;
      slots;
      availabilityStatus;
    };
    timeSlots.add(providerId, slot);
  };

  public func getTransportTimeSlots(
    timeSlots : Map.Map<Common.UserId, Types.TransportTimeSlot>,
    providerId : Common.UserId,
  ) : ?Types.TransportTimeSlot {
    timeSlots.get(providerId);
  };
}
