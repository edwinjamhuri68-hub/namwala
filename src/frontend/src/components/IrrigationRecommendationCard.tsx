import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguageStore } from "@/store/languageStore";
import type { IrrigationRecommendation } from "@/types/irrigation";
import {
  Bell,
  BellOff,
  BookOpen,
  Calendar,
  Clock,
  CloudSun,
  Droplets,
  FlaskConical,
  Leaf,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useState } from "react";

interface Props {
  recommendation: IrrigationRecommendation;
  compact?: boolean;
  onReminderToggle?: (id: string, value: boolean) => void;
  onLogUsage?: (id: string, liters: number, notes: string) => void;
}

export function IrrigationRecommendationCard({
  recommendation: rec,
  compact = false,
  onReminderToggle,
  onLogUsage,
}: Props) {
  const { language } = useLanguageStore();
  const lbl = (en: string, sw: string) => (language === "sw" ? sw : en);

  const [hasReminder, setHasReminder] = useState(rec.hasSetReminder);
  const [logOpen, setLogOpen] = useState(false);
  const [logLiters, setLogLiters] = useState("");
  const [logNotes, setLogNotes] = useState("");

  function handleReminderToggle() {
    const next = !hasReminder;
    setHasReminder(next);
    onReminderToggle?.(rec.id, next);
  }

  function handleLogSubmit() {
    const liters = Number(logLiters);
    if (liters > 0) {
      onLogUsage?.(rec.id, liters, logNotes);
      setLogOpen(false);
      setLogLiters("");
      setLogNotes("");
    }
  }

  const BEST_TIME_LABELS: Record<string, { en: string; sw: string }> = {
    early_morning: {
      en: "Early morning (5–7am)",
      sw: "Asubuhi mapema (5–7am)",
    },
    morning: { en: "Morning (6–9am)", sw: "Asubuhi (6–9am)" },
    evening: { en: "Evening (5–7pm)", sw: "Jioni (5–7pm)" },
    night: { en: "Night (8–10pm)", sw: "Usiku (8–10pm)" },
  };

  const bestTimeLabel =
    BEST_TIME_LABELS[rec.schedule.bestTimeOfDay]?.[
      language === "sw" ? "sw" : "en"
    ] ?? rec.schedule.bestTimeOfDay;

  return (
    <div
      className="bg-card border border-border rounded-xl overflow-hidden"
      data-ocid="irrigation.recommendation_card"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500/15 to-blue-500/10 border-b border-border px-4 py-3 flex items-center gap-2">
        <div className="w-9 h-9 rounded-full bg-cyan-500/15 flex items-center justify-center flex-shrink-0">
          <Droplets className="w-5 h-5 text-cyan-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground leading-tight">
            {lbl("Irrigation Recommendation", "Mapendekezo ya Umwagiliaji")}
          </p>
          <p className="text-[11px] text-muted-foreground">
            {rec.cropType} · {rec.region}
          </p>
        </div>
        <div className="flex gap-1.5 shrink-0">
          <Badge
            variant="outline"
            className="text-[10px] border-cyan-400/50 text-cyan-700 bg-cyan-50 gap-1"
          >
            <TrendingUp className="w-2.5 h-2.5" />+{rec.yieldImpactPercent}%{" "}
            {lbl("yield", "mavuno")}
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Schedule */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-2 text-center">
            <Calendar className="w-3.5 h-3.5 text-blue-500 mx-auto mb-0.5" />
            <p className="text-[11px] font-semibold text-blue-800">
              {rec.schedule.frequencyPerWeek}× {lbl("per week", "kwa wiki")}
            </p>
            <p className="text-[10px] text-blue-600">
              {lbl("Frequency", "Mara kwa wiki")}
            </p>
          </div>
          <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-2 text-center">
            <Clock className="w-3.5 h-3.5 text-cyan-600 mx-auto mb-0.5" />
            <p className="text-[11px] font-semibold text-cyan-800">
              {rec.schedule.durationMinutes} {lbl("min", "dak")}
            </p>
            <p className="text-[10px] text-cyan-600">
              {lbl("Duration", "Muda")}
            </p>
          </div>
          <div className="bg-sky-50 border border-sky-100 rounded-lg p-2 text-center">
            <Zap className="w-3.5 h-3.5 text-sky-500 mx-auto mb-0.5" />
            <p className="text-[11px] font-semibold text-sky-800 truncate">
              {bestTimeLabel.split("(")[0].trim()}
            </p>
            <p className="text-[10px] text-sky-600">
              {lbl("Best time", "Wakati mzuri")}
            </p>
          </div>
        </div>

        {/* Savings + yield badges */}
        <div className="flex gap-2 flex-wrap">
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 gap-1 text-[11px]">
            <Droplets className="w-2.5 h-2.5" />
            {lbl("Save", "Okoa")} {rec.estimatedWaterSavingPercent}%{" "}
            {lbl("water", "maji")}
          </Badge>
          <Badge className="bg-green-100 text-green-700 border-green-200 gap-1 text-[11px]">
            <Leaf className="w-2.5 h-2.5" />+{rec.yieldImpactPercent}%{" "}
            {lbl("yield impact", "athari ya mavuno")}
          </Badge>
        </div>

        {/* Context tags */}
        <div className="flex gap-1.5 flex-wrap">
          <span className="inline-flex items-center gap-1 text-[10px] bg-muted/60 text-muted-foreground px-2 py-0.5 rounded-full border border-border">
            <FlaskConical className="w-2.5 h-2.5" />
            {lbl("Soil", "Udongo")}:{" "}
            {rec.basedOn.soilMoisture === "low"
              ? lbl("Low moisture", "Unyevu mdogo")
              : rec.basedOn.soilMoisture === "moderate"
                ? lbl("Moderate", "Wastani")
                : lbl("High moisture", "Unyevu mkubwa")}
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] bg-muted/60 text-muted-foreground px-2 py-0.5 rounded-full border border-border">
            <CloudSun className="w-2.5 h-2.5" />
            {rec.basedOn.weatherForecast === "dry"
              ? lbl("Dry forecast", "Utabiri kame")
              : rec.basedOn.weatherForecast === "rain"
                ? lbl("Rain expected", "Mvua inatarajiwa")
                : lbl("Moderate weather", "Hali ya wastani")}
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] bg-muted/60 text-muted-foreground px-2 py-0.5 rounded-full border border-border">
            <BookOpen className="w-2.5 h-2.5" />
            {rec.basedOn.seasonalCondition === "dry"
              ? lbl("Dry season", "Kiangazi")
              : rec.basedOn.seasonalCondition === "planting"
                ? lbl("Planting season", "Msimu wa kupanda")
                : lbl("Growing season", "Msimu wa ukuaji")}
          </span>
        </div>

        {!compact && (
          <>
            {/* Reasoning */}
            <div className="bg-muted/30 rounded-lg p-3">
              <p className="text-[11px] font-semibold text-foreground mb-1">
                {lbl("Why this schedule?", "Kwa nini ratiba hii?")}
              </p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                {rec.reasoning}
              </p>
            </div>

            {/* Validity */}
            <p className="text-[10px] text-muted-foreground">
              {lbl("Valid until", "Halali hadi")}:{" "}
              {new Date(rec.validUntil).toLocaleDateString(
                language === "sw" ? "sw-TZ" : "en-TZ",
                { day: "numeric", month: "short", year: "numeric" },
              )}
            </p>
          </>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <Button
            size="sm"
            variant={hasReminder ? "secondary" : "outline"}
            className="flex-1 gap-1.5 text-xs"
            onClick={handleReminderToggle}
            data-ocid="irrigation.set_reminder_button"
          >
            {hasReminder ? (
              <>
                <BellOff className="w-3.5 h-3.5" />
                {lbl("Reminder Set", "Kumbusho Kimewekwa")}
              </>
            ) : (
              <>
                <Bell className="w-3.5 h-3.5" />
                {lbl("Set Reminder", "Weka Kumbusho")}
              </>
            )}
          </Button>
          {!compact && (
            <Button
              size="sm"
              variant="outline"
              className="flex-1 gap-1.5 text-xs border-cyan-300 text-cyan-700 hover:bg-cyan-50"
              onClick={() => setLogOpen(true)}
              data-ocid="irrigation.log_usage_button"
            >
              <BookOpen className="w-3.5 h-3.5" />
              {lbl("Log Usage", "Rekodi Matumizi")}
            </Button>
          )}
        </div>
      </div>

      {/* Log Usage Modal */}
      <Dialog open={logOpen} onOpenChange={setLogOpen}>
        <DialogContent className="max-w-sm" data-ocid="irrigation.log_dialog">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-cyan-600" />
              {lbl("Log Water Usage", "Rekodi Matumizi ya Maji")}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <Label className="text-xs">
                {lbl("Actual water used (liters)", "Maji yaliyotumika (lita)")}
              </Label>
              <Input
                type="number"
                placeholder={lbl("e.g. 250", "mfano 250")}
                value={logLiters}
                onChange={(e) => setLogLiters(e.target.value)}
                className="mt-1"
                data-ocid="irrigation.log_liters_input"
              />
            </div>
            <div>
              <Label className="text-xs">
                {lbl("Notes (optional)", "Maelezo (si lazima)")}
              </Label>
              <Textarea
                placeholder={lbl(
                  "How did it go? Any observations?",
                  "Ilikwenda vipi? Maoni yoyote?",
                )}
                value={logNotes}
                onChange={(e) => setLogNotes(e.target.value)}
                rows={3}
                className="mt-1 text-sm"
                data-ocid="irrigation.log_notes_textarea"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setLogOpen(false)}
                data-ocid="irrigation.log_cancel_button"
              >
                {lbl("Cancel", "Ghairi")}
              </Button>
              <Button
                className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white"
                onClick={handleLogSubmit}
                disabled={!logLiters || Number(logLiters) <= 0}
                data-ocid="irrigation.log_submit_button"
              >
                {lbl("Save Log", "Hifadhi Rekodi")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
