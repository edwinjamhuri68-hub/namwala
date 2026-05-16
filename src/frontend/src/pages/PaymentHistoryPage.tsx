import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { formatTSh } from "@/lib/mockData";
import { useLanguageStore } from "@/store/languageStore";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  BadgeCheck,
  Banknote,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  CreditCard,
  Download,
  Package,
  RotateCcw,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { useState } from "react";

// ── Types ────────────────────────────────────────────────────────────────────

type PaymentStatus = "pending" | "held" | "completed" | "failed" | "refunded";
type ExtPaymentMethod =
  | "mpesa"
  | "tigo_pesa"
  | "airtel_money"
  | "crdb"
  | "nmb"
  | "cash";

interface PaymentTransaction {
  id: string;
  reference: string;
  description: string;
  buyerName: string;
  sellerName: string;
  amount: number;
  method: ExtPaymentMethod;
  status: PaymentStatus;
  createdAt: string;
  category: "purchase" | "service" | "transport" | "livestock";
}

// ── Mock data ─────────────────────────────────────────────────────────────────

const MOCK_TRANSACTIONS: PaymentTransaction[] = [
  {
    id: "tx1",
    reference: "TXN-2026-001847",
    description: "NPK Fertilizer 50kg × 5 bags",
    buyerName: "Juma Mwalimu",
    sellerName: "Ally Agro Supplies",
    amount: 475000,
    method: "mpesa",
    status: "completed",
    createdAt: "2026-04-28T10:22:00Z",
    category: "purchase",
  },
  {
    id: "tx2",
    reference: "TXN-2026-001901",
    description: "Sahiwal Cross Cattle × 2 heads",
    buyerName: "Juma Mwalimu",
    sellerName: "Amina Hassan",
    amount: 1700000,
    method: "nmb",
    status: "held",
    createdAt: "2026-05-01T14:05:00Z",
    category: "livestock",
  },
  {
    id: "tx3",
    reference: "TXN-2026-001956",
    description: "Tractor Plowing Service – 3 acres",
    buyerName: "Juma Mwalimu",
    sellerName: "Msigwa Farm Services",
    amount: 135000,
    method: "tigo_pesa",
    status: "completed",
    createdAt: "2026-05-02T09:15:00Z",
    category: "service",
  },
  {
    id: "tx4",
    reference: "TXN-2026-002010",
    description: "Dudu Kill Pesticide 1L × 4",
    buyerName: "Juma Mwalimu",
    sellerName: "Ally Agro Supplies",
    amount: 48000,
    method: "mpesa",
    status: "completed",
    createdAt: "2026-05-03T07:40:00Z",
    category: "purchase",
  },
  {
    id: "tx5",
    reference: "TXN-2026-002088",
    description: "Truck Transport – Mbeya to Dar es Salaam",
    buyerName: "Juma Mwalimu",
    sellerName: "Kwame Logistics",
    amount: 320000,
    method: "airtel_money",
    status: "held",
    createdAt: "2026-05-04T11:30:00Z",
    category: "transport",
  },
  {
    id: "tx6",
    reference: "TXN-2026-002134",
    description: "Hybrid Maize Seeds 5kg × 10 packs",
    buyerName: "Juma Mwalimu",
    sellerName: "Ally Agro Supplies",
    amount: 185000,
    method: "crdb",
    status: "pending",
    createdAt: "2026-05-05T16:00:00Z",
    category: "purchase",
  },
  {
    id: "tx7",
    reference: "TXN-2026-002201",
    description: "Irrigation Pipe Kit – 100m",
    buyerName: "Juma Mwalimu",
    sellerName: "TanzaFarm Inputs Ltd",
    amount: 95000,
    method: "mpesa",
    status: "failed",
    createdAt: "2026-05-05T18:20:00Z",
    category: "purchase",
  },
  {
    id: "tx8",
    reference: "TXN-2026-002255",
    description: "Veterinary Consultation Service",
    buyerName: "Juma Mwalimu",
    sellerName: "Dr. Neema Veterinary Clinic",
    amount: 45000,
    method: "tigo_pesa",
    status: "refunded",
    createdAt: "2026-04-20T08:00:00Z",
    category: "service",
  },
];

