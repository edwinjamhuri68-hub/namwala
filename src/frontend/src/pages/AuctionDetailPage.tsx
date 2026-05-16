import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/authStore";
import { useLanguageStore } from "@/store/languageStore";
import type { AuctionBid, AuctionListing } from "@/types";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  ImageIcon,
  MapPin,
  TrendingUp,
  Trophy,
  Users,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const isoOffset = (ms: number) => new Date(Date.now() + ms).toISOString();

const MOCK_AUCTIONS: AuctionListing[] = [
  {
    id: "a1",
    sellerId: "u1",
    listingType: "crop",
    title: "Premium Maize Harvest",
    description:
      "High quality maize from Dodoma, well-stored and ready for delivery. Grown with minimal pesticide use, ideal for direct consumption or resale.",
    startingPrice: 50000,
    currentBid: 85000,
    currentBidderId: "u3",
    bidCount: 7,
    endTime: isoOffset(2 * 3600000),
    startTime: isoOffset(-24 * 3600000),
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
    description:
      "Healthy Friesian cows with 5L/day average milk production. All cows are vaccinated, dewormed, and have veterinary health records.",
    startingPrice: 1200000,
    currentBid: 1450000,
    currentBidderId: "u3",
    bidCount: 4,
    endTime: isoOffset(18 * 3600000),
    startTime: isoOffset(-6 * 3600000),
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
    description:
      "Certified organic red kidney beans grown in Mbeya highlands. No chemical fertilizers used. Perfect for health-conscious buyers.",
    startingPrice: 75000,
    currentBid: 75000,
    bidCount: 0,
    endTime: isoOffset(5 * 24 * 3600000),
    startTime: isoOffset(-12 * 3600000),
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
    description:
      "Well-fed Boer goats ready for market. Average weight 40kg each, healthy and active.",
    startingPrice: 800000,
    currentBid: 950000,
    currentBidderId: "u5",
    bidCount: 3,
    endTime: isoOffset(3 * 24 * 3600000),
    startTime: isoOffset(-2 * 24 * 3600000),
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
    description:
      "200kg dried sunflower seeds for oil extraction, well-cleaned and stored in dry conditions.",
    startingPrice: 120000,
    currentBid: 175000,
    currentBidderId: "u3",
    bidCount: 12,
    endTime: isoOffset(-3600000),
    startTime: isoOffset(-7 * 24 * 3600000),
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
    description:
      "Free-range chickens, vaccinated and healthy. Ideal for resale or meat production.",
    startingPrice: 300000,
    currentBid: 380000,
    currentBidderId: "u5",
    bidCount: 5,
    endTime: isoOffset(7 * 24 * 3600000),
    startTime: new Date().toISOString(),
    quantity: 50,
    unit: "birds",
    images: [],
    region: "Dar es Salaam",
    status: "active",
    isAnonymousBidding: true,
  },
];

const MOCK_BIDS: AuctionBid[] = [
  {
    id: "b1",
    auctionId: "a1",
    bidderId: "u3",
    bidAmount: 85000,
    placedAt: isoOffset(-1800000),
    isWinning: true,
  },
  {
    id: "b2",
    auctionId: "a1",
    bidderId: "u5",
    bidAmount: 75000,
    placedAt: isoOffset(-3600000),
    isWinning: false,
  },
  {
    id: "b3",
    auctionId: "a1",
    bidderId: "u3",
    bidAmount: 70000,
    placedAt: isoOffset(-5400000),
    isWinning: false,
  },
  {
    id: "b4",
    auctionId: "a2",
    bidderId: "u3",
    bidAmount: 1450000,
    placedAt: isoOffset(-900000),
    isWinning: true,
  },
  {
    id: "b5",
    auctionId: "a2",
    bidderId: "u5",
    bidAmount: 1350000,
    placedAt: isoOffset(-2700000),
    isWinning: false,
  },
  {
    id: "b6",
    auctionId: "a5",
    bidderId: "u3",
    bidAmount: 175000,
    placedAt: isoOffset(-7200000),
    isWinning: true,
  },
];

