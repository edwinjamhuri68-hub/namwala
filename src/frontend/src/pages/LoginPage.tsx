import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/authStore";
import { useLanguageStore } from "@/store/languageStore";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

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

// Demo credentials hint
const DEMO_EMAILS = [
  { role: "Farmer", email: "farmer@namwala.tz" },
  { role: "Livestock Keeper", email: "livestock@namwala.tz" },
  { role: "Veterinarian", email: "vet@namwala.tz" },
  { role: "Buyer", email: "buyer@namwala.tz" },
  { role: "Market Advisor", email: "market@namwala.tz" },
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");
  const { login, isLoading } = useAuthStore();
  const { t, language, toggle } = useLanguageStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const ok = await login({ email, password });
    if (ok) {
      const { user } = useAuthStore.getState();
      if (user) navigate({ to: ROLE_ROUTES[user.role] ?? "/home" });
    } else {
      setError(
        language === "sw"
          ? "Barua pepe au nywila si sahihi."
          : "Invalid email or password.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Hero image header */}
      <div className="relative h-56 overflow-hidden">
        <img
          src="/assets/generated/hero-agriculture.dim_800x500.jpg"
          alt="Namwala"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 to-primary/80 flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl">🌱</span>
            <h1 className="text-3xl font-display font-bold text-white tracking-wide">
              Namwala
            </h1>
          </div>
          <p className="text-primary-foreground/80 text-sm text-center px-8">
            {language === "sw"
              ? "Kilimo Bora kwa Tanzania"
              : "Smart Agriculture for Tanzania"}
          </p>
        </div>
        {/* Language toggle */}
        <button
          type="button"
          onClick={toggle}
          data-ocid="lang.toggle"
          className="absolute top-4 right-4 text-xs font-bold bg-white/20 hover:bg-white/30 text-white px-2.5 py-1 rounded-full transition-smooth"
        >
          {language === "en" ? "SW" : "EN"}
        </button>
      </div>

      <div className="flex-1 px-5 py-6">
        <h2 className="text-xl font-display font-semibold text-foreground mb-1">
          {t("login")}
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          {language === "sw" ? "Karibu tena!" : "Welcome back!"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-sm font-medium">
              {t("email")}
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="juma@example.com"
              data-ocid="login.input"
              className="h-11"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-sm font-medium">
              {t("password")}
            </Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              data-ocid="login.password_input"
              className="h-11"
            />
          </div>

          {error && (
            <p
              data-ocid="login.error_state"
              className="text-sm text-destructive"
            >
              {error}
            </p>
          )}

          <Button
            type="submit"
            className="w-full h-11 text-base"
            disabled={isLoading}
            data-ocid="login.submit_button"
          >
            {isLoading ? t("loading") : t("login")}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-4">
          {t("noAccount")}{" "}
          <a
            href="/signup"
            className="text-primary font-medium hover:underline"
            data-ocid="login.signup_link"
          >
            {t("registerNow")}
          </a>
        </p>

        {/* Demo credentials */}
        <div className="mt-6 border border-border rounded-xl p-4 bg-muted/30">
          <p className="text-xs font-medium text-muted-foreground mb-2">
            {language === "sw"
              ? "Demo - Bonyeza kujaza:"
              : "Demo — click to fill:"}
          </p>
          <div className="flex flex-wrap gap-2">
            {DEMO_EMAILS.map(({ role, email: e }) => (
              <button
                key={e}
                type="button"
                onClick={() => {
                  setEmail(e);
                  setPassword("password");
                }}
                className="text-xs bg-card border border-border rounded-lg px-2 py-1 hover:bg-primary/5 hover:border-primary/30 transition-smooth"
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
