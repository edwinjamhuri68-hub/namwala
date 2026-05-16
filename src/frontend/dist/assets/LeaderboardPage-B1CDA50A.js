import { k as createLucideIcon, a as useLanguageStore, Z as useBackend, r as reactExports, aB as useQuery, j as jsxRuntimeExports, L as Layout, K as Clock, n as Skeleton, e as Link, m as Badge, y as MapPin } from "./index-BUVIgngH.js";
import { R as ReputationBadges } from "./ForumTopicPage-BPkSwxAt.js";
import { R as ROLE_COLORS, a as Crown } from "./ForumPage-DWTca4hy.js";
import { T as Trophy } from "./trophy-CIdLAcJn.js";
import { A as Award } from "./award-Btif5h59.js";
import "./useMutation-BB6v1FNg.js";
import "./index-c308oYmR.js";
import "./arrow-left-BIW276yu.js";
import "./send-B_LO1ymC.js";
import "./bug-CMwW2EO6.js";
import "./cloud-rain-CG3hMqnT.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15",
      key: "143lza"
    }
  ],
  ["path", { d: "M11 12 5.12 2.2", key: "qhuxz6" }],
  ["path", { d: "m13 12 5.88-9.8", key: "hbye0f" }],
  ["path", { d: "M8 7h8", key: "i86dvs" }],
  ["circle", { cx: "12", cy: "17", r: "5", key: "qbz8iq" }],
  ["path", { d: "M12 18v-2h-.5", key: "fawc4q" }]
];
const Medal = createLucideIcon("medal", __iconNode);
const TZ_REGIONS = [
  "Dar es Salaam",
  "Mwanza",
  "Arusha",
  "Dodoma",
  "Morogoro",
  "Kilimanjaro",
  "Mbeya",
  "Tanga",
  "Zanzibar",
  "Shinyanga",
  "Kagera",
  "Geita",
  "Mara",
  "Tabora",
  "Lindi",
  "Ruvuma",
  "Iringa",
  "Singida",
  "Kigoma",
  "Mtwara",
  "Rukwa",
  "Katavi",
  "Njombe",
  "Simiyu",
  "Songwe"
];
const RANK_ICONS = {
  1: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { size: 16, className: "text-yellow-500" }),
  2: /* @__PURE__ */ jsxRuntimeExports.jsx(Medal, { size: 16, className: "text-slate-400" }),
  3: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { size: 16, className: "text-amber-600" })
};
function LeaderboardPage() {
  const { t } = useLanguageStore();
  const { actor, isReady } = useBackend();
  const [activeTab, setActiveTab] = reactExports.useState("alltime");
  const [region, setRegion] = reactExports.useState("");
  const [roleFilter, setRoleFilter] = reactExports.useState("all");
  const roleFilterParam = roleFilter === "specialists" ? "specialists" : roleFilter === "farmers" ? "farmers" : null;
  const { data: leaderboard = [], isLoading: isLoadingAllTime } = useQuery({
    queryKey: ["leaderboard", region, roleFilterParam],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLeaderboard(region, roleFilterParam);
    },
    enabled: isReady
  });
  const { data: weeklyLeaderboard = [], isLoading: isLoadingWeekly } = useQuery({
    queryKey: ["weeklyLeaderboard", region],
    queryFn: async () => {
      if (!actor) return [];
      const entries = await actor.getWeeklyLeaderboard(region);
      return entries.map((e) => ({
        userId: e.userId,
        userName: e.userName,
        userRole: e.userRole,
        region: e.region,
        badges: e.badges,
        reputationScore: e.weeklyScore,
        earnedBadgesWithDates: []
      }));
    },
    enabled: isReady
  });
  const filteredWeekly = roleFilter === "all" ? weeklyLeaderboard : weeklyLeaderboard.filter((u) => {
    if (roleFilter === "specialists") {
      return [
        "agri_specialist",
        "veterinarian",
        "weather_soil_specialist",
        "market_advisor"
      ].includes(u.userRole);
    }
    return ["farmer", "livestock_keeper"].includes(u.userRole);
  });
  const isLoading = activeTab === "alltime" ? isLoadingAllTime : isLoadingWeekly;
  function getRoleLabel(role) {
    return t(role);
  }
  function renderUserCard(user, rank, scoreLabel) {
    const isTop3 = rank <= 3;
    const roleColor = ROLE_COLORS[user.userRole] || "bg-muted text-muted-foreground";
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": `leaderboard.item.${rank}`,
        className: `bg-card border rounded-xl px-4 py-3 flex items-center gap-3 ${isTop3 ? "border-primary/30 shadow-sm" : "border-border"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm ${rank === 1 ? "bg-yellow-100 text-yellow-700" : rank === 2 ? "bg-slate-100 text-slate-600" : rank === 3 ? "bg-amber-100 text-amber-700" : "bg-muted text-muted-foreground"}`,
              children: RANK_ICONS[rank] ?? rank
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/user/$userId",
                  params: { userId: user.userId.toText() },
                  className: "font-semibold text-sm text-foreground truncate hover:text-primary transition-colors",
                  "data-ocid": `leaderboard.user.link.${rank}`,
                  children: user.userName
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: `text-[10px] border-0 py-0 px-1.5 shrink-0 ${roleColor}`,
                  children: getRoleLabel(user.userRole)
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground mb-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 11 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: user.region || "Tanzania" })
            ] }),
            user.badges.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              ReputationBadges,
              {
                badges: user.badges,
                t
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-primary", children: Number(user.reputationScore).toLocaleString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide", children: scoreLabel })
          ] })
        ]
      },
      `${user.userId.toString()}-${rank}`
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "leaderboard.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b px-4 py-4 sticky top-0 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "text-primary", size: 22 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold text-foreground leading-tight", children: t("communityLeaderboard") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("leaderboardSub") })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-4 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex gap-1 bg-muted/60 rounded-xl p-1",
          "data-ocid": "leaderboard.tabs",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setActiveTab("alltime"),
                "data-ocid": "leaderboard.alltime.tab",
                className: `flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${activeTab === "alltime" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
                children: t("leaderboardAllTime")
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setActiveTab("thisweek"),
                "data-ocid": "leaderboard.thisweek.tab",
                className: `flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${activeTab === "thisweek" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
                children: t("leaderboardThisWeek")
              }
            )
          ]
        }
      ),
      activeTab === "thisweek" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/40 rounded-lg px-3 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 12, className: "shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("leaderboardResetsSunday") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-[140px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "lb-region",
              className: "text-[10px] font-medium text-muted-foreground uppercase tracking-wide block mb-1",
              children: t("leaderboardRegion")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "lb-region",
              value: region,
              onChange: (e) => setRegion(e.target.value),
              className: "w-full border border-input rounded-xl px-3 py-2 bg-background text-foreground text-sm",
              "data-ocid": "leaderboard.region.select",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: t("allRegions") }),
                TZ_REGIONS.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: r, children: r }, r))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-[140px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "lb-role",
              className: "text-[10px] font-medium text-muted-foreground uppercase tracking-wide block mb-1",
              children: t("leaderboardRole")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "lb-role",
              value: roleFilter,
              onChange: (e) => setRoleFilter(
                e.target.value
              ),
              className: "w-full border border-input rounded-xl px-3 py-2 bg-background text-foreground text-sm",
              "data-ocid": "leaderboard.role.select",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: t("leaderboardAll") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "specialists", children: t("leaderboardSpecialists") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "farmers", children: t("leaderboardFarmers") })
              ]
            }
          )
        ] })
      ] }),
      activeTab === "alltime" && (isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "leaderboard.loading_state", children: [0, 1, 2, 3, 4].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }, k)) }) : leaderboard.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-16",
          "data-ocid": "leaderboard.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Trophy,
              {
                className: "mx-auto text-muted-foreground/30 mb-3",
                size: 48
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: t("leaderboardEmpty") })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: leaderboard.slice(0, 20).map(
        (user, idx) => renderUserCard(user, idx + 1, t("leaderboardScore"))
      ) })),
      activeTab === "thisweek" && (isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "space-y-3",
          "data-ocid": "leaderboard.weekly.loading_state",
          children: [0, 1, 2, 3, 4].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }, k))
        }
      ) : filteredWeekly.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-16",
          "data-ocid": "leaderboard.weekly.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Trophy,
              {
                className: "mx-auto text-muted-foreground/30 mb-3",
                size: 48
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: t("leaderboardNoWeeklyActivity") })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: filteredWeekly.slice(0, 20).map(
        (user, idx) => renderUserCard(user, idx + 1, t("leaderboardWeeklyScore"))
      ) }))
    ] })
  ] }) });
}
export {
  LeaderboardPage as default
};
