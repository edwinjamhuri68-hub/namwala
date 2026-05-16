import type { NotificationPriority } from "@/types";
import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";

interface AlertBannerProps {
  message: string;
  priority?: NotificationPriority;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const PRIORITY_STYLES: Record<NotificationPriority, string> = {
  critical: "bg-destructive/15 border-destructive/40 text-destructive",
  high: "bg-amber-50 border-amber-300 text-amber-800",
  normal: "bg-accent/10 border-accent/30 text-accent-foreground",
};

export function AlertBanner({
  message,
  priority = "normal",
  dismissible = true,
  onDismiss,
}: AlertBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <div
      data-ocid="alert.banner"
      className={`flex items-start gap-2 px-3 py-2.5 border rounded-lg text-sm ${
        PRIORITY_STYLES[priority]
      }`}
      role="alert"
    >
      <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
      <p className="flex-1 text-sm leading-snug">{message}</p>
      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          data-ocid="alert.close_button"
          className="flex-shrink-0 hover:opacity-70 transition-smooth"
          aria-label="Dismiss alert"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
