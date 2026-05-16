import { k as createLucideIcon, a as useLanguageStore, b as useNavigate, r as reactExports, j as jsxRuntimeExports, L as Layout, T as TrendingUp, z as formatTSh, H as ChevronDown, I as Input, m as Badge, P as Package, B as Button, N as CircleCheck, K as Clock } from "./index-BUVIgngH.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-Coi4Z4Fu.js";
import { A as ArrowLeft } from "./arrow-left-BIW276yu.js";
import { C as CircleX } from "./circle-x-bCVEqfs_.js";
import { C as Calendar } from "./calendar-DegZ54HI.js";
import { S as ShieldCheck } from "./shield-check-CYiHWttZ.js";
import { B as Banknote } from "./banknote-DXlkdxFO.js";
import { D as Download } from "./download-Bnji1RKn.js";
import "./index-BpD0H2hM.js";
import "./index-BoFiBQpD.js";
import "./Combination-D9wAFE8R.js";
import "./index-D6ql0bBU.js";
import "./index-Cg_2nNnI.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const BadgeCheck = createLucideIcon("badge-check", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2", key: "1yt0o3" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }]
];
const Smartphone = createLucideIcon("smartphone", __iconNode);
const MOCK_TRANSACTIONS = [
  {
    id: "tx1",
    reference: "TXN-2026-001847",
    description: "NPK Fertilizer 50kg × 5 bags",
    buyerName: "Juma Mwalimu",
    sellerName: "Ally Agro Supplies",
    amount: 475e3,
    method: "mpesa",
    status: "completed",
    createdAt: "2026-04-28T10:22:00Z",
    category: "purchase"
  },
  {
    id: "tx2",
    reference: "TXN-2026-001901",
    description: "Sahiwal Cross Cattle × 2 heads",
    buyerName: "Juma Mwalimu",
    sellerName: "Amina Hassan",
    amount: 17e5,
    method: "nmb",
    status: "held",
    createdAt: "2026-05-01T14:05:00Z",
    category: "livestock"
  },
  {
    id: "tx3",
    reference: "TXN-2026-001956",
    description: "Tractor Plowing Service – 3 acres",
    buyerName: "Juma Mwalimu",
    sellerName: "Msigwa Farm Services",
    amount: 135e3,
    method: "tigo_pesa",
    status: "completed",
    createdAt: "2026-05-02T09:15:00Z",
    category: "service"
  },
  {
    id: "tx4",
    reference: "TXN-2026-002010",
    description: "Dudu Kill Pesticide 1L × 4",
    buyerName: "Juma Mwalimu",
    sellerName: "Ally Agro Supplies",
    amount: 48e3,
    method: "mpesa",
    status: "completed",
    createdAt: "2026-05-03T07:40:00Z",
    category: "purchase"
  },
  {
    id: "tx5",
    reference: "TXN-2026-002088",
    description: "Truck Transport – Mbeya to Dar es Salaam",
    buyerName: "Juma Mwalimu",
    sellerName: "Kwame Logistics",
    amount: 32e4,
    method: "airtel_money",
    status: "held",
    createdAt: "2026-05-04T11:30:00Z",
    category: "transport"
  },
  {
    id: "tx6",
    reference: "TXN-2026-002134",
    description: "Hybrid Maize Seeds 5kg × 10 packs",
    buyerName: "Juma Mwalimu",
    sellerName: "Ally Agro Supplies",
    amount: 185e3,
    method: "crdb",
    status: "pending",
    createdAt: "2026-05-05T16:00:00Z",
    category: "purchase"
  },
  {
    id: "tx7",
    reference: "TXN-2026-002201",
    description: "Irrigation Pipe Kit – 100m",
    buyerName: "Juma Mwalimu",
    sellerName: "TanzaFarm Inputs Ltd",
    amount: 95e3,
    method: "mpesa",
    status: "failed",
    createdAt: "2026-05-05T18:20:00Z",
    category: "purchase"
  },
  {
    id: "tx8",
    reference: "TXN-2026-002255",
    description: "Veterinary Consultation Service",
    buyerName: "Juma Mwalimu",
    sellerName: "Dr. Neema Veterinary Clinic",
    amount: 45e3,
    method: "tigo_pesa",
    status: "refunded",
    createdAt: "2026-04-20T08:00:00Z",
    category: "service"
  }
];
const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    labelSw: "Inasubiri",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
    badgeClass: "bg-muted text-muted-foreground border-border",
    bg: "bg-muted/20"
  },
  held: {
    label: "Held (Escrow)",
    labelSw: "Imehifadhiwa",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3.5 h-3.5" }),
    badgeClass: "bg-amber-100 text-amber-700 border-amber-200",
    bg: "bg-amber-50/50"
  },
  completed: {
    label: "Completed",
    labelSw: "Imekamilika",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
    badgeClass: "bg-accent/15 text-accent-foreground border-accent/30",
    bg: "bg-accent/5"
  },
  failed: {
    label: "Failed",
    labelSw: "Imeshindwa",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5" }),
    badgeClass: "bg-destructive/10 text-destructive border-destructive/20",
    bg: "bg-destructive/5"
  },
  refunded: {
    label: "Refunded",
    labelSw: "Imerudishwa",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3.5 h-3.5" }),
    badgeClass: "bg-blue-100 text-blue-700 border-blue-200",
    bg: "bg-blue-50/40"
  }
};
const METHOD_CONFIG = {
  mpesa: {
    label: "M-Pesa",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-3.5 h-3.5" }),
    color: "text-green-600"
  },
  tigo_pesa: {
    label: "Tigo Pesa",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-3.5 h-3.5" }),
    color: "text-blue-600"
  },
  airtel_money: {
    label: "Airtel Money",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-3.5 h-3.5" }),
    color: "text-red-500"
  },
  crdb: {
    label: "CRDB Bank",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-3.5 h-3.5" }),
    color: "text-primary"
  },
  nmb: {
    label: "NMB Bank",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-3.5 h-3.5" }),
    color: "text-primary"
  },
  cash: {
    label: "Cash",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Banknote, { className: "w-3.5 h-3.5" }),
    color: "text-muted-foreground"
  }
};
function formatDate(iso, lang, includeTime = false) {
  const d = new Date(iso);
  const opts = {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...includeTime ? { hour: "2-digit", minute: "2-digit" } : {}
  };
  return d.toLocaleDateString(lang === "sw" ? "sw-TZ" : "en-US", opts);
}
function getCurrentMonth() {
  return (/* @__PURE__ */ new Date()).toISOString().slice(0, 7);
}
function isThisMonth(iso) {
  return iso.startsWith(getCurrentMonth());
}
function ReceiptModal({
  tx,
  lang,
  onClose
}) {
  const method = METHOD_CONFIG[tx.method];
  const status = STATUS_CONFIG[tx.status];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm mx-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2 font-display", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "w-5 h-5 text-accent" }),
      lang === "sw" ? "Risiti ya Malipo" : "Payment Receipt"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "payment_history.receipt.dialog",
        className: "border border-border rounded-xl overflow-hidden bg-background text-xs",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary px-4 py-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground font-display font-bold text-base", children: "Namwala" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/70 text-[11px] mt-0.5", children: "Official Transaction Receipt" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "divide-y divide-border", children: [
            [
              [
                lang === "sw" ? "Kumbukumbu" : "Reference",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-mono font-semibold text-foreground",
                    children: tx.reference
                  },
                  "ref"
                )
              ],
              [
                lang === "sw" ? "Tarehe" : "Date",
                formatDate(tx.createdAt, lang, true)
              ],
              [lang === "sw" ? "Maudhui" : "Description", tx.description],
              [lang === "sw" ? "Mnunuzi" : "Buyer", tx.buyerName],
              [lang === "sw" ? "Muuzaji" : "Seller", tx.sellerName],
              [
                lang === "sw" ? "Njia ya Malipo" : "Payment Method",
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: `flex items-center gap-1 ${method.color}`,
                    children: [
                      method.icon,
                      method.label
                    ]
                  },
                  "method"
                )
              ],
              [
                lang === "sw" ? "Hali" : "Status",
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: `flex items-center gap-1 font-semibold ${tx.status === "completed" ? "text-accent-foreground" : tx.status === "held" ? "text-amber-700" : "text-muted-foreground"}`,
                    children: [
                      status.icon,
                      lang === "sw" ? status.labelSw : status.label
                    ]
                  },
                  "status"
                )
              ]
            ].map(([label, value]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex justify-between gap-3 px-4 py-2.5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground shrink-0", children: label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground text-right", children: value })
                ]
              },
              String(label)
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center px-4 py-3 bg-muted/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground text-sm", children: lang === "sw" ? "Jumla" : "Total Amount" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-primary text-base", children: formatTSh(tx.amount) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 bg-muted/20 text-muted-foreground text-[11px] text-center border-t border-border", children: lang === "sw" ? "Hii ni risiti ya kidijitali kutoka kwa Namwala. Kumbuka kutunza nakala hii." : "This is a digital receipt from Namwala. Please retain this for your records." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          "data-ocid": "payment_history.receipt.close_button",
          variant: "outline",
          className: "flex-1",
          onClick: onClose,
          children: lang === "sw" ? "Funga" : "Close"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "payment_history.receipt.download_button",
          variant: "default",
          className: "flex-1 gap-1.5",
          onClick: () => window.print(),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
            lang === "sw" ? "Chapisha" : "Print"
          ]
        }
      )
    ] })
  ] });
}
function PaymentHistoryPage() {
  const { language } = useLanguageStore();
  const lang = language;
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = reactExports.useState(
    "all"
  );
  const [methodFilter, setMethodFilter] = reactExports.useState(
    "all"
  );
  const [dateFrom, setDateFrom] = reactExports.useState("");
  const [dateTo, setDateTo] = reactExports.useState("");
  const [receiptTx, setReceiptTx] = reactExports.useState(null);
  const [transactions, setTransactions] = reactExports.useState(MOCK_TRANSACTIONS);
  const [showFilters, setShowFilters] = reactExports.useState(false);
  const filtered = transactions.filter((tx) => {
    if (statusFilter !== "all" && tx.status !== statusFilter) return false;
    if (methodFilter !== "all" && tx.method !== methodFilter) return false;
    if (dateFrom && tx.createdAt < dateFrom) return false;
    if (dateTo && tx.createdAt > `${dateTo}T23:59:59Z`) return false;
    return true;
  });
  const thisMonthTxs = transactions.filter((tx) => isThisMonth(tx.createdAt));
  const totalSpentMonth = thisMonthTxs.filter((tx) => tx.status === "completed" || tx.status === "held").reduce((s, tx) => s + tx.amount, 0);
  const statusBreakdown = ["completed", "held", "pending", "failed", "refunded"].map((s) => ({
    status: s,
    count: transactions.filter((tx) => tx.status === s).length
  }));
  function confirmDelivery(id) {
    setTransactions(
      (prev) => prev.map((tx) => tx.id === id ? { ...tx, status: "completed" } : tx)
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "payment_history.page",
        className: "px-4 py-4 pb-12 space-y-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "payment_history.back_button",
                onClick: () => navigate({ to: "/home" }),
                className: "w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary/40 transition-colors duration-200",
                "aria-label": "Go back",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 text-foreground" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-lg font-bold text-foreground", children: lang === "sw" ? "Historia ya Malipo" : "Payment History" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                filtered.length,
                " ",
                lang === "sw" ? "miamala" : "transactions"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-3 bg-card border border-border rounded-xl p-4 flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: lang === "sw" ? "Imetumika Mwezi Huu" : "Spent This Month" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-xl text-primary font-display leading-tight", children: formatTSh(totalSpentMonth) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                  thisMonthTxs.length,
                  " ",
                  lang === "sw" ? "miamala" : "transactions in",
                  " ",
                  (/* @__PURE__ */ new Date()).toLocaleDateString(
                    lang === "sw" ? "sw-TZ" : "en-US",
                    { month: "long", year: "numeric" }
                  )
                ] })
              ] })
            ] }),
            statusBreakdown.filter((b) => b.count > 0).map(({ status, count }) => {
              const cfg = STATUS_CONFIG[status];
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": `payment_history.status_filter.${status}`,
                  onClick: () => setStatusFilter(
                    (prev) => prev === status ? "all" : status
                  ),
                  className: `rounded-xl border p-3 text-left transition-colors duration-200 ${statusFilter === status ? `${cfg.badgeClass} border-2` : "bg-card border-border hover:border-primary/30"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-foreground", children: count }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground leading-tight mt-0.5", children: lang === "sw" ? cfg.labelSw : cfg.label })
                  ]
                },
                status
              );
            })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": "payment_history.toggle_filters_button",
                onClick: () => setShowFilters((p) => !p),
                className: "flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ChevronDown,
                    {
                      className: `w-4 h-4 transition-transform duration-200 ${showFilters ? "rotate-180" : ""}`
                    }
                  ),
                  lang === "sw" ? "Vichujio" : "Filters",
                  (statusFilter !== "all" || methodFilter !== "all" || dateFrom || dateTo) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold", children: [
                    statusFilter !== "all",
                    methodFilter !== "all",
                    !!dateFrom,
                    !!dateTo
                  ].filter(Boolean).length })
                ]
              }
            ),
            showFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-3 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5", children: lang === "sw" ? "Hali" : "Status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: [
                  "all",
                  "pending",
                  "held",
                  "completed",
                  "failed",
                  "refunded"
                ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": `payment_history.filter_status.${s}`,
                    onClick: () => setStatusFilter(s),
                    className: `px-3 py-1 rounded-full text-xs font-medium border transition-colors duration-200 ${statusFilter === s ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-border hover:border-primary/40"}`,
                    children: s === "all" ? lang === "sw" ? "Yote" : "All" : lang === "sw" ? STATUS_CONFIG[s].labelSw : STATUS_CONFIG[s].label
                  },
                  s
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5", children: lang === "sw" ? "Njia ya Malipo" : "Payment Method" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: [
                  "all",
                  "mpesa",
                  "tigo_pesa",
                  "airtel_money",
                  "crdb",
                  "nmb",
                  "cash"
                ].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": `payment_history.filter_method.${m}`,
                    onClick: () => setMethodFilter(m),
                    className: `px-3 py-1 rounded-full text-xs font-medium border transition-colors duration-200 ${methodFilter === m ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-border hover:border-primary/40"}`,
                    children: m === "all" ? lang === "sw" ? "Zote" : "All" : METHOD_CONFIG[m].label
                  },
                  m
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5", children: lang === "sw" ? "Kipindi" : "Date Range" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        className: "text-[11px] text-muted-foreground",
                        htmlFor: "date-from",
                        children: lang === "sw" ? "Kutoka" : "From"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "date-from",
                        "data-ocid": "payment_history.date_from_input",
                        type: "date",
                        value: dateFrom,
                        onChange: (e) => setDateFrom(e.target.value),
                        className: "h-8 text-xs mt-0.5"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        className: "text-[11px] text-muted-foreground",
                        htmlFor: "date-to",
                        children: lang === "sw" ? "Hadi" : "To"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "date-to",
                        "data-ocid": "payment_history.date_to_input",
                        type: "date",
                        value: dateTo,
                        onChange: (e) => setDateTo(e.target.value),
                        className: "h-8 text-xs mt-0.5"
                      }
                    )
                  ] }),
                  (dateFrom || dateTo) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        setDateFrom("");
                        setDateTo("");
                      },
                      className: "mt-4 text-xs text-muted-foreground hover:text-destructive transition-colors duration-200",
                      "aria-label": "Clear dates",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4" })
                    }
                  )
                ] })
              ] }),
              (statusFilter !== "all" || methodFilter !== "all" || dateFrom || dateTo) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "payment_history.clear_filters_button",
                  onClick: () => {
                    setStatusFilter("all");
                    setMethodFilter("all");
                    setDateFrom("");
                    setDateTo("");
                  },
                  className: "text-xs text-destructive hover:underline",
                  children: lang === "sw" ? "Futa Vichujio Vyote" : "Clear all filters"
                }
              )
            ] })
          ] }),
          filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "payment_history.empty_state",
              className: "bg-card border border-border rounded-xl py-14 text-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-12 h-12 text-muted-foreground mx-auto mb-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: lang === "sw" ? "Hakuna Miamala" : "No Transactions Found" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 max-w-xs mx-auto", children: lang === "sw" ? "Jaribu kubadilisha vichujio" : "Try adjusting your filters" })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "payment_history.list", className: "space-y-3", children: filtered.map((tx, i) => {
            const status = STATUS_CONFIG[tx.status];
            const method = METHOD_CONFIG[tx.method];
            const isHeld = tx.status === "held";
            const isCompleted = tx.status === "completed";
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": `payment_history.item.${i + 1}`,
                className: "bg-card border border-border rounded-xl overflow-hidden",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: `px-4 py-2 flex items-center justify-between border-b border-border ${status.bg}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] text-muted-foreground tracking-tight", children: tx.reference }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Badge,
                          {
                            "data-ocid": `payment_history.status_badge.${i + 1}`,
                            className: `flex items-center gap-1 text-[11px] font-semibold border px-2 py-0.5 h-auto rounded-full ${status.badgeClass}`,
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
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground leading-tight", children: tx.description }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-x-3 gap-y-0.5 mt-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                            lang === "sw" ? "Muuzaji" : "Seller",
                            ":",
                            " ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: tx.sellerName })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                            lang === "sw" ? "Mnunuzi" : "Buyer",
                            ":",
                            " ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: tx.buyerName })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: `flex items-center gap-1 mt-1.5 text-xs font-medium ${method.color}`,
                            children: [
                              method.icon,
                              method.label
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-primary text-sm", children: formatTSh(tx.amount) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: formatDate(tx.createdAt, lang) })
                      ] })
                    ] }),
                    (isCompleted || isHeld) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pt-3 border-t border-border flex gap-2", children: [
                      isCompleted && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          "data-ocid": `payment_history.view_receipt_button.${i + 1}`,
                          variant: "outline",
                          size: "sm",
                          className: "flex-1 text-xs gap-1.5",
                          onClick: () => setReceiptTx(tx),
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "w-3.5 h-3.5" }),
                            lang === "sw" ? "Tazama Risiti" : "View Receipt"
                          ]
                        }
                      ),
                      isHeld && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          "data-ocid": `payment_history.confirm_delivery_button.${i + 1}`,
                          variant: "default",
                          size: "sm",
                          className: "flex-1 text-xs gap-1.5",
                          onClick: () => confirmDelivery(tx.id),
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
                            lang === "sw" ? "Thibitisha Kupokea" : "Confirm Delivery"
                          ]
                        }
                      )
                    ] })
                  ] })
                ]
              },
              tx.id
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
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!receiptTx,
        onOpenChange: (open) => !open && setReceiptTx(null),
        children: receiptTx && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ReceiptModal,
          {
            tx: receiptTx,
            lang,
            onClose: () => setReceiptTx(null)
          }
        )
      }
    )
  ] });
}
export {
  PaymentHistoryPage as default
};
