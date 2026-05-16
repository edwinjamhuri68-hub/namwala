import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/calendar";
import Common "../types/common";

module {
  public func createCalendarEvent(
    events : List.List<Types.CalendarEvent>,
    nextId : Nat,
    userId : Common.UserId,
    eventType : Types.CalendarEventType,
    title : Text,
    date : Text,
    time : ?Text,
    notes : ?Text,
    recurring : Types.RecurringPattern,
    recurringEndDate : ?Text,
    createdAt : Common.Timestamp,
  ) : Types.CalendarEvent {
    let event : Types.CalendarEvent = {
      id = nextId;
      userId;
      eventType;
      title;
      date;
      time;
      notes;
      recurring;
      recurringEndDate;
      completed = false;
      createdAt;
    };
    events.add(event);
    event;
  };

  public func getCalendarEvents(
    events : List.List<Types.CalendarEvent>,
    userId : Common.UserId,
  ) : [Types.CalendarEvent] {
    events.filter(func(e) { e.userId == userId }).toArray();
  };

  public func updateCalendarEvent(
    events : List.List<Types.CalendarEvent>,
    id : Types.CalendarEventId,
    caller : Common.UserId,
    eventType : ?Types.CalendarEventType,
    title : ?Text,
    date : ?Text,
    time : ?Text,
    notes : ?Text,
    recurring : ?Types.RecurringPattern,
    recurringEndDate : ?Text,
    completed : ?Bool,
  ) : Bool {
    // CalendarEvent is immutable — find and replace in list
    var updated = false;
    var idx : Nat = 0;
    var targetIdx : ?Nat = null;
    var targetEvent : ?Types.CalendarEvent = null;
    events.forEach(func(e) {
      if (e.id == id and e.userId == caller) {
        targetIdx := ?idx;
        targetEvent := ?e;
      };
      idx += 1;
    });
    switch (targetIdx, targetEvent) {
      case (?i, ?e) {
        let newEvent : Types.CalendarEvent = {
          id = e.id;
          userId = e.userId;
          eventType = switch (eventType) { case (?et) et; case null e.eventType };
          title = switch (title) { case (?t) t; case null e.title };
          date = switch (date) { case (?d) d; case null e.date };
          time = switch (time) { case (?t) ?t; case null e.time };
          notes = switch (notes) { case (?n) ?n; case null e.notes };
          recurring = switch (recurring) { case (?r) r; case null e.recurring };
          recurringEndDate = switch (recurringEndDate) { case (?r) ?r; case null e.recurringEndDate };
          completed = switch (completed) { case (?c) c; case null e.completed };
          createdAt = e.createdAt;
        };
        events.put(i, newEvent);
        updated := true;
      };
      case _ {};
    };
    updated;
  };

  public func deleteCalendarEvent(
    events : List.List<Types.CalendarEvent>,
    id : Types.CalendarEventId,
    caller : Common.UserId,
  ) : Bool {
    let before = events.size();
    let remaining = events.filter(func(e) { not (e.id == id and e.userId == caller) });
    let after = remaining.size();
    if (after < before) {
      events.clear();
      events.append(remaining);
      true;
    } else false;
  };
}
