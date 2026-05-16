import { Layout } from "@/components/Layout";
import {
  MapListToggle,
  TANZANIA_REGION_GRID,
  TanzaniaMapView,
} from "@/components/TanzaniaMapView";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { TRANSPORT_PROVIDERS, formatTSh } from "@/lib/mockData";
import { useLanguageStore } from "@/store/languageStore";
import type { TransportBooking, TransportProvider } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  Calculator,
  CheckCircle2,
  Clock,
  MapPin,
  MessageSquare,
  Star,
  Truck,
} from "lucide-react";
import type React from "react";
import { useEffect, useMemo, useState } from "react";

// ── Availability badge config ─────────────────────────────────────────────────

const AVAIL_CONFIG = {
  available: {
    className:
      "bg-green-500/10 text-green-700 border-green-500/30 dark:text-green-400",
    dot: "bg-green-500",
    labelKey: "availableSlots" as const,
  },
  limited: {
    className:
      "bg-yellow-500/10 text-yellow-700 border-yellow-500/30 dark:text-yellow-400",
    dot: "bg-yellow-500",
    labelKey: "limitedSlots" as const,
  },
  full: {
    className: "bg-destructive/10 text-destructive border-destructive/30",
    dot: "bg-destructive",
    labelKey: "fullyBooked" as const,
  },
};

function getAvailabilityStatus(
  provider: TransportProvider,
): "available" | "limited" | "full" {
  if (provider.availabilityStatus) return provider.availabilityStatus;
  const count = provider.timeSlots?.length ?? 0;
  if (count === 0) return "full";
  if (count <= 3) return "limited";
  return "available";
}

// ── Vehicle type helpers ─────────────────────────────────────────────────────

const VEHICLE_BADGE_COLOR: Record<string, string> = {
  truck: "bg-primary/10 text-primary border-primary/20",
  pickup: "bg-accent/10 text-accent-foreground border-accent/20",
  motorcycle: "bg-secondary text-secondary-foreground border-border",
  cart: "bg-muted text-muted-foreground border-border",
  minivan: "bg-primary/15 text-primary border-primary/25",
};

const VEHICLE_EMOJI: Record<string, string> = {
  truck: "🚛",
  pickup: "🛻",
  motorcycle: "🏍️",
  cart: "🛒",
  minivan: "🚐",
};

const STATUS_BADGE: Record<
  TransportBooking["status"],
  { label: string; labelSw: string; className: string }
> = {
  pending: {
    label: "Pending",
    labelSw: "Inasubiri",
    className: "bg-secondary text-secondary-foreground border-border",
  },
  confirmed: {
    label: "Confirmed",
    labelSw: "Imethibitishwa",
    className:
      "bg-green-500/10 text-green-700 border-green-500/30 dark:text-green-400",
  },
  in_transit: {
    label: "In Transit",
    labelSw: "Njiani",
    className: "bg-primary/10 text-primary border-primary/20",
  },
  delivered: {
    label: "Delivered",
    labelSw: "Imefikishwa",
    className: "bg-muted text-muted-foreground border-border",
  },
  cancelled: {
    label: "Cancelled",
    labelSw: "Imeghairiwa",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
};

// ── localStorage helpers ──────────────────────────────────────────────────────

const LS_KEY = "namwala_transport_bookings";

function loadBookings(): TransportBooking[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw) as TransportBooking[];
  } catch {
    /* ignore */
  }
  return SEED_BOOKINGS;
}

function saveBookings(bookings: TransportBooking[]): void {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(bookings));
  } catch {
    /* ignore */
  }
}

// ── Random ref generator ──────────────────────────────────────────────────────

