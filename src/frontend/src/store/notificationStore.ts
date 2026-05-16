import type {
  AppNotification,
  NotificationPriority,
  NotificationType,
} from "@/types";
import { create } from "zustand";

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: "n1",
    userId: "u1",
    type: "disease_alert",
    priority: "critical",
    title: "Fall Armyworm Outbreak",
    body: "Fall armyworm detected in Mbeya region. Inspect your maize crops immediately.",
    read: false,
    createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
    actionUrl: "/dashboard/farmer",
  },
  {
    id: "n2",
    userId: "u1",
    type: "weather_alert",
    priority: "high",
    title: "Heavy Rainfall Expected",
    body: "Heavy rainfall forecast for Mbeya area over the next 48 hours. Secure livestock.",
    read: false,
    createdAt: new Date(Date.now() - 45 * 60000).toISOString(),
  },
  {
    id: "n3",
    userId: "u1",
    type: "price_update",
    priority: "normal",
    title: "Maize Price Increased",
    body: "Maize price up 5% at Kariakoo market. Current price: TSh 950/kg",
    read: false,
    createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
  },
  {
    id: "n4",
    userId: "u1",
    type: "message",
    priority: "normal",
    title: "New message from Dr. Sarah",
    body: "I have reviewed your crop images. Please schedule a farm visit for detailed assessment.",
    read: true,
    createdAt: new Date(Date.now() - 5 * 3600000).toISOString(),
  },
  {
    id: "n5",
    userId: "u2",
    type: "vaccination_reminder",
    priority: "high",
    title: "Vaccination Reminder",
    body: "Your cattle herd is due for FMD vaccination in 3 days. Contact your vet today.",
    read: false,
    createdAt: new Date(Date.now() - 24 * 3600000).toISOString(),
  },
  {
    id: "n6",
    userId: "u2",
    type: "pest_outbreak",
    priority: "critical",
    title: "Lumpy Skin Disease Alert",
    body: "LSD cases reported in neighboring farms. Vaccinate immediately.",
    read: false,
    createdAt: new Date(Date.now() - 30 * 60000).toISOString(),
  },
  {
    id: "n7",
    userId: "u1",
    type: "service_request",
    priority: "normal",
    title: "Service Request Accepted",
    body: "Grace Msigwa has accepted your plowing request for next Monday.",
    read: true,
    createdAt: new Date(Date.now() - 3 * 3600000).toISOString(),
  },
  {
    id: "n8",
    userId: "u1",
    type: "order_update",
    priority: "normal",
    title: "Order Delivered",
    body: "Your order of 50kg NPK fertilizer has been delivered. Check and confirm.",
    read: false,
    createdAt: new Date(Date.now() - 6 * 3600000).toISOString(),
  },
];

interface NotificationState {
  notifications: AppNotification[];
  unreadCount: number;
  markRead: (id: string) => void;
  markAllRead: () => void;
  addNotification: (n: Omit<AppNotification, "id" | "createdAt">) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: INITIAL_NOTIFICATIONS,
  unreadCount: INITIAL_NOTIFICATIONS.filter((n) => !n.read).length,

  markRead: (id) =>
    set((s) => {
      const updated = s.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n,
      );
      return {
        notifications: updated,
        unreadCount: updated.filter((n) => !n.read).length,
      };
    }),

  markAllRead: () =>
    set((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),

  addNotification: (data) => {
    const newN: AppNotification = {
      ...data,
      id: `n${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    set((s) => ({
      notifications: [newN, ...s.notifications],
      unreadCount: s.unreadCount + 1,
    }));
  },
}));

// Polling simulation hook
const RANDOM_TYPES: NotificationType[] = [
  "price_update",
  "weather_alert",
  "disease_alert",
  "pest_outbreak",
];
const RANDOM_PRIORITIES: Record<NotificationType, NotificationPriority> = {
  price_update: "normal",
  weather_alert: "high",
  disease_alert: "critical",
  pest_outbreak: "critical",
  message: "normal",
  service_request: "normal",
  vaccination_reminder: "high",
  order_update: "normal",
  badge_earned: "high",
};
const RANDOM_MESSAGES: Record<
  NotificationType,
  { en: string[]; title: string }
> = {
  price_update: {
    title: "Price Update",
    en: [
      "Rice prices down 3% at Mwanza market",
      "Coffee prices up 8% — good time to sell",
    ],
  },
  weather_alert: {
    title: "Weather Alert",
    en: [
      "Strong winds expected in Arusha region",
      "Optimal planting conditions for the next 5 days",
    ],
  },
  disease_alert: {
    title: "Disease Alert",
    en: [
      "Blight reported in Iringa. Monitor your crops.",
      "Rust fungus spreading in Kilimanjaro region",
    ],
  },
  pest_outbreak: {
    title: "Pest Alert",
    en: [
      "Desert locust sighting near Dodoma",
      "Aphid infestation warning for bean farmers",
    ],
  },
  message: { title: "New Message", en: ["You have a new message"] },
  service_request: {
    title: "Service Request",
    en: ["New service request received"],
  },
  vaccination_reminder: {
    title: "Vaccination Due",
    en: ["Time to vaccinate your animals"],
  },
  order_update: {
    title: "Order Update",
    en: ["Your order status has changed"],
  },
  badge_earned: {
    title: "Badge Earned",
    en: ["You earned a new badge!"],
  },
};

/**
 * Trigger a badge-earned notification for the currently logged-in user.
 * Call this client-side immediately after detecting a new badge from the backend.
 */
export function triggerBadgeNotification(
  badgeName: string,
  userId: string,
  language: string,
) {
  const { addNotification } = useNotificationStore.getState();
  const title = language === "sw" ? "🏆 Umepata Beji!" : "🏆 New Badge Earned!";
  const body =
    language === "sw"
      ? `Umepata beji ya "${badgeName}"! Angalia profaili yako.`
      : `You earned the "${badgeName}" badge! View your profile to see it.`;
  addNotification({
    userId,
    type: "badge_earned",
    priority: "high",
    title,
    body,
    read: false,
    actionUrl: `/user/${userId}`,
  });
}

/**
 * Trigger a real-time in-app notification when a buyer sends an inquiry.
 * Call this from the marketplace when handleInquiry fires.
 */
export function triggerInquiryNotification(
  listingTitle: string,
  buyerName: string,
  listingId: string,
) {
  const { addNotification } = useNotificationStore.getState();
  addNotification({
    userId: "current",
    type: "message",
    priority: "high",
    title: `New inquiry on ${listingTitle}`,
    body: `${buyerName} is interested in your listing. Tap to reply.`,
    read: false,
    relatedId: listingId,
    actionUrl: "/messages",
  });
}

export function useNotificationPolling() {
  const { addNotification } = useNotificationStore();

  const simulateNew = () => {
    const type = RANDOM_TYPES[Math.floor(Math.random() * RANDOM_TYPES.length)];
    const msgs = RANDOM_MESSAGES[type].en;
    const body = msgs[Math.floor(Math.random() * msgs.length)];
    addNotification({
      userId: "current",
      type,
      priority: RANDOM_PRIORITIES[type],
      title: RANDOM_MESSAGES[type].title,
      body,
      read: false,
    });
  };

  return { simulateNew };
}
