import { u as useAuthStore, a as useLanguageStore, r as reactExports, j as jsxRuntimeExports, L as Layout, O as CalendarDays, m as Badge, C as ChevronLeft, ac as ChevronRight, B as Button, X } from "./index-BUVIgngH.js";
import { l as loadEvents, E as EVENT_TYPE_CONFIG, L as LIVESTOCK_EVENT_TYPES, F as FARMER_EVENT_TYPES, s as saveEvent, d as deleteEvent } from "./calendarTypes-ZI3l1TGg.js";
import { R as RefreshCw } from "./refresh-cw-BNbremAW.js";
import { P as Plus } from "./plus-DMsGFanj.js";
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfWeek(year, month) {
  return new Date(year, month, 1).getDay();
}
function toDateStr(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}
function todayStr() {
  const d = /* @__PURE__ */ new Date();
  return toDateStr(d.getFullYear(), d.getMonth(), d.getDate());
}
function EventModal({
  open,
  onClose,
  onSave,
  onDelete,
  initial,
  role,
  defaultDate
}) {
  const { t, language } = useLanguageStore();
  const isLivestock = role === "livestock_keeper";
  const availableTypes = isLivestock ? LIVESTOCK_EVENT_TYPES : FARMER_EVENT_TYPES;
  const [eventType, setEventType] = reactExports.useState(
    (initial == null ? void 0 : initial.eventType) ?? availableTypes[0]
  );
  const [title, setTitle] = reactExports.useState((initial == null ? void 0 : initial.title) ?? "");
  const [date, setDate] = reactExports.useState((initial == null ? void 0 : initial.date) ?? defaultDate);
  const [time, setTime] = reactExports.useState((initial == null ? void 0 : initial.time) ?? "");
  const [notes, setNotes] = reactExports.useState((initial == null ? void 0 : initial.notes) ?? "");
  const [recurring, setRecurring] = reactExports.useState(
    (initial == null ? void 0 : initial.recurring) ?? "none"
  );
  const [recurringEndDate, setRecurringEndDate] = reactExports.useState(
    (initial == null ? void 0 : initial.recurringEndDate) ?? ""
  );
  reactExports.useEffect(() => {
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
  const lbl = (en, sw) => language === "sw" ? sw : en;
  const RECURRING_OPTIONS = [
    { value: "none", label: lbl("None", "Hakuna") },
    { value: "daily", label: lbl("Daily", "Kila Siku") },
    { value: "weekly", label: lbl("Weekly", "Kila Wiki") },
    { value: "monthly", label: lbl("Monthly", "Kila Mwezi") },
    { value: "yearly", label: lbl("Yearly", "Kila Mwaka") }
  ];
  function handleSubmit(ev) {
    ev.preventDefault();
    onSave({
      eventType,
      title: title.trim() || t(`eventType_${eventType}`) || eventType,
      date,
      time: time || void 0,
      notes: notes.trim() || void 0,
      recurring,
      recurringEndDate: recurringEndDate || void 0
    });
  }
  const cfg = EVENT_TYPE_CONFIG[eventType];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 px-0 sm:px-4",
      onClick: (e) => {
        if (e.target === e.currentTarget) onClose();
      },
      onKeyDown: (e) => {
        if (e.key === "Escape") onClose();
      },
      role: "presentation",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]",
          "data-ocid": "calendar.event_dialog",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border sticky top-0 bg-card z-10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-base text-foreground", children: initial ? t("editEvent") : t("addEvent") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  "aria-label": "Close",
                  "data-ocid": "calendar.event_dialog.close_button",
                  className: "w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "p-4 space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "event-type-group",
                    className: "text-xs font-medium text-muted-foreground block mb-1",
                    children: t("eventType")
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-1.5", children: availableTypes.map((type) => {
                  const c = EVENT_TYPE_CONFIG[type];
                  const active = eventType === type;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => setEventType(type),
                      "data-ocid": `calendar.event_type_${type}`,
                      className: `flex flex-col items-center gap-1 py-2 px-1 rounded-lg border text-xs font-medium transition-colors ${active ? `${c.bgClass} ${c.textClass} border-current/30` : "bg-background border-border text-muted-foreground hover:bg-muted"}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: c.emoji }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "leading-tight text-center", children: lbl(c.labelEn, c.labelSw) })
                      ]
                    },
                    type
                  );
                }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "event-title",
                    className: "text-xs font-medium text-muted-foreground block mb-1",
                    children: lbl("Title", "Kichwa")
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "event-title",
                    type: "text",
                    value: title,
                    onChange: (e) => setTitle(e.target.value),
                    placeholder: lbl(cfg.labelEn, cfg.labelSw),
                    "data-ocid": "calendar.event_title_input",
                    className: "w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "event-date",
                      className: "text-xs font-medium text-muted-foreground block mb-1",
                      children: t("eventDate")
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "event-date",
                      type: "date",
                      value: date,
                      onChange: (e) => setDate(e.target.value),
                      required: true,
                      "data-ocid": "calendar.event_date_input",
                      className: "w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "label",
                    {
                      htmlFor: "event-time",
                      className: "text-xs font-medium text-muted-foreground block mb-1",
                      children: [
                        t("eventTime"),
                        " (",
                        lbl("Optional", "Si lazima"),
                        ")"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "event-time",
                      type: "time",
                      value: time,
                      onChange: (e) => setTime(e.target.value),
                      "data-ocid": "calendar.event_time_input",
                      className: "w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    htmlFor: "event-notes",
                    className: "text-xs font-medium text-muted-foreground block mb-1",
                    children: [
                      t("eventNotes"),
                      " (",
                      lbl("Optional", "Si lazima"),
                      ")"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "textarea",
                  {
                    id: "event-notes",
                    value: notes,
                    onChange: (e) => setNotes(e.target.value),
                    rows: 2,
                    "data-ocid": "calendar.event_notes_textarea",
                    className: "w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "event-recurring",
                    className: "text-xs font-medium text-muted-foreground block mb-1",
                    children: t("recurringPattern")
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "select",
                  {
                    id: "event-recurring",
                    value: recurring,
                    onChange: (e) => setRecurring(e.target.value),
                    "data-ocid": "calendar.event_recurring_select",
                    className: "w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40",
                    children: RECURRING_OPTIONS.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o.value, children: o.label }, o.value))
                  }
                )
              ] }),
              recurring !== "none" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    htmlFor: "event-recurring-end",
                    className: "text-xs font-medium text-muted-foreground block mb-1",
                    children: [
                      lbl("Repeat Until", "Rudia Hadi"),
                      " (",
                      lbl("Optional", "Si lazima"),
                      ")"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "event-recurring-end",
                    type: "date",
                    value: recurringEndDate,
                    onChange: (e) => setRecurringEndDate(e.target.value),
                    "data-ocid": "calendar.event_recurring_end_input",
                    className: "w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
                initial && onDelete && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "destructive",
                    size: "sm",
                    onClick: onDelete,
                    "data-ocid": "calendar.event_dialog.delete_button",
                    className: "gap-1",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" }),
                      t("deleteEvent")
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    onClick: onClose,
                    "data-ocid": "calendar.event_dialog.cancel_button",
                    className: "flex-1",
                    children: t("cancel")
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    size: "sm",
                    "data-ocid": "calendar.event_dialog.save_button",
                    className: "flex-1",
                    children: t("save")
                  }
                )
              ] })
            ] })
          ]
        }
      )
    }
  );
}
function CalendarPage() {
  const { user } = useAuthStore();
  const { t, language } = useLanguageStore();
  const today = /* @__PURE__ */ new Date();
  const [viewYear, setViewYear] = reactExports.useState(today.getFullYear());
  const [viewMonth, setViewMonth] = reactExports.useState(today.getMonth());
  const [events, setEvents] = reactExports.useState([]);
  const [selectedDay, setSelectedDay] = reactExports.useState(null);
  const [editEvent, setEditEvent] = reactExports.useState(null);
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const modalDefaultDate = reactExports.useRef(todayStr());
  const userId = (user == null ? void 0 : user.id) ?? "guest";
  const role = (user == null ? void 0 : user.role) ?? "farmer";
  reactExports.useEffect(() => {
    setEvents(loadEvents(userId));
  }, [userId]);
  const lbl = (en, sw) => language === "sw" ? sw : en;
  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDOW = getFirstDayOfWeek(viewYear, viewMonth);
  const todayIso = todayStr();
  const eventsByDate = reactExports.useMemo(() => {
    const map = {};
    for (const e of events) {
      if (!map[e.date]) map[e.date] = [];
      map[e.date].push(e);
      if (e.recurring !== "none") {
        const baseDate = /* @__PURE__ */ new Date(`${e.date}T00:00:00`);
        const endDate = e.recurringEndDate ? /* @__PURE__ */ new Date(`${e.recurringEndDate}T00:00:00`) : new Date(viewYear, viewMonth + 2, 0);
        let cursor = new Date(baseDate);
        const step = e.recurring === "daily" ? 1 : e.recurring === "weekly" ? 7 : e.recurring === "monthly" ? 30 : 365;
        for (let i = 0; i < 60; i++) {
          if (e.recurring === "monthly") {
            cursor = new Date(baseDate);
            cursor.setMonth(baseDate.getMonth() + i + 1);
          } else if (e.recurring === "yearly") {
            cursor = new Date(baseDate);
            cursor.setFullYear(baseDate.getFullYear() + i + 1);
          } else {
            cursor = new Date(cursor.getTime() + step * 864e5);
          }
          if (cursor > endDate) break;
          const iso = cursor.toISOString().split("T")[0];
          if (!map[iso]) map[iso] = [];
          if (!map[iso].some((ev) => ev.id === e.id)) {
            map[iso].push({
              ...e,
              date: iso,
              _isRecurringInstance: true
            });
          }
        }
      }
    }
    return map;
  }, [events, viewYear, viewMonth]);
  function openAddModal(dateStr) {
    modalDefaultDate.current = dateStr;
    setEditEvent(null);
    setModalOpen(true);
  }
  function openEditModal(e) {
    setEditEvent(e);
    modalDefaultDate.current = e.date;
    setModalOpen(true);
  }
  function handleSave(data) {
    if (editEvent && !editEvent._isRecurringInstance) {
      const updated = { ...editEvent, ...data };
      const all = events.map((ev) => ev.id === editEvent.id ? updated : ev);
      saveEvent(userId, updated);
      setEvents(all);
    } else {
      const newEv = {
        id: `ev_${Date.now()}`,
        userId,
        ...data
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
    "December"
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
    "Desemba"
  ];
  const DOW_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const DOW_SW = ["Jum", "Jtn", "Jmm", "Aju", "Alh", "Ijm", "Jmz"];
  const monthName = language === "sw" ? MONTH_NAMES_SW[viewMonth] : MONTH_NAMES_EN[viewMonth];
  const dowLabels = language === "sw" ? DOW_SW : DOW_EN;
  const todayEventsCount = (eventsByDate[todayIso] ?? []).length;
  const overdueCount = events.filter((e) => e.date < todayIso).length;
  const badgeCount = todayEventsCount + overdueCount;
  const selectedDayEvents = selectedDay ? eventsByDate[selectedDay] ?? [] : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-4 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-5 h-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-lg text-foreground", children: t("calendarTitle") }),
        badgeCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-destructive text-destructive-foreground border-0 text-[10px] h-5 px-1.5", children: badgeCount })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl overflow-hidden shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: prevMonth,
              "data-ocid": "calendar.prev_month_button",
              className: "w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors",
              "aria-label": "Previous month",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-semibold text-sm text-foreground", children: [
              monthName,
              " ",
              viewYear
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: goToday,
                "data-ocid": "calendar.today_button",
                className: "text-[11px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors",
                children: t("today")
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: nextMonth,
              "data-ocid": "calendar.next_month_button",
              className: "w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors",
              "aria-label": "Next month",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 border-b border-border", children: dowLabels.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "text-center text-[10px] font-semibold text-muted-foreground py-2",
            children: d
          },
          d
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-7", children: [
          [...Array(firstDOW).keys()].map((dow) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "border-r border-b border-border/50 min-h-[60px]"
            },
            `${viewYear}-${viewMonth}-col-${dow}`
          )),
          Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const iso = toDateStr(viewYear, viewMonth, day);
            const dayEvents = eventsByDate[iso] ?? [];
            const isToday = iso === todayIso;
            const isSelected = selectedDay === iso;
            const isPast = iso < todayIso;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": `calendar.day.${day}`,
                onClick: () => setSelectedDay((prev) => prev === iso ? null : iso),
                className: `min-h-[60px] border-r border-b border-border/50 p-1 flex flex-col items-start transition-colors ${isSelected ? "bg-primary/10" : isPast ? "bg-muted/20" : "hover:bg-muted/40"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `text-xs font-semibold w-6 h-6 flex items-center justify-center rounded-full mb-0.5 ${isToday ? "bg-primary text-primary-foreground" : isPast ? "text-muted-foreground" : "text-foreground"}`,
                      children: day
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5 w-full overflow-hidden", children: [
                    dayEvents.slice(0, 2).map((ev) => {
                      const cfg = EVENT_TYPE_CONFIG[ev.eventType];
                      const isRecurring = ev._isRecurringInstance;
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: `text-[9px] px-1 py-0.5 rounded font-medium truncate w-full flex items-center gap-0.5 ${cfg.bgClass} ${cfg.textClass}`,
                          children: [
                            isRecurring && /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-2 h-2 shrink-0" }),
                            ev.title
                          ]
                        },
                        ev.id + ev.date
                      );
                    }),
                    dayEvents.length > 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] text-muted-foreground font-medium", children: [
                      "+",
                      dayEvents.length - 2
                    ] })
                  ] })
                ]
              },
              iso
            );
          })
        ] })
      ] }),
      selectedDay && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-3 space-y-2",
          "data-ocid": "calendar.day_panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: (/* @__PURE__ */ new Date(`${selectedDay}T12:00:00`)).toLocaleDateString(
                language === "sw" ? "sw-TZ" : "en-US",
                { weekday: "long", month: "long", day: "numeric" }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "gap-1 h-7 text-xs px-2",
                  onClick: () => openAddModal(selectedDay),
                  "data-ocid": "calendar.add_event_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3" }),
                    t("addEvent")
                  ]
                }
              )
            ] }),
            selectedDayEvents.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs text-muted-foreground py-2 text-center",
                "data-ocid": "calendar.day_panel.empty_state",
                children: t("noEvents")
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: selectedDayEvents.map((ev, idx) => {
              const cfg = EVENT_TYPE_CONFIG[ev.eventType];
              const isRecurring = ev._isRecurringInstance;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": `calendar.event_chip.${idx + 1}`,
                  onClick: () => !isRecurring && openEditModal(ev),
                  className: `w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left ${cfg.bgClass} ${isRecurring ? "opacity-70" : "hover:opacity-80"} transition-opacity`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base shrink-0", children: cfg.emoji }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: `text-xs font-semibold truncate ${cfg.textClass}`,
                          children: ev.title
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground", children: [
                        lbl(cfg.labelEn, cfg.labelSw),
                        ev.time && ` · ${ev.time}`,
                        isRecurring && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 inline-flex items-center gap-0.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-2 h-2" }),
                          lbl("Recurring", "Inayorudiwa")
                        ] })
                      ] })
                    ] }),
                    ev.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground truncate max-w-[60px]", children: ev.notes })
                  ]
                },
                ev.id + ev.date
              );
            }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold text-muted-foreground mb-2", children: t("eventTypes") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-1.5", children: (role === "livestock_keeper" ? LIVESTOCK_EVENT_TYPES : FARMER_EVENT_TYPES).map((type) => {
          const cfg = EVENT_TYPE_CONFIG[type];
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `flex items-center gap-1.5 px-2 py-1 rounded-lg ${cfg.bgClass}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: cfg.emoji }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-medium ${cfg.textClass}`, children: lbl(cfg.labelEn, cfg.labelSw) })
              ]
            },
            type
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-xs text-muted-foreground pb-4", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        ". Built with love using",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
            className: "hover:text-primary",
            target: "_blank",
            rel: "noreferrer",
            children: "caffeine.ai"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      EventModal,
      {
        open: modalOpen,
        onClose: () => {
          setModalOpen(false);
          setEditEvent(null);
        },
        onSave: handleSave,
        onDelete: editEvent ? handleDelete : void 0,
        initial: editEvent,
        role,
        defaultDate: modalDefaultDate.current
      }
    )
  ] });
}
export {
  CalendarPage as default
};
