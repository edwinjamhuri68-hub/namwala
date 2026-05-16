import { ak as useParams, a as useLanguageStore, r as reactExports, al as MOCK_RATINGS, j as jsxRuntimeExports, L as Layout, m as Badge, am as StarBadge, M as MessageCircle, aa as Star, u as useAuthStore, N as CircleCheck, an as StarRating, l as Textarea, B as Button, ab as timeAgo } from "./index-BUVIgngH.js";
import { U as User } from "./user-DumBjj6t.js";
const SELLER_META = {
  u1: { name: "Juma Mwangi", role: "farmer", location: "Mbeya" },
  u2: { name: "Amina Hassan", role: "livestock_keeper", location: "Arusha" },
  u3: { name: "Dr. Peter Kimaro", role: "veterinarian", location: "Dodoma" },
  u4: {
    name: "Sarah Ndunguru",
    role: "agri_specialist",
    location: "Dar es Salaam"
  },
  u5: {
    name: "Mohamed Ally (Ally Agro Supplies)",
    role: "input_seller",
    location: "Mwanza"
  },
  u6: {
    name: "Grace Msigwa (Msigwa Farm Services)",
    role: "input_service_provider",
    location: "Morogoro"
  },
  u7: {
    name: "Dr. Ibrahim Salum",
    role: "weather_soil_specialist",
    location: "Dodoma"
  },
  u8: {
    name: "Fatuma Juma",
    role: "market_advisor",
    location: "Dar es Salaam"
  },
  u9: { name: "John Kariuki", role: "transport_provider", location: "Arusha" },
  u10: { name: "Daudi Kipanga", role: "buyer", location: "Dar es Salaam" }
};
const ROLE_LABELS = {
  farmer: { en: "Farmer", sw: "Mkulima" },
  livestock_keeper: { en: "Livestock Keeper", sw: "Mfugaji" },
  agri_specialist: { en: "Agricultural Specialist", sw: "Mtaalamu wa Kilimo" },
  veterinarian: { en: "Veterinarian", sw: "Daktari wa Wanyama" },
  input_seller: { en: "Input Seller", sw: "Muuzaji wa Pembejeo" },
  input_service_provider: { en: "Service Provider", sw: "Mtoa Huduma" },
  weather_soil_specialist: { en: "Weather Specialist", sw: "Mtaalamu wa Hewa" },
  market_advisor: { en: "Market Advisor", sw: "Mshauri wa Soko" },
  transport_provider: { en: "Transport Provider", sw: "Mtoa Usafiri" },
  buyer: { en: "Buyer", sw: "Mnunuzi" }
};
function calcAverage(ratings) {
  if (!ratings.length) return 0;
  return ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;
}
function ReviewCard({
  review,
  index,
  lang
}) {
  const initials = review.fromUserName.split(" ").slice(0, 2).map((w) => w[0]).join("");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `reviews.item.${index}`,
      className: "bg-card border border-border rounded-xl p-4 space-y-3",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-primary", children: initials }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground truncate", children: review.fromUserName }),
              review.listingTitle && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground truncate", children: [
                lang === "sw" ? "Bidhaa:" : "For:",
                " ",
                review.listingTitle
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-1 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { value: review.rating, readOnly: true, size: 14 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: timeAgo(review.timestamp, lang) })
          ] })
        ] }),
        review.comment && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 leading-relaxed border-l-2 border-primary/30 pl-3", children: review.comment })
      ]
    }
  );
}
function RatingBar({
  star,
  count,
  total
}) {
  const pct = total > 0 ? count / total * 100 : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0.5 w-12 shrink-0 justify-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: star }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 fill-amber-400 text-amber-400" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-full bg-amber-400 rounded-full transition-all duration-500",
        style: { width: `${pct}%` }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground w-5 text-right shrink-0", children: count })
  ] });
}
function ReviewForm({
  sellerId,
  sellerName,
  onSubmit
}) {
  const { user } = useAuthStore();
  const { t } = useLanguageStore();
  const [starValue, setStarValue] = reactExports.useState(0);
  const [comment, setComment] = reactExports.useState("");
  const [submitted, setSubmitted] = reactExports.useState(false);
  const canSubmit = starValue > 0;
  const handleSubmit = () => {
    if (!canSubmit || !user) return;
    const newReview = {
      id: `r-${Date.now()}`,
      fromUserId: user.id,
      fromUserName: user.name,
      toUserId: sellerId,
      rating: starValue,
      comment: comment.trim(),
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
    onSubmit(newReview);
    setSubmitted(true);
    setStarValue(0);
    setComment("");
  };
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "reviews.login_prompt",
        className: "bg-muted/30 border border-border rounded-xl p-4 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-8 h-8 text-muted-foreground mx-auto mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: t("loginToReview") })
        ]
      }
    );
  }
  if (submitted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "reviews.success_state",
        className: "bg-accent/10 border border-accent/30 rounded-xl p-4 flex items-center gap-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-6 h-6 text-accent shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: t("reviewSuccess") })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "reviews.form",
      className: "bg-card border border-border rounded-xl p-4 space-y-4",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-base text-foreground", children: [
          t("writeReview"),
          " — ",
          sellerName
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide", children: t("yourRating") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StarRating,
              {
                "data-ocid": "reviews.star_picker",
                value: starValue,
                size: 28,
                onChange: setStarValue
              }
            ),
            starValue > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: ["", "Poor", "Fair", "Good", "Very Good", "Excellent"][starValue] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "review-comment",
              className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
              children: t("yourComment")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "review-comment",
              "data-ocid": "reviews.comment_textarea",
              placeholder: t("commentPlaceholder"),
              value: comment,
              onChange: (e) => setComment(e.target.value),
              rows: 3,
              className: "resize-none text-sm"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            "data-ocid": "reviews.submit_button",
            className: "w-full",
            disabled: !canSubmit,
            onClick: handleSubmit,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 mr-2" }),
              t("submitReview")
            ]
          }
        )
      ]
    }
  );
}
function SellerReviewsPage() {
  var _a;
  const { sellerId } = useParams({ strict: false });
  const { language } = useLanguageStore();
  const { t } = useLanguageStore();
  const lang = language;
  const seller = SELLER_META[sellerId] ?? {
    name: lang === "sw" ? "Muuzaji" : "Seller",
    role: "input_seller",
    location: ""
  };
  const roleLabel = ((_a = ROLE_LABELS[seller.role]) == null ? void 0 : _a[lang]) ?? seller.role;
  const [localRatings, setLocalRatings] = reactExports.useState(
    () => MOCK_RATINGS.filter((r) => r.toUserId === sellerId)
  );
  const average = reactExports.useMemo(() => calcAverage(localRatings), [localRatings]);
  const distribution = reactExports.useMemo(() => {
    const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    for (const r of localRatings) dist[r.rating] = (dist[r.rating] ?? 0) + 1;
    return dist;
  }, [localRatings]);
  const handleNewReview = (r) => {
    setLocalRatings((prev) => [r, ...prev]);
  };
  const initials = seller.name.split(" ").slice(0, 2).map((w) => w[0]).join("");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "seller_reviews.page",
      className: "px-4 py-4 pb-10 space-y-5 max-w-lg mx-auto",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "reviews.seller_header",
            className: "bg-card border border-border rounded-2xl p-5 flex flex-col items-center text-center gap-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold text-primary", children: initials }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-lg font-bold text-foreground leading-tight", children: seller.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-[11px]", children: roleLabel }),
                  seller.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                    "📍 ",
                    seller.location
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-xl px-6 py-3 flex flex-col items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-display font-bold text-foreground", children: average > 0 ? average.toFixed(1) : "—" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg text-muted-foreground mb-1", children: "/5" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(StarBadge, { rating: average, count: localRatings.length, size: 18 }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  localRatings.length,
                  " ",
                  t("reviewsCount")
                ] })
              ] }),
              localRatings.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full space-y-1.5", children: [5, 4, 3, 2, 1].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                RatingBar,
                {
                  star: s,
                  count: distribution[s] ?? 0,
                  total: localRatings.length
                },
                s
              )) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ReviewForm,
          {
            sellerId,
            sellerName: seller.name,
            onSubmit: handleNewReview,
            lang
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "reviews.list_section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-sm font-semibold text-foreground", children: [
              t("reviews"),
              " (",
              localRatings.length,
              ")"
            ] })
          ] }),
          localRatings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "reviews.empty_state",
              className: "bg-card border border-border rounded-xl py-10 text-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl block mb-2", children: "⭐" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: t("noReviews") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: t("beFirstReview") })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "reviews.list", children: localRatings.map((review, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ReviewCard,
            {
              review,
              index: i + 1,
              lang
            },
            review.id
          )) })
        ] })
      ]
    }
  ) });
}
export {
  SellerReviewsPage as default
};
