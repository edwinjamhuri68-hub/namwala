export type CalendarEventType =
  | "planting"
  | "irrigation"
  | "fertilizer"
  | "harvest"
  | "pestControl"
  | "soilTesting"
  | "marketDay"
  | "vaccination"
  | "feeding"
  | "breeding"
  | "vetAppointment"
  | "healthCheck"
  | "deworming"
  | "livestockSale";

export type RecurringPattern =
  | "none"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly";

export interface EventTypeConfig {
  emoji: string;
  bgClass: string;
  textClass: string;
  labelEn: string;
  labelSw: string;
}

export const EVENT_TYPE_CONFIG: Record<CalendarEventType, EventTypeConfig> = {
  planting: {
    emoji: "🌱",
    bgClass: "bg-green-100",
    textClass: "text-green-700",
    labelEn: "Planting",
    labelSw: "Kupanda",
  },
  irrigation: {
    emoji: "💧",
    bgClass: "bg-blue-100",
    textClass: "text-blue-700",
    labelEn: "Irrigation",
    labelSw: "Umwagiliaji",
  },
  fertilizer: {
    emoji: "⚗️",
    bgClass: "bg-yellow-100",
    textClass: "text-yellow-700",
    labelEn: "Fertilizer",
    labelSw: "Mbolea",
  },
  harvest: {
    emoji: "🌾",
    bgClass: "bg-orange-100",
    textClass: "text-orange-700",
    labelEn: "Harvest",
    labelSw: "Mavuno",
  },
  pestControl: {
    emoji: "🐛",
    bgClass: "bg-red-100",
    textClass: "text-red-700",
    labelEn: "Pest Control",
    labelSw: "Udhibiti wa Wadudu",
  },
  soilTesting: {
    emoji: "🔬",
    bgClass: "bg-amber-100",
    textClass: "text-amber-700",
    labelEn: "Soil Testing",
    labelSw: "Kupima Udongo",
  },
  marketDay: {
    emoji: "🛒",
    bgClass: "bg-teal-100",
    textClass: "text-teal-700",
    labelEn: "Market Day",
    labelSw: "Siku ya Soko",
  },
  vaccination: {
    emoji: "💉",
    bgClass: "bg-purple-100",
    textClass: "text-purple-700",
    labelEn: "Vaccination",
    labelSw: "Chanjo",
  },
  feeding: {
    emoji: "🌿",
    bgClass: "bg-teal-100",
    textClass: "text-teal-700",
    labelEn: "Feeding",
    labelSw: "Kulisha",
  },
  breeding: {
    emoji: "🐄",
    bgClass: "bg-pink-100",
    textClass: "text-pink-700",
    labelEn: "Breeding",
    labelSw: "Uzazi",
  },
  vetAppointment: {
    emoji: "🏥",
    bgClass: "bg-red-100",
    textClass: "text-red-700",
    labelEn: "Vet Appointment",
    labelSw: "Miadi ya Daktari",
  },
  healthCheck: {
    emoji: "❤️",
    bgClass: "bg-rose-100",
    textClass: "text-rose-700",
    labelEn: "Health Check",
    labelSw: "Ukaguzi wa Afya",
  },
  deworming: {
    emoji: "💊",
    bgClass: "bg-indigo-100",
    textClass: "text-indigo-700",
    labelEn: "Deworming",
    labelSw: "Dawa ya Minyoo",
  },
  livestockSale: {
    emoji: "💰",
    bgClass: "bg-orange-100",
    textClass: "text-orange-700",
    labelEn: "Livestock Sale",
    labelSw: "Kuuza Mifugo",
  },
};

export const FARMER_EVENT_TYPES: CalendarEventType[] = [
  "planting",
  "irrigation",
  "fertilizer",
  "harvest",
  "pestControl",
  "soilTesting",
  "marketDay",
];

export const LIVESTOCK_EVENT_TYPES: CalendarEventType[] = [
  "vaccination",
  "feeding",
  "breeding",
  "vetAppointment",
  "healthCheck",
  "deworming",
  "livestockSale",
];
