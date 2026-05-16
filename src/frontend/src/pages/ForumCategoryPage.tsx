import { Language } from "@/backend";
import type { ForumCategoryPublic, ForumTopicSummary } from "@/backend";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useBackend } from "@/hooks/useBackend";
import { ROLE_COLORS } from "@/pages/ForumPage";
import { useLanguageStore } from "@/store/languageStore";
import type { UserRole } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  MessageSquare,
  PlusCircle,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type FilterMode = "all" | "unresolved" | "resolved" | "most_replies";

const FILTER_OPTIONS: { key: FilterMode; labelEn: string; labelSw: string }[] =
  [
    { key: "all", labelEn: "All", labelSw: "Zote" },
    { key: "unresolved", labelEn: "Unresolved", labelSw: "Hazijatatuliwa" },
    { key: "resolved", labelEn: "Resolved", labelSw: "Zilizotatuliwa" },
    { key: "most_replies", labelEn: "Most Replies", labelSw: "Majibu Mengi" },
  ];

function timeAgo(ts: bigint, language: string): string {
  const diff = Date.now() - Number(ts / 1_000_000n);
  const mins = Math.floor(diff / 60000);
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

export default function ForumCategoryPage() {
  const { t, language } = useLanguageStore();
  const { actor, isReady } = useBackend();
  const queryClient = useQueryClient();
  const { categoryId } = useParams({ strict: false }) as { categoryId: string };
  const categoryIdBigint = BigInt(categoryId);

  const [filter, setFilter] = useState<FilterMode>("all");
  const [showNewTopic, setShowNewTopic] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newTags, setNewTags] = useState("");

  const { data: categories = [] } = useQuery<ForumCategoryPublic[]>({
    queryKey: ["forum", "categories"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCategories();
    },
    enabled: isReady,
  });

  const category = categories.find((c) => c.id === categoryIdBigint);

  const { data: topics = [], isLoading } = useQuery<ForumTopicSummary[]>({
    queryKey: ["forum", "category", categoryId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTopicsByCategory(categoryIdBigint);
    },
    enabled: isReady,
  });

  const createTopicMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const tags = newTags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      const lang = language === "sw" ? Language.swahili : Language.english;
      const result = await actor.createTopic(
        categoryIdBigint,
        newTitle,
        newBody,
        tags,
        lang,
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["forum", "category", categoryId],
      });
      queryClient.invalidateQueries({ queryKey: ["forum", "recent"] });
      setNewTitle("");
      setNewBody("");
      setNewTags("");
      setShowNewTopic(false);
      toast.success(t("postCreated"));
    },
    onError: () => {
      toast.error(
        language === "sw"
          ? "Imeshindwa kuwasilisha mada"
          : "Failed to create topic",
      );
    },
  });

  const filtered = topics
    .filter((tp) => {
      if (filter === "resolved") return tp.isResolved;
      if (filter === "unresolved") return !tp.isResolved;
      return true;
    })
    .sort((a, b) => {
      if (filter === "most_replies") return Number(b.replyCount - a.replyCount);
      return Number(b.createdAt - a.createdAt);
    });

  const canSubmit = newTitle.trim().length > 0 && newBody.trim().length > 0;
  const categoryName = category
    ? language === "sw"
      ? category.nameSwahili
      : category.name
    : t("forum");

  return (
    <Layout>
      <div
        className="min-h-screen bg-background"
        data-ocid="forum.category.page"
      >
        {/* Header */}
        <div className="bg-card border-b px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center gap-2 max-w-2xl mx-auto">
            <Link to="/forum">
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Back"
              >
                <ArrowLeft size={20} />
              </button>
            </Link>
            <div className="flex-1 min-w-0">
              <h1 className="text-base font-bold text-foreground truncate">
                {categoryName}
              </h1>
              <p className="text-xs text-muted-foreground">
                {topics.length} {t("discussions")}
              </p>
            </div>
            <Button
              size="sm"
              onClick={() => setShowNewTopic(true)}
              data-ocid="forum.category.new_topic_button"
            >
              <PlusCircle size={14} className="mr-1" />
              {t("newTopic")}
            </Button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
          {/* Filters */}
          <div
            className="flex gap-2 overflow-x-auto pb-1"
            data-ocid="forum.category.filter.tab"
          >
            {FILTER_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => setFilter(opt.key)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  filter === opt.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                }`}
                data-ocid={`forum.category.filter.${opt.key}`}
              >
                {language === "sw" ? opt.labelSw : opt.labelEn}
              </button>
            ))}
          </div>

          {/* Topics list */}
          {isLoading ? (
            <div className="space-y-3">
              {[0, 1, 2, 3].map((k) => (
                <Skeleton key={k} className="h-20 rounded-xl" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div
              className="text-center py-16"
              data-ocid="forum.category.empty_state"
            >
              <MessageSquare
                className="mx-auto text-muted-foreground/40 mb-3"
                size={48}
              />
              <p className="text-muted-foreground text-sm">
                {t("noTopicsYet")}
              </p>
              <Button
                className="mt-4"
                variant="outline"
                onClick={() => setShowNewTopic(true)}
                data-ocid="forum.category.create_first_button"
              >
                {t("startDiscussion")}
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((topic, i) => (
                <Link
                  key={topic.id.toString()}
                  to="/forum/topic/$topicId"
                  params={{ topicId: topic.id.toString() }}
                  data-ocid={`forum.category.topic.item.${i + 1}`}
                >
                  <div className="bg-card border rounded-xl p-3 hover:shadow-sm transition-smooth">
                    <div className="flex items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                          <Badge
                            className={`text-[10px] border-0 py-0 px-1.5 ${
                              ROLE_COLORS[topic.authorRole as UserRole] ||
                              "bg-muted text-muted-foreground"
                            }`}
                          >
                            {t(topic.authorRole as "farmer")}
                          </Badge>
                          {topic.isResolved && (
                            <Badge className="text-[10px] border-0 py-0 px-1.5 bg-emerald-100 text-emerald-700">
                              <CheckCircle2 size={10} className="mr-0.5" />
                              {t("resolved")}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm font-medium text-foreground line-clamp-2">
                          {topic.title}
                        </p>
                        <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                          <span>{topic.authorName}</span>
                          <span>
                            <MessageSquare
                              size={11}
                              className="inline mr-0.5"
                            />
                            {Number(topic.replyCount)} {t("replies")}
                          </span>
                          <span className="ml-auto">
                            {timeAgo(topic.createdAt, language)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* New Topic Modal */}
        {showNewTopic && (
          <div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
            data-ocid="forum.new_topic.dialog"
          >
            <div className="bg-card w-full max-w-md rounded-t-2xl p-5 space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-foreground">{t("newTopic")}</h3>
                <button
                  type="button"
                  onClick={() => setShowNewTopic(false)}
                  className="text-muted-foreground"
                  data-ocid="forum.new_topic.close_button"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label
                    htmlFor="cat-ntopic-title"
                    className="text-xs font-medium text-muted-foreground"
                  >
                    {t("topicTitle")} *
                  </label>
                  <input
                    id="cat-ntopic-title"
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder={t("topicTitle")}
                    className="w-full mt-1 border border-input rounded-xl px-3 py-2 bg-background text-foreground text-sm"
                    data-ocid="forum.new_topic.title.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cat-ntopic-body"
                    className="text-xs font-medium text-muted-foreground"
                  >
                    {t("topicBody")} *
                  </label>
                  <textarea
                    id="cat-ntopic-body"
                    value={newBody}
                    onChange={(e) => setNewBody(e.target.value)}
                    placeholder={t("topicBody")}
                    rows={4}
                    className="w-full mt-1 border border-input rounded-xl px-3 py-2 bg-background text-foreground text-sm resize-none"
                    data-ocid="forum.new_topic.body.textarea"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cat-ntopic-tags"
                    className="text-xs font-medium text-muted-foreground"
                  >
                    {t("addTags")}
                  </label>
                  <input
                    id="cat-ntopic-tags"
                    type="text"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    placeholder={
                      language === "sw"
                        ? "mfano: mahindi, wadudu"
                        : "e.g. maize, pests"
                    }
                    className="w-full mt-1 border border-input rounded-xl px-3 py-2 bg-background text-foreground text-sm"
                    data-ocid="forum.new_topic.tags.input"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowNewTopic(false)}
                  data-ocid="forum.new_topic.cancel_button"
                >
                  {t("cancelPost")}
                </Button>
                <Button
                  className="flex-1"
                  disabled={!canSubmit || createTopicMutation.isPending}
                  onClick={() => createTopicMutation.mutate()}
                  data-ocid="forum.new_topic.submit_button"
                >
                  {createTopicMutation.isPending
                    ? language === "sw"
                      ? "Inawasilisha..."
                      : "Posting..."
                    : t("submitPost")}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
