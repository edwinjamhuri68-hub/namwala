import { u as useAuthStore, a as useLanguageStore, j as jsxRuntimeExports, L as Layout, f as Truck, m as Badge, B as Button, y as MapPin, z as formatTSh, R as CircleCheckBig, M as MessageCircle } from "./index-BUVIgngH.js";
import { S as StatCard } from "./StatCard-vQlqcd7B.js";
import { C as Calendar } from "./calendar-DegZ54HI.js";
import { P as Plus } from "./plus-DMsGFanj.js";
import "./trending-down-B-P0A2rN.js";
import "./minus-BAwtOhGD.js";
const TRANSPORT_REQUESTS = [
  {
    id: "tr1",
    client: "Juma Mwangi",
    from: "Mbeya",
    to: "Dar es Salaam",
    cargo: "Maize 2000kg",
    date: "2025-05-08",
    price: 35e4,
    status: "confirmed"
  },
  {
    id: "tr2",
    client: "Anna Sanga",
    from: "Singida",
    to: "Mwanza",
    cargo: "Sunflower 3000kg",
    date: "2025-05-09",
    price: 28e4,
    status: "pending"
  },
  {
    id: "tr3",
    client: "David Mushi",
    from: "Arusha",
    to: "Moshi",
    cargo: "Coffee 500kg",
    date: "2025-05-11",
    price: 12e4,
    status: "confirmed"
  }
];
function TransportDashboard() {
  var _a;
  const { user } = useAuthStore();
  const { language } = useLanguageStore();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-4 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-xl overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "/assets/generated/transport-provider.dim_800x400.jpg",
          alt: "Transport",
          className: "w-full h-32 object-cover"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-transparent flex items-end p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-display font-bold text-white", children: language === "sw" ? "Mtoa Huduma za Usafiri" : "Transport Provider" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-white/80", children: [
          user == null ? void 0 : user.name,
          " · ",
          user == null ? void 0 : user.vehicleType
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          title: language === "sw" ? "Safari Zilizopangwa" : "Trips Planned",
          value: "3",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-4 h-4" }),
          colorClass: "bg-indigo-50 text-indigo-600"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          title: language === "sw" ? "Maombi" : "Requests",
          value: "5",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
          colorClass: "bg-amber-50 text-amber-600"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          title: language === "sw" ? "Mapato" : "Earnings",
          value: "TSh 750K",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "💰" }),
          colorClass: "bg-green-50 text-green-600",
          trend: "up",
          trendValue: "+25%"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold mb-2", children: language === "sw" ? "Gari Langu" : "My Vehicle" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-6 h-6 text-indigo-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", children: (user == null ? void 0 : user.vehicleType) ?? "Truck 5T" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            language === "sw" ? "Maeneo:" : "Coverage:",
            " ",
            ((_a = user == null ? void 0 : user.serviceArea) == null ? void 0 : _a.join(", ")) ?? "Arusha, Moshi"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "default", className: "ml-auto text-[10px]", children: language === "sw" ? "Inapatikana" : "Available" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "w-full", "data-ocid": "transport.add_button", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
      language === "sw" ? "Toa Huduma" : "List Service"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground mb-2", children: language === "sw" ? "Maombi ya Usafiri" : "Transport Requests" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: TRANSPORT_REQUESTS.map((req, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": `transport.request.${i + 1}`,
          className: "bg-card border border-border rounded-xl p-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", children: req.client }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: req.status === "confirmed" ? "default" : "outline",
                  className: "text-[10px] shrink-0",
                  children: req.status === "confirmed" ? language === "sw" ? "Imethibitishwa" : "Confirmed" : language === "sw" ? "Inasubiri" : "Pending"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                req.from,
                " → ",
                req.to
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              req.cargo,
              " · ",
              req.date
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-primary mt-1", children: formatTSh(req.price) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-2", children: [
              req.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  className: "text-xs h-7 px-2",
                  "data-ocid": `transport.accept_button.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3 mr-1" }),
                    language === "sw" ? "Kubali" : "Accept"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "ghost",
                  className: "text-xs h-7 px-2 text-primary",
                  "data-ocid": `transport.message_button.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-3 h-3 mr-1" }),
                    language === "sw" ? "Wasiliana" : "Contact"
                  ]
                }
              )
            ] })
          ]
        },
        req.id
      )) })
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
  TransportDashboard as default
};
