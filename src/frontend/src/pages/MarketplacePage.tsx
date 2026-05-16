import { Layout } from "@/components/Layout";
import { StarBadge } from "@/components/StarRating";
import {
  MapListToggle,
  TANZANIA_REGION_GRID,
  TanzaniaMapView,
} from "@/components/TanzaniaMapView";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ANIMAL_LISTINGS,
  CROP_LISTINGS,
  INPUT_PRODUCTS,
  MOCK_RATINGS,
  SERVICE_LISTINGS,
} from "@/lib/mockData";
import { useAuthStore } from "@/store/authStore";
import { useLanguageStore } from "@/store/languageStore";
import type { TranslationKey } from "@/store/languageStore";
import { triggerInquiryNotification } from "@/store/notificationStore";
import type {
  AnimalListing,
  CropListing,
  InputProduct,
  ServiceListing,
} from "@/types";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronDown,
  Filter,
  Flame,
  MapPin,
  MessageCircle,
  Package,
  Search,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type TabType = "all" | "crops" | "livestock" | "inputs" | "services";
type SortType = "newest" | "price_asc" | "price_desc" | "popular";

interface UnifiedListing {
  id: string;
  kind: "crop" | "livestock" | "input" | "service";
  title: string;
  sellerName: string;
  sellerId: string;
  price: number;
  priceLabel: string;
  location: string;
  quantity: number | string;
  imageUrl: string;
  description: string;
  inquiries: number;
  badge?: string;
  badgeColor?: "green" | "blue" | "amber" | "purple";
  createdAt: string;
  breed?: string;
  healthStatus?: string;
  equipmentDetails?: string;
  availability?: string;
  quality?: string;
  category?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const INQUIRY_SEED: Record<string, number> = {
  cl1: 34,
  cl2: 18,
  cl3: 27,
  al1: 52,
  al2: 19,
  ip1: 41,
  ip2: 63,
  ip3: 15,
  ip4: 28,
  sl1: 37,
  sl2: 22,
  sl3: 45,
  ml1: 12,
  ml2: 31,
  ml3: 8,
};

const TANZANIA_REGIONS = [
  "All Regions",
  "Dar es Salaam",
  "Arusha",
  "Mwanza",
  "Dodoma",
  "Mbeya",
  "Tanga",
  "Morogoro",
  "Kagera",
  "Kigoma",
  "Shinyanga",
  "Kilimanjaro",
  "Tabora",
  "Rukwa",
  "Mara",
  "Ruvuma",
  "Singida",
  "Lindi",
  "Mtwara",
  "Pwani",
  "Iringa",
  "Geita",
  "Simiyu",
  "Njombe",
  "Katavi",
  "Songwe",
];

const CATEGORIES_BY_TAB: Record<
  TabType,
  { value: string; label: string; labelSw: string }[]
> = {
  all: [
    { value: "all", label: "All Categories", labelSw: "Aina Zote" },
    // crops
    { value: "Maize", label: "Maize", labelSw: "Mahindi" },
    { value: "Beans", label: "Beans", labelSw: "Maharagwe" },
    { value: "Rice", label: "Rice", labelSw: "Mchele" },
    { value: "Wheat", label: "Wheat", labelSw: "Ngano" },
    { value: "Cassava", label: "Cassava", labelSw: "Muhogo" },
    { value: "Sweet Potato", label: "Sweet Potato", labelSw: "Viazi Vitamu" },
    { value: "Sorghum", label: "Sorghum", labelSw: "Mtama" },
    { value: "Sunflower", label: "Sunflower", labelSw: "Alizeti" },
    { value: "Groundnuts", label: "Groundnuts", labelSw: "Karanga" },
    { value: "Cotton", label: "Cotton", labelSw: "Pamba" },
    { value: "Tobacco", label: "Tobacco", labelSw: "Tumbaku" },
    // animals
    { value: "Cattle", label: "Cattle", labelSw: "Ng'ombe" },
    { value: "Goats", label: "Goats", labelSw: "Mbuzi" },
    { value: "Sheep", label: "Sheep", labelSw: "Kondoo" },
    { value: "Poultry", label: "Poultry", labelSw: "Kuku" },
    { value: "Pigs", label: "Pigs", labelSw: "Nguruwe" },
    // inputs
    { value: "Seeds", label: "Seeds", labelSw: "Mbegu" },
    { value: "Fertilizer", label: "Fertilizer", labelSw: "Mbolea" },
    { value: "Pesticides", label: "Pesticides", labelSw: "Dawa za Mimea" },
    {
      value: "Animal Feed",
      label: "Animal Feed",
      labelSw: "Chakula cha Mifugo",
    },
    {
      value: "Farm Equipment",
      label: "Farm Equipment",
      labelSw: "Vifaa vya Shamba",
    },
    // services
    { value: "Plowing", label: "Plowing", labelSw: "Kulima" },
    { value: "Spraying", label: "Spraying", labelSw: "Kunyunyizia" },
    { value: "Irrigation", label: "Irrigation", labelSw: "Umwagiliaji" },
    {
      value: "Machinery Rental",
      label: "Machinery Rental",
      labelSw: "Kukodisha Mashine",
    },
    { value: "Transport", label: "Transport", labelSw: "Usafirishaji" },
  ],
  crops: [
    { value: "all", label: "All Crops", labelSw: "Mazao Yote" },
    { value: "Maize", label: "Maize", labelSw: "Mahindi" },
    { value: "Beans", label: "Beans", labelSw: "Maharagwe" },
    { value: "Rice", label: "Rice", labelSw: "Mchele" },
    { value: "Wheat", label: "Wheat", labelSw: "Ngano" },
    { value: "Cassava", label: "Cassava", labelSw: "Muhogo" },
    { value: "Sweet Potato", label: "Sweet Potato", labelSw: "Viazi Vitamu" },
    { value: "Sorghum", label: "Sorghum", labelSw: "Mtama" },
    { value: "Sunflower", label: "Sunflower", labelSw: "Alizeti" },
    { value: "Groundnuts", label: "Groundnuts", labelSw: "Karanga" },
    { value: "Cotton", label: "Cotton", labelSw: "Pamba" },
    { value: "Tobacco", label: "Tobacco", labelSw: "Tumbaku" },
    { value: "Other Crop", label: "Other Crop", labelSw: "Zao Lingine" },
  ],
  livestock: [
    { value: "all", label: "All Animals", labelSw: "Mifugo Yote" },
    { value: "Cattle", label: "Cattle", labelSw: "Ng'ombe" },
    { value: "Goats", label: "Goats", labelSw: "Mbuzi" },
    { value: "Sheep", label: "Sheep", labelSw: "Kondoo" },
    { value: "Poultry", label: "Poultry", labelSw: "Kuku" },
    { value: "Pigs", label: "Pigs", labelSw: "Nguruwe" },
    {
      value: "Other Animal",
      label: "Other Animal",
      labelSw: "Mnyama Mwingine",
    },
  ],
  inputs: [
    { value: "all", label: "All Inputs", labelSw: "Pembejeo Zote" },
    { value: "Seeds", label: "Seeds", labelSw: "Mbegu" },
    { value: "Fertilizer", label: "Fertilizer", labelSw: "Mbolea" },
    { value: "Pesticides", label: "Pesticides", labelSw: "Dawa za Mimea" },
    {
      value: "Animal Feed",
      label: "Animal Feed",
      labelSw: "Chakula cha Mifugo",
    },
    {
      value: "Farm Equipment",
      label: "Farm Equipment",
      labelSw: "Vifaa vya Shamba",
    },
    {
      value: "Other Input",
      label: "Other Input",
      labelSw: "Pembejeo Nyingine",
    },
  ],
  services: [
    { value: "all", label: "All Services", labelSw: "Huduma Zote" },
    { value: "Plowing", label: "Plowing", labelSw: "Kulima" },
    { value: "Spraying", label: "Spraying", labelSw: "Kunyunyizia" },
    { value: "Irrigation", label: "Irrigation", labelSw: "Umwagiliaji" },
    {
      value: "Machinery Rental",
      label: "Machinery Rental",
      labelSw: "Kukodisha Mashine",
    },
    { value: "Transport", label: "Transport", labelSw: "Usafirishaji" },
    {
      value: "Other Service",
      label: "Other Service",
      labelSw: "Huduma Nyingine",
    },
  ],
};

// ─── Build unified listing array ──────────────────────────────────────────────
function buildListings(): UnifiedListing[] {
  const crops: UnifiedListing[] = CROP_LISTINGS.map((c: CropListing) => ({
    id: c.id,
    kind: "crop",
    title: c.cropType,
    sellerName: c.farmerName,
    sellerId: c.farmerId,
    price: c.pricePerUnit,
    priceLabel: `TSh ${c.pricePerUnit.toLocaleString()}/${c.unit}`,
    location: c.location,
    quantity: `${c.quantity} ${c.unit}`,
    imageUrl:
      c.imageUrl ?? "/assets/generated/hero-agriculture.dim_800x500.jpg",
    description: c.description ?? "",
    inquiries: INQUIRY_SEED[c.id] ?? 0,
    badge: c.quality,
    badgeColor:
      c.quality === "excellent"
        ? "green"
        : c.quality === "good"
          ? "blue"
          : "amber",
    createdAt: c.availableFrom,
    quality: c.quality,
    category: c.cropType,
  }));

  const livestock: UnifiedListing[] = ANIMAL_LISTINGS.map(
    (a: AnimalListing) => ({
      id: a.id,
      kind: "livestock",
      title: a.animalType + (a.breed ? ` (${a.breed})` : ""),
      sellerName: a.keeperName,
      sellerId: a.keeperId,
      price: a.pricePerUnit,
      priceLabel: `TSh ${a.pricePerUnit.toLocaleString()}/head`,
      location: a.location,
      quantity: `${a.count} animals`,
      imageUrl:
        a.imageUrl ?? "/assets/generated/livestock-hero.dim_800x500.jpg",
      description: a.description ?? "",
      inquiries: INQUIRY_SEED[a.id] ?? 0,
      badge: "Livestock",
      badgeColor: "purple",
      createdAt: "2025-05-01",
      breed: a.breed,
      healthStatus: "Healthy, vaccinated",
      category: a.animalType,
    }),
  );

  const inputs: UnifiedListing[] = INPUT_PRODUCTS.map((p: InputProduct) => ({
    id: p.id,
    kind: "input",
    title: p.name,
    sellerName: p.sellerName,
    sellerId: p.sellerId,
    price: p.price,
    priceLabel: `TSh ${p.price.toLocaleString()}/${p.unit}`,
    location: p.location,
    quantity: `${p.stock} in stock`,
    imageUrl:
      p.imageUrl ?? "/assets/generated/hero-agriculture.dim_800x500.jpg",
    description: p.description,
    inquiries: INQUIRY_SEED[p.id] ?? 0,
    badge: p.category,
    badgeColor: "blue",
    createdAt: "2025-04-25",
    category: p.category,
  }));

  const services: UnifiedListing[] = SERVICE_LISTINGS.map(
    (s: ServiceListing) => ({
      id: s.id,
      kind: "service",
      title: s.title,
      sellerName: s.providerName,
      sellerId: s.providerId,
      price: s.price,
      priceLabel: `TSh ${s.price.toLocaleString()}/${s.priceUnit.replace("per_", "")}`,
      location: s.location,
      quantity: s.availability,
      imageUrl:
        s.imageUrl ?? "/assets/generated/hero-agriculture.dim_800x500.jpg",
      description: s.description,
      inquiries: INQUIRY_SEED[s.id] ?? 0,
      badge: s.serviceType,
      badgeColor: "amber",
      createdAt: "2025-04-20",
      equipmentDetails: `Service type: ${s.serviceType}. Available ${s.availability}`,
      availability: s.availability,
      category: s.serviceType,
    }),
  );

  return [...crops, ...livestock, ...inputs, ...services];
}

const ALL_LISTINGS = buildListings();

// ─── Category match helper ─────────────────────────────────────────────────────
function categoryMatchesListing(cat: string, listing: UnifiedListing): boolean {
  if (cat === "all") return true;
  const lCat = (listing.category ?? "").toLowerCase();
  const lTitle = listing.title.toLowerCase();
  const cLow = cat.toLowerCase();
  return lCat.includes(cLow) || lTitle.includes(cLow);
}

// ─── Seller Stars ─────────────────────────────────────────────────────────────
function SellerStars({ sellerId }: { sellerId: string }) {
  const ratings = MOCK_RATINGS.filter((r) => r.toUserId === sellerId);
  if (!ratings.length) return null;
  const avg = ratings.reduce((s, r) => s + r.rating, 0) / ratings.length;
  return (
    <StarBadge rating={avg} count={ratings.length} size={11} className="mt-1" />
  );
}

// ─── Listing Detail Modal ──────────────────────────────────────────────────────
function ListingDetailModal({
  listing,
  onClose,
  onContactSeller,
  onInquiry,
  onBuyNow,
  lang,
  inquired,
}: {
  listing: UnifiedListing;
  onClose: () => void;
  onContactSeller: () => void;
  onInquiry: () => void;
  onBuyNow: () => void;
  lang: string;
  inquired: boolean;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const kindIcon =
    listing.kind === "crop"
      ? "🌽"
      : listing.kind === "livestock"
        ? "🐄"
        : listing.kind === "service"
          ? "🚜"
          : "🌱";

  return (
    <div
      ref={overlayRef}
      data-ocid="marketplace.dialog"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-foreground/40 backdrop-blur-sm px-0 sm:px-4"
      role="presentation"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <div className="bg-card w-full max-w-md rounded-t-2xl sm:rounded-2xl max-h-[88vh] overflow-y-auto shadow-2xl">
        <div className="relative">
          <img
            src={listing.imageUrl}
            alt={listing.title}
            className="w-full h-48 object-cover rounded-t-2xl"
          />
          <button
            type="button"
            data-ocid="marketplace.close_button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-3 bg-foreground/50 hover:bg-foreground/70 text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center transition-smooth"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-3 left-3">
            <Badge className="text-xs">
              {kindIcon} {listing.kind.toUpperCase()}
            </Badge>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h2 className="font-display font-bold text-lg text-foreground leading-tight">
                {listing.title}
              </h2>
              <p className="text-muted-foreground text-sm">
                {listing.sellerName}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-primary font-bold text-base">
                {listing.priceLabel}
              </p>
              <div className="flex items-center gap-1 justify-end text-muted-foreground text-xs">
                <TrendingUp className="w-3 h-3" />
                <span>
                  {listing.inquiries + (inquired ? 1 : 0)}{" "}
                  {lang === "sw" ? "maombi" : "inquiries"}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-muted/40 rounded-xl p-3">
              <p className="text-xs text-muted-foreground mb-0.5">
                {lang === "sw" ? "Kiasi" : "Quantity"}
              </p>
              <p className="font-semibold text-sm text-foreground">
                {listing.quantity}
              </p>
            </div>
            <div className="bg-muted/40 rounded-xl p-3">
              <p className="text-xs text-muted-foreground mb-0.5">
                {lang === "sw" ? "Mahali" : "Location"}
              </p>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-primary" />
                <p className="font-semibold text-sm text-foreground truncate">
                  {listing.location}
                </p>
              </div>
            </div>
            {listing.healthStatus && (
              <div className="bg-accent/10 rounded-xl p-3 col-span-2">
                <p className="text-xs text-muted-foreground mb-0.5">
                  {lang === "sw" ? "Hali ya Afya" : "Health Status"}
                </p>
                <p className="font-semibold text-sm text-foreground">
                  {listing.healthStatus}
                </p>
              </div>
            )}
            {listing.equipmentDetails && (
              <div className="bg-accent/10 rounded-xl p-3 col-span-2">
                <p className="text-xs text-muted-foreground mb-0.5">
                  {lang === "sw" ? "Maelezo ya Vifaa" : "Equipment Details"}
                </p>
                <p className="font-semibold text-sm text-foreground">
                  {listing.equipmentDetails}
                </p>
              </div>
            )}
          </div>

          {listing.description && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                {lang === "sw" ? "Maelezo" : "Description"}
              </p>
              <p className="text-sm text-foreground/80 leading-relaxed">
                {listing.description}
              </p>
            </div>
          )}

          <div className="flex items-center gap-3 bg-primary/5 border border-primary/20 rounded-xl p-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-sm text-foreground truncate">
                {listing.sellerName}
              </p>
              <SellerStars sellerId={listing.sellerId} />
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <Badge variant="secondary" className="text-[10px]">
                {listing.kind === "service"
                  ? lang === "sw"
                    ? "Mtoa Huduma"
                    : "Provider"
                  : listing.kind === "input"
                    ? lang === "sw"
                      ? "Muuzaji"
                      : "Seller"
                    : lang === "sw"
                      ? "Mzalishaji"
                      : "Farmer"}
              </Badge>
              <Link
                to="/seller/$sellerId/reviews"
                params={{ sellerId: listing.sellerId }}
                className="text-[10px] text-primary underline underline-offset-2 hover:text-primary/80"
                data-ocid="marketplace.view_reviews_link"
              >
                {lang === "sw" ? "Ona maoni" : "View reviews"}
              </Link>
            </div>
          </div>

          <div className="space-y-2 pt-1">
            <Button
              data-ocid="marketplace.buy_now_button"
              className="w-full"
              onClick={onBuyNow}
            >
              🛒 {lang === "sw" ? "Nunua Sasa" : "Buy Now"}
            </Button>
            <div className="flex gap-3">
              <Button
                variant="outline"
                data-ocid="marketplace.contact_seller_button"
                className="flex-1"
                onClick={onContactSeller}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {lang === "sw" ? "Wasiliana" : "Contact"}
              </Button>
              <Button
                variant={inquired ? "secondary" : "outline"}
                data-ocid="marketplace.inquiry_button"
                className="flex-1"
                onClick={onInquiry}
                disabled={inquired}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                {inquired
                  ? lang === "sw"
                    ? "Limetumwa"
                    : "Sent"
                  : lang === "sw"
                    ? "Omba"
                    : "Inquire"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Listing Card ──────────────────────────────────────────────────────────────
function ListingCard({
  listing,
  index,
  onOpen,
}: {
  listing: UnifiedListing;
  index: number;
  onOpen: (l: UnifiedListing) => void;
}) {
  const badgeCls =
    listing.badgeColor === "green"
      ? "bg-accent/20 text-accent-foreground border-accent/30"
      : listing.badgeColor === "purple"
        ? "bg-purple-100 text-purple-700 border-purple-200"
        : listing.badgeColor === "amber"
          ? "bg-amber-100 text-amber-700 border-amber-200"
          : "bg-primary/10 text-primary border-primary/20";

  return (
    <button
      type="button"
      data-ocid={`marketplace.item.${index}`}
      className="text-left bg-card border border-border rounded-xl overflow-hidden flex hover:border-primary/40 hover:shadow-md transition-smooth w-full"
      onClick={() => onOpen(listing)}
      aria-label={`View ${listing.title}`}
    >
      <div className="relative w-24 flex-shrink-0">
        <img
          src={listing.imageUrl}
          alt={listing.title}
          className="w-full h-full object-cover min-h-[96px]"
          loading="lazy"
        />
        <div className="absolute bottom-1 left-1">
          <span
            className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full border ${badgeCls} capitalize`}
          >
            {listing.badge}
          </span>
        </div>
      </div>
      <div className="p-3 flex-1 min-w-0">
        <div className="flex items-start justify-between gap-1">
          <p className="font-semibold text-sm text-foreground truncate">
            {listing.title}
          </p>
          <div className="flex items-center gap-0.5 text-muted-foreground shrink-0">
            <TrendingUp className="w-3 h-3" />
            <span className="text-[10px]">{listing.inquiries}</span>
          </div>
        </div>
        <p className="text-sm font-bold text-primary mt-0.5">
          {listing.priceLabel}
        </p>
        <p className="text-xs text-muted-foreground">{listing.quantity}</p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
          <MapPin className="w-3 h-3 shrink-0" />
          <span className="truncate">{listing.location}</span>
          <span className="mx-0.5">·</span>
          <span className="truncate">{listing.sellerName}</span>
        </div>
        <SellerStars sellerId={listing.sellerId} />
      </div>
    </button>
  );
}

// ─── Active filter badge ───────────────────────────────────────────────────────
function FilterCountBadge({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <span className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full bg-primary text-primary-foreground text-[9px] font-bold">
      {count}
    </span>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function MarketplacePage() {
  const { user } = useAuthStore();
  const { language, t } = useLanguageStore();
  const lang = language;
  const navigate = useNavigate();

  // Read initial state from URL search params
  const getParam = (key: string) =>
    new URLSearchParams(window.location.search).get(key) ?? undefined;

  const [activeTab, setActiveTab] = useState<TabType>(
    (getParam("tab") as TabType) || "all",
  );
  const [search, setSearch] = useState(getParam("q") ?? "");
  const [sort, setSort] = useState<SortType>(
    (getParam("sort") as SortType) ?? "newest",
  );
  const [region, setRegion] = useState(getParam("region") ?? "All Regions");
  const [category, setCategory] = useState(getParam("category") ?? "all");
  const [priceMin, setPriceMin] = useState(getParam("priceMin") ?? "");
  const [priceMax, setPriceMax] = useState(getParam("priceMax") ?? "");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [selectedListing, setSelectedListing] = useState<UnifiedListing | null>(
    null,
  );
  const [inquiredIds, setInquiredIds] = useState<Set<string>>(new Set());
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Sync filter state to URL search params (debounced for text inputs)
  const syncToUrl = useCallback(() => {
    const params = new URLSearchParams();
    if (activeTab !== "all") params.set("tab", activeTab);
    if (search) params.set("q", search);
    if (region !== "All Regions") params.set("region", region);
    if (category !== "all") params.set("category", category);
    if (priceMin) params.set("priceMin", priceMin);
    if (priceMax) params.set("priceMax", priceMax);
    if (sort !== "newest") params.set("sort", sort);
    const qs = params.toString();
    const newUrl = `/marketplace${qs ? `?${qs}` : ""}`;
    window.history.replaceState(null, "", newUrl);
  }, [activeTab, search, region, category, priceMin, priceMax, sort]);

  useEffect(() => {
    const t = setTimeout(syncToUrl, 300);
    return () => clearTimeout(t);
  }, [syncToUrl]);

  // When tab changes, reset category to "all" if it doesn't apply to new tab
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    const tabCats = CATEGORIES_BY_TAB[tab].map((c) => c.value);
    if (!tabCats.includes(category)) setCategory("all");
  };

  // Count active filters (excluding search and sort)
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (region !== "All Regions") count++;
    if (category !== "all") count++;
    if (priceMin) count++;
    if (priceMax) count++;
    return count;
  }, [region, category, priceMin, priceMax]);

  const hasActiveFilters = activeFilterCount > 0 || !!search;

  const clearAllFilters = () => {
    setSearch("");
    setRegion("All Regions");
    setCategory("all");
    setPriceMin("");
    setPriceMax("");
  };

  // Filter and sort
  const filtered = useMemo(() => {
    let list = ALL_LISTINGS.filter((l) => {
      // Tab filter
      if (activeTab !== "all") {
        const tabKind =
          activeTab === "inputs"
            ? "input"
            : activeTab === "services"
              ? "service"
              : activeTab === "crops"
                ? "crop"
                : "livestock";
        if (l.kind !== tabKind) return false;
      }
      // Text search
      const q = search.toLowerCase();
      if (
        q &&
        !l.title.toLowerCase().includes(q) &&
        !l.location.toLowerCase().includes(q) &&
        !l.sellerName.toLowerCase().includes(q) &&
        !(l.badge ?? "").toLowerCase().includes(q)
      )
        return false;
      // Region filter (matches on partial location name)
      if (
        region !== "All Regions" &&
        !l.location.toLowerCase().includes(region.toLowerCase())
      )
        return false;
      // Category filter
      if (!categoryMatchesListing(category, l)) return false;
      // Price range
      const min = priceMin ? Number.parseInt(priceMin) : null;
      const max = priceMax ? Number.parseInt(priceMax) : null;
      if (min !== null && l.price < min) return false;
      if (max !== null && l.price > max) return false;
      return true;
    });

    return [...list].sort((a, b) => {
      if (sort === "price_asc") return a.price - b.price;
      if (sort === "price_desc") return b.price - a.price;
      if (sort === "popular") return b.inquiries - a.inquiries;
      return 0;
    });
  }, [activeTab, search, sort, region, category, priceMin, priceMax]);

  const trending = useMemo(
    () =>
      [...ALL_LISTINGS].sort((a, b) => b.inquiries - a.inquiries).slice(0, 4),
    [],
  );

  const nearby = useMemo(() => {
    const userLoc = user?.location ?? "Arusha";
    return ALL_LISTINGS.filter((l) => l.location === userLoc).slice(0, 4);
  }, [user?.location]);

  // Build listing count per region based on currently filtered results
  // (respects tab + search + category + price — excludes region filter so map shows totals per region)
  const filteredWithoutRegion = useMemo(() => {
    return ALL_LISTINGS.filter((l) => {
      if (activeTab !== "all") {
        const tabKind =
          activeTab === "inputs"
            ? "input"
            : activeTab === "services"
              ? "service"
              : activeTab === "crops"
                ? "crop"
                : "livestock";
        if (l.kind !== tabKind) return false;
      }
      const q = search.toLowerCase();
      if (
        q &&
        !l.title.toLowerCase().includes(q) &&
        !l.location.toLowerCase().includes(q) &&
        !l.sellerName.toLowerCase().includes(q) &&
        !(l.badge ?? "").toLowerCase().includes(q)
      )
        return false;
      if (!categoryMatchesListing(category, l)) return false;
      const min = priceMin ? Number.parseInt(priceMin) : null;
      const max = priceMax ? Number.parseInt(priceMax) : null;
      if (min !== null && l.price < min) return false;
      if (max !== null && l.price > max) return false;
      return true;
    });
  }, [activeTab, search, category, priceMin, priceMax]);

  const listingCountByRegion = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const reg of TANZANIA_REGION_GRID) {
      counts[reg.name] = filteredWithoutRegion.filter((l) =>
        l.location.toLowerCase().includes(reg.name.toLowerCase()),
      ).length;
    }
    return counts;
  }, [filteredWithoutRegion]);

  const handleMapRegionSelect = (regionName: string) => {
    setRegion(regionName);
    setViewMode("list");
  };

  const handleInquiry = (listing: UnifiedListing) => {
    if (inquiredIds.has(listing.id)) return;
    setInquiredIds((prev) => new Set([...prev, listing.id]));
    const buyerName = user?.name ?? "A buyer";
    triggerInquiryNotification(listing.title, buyerName, listing.id);
    setSuccessMsg(
      lang === "sw"
        ? `Ombi limetumwa kwa ${listing.sellerName}!`
        : `Inquiry sent to ${listing.sellerName}!`,
    );
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  const handleContactSeller = (listing: UnifiedListing) => {
    setSelectedListing(null);
    navigate({ to: "/messages", search: { recipientId: listing.sellerId } });
  };

  const handleBuyNow = (listing: UnifiedListing) => {
    setSelectedListing(null);
    navigate({
      to: "/checkout",
      search: {
        listingId: listing.id,
        listingTitle: listing.title,
        sellerId: listing.sellerId,
        sellerName: listing.sellerName,
        price: listing.price,
        unit: listing.kind === "livestock" ? "head" : "unit",
      },
    });
  };

  const tabs: { key: TabType; label: string; labelSw: string; icon: string }[] =
    [
      { key: "all", label: "All", labelSw: "Yote", icon: "🏪" },
      { key: "crops", label: "Crops", labelSw: "Mazao", icon: "🌽" },
      { key: "livestock", label: "Livestock", labelSw: "Mifugo", icon: "🐄" },
      { key: "inputs", label: "Inputs", labelSw: "Pembejeo", icon: "🌱" },
      { key: "services", label: "Services", labelSw: "Huduma", icon: "🚜" },
    ];

  const sortOptions: { key: SortType; label: string; labelSw: string }[] = [
    { key: "newest", label: "Newest", labelSw: "Mpya" },
    { key: "popular", label: "Most Popular", labelSw: "Maarufu" },
    {
      key: "price_asc",
      label: "Price: Low → High",
      labelSw: "Bei: Chini → Juu",
    },
    {
      key: "price_desc",
      label: "Price: High → Low",
      labelSw: "Bei: Juu → Chini",
    },
  ];

  const categoryOptions = CATEGORIES_BY_TAB[activeTab];

  return (
    <Layout>
      <div className="px-4 py-4 space-y-4 pb-8">
        {/* Hero Banner */}
        <div className="relative rounded-xl overflow-hidden">
          <img
            src="/assets/generated/marketplace-hero.dim_800x400.jpg"
            alt="Marketplace"
            className="w-full h-36 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent flex items-end p-4">
            <div>
              <h1 className="text-xl font-display font-bold text-primary-foreground">
                {lang === "sw" ? "Soko la Namwala" : "Namwala Marketplace"}
              </h1>
              <p className="text-xs text-primary-foreground/80">
                {lang === "sw"
                  ? `Bidhaa ${ALL_LISTINGS.length}+ zinapatikana`
                  : `${ALL_LISTINGS.length}+ listings available`}
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            data-ocid="marketplace.search_input"
            className="pl-9 pr-10 bg-card border-border"
            placeholder={
              lang === "sw"
                ? "Tafuta bidhaa, mazao, huduma..."
                : "Search products, crops, services..."
            }
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Tabs */}
        <div
          className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide"
          data-ocid="marketplace.tabs"
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              data-ocid={`marketplace.tab.${tab.key}`}
              onClick={() => handleTabChange(tab.key)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-smooth flex-shrink-0 border ${
                activeTab === tab.key
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card text-muted-foreground border-border hover:border-primary/40"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{lang === "sw" ? tab.labelSw : tab.label}</span>
            </button>
          ))}
        </div>

        {/* View Toggle + Filter & Sort row */}
        <div className="flex items-center gap-2">
          <MapListToggle
            viewMode={viewMode}
            onToggle={() => setViewMode((v) => (v === "list" ? "map" : "list"))}
            lang={lang}
            t={t as (key: TranslationKey) => string}
          />

          <button
            type="button"
            data-ocid="marketplace.filter_toggle"
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-smooth shrink-0 ${
              showFilters || activeFilterCount > 0
                ? "bg-primary/10 border-primary/30 text-primary"
                : "bg-card border-border text-muted-foreground"
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            {lang === "sw" ? "Chuja" : "Filter"}
            <FilterCountBadge count={activeFilterCount} />
          </button>

          <div className="relative flex-1">
            <select
              data-ocid="marketplace.sort_select"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortType)}
              className="w-full bg-card border border-border rounded-full text-xs font-medium px-3 py-1.5 appearance-none text-foreground cursor-pointer pr-7 focus:outline-none focus:ring-1 focus:ring-primary/40"
            >
              {sortOptions.map((o) => (
                <option key={o.key} value={o.key}>
                  {lang === "sw" ? o.labelSw : o.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          </div>

          <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">
            {filtered.length} {lang === "sw" ? "matokeo" : "results"}
          </span>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div
            data-ocid="marketplace.filter_panel"
            className="bg-card border border-border rounded-xl p-4 space-y-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-foreground">
                {lang === "sw" ? "Vichujio" : "Filters"}
              </p>
              {hasActiveFilters && (
                <button
                  type="button"
                  data-ocid="marketplace.clear_filters_button"
                  onClick={clearAllFilters}
                  className="text-xs text-destructive hover:text-destructive/80 font-medium flex items-center gap-1 transition-colors"
                >
                  <X className="w-3 h-3" />
                  {lang === "sw" ? "Ondoa Yote" : "Clear All"}
                </button>
              )}
            </div>

            {/* Region filter */}
            <div>
              <label
                htmlFor="filter-region"
                className="text-xs font-medium text-muted-foreground block mb-1.5"
              >
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {lang === "sw" ? "Mkoa" : "Region"}
                </span>
              </label>
              <div className="relative">
                <select
                  id="filter-region"
                  data-ocid="marketplace.filter_region"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full bg-background border border-input rounded-lg text-sm px-3 py-2 appearance-none text-foreground cursor-pointer pr-7 focus:outline-none focus:ring-1 focus:ring-primary/40"
                >
                  {TANZANIA_REGIONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Category filter */}
            <div>
              <label
                htmlFor="filter-category"
                className="text-xs font-medium text-muted-foreground block mb-1.5"
              >
                <span className="flex items-center gap-1">
                  <Package className="w-3 h-3" />
                  {lang === "sw" ? "Aina ya Bidhaa" : "Product Category"}
                </span>
              </label>
              <div className="relative">
                <select
                  id="filter-category"
                  data-ocid="marketplace.filter_category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-background border border-input rounded-lg text-sm px-3 py-2 appearance-none text-foreground cursor-pointer pr-7 focus:outline-none focus:ring-1 focus:ring-primary/40"
                >
                  {categoryOptions.map((c) => (
                    <option key={c.value} value={c.value}>
                      {lang === "sw" ? c.labelSw : c.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Price range */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="price-min"
                  className="text-xs font-medium text-muted-foreground"
                >
                  {lang === "sw" ? "Masafa ya Bei (TSh)" : "Price Range (TSh)"}
                </label>
                {(priceMin || priceMax) && (
                  <button
                    type="button"
                    data-ocid="marketplace.clear_price_button"
                    onClick={() => {
                      setPriceMin("");
                      setPriceMax("");
                    }}
                    className="text-[10px] text-primary hover:text-primary/80 font-medium"
                  >
                    {lang === "sw" ? "Futa" : "Clear"}
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Input
                    id="filter-min-price"
                    data-ocid="marketplace.filter_min_price"
                    type="number"
                    placeholder={lang === "sw" ? "Bei ya Chini" : "Min Price"}
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    className="text-xs h-9"
                  />
                </div>
                <div>
                  <Input
                    id="filter-max-price"
                    data-ocid="marketplace.filter_max_price"
                    type="number"
                    placeholder={lang === "sw" ? "Bei ya Juu" : "Max Price"}
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    className="text-xs h-9"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Active filter chips (visible when panel is closed) */}
        {!showFilters && activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-1.5 items-center">
            <span className="text-[10px] text-muted-foreground">
              {lang === "sw" ? "Vichujio vilivyotumiwa:" : "Active filters:"}
            </span>
            {region !== "All Regions" && (
              <button
                type="button"
                data-ocid="marketplace.region_chip"
                onClick={() => setRegion("All Regions")}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium border border-primary/20 hover:bg-primary/20 transition-colors"
              >
                <MapPin className="w-2.5 h-2.5" />
                {region}
                <X className="w-2.5 h-2.5" />
              </button>
            )}
            {category !== "all" && (
              <button
                type="button"
                data-ocid="marketplace.category_chip"
                onClick={() => setCategory("all")}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium border border-primary/20 hover:bg-primary/20 transition-colors"
              >
                {category}
                <X className="w-2.5 h-2.5" />
              </button>
            )}
            {(priceMin || priceMax) && (
              <button
                type="button"
                data-ocid="marketplace.price_chip"
                onClick={() => {
                  setPriceMin("");
                  setPriceMax("");
                }}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium border border-primary/20 hover:bg-primary/20 transition-colors"
              >
                {priceMin ? `TSh ${Number(priceMin).toLocaleString()}` : "0"} –{" "}
                {priceMax ? `TSh ${Number(priceMax).toLocaleString()}` : "∞"}
                <X className="w-2.5 h-2.5" />
              </button>
            )}
            <button
              type="button"
              data-ocid="marketplace.clear_all_chip"
              onClick={clearAllFilters}
              className="text-[10px] text-destructive hover:text-destructive/80 font-medium ml-1"
            >
              {lang === "sw" ? "Futa Yote" : "Clear all"}
            </button>
          </div>
        )}

        {/* Success toast */}
        {successMsg && (
          <div
            data-ocid="marketplace.success_state"
            className="bg-accent/15 border border-accent/30 text-accent-foreground rounded-xl px-4 py-3 text-sm font-medium flex items-center gap-2"
          >
            <span>✅</span>
            <span>{successMsg}</span>
          </div>
        )}

        {/* Map View */}
        {viewMode === "map" && (
          <TanzaniaMapView
            listingCountByRegion={listingCountByRegion}
            selectedRegion={region}
            onSelectRegion={handleMapRegionSelect}
            lang={lang}
            t={t as (key: TranslationKey) => string}
            totalFilteredCount={filteredWithoutRegion.length}
          />
        )}

        {/* Trending section — only on "all" tab with no search */}
        {viewMode === "list" && activeTab === "all" && !search && (
          <section data-ocid="marketplace.trending_section">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-4 h-4 text-destructive" />
              <h2 className="text-sm font-semibold text-foreground">
                {lang === "sw" ? "Zinazochangamkiwa" : "Trending Now"}
              </h2>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {trending.map((listing, i) => (
                <button
                  key={listing.id}
                  type="button"
                  data-ocid={`marketplace.trending.${i + 1}`}
                  onClick={() => setSelectedListing(listing)}
                  className="flex-shrink-0 w-36 bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 hover:shadow-md transition-smooth text-left"
                  aria-label={`View trending: ${listing.title}`}
                >
                  <img
                    src={listing.imageUrl}
                    alt={listing.title}
                    className="w-full h-20 object-cover"
                    loading="lazy"
                  />
                  <div className="p-2">
                    <p className="text-xs font-semibold text-foreground truncate">
                      {listing.title}
                    </p>
                    <p className="text-xs font-bold text-primary truncate">
                      {listing.priceLabel}
                    </p>
                    <div className="flex items-center gap-0.5 text-muted-foreground mt-0.5">
                      <TrendingUp className="w-3 h-3" />
                      <span className="text-[10px]">
                        {listing.inquiries}{" "}
                        {lang === "sw" ? "maombi" : "inquiries"}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Nearby sellers section — only on "all" tab with no search */}
        {viewMode === "list" &&
          activeTab === "all" &&
          !search &&
          nearby.length > 0 && (
            <section data-ocid="marketplace.nearby_section">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-primary" />
                <h2 className="text-sm font-semibold text-foreground">
                  {lang === "sw"
                    ? `Karibu nawe — ${user?.location ?? "Arusha"}`
                    : `Near You — ${user?.location ?? "Arusha"}`}
                </h2>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {nearby.map((listing, i) => (
                  <button
                    key={listing.id}
                    type="button"
                    data-ocid={`marketplace.nearby.${i + 1}`}
                    onClick={() => setSelectedListing(listing)}
                    className="flex-shrink-0 w-36 bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 hover:shadow-md transition-smooth text-left"
                    aria-label={`View nearby: ${listing.title}`}
                  >
                    <img
                      src={listing.imageUrl}
                      alt={listing.title}
                      className="w-full h-20 object-cover"
                      loading="lazy"
                    />
                    <div className="p-2">
                      <p className="text-xs font-semibold text-foreground truncate">
                        {listing.title}
                      </p>
                      <p className="text-xs font-bold text-primary truncate">
                        {listing.priceLabel}
                      </p>
                      <div className="flex items-center gap-0.5 text-muted-foreground mt-0.5">
                        <MapPin className="w-3 h-3" />
                        <span className="text-[10px] truncate">
                          {listing.location}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}

        {/* Main Listings — list view only */}
        {viewMode === "list" && (
          <section data-ocid="marketplace.listings_section">
            {activeTab !== "all" || search ? (
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-4 h-4 text-primary" />
                <h2 className="text-sm font-semibold text-foreground">
                  {search
                    ? `${lang === "sw" ? "Matokeo ya" : "Results for"} "${search}"`
                    : lang === "sw"
                      ? tabs.find((t) => t.key === activeTab)?.labelSw
                      : tabs.find((t) => t.key === activeTab)?.label}
                </h2>
              </div>
            ) : (
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-4 h-4 text-primary" />
                <h2 className="text-sm font-semibold text-foreground">
                  {lang === "sw" ? "Bidhaa Zote" : "All Listings"}
                </h2>
              </div>
            )}

            {filtered.length === 0 ? (
              <div
                data-ocid="marketplace.empty_state"
                className="text-center py-12 bg-card border border-border rounded-xl"
              >
                <span className="text-4xl block mb-2">🔍</span>
                <p className="text-sm font-semibold text-foreground">
                  {lang === "sw"
                    ? "Hakuna bidhaa zilizopatikana"
                    : "No listings found"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {lang === "sw"
                    ? "Jaribu maneno tofauti au ondoa vichujio"
                    : "Try different keywords or clear filters"}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-3 text-xs"
                  onClick={clearAllFilters}
                  data-ocid="marketplace.empty_state_reset_button"
                >
                  {lang === "sw" ? "Ondoa Vichujio" : "Clear Filters"}
                </Button>
              </div>
            ) : (
              <div className="space-y-3" data-ocid="marketplace.list">
                {filtered.map((listing, i) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    index={i + 1}
                    onOpen={setSelectedListing}
                  />
                ))}
              </div>
            )}
          </section>
        )}

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

      {/* Detail Modal */}
      {selectedListing && (
        <ListingDetailModal
          listing={selectedListing}
          lang={lang}
          onClose={() => setSelectedListing(null)}
          onContactSeller={() => handleContactSeller(selectedListing)}
          onInquiry={() => handleInquiry(selectedListing)}
          onBuyNow={() => handleBuyNow(selectedListing)}
          inquired={inquiredIds.has(selectedListing.id)}
        />
      )}
    </Layout>
  );
}
