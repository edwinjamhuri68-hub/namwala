import { IrrigationRecommendationCard } from "@/components/IrrigationRecommendationCard";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthStore } from "@/store/authStore";
import { useLanguageStore } from "@/store/languageStore";
import type {
  IrrigationLog,
  IrrigationRecommendation,
} from "@/types/irrigation";
import {
  AlertTriangle,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  CloudRain,
  Droplets,
  FlaskConical,
  Lightbulb,
  Plus,
  RefreshCw,
  Sprout,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Mock seed data ───────────────────────────────────────────────────────────

const MOCK_RECOMMENDATIONS: IrrigationRecommendation[] = [
  {
    id: "irr_01",
    userId: "u1",
    cropType: "Maize",
    region: "Mbeya",
    schedule: {
      frequencyPerWeek: 3,
      durationMinutes: 45,
      bestTimeOfDay: "early_morning",
    },
    reasoning:
      "Soil moisture readings are below 35% in the Mbeya highland zone. Combined with a dry forecast for the next 10 days and the active growing season, maize requires consistent irrigation to prevent water stress during tasselling. Early morning watering minimises evaporation losses by up to 40% compared to midday watering.",
    estimatedWaterSavingPercent: 28,
    yieldImpactPercent: 19,
    basedOn: {
      soilMoisture: "low",
      weatherForecast: "dry",
      seasonalCondition: "growing",
    },
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    validUntil: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    hasSetReminder: true,
  },
  {
    id: "irr_02",
    userId: "u1",
    cropType: "Beans",
    region: "Mbeya",
    schedule: {
      frequencyPerWeek: 2,
      durationMinutes: 30,
      bestTimeOfDay: "evening",
    },
    reasoning:
      "Bean fields show moderate soil moisture but the planting season is transitioning into dry conditions. A reduced irrigation schedule (2x per week) helps maintain soil moisture without over-saturating, which can cause root rot in bean varieties. Evening watering reduces leaf scorch risk.",
    estimatedWaterSavingPercent: 22,
    yieldImpactPercent: 14,
    basedOn: {
      soilMoisture: "moderate",
      weatherForecast: "moderate",
      seasonalCondition: "planting",
    },
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    hasSetReminder: false,
  },
];

const MOCK_LOGS: IrrigationLog[] = [
  {
    id: "log_01",
    userId: "u1",
    recommendationId: "irr_01",
    followedOn: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    actualWaterUseLiters: 240,
    notes: "Irrigation went well. Soil looked much better after.",
    cropType: "Maize",
  },
  {
    id: "log_02",
    userId: "u1",
    recommendationId: "irr_01",
    followedOn: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    actualWaterUseLiters: 260,
    notes: "Used slightly more due to wind drying the topsoil faster.",
    cropType: "Maize",
  },
  {
    id: "log_03",
    userId: "u1",
    recommendationId: "irr_02",
    followedOn: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    actualWaterUseLiters: 150,
    notes: "",
    cropType: "Beans",
  },
  {
    id: "log_04",
    userId: "u1",
    recommendationId: "irr_02",
    followedOn: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    actualWaterUseLiters: 145,
    notes: "Reduced slightly — some cloud cover lowered evaporation.",
    cropType: "Beans",
  },
];

const TANZANIAN_REGIONS = [
  "Mbeya",
  "Iringa",
  "Arusha",
  "Kilimanjaro",
  "Dar es Salaam",
  "Dodoma",
  "Morogoro",
  "Mwanza",
  "Tanga",
  "Kagera",
  "Ruvuma",
  "Njombe",
  "Singida",
];

const CROP_OPTIONS = [
  "Maize",
  "Beans",
  "Rice",
  "Sunflower",
  "Sorghum",
  "Sweet Potato",
  "Cassava",
  "Tomatoes",
  "Onions",
  "Cabbage",
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function IrrigationPage() {
  const { user } = useAuthStore();
  const { language } = useLanguageStore();
  const lbl = (en: string, sw: string) => (language === "sw" ? sw : en);

  const [recommendations, setRecommendations] =
    useState<IrrigationRecommendation[]>(MOCK_RECOMMENDATIONS);
  const [logs, setLogs] = useState<IrrigationLog[]>(MOCK_LOGS);
  const [generateOpen, setGenerateOpen] = useState(false);
  const [genCrop, setGenCrop] = useState("");
  const [genRegion, setGenRegion] = useState(user?.location ?? "Mbeya");
  const [generating, setGenerating] = useState(false);

  function handleReminderToggle(id: string, value: boolean) {
    setRecommendations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, hasSetReminder: value } : r)),
    );
    toast.success(
      value
        ? lbl("Reminder set!", "Kumbusho kimewekwa!")
        : lbl("Reminder removed", "Kumbusho limeondolewa"),
    );
  }

  function handleLogUsage(id: string, liters: number, notes: string) {
    const rec = recommendations.find((r) => r.id === id);
    const newLog: IrrigationLog = {
      id: `log_${Date.now()}`,
      userId: user?.id ?? "u1",
      recommendationId: id,
      followedOn: new Date().toISOString(),
      actualWaterUseLiters: liters,
      notes,
      cropType: rec?.cropType ?? "Crop",
    };
    setLogs((prev) => [newLog, ...prev]);
    toast.success(lbl("Usage logged!", "Matumizi yamerekodiwa!"));
  }

  async function handleGenerate() {
    if (!genCrop || !genRegion) return;
    setGenerating(true);
    // Simulate async generation
    await new Promise((res) => setTimeout(res, 1200));
    const newRec: IrrigationRecommendation = {
      id: `irr_${Date.now()}`,
      userId: user?.id ?? "u1",
      cropType: genCrop,
      region: genRegion,
      schedule: {
        frequencyPerWeek: Math.floor(Math.random() * 2) + 2,
        durationMinutes: Math.floor(Math.random() * 30) + 25,
        bestTimeOfDay: "early_morning",
      },
      reasoning: lbl(
        `Based on current soil moisture, weather conditions, and the ${genCrop} growth cycle in ${genRegion}, this irrigation schedule is designed to maintain optimal water balance while minimising waste. Early morning irrigation is recommended to reduce evaporation losses.`,
        `Kulingana na unyevu wa sasa wa udongo, hali ya hewa, na mzunguko wa ukuaji wa ${genCrop} huko ${genRegion}, ratiba hii ya umwagiliaji imeundwa kudumisha uwiano bora wa maji huku kupunguza upotevu. Umwagiliaji wa asubuhi mapema unapendekezwa kupunguza uvukizi.`,
      ),
      estimatedWaterSavingPercent: Math.floor(Math.random() * 15) + 15,
      yieldImpactPercent: Math.floor(Math.random() * 12) + 10,
      basedOn: {
        soilMoisture: "low",
        weatherForecast: "dry",
        seasonalCondition: "growing",
      },
      createdAt: new Date().toISOString(),
      validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      hasSetReminder: false,
    };
    setRecommendations((prev) => [newRec, ...prev]);
    setGenerating(false);
    setGenerateOpen(false);
    toast.success(
      lbl("New recommendation generated!", "Mapendekezo mapya yamezalishwa!"),
    );
  }

  const TIPS = [
    {
      icon: <Droplets className="w-4 h-4 text-cyan-500" />,
      title: lbl(
        "Drip Irrigation Saves Water",
        "Umwagiliaji wa Matone Unaokoa Maji",
      ),
      body: lbl(
        "Drip irrigation delivers water directly to roots, reducing evaporation by up to 50% compared to flood irrigation. Ideal for maize, beans, and vegetables in dry regions.",
        "Umwagiliaji wa matone hutoa maji moja kwa moja kwenye mizizi, kupunguza uvukizi kwa hadi 50% ikilinganishwa na umwagiliaji wa mafuriko. Inafaa kwa mahindi, maharage, na mboga katika maeneo kame.",
      ),
    },
    {
      icon: <CalendarDays className="w-4 h-4 text-blue-500" />,
      title: lbl("Water in the Early Morning", "Mwagilia Asubuhi Mapema"),
      body: lbl(
        "Watering between 5–8am reduces evaporation loss significantly. Midday watering wastes up to 30% of water through evaporation, and evening watering can promote fungal diseases.",
        "Kumwagilia kati ya saa 11pm–2am (asubuhi) hupunguza upotevu wa uvukizi kwa kiasi kikubwa. Umwagiliaji wa mchana hupoteza hadi 30% ya maji kupitia uvukizi, na umwagiliaji wa jioni unaweza kukuza magonjwa ya kuvu.",
      ),
    },
    {
      icon: <FlaskConical className="w-4 h-4 text-amber-500" />,
      title: lbl(
        "Check Soil Moisture First",
        "Angalia Unyevu wa Udongo Kwanza",
      ),
      body: lbl(
        "Before irrigating, push two fingers 5cm into the soil. If it feels dry at that depth, irrigate. If it feels moist, wait another day. Over-irrigation causes root rot and wastes water.",
        "Kabla ya kumwagilia, ingiza vidole viwili sentimita 5 kwenye udongo. Ikiwa inahisi kame kwa kina hicho, mwagilia. Ikiwa inahisi unyevu, subiri siku moja zaidi. Umwagiliaji kupita kiasi husababisha kuoza kwa mizizi na kupoteza maji.",
      ),
    },
  ];

  return (
    <Layout>
      <div className="px-4 py-4 space-y-5 max-w-md mx-auto">
        {/* Header */}
        <div
          className="relative rounded-xl overflow-hidden"
          data-ocid="irrigation.page"
        >
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-5 rounded-xl">
            <div className="flex items-center gap-2.5 mb-1">
              <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-display font-bold text-white">
                  {lbl("Smart Irrigation", "Umwagiliaji Mahiri")}
                </h1>
                <p className="text-xs text-white/80">
                  {lbl(
                    "AI-powered water management",
                    "Usimamizi wa maji unaotumia AI",
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Current recommendation */}
        <section data-ocid="irrigation.current_recommendation_section">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <Sprout className="w-4 h-4 text-primary" />
              {lbl("Current Recommendations", "Mapendekezo ya Sasa")}
            </h2>
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-xs gap-1 border-cyan-300 text-cyan-700 hover:bg-cyan-50"
              onClick={() => setGenerateOpen(true)}
              data-ocid="irrigation.generate_button"
            >
              <Plus className="w-3.5 h-3.5" />
              {lbl("Generate New", "Zalia Mpya")}
            </Button>
          </div>
          {recommendations.some((r) => r.basedOn.weatherForecast === "dry") && (
            <div
              data-ocid="irrigation.drought_warning_banner"
              className="flex items-start gap-2.5 bg-amber-50 border border-amber-300 rounded-xl p-3 mb-1"
            >
              <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs font-semibold text-amber-800">
                {lbl(
                  "Drought Warning — Schedule irrigation soon",
                  "Onyo la Ukame — Panga umwagiliaji haraka",
                )}
              </p>
            </div>
          )}
          {recommendations.some(
            (r) => r.basedOn.weatherForecast === "rain",
          ) && (
            <div
              data-ocid="irrigation.rain_expected_banner"
              className="flex items-start gap-2.5 bg-blue-50 border border-blue-300 rounded-xl p-3 mb-1"
            >
              <CloudRain className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs font-semibold text-blue-800">
                {lbl(
                  "Rain Expected — Hold off on irrigation this week",
                  "Mvua Inatarajiwa — Subiri umwagiliaji wiki hii",
                )}
              </p>
            </div>
          )}
          <div className="space-y-3">
            {recommendations.slice(0, 3).map((rec, i) => (
              <div
                key={rec.id}
                data-ocid={`irrigation.recommendation.${i + 1}`}
              >
                <IrrigationRecommendationCard
                  recommendation={rec}
                  onReminderToggle={handleReminderToggle}
                  onLogUsage={handleLogUsage}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Irrigation history log */}
        <section data-ocid="irrigation.history_section">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-1.5 mb-2">
            <BookOpen className="w-4 h-4 text-primary" />
            {lbl("Usage History", "Historia ya Matumizi")}
          </h2>
          {logs.length === 0 ? (
            <div
              className="bg-card border border-border rounded-xl p-6 text-center"
              data-ocid="irrigation.history.empty_state"
            >
              <Droplets className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                {lbl("No usage logs yet", "Bado hakuna rekodi za matumizi")}
              </p>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left p-2.5 font-semibold text-muted-foreground">
                      {lbl("Date", "Tarehe")}
                    </th>
                    <th className="text-left p-2.5 font-semibold text-muted-foreground">
                      {lbl("Crop", "Zao")}
                    </th>
                    <th className="text-right p-2.5 font-semibold text-muted-foreground">
                      {lbl("Liters", "Lita")}
                    </th>
                    <th className="text-left p-2.5 font-semibold text-muted-foreground hidden sm:table-cell">
                      {lbl("Notes", "Maelezo")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log, i) => (
                    <tr
                      key={log.id}
                      className="border-b border-border last:border-0 hover:bg-muted/20"
                      data-ocid={`irrigation.history.item.${i + 1}`}
                    >
                      <td className="p-2.5 text-foreground">
                        {new Date(log.followedOn).toLocaleDateString(
                          language === "sw" ? "sw-TZ" : "en-TZ",
                          { day: "numeric", month: "short" },
                        )}
                      </td>
                      <td className="p-2.5">
                        <Badge
                          variant="outline"
                          className="text-[10px] bg-primary/5 text-primary border-primary/20"
                        >
                          {log.cropType}
                        </Badge>
                      </td>
                      <td className="p-2.5 text-right font-semibold text-cyan-700">
                        {log.actualWaterUseLiters}L
                      </td>
                      <td className="p-2.5 text-muted-foreground truncate max-w-[120px] hidden sm:table-cell">
                        {log.notes || lbl("No notes", "Hakuna maelezo")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Tips */}
        <section data-ocid="irrigation.tips_section">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-1.5 mb-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            {lbl("Irrigation Tips", "Vidokezo vya Umwagiliaji")}
          </h2>
          <div className="space-y-2">
            {TIPS.map((tip, i) => (
              <div
                key={tip.title}
                className="bg-card border border-border rounded-xl p-3.5 flex gap-3"
                data-ocid={`irrigation.tip.${i + 1}`}
              >
                <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  {tip.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-foreground mb-0.5">
                    {tip.title}
                  </p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {tip.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Generate new recommendation dialog */}
        <Dialog open={generateOpen} onOpenChange={setGenerateOpen}>
          <DialogContent
            className="max-w-sm"
            data-ocid="irrigation.generate_dialog"
          >
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-cyan-600" />
                {lbl("Generate New Recommendation", "Zalia Mapendekezo Mapya")}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <Label className="text-xs">
                  {lbl("Crop Type", "Aina ya Zao")}
                </Label>
                <Select value={genCrop} onValueChange={setGenCrop}>
                  <SelectTrigger
                    className="mt-1"
                    data-ocid="irrigation.generate_crop_select"
                  >
                    <SelectValue
                      placeholder={lbl("Select crop", "Chagua zao")}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {CROP_OPTIONS.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs">{lbl("Region", "Mkoa")}</Label>
                <Select value={genRegion} onValueChange={setGenRegion}>
                  <SelectTrigger
                    className="mt-1"
                    data-ocid="irrigation.generate_region_select"
                  >
                    <SelectValue
                      placeholder={lbl("Select region", "Chagua mkoa")}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {TANZANIAN_REGIONS.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setGenerateOpen(false)}
                  data-ocid="irrigation.generate_cancel_button"
                >
                  {lbl("Cancel", "Ghairi")}
                </Button>
                <Button
                  className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white gap-1.5"
                  onClick={handleGenerate}
                  disabled={!genCrop || !genRegion || generating}
                  data-ocid="irrigation.generate_submit_button"
                >
                  {generating ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      {lbl("Generating...", "Inazalisha...")}
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {lbl("Generate", "Zalia")}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

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
    </Layout>
  );
}
