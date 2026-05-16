import List "mo:core/List";
import Time "mo:core/Time";
import CalendarLib "../lib/calendar";
import Types "../types/calendar";
import Common "../types/common";

mixin (
  calendarEvents : List.List<Types.CalendarEvent>,
  nextCalendarEventId : Nat,
) {
  /// Create a new calendar event for the calling user.
  public shared ({ caller }) func createCalendarEvent(
    eventType : Types.CalendarEventType,
    title : Text,
    date : Text,
    time : ?Text,
    notes : ?Text,
    recurring : Types.RecurringPattern,
    recurringEndDate : ?Text,
  ) : async Types.CalendarEvent {
    let id = calendarEvents.size();
    CalendarLib.createCalendarEvent(
      calendarEvents, id, caller, eventType, title, date, time, notes,
      recurring, recurringEndDate, Time.now()
    );
  };

  /// Get all calendar events belonging to the calling user.
  public shared query ({ caller }) func getCalendarEvents() : async [Types.CalendarEvent] {
    CalendarLib.getCalendarEvents(calendarEvents, caller);
  };

  /// Update a calendar event owned by the calling user.
  public shared ({ caller }) func updateCalendarEvent(
    id : Types.CalendarEventId,
    eventType : ?Types.CalendarEventType,
    title : ?Text,
    date : ?Text,
    time : ?Text,
    notes : ?Text,
    recurring : ?Types.RecurringPattern,
    recurringEndDate : ?Text,
    completed : ?Bool,
  ) : async Bool {
    CalendarLib.updateCalendarEvent(
      calendarEvents, id, caller,
      eventType, title, date, time, notes,
      recurring, recurringEndDate, completed
    );
  };

  /// Delete a calendar event owned by the calling user.
  public shared ({ caller }) func deleteCalendarEvent(
    id : Types.CalendarEventId,
  ) : async Bool {
    CalendarLib.deleteCalendarEvent(calendarEvents, id, caller);
  };
}
