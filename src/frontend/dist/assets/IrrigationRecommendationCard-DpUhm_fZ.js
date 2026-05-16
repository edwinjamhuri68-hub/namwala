import { k as createLucideIcon, a as useLanguageStore, r as reactExports, j as jsxRuntimeExports, m as Badge, T as TrendingUp, K as Clock, s as Leaf, av as FlaskConical, h as CloudSun, t as BookOpen, B as Button, G as Bell, I as Input, l as Textarea } from "./index-BUVIgngH.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-Coi4Z4Fu.js";
import { L as Label } from "./label-BTY_QCm0.js";
import { D as Droplets } from "./droplets-Wf5xpwFg.js";
import { C as Calendar } from "./calendar-DegZ54HI.js";
import { B as BellOff } from "./bell-off-81ci_3rP.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
function IrrigationRecommendationCard({
  recommendation: rec,
  compact = false,
  onReminderToggle,
  onLogUsage
}) {
  var _a;
  const { language } = useLanguageStore();
  const lbl = (en, sw) => language === "sw" ? sw : en;
  const [hasReminder, setHasReminder] = reactExports.useState(rec.hasSetReminder);
  const [logOpen, setLogOpen] = reactExports.useState(false);
  const [logLiters, setLogLiters] = reactExports.useState("");
  const [logNotes, setLogNotes] = reactExports.useState("");
  function handleReminderToggle() {
    const next = !hasReminder;
    setHasReminder(next);
    onReminderToggle == null ? void 0 : onReminderToggle(rec.id, next);
  }
  function handleLogSubmit() {
    const liters = Number(logLiters);
    if (liters > 0) {
      onLogUsage == null ? void 0 : onLogUsage(rec.id, liters, logNotes);
      setLogOpen(false);
      setLogLiters("");
      setLogNotes("");
    }
  }
  const BEST_TIME_LABELS = {
    early_morning: {
      en: "Early morning (5–7am)",
      sw: "Asubuhi mapema (5–7am)"
    },
    morning: { en: "Morning (6–9am)", sw: "Asubuhi (6–9am)" },
    evening: { en: "Evening (5–7pm)", sw: "Jioni (5–7pm)" },
    night: { en: "Night (8–10pm)", sw: "Usiku (8–10pm)" }
  };
  const bestTimeLabel = ((_a = BEST_TIME_LABELS[rec.schedule.bestTimeOfDay]) == null ? void 0 : _a[language === "sw" ? "sw" : "en"]) ?? rec.schedule.bestTimeOfDay;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl overflow-hidden",
      "data-ocid": "irrigation.recommendation_card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-cyan-500/15 to-blue-500/10 border-b border-border px-4 py-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-cyan-500/15 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { className: "w-5 h-5 text-cyan-600" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground leading-tight", children: lbl("Irrigation Recommendation", "Mapendekezo ya Umwagiliaji") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
              rec.cropType,
              " · ",
              rec.region
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "outline",
              className: "text-[10px] border-cyan-400/50 text-cyan-700 bg-cyan-50 gap-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-2.5 h-2.5" }),
                "+",
                rec.yieldImpactPercent,
                "%",
                " ",
                lbl("yield", "mavuno")
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 border border-blue-100 rounded-lg p-2 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5 text-blue-500 mx-auto mb-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] font-semibold text-blue-800", children: [
                rec.schedule.frequencyPerWeek,
                "× ",
                lbl("per week", "kwa wiki")
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-blue-600", children: lbl("Frequency", "Mara kwa wiki") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-cyan-50 border border-cyan-100 rounded-lg p-2 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5 text-cyan-600 mx-auto mb-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] font-semibold text-cyan-800", children: [
                rec.schedule.durationMinutes,
                " ",
                lbl("min", "dak")
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-cyan-600", children: lbl("Duration", "Muda") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-sky-50 border border-sky-100 rounded-lg p-2 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5 text-sky-500 mx-auto mb-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-sky-800 truncate", children: bestTimeLabel.split("(")[0].trim() }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-sky-600", children: lbl("Best time", "Wakati mzuri") })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-emerald-100 text-emerald-700 border-emerald-200 gap-1 text-[11px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { className: "w-2.5 h-2.5" }),
              lbl("Save", "Okoa"),
              " ",
              rec.estimatedWaterSavingPercent,
              "%",
              " ",
              lbl("water", "maji")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-green-100 text-green-700 border-green-200 gap-1 text-[11px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-2.5 h-2.5" }),
              "+",
              rec.yieldImpactPercent,
              "%",
              " ",
              lbl("yield impact", "athari ya mavuno")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-[10px] bg-muted/60 text-muted-foreground px-2 py-0.5 rounded-full border border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "w-2.5 h-2.5" }),
              lbl("Soil", "Udongo"),
              ":",
              " ",
              rec.basedOn.soilMoisture === "low" ? lbl("Low moisture", "Unyevu mdogo") : rec.basedOn.soilMoisture === "moderate" ? lbl("Moderate", "Wastani") : lbl("High moisture", "Unyevu mkubwa")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-[10px] bg-muted/60 text-muted-foreground px-2 py-0.5 rounded-full border border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CloudSun, { className: "w-2.5 h-2.5" }),
              rec.basedOn.weatherForecast === "dry" ? lbl("Dry forecast", "Utabiri kame") : rec.basedOn.weatherForecast === "rain" ? lbl("Rain expected", "Mvua inatarajiwa") : lbl("Moderate weather", "Hali ya wastani")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-[10px] bg-muted/60 text-muted-foreground px-2 py-0.5 rounded-full border border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-2.5 h-2.5" }),
              rec.basedOn.seasonalCondition === "dry" ? lbl("Dry season", "Kiangazi") : rec.basedOn.seasonalCondition === "planting" ? lbl("Planting season", "Msimu wa kupanda") : lbl("Growing season", "Msimu wa ukuaji")
            ] })
          ] }),
          !compact && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-foreground mb-1", children: lbl("Why this schedule?", "Kwa nini ratiba hii?") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground leading-relaxed", children: rec.reasoning })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground", children: [
              lbl("Valid until", "Halali hadi"),
              ":",
              " ",
              new Date(rec.validUntil).toLocaleDateString(
                language === "sw" ? "sw-TZ" : "en-TZ",
                { day: "numeric", month: "short", year: "numeric" }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: hasReminder ? "secondary" : "outline",
                className: "flex-1 gap-1.5 text-xs",
                onClick: handleReminderToggle,
                "data-ocid": "irrigation.set_reminder_button",
                children: hasReminder ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BellOff, { className: "w-3.5 h-3.5" }),
                  lbl("Reminder Set", "Kumbusho Kimewekwa")
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-3.5 h-3.5" }),
                  lbl("Set Reminder", "Weka Kumbusho")
                ] })
              }
            ),
            !compact && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "flex-1 gap-1.5 text-xs border-cyan-300 text-cyan-700 hover:bg-cyan-50",
                onClick: () => setLogOpen(true),
                "data-ocid": "irrigation.log_usage_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3.5 h-3.5" }),
                  lbl("Log Usage", "Rekodi Matumizi")
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: logOpen, onOpenChange: setLogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", "data-ocid": "irrigation.log_dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { className: "w-4 h-4 text-cyan-600" }),
            lbl("Log Water Usage", "Rekodi Matumizi ya Maji")
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: lbl("Actual water used (liters)", "Maji yaliyotumika (lita)") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  placeholder: lbl("e.g. 250", "mfano 250"),
                  value: logLiters,
                  onChange: (e) => setLogLiters(e.target.value),
                  className: "mt-1",
                  "data-ocid": "irrigation.log_liters_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: lbl("Notes (optional)", "Maelezo (si lazima)") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  placeholder: lbl(
                    "How did it go? Any observations?",
                    "Ilikwenda vipi? Maoni yoyote?"
                  ),
                  value: logNotes,
                  onChange: (e) => setLogNotes(e.target.value),
                  rows: 3,
                  className: "mt-1 text-sm",
                  "data-ocid": "irrigation.log_notes_textarea"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  className: "flex-1",
                  onClick: () => setLogOpen(false),
                  "data-ocid": "irrigation.log_cancel_button",
                  children: lbl("Cancel", "Ghairi")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  className: "flex-1 bg-cyan-600 hover:bg-cyan-700 text-white",
                  onClick: handleLogSubmit,
                  disabled: !logLiters || Number(logLiters) <= 0,
                  "data-ocid": "irrigation.log_submit_button",
                  children: lbl("Save Log", "Hifadhi Rekodi")
                }
              )
            ] })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  IrrigationRecommendationCard as I
};
