import { Layout } from "@/components/Layout";
import { SearchBar } from "@/components/ui/SearchBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MOCK_PROVIDERS, type MockProvider } from "@/lib/mockData";
import { useLanguageStore } from "@/store/languageStore";
import { useNavigate } from "@tanstack/react-router";
import {
  Briefcase,
  ChevronDown,
  ChevronUp,
  MapPin,
  MessageCircle,
  Package,
  Star,
  Users,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type FilterTab = "all" | "specialist" | "input_seller" | "service_provider";

function StarRating({
  rating,
  onRate,
}: {
  rating: number;
  onRate?: (r: number) => void;
}) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          className={`transition-colors ${
            onRate ? "cursor-pointer hover:scale-110" : "cursor-default"
          }`}
          onMouseEnter={() => onRate && setHover(s)}
          onMouseLeave={() => onRate && setHover(0)}
          onClick={() => onRate?.(s)}
          aria-label={onRate ? `Rate ${s} stars` : undefined}
        >
          <Star
            className={`w-3.5 h-3.5 ${
              s <= (hover || rating)
                ? "fill-accent text-accent"
                : "text-border fill-transparent"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

function ProviderCard({ provider }: { provider: MockProvider }) {
  const { t, language } = useLanguageStore();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [rated, setRated] = useState(false);
  const [rating, setRating] = useState(provider.rating);

  const roleLabel: Record<MockProvider["category"], string> = {
    specialist: t("agri_specialist"),
    input_seller: t("input_seller"),
    service_provider: t("input_service_provider"),
    veterinarian: t("veterinarian"),
  };

  const RoleIcon: Record<MockProvider["category"], typeof Users> = {
    specialist: Users,
    veterinarian: Users,
    input_seller: Package,
    service_provider: Briefcase,
  };

  const Icon = RoleIcon[provider.category];
  const badgeColor: Record<MockProvider["category"], string> = {
    specialist: "bg-purple-100 text-purple-700",
    veterinarian: "bg-blue-100 text-blue-700",
    input_seller: "bg-amber-100 text-amber-700",
    service_provider: "bg-accent/10 text-accent-foreground",
  };

  function handleRate(r: number) {
    setUserRating(r);
    // Simulate submit
    setTimeout(() => {
      setRating((prev) => Number.parseFloat(((prev + r) / 2).toFixed(1)));
      setRated(true);
    }, 400);
  }

  function handleMessage() {
    navigate({ to: "/messages", search: { recipientId: provider.id } });
  }

  return (
    <article
      className="bg-card border border-border rounded-2xl overflow-hidden transition-smooth hover:shadow-md"
      data-ocid={`search.provider_card.${provider.id}`}
    >
      <div className="p-4">
        {/* Header row */}
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border-2 border-primary/20">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-semibold text-foreground text-sm truncate">
                  {provider.name}
                </h3>
                <span
                  className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-full mt-0.5 ${badgeColor[provider.category]}`}
                >
                  {roleLabel[provider.category]}
                </span>
              </div>
              <div className="shrink-0 text-right">
                <StarRating rating={rating} />
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {rating.toFixed(1)} / 5
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-1.5">
              <MapPin className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {provider.location}
              </span>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
          {language === "sw" ? provider.taglineSw : provider.tagline}
        </p>

        {/* Action buttons */}
        <div className="flex gap-2 mt-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="flex-1 text-xs h-8"
            onClick={() => setExpanded((e) => !e)}
            data-ocid={`search.view_profile_button.${provider.id}`}
          >
            {expanded ? (
              <>
                <ChevronUp className="w-3 h-3 mr-1" />
                {language === "sw" ? "Ficha" : "Hide"}
              </>
            ) : (
              <>
                <ChevronDown className="w-3 h-3 mr-1" />
                {t("viewProfile")}
              </>
            )}
          </Button>
          <Button
            type="button"
            size="sm"
            className="flex-1 text-xs h-8 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleMessage}
            data-ocid={`search.message_button.${provider.id}`}
          >
            <MessageCircle className="w-3 h-3 mr-1" />
            {t("sendMessage")}
          </Button>
        </div>
      </div>

      {/* Expanded profile */}
      {expanded && (
        <div className="border-t border-border bg-muted/30 p-4 space-y-3">
          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold text-foreground mb-1">
              {language === "sw" ? "Mawasiliano" : "Contact Info"}
            </h4>
            <div className="space-y-0.5">
              {provider.phone && (
                <p className="text-xs text-muted-foreground">
                  📞 {provider.phone}
                </p>
              )}
              {provider.email && (
                <p className="text-xs text-muted-foreground">
                  ✉️ {provider.email}
                </p>
              )}
            </div>
          </div>

          {/* Specialization / Products / Services */}
          {provider.specialization && (
            <div>
              <h4 className="text-xs font-semibold text-foreground mb-1">
                {language === "sw" ? "Utaalamu" : "Specialization"}
              </h4>
              <p className="text-xs text-muted-foreground">
                {language === "sw"
                  ? (provider.specializationSw ?? provider.specialization)
                  : provider.specialization}
              </p>
            </div>
          )}

          {provider.offerings && provider.offerings.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-foreground mb-1.5">
                {language === "sw"
                  ? provider.category === "input_seller"
                    ? "Bidhaa Zinazopatikana"
                    : "Huduma Zinazotolewa"
                  : provider.category === "input_seller"
                    ? "Products Available"
                    : "Services Offered"}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {provider.offerings.map((item) => (
                  <Badge
                    key={item}
                    variant="secondary"
                    className="text-[10px] px-2 py-0.5"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Rate this provider */}
          <div className="pt-2 border-t border-border">
            <h4 className="text-xs font-semibold text-foreground mb-1.5">
              {language === "sw" ? "Weka Ukadiriaji" : "Rate this Provider"}
            </h4>
            {rated ? (
              <div
                className="flex items-center gap-1.5 text-xs text-accent font-medium"
                data-ocid={`search.rating_success.${provider.id}`}
              >
                <Star className="w-3.5 h-3.5 fill-accent" />
                {language === "sw"
                  ? `Asante! Umeweka nyota ${userRating}.`
                  : `Thank you! You rated ${userRating} stars.`}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <StarRating
                  rating={userRating}
                  onRate={handleRate}
                  key={provider.id}
                />
                <span className="text-[10px] text-muted-foreground">
                  {language === "sw" ? "Gusa nyota" : "Tap to rate"}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

export default function SearchPage() {
  const { language } = useLanguageStore();
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [isSearching, setIsSearching] = useState(false);

  // Simulate search debounce skeleton
  useEffect(() => {
    if (query.length === 0) return;
    setIsSearching(true);
    const timer = setTimeout(() => setIsSearching(false), 600);
    return () => clearTimeout(timer);
  }, [query]);

  const TABS: { key: FilterTab; labelEn: string; labelSw: string }[] = [
    { key: "all", labelEn: "All", labelSw: "Wote" },
    { key: "specialist", labelEn: "Specialists", labelSw: "Wataalamu" },
    { key: "input_seller", labelEn: "Input Sellers", labelSw: "Wauzaji" },
    {
      key: "service_provider",
      labelEn: "Service Providers",
      labelSw: "Watoa Huduma",
    },
  ];

  const results = useMemo(() => {
    const q = query.toLowerCase();
    return MOCK_PROVIDERS.filter((p) => {
      const tabMatch =
        activeTab === "all" ||
        (activeTab === "specialist" &&
          (p.category === "specialist" || p.category === "veterinarian")) ||
        activeTab === p.category;
      if (!tabMatch) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        (p.specialization?.toLowerCase().includes(q) ?? false) ||
        (p.offerings?.some((o) => o.toLowerCase().includes(q)) ?? false)
      );
    });
  }, [query, activeTab]);

  return (
    <Layout>
      <div className="px-4 py-4 space-y-4" data-ocid="search.page">
        {/* Header */}
        <div>
          <h1 className="text-xl font-display font-bold text-foreground">
            {language === "sw" ? "Tafuta Watoa Huduma" : "Find Providers"}
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {language === "sw"
              ? "Wataalamu, wauzaji na watoa huduma karibu nawe"
              : "Specialists, sellers and service providers near you"}
          </p>
        </div>

        {/* Search bar */}
        <SearchBar
          placeholder={
            language === "sw"
              ? "Tafuta wataalamu, wauzaji, huduma..."
              : "Search specialists, sellers, services..."
          }
          value={query}
          onChange={setQuery}
        />

        {/* Filter tabs */}
        <div
          className="flex gap-1.5 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none"
          data-ocid="search.filter_tabs"
        >
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              data-ocid={`search.tab.${tab.key}`}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-smooth ${
                activeTab === tab.key
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {language === "sw" ? tab.labelSw : tab.labelEn}
            </button>
          ))}
        </div>

        {/* Results count */}
        {!isSearching && (
          <p className="text-xs text-muted-foreground">
            {language === "sw"
              ? `Matokeo ${results.length} yamepatikana`
              : `${results.length} provider${results.length !== 1 ? "s" : ""} found`}
          </p>
        )}

        {/* Loading skeletons */}
        {isSearching && (
          <div className="space-y-3" data-ocid="search.loading_state">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-2xl p-4"
              >
                <div className="flex items-start gap-3">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Skeleton className="h-8 flex-1 rounded-lg" />
                  <Skeleton className="h-8 flex-1 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isSearching && results.length === 0 && (
          <div
            className="flex flex-col items-center justify-center py-16 text-center"
            data-ocid="search.empty_state"
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <X className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground text-sm">
              {language === "sw" ? "Hakuna matokeo" : "No providers found"}
            </h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-[220px]">
              {language === "sw"
                ? "Hakuna watoa huduma wanaolingana na utafutaji wako. Jaribu maneno mengine."
                : "No providers found matching your search. Try different keywords."}
            </p>
            {query && (
              <button
                type="button"
                className="mt-4 text-xs text-primary font-medium"
                onClick={() => setQuery("")}
              >
                {language === "sw" ? "Futa utafutaji" : "Clear search"}
              </button>
            )}
          </div>
        )}

        {/* Results */}
        {!isSearching && results.length > 0 && (
          <div className="space-y-3" data-ocid="search.results_list">
            {results.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        )}

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
