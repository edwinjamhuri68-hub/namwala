import type { MarketPrice } from "@/types";
import { Minus, TrendingDown, TrendingUp } from "lucide-react";

interface MarketPriceCardProps {
  price: MarketPrice;
  lang?: "en" | "sw";
}

export function MarketPriceCard({ price, lang = "en" }: MarketPriceCardProps) {
  const name = lang === "sw" ? price.commoditySwahili : price.commodity;
  const TrendIcon =
    price.trend === "up"
      ? TrendingUp
      : price.trend === "down"
        ? TrendingDown
        : Minus;
  const trendColor =
    price.trend === "up"
      ? "text-green-600"
      : price.trend === "down"
        ? "text-destructive"
        : "text-muted-foreground";
  const trendBg =
    price.trend === "up"
      ? "bg-green-50"
      : price.trend === "down"
        ? "bg-destructive/5"
        : "bg-muted/50";

  return (
    <div
      data-ocid="market.price_card"
      className="bg-card border border-border rounded-xl p-3 flex items-center gap-3"
    >
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
        <span className="text-lg">
          {price.category === "livestock" ? "🐄" : "🌾"}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm text-foreground truncate">
          {name}
        </div>
        <div className="text-xs text-muted-foreground">{price.market}</div>
      </div>
      <div className="text-right">
        <div className="font-bold text-sm text-foreground">
          {price.pricePerKg.toLocaleString()}
        </div>
        <div className="text-[10px] text-muted-foreground">TSh/kg</div>
        <div
          className={`flex items-center gap-0.5 text-xs mt-0.5 ${trendColor} ${trendBg} px-1.5 py-0.5 rounded-full`}
        >
          <TrendIcon className="w-3 h-3" />
          <span>
            {price.trend === "stable"
              ? "—"
              : `${price.trend === "up" ? "+" : "-"}${price.changeAmount}`}
          </span>
        </div>
      </div>
    </div>
  );
}
