import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatTSh } from "@/lib/mockData";
import { useLanguageStore } from "@/store/languageStore";
import type { AnimalListingFull } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  Edit2,
  ImageIcon,
  MapPin,
  MessageCircle,
  Pause,
  Play,
  Trash2,
} from "lucide-react";

const HEALTH_BADGE: Record<string, string> = {
  Excellent: "bg-green-50 text-green-700 border-green-200",
  Good: "bg-green-50 text-green-600 border-green-200",
  Fair: "bg-amber-50 text-amber-700 border-amber-200",
  "Needs Attention": "bg-destructive/10 text-destructive border-destructive/20",
};

const ANIMAL_EMOJI: Record<string, string> = {
  Cattle: "🐄",
  Goats: "🐐",
  Sheep: "🐑",
  Poultry: "🐔",
  Pigs: "🐷",
};

interface Props {
  listing: AnimalListingFull;
  index: number;
  onEdit: (listing: AnimalListingFull) => void;
  onPauseResume: (id: string, isActive: boolean) => void;
  onDelete: (id: string) => void;
}

export function LivestockListingCard({
  listing,
  index,
  onEdit,
  onPauseResume,
  onDelete,
}: Props) {
  const { language } = useLanguageStore();
  const navigate = useNavigate();

  const healthBadgeClass =
    HEALTH_BADGE[listing.healthStatus] ??
    "bg-muted text-muted-foreground border-border";

  return (
    <div
      data-ocid={`livestock.listing.${index}`}
      className={`bg-card border border-border rounded-xl overflow-hidden transition-smooth ${
        !listing.isActive ? "opacity-60" : ""
      }`}
    >
      <div className="flex gap-3 p-3">
        {/* Thumbnail */}
        <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
          {listing.imageUrl ? (
            <img
              src={listing.imageUrl}
              alt={listing.animalType}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-3xl">
              {ANIMAL_EMOJI[listing.animalType] ?? "🐾"}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-1">
            <div className="min-w-0">
              <p className="font-semibold text-sm text-foreground truncate">
                {listing.animalType} {listing.breed ? `— ${listing.breed}` : ""}
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-muted-foreground shrink-0" />
                <p className="text-xs text-muted-foreground truncate">
                  {listing.location}
                </p>
              </div>
            </div>
            {!listing.isActive && (
              <Badge
                variant="outline"
                className="text-[10px] px-1.5 py-0 shrink-0"
              >
                {language === "sw" ? "Imesimamishwa" : "Paused"}
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${healthBadgeClass}`}
            >
              {listing.healthStatus}
            </span>
            <span className="text-[10px] text-muted-foreground">
              {language === "sw" ? "Idadi:" : "Qty:"} {listing.count}
            </span>
            <span className="text-[10px] font-semibold text-primary">
              {formatTSh(listing.pricePerHead)}
            </span>
          </div>

          {/* Inquiry badge */}
          {listing.inquiries > 0 && (
            <button
              type="button"
              onClick={() =>
                navigate({
                  to: "/messages",
                  search: { recipientId: undefined },
                })
              }
              className="mt-1.5 flex items-center gap-1 text-[10px] text-primary font-medium hover:underline"
              data-ocid={`livestock.listing.${index}.inquiry_badge`}
            >
              <MessageCircle className="w-3 h-3" />
              {listing.inquiries} {language === "sw" ? "maswali" : "inquiries"}
            </button>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex border-t border-border divide-x divide-border">
        <button
          type="button"
          onClick={() => onEdit(listing)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
          data-ocid={`livestock.listing.${index}.edit_button`}
        >
          <Edit2 className="w-3.5 h-3.5" />
          {language === "sw" ? "Hariri" : "Edit"}
        </button>
        <button
          type="button"
          onClick={() => onPauseResume(listing.id, listing.isActive)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
          data-ocid={`livestock.listing.${index}.pause_button`}
        >
          {listing.isActive ? (
            <>
              <Pause className="w-3.5 h-3.5" />
              {language === "sw" ? "Simamisha" : "Pause"}
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              {language === "sw" ? "Endelea" : "Resume"}
            </>
          )}
        </button>
        <button
          type="button"
          onClick={() => onDelete(listing.id)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs text-destructive hover:bg-destructive/10 transition-colors"
          data-ocid={`livestock.listing.${index}.delete_button`}
        >
          <Trash2 className="w-3.5 h-3.5" />
          {language === "sw" ? "Futa" : "Delete"}
        </button>
      </div>
    </div>
  );
}
