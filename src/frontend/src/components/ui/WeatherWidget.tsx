import type { WeatherData } from "@/types";
import { Droplets, Wind } from "lucide-react";

interface WeatherWidgetProps {
  data: WeatherData;
  compact?: boolean;
  lang?: "en" | "sw";
}

const CONDITION_ICONS: Record<string, string> = {
  Sunny: "☀️",
  "Clear Sky": "☀️",
  "Partly Cloudy": "⛅",
  Cloudy: "☁️",
  Rainy: "🌧️",
  Stormy: "⛈️",
  Foggy: "🌫️",
};

export function WeatherWidget({
  data,
  compact = false,
  lang = "en",
}: WeatherWidgetProps) {
  const icon = CONDITION_ICONS[data.condition] ?? "🌤️";
  const labels =
    lang === "sw"
      ? { humidity: "Unyevu", wind: "Upepo", forecast: "Utabiri" }
      : { humidity: "Humidity", wind: "Wind", forecast: "Forecast" };

  if (compact) {
    return (
      <div
        data-ocid="weather.card"
        className="bg-card border border-border rounded-xl p-3 flex items-center gap-3"
      >
        <span className="text-3xl">{icon}</span>
        <div className="min-w-0">
          <div className="text-2xl font-display font-bold text-foreground">
            {data.temperature}°C
          </div>
          <div className="text-xs text-muted-foreground truncate">
            {data.location} · {data.condition}
          </div>
        </div>
        <div className="ml-auto text-right">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Droplets className="w-3 h-3" />
            {data.humidity}%
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
            <Wind className="w-3 h-3" />
            {data.windSpeed} km/h
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      data-ocid="weather.card"
      className="bg-card border border-border rounded-xl p-4"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-3xl font-display font-bold text-foreground">
            {data.temperature}°C
          </div>
          <div className="text-sm text-muted-foreground mt-0.5">
            {data.location}
          </div>
          <div className="text-sm font-medium text-foreground mt-1">
            {data.condition}
          </div>
        </div>
        <span className="text-4xl">{icon}</span>
      </div>
      <div className="flex gap-4 text-xs text-muted-foreground border-t border-border pt-3 mb-3">
        <div className="flex items-center gap-1">
          <Droplets className="w-3.5 h-3.5" />
          <span>
            {labels.humidity}: {data.humidity}%
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Wind className="w-3.5 h-3.5" />
          <span>
            {labels.wind}: {data.windSpeed} km/h
          </span>
        </div>
      </div>
      {data.forecast.length > 0 && (
        <div>
          <div className="text-xs font-medium text-muted-foreground mb-2">
            {labels.forecast}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {data.forecast.slice(0, 3).map((day) => (
              <div key={day.day} className="text-center">
                <div className="text-xs text-muted-foreground">{day.day}</div>
                <div className="text-lg my-0.5">{day.icon}</div>
                <div className="text-xs font-medium text-foreground">
                  {day.high}°
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
