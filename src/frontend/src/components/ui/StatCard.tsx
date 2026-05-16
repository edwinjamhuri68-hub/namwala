import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: "up" | "down" | "stable";
  trendValue?: string;
  icon?: ReactNode;
  colorClass?: string;
  onClick?: () => void;
}

export function StatCard({
  title,
  value,
  trend,
  trendValue,
  icon,
  colorClass = "bg-primary/10 text-primary",
  onClick,
}: StatCardProps) {
  const TrendIcon =
    trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor =
    trend === "up"
      ? "text-green-600"
      : trend === "down"
        ? "text-destructive"
        : "text-muted-foreground";

  return (
    <div
      data-ocid="stat.card"
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter") onClick();
            }
          : undefined
      }
      className={`bg-card border border-border rounded-xl p-3 ${
        onClick
          ? "cursor-pointer hover:shadow-md active:scale-[0.98] transition-smooth"
          : ""
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        {icon && (
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${colorClass}`}
          >
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="text-xs text-muted-foreground leading-tight truncate">
            {title}
          </div>
          <div className="text-xl font-display font-bold text-foreground mt-0.5">
            {value}
          </div>
        </div>
      </div>
      {trend && trendValue && (
        <div className={`flex items-center gap-1 text-xs mt-2 ${trendColor}`}>
          <TrendIcon className="w-3 h-3" />
          <span>{trendValue}</span>
        </div>
      )}
    </div>
  );
}
