import { Star } from "lucide-react";
import { useState } from "react";

interface StarRatingProps {
  /** Current value (1-5 or 0 for unset) */
  value: number;
  /** Max stars, default 5 */
  max?: number;
  /** Display-only mode, default false (interactive) */
  readOnly?: boolean;
  /** Icon size in pixels */
  size?: number;
  /** Called when user selects a star (interactive mode) */
  onChange?: (rating: number) => void;
  className?: string;
}

export function StarRating({
  value,
  max = 5,
  readOnly = false,
  size = 16,
  onChange,
  className = "",
}: StarRatingProps) {
  const [hovered, setHovered] = useState<number>(0);

  const active = hovered > 0 ? hovered : value;

  if (readOnly) {
    // Precise fractional fill for display mode
    return (
      <div
        className={`flex items-center gap-0.5 ${className}`}
        aria-label={`${value} out of ${max} stars`}
        role="img"
      >
        {Array.from({ length: max }, (_, i) => {
          const starNum = i + 1;
          const full = starNum <= Math.floor(value);
          const partial = !full && i < value && value % 1 > 0;
          const fill = partial ? (value % 1) * 100 : full ? 100 : 0;
          return (
            <span
              key={`star-${starNum}`}
              className="relative inline-flex"
              style={{ width: size, height: size }}
            >
              {/* Empty star base */}
              <Star
                style={{ width: size, height: size }}
                className="text-muted-foreground/30 fill-muted-foreground/10 absolute inset-0"
              />
              {/* Filled overlay clipped by width */}
              {fill > 0 && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${fill}%` }}
                >
                  <Star
                    style={{ width: size, height: size }}
                    className="text-amber-400 fill-amber-400"
                  />
                </span>
              )}
            </span>
          );
        })}
      </div>
    );
  }

  // Interactive mode
  return (
    <div
      className={`flex items-center gap-1 ${className}`}
      role="radiogroup"
      aria-label={`Rate out of ${max}`}
      onMouseLeave={() => setHovered(0)}
    >
      {Array.from({ length: max }, (_, i) => {
        const star = i + 1;
        const filled = star <= active;
        return (
          <button
            key={`star-${star}`}
            type="button"
            aria-label={`${star} star${star !== 1 ? "s" : ""}`}
            className={`transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm ${
              filled ? "text-amber-400" : "text-muted-foreground/30"
            }`}
            style={{ width: size + 6, height: size + 6 }}
            onMouseEnter={() => setHovered(star)}
            onClick={() => onChange?.(star)}
          >
            <Star
              style={{ width: size, height: size }}
              className={filled ? "fill-amber-400" : "fill-muted-foreground/10"}
            />
          </button>
        );
      })}
    </div>
  );
}

/** Compact star + number display (e.g. ★ 4.2) for cards */
export function StarBadge({
  rating,
  count,
  size = 12,
  className = "",
}: {
  rating: number;
  count?: number;
  size?: number;
  className?: string;
}) {
  if (!rating || rating === 0) return null;
  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      <StarRating value={rating} readOnly size={size} />
      <span className="text-[10px] text-muted-foreground font-medium ml-0.5">
        {rating.toFixed(1)}
        {count !== undefined ? ` (${count})` : ""}
      </span>
    </div>
  );
}
