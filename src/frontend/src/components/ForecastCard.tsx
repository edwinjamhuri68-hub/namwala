import { useLanguageStore } from "@/store/languageStore";
import { useNavigate } from "@tanstack/react-router";
import {
  BarChart2,
  ChevronDown,
  ChevronUp,
  Droplets,
  Egg,
  Milk,
  RefreshCw,
  Sprout,
  TrendingUp,
  Weight,
} from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type ForecastType =
  | "crop_yield"
  | "milk_production"
  | "egg_production"
  | "livestock_weight";

export interface ForecastRecord {
  id: string;
  userId: string;
  forecastType: ForecastType;
  title: string;
  predictedValue: number;
  unit: string;
  confidenceScore: number; // 0-100
  keyDrivers: string[];
  monthlyBreakdown: { month: string; value: number }[];
  sensitivityNote: string;
  basedOn: {
    weatherScore: number;
    soilScore: number;
    feedingScore: number;
    historyScore: number;
  };
  createdAt: string;
  validUntil: string;
}

interface ForecastCardProps {
  forecast: ForecastRecord;
  defaultExpanded?: boolean;
  onRefresh?: (id: string) => void;
}

function forecastIcon(type: ForecastType) {
  switch (type) {
    case "crop_yield":
      return <Sprout className="w-5 h-5" />;
    case "milk_production":
      return <Milk className="w-5 h-5" />;
    case "egg_production":
      return <Egg className="w-5 h-5" />;
    case "livestock_weight":
      return <Weight className="w-5 h-5" />;
  }
}

function forecastColor(type: ForecastType): string {
  switch (type) {
    case "crop_yield":
      return "bg-green-50 text-green-600";
    case "milk_production":
      return "bg-blue-50 text-blue-600";
    case "egg_production":
      return "bg-amber-50 text-amber-600";
    case "livestock_weight":
      return "bg-orange-50 text-orange-600";
  }
}

function confidenceColor(score: number): string {
  if (score >= 80) return "bg-green-500";
  if (score >= 60) return "bg-amber-500";
  return "bg-orange-500";
}

function confidenceLabel(score: number, lang: string): string {
  if (lang === "sw") {
    if (score >= 80) return "Juu";
    if (score >= 60) return "Wastani";
    return "Chini";
  }
  if (score >= 80) return "High";
  if (score >= 60) return "Moderate";
  return "Low";
}

function basedOnLabel(
  key: keyof ForecastRecord["basedOn"],
  lang: string,
): string {
  const map: Record<
    keyof ForecastRecord["basedOn"],
    { en: string; sw: string }
  > = {
    weatherScore: { en: "Weather", sw: "Hewa" },
    soilScore: { en: "Soil", sw: "Udongo" },
    feedingScore: { en: "Feeding", sw: "Kulisha" },
    historyScore: { en: "History", sw: "Historia" },
  };
  return map[key][lang as "en" | "sw"];
}

