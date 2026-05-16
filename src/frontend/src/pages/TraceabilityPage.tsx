import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/store/languageStore";
import type { ProductTraceability } from "@/types";
import {
  ChevronRight,
  ExternalLink,
  Info,
  Link2,
  QrCode,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import { useState } from "react";

interface TracedProduct {
  id: string;
  listingId: string;
  productTitle: string;
  listingType: "crop" | "livestock" | "input";
  sellerName: string;
  sellerRole: string;
  sellerLocation: string;
  farmName: string;
  productionDate: string;
  trace: ProductTraceability;
}

const SAMPLE_PRODUCTS: TracedProduct[] = [
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
        "2026-04-23 — Listed on Namwala Marketplace",
      ],
      specialistNotes: [
        "Inspected by Agricultural Specialist Prof. Kibwana on 2026-04-21 — No disease detected. Certified Grade A quality.",
      ],
      orderChain: [
        "2026-04-25 — Fatuma Supplies Ltd purchased 500kg (Order #ORD-2026-001)",
        "2026-04-28 — Central Market Dodoma purchased 300kg (Order #ORD-2026-002)",
      ],
      qrCodeId: "QR-DMF-20260420-001",
      createdAt: "2026-04-22",
    },
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
        "2026-04-30 — Listed on Namwala Marketplace",
      ],
      specialistNotes: [
        "Examined by Dr. Rehema Kisanga (Veterinarian) on 2026-04-29 — Animals certified disease-free. Milk yield: 12L/day avg.",
      ],
      orderChain: [
        "2026-05-02 — Kilimanjaro Dairy Co-op inquired for 2 head (Negotiation in progress)",
      ],
      qrCodeId: "QR-NDF-20260430-002",
      createdAt: "2026-04-30",
    },
  },
];

const TYPE_STYLES: Record<string, string> = {
  crop: "bg-emerald-100 text-emerald-700",
  livestock: "bg-blue-100 text-blue-700",
  input: "bg-purple-100 text-purple-700",
};

