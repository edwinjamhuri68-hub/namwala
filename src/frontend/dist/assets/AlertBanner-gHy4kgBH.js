import { r as reactExports, j as jsxRuntimeExports, X } from "./index-BUVIgngH.js";
import { T as TriangleAlert } from "./triangle-alert-CqH2Gyzq.js";
const PRIORITY_STYLES = {
  critical: "bg-destructive/15 border-destructive/40 text-destructive",
  high: "bg-amber-50 border-amber-300 text-amber-800",
  normal: "bg-accent/10 border-accent/30 text-accent-foreground"
};
function AlertBanner({
  message,
  priority = "normal",
  dismissible = true,
  onDismiss
}) {
  const [dismissed, setDismissed] = reactExports.useState(false);
  if (dismissed) return null;
  const handleDismiss = () => {
    setDismissed(true);
    onDismiss == null ? void 0 : onDismiss();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "alert.banner",
      className: `flex items-start gap-2 px-3 py-2.5 border rounded-lg text-sm ${PRIORITY_STYLES[priority]}`,
      role: "alert",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 mt-0.5 flex-shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "flex-1 text-sm leading-snug", children: message }),
        dismissible && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleDismiss,
            "data-ocid": "alert.close_button",
            className: "flex-shrink-0 hover:opacity-70 transition-smooth",
            "aria-label": "Dismiss alert",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
          }
        )
      ]
    }
  );
}
export {
  AlertBanner as A
};
