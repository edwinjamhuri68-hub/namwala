import { k as createLucideIcon, a as useLanguageStore, r as reactExports, j as jsxRuntimeExports, w as ChartNoAxesColumn, H as ChevronDown, T as TrendingUp, p as Sprout } from "./index-BUVIgngH.js";
import { R as RefreshCw } from "./refresh-cw-BNbremAW.js";
import { C as ChevronUp } from "./chevron-up-CnJPygwE.js";
import { R as ResponsiveContainer, B as BarChart, X as XAxis, Y as YAxis, T as Tooltip, z as Bar, F as Cell } from "./BarChart-CLPOFkNj.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M12 22c6.23-.05 7.87-5.57 7.5-10-.36-4.34-3.95-9.96-7.5-10-3.55.04-7.14 5.66-7.5 10-.37 4.43 1.27 9.95 7.5 10z",
      key: "1c39pg"
    }
  ]
];
const Egg = createLucideIcon("egg", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M8 2h8", key: "1ssgc1" }],
  [
    "path",
    {
      d: "M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2",
      key: "qtp12x"
    }
  ],
  ["path", { d: "M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0", key: "ygeh44" }]
];
const Milk = createLucideIcon("milk", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "5", r: "3", key: "rqqgnr" }],
  [
    "path",
    {
      d: "M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z",
      key: "56o5sh"
    }
  ]
];
const Weight = createLucideIcon("weight", __iconNode);
function forecastIcon(type) {
  switch (type) {
    case "crop_yield":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Sprout, { className: "w-5 h-5" });
    case "milk_production":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Milk, { className: "w-5 h-5" });
    case "egg_production":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Egg, { className: "w-5 h-5" });
    case "livestock_weight":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Weight, { className: "w-5 h-5" });
  }
}
function forecastColor(type) {
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
function confidenceColor(score) {
  if (score >= 80) return "bg-green-500";
  if (score >= 60) return "bg-amber-500";
  return "bg-orange-500";
}
function confidenceLabel(score, lang) {
  if (lang === "sw") {
    if (score >= 80) return "Juu";
    if (score >= 60) return "Wastani";
    return "Chini";
  }
  if (score >= 80) return "High";
  if (score >= 60) return "Moderate";
  return "Low";
}
function basedOnLabel(key, lang) {
  const map = {
    weatherScore: { en: "Weather", sw: "Hewa" },
    soilScore: { en: "Soil", sw: "Udongo" },
    feedingScore: { en: "Feeding", sw: "Kulisha" },
    historyScore: { en: "History", sw: "Historia" }
  };
  return map[key][lang];
}
function ForecastCard({
  forecast,
  defaultExpanded = false,
  onRefresh
}) {
  const { t, language } = useLanguageStore();
  const [expanded, setExpanded] = reactExports.useState(defaultExpanded);
  const [refreshing, setRefreshing] = reactExports.useState(false);
  const lang = language;
  const iconColor = forecastColor(forecast.forecastType);
  const barColor = confidenceColor(forecast.confidenceScore);
  async function handleRefresh() {
    setRefreshing(true);
    await new Promise((r) => setTimeout(r, 1200));
    setRefreshing(false);
    onRefresh == null ? void 0 : onRefresh(forecast.id);
  }
  const validDate = new Date(forecast.validUntil).toLocaleDateString(
    lang === "sw" ? "sw-TZ" : "en-TZ",
    { day: "numeric", month: "short", year: "numeric" }
  );
  const maxVal = Math.max(...forecast.monthlyBreakdown.map((m) => m.value));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `forecast.card.${forecast.id}`,
      className: "bg-card border border-border rounded-xl overflow-hidden shadow-sm",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-4 pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconColor}`,
              children: forecastIcon(forecast.forecastType)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground", children: {
              crop_yield: language === "sw" ? "Mavuno ya Mazao" : "Crop Yield",
              milk_production: language === "sw" ? "Uzalishaji wa Maziwa" : "Milk Production",
              egg_production: language === "sw" ? "Uzalishaji wa Mayai" : "Egg Production",
              livestock_weight: language === "sw" ? "Uzito wa Mifugo" : "Livestock Weight"
            }[forecast.forecastType] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground leading-snug truncate", children: forecast.title })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleRefresh,
              disabled: refreshing,
              "aria-label": t("generateForecast"),
              "data-ocid": `forecast.refresh_button.${forecast.id}`,
              className: "w-8 h-8 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-smooth disabled:opacity-50 flex-shrink-0",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                RefreshCw,
                {
                  className: `w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-display font-bold text-foreground leading-none", children: forecast.predictedValue.toLocaleString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground pb-0.5", children: forecast.unit })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: [
            t("validUntil"),
            " ",
            validDate
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-medium text-muted-foreground", children: t("confidenceScore") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: `text-[11px] font-bold ${forecast.confidenceScore >= 80 ? "text-green-600" : forecast.confidenceScore >= 60 ? "text-amber-600" : "text-orange-600"}`,
                children: [
                  forecast.confidenceScore,
                  "%",
                  " ",
                  confidenceLabel(forecast.confidenceScore, lang)
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `h-full rounded-full transition-all ${barColor}`,
              style: { width: `${forecast.confidenceScore}%` }
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-medium text-muted-foreground mb-1.5", children: t("keyDrivers") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: forecast.keyDrivers.map((driver) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium",
              children: driver
            },
            driver
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setExpanded((v) => !v),
            "data-ocid": `forecast.expand_button.${forecast.id}`,
            className: "w-full flex items-center justify-center gap-1 py-2 border-t border-border text-[11px] text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-smooth",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "w-3 h-3" }),
              expanded ? lang === "sw" ? "Ficha uchambuzi" : "Hide analysis" : lang === "sw" ? "Ona uchambuzi wa kila mwezi" : "See monthly breakdown",
              expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-3 h-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3 h-3" })
            ]
          }
        ),
        expanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border p-4 space-y-4 bg-muted/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-foreground mb-2", children: t("monthlyBreakdown") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 120, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              BarChart,
              {
                data: forecast.monthlyBreakdown,
                margin: { top: 4, right: 4, left: -24, bottom: 0 },
                barSize: 14,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    XAxis,
                    {
                      dataKey: "month",
                      tick: { fontSize: 9, fill: "var(--muted-foreground)" },
                      axisLine: false,
                      tickLine: false
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    YAxis,
                    {
                      tick: { fontSize: 9, fill: "var(--muted-foreground)" },
                      axisLine: false,
                      tickLine: false
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Tooltip,
                    {
                      contentStyle: {
                        fontSize: 11,
                        borderRadius: 8,
                        border: "1px solid var(--border)",
                        background: "var(--card)",
                        color: "var(--foreground)"
                      },
                      cursor: { fill: "var(--muted)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "value", radius: [3, 3, 0, 0], children: forecast.monthlyBreakdown.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Cell,
                    {
                      fill: entry.value === maxVal ? "oklch(var(--primary))" : "oklch(var(--primary) / 0.4)"
                    },
                    entry.month
                  )) })
                ]
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-foreground mb-2", children: t("forecastBasis") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: Object.entries(forecast.basedOn).map(([key, val]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-card rounded-lg p-2 border border-border",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: basedOnLabel(key, lang) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-bold text-foreground", children: [
                      val,
                      "%"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-full bg-accent rounded-full",
                      style: { width: `${val}%` }
                    }
                  ) })
                ]
              },
              key
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-amber-800 mb-0.5", children: t("sensitivityAnalysis") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-amber-700 leading-snug", children: forecast.sensitivityNote })
            ] })
          ] })
        ] })
      ]
    }
  );
}
export {
  ForecastCard as F,
  Milk as M
};