export default function TraceabilityPage() {
  const { t } = useLanguageStore();
  const [query, setQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<TracedProduct | null>(
    null,
  );
  const [showQrPrompt, setShowQrPrompt] = useState(false);
  const [qrInput, setQrInput] = useState("");

  const results = query.trim()
    ? SAMPLE_PRODUCTS.filter(
        (p) =>
          p.productTitle.toLowerCase().includes(query.toLowerCase()) ||
          p.sellerName.toLowerCase().includes(query.toLowerCase()) ||
          p.trace.qrCodeId.toLowerCase().includes(query.toLowerCase()),
      )
    : SAMPLE_PRODUCTS;

  function handleQrSearch() {
    const found = SAMPLE_PRODUCTS.find(
      (p) => p.trace.qrCodeId.toLowerCase() === qrInput.trim().toLowerCase(),
    );
    if (found) {
      setSelectedProduct(found);
      setShowQrPrompt(false);
      setQrInput("");
    }
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background" data-ocid="traceability.page">
        {/* Header */}
        <div className="bg-card border-b px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center gap-2 max-w-2xl mx-auto">
            <Link2 className="text-primary" size={22} />
            <h1 className="text-lg font-bold text-foreground">
              {t("supply_chain")}
            </h1>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="flex-1 flex items-center bg-card border rounded-xl px-3 gap-2 focus-within:ring-2 focus-within:ring-primary/40">
              <Search size={16} className="text-muted-foreground shrink-0" />
              <input
                className="flex-1 py-2.5 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                placeholder={`${t("trace_product")} — ${t("traceability_id")}...`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                data-ocid="traceability.search_input"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <Button
              variant="outline"
              onClick={() => setShowQrPrompt(true)}
              data-ocid="traceability.qr_scan_button"
            >
              <QrCode size={16} className="mr-1.5" /> {t("qr_scan")}
            </Button>
          </div>

          {/* Results */}
          {results.length === 0 ? (
            <div
              className="text-center py-16"
              data-ocid="traceability.empty_state"
            >
              <Link2 className="mx-auto text-muted-foreground/40" size={48} />
              <p className="text-muted-foreground mt-3">{t("no_trace_data")}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {results.map((product, i) => (
                <div
                  key={product.id}
                  className="bg-card rounded-xl border p-4 space-y-2"
                  data-ocid={`traceability.result.${i + 1}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground">
                        {product.productTitle}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {product.sellerName} · {product.sellerLocation}
                      </p>
                    </div>
                    <Badge
                      className={`text-xs shrink-0 ${TYPE_STYLES[product.listingType]}`}
                    >
                      {product.listingType}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-mono text-muted-foreground">
                      {product.trace.qrCodeId}
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedProduct(product)}
                      data-ocid={`traceability.view_button.${i + 1}`}
                    >
                      {t("view_full_chain")}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Traceability Detail Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
            <div
              className="bg-card border rounded-2xl w-full max-w-md shadow-xl max-h-[92vh] flex flex-col"
              data-ocid="traceability.detail_dialog"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b shrink-0">
                <div className="min-w-0">
                  <h2 className="font-bold text-foreground truncate">
                    {selectedProduct.productTitle}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {t("traceability_id")}: {selectedProduct.trace.qrCodeId}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  data-ocid="traceability.detail_close_button"
                >
                  <X size={20} className="text-muted-foreground" />
                </button>
              </div>

              <div className="px-5 py-4 space-y-5 overflow-y-auto">
                {/* Origin Card */}
                <div className="bg-muted/40 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <Info size={12} /> {t("product_origin")}
                  </div>
                  <p className="font-semibold text-foreground">
                    {selectedProduct.farmName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedProduct.sellerName} · {selectedProduct.sellerRole}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    📍 {selectedProduct.sellerLocation}
                  </p>
                </div>

                {/* Production Timeline */}
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {t("production_history")}
                  </p>
                  <div className="relative space-y-0">
                    {selectedProduct.trace.productionHistory.map((event, i) => (
                      <div
                        key={event}
                        className="flex items-start gap-3 pb-3"
                        data-ocid={`traceability.history.${i + 1}`}
                      >
                        <div className="flex flex-col items-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-primary mt-1 shrink-0" />
                          {i <
                            selectedProduct.trace.productionHistory.length -
                              1 && (
                            <div
                              className="w-0.5 flex-1 bg-border mt-1"
                              style={{ minHeight: 16 }}
                            />
                          )}
                        </div>
                        <p className="text-sm text-foreground leading-relaxed">
                          {event}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specialist Notes */}
                {selectedProduct.trace.specialistNotes.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {t("specialistNotes")}
                    </p>
                    {selectedProduct.trace.specialistNotes.map((note, i) => (
                      <div
                        key={note}
                        className="bg-emerald-50 border border-emerald-200 rounded-lg p-3"
                        data-ocid={`traceability.specialist_note.${i + 1}`}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <ShieldCheck size={13} className="text-emerald-600" />
                          <span className="text-xs font-semibold text-emerald-700">
                            {t("confirmed")}
                          </span>
                        </div>
                        <p className="text-sm text-emerald-800">{note}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Order Chain */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {t("supply_chain")}
                  </p>
                  {selectedProduct.trace.orderChain.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      {t("noData")}
                    </p>
                  ) : (
                    <div className="divide-y rounded-lg border overflow-hidden">
                      {selectedProduct.trace.orderChain.map((order, i) => (
                        <div
                          key={order}
                          className="flex items-center gap-2 px-3 py-2.5 bg-card"
                          data-ocid={`traceability.chain.${i + 1}`}
                        >
                          <ChevronRight
                            size={14}
                            className="text-muted-foreground shrink-0"
                          />
                          <p className="text-sm text-foreground">{order}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* QR ID display */}
                <div className="bg-muted/40 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {t("traceability_id")}
                    </p>
                    <p className="font-mono text-sm font-bold text-primary">
                      {selectedProduct.trace.qrCodeId}
                    </p>
                  </div>
                  <QrCode size={32} className="text-muted-foreground/50" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* QR Code Input Prompt */}
        {showQrPrompt && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
            <div
              className="bg-card border rounded-2xl w-full max-w-sm shadow-xl"
              data-ocid="traceability.qr_dialog"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b">
                <h2 className="font-bold text-foreground">{t("qr_scan")}</h2>
                <button
                  type="button"
                  onClick={() => setShowQrPrompt(false)}
                  data-ocid="traceability.qr_close_button"
                >
                  <X size={20} className="text-muted-foreground" />
                </button>
              </div>
              <div className="px-5 py-4 space-y-3">
                <p className="text-sm text-muted-foreground">
                  {t("traceability_id")}
                </p>
                <input
                  className="w-full bg-background border rounded-lg px-3 py-2.5 text-sm font-mono uppercase text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-2 focus:ring-primary/40 tracking-widest"
                  placeholder="QR-XXX-00000000-000"
                  value={qrInput}
                  onChange={(e) => setQrInput(e.target.value.toUpperCase())}
                  data-ocid="traceability.qr_input"
                />
              </div>
              <div className="px-5 py-4 border-t flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowQrPrompt(false)}
                  data-ocid="traceability.qr_cancel_button"
                >
                  {t("cancel")}
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleQrSearch}
                  disabled={!qrInput.trim()}
                  data-ocid="traceability.qr_confirm_button"
                >
                  {t("trace_product")}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
