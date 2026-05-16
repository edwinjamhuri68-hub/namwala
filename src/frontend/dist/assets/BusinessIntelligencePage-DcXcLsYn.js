import { k as createLucideIcon, a as useLanguageStore, r as reactExports, j as jsxRuntimeExports, L as Layout, B as Button, T as TrendingUp, m as Badge } from "./index-BUVIgngH.js";
import { D as Download } from "./download-Bnji1RKn.js";
import { R as RefreshCw } from "./refresh-cw-BNbremAW.js";
import { S as Sparkles } from "./sparkles-CaU8FUVB.js";
import { M as Minus } from "./minus-BAwtOhGD.js";
import { T as TrendingDown } from "./trending-down-B-P0A2rN.js";
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
      d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",
      key: "l5xja"
    }
  ],
  [
    "path",
    {
      d: "M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z",
      key: "ep3f8r"
    }
  ],
  ["path", { d: "M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4", key: "1p4c4q" }],
  ["path", { d: "M17.599 6.5a3 3 0 0 0 .399-1.375", key: "tmeiqw" }],
  ["path", { d: "M6.003 5.125A3 3 0 0 0 6.401 6.5", key: "105sqy" }],
  ["path", { d: "M3.477 10.896a4 4 0 0 1 .585-.396", key: "ql3yin" }],
  ["path", { d: "M19.938 10.5a4 4 0 0 1 .585.396", key: "1qfode" }],
  ["path", { d: "M6 18a4 4 0 0 1-1.967-.516", key: "2e4loj" }],
  ["path", { d: "M19.967 17.484A4 4 0 0 1 18 18", key: "159ez6" }]
];
const Brain = createLucideIcon("brain", __iconNode);
const ALL_INSIGHTS = {
  profit_forecast: [
    {
      titleEn: "Projected Q2 Net Profit: TZS 820,000",
      titleSw: "Faida Halisi ya Q2 Inayotarajiwa: TZS 820,000",
      descriptionEn: "Based on current crop prices, input costs, and your farm activity, your Q2 net profit is projected to be TZS 820,000 — up 14% from Q1.",
      descriptionSw: "Kulingana na bei za mazao za sasa, gharama za pembejeo, na shughuli za shamba lako, faida halisi ya Q2 inakadiriwa kuwa TZS 820,000 — juu kwa 14% kutoka Q1.",
      value: 82e4,
      unit: "TZS",
      trend: "up",
      recommendationEn: "Reinvest 30% of Q2 profits into soil improvement for a better Q3 harvest.",
      recommendationSw: "Wekeza tena 30% ya faida ya Q2 katika uboreshaji wa udongo kwa mavuno bora ya Q3."
    },
    {
      titleEn: "Fertilizer Cost Up 12% — Reduce with Bulk Buy",
      titleSw: "Gharama ya Mbolea Imepanda 12% — Punguza kwa Ununuzi wa Pamoja",
      descriptionEn: "Fertilizer prices have risen 12% over the last 90 days. Joining a bulk-purchase group through Namwala cooperatives could reduce this by up to 25%.",
      descriptionSw: "Bei za mbolea zimepanda kwa 12% katika siku 90 zilizopita. Kujiunga na kikundi cha ununuzi wa pamoja kupitia ushirika wa Namwala kunaweza kupunguza hili kwa hadi 25%.",
      value: 12,
      unit: "%",
      trend: "down",
      recommendationEn: "Join a farming cooperative group to access bulk pricing.",
      recommendationSw: "Jiunge na kikundi cha ushirika wa kilimo kupata bei ya pamoja."
    },
    {
      titleEn: "Labour Cost Stable at TZS 8,000/day",
      titleSw: "Gharama ya Kazi Imara kwa TZS 8,000/siku",
      descriptionEn: "Daily farm labour costs have remained stable at TZS 8,000 for the past 60 days. No change expected before harvest season.",
      descriptionSw: "Gharama za kazi za shamba za kila siku zimekuwa imara kwa TZS 8,000 kwa siku 60 zilizopita. Hakuna mabadiliko yanayotarajiwa kabla ya msimu wa mavuno.",
      value: 0,
      unit: "%",
      trend: "flat",
      recommendationEn: "Optimize labour scheduling to reduce idle time during non-peak days.",
      recommendationSw: "Boresha ratiba ya kazi ili kupunguza wakati wa bure katika siku zisizo za kilele."
    },
    {
      titleEn: "Transport Costs Up 8% — Plan Ahead",
      titleSw: "Gharama za Usafiri Zimepanda 8% — Panga Mapema",
      descriptionEn: "Fuel price increases have pushed transport costs up 8%. Coordinating deliveries with neighbouring farmers can split costs.",
      descriptionSw: "Ongezeko la bei ya mafuta limepandisha gharama za usafiri kwa 8%. Kuratibu uwasilishaji na wakulima jirani kunaweza kugawana gharama.",
      value: 8,
      unit: "%",
      trend: "down",
      recommendationEn: "Coordinate transport with neighbours to share costs and improve margins.",
      recommendationSw: "Ratibu usafiri na majirani ili kugawana gharama na kuboresha faida."
    }
  ],
  crop_profitability: [
    {
      titleEn: "Maize — Best Crop This Season (+23%)",
      titleSw: "Mahindi — Zao Bora Msimu Huu (+23%)",
      descriptionEn: "Maize prices in Dodoma and Morogoro have risen 23% this season. Your farm's maize yield history puts it as the highest-margin crop you grow.",
      descriptionSw: "Bei za mahindi Dodoma na Morogoro zimepanda kwa 23% msimu huu. Historia ya mavuno ya mahindi ya shamba lako inaweka kama zao lenye faida kubwa zaidi unalolima.",
      value: 23,
      unit: "%",
      trend: "up",
      recommendationEn: "Expand maize area by 20% next season — project additional TZS 180,000 revenue.",
      recommendationSw: "Panua eneo la mahindi kwa 20% msimu ujao — tathmini mapato ya ziada ya TZS 180,000."
    },
    {
      titleEn: "Beans — Stable at TZS 1,200/kg",
      titleSw: "Maharagwe — Imara kwa TZS 1,200/kg",
      descriptionEn: "Bean prices have remained stable for 60 days. Good rotation partner for maize. Plan your next planting cycle to align with peak August demand.",
      descriptionSw: "Bei za maharagwe zimekuwa imara kwa siku 60. Mzunguko mzuri pamoja na mahindi. Panga mzunguko wako wa kupanda ujao ili ulingane na mahitaji ya kilele ya Agosti.",
      value: 0,
      unit: "%",
      trend: "flat",
      recommendationEn: "Plant beans after maize harvest in July to catch September market peak.",
      recommendationSw: "Panda maharagwe baada ya mavuno ya mahindi mnamo Julai ili kukamata kilele cha soko cha Septemba."
    },
    {
      titleEn: "Sunflower Demand Rising in Arusha (+18%)",
      titleSw: "Mahitaji ya Alizeti Yanaongezeka Arusha (+18%)",
      descriptionEn: "Sunflower oil processors in Arusha are paying premium prices — 18% above last season. Consider adding sunflower to your crop mix.",
      descriptionSw: "Wasindikaji wa mafuta ya alizeti Arusha wanalipa bei ya juu — 18% juu ya msimu uliopita. Fikiria kuongeza alizeti kwenye mchanganyiko wako wa mazao.",
      value: 18,
      unit: "%",
      trend: "up",
      recommendationEn: "Trial 0.5 acres of sunflower this season to test your soil's suitability.",
      recommendationSw: "Jaribu ekari 0.5 ya alizeti msimu huu kupima kufaa kwa udongo wako."
    }
  ],
  livestock_profitability: [
    {
      titleEn: "Beef Cattle — Highest Margin Livestock (+31%)",
      titleSw: "Ng'ombe wa Nyama — Mifugo Yenye Faida Zaidi (+31%)",
      descriptionEn: "Beef prices across Tanzania's main markets are at a 3-year high. Your cattle herd's size and health profile make them highly competitive at current market prices.",
      descriptionSw: "Bei za nyama katika masoko makuu ya Tanzania ziko kwa kiwango cha juu zaidi cha miaka 3. Ukubwa wa mifugo yako na hali ya afya huwafanya washindani wakubwa kwa bei za soko za sasa.",
      value: 31,
      unit: "%",
      trend: "up",
      recommendationEn: "List your mature cattle (3+ years) on Namwala marketplace — demand is highest now.",
      recommendationSw: "Orodhesha ng'ombe wako wazima (miaka 3+) kwenye soko la Namwala — mahitaji ni makubwa zaidi sasa."
    },
    {
      titleEn: "Goat Prices Slightly Down (−5%)",
      titleSw: "Bei za Mbuzi Zimeshuka Kidogo (−5%)",
      descriptionEn: "Goat prices in central Tanzania fell 5% over the past 30 days, likely seasonal. Expected to recover by Eid season in June.",
      descriptionSw: "Bei za mbuzi Tanzania ya kati zilishuka kwa 5% katika siku 30 zilizopita, labda ni ya msimu. Inatarajiwa kupona kufikia msimu wa Idd mnamo Juni.",
      value: 5,
      unit: "%",
      trend: "down",
      recommendationEn: "Hold goat sales until June — projected 15% price recovery before Eid.",
      recommendationSw: "Shikilia mauzo ya mbuzi hadi Juni — utabiri wa 15% kupona bei kabla ya Idd."
    },
    {
      titleEn: "Dairy Productivity — Room to Improve",
      titleSw: "Uzalishaji wa Maziwa — Nafasi ya Kuboresha",
      descriptionEn: "Average dairy yield per cow on your farm is 6L/day vs. the regional benchmark of 9L/day. Nutrition and health improvements could close this gap.",
      descriptionSw: "Wastani wa mazao ya maziwa kwa kila ng'ombe katika shamba lako ni 6L/siku dhidi ya wastani wa mkoa wa 9L/siku. Maboresho ya lishe na afya yanaweza kufunga pengo hili.",
      value: 33,
      unit: "%",
      trend: "up",
      recommendationEn: "Consult a veterinarian about nutrition supplementation to boost milk yield.",
      recommendationSw: "Wasiliana na daktari wa mifugo kuhusu nyongeza ya lishe ili kuongeza uzalishaji wa maziwa."
    }
  ],
  market_opportunity: [
    {
      titleEn: "Export Opportunity: Dried Mango to Nairobi",
      titleSw: "Fursa ya Kuuza Nje: Embe Kavu Nairobi",
      descriptionEn: "Nairobi buyers are actively sourcing dried mango from Tanzanian suppliers at TZS 4,500/kg. A processing unit partnership could open this market for your surplus mango output.",
      descriptionSw: "Wanunuzi wa Nairobi wanatafuta kikamilifu embe kavu kutoka kwa wasambazaji wa Tanzania kwa TZS 4,500/kg. Ushirikiano wa kitengo cha usindikaji unaweza kufungua soko hili kwa uzalishaji wako wa ziada wa embe.",
      value: 4500,
      unit: "TZS/kg",
      trend: "up",
      recommendationEn: "Contact the Namwala Cooperative marketplace to connect with mango buyers in Nairobi.",
      recommendationSw: "Wasiliana na soko la Ushirika wa Namwala kuungana na wanunuzi wa embe Nairobi."
    },
    {
      titleEn: "Organic Premium: +40% for Certified Produce",
      titleSw: "Malipo ya Asili: +40% kwa Mazao Yaliyothibitishwa",
      descriptionEn: "Urban supermarkets in Dar es Salaam are paying 40% premiums for certified organic vegetables and grains. Certification process takes 6–12 months through TOAM.",
      descriptionSw: "Maduka makubwa ya mijini Dar es Salaam yanalipa malipo ya 40% kwa mboga na nafaka za asili zilizothibitishwa. Mchakato wa uthibitisho huchukua miezi 6–12 kupitia TOAM.",
      value: 40,
      unit: "%",
      trend: "up",
      recommendationEn: "Begin TOAM organic certification process — high ROI within 18 months.",
      recommendationSw: "Anza mchakato wa uthibitisho wa asili wa TOAM — faida kubwa ndani ya miezi 18."
    },
    {
      titleEn: "Local Processor Contract Opportunity",
      titleSw: "Fursa ya Mkataba na Msindikaji wa Ndani",
      descriptionEn: "Bakhresa Food Products is seeking contracted maize and sunflower suppliers in Dodoma, Mbeya, and Morogoro regions. Fixed-price contracts available for 2026–2027 season.",
      descriptionSw: "Bakhresa Food Products inatafuta wasambazaji wa mahindi na alizeti waliowekwa mkataba katika mikoa ya Dodoma, Mbeya, na Morogoro. Mikataba ya bei ya kawaida inapatikana kwa msimu wa 2026–2027.",
      value: 0,
      unit: "%",
      trend: "flat",
      recommendationEn: "Apply for a Bakhresa supply contract through your district agricultural office.",
      recommendationSw: "Omba mkataba wa usambazaji wa Bakhresa kupitia ofisi ya kilimo ya wilaya yako."
    },
    {
      titleEn: "School Feeding Programme — Ongoing Tender",
      titleSw: "Programu ya Kulisha Shule — Zabuni Inayoendelea",
      descriptionEn: "The Tanzania School Feeding Programme is accepting bids for vegetable and grain supply contracts in your region. Contracts run 1 year with guaranteed offtake.",
      descriptionSw: "Programu ya Kulisha Shule ya Tanzania inakubali zabuni za mikataba ya usambazaji wa mboga na nafaka katika mkoa wako. Mikataba inakimbia kwa mwaka 1 na uhakika wa ununuzi.",
      value: 12,
      unit: "%",
      trend: "up",
      recommendationEn: "Submit a supply tender before the June 15 deadline for a stable year-round income.",
      recommendationSw: "Wasilisha zabuni ya usambazaji kabla ya tarehe ya mwisho ya Juni 15 kwa mapato thabiti mwaka mzima."
    }
  ],
  expense_analysis: [
    {
      titleEn: "Seed Cost Down 8% vs. Last Season",
      titleSw: "Gharama ya Mbegu Imeshuka 8% Ikilinganishwa na Msimu Uliopita",
      descriptionEn: "Certified seed prices are down 8% this season due to increased local production. Take advantage of lower prices to improve stock.",
      descriptionSw: "Bei za mbegu zilizothibitishwa zimeshuka kwa 8% msimu huu kutokana na ongezeko la uzalishaji wa ndani. Chukua fursa ya bei ya chini ili kuboresha hifadhi.",
      value: 8,
      unit: "%",
      trend: "up",
      recommendationEn: "Stock up on certified seeds now while prices are favourable.",
      recommendationSw: "Hifadhi mbegu zilizothibitishwa sasa ambapo bei zinafaa."
    },
    {
      titleEn: "Irrigation Cost Consuming 22% of Expenses",
      titleSw: "Gharama za Umwagiliaji Zinachukua 22% ya Gharama",
      descriptionEn: "Irrigation represents 22% of total farm expenses — higher than the regional average of 15%. Drip system installation could reduce this significantly.",
      descriptionSw: "Umwagiliaji unawakilisha 22% ya jumla ya gharama za shamba — juu zaidi ya wastani wa mkoa wa 15%. Ufungaji wa mfumo wa tone unaweza kupunguza hili kwa kiasi kikubwa.",
      value: 22,
      unit: "%",
      trend: "down",
      recommendationEn: "Invest in drip irrigation — break-even in 2 seasons, then pure cost savings.",
      recommendationSw: "Wekeza katika umwagiliaji wa tone — usawa wa gharama katika misimu 2, kisha akiba safi."
    }
  ]
};
const TREND_ICON = {
  up: TrendingUp,
  down: TrendingDown,
  flat: Minus
};
const TREND_COLOR = {
  up: "text-emerald-500",
  down: "text-red-500",
  flat: "text-muted-foreground"
};
const TREND_BG = {
  up: "bg-emerald-50 border-emerald-200",
  down: "bg-red-50 border-red-200",
  flat: "bg-muted/30 border-border"
};
const REPORT_TYPES = [
  {
    key: "profit_forecast",
    labelEn: "Profit Forecast",
    labelSw: "Utabiri wa Faida"
  },
  {
    key: "crop_profitability",
    labelEn: "Crop Profitability",
    labelSw: "Faida ya Mazao"
  },
  { key: "livestock_profitability", labelEn: "Livestock", labelSw: "Mifugo" },
  {
    key: "market_opportunity",
    labelEn: "Market Opportunities",
    labelSw: "Fursa za Soko"
  }
];
const PERIOD_OPTIONS = [
  { key: "last_30_days", labelEn: "Weekly", labelSw: "Kila Wiki" },
  { key: "last_90_days", labelEn: "Monthly", labelSw: "Kila Mwezi" },
  { key: "last_6_months", labelEn: "Quarterly", labelSw: "Kila Robo" },
  { key: "last_year", labelEn: "Annual", labelSw: "Kila Mwaka" }
];
const SUMMARY_STATS = {
  profit_forecast: [
    {
      labelEn: "Projected Q2 Profit",
      labelSw: "Faida ya Q2",
      value: "TZS 820,000"
    },
    { labelEn: "vs Q1 Growth", labelSw: "Ukuaji vs Q1", value: "+14%" },
    { labelEn: "Best Crop", labelSw: "Zao Bora", value: "Maize +23%" }
  ],
  crop_profitability: [
    { labelEn: "Top Earner", labelSw: "Zao Bora", value: "Maize +23%" },
    { labelEn: "Beans Stable", labelSw: "Maharagwe", value: "TZS 1,200/kg" },
    { labelEn: "Sunflower Opportunity", labelSw: "Alizeti", value: "+18%" }
  ],
  livestock_profitability: [
    { labelEn: "Cattle Premium", labelSw: "Faida Ng'ombe", value: "+31%" },
    { labelEn: "Goat Seasonal Dip", labelSw: "Mbuzi Msimu", value: "−5%" },
    { labelEn: "Dairy Gap", labelSw: "Pengo Maziwa", value: "33% below" }
  ],
  market_opportunity: [
    {
      labelEn: "Dried Mango Export",
      labelSw: "Embe Kavu",
      value: "TZS 4,500/kg"
    },
    { labelEn: "Organic Premium", labelSw: "Malipo Asili", value: "+40%" },
    { labelEn: "Contract Tender", labelSw: "Zabuni", value: "Open" }
  ],
  expense_analysis: [
    { labelEn: "Seed Cost Drop", labelSw: "Mbegu", value: "−8%" },
    { labelEn: "Irrigation Share", labelSw: "Umwagiliaji", value: "22%" },
    { labelEn: "Potential Savings", labelSw: "Akiba", value: "TZS 95,000" }
  ]
};
function BusinessIntelligencePage() {
  const { t, language } = useLanguageStore();
  const [selectedType, setSelectedType] = reactExports.useState("profit_forecast");
  const [period, setPeriod] = reactExports.useState("last_90_days");
  const [generating, setGenerating] = reactExports.useState(false);
  const [generationCount, setGenerationCount] = reactExports.useState(0);
  const insights = ALL_INSIGHTS[selectedType];
  const summaryStats = SUMMARY_STATS[selectedType];
  reactExports.useEffect(() => {
    setGenerating(true);
    const timer = setTimeout(() => setGenerating(false), 600);
    return () => clearTimeout(timer);
  }, []);
  function handleGenerate() {
    setGenerating(true);
    setGenerationCount((c) => c + 1);
    setTimeout(() => setGenerating(false), 1200);
  }
  function handleExport() {
    alert(
      language === "sw" ? "Usafirishaji wa PDF utapatikana katika toleo kamili la Namwala Pro." : "PDF export is available in the full Namwala Pro version."
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "bi.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b px-4 py-4 sticky top-0 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "text-primary", size: 22 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold text-foreground", children: t("business_intelligence") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            onClick: handleExport,
            "data-ocid": "bi.export_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 13, className: "mr-1" }),
              "PDF"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            onClick: handleGenerate,
            disabled: generating,
            "data-ocid": "bi.generate_button",
            children: [
              generating ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 13, className: "mr-1 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 13, className: "mr-1" }),
              generating ? language === "sw" ? "Inatengeneza..." : "Generating..." : t("generate_report")
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-4 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-2 gap-2",
          "data-ocid": "bi.report_type.tab",
          children: REPORT_TYPES.map((rt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setSelectedType(rt.key),
              className: `py-2.5 px-3 rounded-xl text-xs font-medium text-left transition-colors ${selectedType === rt.key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"}`,
              "data-ocid": `bi.type.${rt.key}`,
              children: language === "sw" ? rt.labelSw : rt.labelEn
            },
            rt.key
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-1", children: PERIOD_OPTIONS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setPeriod(p.key),
          className: `px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${period === p.key ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"}`,
          "data-ocid": `bi.period.${p.key}`,
          children: language === "sw" ? p.labelSw : p.labelEn
        },
        p.key
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", "data-ocid": "bi.summary_stats", children: summaryStats.map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border rounded-xl p-3 text-center",
          "data-ocid": `bi.stat.${stat.labelEn.toLowerCase().replace(/\s+/g, "_")}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: language === "sw" ? stat.labelSw : stat.labelEn }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground mt-1 leading-tight", children: stat.value })
          ]
        },
        stat.labelEn
      )) }),
      generationCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 11, className: "text-primary" }),
        language === "sw" ? `Ripoti ${generationCount} iliyoundwa — ${(/* @__PURE__ */ new Date()).toLocaleDateString()}` : `Report #${generationCount} generated — ${(/* @__PURE__ */ new Date()).toLocaleDateString()}`
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground", children: t("view_insights") }),
        generating ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "bi.loading_state", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card rounded-xl border p-4 space-y-3 mb-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-muted rounded w-2/3 animate-pulse" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 bg-muted rounded w-14 animate-pulse" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded w-full animate-pulse" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded w-4/5 animate-pulse" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 bg-muted/40 rounded-lg animate-pulse" })
            ]
          },
          n
        )) }) : insights.map((insight, i) => {
          const Icon = TREND_ICON[insight.trend];
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card rounded-xl border p-4 space-y-3",
              "data-ocid": `bi.insight.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground min-w-0", children: language === "sw" ? insight.titleSw : insight.titleEn }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Badge,
                    {
                      className: `flex items-center gap-1 shrink-0 border-0 ${TREND_BG[insight.trend]} ${TREND_COLOR[insight.trend]}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 12 }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold", children: insight.trend !== "flat" ? `${insight.value}${insight.unit}` : t("trend_stable") })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: language === "sw" ? insight.descriptionSw : insight.descriptionEn }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 border border-primary/20 rounded-xl p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-primary mb-1", children: [
                    "💡 ",
                    language === "sw" ? "Ushauri" : "Recommendation"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: language === "sw" ? insight.recommendationSw : insight.recommendationEn })
                ] })
              ]
            },
            `${insight.titleEn}-${generationCount}`
          );
        })
      ] })
    ] })
  ] }) });
}
export {
  BusinessIntelligencePage as default
};
