import { ForecastCard, type ForecastRecord } from "@/components/ForecastCard";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useLanguageStore } from "@/store/languageStore";
import { BarChart2, Leaf, Milk, Plus, TrendingUp, X } from "lucide-react";
import { useState } from "react";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const CROP_FORECASTS: ForecastRecord[] = [
  {
    id: "fc_1",
    userId: "u1",
    forecastType: "crop_yield",
    title: "Maize Yield — Mbeya North Field",
    predictedValue: 3.2,
    unit: "tons",
    confidenceScore: 85,
    keyDrivers: ["Good rainfall", "DAP fertilizer", "Early planting"],
    monthlyBreakdown: [
      { month: "Jan", value: 0.0 },
      { month: "Feb", value: 0.1 },
      { month: "Mar", value: 0.4 },
      { month: "Apr", value: 0.9 },
      { month: "May", value: 1.2 },
      { month: "Jun", value: 0.6 },
    ],
    sensitivityNote:
      "A 10% reduction in rainfall during March–April could lower yield by up to 18%. Irrigate as a contingency.",
    basedOn: {
      weatherScore: 88,
      soilScore: 82,
      feedingScore: 70,
      historyScore: 91,
    },
    createdAt: new Date().toISOString(),
    validUntil: new Date(Date.now() + 60 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: "fc_2",
    userId: "u1",
    forecastType: "crop_yield",
    title: "Beans Yield — Iringa East Plot",
    predictedValue: 1.8,
    unit: "tons",
    confidenceScore: 73,
    keyDrivers: ["Soil phosphorus", "Average rainfall", "Crop rotation"],
    monthlyBreakdown: [
      { month: "Jan", value: 0.0 },
      { month: "Feb", value: 0.2 },
      { month: "Mar", value: 0.5 },
      { month: "Apr", value: 0.7 },
      { month: "May", value: 0.4 },
      { month: "Jun", value: 0.0 },
    ],
    sensitivityNote:
      "Bean rust risk is elevated this season. Preventive fungicide application before April could protect up to 20% of predicted yield.",
    basedOn: {
      weatherScore: 72,
      soilScore: 78,
      feedingScore: 65,
      historyScore: 80,
    },
    createdAt: new Date().toISOString(),
    validUntil: new Date(Date.now() + 45 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: "fc_3",
    userId: "u1",
    forecastType: "crop_yield",
    title: "Sunflower Yield — Dodoma Plot",
    predictedValue: 0.9,
    unit: "tons",
    confidenceScore: 58,
    keyDrivers: ["Dry season risk", "Sandy soil", "Limited irrigation"],
    monthlyBreakdown: [
      { month: "Mar", value: 0.0 },
      { month: "Apr", value: 0.1 },
      { month: "May", value: 0.3 },
      { month: "Jun", value: 0.4 },
      { month: "Jul", value: 0.1 },
    ],
    sensitivityNote:
      "Low confidence due to unpredictable dry season patterns in Dodoma. Consider supplemental irrigation to boost confidence above 70%.",
    basedOn: {
      weatherScore: 51,
      soilScore: 60,
      feedingScore: 55,
      historyScore: 64,
    },
    createdAt: new Date().toISOString(),
    validUntil: new Date(Date.now() + 90 * 24 * 3600 * 1000).toISOString(),
  },
];

const LIVESTOCK_FORECASTS: ForecastRecord[] = [
  {
    id: "lfc_1",
    userId: "u2",
    forecastType: "milk_production",
    title: "Friesian Cattle — Milk Production",
    predictedValue: 450,
    unit: "L/month",
    confidenceScore: 78,
    keyDrivers: ["Quality feed", "Vet check", "Season timing"],
    monthlyBreakdown: [
      { month: "Jan", value: 420 },
      { month: "Feb", value: 440 },
      { month: "Mar", value: 460 },
      { month: "Apr", value: 450 },
      { month: "May", value: 430 },
      { month: "Jun", value: 410 },
    ],
    sensitivityNote:
      "Adding mineral block supplementation could push monthly milk output 8–12% higher. Heat stress above 32°C can reduce yield by 15%.",
    basedOn: {
      weatherScore: 75,
      soilScore: 60,
      feedingScore: 88,
      historyScore: 82,
    },
    createdAt: new Date().toISOString(),
    validUntil: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: "lfc_2",
    userId: "u2",
    forecastType: "egg_production",
    title: "Layer Poultry — Egg Production",
    predictedValue: 2400,
    unit: "eggs/month",
    confidenceScore: 82,
    keyDrivers: ["Layer feed", "Controlled lighting", "Low disease risk"],
    monthlyBreakdown: [
      { month: "Jan", value: 2200 },
      { month: "Feb", value: 2350 },
      { month: "Mar", value: 2400 },
      { month: "Apr", value: 2380 },
      { month: "May", value: 2300 },
      { month: "Jun", value: 2250 },
    ],
    sensitivityNote:
      "Consistent lighting (16 hrs/day) and Marek's disease vaccination are the two single largest factors for maintaining this output level.",
    basedOn: {
      weatherScore: 80,
      soilScore: 55,
      feedingScore: 92,
      historyScore: 86,
    },
    createdAt: new Date().toISOString(),
    validUntil: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: "lfc_3",
    userId: "u2",
    forecastType: "livestock_weight",
    title: "Goat Growth — Weight Gain Forecast",
    predictedValue: 4.5,
    unit: "kg/month",
    confidenceScore: 65,
    keyDrivers: ["Browse quality", "Dry season grazing", "Breed type"],
    monthlyBreakdown: [
      { month: "Jan", value: 4.8 },
      { month: "Feb", value: 5.0 },
      { month: "Mar", value: 4.5 },
      { month: "Apr", value: 4.2 },
      { month: "May", value: 3.9 },
      { month: "Jun", value: 3.5 },
    ],
    sensitivityNote:
      "Weight gain is expected to dip in the dry months (May–July). Supplement with concentrate feed to maintain above 4 kg/month.",
    basedOn: {
      weatherScore: 62,
      soilScore: 68,
      feedingScore: 72,
      historyScore: 70,
    },
    createdAt: new Date().toISOString(),
    validUntil: new Date(Date.now() + 60 * 24 * 3600 * 1000).toISOString(),
  },
];

// ─── Generate Forecast Modal ──────────────────────────────────────────────────

const FORECAST_TYPES = [
  { value: "crop_yield", labelEn: "Crop Yield", labelSw: "Mavuno ya Mazao" },
  {
    value: "milk_production",
    labelEn: "Milk Production",
    labelSw: "Uzalishaji wa Maziwa",
  },
  {
    value: "egg_production",
    labelEn: "Egg Production",
    labelSw: "Uzalishaji wa Mayai",
  },
  {
    value: "livestock_weight",
    labelEn: "Livestock Weight",
    labelSw: "Uzito wa Mifugo",
  },
];

const REGIONS = [
  "Mbeya",
  "Iringa",
  "Dodoma",
  "Arusha",
  "Mwanza",
  "Dar es Salaam",
  "Morogoro",
  "Tanga",
  "Ruvuma",
  "Kilimanjaro",
];

function GenerateForecastModal({
  onClose,
  onGenerate,
}: {
  onClose: () => void;
  onGenerate: (type: string, subject: string, region: string) => void;
}) {
  const { language } = useLanguageStore();
  const [type, setType] = useState("crop_yield");
  const [subject, setSubject] = useState("");
  const [region, setRegion] = useState("Mbeya");
  const [loading, setLoading] = useState(false);

  const lang = language as "en" | "sw";

  async function handleSubmit() {
    if (!subject.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    onGenerate(type, subject.trim(), region);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 px-4 pb-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      role="presentation"
    >
      <div
        data-ocid="forecasting.generate_modal"
        className="bg-card rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-display font-bold text-base text-foreground">
            {lang === "sw" ? "Tengeneza Utabiri" : "Generate New Forecast"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-smooth"
            data-ocid="forecasting.generate_modal.close_button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-4 space-y-4">
          {/* Forecast type */}
          <div>
            <label
              htmlFor="fc-type"
              className="block text-xs font-medium text-foreground mb-1.5"
            >
              {lang === "sw" ? "Aina ya Utabiri" : "Forecast Type"}
            </label>
            <select
              id="fc-type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              data-ocid="forecasting.type_select"
              className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {FORECAST_TYPES.map((ft) => (
                <option key={ft.value} value={ft.value}>
                  {lang === "sw" ? ft.labelSw : ft.labelEn}
                </option>
              ))}
            </select>
          </div>
          {/* Crop/animal name */}
          <div>
            <label
              htmlFor="fc-subject"
              className="block text-xs font-medium text-foreground mb-1.5"
            >
              {lang === "sw" ? "Aina ya Zao / Mnyama" : "Crop / Animal Type"}
            </label>
            <input
              id="fc-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder={
                lang === "sw"
                  ? "mfano: Mahindi, Ng'ombe wa Friesian"
                  : "e.g. Maize, Friesian Cattle"
              }
              data-ocid="forecasting.subject_input"
              className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          {/* Region */}
          <div>
            <label
              htmlFor="fc-region"
              className="block text-xs font-medium text-foreground mb-1.5"
            >
              {lang === "sw" ? "Mkoa" : "Region"}
            </label>
            <select
              id="fc-region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              data-ocid="forecasting.region_select"
              className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {REGIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="px-4 pb-4 flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            data-ocid="forecasting.generate_modal.cancel_button"
          >
            {lang === "sw" ? "Ghairi" : "Cancel"}
          </Button>
          <Button
            className="flex-1"
            onClick={handleSubmit}
            disabled={!subject.trim() || loading}
            data-ocid="forecasting.generate_modal.submit_button"
          >
            {loading
              ? lang === "sw"
                ? "Inatengeneza..."
                : "Generating..."
              : lang === "sw"
                ? "Tengeneza"
                : "Generate"}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ForecastingPage() {
  const { language } = useLanguageStore();
  const { user } = useAuthStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [cropForecasts, setCropForecasts] =
    useState<ForecastRecord[]>(CROP_FORECASTS);
  const [livestockForecasts, setLivestockForecasts] =
    useState<ForecastRecord[]>(LIVESTOCK_FORECASTS);

  const lang = language as "en" | "sw";
  const role = user?.role ?? "farmer";
  const isFarmer = role === "farmer";
  const isLivestock = role === "livestock_keeper";

  function handleGenerate(type: string, subject: string, region: string) {
    const newRecord: ForecastRecord = {
      id: `fc_${Date.now()}`,
      userId: user?.id ?? "u1",
      forecastType: type as ForecastRecord["forecastType"],
      title: `${subject} — ${region}`,
      predictedValue:
        type === "milk_production"
          ? 380
          : type === "egg_production"
            ? 1800
            : type === "livestock_weight"
              ? 3.8
              : 2.1,
      unit:
        type === "milk_production"
          ? "L/month"
          : type === "egg_production"
            ? "eggs/month"
            : type === "livestock_weight"
              ? "kg/month"
              : "tons",
      confidenceScore: Math.floor(60 + Math.random() * 30),
      keyDrivers:
        lang === "sw"
          ? ["Hali ya hewa", "Udongo", "Historia ya shamba"]
          : ["Weather patterns", "Soil quality", "Farm history"],
      monthlyBreakdown: [
        { month: "M1", value: 1.0 },
        { month: "M2", value: 1.3 },
        { month: "M3", value: 1.8 },
        { month: "M4", value: 2.1 },
        { month: "M5", value: 1.9 },
        { month: "M6", value: 1.5 },
      ],
      sensitivityNote:
        lang === "sw"
          ? "Utabiri huu unategemea hali ya hewa ya wastani. Hali mbaya inaweza kupunguza matokeo."
          : "This forecast assumes average weather conditions. Adverse conditions may reduce outputs by up to 20%.",
      basedOn: {
        weatherScore: 70,
        soilScore: 75,
        feedingScore: 68,
        historyScore: 72,
      },
      createdAt: new Date().toISOString(),
      validUntil: new Date(Date.now() + 60 * 24 * 3600 * 1000).toISOString(),
    };
    if (
      ["milk_production", "egg_production", "livestock_weight"].includes(type)
    ) {
      setLivestockForecasts((prev) => [newRecord, ...prev]);
    } else {
      setCropForecasts((prev) => [newRecord, ...prev]);
    }
  }

  const showCropSection = isFarmer || (!isFarmer && !isLivestock);
  const showLivestockSection = isLivestock || (!isFarmer && !isLivestock);

  return (
    <Layout>
      <div className="px-4 py-4 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-lg font-display font-bold text-foreground flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              {lang === "sw"
                ? "Utabiri wa Mavuno na Uzalishaji"
                : "Harvest & Production Forecasting"}
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              {lang === "sw"
                ? "Matarajio ya AI kulingana na hali ya hewa, udongo na historia"
                : "AI-powered predictions based on weather, soil, and farm history"}
            </p>
          </div>
          <Button
            size="sm"
            className="gap-1.5 shrink-0"
            onClick={() => setModalOpen(true)}
            data-ocid="forecasting.generate_button"
          >
            <Plus className="w-3.5 h-3.5" />
            {lang === "sw" ? "Utabiri Mpya" : "New Forecast"}
          </Button>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-card border border-border rounded-xl p-3 text-center">
            <p className="text-xl font-display font-bold text-foreground">
              {cropForecasts.length + livestockForecasts.length}
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              {lang === "sw" ? "Utabiri Wote" : "Total Forecasts"}
            </p>
          </div>
          <div className="bg-card border border-border rounded-xl p-3 text-center">
            <p className="text-xl font-display font-bold text-green-600">
              {Math.round(
                [...cropForecasts, ...livestockForecasts].reduce(
                  (s, f) => s + f.confidenceScore,
                  0,
                ) /
                  (cropForecasts.length + livestockForecasts.length),
              )}
              %
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              {lang === "sw" ? "Uhakika wa Wastani" : "Avg Confidence"}
            </p>
          </div>
          <div className="bg-card border border-border rounded-xl p-3 text-center">
            <p className="text-xl font-display font-bold text-primary">
              {
                [...cropForecasts, ...livestockForecasts].filter(
                  (f) => f.confidenceScore >= 80,
                ).length
              }
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              {lang === "sw" ? "Uhakika Juu" : "High Confidence"}
            </p>
          </div>
        </div>

        {/* Crop Forecasts */}
        {showCropSection && (
          <section data-ocid="forecasting.crop_section">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center">
                <Leaf className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-foreground">
                  {lang === "sw" ? "Utabiri wa Mazao" : "Crop Forecasts"}
                </h2>
                <p className="text-[10px] text-muted-foreground">
                  {cropForecasts.length}{" "}
                  {lang === "sw" ? "utabiri unaotumika" : "active forecasts"}
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {cropForecasts.map((fc, i) => (
                <div
                  key={fc.id}
                  data-ocid={`forecasting.crop_forecast.${i + 1}`}
                >
                  <ForecastCard forecast={fc} defaultExpanded={i === 0} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Livestock Forecasts */}
        {showLivestockSection && (
          <section data-ocid="forecasting.livestock_section">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                <Milk className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-foreground">
                  {lang === "sw"
                    ? "Utabiri wa Uzalishaji wa Mifugo"
                    : "Livestock Production Forecasts"}
                </h2>
                <p className="text-[10px] text-muted-foreground">
                  {livestockForecasts.length}{" "}
                  {lang === "sw" ? "utabiri unaotumika" : "active forecasts"}
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {livestockForecasts.map((fc, i) => (
                <div
                  key={fc.id}
                  data-ocid={`forecasting.livestock_forecast.${i + 1}`}
                >
                  <ForecastCard forecast={fc} defaultExpanded={i === 0} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bottom summary CTA */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-center gap-3">
          <BarChart2 className="w-8 h-8 text-primary flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">
              {lang === "sw"
                ? "Angalia Uchambuzi wa Shamba"
                : "View Full Farm Analytics"}
            </p>
            <p className="text-[11px] text-muted-foreground">
              {lang === "sw"
                ? "Ripoti za kina na mwelekeo wa mauzo"
                : "Detailed reports, trends, and financial summaries"}
            </p>
          </div>
        </div>

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

      {modalOpen && (
        <GenerateForecastModal
          onClose={() => setModalOpen(false)}
          onGenerate={handleGenerate}
        />
      )}
    </Layout>
  );
}
