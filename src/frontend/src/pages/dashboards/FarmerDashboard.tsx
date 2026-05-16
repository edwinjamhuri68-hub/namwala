import {
  AIAdvisorWidget,
  type AdvisorUserContext,
} from "@/components/AIAdvisorWidget";
import { AddProductModal } from "@/components/AddProductModal";
import type { ProductFormData } from "@/components/AddProductModal";
import { ForecastCard } from "@/components/ForecastCard";
import { IrrigationRecommendationCard } from "@/components/IrrigationRecommendationCard";
import { Layout } from "@/components/Layout";
import type { ManagedListing } from "@/components/MyListingsSection";
import { MyListingsSection } from "@/components/MyListingsSection";
import { PredictiveReminderCards } from "@/components/PredictiveReminderCards";
import { UpcomingTasksWidget } from "@/components/UpcomingTasksWidget";
import { AlertBanner } from "@/components/ui/AlertBanner";
import { MarketPriceCard } from "@/components/ui/MarketPriceCard";
import { SearchBar } from "@/components/ui/SearchBar";
import { StatCard } from "@/components/ui/StatCard";
import { WeatherWidget } from "@/components/ui/WeatherWidget";
import { Button } from "@/components/ui/button";
import {
  generateFarmerReminders,
  generateFarmerResponse,
  generatePredictiveReminders,
  getFarmerSuggestedQuestions,
} from "@/lib/advisorEngine";
import {
  AI_DIAGNOSES,
  CROP_LISTINGS,
  FARM_RECORDS,
  MARKET_PRICES,
  getWeatherForLocation,
} from "@/lib/mockData";
import { useAuthStore } from "@/store/authStore";
import { useLanguageStore } from "@/store/languageStore";
import { useNotificationStore } from "@/store/notificationStore";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart2,
  BookOpen,
  Briefcase,
  Camera,
  Droplets,
  FileText,
  FlaskConical,
  Gavel,
  Leaf,
  MapPinned as MapIcon,
  MessageCircle,
  Microscope,
  Package,
  Radio,
  Satellite,
  Shield,
  ShoppingBasket,
  Sprout,
  TrendingUp,
  TriangleAlert,
  Users,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function FarmerDashboard() {
  const { user } = useAuthStore();
  const { t, language } = useLanguageStore();
  const { notifications } = useNotificationStore();
  const weather = getWeatherForLocation(user?.location ?? "Mbeya");
  const criticalAlerts = notifications.filter(
    (n) => n.priority === "critical" && !n.read,
  );
  const navigate = useNavigate();

  const cropTypes = user?.cropTypes ?? ["Maize", "Beans"];
  const userLocation = user?.location ?? "Mbeya";

  // Simulate season/weather from current month
  const month = new Date().getMonth();
  const simulatedSeason: AdvisorUserContext["season"] =
    month >= 9 || month <= 1
      ? "planting"
      : month >= 2 && month <= 4
        ? "growing"
        : month >= 5 && month <= 6
          ? "harvesting"
          : "dry";
  const simulatedWeather: AdvisorUserContext["weatherCondition"] =
    month >= 9 || month <= 4
      ? "rainy"
      : month >= 5 && month <= 7
        ? "dry"
        : "sunny";

  const farmerContext: AdvisorUserContext = {
    role: "farmer",
    location: userLocation,
    cropTypes,
    farmSize: user?.farmSize,
    weatherCondition: simulatedWeather,
    season: simulatedSeason,
  };

  const farmerReminders = generateFarmerReminders(farmerContext, language);
  const farmerPredictiveReminders = generatePredictiveReminders(
    farmerContext,
    language,
  );
  const farmerSuggestedQuestions = getFarmerSuggestedQuestions(
    farmerContext,
    language,
  );

  // My Listings state — seed with mock data belonging to current user (u1)
  const [myListings, setMyListings] = useState<ManagedListing[]>(() =>
    CROP_LISTINGS.filter((l) => l.farmerId === (user?.id ?? "u1")).map((l) => ({
      ...l,
      isActive: true,
      inquiryCount: Math.floor(Math.random() * 4),
    })),
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<ManagedListing | null>(null);

  const lbl = (en: string, sw: string) => (language === "sw" ? sw : en);

  async function handleAddSubmit(data: ProductFormData) {
    // Optimistic add
    const newListing: ManagedListing = {
      id: `cl_${Date.now()}`,
      farmerId: user?.id ?? "u1",
      farmerName: user?.name ?? "Farmer",
      cropType: data.cropType,
      quantity: data.quantity,
      unit: data.unit,
      pricePerUnit: data.pricePerUnit,
      location: data.location,
      quality: data.quality,
      availableFrom: new Date().toISOString().split("T")[0],
      imageUrl: data.imagePreview,
      description: data.description,
      isActive: true,
      inquiryCount: 0,
    };
    setMyListings((prev) => [newListing, ...prev]);
    setModalOpen(false);
    toast.success(lbl("Product listed successfully!", "Bidhaa imeorodheshwa!"));
  }

  async function handleEditSubmit(data: ProductFormData) {
    if (!editTarget) return;
    setMyListings((prev) =>
      prev.map((l) =>
        l.id === editTarget.id
          ? {
              ...l,
              cropType: data.cropType,
              quantity: data.quantity,
              unit: data.unit,
              pricePerUnit: data.pricePerUnit,
              location: data.location,
              quality: data.quality,
              description: data.description,
              imageUrl: data.imagePreview ?? l.imageUrl,
            }
          : l,
      ),
    );
    setEditTarget(null);
    toast.success(lbl("Listing updated!", "Orodha imesasishwa!"));
  }

  function handlePauseResume(listing: ManagedListing) {
    setMyListings((prev) =>
      prev.map((l) =>
        l.id === listing.id ? { ...l, isActive: !l.isActive } : l,
      ),
    );
    toast(
      listing.isActive
        ? lbl("Listing paused", "Orodha imesimamishwa")
        : lbl("Listing resumed", "Orodha imeendelea"),
    );
  }

  function handleDelete(id: string) {
    setMyListings((prev) => prev.filter((l) => l.id !== id));
    toast.success(lbl("Listing removed", "Orodha imefutwa"));
  }

  const FARMER_TIPS = [
    {
      icon: <Sprout className="w-3.5 h-3.5 text-primary" />,
      title: language === "sw" ? "Wakati wa Kupanda" : "Planting Window",
      advice:
        language === "sw"
          ? `Mvua inatarajiwa wiki ijayo huko ${userLocation}. Panda ${cropTypes[0]} mapema.`
          : `Rain expected next week in ${userLocation}. Plant ${cropTypes[0]} now for best yields.`,
    },
    {
      icon: <Droplets className="w-3.5 h-3.5 text-blue-500" />,
      title: language === "sw" ? "Afya ya Udongo" : "Soil Health Tip",
      advice:
        language === "sw"
          ? `Weka mbolea ya DAP (50kg/ekari) kabla ya mvua ili kuboresha mavuno ya ${cropTypes[0]}.`
          : `Apply DAP fertilizer (50kg/acre) before rain to boost ${cropTypes[0]} yield by up to 30%.`,
    },
    {
      icon: <TrendingUp className="w-3.5 h-3.5 text-accent" />,
      title: language === "sw" ? "Bei ya Soko" : "Market Alert",
      advice:
        language === "sw"
          ? "Bei ya mahindi inapanda huko Dar es Salaam \u2014 fikiria kuuza baada ya wiki mbili."
          : "Maize prices rising in Dar es Salaam \u2014 consider selling in 2 weeks for 15% premium.",
    },
    {
      icon: <TriangleAlert className="w-3.5 h-3.5 text-amber-500" />,
      title: language === "sw" ? "Tahadhari ya Wadudu" : "Pest Warning",
      advice:
        language === "sw"
          ? "Msimu huu una hatari ya viwavi. Kagua mashamba yako kila siku na uwasiliane na mtaalamu."
          : "Fall armyworm risk is elevated this season. Scout fields daily and contact a specialist early.",
    },
  ];

  const getFarmerResponse = (
    q: string,
    history: import("@/components/AIAdvisorWidget").QAMessage[],
  ): string => {
    // Inject current predictive reminders context when user asks about weather/reminders
    const lowerQ = q.toLowerCase();
    const isReminderQuery =
      /(reminder|kumbusho|show|nionyeshe|weather advice|ushauri wa hewa|upcoming|kazi zijazo)/.test(
        lowerQ,
      );
    if (isReminderQuery && farmerPredictiveReminders.length > 0) {
      const topReminders = farmerPredictiveReminders
        .filter((r) => r.urgency === "high")
        .slice(0, 2);
      if (topReminders.length > 0) {
        const base = generateFarmerResponse(
          q,
          history,
          farmerContext,
          language,
        );
        const reminderLines = topReminders
          .map((r) => `\u2022 ${r.title}: ${r.message}`)
          .join("\n");
        return language === "sw"
          ? `${base}\n\nVikumbusho vya sasa:\n${reminderLines}`
          : `${base}\n\nCurrent smart reminders:\n${reminderLines}`;
      }
    }
    return generateFarmerResponse(q, history, farmerContext, language);
  };

  const ACTIONS = [
    {
      icon: Camera,
      label: language === "sw" ? "Gundua Ugonjwa" : "Detect Disease",
      color: "bg-destructive/10 text-destructive",
      onClick: () => navigate({ to: "/diagnosis" }),
    },
    {
      icon: ShoppingBasket,
      label: language === "sw" ? "Soko la Kilimo" : "Marketplace",
      color: "bg-accent/10 text-accent",
      onClick: () => navigate({ to: "/marketplace" }),
    },
    {
      icon: MessageCircle,
      label: language === "sw" ? "Ujumbe" : "Messages",
      color: "bg-primary/10 text-primary",
      onClick: () =>
        navigate({ to: "/messages", search: { recipientId: undefined } }),
    },
    {
      icon: Microscope,
      label: language === "sw" ? "Uchunguzi wa Udongo" : "Soil Analysis",
      color: "bg-amber-100 text-amber-700",
      onClick: () => navigate({ to: "/dashboard/weather-soil" }),
    },
    {
      icon: Briefcase,
      label: language === "sw" ? "Soko la Kazi" : "Job Marketplace",
      color: "bg-blue-100 text-blue-700",
      onClick: () => navigate({ to: "/jobs" }),
    },
    {
      icon: Shield,
      label: language === "sw" ? "Bima" : "Insurance",
      color: "bg-indigo-100 text-indigo-700",
      onClick: () => navigate({ to: "/insurance" }),
    },
    {
      icon: Leaf,
      label: language === "sw" ? "Tuzo za Kaboni" : "Carbon Rewards",
      color: "bg-emerald-100 text-emerald-700",
      onClick: () => navigate({ to: "/carbon-farming" }),
    },
    {
      icon: TrendingUp,
      label: language === "sw" ? "Maarifa ya Mafanikio" : "Success Insights",
      color: "bg-violet-100 text-violet-700",
      onClick: () => navigate({ to: "/success-insights" }),
    },
  ];

  return (
    <Layout>
      <div className="px-4 py-4 space-y-4">
        {/* Hero image */}
        <div className="relative rounded-xl overflow-hidden">
          <img
            src="/assets/generated/farmer-dashboard.dim_800x400.jpg"
            alt="Farm"
            className="w-full h-32 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-3">
            <div>
              <h1 className="text-lg font-display font-bold text-white">
                {language === "sw"
                  ? "Dashibodi ya Mkulima"
                  : "Farmer Dashboard"}
              </h1>
              <p className="text-xs text-white/80">
                {user?.name} · {user?.location}
              </p>
            </div>
          </div>
        </div>

        {/* Alerts */}
        {criticalAlerts.slice(0, 1).map((n) => (
          <AlertBanner key={n.id} message={n.body} priority="critical" />
        ))}

        {/* Search */}
        <SearchBar placeholder={t("searchPlaceholder")} />

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <StatCard
            title={t("cropsGrowing")}
            value="3"
            icon={<Sprout className="w-4 h-4" />}
            colorClass="bg-green-50 text-green-600"
          />
          <StatCard
            title={t("farmArea")}
            value="7.5 ac"
            icon={<span className="text-sm">🌾</span>}
            colorClass="bg-amber-50 text-amber-600"
          />
          <StatCard
            title={t("activeAlerts")}
            value={String(criticalAlerts.length)}
            trend={criticalAlerts.length > 0 ? "up" : "stable"}
            icon={<span className="text-sm">⚠️</span>}
            colorClass="bg-destructive/10 text-destructive"
          />
        </div>

        {/* Quick Actions */}
        <section>
          <h2 className="text-sm font-semibold text-foreground mb-2">
            {t("quickActions")}
          </h2>
          <div className="grid grid-cols-4 gap-2">
            {ACTIONS.map(({ icon: Icon, label, color, onClick }) => (
              <button
                key={label}
                type="button"
                onClick={onClick}
                data-ocid={`farmer.action_${label.toLowerCase().replace(/\s+/g, "_")}`}
                className="flex flex-col items-center gap-1.5 p-2 bg-card border border-border rounded-xl hover:shadow-sm transition-smooth active:scale-95"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] text-center text-muted-foreground leading-tight">
                  {label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* AI Crop Diagnosis Section */}
        <section data-ocid="farmer.ai_diagnosis_section">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <Leaf className="w-4 h-4 text-primary" />
              {language === "sw"
                ? "Uchunguzi wa Mazao wa AI"
                : "AI Crop Diagnosis"}
            </h2>
            <button
              type="button"
              onClick={() => navigate({ to: "/diagnosis" })}
              className="text-xs text-primary font-medium hover:underline flex items-center gap-0.5"
              data-ocid="farmer.diagnosis_view_all_button"
            >
              {language === "sw" ? "Ona Zaidi" : "View All"}
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 space-y-3">
            <div className="space-y-2">
              {[AI_DIAGNOSES.crop_blight].map((d, i) => (
                <div
                  key={d.requestId}
                  data-ocid={`farmer.recent_diagnosis.${i + 1}`}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground truncate">
                      {d.diagnosis}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {d.confidence}%{" "}
                      {language === "sw" ? "uhakika" : "confidence"}
                    </p>
                  </div>
                  <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/30 font-medium shrink-0">
                    {language === "sw" ? "Imethibitishwa" : "Confirmed"}
                  </span>
                </div>
              ))}
            </div>
            <Button
              size="sm"
              className="w-full gap-2"
              onClick={() => navigate({ to: "/diagnosis" })}
              data-ocid="farmer.new_diagnosis_button"
            >
              <Camera className="w-4 h-4" />
              {language === "sw" ? "Uchunguzi Mpya" : "New Diagnosis"}
            </Button>
          </div>
        </section>

        {/* Predictive Reminder Cards */}
        <PredictiveReminderCards userProfile={farmerContext} type="farmer" />

        {/* Smart Irrigation Card */}
        <section data-ocid="farmer.irrigation_section">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-cyan-600" />
              {language === "sw" ? "Umwagiliaji Mahiri" : "Smart Irrigation"}
            </h2>
            <button
              type="button"
              onClick={() => navigate({ to: "/irrigation" })}
              className="text-xs text-cyan-700 font-medium hover:underline flex items-center gap-0.5"
              data-ocid="farmer.irrigation_view_all_button"
            >
              {language === "sw" ? "Angalia Zaidi" : "Full Schedule"}
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <IrrigationRecommendationCard
            recommendation={{
              id: "dash_irr_01",
              userId: user?.id ?? "u1",
              cropType: cropTypes[0] ?? "Maize",
              region: userLocation,
              schedule: {
                frequencyPerWeek: 3,
                durationMinutes: 45,
                bestTimeOfDay: "early_morning",
              },
              reasoning:
                language === "sw"
                  ? `Joto kali linatarajiwa ${userLocation} — mwagilia ${cropTypes[0] ?? "mahindi"} mara 3/wiki kwa siku 10 zijazo.`
                  : `High heat forecast in ${userLocation} — water ${cropTypes[0] ?? "maize"} 3×/week for next 10 days.`,
              estimatedWaterSavingPercent: 28,
              yieldImpactPercent: 19,
              basedOn: {
                soilMoisture: simulatedWeather === "dry" ? "low" : "moderate",
                weatherForecast:
                  simulatedWeather === "dry" ? "dry" : "moderate",
                seasonalCondition:
                  simulatedSeason === "dry"
                    ? "dry"
                    : simulatedSeason === "planting"
                      ? "planting"
                      : "growing",
              },
              createdAt: new Date().toISOString(),
              validUntil: new Date(
                Date.now() + 10 * 24 * 60 * 60 * 1000,
              ).toISOString(),
              hasSetReminder: false,
            }}
            compact
          />
        </section>
        {/* Harvest Forecast Widget */}
        <section data-ocid="farmer.forecast_section">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-primary" />
              {language === "sw" ? "Utabiri wa Mavuno" : "Harvest Forecast"}
            </h2>
            <button
              type="button"
              onClick={() => navigate({ to: "/forecasting" })}
              className="text-xs text-primary font-medium hover:underline flex items-center gap-0.5"
              data-ocid="farmer.forecast_see_all_button"
            >
              {language === "sw" ? "Ona Zaidi" : "See all forecasts"}
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <ForecastCard
            forecast={{
              id: "farmer_dash_fc",
              userId: user?.id ?? "u1",
              forecastType: "crop_yield",
              title:
                language === "sw"
                  ? `Mavuno ya ${cropTypes[0]} \u2014 ${userLocation}`
                  : `${cropTypes[0]} Yield \u2014 ${userLocation}`,
              predictedValue: 3.2,
              unit: "tons",
              confidenceScore: 85,
              keyDrivers:
                language === "sw"
                  ? ["Mvua nzuri", "Mbolea DAP", "Kupanda mapema"]
                  : ["Good rainfall", "DAP fertilizer", "Early planting"],
              monthlyBreakdown: [
                { month: "Jan", value: 0.0 },
                { month: "Feb", value: 0.1 },
                { month: "Mar", value: 0.4 },
                { month: "Apr", value: 0.9 },
                { month: "May", value: 1.2 },
                { month: "Jun", value: 0.6 },
              ],
              sensitivityNote:
                language === "sw"
                  ? "Kupungua kwa mvua mwezi wa Machi-Aprili kunaweza kupunguza mavuno kwa hadi 18%."
                  : "A 10% rainfall drop in March\u2013April could reduce yield by up to 18%. Consider irrigation as backup.",
              basedOn: {
                weatherScore: 88,
                soilScore: 82,
                feedingScore: 70,
                historyScore: 91,
              },
              createdAt: new Date().toISOString(),
              validUntil: new Date(
                Date.now() + 60 * 24 * 3600 * 1000,
              ).toISOString(),
            }}
          />
        </section>

        {/* AI Advisor */}
        <AIAdvisorWidget
          userName={user?.name ?? "Farmer"}
          tips={FARMER_TIPS}
          reminders={farmerReminders}
          getMockResponse={getFarmerResponse}
          widgetId="farmer"
          userContext={farmerContext}
          suggestedQuestions={farmerSuggestedQuestions}
        />

        {/* Weather */}
        <WeatherWidget data={weather} lang={language} />

        {/* Upcoming Tasks Widget */}
        <UpcomingTasksWidget />

        {/* My farms */}
        <section>
          <h2 className="text-sm font-semibold text-foreground mb-2">
            {t("myFarm")}
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {FARM_RECORDS.map((farm, i) => (
              <div
                key={farm.id}
                data-ocid={`farmer.farm.${i + 1}`}
                className="bg-card border border-border rounded-xl overflow-hidden flex gap-0"
              >
                <img
                  src={farm.imageUrl}
                  alt={farm.name}
                  className="w-24 h-24 object-cover flex-shrink-0"
                />
                <div className="p-3 flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground truncate">
                    {farm.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {farm.location} · {farm.size} {farm.sizeUnit}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {farm.crops.map((c) => (
                      <span
                        key={c}
                        className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Market prices */}
        <section>
          <h2 className="text-sm font-semibold text-foreground mb-2">
            {t("marketPrices")}
          </h2>
          <div className="space-y-2">
            {MARKET_PRICES.filter((p) => p.category === "crop")
              .slice(0, 3)
              .map((p) => (
                <MarketPriceCard key={p.commodity} price={p} lang={language} />
              ))}
          </div>
        </section>

        {/* My Listings */}
        <MyListingsSection
          listings={myListings}
          onAdd={() => setModalOpen(true)}
          onEdit={(listing) => setEditTarget(listing)}
          onPauseResume={handlePauseResume}
          onDelete={handleDelete}
        />

        {/* Low-Stock Inventory Alert */}
        {(() => {
          const LOW_STOCK_ITEMS = [
            {
              name: language === "sw" ? "Mbegu za Mahindi" : "Maize Seeds",
              current: 2,
              unit: "bags",
            },
            {
              name: language === "sw" ? "Mbolea DAP" : "DAP Fertilizer",
              current: 1,
              unit: "bags",
            },
          ];
          const lowItems = LOW_STOCK_ITEMS.filter((i) => i.current <= 2);
          if (lowItems.length === 0) return null;
          return (
            <div
              data-ocid="farmer.inventory_alert"
              className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2.5"
            >
              <Package className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-amber-800">
                  {language === "sw"
                    ? "Tahadhari ya Hifadhi Ndogo"
                    : "Low Stock Alert"}
                </p>
                <p className="text-[11px] text-amber-700 mt-0.5">
                  {lowItems
                    .map((i) => `${i.name} (${i.current} ${i.unit})`)
                    .join(" · ")}
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate({ to: "/inventory" })}
                className="text-[11px] font-semibold text-amber-700 hover:underline whitespace-nowrap flex-shrink-0"
                data-ocid="farmer.inventory_alert.view_button"
              >
                {language === "sw" ? "Angalia" : "View"}
              </button>
            </div>
          );
        })()}

        {/* Quick Access */}
        <section data-ocid="farmer.quick_access_section">
          <h2 className="text-sm font-semibold text-foreground mb-2">
            {language === "sw" ? "Ufikiaji wa Haraka" : "Quick Access"}
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {(
              [
                {
                  icon: BookOpen,
                  label: language === "sw" ? "Rekodi" : "Records",
                  sub:
                    language === "sw" ? "Historia ya shamba" : "Farm history",
                  color: "bg-primary/10 text-primary",
                  to: "/records",
                  ocid: "farmer.quick_access.records",
                },
                {
                  icon: Package,
                  label: language === "sw" ? "Hifadhi" : "Inventory",
                  sub: language === "sw" ? "Dhibiti hisa" : "Manage stock",
                  color: "bg-amber-100 text-amber-700",
                  to: "/inventory",
                  ocid: "farmer.quick_access.inventory",
                },
                {
                  icon: MapIcon,
                  label: language === "sw" ? "Ramani" : "Farm Map",
                  sub:
                    language === "sw" ? "Mipaka ya shamba" : "Field boundaries",
                  color: "bg-green-50 text-green-600",
                  to: "/farm-map",
                  ocid: "farmer.quick_access.farm_map",
                },
                {
                  icon: BarChart2,
                  label: language === "sw" ? "Uchambuzi" : "Analytics",
                  sub:
                    language === "sw"
                      ? "Ripoti na mwelekeo"
                      : "Reports & trends",
                  color: "bg-blue-50 text-blue-600",
                  to: "/analytics",
                  ocid: "farmer.quick_access.analytics",
                },
                {
                  icon: FileText,
                  label: language === "sw" ? "Mikataba" : "Contracts",
                  sub:
                    language === "sw"
                      ? "Makubaliano salama"
                      : "Secure agreements",
                  color: "bg-purple-50 text-purple-600",
                  to: "/contracts",
                  ocid: "farmer.quick_access.contracts",
                },
                {
                  icon: Wallet,
                  label: language === "sw" ? "Mikopo" : "Loans",
                  sub: language === "sw" ? "Maombi ya fedha" : "Financing",
                  color: "bg-accent/10 text-accent",
                  to: "/loans",
                  ocid: "farmer.quick_access.loans",
                },
                {
                  icon: Radio,
                  label:
                    language === "sw" ? "Ramani ya Mlipuko" : "Outbreak Map",
                  sub:
                    language === "sw"
                      ? "Magonjwa na wadudu"
                      : "Diseases & pests",
                  color: "bg-red-50 text-red-600",
                  to: "/outbreak-map",
                  ocid: "farmer.quick_access.outbreak_map",
                },
                {
                  icon: Gavel,
                  label: language === "sw" ? "Minada" : "Auctions",
                  sub:
                    language === "sw"
                      ? "Zabuni za moja kwa moja"
                      : "Live bidding",
                  color: "bg-amber-50 text-amber-600",
                  to: "/auctions",
                  ocid: "farmer.quick_access.auctions",
                },
                {
                  icon: Satellite,
                  label:
                    language === "sw" ? "Uchambuzi wa Ndege" : "Drone Analysis",
                  sub: language === "sw" ? "Picha za anga" : "Aerial imagery",
                  color: "bg-indigo-50 text-indigo-600",
                  to: "/drone-analysis",
                  ocid: "farmer.quick_access.drone_analysis",
                },
              ] as const
            ).map(({ icon: Icon, label, sub, color, to, ocid }) => (
              <button
                key={ocid}
                type="button"
                onClick={() => navigate({ to })}
                data-ocid={ocid}
                className="bg-card border border-border rounded-xl p-3 flex flex-col items-center gap-1.5 hover:shadow-sm hover:border-primary/30 transition-smooth active:scale-95 text-center"
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center ${color}`}
                >
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <span className="text-xs font-semibold text-foreground leading-tight">
                  {label}
                </span>
                <span className="text-[10px] text-muted-foreground leading-tight">
                  {sub}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Add Product Modal */}
        <AddProductModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleAddSubmit}
        />

        {/* Edit Product Modal */}
        <AddProductModal
          open={!!editTarget}
          onClose={() => setEditTarget(null)}
          onSubmit={handleEditSubmit}
          editListing={editTarget}
        />

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
