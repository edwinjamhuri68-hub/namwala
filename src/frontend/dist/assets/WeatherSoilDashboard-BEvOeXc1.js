import { u as useAuthStore, a as useLanguageStore, j as jsxRuntimeExports, L as Layout, h as CloudSun, x as FileText, a2 as SOIL_REPORTS, m as Badge, B as Button, M as MessageCircle, a3 as WEATHER_DATA } from "./index-BUVIgngH.js";
import { S as StatCard } from "./StatCard-vQlqcd7B.js";
import { a as Wind, W as WeatherWidget } from "./WeatherWidget-BNJSz6vI.js";
import { D as Droplets } from "./droplets-Wf5xpwFg.js";
import "./trending-down-B-P0A2rN.js";
import "./minus-BAwtOhGD.js";
function WeatherSoilDashboard() {
  const { user } = useAuthStore();
  const { language } = useLanguageStore();
  const allWeather = Object.values(WEATHER_DATA);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-4 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-xl overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "/assets/generated/weather-soil-specialist.dim_800x400.jpg",
          alt: "Weather",
          className: "w-full h-32 object-cover"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-sky-900/80 to-transparent flex items-end p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-display font-bold text-white", children: language === "sw" ? "Mtaalamu wa Hali ya Hewa" : "Weather & Soil Specialist" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-white/80", children: [
          user == null ? void 0 : user.name,
          " · ",
          user == null ? void 0 : user.specialization
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          title: language === "sw" ? "Vituo" : "Locations",
          value: "5",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CloudSun, { className: "w-4 h-4" }),
          colorClass: "bg-sky-50 text-sky-600"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          title: language === "sw" ? "Ripoti za Udongo" : "Soil Reports",
          value: "8",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4" }),
          colorClass: "bg-amber-50 text-amber-600"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          title: language === "sw" ? "Tahadhari za Hewa" : "Weather Alerts",
          value: "2",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wind, { className: "w-4 h-4" }),
          colorClass: "bg-destructive/10 text-destructive"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground mb-2", children: language === "sw" ? "Hali ya Hewa - Mikoa Yote" : "Weather - All Regions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: allWeather.map((w, i) => {
        var _a;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": `weather.location.${i + 1}`,
            className: "bg-card border border-border rounded-xl p-3 flex items-center gap-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: ((_a = w.forecast[0]) == null ? void 0 : _a.icon) ?? "☀️" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", children: w.location }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: w.condition })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-lg text-foreground", children: [
                  w.temperature,
                  "°C"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 text-xs text-muted-foreground justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { className: "w-3 h-3" }),
                  w.humidity,
                  "%"
                ] }) })
              ] })
            ]
          },
          w.location
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground mb-2", children: language === "sw" ? "Ripoti za Udongo" : "Soil Reports" }),
      SOIL_REPORTS.map((report, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": `weather.soil_report.${i + 1}`,
          className: "bg-card border border-border rounded-xl p-4 mb-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", children: report.location }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "text-[10px]", children: [
                language === "sw" ? "pH" : "pH",
                ": ",
                report.ph
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2 mb-3", children: [
              {
                label: "N",
                value: `${report.nitrogen}%`,
                color: "bg-green-50 text-green-700"
              },
              {
                label: "P",
                value: `${report.phosphorus} ppm`,
                color: "bg-amber-50 text-amber-700"
              },
              {
                label: "K",
                value: `${report.potassium} ppm`,
                color: "bg-blue-50 text-blue-700"
              }
            ].map(({ label, value, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `${color} rounded-lg p-2 text-center`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold", children: label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px]", children: value })
                ]
              },
              label
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: report.recommendation }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: report.suitableCrops.map((crop) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full",
                children: crop
              },
              crop
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  className: "flex-1 text-xs",
                  "data-ocid": `weather.share_report_button.${i + 1}`,
                  children: language === "sw" ? "Tuma Ripoti" : "Share Report"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "text-xs h-8 px-2",
                  "data-ocid": `weather.message_button.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-3 h-3" })
                }
              )
            ] })
          ]
        },
        report.id
      ))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WeatherWidget, { data: allWeather[0], lang: language }),
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
  WeatherSoilDashboard as default
};
