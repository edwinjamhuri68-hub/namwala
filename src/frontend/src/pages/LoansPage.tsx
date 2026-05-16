import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/store/languageStore";
import type { LoanApplication } from "@/types";
import {
  Landmark,
  MessageSquare,
  Plus,
  RefreshCw,
  TrendingUp,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const STATUS_COLOR: Record<LoanApplication["status"], string> = {
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
  rejected: "bg-red-100 text-red-700 border-red-200",
  disbursed: "bg-blue-100 text-blue-700 border-blue-200",
};

const LOAN_PURPOSES = [
  "crop_inputs",
  "equipment",
  "livestock",
  "land",
  "other",
] as const;

type LoanPurposeKey = (typeof LOAN_PURPOSES)[number];

const LOAN_PURPOSES_EN: Record<LoanPurposeKey, string> = {
  crop_inputs: "Crop Inputs (Seeds, Fertilizer, Pesticides)",
  equipment: "Farm Equipment & Machinery",
  livestock: "Livestock Purchase",
  land: "Land Acquisition or Lease",
  other: "Other Agricultural Use",
};

const LOAN_PURPOSES_SW: Record<LoanPurposeKey, string> = {
  crop_inputs: "Pembejeo (Mbegu, Mbolea, Dawa za Wadudu)",
  equipment: "Vifaa vya Shamba",
  livestock: "Kununua Mifugo",
  land: "Kupata au Kupanga Ardhi",
  other: "Matumizi Mengine ya Kilimo",
};

const DURATIONS = [6, 12, 18, 24, 36];

const INITIAL_LOANS: LoanApplication[] = [
  {
    id: "l1",
    applicantId: "u1",
    amount: 500000,
    purpose:
      "Purchase hybrid maize seeds and NPK fertilizer for the upcoming planting season.",
    durationMonths: 6,
    repaymentTerms: "Monthly equal installments of TSh 83,333",
    activitySummary: {
      totalRecords: 12,
      totalSalesRevenue: 1200000,
      totalExpenses: 380000,
      netProfit: 820000,
      averageMonthlyRevenue: 100000,
      topActivities: ["Maize farming", "Bean farming"],
    },
    status: "approved",
    lenderNotes: "Good track record. Approved at 8% annual interest.",
    createdAt: "2026-03-01",
    updatedAt: "2026-03-10",
  },
  {
    id: "l2",
    applicantId: "u1",
    amount: 1200000,
    purpose:
      "Purchase a garden tractor and plowing attachments to improve farm efficiency.",
    durationMonths: 24,
    repaymentTerms: "Monthly installments of TSh 50,000 at 9% annual rate",
    activitySummary: {
      totalRecords: 18,
      totalSalesRevenue: 2100000,
      totalExpenses: 680000,
      netProfit: 1420000,
      averageMonthlyRevenue: 175000,
      topActivities: ["Maize farming", "Sunflower", "Cattle"],
    },
    status: "pending",
    createdAt: "2026-05-01",
    updatedAt: "2026-05-01",
  },
];

const ACTIVITY_MOCK = {
  totalSales: 2100000,
  totalExpenses: 680000,
  transactions: 34,
  records: 18,
};

interface LoanFormData {
  amount: string;
  purpose: LoanPurposeKey;
  durationMonths: number;
  repaymentTerms: string;
}

function emptyLoanForm(): LoanFormData {
  return {
    amount: "",
    purpose: "crop_inputs",
    durationMonths: 12,
    repaymentTerms: "",
  };
}

interface LoanModalProps {
  open: boolean;
  summary: typeof ACTIVITY_MOCK;
  onClose: () => void;
  onSubmit: (data: LoanFormData) => void;
}

function LoanModal({ open, summary, onClose, onSubmit }: LoanModalProps) {
  const { t, language } = useLanguageStore();
  const [form, setForm] = useState<LoanFormData>(emptyLoanForm());
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setForm(emptyLoanForm());
      setTimeout(() => firstRef.current?.focus(), 50);
    }
  }, [open]);

  if (!open) return null;

  const lbl = (en: string, sw: string) => (language === "sw" ? sw : en);
  const purposeLabels = language === "sw" ? LOAN_PURPOSES_SW : LOAN_PURPOSES_EN;

  const monthlyPayment =
    form.amount && form.durationMonths
      ? Math.round(Number(form.amount) / form.durationMonths)
      : 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 px-0 sm:px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
      aria-modal="true"
    >
      <div
        className="bg-card w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-elevated max-h-[90vh] overflow-y-auto"
        data-ocid="loans.dialog"
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b sticky top-0 bg-card z-10">
          <h2 className="font-bold text-foreground text-base">
            {t("apply_for_loan")}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-muted transition-colors"
            data-ocid="loans.dialog.close_button"
          >
            <X size={18} />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form);
          }}
          className="p-5 space-y-4"
        >
          {/* Activity summary preview */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-3">
            <p className="text-xs font-semibold text-primary mb-2">
              {t("activity_summary")}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                {
                  label: t("total_sales"),
                  val: `TSh ${summary.totalSales.toLocaleString()}`,
                },
                {
                  label: t("total_expenses"),
                  val: `TSh ${summary.totalExpenses.toLocaleString()}`,
                },
                {
                  label: lbl("Transactions", "Miamala"),
                  val: String(summary.transactions),
                },
                { label: t("my_records"), val: String(summary.records) },
              ].map(({ label, val }) => (
                <div
                  key={label}
                  className="bg-background rounded-lg px-2 py-1.5 text-center"
                >
                  <p className="text-xs text-muted-foreground truncate">
                    {label}
                  </p>
                  <p className="text-xs font-bold text-foreground">{val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Loan Amount */}
          <div className="space-y-1.5">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="loan-amount"
            >
              {t("loan_amount")}
            </label>
            <input
              ref={firstRef}
              required
              type="number"
              min="10000"
              placeholder="500000"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              value={form.amount}
              onChange={(e) =>
                setForm((f) => ({ ...f, amount: e.target.value }))
              }
              data-ocid="loans.amount.input"
              id="loan-amount"
            />
          </div>

          {/* Purpose */}
          <div className="space-y-1.5">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="loan-purpose"
            >
              {t("loan_purpose")}
            </label>
            <select
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              value={form.purpose}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  purpose: e.target.value as LoanPurposeKey,
                }))
              }
              data-ocid="loans.purpose.select"
              id="loan-purpose"
            >
              {LOAN_PURPOSES.map((p) => (
                <option key={p} value={p}>
                  {purposeLabels[p]}
                </option>
              ))}
            </select>
          </div>

          {/* Duration */}
          <div className="space-y-1.5">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="loan-duration-group"
            >
              {t("loan_duration")}
            </label>
            <div className="flex gap-2 flex-wrap">
              {DURATIONS.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, durationMonths: d }))}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    form.durationMonths === d
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-accent/50"
                  }`}
                  data-ocid={`loans.duration.${d}`}
                >
                  {d} {lbl("mo", "miezi")}
                </button>
              ))}
            </div>
          </div>

          {/* Estimated monthly */}
          {monthlyPayment > 0 && (
            <div className="bg-accent/10 border border-accent/20 rounded-xl p-3">
              <p className="text-xs text-accent">
                {lbl(
                  "Estimated monthly repayment",
                  "Malipo ya kila mwezi yanayokadiriwa",
                )}
                :
                <span className="font-bold ml-1">
                  TSh {monthlyPayment.toLocaleString()}
                </span>
              </p>
            </div>
          )}

          {/* Repayment terms */}
          <div className="space-y-1.5">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="loan-terms"
            >
              {t("repayment_terms")}
            </label>
            <textarea
              rows={2}
              placeholder={lbl(
                "Describe your proposed repayment plan...",
                "Elezea mpango wako wa ulipaji...",
              )}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              value={form.repaymentTerms}
              onChange={(e) =>
                setForm((f) => ({ ...f, repaymentTerms: e.target.value }))
              }
              data-ocid="loans.terms.textarea"
              id="loan-terms"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
              data-ocid="loans.dialog.cancel_button"
            >
              {t("cancel")}
            </Button>
            <Button
              type="submit"
              className="flex-1"
              data-ocid="loans.dialog.submit_button"
            >
              {t("submit_loan")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function LoansPage() {
  const { t, language } = useLanguageStore();
  const [loans, setLoans] = useState<LoanApplication[]>(INITIAL_LOANS);
  const [modalOpen, setModalOpen] = useState(false);
  const [summary, setSummary] = useState(ACTIVITY_MOCK);
  const [refreshing, setRefreshing] = useState(false);

  const lbl = (en: string, sw: string) => (language === "sw" ? sw : en);

  function handleRefreshSummary() {
    setRefreshing(true);
    setTimeout(() => {
      setSummary({
        totalSales: summary.totalSales + Math.floor(Math.random() * 50000),
        totalExpenses:
          summary.totalExpenses + Math.floor(Math.random() * 10000),
        transactions: summary.transactions + 1,
        records: summary.records + 1,
      });
      setRefreshing(false);
    }, 1000);
  }

  function handleSubmitLoan(data: LoanFormData) {
    const purposeLabels =
      language === "sw" ? LOAN_PURPOSES_SW : LOAN_PURPOSES_EN;
    const newLoan: LoanApplication = {
      id: `l${Date.now()}`,
      applicantId: "u1",
      amount: Number(data.amount),
      purpose: purposeLabels[data.purpose],
      durationMonths: data.durationMonths,
      repaymentTerms:
        data.repaymentTerms ||
        lbl(
          `Monthly installments over ${data.durationMonths} months`,
          `Malipo ya kila mwezi kwa miezi ${data.durationMonths}`,
        ),
      activitySummary: {
        totalRecords: summary.records,
        totalSalesRevenue: summary.totalSales,
        totalExpenses: summary.totalExpenses,
        netProfit: summary.totalSales - summary.totalExpenses,
        averageMonthlyRevenue: Math.round(summary.totalSales / 12),
        topActivities: [
          lbl("Maize farming", "Kulima Mahindi"),
          lbl("Livestock", "Mifugo"),
        ],
      },
      status: "pending",
      createdAt: new Date().toISOString().slice(0, 10),
      updatedAt: new Date().toISOString().slice(0, 10),
    };
    setLoans((prev) => [newLoan, ...prev]);
    setModalOpen(false);
  }

  const netProfit = summary.totalSales - summary.totalExpenses;

  return (
    <Layout>
      <div className="min-h-screen bg-background" data-ocid="loans.page">
        {/* Header */}
        <div className="bg-card border-b px-4 py-4 sticky top-0 z-10 shadow-subtle">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            <div className="flex items-center gap-2">
              <Landmark className="text-primary" size={22} />
              <h1 className="text-lg font-bold text-foreground">
                {t("my_loans")}
              </h1>
            </div>
            <Button
              size="sm"
              onClick={() => setModalOpen(true)}
              data-ocid="loans.apply_button"
            >
              <Plus size={16} className="mr-1" /> {t("apply_for_loan")}
            </Button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
          {/* Activity Summary Card */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp size={18} className="text-primary" />
                <p className="font-semibold text-foreground">
                  {t("activity_summary")}
                </p>
              </div>
              <button
                type="button"
                onClick={handleRefreshSummary}
                disabled={refreshing}
                className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors disabled:opacity-50"
                data-ocid="loans.refresh_summary.button"
              >
                <RefreshCw
                  size={14}
                  className={refreshing ? "animate-spin" : ""}
                />
                {lbl("Refresh", "Sasisha")}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  label: t("total_sales"),
                  value: `TSh ${summary.totalSales.toLocaleString()}`,
                  color: "text-accent",
                },
                {
                  label: t("total_expenses"),
                  value: `TSh ${summary.totalExpenses.toLocaleString()}`,
                  color: "text-destructive",
                },
                {
                  label: t("net_profit"),
                  value: `TSh ${netProfit.toLocaleString()}`,
                  color: netProfit > 0 ? "text-accent" : "text-destructive",
                },
                {
                  label: t("my_records"),
                  value: `${summary.records} ${lbl("records", "rekodi")}`,
                  color: "text-foreground",
                },
              ].map(({ label, value, color }) => (
                <div
                  key={label}
                  className="bg-card rounded-lg p-2.5 text-center"
                >
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className={`text-sm font-bold ${color}`}>{value}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              {lbl(
                "This summary will be automatically included in your loan application to help lenders assess your eligibility.",
                "Muhtasari huu utajumuishwa moja kwa moja kwenye ombi lako la mkopo kusaidia wakopeshaji kutathmini ustahili wako.",
              )}
            </p>
          </div>

          {/* Applications */}
          {loans.length === 0 ? (
            <div
              className="text-center py-16 space-y-3"
              data-ocid="loans.empty_state"
            >
              <Landmark
                className="mx-auto text-muted-foreground/40"
                size={48}
              />
              <p className="font-medium text-foreground">{t("no_loans")}</p>
              <Button
                onClick={() => setModalOpen(true)}
                data-ocid="loans.empty_apply_button"
              >
                <Plus size={16} className="mr-1" /> {t("apply_for_loan")}
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm font-semibold text-foreground">
                {t("my_loans")}
              </p>
              {loans.map((loan, i) => (
                <div
                  key={loan.id}
                  className="bg-card rounded-xl border p-4 space-y-3 slide-up"
                  data-ocid={`loans.item.${i + 1}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xl font-bold text-foreground">
                        TSh {loan.amount.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {loan.durationMonths} {lbl("months", "miezi")} ·{" "}
                        {loan.createdAt}
                      </p>
                    </div>
                    <Badge
                      className={`text-xs border ${STATUS_COLOR[loan.status]}`}
                    >
                      {t(`loan_${loan.status}` as Parameters<typeof t>[0])}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {loan.purpose}
                  </p>

                  <div className="bg-muted/40 rounded-lg p-2.5">
                    <p className="text-xs font-medium text-foreground">
                      {t("repayment_terms")}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {loan.repaymentTerms}
                    </p>
                  </div>

                  {loan.lenderNotes && (
                    <div
                      className={`rounded-lg p-2.5 ${
                        loan.status === "approved"
                          ? "bg-emerald-50 border border-emerald-100"
                          : loan.status === "rejected"
                            ? "bg-red-50 border border-red-100"
                            : "bg-muted/50"
                      }`}
                    >
                      <p className="text-xs font-medium">{t("lender_notes")}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {loan.lenderNotes}
                      </p>
                    </div>
                  )}

                  <button
                    type="button"
                    className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors"
                    data-ocid={`loans.contact_button.${i + 1}`}
                  >
                    <MessageSquare size={14} />
                    {lbl("Contact Lender", "Wasiliana na Mkopeshaji")}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <LoanModal
          open={modalOpen}
          summary={summary}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmitLoan}
        />
      </div>
    </Layout>
  );
}
