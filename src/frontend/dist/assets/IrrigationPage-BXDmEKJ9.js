import { u as useAuthStore, a as useLanguageStore, r as reactExports, j as jsxRuntimeExports, L as Layout, p as Sprout, B as Button, t as BookOpen, m as Badge, N as CircleCheck, O as CalendarDays, av as FlaskConical } from "./index-BUVIgngH.js";
import { I as IrrigationRecommendationCard } from "./IrrigationRecommendationCard-DpUhm_fZ.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-Coi4Z4Fu.js";
import { L as Label } from "./label-BTY_QCm0.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C7D5N9Bz.js";
import { u as ue } from "./index-c308oYmR.js";
import { D as Droplets } from "./droplets-Wf5xpwFg.js";
import { P as Plus } from "./plus-DMsGFanj.js";
import { T as TriangleAlert } from "./triangle-alert-CqH2Gyzq.js";
import { C as CloudRain } from "./cloud-rain-CG3hMqnT.js";
import { L as Lightbulb } from "./lightbulb-BbCrq2Ko.js";
import { R as RefreshCw } from "./refresh-cw-BNbremAW.js";
import "./calendar-DegZ54HI.js";
import "./bell-off-81ci_3rP.js";
import "./index-BpD0H2hM.js";
import "./index-BoFiBQpD.js";
import "./Combination-D9wAFE8R.js";
import "./index-D6ql0bBU.js";
import "./index-Cg_2nNnI.js";
import "./index-ob0xpmgs.js";
import "./index-Oh98DbrD.js";
import "./check-Byk4lD13.js";
import "./chevron-up-CnJPygwE.js";
const MOCK_RECOMMENDATIONS = [
  {
    id: "irr_01",
    userId: "u1",
    cropType: "Maize",
    region: "Mbeya",
    schedule: {
      frequencyPerWeek: 3,
      durationMinutes: 45,
      bestTimeOfDay: "early_morning"
    },
    reasoning: "Soil moisture readings are below 35% in the Mbeya highland zone. Combined with a dry forecast for the next 10 days and the active growing season, maize requires consistent irrigation to prevent water stress during tasselling. Early morning watering minimises evaporation losses by up to 40% compared to midday watering.",
    estimatedWaterSavingPercent: 28,
    yieldImpactPercent: 19,
    basedOn: {
      soilMoisture: "low",
      weatherForecast: "dry",
      seasonalCondition: "growing"
    },
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1e3).toISOString(),
    validUntil: new Date(Date.now() + 10 * 24 * 60 * 60 * 1e3).toISOString(),
    hasSetReminder: true
  },
  {
    id: "irr_02",
    userId: "u1",
    cropType: "Beans",
    region: "Mbeya",
    schedule: {
      frequencyPerWeek: 2,
      durationMinutes: 30,
      bestTimeOfDay: "evening"
    },
    reasoning: "Bean fields show moderate soil moisture but the planting season is transitioning into dry conditions. A reduced irrigation schedule (2x per week) helps maintain soil moisture without over-saturating, which can cause root rot in bean varieties. Evening watering reduces leaf scorch risk.",
    estimatedWaterSavingPercent: 22,
    yieldImpactPercent: 14,
    basedOn: {
      soilMoisture: "moderate",
      weatherForecast: "moderate",
      seasonalCondition: "planting"
    },
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1e3).toISOString(),
    validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1e3).toISOString(),
    hasSetReminder: false
  }
];
const MOCK_LOGS = [
  {
    id: "log_01",
    userId: "u1",
    recommendationId: "irr_01",
    followedOn: new Date(Date.now() - 1 * 24 * 60 * 60 * 1e3).toISOString(),
    actualWaterUseLiters: 240,
    notes: "Irrigation went well. Soil looked much better after.",
    cropType: "Maize"
  },
  {
    id: "log_02",
    userId: "u1",
    recommendationId: "irr_01",
    followedOn: new Date(Date.now() - 4 * 24 * 60 * 60 * 1e3).toISOString(),
    actualWaterUseLiters: 260,
    notes: "Used slightly more due to wind drying the topsoil faster.",
    cropType: "Maize"
  },
  {
    id: "log_03",
    userId: "u1",
    recommendationId: "irr_02",
    followedOn: new Date(Date.now() - 6 * 24 * 60 * 60 * 1e3).toISOString(),
    actualWaterUseLiters: 150,
    notes: "",
    cropType: "Beans"
  },
  {
    id: "log_04",
    userId: "u1",
    recommendationId: "irr_02",
    followedOn: new Date(Date.now() - 8 * 24 * 60 * 60 * 1e3).toISOString(),
    actualWaterUseLiters: 145,
    notes: "Reduced slightly — some cloud cover lowered evaporation.",
    cropType: "Beans"
  }
];
const TANZANIAN_REGIONS = [
  "Mbeya",
  "Iringa",
  "Arusha",
  "Kilimanjaro",
  "Dar es Salaam",
  "Dodoma",
  "Morogoro",
  "Mwanza",
  "Tanga",
  "Kagera",
  "Ruvuma",
  "Njombe",
  "Singida"
];
const CROP_OPTIONS = [
  "Maize",
  "Beans",
  "Rice",
  "Sunflower",
  "Sorghum",
  "Sweet Potato",
  "Cassava",
  "Tomatoes",
  "Onions",
  "Cabbage"
];
function IrrigationPage() {
  const { user } = useAuthStore();
  const { language } = useLanguageStore();
  const lbl = (en, sw) => language === "sw" ? sw : en;
  const [recommendations, setRecommendations] = reactExports.useState(MOCK_RECOMMENDATIONS);
  const [logs, setLogs] = reactExports.useState(MOCK_LOGS);
  const [generateOpen, setGenerateOpen] = reactExports.useState(false);
  const [genCrop, setGenCrop] = reactExports.useState("");
  const [genRegion, setGenRegion] = reactExports.useState((user == null ? void 0 : user.location) ?? "Mbeya");
  const [generating, setGenerating] = reactExports.useState(false);
  function handleReminderToggle(id, value) {
    setRecommendations(
      (prev) => prev.map((r) => r.id === id ? { ...r, hasSetReminder: value } : r)
    );
    ue.success(
      value ? lbl("Reminder set!", "Kumbusho kimewekwa!") : lbl("Reminder removed", "Kumbusho limeondolewa")
    );
  }
  function handleLogUsage(id, liters, notes) {
    const rec = recommendations.find((r) => r.id === id);
    const newLog = {
      id: `log_${Date.now()}`,
      userId: (user == null ? void 0 : user.id) ?? "u1",
      recommendationId: id,
      followedOn: (/* @__PURE__ */ new Date()).toISOString(),
      actualWaterUseLiters: liters,
      notes,
      cropType: (rec == null ? void 0 : rec.cropType) ?? "Crop"
    };
    setLogs((prev) => [newLog, ...prev]);
    ue.success(lbl("Usage logged!", "Matumizi yamerekodiwa!"));
  }
  async function handleGenerate() {
    if (!genCrop || !genRegion) return;
    setGenerating(true);
    await new Promise((res) => setTimeout(res, 1200));
    const newRec = {
      id: `irr_${Date.now()}`,
      userId: (user == null ? void 0 : user.id) ?? "u1",
      cropType: genCrop,
      region: genRegion,
      schedule: {
        frequencyPerWeek: Math.floor(Math.random() * 2) + 2,
        durationMinutes: Math.floor(Math.random() * 30) + 25,
        bestTimeOfDay: "early_morning"
      },
      reasoning: lbl(
        `Based on current soil moisture, weather conditions, and the ${genCrop} growth cycle in ${genRegion}, this irrigation schedule is designed to maintain optimal water balance while minimising waste. Early morning irrigation is recommended to reduce evaporation losses.`,
        `Kulingana na unyevu wa sasa wa udongo, hali ya hewa, na mzunguko wa ukuaji wa ${genCrop} huko ${genRegion}, ratiba hii ya umwagiliaji imeundwa kudumisha uwiano bora wa maji huku kupunguza upotevu. Umwagiliaji wa asubuhi mapema unapendekezwa kupunguza uvukizi.`
      ),
      estimatedWaterSavingPercent: Math.floor(Math.random() * 15) + 15,
      yieldImpactPercent: Math.floor(Math.random() * 12) + 10,
      basedOn: {
        soilMoisture: "low",
        weatherForecast: "dry",
        seasonalCondition: "growing"
      },
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1e3).toISOString(),
      hasSetReminder: false
    };
    setRecommendations((prev) => [newRec, ...prev]);
    setGenerating(false);
    setGenerateOpen(false);
    ue.success(
      lbl("New recommendation generated!", "Mapendekezo mapya yamezalishwa!")
    );
  }
  const TIPS = [
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { className: "w-4 h-4 text-cyan-500" }),
      title: lbl(
        "Drip Irrigation Saves Water",
        "Umwagiliaji wa Matone Unaokoa Maji"
      ),
      body: lbl(
        "Drip irrigation delivers water directly to roots, reducing evaporation by up to 50% compared to flood irrigation. Ideal for maize, beans, and vegetables in dry regions.",
        "Umwagiliaji wa matone hutoa maji moja kwa moja kwenye mizizi, kupunguza uvukizi kwa hadi 50% ikilinganishwa na umwagiliaji wa mafuriko. Inafaa kwa mahindi, maharage, na mboga katika maeneo kame."
      )
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-4 h-4 text-blue-500" }),
      title: lbl("Water in the Early Morning", "Mwagilia Asubuhi Mapema"),
      body: lbl(
        "Watering between 5–8am reduces evaporation loss significantly. Midday watering wastes up to 30% of water through evaporation, and evening watering can promote fungal diseases.",
        "Kumwagilia kati ya saa 11pm–2am (asubuhi) hupunguza upotevu wa uvukizi kwa kiasi kikubwa. Umwagiliaji wa mchana hupoteza hadi 30% ya maji kupitia uvukizi, na umwagiliaji wa jioni unaweza kukuza magonjwa ya kuvu."
      )
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "w-4 h-4 text-amber-500" }),
      title: lbl(
        "Check Soil Moisture First",
        "Angalia Unyevu wa Udongo Kwanza"
      ),
      body: lbl(
        "Before irrigating, push two fingers 5cm into the soil. If it feels dry at that depth, irrigate. If it feels moist, wait another day. Over-irrigation causes root rot and wastes water.",
        "Kabla ya kumwagilia, ingiza vidole viwili sentimita 5 kwenye udongo. Ikiwa inahisi kame kwa kina hicho, mwagilia. Ikiwa inahisi unyevu, subiri siku moja zaidi. Umwagiliaji kupita kiasi husababisha kuoza kwa mizizi na kupoteza maji."
      )
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-4 space-y-5 max-w-md mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "relative rounded-xl overflow-hidden",
        "data-ocid": "irrigation.page",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-cyan-600 to-blue-600 p-5 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 bg-white/20 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { className: "w-5 h-5 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-display font-bold text-white", children: lbl("Smart Irrigation", "Umwagiliaji Mahiri") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/80", children: lbl(
              "AI-powered water management",
              "Usimamizi wa maji unaotumia AI"
            ) })
          ] })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "irrigation.current_recommendation_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-semibold text-foreground flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sprout, { className: "w-4 h-4 text-primary" }),
          lbl("Current Recommendations", "Mapendekezo ya Sasa")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            className: "h-7 text-xs gap-1 border-cyan-300 text-cyan-700 hover:bg-cyan-50",
            onClick: () => setGenerateOpen(true),
            "data-ocid": "irrigation.generate_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
              lbl("Generate New", "Zalia Mpya")
            ]
          }
        )
      ] }),
      recommendations.some((r) => r.basedOn.weatherForecast === "dry") && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "irrigation.drought_warning_banner",
          className: "flex items-start gap-2.5 bg-amber-50 border border-amber-300 rounded-xl p-3 mb-1",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-amber-800", children: lbl(
              "Drought Warning — Schedule irrigation soon",
              "Onyo la Ukame — Panga umwagiliaji haraka"
            ) })
          ]
        }
      ),
      recommendations.some(
        (r) => r.basedOn.weatherForecast === "rain"
      ) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "irrigation.rain_expected_banner",
          className: "flex items-start gap-2.5 bg-blue-50 border border-blue-300 rounded-xl p-3 mb-1",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CloudRain, { className: "w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-blue-800", children: lbl(
              "Rain Expected — Hold off on irrigation this week",
              "Mvua Inatarajiwa — Subiri umwagiliaji wiki hii"
            ) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: recommendations.slice(0, 3).map((rec, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "data-ocid": `irrigation.recommendation.${i + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            IrrigationRecommendationCard,
            {
              recommendation: rec,
              onReminderToggle: handleReminderToggle,
              onLogUsage: handleLogUsage
            }
          )
        },
        rec.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "irrigation.history_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-semibold text-foreground flex items-center gap-1.5 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4 text-primary" }),
        lbl("Usage History", "Historia ya Matumizi")
      ] }),
      logs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-6 text-center",
          "data-ocid": "irrigation.history.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { className: "w-8 h-8 text-muted-foreground/40 mx-auto mb-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: lbl("No usage logs yet", "Bado hakuna rekodi za matumizi") })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2.5 font-semibold text-muted-foreground", children: lbl("Date", "Tarehe") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2.5 font-semibold text-muted-foreground", children: lbl("Crop", "Zao") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-2.5 font-semibold text-muted-foreground", children: lbl("Liters", "Lita") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-2.5 font-semibold text-muted-foreground hidden sm:table-cell", children: lbl("Notes", "Maelezo") })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: logs.map((log, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-b border-border last:border-0 hover:bg-muted/20",
            "data-ocid": `irrigation.history.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2.5 text-foreground", children: new Date(log.followedOn).toLocaleDateString(
                language === "sw" ? "sw-TZ" : "en-TZ",
                { day: "numeric", month: "short" }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "text-[10px] bg-primary/5 text-primary border-primary/20",
                  children: log.cropType
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-2.5 text-right font-semibold text-cyan-700", children: [
                log.actualWaterUseLiters,
                "L"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2.5 text-muted-foreground truncate max-w-[120px] hidden sm:table-cell", children: log.notes || lbl("No notes", "Hakuna maelezo") })
            ]
          },
          log.id
        )) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "irrigation.tips_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-semibold text-foreground flex items-center gap-1.5 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "w-4 h-4 text-amber-500" }),
        lbl("Irrigation Tips", "Vidokezo vya Umwagiliaji")
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: TIPS.map((tip, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-3.5 flex gap-3",
          "data-ocid": `irrigation.tip.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center flex-shrink-0 mt-0.5", children: tip.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground mb-0.5", children: tip.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground leading-relaxed", children: tip.body })
            ] })
          ]
        },
        tip.title
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: generateOpen, onOpenChange: setGenerateOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "max-w-sm",
        "data-ocid": "irrigation.generate_dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 text-cyan-600" }),
            lbl("Generate New Recommendation", "Zalia Mapendekezo Mapya")
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: lbl("Crop Type", "Aina ya Zao") }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: genCrop, onValueChange: setGenCrop, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "mt-1",
                    "data-ocid": "irrigation.generate_crop_select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectValue,
                      {
                        placeholder: lbl("Select crop", "Chagua zao")
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CROP_OPTIONS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: lbl("Region", "Mkoa") }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: genRegion, onValueChange: setGenRegion, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "mt-1",
                    "data-ocid": "irrigation.generate_region_select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectValue,
                      {
                        placeholder: lbl("Select region", "Chagua mkoa")
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: TANZANIAN_REGIONS.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r, children: r }, r)) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  className: "flex-1",
                  onClick: () => setGenerateOpen(false),
                  "data-ocid": "irrigation.generate_cancel_button",
                  children: lbl("Cancel", "Ghairi")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  className: "flex-1 bg-cyan-600 hover:bg-cyan-700 text-white gap-1.5",
                  onClick: handleGenerate,
                  disabled: !genCrop || !genRegion || generating,
                  "data-ocid": "irrigation.generate_submit_button",
                  children: generating ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5 animate-spin" }),
                    lbl("Generating...", "Inazalisha...")
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
                    lbl("Generate", "Zalia")
                  ] })
                }
              )
            ] })
          ] })
        ]
      }
    ) }),
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
  ] }) });
}
export {
  IrrigationPage as default
};
