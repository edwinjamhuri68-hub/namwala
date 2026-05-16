import { Layout } from "@/components/Layout";
import { StarBadge, StarRating } from "@/components/StarRating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MOCK_RATINGS, timeAgo } from "@/lib/mockData";
import { useAuthStore } from "@/store/authStore";
import { useLanguageStore } from "@/store/languageStore";
import type { Rating } from "@/types";
import { useParams } from "@tanstack/react-router";
import { CheckCircle2, MessageCircle, Star, User } from "lucide-react";
import { useMemo, useState } from "react";

// Seller metadata inferred from mock data
const SELLER_META: Record<
  string,
  { name: string; role: string; location: string }
> = {
  u1: { name: "Juma Mwangi", role: "farmer", location: "Mbeya" },
  u2: { name: "Amina Hassan", role: "livestock_keeper", location: "Arusha" },
  u3: { name: "Dr. Peter Kimaro", role: "veterinarian", location: "Dodoma" },
  u4: {
    name: "Sarah Ndunguru",
    role: "agri_specialist",
    location: "Dar es Salaam",
  },
  u5: {
    name: "Mohamed Ally (Ally Agro Supplies)",
    role: "input_seller",
    location: "Mwanza",
  },
  u6: {
    name: "Grace Msigwa (Msigwa Farm Services)",
    role: "input_service_provider",
    location: "Morogoro",
  },
  u7: {
    name: "Dr. Ibrahim Salum",
    role: "weather_soil_specialist",
    location: "Dodoma",
  },
  u8: {
    name: "Fatuma Juma",
    role: "market_advisor",
    location: "Dar es Salaam",
  },
  u9: { name: "John Kariuki", role: "transport_provider", location: "Arusha" },
  u10: { name: "Daudi Kipanga", role: "buyer", location: "Dar es Salaam" },
};

const ROLE_LABELS: Record<string, { en: string; sw: string }> = {
  farmer: { en: "Farmer", sw: "Mkulima" },
  livestock_keeper: { en: "Livestock Keeper", sw: "Mfugaji" },
  agri_specialist: { en: "Agricultural Specialist", sw: "Mtaalamu wa Kilimo" },
  veterinarian: { en: "Veterinarian", sw: "Daktari wa Wanyama" },
  input_seller: { en: "Input Seller", sw: "Muuzaji wa Pembejeo" },
  input_service_provider: { en: "Service Provider", sw: "Mtoa Huduma" },
  weather_soil_specialist: { en: "Weather Specialist", sw: "Mtaalamu wa Hewa" },
  market_advisor: { en: "Market Advisor", sw: "Mshauri wa Soko" },
  transport_provider: { en: "Transport Provider", sw: "Mtoa Usafiri" },
  buyer: { en: "Buyer", sw: "Mnunuzi" },
};

function calcAverage(ratings: Rating[]): number {
  if (!ratings.length) return 0;
  return ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;
}

// ─── Review Card ─────────────────────────────────────────────────────────────
function ReviewCard({
  review,
  index,
  lang,
}: {
  review: Rating;
  index: number;
  lang: string;
}) {
  const initials = review.fromUserName
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <div
      data-ocid={`reviews.item.${index}`}
      className="bg-card border border-border rounded-xl p-4 space-y-3"
    >
      {/* Reviewer header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-primary">{initials}</span>
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-sm text-foreground truncate">
              {review.fromUserName}
            </p>
            {review.listingTitle && (
              <p className="text-[11px] text-muted-foreground truncate">
                {lang === "sw" ? "Bidhaa:" : "For:"} {review.listingTitle}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <StarRating value={review.rating} readOnly size={14} />
          <span className="text-[10px] text-muted-foreground">
            {timeAgo(review.timestamp, lang as "en" | "sw")}
          </span>
        </div>
      </div>

      {/* Comment */}
      {review.comment && (
        <p className="text-sm text-foreground/80 leading-relaxed border-l-2 border-primary/30 pl-3">
          {review.comment}
        </p>
      )}
    </div>
  );
}

// ─── Rating Distribution Bar ─────────────────────────────────────────────────
function RatingBar({
  star,
  count,
  total,
}: { star: number; count: number; total: number }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5 w-12 shrink-0 justify-end">
        <span className="text-xs text-muted-foreground">{star}</span>
        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
      </div>
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-400 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-muted-foreground w-5 text-right shrink-0">
        {count}
      </span>
    </div>
  );
}

