import { k as createLucideIcon, a as useLanguageStore, r as reactExports, j as jsxRuntimeExports, L as Layout, S as Search, X, B as Button, m as Badge, ac as ChevronRight } from "./index-BUVIgngH.js";
import { S as ShieldCheck } from "./shield-check-CYiHWttZ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
  ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
  ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
];
const Link2 = createLucideIcon("link-2", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "5", height: "5", x: "3", y: "3", rx: "1", key: "1tu5fj" }],
  ["rect", { width: "5", height: "5", x: "16", y: "3", rx: "1", key: "1v8r4q" }],
  ["rect", { width: "5", height: "5", x: "3", y: "16", rx: "1", key: "1x03jg" }],
  ["path", { d: "M21 16h-3a2 2 0 0 0-2 2v3", key: "177gqh" }],
  ["path", { d: "M21 21v.01", key: "ents32" }],
  ["path", { d: "M12 7v3a2 2 0 0 1-2 2H7", key: "8crl2c" }],
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M12 3h.01", key: "n36tog" }],
  ["path", { d: "M12 16v.01", key: "133mhm" }],
  ["path", { d: "M16 12h1", key: "1slzba" }],
  ["path", { d: "M21 12v.01", key: "1lwtk9" }],
  ["path", { d: "M12 21v-1", key: "1880an" }]
];
const QrCode = createLucideIcon("qr-code", __iconNode);
const SAMPLE_PRODUCTS = [
  {
    id: "tp1",
    listingId: "l1",
    productTitle: "Organic Maize — SC403",
    listingType: "crop",
    sellerName: "Juma Mwanafunzi",
    sellerRole: "Farmer",
    sellerLocation: "Dodoma Region",
    farmName: "Mwanafunzi North Farm",
    productionDate: "2026-02-01",
    trace: {
      id: "t1",
      listingId: "l1",
      origin: "Dodoma, Tanzania — Juma Mwanafunzi Farm",
      productionHistory: [
        "2026-02-01 — Seeds planted: Hybrid Maize SC403",
        "2026-02-20 — First irrigation and NPK fertilizer applied",
        "2026-03-15 — Pesticide treatment for stem borer",
        "2026-04-20 — Harvest completed: 800kg yielded",
        "2026-04-22 — Graded and packaged for market",
        "2026-04-23 — Listed on Namwala Marketplace"
      ],
      specialistNotes: [
        "Inspected by Agricultural Specialist Prof. Kibwana on 2026-04-21 — No disease detected. Certified Grade A quality."
      ],
      orderChain: [
        "2026-04-25 — Fatuma Supplies Ltd purchased 500kg (Order #ORD-2026-001)",
        "2026-04-28 — Central Market Dodoma purchased 300kg (Order #ORD-2026-002)"
      ],
      qrCodeId: "QR-DMF-20260420-001",
      createdAt: "2026-04-22"
    }
  },
  {
    id: "tp2",
    listingId: "l2",
    productTitle: "Friesian Dairy Cattle — 3 Head",
    listingType: "livestock",
    sellerName: "Salma Ndoto",
    sellerRole: "Livestock Keeper",
    sellerLocation: "Arusha Region",
    farmName: "Ndoto Dairy Farm",
    productionDate: "2025-06-01",
    trace: {
      id: "t2",
      listingId: "l2",
      origin: "Arusha, Tanzania — Salma Ndoto Dairy Farm",
      productionHistory: [
        "2025-06-01 — Herd acquired from certified breeder, Arusha",
        "2025-07-15 — FMD vaccination completed",
        "2025-09-01 — Regular health check — all clear",
        "2026-01-10 — Brucellosis test: negative",
        "2026-03-20 — Monthly health assessment — Grade A condition",
        "2026-04-30 — Listed on Namwala Marketplace"
      ],
      specialistNotes: [
        "Examined by Dr. Rehema Kisanga (Veterinarian) on 2026-04-29 — Animals certified disease-free. Milk yield: 12L/day avg."
      ],
      orderChain: [
        "2026-05-02 — Kilimanjaro Dairy Co-op inquired for 2 head (Negotiation in progress)"
      ],
      qrCodeId: "QR-NDF-20260430-002",
      createdAt: "2026-04-30"
    }
  }
];
const TYPE_STYLES = {
  crop: "bg-emerald-100 text-emerald-700",
  livestock: "bg-blue-100 text-blue-700",
  input: "bg-purple-100 text-purple-700"
};
function TraceabilityPage() {
  const { t } = useLanguageStore();
  const [query, setQuery] = reactExports.useState("");
  const [selectedProduct, setSelectedProduct] = reactExports.useState(
    null
  );
  const [showQrPrompt, setShowQrPrompt] = reactExports.useState(false);
  const [qrInput, setQrInput] = reactExports.useState("");
  const results = query.trim() ? SAMPLE_PRODUCTS.filter(
    (p) => p.productTitle.toLowerCase().includes(query.toLowerCase()) || p.sellerName.toLowerCase().includes(query.toLowerCase()) || p.trace.qrCodeId.toLowerCase().includes(query.toLowerCase())
  ) : SAMPLE_PRODUCTS;
  function handleQrSearch() {
    const found = SAMPLE_PRODUCTS.find(
      (p) => p.trace.qrCodeId.toLowerCase() === qrInput.trim().toLowerCase()
    );
    if (found) {
      setSelectedProduct(found);
      setShowQrPrompt(false);
      setQrInput("");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "traceability.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b px-4 py-4 sticky top-0 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: "text-primary", size: 22 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold text-foreground", children: t("supply_chain") })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-4 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex items-center bg-card border rounded-xl px-3 gap-2 focus-within:ring-2 focus-within:ring-primary/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 16, className: "text-muted-foreground shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              className: "flex-1 py-2.5 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none",
              placeholder: `${t("trace_product")} — ${t("traceability_id")}...`,
              value: query,
              onChange: (e) => setQuery(e.target.value),
              "data-ocid": "traceability.search_input"
            }
          ),
          query && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setQuery(""),
              className: "text-muted-foreground hover:text-foreground",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            onClick: () => setShowQrPrompt(true),
            "data-ocid": "traceability.qr_scan_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { size: 16, className: "mr-1.5" }),
              " ",
              t("qr_scan")
            ]
          }
        )
      ] }),
      results.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-16",
          "data-ocid": "traceability.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: "mx-auto text-muted-foreground/40", size: 48 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-3", children: t("no_trace_data") })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: results.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card rounded-xl border p-4 space-y-2",
          "data-ocid": `traceability.result.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: product.productTitle }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                  product.sellerName,
                  " · ",
                  product.sellerLocation
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: `text-xs shrink-0 ${TYPE_STYLES[product.listingType]}`,
                  children: product.listingType
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground", children: product.trace.qrCodeId }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  onClick: () => setSelectedProduct(product),
                  "data-ocid": `traceability.view_button.${i + 1}`,
                  children: t("view_full_chain")
                }
              )
            ] })
          ]
        },
        product.id
      )) })
    ] }),
    selectedProduct && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border rounded-2xl w-full max-w-md shadow-xl max-h-[92vh] flex flex-col",
        "data-ocid": "traceability.detail_dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-foreground truncate", children: selectedProduct.productTitle }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                t("traceability_id"),
                ": ",
                selectedProduct.trace.qrCodeId
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setSelectedProduct(null),
                "data-ocid": "traceability.detail_close_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20, className: "text-muted-foreground" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 space-y-5 overflow-y-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-4 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { size: 12 }),
                " ",
                t("product_origin")
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: selectedProduct.farmName }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                selectedProduct.sellerName,
                " · ",
                selectedProduct.sellerRole
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                "📍 ",
                selectedProduct.sellerLocation
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: t("production_history") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative space-y-0", children: selectedProduct.trace.productionHistory.map((event, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-start gap-3 pb-3",
                  "data-ocid": `traceability.history.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-primary mt-1 shrink-0" }),
                      i < selectedProduct.trace.productionHistory.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "w-0.5 flex-1 bg-border mt-1",
                          style: { minHeight: 16 }
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: event })
                  ]
                },
                event
              )) })
            ] }),
            selectedProduct.trace.specialistNotes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: t("specialistNotes") }),
              selectedProduct.trace.specialistNotes.map((note, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "bg-emerald-50 border border-emerald-200 rounded-lg p-3",
                  "data-ocid": `traceability.specialist_note.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 13, className: "text-emerald-600" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-emerald-700", children: t("confirmed") })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-emerald-800", children: note })
                  ]
                },
                note
              ))
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: t("supply_chain") }),
              selectedProduct.trace.orderChain.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: t("noData") }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y rounded-lg border overflow-hidden", children: selectedProduct.trace.orderChain.map((order, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-2 px-3 py-2.5 bg-card",
                  "data-ocid": `traceability.chain.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ChevronRight,
                      {
                        size: 14,
                        className: "text-muted-foreground shrink-0"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: order })
                  ]
                },
                order
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-4 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("traceability_id") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm font-bold text-primary", children: selectedProduct.trace.qrCodeId })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { size: 32, className: "text-muted-foreground/50" })
            ] })
          ] })
        ]
      }
    ) }),
    showQrPrompt && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border rounded-2xl w-full max-w-sm shadow-xl",
        "data-ocid": "traceability.qr_dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-foreground", children: t("qr_scan") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setShowQrPrompt(false),
                "data-ocid": "traceability.qr_close_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20, className: "text-muted-foreground" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: t("traceability_id") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: "w-full bg-background border rounded-lg px-3 py-2.5 text-sm font-mono uppercase text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-2 focus:ring-primary/40 tracking-widest",
                placeholder: "QR-XXX-00000000-000",
                value: qrInput,
                onChange: (e) => setQrInput(e.target.value.toUpperCase()),
                "data-ocid": "traceability.qr_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-t flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "flex-1",
                onClick: () => setShowQrPrompt(false),
                "data-ocid": "traceability.qr_cancel_button",
                children: t("cancel")
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "flex-1",
                onClick: handleQrSearch,
                disabled: !qrInput.trim(),
                "data-ocid": "traceability.qr_confirm_button",
                children: t("trace_product")
              }
            )
          ] })
        ]
      }
    ) })
  ] }) });
}
export {
  TraceabilityPage as default
};