// ── Config maps ───────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  PaymentStatus,
  {
    label: string;
    labelSw: string;
    icon: React.ReactNode;
    badgeClass: string;
    bg: string;
  }
> = {
  pending: {
    label: "Pending",
    labelSw: "Inasubiri",
    icon: <Clock className="w-3.5 h-3.5" />,
    badgeClass: "bg-muted text-muted-foreground border-border",
    bg: "bg-muted/20",
  },
  held: {
    label: "Held (Escrow)",
    labelSw: "Imehifadhiwa",
    icon: <ShieldCheck className="w-3.5 h-3.5" />,
    badgeClass: "bg-amber-100 text-amber-700 border-amber-200",
    bg: "bg-amber-50/50",
  },
  completed: {
    label: "Completed",
    labelSw: "Imekamilika",
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    badgeClass: "bg-accent/15 text-accent-foreground border-accent/30",
    bg: "bg-accent/5",
  },
  failed: {
    label: "Failed",
    labelSw: "Imeshindwa",
    icon: <XCircle className="w-3.5 h-3.5" />,
    badgeClass: "bg-destructive/10 text-destructive border-destructive/20",
    bg: "bg-destructive/5",
  },
  refunded: {
    label: "Refunded",
    labelSw: "Imerudishwa",
    icon: <RotateCcw className="w-3.5 h-3.5" />,
    badgeClass: "bg-blue-100 text-blue-700 border-blue-200",
    bg: "bg-blue-50/40",
  },
};

const METHOD_CONFIG: Record<
  ExtPaymentMethod,
  { label: string; icon: React.ReactNode; color: string }
> = {
  mpesa: {
    label: "M-Pesa",
    icon: <Smartphone className="w-3.5 h-3.5" />,
    color: "text-green-600",
  },
  tigo_pesa: {
    label: "Tigo Pesa",
    icon: <Smartphone className="w-3.5 h-3.5" />,
    color: "text-blue-600",
  },
  airtel_money: {
    label: "Airtel Money",
    icon: <Smartphone className="w-3.5 h-3.5" />,
    color: "text-red-500",
  },
  crdb: {
    label: "CRDB Bank",
    icon: <CreditCard className="w-3.5 h-3.5" />,
    color: "text-primary",
  },
  nmb: {
    label: "NMB Bank",
    icon: <CreditCard className="w-3.5 h-3.5" />,
    color: "text-primary",
  },
  cash: {
    label: "Cash",
    icon: <Banknote className="w-3.5 h-3.5" />,
    color: "text-muted-foreground",
  },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string, lang: string, includeTime = false) {
  const d = new Date(iso);
  const opts: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...(includeTime ? { hour: "2-digit", minute: "2-digit" } : {}),
  };
  return d.toLocaleDateString(lang === "sw" ? "sw-TZ" : "en-US", opts);
}

function getCurrentMonth(): string {
  return new Date().toISOString().slice(0, 7);
}

function isThisMonth(iso: string): boolean {
  return iso.startsWith(getCurrentMonth());
}

// ── Receipt Modal ─────────────────────────────────────────────────────────────

