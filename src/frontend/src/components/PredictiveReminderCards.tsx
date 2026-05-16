import type { PredictiveReminder, ReminderType } from "@/lib/advisorEngine";
import { generatePredictiveReminders } from "@/lib/advisorEngine";
import { useLanguageStore } from "@/store/languageStore";
import {
  Bell,
  CheckCircle2,
  Clock,
  TrendingUp,
  TriangleAlert,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { AdvisorUserContext } from "./AIAdvisorWidget";

// ─── Types ─────────────────────────────────────────────────────────────────

interface PredictiveReminderCardsProps {
  userProfile: AdvisorUserContext;
  type: "farmer" | "livestock";
}

// ─── Storage helpers ─────────────────────────────────────────────────────────

const DISMISSED_KEY = "namwala-dismissed-reminders";
const SNOOZED_KEY = "namwala-snoozed-reminders";
const SNOOZE_MS = 24 * 60 * 60 * 1000; // 24h

function readSet(key: string): Set<string> {
  try {
    const raw = localStorage.getItem(key);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch {
    return new Set();
  }
}

function writeSet(key: string, set: Set<string>) {
  try {
    localStorage.setItem(key, JSON.stringify([...set]));
  } catch {
    // ignore
  }
}

function readSnoozeMap(): Record<string, number> {
  try {
    const raw = localStorage.getItem(SNOOZED_KEY);
    return raw ? (JSON.parse(raw) as Record<string, number>) : {};
  } catch {
    return {};
  }
}

function writeSnoozeMap(map: Record<string, number>) {
  try {
    localStorage.setItem(SNOOZED_KEY, JSON.stringify(map));
  } catch {
    // ignore
  }
}

// ─── Urgency styles ──────────────────────────────────────────────────────────

const URGENCY_STYLES = {
  high: {
    bar: "bg-destructive",
    badge: "bg-destructive/15 text-destructive border-destructive/30",
    glow: "border-destructive/30",
  },
  medium: {
    bar: "bg-amber-500",
    badge: "bg-amber-500/15 text-amber-700 border-amber-400/40",
    glow: "border-amber-400/40",
  },
  low: {
    bar: "bg-green-500",
    badge: "bg-green-500/15 text-green-700 border-green-400/40",
    glow: "border-green-400/40",
  },
};

function typeIcon(t: ReminderType) {
  switch (t) {
    case "weather":
      return <TriangleAlert className="w-3 h-3" />;
    case "pest":
      return <TriangleAlert className="w-3 h-3" />;
    case "market":
      return <TrendingUp className="w-3 h-3" />;
    default:
      return <Bell className="w-3 h-3" />;
  }
}

function typeLabel(t: ReminderType, lang: "en" | "sw"): string {
  const map: Record<ReminderType, { en: string; sw: string }> = {
    weather: { en: "Weather", sw: "Hewa" },
    seasonal: { en: "Seasonal", sw: "Msimu" },
    pest: { en: "Pest", sw: "Wadudu" },
    market: { en: "Market", sw: "Soko" },
  };
  return map[t][lang];
}

// ─── Single card ─────────────────────────────────────────────────────────────

function ReminderCard({
  reminder,
  onDismiss,
  onSnooze,
}: {
  reminder: PredictiveReminder;
  onDismiss: (id: string) => void;
  onSnooze: (id: string) => void;
}) {
  const { t, language } = useLanguageStore();
  const styles = URGENCY_STYLES[reminder.urgency];
  const lang = language as "en" | "sw";

  return (
    <div
      data-ocid={`predictive_reminders.card.${reminder.id}`}
      className={`relative flex-shrink-0 w-[280px] bg-card rounded-xl border ${styles.glow} shadow-sm overflow-hidden`}
    >
      {/* urgency bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${styles.bar}`} />

      <div className="pl-3 pr-3 py-3">
        {/* header row */}
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="text-lg flex-shrink-0" aria-hidden="true">
            {reminder.icon}
          </span>
          <span
            className={`inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full border ${styles.badge}`}
          >
            {typeIcon(reminder.type)}
            {typeLabel(reminder.type, lang)}
          </span>
          <span className="ml-auto">
            {reminder.urgency === "high" && (
              <span className="inline-block w-2 h-2 rounded-full bg-destructive animate-pulse" />
            )}
          </span>
        </div>

        {/* title */}
        <p className="text-xs font-semibold text-foreground leading-snug mb-1">
          {reminder.title}
        </p>

        {/* message */}
        <p className="text-[11px] text-muted-foreground leading-snug line-clamp-3">
          {reminder.message}
        </p>

        {/* actions */}
        <div className="flex gap-1.5 mt-2.5">
          <button
            type="button"
            data-ocid={`predictive_reminders.snooze_button.${reminder.id}`}
            onClick={() => onSnooze(reminder.id)}
            className="flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-lg bg-muted border border-border text-muted-foreground hover:text-foreground transition-smooth"
          >
            <Clock className="w-2.5 h-2.5" />
            {t("snooze")}
          </button>
          <button
            type="button"
            data-ocid={`predictive_reminders.dismiss_button.${reminder.id}`}
            onClick={() => onDismiss(reminder.id)}
            className="flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-lg bg-muted border border-border text-muted-foreground hover:text-foreground transition-smooth"
          >
            <CheckCircle2 className="w-2.5 h-2.5" />
            {t("dismiss")}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export function PredictiveReminderCards({
  userProfile,
}: PredictiveReminderCardsProps) {
  const { t, language } = useLanguageStore();
  const [dismissed, setDismissed] = useState<Set<string>>(() =>
    readSet(DISMISSED_KEY),
  );
  const [snoozed, setSnoozed] = useState<Set<string>>(() => {
    const map = readSnoozeMap();
    const now = Date.now();
    return new Set(Object.keys(map).filter((id) => now < map[id]));
  });

  // Re-check snooze expiry every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const map = readSnoozeMap();
      const now = Date.now();
      setSnoozed(new Set(Object.keys(map).filter((id) => now < map[id])));
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  const allReminders = useMemo(
    () => generatePredictiveReminders(userProfile, language as "en" | "sw"),
    [userProfile, language],
  );

  const visible = allReminders.filter(
    (r) => !dismissed.has(r.id) && !snoozed.has(r.id),
  );

  function handleDismiss(id: string) {
    const next = new Set(dismissed).add(id);
    setDismissed(next);
    writeSet(DISMISSED_KEY, next);
  }

  function handleSnooze(id: string) {
    const map = readSnoozeMap();
    map[id] = Date.now() + SNOOZE_MS;
    writeSnoozeMap(map);
    const next = new Set(snoozed).add(id);
    setSnoozed(next);
  }

  if (visible.length === 0) return null;

  return (
    <section
      data-ocid="predictive_reminders.section"
      aria-label={t("predictiveReminders")}
    >
      {/* Section header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <Bell className="w-4 h-4 text-amber-500" />
          <h2 className="text-sm font-semibold text-foreground">
            {t("predictiveReminders")}
          </h2>
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-destructive text-primary-foreground text-[9px] font-bold">
            {visible.length}
          </span>
        </div>
      </div>

      {/* Horizontal scroll row on mobile, grid on sm+ */}
      <div
        data-ocid="predictive_reminders.list"
        className="flex gap-3 overflow-x-auto pb-1 snap-x snap-mandatory sm:grid sm:grid-cols-2 sm:overflow-visible scrollbar-none"
        style={{ scrollbarWidth: "none" }}
      >
        {visible.map((reminder) => (
          <div key={reminder.id} className="snap-start">
            <ReminderCard
              reminder={reminder}
              onDismiss={handleDismiss}
              onSnooze={handleSnooze}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
