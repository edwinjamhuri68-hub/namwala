import { k as createLucideIcon, a as useLanguageStore, r as reactExports, j as jsxRuntimeExports, L as Layout, B as Button, I as Input, l as Textarea, aM as Flame, y as MapPin, ai as TanzaniaMapView, m as Badge } from "./index-BUVIgngH.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-ChCgH42_.js";
import { D as Dialog, h as DialogTrigger, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-Coi4Z4Fu.js";
import { L as Label } from "./label-BTY_QCm0.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C7D5N9Bz.js";
import { T as TriangleAlert } from "./triangle-alert-CqH2Gyzq.js";
import { P as Plus } from "./plus-DMsGFanj.js";
import { C as CloudRain } from "./cloud-rain-CG3hMqnT.js";
import { B as Bug } from "./bug-CMwW2EO6.js";
import { S as Stethoscope } from "./stethoscope-BgimVgvv.js";
import "./index-BpD0H2hM.js";
import "./index-BoFiBQpD.js";
import "./Combination-D9wAFE8R.js";
import "./index-D6ql0bBU.js";
import "./index-Cg_2nNnI.js";
import "./index-ob0xpmgs.js";
import "./index-Oh98DbrD.js";
import "./check-Byk4lD13.js";
import "./chevron-up-CnJPygwE.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M2 22 16 8", key: "60hf96" }],
  [
    "path",
    {
      d: "M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z",
      key: "1rdhi6"
    }
  ],
  [
    "path",
    {
      d: "M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z",
      key: "1sdzmb"
    }
  ],
  [
    "path",
    {
      d: "M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z",
      key: "eoatbi"
    }
  ],
  ["path", { d: "M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z", key: "19rau1" }],
  [
    "path",
    {
      d: "M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z",
      key: "tc8ph9"
    }
  ],
  [
    "path",
    {
      d: "M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z",
      key: "2m8kc5"
    }
  ],
  [
    "path",
    {
      d: "M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z",
      key: "vex3ng"
    }
  ]
];
const Wheat = createLucideIcon("wheat", __iconNode);
const MOCK_OUTBREAKS = [
  {
    id: "ob1",
    region: "Dodoma",
    outbreakType: "crop_disease",
    diseaseName: "Maize Blight",
    severity: "high",
    description: "Spread rapidly across northern farms",
    affectedArea: "Northern Dodoma",
    reportedAt: Date.now() - 2 * 864e5,
    isActive: true,
    coordinates: null
  },
  {
    id: "ob2",
    region: "Dodoma",
    outbreakType: "drought",
    diseaseName: "Severe Drought",
    severity: "critical",
    description: "No rainfall for 3 weeks",
    affectedArea: "Central Dodoma",
    reportedAt: Date.now() - 5 * 864e5,
    isActive: true,
    coordinates: null
  },
  {
    id: "ob3",
    region: "Arusha",
    outbreakType: "pest_invasion",
    diseaseName: "Fall Armyworm",
    severity: "medium",
    description: "Pest invasion detected on maize",
    affectedArea: "Arusha farms",
    reportedAt: Date.now() - 1 * 864e5,
    isActive: true,
    coordinates: null
  },
  {
    id: "ob4",
    region: "Mwanza",
    outbreakType: "livestock_infection",
    diseaseName: "Foot and Mouth Disease",
    severity: "critical",
    description: "Rapid spread among cattle herds",
    affectedArea: "Lake Victoria region",
    reportedAt: Date.now() - 3 * 864e5,
    isActive: true,
    coordinates: null
  },
  {
    id: "ob5",
    region: "Dar es Salaam",
    outbreakType: "crop_disease",
    diseaseName: "Cassava Mosaic Virus",
    severity: "medium",
    description: "Cassava crop disease detected",
    affectedArea: "Coastal belt",
    reportedAt: Date.now() - 7 * 864e5,
    isActive: true,
    coordinates: null
  },
  {
    id: "ob6",
    region: "Mbeya",
    outbreakType: "livestock_infection",
    diseaseName: "Newcastle Disease",
    severity: "high",
    description: "Poultry losses reported in multiple farms",
    affectedArea: "Highland farms",
    reportedAt: Date.now() - 4 * 864e5,
    isActive: true,
    coordinates: null
  },
  {
    id: "ob7",
    region: "Kilimanjaro",
    outbreakType: "pest_invasion",
    diseaseName: "Coffee Berry Borer",
    severity: "low",
    description: "Minor pest activity on coffee plants",
    affectedArea: "Kilimanjaro slopes",
    reportedAt: Date.now() - 10 * 864e5,
    isActive: true,
    coordinates: null
  },
  {
    id: "ob8",
    region: "Mwanza",
    outbreakType: "crop_disease",
    diseaseName: "Rice Brown Spot",
    severity: "medium",
    description: "Rice disease spreading in paddies",
    affectedArea: "Lake Zone paddies",
    reportedAt: Date.now() - 6 * 864e5,
    isActive: true,
    coordinates: null
  }
];
const TYPE_CONFIG = {
  crop_disease: {
    labelEn: "Crop Disease",
    labelSw: "Ugonjwa wa Mazao",
    color: "bg-green-100 text-green-800 border-green-300",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wheat, { className: "h-3 w-3" })
  },
  livestock_infection: {
    labelEn: "Livestock Infection",
    labelSw: "Maambukizi ya Mifugo",
    color: "bg-red-100 text-red-800 border-red-300",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "h-3 w-3" })
  },
  pest_invasion: {
    labelEn: "Pest Invasion",
    labelSw: "Uvamizi wa Wadudu",
    color: "bg-orange-100 text-orange-800 border-orange-300",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bug, { className: "h-3 w-3" })
  },
  drought: {
    labelEn: "Drought",
    labelSw: "Ukame",
    color: "bg-yellow-100 text-yellow-800 border-yellow-300",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CloudRain, { className: "h-3 w-3" })
  }
};
const SEVERITY_CONFIG = {
  critical: {
    labelEn: "Critical",
    labelSw: "Hatari Kuu",
    color: "bg-red-600 text-white"
  },
  high: { labelEn: "High", labelSw: "Juu", color: "bg-orange-500 text-white" },
  medium: {
    labelEn: "Medium",
    labelSw: "Kati",
    color: "bg-yellow-500 text-white"
  },
  low: { labelEn: "Low", labelSw: "Chini", color: "bg-blue-500 text-white" }
};
const TANZANIAN_REGIONS = [
  "Arusha",
  "Dar es Salaam",
  "Dodoma",
  "Geita",
  "Iringa",
  "Kagera",
  "Katavi",
  "Kigoma",
  "Kilimanjaro",
  "Lindi",
  "Manyara",
  "Mara",
  "Mbeya",
  "Morogoro",
  "Mtwara",
  "Mwanza",
  "Njombe",
  "Pwani",
  "Rukwa",
  "Ruvuma",
  "Shinyanga",
  "Simiyu",
  "Singida",
  "Songwe",
  "Tabora",
  "Tanga",
  "Zanzibar North",
  "Zanzibar South",
  "Zanzibar West"
];
function formatDate(ts, lang) {
  return new Date(ts).toLocaleDateString(lang === "sw" ? "sw-TZ" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function OutbreakMapPage() {
  const { language: lang, t } = useLanguageStore();
  const [selectedRegion, setSelectedRegion] = reactExports.useState(null);
  const [typeFilter, setTypeFilter] = reactExports.useState("all");
  const [dateFilter, setDateFilter] = reactExports.useState("all");
  const [reportOpen, setReportOpen] = reactExports.useState(false);
  const [reportForm, setReportForm] = reactExports.useState({
    region: "",
    outbreakType: "crop_disease",
    diseaseName: "",
    severity: "medium",
    description: ""
  });
  const filteredOutbreaks = reactExports.useMemo(() => {
    let list = MOCK_OUTBREAKS;
    if (typeFilter !== "all")
      list = list.filter((o) => o.outbreakType === typeFilter);
    if (dateFilter === "7d")
      list = list.filter((o) => o.reportedAt >= Date.now() - 7 * 864e5);
    if (dateFilter === "30d")
      list = list.filter((o) => o.reportedAt >= Date.now() - 30 * 864e5);
    return list;
  }, [typeFilter, dateFilter]);
  const outbreakCountByRegion = reactExports.useMemo(() => {
    const counts = {};
    for (const o of filteredOutbreaks) {
      counts[o.region] = (counts[o.region] ?? 0) + 1;
    }
    return counts;
  }, [filteredOutbreaks]);
  const visibleOutbreaks = reactExports.useMemo(() => {
    if (!selectedRegion) return filteredOutbreaks;
    return filteredOutbreaks.filter((o) => o.region === selectedRegion);
  }, [filteredOutbreaks, selectedRegion]);
  const criticalCount = filteredOutbreaks.filter(
    (o) => o.severity === "critical"
  ).length;
  const regionsAffected = new Set(filteredOutbreaks.map((o) => o.region)).size;
  function handleReport(e) {
    e.preventDefault();
    setReportOpen(false);
    setReportForm({
      region: "",
      outbreakType: "crop_disease",
      diseaseName: "",
      severity: "medium",
      description: ""
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-destructive/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-6 w-6 text-destructive" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground", children: lang === "sw" ? "Ramani ya Milipuko ya Magonjwa" : "Disease Outbreak Map" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: lang === "sw" ? "Fuatilia na ripoti milipuko ya magonjwa Tanzania" : "Monitor and report disease outbreaks across Tanzania" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: reportOpen, onOpenChange: setReportOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            "data-ocid": "outbreak.open_modal_button",
            className: "gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
              lang === "sw" ? "Ripoti Mlipuko" : "Report Outbreak"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: lang === "sw" ? "Ripoti Mlipuko Mpya" : "Report New Outbreak" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleReport, className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: lang === "sw" ? "Mkoa" : "Region" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: reportForm.region,
                  onValueChange: (v) => setReportForm((f) => ({ ...f, region: v })),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "outbreak.region.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectValue,
                      {
                        placeholder: lang === "sw" ? "Chagua mkoa" : "Select region"
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: TANZANIAN_REGIONS.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r, children: r }, r)) })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: lang === "sw" ? "Aina ya Mlipuko" : "Outbreak Type" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: reportForm.outbreakType,
                  onValueChange: (v) => setReportForm((f) => ({
                    ...f,
                    outbreakType: v
                  })),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "outbreak.type.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.keys(TYPE_CONFIG).map(
                      (type) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: type, children: lang === "sw" ? TYPE_CONFIG[type].labelSw : TYPE_CONFIG[type].labelEn }, type)
                    ) })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: lang === "sw" ? "Jina la Ugonjwa" : "Disease Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  "data-ocid": "outbreak.disease_name.input",
                  value: reportForm.diseaseName,
                  onChange: (e) => setReportForm((f) => ({
                    ...f,
                    diseaseName: e.target.value
                  })),
                  placeholder: lang === "sw" ? "e.g., Blight ya Mahindi" : "e.g., Maize Blight",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: lang === "sw" ? "Kiwango cha Hatari" : "Severity" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: reportForm.severity,
                  onValueChange: (v) => setReportForm((f) => ({
                    ...f,
                    severity: v
                  })),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "outbreak.severity.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.keys(SEVERITY_CONFIG).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: lang === "sw" ? SEVERITY_CONFIG[s].labelSw : SEVERITY_CONFIG[s].labelEn }, s)) })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: lang === "sw" ? "Maelezo" : "Description" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  "data-ocid": "outbreak.description.textarea",
                  value: reportForm.description,
                  onChange: (e) => setReportForm((f) => ({
                    ...f,
                    description: e.target.value
                  })),
                  placeholder: lang === "sw" ? "Elezea hali ya mlipuko..." : "Describe the outbreak situation...",
                  rows: 3
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  "data-ocid": "outbreak.submit_button",
                  className: "flex-1",
                  children: lang === "sw" ? "Ripoti" : "Submit Report"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  "data-ocid": "outbreak.cancel_button",
                  onClick: () => setReportOpen(false),
                  children: lang === "sw" ? "Ghairi" : "Cancel"
                }
              )
            ] })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 items-center bg-card border rounded-lg p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-4 w-4 text-muted-foreground shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: typeFilter, onValueChange: setTypeFilter, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                "data-ocid": "outbreak.type_filter.select",
                className: "w-48",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: lang === "sw" ? "Aina Zote" : "All Types" }),
              Object.keys(TYPE_CONFIG).map((type) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: type, children: lang === "sw" ? TYPE_CONFIG[type].labelSw : TYPE_CONFIG[type].labelEn }, type))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: dateFilter, onValueChange: setDateFilter, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                "data-ocid": "outbreak.date_filter.select",
                className: "w-36",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: lang === "sw" ? "Wakati Wote" : "All Time" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "7d", children: lang === "sw" ? "Siku 7" : "Last 7 days" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "30d", children: lang === "sw" ? "Siku 30" : "Last 30 days" })
            ] })
          ] }),
          selectedRegion && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              "data-ocid": "outbreak.clear_region.button",
              onClick: () => setSelectedRegion(null),
              className: "gap-1 text-xs",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
                selectedRegion,
                " ×"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "grid grid-cols-3 gap-4",
          "data-ocid": "outbreak.stats.section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 pb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground", children: filteredOutbreaks.length }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: lang === "sw" ? "Milipuko Yote" : "Total Outbreaks" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border border-destructive/40 bg-destructive/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 pb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-destructive", children: criticalCount }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: lang === "sw" ? "Hatari Kuu" : "Critical" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 pb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground", children: regionsAffected }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: lang === "sw" ? "Mikoa Iliyoathiriwa" : "Regions Affected" })
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "outbreak.map.section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-primary" }),
          lang === "sw" ? "Ramani ya Tanzania" : "Tanzania Outbreak Map"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TanzaniaMapView,
            {
              listingCountByRegion: outbreakCountByRegion,
              selectedRegion: selectedRegion ?? "",
              onSelectRegion: (r) => setSelectedRegion((prev) => prev === r ? null : r),
              lang: lang ?? "en",
              t,
              totalFilteredCount: filteredOutbreaks.length
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-3 h-3 rounded-sm bg-red-500" }),
              lang === "sw" ? "Hatari Kuu / Juu" : "Critical / High"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-3 h-3 rounded-sm bg-orange-400" }),
              lang === "sw" ? "Kati" : "Medium"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-3 h-3 rounded-sm bg-yellow-400" }),
              lang === "sw" ? "Chini" : "Low"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "outbreak.list", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-base font-semibold text-foreground mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-destructive" }),
          selectedRegion ? lang === "sw" ? `Milipuko katika ${selectedRegion}` : `Outbreaks in ${selectedRegion}` : lang === "sw" ? "Milipuko Yote" : "All Outbreaks",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-normal text-muted-foreground", children: [
            "(",
            visibleOutbreaks.length,
            ")"
          ] })
        ] }),
        visibleOutbreaks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "outbreak.empty_state",
            className: "text-center py-12 text-muted-foreground bg-muted/20 rounded-lg border border-dashed",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-10 w-10 mx-auto mb-2 opacity-30" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: lang === "sw" ? "Hakuna milipuko iliyopatikana" : "No outbreaks found" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: lang === "sw" ? "Jaribu kubadilisha vichujio" : "Try adjusting your filters" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3", children: visibleOutbreaks.map((outbreak, idx) => {
          const typeCfg = TYPE_CONFIG[outbreak.outbreakType];
          const sevCfg = SEVERITY_CONFIG[outbreak.severity];
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              "data-ocid": `outbreak.item.${idx + 1}`,
              className: "border hover:shadow-md transition-shadow",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 pb-4 space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground leading-tight", children: outbreak.diseaseName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Badge,
                    {
                      className: `text-xs shrink-0 border ${typeCfg.color}`,
                      variant: "outline",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-1", children: typeCfg.icon }),
                        lang === "sw" ? typeCfg.labelSw : typeCfg.labelEn
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `text-xs ${sevCfg.color}`, children: lang === "sw" ? sevCfg.labelSw : sevCfg.labelEn }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
                    outbreak.region
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2", children: outbreak.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: outbreak.affectedArea }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatDate(outbreak.reportedAt, lang) })
                ] })
              ] })
            },
            outbreak.id
          );
        }) })
      ] })
    ] })
  ] }) });
}
export {
  OutbreakMapPage as default
};
