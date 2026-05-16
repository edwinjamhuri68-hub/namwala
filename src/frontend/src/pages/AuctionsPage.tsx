import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/store/authStore";
import { useLanguageStore } from "@/store/languageStore";
import type { AuctionListing } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  Clock,
  Gavel,
  MapPin,
  Plus,
  Search,
  TrendingUp,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const now = new Date();
const iso = (offsetMs: number) => new Date(Date.now() + offsetMs).toISOString();

const MOCK_AUCTIONS: AuctionListing[] = [
  {
    id: "a1",
    sellerId: "u1",
    listingType: "crop",
    title: "Premium Maize Harvest",
    description: "High quality maize from Dodoma, well-stored",
    startingPrice: 50000,
    currentBid: 85000,
    currentBidderId: "u3",
    bidCount: 7,
    endTime: iso(2 * 3600000),
    startTime: iso(-24 * 3600000),
    quantity: 500,
    unit: "kg",
    images: [],
    region: "Dodoma",
    status: "active",
    isAnonymousBidding: false,
  },
  {
    id: "a2",
    sellerId: "u2",
    listingType: "livestock",
    title: "3 Friesian Dairy Cows",
    description: "Healthy Friesian cows, 5L/day average production",
    startingPrice: 1200000,
    currentBid: 1450000,
    currentBidderId: "u3",
    bidCount: 4,
    endTime: iso(18 * 3600000),
    startTime: iso(-6 * 3600000),
    quantity: 3,
    unit: "head",
    images: [],
    region: "Arusha",
    status: "active",
    isAnonymousBidding: true,
  },
  {
    id: "a3",
    sellerId: "u1",
    listingType: "crop",
    title: "Organic Beans Harvest",
    description: "Certified organic red kidney beans",
    startingPrice: 75000,
    currentBid: 75000,
    bidCount: 0,
    endTime: iso(5 * 24 * 3600000),
    startTime: iso(-12 * 3600000),
    quantity: 200,
    unit: "kg",
    images: [],
    region: "Mbeya",
    status: "active",
    isAnonymousBidding: false,
  },
  {
    id: "a4",
    sellerId: "u2",
    listingType: "livestock",
    title: "10 Boer Goats",
    description: "Well-fed Boer goats, ready for market",
    startingPrice: 800000,
    currentBid: 950000,
    currentBidderId: "u5",
    bidCount: 3,
    endTime: iso(3 * 24 * 3600000),
    startTime: iso(-2 * 24 * 3600000),
    quantity: 10,
    unit: "head",
    images: [],
    region: "Mwanza",
    status: "active",
    isAnonymousBidding: false,
  },
  {
    id: "a5",
    sellerId: "u1",
    listingType: "crop",
    title: "Sunflower Seeds Lot",
    description: "200kg dried sunflower seeds for oil extraction",
    startingPrice: 120000,
    currentBid: 175000,
    currentBidderId: "u3",
    bidCount: 12,
    endTime: iso(-3600000),
    startTime: iso(-7 * 24 * 3600000),
    quantity: 200,
    unit: "kg",
    images: [],
    region: "Kilimanjaro",
    status: "ended",
    isAnonymousBidding: false,
  },
  {
    id: "a6",
    sellerId: "u2",
    listingType: "livestock",
    title: "50 Local Chickens",
    description: "Free-range chickens, vaccinated",
    startingPrice: 300000,
    currentBid: 380000,
    currentBidderId: "u5",
    bidCount: 5,
    endTime: iso(7 * 24 * 3600000),
    startTime: now.toISOString(),
    quantity: 50,
    unit: "birds",
    images: [],
    region: "Dar es Salaam",
    status: "active",
    isAnonymousBidding: true,
  },
];

function useCountdown(endTimeIso: string) {
  const endMs = new Date(endTimeIso).getTime();
  const [remaining, setRemaining] = useState(() => endMs - Date.now());
  useEffect(() => {
    const id = setInterval(() => setRemaining(endMs - Date.now()), 1000);
    return () => clearInterval(id);
  }, [endMs]);
  if (remaining <= 0) return "Ended";
  const d = Math.floor(remaining / 86400000);
  const h = Math.floor((remaining % 86400000) / 3600000);
  const m = Math.floor((remaining % 3600000) / 60000);
  const s = Math.floor((remaining % 60000) / 1000);
  if (d > 0) return `${d}d ${h}h ${m}m`;
  if (h > 0) return `${h}h ${m}m ${s}s`;
  return `${m}m ${s}s`;
}

