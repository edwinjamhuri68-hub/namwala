import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/store/languageStore";
import { useNavigate } from "@tanstack/react-router";
import {
  CheckCircle2,
  ChevronDown,
  CloudSun,
  Leaf,
  Menu,
  ShoppingCart,
  Star,
  TrendingUp,
  Truck,
  Users,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: "10,000+", labelKey: "landingStatFarmers" as const },
  { value: "500+", labelKey: "landingStatSpecialists" as const },
  { value: "50", labelKey: "landingStatDistricts" as const },
  { value: "98%", labelKey: "landingStatSatisfaction" as const },
];

const FEATURE_KEYS = [
  {
    icon: Leaf,
    titleKey: "landingFeatureAI" as const,
    descKey: "landingFeatureAIDesc" as const,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: TrendingUp,
    titleKey: "landingFeatureMarket" as const,
    descKey: "landingFeatureMarketDesc" as const,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Users,
    titleKey: "landingFeatureExperts" as const,
    descKey: "landingFeatureExpertsDesc" as const,
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: ShoppingCart,
    titleKey: "landingFeatureMarketplace" as const,
    descKey: "landingFeatureMarketplaceDesc" as const,
    color: "text-lime-600",
    bg: "bg-lime-50",
  },
  {
    icon: Truck,
    titleKey: "landingFeatureTransport" as const,
    descKey: "landingFeatureTransportDesc" as const,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
  },
  {
    icon: CloudSun,
    titleKey: "landingFeatureWeather" as const,
    descKey: "landingFeatureWeatherDesc" as const,
    color: "text-sky-600",
    bg: "bg-sky-50",
  },
];

const STEP_KEYS = [
  {
    num: "01",
    titleKey: "landingStep1Title" as const,
    descKey: "landingStep1Desc" as const,
  },
  {
    num: "02",
    titleKey: "landingStep2Title" as const,
    descKey: "landingStep2Desc" as const,
  },
  {
    num: "03",
    titleKey: "landingStep3Title" as const,
    descKey: "landingStep3Desc" as const,
  },
];

const ROLES = [
  { emoji: "🌾", labelKey: "farmer" as const },
  { emoji: "🐄", labelKey: "livestock_keeper" as const },
  { emoji: "🛒", labelKey: "buyer" as const },
  { emoji: "🔬", labelKey: "agri_specialist" as const },
  { emoji: "🩺", labelKey: "veterinarian" as const },
  { emoji: "🌱", labelKey: "input_seller" as const },
  { emoji: "⚙️", labelKey: "input_service_provider" as const },
  { emoji: "🚚", labelKey: "transport_provider" as const },
];

const TRUST_KEYS = [
  {
    icon: CheckCircle2,
    titleKey: "landingTrustFree" as const,
    descKey: "landingTrustFreeDesc" as const,
  },
  {
    icon: Star,
    titleKey: "landingTrustTrusted" as const,
    descKey: "landingTrustTrustedDesc" as const,
  },
  {
    icon: Users,
    titleKey: "landingTrustExperts" as const,
    descKey: "landingTrustExpertsDesc" as const,
  },
];