function timeAgo(isoStr: string, lang?: string): string {
  const diff = Date.now() - new Date(isoStr).getTime();
  const m = Math.floor(diff / 60000);
  if (lang === "sw") {
    if (m < 1) return "hivi karibuni";
    if (m < 60) return `dakika ${m} zilizopita`;
    const h = Math.floor(m / 60);
    if (h < 24) return `saa ${h} zilizopita`;
    return `siku ${Math.floor(h / 24)} zilizopita`;
  }
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

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

export default function AuctionDetailPage() {
  const { t, language } = useLanguageStore();
  const { user } = useAuthStore();
  const params = useParams({ strict: false });
  const auctionId = (params as Record<string, string>).auctionId;

  const [auction, setAuction] = useState<AuctionListing | undefined>(() =>
    MOCK_AUCTIONS.find((a) => a.id === auctionId),
  );
  const [bids, setBids] = useState<AuctionBid[]>(() =>
    MOCK_BIDS.filter((b) => b.auctionId === auctionId),
  );
  const [bidAmount, setBidAmount] = useState("");

  const countdown = useCountdown(auction?.endTime ?? new Date().toISOString());
  const isSeller = user?.id === auction?.sellerId;
  const minBid = (auction?.currentBid ?? 0) + 10000;

  if (!auction) {
    return (
      <Layout>
        <div
          className="max-w-2xl mx-auto px-4 py-20 text-center"
          data-ocid="auction_detail.error_state"
        >
          <p className="text-xl font-semibold text-foreground mb-2">
            {language === "sw" ? "Mnada haukupatikana" : "Auction not found"}
          </p>
          <p className="text-muted-foreground mb-6">
            This auction may have been removed or the link is invalid.
          </p>
          <Link to="/auctions">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Auctions
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  function handlePlaceBid(e: React.FormEvent) {
    e.preventDefault();
    const amount = Number(bidAmount);
    if (!amount || amount < minBid) {
      toast.error(`Minimum bid is ${minBid.toLocaleString()} TSh`);
      return;
    }
    const newBid: AuctionBid = {
      id: `b${Date.now()}`,
      auctionId: auction!.id,
      bidderId: user?.id ?? "guest",
      bidAmount: amount,
      placedAt: new Date().toISOString(),
      isWinning: true,
    };
    setBids((prev) => [
      newBid,
      ...prev.map((b) => ({ ...b, isWinning: false })),
    ]);
    setAuction((prev) =>
      prev
        ? {
            ...prev,
            currentBid: amount,
            currentBidderId: user?.id ?? "guest",
            bidCount: prev.bidCount + 1,
          }
        : prev,
    );
    setBidAmount("");
    toast.success(t("bidPlaced") ?? "Bid placed successfully!");
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Breadcrumb */}
        <Link
          to="/auctions"
          data-ocid="auction_detail.back_link"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("liveAuctions") ?? "Live Auctions"}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT: Product Info */}
          <div className="space-y-4">
            <div className="bg-muted h-48 rounded-xl flex items-center justify-center border border-border">
              <ImageIcon className="h-12 w-12 text-muted-foreground opacity-40" />
            </div>

            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <h1 className="text-2xl font-bold text-foreground leading-snug">
                  {auction.title}
                </h1>
                <div className="flex gap-2 flex-wrap">
                  <Badge
                    variant="outline"
                    className={`capitalize ${
                      auction.listingType === "crop"
                        ? "border-emerald-500/40 text-emerald-600 bg-emerald-500/5"
                        : "border-blue-500/40 text-blue-600 bg-blue-500/5"
                    }`}
                  >
                    {auction.listingType}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`capitalize ${
                      auction.status === "active"
                        ? "border-emerald-500/30 text-emerald-600"
                        : auction.status === "ended"
                          ? "border-yellow-500/30 text-yellow-600"
                          : "border-border text-muted-foreground"
                    }`}
                  >
                    {auction.status === "active" && (
                      <span className="mr-1 h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                    )}
                    {auction.status}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" />
                {auction.region}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {auction.description}
              </p>

              <div className="flex items-center gap-3 flex-wrap text-sm">
                <span className="bg-muted/60 px-3 py-1 rounded-full text-muted-foreground">
                  {language === "sw"
                    ? "Imeorodheshwa na Muuzaji"
                    : "Listed by Seller"}
                </span>
                <span className="bg-muted/60 px-3 py-1 rounded-full text-muted-foreground">
                  {auction.quantity} {auction.unit}
                </span>
                {auction.isAnonymousBidding && (
                  <span className="flex items-center gap-1 bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-medium">
                    <Users className="h-3 w-3" />
                    {t("anonymousBidding") ?? "Anonymous Bidding"}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Bid Panel */}
          <div className="space-y-4">
            <div
              data-ocid="auction_detail.bid_panel"
              className="bg-card border border-border rounded-2xl p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  {t("highestBid") ?? "Current Highest Bid"}
                </p>
                {auction.status === "active" && (
                  <span className="flex items-center gap-1 text-xs text-accent font-medium">
                    <Clock className="h-3 w-3" />
                    {countdown}
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <div className="text-4xl font-bold text-accent tabular-nums">
                  {auction.currentBid.toLocaleString()}
                  <span className="text-lg font-semibold text-muted-foreground ml-1">
                    TSh
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3" />
                  {auction.bidCount} {auction.bidCount === 1 ? "bid" : "bids"}{" "}
                  &nbsp;&middot;&nbsp;
                  {t("startingPrice")}: {auction.startingPrice.toLocaleString()}{" "}
                  TSh
                </div>
              </div>

              {/* Ended / Winner Banner */}
              {(auction.status === "ended" ||
                auction.status === "completed") && (
                <div
                  data-ocid="auction_detail.winner_banner"
                  className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-4 py-3 flex items-start gap-3"
                >
                  <Trophy className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-emerald-700">
                      {t("auctionEnded") ?? "Auction Ended"}
                    </p>
                    <p className="text-xs text-emerald-600 mt-0.5">
                      Final Price: {auction.currentBid.toLocaleString()} TSh
                    </p>
                  </div>
                </div>
              )}

              {/* Seller accept/reject */}
              {isSeller && auction.status === "ended" && (
                <div className="flex gap-3 pt-1">
                  <Button
                    type="button"
                    variant="default"
                    className="flex-1 gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
                    data-ocid="auction_detail.accept_bid_button"
                    onClick={() => {
                      setAuction((prev) =>
                        prev ? { ...prev, status: "completed" } : prev,
                      );
                      toast.success("Bid accepted!");
                    }}
                  >
                    <CheckCircle className="h-4 w-4" />
                    {t("acceptBid") ?? "Accept Bid"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 gap-2 border-destructive/40 text-destructive hover:bg-destructive/5"
                    data-ocid="auction_detail.reject_bid_button"
                    onClick={() => {
                      setAuction((prev) =>
                        prev ? { ...prev, status: "cancelled" } : prev,
                      );
                      toast.error("Bid rejected.");
                    }}
                  >
                    <XCircle className="h-4 w-4" />
                    {t("rejectBid") ?? "Reject Bid"}
                  </Button>
                </div>
              )}

              {/* Active: Place Bid */}
              {auction.status === "active" && !isSeller && (
                <form
                  onSubmit={handlePlaceBid}
                  className="space-y-3 border-t border-border pt-4"
                >
                  <div className="space-y-1.5">
                    <Label htmlFor="bid-amount" className="text-sm">
                      {t("yourBid") ?? "Your Bid"}
                      <span className="text-muted-foreground ml-1 font-normal text-xs">
                        (min: {minBid.toLocaleString()} TSh)
                      </span>
                    </Label>
                    <Input
                      id="bid-amount"
                      data-ocid="auction_detail.bid_amount_input"
                      type="number"
                      min={minBid}
                      step={1000}
                      required
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      placeholder={String(minBid)}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    data-ocid="auction_detail.place_bid_button"
                  >
                    {t("placeBid") ?? "Place Bid"}
                  </Button>
                </form>
              )}
            </div>

            {/* Bid History */}
            {bids.length > 0 && (
              <div
                data-ocid="auction_detail.bid_history"
                className="bg-card border border-border rounded-2xl p-5 space-y-3"
              >
                <h3 className="text-sm font-semibold text-foreground">
                  {t("bidHistory") ?? "Bid History"}
                </h3>
                <ul className="space-y-2.5">
                  {bids.map((bid, idx) => (
                    <li
                      key={bid.id}
                      data-ocid={`auction_detail.bid_history.item.${idx + 1}`}
                      className="flex items-center gap-3"
                    >
                      <div className="h-7 w-7 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-accent">
                          {auction.isAnonymousBidding
                            ? "?"
                            : bid.bidderId.slice(-1).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground truncate">
                          {auction.isAnonymousBidding
                            ? (t("anonymousBidding") ?? "Anonymous Bidder")
                            : `Bidder ${bid.bidderId}`}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {timeAgo(bid.placedAt, language)}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-semibold text-foreground tabular-nums">
                          {bid.bidAmount.toLocaleString()} TSh
                        </p>
                        {bid.isWinning && (
                          <span className="text-xs font-medium text-emerald-600 flex items-center gap-0.5 justify-end">
                            <Trophy className="h-3 w-3" /> Winning
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {bids.length === 0 && auction.status === "active" && (
              <div
                data-ocid="auction_detail.bid_history.empty_state"
                className="bg-muted/30 border border-border rounded-2xl px-5 py-8 text-center"
              >
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-muted-foreground opacity-40" />
                <p className="text-sm text-muted-foreground">
                  <p className="text-sm text-muted-foreground">
                    {language === "sw"
                      ? "Bado hakuna zabuni - Kuwa wa kwanza!"
                      : "No bids yet — be the first!"}
                  </p>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
