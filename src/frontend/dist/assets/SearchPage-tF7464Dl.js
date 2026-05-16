import { a as useLanguageStore, r as reactExports, a9 as MOCK_PROVIDERS, j as jsxRuntimeExports, L as Layout, n as Skeleton, X, b as useNavigate, P as Package, Q as Users, y as MapPin, B as Button, H as ChevronDown, M as MessageCircle, m as Badge, aa as Star } from "./index-BUVIgngH.js";
import { S as SearchBar } from "./SearchBar-B1PvrUkg.js";
import { B as Briefcase } from "./briefcase-WOQc6aU0.js";
import { C as ChevronUp } from "./chevron-up-CnJPygwE.js";
function StarRating({
  rating,
  onRate
}) {
  const [hover, setHover] = reactExports.useState(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5", children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      className: `transition-colors ${onRate ? "cursor-pointer hover:scale-110" : "cursor-default"}`,
      onMouseEnter: () => onRate && setHover(s),
      onMouseLeave: () => onRate && setHover(0),
      onClick: () => onRate == null ? void 0 : onRate(s),
      "aria-label": onRate ? `Rate ${s} stars` : void 0,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Star,
        {
          className: `w-3.5 h-3.5 ${s <= (hover || rating) ? "fill-accent text-accent" : "text-border fill-transparent"}`
        }
      )
    },
    s
  )) });
}
function ProviderCard({ provider }) {
  const { t, language } = useLanguageStore();
  const navigate = useNavigate();
  const [expanded, setExpanded] = reactExports.useState(false);
  const [userRating, setUserRating] = reactExports.useState(0);
  const [rated, setRated] = reactExports.useState(false);
  const [rating, setRating] = reactExports.useState(provider.rating);
  const roleLabel = {
    specialist: t("agri_specialist"),
    input_seller: t("input_seller"),
    service_provider: t("input_service_provider"),
    veterinarian: t("veterinarian")
  };
  const RoleIcon = {
    specialist: Users,
    veterinarian: Users,
    input_seller: Package,
    service_provider: Briefcase
  };
  const Icon = RoleIcon[provider.category];
  const badgeColor = {
    specialist: "bg-purple-100 text-purple-700",
    veterinarian: "bg-blue-100 text-blue-700",
    input_seller: "bg-amber-100 text-amber-700",
    service_provider: "bg-accent/10 text-accent-foreground"
  };
  function handleRate(r) {
    setUserRating(r);
    setTimeout(() => {
      setRating((prev) => Number.parseFloat(((prev + r) / 2).toFixed(1)));
      setRated(true);
    }, 400);
  }
  function handleMessage() {
    navigate({ to: "/messages", search: { recipientId: provider.id } });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "article",
    {
      className: "bg-card border border-border rounded-2xl overflow-hidden transition-smooth hover:shadow-md",
      "data-ocid": `search.provider_card.${provider.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border-2 border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-6 h-6 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm truncate", children: provider.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `inline-block text-[10px] font-medium px-2 py-0.5 rounded-full mt-0.5 ${badgeColor[provider.category]}`,
                      children: roleLabel[provider.category]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 text-right", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: [
                    rating.toFixed(1),
                    " / 5"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: provider.location })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground leading-relaxed", children: language === "sw" ? provider.taglineSw : provider.tagline }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                className: "flex-1 text-xs h-8",
                onClick: () => setExpanded((e) => !e),
                "data-ocid": `search.view_profile_button.${provider.id}`,
                children: expanded ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-3 h-3 mr-1" }),
                  language === "sw" ? "Ficha" : "Hide"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3 h-3 mr-1" }),
                  t("viewProfile")
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                size: "sm",
                className: "flex-1 text-xs h-8 bg-primary text-primary-foreground hover:bg-primary/90",
                onClick: handleMessage,
                "data-ocid": `search.message_button.${provider.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-3 h-3 mr-1" }),
                  t("sendMessage")
                ]
              }
            )
          ] })
        ] }),
        expanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border bg-muted/30 p-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-semibold text-foreground mb-1", children: language === "sw" ? "Mawasiliano" : "Contact Info" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
              provider.phone && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "📞 ",
                provider.phone
              ] }),
              provider.email && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "✉️ ",
                provider.email
              ] })
            ] })
          ] }),
          provider.specialization && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-semibold text-foreground mb-1", children: language === "sw" ? "Utaalamu" : "Specialization" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: language === "sw" ? provider.specializationSw ?? provider.specialization : provider.specialization })
          ] }),
          provider.offerings && provider.offerings.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-semibold text-foreground mb-1.5", children: language === "sw" ? provider.category === "input_seller" ? "Bidhaa Zinazopatikana" : "Huduma Zinazotolewa" : provider.category === "input_seller" ? "Products Available" : "Services Offered" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: provider.offerings.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "secondary",
                className: "text-[10px] px-2 py-0.5",
                children: item
              },
              item
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-semibold text-foreground mb-1.5", children: language === "sw" ? "Weka Ukadiriaji" : "Rate this Provider" }),
            rated ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-1.5 text-xs text-accent font-medium",
                "data-ocid": `search.rating_success.${provider.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5 fill-accent" }),
                  language === "sw" ? `Asante! Umeweka nyota ${userRating}.` : `Thank you! You rated ${userRating} stars.`
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StarRating,
                {
                  rating: userRating,
                  onRate: handleRate
                },
                provider.id
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: language === "sw" ? "Gusa nyota" : "Tap to rate" })
            ] })
          ] })
        ] })
      ]
    }
  );
}
function SearchPage() {
  const { language } = useLanguageStore();
  const [query, setQuery] = reactExports.useState("");
  const [activeTab, setActiveTab] = reactExports.useState("all");
  const [isSearching, setIsSearching] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (query.length === 0) return;
    setIsSearching(true);
    const timer = setTimeout(() => setIsSearching(false), 600);
    return () => clearTimeout(timer);
  }, [query]);
  const TABS = [
    { key: "all", labelEn: "All", labelSw: "Wote" },
    { key: "specialist", labelEn: "Specialists", labelSw: "Wataalamu" },
    { key: "input_seller", labelEn: "Input Sellers", labelSw: "Wauzaji" },
    {
      key: "service_provider",
      labelEn: "Service Providers",
      labelSw: "Watoa Huduma"
    }
  ];
  const results = reactExports.useMemo(() => {
    const q = query.toLowerCase();
    return MOCK_PROVIDERS.filter((p) => {
      var _a, _b;
      const tabMatch = activeTab === "all" || activeTab === "specialist" && (p.category === "specialist" || p.category === "veterinarian") || activeTab === p.category;
      if (!tabMatch) return false;
      if (!q) return true;
      return p.name.toLowerCase().includes(q) || p.location.toLowerCase().includes(q) || p.tagline.toLowerCase().includes(q) || (((_a = p.specialization) == null ? void 0 : _a.toLowerCase().includes(q)) ?? false) || (((_b = p.offerings) == null ? void 0 : _b.some((o) => o.toLowerCase().includes(q))) ?? false);
    });
  }, [query, activeTab]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-4 space-y-4", "data-ocid": "search.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold text-foreground", children: language === "sw" ? "Tafuta Watoa Huduma" : "Find Providers" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: language === "sw" ? "Wataalamu, wauzaji na watoa huduma karibu nawe" : "Specialists, sellers and service providers near you" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SearchBar,
      {
        placeholder: language === "sw" ? "Tafuta wataalamu, wauzaji, huduma..." : "Search specialists, sellers, services...",
        value: query,
        onChange: setQuery
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex gap-1.5 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none",
        "data-ocid": "search.filter_tabs",
        children: TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setActiveTab(tab.key),
            "data-ocid": `search.tab.${tab.key}`,
            className: `shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-smooth ${activeTab === tab.key ? "bg-primary text-primary-foreground shadow-sm" : "bg-card border border-border text-muted-foreground hover:text-foreground"}`,
            children: language === "sw" ? tab.labelSw : tab.labelEn
          },
          tab.key
        ))
      }
    ),
    !isSearching && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: language === "sw" ? `Matokeo ${results.length} yamepatikana` : `${results.length} provider${results.length !== 1 ? "s" : ""} found` }),
    isSearching && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "search.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-2xl p-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-12 h-12 rounded-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-48" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 flex-1 rounded-lg" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 flex-1 rounded-lg" })
          ] })
        ]
      },
      i
    )) }),
    !isSearching && results.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-16 text-center",
        "data-ocid": "search.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-8 h-8 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm", children: language === "sw" ? "Hakuna matokeo" : "No providers found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 max-w-[220px]", children: language === "sw" ? "Hakuna watoa huduma wanaolingana na utafutaji wako. Jaribu maneno mengine." : "No providers found matching your search. Try different keywords." }),
          query && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "mt-4 text-xs text-primary font-medium",
              onClick: () => setQuery(""),
              children: language === "sw" ? "Futa utafutaji" : "Clear search"
            }
          )
        ]
      }
    ),
    !isSearching && results.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "search.results_list", children: results.map((provider) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProviderCard, { provider }, provider.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-xs text-muted-foreground pt-2 pb-4", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      ". Built with love using",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
          className: "hover:text-primary",
          target: "_blank",
          rel: "noreferrer",
          children: "caffeine.ai"
        }
      )
    ] })
  ] }) });
}
export {
  SearchPage as default
};
