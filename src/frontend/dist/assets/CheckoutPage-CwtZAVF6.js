import { k as createLucideIcon, a as useLanguageStore, b as useNavigate, a6 as useSearch, r as reactExports, j as jsxRuntimeExports, L as Layout, Y as ShoppingCart, P as Package, z as formatTSh, I as Input, B as Button, ac as ChevronRight, ae as Phone, N as CircleCheck, m as Badge, f as Truck } from "./index-BUVIgngH.js";
import { A as ArrowLeft } from "./arrow-left-BIW276yu.js";
import { S as ShieldCheck } from "./shield-check-CYiHWttZ.js";
import { L as Lock } from "./lock-Vof0dJDf.js";
import { B as Banknote } from "./banknote-DXlkdxFO.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z", key: "1b4qmf" }],
  ["path", { d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2", key: "i71pzd" }],
  ["path", { d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2", key: "10jefs" }],
  ["path", { d: "M10 6h4", key: "1itunk" }],
  ["path", { d: "M10 10h4", key: "tcdvrf" }],
  ["path", { d: "M10 14h4", key: "kelpxr" }],
  ["path", { d: "M10 18h4", key: "1ulq68" }]
];
const Building2 = createLucideIcon("building-2", __iconNode);
const PAYMENT_OPTIONS = [
  {
    id: "mpesa",
    name: "M-Pesa",
    nameSw: "M-Pesa",
    description: "Pay via M-Pesa mobile money",
    descriptionSw: "Lipa kupitia pesa ya simu ya M-Pesa",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-6 h-6" }),
    accentClass: "text-emerald-600",
    borderClass: "border-emerald-400",
    bgClass: "bg-emerald-50"
  },
  {
    id: "tigo_pesa",
    name: "Tigo Pesa",
    nameSw: "Tigo Pesa",
    description: "Pay via Tigo Pesa mobile money",
    descriptionSw: "Lipa kupitia pesa ya simu ya Tigo",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-6 h-6" }),
    accentClass: "text-blue-500",
    borderClass: "border-blue-400",
    bgClass: "bg-blue-50"
  },
  {
    id: "airtel_money",
    name: "Airtel Money",
    nameSw: "Airtel Money",
    description: "Pay via Airtel Money mobile money",
    descriptionSw: "Lipa kupitia pesa ya simu ya Airtel",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-6 h-6" }),
    accentClass: "text-red-500",
    borderClass: "border-red-400",
    bgClass: "bg-red-50"
  },
  {
    id: "crdb",
    name: "CRDB Bank",
    nameSw: "Benki ya CRDB",
    description: "Pay via CRDB Bank transfer",
    descriptionSw: "Lipa kupitia uhamisho wa Benki ya CRDB",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-6 h-6" }),
    accentClass: "text-blue-600",
    borderClass: "border-blue-400",
    bgClass: "bg-blue-50"
  },
  {
    id: "nmb",
    name: "NMB Bank",
    nameSw: "Benki ya NMB",
    description: "Pay via NMB Bank transfer",
    descriptionSw: "Lipa kupitia uhamisho wa Benki ya NMB",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-6 h-6" }),
    accentClass: "text-orange-500",
    borderClass: "border-orange-400",
    bgClass: "bg-orange-50"
  },
  {
    id: "cash",
    name: "Cash on Delivery",
    nameSw: "Pesa Taslimu kwa Utoaji",
    description: "Pay cash when goods arrive",
    descriptionSw: "Lipa pesa taslimu wakati bidhaa zikifika",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Banknote, { className: "w-6 h-6" }),
    accentClass: "text-muted-foreground",
    borderClass: "border-border",
    bgClass: "bg-muted/30"
  }
];
function StepIndicator({ step, current }) {
  const done = current > step;
  const active = current === step;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-smooth ${done ? "bg-primary text-primary-foreground" : active ? "bg-primary text-primary-foreground ring-4 ring-primary/20" : "bg-muted text-muted-foreground"}`,
      children: done ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }) : step
    }
  ) });
}
function CheckoutPage() {
  const { t, language } = useLanguageStore();
  const navigate = useNavigate();
  const search = useSearch({ from: "/auth/checkout" });
  const listingTitle = search.listingTitle ?? "NPK Fertilizer 50kg";
  search.sellerId ?? "u5";
  const sellerName = search.sellerName ?? "Ally Agro Supplies";
  const pricePerUnit = search.price ?? 95e3;
  const unit = search.unit ?? "bag";
  const [step, setStep] = reactExports.useState(1);
  const [quantity, setQuantity] = reactExports.useState(1);
  const [selectedPayment, setSelectedPayment] = reactExports.useState(
    null
  );
  const [mobilePhone, setMobilePhone] = reactExports.useState("");
  const [bankRef, setBankRef] = reactExports.useState("");
  const [isProcessing, setIsProcessing] = reactExports.useState(false);
  const [orderRef] = reactExports.useState(`ORD-${Date.now()}`);
  const [escrowEnabled, setEscrowEnabled] = reactExports.useState(false);
  const [deliveryConfirmed, setDeliveryConfirmed] = reactExports.useState(false);
  const isMobileMoney = (method) => method === "mpesa" || method === "tigo_pesa" || method === "airtel_money";
  const subtotal = pricePerUnit * quantity;
  const lang = language;
  const handleProceedToPayment = () => {
    if (quantity < 1) return;
    setStep(2);
  };
  const handleConfirmPayment = async () => {
    if (!selectedPayment) return;
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsProcessing(false);
    setStep(3);
  };
  const selectedOption = PAYMENT_OPTIONS.find((p) => p.id === selectedPayment);
  const stepLabels = [
    { en: "Summary", sw: "Muhtasari" },
    { en: "Payment", sw: "Malipo" },
    { en: "Confirm", sw: "Thibitisha" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "checkout.page",
      className: "px-4 py-4 pb-10 max-w-lg mx-auto space-y-5",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "checkout.back_button",
              onClick: () => step === 1 ? navigate({ to: "/marketplace" }) : setStep((s) => s - 1),
              className: "w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary/40 transition-smooth",
              "aria-label": "Go back",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 text-foreground" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-lg font-bold text-foreground", children: t("checkout") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              t("step"),
              " ",
              step,
              " ",
              t("of"),
              " 3 —",
              " ",
              lang === "sw" ? stepLabels[step - 1].sw : stepLabels[step - 1].en
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0 bg-card border border-border rounded-xl px-5 py-3", children: [1, 2, 3].map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(StepIndicator, { step: s, current: step }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground font-medium", children: lang === "sw" ? stepLabels[i].sw : stepLabels[i].en })
          ] }),
          i < 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `flex-1 h-0.5 mx-1 mb-4 transition-smooth ${step > s ? "bg-primary" : "bg-border"}`
            }
          )
        ] }, s)) }),
        step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "checkout.step1", className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/8 px-4 py-3 border-b border-border flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-4 h-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-sm text-foreground", children: t("orderSummary") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-start", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-6 h-6 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground leading-tight", children: listingTitle }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                    t("seller"),
                    ": ",
                    sellerName
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-primary mt-1", children: [
                    formatTSh(pricePerUnit),
                    "/",
                    unit
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    htmlFor: "checkout-quantity",
                    className: "text-xs font-semibold text-muted-foreground block mb-1.5",
                    children: [
                      t("quantity"),
                      " (",
                      unit,
                      "s)"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "data-ocid": "checkout.quantity_decrease",
                      onClick: () => setQuantity((q) => Math.max(1, q - 1)),
                      className: "w-9 h-9 rounded-lg bg-muted border border-border flex items-center justify-center text-lg font-bold hover:border-primary/40 transition-smooth disabled:opacity-40",
                      disabled: quantity <= 1,
                      "aria-label": "Decrease quantity",
                      children: "−"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "checkout-quantity",
                      "data-ocid": "checkout.quantity_input",
                      type: "number",
                      min: 1,
                      max: 9999,
                      value: quantity,
                      onChange: (e) => setQuantity(
                        Math.max(1, Number.parseInt(e.target.value) || 1)
                      ),
                      className: "w-20 text-center font-semibold"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "data-ocid": "checkout.quantity_increase",
                      onClick: () => setQuantity((q) => q + 1),
                      className: "w-9 h-9 rounded-lg bg-muted border border-border flex items-center justify-center text-lg font-bold hover:border-primary/40 transition-smooth",
                      "aria-label": "Increase quantity",
                      children: "+"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3 space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: t("unitPrice") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: formatTSh(pricePerUnit) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: t("quantity") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
                    "× ",
                    quantity
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-2 flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: t("subtotal") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-primary text-base", children: formatTSh(subtotal) })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              "data-ocid": "checkout.proceed_to_payment_button",
              className: "w-full",
              size: "lg",
              onClick: handleProceedToPayment,
              children: [
                t("proceedToPayment"),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 ml-2" })
              ]
            }
          )
        ] }),
        step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "checkout.step2", className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/8 border border-primary/20 rounded-xl px-4 py-3 flex justify-between items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-foreground font-medium", children: [
              listingTitle,
              " × ",
              quantity
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-primary", children: formatTSh(subtotal) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-sm text-foreground", children: t("paymentMethod") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "checkout.payment_options", children: PAYMENT_OPTIONS.map((opt) => {
            const isSelected = selectedPayment === opt.id;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": `checkout.payment_option.${opt.id}`,
                onClick: () => setSelectedPayment(opt.id),
                className: `w-full text-left p-4 rounded-xl border-2 transition-smooth flex items-start gap-4 ${isSelected ? `${opt.borderClass} ${opt.bgClass}` : "border-border bg-card hover:border-primary/30"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${isSelected ? opt.bgClass : "bg-muted/50"} ${opt.accentClass}`,
                      children: opt.icon
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: lang === "sw" ? opt.nameSw : opt.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 leading-relaxed", children: lang === "sw" ? opt.descriptionSw : opt.description })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `w-5 h-5 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center transition-smooth ${isSelected ? `${opt.borderClass} ${opt.accentClass}` : "border-muted-foreground"}`,
                      children: isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-current" })
                    }
                  )
                ]
              },
              opt.id
            );
          }) }),
          isMobileMoney(selectedPayment) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "checkout.mobile_money_details",
              className: `border rounded-xl p-4 space-y-3 ${selectedPayment === "mpesa" ? "bg-emerald-50 border-emerald-200" : selectedPayment === "tigo_pesa" ? "bg-blue-50 border-blue-200" : "bg-red-50 border-red-200"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: `text-sm font-medium flex gap-2 ${selectedPayment === "mpesa" ? "text-emerald-800" : selectedPayment === "tigo_pesa" ? "text-blue-800" : "text-red-800"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 shrink-0 mt-0.5" }),
                      lang === "sw" ? `Weka nambari ya simu yako ya ${selectedPayment === "mpesa" ? "M-Pesa" : selectedPayment === "tigo_pesa" ? "Tigo Pesa" : "Airtel Money"} kupokea ombi la malipo` : `Enter your ${selectedPayment === "mpesa" ? "M-Pesa" : selectedPayment === "tigo_pesa" ? "Tigo Pesa" : "Airtel Money"} number to receive a payment prompt`
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "mobile-phone",
                      className: `text-xs font-semibold block mb-1.5 ${selectedPayment === "mpesa" ? "text-emerald-700" : selectedPayment === "tigo_pesa" ? "text-blue-700" : "text-red-700"}`,
                      children: t("phoneNumber")
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "mobile-phone",
                      "data-ocid": "checkout.mobile_phone_input",
                      type: "tel",
                      placeholder: "+255 7XX XXX XXX",
                      value: mobilePhone,
                      onChange: (e) => setMobilePhone(e.target.value),
                      className: "bg-card"
                    }
                  )
                ] })
              ]
            }
          ),
          (selectedPayment === "crdb" || selectedPayment === "nmb") && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "checkout.bank_details",
              className: `border rounded-xl p-4 space-y-3 ${selectedPayment === "crdb" ? "bg-blue-50 border-blue-200" : "bg-orange-50 border-orange-200"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: `text-sm font-medium flex gap-2 ${selectedPayment === "crdb" ? "text-blue-800" : "text-orange-800"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-4 h-4 shrink-0 mt-0.5" }),
                      t("bankInstruction")
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "bank-ref",
                      className: `text-xs font-semibold block mb-1.5 ${selectedPayment === "crdb" ? "text-blue-700" : "text-orange-700"}`,
                      children: t("bankReference")
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "bank-ref",
                      "data-ocid": "checkout.bank_reference_input",
                      type: "text",
                      placeholder: "e.g. TXN2024050600123",
                      value: bankRef,
                      onChange: (e) => setBankRef(e.target.value),
                      className: "bg-card"
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": "checkout.escrow_toggle",
              "aria-pressed": escrowEnabled,
              className: `w-full text-left border-2 rounded-xl p-4 transition-smooth ${escrowEnabled ? "border-primary/40 bg-primary/5" : "border-border bg-card hover:border-primary/30"}`,
              onClick: () => setEscrowEnabled((v) => !v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-smooth ${escrowEnabled ? "bg-primary/15 text-primary" : "bg-muted/50 text-muted-foreground"}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-6 h-6" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: lang === "sw" ? "Malipo Salama ya Amana" : "Secure Escrow Payment" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: `w-11 h-6 rounded-full transition-smooth relative shrink-0 ${escrowEnabled ? "bg-primary" : "bg-muted"}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: `absolute top-1 w-4 h-4 rounded-full bg-card shadow-sm transition-smooth ${escrowEnabled ? "left-6" : "left-1"}`
                            }
                          )
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 leading-relaxed", children: lang === "sw" ? "Fedha zitashikiliwa salama na kutolewa kwa muuzaji tu baada ya kuthibitisha uwasilishaji, au kiotomatiki baada ya siku 7." : "Funds are held securely and released to the seller only after you confirm delivery, or automatically after 7 days." })
                  ] })
                ] }),
                escrowEnabled && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-2 bg-primary/8 rounded-lg px-3 py-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3.5 h-3.5 text-primary shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary font-medium", children: lang === "sw" ? "Umewezesha usalama wa amana — fedha zitashikiliwa hadi uthibitisho wa utoaji." : "Escrow protection enabled — funds held until delivery confirmation." })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              "data-ocid": "checkout.confirm_payment_button",
              className: "w-full",
              size: "lg",
              disabled: !selectedPayment || isProcessing,
              onClick: handleConfirmPayment,
              children: isProcessing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" }),
                lang === "sw" ? "Inashughulikia..." : "Processing..."
              ] }) : t("confirmPayment")
            }
          )
        ] }),
        step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "checkout.step3", className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `border rounded-xl p-5 text-center ${escrowEnabled ? "bg-amber-50 border-amber-200" : "bg-primary/10 border-primary/20"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${escrowEnabled ? "bg-amber-100" : "bg-primary/15"}`,
                    children: escrowEnabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-9 h-9 text-amber-600" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-9 h-9 text-primary" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: escrowEnabled ? lang === "sw" ? "Malipo Yameshikiliwa Salama" : "Payment Held Securely" : t("orderConfirmation") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: escrowEnabled ? lang === "sw" ? "Agizo lako limetumwa. Fedha zitashikiliwa hadi uthibitisho." : "Your order is placed. Funds are held until delivery confirmation." : t("orderPlacedSuccess") })
              ]
            }
          ),
          escrowEnabled && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "checkout.escrow_notice",
              className: "bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-start", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-5 h-5 text-amber-600 shrink-0 mt-0.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-amber-800", children: lang === "sw" ? "Malipo yako yameshikiliwa salama." : "Your payment is held securely." }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-700 mt-1 leading-relaxed", children: lang === "sw" ? "Toa idhini ya kutolewa kwa fedha ukisha kupokea bidhaa, au fedha zitatoka kiotomatiki baada ya siku 7." : "Release it once you confirm delivery. Funds auto-release to seller after 7 days if no action is taken." })
                  ] })
                ] }),
                !deliveryConfirmed ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    "data-ocid": "checkout.confirm_delivery_button",
                    className: "w-full bg-amber-600 hover:bg-amber-700 text-white",
                    size: "sm",
                    onClick: () => setDeliveryConfirmed(true),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 mr-2" }),
                      lang === "sw" ? "Thibitisha Utoaji wa Bidhaa" : "Confirm Delivery & Release Funds"
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-emerald-600" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-emerald-700 font-medium", children: lang === "sw" ? "Utoaji umethibitishwa! Fedha zimetolewa." : "Delivery confirmed! Funds released to seller." })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 px-4 py-2.5 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: lang === "sw" ? "Maelezo ya Agizo" : "Order Details" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: t("orderReference") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "font-mono text-xs", children: orderRef })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: t("paymentMethodUsed") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: selectedOption ? lang === "sw" ? selectedOption.nameSw : selectedOption.name : "—" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: t("amountPaid") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-primary", children: formatTSh(subtotal) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: t("seller") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground truncate max-w-[160px]", children: sellerName })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-3 flex gap-2 items-start", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-4 h-4 text-primary shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: t("estimatedDelivery") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: lang === "sw" ? "Siku 3-5 za kazi baada ya uthibitisho wa malipo" : "3-5 business days after payment confirmation" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                "data-ocid": "checkout.track_order_button",
                className: "flex-1",
                size: "lg",
                onClick: () => navigate({ to: "/my-orders" }),
                children: t("trackOrder")
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                "data-ocid": "checkout.continue_shopping_button",
                variant: "outline",
                className: "flex-1",
                size: "lg",
                onClick: () => navigate({ to: "/marketplace" }),
                children: lang === "sw" ? "Endelea Kununua" : "Keep Shopping"
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
export {
  CheckoutPage as default
};
