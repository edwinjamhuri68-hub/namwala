import { k as createLucideIcon, a as useLanguageStore, r as reactExports, j as jsxRuntimeExports, L as Layout, B as Button, m as Badge, N as CircleCheck, K as Clock, X, H as ChevronDown } from "./index-BUVIgngH.js";
import { P as Plus } from "./plus-DMsGFanj.js";
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
      d: "m18 5-2.414-2.414A2 2 0 0 0 14.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2",
      key: "142zxg"
    }
  ],
  [
    "path",
    {
      d: "M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
      key: "2t3380"
    }
  ],
  ["path", { d: "M8 18h1", key: "13wk12" }]
];
const FilePenLine = createLucideIcon("file-pen-line", __iconNode);
const CURRENT_USER_ID = "u1";
const SAMPLE_CONTRACTS = [
  {
    id: "c1",
    creatorId: "u1",
    counterpartyId: "u2",
    templateType: "crop_sale",
    title: "Maize Sale — 500kg to Fatuma Supplies",
    partiesNames: ["Juma Mwanafunzi", "Fatuma Supplies Ltd"],
    terms: "Seller agrees to deliver 500kg Grade-A maize to buyer at Dodoma Central Market by 5th May 2026. Payment of TSh 400,000 via M-Pesa within 24 hours of delivery.",
    amount: 4e5,
    currency: "TSh",
    startDate: "2026-04-28",
    endDate: "2026-05-05",
    status: "active",
    creatorSignedAt: "2026-04-28",
    counterpartySignedAt: "2026-04-29",
    createdAt: "2026-04-28",
    updatedAt: "2026-04-29"
  },
  {
    id: "c2",
    creatorId: "u1",
    counterpartyId: "u3",
    templateType: "service_agreement",
    title: "Tractor Plowing — 3 Acres, South Field",
    partiesNames: ["Juma Mwanafunzi", "Ali Tractor Services"],
    terms: "Provider agrees to plow 3 acres at South Field, Dodoma using tractor on 12th May 2026. Rate: TSh 35,000 per acre. Total payable after service completion.",
    amount: 105e3,
    currency: "TSh",
    startDate: "2026-05-12",
    endDate: "2026-05-12",
    status: "draft",
    creatorSignedAt: "2026-05-01",
    createdAt: "2026-05-01",
    updatedAt: "2026-05-01"
  }
];
const STATUS_STYLES = {
  draft: "bg-muted text-muted-foreground",
  active: "bg-emerald-100 text-emerald-700",
  completed: "bg-blue-100 text-blue-700",
  disputed: "bg-red-100 text-red-700",
  cancelled: "bg-muted text-muted-foreground"
};
const TEMPLATE_LABELS = {
  crop_sale: "Crop Sale",
  service_agreement: "Service",
  delivery_agreement: "Delivery",
  livestock_sale: "Livestock",
  custom: "Custom"
};
const FILTER_TABS = [
  { key: "all", label: "All" },
  { key: "draft", label: "Draft" },
  { key: "active", label: "Active" },
  { key: "completed", label: "Completed" }
];
function ContractsPage() {
  const { t } = useLanguageStore();
  const [contracts, setContracts] = reactExports.useState(SAMPLE_CONTRACTS);
  const [filterTab, setFilterTab] = reactExports.useState("all");
  const [showCreate, setShowCreate] = reactExports.useState(false);
  const [viewContract, setViewContract] = reactExports.useState(
    null
  );
  const [toast, setToast] = reactExports.useState(null);
  const [formTemplate, setFormTemplate] = reactExports.useState("crop_sale");
  const [formTitle, setFormTitle] = reactExports.useState("");
  const [formCounterparty, setFormCounterparty] = reactExports.useState("");
  const [formTerms, setFormTerms] = reactExports.useState("");
  const [formAmount, setFormAmount] = reactExports.useState("");
  const [formStart, setFormStart] = reactExports.useState("");
  const [formEnd, setFormEnd] = reactExports.useState("");
  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  }
  function handleCreate() {
    if (!formTitle.trim() || !formCounterparty.trim()) return;
    const contract = {
      id: `c${Date.now()}`,
      creatorId: CURRENT_USER_ID,
      counterpartyId: "u_new",
      templateType: formTemplate,
      title: formTitle.trim(),
      partiesNames: ["You", formCounterparty.trim()],
      terms: formTerms.trim(),
      amount: Number(formAmount) || 0,
      currency: "TSh",
      startDate: formStart,
      endDate: formEnd,
      status: "draft",
      creatorSignedAt: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      createdAt: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
    };
    setContracts((prev) => [contract, ...prev]);
    setFormTitle("");
    setFormCounterparty("");
    setFormTerms("");
    setFormAmount("");
    setFormStart("");
    setFormEnd("");
    setShowCreate(false);
    showToast(t("contract_created"));
  }
  function signContract(id) {
    setContracts(
      (prev) => prev.map((c) => {
        if (c.id !== id) return c;
        const now = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
        if (c.creatorId === CURRENT_USER_ID) {
          const bothSigned2 = !!c.counterpartySignedAt;
          return {
            ...c,
            creatorSignedAt: now,
            status: bothSigned2 ? "active" : "draft",
            updatedAt: now
          };
        }
        const bothSigned = !!c.creatorSignedAt;
        return {
          ...c,
          counterpartySignedAt: now,
          status: bothSigned ? "active" : "draft",
          updatedAt: now
        };
      })
    );
    showToast(t("contract_signed"));
    setViewContract(null);
  }
  const filtered = filterTab === "all" ? contracts : contracts.filter((c) => c.status === filterTab);
  const templates = [
    "crop_sale",
    "service_agreement",
    "delivery_agreement",
    "livestock_sale",
    "custom"
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "contracts.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b px-4 py-4 sticky top-0 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FilePenLine, { className: "text-primary", size: 22 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold text-foreground", children: t("contracts") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          onClick: () => setShowCreate(true),
          "data-ocid": "contracts.create_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16, className: "mr-1" }),
            " ",
            t("create_contract")
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-4 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex gap-1.5 overflow-x-auto pb-0.5",
          "data-ocid": "contracts.filter.tab",
          children: FILTER_TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setFilterTab(tab.key),
              className: `px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${filterTab === tab.key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"}`,
              "data-ocid": `contracts.filter.${tab.key}`,
              children: tab.key === "all" ? t("all_records") : t(`contract_${tab.key}`)
            },
            tab.key
          ))
        }
      ),
      filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-16 space-y-3",
          "data-ocid": "contracts.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FilePenLine,
              {
                className: "mx-auto text-muted-foreground/40",
                size: 48
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: t("no_contracts") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", onClick: () => setShowCreate(true), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14, className: "mr-1" }),
              " ",
              t("create_contract")
            ] })
          ]
        }
      ) : filtered.map((contract, i) => {
        var _a, _b, _c, _d;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card rounded-xl border p-4 space-y-3",
            "data-ocid": `contracts.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 flex-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs bg-muted text-muted-foreground", children: TEMPLATE_LABELS[contract.templateType] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mt-1", children: contract.title })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: `text-xs shrink-0 ${STATUS_STYLES[contract.status]}`,
                    children: t(
                      `contract_${contract.status}`
                    )
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: contract.partiesNames.map((name) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground",
                  children: name
                },
                name
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-2", children: contract.terms }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-primary", children: [
                  "TSh ",
                  contract.amount.toLocaleString()
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    contract.creatorSignedAt ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0.5 text-xs text-emerald-600", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 11 }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: (_a = contract.partiesNames[0]) == null ? void 0 : _a.split(" ")[0] })
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0.5 text-xs text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 11 }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: (_b = contract.partiesNames[0]) == null ? void 0 : _b.split(" ")[0] })
                    ] }),
                    contract.counterpartySignedAt ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0.5 text-xs text-emerald-600", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 11 }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: (_c = contract.partiesNames[1]) == null ? void 0 : _c.split(" ")[0] })
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0.5 text-xs text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 11 }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: (_d = contract.partiesNames[1]) == null ? void 0 : _d.split(" ")[0] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      onClick: () => setViewContract(contract),
                      "data-ocid": `contracts.view_button.${i + 1}`,
                      children: t("viewProfile")
                    }
                  )
                ] })
              ] })
            ]
          },
          contract.id
        );
      })
    ] }),
    showCreate && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border rounded-2xl w-full max-w-md shadow-xl max-h-[90vh] flex flex-col",
        "data-ocid": "contracts.create_dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-foreground", children: t("create_contract") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setShowCreate(false),
                "data-ocid": "contracts.create_close_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20, className: "text-muted-foreground" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 space-y-4 overflow-y-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  className: "text-sm font-medium text-foreground",
                  htmlFor: "contract-template-select",
                  children: t("contract_template")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "select",
                  {
                    className: "w-full bg-background border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40 appearance-none",
                    value: formTemplate,
                    onChange: (e) => setFormTemplate(e.target.value),
                    "data-ocid": "contracts.template_select",
                    id: "contract-template-select",
                    children: templates.map((tmpl) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: tmpl, children: t(
                      `template_${tmpl === "service_agreement" ? "service" : tmpl === "delivery_agreement" ? "delivery" : tmpl === "livestock_sale" ? "livestock" : tmpl === "crop_sale" ? "crop_sale" : "custom"}`
                    ) }, tmpl))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ChevronDown,
                  {
                    size: 14,
                    className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  className: "text-sm font-medium text-foreground",
                  htmlFor: "contract-title-input",
                  children: t("record_title")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  className: "w-full bg-background border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40",
                  placeholder: "e.g. Maize Sale — 500kg",
                  value: formTitle,
                  onChange: (e) => setFormTitle(e.target.value),
                  "data-ocid": "contracts.title_input",
                  id: "contract-title-input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  className: "text-sm font-medium text-foreground",
                  htmlFor: "contract-counterparty-input",
                  children: t("counterparty")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  className: "w-full bg-background border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40",
                  placeholder: "Name / contact",
                  value: formCounterparty,
                  onChange: (e) => setFormCounterparty(e.target.value),
                  "data-ocid": "contracts.counterparty_input",
                  id: "contract-counterparty-input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  className: "text-sm font-medium text-foreground",
                  htmlFor: "contract-terms-textarea",
                  children: t("contract_terms")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  className: "w-full bg-background border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40 resize-none",
                  rows: 4,
                  placeholder: t("contract_terms"),
                  value: formTerms,
                  onChange: (e) => setFormTerms(e.target.value),
                  "data-ocid": "contracts.terms_textarea",
                  id: "contract-terms-textarea"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "label",
                {
                  className: "text-sm font-medium text-foreground",
                  htmlFor: "contract-amount-input",
                  children: [
                    t("contract_amount"),
                    " (TSh)"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  className: "w-full bg-background border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40",
                  type: "number",
                  placeholder: "0",
                  value: formAmount,
                  onChange: (e) => setFormAmount(e.target.value),
                  "data-ocid": "contracts.amount_input",
                  id: "contract-amount-input"
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    htmlFor: "contract-start-input",
                    className: "text-sm font-medium text-foreground",
                    children: [
                      t("eventDate"),
                      " (Start)"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "contract-start-input",
                    className: "w-full bg-background border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40",
                    type: "date",
                    value: formStart,
                    onChange: (e) => setFormStart(e.target.value),
                    "data-ocid": "contracts.start_date_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    htmlFor: "contract-end-input",
                    className: "text-sm font-medium text-foreground",
                    children: [
                      t("eventDate"),
                      " (End)"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "contract-end-input",
                    className: "w-full bg-background border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40",
                    type: "date",
                    value: formEnd,
                    onChange: (e) => setFormEnd(e.target.value),
                    "data-ocid": "contracts.end_date_input"
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-t flex gap-3 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "flex-1",
                onClick: () => setShowCreate(false),
                "data-ocid": "contracts.create_cancel_button",
                children: t("cancel")
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "flex-1",
                onClick: handleCreate,
                disabled: !formTitle.trim() || !formCounterparty.trim(),
                "data-ocid": "contracts.create_submit_button",
                children: t("create_contract")
              }
            )
          ] })
        ]
      }
    ) }),
    viewContract && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border rounded-2xl w-full max-w-md shadow-xl max-h-[90vh] flex flex-col",
        "data-ocid": "contracts.view_dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-foreground truncate max-w-[260px]", children: viewContract.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setViewContract(null),
                "data-ocid": "contracts.view_close_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20, className: "text-muted-foreground" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 space-y-4 overflow-y-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs bg-muted text-muted-foreground", children: TEMPLATE_LABELS[viewContract.templateType] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: `text-xs ${STATUS_STYLES[viewContract.status]}`,
                  children: t(
                    `contract_${viewContract.status}`
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: t("parties") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: viewContract.partiesNames.map((name) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-sm bg-muted px-2 py-1 rounded text-foreground",
                  children: name
                },
                name
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: t("contract_terms") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground bg-muted/40 rounded-lg p-3 leading-relaxed", children: viewContract.terms })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("contract_amount") }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-primary", children: [
                  "TSh ",
                  viewContract.amount.toLocaleString()
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("eventDate") }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground", children: [
                  viewContract.startDate,
                  " → ",
                  viewContract.endDate
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: t("contract_signed") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: viewContract.partiesNames.map((name, idx) => {
                const signed = idx === 0 ? viewContract.creatorSignedAt : viewContract.counterpartySignedAt;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center justify-between",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: name }),
                      signed ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-emerald-600", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 13 }),
                        " ",
                        signed
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 13 }),
                        " ",
                        t("pending")
                      ] })
                    ]
                  },
                  name
                );
              }) })
            ] }),
            viewContract.creatorSignedAt && viewContract.counterpartySignedAt && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-sm text-emerald-700 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 16 }),
              " ",
              t("both_signed")
            ] })
          ] }),
          !viewContract.creatorSignedAt && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-4 border-t shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "w-full",
              onClick: () => signContract(viewContract.id),
              "data-ocid": "contracts.sign_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FilePenLine, { size: 15, className: "mr-2" }),
                " ",
                t("sign_contract")
              ]
            }
          ) })
        ]
      }
    ) }),
    toast && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-foreground text-background px-4 py-2 rounded-full text-sm shadow-lg",
        "data-ocid": "contracts.toast",
        children: toast
      }
    )
  ] }) });
}
export {
  ContractsPage as default
};
