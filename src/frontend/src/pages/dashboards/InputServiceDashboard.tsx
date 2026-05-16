import { Layout } from "@/components/Layout";
import { StatCard } from "@/components/ui/StatCard";
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
import { Textarea } from "@/components/ui/textarea";
import { useBackend } from "@/hooks/useBackend";
import { SERVICE_LISTINGS, formatTSh } from "@/lib/mockData";
import { useAuthStore } from "@/store/authStore";
import { useLanguageStore } from "@/store/languageStore";
import type { ServiceListing } from "@/types";
import {
  Calendar,
  CheckSquare,
  Edit2,
  MessageCircle,
  Pause,
  Play,
  Plus,
  Trash2,
  TrendingUp,
  Upload,
  Wrench,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

interface Booking {
  id: string;
  client: string;
  service: string;
  scheduledDate: string;
  location: string;
  status: BookingStatus;
  totalPrice: number;
  notes?: string;
}

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: "b1",
    client: "Juma Mwangi",
    service: "Tractor Plowing",
    scheduledDate: "2025-05-07",
    location: "Mbeya Rural, 3 acres",
    status: "confirmed",
    totalPrice: 135000,
  },
  {
    id: "b2",
    client: "Anna Sanga",
    service: "Pesticide Spraying",
    scheduledDate: "2025-05-08",
    location: "Singida, 5 acres",
    status: "pending",
    totalPrice: 125000,
    notes: "Client needs herbicide spraying too",
  },
  {
    id: "b3",
    client: "David Mushi",
    service: "Tractor Plowing",
    scheduledDate: "2025-05-10",
    location: "Dodoma, 2 acres",
    status: "pending",
    totalPrice: 90000,
  },
  {
    id: "b4",
    client: "Grace Kimaro",
    service: "Irrigation Setup",
    scheduledDate: "2025-05-12",
    location: "Arusha, 4 acres",
    status: "confirmed",
    totalPrice: 320000,
  },
];

type ServiceType =
  | "plowing"
  | "spraying"
  | "irrigation"
  | "harvesting"
  | "transport"
  | "machinery_rental"
  | "other";

type PriceUnit =
  | "per_acre"
  | "per_hour"
  | "per_day"
  | "per_trip"
  | "negotiable";

interface ServiceForm {
  name: string;
  serviceType: ServiceType | "";
  description: string;
  priceMin: string;
  priceMax: string;
  priceUnit: PriceUnit | "";
  availability: string;
  coverageArea: string;
  equipmentDetails: string;
  imagePreview: string | null;
}

const EMPTY_FORM: ServiceForm = {
  name: "",
  serviceType: "",
  description: "",
  priceMin: "",
  priceMax: "",
  priceUnit: "",
  availability: "",
  coverageArea: "",
  equipmentDetails: "",
  imagePreview: null,
};

const SERVICE_TYPE_LABELS: Record<ServiceType, { en: string; sw: string }> = {
  plowing: { en: "Land Preparation / Plowing", sw: "Kulima kwa Trekta" },
  spraying: { en: "Spraying / Pest Control", sw: "Kunyunyizia Dawa" },
  irrigation: { en: "Irrigation", sw: "Umwagiliaji" },
  harvesting: { en: "Harvesting", sw: "Kuvuna" },
  transport: { en: "Transport", sw: "Usafiri" },
  machinery_rental: { en: "Machinery Rental", sw: "Kukodisha Mashine" },
  other: { en: "Other", sw: "Nyingine" },
};

const PRICE_UNIT_LABELS: Record<PriceUnit, { en: string; sw: string }> = {
  per_acre: { en: "Per Acre", sw: "Kwa Ekari" },
  per_hour: { en: "Per Hour", sw: "Kwa Saa" },
  per_day: { en: "Per Day", sw: "Kwa Siku" },
  per_trip: { en: "Per Trip", sw: "Kwa Safari" },
  negotiable: { en: "Negotiable", sw: "Jadiliana" },
};

const SERVICE_COLORS: Record<string, string> = {
  plowing: "bg-amber-50 text-amber-700",
  spraying: "bg-green-50 text-green-700",
  irrigation: "bg-blue-50 text-blue-700",
  harvesting: "bg-orange-50 text-orange-700",
  transport: "bg-purple-50 text-purple-700",
  machinery_rental: "bg-teal-50 text-teal-700",
  other: "bg-muted text-muted-foreground",
};

