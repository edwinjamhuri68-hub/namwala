import { j as jsxRuntimeExports, T as TrendingUp } from "./index-BUVIgngH.js";
import { T as TrendingDown } from "./trending-down-B-P0A2rN.js";
import { M as Minus } from "./minus-BAwtOhGD.js";
function StatCard({
  title,
  value,
  trend,
  trendValue,
  icon,
  colorClass = "bg-primary/10 text-primary",
  onClick
}) {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor = trend === "up" ? "text-green-600" : trend === "down" ? "text-destructive" : "text-muted-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "stat.card",
      role: onClick ? "button" : void 0,
      tabIndex: onClick ? 0 : void 0,
      onClick,
      onKeyDown: onClick ? (e) => {
        if (e.key === "Enter") onClick();
      } : void 0,
      className: `bg-card border border-border rounded-xl p-3 ${onClick ? "cursor-pointer hover:shadow-md active:scale-[0.98] transition-smooth" : ""}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          icon && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${colorClass}`,
              children: icon
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground leading-tight truncate", children: title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-display font-bold text-foreground mt-0.5", children: value })
          ] })
        ] }),
        trend && trendValue && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-1 text-xs mt-2 ${trendColor}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendIcon, { className: "w-3 h-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: trendValue })
        ] })
      ]
    }
  );
}
export {
  StatCard as S
};
