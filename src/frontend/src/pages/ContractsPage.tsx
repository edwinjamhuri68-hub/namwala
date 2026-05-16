import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/store/languageStore";
import type {
  ContractStatus,
  ContractTemplate,
  DigitalContract,
} from "@/types";
import {
  CheckCircle2,
  ChevronDown,
  Clock,
  FileSignature,
  Plus,
  X,
} from "lucide-react";
import { useState } from "react";

const CURRENT_USER_ID = "u1";

const SAMPLE_CONTRACTS: DigitalContract[] = [
  {
    id: "c1",
    creatorId: "u1",
    counterpartyId: "u2",
    templateType: "crop_sale",
    title: "Maize Sale — 500kg to Fatuma Supplies",
    partiesNames: ["Juma Mwanafunzi", "Fatuma Supplies Ltd"],
    terms:
      "Seller agrees to deliver 500kg Grade-A maize to buyer at Dodoma Central Market by 5th May 2026. Payment of TSh 400,000 via M-Pesa within 24 hours of delivery.",
    amount: 400000,
    currency: "TSh",
    startDate: "2026-04-28",
    endDate: "2026-05-05",
    status: "active",
    creatorSignedAt: "2026-04-28",
    counterpartySignedAt: "2026-04-29",
    createdAt: "2026-04-28",
    updatedAt: "2026-04-29",
  },
  {
    id: "c2",
    creatorId: "u1",
    counterpartyId: "u3",
    templateType: "service_agreement",
    title: "Tractor Plowing — 3 Acres, South Field",
    partiesNames: ["Juma Mwanafunzi", "Ali Tractor Services"],
    terms:
      "Provider agrees to plow 3 acres at South Field, Dodoma using tractor on 12th May 2026. Rate: TSh 35,000 per acre. Total payable after service completion.",
    amount: 105000,
    currency: "TSh",
    startDate: "2026-05-12",
    endDate: "2026-05-12",
    status: "draft",
    creatorSignedAt: "2026-05-01",
    createdAt: "2026-05-01",
    updatedAt: "2026-05-01",
  },
];

const STATUS_STYLES: Record<ContractStatus, string> = {
  draft: "bg-muted text-muted-foreground",
  active: "bg-emerald-100 text-emerald-700",
  completed: "bg-blue-100 text-blue-700",
  disputed: "bg-red-100 text-red-700",
  cancelled: "bg-muted text-muted-foreground",
};

const TEMPLATE_LABELS: Record<ContractTemplate, string> = {
  crop_sale: "Crop Sale",
  service_agreement: "Service",
  delivery_agreement: "Delivery",
  livestock_sale: "Livestock",
  custom: "Custom",
};

type FilterTab = "all" | ContractStatus;

const FILTER_TABS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "draft", label: "Draft" },
  { key: "active", label: "Active" },
  { key: "completed", label: "Completed" },
];

