import { a as useLanguageStore, u as useAuthStore, r as reactExports, j as jsxRuntimeExports, L as Layout, T as TrendingUp, B as Button, s as Leaf, w as ChartNoAxesColumn, X } from "./index-BUVIgngH.js";
import { F as ForecastCard, M as Milk } from "./ForecastCard-Co0q0dcV.js";
import { P as Plus } from "./plus-DMsGFanj.js";
import "./refresh-cw-BNbremAW.js";
import "./chevron-up-CnJPygwE.js";
import "./BarChart-CLPOFkNj.js";
const CROP_FORECASTS = [
  {
    id: "fc_1",
    userId: "u1",
    forecastType: "crop_yield",
    title: "Maize Yield — Mbeya North Field",
    predictedValue: 3.2,
    unit: "tons",
    confidenceScore: 85,
    keyDrivers: ["Good rainfall", "DAP fertilizer", "Early planting"],
    monthlyBreakdown: [
      { month: "Jan", value: 0 },
      { month: "Feb", value: 0.1 },
      { month: "Mar", value: 0.4 },
      { month: "Apr", value: 0.9 },
      { month: "May", value: 1.2 },
      { month: "Jun", value: 0.6 }
    ],
    sensitivityNote: "A 10% reduction in rainfall during March–April could lower yield by up to 18%. Irrigate as a contingency.",
    basedOn: {
      weatherScore: 88,
      soilScore: 82,
      feedingScore: 70,
      historyScore: 91
    },
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    validUntil: new Date(Date.now() + 60 * 24 * 3600 * 1e3).toISOString()
  },
  {
    id: "fc_2",
    userId: "u1",
    forecastType: "crop_yield",
    title: "Beans Yield — Iringa East Plot",
    predictedValue: 1.8,
    unit: "tons",
    confidenceScore: 73,
    keyDrivers: ["Soil phosphorus", "Average rainfall", "Crop rotation"],
    monthlyBreakdown: [
      { month: "Jan", value: 0 },
      { month: "Feb", value: 0.2 },
      { month: "Mar", value: 0.5 },
      { month: "Apr", value: 0.7 },
      { month: "May", value: 0.4 },
      { month: "Jun", value: 0 }
    ],
    sensitivityNote: "Bean rust risk is elevated this season. Preventive fungicide application before April could protect up to 20% of predicted yield.",
    basedOn: {
      weatherScore: 72,
      soilScore: 78,
      feedingScore: 65,
      historyScore: 80
    },
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    validUntil: new Date(Date.now() + 45 * 24 * 3600 * 1e3).toISOString()
  },
  {
    id: "fc_3",
    userId: "u1",
    forecastType: "crop_yield",
    title: "Sunflower Yield — Dodoma Plot",
    predictedValue: 0.9,
    unit: "tons",
    confidenceScore: 58,
    keyDrivers: ["Dry season risk", "Sandy soil", "Limited irrigation"],
    monthlyBreakdown: [
      { month: "Mar", value: 0 },
      { month: "Apr", value: 0.1 },
      { month: "May", value: 0.3 },
      { month: "Jun", value: 0.4 },
      { month: "Jul", value: 0.1 }
    ],
    sensitivityNote: "Low confidence due to unpredictable dry season patterns in Dodoma. Consider supplemental irrigation to boost confidence above 70%.",
    basedOn: {
      weatherScore: 51,
      soilScore: 60,
      feedingScore: 55,
      historyScore: 64
    },
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    validUntil: new Date(Date.now() + 90 * 24 * 3600 * 1e3).toISOString()
  }
];
const LIVESTOCK_FORECASTS = [
  {
    id: "lfc_1",
    userId: "u2",
    forecastType: "milk_production",
    title: "Friesian Cattle — Milk Production",
    predictedValue: 450,
    unit: "L/month",
    confidenceScore: 78,
    keyDrivers: ["Quality feed", "Vet check", "Season timing"],
    monthlyBreakdown: [
      { month: "Jan", value: 420 },
      { month: "Feb", value: 440 },
      { month: "Mar", value: 460 },
      { month: "Apr", value: 450 },
      { month: "May", value: 430 },
      { month: "Jun", value: 410 }
    ],
    sensitivityNote: "Adding mineral block supplementation could push monthly milk output 8–12% higher. Heat stress above 32°C can reduce yield by 15%.",
    basedOn: {
      weatherScore: 75,
      soilScore: 60,
      feedingScore: 88,
      historyScore: 82
    },
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    validUntil: new Date(Date.now() + 30 * 24 * 3600 * 1e3).toISOString()
  },
  {
    id: "lfc_2",
    userId: "u2",
    forecastType: "egg_production",
    title: "Layer Poultry — Egg Production",
    predictedValue: 2400,
    unit: "eggs/month",
    confidenceScore: 82,
    keyDrivers: ["Layer feed", "Controlled lighting", "Low disease risk"],
    monthlyBreakdown: [
      { month: "Jan", value: 2200 },
      { month: "Feb", value: 2350 },
      { month: "Mar", value: 2400 },
      { month: "Apr", value: 2380 },
      { month: "May", value: 2300 },
      { month: "Jun", value: 2250 }
    ],
    sensitivityNote: "Consistent lighting (16 hrs/day) and Marek's disease vaccination are the two single largest factors for maintaining this output level.",
    basedOn: {
      weatherScore: 80,
      soilScore: 55,
      feedingScore: 92,
      historyScore: 86
    },
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    validUntil: new Date(Date.now() + 30 * 24 * 3600 * 1e3).toISOString()
  },
  {
    id: "lfc_3",
    userId: "u2",
    forecastType: "livestock_weight",
    title: "Goat Growth — Weight Gain Forecast",
    predictedValue: 4.5,
    unit: "kg/month",
    confidenceScore: 65,
    keyDrivers: ["Browse quality", "Dry season grazing", "Breed type"],
    monthlyBreakdown: [
      { month: "Jan", value: 4.8 },
      { month: "Feb", value: 5 },
      { month: "Mar", value: 4.5 },
      { month: "Apr", value: 4.2 },
      { month: "May", value: 3.9 },
      { month: "Jun", value: 3.5 }
    ],
    sensitivityNote: "Weight gain is expected to dip in the dry months (May–July). Supplement with concentrate feed to maintain above 4 kg/month.",
    basedOn: {
      weatherScore: 62,
      soilScore: 68,
      feedingScore: 72,
      historyScore: 70
    },
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    validUntil: new Date(Date.now() + 60 * 24 * 3600 * 1e3).toISOString()
  }
];
const FORECAST_TYPES = [
  { value: "crop_yield", labelEn: "Crop Yield", labelSw: "Mavuno ya Mazao" },
  {
    value: "milk_production",
    labelEn: "Milk Production",
    labelSw: "Uzalishaji wa Maziwa"
  },
  {
    value: "egg_production",
    labelEn: "Egg Production",
    labelSw: "Uzalishaji wa Mayai"
  },
  {
    value: "livestock_weight",
    labelEn: "Livestock Weight",
    labelSw: "Uzito wa Mifugo"
  }
];
const REGIONS = [
  "Mbeya",
  "Iringa",
  "Dodoma",
  "Arusha",
  "Mwanza",
  "Dar es Salaam",
  "Morogoro",
  "Tanga",
  "Ruvuma",
  "Kilimanjaro"
];
function GenerateForecastModal({
  onClose,
  onGenerate
}) {
  const { language } = useLanguageStore();
  const [type, setType] = reactExports.useState("crop_yield");
  const [subject, setSubject] = reactExports.useState("");
  const [region, setRegion] = reactExports.useState("Mbeya");
  const [loading, setLoading] = reactExports.useState(false);
  const lang = language;
  async function handleSubmit() {
    if (!subject.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    onGenerate(type, subject.trim(), region);
    onClose();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 px-4 pb-4",
      onClick: (e) => e.target === e.currentTarget && onClose(),
      onKeyDown: (e) => e.key === "Escape" && onClose(),
      role: "presentation",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "forecasting.generate_modal",
          className: "bg-card rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 border-b border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-base text-foreground", children: lang === "sw" ? "Tengeneza Utabiri" : "Generate New Forecast" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-smooth",
                  "data-ocid": "forecasting.generate_modal.close_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "fc-type",
                    className: "block text-xs font-medium text-foreground mb-1.5",
                    children: lang === "sw" ? "Aina ya Utabiri" : "Forecast Type"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "select",
                  {
                    id: "fc-type",
                    value: type,
                    onChange: (e) => setType(e.target.value),
                    "data-ocid": "forecasting.type_select",
                    className: "w-full h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30",
                    children: FORECAST_TYPES.map((ft) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: ft.value, children: lang === "sw" ? ft.labelSw : ft.labelEn }, ft.value))
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "fc-subject",
                    className: "block text-xs font-medium text-foreground mb-1.5",
                    children: lang === "sw" ? "Aina ya Zao / Mnyama" : "Crop / Animal Type"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "fc-subject",
                    value: subject,
                    onChange: (e) => setSubject(e.target.value),
                    placeholder: lang === "sw" ? "mfano: Mahindi, Ng'ombe wa Friesian" : "e.g. Maize, Friesian Cattle",
                    "data-ocid": "forecasting.subject_input",
                    className: "w-full h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "fc-region",
                    className: "block text-xs font-medium text-foreground mb-1.5",
                    children: lang === "sw" ? "Mkoa" : "Region"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "select",
                  {
                    id: "fc-region",
                    value: region,
                    onChange: (e) => setRegion(e.target.value),
                    "data-ocid": "forecasting.region_select",
                    className: "w-full h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30",
                    children: REGIONS.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: r, children: r }, r))
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-4 flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  className: "flex-1",
                  onClick: onClose,
                  "data-ocid": "forecasting.generate_modal.cancel_button",
                  children: lang === "sw" ? "Ghairi" : "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  className: "flex-1",
                  onClick: handleSubmit,
                  disabled: !subject.trim() || loading,
                  "data-ocid": "forecasting.generate_modal.submit_button",
                  children: loading ? lang === "sw" ? "Inatengeneza..." : "Generating..." : lang === "sw" ? "Tengeneza" : "Generate"
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
function ForecastingPage() {
  const { language } = useLanguageStore();
  const { user } = useAuthStore();
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [cropForecasts, setCropForecasts] = reactExports.useState(CROP_FORECASTS);
  const [livestockForecasts, setLivestockForecasts] = reactExports.useState(LIVESTOCK_FORECASTS);
  const lang = language;
  const role = (user == null ? void 0 : user.role) ?? "farmer";
  const isFarmer = role === "farmer";
  const isLivestock = role === "livestock_keeper";
  function handleGenerate(type, subject, region) {
    const newRecord = {
      id: `fc_${Date.now()}`,
      userId: (user == null ? void 0 : user.id) ?? "u1",
      forecastType: type,
      title: `${subject} — ${region}`,
      predictedValue: type === "milk_production" ? 380 : type === "egg_production" ? 1800 : type === "livestock_weight" ? 3.8 : 2.1,
      unit: type === "milk_production" ? "L/month" : type === "egg_production" ? "eggs/month" : type === "livestock_weight" ? "kg/month" : "tons",
      confidenceScore: Math.floor(60 + Math.random() * 30),
      keyDrivers: lang === "sw" ? ["Hali ya hewa", "Udongo", "Historia ya shamba"] : ["Weather patterns", "Soil quality", "Farm history"],
      monthlyBreakdown: [
        { month: "M1", value: 1 },
        { month: "M2", value: 1.3 },
        { month: "M3", value: 1.8 },
        { month: "M4", value: 2.1 },
        { month: "M5", value: 1.9 },
        { month: "M6", value: 1.5 }
      ],
      sensitivityNote: lang === "sw" ? "Utabiri huu unategemea hali ya hewa ya wastani. Hali mbaya inaweza kupunguza matokeo." : "This forecast assumes average weather conditions. Adverse conditions may reduce outputs by up to 20%.",
      basedOn: {
        weatherScore: 70,
        soilScore: 75,
        feedingScore: 68,
        historyScore: 72
      },
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      validUntil: new Date(Date.now() + 60 * 24 * 3600 * 1e3).toISOString()
    };
    if (["milk_production", "egg_production", "livestock_weight"].includes(type)) {
      setLivestockForecasts((prev) => [newRecord, ...prev]);
    } else {
      setCropForecasts((prev) => [newRecord, ...prev]);
    }
  }
  const showCropSection = isFarmer || !isFarmer && !isLivestock;
  const showLivestockSection = isLivestock || !isFarmer && !isLivestock;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-4 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-lg font-display font-bold text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-primary" }),
            lang === "sw" ? "Utabiri wa Mavuno na Uzalishaji" : "Harvest & Production Forecasting"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: lang === "sw" ? "Matarajio ya AI kulingana na hali ya hewa, udongo na historia" : "AI-powered predictions based on weather, soil, and farm history" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            className: "gap-1.5 shrink-0",
            onClick: () => setModalOpen(true),
            "data-ocid": "forecasting.generate_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
              lang === "sw" ? "Utabiri Mpya" : "New Forecast"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-display font-bold text-foreground", children: cropForecasts.length + livestockForecasts.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: lang === "sw" ? "Utabiri Wote" : "Total Forecasts" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-display font-bold text-green-600", children: [
            Math.round(
              [...cropForecasts, ...livestockForecasts].reduce(
                (s, f) => s + f.confidenceScore,
                0
              ) / (cropForecasts.length + livestockForecasts.length)
            ),
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: lang === "sw" ? "Uhakika wa Wastani" : "Avg Confidence" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-display font-bold text-primary", children: [...cropForecasts, ...livestockForecasts].filter(
            (f) => f.confidenceScore >= 80
          ).length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: lang === "sw" ? "Uhakika Juu" : "High Confidence" })
        ] })
      ] }),
      showCropSection && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "forecasting.crop_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-4 h-4 text-green-600" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground", children: lang === "sw" ? "Utabiri wa Mazao" : "Crop Forecasts" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground", children: [
              cropForecasts.length,
              " ",
              lang === "sw" ? "utabiri unaotumika" : "active forecasts"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: cropForecasts.map((fc, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "data-ocid": `forecasting.crop_forecast.${i + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ForecastCard, { forecast: fc, defaultExpanded: i === 0 })
          },
          fc.id
        )) })
      ] }),
      showLivestockSection && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "forecasting.livestock_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Milk, { className: "w-4 h-4 text-blue-600" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground", children: lang === "sw" ? "Utabiri wa Uzalishaji wa Mifugo" : "Livestock Production Forecasts" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground", children: [
              livestockForecasts.length,
              " ",
              lang === "sw" ? "utabiri unaotumika" : "active forecasts"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: livestockForecasts.map((fc, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "data-ocid": `forecasting.livestock_forecast.${i + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ForecastCard, { forecast: fc, defaultExpanded: i === 0 })
          },
          fc.id
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "w-8 h-8 text-primary flex-shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: lang === "sw" ? "Angalia Uchambuzi wa Shamba" : "View Full Farm Analytics" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: lang === "sw" ? "Ripoti za kina na mwelekeo wa mauzo" : "Detailed reports, trends, and financial summaries" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-xs text-muted-foreground pt-2 pb-4", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        ". Built with love using",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
            className: "hover:text-primary",
            target: "_blank",
            rel: "noreferrer",
            children: "caffeine.ai"
          }
        )
      ] })
    ] }),
    modalOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      GenerateForecastModal,
      {
        onClose: () => setModalOpen(false),
        onGenerate: handleGenerate
      }
    )
  ] });
}
export {
  ForecastingPage as default
};
