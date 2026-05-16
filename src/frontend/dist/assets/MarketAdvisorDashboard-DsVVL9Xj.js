import { u as useAuthStore, a as useLanguageStore, j as jsxRuntimeExports, L as Layout, T as TrendingUp, G as Bell, m as Badge, B as Button, M as MessageCircle, i as MARKET_PRICES } from "./index-BUVIgngH.js";
import { M as MarketPriceCard } from "./MarketPriceCard-BEDWrgkq.js";
import { S as StatCard } from "./StatCard-vQlqcd7B.js";
import { C as ChartColumn } from "./chart-column-C-I8DRKD.js";
import "./trending-down-B-P0A2rN.js";
import "./minus-BAwtOhGD.js";
const INSIGHTS = [
  {
    commodity: "Maize",
    insight_en: "Prices rising due to dry season demand. Sell within 2 weeks for best returns.",
    insight_sw: "Bei zinapanda kwa sababu ya ukame. Uza ndani ya wiki 2 kwa mapato mazuri.",
    action: "sell",
    confidence: 85
  },
  {
    commodity: "Coffee",
    insight_en: "Export demand high from Moshi. Current price TSh 4,500/kg — optimal sell window.",
    insight_sw: "Mahitaji ya nje ni makubwa kutoka Moshi. Bei TSh 4,500/kg — wakati mzuri wa kuuza.",
    action: "sell",
    confidence: 92
  },
  {
    commodity: "Rice",
    insight_en: "Oversupply in Mwanza market. Hold stock for 3 weeks before selling.",
    insight_sw: "Ziada ya bidhaa Mwanza. Subiri wiki 3 kabla ya kuuza.",
    action: "hold",
    confidence: 78
  }
];
function MarketAdvisorDashboard() {
  const { user } = useAuthStore();
  const { language } = useLanguageStore();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-4 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-xl overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "/assets/generated/market-advisor.dim_800x400.jpg",
          alt: "Market",
          className: "w-full h-32 object-cover"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent flex items-end p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-display font-bold text-white", children: language === "sw" ? "Mshauri wa Soko" : "Market Advisor" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-white/80", children: [
          user == null ? void 0 : user.name,
          " · ",
          user == null ? void 0 : user.specialization
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          title: language === "sw" ? "Soko Zinazofuatiliwa" : "Markets Tracked",
          value: "12",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-4 h-4" }),
          colorClass: "bg-purple-50 text-purple-600"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          title: language === "sw" ? "Ushauri Leo" : "Advisories",
          value: "5",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4" }),
          colorClass: "bg-green-50 text-green-600"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          title: language === "sw" ? "Watumiaji" : "Users Helped",
          value: "38",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4" }),
          colorClass: "bg-primary/10 text-primary"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground mb-2", children: language === "sw" ? "Ushauri wa Soko" : "Market Insights" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: INSIGHTS.map((insight, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": `market.insight.${i + 1}`,
          className: "bg-card border border-border rounded-xl p-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", children: insight.commodity }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: insight.action === "sell" ? "default" : "secondary",
                    className: "text-[10px]",
                    children: insight.action === "sell" ? language === "sw" ? "↑ Uza Sasa" : "↑ Sell Now" : language === "sw" ? "→ Subiri" : "→ Hold"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
                  insight.confidence,
                  "% conf."
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground leading-relaxed", children: language === "sw" ? insight.insight_sw : insight.insight_en }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  className: "flex-1 text-xs",
                  "data-ocid": `market.publish_button.${i + 1}`,
                  children: language === "sw" ? "Chapisha Ushauri" : "Publish Advisory"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "ghost",
                  className: "text-xs h-8 px-2",
                  "data-ocid": `market.share_button.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-3 h-3" })
                }
              )
            ] })
          ]
        },
        insight.commodity
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground mb-2", children: language === "sw" ? "Bei za Soko" : "Current Market Prices" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: MARKET_PRICES.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(MarketPriceCard, { price: p, lang: language }, p.commodity)) })
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
  ] }) });
}
export {
  MarketAdvisorDashboard as default
};
