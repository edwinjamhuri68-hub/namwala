import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import TransportLib "../lib/transport-booking";
import Types "../types/transport-booking";
import Common "../types/common";

mixin (
  transportBookings : List.List<Types.TransportBooking>,
  transportTimeSlots : Map.Map<Common.UserId, Types.TransportTimeSlot>,
  nextTransportBookingId : Nat,
) {
  /// Book a transport provider. totalCost is computed as distanceKm * ratePerKm.
  public shared ({ caller }) func createTransportBooking(
    providerId : Common.UserId,
    distanceKm : Float,
    ratePerKm : Float,
    selectedTimeSlot : Text,
    pickupAddress : Text,
    deliveryAddress : Text,
  ) : async Types.TransportBooking {
    let id = transportBookings.size();
    TransportLib.createTransportBooking(
      transportBookings, id, caller, providerId,
      distanceKm, ratePerKm, selectedTimeSlot,
      pickupAddress, deliveryAddress, Time.now()
    );
  };

  /// Get all transport bookings for the calling user.
  public shared query ({ caller }) func getMyTransportBookings() : async [Types.TransportBooking] {
    TransportLib.getMyTransportBookings(transportBookings, caller);
  };

  /// Transport provider sets their available time slots.
  public shared ({ caller }) func setTransportTimeSlots(
    slots : [Text],
    availabilityStatus : Types.TransportAvailabilityStatus,
  ) : async () {
    TransportLib.setTransportTimeSlots(transportTimeSlots, caller, slots, availabilityStatus);
  };

  /// Get time slots for a given transport provider.
  public query func getTransportTimeSlots(
    providerId : Common.UserId,
  ) : async ?Types.TransportTimeSlot {
    TransportLib.getTransportTimeSlots(transportTimeSlots, providerId);
  };
}
