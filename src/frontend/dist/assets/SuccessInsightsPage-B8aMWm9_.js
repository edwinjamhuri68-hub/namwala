import { a as useLanguageStore, Z as useBackend, aA as useQueryClient, r as reactExports, aB as useQuery, j as jsxRuntimeExports, L as Layout, n as Skeleton, aa as Star, aN as CircleAlert, m as Badge, w as ChartNoAxesColumn, B as Button, l as Textarea, T as TrendingUp } from "./index-BUVIgngH.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-ChCgH42_.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-Coi4Z4Fu.js";
import { L as Label } from "./label-BTY_QCm0.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C7D5N9Bz.js";
import { u as useMutation } from "./useMutation-BB6v1FNg.js";
import { u as ue } from "./index-c308oYmR.js";
import { P as Plus } from "./plus-DMsGFanj.js";
import { L as Lightbulb } from "./lightbulb-BbCrq2Ko.js";
import { T as TrendingDown } from "./trending-down-B-P0A2rN.js";
import { M as Minus } from "./minus-BAwtOhGD.js";
import "./index-BpD0H2hM.js";
import "./index-BoFiBQpD.js";
import "./Combination-D9wAFE8R.js";
import "./index-D6ql0bBU.js";
import "./index-Cg_2nNnI.js";
import "./index-ob0xpmgs.js";
import "./index-Oh98DbrD.js";
import "./check-Byk4lD13.js";
import "./chevron-up-CnJPygwE.js";
const REGIONS = [
  "Dodoma",
  "Arusha",
  "Kilimanjaro",
  "Tanga",
  "Morogoro",
  "Pwani",
  "Dar es Salaam",
  "Lindi",
  "Mtwara",
  "Ruvuma",
  "Iringa",
  "Mbeya",
  "Singida",
  "Tabora",
  "Rukwa",
  "Kigoma",
  "Shinyanga",
  "Kagera",
  "Mwanza",
  "Mara",
  "Manyara",
  "Geita",
  "Simiyu",
  "Njombe",
  "Katavi",
  "Songwe"
];
function SuccessInsightsPage() {
  const { language } = useLanguageStore();
  const t = (en, sw) => language === "sw" ? sw : en;
  const { actor } = useBackend();
  const qc = useQueryClient();
  const [selectedRegion, setSelectedRegion] = reactExports.useState("Dodoma");
  const [activeTab, setActiveTab] = reactExports.useState("sellers");
  const [showSuggestionDialog, setShowSuggestionDialog] = reactExports.useState(false);
  const [suggestionText, setSuggestionText] = reactExports.useState("");
  const [suggestionCategory, setSuggestionCategory] = reactExports.useState("general");
  const { data: topSellers, isLoading: sellersLoading } = useQuery(
    {
      queryKey: ["topSellers", selectedRegion],
      queryFn: async () => {
        if (!actor) return [];
        return actor.getTopSellersByRegion(selectedRegion, BigInt(10));
      },
      enabled: !!actor
    }
  );
  const { data: trendingCrops, isLoading: cropsLoading } = useQuery({
    queryKey: ["trendingCrops"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTrendingCrops(BigInt(8));
    },
    enabled: !!actor
  });
  const { data: marketGaps, isLoading: gapsLoading } = useQuery({
    queryKey: ["marketGaps"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMarketGaps(BigInt(6));
    },
    enabled: !!actor
  });
  const { data: benchmark, isLoading: benchmarkLoading } = useQuery({
    queryKey: ["farmBenchmark", selectedRegion],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyFarmBenchmark(selectedRegion);
    },
    enabled: !!actor
  });
  const { data: suggestions, isLoading: suggestionsLoading } = useQuery({
    queryKey: ["improvementSuggestions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyImprovementSuggestions();
    },
    enabled: !!actor
  });
  const addSuggestionMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.addImprovementSuggestion(suggestionText, suggestionCategory);
    },
    onSuccess: () => {
      ue.success(t("Suggestion added!", "Pendekezo limeongezwa!"));
      qc.invalidateQueries({ queryKey: ["improvementSuggestions"] });
      setShowSuggestionDialog(false);
      setSuggestionText("");
    },
    onError: () => ue.error(
      t("Failed to add suggestion", "Imeshindwa kuongeza pendekezo")
    )
  });
  const renderTrend = (growth) => {
    const val = Number(growth);
    if (val > 0)
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-green-600 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3 h-3" }),
        "+",
        val,
        "%"
      ] });
    if (val < 0)
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-red-500 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-3 h-3" }),
        val,
        "%"
      ] });
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-muted-foreground text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3 h-3" }),
      "0%"
    ] });
  };
  const TABS = [
    {
      key: "sellers",
      label: t("Top Sellers", "Wauzaji Bora"),
      labelSw: "Wauzaji Bora"
    },
    {
      key: "crops",
      label: t("Trending Crops", "Mazao Yanayotambaa"),
      labelSw: "Mazao Yanayotambaa"
    },
    {
      key: "gaps",
      label: t("Market Gaps", "Pengo la Soko"),
      labelSw: "Pengo la Soko"
    },
    {
      key: "benchmark",
      label: t("My Benchmark", "Kiwango Changu"),
      labelSw: "Kiwango Changu"
    },
    {
      key: "suggestions",
      label: t("Suggestions", "Mapendekezo"),
      labelSw: "Mapendekezo"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: t("Success Insights", "Maarifa ya Mafanikio") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: t(
          "Data-driven insights to grow your agricultural business",
          "Maarifa yanayotegemea data kukua kwa biashara yako ya kilimo"
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedRegion, onValueChange: setSelectedRegion, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            className: "w-40",
            "data-ocid": "insights.region_select",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: REGIONS.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r, children: r }, r)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex border-b border-border overflow-x-auto", children: TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        className: `px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab.key ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"}`,
        onClick: () => setActiveTab(tab.key),
        "data-ocid": `insights.${tab.key}_tab`,
        children: tab.label
      },
      tab.key
    )) }),
    activeTab === "sellers" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: t(
        `Top sellers in ${selectedRegion}`,
        `Wauzaji bora huko ${selectedRegion}`
      ) }),
      sellersLoading ? ["s0", "s1", "s2", "s3", "s4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full rounded-lg" }, k)) : (topSellers ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "py-10 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-muted-foreground",
          "data-ocid": "insights.sellers_empty_state",
          children: t(
            "No seller data for this region yet",
            "Hakuna data ya wauzaji kwa mkoa huu bado"
          )
        }
      ) }) }) : (topSellers ?? []).map((s, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          "data-ocid": `insights.seller.item.${idx + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary", children: [
                "#",
                idx + 1
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: s.sellerName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: s.region })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground", children: Number(s.salesVolume).toLocaleString() }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("Sales", "Mauzo") })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-foreground flex items-center gap-1 justify-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 fill-yellow-400 text-yellow-400" }),
                  s.averageRating.toFixed(1)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("Rating", "Ukadiriaji") })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground", children: Number(s.listingCount) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("Listings", "Orodha") })
              ] })
            ] })
          ] }) })
        },
        s.sellerName
      ))
    ] }),
    activeTab === "crops" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: cropsLoading ? ["s0", "s1", "s2", "s3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full rounded-lg" }, k)) : (trendingCrops ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "py-10 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "text-muted-foreground",
        "data-ocid": "insights.crops_empty_state",
        children: t(
          "No crop trend data yet",
          "Hakuna data ya mwenendo wa mazao bado"
        )
      }
    ) }) }) : (trendingCrops ?? []).map((c, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        "data-ocid": `insights.crop.item.${idx + 1}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold capitalize", children: c.category }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              Number(c.listingCount),
              " ",
              t("listings", "orodha")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold", children: [
                "TSh ",
                Number(c.averagePrice).toLocaleString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("avg price", "bei ya wastani") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: renderTrend(c.priceGrowthPct) })
          ] })
        ] }) })
      },
      c.category
    )) }),
    activeTab === "gaps" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: t(
        "High demand, low supply = opportunity",
        "Mahitaji mengi, ugavi mdogo = fursa"
      ) }),
      gapsLoading ? ["s0", "s1", "s2", "s3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full rounded-lg" }, k)) : (marketGaps ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "py-10 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-muted-foreground",
          "data-ocid": "insights.gaps_empty_state",
          children: t(
            "No market gap data yet",
            "Hakuna data ya pengo la soko bado"
          )
        }
      ) }) }) : (marketGaps ?? []).map((g, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          "data-ocid": `insights.gap.item.${idx + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-5 h-5 text-orange-500 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold capitalize", children: g.category }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  Number(g.supplyCount),
                  " ",
                  t("suppliers", "wasambazaji")
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground", children: Number(g.demandScore) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("demand", "mahitaji") })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: Number(g.opportunityScore) > 70 ? "default" : "secondary",
                  children: [
                    Number(g.opportunityScore),
                    " ",
                    t("opp.", "fur.")
                  ]
                }
              ) })
            ] })
          ] }) })
        },
        g.category
      ))
    ] }),
    activeTab === "benchmark" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: benchmarkLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full rounded-lg" }) : !benchmark ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "w-12 h-12 mx-auto mb-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-muted-foreground",
          "data-ocid": "insights.benchmark_empty_state",
          children: t(
            "No benchmark data available yet",
            "Hakuna data ya kiwango bado"
          )
        }
      )
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { children: [
        t(
          "Your Farm vs Regional Average",
          "Shamba Lako dhidi ya Wastani wa Mkoa"
        ),
        " ",
        "— ",
        benchmark.region
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: t("Your Listings", "Orodha Zako") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-foreground", children: Number(benchmark.listingCount) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground pb-1", children: [
                t("vs", "dhidi ya"),
                " ",
                Number(benchmark.regionalAvgListings),
                " ",
                t("avg", "wastani")
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-muted rounded-full mt-2 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full bg-primary rounded-full",
                style: {
                  width: `${Math.min(Number(benchmark.listingCount) / Math.max(Number(benchmark.regionalAvgListings), 1) * 100, 100)}%`
                }
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: t("Your Orders", "Maagizo Yako") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-foreground", children: Number(benchmark.orderCount) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground pb-1", children: [
                t("vs", "dhidi ya"),
                " ",
                Number(benchmark.regionalAvgOrders),
                " ",
                t("avg", "wastani")
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-muted rounded-full mt-2 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full bg-primary rounded-full",
                style: {
                  width: `${Math.min(Number(benchmark.orderCount) / Math.max(Number(benchmark.regionalAvgOrders), 1) * 100, 100)}%`
                }
              }
            ) })
          ] })
        ] }),
        Number(benchmark.listingCount) < Number(benchmark.regionalAvgListings) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-orange-600 bg-orange-50 rounded-md p-3", children: t(
          `You have ${Number(benchmark.regionalAvgListings) - Number(benchmark.listingCount)} fewer listings than average. Consider adding more products to reach more buyers.`,
          `Una orodha ${Number(benchmark.regionalAvgListings) - Number(benchmark.listingCount)} chache kuliko wastani. Fikiria kuongeza bidhaa zaidi.`
        ) })
      ] })
    ] }) }),
    activeTab === "suggestions" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowSuggestionDialog(true),
          variant: "outline",
          size: "sm",
          "data-ocid": "insights.add_suggestion_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
            t("Add Suggestion", "Ongeza Pendekezo")
          ]
        }
      ) }),
      suggestionsLoading ? ["s0", "s1", "s2"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full rounded-lg" }, k)) : (suggestions ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-10 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "w-12 h-12 mx-auto mb-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-muted-foreground",
            "data-ocid": "insights.suggestions_empty_state",
            children: t(
              "No improvement suggestions yet",
              "Hakuna mapendekezo ya uboreshaji bado"
            )
          }
        )
      ] }) }) : (suggestions ?? []).map((s, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          "data-ocid": `insights.suggestion.item.${idx + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "w-5 h-5 text-yellow-500 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "text-xs capitalize",
                    children: s.category
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: new Date(
                  Number(s.createdAt) / 1e6
                ).toLocaleDateString() })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: s.suggestionText })
            ] })
          ] }) })
        },
        s.id.toString()
      ))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: showSuggestionDialog,
        onOpenChange: setShowSuggestionDialog,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: t(
            "Add Improvement Suggestion",
            "Ongeza Pendekezo la Uboreshaji"
          ) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("Category", "Aina") }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: suggestionCategory,
                  onValueChange: setSuggestionCategory,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "insights.suggestion_category_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "general", children: t("General", "Jumla") }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "crops", children: t("Crops", "Mazao") }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "livestock", children: t("Livestock", "Mifugo") }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "market", children: t("Market", "Soko") }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "finance", children: t("Finance", "Fedha") })
                    ] })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("Suggestion", "Pendekezo") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  value: suggestionText,
                  onChange: (e) => setSuggestionText(e.target.value),
                  placeholder: t(
                    "Share your improvement idea...",
                    "Shiriki wazo lako la uboreshaji..."
                  ),
                  rows: 4,
                  "data-ocid": "insights.suggestion_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  onClick: () => setShowSuggestionDialog(false),
                  "data-ocid": "insights.suggestion_cancel_button",
                  children: t("Cancel", "Ghairi")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: () => addSuggestionMutation.mutate(),
                  disabled: !suggestionText || addSuggestionMutation.isPending,
                  "data-ocid": "insights.suggestion_submit_button",
                  children: addSuggestionMutation.isPending ? t("Adding...", "Inaongeza...") : t("Add Suggestion", "Ongeza Pendekezo")
                }
              )
            ] })
          ] })
        ] })
      }
    )
  ] }) });
}
export {
  SuccessInsightsPage as default
};
