import { Layout } from "@/components/Layout";
import { NotificationItem } from "@/components/ui/NotificationItem";
import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/store/languageStore";
import { useNotificationStore } from "@/store/notificationStore";
import { useNavigate } from "@tanstack/react-router";
import { Bell } from "lucide-react";

export default function NotificationsPage() {
  const { notifications, unreadCount, markRead, markAllRead } =
    useNotificationStore();
  const { t, language } = useLanguageStore();
  const navigate = useNavigate();

  // Sort most recent first
  const sorted = [...notifications].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const handleNotificationClick = (n: (typeof notifications)[number]) => {
    markRead(n.id);
    if (n.actionUrl) {
      navigate({ to: n.actionUrl as Parameters<typeof navigate>[0]["to"] });
    } else if (n.type === "message" && n.relatedId) {
      navigate({ to: "/messages", search: { recipientId: undefined } });
    }
  };

  return (
    <Layout>
      <div>
        {/* Header section */}
        <div className="px-4 py-4 border-b border-border bg-card">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-display font-bold text-foreground">
              {t("notifications")}
            </h1>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllRead}
                data-ocid="notifications.mark_all_read_button"
                className="text-xs text-primary font-semibold"
              >
                {t("markAllRead")}
              </Button>
            )}
          </div>
          {unreadCount > 0 && (
            <p className="text-xs text-muted-foreground mt-0.5">
              {unreadCount} {t("unreadNotifications")}
            </p>
          )}
        </div>

        {/* Notification list */}
        {sorted.length === 0 ? (
          <div
            data-ocid="notifications.empty_state"
            className="flex flex-col items-center justify-center py-16 px-4 text-center"
          >
            <Bell className="w-12 h-12 text-muted-foreground/30 mb-3" />
            <p className="text-sm font-medium text-muted-foreground">
              {t("noData")}
            </p>
          </div>
        ) : (
          <div
            data-ocid="notifications.list"
            className="divide-y divide-border"
          >
            {sorted.map((n, i) => (
              <div
                key={n.id}
                data-ocid={`notification.item.${i + 1}`}
                className={
                  n.type === "badge_earned"
                    ? "border-l-2 border-amber-400 bg-amber-50/40"
                    : n.read
                      ? ""
                      : "bg-primary/5"
                }
              >
                <NotificationItem
                  notification={n}
                  onClick={() => handleNotificationClick(n)}
                  lang={language}
                />
                {/* Badge earned: gold shimmer CTA chip */}
                {!n.read && n.type === "badge_earned" && n.actionUrl && (
                  <div className="px-4 pb-3 -mt-1">
                    <button
                      type="button"
                      onClick={() => handleNotificationClick(n)}
                      className="text-[11px] font-semibold text-amber-700 bg-amber-100 hover:bg-amber-200 transition-smooth px-3 py-1 rounded-full"
                      data-ocid={`notification.view_badge_button.${i + 1}`}
                    >
                      {language === "sw"
                        ? "Angalia Profaili →"
                        : "View Profile →"}
                    </button>
                  </div>
                )}
                {/* Message-type inquiry: show CTA chip */}
                {!n.read && n.type === "message" && n.relatedId && (
                  <div className="px-4 pb-3 -mt-1">
                    <button
                      type="button"
                      onClick={() => handleNotificationClick(n)}
                      className="text-[11px] font-semibold text-primary bg-primary/10 hover:bg-primary/20 transition-smooth px-3 py-1 rounded-full"
                      data-ocid={`notification.view_message_button.${i + 1}`}
                    >
                      {t("viewMessage")} →
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
