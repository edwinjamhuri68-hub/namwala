import {
  AIAdvisorWidget,
  type AdvisorUserContext,
} from "@/components/AIAdvisorWidget";
import { AddLivestockModal } from "@/components/AddLivestockModal";
import { ForecastCard } from "@/components/ForecastCard";
import type { ForecastRecord } from "@/components/ForecastCard";
import { Layout } from "@/components/Layout";
import { LivestockListingCard } from "@/components/LivestockListingCard";
import { PredictiveReminderCards } from "@/components/PredictiveReminderCards";
import { UpcomingTasksWidget } from "@/components/UpcomingTasksWidget";
import { AlertBanner } from "@/components/ui/AlertBanner";
import { MarketPriceCard } from "@/components/ui/MarketPriceCard";
import { StatCard } from "@/components/ui/StatCard";
import { WeatherWidget } from "@/components/ui/WeatherWidget";
import { Button } from "@/components/ui/button";
import {
  generateLivestockReminders,
  generateLivestockResponse,
  generatePredictiveReminders,
  getLivestockSuggestedQuestions,
} from "@/lib/advisorEngine";
import {
  AI_DIAGNOSES,
  ANIMAL_LISTINGS_FULL,
  ANIMAL_RECORDS,
  MARKET_PRICES,
  getWeatherForLocation,
} from "@/lib/mockData";
import { useAuthStore } from "@/store/authStore";
import { useLanguageStore } from "@/store/languageStore";
import { useNotificationStore } from "@/store/notificationStore";
import type { AnimalListingFull } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart2,
  BookOpen,
  Briefcase,
  Camera,
  Droplets,
  FileText,
  Gavel,
  Heart,
  HeartPulse,
  Leaf,
  MapPinned as MapIcon,
  MessageCircle,
  Package,
  Plus,
  Radio,
  Satellite,
  Shield,
  ShieldCheck,
  ShoppingBasket,
  Stethoscope,
  Syringe,
  Tag,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const HEALTH_COLORS: Record<string, string> = {
  healthy: "bg-green-50 text-green-600 border-green-200",
  sick: "bg-destructive/10 text-destructive border-destructive/20",
  under_treatment: "bg-amber-50 text-amber-700 border-amber-200",
  recovered: "bg-blue-50 text-blue-600 border-blue-200",
};

