import { Layout } from "@/components/Layout";
import { AlertBanner } from "@/components/ui/AlertBanner";
import { MarketPriceCard } from "@/components/ui/MarketPriceCard";
import { SearchBar } from "@/components/ui/SearchBar";
import { WeatherWidget } from "@/components/ui/WeatherWidget";
import { MARKET_PRICES, getWeatherForLocation } from "@/lib/mockData";
import { useAuthStore } from "@/store/authStore";
import { useLanguageStore } from "@/store/languageStore";
import { useNotificationStore } from "@/store/notificationStore";
import { Link } from "@tanstack/react-router";
import {
  Camera,
  CloudSun,
  MessageCircle,
  Pause,
  Play,
  Search,
  ShoppingBasket,
  Stethoscope,
  TrendingUp,
  Truck,
} from "lucide-react";
import { useRef, useState } from "react";

const ROLE_ROUTES: Record<string, string> = {
  farmer: "/dashboard/farmer",
  livestock_keeper: "/dashboard/livestock",
  agri_specialist: "/dashboard/agri-specialist",
  veterinarian: "/dashboard/veterinarian",
  input_seller: "/dashboard/input-seller",
  input_service_provider: "/dashboard/input-service",
  weather_soil_specialist: "/dashboard/weather-soil",
  market_advisor: "/dashboard/market-advisor",
  transport_provider: "/dashboard/transport",
  buyer: "/dashboard/buyer",
};

const QUICK_ACTIONS = [
  {
    icon: Camera,
    label: "Gundua Ugonjwa",
    labelEn: "Detect Disease",
    color: "bg-destructive/10 text-destructive",
    to: "/dashboard/farmer",
  },
  {
    icon: MessageCircle,
    label: "Ujumbe",
    labelEn: "Messages",
    color: "bg-primary/10 text-primary",
    to: "/messages",
  },
  {
    icon: ShoppingBasket,
    label: "Soko",
    labelEn: "Marketplace",
    color: "bg-accent/10 text-accent",
    to: "/home",
  },
  {
    icon: Stethoscope,
    label: "Daktari",
    labelEn: "Vet/Specialist",
    color: "bg-purple-100 text-purple-600",
    to: "/home",
  },
  {
    icon: TrendingUp,
    label: "Bei za Soko",
    labelEn: "Market Prices",
    color: "bg-green-50 text-green-600",
    to: "/dashboard/market-advisor",
  },
  {
    icon: Truck,
    label: "Usafiri",
    labelEn: "Transport",
    color: "bg-indigo-50 text-indigo-600",
    to: "/dashboard/transport",
  },
  {
    icon: CloudSun,
    label: "Hali ya Hewa",
    labelEn: "Weather",
    color: "bg-sky-50 text-sky-600",
    to: "/dashboard/weather-soil",
  },
  {
    icon: Search,
    label: "Tafuta",
    labelEn: "Find Providers",
    color: "bg-amber-50 text-amber-600",
    to: "/search",
  },
];

export default function HomePage() {
  const { user } = useAuthStore();
  const { t, language } = useLanguageStore();
  const { notifications } = useNotificationStore();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const weather = getWeatherForLocation(user?.location ?? "Dodoma");
  const critical = notifications.filter(
    (n) => n.priority === "critical" && !n.read,
  );
  const hour = new Date().getHours();
  const greeting =
    hour < 12
      ? t("goodMorning")
      : hour < 17
        ? t("goodAfternoon")
        : t("goodEvening");
  const dashRoute = user ? ROLE_ROUTES[user.role] : "/home";

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setVideoPlaying(!videoPlaying);
  };

  return (
    <Layout>
      <div className="px-4 py-4 space-y-4">
        {/* Greeting */}
        <div>
          <h1 className="text-xl font-display font-bold text-foreground">
            {greeting}
            {user ? `, ${user.name.split(" ")[0]}!` : "!"}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {language === "sw"
              ? "Karibu Namwala - Kilimo Bora"
              : "Welcome to Namwala - Smart Agriculture"}
          </p>
        </div>

        {/* Search */}
        <SearchBar placeholder={t("searchPlaceholder")} />

        {/* Critical alerts */}
        {critical.slice(0, 2).map((n) => (
          <AlertBanner key={n.id} message={n.body} priority="critical" />
        ))}

        {/* Namwala Video Section */}
        <section data-ocid="home.video_section">
          <h2 className="text-sm font-semibold text-foreground mb-2">
            {t("aboutNamwala")}
          </h2>
          <div className="relative rounded-xl overflow-hidden border border-border shadow-md bg-black">
            <video
              ref={videoRef}
              src="/assets/namwala-hero.mp4"
              autoPlay
              muted
              loop
              playsInline
              poster="/assets/generated/hero-agriculture.dim_800x500.jpg"
              className="w-full h-44 object-cover"
            />
            {/* Overlay: brand + play/pause */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 px-3 pb-2.5 flex items-end justify-between">
              <div>
                <p className="text-white font-display font-bold text-sm leading-tight">
                  Namwala
                </p>
                <p className="text-white/70 text-[10px]">
                  {t("aboutNamwalaDesc")}
                </p>
              </div>
              <button
                type="button"
                onClick={toggleVideo}
                data-ocid="home.video_playpause"
                aria-label={videoPlaying ? "Pause video" : "Play video"}
                className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/35 transition-smooth flex items-center justify-center text-white pointer-events-auto"
              >
                {videoPlaying ? <Pause size={14} /> : <Play size={14} />}
              </button>
            </div>
          </div>
        </section>

        {/* Weather */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-foreground">
              {t("todaysWeather")}
            </h2>
          </div>
          <WeatherWidget data={weather} lang={language} />
        </section>

        {/* Quick Actions */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-foreground">
              {t("quickActions")}
            </h2>
            {user && (
              <Link
                to={dashRoute}
                className="text-xs text-primary font-medium"
                data-ocid="home.dashboard_link"
              >
                {language === "sw" ? "Dashibodi" : "My Dashboard"} →
              </Link>
            )}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {QUICK_ACTIONS.map(({ icon: Icon, label, labelEn, color, to }) => (
              <Link
                key={label}
                to={to}
                data-ocid={`home.action_${label.toLowerCase().replace(/\s+/g, "_")}`}
                className="flex flex-col items-center gap-1.5 p-2 bg-card border border-border rounded-xl hover:shadow-sm transition-smooth active:scale-95"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] text-center text-muted-foreground leading-tight">
                  {language === "sw" ? label : labelEn}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Market prices */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-foreground">
              {t("marketPrices")}
            </h2>
            <Link
              to="/dashboard/market-advisor"
              className="text-xs text-primary font-medium"
              data-ocid="home.market_link"
            >
              {t("viewAll")} →
            </Link>
          </div>
          <div className="space-y-2">
            {MARKET_PRICES.slice(0, 4).map((p) => (
              <MarketPriceCard key={p.commodity} price={p} lang={language} />
            ))}
          </div>
        </section>

        {/* Farm image banner */}
        <section>
          <div className="rounded-xl overflow-hidden border border-border">
            <img
              src="/assets/generated/hero-agriculture.dim_800x500.jpg"
              alt="Tanzania Agriculture"
              className="w-full h-36 object-cover"
            />
            <div className="bg-card p-3">
              <p className="text-xs font-medium text-foreground">
                {language === "sw"
                  ? "Msimu wa Mavuno 2025"
                  : "Harvest Season 2025"}
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {language === "sw"
                  ? "Mazao mazuri yanategemewa katika mikoa yote."
                  : "Good yields expected across all regions."}
              </p>
            </div>
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
    </Layout>
  );
}
