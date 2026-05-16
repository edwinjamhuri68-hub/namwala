function storageKey(userId) {
  return `namwala_calendar_${userId}`;
}
function loadEvents(userId) {
  try {
    const raw = localStorage.getItem(storageKey(userId));
    if (!raw) return getDefaultEvents(userId);
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
function saveEvent(userId, event) {
  const all = loadEvents(userId);
  const idx = all.findIndex((e) => e.id === event.id);
  if (idx >= 0) all[idx] = event;
  else all.push(event);
  try {
    localStorage.setItem(storageKey(userId), JSON.stringify(all));
  } catch {
  }
}
function deleteEvent(userId, eventId) {
  const all = loadEvents(userId).filter((e) => e.id !== eventId);
  try {
    localStorage.setItem(storageKey(userId), JSON.stringify(all));
  } catch {
  }
}
function today(offsetDays = 0) {
  const d = /* @__PURE__ */ new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split("T")[0];
}
function getDefaultEvents(userId) {
  const events = [
    {
      id: "def1",
      userId,
      eventType: "planting",
      title: "Plant Maize (Masika)",
      date: today(3),
      time: "07:00",
      notes: "2 acres, north field",
      recurring: "none"
    },
    {
      id: "def2",
      userId,
      eventType: "irrigation",
      title: "Irrigate Tomato Field",
      date: today(1),
      time: "06:00",
      notes: "",
      recurring: "weekly"
    },
    {
      id: "def3",
      userId,
      eventType: "fertilizer",
      title: "Apply DAP Fertilizer",
      date: today(7),
      time: "08:00",
      notes: "50kg per acre",
      recurring: "none"
    },
    {
      id: "def4",
      userId,
      eventType: "harvest",
      title: "Harvest Beans",
      date: today(14),
      time: "07:30",
      notes: "3 bags expected",
      recurring: "none"
    },
    {
      id: "def5",
      userId,
      eventType: "vaccination",
      title: "FMD Vaccination — Cattle",
      date: today(5),
      time: "09:00",
      notes: "Contact Dr. Ali",
      recurring: "yearly"
    },
    {
      id: "def6",
      userId,
      eventType: "marketDay",
      title: "Namwala Weekly Market",
      date: today(2),
      time: "08:00",
      notes: "Bring maize",
      recurring: "weekly"
    },
    {
      id: "def7",
      userId,
      eventType: "deworming",
      title: "Deworm Goats",
      date: today(10),
      time: "10:00",
      notes: "Ivermectin",
      recurring: "monthly"
    }
  ];
  try {
    localStorage.setItem(storageKey(userId), JSON.stringify(events));
  } catch {
  }
  return events;
}
const EVENT_TYPE_CONFIG = {
  planting: {
    emoji: "🌱",
    bgClass: "bg-green-100",
    textClass: "text-green-700",
    labelEn: "Planting",
    labelSw: "Kupanda"
  },
  irrigation: {
    emoji: "💧",
    bgClass: "bg-blue-100",
    textClass: "text-blue-700",
    labelEn: "Irrigation",
    labelSw: "Umwagiliaji"
  },
  fertilizer: {
    emoji: "⚗️",
    bgClass: "bg-yellow-100",
    textClass: "text-yellow-700",
    labelEn: "Fertilizer",
    labelSw: "Mbolea"
  },
  harvest: {
    emoji: "🌾",
    bgClass: "bg-orange-100",
    textClass: "text-orange-700",
    labelEn: "Harvest",
    labelSw: "Mavuno"
  },
  pestControl: {
    emoji: "🐛",
    bgClass: "bg-red-100",
    textClass: "text-red-700",
    labelEn: "Pest Control",
    labelSw: "Udhibiti wa Wadudu"
  },
  soilTesting: {
    emoji: "🔬",
    bgClass: "bg-amber-100",
    textClass: "text-amber-700",
    labelEn: "Soil Testing",
    labelSw: "Kupima Udongo"
  },
  marketDay: {
    emoji: "🛒",
    bgClass: "bg-teal-100",
    textClass: "text-teal-700",
    labelEn: "Market Day",
    labelSw: "Siku ya Soko"
  },
  vaccination: {
    emoji: "💉",
    bgClass: "bg-purple-100",
    textClass: "text-purple-700",
    labelEn: "Vaccination",
    labelSw: "Chanjo"
  },
  feeding: {
    emoji: "🌿",
    bgClass: "bg-teal-100",
    textClass: "text-teal-700",
    labelEn: "Feeding",
    labelSw: "Kulisha"
  },
  breeding: {
    emoji: "🐄",
    bgClass: "bg-pink-100",
    textClass: "text-pink-700",
    labelEn: "Breeding",
    labelSw: "Uzazi"
  },
  vetAppointment: {
    emoji: "🏥",
    bgClass: "bg-red-100",
    textClass: "text-red-700",
    labelEn: "Vet Appointment",
    labelSw: "Miadi ya Daktari"
  },
  healthCheck: {
    emoji: "❤️",
    bgClass: "bg-rose-100",
    textClass: "text-rose-700",
    labelEn: "Health Check",
    labelSw: "Ukaguzi wa Afya"
  },
  deworming: {
    emoji: "💊",
    bgClass: "bg-indigo-100",
    textClass: "text-indigo-700",
    labelEn: "Deworming",
    labelSw: "Dawa ya Minyoo"
  },
  livestockSale: {
    emoji: "💰",
    bgClass: "bg-orange-100",
    textClass: "text-orange-700",
    labelEn: "Livestock Sale",
    labelSw: "Kuuza Mifugo"
  }
};
const FARMER_EVENT_TYPES = [
  "planting",
  "irrigation",
  "fertilizer",
  "harvest",
  "pestControl",
  "soilTesting",
  "marketDay"
];
const LIVESTOCK_EVENT_TYPES = [
  "vaccination",
  "feeding",
  "breeding",
  "vetAppointment",
  "healthCheck",
  "deworming",
  "livestockSale"
];
export {
  EVENT_TYPE_CONFIG as E,
  FARMER_EVENT_TYPES as F,
  LIVESTOCK_EVENT_TYPES as L,
  deleteEvent as d,
  loadEvents as l,
  saveEvent as s
};
