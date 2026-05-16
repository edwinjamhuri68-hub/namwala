import { k as createLucideIcon, aa as Star, a as useLanguageStore, u as useAuthStore, Z as useBackend, aA as useQueryClient, ak as useParams, r as reactExports, aB as useQuery, j as jsxRuntimeExports, L as Layout, aj as MessageSquare, e as Link, B as Button, m as Badge, N as CircleCheck, n as Skeleton, aK as triggerBadgeNotification } from "./index-BUVIgngH.js";
import { R as ROLE_COLORS } from "./ForumPage-DWTca4hy.js";
import { u as useMutation } from "./useMutation-BB6v1FNg.js";
import { u as ue } from "./index-c308oYmR.js";
import { T as Trophy } from "./trophy-CIdLAcJn.js";
import { A as Award } from "./award-Btif5h59.js";
import { A as ArrowLeft } from "./arrow-left-BIW276yu.js";
import { S as Send } from "./send-B_LO1ymC.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M7 10v12", key: "1qc93n" }],
  [
    "path",
    {
      d: "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z",
      key: "emmmcr"
    }
  ]
];
const ThumbsUp = createLucideIcon("thumbs-up", __iconNode);
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
const BADGE_META = {
  "Helpful Expert": {
    key: "badgeHelpfulExpert",
    icon: Star,
    color: "bg-amber-100 text-amber-700"
  },
  "Mtaalamu Msaada": {
    key: "badgeHelpfulExpert",
    icon: Star,
    color: "bg-amber-100 text-amber-700"
  },
  "Trusted Advisor": {
    key: "badgeTrustedAdvisor",
    icon: Award,
    color: "bg-purple-100 text-purple-700"
  },
  "Mshauri wa Kuaminiwa": {
    key: "badgeTrustedAdvisor",
    icon: Award,
    color: "bg-purple-100 text-purple-700"
  },
  "Community Leader": {
    key: "badgeCommunityLeader",
    icon: Trophy,
    color: "bg-rose-100 text-rose-700"
  },
  "Kiongozi wa Jamii": {
    key: "badgeCommunityLeader",
    icon: Trophy,
    color: "bg-rose-100 text-rose-700"
  }
};
function ReputationBadges({
  badges,
  t
}) {
  if (!badges.length) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: badges.map((raw) => {
    const meta = BADGE_META[raw];
    if (!meta) return null;
    const Icon = meta.icon;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: `inline-flex items-center gap-0.5 text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${meta.color}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 9 }),
          t(meta.key)
        ]
      },
      raw
    );
  }) });
}
function ForumTopicPage() {
  const { t, language } = useLanguageStore();
  const { user } = useAuthStore();
  const { actor, isReady } = useBackend();
  const queryClient = useQueryClient();
  const { topicId } = useParams({ strict: false });
  const topicIdBigint = BigInt(topicId);
  const [replyText, setReplyText] = reactExports.useState("");
  const [localAccepted, setLocalAccepted] = reactExports.useState(/* @__PURE__ */ new Set());
  const { data: topic, isLoading: topicLoading } = useQuery({
    queryKey: ["forum", "topic", topicId],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getTopicById(topicIdBigint);
    },
    enabled: isReady
  });
  const { data: replies = [], isLoading: repliesLoading } = useQuery({
    queryKey: ["forum", "replies", topicId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRepliesByTopic(topicIdBigint);
    },
    enabled: isReady
  });
  const { data: replyUpvotes = {} } = useQuery({
    queryKey: ["forum", "upvotes", topicId],
    queryFn: async () => {
      if (!actor || !replies.length) return {};
      const entries = await Promise.all(
        replies.map(async (r) => {
          const info = await actor.getForumReplyWithUpvotes(r.id);
          return [r.id.toString(), info];
        })
      );
      const map = {};
      for (const [id, info] of entries) {
        if (info) map[id] = info;
      }
      return map;
    },
    enabled: isReady && replies.length > 0
  });
  const authorIds = Array.from(new Set(replies.map((r) => r.authorId)));
  const { data: authorReputations = {} } = useQuery({
    queryKey: ["forum", "authorReputations", topicId],
    queryFn: async () => {
      if (!actor || !authorIds.length) return {};
      const entries = await Promise.all(
        authorIds.map(async (aid) => {
          const rep = await actor.getUserReputation(aid);
          return [aid.toText(), rep];
        })
      );
      const map = {};
      for (const [id, rep] of entries) {
        if (rep) map[id] = rep;
      }
      return map;
    },
    enabled: isReady && authorIds.length > 0
  });
  const replyMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.replyToTopic(topicIdBigint, replyText);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["forum", "replies", topicId]
      });
      queryClient.invalidateQueries({ queryKey: ["forum", "topic", topicId] });
      setReplyText("");
      ue.success(t("replyPosted"));
    },
    onError: () => {
      ue.error(
        language === "sw" ? "Imeshindwa kutuma jibu" : "Failed to post reply"
      );
    }
  });
  const markResolvedMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.markTopicResolved(topicIdBigint);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forum", "topic", topicId] });
      queryClient.invalidateQueries({ queryKey: ["forum", "recent"] });
      ue.success(t("resolved"));
    },
    onError: () => {
      ue.error(
        language === "sw" ? "Imeshindwa kuweka kama imetatuliwa" : "Failed to mark resolved"
      );
    }
  });
  const upvoteMutation = useMutation({
    mutationFn: async (replyId) => {
      var _a;
      if (!actor) throw new Error("Not connected");
      const replyItem = replies.find((r) => r.id === replyId);
      const authorId = replyItem == null ? void 0 : replyItem.authorId;
      const authorIdText = (authorId == null ? void 0 : authorId.toText()) ?? "";
      const prevBadges = ((_a = authorReputations[authorIdText]) == null ? void 0 : _a.badges) ?? [];
      await actor.upvoteReply(replyId);
      return { authorId, authorIdText, prevBadges };
    },
    onSuccess: async ({ authorId, authorIdText, prevBadges }) => {
      var _a, _b;
      await queryClient.invalidateQueries({
        queryKey: ["forum", "upvotes", topicId]
      });
      await queryClient.invalidateQueries({
        queryKey: ["forum", "authorReputations", topicId]
      });
      if (authorId && authorIdText && actor) {
        const freshRep = await actor.getUserReputation(authorId);
        const newBadges = (freshRep == null ? void 0 : freshRep.badges) ?? [];
        for (const badge of newBadges) {
          if (!prevBadges.includes(badge)) {
            const displayName = language === "sw" ? ((_a = BADGE_META[badge]) == null ? void 0 : _a.key) === "badgeHelpfulExpert" ? "Mtaalamu Msaada" : ((_b = BADGE_META[badge]) == null ? void 0 : _b.key) === "badgeTrustedAdvisor" ? "Mshauri wa Kuaminiwa" : "Kiongozi wa Jamii" : badge;
            triggerBadgeNotification(displayName, authorIdText, language);
          }
        }
      }
    },
    onError: () => {
      ue.error(
        language === "sw" ? "Imeshindwa kupiga kura" : "Failed to upvote"
      );
    }
  });
  function handleAcceptLocal(replyId) {
    setLocalAccepted((prev) => {
      const next = new Set(prev);
      if (next.has(replyId)) {
        next.delete(replyId);
      } else {
        next.clear();
        next.add(replyId);
      }
      return next;
    });
  }
  const isLoading = topicLoading || repliesLoading;
  const isTopicAuthor = (user == null ? void 0 : user.name) === (topic == null ? void 0 : topic.authorName);
  const isResolved = (topic == null ? void 0 : topic.isResolved) ?? false;
  if (!isLoading && !topic) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center min-h-screen",
        "data-ocid": "forum.topic.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "text-muted-foreground/40 mb-3", size: 48 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: t("noData") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/forum", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "mt-4", children: t("communityForum") }) })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "forum.topic.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b px-4 py-3 sticky top-0 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/forum/category/$categoryId",
          params: {
            categoryId: (topic == null ? void 0 : topic.categoryId.toString()) ?? "0"
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "text-muted-foreground hover:text-foreground transition-colors",
              "aria-label": "Back",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 20 })
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate flex-1", children: t("communityForum") }),
      isResolved && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "text-[10px] border-0 bg-emerald-100 text-emerald-700", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 10, className: "mr-0.5" }),
        t("resolved")
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-4 space-y-4", children: [
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 rounded-xl" }) : topic ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border rounded-xl p-4 space-y-3",
          "data-ocid": "forum.topic.original_post",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: `text-[10px] border-0 ${ROLE_COLORS[topic.authorRole] || "bg-muted text-muted-foreground"}`,
                  children: t(topic.authorRole)
                }
              ),
              isResolved && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "text-[10px] border-0 bg-emerald-100 text-emerald-700", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 10, className: "mr-0.5" }),
                t("resolved")
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-bold text-foreground", children: topic.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              topic.authorName,
              " · ",
              timeAgo(topic.createdAt, language)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: topic.body }),
            topic.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 pt-1", children: topic.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground",
                children: [
                  "#",
                  tag
                ]
              },
              tag
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 text-xs text-muted-foreground pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { size: 11, className: "inline mr-0.5" }),
              Number(topic.replyCount),
              " ",
              t("replies")
            ] }) }),
            isTopicAuthor && !isResolved && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: () => markResolvedMutation.mutate(),
                disabled: markResolvedMutation.isPending,
                "data-ocid": "forum.topic.mark_resolved_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 13, className: "mr-1" }),
                  t("markResolved")
                ]
              }
            )
          ]
        }
      ) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-muted-foreground", children: [
          replies.length,
          " ",
          t("replies")
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [0, 1].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-xl" }, k)) }) : replies.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "text-center py-10",
            "data-ocid": "forum.topic.no_replies_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                MessageSquare,
                {
                  className: "mx-auto text-muted-foreground/30 mb-2",
                  size: 36
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: t("noRepliesYet") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70", children: t("beFirstToReply") })
            ]
          }
        ) : replies.map((reply, i) => {
          const isAccepted = reply.isAccepted || localAccepted.has(reply.id.toString());
          const upvoteInfo = replyUpvotes[reply.id.toString()];
          const hasVoted = (upvoteInfo == null ? void 0 : upvoteInfo.hasVoted) ?? false;
          const upvoteCount = upvoteInfo ? Number(upvoteInfo.upvoteCount) : Number(reply.upvoteCount ?? 0);
          const authorRep = authorReputations[reply.authorId.toText()];
          const authorBadges = (authorRep == null ? void 0 : authorRep.badges) ?? [];
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `rounded-xl border p-4 space-y-2 ${isAccepted ? "bg-emerald-50 border-emerald-200" : "bg-card"}`,
              "data-ocid": `forum.topic.reply.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: `text-[10px] border-0 ${ROLE_COLORS[reply.authorRole] || "bg-muted text-muted-foreground"}`,
                      children: t(reply.authorRole)
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ReputationBadges, { badges: authorBadges, t }),
                  isAccepted && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "text-[10px] border-0 bg-emerald-100 text-emerald-700", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 10, className: "mr-0.5" }),
                    t("acceptedAnswer")
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground ml-auto flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Link,
                      {
                        to: "/user/$userId",
                        params: { userId: reply.authorId.toText() },
                        className: "hover:text-primary transition-colors font-medium",
                        "data-ocid": `forum.reply.author.link.${i + 1}`,
                        children: reply.authorName
                      }
                    ),
                    " · ",
                    timeAgo(reply.createdAt, language)
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: reply.body }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        if (!hasVoted) upvoteMutation.mutate(reply.id);
                      },
                      disabled: hasVoted || upvoteMutation.isPending,
                      "aria-label": hasVoted ? t("upvoted") : t("upvote"),
                      className: `flex items-center gap-1 text-xs transition-colors disabled:cursor-not-allowed ${hasVoted ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"}`,
                      "data-ocid": `forum.reply.like_button.${i + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          ThumbsUp,
                          {
                            size: 13,
                            className: hasVoted ? "fill-primary" : ""
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: upvoteCount })
                      ]
                    }
                  ),
                  isTopicAuthor && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => handleAcceptLocal(reply.id.toString()),
                      className: `flex items-center gap-1 text-xs ml-auto transition-colors ${isAccepted ? "text-emerald-600" : "text-muted-foreground hover:text-emerald-600"}`,
                      "data-ocid": `forum.reply.accept_button.${i + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 13 }),
                        isAccepted ? t("acceptedAnswer") : t("acceptAnswer")
                      ]
                    }
                  )
                ] })
              ]
            },
            reply.id.toString()
          );
        })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border rounded-xl p-4 space-y-3",
          "data-ocid": "forum.reply.compose",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: t("postReply") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                value: replyText,
                onChange: (e) => setReplyText(e.target.value),
                placeholder: language === "sw" ? "Andika jibu lako..." : "Write your reply...",
                rows: 3,
                className: "w-full border border-input rounded-xl px-3 py-2 bg-background text-foreground text-sm resize-none",
                "data-ocid": "forum.reply.textarea"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "w-full",
                disabled: !replyText.trim() || replyMutation.isPending,
                onClick: () => replyMutation.mutate(),
                "data-ocid": "forum.reply.submit_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 14, className: "mr-1" }),
                  replyMutation.isPending ? language === "sw" ? "Inatuma..." : "Posting..." : t("replyToTopic")
                ]
              }
            )
          ]
        }
      )
    ] })
  ] }) });
}
const ForumTopicPage$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BADGE_META,
  ReputationBadges,
  default: ForumTopicPage
}, Symbol.toStringTag, { value: "Module" }));
export {
  BADGE_META as B,
  ForumTopicPage$1 as F,
  ReputationBadges as R,
  ThumbsUp as T
};
