import { k as createLucideIcon, a as useLanguageStore, Z as useBackend, ak as useParams, aL as Principal, aB as useQuery, j as jsxRuntimeExports, L as Layout, e as Link, B as Button, n as Skeleton, m as Badge, y as MapPin, aa as Star } from "./index-BUVIgngH.js";
import { R as ROLE_COLORS } from "./ForumPage-DWTca4hy.js";
import { T as ThumbsUp, B as BADGE_META } from "./ForumTopicPage-BPkSwxAt.js";
import { A as ArrowLeft } from "./arrow-left-BIW276yu.js";
import { A as Award } from "./award-Btif5h59.js";
import { S as ShieldCheck } from "./shield-check-CYiHWttZ.js";
import { T as Trophy } from "./trophy-CIdLAcJn.js";
import "./useMutation-BB6v1FNg.js";
import "./index-c308oYmR.js";
import "./bug-CMwW2EO6.js";
import "./cloud-rain-CG3hMqnT.js";
import "./send-B_LO1ymC.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 20a6 6 0 0 0-12 0", key: "1qehca" }],
  ["circle", { cx: "12", cy: "10", r: "4", key: "1h16sb" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
];
const CircleUserRound = createLucideIcon("circle-user-round", __iconNode);
const BADGE_DESCRIPTIONS = {
  badgeHelpfulExpert: {
    nameEn: "Helpful Expert",
    nameSw: "Mshauri Msaada",
    en: "Awarded for receiving 5 or more upvotes on forum replies — your answers are making a real difference.",
    sw: "Inatunukiwa kwa kupata kura 5 au zaidi kwenye majibu ya jukwaa — majibu yako yanafanya tofauti kubwa."
  },
  badgeTrustedAdvisor: {
    nameEn: "Trusted Advisor",
    nameSw: "Mshauri Wa Kuaminika",
    en: "Earned at 20 upvotes — the community trusts your knowledge and expertise.",
    sw: "Inapatikana kwa kura 20 — jamii inaamini maarifa na ujuzi wako."
  },
  badgeCommunityLeader: {
    nameEn: "Community Leader",
    nameSw: "Kiongozi wa Jamii",
    en: "Granted at 50+ upvotes — you are a pillar of the Namwala farming community.",
    sw: "Inatolewa kwa kura 50+ — wewe ni nguzo ya jamii ya wakulima wa Namwala."
  }
};
function formatDate(ts, language) {
  const ms = Number(ts / 1000000n);
  const d = new Date(ms);
  if (language === "sw") {
    const swMonths = [
      "Jan",
      "Feb",
      "Mac",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Okt",
      "Nov",
      "Des"
    ];
    return `${d.getDate()} ${swMonths[d.getMonth()]} ${d.getFullYear()}`;
  }
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}
function UserProfilePage() {
  const { t, language } = useLanguageStore();
  const { actor, isReady } = useBackend();
  const { userId } = useParams({ strict: false });
  let principal = null;
  try {
    principal = Principal.fromText(userId);
  } catch {
    principal = null;
  }
  const {
    data: reputation,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["userReputation", userId],
    queryFn: async () => {
      if (!actor || !principal) return null;
      return actor.getUserReputation(principal);
    },
    enabled: isReady && !!principal
  });
  const isSw = language === "sw";
  if (!isLoading && (!reputation || isError)) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center min-h-screen gap-4",
        "data-ocid": "user.profile.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleUserRound, { className: "text-muted-foreground/30", size: 56 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium", children: isSw ? "Mtumiaji hakupatikana" : "User not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/leaderboard", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", "data-ocid": "user.profile.back_button", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 14, className: "mr-1" }),
            isSw ? "Rudi Ubora" : "Back to Leaderboard"
          ] }) })
        ]
      }
    ) });
  }
  const roleColor = ROLE_COLORS[(reputation == null ? void 0 : reputation.userRole) ?? ""] || "bg-muted text-muted-foreground";
  const earnedBadgesWithDates = (reputation == null ? void 0 : reputation.earnedBadgesWithDates) ?? [];
  const score = reputation ? Number(reputation.reputationScore) : 0;
  const badgeCount = earnedBadgesWithDates.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "user.profile.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b px-4 py-3 sticky top-0 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/leaderboard", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "text-muted-foreground hover:text-foreground transition-colors",
          "aria-label": "Back",
          "data-ocid": "user.profile.back_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 20 })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground flex-1 truncate", children: isSw ? "Profaili ya Mtumiaji" : "User Profile" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-6 space-y-6", children: [
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 rounded-2xl" }) : reputation ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border rounded-2xl p-5 space-y-4",
          "data-ocid": "user.profile.card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleUserRound, { className: "text-primary", size: 32 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold text-foreground truncate", children: reputation.userName }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap mt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `text-[11px] border-0 ${roleColor}`, children: t(reputation.userRole) }),
                  reputation.region && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-0.5 text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 11 }),
                    reputation.region
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-primary", children: score.toLocaleString() }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide", children: isSw ? "Alama" : "Score" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "grid grid-cols-2 gap-3 pt-1",
                "data-ocid": "user.profile.stats",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl px-4 py-3 flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsUp, { className: "text-primary shrink-0", size: 18 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-foreground leading-tight", children: score.toLocaleString() }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: isSw ? "Kura Zilizopokelewa" : "Upvotes Received" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl px-4 py-3 flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "text-primary shrink-0", size: 18 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-foreground leading-tight", children: badgeCount }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: isSw ? "Tuzo Zilizopatikana" : "Badges Earned" })
                    ] })
                  ] })
                ]
              }
            )
          ]
        }
      ) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "user.profile.badges_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "text-primary", size: 18 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-bold text-foreground", children: isSw ? "Onyesho la Tuzo" : "Badge Showcase" })
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [0, 1].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-xl" }, k)) }) : earnedBadgesWithDates.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border rounded-xl py-10 text-center",
            "data-ocid": "user.profile.badges.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Trophy,
                {
                  className: "mx-auto text-muted-foreground/30 mb-3",
                  size: 40
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-sm", children: isSw ? "Bado hakuna tuzo" : "No badges yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: isSw ? "Jibu maswali kwenye jukwaa na pata kura kupata tuzo." : "Answer questions in the forum and earn upvotes to unlock badges." })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: earnedBadgesWithDates.map(([badgeName, earnedAt]) => {
          const meta = BADGE_META[badgeName];
          if (!meta) return null;
          const desc = BADGE_DESCRIPTIONS[meta.key];
          const Icon = meta.icon;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border rounded-xl p-4 flex items-start gap-4",
              "data-ocid": `user.profile.badge.item.${badgeName.toLowerCase().replace(/\s+/g, "-")}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${meta.color}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 22 })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm text-foreground", children: isSw ? desc == null ? void 0 : desc.nameSw : desc == null ? void 0 : desc.nameEn }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-xs text-foreground/70", children: isSw ? desc == null ? void 0 : desc.nameEn : desc == null ? void 0 : desc.nameSw })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: `inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${meta.color}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 9 }),
                          isSw ? "Imepatikana" : "Earned"
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 leading-relaxed", children: isSw ? desc == null ? void 0 : desc.sw : desc == null ? void 0 : desc.en }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground/70 mt-2", children: [
                    isSw ? "Tarehe:" : "Earned on:",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-muted-foreground", children: formatDate(earnedAt, language) })
                  ] })
                ] })
              ]
            },
            `${badgeName}-${earnedAt.toString()}`
          );
        }) })
      ] }),
      !isLoading && reputation && earnedBadgesWithDates.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 border rounded-xl px-4 py-3 text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: isSw ? `${reputation.userName} amepata tuzo ${badgeCount} kwa jumla ya kura ${score.toLocaleString()} kutoka kwa wanajamii wa Namwala.` : `${reputation.userName} has earned ${badgeCount} badge${badgeCount !== 1 ? "s" : ""} with a total of ${score.toLocaleString()} upvote${score !== 1 ? "s" : ""} from the Namwala community.` }) })
    ] })
  ] }) });
}
export {
  UserProfilePage as default
};
