import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatTSh } from "@/lib/mockData";
import { useLanguageStore } from "@/store/languageStore";
import type { PaymentMethod } from "@/types";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  ArrowLeft,
  Banknote,
  Building2,
  CheckCircle2,
  ChevronRight,
  Lock,
  Package,
  Phone,
  ShieldCheck,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { useState } from "react";

type CheckoutStep = 1 | 2 | 3;

interface PaymentOption {
  id: PaymentMethod;
  name: string;
  nameSw: string;
  description: string;
  descriptionSw: string;
  icon: React.ReactNode;
  accentClass: string;
  borderClass: string;
  bgClass: string;
}

const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    id: "mpesa",
    name: "M-Pesa",
    nameSw: "M-Pesa",
    description: "Pay via M-Pesa mobile money",
    descriptionSw: "Lipa kupitia pesa ya simu ya M-Pesa",
    icon: <Phone className="w-6 h-6" />,
    accentClass: "text-emerald-600",
    borderClass: "border-emerald-400",
    bgClass: "bg-emerald-50",
  },
  {
    id: "tigo_pesa",
    name: "Tigo Pesa",
    nameSw: "Tigo Pesa",
    description: "Pay via Tigo Pesa mobile money",
    descriptionSw: "Lipa kupitia pesa ya simu ya Tigo",
    icon: <Phone className="w-6 h-6" />,
    accentClass: "text-blue-500",
    borderClass: "border-blue-400",
    bgClass: "bg-blue-50",
  },
  {
    id: "airtel_money",
    name: "Airtel Money",
    nameSw: "Airtel Money",
    description: "Pay via Airtel Money mobile money",
    descriptionSw: "Lipa kupitia pesa ya simu ya Airtel",
    icon: <Phone className="w-6 h-6" />,
    accentClass: "text-red-500",
    borderClass: "border-red-400",
    bgClass: "bg-red-50",
  },
  {
    id: "crdb",
    name: "CRDB Bank",
    nameSw: "Benki ya CRDB",
    description: "Pay via CRDB Bank transfer",
    descriptionSw: "Lipa kupitia uhamisho wa Benki ya CRDB",
    icon: <Building2 className="w-6 h-6" />,
    accentClass: "text-blue-600",
    borderClass: "border-blue-400",
    bgClass: "bg-blue-50",
  },
  {
    id: "nmb",
    name: "NMB Bank",
    nameSw: "Benki ya NMB",
    description: "Pay via NMB Bank transfer",
    descriptionSw: "Lipa kupitia uhamisho wa Benki ya NMB",
    icon: <Building2 className="w-6 h-6" />,
    accentClass: "text-orange-500",
    borderClass: "border-orange-400",
    bgClass: "bg-orange-50",
  },
  {
    id: "cash",
    name: "Cash on Delivery",
    nameSw: "Pesa Taslimu kwa Utoaji",
    description: "Pay cash when goods arrive",
    descriptionSw: "Lipa pesa taslimu wakati bidhaa zikifika",
    icon: <Banknote className="w-6 h-6" />,
    accentClass: "text-muted-foreground",
    borderClass: "border-border",
    bgClass: "bg-muted/30",
  },
];

