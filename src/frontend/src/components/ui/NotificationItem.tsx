import { timeAgo } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import type { AppNotification } from "@/types";
import {
  AlertTriangle,
  Bell,
  Bug,
  MessageCircle,
  Package,
  Syringe,
  TrendingUp,
  Trophy,
  Wrench,
} from "lucide-react";

interface NotificationItemProps {
  notification: AppNotification;
  onClick?: () => void;
  lang?: "en" | "sw";
}

const TYPE_ICONS = {
  disease_alert: AlertTriangle,
  weather_alert: Bell,
  price_update: TrendingUp,
  message: MessageCircle,
  service_request: Wrench,
  pest_outbreak: Bug,
  vaccination_reminder: Syringe,
  order_update: Package,
  badge_earned: Trophy,
};

const PRIORITY_DOT: Record<string, string> = {
  critical: "bg-destructive",
  high: "bg-amber-400",
  normal: "bg-accent",
};

const TYPE_BG: Record<string, string> = {
  disease_alert: "bg-destructive/10 text-destructive",
  weather_alert: "bg-blue-50 text-blue-600",
  price_update: "bg-green-50 text-green-600",
  message: "bg-primary/10 text-primary",
  service_request: "bg-accent/10 text-accent",
  pest_outbreak: "bg-amber-50 text-amber-700",
  vaccination_reminder: "bg-purple-50 text-purple-600",
  order_update: "bg-secondary text-secondary-foreground",
  badge_earned: "bg-amber-100 text-amber-600",
};

export function NotificationItem({
  notification,
  onClick,
  lang = "en",
}: NotificationItemProps) {
  const Icon = TYPE_ICONS[notification.type] ?? Bell;
  const isBadge = notification.type === "badge_earned";

  return (
    <button
      type="button"
      data-ocid="notification.item"
      className={cn(
        "w-full flex items-start gap-3 px-4 py-3 text-left transition-smooth hover:bg-muted/40 active:bg-muted/60",
        !notification.read && "bg-primary/5",
        isBadge &&
          !notification.read &&
          "bg-amber-50/60 border-l-2 border-amber-400",
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          "w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center",
          TYPE_BG[notification.type] ?? "bg-muted",
          isBadge && "ring-2 ring-amber-300",
        )}
      >
        <Icon className={cn("w-4 h-4", isBadge && "drop-shadow-sm")} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <span
            className={cn(
              "text-sm leading-tight",
              !notification.read
                ? "font-semibold text-foreground"
                : "font-medium text-foreground",
              isBadge && "text-amber-700",
            )}
          >
            {notification.title}
          </span>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <div
              className={cn(
                "w-2 h-2 rounded-full",
                PRIORITY_DOT[notification.priority],
              )}
            />
            <span className="text-[10px] text-muted-foreground whitespace-nowrap">
              {timeAgo(notification.createdAt, lang)}
            </span>
          </div>
        </div>
        <p
          className={cn(
            "text-xs text-muted-foreground mt-0.5 line-clamp-2 leading-relaxed",
            isBadge && "text-amber-600/80",
          )}
        >
          {notification.body}
        </p>
      </div>
    </button>
  );
}
