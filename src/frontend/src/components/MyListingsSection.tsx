import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguageStore } from "@/store/languageStore";
import type { CropListing } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  Edit2,
  MessageCircle,
  Package,
  PauseCircle,
  PlayCircle,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { QualityBadge } from "./AddProductModal";

export interface ManagedListing extends CropListing {
  isActive: boolean;
  inquiryCount: number;
}

interface MyListingsSectionProps {
  listings: ManagedListing[];
  loading?: boolean;
  onAdd: () => void;
  onEdit: (listing: ManagedListing) => void;
  onPauseResume: (listing: ManagedListing) => void;
  onDelete: (id: string) => void;
}

export function MyListingsSection({
  listings,
  loading,
  onAdd,
  onEdit,
  onPauseResume,
  onDelete,
}: MyListingsSectionProps) {
  const { language } = useLanguageStore();
  const navigate = useNavigate();
  const lbl = (en: string, sw: string) => (language === "sw" ? sw : en);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  if (loading) {
    return (
      <section data-ocid="farmer.my_listings_section">
        <SectionHeader onAdd={onAdd} lbl={lbl} />
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section data-ocid="farmer.my_listings_section">
      <SectionHeader onAdd={onAdd} lbl={lbl} count={listings.length} />

      {listings.length === 0 ? (
        <div
          className="bg-card border border-dashed border-border rounded-xl p-8 flex flex-col items-center gap-3 text-center"
          data-ocid="farmer.my_listings_empty_state"
        >
          <Package className="w-10 h-10 text-muted-foreground/50" />
          <div>
            <p className="text-sm font-medium text-foreground">
              {lbl("No listings yet", "Hakuna orodha bado")}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {lbl(
                "Add your first product to start selling in the marketplace",
                "Ongeza bidhaa yako ya kwanza kuanza kuuza sokoni",
              )}
            </p>
          </div>
          <Button
            size="sm"
            onClick={onAdd}
            className="gap-1.5"
            data-ocid="farmer.my_listings_add_first_button"
          >
            <Plus className="w-3.5 h-3.5" />
            {lbl("Add Product", "Ongeza Bidhaa")}
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {listings.map((listing, i) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              index={i + 1}
              lang={language}
              lbl={lbl}
              onEdit={() => onEdit(listing)}
              onPauseResume={() => onPauseResume(listing)}
              onDeleteRequest={() => setDeleteTarget(listing.id)}
              onInquiryClick={() =>
                navigate({
                  to: "/messages",
                  search: { recipientId: undefined },
                })
              }
            />
          ))}
        </div>
      )}

      {/* Delete confirm dialog */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(v) => !v && setDeleteTarget(null)}
      >
        <AlertDialogContent data-ocid="farmer.delete_listing_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {lbl("Remove Listing?", "Futa Orodha?")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {lbl(
                "This listing will be permanently removed from the marketplace.",
                "Orodha hii itafutwa kabisa kutoka sokoni.",
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="farmer.delete_listing_cancel_button">
              {lbl("Cancel", "Ghairi")}
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="farmer.delete_listing_confirm_button"
              onClick={() => {
                if (deleteTarget) onDelete(deleteTarget);
                setDeleteTarget(null);
              }}
            >
              {lbl("Delete", "Futa")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}

function SectionHeader({
  onAdd,
  lbl,
  count,
}: {
  onAdd: () => void;
  lbl: (en: string, sw: string) => string;
  count?: number;
}) {
  return (
    <div className="flex items-center justify-between mb-2">
      <h2 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
        <Package className="w-4 h-4 text-primary" />
        {lbl("My Listings", "Orodha Zangu")}
        {count !== undefined && count > 0 && (
          <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-medium">
            {count}
          </span>
        )}
      </h2>
      <Button
        size="sm"
        className="gap-1 h-7 text-xs px-2.5"
        onClick={onAdd}
        data-ocid="farmer.add_product_button"
      >
        <Plus className="w-3.5 h-3.5" />
        {lbl("Sell Product", "Uza Bidhaa")}
      </Button>
    </div>
  );
}

function ListingCard({
  listing,
  index,
  lang,
  lbl,
  onEdit,
  onPauseResume,
  onDeleteRequest,
  onInquiryClick,
}: {
  listing: ManagedListing;
  index: number;
  lang: string;
  lbl: (en: string, sw: string) => string;
  onEdit: () => void;
  onPauseResume: () => void;
  onDeleteRequest: () => void;
  onInquiryClick: () => void;
}) {
  return (
    <div
      className="bg-card border border-border rounded-xl overflow-hidden"
      data-ocid={`farmer.listing.item.${index}`}
    >
      <div className="flex gap-0">
        {/* Image */}
        <div className="w-24 h-24 flex-shrink-0 relative">
          <img
            src={
              listing.imageUrl ??
              "/assets/generated/hero-agriculture.dim_800x500.jpg"
            }
            alt={listing.cropType}
            className="w-full h-full object-cover"
          />
          {!listing.isActive && (
            <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
              <span className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wide">
                {lbl("Paused", "Imesimamishwa")}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-2.5 flex-1 min-w-0 flex flex-col gap-1">
          <div className="flex items-start justify-between gap-1">
            <div className="min-w-0">
              <p className="font-semibold text-sm text-foreground truncate">
                {listing.cropType}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {listing.quantity} {listing.unit} · TSh{" "}
                {listing.pricePerUnit.toLocaleString()}/{lbl("unit", "kipimo")}
              </p>
              <p className="text-[11px] text-muted-foreground truncate">
                📍 {listing.location}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <Badge
                variant="outline"
                className={`text-[10px] px-1.5 py-0.5 ${
                  listing.isActive
                    ? "bg-accent/15 text-accent border-accent/30"
                    : "bg-muted text-muted-foreground border-border"
                }`}
              >
                {listing.isActive
                  ? lbl("Active", "Inatumika")
                  : lbl("Paused", "Imesimamishwa")}
              </Badge>
              <QualityBadge quality={listing.quality} lang={lang} />
            </div>
          </div>

          {/* Actions row */}
          <div className="flex items-center gap-1.5 mt-auto pt-1">
            {/* Inquiries */}
            {listing.inquiryCount > 0 ? (
              <button
                type="button"
                onClick={onInquiryClick}
                className="flex items-center gap-1 text-[10px] text-primary hover:underline font-medium"
                data-ocid={`farmer.listing.inquiries.${index}`}
              >
                <MessageCircle className="w-3 h-3" />
                {listing.inquiryCount} {lbl("inquiries", "maswali")}
              </button>
            ) : (
              <span className="text-[10px] text-muted-foreground">
                {lbl("0 inquiries", "0 maswali")}
              </span>
            )}

            <div className="ml-auto flex items-center gap-1">
              <button
                type="button"
                onClick={onEdit}
                className="p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                aria-label="Edit listing"
                data-ocid={`farmer.listing.edit_button.${index}`}
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={onPauseResume}
                className={`p-1.5 rounded-lg transition-colors ${
                  listing.isActive
                    ? "hover:bg-amber-100 text-muted-foreground hover:text-amber-700"
                    : "hover:bg-accent/10 text-muted-foreground hover:text-accent"
                }`}
                aria-label={
                  listing.isActive ? "Pause listing" : "Resume listing"
                }
                data-ocid={`farmer.listing.pause_button.${index}`}
              >
                {listing.isActive ? (
                  <PauseCircle className="w-3.5 h-3.5" />
                ) : (
                  <PlayCircle className="w-3.5 h-3.5" />
                )}
              </button>
              <button
                type="button"
                onClick={onDeleteRequest}
                className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                aria-label="Delete listing"
                data-ocid={`farmer.listing.delete_button.${index}`}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
