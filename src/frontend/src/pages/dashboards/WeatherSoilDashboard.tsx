import { Layout } from "@/components/Layout";
import { StatCard } from "@/components/ui/StatCard";
import { WeatherWidget } from "@/components/ui/WeatherWidget";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SOIL_REPORTS, WEATHER_DATA } from "@/lib/mockData";
import { useAuthStore } from "@/store/authStore";
import { useLanguageStore } from "@/store/languageStore";
import {
  CloudSun,
  Droplets,
  FileText,
  MessageCircle,
  Thermometer,
  Wind,
} from "lucide-react";

export default function WeatherSoilDashboard() {
  const { user } = useAuthStore();
  const { language } = useLanguageStore();
  const allWeather = Object.values(WEATHER_DATA);

  return (
    <Layout>
      <div className="px-4 py-4 space-y-4">
        {/* Hero */}
        <div className="relative rounded-xl overflow-hidden">
          <img
            src="/assets/generated/weather-soil-specialist.dim_800x400.jpg"
            alt="Weather"
            className="w-full h-32 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sky-900/80 to-transparent flex items-end p-3">
            <div>
              <h1 className="text-lg font-display font-bold text-white">
                {language === "sw"
                  ? "Mtaalamu wa Hali ya Hewa"
                  : "Weather & Soil Specialist"}
              </h1>
              <p className="text-xs text-white/80">
                {user?.name} · {user?.specialization}
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <StatCard
            title={language === "sw" ? "Vituo" : "Locations"}
            value="5"
            icon={<CloudSun className="w-4 h-4" />}
            colorClass="bg-sky-50 text-sky-600"
          />
          <StatCard
            title={language === "sw" ? "Ripoti za Udongo" : "Soil Reports"}
            value="8"
            icon={<FileText className="w-4 h-4" />}
            colorClass="bg-amber-50 text-amber-600"
          />
          <StatCard
            title={language === "sw" ? "Tahadhari za Hewa" : "Weather Alerts"}
            value="2"
            icon={<Wind className="w-4 h-4" />}
            colorClass="bg-destructive/10 text-destructive"
          />
        </div>

        {/* Weather overview */}
        <section>
          <h2 className="text-sm font-semibold text-foreground mb-2">
            {language === "sw"
              ? "Hali ya Hewa - Mikoa Yote"
              : "Weather - All Regions"}
          </h2>
          <div className="space-y-2">
            {allWeather.map((w, i) => (
              <div
                key={w.location}
                data-ocid={`weather.location.${i + 1}`}
                className="bg-card border border-border rounded-xl p-3 flex items-center gap-3"
              >
                <span className="text-2xl">{w.forecast[0]?.icon ?? "☀️"}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{w.location}</p>
                  <p className="text-xs text-muted-foreground">{w.condition}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-foreground">
                    {w.temperature}°C
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground justify-end">
                    <span className="flex items-center gap-0.5">
                      <Droplets className="w-3 h-3" />
                      {w.humidity}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Soil reports */}
        <section>
          <h2 className="text-sm font-semibold text-foreground mb-2">
            {language === "sw" ? "Ripoti za Udongo" : "Soil Reports"}
          </h2>
          {SOIL_REPORTS.map((report, i) => (
            <div
              key={report.id}
              data-ocid={`weather.soil_report.${i + 1}`}
              className="bg-card border border-border rounded-xl p-4 mb-3"
            >
              <div className="flex items-start justify-between mb-2">
                <p className="font-semibold text-sm">{report.location}</p>
                <Badge className="text-[10px]">
                  {language === "sw" ? "pH" : "pH"}: {report.ph}
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {[
                  {
                    label: "N",
                    value: `${report.nitrogen}%`,
                    color: "bg-green-50 text-green-700",
                  },
                  {
                    label: "P",
                    value: `${report.phosphorus} ppm`,
                    color: "bg-amber-50 text-amber-700",
                  },
                  {
                    label: "K",
                    value: `${report.potassium} ppm`,
                    color: "bg-blue-50 text-blue-700",
                  },
                ].map(({ label, value, color }) => (
                  <div
                    key={label}
                    className={`${color} rounded-lg p-2 text-center`}
                  >
                    <p className="text-xs font-bold">{label}</p>
                    <p className="text-[11px]">{value}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                {report.recommendation}
              </p>
              <div className="flex flex-wrap gap-1">
                {report.suitableCrops.map((crop) => (
                  <span
                    key={crop}
                    className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full"
                  >
                    {crop}
                  </span>
                ))}
              </div>
              <div className="flex gap-2 mt-3">
                <Button
                  size="sm"
                  className="flex-1 text-xs"
                  data-ocid={`weather.share_report_button.${i + 1}`}
                >
                  {language === "sw" ? "Tuma Ripoti" : "Share Report"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs h-8 px-2"
                  data-ocid={`weather.message_button.${i + 1}`}
                >
                  <MessageCircle className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </section>

        {/* Full weather widget for user location */}
        <WeatherWidget data={allWeather[0]} lang={language} />

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