const NAV_SECTION_IDS = [
  { id: "features", labelKey: "landingNavFeatures" as const },
  { id: "how-it-works", labelKey: "landingNavHowItWorks" as const },
  { id: "roles", labelKey: "landingNavRoles" as const },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { t, language, toggle } = useLanguageStore();
  const heroRef = useRef<HTMLVideoElement>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setNavOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── NAV ── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-card/95 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <button
            type="button"
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-2"
            data-ocid="landing.logo_link"
          >
            <span className="text-2xl">🌿</span>
            <span
              className={`font-display font-bold text-xl ${
                scrolled ? "text-foreground" : "text-white"
              }`}
            >
              Namwala
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-4">
            {NAV_SECTION_IDS.map(({ id, labelKey }) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                className={`text-sm font-medium capitalize transition-smooth ${
                  scrolled
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {t(labelKey)}
              </button>
            ))}
            {/* Language Toggle */}
            <button
              type="button"
              onClick={toggle}
              data-ocid="landing.lang_toggle"
              aria-label={`Switch to ${language === "en" ? "Swahili" : "English"}`}
              className={`text-xs font-bold px-2 py-1 rounded-full transition-smooth ${
                scrolled
                  ? "bg-primary/15 text-primary hover:bg-primary/25"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              {language === "en" ? "SW" : "EN"}
            </button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate({ to: "/login" })}
              className={
                scrolled ? "" : "text-white hover:bg-white/20 hover:text-white"
              }
              data-ocid="landing.nav_signin_button"
            >
              {t("landingSignIn")}
            </Button>
            <Button
              size="sm"
              onClick={() => navigate({ to: "/signup" })}
              className="rounded-full bg-primary text-primary-foreground hover:opacity-90"
              data-ocid="landing.nav_get_started_button"
            >
              {t("landingGetStarted")}
            </Button>
          </nav>

          {/* Mobile right side: lang toggle + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={toggle}
              data-ocid="landing.lang_toggle_mobile"
              aria-label={`Switch to ${language === "en" ? "Swahili" : "English"}`}
              className={`text-xs font-bold px-2 py-1 rounded-full transition-smooth ${
                scrolled
                  ? "bg-primary/15 text-primary hover:bg-primary/25"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              {language === "en" ? "SW" : "EN"}
            </button>
            <button
              type="button"
              className={`p-2 rounded-lg ${
                scrolled ? "text-foreground" : "text-white"
              }`}
              onClick={() => setNavOpen(!navOpen)}
              aria-label="Toggle navigation"
              data-ocid="landing.mobile_menu_toggle"
            >
              {navOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {navOpen && (
          <div className="md:hidden bg-card border-b border-border px-4 pb-4 space-y-2">
            {NAV_SECTION_IDS.map(({ id, labelKey }) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                className="block w-full text-left py-2 text-sm font-medium capitalize text-muted-foreground hover:text-foreground"
              >
                {t(labelKey)}
              </button>
            ))}
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => navigate({ to: "/login" })}
                data-ocid="landing.mobile_signin_button"
              >
                {t("landingSignIn")}
              </Button>
              <Button
                size="sm"
                className="flex-1 rounded-full"
                onClick={() => navigate({ to: "/signup" })}
                data-ocid="landing.mobile_get_started_button"
              >
                {t("landingGetStarted")}
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section
        id="hero"
        className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
        data-ocid="landing.hero_section"
      >
        {/* Video background */}
        <video
          ref={heroRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/assets/namwala-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/60" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm text-sm px-4 py-1">
            🌍 {t("landingBadge")}
          </Badge>
          <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl text-white leading-tight mb-4 drop-shadow-lg">
            Namwala
          </h1>
          <p className="text-white text-xl sm:text-2xl font-medium max-w-2xl mx-auto mb-2 drop-shadow">
            {t("landingTagline")}
          </p>
          <p className="text-white/75 text-base sm:text-lg italic mb-10">
            {t("landingTaglineSw")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => navigate({ to: "/signup" })}
              className="rounded-full bg-primary hover:opacity-90 text-primary-foreground px-8 py-3 text-base font-semibold shadow-xl min-w-[160px]"
              data-ocid="landing.hero_get_started_button"
            >
              {t("landingGetStarted")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate({ to: "/login" })}
              className="rounded-full border-2 border-white text-white bg-transparent hover:bg-white/15 px-8 py-3 text-base font-semibold min-w-[160px]"
              data-ocid="landing.hero_signin_button"
            >
              {t("landingSignIn")}
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          type="button"
          onClick={() => scrollTo("features")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-white animate-bounce transition-smooth"
          aria-label={t("landingScrollDown")}
          data-ocid="landing.scroll_down_button"
        >
          <ChevronDown size={32} strokeWidth={1.5} />
        </button>
      </section>

      {/* ── FEATURES ── */}
      <section
        id="features"
        className="py-24 px-4 sm:px-6 bg-background"
        data-ocid="landing.features_section"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              {t("landingFeaturesBadge")}
            </Badge>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-4">
              {t("landingFeaturesTitle")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              {t("landingFeaturesDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURE_KEYS.map((f, i) => (
              <div
                key={f.titleKey}
                className="group bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-md hover:-translate-y-1 transition-smooth cursor-default"
                data-ocid={`landing.feature_card.${i + 1}`}
              >
                <div className={`inline-flex p-3 rounded-xl ${f.bg} mb-4`}>
                  <f.icon size={24} className={f.color} />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  {t(f.titleKey)}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t(f.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section
        id="how-it-works"
        className="py-24 px-4 sm:px-6 bg-primary/5"
        data-ocid="landing.how_it_works_section"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              {t("landingHowBadge")}
            </Badge>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-4">
              {t("landingHowTitle")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              {t("landingHowDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEP_KEYS.map((step, i) => (
              <div
                key={step.num}
                className="relative flex flex-col items-center text-center group"
                data-ocid={`landing.step_card.${i + 1}`}
              >
                {/* Connector line */}
                {i < STEP_KEYS.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(50%+2.5rem)] right-[calc(-50%+2.5rem)] h-0.5 bg-primary/20" />
                )}
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display font-bold text-xl mb-6 shadow-lg group-hover:scale-105 transition-smooth">
                  {step.num}
                </div>
                <h3 className="font-display font-semibold text-xl text-foreground mb-3">
                  {t(step.titleKey)}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                  {t(step.descKey)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Button
              size="lg"
              onClick={() => navigate({ to: "/signup" })}
              className="rounded-full px-10 py-3 font-semibold shadow-md"
              data-ocid="landing.how_it_works_cta_button"
            >
              {t("landingHowCta")}
            </Button>
          </div>
        </div>
      </section>

      {/* ── ROLES ── */}
      <section
        id="roles"
        className="py-24 px-4 sm:px-6 bg-background"
        data-ocid="landing.roles_section"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-accent/10 text-accent-foreground border-accent/20">
              {t("landingRolesBadge")}
            </Badge>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-4">
              {t("landingRolesTitle")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              {t("landingRolesDesc")}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {ROLES.map((role, i) => (
              <div
                key={role.labelKey}
                className="bg-card border border-border rounded-2xl p-5 flex flex-col items-center gap-3 hover:border-primary/40 hover:shadow-md hover:-translate-y-1 transition-smooth cursor-default"
                data-ocid={`landing.role_card.${i + 1}`}
              >
                <span className="text-4xl">{role.emoji}</span>
                <span className="text-sm font-semibold text-foreground text-center">
                  {t(role.labelKey)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BANNER ── */}
      <section
        className="relative py-28 px-4 sm:px-6 overflow-hidden"
        style={{
          backgroundImage: `url('/assets/generated/landing-stats-bg.dim_1200x600.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        data-ocid="landing.stats_section"
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
            {t("landingStatsBannerTitle")}
          </h2>
          <p className="text-white/75 text-lg mb-14 max-w-xl mx-auto">
            {t("landingStatsBannerDesc")}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <div
                key={s.labelKey}
                className="text-center"
                data-ocid={`landing.stat.${i + 1}`}
              >
                <div className="font-display font-bold text-4xl sm:text-5xl text-white mb-2">
                  {s.value}
                </div>
                <div className="text-white/70 text-sm uppercase tracking-wider">
                  {t(s.labelKey)}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-14">
            <Button
              size="lg"
              onClick={() => navigate({ to: "/signup" })}
              className="rounded-full bg-primary hover:opacity-90 text-primary-foreground px-10 py-3 font-semibold text-base shadow-xl"
              data-ocid="landing.stats_cta_button"
            >
              {t("landingStatsCta")}
            </Button>
          </div>
        </div>
      </section>

      {/* ── TRUST SIGNALS ── */}
      <section
        className="py-16 px-4 sm:px-6 bg-muted/40"
        data-ocid="landing.trust_section"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {TRUST_KEYS.map((item, i) => (
              <div
                key={item.titleKey}
                className="flex flex-col items-center text-center gap-3"
                data-ocid={`landing.trust_item.${i + 1}`}
              >
                <div className="p-3 rounded-full bg-primary/10">
                  <item.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground">
                  {t(item.titleKey)}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t(item.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="bg-card border-t border-border py-10 px-4 sm:px-6"
        data-ocid="landing.footer"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌿</span>
              <div>
                <p className="font-display font-bold text-lg text-foreground">
                  Namwala
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("landingFooterTagline")}
                </p>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <p className="text-sm text-muted-foreground mb-1">
                🌐 {t("landingFooterLangNote")}{" "}
                <span className="font-medium text-foreground">English</span>{" "}
                {language === "sw" ? "na" : "and"}{" "}
                <span className="font-medium text-foreground">Kiswahili</span>
              </p>
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} Namwala. Built with love using{" "}
                <a
                  href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-foreground transition-smooth"
                >
                  caffeine.ai
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
