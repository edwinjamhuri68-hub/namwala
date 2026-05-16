import { k as createLucideIcon, a as useLanguageStore, r as reactExports, j as jsxRuntimeExports, L as Layout, B as Button, T as TrendingUp, m as Badge, aj as MessageSquare, X } from "./index-BUVIgngH.js";
import { P as Plus } from "./plus-DMsGFanj.js";
import { R as RefreshCw } from "./refresh-cw-BNbremAW.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M10 18v-7", key: "wt116b" }],
  [
    "path",
    {
      d: "M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z",
      key: "1m329m"
    }
  ],
  ["path", { d: "M14 18v-7", key: "vav6t3" }],
  ["path", { d: "M18 18v-7", key: "aexdmj" }],
  ["path", { d: "M3 22h18", key: "8prr45" }],
  ["path", { d: "M6 18v-7", key: "1ivflk" }]
];
const Landmark = createLucideIcon("landmark", __iconNode);
const STATUS_COLOR = {
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
  rejected: "bg-red-100 text-red-700 border-red-200",
  disbursed: "bg-blue-100 text-blue-700 border-blue-200"
};
const LOAN_PURPOSES = [
  "crop_inputs",
  "equipment",
  "livestock",
  "land",
  "other"
];
const LOAN_PURPOSES_EN = {
  crop_inputs: "Crop Inputs (Seeds, Fertilizer, Pesticides)",
  equipment: "Farm Equipment & Machinery",
  livestock: "Livestock Purchase",
  land: "Land Acquisition or Lease",
  other: "Other Agricultural Use"
};
const LOAN_PURPOSES_SW = {
  crop_inputs: "Pembejeo (Mbegu, Mbolea, Dawa za Wadudu)",
  equipment: "Vifaa vya Shamba",
  livestock: "Kununua Mifugo",
  land: "Kupata au Kupanga Ardhi",
  other: "Matumizi Mengine ya Kilimo"
};
const DURATIONS = [6, 12, 18, 24, 36];
const INITIAL_LOANS = [
  {
    id: "l1",
    applicantId: "u1",
    amount: 5e5,
    purpose: "Purchase hybrid maize seeds and NPK fertilizer for the upcoming planting season.",
    durationMonths: 6,
    repaymentTerms: "Monthly equal installments of TSh 83,333",
    activitySummary: {
      totalRecords: 12,
      totalSalesRevenue: 12e5,
      totalExpenses: 38e4,
      netProfit: 82e4,
      averageMonthlyRevenue: 1e5,
      topActivities: ["Maize farming", "Bean farming"]
    },
    status: "approved",
    lenderNotes: "Good track record. Approved at 8% annual interest.",
    createdAt: "2026-03-01",
    updatedAt: "2026-03-10"
  },
  {
    id: "l2",
    applicantId: "u1",
    amount: 12e5,
    purpose: "Purchase a garden tractor and plowing attachments to improve farm efficiency.",
    durationMonths: 24,
    repaymentTerms: "Monthly installments of TSh 50,000 at 9% annual rate",
    activitySummary: {
      totalRecords: 18,
      totalSalesRevenue: 21e5,
      totalExpenses: 68e4,
      netProfit: 142e4,
      averageMonthlyRevenue: 175e3,
      topActivities: ["Maize farming", "Sunflower", "Cattle"]
    },
    status: "pending",
    createdAt: "2026-05-01",
    updatedAt: "2026-05-01"
  }
];
const ACTIVITY_MOCK = {
  totalSales: 21e5,
  totalExpenses: 68e4,
  transactions: 34,
  records: 18
};
function emptyLoanForm() {
  return {
    amount: "",
    purpose: "crop_inputs",
    durationMonths: 12,
    repaymentTerms: ""
  };
}
function LoanModal({ open, summary, onClose, onSubmit }) {
  const { t, language } = useLanguageStore();
  const [form, setForm] = reactExports.useState(emptyLoanForm());
  const firstRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (open) {
      setForm(emptyLoanForm());
      setTimeout(() => {
        var _a;
        return (_a = firstRef.current) == null ? void 0 : _a.focus();
      }, 50);
    }
  }, [open]);
  if (!open) return null;
  const lbl = (en, sw) => language === "sw" ? sw : en;
  const purposeLabels = language === "sw" ? LOAN_PURPOSES_SW : LOAN_PURPOSES_EN;
  const monthlyPayment = form.amount && form.durationMonths ? Math.round(Number(form.amount) / form.durationMonths) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 px-0 sm:px-4",
      onClick: (e) => {
        if (e.target === e.currentTarget) onClose();
      },
      onKeyDown: (e) => {
        if (e.key === "Escape") onClose();
      },
      "aria-modal": "true",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-elevated max-h-[90vh] overflow-y-auto",
          "data-ocid": "loans.dialog",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 pt-5 pb-3 border-b sticky top-0 bg-card z-10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-foreground text-base", children: t("apply_for_loan") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "p-1.5 rounded-full hover:bg-muted transition-colors",
                  "data-ocid": "loans.dialog.close_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18 })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "form",
              {
                onSubmit: (e) => {
                  e.preventDefault();
                  onSubmit(form);
                },
                className: "p-5 space-y-4",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 border border-primary/20 rounded-xl p-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-primary mb-2", children: t("activity_summary") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: [
                      {
                        label: t("total_sales"),
                        val: `TSh ${summary.totalSales.toLocaleString()}`
                      },
                      {
                        label: t("total_expenses"),
                        val: `TSh ${summary.totalExpenses.toLocaleString()}`
                      },
                      {
                        label: lbl("Transactions", "Miamala"),
                        val: String(summary.transactions)
                      },
                      { label: t("my_records"), val: String(summary.records) }
                    ].map(({ label, val }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "bg-background rounded-lg px-2 py-1.5 text-center",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: label }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-foreground", children: val })
                        ]
                      },
                      label
                    )) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        className: "text-sm font-medium text-foreground",
                        htmlFor: "loan-amount",
                        children: t("loan_amount")
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        ref: firstRef,
                        required: true,
                        type: "number",
                        min: "10000",
                        placeholder: "500000",
                        className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                        value: form.amount,
                        onChange: (e) => setForm((f) => ({ ...f, amount: e.target.value })),
                        "data-ocid": "loans.amount.input",
                        id: "loan-amount"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        className: "text-sm font-medium text-foreground",
                        htmlFor: "loan-purpose",
                        children: t("loan_purpose")
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "select",
                      {
                        className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                        value: form.purpose,
                        onChange: (e) => setForm((f) => ({
                          ...f,
                          purpose: e.target.value
                        })),
                        "data-ocid": "loans.purpose.select",
                        id: "loan-purpose",
                        children: LOAN_PURPOSES.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p, children: purposeLabels[p] }, p))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        className: "text-sm font-medium text-foreground",
                        htmlFor: "loan-duration-group",
                        children: t("loan_duration")
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: DURATIONS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => setForm((f) => ({ ...f, durationMonths: d })),
                        className: `px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${form.durationMonths === d ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent/50"}`,
                        "data-ocid": `loans.duration.${d}`,
                        children: [
                          d,
                          " ",
                          lbl("mo", "miezi")
                        ]
                      },
                      d
                    )) })
                  ] }),
                  monthlyPayment > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-accent/10 border border-accent/20 rounded-xl p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-accent", children: [
                    lbl(
                      "Estimated monthly repayment",
                      "Malipo ya kila mwezi yanayokadiriwa"
                    ),
                    ":",
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold ml-1", children: [
                      "TSh ",
                      monthlyPayment.toLocaleString()
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        className: "text-sm font-medium text-foreground",
                        htmlFor: "loan-terms",
                        children: t("repayment_terms")
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "textarea",
                      {
                        rows: 2,
                        placeholder: lbl(
                          "Describe your proposed repayment plan...",
                          "Elezea mpango wako wa ulipaji..."
                        ),
                        className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none",
                        value: form.repaymentTerms,
                        onChange: (e) => setForm((f) => ({ ...f, repaymentTerms: e.target.value })),
                        "data-ocid": "loans.terms.textarea",
                        id: "loan-terms"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "outline",
                        className: "flex-1",
                        onClick: onClose,
                        "data-ocid": "loans.dialog.cancel_button",
                        children: t("cancel")
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "submit",
                        className: "flex-1",
                        "data-ocid": "loans.dialog.submit_button",
                        children: t("submit_loan")
                      }
                    )
                  ] })
                ]
              }
            )
          ]
        }
      )
    }
  );
}
function LoansPage() {
  const { t, language } = useLanguageStore();
  const [loans, setLoans] = reactExports.useState(INITIAL_LOANS);
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [summary, setSummary] = reactExports.useState(ACTIVITY_MOCK);
  const [refreshing, setRefreshing] = reactExports.useState(false);
  const lbl = (en, sw) => language === "sw" ? sw : en;
  function handleRefreshSummary() {
    setRefreshing(true);
    setTimeout(() => {
      setSummary({
        totalSales: summary.totalSales + Math.floor(Math.random() * 5e4),
        totalExpenses: summary.totalExpenses + Math.floor(Math.random() * 1e4),
        transactions: summary.transactions + 1,
        records: summary.records + 1
      });
      setRefreshing(false);
    }, 1e3);
  }
  function handleSubmitLoan(data) {
    const purposeLabels = language === "sw" ? LOAN_PURPOSES_SW : LOAN_PURPOSES_EN;
    const newLoan = {
      id: `l${Date.now()}`,
      applicantId: "u1",
      amount: Number(data.amount),
      purpose: purposeLabels[data.purpose],
      durationMonths: data.durationMonths,
      repaymentTerms: data.repaymentTerms || lbl(
        `Monthly installments over ${data.durationMonths} months`,
        `Malipo ya kila mwezi kwa miezi ${data.durationMonths}`
      ),
      activitySummary: {
        totalRecords: summary.records,
        totalSalesRevenue: summary.totalSales,
        totalExpenses: summary.totalExpenses,
        netProfit: summary.totalSales - summary.totalExpenses,
        averageMonthlyRevenue: Math.round(summary.totalSales / 12),
        topActivities: [
          lbl("Maize farming", "Kulima Mahindi"),
          lbl("Livestock", "Mifugo")
        ]
      },
      status: "pending",
      createdAt: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
    };
    setLoans((prev) => [newLoan, ...prev]);
    setModalOpen(false);
  }
  const netProfit = summary.totalSales - summary.totalExpenses;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "loans.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b px-4 py-4 sticky top-0 z-10 shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Landmark, { className: "text-primary", size: 22 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold text-foreground", children: t("my_loans") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          onClick: () => setModalOpen(true),
          "data-ocid": "loans.apply_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16, className: "mr-1" }),
            " ",
            t("apply_for_loan")
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-4 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 border border-primary/20 rounded-xl p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 18, className: "text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: t("activity_summary") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: handleRefreshSummary,
              disabled: refreshing,
              className: "flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors disabled:opacity-50",
              "data-ocid": "loans.refresh_summary.button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  RefreshCw,
                  {
                    size: 14,
                    className: refreshing ? "animate-spin" : ""
                  }
                ),
                lbl("Refresh", "Sasisha")
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: [
          {
            label: t("total_sales"),
            value: `TSh ${summary.totalSales.toLocaleString()}`,
            color: "text-accent"
          },
          {
            label: t("total_expenses"),
            value: `TSh ${summary.totalExpenses.toLocaleString()}`,
            color: "text-destructive"
          },
          {
            label: t("net_profit"),
            value: `TSh ${netProfit.toLocaleString()}`,
            color: netProfit > 0 ? "text-accent" : "text-destructive"
          },
          {
            label: t("my_records"),
            value: `${summary.records} ${lbl("records", "rekodi")}`,
            color: "text-foreground"
          }
        ].map(({ label, value, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card rounded-lg p-2.5 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-sm font-bold ${color}`, children: value })
            ]
          },
          label
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-3", children: lbl(
          "This summary will be automatically included in your loan application to help lenders assess your eligibility.",
          "Muhtasari huu utajumuishwa moja kwa moja kwenye ombi lako la mkopo kusaidia wakopeshaji kutathmini ustahili wako."
        ) })
      ] }),
      loans.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-16 space-y-3",
          "data-ocid": "loans.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Landmark,
              {
                className: "mx-auto text-muted-foreground/40",
                size: 48
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: t("no_loans") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: () => setModalOpen(true),
                "data-ocid": "loans.empty_apply_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16, className: "mr-1" }),
                  " ",
                  t("apply_for_loan")
                ]
              }
            )
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: t("my_loans") }),
        loans.map((loan, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card rounded-xl border p-4 space-y-3 slide-up",
            "data-ocid": `loans.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold text-foreground", children: [
                    "TSh ",
                    loan.amount.toLocaleString()
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                    loan.durationMonths,
                    " ",
                    lbl("months", "miezi"),
                    " ·",
                    " ",
                    loan.createdAt
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: `text-xs border ${STATUS_COLOR[loan.status]}`,
                    children: t(`loan_${loan.status}`)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: loan.purpose }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground", children: t("repayment_terms") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: loan.repaymentTerms })
              ] }),
              loan.lenderNotes && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `rounded-lg p-2.5 ${loan.status === "approved" ? "bg-emerald-50 border border-emerald-100" : loan.status === "rejected" ? "bg-red-50 border border-red-100" : "bg-muted/50"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium", children: t("lender_notes") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: loan.lenderNotes })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  className: "flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors",
                  "data-ocid": `loans.contact_button.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { size: 14 }),
                    lbl("Contact Lender", "Wasiliana na Mkopeshaji")
                  ]
                }
              )
            ]
          },
          loan.id
        ))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      LoanModal,
      {
        open: modalOpen,
        summary,
        onClose: () => setModalOpen(false),
        onSubmit: handleSubmitLoan
      }
    )
  ] }) });
}
export {
  LoansPage as default
};
