import type { CalendarEventType, RecurringPattern } from "@/lib/calendarTypes";

export type { CalendarEventType, RecurringPattern };

export interface CalendarEvent {
  id: string;
  userId: string;
  eventType: CalendarEventType;
  title: string;
  date: string; // ISO: YYYY-MM-DD
  time?: string; // HH:MM
  notes?: string;
  recurring: RecurringPattern;
  recurringEndDate?: string;
}

function storageKey(userId: string) {
  return `namwala_calendar_${userId}`;
}

export function loadEvents(userId: string): CalendarEvent[] {
  try {
    const raw = localStorage.getItem(storageKey(userId));
    if (!raw) return getDefaultEvents(userId);
    return JSON.parse(raw) as CalendarEvent[];
  } catch {
    return [];
  }
}

export function saveEvent(userId: string, event: CalendarEvent): void {
  const all = loadEvents(userId);
  const idx = all.findIndex((e) => e.id === event.id);
  if (idx >= 0) all[idx] = event;
  else all.push(event);
  try {
    localStorage.setItem(storageKey(userId), JSON.stringify(all));
  } catch {
    /* quota exceeded */
  }
}

export function deleteEvent(userId: string, eventId: string): void {
  const all = loadEvents(userId).filter((e) => e.id !== eventId);
  try {
    localStorage.setItem(storageKey(userId), JSON.stringify(all));
  } catch {
    /* quota exceeded */
  }
}

function today(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split("T")[0];
}

function getDefaultEvents(userId: string): CalendarEvent[] {
  const events: CalendarEvent[] = [
    {
      id: "def1",
      userId,
      eventType: "planting",
      title: "Plant Maize (Masika)",
      date: today(3),
      time: "07:00",
      notes: "2 acres, north field",
      recurring: "none",
    },
    {
      id: "def2",
      userId,
      eventType: "irrigation",
      title: "Irrigate Tomato Field",
      date: today(1),
      time: "06:00",
      notes: "",
      recurring: "weekly",
    },
    {
      id: "def3",
      userId,
      eventType: "fertilizer",
      title: "Apply DAP Fertilizer",
      date: today(7),
      time: "08:00",
      notes: "50kg per acre",
      recurring: "none",
    },
    {
      id: "def4",
      userId,
      eventType: "harvest",
      title: "Harvest Beans",
      date: today(14),
      time: "07:30",
      notes: "3 bags expected",
      recurring: "none",
    },
    {
      id: "def5",
      userId,
      eventType: "vaccination",
      title: "FMD Vaccination — Cattle",
      date: today(5),
      time: "09:00",
      notes: "Contact Dr. Ali",
      recurring: "yearly",
    },
    {
      id: "def6",
      userId,
      eventType: "marketDay",
      title: "Namwala Weekly Market",
      date: today(2),
      time: "08:00",
      notes: "Bring maize",
      recurring: "weekly",
    },
    {
      id: "def7",
      userId,
      eventType: "deworming",
      title: "Deworm Goats",
      date: today(10),
      time: "10:00",
      notes: "Ivermectin",
      recurring: "monthly",
    },
  ];
  try {
    localStorage.setItem(storageKey(userId), JSON.stringify(events));
  } catch {
    /* quota exceeded */
  }
  return events;
}