// ─── Submission Form ──────────────────────────────────────────────────────────
function ReviewForm({
  sellerId,
  sellerName,
  onSubmit,
}: {
  sellerId: string;
  sellerName: string;
  onSubmit: (r: Rating) => void;
  lang?: string;
}) {
  const { user } = useAuthStore();
  const { t } = useLanguageStore();
  const [starValue, setStarValue] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = starValue > 0;

  const handleSubmit = () => {
    if (!canSubmit || !user) return;
    const newReview: Rating = {
      id: `r-${Date.now()}`,
      fromUserId: user.id,
      fromUserName: user.name,
      toUserId: sellerId,
      rating: starValue as 1 | 2 | 3 | 4 | 5,
      comment: comment.trim(),
      timestamp: new Date().toISOString(),
    };
    onSubmit(newReview);
    setSubmitted(true);
    setStarValue(0);
    setComment("");
  };

  if (!user) {
    return (
      <div
        data-ocid="reviews.login_prompt"
        className="bg-muted/30 border border-border rounded-xl p-4 text-center"
      >
        <User className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">{t("loginToReview")}</p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div
        data-ocid="reviews.success_state"
        className="bg-accent/10 border border-accent/30 rounded-xl p-4 flex items-center gap-3"
      >
        <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
        <p className="text-sm font-medium text-foreground">
          {t("reviewSuccess")}
        </p>
      </div>
    );
  }

  return (
    <div
      data-ocid="reviews.form"
      className="bg-card border border-border rounded-xl p-4 space-y-4"
    >
      <h3 className="font-display font-semibold text-base text-foreground">
        {t("writeReview")} — {sellerName}
      </h3>

      {/* Star picker */}
      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {t("yourRating")}
        </p>
        <div className="flex items-center gap-3">
          <StarRating
            data-ocid="reviews.star_picker"
            value={starValue}
            size={28}
            onChange={setStarValue}
          />
          {starValue > 0 && (
            <span className="text-sm font-semibold text-foreground">
              {
                ["", "Poor", "Fair", "Good", "Very Good", "Excellent"][
                  starValue
                ]
              }
            </span>
          )}
        </div>
      </div>

      {/* Comment */}
      <div className="space-y-1">
        <label
          htmlFor="review-comment"
          className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
        >
          {t("yourComment")}
        </label>
        <Textarea
          id="review-comment"
          data-ocid="reviews.comment_textarea"
          placeholder={t("commentPlaceholder")}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          className="resize-none text-sm"
        />
      </div>

      <Button
        type="button"
        data-ocid="reviews.submit_button"
        className="w-full"
        disabled={!canSubmit}
        onClick={handleSubmit}
      >
        <Star className="w-4 h-4 mr-2" />
        {t("submitReview")}
      </Button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function SellerReviewsPage() {
  const { sellerId } = useParams({ strict: false }) as { sellerId: string };
  const { language } = useLanguageStore();
  const { t } = useLanguageStore();
  const lang = language;

  const seller = SELLER_META[sellerId] ?? {
    name: lang === "sw" ? "Muuzaji" : "Seller",
    role: "input_seller",
    location: "",
  };

  const roleLabel =
    ROLE_LABELS[seller.role]?.[lang as "en" | "sw"] ?? seller.role;

  // Ratings state — seeded from MOCK_RATINGS
  const [localRatings, setLocalRatings] = useState<Rating[]>(() =>
    MOCK_RATINGS.filter((r) => r.toUserId === sellerId),
  );

  const average = useMemo(() => calcAverage(localRatings), [localRatings]);

  // Distribution: count per star level
  const distribution = useMemo(() => {
    const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    for (const r of localRatings) dist[r.rating] = (dist[r.rating] ?? 0) + 1;
    return dist;
  }, [localRatings]);

  const handleNewReview = (r: Rating) => {
    setLocalRatings((prev) => [r, ...prev]);
  };

  const initials = seller.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <Layout>
      <div
        data-ocid="seller_reviews.page"
        className="px-4 py-4 pb-10 space-y-5 max-w-lg mx-auto"
      >
        {/* Seller Profile Header */}
        <div
          data-ocid="reviews.seller_header"
          className="bg-card border border-border rounded-2xl p-5 flex flex-col items-center text-center gap-3"
        >
          <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary">{initials}</span>
          </div>
          <div>
            <h1 className="font-display text-lg font-bold text-foreground leading-tight">
              {seller.name}
            </h1>
            <div className="flex items-center justify-center gap-2 mt-1">
              <Badge variant="secondary" className="text-[11px]">
                {roleLabel}
              </Badge>
              {seller.location && (
                <span className="text-xs text-muted-foreground">
                  📍 {seller.location}
                </span>
              )}
            </div>
          </div>

          {/* Big average rating display */}
          <div className="bg-muted/30 rounded-xl px-6 py-3 flex flex-col items-center gap-1">
            <div className="flex items-end gap-1">
              <span className="text-4xl font-display font-bold text-foreground">
                {average > 0 ? average.toFixed(1) : "—"}
              </span>
              <span className="text-lg text-muted-foreground mb-1">/5</span>
            </div>
            <StarBadge rating={average} count={localRatings.length} size={18} />
            <p className="text-xs text-muted-foreground">
              {localRatings.length} {t("reviewsCount")}
            </p>
          </div>

          {/* Rating distribution */}
          {localRatings.length > 0 && (
            <div className="w-full space-y-1.5">
              {[5, 4, 3, 2, 1].map((s) => (
                <RatingBar
                  key={s}
                  star={s}
                  count={(distribution as Record<number, number>)[s] ?? 0}
                  total={localRatings.length}
                />
              ))}
            </div>
          )}
        </div>

        {/* Write a Review Form */}
        <ReviewForm
          sellerId={sellerId}
          sellerName={seller.name}
          onSubmit={handleNewReview}
          lang={lang}
        />

        {/* Reviews List */}
        <section data-ocid="reviews.list_section">
          <div className="flex items-center gap-2 mb-3">
            <MessageCircle className="w-4 h-4 text-primary" />
            <h2 className="font-display text-sm font-semibold text-foreground">
              {t("reviews")} ({localRatings.length})
            </h2>
          </div>

          {localRatings.length === 0 ? (
            <div
              data-ocid="reviews.empty_state"
              className="bg-card border border-border rounded-xl py-10 text-center"
            >
              <span className="text-4xl block mb-2">⭐</span>
              <p className="font-semibold text-sm text-foreground">
                {t("noReviews")}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {t("beFirstReview")}
              </p>
            </div>
          ) : (
            <div className="space-y-3" data-ocid="reviews.list">
              {localRatings.map((review, i) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  index={i + 1}
                  lang={lang}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}
