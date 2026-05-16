import { T as TrendingUp, j as jsxRuntimeExports } from "./index-BUVIgngH.js";
import { T as TrendingDown } from "./trending-down-B-P0A2rN.js";
import { M as Minus } from "./minus-BAwtOhGD.js";
function MarketPriceCard({ price, lang = "en" }) {
  const name = lang === "sw" ? price.commoditySwahili : price.commodity;
  const TrendIcon = price.trend === "up" ? TrendingUp : price.trend === "down" ? TrendingDown : Minus;
  const trendColor = price.trend === "up" ? "text-green-600" : price.trend === "down" ? "text-destructive" : "text-muted-foreground";
  const trendBg = price.trend === "up" ? "bg-green-50" : price.trend === "down" ? "bg-destructive/5" : "bg-muted/50";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "market.price_card",
      className: "bg-card border border-border rounded-xl p-3 flex items-center gap-3",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: price.category === "livestock" ? "🐄" : "🌾" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-sm text-foreground truncate", children: name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: price.market })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-sm text-foreground", children: price.pricePerKg.toLocaleString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: "TSh/kg" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `flex items-center gap-0.5 text-xs mt-0.5 ${trendColor} ${trendBg} px-1.5 py-0.5 rounded-full`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TrendIcon, { className: "w-3 h-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: price.trend === "stable" ? "—" : `${price.trend === "up" ? "+" : "-"}${price.changeAmount}` })
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  MarketPriceCard as M
};
