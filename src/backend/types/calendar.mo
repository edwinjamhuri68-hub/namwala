import Common "common";

module {
  public type CalendarEventId = Nat;

  public type CalendarEventType = {
    #planting;
    #irrigation;
    #fertilizer;
    #harvest;
    #pestControl;
    #soilTesting;
    #marketDay;
    #vaccination;
    #feeding;
    #breeding;
    #vetAppointment;
    #healthCheck;
    #deworming;
    #livestockSale;
  };

  public type RecurringPattern = {
    #none;
    #daily;
    #weekly;
    #monthly;
    #yearly;
  };

  public type CalendarEvent = {
    id : CalendarEventId;
    userId : Common.UserId;
    eventType : CalendarEventType;
    title : Text;
    date : Text; // ISO date string e.g. "2026-05-10"
    time : ?Text; // e.g. "08:00"
    notes : ?Text;
    recurring : RecurringPattern;
    recurringEndDate : ?Text;
    completed : Bool;
    createdAt : Common.Timestamp;
  };
}
