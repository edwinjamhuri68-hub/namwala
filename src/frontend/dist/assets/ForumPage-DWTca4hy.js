import { k as createLucideIcon, a as useLanguageStore, Z as useBackend, aA as useQueryClient, r as reactExports, aB as useQuery, j as jsxRuntimeExports, L as Layout, aj as MessageSquare, e as Link, B as Button, m as Badge, y as MapPin, aa as Star, n as Skeleton, N as CircleCheck, X, Y as ShoppingCart, Q as Users, p as Sprout, aC as Language } from "./index-BUVIgngH.js";
import { u as useMutation } from "./useMutation-BB6v1FNg.js";
import { u as ue } from "./index-c308oYmR.js";
import { T as Trophy } from "./trophy-CIdLAcJn.js";
import { A as Award } from "./award-Btif5h59.js";
import { B as Bug } from "./bug-CMwW2EO6.js";
import { C as CloudRain } from "./cloud-rain-CG3hMqnT.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "M12 8v8", key: "napkw2" }]
];
const CirclePlus = createLucideIcon("circle-plus", __iconNode$1);
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
      d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",
      key: "1vdc57"
    }
  ],
  ["path", { d: "M5 21h14", key: "11awu3" }]
];
const Crown = createLucideIcon("crown", __iconNode);
const ROLE_COLORS = {
  farmer: "bg-emerald-100 text-emerald-700",
  livestock_keeper: "bg-amber-100 text-amber-700",
  agri_specialist: "bg-purple-100 text-purple-700",
  veterinarian: "bg-rose-100 text-rose-700",
  input_seller: "bg-blue-100 text-blue-700",
  input_service_provider: "bg-cyan-100 text-cyan-700",
  weather_soil_specialist: "bg-sky-100 text-sky-700",
  market_advisor: "bg-yellow-100 text-yellow-700",
  transport_provider: "bg-orange-100 text-orange-700",
  buyer: "bg-indigo-100 text-indigo-700"
};
const CATEGORY_DISPLAY = {
  Crops: {
    icon: Sprout,
    color: "bg-emerald-100 text-emerald-700",
    slug: "crops"
  },
  Mazao: {
    icon: Sprout,
    color: "bg-emerald-100 text-emerald-700",
    slug: "crops"
  },
  Livestock: {
    icon: Users,
    color: "bg-amber-100 text-amber-700",
    slug: "livestock"
  },
  Mifugo: {
    icon: Users,
    color: "bg-amber-100 text-amber-700",
    slug: "livestock"
  },
  Marketplace: {
    icon: ShoppingCart,
    color: "bg-blue-100 text-blue-700",
    slug: "marketplace"
  },
  Soko: {
    icon: ShoppingCart,
    color: "bg-blue-100 text-blue-700",
    slug: "marketplace"
  },
  "Weather & Climate": {
    icon: CloudRain,
    color: "bg-sky-100 text-sky-700",
    slug: "weather"
  },
  "Hali ya Hewa": {
    icon: CloudRain,
    color: "bg-sky-100 text-sky-700",
    slug: "weather"
  },
  "Pest & Disease": {
    icon: Bug,
    color: "bg-red-100 text-red-700",
    slug: "pest-disease"
  },
  "Wadudu na Magonjwa": {
    icon: Bug,
    color: "bg-red-100 text-red-700",
    slug: "pest-disease"
  },
  "General Discussion": {
    icon: MessageSquare,
    color: "bg-muted text-muted-foreground",
    slug: "general"
  },
  "Majadiliano ya Jumla": {
    icon: MessageSquare,
    color: "bg-muted text-muted-foreground",
    slug: "general"
  }
};
function getCategoryDisplay(cat) {
  return CATEGORY_DISPLAY[cat.name] || CATEGORY_DISPLAY[cat.nameSwahili] || {
    icon: MessageSquare,
    color: "bg-muted text-muted-foreground",
    slug: cat.id.toString()
  };
}
function timeAgo(ts, language) {
  const diff = Date.now() - Number(ts / 1000000n);
  const mins = Math.floor(diff / 6e4);
  const hrs = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);
  if (language === "sw") {
    if (days > 0) return `siku ${days} zilizopita`;
    if (hrs > 0) return `masaa ${hrs} yaliyopita`;
    return `dakika ${mins} zilizopita`;
  }
  if (days > 0) return `${days}d ago`;
  if (hrs > 0) return `${hrs}h ago`;
  return `${mins}m ago`;
}
const SPOTLIGHT_BADGE_META = {
  "Helpful Expert": { icon: Star, color: "text-amber-600" },
  "Mtaalamu Msaada": { icon: Star, color: "text-amber-600" },
  "Trusted Advisor": { icon: Award, color: "text-purple-600" },
  "Mshauri wa Kuaminiwa": { icon: Award, color: "text-purple-600" },
  "Community Leader": { icon: Trophy, color: "text-rose-600" },
  "Kiongozi wa Jamii": { icon: Trophy, color: "text-rose-600" }
};
function ForumPage() {
  const { t, language } = useLanguageStore();
  const { actor, isReady } = useBackend();
  const queryClient = useQueryClient();
  const [showNewTopic, setShowNewTopic] = reactExports.useState(false);
  const [newTitle, setNewTitle] = reactExports.useState("");
  const [newBody, setNewBody] = reactExports.useState("");
  const [newTags, setNewTags] = reactExports.useState("");
  const [selectedCategoryId, setSelectedCategoryId] = reactExports.useState(
    null
  );
  const { data: topContributor, isLoading: topContributorLoading } = useQuery({
    queryKey: ["forum", "topContributorOfWeek"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getTopContributorOfWeek();
    },
    enabled: isReady,
    staleTime: 5 * 60 * 1e3
    // 5 min
  });
  const { data: categories = [], isLoading: catsLoading } = useQuery({
    queryKey: ["forum", "categories"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCategories();
    },
    enabled: isReady
  });
  const { data: recentTopics = [], isLoading: topicsLoading } = useQuery({
    queryKey: ["forum", "recent", 10],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRecentTopics(BigInt(10));
    },
    enabled: isReady
  });
  const createTopicMutation = useMutation({
    mutationFn: async () => {
      var _a;
      if (!actor) throw new Error("Not connected");
      const catId = selectedCategoryId ?? ((_a = categories[0]) == null ? void 0 : _a.id) ?? BigInt(0);
      const tags = newTags.split(",").map((t2) => t2.trim()).filter(Boolean);
      const lang = language === "sw" ? Language.swahili : Language.english;
      const result = await actor.createTopic(
        catId,
        newTitle,
        newBody,
        tags,
        lang
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forum", "recent"] });
      setNewTitle("");
      setNewBody("");
      setNewTags("");
      setSelectedCategoryId(null);
      setShowNewTopic(false);
      ue.success(t("postCreated"));
    },
    onError: () => {
      ue.error(
        language === "sw" ? "Imeshindwa kuwasilisha mada" : "Failed to create topic"
      );
    }
  });
  const isLoading = catsLoading || topicsLoading;
  const canSubmit = newTitle.trim().length > 0 && newBody.trim().length > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "forum.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b px-4 py-4 sticky top-0 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "text-primary", size: 22 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold text-foreground", children: t("communityForum") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/leaderboard", "data-ocid": "forum.leaderboard_link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-colors duration-200",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 13 }),
              language === "sw" ? "Ubora" : "Leaderboard"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            onClick: () => setShowNewTopic(true),
            "data-ocid": "forum.start_discussion_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { size: 14, className: "mr-1" }),
              t("newTopic")
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-4 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/10 border border-primary/20 rounded-xl px-4 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-primary", children: t("forumWelcome") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: t("forumWelcomeSub") })
      ] }),
      topContributorLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-amber-200 bg-amber-50/60 p-4 animate-pulse h-24" }) : topContributor ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative rounded-2xl border border-amber-300/70 bg-gradient-to-br from-amber-50 to-yellow-50 shadow-sm overflow-hidden",
          "data-ocid": "forum.top_contributor.card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-amber-400/5 via-yellow-400/10 to-amber-400/5 pointer-events-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative px-4 py-3 flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-10 h-10 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { size: 20, className: "text-amber-600" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold uppercase tracking-widest text-amber-600 mb-0.5", children: t("topContributorTitle") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/user/$userId",
                    params: { userId: topContributor.userId.toText() },
                    "data-ocid": "forum.top_contributor.name_link",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground hover:text-primary transition-colors duration-200 truncate", children: topContributor.userName })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: `text-[10px] border-0 py-0 px-1.5 ${ROLE_COLORS[topContributor.userRole] || "bg-muted text-muted-foreground"}`,
                      children: t(topContributor.userRole)
                    }
                  ),
                  topContributor.region && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-0.5 text-[10px] text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 9 }),
                    topContributor.region
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1.5 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-amber-700", children: [
                    Number(topContributor.reputationScore).toLocaleString(),
                    " ",
                    t("topContributorScore")
                  ] }),
                  topContributor.badges.slice(0, 3).map((badge) => {
                    const meta = SPOTLIGHT_BADGE_META[badge];
                    if (!meta) return null;
                    const Icon = meta.icon;
                    return /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `inline-flex items-center ${meta.color}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 12 })
                      },
                      badge
                    );
                  })
                ] })
              ] })
            ] })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-2xl border border-amber-200/50 bg-amber-50/30 px-4 py-3 flex items-center gap-3",
          "data-ocid": "forum.top_contributor.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { size: 18, className: "text-amber-400 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-700/70 italic", children: t("topContributorEmpty") })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-bold text-foreground mb-3", children: t("categories") }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: [0, 1, 2, 3, 4, 5].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "rounded-xl h-28" }, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: categories.length > 0 ? categories.map((cat) => {
          const display = getCategoryDisplay(cat);
          const Icon = display.icon;
          const catName = language === "sw" ? cat.nameSwahili : cat.name;
          const catDesc = language === "sw" ? cat.descriptionSwahili : cat.description;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/forum/category/$categoryId",
              params: { categoryId: cat.id.toString() },
              "data-ocid": `forum.category.${display.slug}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border rounded-xl p-3 hover:shadow-md transition-smooth cursor-pointer h-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-9 h-9 rounded-lg flex items-center justify-center mb-2 ${display.color}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 18 })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: catName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 line-clamp-2", children: catDesc }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-primary mt-1.5 font-medium", children: [
                  Number(cat.postCount),
                  " ",
                  t("discussions")
                ] })
              ] })
            },
            cat.id.toString()
          );
        }) : null })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-bold text-foreground mb-3", children: t("recentDiscussions") }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [0, 1, 2, 3].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          recentTopics.map((topic, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/forum/topic/$topicId",
              params: { topicId: topic.id.toString() },
              "data-ocid": `forum.topic.item.${i + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border rounded-xl p-3 hover:shadow-sm transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: `text-[10px] border-0 py-0 px-1.5 ${ROLE_COLORS[topic.authorRole] || "bg-muted text-muted-foreground"}`,
                      children: t(topic.authorRole)
                    }
                  ),
                  topic.isResolved && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "text-[10px] border-0 py-0 px-1.5 bg-emerald-100 text-emerald-700", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 10, className: "mr-0.5" }),
                    t("resolved")
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground line-clamp-2", children: topic.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-1.5 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: topic.authorName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      MessageSquare,
                      {
                        size: 11,
                        className: "inline mr-0.5"
                      }
                    ),
                    Number(topic.replyCount),
                    " ",
                    t("replies")
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: timeAgo(topic.createdAt, language) })
                ] })
              ] }) }) })
            },
            topic.id.toString()
          )),
          recentTopics.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center py-10",
              "data-ocid": "forum.recent.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  MessageSquare,
                  {
                    className: "mx-auto text-muted-foreground/40 mb-3",
                    size: 40
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: t("noTopicsYet") })
              ]
            }
          )
        ] })
      ] })
    ] }),
    showNewTopic && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-end justify-center bg-black/50",
        "data-ocid": "forum.new_topic.dialog",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card w-full max-w-md rounded-t-2xl p-5 space-y-4 max-h-[90vh] overflow-y-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-foreground", children: t("newTopic") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setShowNewTopic(false),
                className: "text-muted-foreground",
                "data-ocid": "forum.new_topic.close_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20 })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "label",
                {
                  htmlFor: "ntopic-category",
                  className: "text-xs font-medium text-muted-foreground",
                  children: [
                    t("category"),
                    " *"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  id: "ntopic-category",
                  value: (selectedCategoryId == null ? void 0 : selectedCategoryId.toString()) ?? "",
                  onChange: (e) => setSelectedCategoryId(
                    e.target.value ? BigInt(e.target.value) : null
                  ),
                  className: "w-full mt-1 border border-input rounded-xl px-3 py-2 bg-background text-foreground text-sm",
                  "data-ocid": "forum.new_topic.category.select",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: language === "sw" ? "Chagua kitengo" : "Select category" }),
                    categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: cat.id.toString(), children: language === "sw" ? cat.nameSwahili : cat.name }, cat.id.toString()))
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "label",
                {
                  htmlFor: "ntopic-title",
                  className: "text-xs font-medium text-muted-foreground",
                  children: [
                    t("topicTitle"),
                    " *"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "ntopic-title",
                  type: "text",
                  value: newTitle,
                  onChange: (e) => setNewTitle(e.target.value),
                  placeholder: t("topicTitle"),
                  className: "w-full mt-1 border border-input rounded-xl px-3 py-2 bg-background text-foreground text-sm",
                  "data-ocid": "forum.new_topic.title.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "label",
                {
                  htmlFor: "ntopic-body",
                  className: "text-xs font-medium text-muted-foreground",
                  children: [
                    t("topicBody"),
                    " *"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  id: "ntopic-body",
                  value: newBody,
                  onChange: (e) => setNewBody(e.target.value),
                  placeholder: t("topicBody"),
                  rows: 4,
                  className: "w-full mt-1 border border-input rounded-xl px-3 py-2 bg-background text-foreground text-sm resize-none",
                  "data-ocid": "forum.new_topic.body.textarea"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "ntopic-tags",
                  className: "text-xs font-medium text-muted-foreground",
                  children: t("addTags")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "ntopic-tags",
                  type: "text",
                  value: newTags,
                  onChange: (e) => setNewTags(e.target.value),
                  placeholder: language === "sw" ? "mfano: mahindi, wadudu" : "e.g. maize, pests",
                  className: "w-full mt-1 border border-input rounded-xl px-3 py-2 bg-background text-foreground text-sm",
                  "data-ocid": "forum.new_topic.tags.input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "flex-1",
                onClick: () => setShowNewTopic(false),
                "data-ocid": "forum.new_topic.cancel_button",
                children: t("cancelPost")
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "flex-1",
                disabled: !canSubmit || createTopicMutation.isPending,
                onClick: () => createTopicMutation.mutate(),
                "data-ocid": "forum.new_topic.submit_button",
                children: createTopicMutation.isPending ? language === "sw" ? "Inawasilisha..." : "Posting..." : t("submitPost")
              }
            )
          ] })
        ] })
      }
    )
  ] }) });
}
const ForumPage$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ROLE_COLORS,
  default: ForumPage
}, Symbol.toStringTag, { value: "Module" }));
export {
  CirclePlus as C,
  ForumPage$1 as F,
  ROLE_COLORS as R,
  Crown as a
};
