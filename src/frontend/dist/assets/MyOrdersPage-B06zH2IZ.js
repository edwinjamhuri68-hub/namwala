import { k as createLucideIcon, a as useLanguageStore, b as useNavigate, ao as React, j as jsxRuntimeExports, L as Layout, B as Button, P as Package, z as formatTSh, N as CircleCheck, aa as Star, K as Clock, f as Truck } from "./index-BUVIgngH.js";
import { A as ArrowLeft } from "./arrow-left-BIW276yu.js";
import { L as Lock } from "./lock-Vof0dJDf.js";
import { S as ShieldCheck } from "./shield-check-CYiHWttZ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z", key: "hou9p0" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M16 10a4 4 0 0 1-8 0", key: "1ltviw" }]
];
const ShoppingBag = createLucideIcon("shopping-bag", __iconNode);
const MOCK_ORDERS = [
  {
    id: "ord1",
    reference: "ORD-1715123456789",
    listingTitle: "NPK Fertilizer 50kg",
    listingId: "ml1",
    sellerId: "u5",
    sellerName: "Ally Agro Supplies",
    quantity: 5,
    unitPrice: 95e3,
    totalPrice: 475e3,
    paymentMethod: "mpesa",
    status: "delivered",
    createdAt: "2025-04-28T10:00:00Z"
  },
  {
    id: "ord2",
    reference: "ORD-1715223456790",
    listingTitle: "Hybrid Maize Seeds 5kg",
    listingId: "ml2",
    sellerId: "u5",
    sellerName: "Ally Agro Supplies",
    quantity: 10,
    unitPrice: 18500,
    totalPrice: 185e3,
    paymentMethod: "crdb",
    status: "in_transit",
    createdAt: "2025-05-01T14:00:00Z"
  },
  {
    id: "ord3",
    reference: "ORD-1715323456791",
    listingTitle: "Tractor Plowing Service",
    listingId: "ml3",
    sellerId: "u6",
    sellerName: "Msigwa Farm Services",
    quantity: 3,
    unitPrice: 45e3,
    totalPrice: 135e3,
    paymentMethod: "cash",
    status: "confirmed",
    createdAt: "2025-05-03T09:00:00Z"
  },
  {
    id: "ord4",
    reference: "ORD-1715423456792",
    listingTitle: "Sahiwal Cross Cattle",
    listingId: "alf1",
    sellerId: "u2",
    sellerName: "Amina Hassan",
    quantity: 2,
    unitPrice: 85e4,
    totalPrice: 17e5,
    paymentMethod: "nmb",
    status: "held",
    escrow: true,
    createdAt: "2025-05-05T11:00:00Z"
  },
  {
    id: "ord6",
    reference: "ORD-1715623456794",
    listingTitle: "Organic Tomatoes 10kg",
    listingId: "ml6",
    sellerId: "u8",
    sellerName: "Fatuma Organic Farm",
    quantity: 6,
    unitPrice: 8500,
    totalPrice: 51e3,
    paymentMethod: "tigo_pesa",
    status: "held",
    escrow: true,
    createdAt: "2025-05-06T07:30:00Z"
  },
  {
    id: "ord5",
    reference: "ORD-1715523456793",
    listingTitle: "Dudu Kill Pesticide",
    listingId: "ip3",
    sellerId: "u5",
    sellerName: "Ally Agro Supplies",
    quantity: 4,
    unitPrice: 12e3,
    totalPrice: 48e3,
    paymentMethod: "mpesa",
    status: "delivered",
    createdAt: "2025-04-20T08:00:00Z"
  }
];
const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    labelSw: "Inasubiri",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
    badgeClass: "bg-amber-100 text-amber-700 border-amber-200"
  },
  confirmed: {
    label: "Confirmed",
    labelSw: "Imethibitishwa",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
    badgeClass: "bg-blue-100 text-blue-700 border-blue-200"
  },
  in_transit: {
    label: "In Transit",
    labelSw: "Safirishwa",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-3.5 h-3.5" }),
    badgeClass: "bg-primary/10 text-primary border-primary/20"
  },
  delivered: {
    label: "Delivered",
    labelSw: "Imewasilishwa",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
    badgeClass: "bg-accent/15 text-accent-foreground border-accent/30"
  },
  cancelled: {
    label: "Cancelled",
    labelSw: "Imeghairiwa",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
    badgeClass: "bg-destructive/10 text-destructive border-destructive/20"
  },
  held: {
    label: "Payment Held",
    labelSw: "Malipo Yameshikiliwa",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3.5 h-3.5" }),
    badgeClass: "bg-amber-100 text-amber-700 border-amber-300"
  }
};
const PAYMENT_LABELS = {
  mpesa: { en: "M-Pesa", sw: "M-Pesa" },
  tigo_pesa: { en: "Tigo Pesa", sw: "Tigo Pesa" },
  airtel_money: { en: "Airtel Money", sw: "Airtel Money" },
  crdb: { en: "CRDB Bank", sw: "Benki ya CRDB" },
  nmb: { en: "NMB Bank", sw: "Benki ya NMB" },
  cash: { en: "Cash on Delivery", sw: "Pesa Taslimu" }
};
function formatDate(iso, lang) {
  const d = new Date(iso);
  return lang === "sw" ? d.toLocaleDateString("sw-TZ", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }) : d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function MyOrdersPage() {
  const { t, language } = useLanguageStore();
  const navigate = useNavigate();
  const lang = language;
  const [orders, setOrders] = React.useState(MOCK_ORDERS);
  const confirmDelivery = (orderId) => {
    setOrders(
      (prev) => prev.map(
        (o) => o.id === orderId ? { ...o, status: "delivered" } : o
      )
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "my_orders.page", className: "px-4 py-4 pb-10 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": "my_orders.back_button",
          onClick: () => navigate({ to: "/marketplace" }),
          className: "w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary/40 transition-smooth",
          "aria-label": "Go back",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 text-foreground" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-lg font-bold text-foreground", children: t("myOrders") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          orders.length,
          " ",
          lang === "sw" ? "maagizo" : "orders"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-1 scrollbar-hide", children: [
      "all",
      "held",
      "pending",
      "confirmed",
      "in_transit",
      "delivered"
    ].map((s) => {
      var _a, _b;
      const count = s === "all" ? orders.length : orders.filter((o) => o.status === s).length;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium ${s === "held" ? "bg-amber-50 border-amber-200 text-amber-700" : "bg-card border-border text-muted-foreground"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: count }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: s === "all" ? lang === "sw" ? "Yote" : "All" : lang === "sw" ? (_a = STATUS_CONFIG[s]) == null ? void 0 : _a.labelSw : (_b = STATUS_CONFIG[s]) == null ? void 0 : _b.label })
          ]
        },
        s
      );
    }) }),
    orders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "my_orders.empty_state",
        className: "bg-card border border-border rounded-xl py-14 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-12 h-12 text-muted-foreground mx-auto mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: t("noOrders") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 max-w-xs mx-auto", children: t("noOrdersDesc") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              "data-ocid": "my_orders.go_to_marketplace_button",
              variant: "outline",
              className: "mt-4",
              onClick: () => navigate({ to: "/marketplace" }),
              children: t("goToMarketplace")
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "my_orders.list", children: orders.map((order, i) => {
      const status = STATUS_CONFIG[order.status];
      const isDelivered = order.status === "delivered";
      const isHeld = order.status === "held";
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": `my_orders.item.${i + 1}`,
          className: "bg-card border border-border rounded-xl overflow-hidden",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `px-4 py-2 flex items-center justify-between border-b border-border ${isHeld ? "bg-amber-50" : isDelivered ? "bg-accent/8" : "bg-muted/20"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] text-muted-foreground", children: order.reference }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: `flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-semibold ${status.badgeClass}`,
                      children: [
                        status.icon,
                        lang === "sw" ? status.labelSw : status.label
                      ]
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-start", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-5 h-5 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground leading-tight", children: order.listingTitle }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                    t("seller"),
                    ": ",
                    order.sellerName
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-x-3 gap-y-1 mt-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                      t("quantity"),
                      ":",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: order.quantity })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: PAYMENT_LABELS[order.paymentMethod][lang === "sw" ? "sw" : "en"] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-primary text-sm", children: formatTSh(order.totalPrice) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: formatDate(order.createdAt, lang) })
                ] })
              ] }),
              isHeld && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pt-3 border-t border-amber-200 space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 bg-amber-50 rounded-lg px-3 py-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-700 leading-relaxed", children: lang === "sw" ? "Fedha zako zimeshikiliwa salama. Zitatolewa kwa muuzaji ukithibitisha utoaji." : "Your funds are held securely. They will be released to the seller once you confirm delivery." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    "data-ocid": `my_orders.confirm_delivery_button.${i + 1}`,
                    size: "sm",
                    className: "w-full bg-amber-600 hover:bg-amber-700 text-white text-xs gap-1.5",
                    onClick: () => confirmDelivery(order.id),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
                      lang === "sw" ? "Thibitisha Utoaji & Toa Fedha" : "Confirm Delivery & Release Funds"
                    ]
                  }
                )
              ] }),
              isDelivered && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pt-3 border-t border-border flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    "data-ocid": `my_orders.rate_seller_button.${i + 1}`,
                    variant: "outline",
                    size: "sm",
                    className: "flex-1 text-xs gap-1.5",
                    onClick: () => navigate({
                      to: "/seller/$sellerId/reviews",
                      params: { sellerId: order.sellerId }
                    }),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5" }),
                      t("rateSeller")
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    "data-ocid": `my_orders.view_details_button.${i + 1}`,
                    variant: "ghost",
                    size: "sm",
                    className: "flex-1 text-xs text-muted-foreground",
                    onClick: () => navigate({ to: "/marketplace" }),
                    children: lang === "sw" ? "Nunua Tena" : "Buy Again"
                  }
                )
              ] })
            ] })
          ]
        },
        order.id
      );
    }) }),
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
  MyOrdersPage as default
};
