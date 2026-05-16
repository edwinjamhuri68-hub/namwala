import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  type CalendarEvent,
  type CalendarEventType,
  type RecurringPattern,
  deleteEvent,
  loadEvents,
  saveEvent,
} from "@/lib/calendarStorage";
import {
  EVENT_TYPE_CONFIG,
  FARMER_EVENT_TYPES,
  LIVESTOCK_EVENT_TYPES,
} from "@/lib/calendarTypes";
import { useAuthStore } from "@/store/authStore";
import { useLanguageStore } from "@/store/languageStore";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Plus,
  RefreshCw,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}
function toDateStr(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}
function todayStr() {
  const d = new Date();
  return toDateStr(d.getFullYear(), d.getMonth(), d.getDate());
}

interface EventModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (e: Omit<CalendarEvent, "id" | "userId">) => void;
  onDelete?: () => void;
  initial?: CalendarEvent | null;
  role: string;
  defaultDate: string;
}

function EventModal({
  open,
  onClose,
  onSave,
  onDelete,
  initial,
  role,
  defaultDate,
}: EventModalProps) {
  const { t, language } = useLanguageStore();
  const isLivestock = role === "livestock_keeper";
  const availableTypes = isLivestock
    ? LIVESTOCK_EVENT_TYPES
    : FARMER_EVENT_TYPES;

  const [eventType, setEventType] = useState<CalendarEventType>(
    initial?.eventType ?? availableTypes[0],
  );
  const [title, setTitle] = useState(initial?.title ?? "");
  const [date, setDate] = useState(initial?.date ?? defaultDate);
  const [time, setTime] = useState(initial?.time ?? "");
  const [notes, setNotes] = useState(initial?.notes ?? "");
  const [recurring, setRecurring] = useState<RecurringPattern>(
    initial?.recurring ?? "none",
  );
  const [recurringEndDate, setRecurringEndDate] = useState(
    initial?.recurringEndDate ?? "",
  );

  useEffect(() => {
    if (initial) {
      setEventType(initial.eventType);
      setTitle(initial.title);
      setDate(initial.date);
      setTime(initial.time ?? "");
      setNotes(initial.notes ?? "");
      setRecurring(initial.recurring);
      setRecurringEndDate(initial.recurringEndDate ?? "");
    } else {
      setEventType(availableTypes[0]);
      setTitle("");
      setDate(defaultDate);
      setTime("");
      setNotes("");
      setRecurring("none");
      setRecurringEndDate("");
    }
  }, [initial, defaultDate, availableTypes]);

  if (!open) return null;

  const lbl = (en: string, sw: string) => (language === "sw" ? sw : en);

  const RECURRING_OPTIONS: { value: RecurringPattern; label: string }[] = [
    { value: "none", label: lbl("None", "Hakuna") },
    { value: "daily", label: lbl("Daily", "Kila Siku") },
    { value: "weekly", label: lbl("Weekly", "Kila Wiki") },
    { value: "monthly", label: lbl("Monthly", "Kila Mwezi") },
    { value: "yearly", label: lbl("Yearly", "Kila Mwaka") },
  ];

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    onSave({
      eventType,
      title:
        title.trim() ||
        t(`eventType_${eventType}` as Parameters<typeof t>[0]) ||
        eventType,
      date,
      time: time || undefined,
      notes: notes.trim() || undefined,
      recurring,
      recurringEndDate: recurringEndDate || undefined,
    });
  }

  const cfg = EVENT_TYPE_CONFIG[eventType];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 px-0 sm:px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
      role="presentation"
    >
      <div
        className="bg-card w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]"
        data-ocid="calendar.event_dialog"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border sticky top-0 bg-card z-10">
          <h2 className="font-display font-bold text-base text-foreground">
            {initial ? t("editEvent") : t("addEvent")}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            data-ocid="calendar.event_dialog.close_button"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Event Type */}
          <div>
            <label
              htmlFor="event-type-group"
              className="text-xs font-medium text-muted-foreground block mb-1"
            >
              {t("eventType")}
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {availableTypes.map((type) => {
                const c = EVENT_TYPE_CONFIG[type];
                const active = eventType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setEventType(type)}
                    data-ocid={`calendar.event_type_${type}`}
                    className={`flex flex-col items-center gap-1 py-2 px-1 rounded-lg border text-xs font-medium transition-colors ${
                      active
                        ? `${c.bgClass} ${c.textClass} border-current/30`
                        : "bg-background border-border text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <span className="text-base">{c.emoji}</span>
                    <span className="leading-tight text-center">
                      {lbl(c.labelEn, c.labelSw)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title */}
          <div>
            <label
              htmlFor="event-title"
              className="text-xs font-medium text-muted-foreground block mb-1"
            >
              {lbl("Title", "Kichwa")}
            </label>
            <input
              id="event-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={lbl(cfg.labelEn, cfg.labelSw)}
              data-ocid="calendar.event_title_input"
              className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="event-date"
                className="text-xs font-medium text-muted-foreground block mb-1"
              >
                {t("eventDate")}
              </label>
              <input
                id="event-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                data-ocid="calendar.event_date_input"
                className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
            <div>
              <label
                htmlFor="event-time"
                className="text-xs font-medium text-muted-foreground block mb-1"
              >
                {t("eventTime")} ({lbl("Optional", "Si lazima")})
              </label>
              <input
                id="event-time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                data-ocid="calendar.event_time_input"
                className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label
              htmlFor="event-notes"
              className="text-xs font-medium text-muted-foreground block mb-1"
            >
              {t("eventNotes")} ({lbl("Optional", "Si lazima")})
            </label>
            <textarea
              id="event-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              data-ocid="calendar.event_notes_textarea"
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
            />
          </div>

          {/* Recurring */}
          <div>
            <label
              htmlFor="event-recurring"
              className="text-xs font-medium text-muted-foreground block mb-1"
            >
              {t("recurringPattern")}
            </label>
            <select
              id="event-recurring"
              value={recurring}
              onChange={(e) => setRecurring(e.target.value as RecurringPattern)}
              data-ocid="calendar.event_recurring_select"
              className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              {RECURRING_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          {recurring !== "none" && (
            <div>
              <label
                htmlFor="event-recurring-end"
                className="text-xs font-medium text-muted-foreground block mb-1"
              >
                {lbl("Repeat Until", "Rudia Hadi")} (
                {lbl("Optional", "Si lazima")})
              </label>
              <input
                id="event-recurring-end"
                type="date"
                value={recurringEndDate}
                onChange={(e) => setRecurringEndDate(e.target.value)}
                data-ocid="calendar.event_recurring_end_input"
                className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            {initial && onDelete && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={onDelete}
                data-ocid="calendar.event_dialog.delete_button"
                className="gap-1"
              >
                <X className="w-3.5 h-3.5" />
                {t("deleteEvent")}
              </Button>
            )}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              data-ocid="calendar.event_dialog.cancel_button"
              className="flex-1"
            >
              {t("cancel")}
            </Button>
            <Button
              type="submit"
              size="sm"
              data-ocid="calendar.event_dialog.save_button"
              className="flex-1"
            >
              {t("save")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function CalendarPage() {
  const { user } = useAuthStore();
  const { t, language } = useLanguageStore();
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [editEvent, setEditEvent] = useState<CalendarEvent | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const modalDefaultDate = useRef<string>(todayStr());

  const userId = user?.id ?? "guest";
  const role = user?.role ?? "farmer";

  useEffect(() => {
    setEvents(loadEvents(userId));
  }, [userId]);

  const lbl = (en: string, sw: string) => (language === "sw" ? sw : en);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDOW = getFirstDayOfWeek(viewYear, viewMonth);
  const todayIso = todayStr();

  const eventsByDate = useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {};
    for (const e of events) {
      if (!map[e.date]) map[e.date] = [];
      map[e.date].push(e);
      // Expand recurring events for this month view
      if (e.recurring !== "none") {
        const baseDate = new Date(`${e.date}T00:00:00`);
        const endDate = e.recurringEndDate
          ? new Date(`${e.recurringEndDate}T00:00:00`)
          : new Date(viewYear, viewMonth + 2, 0);
        let cursor = new Date(baseDate);
        const step =
          e.recurring === "daily"
            ? 1
            : e.recurring === "weekly"
              ? 7
              : e.recurring === "monthly"
                ? 30
                : 365;
        for (let i = 0; i < 60; i++) {
          if (e.recurring === "monthly") {
            cursor = new Date(baseDate);
            cursor.setMonth(baseDate.getMonth() + i + 1);
          } else if (e.recurring === "yearly") {
            cursor = new Date(baseDate);
            cursor.setFullYear(baseDate.getFullYear() + i + 1);
          } else {
            cursor = new Date(cursor.getTime() + step * 86400000);
          }
          if (cursor > endDate) break;
          const iso = cursor.toISOString().split("T")[0];
          if (!map[iso]) map[iso] = [];
          // Avoid duplicate entries for the same event
          if (!map[iso].some((ev) => ev.id === e.id)) {
            map[iso].push({
              ...e,
              date: iso,
              _isRecurringInstance: true,
            } as CalendarEvent & { _isRecurringInstance?: boolean });
          }
        }
      }
    }
    return map;
  }, [events, viewYear, viewMonth]);

  function openAddModal(dateStr: string) {
    modalDefaultDate.current = dateStr;
    setEditEvent(null);
    setModalOpen(true);
  }

  function openEditModal(e: CalendarEvent) {
    setEditEvent(e);
    modalDefaultDate.current = e.date;
    setModalOpen(true);
  }

  function handleSave(data: Omit<CalendarEvent, "id" | "userId">) {
    if (
      editEvent &&
      !(editEvent as CalendarEvent & { _isRecurringInstance?: boolean })
        ._isRecurringInstance
    ) {
      const updated = { ...editEvent, ...data };
      const all = events.map((ev) => (ev.id === editEvent.id ? updated : ev));
      saveEvent(userId, updated);
      setEvents(all);
    } else {
      const newEv: CalendarEvent = {
        id: `ev_${Date.now()}`,
        userId,
        ...data,
      };
      const all = [...events, newEv];
      saveEvent(userId, newEv);
      setEvents(all);
    }
    setModalOpen(false);
    setEditEvent(null);
  }

  function handleDelete() {
    if (!editEvent) return;
    const all = events.filter((ev) => ev.id !== editEvent.id);
    deleteEvent(userId, editEvent.id);
    setEvents(all);
    setModalOpen(false);
    setEditEvent(null);
  }

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  }
  function goToday() {
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
  }

  const MONTH_NAMES_EN = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const MONTH_NAMES_SW = [
    "Januari",
    "Februari",
    "Machi",
    "Aprili",
    "Mei",
    "Juni",
    "Julai",
    "Agosti",
    "Septemba",
    "Oktoba",
    "Novemba",
    "Desemba",
  ];
  const DOW_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const DOW_SW = ["Jum", "Jtn", "Jmm", "Aju", "Alh", "Ijm", "Jmz"];

  const monthName =
    language === "sw" ? MONTH_NAMES_SW[viewMonth] : MONTH_NAMES_EN[viewMonth];
  const dowLabels = language === "sw" ? DOW_SW : DOW_EN;

  // Total events today or overdue
  const todayEventsCount = (eventsByDate[todayIso] ?? []).length;
  const overdueCount = events.filter((e) => e.date < todayIso).length;
  const badgeCount = todayEventsCount + overdueCount;

  const selectedDayEvents = selectedDay
    ? (eventsByDate[selectedDay] ?? [])
    : [];

  return (
    <Layout>
      <div className="px-3 py-4 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-primary" />
          <h1 className="font-display font-bold text-lg text-foreground">
            {t("calendarTitle")}
          </h1>
          {badgeCount > 0 && (
            <Badge className="bg-destructive text-destructive-foreground border-0 text-[10px] h-5 px-1.5">
              {badgeCount}
            </Badge>
          )}
        </div>

        {/* Month navigation */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <button
              type="button"
              onClick={prevMonth}
              data-ocid="calendar.prev_month_button"
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <span className="font-display font-semibold text-sm text-foreground">
                {monthName} {viewYear}
              </span>
              <button
                type="button"
                onClick={goToday}
                data-ocid="calendar.today_button"
                className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                {t("today")}
              </button>
            </div>
            <button
              type="button"
              onClick={nextMonth}
              data-ocid="calendar.next_month_button"
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
              aria-label="Next month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Day-of-week headers */}
          <div className="grid grid-cols-7 border-b border-border">
            {dowLabels.map((d) => (
              <div
                key={d}
                className="text-center text-[10px] font-semibold text-muted-foreground py-2"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7">
            {[...Array<number>(firstDOW).keys()].map((dow) => (
              <div
                key={`${viewYear}-${viewMonth}-col-${dow}`}
                className="border-r border-b border-border/50 min-h-[60px]"
              />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const iso = toDateStr(viewYear, viewMonth, day);
              const dayEvents = eventsByDate[iso] ?? [];
              const isToday = iso === todayIso;
              const isSelected = selectedDay === iso;
              const isPast = iso < todayIso;
              return (
                <button
                  key={iso}
                  type="button"
                  data-ocid={`calendar.day.${day}`}
                  onClick={() =>
                    setSelectedDay((prev) => (prev === iso ? null : iso))
                  }
                  className={`min-h-[60px] border-r border-b border-border/50 p-1 flex flex-col items-start transition-colors ${
                    isSelected
                      ? "bg-primary/10"
                      : isPast
                        ? "bg-muted/20"
                        : "hover:bg-muted/40"
                  }`}
                >
                  <span
                    className={`text-xs font-semibold w-6 h-6 flex items-center justify-center rounded-full mb-0.5 ${
                      isToday
                        ? "bg-primary text-primary-foreground"
                        : isPast
                          ? "text-muted-foreground"
                          : "text-foreground"
                    }`}
                  >
                    {day}
                  </span>
                  <div className="flex flex-col gap-0.5 w-full overflow-hidden">
                    {dayEvents.slice(0, 2).map((ev) => {
                      const cfg = EVENT_TYPE_CONFIG[ev.eventType];
                      const isRecurring = (
                        ev as CalendarEvent & { _isRecurringInstance?: boolean }
                      )._isRecurringInstance;
                      return (
                        <span
                          key={ev.id + ev.date}
                          className={`text-[9px] px-1 py-0.5 rounded font-medium truncate w-full flex items-center gap-0.5 ${cfg.bgClass} ${cfg.textClass}`}
                        >
                          {isRecurring && (
                            <RefreshCw className="w-2 h-2 shrink-0" />
                          )}
                          {ev.title}
                        </span>
                      );
                    })}
                    {dayEvents.length > 2 && (
                      <span className="text-[9px] text-muted-foreground font-medium">
                        +{dayEvents.length - 2}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected day panel */}
        {selectedDay && (
          <div
            className="bg-card border border-border rounded-xl p-3 space-y-2"
            data-ocid="calendar.day_panel"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">
                {new Date(`${selectedDay}T12:00:00`).toLocaleDateString(
                  language === "sw" ? "sw-TZ" : "en-US",
                  { weekday: "long", month: "long", day: "numeric" },
                )}
              </h3>
              <Button
                size="sm"
                variant="outline"
                className="gap-1 h-7 text-xs px-2"
                onClick={() => openAddModal(selectedDay)}
                data-ocid="calendar.add_event_button"
              >
                <Plus className="w-3 h-3" />
                {t("addEvent")}
              </Button>
            </div>
            {selectedDayEvents.length === 0 ? (
              <p
                className="text-xs text-muted-foreground py-2 text-center"
                data-ocid="calendar.day_panel.empty_state"
              >
                {t("noEvents")}
              </p>
            ) : (
              <div className="space-y-1.5">
                {selectedDayEvents.map((ev, idx) => {
                  const cfg = EVENT_TYPE_CONFIG[ev.eventType];
                  const isRecurring = (
                    ev as CalendarEvent & { _isRecurringInstance?: boolean }
                  )._isRecurringInstance;
                  return (
                    <button
                      key={ev.id + ev.date}
                      type="button"
                      data-ocid={`calendar.event_chip.${idx + 1}`}
                      onClick={() => !isRecurring && openEditModal(ev)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left ${cfg.bgClass} ${isRecurring ? "opacity-70" : "hover:opacity-80"} transition-opacity`}
                    >
                      <span className="text-base shrink-0">{cfg.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-xs font-semibold truncate ${cfg.textClass}`}
                        >
                          {ev.title}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          {lbl(cfg.labelEn, cfg.labelSw)}
                          {ev.time && ` · ${ev.time}`}
                          {isRecurring && (
                            <span className="ml-1 inline-flex items-center gap-0.5">
                              <RefreshCw className="w-2 h-2" />
                              {lbl("Recurring", "Inayorudiwa")}
                            </span>
                          )}
                        </p>
                      </div>
                      {ev.notes && (
                        <span className="text-[9px] text-muted-foreground truncate max-w-[60px]">
                          {ev.notes}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Legend */}
        <div className="bg-card border border-border rounded-xl p-3">
          <h3 className="text-xs font-semibold text-muted-foreground mb-2">
            {t("eventTypes")}
          </h3>
          <div className="grid grid-cols-2 gap-1.5">
            {(role === "livestock_keeper"
              ? LIVESTOCK_EVENT_TYPES
              : FARMER_EVENT_TYPES
            ).map((type) => {
              const cfg = EVENT_TYPE_CONFIG[type];
              return (
                <div
                  key={type}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-lg ${cfg.bgClass}`}
                >
                  <span className="text-sm">{cfg.emoji}</span>
                  <span className={`text-[10px] font-medium ${cfg.textClass}`}>
                    {lbl(cfg.labelEn, cfg.labelSw)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center text-xs text-muted-foreground pb-4">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            className="hover:text-primary"
            target="_blank"
            rel="noreferrer"
          >
            caffeine.ai
          </a>
        </div>
      </div>

      <EventModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditEvent(null);
        }}
        onSave={handleSave}
        onDelete={editEvent ? handleDelete : undefined}
        initial={editEvent}
        role={role}
        defaultDate={modalDefaultDate.current}
      />
    </Layout>
  );
}
