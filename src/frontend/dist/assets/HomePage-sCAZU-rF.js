import { u as useAuthStore, a as useLanguageStore, d as useNotificationStore, r as reactExports, g as getWeatherForLocation, j as jsxRuntimeExports, L as Layout, e as Link, c as Camera, M as MessageCircle, T as TrendingUp, f as Truck, h as CloudSun, S as Search, i as MARKET_PRICES } from "./index-BUVIgngH.js";
import { A as AlertBanner } from "./AlertBanner-gHy4kgBH.js";
import { M as MarketPriceCard } from "./MarketPriceCard-BEDWrgkq.js";
import { S as SearchBar } from "./SearchBar-B1PvrUkg.js";
import { W as WeatherWidget } from "./WeatherWidget-BNJSz6vI.js";
import { P as Pause, a as Play } from "./play-CswM2M6J.js";
import { S as ShoppingBasket } from "./shopping-basket-8nt8_ggH.js";
import { S as Stethoscope } from "./stethoscope-BgimVgvv.js";
import "./triangle-alert-CqH2Gyzq.js";
import "./trending-down-B-P0A2rN.js";
import "./minus-BAwtOhGD.js";
import "./droplets-Wf5xpwFg.js";
const ROLE_ROUTES = {
  farmer: "/dashboard/farmer",
  livestock_keeper: "/dashboard/livestock",
  agri_specialist: "/dashboard/agri-specialist",
  veterinarian: "/dashboard/veterinarian",
  input_seller: "/dashboard/input-seller",
  input_service_provider: "/dashboard/input-service",
  weather_soil_specialist: "/dashboard/weather-soil",
  market_advisor: "/dashboard/market-advisor",
  transport_provider: "/dashboard/transport",
  buyer: "/dashboard/buyer"
};
const QUICK_ACTIONS = [
  {
    icon: Camera,
    label: "Gundua Ugonjwa",
    labelEn: "Detect Disease",
    color: "bg-destructive/10 text-destructive",
    to: "/dashboard/farmer"
  },
  {
    icon: MessageCircle,
    label: "Ujumbe",
    labelEn: "Messages",
    color: "bg-primary/10 text-primary",
    to: "/messages"
  },
  {
    icon: ShoppingBasket,
    label: "Soko",
    labelEn: "Marketplace",
    color: "bg-accent/10 text-accent",
    to: "/home"
  },
  {
    icon: Stethoscope,
    label: "Daktari",
    labelEn: "Vet/Specialist",
    color: "bg-purple-100 text-purple-600",
    to: "/home"
  },
  {
    icon: TrendingUp,
    label: "Bei za Soko",
    labelEn: "Market Prices",
    color: "bg-green-50 text-green-600",
    to: "/dashboard/market-advisor"
  },
  {
    icon: Truck,
    label: "Usafiri",
    labelEn: "Transport",
    color: "bg-indigo-50 text-indigo-600",
    to: "/dashboard/transport"
  },
  {
    icon: CloudSun,
    label: "Hali ya Hewa",
    labelEn: "Weather",
    color: "bg-sky-50 text-sky-600",
    to: "/dashboard/weather-soil"
  },
  {
    icon: Search,
    label: "Tafuta",
    labelEn: "Find Providers",
    color: "bg-amber-50 text-amber-600",
    to: "/search"
  }
];
function HomePage() {
  const { user } = useAuthStore();
  const { t, language } = useLanguageStore();
  const { notifications } = useNotificationStore();
  const videoRef = reactExports.useRef(null);
  const [videoPlaying, setVideoPlaying] = reactExports.useState(true);
  const weather = getWeatherForLocation((user == null ? void 0 : user.location) ?? "Dodoma");
  const critical = notifications.filter(
    (n) => n.priority === "critical" && !n.read
  );
  const hour = (/* @__PURE__ */ new Date()).getHours();
  const greeting = hour < 12 ? t("goodMorning") : hour < 17 ? t("goodAfternoon") : t("goodEvening");
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-4 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-xl font-display font-bold text-foreground", children: [
        greeting,
        user ? `, ${user.name.split(" ")[0]}!` : "!"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: language === "sw" ? "Karibu Namwala - Kilimo Bora" : "Welcome to Namwala - Smart Agriculture" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SearchBar, { placeholder: t("searchPlaceholder") }),
    critical.slice(0, 2).map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(AlertBanner, { message: n.body, priority: "critical" }, n.id)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "home.video_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground mb-2", children: t("aboutNamwala") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-xl overflow-hidden border border-border shadow-md bg-black", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "video",
          {
            ref: videoRef,
            src: "/assets/namwala-hero.mp4",
            autoPlay: true,
            muted: true,
            loop: true,
            playsInline: true,
            poster: "/assets/generated/hero-agriculture.dim_800x500.jpg",
            className: "w-full h-44 object-cover"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 inset-x-0 px-3 pb-2.5 flex items-end justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-display font-bold text-sm leading-tight", children: "Namwala" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-[10px]", children: t("aboutNamwalaDesc") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: toggleVideo,
              "data-ocid": "home.video_playpause",
              "aria-label": videoPlaying ? "Pause video" : "Play video",
              className: "w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/35 transition-smooth flex items-center justify-center text-white pointer-events-auto",
              children: videoPlaying ? /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { size: 14 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 14 })
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground", children: t("todaysWeather") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(WeatherWidget, { data: weather, lang: language })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground", children: t("quickActions") }),
        user && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: dashRoute,
            className: "text-xs text-primary font-medium",
            "data-ocid": "home.dashboard_link",
            children: [
              language === "sw" ? "Dashibodi" : "My Dashboard",
              " →"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2", children: QUICK_ACTIONS.map(({ icon: Icon, label, labelEn, color, to }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to,
          "data-ocid": `home.action_${label.toLowerCase().replace(/\s+/g, "_")}`,
          className: "flex flex-col items-center gap-1.5 p-2 bg-card border border-border rounded-xl hover:shadow-sm transition-smooth active:scale-95",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-10 h-10 rounded-full flex items-center justify-center ${color}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-center text-muted-foreground leading-tight", children: language === "sw" ? label : labelEn })
          ]
        },
        label
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground", children: t("marketPrices") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/dashboard/market-advisor",
            className: "text-xs text-primary font-medium",
            "data-ocid": "home.market_link",
            children: [
              t("viewAll"),
              " →"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: MARKET_PRICES.slice(0, 4).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(MarketPriceCard, { price: p, lang: language }, p.commodity)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl overflow-hidden border border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "/assets/generated/hero-agriculture.dim_800x500.jpg",
          alt: "Tanzania Agriculture",
          className: "w-full h-36 object-cover"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground", children: language === "sw" ? "Msimu wa Mavuno 2025" : "Harvest Season 2025" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: language === "sw" ? "Mazao mazuri yanategemewa katika mikoa yote." : "Good yields expected across all regions." })
      ] })
    ] }) }),
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
  HomePage as default
};
