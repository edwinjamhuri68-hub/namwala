import { P as Package, M as MessageCircle, T as TrendingUp, G as Bell, j as jsxRuntimeExports, a0 as cn, ab as timeAgo, d as useNotificationStore, a as useLanguageStore, b as useNavigate, L as Layout, B as Button } from "./index-BUVIgngH.js";
import { T as Trophy } from "./trophy-CIdLAcJn.js";
import { S as Syringe } from "./syringe-CUQ027P-.js";
import { B as Bug } from "./bug-CMwW2EO6.js";
import { W as Wrench } from "./wrench-BsBPj7OM.js";
import { T as TriangleAlert } from "./triangle-alert-CqH2Gyzq.js";
const TYPE_ICONS = {
  disease_alert: TriangleAlert,
  weather_alert: Bell,
  price_update: TrendingUp,
  message: MessageCircle,
  service_request: Wrench,
  pest_outbreak: Bug,
  vaccination_reminder: Syringe,
  order_update: Package,
  badge_earned: Trophy
};
const PRIORITY_DOT = {
  critical: "bg-destructive",
  high: "bg-amber-400",
  normal: "bg-accent"
};
const TYPE_BG = {
  disease_alert: "bg-destructive/10 text-destructive",
  weather_alert: "bg-blue-50 text-blue-600",
  price_update: "bg-green-50 text-green-600",
  message: "bg-primary/10 text-primary",
  service_request: "bg-accent/10 text-accent",
  pest_outbreak: "bg-amber-50 text-amber-700",
  vaccination_reminder: "bg-purple-50 text-purple-600",
  order_update: "bg-secondary text-secondary-foreground",
  badge_earned: "bg-amber-100 text-amber-600"
};
function NotificationItem({
  notification,
  onClick,
  lang = "en"
}) {
  const Icon = TYPE_ICONS[notification.type] ?? Bell;
  const isBadge = notification.type === "badge_earned";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      "data-ocid": "notification.item",
      className: cn(
        "w-full flex items-start gap-3 px-4 py-3 text-left transition-smooth hover:bg-muted/40 active:bg-muted/60",
        !notification.read && "bg-primary/5",
        isBadge && !notification.read && "bg-amber-50/60 border-l-2 border-amber-400"
      ),
      onClick,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center",
              TYPE_BG[notification.type] ?? "bg-muted",
              isBadge && "ring-2 ring-amber-300"
            ),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn("w-4 h-4", isBadge && "drop-shadow-sm") })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: cn(
                  "text-sm leading-tight",
                  !notification.read ? "font-semibold text-foreground" : "font-medium text-foreground",
                  isBadge && "text-amber-700"
                ),
                children: notification.title
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: cn(
                    "w-2 h-2 rounded-full",
                    PRIORITY_DOT[notification.priority]
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground whitespace-nowrap", children: timeAgo(notification.createdAt, lang) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: cn(
                "text-xs text-muted-foreground mt-0.5 line-clamp-2 leading-relaxed",
                isBadge && "text-amber-600/80"
              ),
              children: notification.body
            }
          )
        ] })
      ]
    }
  );
}
function NotificationsPage() {
  const { notifications, unreadCount, markRead, markAllRead } = useNotificationStore();
  const { t, language } = useLanguageStore();
  const navigate = useNavigate();
  const sorted = [...notifications].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const handleNotificationClick = (n) => {
    markRead(n.id);
    if (n.actionUrl) {
      navigate({ to: n.actionUrl });
    } else if (n.type === "message" && n.relatedId) {
      navigate({ to: "/messages", search: { recipientId: void 0 } });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-4 border-b border-border bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-display font-bold text-foreground", children: t("notifications") }),
        unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: markAllRead,
            "data-ocid": "notifications.mark_all_read_button",
            className: "text-xs text-primary font-semibold",
            children: t("markAllRead")
          }
        )
      ] }),
      unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
        unreadCount,
        " ",
        t("unreadNotifications")
      ] })
    ] }),
    sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "notifications.empty_state",
        className: "flex flex-col items-center justify-center py-16 px-4 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-12 h-12 text-muted-foreground/30 mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: t("noData") })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "notifications.list",
        className: "divide-y divide-border",
        children: sorted.map((n, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": `notification.item.${i + 1}`,
            className: n.type === "badge_earned" ? "border-l-2 border-amber-400 bg-amber-50/40" : n.read ? "" : "bg-primary/5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                NotificationItem,
                {
                  notification: n,
                  onClick: () => handleNotificationClick(n),
                  lang: language
                }
              ),
              !n.read && n.type === "badge_earned" && n.actionUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-3 -mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => handleNotificationClick(n),
                  className: "text-[11px] font-semibold text-amber-700 bg-amber-100 hover:bg-amber-200 transition-smooth px-3 py-1 rounded-full",
                  "data-ocid": `notification.view_badge_button.${i + 1}`,
                  children: language === "sw" ? "Angalia Profaili →" : "View Profile →"
                }
              ) }),
              !n.read && n.type === "message" && n.relatedId && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-3 -mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => handleNotificationClick(n),
                  className: "text-[11px] font-semibold text-primary bg-primary/10 hover:bg-primary/20 transition-smooth px-3 py-1 rounded-full",
                  "data-ocid": `notification.view_message_button.${i + 1}`,
                  children: [
                    t("viewMessage"),
                    " →"
                  ]
                }
              ) })
            ]
          },
          n.id
        ))
      }
    )
  ] }) });
}
export {
  NotificationsPage as default
};