export default function ContractsPage() {
  const { t } = useLanguageStore();
  const [contracts, setContracts] =
    useState<DigitalContract[]>(SAMPLE_CONTRACTS);
  const [filterTab, setFilterTab] = useState<FilterTab>("all");
  const [showCreate, setShowCreate] = useState(false);
  const [viewContract, setViewContract] = useState<DigitalContract | null>(
    null,
  );
  const [toast, setToast] = useState<string | null>(null);

  // Create form state
  const [formTemplate, setFormTemplate] =
    useState<ContractTemplate>("crop_sale");
  const [formTitle, setFormTitle] = useState("");
  const [formCounterparty, setFormCounterparty] = useState("");
  const [formTerms, setFormTerms] = useState("");
  const [formAmount, setFormAmount] = useState("");
  const [formStart, setFormStart] = useState("");
  const [formEnd, setFormEnd] = useState("");

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  }

  function handleCreate() {
    if (!formTitle.trim() || !formCounterparty.trim()) return;
    const contract: DigitalContract = {
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
      creatorSignedAt: new Date().toISOString().slice(0, 10),
      createdAt: new Date().toISOString().slice(0, 10),
      updatedAt: new Date().toISOString().slice(0, 10),
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

  function signContract(id: string) {
    setContracts((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const now = new Date().toISOString().slice(0, 10);
        if (c.creatorId === CURRENT_USER_ID) {
          const bothSigned = !!c.counterpartySignedAt;
          return {
            ...c,
            creatorSignedAt: now,
            status: bothSigned ? "active" : "draft",
            updatedAt: now,
          };
        }
        const bothSigned = !!c.creatorSignedAt;
        return {
          ...c,
          counterpartySignedAt: now,
          status: bothSigned ? "active" : "draft",
          updatedAt: now,
        };
      }),
    );
    showToast(t("contract_signed"));
    setViewContract(null);
  }

  const filtered =
    filterTab === "all"
      ? contracts
      : contracts.filter((c) => c.status === filterTab);

  const templates: ContractTemplate[] = [
    "crop_sale",
    "service_agreement",
    "delivery_agreement",
    "livestock_sale",
    "custom",
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background" data-ocid="contracts.page">
        {/* Header */}
        <div className="bg-card border-b px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            <div className="flex items-center gap-2">
              <FileSignature className="text-primary" size={22} />
              <h1 className="text-lg font-bold text-foreground">
                {t("contracts")}
              </h1>
            </div>
            <Button
              size="sm"
              onClick={() => setShowCreate(true)}
              data-ocid="contracts.create_button"
            >
              <Plus size={16} className="mr-1" /> {t("create_contract")}
            </Button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
          {/* Filter Tabs */}
          <div
            className="flex gap-1.5 overflow-x-auto pb-0.5"
            data-ocid="contracts.filter.tab"
          >
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setFilterTab(tab.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  filterTab === tab.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                }`}
                data-ocid={`contracts.filter.${tab.key}`}
              >
                {tab.key === "all"
                  ? t("all_records")
                  : t(`contract_${tab.key}` as Parameters<typeof t>[0])}
              </button>
            ))}
          </div>

          {/* Contract List */}
          {filtered.length === 0 ? (
            <div
              className="text-center py-16 space-y-3"
              data-ocid="contracts.empty_state"
            >
              <FileSignature
                className="mx-auto text-muted-foreground/40"
                size={48}
              />
              <p className="text-muted-foreground">{t("no_contracts")}</p>
              <Button size="sm" onClick={() => setShowCreate(true)}>
                <Plus size={14} className="mr-1" /> {t("create_contract")}
              </Button>
            </div>
          ) : (
            filtered.map((contract, i) => (
              <div
                key={contract.id}
                className="bg-card rounded-xl border p-4 space-y-3"
                data-ocid={`contracts.item.${i + 1}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className="text-xs bg-muted text-muted-foreground">
                        {TEMPLATE_LABELS[contract.templateType]}
                      </Badge>
                    </div>
                    <p className="font-semibold text-foreground mt-1">
                      {contract.title}
                    </p>
                  </div>
                  <Badge
                    className={`text-xs shrink-0 ${STATUS_STYLES[contract.status]}`}
                  >
                    {t(
                      `contract_${contract.status}` as Parameters<typeof t>[0],
                    )}
                  </Badge>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {contract.partiesNames.map((name) => (
                    <span
                      key={name}
                      className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground"
                    >
                      {name}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {contract.terms}
                </p>

                <div className="flex items-center justify-between flex-wrap gap-2">
                  <p className="text-sm font-bold text-primary">
                    TSh {contract.amount.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-3">
                    {/* Signing indicators */}
                    <div className="flex items-center gap-2">
                      {contract.creatorSignedAt ? (
                        <div className="flex items-center gap-0.5 text-xs text-emerald-600">
                          <CheckCircle2 size={11} />
                          <span>{contract.partiesNames[0]?.split(" ")[0]}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-0.5 text-xs text-muted-foreground">
                          <Clock size={11} />
                          <span>{contract.partiesNames[0]?.split(" ")[0]}</span>
                        </div>
                      )}
                      {contract.counterpartySignedAt ? (
                        <div className="flex items-center gap-0.5 text-xs text-emerald-600">
                          <CheckCircle2 size={11} />
                          <span>{contract.partiesNames[1]?.split(" ")[0]}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-0.5 text-xs text-muted-foreground">
                          <Clock size={11} />
                          <span>{contract.partiesNames[1]?.split(" ")[0]}</span>
                        </div>
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setViewContract(contract)}
                      data-ocid={`contracts.view_button.${i + 1}`}
                    >
                      {t("viewProfile")}
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Create Contract Modal */}
        {showCreate && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
            <div
              className="bg-card border rounded-2xl w-full max-w-md shadow-xl max-h-[90vh] flex flex-col"
              data-ocid="contracts.create_dialog"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b shrink-0">
                <h2 className="font-bold text-foreground">
                  {t("create_contract")}
                </h2>
                <button
                  type="button"
                  onClick={() => setShowCreate(false)}
                  data-ocid="contracts.create_close_button"
                >
                  <X size={20} className="text-muted-foreground" />
                </button>
              </div>
              <div className="px-5 py-4 space-y-4 overflow-y-auto">
                <div className="space-y-1.5">
                  <label
                    className="text-sm font-medium text-foreground"
                    htmlFor="contract-template-select"
                  >
                    {t("contract_template")}
                  </label>
                  <div className="relative">
                    <select
                      className="w-full bg-background border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40 appearance-none"
                      value={formTemplate}
                      onChange={(e) =>
                        setFormTemplate(e.target.value as ContractTemplate)
                      }
                      data-ocid="contracts.template_select"
                      id="contract-template-select"
                    >
                      {templates.map((tmpl) => (
                        <option key={tmpl} value={tmpl}>
                          {t(
                            `template_${tmpl === "service_agreement" ? "service" : tmpl === "delivery_agreement" ? "delivery" : tmpl === "livestock_sale" ? "livestock" : tmpl === "crop_sale" ? "crop_sale" : "custom"}` as Parameters<
                              typeof t
                            >[0],
                          )}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label
                    className="text-sm font-medium text-foreground"
                    htmlFor="contract-title-input"
                  >
                    {t("record_title")}
                  </label>
                  <input
                    className="w-full bg-background border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                    placeholder="e.g. Maize Sale — 500kg"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    data-ocid="contracts.title_input"
                    id="contract-title-input"
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    className="text-sm font-medium text-foreground"
                    htmlFor="contract-counterparty-input"
                  >
                    {t("counterparty")}
                  </label>
                  <input
                    className="w-full bg-background border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                    placeholder="Name / contact"
                    value={formCounterparty}
                    onChange={(e) => setFormCounterparty(e.target.value)}
                    data-ocid="contracts.counterparty_input"
                    id="contract-counterparty-input"
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    className="text-sm font-medium text-foreground"
                    htmlFor="contract-terms-textarea"
                  >
                    {t("contract_terms")}
                  </label>
                  <textarea
                    className="w-full bg-background border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                    rows={4}
                    placeholder={t("contract_terms")}
                    value={formTerms}
                    onChange={(e) => setFormTerms(e.target.value)}
                    data-ocid="contracts.terms_textarea"
                    id="contract-terms-textarea"
                  />
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <div className="space-y-1.5">
                    <label
                      className="text-sm font-medium text-foreground"
                      htmlFor="contract-amount-input"
                    >
                      {t("contract_amount")} (TSh)
                    </label>
                    <input
                      className="w-full bg-background border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                      type="number"
                      placeholder="0"
                      value={formAmount}
                      onChange={(e) => setFormAmount(e.target.value)}
                      data-ocid="contracts.amount_input"
                      id="contract-amount-input"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contract-start-input"
                      className="text-sm font-medium text-foreground"
                    >
                      {t("eventDate")} (Start)
                    </label>
                    <input
                      id="contract-start-input"
                      className="w-full bg-background border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                      type="date"
                      value={formStart}
                      onChange={(e) => setFormStart(e.target.value)}
                      data-ocid="contracts.start_date_input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contract-end-input"
                      className="text-sm font-medium text-foreground"
                    >
                      {t("eventDate")} (End)
                    </label>
                    <input
                      id="contract-end-input"
                      className="w-full bg-background border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                      type="date"
                      value={formEnd}
                      onChange={(e) => setFormEnd(e.target.value)}
                      data-ocid="contracts.end_date_input"
                    />
                  </div>
                </div>
              </div>
              <div className="px-5 py-4 border-t flex gap-3 shrink-0">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowCreate(false)}
                  data-ocid="contracts.create_cancel_button"
                >
                  {t("cancel")}
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleCreate}
                  disabled={!formTitle.trim() || !formCounterparty.trim()}
                  data-ocid="contracts.create_submit_button"
                >
                  {t("create_contract")}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* View/Sign Contract Modal */}
        {viewContract && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
            <div
              className="bg-card border rounded-2xl w-full max-w-md shadow-xl max-h-[90vh] flex flex-col"
              data-ocid="contracts.view_dialog"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b shrink-0">
                <h2 className="font-bold text-foreground truncate max-w-[260px]">
                  {viewContract.title}
                </h2>
                <button
                  type="button"
                  onClick={() => setViewContract(null)}
                  data-ocid="contracts.view_close_button"
                >
                  <X size={20} className="text-muted-foreground" />
                </button>
              </div>
              <div className="px-5 py-4 space-y-4 overflow-y-auto">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className="text-xs bg-muted text-muted-foreground">
                    {TEMPLATE_LABELS[viewContract.templateType]}
                  </Badge>
                  <Badge
                    className={`text-xs ${STATUS_STYLES[viewContract.status]}`}
                  >
                    {t(
                      `contract_${viewContract.status}` as Parameters<
                        typeof t
                      >[0],
                    )}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {t("parties")}
                  </p>
                  <div className="flex gap-2">
                    {viewContract.partiesNames.map((name) => (
                      <span
                        key={name}
                        className="text-sm bg-muted px-2 py-1 rounded text-foreground"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {t("contract_terms")}
                  </p>
                  <p className="text-sm text-foreground bg-muted/40 rounded-lg p-3 leading-relaxed">
                    {viewContract.terms}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {t("contract_amount")}
                    </p>
                    <p className="font-bold text-primary">
                      TSh {viewContract.amount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {t("eventDate")}
                    </p>
                    <p className="text-sm text-foreground">
                      {viewContract.startDate} → {viewContract.endDate}
                    </p>
                  </div>
                </div>

                {/* Signing Status */}
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {t("contract_signed")}
                  </p>
                  <div className="space-y-2">
                    {viewContract.partiesNames.map((name, idx) => {
                      const signed =
                        idx === 0
                          ? viewContract.creatorSignedAt
                          : viewContract.counterpartySignedAt;
                      return (
                        <div
                          key={name}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm text-foreground">
                            {name}
                          </span>
                          {signed ? (
                            <div className="flex items-center gap-1 text-xs text-emerald-600">
                              <CheckCircle2 size={13} /> {signed}
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock size={13} /> {t("pending")}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {viewContract.creatorSignedAt &&
                  viewContract.counterpartySignedAt && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-sm text-emerald-700 flex items-center gap-2">
                      <CheckCircle2 size={16} /> {t("both_signed")}
                    </div>
                  )}
              </div>

              {/* Sign button — show only if not already signed by current user */}
              {!viewContract.creatorSignedAt && (
                <div className="px-5 py-4 border-t shrink-0">
                  <Button
                    className="w-full"
                    onClick={() => signContract(viewContract.id)}
                    data-ocid="contracts.sign_button"
                  >
                    <FileSignature size={15} className="mr-2" />{" "}
                    {t("sign_contract")}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Toast */}
        {toast && (
          <div
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-foreground text-background px-4 py-2 rounded-full text-sm shadow-lg"
            data-ocid="contracts.toast"
          >
            {toast}
          </div>
        )}
      </div>
    </Layout>
  );
}
