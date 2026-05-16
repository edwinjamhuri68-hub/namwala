import { a as useLanguageStore, u as useAuthStore, ak as useParams, r as reactExports, j as jsxRuntimeExports, L as Layout, e as Link, B as Button, m as Badge, y as MapPin, Q as Users, K as Clock, T as TrendingUp, R as CircleCheckBig, I as Input } from "./index-BUVIgngH.js";
import { L as Label } from "./label-BTY_QCm0.js";
import { u as ue } from "./index-c308oYmR.js";
import { A as ArrowLeft } from "./arrow-left-BIW276yu.js";
import { I as Image } from "./image-C4RCaSjH.js";
import { T as Trophy } from "./trophy-CIdLAcJn.js";
import { C as CircleX } from "./circle-x-bCVEqfs_.js";
import "./index-ob0xpmgs.js";
const isoOffset = (ms) => new Date(Date.now() + ms).toISOString();
const MOCK_AUCTIONS = [
  {
    id: "a1",
    sellerId: "u1",
    listingType: "crop",
    title: "Premium Maize Harvest",
    description: "High quality maize from Dodoma, well-stored and ready for delivery. Grown with minimal pesticide use, ideal for direct consumption or resale.",
    startingPrice: 5e4,
    currentBid: 85e3,
    currentBidderId: "u3",
    bidCount: 7,
    endTime: isoOffset(2 * 36e5),
    startTime: isoOffset(-24 * 36e5),
    quantity: 500,
    unit: "kg",
    images: [],
    region: "Dodoma",
    status: "active",
    isAnonymousBidding: false
  },
  {
    id: "a2",
    sellerId: "u2",
    listingType: "livestock",
    title: "3 Friesian Dairy Cows",
    description: "Healthy Friesian cows with 5L/day average milk production. All cows are vaccinated, dewormed, and have veterinary health records.",
    startingPrice: 12e5,
    currentBid: 145e4,
    currentBidderId: "u3",
    bidCount: 4,
    endTime: isoOffset(18 * 36e5),
    startTime: isoOffset(-6 * 36e5),
    quantity: 3,
    unit: "head",
    images: [],
    region: "Arusha",
    status: "active",
    isAnonymousBidding: true
  },
  {
    id: "a3",
    sellerId: "u1",
    listingType: "crop",
    title: "Organic Beans Harvest",
    description: "Certified organic red kidney beans grown in Mbeya highlands. No chemical fertilizers used. Perfect for health-conscious buyers.",
    startingPrice: 75e3,
    currentBid: 75e3,
    bidCount: 0,
    endTime: isoOffset(5 * 24 * 36e5),
    startTime: isoOffset(-12 * 36e5),
    quantity: 200,
    unit: "kg",
    images: [],
    region: "Mbeya",
    status: "active",
    isAnonymousBidding: false
  },
  {
    id: "a4",
    sellerId: "u2",
    listingType: "livestock",
    title: "10 Boer Goats",
    description: "Well-fed Boer goats ready for market. Average weight 40kg each, healthy and active.",
    startingPrice: 8e5,
    currentBid: 95e4,
    currentBidderId: "u5",
    bidCount: 3,
    endTime: isoOffset(3 * 24 * 36e5),
    startTime: isoOffset(-2 * 24 * 36e5),
    quantity: 10,
    unit: "head",
    images: [],
    region: "Mwanza",
    status: "active",
    isAnonymousBidding: false
  },
  {
    id: "a5",
    sellerId: "u1",
    listingType: "crop",
    title: "Sunflower Seeds Lot",
    description: "200kg dried sunflower seeds for oil extraction, well-cleaned and stored in dry conditions.",
    startingPrice: 12e4,
    currentBid: 175e3,
    currentBidderId: "u3",
    bidCount: 12,
    endTime: isoOffset(-36e5),
    startTime: isoOffset(-7 * 24 * 36e5),
    quantity: 200,
    unit: "kg",
    images: [],
    region: "Kilimanjaro",
    status: "ended",
    isAnonymousBidding: false
  },
  {
    id: "a6",
    sellerId: "u2",
    listingType: "livestock",
    title: "50 Local Chickens",
    description: "Free-range chickens, vaccinated and healthy. Ideal for resale or meat production.",
    startingPrice: 3e5,
    currentBid: 38e4,
    currentBidderId: "u5",
    bidCount: 5,
    endTime: isoOffset(7 * 24 * 36e5),
    startTime: (/* @__PURE__ */ new Date()).toISOString(),
    quantity: 50,
    unit: "birds",
    images: [],
    region: "Dar es Salaam",
    status: "active",
    isAnonymousBidding: true
  }
];
const MOCK_BIDS = [
  {
    id: "b1",
    auctionId: "a1",
    bidderId: "u3",
    bidAmount: 85e3,
    placedAt: isoOffset(-18e5),
    isWinning: true
  },
  {
    id: "b2",
    auctionId: "a1",
    bidderId: "u5",
    bidAmount: 75e3,
    placedAt: isoOffset(-36e5),
    isWinning: false
  },
  {
    id: "b3",
    auctionId: "a1",
    bidderId: "u3",
    bidAmount: 7e4,
    placedAt: isoOffset(-54e5),
    isWinning: false
  },
  {
    id: "b4",
    auctionId: "a2",
    bidderId: "u3",
    bidAmount: 145e4,
    placedAt: isoOffset(-9e5),
    isWinning: true
  },
  {
    id: "b5",
    auctionId: "a2",
    bidderId: "u5",
    bidAmount: 135e4,
    placedAt: isoOffset(-27e5),
    isWinning: false
  },
  {
    id: "b6",
    auctionId: "a5",
    bidderId: "u3",
    bidAmount: 175e3,
    placedAt: isoOffset(-72e5),
    isWinning: true
  }
];
function timeAgo(isoStr, lang) {
  const diff = Date.now() - new Date(isoStr).getTime();
  const m = Math.floor(diff / 6e4);
  if (lang === "sw") {
    if (m < 1) return "hivi karibuni";
    if (m < 60) return `dakika ${m} zilizopita`;
    const h2 = Math.floor(m / 60);
    if (h2 < 24) return `saa ${h2} zilizopita`;
    return `siku ${Math.floor(h2 / 24)} zilizopita`;
  }
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}
function useCountdown(endTimeIso) {
  const endMs = new Date(endTimeIso).getTime();
  const [remaining, setRemaining] = reactExports.useState(() => endMs - Date.now());
  reactExports.useEffect(() => {
    const id = setInterval(() => setRemaining(endMs - Date.now()), 1e3);
    return () => clearInterval(id);
  }, [endMs]);
  if (remaining <= 0) return "Ended";
  const d = Math.floor(remaining / 864e5);
  const h = Math.floor(remaining % 864e5 / 36e5);
  const m = Math.floor(remaining % 36e5 / 6e4);
  const s = Math.floor(remaining % 6e4 / 1e3);
  if (d > 0) return `${d}d ${h}h ${m}m`;
  if (h > 0) return `${h}h ${m}m ${s}s`;
  return `${m}m ${s}s`;
}
function AuctionDetailPage() {
  const { t, language } = useLanguageStore();
  const { user } = useAuthStore();
  const params = useParams({ strict: false });
  const auctionId = params.auctionId;
  const [auction, setAuction] = reactExports.useState(
    () => MOCK_AUCTIONS.find((a) => a.id === auctionId)
  );
  const [bids, setBids] = reactExports.useState(
    () => MOCK_BIDS.filter((b) => b.auctionId === auctionId)
  );
  const [bidAmount, setBidAmount] = reactExports.useState("");
  const countdown = useCountdown((auction == null ? void 0 : auction.endTime) ?? (/* @__PURE__ */ new Date()).toISOString());
  const isSeller = (user == null ? void 0 : user.id) === (auction == null ? void 0 : auction.sellerId);
  const minBid = ((auction == null ? void 0 : auction.currentBid) ?? 0) + 1e4;
  if (!auction) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-2xl mx-auto px-4 py-20 text-center",
        "data-ocid": "auction_detail.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-semibold text-foreground mb-2", children: language === "sw" ? "Mnada haukupatikana" : "Auction not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "This auction may have been removed or the link is invalid." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auctions", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }),
            " Back to Auctions"
          ] }) })
        ]
      }
    ) });
  }
  function handlePlaceBid(e) {
    e.preventDefault();
    const amount = Number(bidAmount);
    if (!amount || amount < minBid) {
      ue.error(`Minimum bid is ${minBid.toLocaleString()} TSh`);
      return;
    }
    const newBid = {
      id: `b${Date.now()}`,
      auctionId: auction.id,
      bidderId: (user == null ? void 0 : user.id) ?? "guest",
      bidAmount: amount,
      placedAt: (/* @__PURE__ */ new Date()).toISOString(),
      isWinning: true
    };
    setBids((prev) => [
      newBid,
      ...prev.map((b) => ({ ...b, isWinning: false }))
    ]);
    setAuction(
      (prev) => prev ? {
        ...prev,
        currentBid: amount,
        currentBidderId: (user == null ? void 0 : user.id) ?? "guest",
        bidCount: prev.bidCount + 1
      } : prev
    );
    setBidAmount("");
    ue.success(t("bidPlaced") ?? "Bid placed successfully!");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 py-8 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/auctions",
        "data-ocid": "auction_detail.back_link",
        className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
          t("liveAuctions") ?? "Live Auctions"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted h-48 rounded-xl flex items-center justify-center border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-12 w-12 text-muted-foreground opacity-40" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground leading-snug", children: auction.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: `capitalize ${auction.listingType === "crop" ? "border-emerald-500/40 text-emerald-600 bg-emerald-500/5" : "border-blue-500/40 text-blue-600 bg-blue-500/5"}`,
                  children: auction.listingType
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: "outline",
                  className: `capitalize ${auction.status === "active" ? "border-emerald-500/30 text-emerald-600" : auction.status === "ended" ? "border-yellow-500/30 text-yellow-600" : "border-border text-muted-foreground"}`,
                  children: [
                    auction.status === "active" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-1 h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" }),
                    auction.status
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 shrink-0" }),
            auction.region
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: auction.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-muted/60 px-3 py-1 rounded-full text-muted-foreground", children: language === "sw" ? "Imeorodheshwa na Muuzaji" : "Listed by Seller" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-muted/60 px-3 py-1 rounded-full text-muted-foreground", children: [
              auction.quantity,
              " ",
              auction.unit
            ] }),
            auction.isAnonymousBidding && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3 w-3" }),
              t("anonymousBidding") ?? "Anonymous Bidding"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "auction_detail.bid_panel",
            className: "bg-card border border-border rounded-2xl p-6 space-y-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: t("highestBid") ?? "Current Highest Bid" }),
                auction.status === "active" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-accent font-medium", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
                  countdown
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-4xl font-bold text-accent tabular-nums", children: [
                  auction.currentBid.toLocaleString(),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-semibold text-muted-foreground ml-1", children: "TSh" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3 w-3" }),
                  auction.bidCount,
                  " ",
                  auction.bidCount === 1 ? "bid" : "bids",
                  " ",
                  " · ",
                  t("startingPrice"),
                  ": ",
                  auction.startingPrice.toLocaleString(),
                  " ",
                  "TSh"
                ] })
              ] }),
              (auction.status === "ended" || auction.status === "completed") && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": "auction_detail.winner_banner",
                  className: "bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-4 py-3 flex items-start gap-3",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-5 w-5 text-emerald-600 shrink-0 mt-0.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-emerald-700", children: t("auctionEnded") ?? "Auction Ended" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-emerald-600 mt-0.5", children: [
                        "Final Price: ",
                        auction.currentBid.toLocaleString(),
                        " TSh"
                      ] })
                    ] })
                  ]
                }
              ),
              isSeller && auction.status === "ended" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "default",
                    className: "flex-1 gap-2 bg-emerald-600 hover:bg-emerald-700 text-white",
                    "data-ocid": "auction_detail.accept_bid_button",
                    onClick: () => {
                      setAuction(
                        (prev) => prev ? { ...prev, status: "completed" } : prev
                      );
                      ue.success("Bid accepted!");
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4" }),
                      t("acceptBid") ?? "Accept Bid"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    className: "flex-1 gap-2 border-destructive/40 text-destructive hover:bg-destructive/5",
                    "data-ocid": "auction_detail.reject_bid_button",
                    onClick: () => {
                      setAuction(
                        (prev) => prev ? { ...prev, status: "cancelled" } : prev
                      );
                      ue.error("Bid rejected.");
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-4 w-4" }),
                      t("rejectBid") ?? "Reject Bid"
                    ]
                  }
                )
              ] }),
              auction.status === "active" && !isSeller && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "form",
                {
                  onSubmit: handlePlaceBid,
                  className: "space-y-3 border-t border-border pt-4",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "bid-amount", className: "text-sm", children: [
                        t("yourBid") ?? "Your Bid",
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground ml-1 font-normal text-xs", children: [
                          "(min: ",
                          minBid.toLocaleString(),
                          " TSh)"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "bid-amount",
                          "data-ocid": "auction_detail.bid_amount_input",
                          type: "number",
                          min: minBid,
                          step: 1e3,
                          required: true,
                          value: bidAmount,
                          onChange: (e) => setBidAmount(e.target.value),
                          placeholder: String(minBid)
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "submit",
                        className: "w-full",
                        "data-ocid": "auction_detail.place_bid_button",
                        children: t("placeBid") ?? "Place Bid"
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        bids.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "auction_detail.bid_history",
            className: "bg-card border border-border rounded-2xl p-5 space-y-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: t("bidHistory") ?? "Bid History" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: bids.map((bid, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "li",
                {
                  "data-ocid": `auction_detail.bid_history.item.${idx + 1}`,
                  className: "flex items-center gap-3",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-7 w-7 rounded-full bg-accent/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-accent", children: auction.isAnonymousBidding ? "?" : bid.bidderId.slice(-1).toUpperCase() }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground truncate", children: auction.isAnonymousBidding ? t("anonymousBidding") ?? "Anonymous Bidder" : `Bidder ${bid.bidderId}` }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: timeAgo(bid.placedAt, language) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground tabular-nums", children: [
                        bid.bidAmount.toLocaleString(),
                        " TSh"
                      ] }),
                      bid.isWinning && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-emerald-600 flex items-center gap-0.5 justify-end", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-3 w-3" }),
                        " Winning"
                      ] })
                    ] })
                  ]
                },
                bid.id
              )) })
            ]
          }
        ),
        bids.length === 0 && auction.status === "active" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "auction_detail.bid_history.empty_state",
            className: "bg-muted/30 border border-border rounded-2xl px-5 py-8 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-8 w-8 mx-auto mb-2 text-muted-foreground opacity-40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: language === "sw" ? "Bado hakuna zabuni - Kuwa wa kwanza!" : "No bids yet — be the first!" }) })
            ]
          }
        )
      ] })
    ] })
  ] }) });
}
export {
  AuctionDetailPage as default
};
