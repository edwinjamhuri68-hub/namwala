import Common "common";

module {
  public type TransportBookingId = Nat;

  public type TransportBookingStatus = {
    #pending;
    #confirmed;
    #inTransit;
    #delivered;
    #cancelled;
  };

  public type TransportBooking = {
    id : TransportBookingId;
    userId : Common.UserId;
    providerId : Common.UserId;
    distanceKm : Float;
    ratePerKm : Float;
    totalCost : Float;
    selectedTimeSlot : Text;
    pickupAddress : Text;
    deliveryAddress : Text;
    status : TransportBookingStatus;
    createdAt : Common.Timestamp;
  };

  public type TransportAvailabilityStatus = {
    #available;
    #limited;
    #fullyBooked;
  };

  public type TransportTimeSlot = {
    providerId : Common.UserId;
    slots : [Text]; // e.g. ["Mon 8am-12pm", "Tue 2pm-6pm"]
    availabilityStatus : TransportAvailabilityStatus;
  };
}
