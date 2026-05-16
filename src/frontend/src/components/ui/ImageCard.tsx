import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

interface ImageCardProps {
  imageUrl?: string;
  title: string;
  description?: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  actionLabel?: string;
  onAction?: () => void;
  meta?: string;
  children?: ReactNode;
  compact?: boolean;
}

export function ImageCard({
  imageUrl,
  title,
  description,
  badge,
  badgeVariant = "secondary",
  actionLabel,
  onAction,
  meta,
  children,
  compact = false,
}: ImageCardProps) {
  return (
    <div
      data-ocid="image.card"
      className="bg-card border border-border rounded-xl overflow-hidden"
    >
      {imageUrl && (
        <div className={compact ? "h-28" : "h-40"}>
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-sm text-foreground leading-tight truncate">
            {title}
          </h3>
          {badge && (
            <Badge variant={badgeVariant} className="text-[10px] shrink-0">
              {badge}
            </Badge>
          )}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-2">
            {description}
          </p>
        )}
        {meta && (
          <p className="text-[11px] text-muted-foreground mb-2">{meta}</p>
        )}
        {children}
        {actionLabel && onAction && (
          <Button
            type="button"
            size="sm"
            className="w-full mt-2 text-xs"
            onClick={onAction}
            data-ocid="image_card.action_button"
          >
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
