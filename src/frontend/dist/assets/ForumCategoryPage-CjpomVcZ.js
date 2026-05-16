import { a as useLanguageStore, Z as useBackend, aA as useQueryClient, ak as useParams, r as reactExports, aB as useQuery, j as jsxRuntimeExports, L as Layout, e as Link, B as Button, n as Skeleton, aj as MessageSquare, m as Badge, N as CircleCheck, X, aC as Language } from "./index-BUVIgngH.js";
import { C as CirclePlus, R as ROLE_COLORS } from "./ForumPage-DWTca4hy.js";
import { u as useMutation } from "./useMutation-BB6v1FNg.js";
import { u as ue } from "./index-c308oYmR.js";
import { A as ArrowLeft } from "./arrow-left-BIW276yu.js";
import "./trophy-CIdLAcJn.js";
import "./award-Btif5h59.js";
import "./bug-CMwW2EO6.js";
import "./cloud-rain-CG3hMqnT.js";
const FILTER_OPTIONS = [
  { key: "all", labelEn: "All", labelSw: "Zote" },
  { key: "unresolved", labelEn: "Unresolved", labelSw: "Hazijatatuliwa" },
  { key: "resolved", labelEn: "Resolved", labelSw: "Zilizotatuliwa" },
  { key: "most_replies", labelEn: "Most Replies", labelSw: "Majibu Mengi" }
];
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
function ForumCategoryPage() {
  const { t, language } = useLanguageStore();
  const { actor, isReady } = useBackend();
  const queryClient = useQueryClient();
  const { categoryId } = useParams({ strict: false });
  const categoryIdBigint = BigInt(categoryId);
  const [filter, setFilter] = reactExports.useState("all");
  const [showNewTopic, setShowNewTopic] = reactExports.useState(false);
  const [newTitle, setNewTitle] = reactExports.useState("");
  const [newBody, setNewBody] = reactExports.useState("");
  const [newTags, setNewTags] = reactExports.useState("");
  const { data: categories = [] } = useQuery({
    queryKey: ["forum", "categories"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCategories();
    },
    enabled: isReady
  });
  const category = categories.find((c) => c.id === categoryIdBigint);
  const { data: topics = [], isLoading } = useQuery({
    queryKey: ["forum", "category", categoryId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTopicsByCategory(categoryIdBigint);
    },
    enabled: isReady
  });
  const createTopicMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const tags = newTags.split(",").map((t2) => t2.trim()).filter(Boolean);
      const lang = language === "sw" ? Language.swahili : Language.english;
      const result = await actor.createTopic(
        categoryIdBigint,
        newTitle,
        newBody,
        tags,
        lang
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["forum", "category", categoryId]
      });
      queryClient.invalidateQueries({ queryKey: ["forum", "recent"] });
      setNewTitle("");
      setNewBody("");
      setNewTags("");
      setShowNewTopic(false);
      ue.success(t("postCreated"));
    },
    onError: () => {
      ue.error(
        language === "sw" ? "Imeshindwa kuwasilisha mada" : "Failed to create topic"
      );
    }
  });
  const filtered = topics.filter((tp) => {
    if (filter === "resolved") return tp.isResolved;
    if (filter === "unresolved") return !tp.isResolved;
    return true;
  }).sort((a, b) => {
    if (filter === "most_replies") return Number(b.replyCount - a.replyCount);
    return Number(b.createdAt - a.createdAt);
  });
  const canSubmit = newTitle.trim().length > 0 && newBody.trim().length > 0;
  const categoryName = category ? language === "sw" ? category.nameSwahili : category.name : t("forum");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background",
      "data-ocid": "forum.category.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b px-4 py-4 sticky top-0 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 max-w-2xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/forum", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "text-muted-foreground hover:text-foreground transition-colors",
              "aria-label": "Back",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 20 })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-base font-bold text-foreground truncate", children: categoryName }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              topics.length,
              " ",
              t("discussions")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              onClick: () => setShowNewTopic(true),
              "data-ocid": "forum.category.new_topic_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { size: 14, className: "mr-1" }),
                t("newTopic")
              ]
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-4 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex gap-2 overflow-x-auto pb-1",
              "data-ocid": "forum.category.filter.tab",
              children: FILTER_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setFilter(opt.key),
                  className: `px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${filter === opt.key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"}`,
                  "data-ocid": `forum.category.filter.${opt.key}`,
                  children: language === "sw" ? opt.labelSw : opt.labelEn
                },
                opt.key
              ))
            }
          ),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [0, 1, 2, 3].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }, k)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center py-16",
              "data-ocid": "forum.category.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  MessageSquare,
                  {
                    className: "mx-auto text-muted-foreground/40 mb-3",
                    size: 48
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: t("noTopicsYet") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    className: "mt-4",
                    variant: "outline",
                    onClick: () => setShowNewTopic(true),
                    "data-ocid": "forum.category.create_first_button",
                    children: t("startDiscussion")
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filtered.map((topic, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/forum/topic/$topicId",
              params: { topicId: topic.id.toString() },
              "data-ocid": `forum.category.topic.item.${i + 1}`,
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
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto", children: timeAgo(topic.createdAt, language) })
                ] })
              ] }) }) })
            },
            topic.id.toString()
          )) })
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
                      htmlFor: "cat-ntopic-title",
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
                      id: "cat-ntopic-title",
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
                      htmlFor: "cat-ntopic-body",
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
                      id: "cat-ntopic-body",
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
                      htmlFor: "cat-ntopic-tags",
                      className: "text-xs font-medium text-muted-foreground",
                      children: t("addTags")
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "cat-ntopic-tags",
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
      ]
    }
  ) });
}
export {
  ForumCategoryPage as default
};