function genRef(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// ── Mock seed bookings ────────────────────────────────────────────────────────

const SEED_BOOKINGS: TransportBooking[] = [
  {
    id: "tb-seed-1",
    providerId: "tp1",
    providerName: "Kariuki Transport Services",
    status: "confirmed",
    pickupLocation: "Namwala Market",
    deliveryLocation: "Dodoma Grain Store",
    scheduledDate: "2026-05-12",
    notes: "2,000 kg maize in 40-kg bags",
    totalCost: 375000,
    createdAt: "2026-05-05T10:00:00Z",
  },
  {
    id: "tb-seed-2",
    providerId: "tp3",
    providerName: "Msomi Motorcycle Deliveries",
    status: "delivered",
    pickupLocation: "Niko Village",
    deliveryLocation: "Namwala Health Centre",
    scheduledDate: "2026-05-03",
    notes: "Urgent medicine delivery",
    totalCost: 12000,
    createdAt: "2026-05-02T08:00:00Z",
  },
];

// ── Booking form state ────────────────────────────────────────────────────────

interface BookingForm {
  pickupLocation: string;
  deliveryLocation: string;
  scheduledDate: string;
  estimatedDistanceKm: string;
  selectedTimeSlot: string;
  notes: string;
}

const EMPTY_FORM: BookingForm = {
  pickupLocation: "",
  deliveryLocation: "",
  scheduledDate: "",
  estimatedDistanceKm: "",
  selectedTimeSlot: "",
  notes: "",
};

// ── Booking success state ─────────────────────────────────────────────────────

interface BookingSuccess {
  reference: string;
  providerName: string;
  totalCost: number;
  selectedSlot: string;
  pickupLocation: string;
  deliveryLocation: string;
}

// ── Availability Badge ────────────────────────────────────────────────────────

function AvailabilityBadge({ provider }: { provider: TransportProvider }) {
  const { t } = useLanguageStore();
  const status = getAvailabilityStatus(provider);
  const cfg = AVAIL_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${cfg.className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {t(cfg.labelKey)}
    </span>
  );
}

// ── Cost Calculator Panel ─────────────────────────────────────────────────────

interface CostCalcProps {
  provider: TransportProvider;
  distanceKm: string;
  onDistanceChange: (v: string) => void;
}

function CostCalculator({
  provider,
  distanceKm,
  onDistanceChange,
}: CostCalcProps) {
  const { t } = useLanguageStore();
  const cost = distanceKm ? provider.pricePerKm * Number(distanceKm) : null;

  return (
    <div className="bg-muted/50 border border-border rounded-xl p-4 space-y-3">
      <div className="flex items-center gap-2 mb-1">
        <Calculator className="w-4 h-4 text-primary" />
        <span className="text-sm font-semibold text-foreground">
          {t("costCalculator")}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">
            {t("distanceKm")}
          </Label>
          <Input
            type="number"
            min="1"
            placeholder="e.g. 150"
            data-ocid="transport_booking.distance_input"
            value={distanceKm}
            onChange={(e) => onDistanceChange(e.target.value)}
            className="h-9"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">
            {t("ratePerKm")}
          </Label>
          <div className="h-9 flex items-center px-3 bg-card border border-border rounded-md text-sm font-semibold text-foreground">
            {formatTSh(provider.pricePerKm)}
          </div>
        </div>
      </div>
      <div
        data-ocid="transport_booking.cost_readout"
        className={`rounded-lg px-4 py-3 flex items-center justify-between border ${
          cost !== null && cost > 0
            ? "bg-primary/10 border-primary/20"
            : "bg-muted/60 border-border"
        }`}
      >
        <span
          className={`text-sm font-medium ${
            cost !== null && cost > 0 ? "text-primary" : "text-muted-foreground"
          }`}
        >
          {t("estimatedCostLabel")}
        </span>
        <span
          className={`text-lg font-bold ${
            cost !== null && cost > 0 ? "text-primary" : "text-muted-foreground"
          }`}
        >
          {cost !== null && cost > 0 ? formatTSh(cost) : "—"}
        </span>
      </div>
    </div>
  );
}

// ── Time Slot Picker ──────────────────────────────────────────────────────────

interface TimeSlotPickerProps {
  provider: TransportProvider;
  selectedSlot: string;
  onSelect: (slot: string) => void;
}

function TimeSlotPicker({
  provider,
  selectedSlot,
  onSelect,
}: TimeSlotPickerProps) {
  const { t } = useLanguageStore();
  const slots = provider.timeSlots ?? [];
  const status = getAvailabilityStatus(provider);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          <Label className="text-sm font-semibold text-foreground">
            {t("timeSlots")}
          </Label>
        </div>
        <AvailabilityBadge provider={provider} />
      </div>

      {status === "full" || slots.length === 0 ? (
        <p className="text-xs text-muted-foreground bg-muted/40 rounded-lg px-3 py-2">
          {t("noSlotsAvailable")}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-1.5">
          {slots.map((slot) => (
            <label
              key={slot}
              className={`flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition-colors ${
                selectedSlot === slot
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <input
                type="radio"
                name="timeSlot"
                value={slot}
                checked={selectedSlot === slot}
                onChange={() => onSelect(slot)}
                className="accent-primary"
              />
              <span className="text-sm text-foreground">{slot}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Provider Card ─────────────────────────────────────────────────────────────

interface ProviderCardProps {
  provider: TransportProvider;
  index: number;
  onBook: (p: TransportProvider) => void;
}

function ProviderCard({ provider, index, onBook }: ProviderCardProps) {
  const { t, language } = useLanguageStore();
  const navigate = useNavigate();
  const badgeClass =
    VEHICLE_BADGE_COLOR[provider.vehicleType] ??
    "bg-muted text-muted-foreground border-border";
  const emoji = VEHICLE_EMOJI[provider.vehicleType] ?? "🚗";
  const vehicleLabel =
    provider.vehicleType.charAt(0).toUpperCase() +
    provider.vehicleType.slice(1);
  const avStatus = getAvailabilityStatus(provider);

  return (
    <div
      data-ocid={`transport_provider.item.${index}`}
      className="bg-card border border-border rounded-xl p-4 flex flex-col gap-3 hover:shadow-md transition-shadow duration-200"
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-2xl shrink-0">{emoji}</span>
          <div className="min-w-0">
            <h3 className="font-display font-semibold text-sm text-foreground truncate">
              {provider.name}
            </h3>
            <span
              className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full border mt-0.5 ${badgeClass}`}
            >
              {vehicleLabel}
            </span>
          </div>
        </div>
        {/* Rating */}
        <div className="flex items-center gap-1 shrink-0">
          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-semibold text-foreground">
            {provider.rating.toFixed(1)}
          </span>
          <span className="text-xs text-muted-foreground">
            ({provider.ratingCount} {t("ratingCount")})
          </span>
        </div>
      </div>

      {/* Availability badge */}
      <div className="flex items-center justify-between">
        <AvailabilityBadge provider={provider} />
        {avStatus !== "full" && (
          <span className="text-xs text-muted-foreground">
            {provider.timeSlots?.length ?? 0}{" "}
            {language === "sw" ? "nyakati" : "slots"}
          </span>
        )}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-muted/50 rounded-lg p-2 text-center">
          <p className="text-xs text-muted-foreground">{t("capacityFilter")}</p>
          <p className="text-sm font-bold text-foreground">
            {provider.capacityTons} t
          </p>
        </div>
        <div className="bg-muted/50 rounded-lg p-2 text-center">
          <p className="text-xs text-muted-foreground">{t("pricePerKm")}</p>
          <p className="text-sm font-bold text-foreground">
            {formatTSh(provider.pricePerKm)}
          </p>
        </div>
      </div>

      {/* Coverage areas */}
      <div>
        <div className="flex items-center gap-1 mb-1">
          <MapPin className="w-3 h-3 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">{t("coverageAreas")}</p>
        </div>
        <div className="flex flex-wrap gap-1">
          {provider.coverageAreas.slice(0, 3).map((area) => (
            <Badge
              key={area}
              variant="outline"
              className="text-xs px-1.5 py-0 border-border text-foreground"
            >
              {area}
            </Badge>
          ))}
          {provider.coverageAreas.length > 3 && (
            <Badge
              variant="outline"
              className="text-xs px-1.5 py-0 border-border text-muted-foreground"
            >
              +{provider.coverageAreas.length - 3}
            </Badge>
          )}
        </div>
      </div>

      {/* Description */}
      {provider.description && (
        <p className="text-xs text-muted-foreground line-clamp-2">
          {provider.description}
        </p>
      )}

      {/* Action buttons */}
      <div className="flex gap-2 mt-auto pt-1">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="flex-1 gap-1.5"
          data-ocid={`transport_provider.message_button.${index}`}
          onClick={() =>
            navigate({
              to: "/messages",
              search: { recipientId: provider.id },
            })
          }
        >
          <MessageSquare className="w-3.5 h-3.5" />
          {language === "sw" ? "Ujumbe" : t("message")}
        </Button>
        <Button
          type="button"
          size="sm"
          className="flex-1 gap-1.5"
          data-ocid={`transport_provider.book_button.${index}`}
          onClick={() => onBook(provider)}
        >
          <Truck className="w-3.5 h-3.5" />
          {t("bookNow")}
        </Button>
      </div>
    </div>
  );
}

// ── Booking Success Screen ────────────────────────────────────────────────────

function BookingSuccessView({
  success,
  onClose,
}: {
  success: BookingSuccess;
  onClose: () => void;
}) {
  const { t } = useLanguageStore();
  return (
    <div
      data-ocid="transport_booking.success_state"
      className="text-center space-y-5 py-2"
    >
      <div className="flex justify-center">
        <CheckCircle2 className="w-16 h-16 text-green-500" />
      </div>
      <div>
        <h3 className="font-display text-xl font-bold text-foreground">
          {t("bookingConfirmed")}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {t("bookingSuccessDesc")}
        </p>
      </div>

      {/* Reference */}
      <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
        <p className="text-xs text-muted-foreground mb-1">
          {t("bookingReference")}
        </p>
        <p className="text-2xl font-mono font-bold text-primary tracking-widest">
          {success.reference}
        </p>
      </div>

      {/* Cost breakdown */}
      <div className="bg-card border border-border rounded-xl p-4 text-left space-y-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {t("costBreakdown")}
        </p>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{success.providerName}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{t("selectedSlot")}</span>
          <span className="font-medium text-foreground">
            {success.selectedSlot || "—"}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{t("pickupAddress")}</span>
          <span className="font-medium text-foreground truncate max-w-[60%]">
            {success.pickupLocation}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{t("deliveryAddress")}</span>
          <span className="font-medium text-foreground truncate max-w-[60%]">
            {success.deliveryLocation}
          </span>
        </div>
        <Separator />
        <div className="flex justify-between text-base font-bold">
          <span className="text-foreground">{t("estimatedCostLabel")}</span>
          <span className="text-primary">
            {success.totalCost > 0 ? formatTSh(success.totalCost) : "—"}
          </span>
        </div>
      </div>

      <Button
        type="button"
        className="w-full"
        data-ocid="transport_booking.close_button"
        onClick={onClose}
      >
        {t("confirm")}
      </Button>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function TransportSearchPage() {
  const { t, language } = useLanguageStore();
  const navigate = useNavigate();

  // View mode
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  // Filters
  const [query, setQuery] = useState("");
  const [vehicleFilter, setVehicleFilter] = useState<string>("all");
  const [capacityFilter, setCapacityFilter] = useState<string>("any");

  // Map region selection
  const [selectedRegion, setSelectedRegion] = useState<string>("All Regions");

  // Booking modal
  const [bookingProvider, setBookingProvider] =
    useState<TransportProvider | null>(null);
  const [form, setForm] = useState<BookingForm>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<BookingSuccess | null>(
    null,
  );

  // My bookings
  const [myBookings, setMyBookings] =
    useState<TransportBooking[]>(loadBookings);

  // Sync bookings to localStorage
  useEffect(() => {
    saveBookings(myBookings);
  }, [myBookings]);

  // ── Derive region names from the Tanzania grid ────────────────────────────
  const tanzaniaRegionNames = useMemo(
    () => new Set(TANZANIA_REGION_GRID.map((r) => r.name)),
    [],
  );

  // ── Filter logic (shared between list & map) ──────────────────────────────
  const filtered = useMemo(() => {
    return TRANSPORT_PROVIDERS.filter((p) => {
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.coverageAreas.some((a) => a.toLowerCase().includes(q));

      const matchesVehicle =
        vehicleFilter === "all" || p.vehicleType === vehicleFilter;

      const matchesCapacity =
        capacityFilter === "any" ||
        (capacityFilter === "under1" && p.capacityTons < 1) ||
        (capacityFilter === "1to5" &&
          p.capacityTons >= 1 &&
          p.capacityTons <= 5) ||
        (capacityFilter === "over5" && p.capacityTons > 5);

      const matchesRegion =
        selectedRegion === "All Regions" ||
        p.coverageAreas.some(
          (a) => a.toLowerCase() === selectedRegion.toLowerCase(),
        );

      return matchesQuery && matchesVehicle && matchesCapacity && matchesRegion;
    });
  }, [query, vehicleFilter, capacityFilter, selectedRegion]);

  // ── Provider count per Tanzania region (for map pins) ─────────────────────
  const providerCountByRegion = useMemo<Record<string, number>>(() => {
    const counts: Record<string, number> = {};
    for (const provider of TRANSPORT_PROVIDERS) {
      for (const area of provider.coverageAreas) {
        if (tanzaniaRegionNames.has(area)) {
          counts[area] = (counts[area] ?? 0) + 1;
        }
      }
    }
    return counts;
  }, [tanzaniaRegionNames]);

  // ── Cost preview for modal ────────────────────────────────────────────────
  const estimatedCost =
    bookingProvider && form.estimatedDistanceKm
      ? bookingProvider.pricePerKm * Number(form.estimatedDistanceKm)
      : null;

  // ── Booking submit ────────────────────────────────────────────────────────
  function handleBookSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!bookingProvider) return;
    const avStatus = getAvailabilityStatus(bookingProvider);
    if (avStatus === "full") return;
    setSubmitting(true);
    setTimeout(() => {
      const ref = genRef();
      const newBooking: TransportBooking = {
        id: `tb-${Date.now()}`,
        providerId: bookingProvider.id,
        providerName: bookingProvider.name,
        status: "confirmed",
        pickupLocation: form.pickupLocation,
        deliveryLocation: form.deliveryLocation,
        scheduledDate: form.scheduledDate,
        notes: form.notes || undefined,
        totalCost: estimatedCost ?? 0,
        createdAt: new Date().toISOString(),
      };
      setMyBookings((prev) => [newBooking, ...prev]);
      setBookingSuccess({
        reference: ref,
        providerName: bookingProvider.name,
        totalCost: estimatedCost ?? 0,
        selectedSlot: form.selectedTimeSlot,
        pickupLocation: form.pickupLocation,
        deliveryLocation: form.deliveryLocation,
      });
      setSubmitting(false);
    }, 900);
  }

  function closeBookingModal() {
    setBookingProvider(null);
    setBookingSuccess(null);
    setForm(EMPTY_FORM);
  }

  function handleRegionSelect(region: string) {
    setSelectedRegion(region);
  }

  function clearAllFilters() {
    setQuery("");
    setVehicleFilter("all");
    setCapacityFilter("any");
    setSelectedRegion("All Regions");
  }

  return (
    <Layout>
      <div
        data-ocid="transport_search.page"
        className="min-h-screen bg-background"
      >
        {/* ── Page Header ──────────────────────────────────────────────────── */}
        <div className="bg-card border-b border-border shadow-sm px-4 py-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between gap-3 mb-1">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <h1 className="font-display text-2xl font-bold text-foreground">
                  {t("findTransport")}
                </h1>
              </div>
              {/* Map / List toggle */}
              <MapListToggle
                viewMode={viewMode}
                onToggle={() =>
                  setViewMode((v) => (v === "list" ? "map" : "list"))
                }
                lang={language}
                t={(key) => {
                  if (key === "listView") return t("transportListView");
                  if (key === "mapView") return t("transportMapView");
                  return t(key);
                }}
              />
            </div>
            <p className="text-sm text-muted-foreground pl-[52px]">
              {t("findTransportSub")}
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
          {/* ── Filters ────────────────────────────────────────────────────── */}
          <section
            data-ocid="transport_search.filters"
            className="bg-card border border-border rounded-xl p-4 space-y-3"
          >
            <div className="relative">
              <Input
                data-ocid="transport_search.search_input"
                placeholder={t("searchByNameOrLocation")}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                🔍
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">
                  {t("vehicleType")}
                </Label>
                <Select value={vehicleFilter} onValueChange={setVehicleFilter}>
                  <SelectTrigger
                    data-ocid="transport_search.vehicle_select"
                    className="h-9 text-sm"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("allVehicles")}</SelectItem>
                    <SelectItem value="truck">🚛 Truck</SelectItem>
                    <SelectItem value="pickup">🛻 Pickup</SelectItem>
                    <SelectItem value="minivan">🚐 Minivan</SelectItem>
                    <SelectItem value="motorcycle">🏍️ Motorcycle</SelectItem>
                    <SelectItem value="cart">🛒 Cart</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">
                  {t("capacityFilter")}
                </Label>
                <Select
                  value={capacityFilter}
                  onValueChange={setCapacityFilter}
                >
                  <SelectTrigger
                    data-ocid="transport_search.capacity_select"
                    className="h-9 text-sm"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">{t("anyCapacity")}</SelectItem>
                    <SelectItem value="under1">{t("under1ton")}</SelectItem>
                    <SelectItem value="1to5">{t("oneToFiveTons")}</SelectItem>
                    <SelectItem value="over5">{t("over5tons")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                {filtered.length}{" "}
                {language === "sw" ? "wamepatikana" : t("searchResults")}
                {selectedRegion !== "All Regions" && (
                  <span className="ml-1 font-medium text-primary">
                    · {selectedRegion}
                  </span>
                )}
              </p>
              {(query ||
                vehicleFilter !== "all" ||
                capacityFilter !== "any" ||
                selectedRegion !== "All Regions") && (
                <button
                  type="button"
                  data-ocid="transport_search.clear_filters"
                  onClick={clearAllFilters}
                  className="text-xs text-primary hover:underline font-medium"
                >
                  {t("searchClearQuery")}
                </button>
              )}
            </div>
          </section>

          {/* ── Map View ─────────────────────────────────────────────────── */}
          {viewMode === "map" && (
            <section data-ocid="transport_search.map_view">
              <TanzaniaMapView
                listingCountByRegion={providerCountByRegion}
                selectedRegion={selectedRegion}
                onSelectRegion={handleRegionSelect}
                lang={language}
                t={(key) => {
                  if (key === "listingsCount")
                    return t("transportProvidersCount");
                  if (key === "selectRegion") return t("transportSelectRegion");
                  if (key === "viewingRegion")
                    return t("transportViewingRegion");
                  if (key === "backToAllRegions")
                    return t("transportBackToAll");
                  return t(key);
                }}
                totalFilteredCount={filtered.length}
              />
            </section>
          )}

          {/* ── Provider Grid ───────────────────────────────────────────────── */}
          <section data-ocid="transport_provider.list">
            {/* Selected region info banner (in list mode) */}
            {viewMode === "list" && selectedRegion !== "All Regions" && (
              <div
                data-ocid="transport_search.region_banner"
                className="flex items-center justify-between bg-primary/10 border border-primary/20 rounded-xl px-3 py-2 mb-4"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-semibold text-primary">
                    {t("transportViewingRegion")} {selectedRegion}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ({filtered.length} {t("transportProvidersCount")})
                  </span>
                </div>
                <button
                  type="button"
                  data-ocid="transport_search.clear_region"
                  onClick={() => setSelectedRegion("All Regions")}
                  className="text-[10px] text-primary/70 hover:text-primary font-medium underline underline-offset-2"
                >
                  {t("transportBackToAll")}
                </button>
              </div>
            )}

            {filtered.length === 0 ? (
              <div
                data-ocid="transport_provider.empty_state"
                className="bg-card border border-border rounded-xl p-10 text-center"
              >
                <span className="text-4xl block mb-3">🚧</span>
                <p className="text-muted-foreground text-sm">
                  {selectedRegion !== "All Regions"
                    ? t("transportNoProvidersInRegion")
                    : t("noProvidersFound")}
                </p>
                {selectedRegion !== "All Regions" && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {selectedRegion}
                  </p>
                )}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="mt-3"
                  onClick={clearAllFilters}
                >
                  {t("searchClearQuery")}
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((provider, idx) => (
                  <ProviderCard
                    key={provider.id}
                    provider={provider}
                    index={idx + 1}
                    onBook={setBookingProvider}
                  />
                ))}
              </div>
            )}
          </section>

          {/* ── My Transport Bookings ──────────────────────────────────────── */}
          <section data-ocid="transport_requests.section">
            <Separator className="mb-6" />
            <h2 className="font-display text-lg font-bold text-foreground mb-4">
              {t("myBookings")}
            </h2>
            {myBookings.length === 0 ? (
              <div
                data-ocid="transport_requests.empty_state"
                className="bg-muted/40 border border-border rounded-xl p-8 text-center"
              >
                <span className="text-3xl block mb-2">📦</span>
                <p className="text-sm text-muted-foreground">
                  {t("noBookingsYet")}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {myBookings.map((booking, idx) => {
                  const status = STATUS_BADGE[booking.status];
                  const statusLabel =
                    language === "sw" ? status.labelSw : status.label;
                  return (
                    <div
                      key={booking.id}
                      data-ocid={`transport_requests.item.${idx + 1}`}
                      className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3"
                    >
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm text-foreground truncate">
                            {booking.providerName}
                          </span>
                          <span
                            className={`text-xs font-medium px-2 py-0.5 rounded-full border ${status.className}`}
                          >
                            {statusLabel}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {t("routeSummary")}: {booking.pickupLocation} →{" "}
                          {booking.deliveryLocation}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          📅 {booking.scheduledDate}
                          {booking.totalCost > 0 && (
                            <> · {formatTSh(booking.totalCost)}</>
                          )}
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="gap-1.5 shrink-0"
                        data-ocid={`transport_requests.message_button.${idx + 1}`}
                        onClick={() =>
                          navigate({
                            to: "/messages",
                            search: { recipientId: booking.providerId },
                          })
                        }
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        {t("messageProvider")}
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* ── Booking Modal ──────────────────────────────────────────────────── */}
      <Dialog
        open={!!bookingProvider}
        onOpenChange={(open) => {
          if (!open) closeBookingModal();
        }}
      >
        <DialogContent
          data-ocid="transport_booking.dialog"
          className="max-w-lg max-h-[92vh] overflow-y-auto"
        >
          <DialogHeader>
            <DialogTitle className="font-display">
              {bookingSuccess
                ? t("bookingConfirmed")
                : `${t("bookNow")} — ${bookingProvider?.name}`}
            </DialogTitle>
          </DialogHeader>

          {/* Success view */}
          {bookingSuccess ? (
            <BookingSuccessView
              success={bookingSuccess}
              onClose={closeBookingModal}
            />
          ) : (
            <form onSubmit={handleBookSubmit} className="space-y-5">
              {/* Cost Calculator */}
              {bookingProvider && (
                <CostCalculator
                  provider={bookingProvider}
                  distanceKm={form.estimatedDistanceKm}
                  onDistanceChange={(v) =>
                    setForm((f) => ({ ...f, estimatedDistanceKm: v }))
                  }
                />
              )}

              {/* Time Slot Picker */}
              {bookingProvider && (
                <TimeSlotPicker
                  provider={bookingProvider}
                  selectedSlot={form.selectedTimeSlot}
                  onSelect={(slot) =>
                    setForm((f) => ({ ...f, selectedTimeSlot: slot }))
                  }
                />
              )}

              <Separator />

              {/* Pickup Address */}
              <div className="space-y-1.5">
                <Label htmlFor="pickup">{t("pickupAddress")}</Label>
                <Input
                  id="pickup"
                  data-ocid="transport_booking.pickup_input"
                  required
                  placeholder={
                    language === "sw"
                      ? "mfano: Soko la Namwala"
                      : "e.g. Namwala Market"
                  }
                  value={form.pickupLocation}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, pickupLocation: e.target.value }))
                  }
                />
              </div>

              {/* Delivery Address */}
              <div className="space-y-1.5">
                <Label htmlFor="delivery">{t("deliveryAddress")}</Label>
                <Input
                  id="delivery"
                  data-ocid="transport_booking.delivery_input"
                  required
                  placeholder={
                    language === "sw"
                      ? "mfano: Ghala la Nafaka Dodoma"
                      : "e.g. Dodoma Grain Store"
                  }
                  value={form.deliveryLocation}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, deliveryLocation: e.target.value }))
                  }
                />
              </div>

              {/* Scheduled Date */}
              <div className="space-y-1.5">
                <Label htmlFor="date">{t("scheduledDate")}</Label>
                <Input
                  id="date"
                  type="date"
                  data-ocid="transport_booking.date_input"
                  required
                  min={new Date().toISOString().slice(0, 10)}
                  value={form.scheduledDate}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, scheduledDate: e.target.value }))
                  }
                />
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <Label htmlFor="notes">{t("notes")}</Label>
                <Textarea
                  id="notes"
                  data-ocid="transport_booking.notes_textarea"
                  rows={2}
                  placeholder={
                    language === "sw"
                      ? "mfano: magunia 50 ya mahindi"
                      : "e.g. 2,000 kg maize in 40 kg bags"
                  }
                  value={form.notes}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, notes: e.target.value }))
                  }
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-1">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  data-ocid="transport_booking.cancel_button"
                  onClick={closeBookingModal}
                >
                  {t("cancel")}
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  data-ocid="transport_booking.submit_button"
                  disabled={
                    submitting ||
                    (bookingProvider
                      ? getAvailabilityStatus(bookingProvider) === "full"
                      : false)
                  }
                >
                  {submitting ? t("loading") : t("bookNow")}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