function StatusBadge({ status }: { status: AuctionListing["status"] }) {
  const map: Record<AuctionListing["status"], string> = {
    active: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30",
    ended: "bg-yellow-500/15 text-yellow-600 border-yellow-500/30",
    completed: "bg-muted text-muted-foreground border-border",
    cancelled: "bg-destructive/15 text-destructive border-destructive/30",
    upcoming: "bg-blue-500/15 text-blue-600 border-blue-500/30",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border capitalize ${map[status]}`}
    >
      {status === "active" && (
        <span className="mr-1 h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
      )}
      {status}
    </span>
  );
}

function CountdownBadge({ endTime }: { endTime: string }) {
  const label = useCountdown(endTime);
  const ended = label === "Ended";
  return (
    <span
      className={`flex items-center gap-1 text-xs font-medium ${ended ? "text-muted-foreground" : "text-accent"}`}
    >
      <Clock className="h-3 w-3" />
      {label}
    </span>
  );
}

function AuctionCard({ auction }: { auction: AuctionListing }) {
  const { t, language } = useLanguageStore();
  return (
    <div
      data-ocid="auctions.item"
      className="group bg-card border border-border rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="bg-muted/40 px-4 pt-4 pb-3 flex items-start justify-between gap-2">
        <StatusBadge status={auction.status} />
        <CountdownBadge endTime={auction.endTime} />
      </div>

      <div className="flex-1 px-4 py-3 space-y-2">
        <h3 className="font-semibold text-foreground leading-snug line-clamp-2">
          {auction.title}
        </h3>
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3 w-3 text-muted-foreground shrink-0" />
          <span className="text-xs text-muted-foreground">
            {auction.region}
          </span>
          <span className="ml-auto">
            <Badge
              variant="outline"
              className={`text-xs capitalize ${auction.listingType === "crop" ? "border-emerald-500/40 text-emerald-600" : "border-blue-500/40 text-blue-600"}`}
            >
              {auction.listingType}
            </Badge>
          </span>
        </div>
      </div>

      <div className="px-4 pb-2 space-y-0.5">
        <div className="text-2xl font-bold text-accent tabular-nums">
          {auction.currentBid.toLocaleString()}{" "}
          <span className="text-sm font-semibold text-muted-foreground">
            TSh
          </span>
        </div>
        <div className="text-xs text-muted-foreground">
          {t("startingPrice")}: {auction.startingPrice.toLocaleString()} TSh
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <TrendingUp className="h-3 w-3" />
          {auction.bidCount} {language === "sw" ? "zabuni" : "bids"}
        </div>
      </div>

      <div className="px-4 pb-4 pt-2">
        <Link
          to="/auctions/$auctionId"
          params={{ auctionId: auction.id }}
          data-ocid="auctions.bid_now_link"
        >
          <Button
            className="w-full"
            variant={auction.status === "active" ? "default" : "outline"}
            size="sm"
            disabled={auction.status !== "active"}
          >
            {auction.status === "active"
              ? t("bidNow")
              : (t("auctionEnded") ?? "Ended")}
          </Button>
        </Link>
      </div>
    </div>
  );
}

const DURATION_OPTIONS = [
  { label: "1 day", value: 1 },
  { label: "2 days", value: 2 },
  { label: "3 days", value: 3 },
  { label: "5 days", value: 5 },
  { label: "7 days", value: 7 },
];

interface CreateForm {
  title: string;
  description: string;
  listingType: "crop" | "livestock";
  startingPrice: string;
  quantity: string;
  unit: string;
  durationDays: number;
  isAnonymousBidding: boolean;
}

const INITIAL_FORM: CreateForm = {
  title: "",
  description: "",
  listingType: "crop",
  startingPrice: "",
  quantity: "",
  unit: "kg",
  durationDays: 3,
  isAnonymousBidding: false,
};

export default function AuctionsPage() {
  const { t, language } = useLanguageStore();
  const { user } = useAuthStore();
  const [auctions, setAuctions] = useState<AuctionListing[]>(MOCK_AUCTIONS);
  const [filterTab, setFilterTab] = useState<"all" | "crop" | "livestock">(
    "all",
  );
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [form, setForm] = useState<CreateForm>(INITIAL_FORM);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const canCreate =
    user?.role === "farmer" || user?.role === "livestock_keeper";

  useEffect(() => {
    if (!showCreateModal) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowCreateModal(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [showCreateModal]);

  const filtered = auctions.filter((a) => {
    if (filterTab !== "all" && a.listingType !== filterTab) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        a.title.toLowerCase().includes(q) || a.region.toLowerCase().includes(q)
      );
    }
    return true;
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nowTs = Date.now();
    const newAuction: AuctionListing = {
      id: `a${nowTs}`,
      sellerId: user?.id ?? "unknown",
      listingType: form.listingType,
      title: form.title,
      description: form.description,
      startingPrice: Number(form.startingPrice),
      currentBid: Number(form.startingPrice),
      bidCount: 0,
      endTime: new Date(nowTs + form.durationDays * 24 * 3600000).toISOString(),
      startTime: new Date(nowTs).toISOString(),
      quantity: Number(form.quantity),
      unit: form.unit,
      images: [],
      region: "Dodoma",
      status: "active",
      isAnonymousBidding: form.isAnonymousBidding,
    };
    setAuctions((prev) => [newAuction, ...prev]);
    setForm(INITIAL_FORM);
    setShowCreateModal(false);
  }

  const TABS = [
    { key: "all" as const, label: t("liveAuctions") ?? "All" },
    { key: "crop" as const, label: language === "sw" ? "Mazao" : "Crops" },
    {
      key: "livestock" as const,
      label: language === "sw" ? "Mifugo" : "Livestock",
    },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Gavel className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {t("liveAuctions")}
              </h1>
              <p className="text-sm text-muted-foreground">
                {filtered.length} auctions available
              </p>
            </div>
          </div>
          {canCreate && (
            <Button
              data-ocid="auctions.create_button"
              onClick={() => setShowCreateModal(true)}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              {t("createAuction")}
            </Button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex bg-muted/40 rounded-xl p-1 gap-1">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                data-ocid={`auctions.filter.${tab.key}`}
                onClick={() => setFilterTab(tab.key)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  filterTab === tab.key
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              data-ocid="auctions.search_input"
              placeholder="Search auctions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div
            data-ocid="auctions.empty_state"
            className="text-center py-20 text-muted-foreground"
          >
            <Gavel className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p className="text-lg font-medium">
              {language === "sw"
                ? "Hakuna minada iliyopatikana"
                : "No auctions found"}
            </p>
            <p className="text-sm mt-1">
              {language === "sw"
                ? "Jaribu kubadilisha vichujio vyako"
                : "Try adjusting your filters"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((a) => (
              <AuctionCard key={a.id} auction={a} />
            ))}
          </div>
        )}
      </div>

      {/* Create Auction Modal */}
      {showCreateModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowCreateModal(false);
          }}
          onKeyDown={(e) => e.key === "Escape" && setShowCreateModal(false)}
          role="presentation"
        >
          <dialog
            ref={dialogRef}
            open
            data-ocid="auctions.create_modal"
            className="bg-card border border-border rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            aria-labelledby="create-auction-title"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2
                id="create-auction-title"
                className="text-lg font-semibold text-foreground"
              >
                {t("createAuction")}
              </h2>
              <button
                type="button"
                data-ocid="auctions.create_modal_close_button"
                onClick={() => setShowCreateModal(false)}
                className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="ca-title">Title</Label>
                <Input
                  id="ca-title"
                  data-ocid="auctions.create_title_input"
                  required
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                  placeholder="e.g. Premium Maize Harvest"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="ca-desc">Description</Label>
                <Textarea
                  id="ca-desc"
                  data-ocid="auctions.create_description_textarea"
                  required
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                  placeholder="Describe your product quality, condition, storage..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="ca-type">Product Type</Label>
                  <select
                    id="ca-type"
                    data-ocid="auctions.create_type_select"
                    className="w-full h-9 rounded-md border border-input bg-transparent px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    value={form.listingType}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        listingType: e.target.value as "crop" | "livestock",
                      }))
                    }
                  >
                    <option value="crop">Crop</option>
                    <option value="livestock">Livestock</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="ca-duration">Duration</Label>
                  <select
                    id="ca-duration"
                    data-ocid="auctions.create_duration_select"
                    className="w-full h-9 rounded-md border border-input bg-transparent px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    value={form.durationDays}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        durationDays: Number(e.target.value),
                      }))
                    }
                  >
                    {DURATION_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="ca-price">Starting Price (TSh)</Label>
                  <Input
                    id="ca-price"
                    data-ocid="auctions.create_price_input"
                    type="number"
                    min={1}
                    required
                    value={form.startingPrice}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, startingPrice: e.target.value }))
                    }
                    placeholder="50000"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="ca-qty">Quantity</Label>
                  <Input
                    id="ca-qty"
                    data-ocid="auctions.create_quantity_input"
                    type="number"
                    min={1}
                    required
                    value={form.quantity}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, quantity: e.target.value }))
                    }
                    placeholder="100"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="ca-unit">Unit</Label>
                <Input
                  id="ca-unit"
                  data-ocid="auctions.create_unit_input"
                  value={form.unit}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, unit: e.target.value }))
                  }
                  placeholder="kg, head, birds..."
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Checkbox
                  id="ca-anon"
                  data-ocid="auctions.create_anonymous_checkbox"
                  checked={form.isAnonymousBidding}
                  onCheckedChange={(v) =>
                    setForm((p) => ({ ...p, isAnonymousBidding: !!v }))
                  }
                />
                <Label htmlFor="ca-anon" className="cursor-pointer">
                  {t("anonymousBidding") ?? "Anonymous Bidding"}
                </Label>
              </div>

              <div className="flex gap-3 pt-2 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  data-ocid="auctions.create_cancel_button"
                  onClick={() => setShowCreateModal(false)}
                >
                  {language === "sw" ? "Ghairi" : "Cancel"}
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  data-ocid="auctions.create_submit_button"
                >
                  {t("createAuction")}
                </Button>
              </div>
            </form>
          </dialog>
        </div>
      )}
    </Layout>
  );
}