function ReceiptModal({
  tx,
  lang,
  onClose,
}: {
  tx: PaymentTransaction;
  lang: string;
  onClose: () => void;
}) {
  const method = METHOD_CONFIG[tx.method];
  const status = STATUS_CONFIG[tx.status];

  return (
    <DialogContent className="max-w-sm mx-4">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 font-display">
          <BadgeCheck className="w-5 h-5 text-accent" />
          {lang === "sw" ? "Risiti ya Malipo" : "Payment Receipt"}
        </DialogTitle>
      </DialogHeader>

      {/* Receipt body */}
      <div
        data-ocid="payment_history.receipt.dialog"
        className="border border-border rounded-xl overflow-hidden bg-background text-xs"
      >
        {/* Header strip */}
        <div className="bg-primary px-4 py-3 text-center">
          <p className="text-primary-foreground font-display font-bold text-base">
            Namwala
          </p>
          <p className="text-primary-foreground/70 text-[11px] mt-0.5">
            Official Transaction Receipt
          </p>
        </div>

        {/* Details */}
        <div className="divide-y divide-border">
          {[
            [
              lang === "sw" ? "Kumbukumbu" : "Reference",
              <span
                key="ref"
                className="font-mono font-semibold text-foreground"
              >
                {tx.reference}
              </span>,
            ],
            [
              lang === "sw" ? "Tarehe" : "Date",
              formatDate(tx.createdAt, lang, true),
            ],
            [lang === "sw" ? "Maudhui" : "Description", tx.description],
            [lang === "sw" ? "Mnunuzi" : "Buyer", tx.buyerName],
            [lang === "sw" ? "Muuzaji" : "Seller", tx.sellerName],
            [
              lang === "sw" ? "Njia ya Malipo" : "Payment Method",
              <span
                key="method"
                className={`flex items-center gap-1 ${method.color}`}
              >
                {method.icon}
                {method.label}
              </span>,
            ],
            [
              lang === "sw" ? "Hali" : "Status",
              <span
                key="status"
                className={`flex items-center gap-1 font-semibold ${
                  tx.status === "completed"
                    ? "text-accent-foreground"
                    : tx.status === "held"
                      ? "text-amber-700"
                      : "text-muted-foreground"
                }`}
              >
                {status.icon}
                {lang === "sw" ? status.labelSw : status.label}
              </span>,
            ],
          ].map(([label, value]) => (
            <div
              key={String(label)}
              className="flex justify-between gap-3 px-4 py-2.5"
            >
              <span className="text-muted-foreground shrink-0">{label}</span>
              <span className="text-foreground text-right">{value}</span>
            </div>
          ))}

          {/* Amount row */}
          <div className="flex justify-between items-center px-4 py-3 bg-muted/30">
            <span className="font-semibold text-foreground text-sm">
              {lang === "sw" ? "Jumla" : "Total Amount"}
            </span>
            <span className="font-bold text-primary text-base">
              {formatTSh(tx.amount)}
            </span>
          </div>
        </div>

        {/* Note */}
        <div className="px-4 py-3 bg-muted/20 text-muted-foreground text-[11px] text-center border-t border-border">
          {lang === "sw"
            ? "Hii ni risiti ya kidijitali kutoka kwa Namwala. Kumbuka kutunza nakala hii."
            : "This is a digital receipt from Namwala. Please retain this for your records."}
        </div>
      </div>

      <div className="flex gap-2 mt-1">
        <Button
          data-ocid="payment_history.receipt.close_button"
          variant="outline"
          className="flex-1"
          onClick={onClose}
        >
          {lang === "sw" ? "Funga" : "Close"}
        </Button>
        <Button
          data-ocid="payment_history.receipt.download_button"
          variant="default"
          className="flex-1 gap-1.5"
          onClick={() => window.print()}
        >
          <Download className="w-3.5 h-3.5" />
          {lang === "sw" ? "Chapisha" : "Print"}
        </Button>
      </div>
    </DialogContent>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function PaymentHistoryPage() {
  const { language } = useLanguageStore();
  const lang = language;
  const navigate = useNavigate();

  const [statusFilter, setStatusFilter] = useState<PaymentStatus | "all">(
    "all",
  );
  const [methodFilter, setMethodFilter] = useState<ExtPaymentMethod | "all">(
    "all",
  );
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [receiptTx, setReceiptTx] = useState<PaymentTransaction | null>(null);
  const [transactions, setTransactions] =
    useState<PaymentTransaction[]>(MOCK_TRANSACTIONS);
  const [showFilters, setShowFilters] = useState(false);

  // ── Computed ────────────────────────────────────────────────────────────────

  const filtered = transactions.filter((tx) => {
    if (statusFilter !== "all" && tx.status !== statusFilter) return false;
    if (methodFilter !== "all" && tx.method !== methodFilter) return false;
    if (dateFrom && tx.createdAt < dateFrom) return false;
    if (dateTo && tx.createdAt > `${dateTo}T23:59:59Z`) return false;
    return true;
  });

  const thisMonthTxs = transactions.filter((tx) => isThisMonth(tx.createdAt));
  const totalSpentMonth = thisMonthTxs
    .filter((tx) => tx.status === "completed" || tx.status === "held")
    .reduce((s, tx) => s + tx.amount, 0);

  const statusBreakdown = (
    ["completed", "held", "pending", "failed", "refunded"] as PaymentStatus[]
  ).map((s) => ({
    status: s,
    count: transactions.filter((tx) => tx.status === s).length,
  }));

  // ── Handlers ────────────────────────────────────────────────────────────────

  function confirmDelivery(id: string) {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? { ...tx, status: "completed" } : tx)),
    );
  }

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <Layout>
      <div
        data-ocid="payment_history.page"
        className="px-4 py-4 pb-12 space-y-4"
      >
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            data-ocid="payment_history.back_button"
            onClick={() => navigate({ to: "/home" })}
            className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary/40 transition-colors duration-200"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <div>
            <h1 className="font-display text-lg font-bold text-foreground">
              {lang === "sw" ? "Historia ya Malipo" : "Payment History"}
            </h1>
            <p className="text-xs text-muted-foreground">
              {filtered.length} {lang === "sw" ? "miamala" : "transactions"}
            </p>
          </div>
        </div>

        {/* ── Summary cards ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-2">
          {/* Total this month */}
          <div className="col-span-3 bg-card border border-border rounded-xl p-4 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">
                {lang === "sw" ? "Imetumika Mwezi Huu" : "Spent This Month"}
              </p>
              <p className="font-bold text-xl text-primary font-display leading-tight">
                {formatTSh(totalSpentMonth)}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {thisMonthTxs.length}{" "}
                {lang === "sw" ? "miamala" : "transactions in"}{" "}
                {new Date().toLocaleDateString(
                  lang === "sw" ? "sw-TZ" : "en-US",
                  { month: "long", year: "numeric" },
                )}
              </p>
            </div>
          </div>

          {/* Status breakdown */}
          {statusBreakdown
            .filter((b) => b.count > 0)
            .map(({ status, count }) => {
              const cfg = STATUS_CONFIG[status];
              return (
                <button
                  key={status}
                  type="button"
                  data-ocid={`payment_history.status_filter.${status}`}
                  onClick={() =>
                    setStatusFilter((prev) =>
                      prev === status ? "all" : status,
                    )
                  }
                  className={`rounded-xl border p-3 text-left transition-colors duration-200 ${
                    statusFilter === status
                      ? `${cfg.badgeClass} border-2`
                      : "bg-card border-border hover:border-primary/30"
                  }`}
                >
                  <p className="text-lg font-bold text-foreground">{count}</p>
                  <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                    {lang === "sw" ? cfg.labelSw : cfg.label}
                  </p>
                </button>
              );
            })}
        </div>

        {/* ── Filter bar ─────────────────────────────────────────────────── */}
        <div className="space-y-2">
          <button
            type="button"
            data-ocid="payment_history.toggle_filters_button"
            onClick={() => setShowFilters((p) => !p)}
            className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200"
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                showFilters ? "rotate-180" : ""
              }`}
            />
            {lang === "sw" ? "Vichujio" : "Filters"}
            {(statusFilter !== "all" ||
              methodFilter !== "all" ||
              dateFrom ||
              dateTo) && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                {
                  [
                    statusFilter !== "all",
                    methodFilter !== "all",
                    !!dateFrom,
                    !!dateTo,
                  ].filter(Boolean).length
                }
              </span>
            )}
          </button>

          {showFilters && (
            <div className="bg-card border border-border rounded-xl p-3 space-y-3">
              {/* Status pills */}
              <div>
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                  {lang === "sw" ? "Hali" : "Status"}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {(
                    [
                      "all",
                      "pending",
                      "held",
                      "completed",
                      "failed",
                      "refunded",
                    ] as const
                  ).map((s) => (
                    <button
                      key={s}
                      type="button"
                      data-ocid={`payment_history.filter_status.${s}`}
                      onClick={() => setStatusFilter(s)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors duration-200 ${
                        statusFilter === s
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-muted-foreground border-border hover:border-primary/40"
                      }`}
                    >
                      {s === "all"
                        ? lang === "sw"
                          ? "Yote"
                          : "All"
                        : lang === "sw"
                          ? STATUS_CONFIG[s].labelSw
                          : STATUS_CONFIG[s].label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment method pills */}
              <div>
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                  {lang === "sw" ? "Njia ya Malipo" : "Payment Method"}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {(
                    [
                      "all",
                      "mpesa",
                      "tigo_pesa",
                      "airtel_money",
                      "crdb",
                      "nmb",
                      "cash",
                    ] as const
                  ).map((m) => (
                    <button
                      key={m}
                      type="button"
                      data-ocid={`payment_history.filter_method.${m}`}
                      onClick={() => setMethodFilter(m)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors duration-200 ${
                        methodFilter === m
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-muted-foreground border-border hover:border-primary/40"
                      }`}
                    >
                      {m === "all"
                        ? lang === "sw"
                          ? "Zote"
                          : "All"
                        : METHOD_CONFIG[m].label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date range */}
              <div>
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                  {lang === "sw" ? "Kipindi" : "Date Range"}
                </p>
                <div className="flex gap-2 items-center">
                  <div className="flex-1">
                    <label
                      className="text-[11px] text-muted-foreground"
                      htmlFor="date-from"
                    >
                      {lang === "sw" ? "Kutoka" : "From"}
                    </label>
                    <Input
                      id="date-from"
                      data-ocid="payment_history.date_from_input"
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      className="h-8 text-xs mt-0.5"
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      className="text-[11px] text-muted-foreground"
                      htmlFor="date-to"
                    >
                      {lang === "sw" ? "Hadi" : "To"}
                    </label>
                    <Input
                      id="date-to"
                      data-ocid="payment_history.date_to_input"
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                      className="h-8 text-xs mt-0.5"
                    />
                  </div>
                  {(dateFrom || dateTo) && (
                    <button
                      type="button"
                      onClick={() => {
                        setDateFrom("");
                        setDateTo("");
                      }}
                      className="mt-4 text-xs text-muted-foreground hover:text-destructive transition-colors duration-200"
                      aria-label="Clear dates"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Clear all */}
              {(statusFilter !== "all" ||
                methodFilter !== "all" ||
                dateFrom ||
                dateTo) && (
                <button
                  type="button"
                  data-ocid="payment_history.clear_filters_button"
                  onClick={() => {
                    setStatusFilter("all");
                    setMethodFilter("all");
                    setDateFrom("");
                    setDateTo("");
                  }}
                  className="text-xs text-destructive hover:underline"
                >
                  {lang === "sw" ? "Futa Vichujio Vyote" : "Clear all filters"}
                </button>
              )}
            </div>
          )}
        </div>

        {/* ── Transaction list ────────────────────────────────────────────── */}
        {filtered.length === 0 ? (
          <div
            data-ocid="payment_history.empty_state"
            className="bg-card border border-border rounded-xl py-14 text-center"
          >
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="font-semibold text-foreground">
              {lang === "sw" ? "Hakuna Miamala" : "No Transactions Found"}
            </p>
            <p className="text-sm text-muted-foreground mt-1 max-w-xs mx-auto">
              {lang === "sw"
                ? "Jaribu kubadilisha vichujio"
                : "Try adjusting your filters"}
            </p>
          </div>
        ) : (
          <div data-ocid="payment_history.list" className="space-y-3">
            {filtered.map((tx, i) => {
              const status = STATUS_CONFIG[tx.status];
              const method = METHOD_CONFIG[tx.method];
              const isHeld = tx.status === "held";
              const isCompleted = tx.status === "completed";

              return (
                <div
                  key={tx.id}
                  data-ocid={`payment_history.item.${i + 1}`}
                  className="bg-card border border-border rounded-xl overflow-hidden"
                >
                  {/* Status header */}
                  <div
                    className={`px-4 py-2 flex items-center justify-between border-b border-border ${status.bg}`}
                  >
                    <span className="font-mono text-[11px] text-muted-foreground tracking-tight">
                      {tx.reference}
                    </span>
                    <Badge
                      data-ocid={`payment_history.status_badge.${i + 1}`}
                      className={`flex items-center gap-1 text-[11px] font-semibold border px-2 py-0.5 h-auto rounded-full ${
                        status.badgeClass
                      }`}
                    >
                      {status.icon}
                      {lang === "sw" ? status.labelSw : status.label}
                    </Badge>
                  </div>

                  {/* Body */}
                  <div className="p-4">
                    <div className="flex gap-3 items-start">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Package className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-foreground leading-tight">
                          {tx.description}
                        </p>
                        <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
                          <span className="text-xs text-muted-foreground">
                            {lang === "sw" ? "Muuzaji" : "Seller"}:{" "}
                            <strong className="text-foreground">
                              {tx.sellerName}
                            </strong>
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {lang === "sw" ? "Mnunuzi" : "Buyer"}:{" "}
                            <strong className="text-foreground">
                              {tx.buyerName}
                            </strong>
                          </span>
                        </div>
                        <div
                          className={`flex items-center gap-1 mt-1.5 text-xs font-medium ${method.color}`}
                        >
                          {method.icon}
                          {method.label}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-bold text-primary text-sm">
                          {formatTSh(tx.amount)}
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          {formatDate(tx.createdAt, lang)}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    {(isCompleted || isHeld) && (
                      <div className="mt-3 pt-3 border-t border-border flex gap-2">
                        {isCompleted && (
                          <Button
                            data-ocid={`payment_history.view_receipt_button.${i + 1}`}
                            variant="outline"
                            size="sm"
                            className="flex-1 text-xs gap-1.5"
                            onClick={() => setReceiptTx(tx)}
                          >
                            <BadgeCheck className="w-3.5 h-3.5" />
                            {lang === "sw" ? "Tazama Risiti" : "View Receipt"}
                          </Button>
                        )}
                        {isHeld && (
                          <Button
                            data-ocid={`payment_history.confirm_delivery_button.${i + 1}`}
                            variant="default"
                            size="sm"
                            className="flex-1 text-xs gap-1.5"
                            onClick={() => confirmDelivery(tx.id)}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {lang === "sw"
                              ? "Thibitisha Kupokea"
                              : "Confirm Delivery"}
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground pt-2 pb-4">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            className="hover:text-primary"
            target="_blank"
            rel="noreferrer"
          >
            caffeine.ai
          </a>
        </div>
      </div>

      {/* Receipt modal */}
      <Dialog
        open={!!receiptTx}
        onOpenChange={(open) => !open && setReceiptTx(null)}
      >
        {receiptTx && (
          <ReceiptModal
            tx={receiptTx}
            lang={lang}
            onClose={() => setReceiptTx(null)}
          />
        )}
      </Dialog>
    </Layout>
  );
}
