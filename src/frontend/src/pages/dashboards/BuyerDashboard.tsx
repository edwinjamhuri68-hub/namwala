import { Layout } from "@/components/Layout";
import { MarketPriceCard } from "@/components/ui/MarketPriceCard";
import { SearchBar } from "@/components/ui/SearchBar";
import { StatCard } from "@/components/ui/StatCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ANIMAL_LISTINGS,
  CROP_LISTINGS,
  MARKET_PRICES,
  formatTSh,
} from "@/lib/mockData";
import { useAuthStore } from "@/store/authStore";
import { useLanguageStore } from "@/store/languageStore";
import {
  MapPin,
  MessageCircle,
  Package,
  ShoppingCart,
  Star,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

type Tab = "crops" | "livestock" | "orders";

export default function BuyerDashboard() {
  const { user } = useAuthStore();
  const { language } = useLanguageStore();
  const [activeTab, setActiveTab] = useState<Tab>("crops");
  const [search, setSearch] = useState("");

  return (
    <Layout>
      <div className="px-4 py-4 space-y-4">
        {/* Hero */}
        <div className="relative rounded-xl overflow-hidden">
          <img
            src="/assets/generated/market-advisor.dim_800x400.jpg"
            alt="Buyer"
            className="w-full h-32 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pink-900/80 to-transparent flex items-end p-3">
            <div>
              <h1 className="text-lg font-display font-bold text-white">
                {language === "sw" ? "Dashibodi ya Mnunuzi" : "Buyer Dashboard"}
              </h1>
              <p className="text-xs text-white/80">
                {user?.businessName ?? user?.name} · {user?.location}
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <StatCard
            title={language === "sw" ? "Maagizo" : "My Orders"}
            value="7"
            icon={<ShoppingCart className="w-4 h-4" />}
            colorClass="bg-pink-50 text-pink-600"
          />
          <StatCard
            title={language === "sw" ? "Bidhaa Zinazopatikana" : "Available"}
            value="24"
            icon={<Package className="w-4 h-4" />}
            colorClass="bg-green-50 text-green-600"
          />
          <StatCard
            title={language === "sw" ? "Manunuzi" : "Spent"}
            value="TSh 4.2M"
            icon={<TrendingUp className="w-4 h-4" />}
            colorClass="bg-primary/10 text-primary"
          />
        </div>

        {/* Search */}
        <SearchBar
          placeholder={
            language === "sw"
              ? "Tafuta mazao, mifugo..."
              : "Search crops, livestock..."
          }
          value={search}
          onChange={setSearch}
        />

        {/* Tabs */}
        <div
          className="flex gap-1 bg-muted/50 rounded-xl p-1"
          data-ocid="buyer.tabs"
        >
          {(["crops", "livestock", "orders"] as Tab[]).map((tab) => (
            <button
              key={tab}
              type="button"
              data-ocid={`buyer.tab_${tab}`}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-smooth ${
                activeTab === tab
                  ? "bg-card shadow-xs text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {tab === "crops"
                ? language === "sw"
                  ? "Mazao"
                  : "Crops"
                : tab === "livestock"
                  ? language === "sw"
                    ? "Mifugo"
                    : "Livestock"
                  : language === "sw"
                    ? "Maagizo"
                    : "Orders"}
            </button>
          ))}
        </div>

        {/* Crop listings */}
        {activeTab === "crops" && (
          <div className="space-y-3">
            {CROP_LISTINGS.map((listing, i) => (
              <div
                key={listing.id}
                data-ocid={`buyer.crop.${i + 1}`}
                className="bg-card border border-border rounded-xl overflow-hidden flex"
              >
                <img
                  src={listing.imageUrl}
                  alt={listing.cropType}
                  className="w-20 h-20 object-cover flex-shrink-0"
                />
                <div className="p-3 flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <p className="font-semibold text-sm">{listing.cropType}</p>
                    <Badge
                      variant={
                        listing.quality === "excellent"
                          ? "default"
                          : "secondary"
                      }
                      className="text-[10px] shrink-0"
                    >
                      {listing.quality}
                    </Badge>
                  </div>
                  <p className="text-sm font-bold text-primary">
                    {formatTSh(listing.pricePerUnit)}/kg
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {listing.quantity}
                    {listing.unit} available
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {listing.location} · {listing.farmerName}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button
                      size="sm"
                      className="text-xs h-7 flex-1"
                      data-ocid={`buyer.order_button.${i + 1}`}
                    >
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      {language === "sw" ? "Agiza" : "Order"}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-xs h-7 px-2"
                      data-ocid={`buyer.contact_button.${i + 1}`}
                    >
                      <MessageCircle className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Livestock listings */}
        {activeTab === "livestock" && (
          <div className="space-y-3">
            {ANIMAL_LISTINGS.map((listing, i) => (
              <div
                key={listing.id}
                data-ocid={`buyer.livestock.${i + 1}`}
                className="bg-card border border-border rounded-xl overflow-hidden flex"
              >
                <img
                  src={listing.imageUrl}
                  alt={listing.animalType}
                  className="w-20 h-20 object-cover flex-shrink-0"
                />
                <div className="p-3 flex-1 min-w-0">
                  <p className="font-semibold text-sm">
                    {listing.animalType}{" "}
                    {listing.breed ? `(${listing.breed})` : ""}
                  </p>
                  <p className="text-sm font-bold text-primary">
                    {formatTSh(listing.pricePerUnit)}/head
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {listing.count} available · {listing.location}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {listing.keeperName}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button
                      size="sm"
                      className="text-xs h-7 flex-1"
                      data-ocid={`buyer.livestock_order_button.${i + 1}`}
                    >
                      {language === "sw" ? "Nunua" : "Buy"}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-xs h-7 px-2"
                      data-ocid={`buyer.livestock_contact_button.${i + 1}`}
                    >
                      <MessageCircle className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Orders tab */}
        {activeTab === "orders" && (
          <div className="space-y-2">
            {[
              "Maize 2000kg · Juma Mwangi",
              "Beans 500kg · Peter Kamau",
              "Goats x5 · Amina Hassan",
            ].map((order, i) => (
              <div
                key={order}
                data-ocid={`buyer.order_item.${i + 1}`}
                className="bg-card border border-border rounded-xl p-3 flex items-center justify-between"
              >
                <p className="text-sm">{order}</p>
                <Badge variant="default" className="text-[10px]">
                  {i === 0
                    ? language === "sw"
                      ? "Inaendelea"
                      : "In Transit"
                    : i === 1
                      ? language === "sw"
                        ? "Imekamilika"
                        : "Delivered"
                      : language === "sw"
                        ? "Inasubiri"
                        : "Pending"}
                </Badge>
              </div>
            ))}
          </div>
        )}

        {/* Market prices */}
        <section>
          <h2 className="text-sm font-semibold text-foreground mb-2">
            {language === "sw" ? "Bei za Soko" : "Market Prices"}
          </h2>
          <div className="space-y-2">
            {MARKET_PRICES.slice(0, 4).map((p) => (
              <MarketPriceCard key={p.commodity} price={p} lang={language} />
            ))}
          </div>
        </section>

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
    </Layout>
  );
}
