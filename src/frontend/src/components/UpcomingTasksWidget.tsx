import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type CalendarEvent, loadEvents } from "@/lib/calendarStorage";
import { EVENT_TYPE_CONFIG } from "@/lib/calendarTypes";
import { useAuthStore } from "@/store/authStore";
import { useLanguageStore } from "@/store/languageStore";
import { useNavigate } from "@tanstack/react-router";
import { CalendarDays, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function formatEventDate(dateStr: string, language: string) {
  const today = todayStr();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];
  if (dateStr === today) return language === "sw" ? "Leo" : "Today";
  if (dateStr === tomorrowStr) return language === "sw" ? "Kesho" : "Tomorrow";
  return new Date(`${dateStr}T12:00:00`).toLocaleDateString(
    language === "sw" ? "sw-TZ" : "en-US",
    { month: "short", day: "numeric" },
  );
}

export function UpcomingTasksWidget() {
  const { user } = useAuthStore();
  const { t, language } = useLanguageStore();
  const navigate = useNavigate();
  const userId = user?.id ?? "guest";

  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    setEvents(loadEvents(userId));
  }, [userId]);

  const today = todayStr();

  const upcoming = events
    .filter((e) => e.date >= today)
    .sort((a, b) =>
      (a.date + (a.time ?? "")).localeCompare(b.date + (b.time ?? "")),
    )
    .slice(0, 5);

  const overdue = events.filter((e) => e.date < today);
  const todayEvents = events.filter((e) => e.date === today);
  const badgeCount = todayEvents.length + overdue.length;

  const lbl = (en: string, sw: string) => (language === "sw" ? sw : en);

  return (
    <section data-ocid="upcoming_tasks.section">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
          <CalendarDays className="w-4 h-4 text-primary" />
          {t("upcomingTasks")}
          {badgeCount > 0 && (
            <Badge className="bg-destructive text-destructive-foreground border-0 text-[10px] h-4 px-1 ml-0.5">
              {badgeCount}
            </Badge>
          )}
        </h2>
        <Button
          size="sm"
          variant="ghost"
          className="h-7 text-xs px-2 gap-1 text-primary hover:text-primary"
          onClick={() => navigate({ to: "/calendar" })}
          data-ocid="upcoming_tasks.view_calendar_button"
        >
          {t("viewAll")}
        </Button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {upcoming.length === 0 ? (
          <div
            className="flex flex-col items-center gap-2 py-6 px-4 text-center"
            data-ocid="upcoming_tasks.empty_state"
          >
            <CalendarDays className="w-8 h-8 text-muted-foreground/40" />
            <p className="text-xs text-muted-foreground">
              {lbl(
                "No upcoming tasks. Tap to add events.",
                "Hakuna kazi zijazo. Gusa kuongeza.",
              )}
            </p>
            <Button
              size="sm"
              variant="outline"
              className="gap-1 h-7 text-xs"
              onClick={() => navigate({ to: "/calendar" })}
              data-ocid="upcoming_tasks.empty_state_button"
            >
              <CalendarDays className="w-3 h-3" />
              {t("calendarTitle")}
            </Button>
          </div>
        ) : (
          <div>
            {upcoming.map((ev, idx) => {
              const cfg = EVENT_TYPE_CONFIG[ev.eventType];
              const isToday = ev.date === today;
              const isOverdue = ev.date < today;
              return (
                <button
                  key={ev.id}
                  type="button"
                  data-ocid={`upcoming_tasks.item.${idx + 1}`}
                  onClick={() => navigate({ to: "/calendar" })}
                  className="w-full flex items-center gap-3 px-3 py-2.5 border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors text-left"
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${cfg.bgClass}`}
                  >
                    <span className="text-sm">{cfg.emoji}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate">
                      {ev.title}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {lbl(cfg.labelEn, cfg.labelSw)}
                      {ev.time && ` · ${ev.time}`}
                      {ev.recurring !== "none" && (
                        <RefreshCw className="w-2.5 h-2.5 inline ml-1" />
                      )}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span
                      className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                        isToday
                          ? "bg-primary/15 text-primary"
                          : isOverdue
                            ? "bg-destructive/10 text-destructive"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isOverdue
                        ? lbl("Overdue", "Imechelewa")
                        : formatEventDate(ev.date, language)}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
