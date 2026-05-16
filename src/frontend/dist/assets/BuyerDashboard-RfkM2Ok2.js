import { u as useAuthStore, a as useLanguageStore, r as reactExports, j as jsxRuntimeExports, L as Layout, Y as ShoppingCart, P as Package, T as TrendingUp, o as CROP_LISTINGS, m as Badge, z as formatTSh, y as MapPin, B as Button, M as MessageCircle, a4 as ANIMAL_LISTINGS, i as MARKET_PRICES } from "./index-BUVIgngH.js";
import { M as MarketPriceCard } from "./MarketPriceCard-BEDWrgkq.js";
import { S as SearchBar } from "./SearchBar-B1PvrUkg.js";
import { S as StatCard } from "./StatCard-vQlqcd7B.js";
import "./trending-down-B-P0A2rN.js";
import "./minus-BAwtOhGD.js";
function BuyerDashboard() {
  const { user } = useAuthStore();
  const { language } = useLanguageStore();
  const [activeTab, setActiveTab] = reactExports.useState("crops");
  const [search, setSearch] = reactExports.useState("");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-4 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-xl overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "/assets/generated/market-advisor.dim_800x400.jpg",
          alt: "Buyer",
          className: "w-full h-32 object-cover"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-pink-900/80 to-transparent flex items-end p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-display font-bold text-white", children: language === "sw" ? "Dashibodi ya Mnunuzi" : "Buyer Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-white/80", children: [
          (user == null ? void 0 : user.businessName) ?? (user == null ? void 0 : user.name),
          " · ",
          user == null ? void 0 : user.location
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          title: language === "sw" ? "Maagizo" : "My Orders",
          value: "7",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-4 h-4" }),
          colorClass: "bg-pink-50 text-pink-600"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          title: language === "sw" ? "Bidhaa Zinazopatikana" : "Available",
          value: "24",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4" }),
          colorClass: "bg-green-50 text-green-600"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          title: language === "sw" ? "Manunuzi" : "Spent",
          value: "TSh 4.2M",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4" }),
          colorClass: "bg-primary/10 text-primary"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SearchBar,
      {
        placeholder: language === "sw" ? "Tafuta mazao, mifugo..." : "Search crops, livestock...",
        value: search,
        onChange: setSearch
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex gap-1 bg-muted/50 rounded-xl p-1",
        "data-ocid": "buyer.tabs",
        children: ["crops", "livestock", "orders"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": `buyer.tab_${tab}`,
            onClick: () => setActiveTab(tab),
            className: `flex-1 py-1.5 text-xs font-medium rounded-lg transition-smooth ${activeTab === tab ? "bg-card shadow-xs text-foreground" : "text-muted-foreground"}`,
            children: tab === "crops" ? language === "sw" ? "Mazao" : "Crops" : tab === "livestock" ? language === "sw" ? "Mifugo" : "Livestock" : language === "sw" ? "Maagizo" : "Orders"
          },
          tab
        ))
      }
    ),
    activeTab === "crops" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: CROP_LISTINGS.map((listing, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": `buyer.crop.${i + 1}`,
        className: "bg-card border border-border rounded-xl overflow-hidden flex",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: listing.imageUrl,
              alt: listing.cropType,
              className: "w-20 h-20 object-cover flex-shrink-0"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", children: listing.cropType }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: listing.quality === "excellent" ? "default" : "secondary",
                  className: "text-[10px] shrink-0",
                  children: listing.quality
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-primary", children: [
              formatTSh(listing.pricePerUnit),
              "/kg"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              listing.quantity,
              listing.unit,
              " available"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3" }),
              listing.location,
              " · ",
              listing.farmerName
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  className: "text-xs h-7 flex-1",
                  "data-ocid": `buyer.order_button.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-3 h-3 mr-1" }),
                    language === "sw" ? "Agiza" : "Order"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "ghost",
                  className: "text-xs h-7 px-2",
                  "data-ocid": `buyer.contact_button.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-3 h-3" })
                }
              )
            ] })
          ] })
        ]
      },
      listing.id
    )) }),
    activeTab === "livestock" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ANIMAL_LISTINGS.map((listing, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": `buyer.livestock.${i + 1}`,
        className: "bg-card border border-border rounded-xl overflow-hidden flex",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: listing.imageUrl,
              alt: listing.animalType,
              className: "w-20 h-20 object-cover flex-shrink-0"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-sm", children: [
              listing.animalType,
              " ",
              listing.breed ? `(${listing.breed})` : ""
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-primary", children: [
              formatTSh(listing.pricePerUnit),
              "/head"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              listing.count,
              " available · ",
              listing.location
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: listing.keeperName }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  className: "text-xs h-7 flex-1",
                  "data-ocid": `buyer.livestock_order_button.${i + 1}`,
                  children: language === "sw" ? "Nunua" : "Buy"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "ghost",
                  className: "text-xs h-7 px-2",
                  "data-ocid": `buyer.livestock_contact_button.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-3 h-3" })
                }
              )
            ] })
          ] })
        ]
      },
      listing.id
    )) }),
    activeTab === "orders" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [
      "Maize 2000kg · Juma Mwangi",
      "Beans 500kg · Peter Kamau",
      "Goats x5 · Amina Hassan"
    ].map((order, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": `buyer.order_item.${i + 1}`,
        className: "bg-card border border-border rounded-xl p-3 flex items-center justify-between",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: order }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "default", className: "text-[10px]", children: i === 0 ? language === "sw" ? "Inaendelea" : "In Transit" : i === 1 ? language === "sw" ? "Imekamilika" : "Delivered" : language === "sw" ? "Inasubiri" : "Pending" })
        ]
      },
      order
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground mb-2", children: language === "sw" ? "Bei za Soko" : "Market Prices" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: MARKET_PRICES.slice(0, 4).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(MarketPriceCard, { price: p, lang: language }, p.commodity)) })
    ] }),
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
  BuyerDashboard as default
};