function StepIndicator({ step, current }: { step: number; current: number }) {
  const done = current > step;
  const active = current === step;
  return (
    <div className="flex items-center">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-smooth ${
          done
            ? "bg-primary text-primary-foreground"
            : active
              ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
              : "bg-muted text-muted-foreground"
        }`}
      >
        {done ? <CheckCircle2 className="w-4 h-4" /> : step}
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const { t, language } = useLanguageStore();
  const navigate = useNavigate();
  const search = useSearch({ from: "/auth/checkout" as never }) as {
    listingTitle?: string;
    sellerId?: string;
    sellerName?: string;
    price?: number;
    unit?: string;
  };

  const listingTitle = search.listingTitle ?? "NPK Fertilizer 50kg";
  const _sellerId = search.sellerId ?? "u5";
  const sellerName = search.sellerName ?? "Ally Agro Supplies";
  const pricePerUnit = search.price ?? 95000;
  const unit = search.unit ?? "bag";

  const [step, setStep] = useState<CheckoutStep>(1);
  const [quantity, setQuantity] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(
    null,
  );
  const [mobilePhone, setMobilePhone] = useState("");
  const [bankRef, setBankRef] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderRef] = useState(`ORD-${Date.now()}`);
  const [escrowEnabled, setEscrowEnabled] = useState(false);
  const [deliveryConfirmed, setDeliveryConfirmed] = useState(false);

  const isMobileMoney = (method: PaymentMethod | null): boolean =>
    method === "mpesa" || method === "tigo_pesa" || method === "airtel_money";

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
    { en: "Confirm", sw: "Thibitisha" },
  ];

  return (
    <Layout>
      <div
        data-ocid="checkout.page"
        className="px-4 py-4 pb-10 max-w-lg mx-auto space-y-5"
      >
        {/* Back + title */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            data-ocid="checkout.back_button"
            onClick={() =>
              step === 1
                ? navigate({ to: "/marketplace" })
                : setStep((s) => (s - 1) as CheckoutStep)
            }
            className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary/40 transition-smooth"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <div>
            <h1 className="font-display text-lg font-bold text-foreground">
              {t("checkout")}
            </h1>
            <p className="text-xs text-muted-foreground">
              {t("step")} {step} {t("of")} 3 —{" "}
              {lang === "sw"
                ? stepLabels[step - 1].sw
                : stepLabels[step - 1].en}
            </p>
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-0 bg-card border border-border rounded-xl px-5 py-3">
          {[1, 2, 3].map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1">
                <StepIndicator step={s} current={step} />
                <span className="text-[10px] text-muted-foreground font-medium">
                  {lang === "sw" ? stepLabels[i].sw : stepLabels[i].en}
                </span>
              </div>
              {i < 2 && (
                <div
                  className={`flex-1 h-0.5 mx-1 mb-4 transition-smooth ${
                    step > s ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* ── STEP 1: Order Summary ───────────────────────────────────────── */}
        {step === 1 && (
          <div data-ocid="checkout.step1" className="space-y-4">
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="bg-primary/8 px-4 py-3 border-b border-border flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-primary" />
                <h2 className="font-semibold text-sm text-foreground">
                  {t("orderSummary")}
                </h2>
              </div>
              <div className="p-4 space-y-4">
                {/* Item info */}
                <div className="flex gap-3 items-start">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Package className="w-6 h-6 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm text-foreground leading-tight">
                      {listingTitle}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {t("seller")}: {sellerName}
                    </p>
                    <p className="text-sm font-bold text-primary mt-1">
                      {formatTSh(pricePerUnit)}/{unit}
                    </p>
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label
                    htmlFor="checkout-quantity"
                    className="text-xs font-semibold text-muted-foreground block mb-1.5"
                  >
                    {t("quantity")} ({unit}s)
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      data-ocid="checkout.quantity_decrease"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-9 h-9 rounded-lg bg-muted border border-border flex items-center justify-center text-lg font-bold hover:border-primary/40 transition-smooth disabled:opacity-40"
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <Input
                      id="checkout-quantity"
                      data-ocid="checkout.quantity_input"
                      type="number"
                      min={1}
                      max={9999}
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(
                          Math.max(1, Number.parseInt(e.target.value) || 1),
                        )
                      }
                      className="w-20 text-center font-semibold"
                    />
                    <button
                      type="button"
                      data-ocid="checkout.quantity_increase"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-9 h-9 rounded-lg bg-muted border border-border flex items-center justify-center text-lg font-bold hover:border-primary/40 transition-smooth"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Price breakdown */}
                <div className="bg-muted/30 rounded-lg p-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {t("unitPrice")}
                    </span>
                    <span className="font-medium text-foreground">
                      {formatTSh(pricePerUnit)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {t("quantity")}
                    </span>
                    <span className="font-medium text-foreground">
                      × {quantity}
                    </span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between">
                    <span className="font-semibold text-foreground">
                      {t("subtotal")}
                    </span>
                    <span className="font-bold text-primary text-base">
                      {formatTSh(subtotal)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Button
              data-ocid="checkout.proceed_to_payment_button"
              className="w-full"
              size="lg"
              onClick={handleProceedToPayment}
            >
              {t("proceedToPayment")}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {/* ── STEP 2: Payment Method ──────────────────────────────────────── */}
        {step === 2 && (
          <div data-ocid="checkout.step2" className="space-y-4">
            {/* Order total reminder */}
            <div className="bg-primary/8 border border-primary/20 rounded-xl px-4 py-3 flex justify-between items-center">
              <span className="text-sm text-foreground font-medium">
                {listingTitle} × {quantity}
              </span>
              <span className="font-bold text-primary">
                {formatTSh(subtotal)}
              </span>
            </div>

            <h2 className="font-semibold text-sm text-foreground">
              {t("paymentMethod")}
            </h2>

            {/* Payment option cards */}
            <div className="space-y-3" data-ocid="checkout.payment_options">
              {PAYMENT_OPTIONS.map((opt) => {
                const isSelected = selectedPayment === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    data-ocid={`checkout.payment_option.${opt.id}`}
                    onClick={() => setSelectedPayment(opt.id)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-smooth flex items-start gap-4 ${
                      isSelected
                        ? `${opt.borderClass} ${opt.bgClass}`
                        : "border-border bg-card hover:border-primary/30"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? opt.bgClass : "bg-muted/50"
                      } ${opt.accentClass}`}
                    >
                      {opt.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground">
                        {lang === "sw" ? opt.nameSw : opt.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                        {lang === "sw" ? opt.descriptionSw : opt.description}
                      </p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center transition-smooth ${
                        isSelected
                          ? `${opt.borderClass} ${opt.accentClass}`
                          : "border-muted-foreground"
                      }`}
                    >
                      {isSelected && (
                        <div className="w-2.5 h-2.5 rounded-full bg-current" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Mobile money phone input (M-Pesa, Tigo Pesa, Airtel Money) */}
            {isMobileMoney(selectedPayment) && (
              <div
                data-ocid="checkout.mobile_money_details"
                className={`border rounded-xl p-4 space-y-3 ${
                  selectedPayment === "mpesa"
                    ? "bg-emerald-50 border-emerald-200"
                    : selectedPayment === "tigo_pesa"
                      ? "bg-blue-50 border-blue-200"
                      : "bg-red-50 border-red-200"
                }`}
              >
                <p
                  className={`text-sm font-medium flex gap-2 ${
                    selectedPayment === "mpesa"
                      ? "text-emerald-800"
                      : selectedPayment === "tigo_pesa"
                        ? "text-blue-800"
                        : "text-red-800"
                  }`}
                >
                  <Phone className="w-4 h-4 shrink-0 mt-0.5" />
                  {lang === "sw"
                    ? `Weka nambari ya simu yako ya ${
                        selectedPayment === "mpesa"
                          ? "M-Pesa"
                          : selectedPayment === "tigo_pesa"
                            ? "Tigo Pesa"
                            : "Airtel Money"
                      } kupokea ombi la malipo`
                    : `Enter your ${
                        selectedPayment === "mpesa"
                          ? "M-Pesa"
                          : selectedPayment === "tigo_pesa"
                            ? "Tigo Pesa"
                            : "Airtel Money"
                      } number to receive a payment prompt`}
                </p>
                <div>
                  <label
                    htmlFor="mobile-phone"
                    className={`text-xs font-semibold block mb-1.5 ${
                      selectedPayment === "mpesa"
                        ? "text-emerald-700"
                        : selectedPayment === "tigo_pesa"
                          ? "text-blue-700"
                          : "text-red-700"
                    }`}
                  >
                    {t("phoneNumber")}
                  </label>
                  <Input
                    id="mobile-phone"
                    data-ocid="checkout.mobile_phone_input"
                    type="tel"
                    placeholder="+255 7XX XXX XXX"
                    value={mobilePhone}
                    onChange={(e) => setMobilePhone(e.target.value)}
                    className="bg-card"
                  />
                </div>
              </div>
            )}

            {/* Bank reference input */}
            {(selectedPayment === "crdb" || selectedPayment === "nmb") && (
              <div
                data-ocid="checkout.bank_details"
                className={`border rounded-xl p-4 space-y-3 ${
                  selectedPayment === "crdb"
                    ? "bg-blue-50 border-blue-200"
                    : "bg-orange-50 border-orange-200"
                }`}
              >
                <p
                  className={`text-sm font-medium flex gap-2 ${
                    selectedPayment === "crdb"
                      ? "text-blue-800"
                      : "text-orange-800"
                  }`}
                >
                  <Building2 className="w-4 h-4 shrink-0 mt-0.5" />
                  {t("bankInstruction")}
                </p>
                <div>
                  <label
                    htmlFor="bank-ref"
                    className={`text-xs font-semibold block mb-1.5 ${
                      selectedPayment === "crdb"
                        ? "text-blue-700"
                        : "text-orange-700"
                    }`}
                  >
                    {t("bankReference")}
                  </label>
                  <Input
                    id="bank-ref"
                    data-ocid="checkout.bank_reference_input"
                    type="text"
                    placeholder="e.g. TXN2024050600123"
                    value={bankRef}
                    onChange={(e) => setBankRef(e.target.value)}
                    className="bg-card"
                  />
                </div>
              </div>
            )}

            {/* Secure Escrow Toggle */}
            <button
              type="button"
              data-ocid="checkout.escrow_toggle"
              aria-pressed={escrowEnabled}
              className={`w-full text-left border-2 rounded-xl p-4 transition-smooth ${
                escrowEnabled
                  ? "border-primary/40 bg-primary/5"
                  : "border-border bg-card hover:border-primary/30"
              }`}
              onClick={() => setEscrowEnabled((v) => !v)}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-smooth ${
                    escrowEnabled
                      ? "bg-primary/15 text-primary"
                      : "bg-muted/50 text-muted-foreground"
                  }`}
                >
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-sm text-foreground">
                      {lang === "sw"
                        ? "Malipo Salama ya Amana"
                        : "Secure Escrow Payment"}
                    </p>
                    <div
                      className={`w-11 h-6 rounded-full transition-smooth relative shrink-0 ${
                        escrowEnabled ? "bg-primary" : "bg-muted"
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 rounded-full bg-card shadow-sm transition-smooth ${
                          escrowEnabled ? "left-6" : "left-1"
                        }`}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {lang === "sw"
                      ? "Fedha zitashikiliwa salama na kutolewa kwa muuzaji tu baada ya kuthibitisha uwasilishaji, au kiotomatiki baada ya siku 7."
                      : "Funds are held securely and released to the seller only after you confirm delivery, or automatically after 7 days."}
                  </p>
                </div>
              </div>
              {escrowEnabled && (
                <div className="mt-3 flex items-center gap-2 bg-primary/8 rounded-lg px-3 py-2">
                  <Lock className="w-3.5 h-3.5 text-primary shrink-0" />
                  <p className="text-xs text-primary font-medium">
                    {lang === "sw"
                      ? "Umewezesha usalama wa amana — fedha zitashikiliwa hadi uthibitisho wa utoaji."
                      : "Escrow protection enabled — funds held until delivery confirmation."}
                  </p>
                </div>
              )}
            </button>

            <Button
              data-ocid="checkout.confirm_payment_button"
              className="w-full"
              size="lg"
              disabled={!selectedPayment || isProcessing}
              onClick={handleConfirmPayment}
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                  {lang === "sw" ? "Inashughulikia..." : "Processing..."}
                </span>
              ) : (
                t("confirmPayment")
              )}
            </Button>
          </div>
        )}

        {/* ── STEP 3: Confirmation ────────────────────────────────────────── */}
        {step === 3 && (
          <div data-ocid="checkout.step3" className="space-y-5">
            {/* Success banner */}
            <div
              className={`border rounded-xl p-5 text-center ${
                escrowEnabled
                  ? "bg-amber-50 border-amber-200"
                  : "bg-primary/10 border-primary/20"
              }`}
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
                  escrowEnabled ? "bg-amber-100" : "bg-primary/15"
                }`}
              >
                {escrowEnabled ? (
                  <ShieldCheck className="w-9 h-9 text-amber-600" />
                ) : (
                  <CheckCircle2 className="w-9 h-9 text-primary" />
                )}
              </div>
              <h2 className="font-display text-xl font-bold text-foreground">
                {escrowEnabled
                  ? lang === "sw"
                    ? "Malipo Yameshikiliwa Salama"
                    : "Payment Held Securely"
                  : t("orderConfirmation")}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {escrowEnabled
                  ? lang === "sw"
                    ? "Agizo lako limetumwa. Fedha zitashikiliwa hadi uthibitisho."
                    : "Your order is placed. Funds are held until delivery confirmation."
                  : t("orderPlacedSuccess")}
              </p>
            </div>

            {/* Escrow notice */}
            {escrowEnabled && (
              <div
                data-ocid="checkout.escrow_notice"
                className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-3"
              >
                <div className="flex gap-3 items-start">
                  <Lock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-amber-800">
                      {lang === "sw"
                        ? "Malipo yako yameshikiliwa salama."
                        : "Your payment is held securely."}
                    </p>
                    <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                      {lang === "sw"
                        ? "Toa idhini ya kutolewa kwa fedha ukisha kupokea bidhaa, au fedha zitatoka kiotomatiki baada ya siku 7."
                        : "Release it once you confirm delivery. Funds auto-release to seller after 7 days if no action is taken."}
                    </p>
                  </div>
                </div>
                {!deliveryConfirmed ? (
                  <Button
                    data-ocid="checkout.confirm_delivery_button"
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                    size="sm"
                    onClick={() => setDeliveryConfirmed(true)}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    {lang === "sw"
                      ? "Thibitisha Utoaji wa Bidhaa"
                      : "Confirm Delivery & Release Funds"}
                  </Button>
                ) : (
                  <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <p className="text-sm text-emerald-700 font-medium">
                      {lang === "sw"
                        ? "Utoaji umethibitishwa! Fedha zimetolewa."
                        : "Delivery confirmed! Funds released to seller."}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Order details card */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="bg-muted/30 px-4 py-2.5 border-b border-border">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  {lang === "sw" ? "Maelezo ya Agizo" : "Order Details"}
                </p>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {t("orderReference")}
                  </span>
                  <Badge variant="secondary" className="font-mono text-xs">
                    {orderRef}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    {t("paymentMethodUsed")}
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {selectedOption
                      ? lang === "sw"
                        ? selectedOption.nameSw
                        : selectedOption.name
                      : "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    {t("amountPaid")}
                  </span>
                  <span className="text-sm font-bold text-primary">
                    {formatTSh(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    {t("seller")}
                  </span>
                  <span className="text-sm font-medium text-foreground truncate max-w-[160px]">
                    {sellerName}
                  </span>
                </div>
                <div className="border-t border-border pt-3 flex gap-2 items-start">
                  <Truck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {t("estimatedDelivery")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {lang === "sw"
                        ? "Siku 3-5 za kazi baada ya uthibitisho wa malipo"
                        : "3-5 business days after payment confirmation"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                data-ocid="checkout.track_order_button"
                className="flex-1"
                size="lg"
                onClick={() => navigate({ to: "/my-orders" })}
              >
                {t("trackOrder")}
              </Button>
              <Button
                data-ocid="checkout.continue_shopping_button"
                variant="outline"
                className="flex-1"
                size="lg"
                onClick={() => navigate({ to: "/marketplace" })}
              >
                {lang === "sw" ? "Endelea Kununua" : "Keep Shopping"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