export function ForecastCard({
  forecast,
  defaultExpanded = false,
  onRefresh,
}: ForecastCardProps) {
  const { t, language } = useLanguageStore();
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [refreshing, setRefreshing] = useState(false);

  const lang = language as "en" | "sw";
  const iconColor = forecastColor(forecast.forecastType);
  const barColor = confidenceColor(forecast.confidenceScore);

  async function handleRefresh() {
    setRefreshing(true);
    await new Promise((r) => setTimeout(r, 1200));
    setRefreshing(false);
    onRefresh?.(forecast.id);
  }

  const validDate = new Date(forecast.validUntil).toLocaleDateString(
    lang === "sw" ? "sw-TZ" : "en-TZ",
    { day: "numeric", month: "short", year: "numeric" },
  );

  const maxVal = Math.max(...forecast.monthlyBreakdown.map((m) => m.value));

  return (
    <div
      data-ocid={`forecast.card.${forecast.id}`}
      className="bg-card border border-border rounded-xl overflow-hidden shadow-sm"
    >
      {/* Header */}
      <div className="flex items-start gap-3 p-4 pb-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconColor}`}
        >
          {forecastIcon(forecast.forecastType)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-muted-foreground">
            {
              {
                crop_yield:
                  language === "sw" ? "Mavuno ya Mazao" : "Crop Yield",
                milk_production:
                  language === "sw"
                    ? "Uzalishaji wa Maziwa"
                    : "Milk Production",
                egg_production:
                  language === "sw" ? "Uzalishaji wa Mayai" : "Egg Production",
                livestock_weight:
                  language === "sw" ? "Uzito wa Mifugo" : "Livestock Weight",
              }[forecast.forecastType]
            }
          </p>
          <h3 className="text-sm font-semibold text-foreground leading-snug truncate">
            {forecast.title}
          </h3>
        </div>
        <button
          type="button"
          onClick={handleRefresh}
          disabled={refreshing}
          aria-label={t("generateForecast")}
          data-ocid={`forecast.refresh_button.${forecast.id}`}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-smooth disabled:opacity-50 flex-shrink-0"
        >
          <RefreshCw
            className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`}
          />
        </button>
      </div>

      {/* Predicted value */}
      <div className="px-4 pb-3">
        <div className="flex items-end gap-1.5">
          <span className="text-3xl font-display font-bold text-foreground leading-none">
            {forecast.predictedValue.toLocaleString()}
          </span>
          <span className="text-sm text-muted-foreground pb-0.5">
            {forecast.unit}
          </span>
        </div>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          {t("validUntil")} {validDate}
        </p>
      </div>

      {/* Confidence bar */}
      <div className="px-4 pb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-muted-foreground">
            {t("confidenceScore")}
          </span>
          <span
            className={`text-[11px] font-bold ${
              forecast.confidenceScore >= 80
                ? "text-green-600"
                : forecast.confidenceScore >= 60
                  ? "text-amber-600"
                  : "text-orange-600"
            }`}
          >
            {forecast.confidenceScore}%{" "}
            {confidenceLabel(forecast.confidenceScore, lang)}
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${barColor}`}
            style={{ width: `${forecast.confidenceScore}%` }}
          />
        </div>
      </div>

      {/* Key drivers */}
      <div className="px-4 pb-3">
        <p className="text-[11px] font-medium text-muted-foreground mb-1.5">
          {t("keyDrivers")}
        </p>
        <div className="flex flex-wrap gap-1">
          {forecast.keyDrivers.map((driver) => (
            <span
              key={driver}
              className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium"
            >
              {driver}
            </span>
          ))}
        </div>
      </div>

      {/* Expand toggle */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        data-ocid={`forecast.expand_button.${forecast.id}`}
        className="w-full flex items-center justify-center gap-1 py-2 border-t border-border text-[11px] text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-smooth"
      >
        <BarChart2 className="w-3 h-3" />
        {expanded
          ? lang === "sw"
            ? "Ficha uchambuzi"
            : "Hide analysis"
          : lang === "sw"
            ? "Ona uchambuzi wa kila mwezi"
            : "See monthly breakdown"}
        {expanded ? (
          <ChevronUp className="w-3 h-3" />
        ) : (
          <ChevronDown className="w-3 h-3" />
        )}
      </button>

      {/* Expanded section */}
      {expanded && (
        <div className="border-t border-border p-4 space-y-4 bg-muted/20">
          {/* Monthly breakdown chart */}
          <div>
            <p className="text-[11px] font-semibold text-foreground mb-2">
              {t("monthlyBreakdown")}
            </p>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart
                data={forecast.monthlyBreakdown}
                margin={{ top: 4, right: 4, left: -24, bottom: 0 }}
                barSize={14}
              >
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 9, fill: "var(--muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 9, fill: "var(--muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    fontSize: 11,
                    borderRadius: 8,
                    border: "1px solid var(--border)",
                    background: "var(--card)",
                    color: "var(--foreground)",
                  }}
                  cursor={{ fill: "var(--muted)" }}
                />
                <Bar dataKey="value" radius={[3, 3, 0, 0]}>
                  {forecast.monthlyBreakdown.map((entry) => (
                    <Cell
                      key={entry.month}
                      fill={
                        entry.value === maxVal
                          ? "oklch(var(--primary))"
                          : "oklch(var(--primary) / 0.4)"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Basis scores */}
          <div>
            <p className="text-[11px] font-semibold text-foreground mb-2">
              {t("forecastBasis")}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {(
                Object.entries(forecast.basedOn) as [
                  keyof ForecastRecord["basedOn"],
                  number,
                ][]
              ).map(([key, val]) => (
                <div
                  key={key}
                  className="bg-card rounded-lg p-2 border border-border"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-muted-foreground">
                      {basedOnLabel(key, lang)}
                    </span>
                    <span className="text-[10px] font-bold text-foreground">
                      {val}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full"
                      style={{ width: `${val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sensitivity note */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
            <TrendingUp className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[11px] font-semibold text-amber-800 mb-0.5">
                {t("sensitivityAnalysis")}
              </p>
              <p className="text-[11px] text-amber-700 leading-snug">
                {forecast.sensitivityNote}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