const STATUS_COLORS: Record<BookingStatus, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  confirmed: "bg-green-50 text-green-700 border-green-200",
  completed: "bg-muted text-muted-foreground border-border",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

interface ManagedListing extends ServiceListing {
  isActive: boolean;
  bookingCount: number;
  priceMin?: number;
  priceMax?: number;
}

function initListings(): ManagedListing[] {
  return SERVICE_LISTINGS.slice(0, 3).map((s, i) => ({
    ...s,
    isActive: true,
    bookingCount: [4, 7, 2][i] ?? 0,
    priceMin: s.price * 0.9,
    priceMax: s.price * 1.1,
  }));
}

export default function InputServiceDashboard() {
  const { user } = useAuthStore();
  const { language } = useLanguageStore();
  const { actor } = useBackend();

  const [listings, setListings] = useState<ManagedListing[]>(initListings);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);

  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<ManagedListing | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ManagedListing | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState<ServiceForm>(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof ServiceForm, string>>
  >({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const lang = language as "en" | "sw";
  const sw = lang === "sw";

  // Computed stats
  const activeCount = listings.filter((l) => l.isActive).length;
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter((b) => b.status === "pending").length;
  const completedEarnings = bookings
    .filter((b) => b.status === "completed")
    .reduce((s, b) => s + b.totalPrice, 0);

  function openAddModal() {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setFormErrors({});
    setModalOpen(true);
  }

  function openEditModal(listing: ManagedListing) {
    setEditTarget(listing);
    setForm({
      name: listing.title,
      serviceType: (listing.serviceType as ServiceType) ?? "",
      description: listing.description,
      priceMin: String(listing.priceMin ?? listing.price),
      priceMax: String(listing.priceMax ?? listing.price),
      priceUnit: (listing.priceUnit.replace("per_", "") === listing.priceUnit
        ? listing.priceUnit
        : listing.priceUnit) as PriceUnit,
      availability: listing.availability,
      coverageArea: listing.location,
      equipmentDetails: "",
      imagePreview: listing.imageUrl ?? null,
    });
    setFormErrors({});
    setModalOpen(true);
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setForm((f) => ({ ...f, imagePreview: ev.target?.result as string }));
    };
    reader.readAsDataURL(file);
  }

  function validate(): boolean {
    const errors: Partial<Record<keyof ServiceForm, string>> = {};
    if (!form.name.trim())
      errors.name = sw ? "Jina linahitajika" : "Name is required";
    if (!form.serviceType)
      errors.serviceType = sw
        ? "Chagua aina ya huduma"
        : "Select a service type";
    if (!form.description.trim())
      errors.description = sw
        ? "Maelezo yanahitajika"
        : "Description is required";
    if (!form.priceMin || Number(form.priceMin) <= 0)
      errors.priceMin = sw
        ? "Bei ya chini inahitajika"
        : "Minimum price is required";
    if (!form.priceMax || Number(form.priceMax) <= 0)
      errors.priceMax = sw
        ? "Bei ya juu inahitajika"
        : "Maximum price is required";
    if (!form.priceUnit)
      errors.priceUnit = sw ? "Chagua kitengo" : "Select a price unit";
    if (!form.availability.trim())
      errors.availability = sw
        ? "Upatikanaji unahitajika"
        : "Availability is required";
    if (!form.coverageArea.trim())
      errors.coverageArea = sw
        ? "Eneo linahitajika"
        : "Coverage area is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    try {
      const areas = form.coverageArea
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const equipment = form.equipmentDetails
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const priceMin = Number(form.priceMin);
      const priceMax = Number(form.priceMax);

      let newListing: ManagedListing;
      if (editTarget) {
        if (actor) {
          await actor.updateServiceListing(
            BigInt(editTarget.id.replace(/\D/g, "") || 0),
            form.description,
            priceMin,
            priceMax,
            areas,
            equipment,
          );
        }
        setListings((prev) =>
          prev.map((l) =>
            l.id === editTarget.id
              ? {
                  ...l,
                  title: form.name,
                  serviceType:
                    form.serviceType as ManagedListing["serviceType"],
                  description: form.description,
                  price: priceMin,
                  priceMin,
                  priceMax,
                  priceUnit: form.priceUnit as ServiceListing["priceUnit"],
                  availability: form.availability,
                  location: areas[0] ?? l.location,
                  imageUrl: form.imagePreview ?? l.imageUrl,
                }
              : l,
          ),
        );
        toast.success(
          sw ? "Huduma imesasishwa" : "Service updated successfully",
        );
      } else {
        if (actor) {
          await actor.addServiceListing(
            form.serviceType,
            form.description,
            priceMin,
            priceMax,
            areas,
            equipment,
          );
        }
        newListing = {
          id: `sl${Date.now()}`,
          providerId: user?.id ?? "u6",
          providerName: user?.businessName ?? user?.name ?? "My Service",
          serviceType: form.serviceType as ManagedListing["serviceType"],
          title: form.name,
          price: priceMin,
          priceMin,
          priceMax,
          priceUnit: form.priceUnit as ServiceListing["priceUnit"],
          availability: form.availability,
          location: areas[0] ?? form.coverageArea,
          description: form.description,
          imageUrl: form.imagePreview ?? undefined,
          isActive: true,
          bookingCount: 0,
        };
        setListings((prev) => [newListing, ...prev]);
        toast.success(sw ? "Huduma imeongezwa" : "Service listed successfully");
      }

      setModalOpen(false);
      setForm(EMPTY_FORM);
      setEditTarget(null);
    } catch {
      toast.error(
        sw ? "Imeshindwa. Jaribu tena." : "Failed. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function togglePause(listing: ManagedListing) {
    const id = BigInt(listing.id.replace(/\D/g, "") || 0);
    try {
      if (listing.isActive) {
        if (actor) await actor.pauseServiceListing(id);
        setListings((prev) =>
          prev.map((l) =>
            l.id === listing.id ? { ...l, isActive: false } : l,
          ),
        );
        toast.success(sw ? "Huduma imesimamishwa" : "Service paused");
      } else {
        if (actor) await actor.resumeServiceListing(id);
        setListings((prev) =>
          prev.map((l) => (l.id === listing.id ? { ...l, isActive: true } : l)),
        );
        toast.success(sw ? "Huduma imeanza tena" : "Service resumed");
      }
    } catch {
      toast.error(sw ? "Imeshindwa" : "Operation failed");
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    const id = BigInt(deleteTarget.id.replace(/\D/g, "") || 0);
    try {
      if (actor) await actor.deleteServiceListing(id);
      setListings((prev) => prev.filter((l) => l.id !== deleteTarget.id));
      toast.success(sw ? "Huduma imefutwa" : "Service deleted");
    } catch {
      toast.error(sw ? "Imeshindwa kufuta" : "Failed to delete");
    } finally {
      setDeleteTarget(null);
    }
  }

  async function handleBookingAction(
    bookingId: string,
    action: "confirm" | "decline" | "complete",
  ) {
    const statusMap: Record<string, BookingStatus> = {
      confirm: "confirmed",
      decline: "cancelled",
      complete: "completed",
    };
    const newStatus = statusMap[action];
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b)),
    );
    const messages = {
      confirm: { en: "Booking confirmed", sw: "Ombi limethibitishwa" },
      decline: { en: "Booking declined", sw: "Ombi limekataliwa" },
      complete: { en: "Booking marked complete", sw: "Kazi imekamilika" },
    };
    toast.success(sw ? messages[action].sw : messages[action].en);
  }

  const formatPriceRange = (l: ManagedListing) => {
    const min = l.priceMin ?? l.price;
    const max = l.priceMax ?? l.price;
    if (min === max) return formatTSh(min);
    return `${formatTSh(min)} – ${formatTSh(max)}`;
  };

  const getServiceLabel = (type: string) =>
    SERVICE_TYPE_LABELS[type as ServiceType]?.[lang] ?? type;

  return (
    <Layout>
      <div className="px-4 py-4 space-y-4">
        {/* Hero */}
        <div className="relative rounded-xl overflow-hidden">
          <img
            src="/assets/generated/service-provider.dim_800x400.jpg"
            alt="Service Provider"
            className="w-full h-32 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 to-transparent flex items-end p-3">
            <div>
              <h1 className="text-lg font-display font-bold text-white">
                {sw ? "Mtoa Huduma za Kilimo" : "Input Service Provider"}
              </h1>
              <p className="text-xs text-white/80">
                {user?.businessName ?? user?.name}
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2">
          <StatCard
            title={sw ? "Huduma Hai" : "Active Services"}
            value={String(activeCount)}
            icon={<Wrench className="w-4 h-4" />}
            colorClass="bg-teal-50 text-teal-600"
          />
          <StatCard
            title={sw ? "Vikao Vyote" : "Total Bookings"}
            value={String(totalBookings)}
            icon={<Calendar className="w-4 h-4" />}
            colorClass="bg-primary/10 text-primary"
          />
          <StatCard
            title={sw ? "Zinasubiri" : "Pending"}
            value={String(pendingBookings)}
            icon={<CheckSquare className="w-4 h-4" />}
            colorClass="bg-amber-50 text-amber-600"
          />
          <StatCard
            title={sw ? "Mapato" : "Earned"}
            value={
              completedEarnings > 0 ? formatTSh(completedEarnings) : "TSh 0"
            }
            icon={<TrendingUp className="w-4 h-4" />}
            colorClass="bg-green-50 text-green-600"
          />
        </div>

        {/* Add service button */}
        <Button
          className="w-full"
          data-ocid="service.add_button"
          onClick={openAddModal}
        >
          <Plus className="w-4 h-4 mr-2" />
          {sw ? "Ongeza Huduma" : "Add New Service"}
        </Button>

        {/* My Services */}
        <section>
          <h2 className="text-sm font-semibold text-foreground mb-2">
            {sw ? "Huduma Zangu" : "My Services"}
          </h2>
          {listings.length === 0 ? (
            <div
              data-ocid="service.empty_state"
              className="bg-card border border-dashed border-border rounded-xl p-6 text-center"
            >
              <Wrench className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                {sw
                  ? "Bado hujaorodhesha huduma yoyote."
                  : "No services listed yet."}
              </p>
              <Button
                size="sm"
                className="mt-3"
                onClick={openAddModal}
                data-ocid="service.empty_state.add_button"
              >
                {sw ? "Ongeza Huduma" : "Add First Service"}
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {listings.map((svc, i) => (
                <div
                  key={svc.id}
                  data-ocid={`service.listing.${i + 1}`}
                  className="bg-card border border-border rounded-xl overflow-hidden"
                >
                  <div className="flex">
                    {svc.imageUrl ? (
                      <img
                        src={svc.imageUrl}
                        alt={svc.title}
                        className="w-20 h-20 object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-muted flex items-center justify-center flex-shrink-0">
                        <Wrench className="w-6 h-6 text-muted-foreground" />
                      </div>
                    )}
                    <div className="p-3 flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <p className="font-semibold text-sm truncate">
                          {svc.title}
                        </p>
                        <div className="flex items-center gap-1 shrink-0">
                          <Badge
                            className={`text-[10px] ${SERVICE_COLORS[svc.serviceType] ?? "bg-muted text-muted-foreground"}`}
                          >
                            {getServiceLabel(svc.serviceType)}
                          </Badge>
                          {!svc.isActive && (
                            <Badge
                              variant="outline"
                              className="text-[10px] text-muted-foreground"
                            >
                              {sw ? "Imesimamishwa" : "Paused"}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm font-bold text-primary mt-0.5">
                        {formatPriceRange(svc)}
                        <span className="text-xs text-muted-foreground font-normal ml-1">
                          /{svc.priceUnit.replace("per_", "")}
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {svc.availability} · {svc.location}
                      </p>
                      {svc.bookingCount > 0 && (
                        <p className="text-xs text-muted-foreground">
                          <span className="font-medium text-foreground">
                            {svc.bookingCount}
                          </span>{" "}
                          {sw ? "vikao" : "bookings"}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1.5 px-3 pb-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs h-7 px-2 flex-1"
                      data-ocid={`service.edit_button.${i + 1}`}
                      onClick={() => openEditModal(svc)}
                    >
                      <Edit2 className="w-3 h-3 mr-1" />
                      {sw ? "Hariri" : "Edit"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs h-7 px-2 flex-1"
                      data-ocid={`service.pause_button.${i + 1}`}
                      onClick={() => togglePause(svc)}
                    >
                      {svc.isActive ? (
                        <>
                          <Pause className="w-3 h-3 mr-1" />
                          {sw ? "Simamisha" : "Pause"}
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 mr-1" />
                          {sw ? "Endesha" : "Resume"}
                        </>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-xs h-7 px-2 text-destructive hover:text-destructive"
                      data-ocid={`service.delete_button.${i + 1}`}
                      onClick={() => setDeleteTarget(svc)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Bookings */}
        <section>
          <h2 className="text-sm font-semibold text-foreground mb-2">
            {sw ? "Maombi ya Vikao" : "Booking Requests"}
          </h2>
          <div className="space-y-2">
            {bookings.map((b, i) => (
              <div
                key={b.id}
                data-ocid={`service.booking.${i + 1}`}
                className="bg-card border border-border rounded-xl p-3"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate">{b.client}</p>
                    <p className="text-xs text-muted-foreground">{b.service}</p>
                    <p className="text-xs text-muted-foreground">
                      {b.location} · {b.scheduledDate}
                    </p>
                    {b.notes && (
                      <p className="text-xs text-muted-foreground italic mt-0.5">
                        {b.notes}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <Badge
                      className={`text-[10px] border ${STATUS_COLORS[b.status]}`}
                    >
                      {b.status === "pending"
                        ? sw
                          ? "Inasubiri"
                          : "Pending"
                        : b.status === "confirmed"
                          ? sw
                            ? "Imethibitishwa"
                            : "Confirmed"
                          : b.status === "completed"
                            ? sw
                              ? "Imekamilika"
                              : "Completed"
                            : sw
                              ? "Imekataliwa"
                              : "Cancelled"}
                    </Badge>
                    <p className="text-xs font-semibold text-primary">
                      {formatTSh(b.totalPrice)}
                    </p>
                  </div>
                </div>
                {(b.status === "pending" || b.status === "confirmed") && (
                  <div className="flex gap-2 pt-1 border-t border-border">
                    {b.status === "pending" && (
                      <>
                        <button
                          type="button"
                          data-ocid={`service.confirm_button.${i + 1}`}
                          className="flex-1 text-xs text-green-600 font-semibold py-1 rounded-lg bg-green-50 hover:bg-green-100 transition-colors"
                          onClick={() => handleBookingAction(b.id, "confirm")}
                        >
                          {sw ? "Thibitisha" : "Confirm"}
                        </button>
                        <button
                          type="button"
                          data-ocid={`service.decline_button.${i + 1}`}
                          className="flex-1 text-xs text-destructive font-semibold py-1 rounded-lg bg-destructive/10 hover:bg-destructive/20 transition-colors"
                          onClick={() => handleBookingAction(b.id, "decline")}
                        >
                          {sw ? "Kataa" : "Decline"}
                        </button>
                      </>
                    )}
                    {b.status === "confirmed" && (
                      <>
                        <button
                          type="button"
                          data-ocid={`service.complete_button.${i + 1}`}
                          className="flex-1 text-xs text-primary font-semibold py-1 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                          onClick={() => handleBookingAction(b.id, "complete")}
                        >
                          <CheckSquare className="w-3 h-3 inline mr-1" />
                          {sw ? "Kamilisha" : "Mark Done"}
                        </button>
                        <button
                          type="button"
                          data-ocid={`service.message_button.${i + 1}`}
                          className="px-3 text-xs text-primary py-1 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
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

      {/* Add / Edit Service Modal */}
      <Dialog
        open={modalOpen}
        onOpenChange={(open) => {
          if (!submitting) setModalOpen(open);
        }}
      >
        <DialogContent
          className="max-w-sm mx-auto max-h-[90vh] overflow-y-auto"
          data-ocid="service.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display">
              {editTarget
                ? sw
                  ? "Hariri Huduma"
                  : "Edit Service"
                : sw
                  ? "Ongeza Huduma Mpya"
                  : "Add New Service"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 pb-2">
            {/* Service Name */}
            <div className="space-y-1">
              <Label htmlFor="svc-name">
                {sw ? "Jina la Huduma" : "Service Name"} *
              </Label>
              <Input
                id="svc-name"
                data-ocid="service.name_input"
                placeholder={
                  sw
                    ? "Mfano: Trekta ya Kulima"
                    : "e.g. Tractor Plowing Service"
                }
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
              />
              {formErrors.name && (
                <p
                  data-ocid="service.name_input.field_error"
                  className="text-xs text-destructive"
                >
                  {formErrors.name}
                </p>
              )}
            </div>

            {/* Service Type */}
            <div className="space-y-1">
              <Label>{sw ? "Aina ya Huduma" : "Service Type"} *</Label>
              <Select
                value={form.serviceType}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, serviceType: v as ServiceType }))
                }
              >
                <SelectTrigger data-ocid="service.type_select">
                  <SelectValue
                    placeholder={sw ? "Chagua aina" : "Select type"}
                  />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(SERVICE_TYPE_LABELS) as ServiceType[]).map(
                    (type) => (
                      <SelectItem key={type} value={type}>
                        {SERVICE_TYPE_LABELS[type][lang]}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
              {formErrors.serviceType && (
                <p
                  data-ocid="service.type_select.field_error"
                  className="text-xs text-destructive"
                >
                  {formErrors.serviceType}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-1">
              <Label htmlFor="svc-desc">
                {sw ? "Maelezo" : "Description"} *
              </Label>
              <Textarea
                id="svc-desc"
                data-ocid="service.description_textarea"
                placeholder={
                  sw
                    ? "Elezea huduma, vifaa unavyotumia, n.k."
                    : "Describe the service, equipment, experience, etc."
                }
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                rows={3}
              />
              {formErrors.description && (
                <p
                  data-ocid="service.description_textarea.field_error"
                  className="text-xs text-destructive"
                >
                  {formErrors.description}
                </p>
              )}
            </div>

            {/* Price Range */}
            <div className="space-y-1">
              <Label>
                {sw ? "Mstari wa Bei (TSh)" : "Price Range (TSh)"} *
              </Label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Input
                    type="number"
                    data-ocid="service.price_min_input"
                    placeholder={sw ? "Bei ya chini" : "Min price"}
                    value={form.priceMin}
                    min={0}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, priceMin: e.target.value }))
                    }
                  />
                  {formErrors.priceMin && (
                    <p
                      data-ocid="service.price_min_input.field_error"
                      className="text-xs text-destructive mt-0.5"
                    >
                      {formErrors.priceMin}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    type="number"
                    data-ocid="service.price_max_input"
                    placeholder={sw ? "Bei ya juu" : "Max price"}
                    value={form.priceMax}
                    min={0}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, priceMax: e.target.value }))
                    }
                  />
                  {formErrors.priceMax && (
                    <p
                      data-ocid="service.price_max_input.field_error"
                      className="text-xs text-destructive mt-0.5"
                    >
                      {formErrors.priceMax}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Price Unit */}
            <div className="space-y-1">
              <Label>{sw ? "Kitengo cha Bei" : "Pricing Unit"} *</Label>
              <Select
                value={form.priceUnit}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, priceUnit: v as PriceUnit }))
                }
              >
                <SelectTrigger data-ocid="service.price_unit_select">
                  <SelectValue
                    placeholder={sw ? "Chagua kitengo" : "Select unit"}
                  />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(PRICE_UNIT_LABELS) as PriceUnit[]).map(
                    (unit) => (
                      <SelectItem key={unit} value={unit}>
                        {PRICE_UNIT_LABELS[unit][lang]}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
              {formErrors.priceUnit && (
                <p
                  data-ocid="service.price_unit_select.field_error"
                  className="text-xs text-destructive"
                >
                  {formErrors.priceUnit}
                </p>
              )}
            </div>

            {/* Availability */}
            <div className="space-y-1">
              <Label htmlFor="svc-avail">
                {sw ? "Wakati wa Upatikanaji" : "Availability"} *
              </Label>
              <Input
                id="svc-avail"
                data-ocid="service.availability_input"
                placeholder={
                  sw
                    ? "Mfano: Jumatatu-Jumamosi, 6am-6pm"
                    : "e.g. Mon-Sat, 6am-6pm"
                }
                value={form.availability}
                onChange={(e) =>
                  setForm((f) => ({ ...f, availability: e.target.value }))
                }
              />
              {formErrors.availability && (
                <p
                  data-ocid="service.availability_input.field_error"
                  className="text-xs text-destructive"
                >
                  {formErrors.availability}
                </p>
              )}
            </div>

            {/* Coverage Area */}
            <div className="space-y-1">
              <Label htmlFor="svc-area">
                {sw ? "Maeneo Yanayofikiwa" : "Coverage Area"} *
              </Label>
              <Input
                id="svc-area"
                data-ocid="service.coverage_area_input"
                placeholder={
                  sw
                    ? "Mfano: Morogoro, Dodoma, Mbeya"
                    : "e.g. Morogoro, Dodoma, Mbeya"
                }
                value={form.coverageArea}
                onChange={(e) =>
                  setForm((f) => ({ ...f, coverageArea: e.target.value }))
                }
              />
              {formErrors.coverageArea && (
                <p
                  data-ocid="service.coverage_area_input.field_error"
                  className="text-xs text-destructive"
                >
                  {formErrors.coverageArea}
                </p>
              )}
            </div>

            {/* Equipment Details */}
            <div className="space-y-1">
              <Label htmlFor="svc-equip">
                {sw ? "Maelezo ya Vifaa" : "Equipment Details"}
              </Label>
              <Textarea
                id="svc-equip"
                data-ocid="service.equipment_textarea"
                placeholder={
                  sw
                    ? "Mfano: Trekta John Deere 4WD, Pampu ya dawa ya kunyunyizia"
                    : "e.g. John Deere tractor 4WD, GPS-guided sprayer"
                }
                value={form.equipmentDetails}
                onChange={(e) =>
                  setForm((f) => ({ ...f, equipmentDetails: e.target.value }))
                }
                rows={2}
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-1">
              <Label>{sw ? "Picha ya Huduma" : "Service Image"}</Label>
              <button
                type="button"
                className="w-full border-2 border-dashed border-border rounded-lg p-3 text-center cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
                data-ocid="service.image_upload_button"
              >
                {form.imagePreview ? (
                  <div className="relative">
                    <img
                      src={form.imagePreview}
                      alt="Preview"
                      className="w-full h-28 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-card rounded-full p-0.5 shadow"
                      onClick={(e) => {
                        e.stopPropagation();
                        setForm((f) => ({ ...f, imagePreview: null }));
                      }}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="py-2">
                    <Upload className="w-6 h-6 mx-auto text-muted-foreground mb-1" />
                    <p className="text-xs text-muted-foreground">
                      {sw ? "Gusa kupakia picha" : "Tap to upload image"}
                    </p>
                  </div>
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                data-ocid="service.image_file_input"
                onChange={handleImageChange}
              />
            </div>

            {/* Submit */}
            <div className="flex gap-2 pt-1">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                data-ocid="service.cancel_button"
                onClick={() => setModalOpen(false)}
                disabled={submitting}
              >
                {sw ? "Ghairi" : "Cancel"}
              </Button>
              <Button
                type="submit"
                className="flex-1"
                data-ocid="service.submit_button"
                disabled={submitting}
              >
                {submitting
                  ? sw
                    ? "Inatuma..."
                    : "Saving..."
                  : editTarget
                    ? sw
                      ? "Hifadhi"
                      : "Save Changes"
                    : sw
                      ? "Orodhesha"
                      : "List Service"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm Dialog */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
      >
        <AlertDialogContent data-ocid="service.delete_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {sw ? "Futa Huduma" : "Delete Service"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {sw
                ? `Una uhakika wa kufuta "${deleteTarget?.title}"? Hatua hii haiwezi kurudishwa.`
                : `Are you sure you want to delete "${deleteTarget?.title}"? This cannot be undone.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="service.delete_cancel_button">
              {sw ? "Ghairi" : "Cancel"}
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="service.delete_confirm_button"
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={confirmDelete}
            >
              {sw ? "Futa" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
}