export default function LivestockDashboard() {
  const { user } = useAuthStore();
  const { t, language } = useLanguageStore();
  const { notifications } = useNotificationStore();
  const weather = getWeatherForLocation(user?.location ?? "Arusha");
  const critical = notifications.filter(
    (n) => n.priority === "critical" && !n.read,
  );
  const navigate = useNavigate();
  const totalAnimals = ANIMAL_RECORDS.reduce((s, a) => s + a.count, 0);
  const healthyCount = ANIMAL_RECORDS.filter(
    (a) => a.healthStatus === "healthy",
  ).length;
  const animalTypes = user?.animalTypes ?? ["Cattle", "Goats"];
  const userLocation = user?.location ?? "Arusha";

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

  const livestockContext: AdvisorUserContext = {
    role: "livestock_keeper",
    location: userLocation,
    animalTypes,
    weatherCondition: simulatedWeather,
    season: simulatedSeason,
  };

  const livestockReminders = generateLivestockReminders(
    livestockContext,
    language,
  );
  const livestockPredictiveReminders = generatePredictiveReminders(
    livestockContext,
    language,
  );
  const livestockSuggestedQuestions = getLivestockSuggestedQuestions(
    livestockContext,
    language,
  );

  // --- Listings state ---
  const myId = user?.id ?? "u2";
  const initial = ANIMAL_LISTINGS_FULL.filter((l) => l.keeperId === myId);
  const [listings, setListings] = useState<AnimalListingFull[]>(
    initial.length > 0 ? initial : ANIMAL_LISTINGS_FULL,
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<AnimalListingFull | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleAddOrEdit = (
    data: Omit<
      AnimalListingFull,
      "id" | "keeperId" | "keeperName" | "inquiries" | "isActive" | "createdAt"
    >,
  ) => {
    if (editTarget) {
      setListings((prev) =>
        prev.map((l) => (l.id === editTarget.id ? { ...l, ...data } : l)),
      );
      toast.success(
        language === "sw" ? "Orodha imesasishwa" : "Listing updated",
      );
    } else {
      const newItem: AnimalListingFull = {
        ...data,
        id: `alf${Date.now()}`,
        keeperId: myId,
        keeperName: user?.name ?? "Keeper",
        isActive: true,
        inquiries: 0,
        createdAt: new Date().toISOString(),
      };
      setListings((prev) => [newItem, ...prev]);
      toast.success(
        language === "sw"
          ? "Mnyama amewekwa sokoni!"
          : "Livestock listed for sale!",
      );
    }
    setModalOpen(false);
    setEditTarget(null);
  };

  const handleEdit = (listing: AnimalListingFull) => {
    setEditTarget(listing);
    setModalOpen(true);
  };

  const handlePauseResume = (id: string, isActive: boolean) => {
    setListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, isActive: !isActive } : l)),
    );
    toast(
      isActive
        ? language === "sw"
          ? "Orodha imesimamishwa"
          : "Listing paused"
        : language === "sw"
          ? "Orodha imeendelea"
          : "Listing resumed",
    );
  };

  const handleDeleteConfirm = (id: string) => {
    setDeleteConfirmId(id);
  };

  const handleDeleteExecute = () => {
    if (!deleteConfirmId) return;
    setListings((prev) => prev.filter((l) => l.id !== deleteConfirmId));
    setDeleteConfirmId(null);
    toast.success(language === "sw" ? "Orodha imefutwa" : "Listing removed");
  };

  const LIVESTOCK_TIPS = [
    {
      icon: <Syringe className="w-3.5 h-3.5 text-blue-500" />,
      title: language === "sw" ? "Kumbusho la Chanjo" : "Vaccination Reminder",
      advice:
        language === "sw"
          ? `Chanjo ya FMD kwa ${animalTypes[0]} inahitajika mwezi ujao. Wasiliana na daktari wa wanyama.`
          : `FMD vaccination for ${animalTypes[0]} is due next month. Book a vet visit through the app now.`,
    },
    {
      icon: <Heart className="w-3.5 h-3.5 text-destructive" />,
      title: language === "sw" ? "Afya ya Wanyama" : "Animal Health Tip",
      advice:
        language === "sw"
          ? "Wanyama wanaostawi wanahitaji maji safi kila wakati. Angalia dalili za ugonjwa asubuhi na jioni."
          : `Healthy ${animalTypes[0]} need fresh water daily. Check for fever, loss of appetite, or discharge each morning.`,
    },
    {
      icon: <TrendingUp className="w-3.5 h-3.5 text-accent" />,
      title: language === "sw" ? "Wakati wa Kuuza" : "Market Timing",
      advice:
        language === "sw"
          ? "Bei ya ng'ombe inapanda kabla ya msimu wa harusi. Fikiria kuuza mwezi ujao kwa faida nzuri."
          : `${animalTypes[0]} prices are rising ahead of festive season. Ideal selling window is the next 3-4 weeks.`,
    },
    {
      icon: <ShieldCheck className="w-3.5 h-3.5 text-primary" />,
      title: language === "sw" ? "Ushauri wa Malisho" : "Feeding Advice",
      advice:
        language === "sw"
          ? `Nyongeza ya madini (mineral block) inaboresha uzalishaji wa maziwa na ukuaji kwa ${animalTypes[0]}.`
          : `Mineral block supplementation can improve milk yield and growth rates for ${animalTypes[0]} by 20%.`,
    },
  ];

  const getLivestockResponse = (
    q: string,
    history: import("@/components/AIAdvisorWidget").QAMessage[],
  ): string => {
    // Inject current predictive reminders context when user asks about weather/reminders
    const lowerQ = q.toLowerCase();
    const isReminderQuery =
      /(reminder|kumbusho|show|nionyeshe|weather advice|ushauri wa hewa|upcoming|kazi zijazo)/.test(
        lowerQ,
      );
    if (isReminderQuery && livestockPredictiveReminders.length > 0) {
      const topReminders = livestockPredictiveReminders
        .filter((r) => r.urgency === "high")
        .slice(0, 2);
      if (topReminders.length > 0) {
        const base = generateLivestockResponse(
          q,
          history,
          livestockContext,
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
    return generateLivestockResponse(q, history, livestockContext, language);
  };

  const ACTIONS = [
    {
      icon: Camera,
      label: language === "sw" ? "Gundua Ugonjwa" : "Diagnose Animal",
      color: "bg-destructive/10 text-destructive",
      onClick: () => navigate({ to: "/diagnosis" }),
    },
    {
      icon: Stethoscope,
      label: language === "sw" ? "Daktari wa Wanyama" : "Call Vet",
      color: "bg-blue-50 text-blue-600",
      onClick: () => navigate({ to: "/search", search: { q: "veterinarian" } }),
    },
    {
      icon: ShoppingBasket,
      label: language === "sw" ? "Soko" : "Marketplace",
      color: "bg-accent/10 text-accent",
      onClick: () => navigate({ to: "/dashboard/livestock" }),
    },
    {
      icon: MessageCircle,
      label: language === "sw" ? "Ujumbe" : "Messages",
      color: "bg-primary/10 text-primary",
      onClick: () =>
        navigate({ to: "/messages", search: { recipientId: undefined } }),
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

  const activeListings = listings.filter((l) => l.isActive).length;
  const totalInquiries = listings.reduce((s, l) => s + l.inquiries, 0);

  return (
    <Layout>
      <div className="px-4 py-4 space-y-4">
        {/* Hero */}
        <div className="relative rounded-xl overflow-hidden">
          <img
            src="/assets/generated/livestock-hero.dim_800x500.jpg"
            alt="Livestock"
            className="w-full h-32 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 to-transparent flex items-end p-3">
            <div>
              <h1 className="text-lg font-display font-bold text-white">
                {language === "sw"
                  ? "Dashibodi ya Mfugaji"
                  : "Livestock Dashboard"}
              </h1>
              <p className="text-xs text-white/80">
                {user?.name} · {user?.location}
              </p>
            </div>
          </div>
        </div>

        {/* Alerts */}
        {critical.slice(0, 1).map((n) => (
          <AlertBanner key={n.id} message={n.body} priority="critical" />
        ))}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <StatCard
            title={t("animalsRegistered")}
            value={totalAnimals}
            icon={<span className="text-sm">🐄</span>}
            colorClass="bg-amber-50 text-amber-700"
          />
          <StatCard
            title={t("healthScore")}
            value={`${Math.round((healthyCount / ANIMAL_RECORDS.length) * 100)}%`}
            icon={<Heart className="w-4 h-4" />}
            colorClass="bg-green-50 text-green-600"
            trend="up"
            trendValue="+2%"
          />
          <StatCard
            title={t("lastCheck")}
            value="Leo"
            icon={<Syringe className="w-4 h-4" />}
            colorClass="bg-blue-50 text-blue-600"
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
                data-ocid={`livestock.action_${label.toLowerCase().replace(/\s+/g, "_")}`}
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

        {/* My Livestock Listings Section */}
        <section data-ocid="livestock.my_listings_section">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-primary" />
                {language === "sw"
                  ? "Mifugo Wangu Sokoni"
                  : "My Livestock Listings"}
              </h2>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {activeListings} {language === "sw" ? "zinazotumika" : "active"}{" "}
                · {totalInquiries} {language === "sw" ? "maswali" : "inquiries"}
              </p>
            </div>
            <Button
              size="sm"
              className="gap-1.5 h-8 text-xs px-3"
              onClick={() => {
                setEditTarget(null);
                setModalOpen(true);
              }}
              data-ocid="livestock.add_listing_button"
            >
              <Plus className="w-3.5 h-3.5" />
              {language === "sw" ? "Ongeza Mnyama" : "Add Livestock"}
            </Button>
          </div>

          {listings.length === 0 ? (
            <div
              data-ocid="livestock.listings_empty_state"
              className="bg-card border border-border border-dashed rounded-xl p-6 flex flex-col items-center gap-3 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Tag className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">
                  {language === "sw"
                    ? "Hakuna mifugo sokoni"
                    : "No listings yet"}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {language === "sw"
                    ? "Anza kuuza mifugo wako leo kwa kuongeza orodha"
                    : "Start selling your livestock by adding your first listing"}
                </p>
              </div>
              <Button
                size="sm"
                className="gap-1.5"
                onClick={() => {
                  setEditTarget(null);
                  setModalOpen(true);
                }}
                data-ocid="livestock.empty_state_add_button"
              >
                <Plus className="w-3.5 h-3.5" />
                {language === "sw"
                  ? "Ongeza Mnyama wa Kwanza"
                  : "Add First Listing"}
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {listings.map((listing, i) => (
                <LivestockListingCard
                  key={listing.id}
                  listing={listing}
                  index={i + 1}
                  onEdit={handleEdit}
                  onPauseResume={handlePauseResume}
                  onDelete={handleDeleteConfirm}
                />
              ))}
            </div>
          )}
        </section>

        {/* AI Animal Diagnosis Section */}
        <section data-ocid="livestock.ai_diagnosis_section">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <HeartPulse className="w-4 h-4 text-destructive" />
              {language === "sw"
                ? "Uchunguzi wa Afya ya Mnyama"
                : "AI Animal Diagnosis"}
            </h2>
            <button
              type="button"
              onClick={() => navigate({ to: "/diagnosis" })}
              className="text-xs text-primary font-medium hover:underline flex items-center gap-0.5"
              data-ocid="livestock.diagnosis_view_all_button"
            >
              {language === "sw" ? "Ona Zaidi" : "View All"}
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 space-y-3">
            <div className="space-y-2">
              {[AI_DIAGNOSES.animal_fmd].map((d, i) => (
                <div
                  key={d.requestId}
                  data-ocid={`livestock.recent_diagnosis.${i + 1}`}
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
                  <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-medium shrink-0">
                    {language === "sw" ? "Inasubiri" : "Awaiting"}
                  </span>
                </div>
              ))}
            </div>
            <Button
              size="sm"
              className="w-full gap-2"
              onClick={() => navigate({ to: "/diagnosis" })}
              data-ocid="livestock.new_diagnosis_button"
            >
              <Camera className="w-4 h-4" />
              {language === "sw" ? "Uchunguzi Mpya" : "New Diagnosis"}
            </Button>
          </div>
        </section>

        {/* Predictive Reminder Cards */}
        <PredictiveReminderCards
          userProfile={livestockContext}
          type="livestock"
        />

        {/* Production Forecast */}
        {(() => {
          const milkForecast: ForecastRecord = {
            id: "lf1",
            userId: "local",
            forecastType: "milk_production",
            title:
              language === "sw"
                ? "Utabiri wa Uzalishaji wa Maziwa"
                : "Monthly Milk Production Forecast",
            predictedValue: 450,
            unit: "L/month",
            confidenceScore: 78,
            keyDrivers:
              language === "sw"
                ? [
                    "Ubora wa chakula",
                    "Malisho ya msimu",
                    "Wastani wa Friesian",
                    "Hali ya hewa",
                  ]
                : [
                    "Feed quality",
                    "Seasonal pasture",
                    "Friesian breed average",
                    "Current weather",
                  ],
            monthlyBreakdown: [
              { month: "Jan", value: 420 },
              { month: "Feb", value: 445 },
              { month: "Mar", value: 460 },
              { month: "Apr", value: 450 },
              { month: "May", value: 435 },
              { month: "Jun", value: 410 },
            ],
            sensitivityNote:
              language === "sw"
                ? "Kama ubora wa chakula utashuka kwa 10%, uzalishaji unaweza kupungua kwa 8%"
                : "If feed quality drops 10%, production may decrease by 8%",
            basedOn: {
              weatherScore: 75,
              soilScore: 60,
              feedingScore: 85,
              historyScore: 80,
            },
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            validUntil: new Date(Date.now() + 604800000).toISOString(),
          };
          return (
            <section data-ocid="livestock.forecast_section">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  {language === "sw"
                    ? "Utabiri wa Uzalishaji"
                    : "Production Forecast"}
                </h2>
                <button
                  type="button"
                  onClick={() => navigate({ to: "/forecasting" })}
                  className="text-xs text-primary font-medium hover:underline flex items-center gap-0.5"
                  data-ocid="livestock.forecast_view_all_button"
                >
                  {language === "sw" ? "Ona utabiri wote" : "See all forecasts"}
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <ForecastCard forecast={milkForecast} />
            </section>
          );
        })()}

        {/* AI Advisor */}
        <AIAdvisorWidget
          userName={user?.name ?? "Keeper"}
          tips={LIVESTOCK_TIPS}
          reminders={livestockReminders}
          getMockResponse={getLivestockResponse}
          widgetId="livestock"
          userContext={livestockContext}
          suggestedQuestions={livestockSuggestedQuestions}
        />

        {/* Herd records */}
        <section>
          <h2 className="text-sm font-semibold text-foreground mb-2">
            {t("myAnimals")}
          </h2>
          <div className="space-y-2">
            {ANIMAL_RECORDS.map((animal, i) => (
              <div
                key={animal.id}
                data-ocid={`livestock.animal.${i + 1}`}
                className="bg-card border border-border rounded-xl p-3 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-xl flex-shrink-0">
                  {animal.animalType === "Cattle"
                    ? "🐄"
                    : animal.animalType === "Goats"
                      ? "🐐"
                      : "🐔"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground">
                    {animal.animalType}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {language === "sw" ? "Idadi:" : "Count:"} {animal.count}
                  </p>
                </div>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full border font-medium ${HEALTH_COLORS[animal.healthStatus]}`}
                >
                  {animal.healthStatus === "healthy"
                    ? language === "sw"
                      ? "Mzima"
                      : "Healthy"
                    : animal.healthStatus === "sick"
                      ? language === "sw"
                        ? "Mgonjwa"
                        : "Sick"
                      : animal.healthStatus === "under_treatment"
                        ? language === "sw"
                          ? "Matibabu"
                          : "Treatment"
                        : "Recovered"}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Weather */}
        <WeatherWidget data={weather} lang={language} />

        {/* Upcoming Tasks Widget */}
        <UpcomingTasksWidget />

        {/* Livestock market prices */}
        <section>
          <h2 className="text-sm font-semibold text-foreground mb-2">
            {t("marketPrices")}
          </h2>
          <div className="space-y-2">
            {MARKET_PRICES.filter((p) => p.category === "livestock").map(
              (p) => (
                <MarketPriceCard key={p.commodity} price={p} lang={language} />
              ),
            )}
          </div>
        </section>

        {/* Low-Stock Inventory Alert */}
        {(() => {
          const LOW_STOCK_ITEMS = [
            {
              name: language === "sw" ? "Chanjo ya FMD" : "FMD Vaccine",
              current: 3,
              unit: "doses",
            },
            {
              name: language === "sw" ? "Madini ya Mifugo" : "Mineral Blocks",
              current: 1,
              unit: "blocks",
            },
          ];
          const lowItems = LOW_STOCK_ITEMS.filter((i) => i.current <= 3);
          if (lowItems.length === 0) return null;
          return (
            <div
              data-ocid="livestock.inventory_alert"
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
                data-ocid="livestock.inventory_alert.view_button"
              >
                {language === "sw" ? "Angalia" : "View"}
              </button>
            </div>
          );
        })()}

        {/* Quick Access */}
        <section data-ocid="livestock.quick_access_section">
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
                    language === "sw" ? "Historia ya mifugo" : "Herd history",
                  color: "bg-primary/10 text-primary",
                  to: "/records",
                  ocid: "livestock.quick_access.records",
                },
                {
                  icon: Package,
                  label: language === "sw" ? "Hifadhi" : "Inventory",
                  sub:
                    language === "sw" ? "Dawa na chakula" : "Medicine & feed",
                  color: "bg-amber-100 text-amber-700",
                  to: "/inventory",
                  ocid: "livestock.quick_access.inventory",
                },
                {
                  icon: MapIcon,
                  label: language === "sw" ? "Ramani" : "Farm Map",
                  sub:
                    language === "sw" ? "Maeneo ya malisho" : "Grazing zones",
                  color: "bg-green-50 text-green-600",
                  to: "/farm-map",
                  ocid: "livestock.quick_access.farm_map",
                },
                {
                  icon: BarChart2,
                  label: language === "sw" ? "Uchambuzi" : "Analytics",
                  sub:
                    language === "sw"
                      ? "Utendaji wa mifugo"
                      : "Performance data",
                  color: "bg-blue-50 text-blue-600",
                  to: "/analytics",
                  ocid: "livestock.quick_access.analytics",
                },
                {
                  icon: FileText,
                  label: language === "sw" ? "Mikataba" : "Contracts",
                  sub: language === "sw" ? "Makubaliano salama" : "Agreements",
                  color: "bg-purple-50 text-purple-600",
                  to: "/contracts",
                  ocid: "livestock.quick_access.contracts",
                },
                {
                  icon: Wallet,
                  label: language === "sw" ? "Mikopo" : "Loans",
                  sub: language === "sw" ? "Maombi ya fedha" : "Financing",
                  color: "bg-accent/10 text-accent",
                  to: "/loans",
                  ocid: "livestock.quick_access.loans",
                },
                {
                  icon: Radio,
                  label:
                    language === "sw" ? "Ramani ya Mlipuko" : "Outbreak Map",
                  sub:
                    language === "sw"
                      ? "Magonjwa na mifugo"
                      : "Livestock diseases",
                  color: "bg-red-50 text-red-600",
                  to: "/outbreak-map",
                  ocid: "livestock.quick_access.outbreak_map",
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
                  ocid: "livestock.quick_access.auctions",
                },
                {
                  icon: Droplets,
                  label: language === "sw" ? "Umwagiliaji" : "Irrigation",
                  sub: language === "sw" ? "Ratiba ya maji" : "Water schedule",
                  color: "bg-cyan-50 text-cyan-600",
                  to: "/irrigation",
                  ocid: "livestock.quick_access.irrigation",
                },
                {
                  icon: Satellite,
                  label:
                    language === "sw" ? "Uchambuzi wa Ndege" : "Drone Analysis",
                  sub: language === "sw" ? "Picha za anga" : "Aerial imagery",
                  color: "bg-indigo-50 text-indigo-600",
                  to: "/drone-analysis",
                  ocid: "livestock.quick_access.drone_analysis",
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

      {/* Add / Edit Livestock Modal */}
      <AddLivestockModal
        open={modalOpen}
        existing={editTarget}
        onClose={() => {
          setModalOpen(false);
          setEditTarget(null);
        }}
        onSubmit={handleAddOrEdit}
      />

      {/* Delete Confirmation Dialog */}
      {deleteConfirmId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setDeleteConfirmId(null);
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") setDeleteConfirmId(null);
          }}
          role="presentation"
        >
          <div
            className="bg-card rounded-2xl shadow-2xl p-6 w-full max-w-sm"
            data-ocid="livestock.delete_dialog"
          >
            <h3 className="font-display font-bold text-base text-foreground mb-1">
              {language === "sw" ? "Futa Orodha" : "Delete Listing"}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {language === "sw"
                ? "Una uhakika unataka kufuta orodha hii? Kitendo hiki hakiwezi kurudishwa."
                : "Are you sure you want to delete this listing? This action cannot be undone."}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setDeleteConfirmId(null)}
                data-ocid="livestock.delete_dialog.cancel_button"
              >
                {language === "sw" ? "Ghairi" : "Cancel"}
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={handleDeleteExecute}
                data-ocid="livestock.delete_dialog.confirm_button"
              >
                {language === "sw" ? "Futa" : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
