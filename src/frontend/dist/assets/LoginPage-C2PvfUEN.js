import { r as reactExports, u as useAuthStore, a as useLanguageStore, b as useNavigate, j as jsxRuntimeExports, I as Input, B as Button } from "./index-BUVIgngH.js";
import { L as Label } from "./label-BTY_QCm0.js";
import "./index-ob0xpmgs.js";
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
const DEMO_EMAILS = [
  { role: "Farmer", email: "farmer@namwala.tz" },
  { role: "Livestock Keeper", email: "livestock@namwala.tz" },
  { role: "Veterinarian", email: "vet@namwala.tz" },
  { role: "Buyer", email: "buyer@namwala.tz" },
  { role: "Market Advisor", email: "market@namwala.tz" }
];
function LoginPage() {
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("password");
  const [error, setError] = reactExports.useState("");
  const { login, isLoading } = useAuthStore();
  const { t, language, toggle } = useLanguageStore();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const ok = await login({ email, password });
    if (ok) {
      const { user } = useAuthStore.getState();
      if (user) navigate({ to: ROLE_ROUTES[user.role] ?? "/home" });
    } else {
      setError(
        language === "sw" ? "Barua pepe au nywila si sahihi." : "Invalid email or password."
      );
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex flex-col max-w-md mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-56 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "/assets/generated/hero-agriculture.dim_800x500.jpg",
          alt: "Namwala",
          className: "w-full h-full object-cover"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-gradient-to-b from-primary/60 to-primary/80 flex flex-col items-center justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: "🌱" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-white tracking-wide", children: "Namwala" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/80 text-sm text-center px-8", children: language === "sw" ? "Kilimo Bora kwa Tanzania" : "Smart Agriculture for Tanzania" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: toggle,
          "data-ocid": "lang.toggle",
          className: "absolute top-4 right-4 text-xs font-bold bg-white/20 hover:bg-white/30 text-white px-2.5 py-1 rounded-full transition-smooth",
          children: language === "en" ? "SW" : "EN"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 px-5 py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-semibold text-foreground mb-1", children: t("login") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: language === "sw" ? "Karibu tena!" : "Welcome back!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", className: "text-sm font-medium", children: t("email") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "email",
              type: "email",
              required: true,
              value: email,
              onChange: (e) => setEmail(e.target.value),
              placeholder: "juma@example.com",
              "data-ocid": "login.input",
              className: "h-11"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", className: "text-sm font-medium", children: t("password") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "password",
              type: "password",
              required: true,
              value: password,
              onChange: (e) => setPassword(e.target.value),
              placeholder: "••••••••",
              "data-ocid": "login.password_input",
              className: "h-11"
            }
          )
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            "data-ocid": "login.error_state",
            className: "text-sm text-destructive",
            children: error
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            className: "w-full h-11 text-base",
            disabled: isLoading,
            "data-ocid": "login.submit_button",
            children: isLoading ? t("loading") : t("login")
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground mt-4", children: [
        t("noAccount"),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "/signup",
            className: "text-primary font-medium hover:underline",
            "data-ocid": "login.signup_link",
            children: t("registerNow")
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 border border-border rounded-xl p-4 bg-muted/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-2", children: language === "sw" ? "Demo - Bonyeza kujaza:" : "Demo — click to fill:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: DEMO_EMAILS.map(({ role, email: e }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              setEmail(e);
              setPassword("password");
            },
            className: "text-xs bg-card border border-border rounded-lg px-2 py-1 hover:bg-primary/5 hover:border-primary/30 transition-smooth",
            children: role
          },
          e
        )) })
      ] })
    ] })
  ] });
}
export {
  LoginPage as default
};
