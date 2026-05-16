import { Language, type UserReputation } from "@/backend";
import type { ForumCategoryPublic, ForumTopicSummary } from "@/backend";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useBackend } from "@/hooks/useBackend";
import { useLanguageStore } from "@/store/languageStore";
import type { UserRole } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  Award,
  Bug,
  CheckCircle2,
  CloudRain,
  Crown,
  MapPin,
  MessageSquare,
  PlusCircle,
  ShoppingCart,
  Sprout,
  Star,
  Trophy,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const ROLE_COLORS: Record<UserRole, string> = {
  farmer: "bg-emerald-100 text-emerald-700",
  livestock_keeper: "bg-amber-100 text-amber-700",
  agri_specialist: "bg-purple-100 text-purple-700",
  veterinarian: "bg-rose-100 text-rose-700",
  input_seller: "bg-blue-100 text-blue-700",
  input_service_provider: "bg-cyan-100 text-cyan-700",
  weather_soil_specialist: "bg-sky-100 text-sky-700",
  market_advisor: "bg-yellow-100 text-yellow-700",
  transport_provider: "bg-orange-100 text-orange-700",
  buyer: "bg-indigo-100 text-indigo-700",
};

const CATEGORY_DISPLAY: Record<
  string,
  { icon: React.ElementType; color: string; slug: string }
> = {
  Crops: {
    icon: Sprout,
    color: "bg-emerald-100 text-emerald-700",
    slug: "crops",
  },
  Mazao: {
    icon: Sprout,
    color: "bg-emerald-100 text-emerald-700",
    slug: "crops",
  },
  Livestock: {
    icon: Users,
    color: "bg-amber-100 text-amber-700",
    slug: "livestock",
  },
  Mifugo: {
    icon: Users,
    color: "bg-amber-100 text-amber-700",
    slug: "livestock",
  },
  Marketplace: {
    icon: ShoppingCart,
    color: "bg-blue-100 text-blue-700",
    slug: "marketplace",
  },
  Soko: {
    icon: ShoppingCart,
    color: "bg-blue-100 text-blue-700",
    slug: "marketplace",
  },
  "Weather & Climate": {
    icon: CloudRain,
    color: "bg-sky-100 text-sky-700",
    slug: "weather",
  },
  "Hali ya Hewa": {
    icon: CloudRain,
    color: "bg-sky-100 text-sky-700",
    slug: "weather",
  },
  "Pest & Disease": {
    icon: Bug,
    color: "bg-red-100 text-red-700",
    slug: "pest-disease",
  },
  "Wadudu na Magonjwa": {
    icon: Bug,
    color: "bg-red-100 text-red-700",
    slug: "pest-disease",
  },
  "General Discussion": {
    icon: MessageSquare,
    color: "bg-muted text-muted-foreground",
    slug: "general",
  },
  "Majadiliano ya Jumla": {
    icon: MessageSquare,
    color: "bg-muted text-muted-foreground",
    slug: "general",
  },
};

function getCategoryDisplay(cat: ForumCategoryPublic) {
  return (
    CATEGORY_DISPLAY[cat.name] ||
    CATEGORY_DISPLAY[cat.nameSwahili] || {
      icon: MessageSquare,
      color: "bg-muted text-muted-foreground",
      slug: cat.id.toString(),
    }
  );
}

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

// Compact badge icons for the spotlight card
const SPOTLIGHT_BADGE_META: Record<
  string,
  { icon: React.ElementType; color: string }
> = {
  "Helpful Expert": { icon: Star, color: "text-amber-600" },
  "Mtaalamu Msaada": { icon: Star, color: "text-amber-600" },
  "Trusted Advisor": { icon: Award, color: "text-purple-600" },
  "Mshauri wa Kuaminiwa": { icon: Award, color: "text-purple-600" },
  "Community Leader": { icon: Trophy, color: "text-rose-600" },
  "Kiongozi wa Jamii": { icon: Trophy, color: "text-rose-600" },
};

export default function ForumPage() {
  const { t, language } = useLanguageStore();
  const { actor, isReady } = useBackend();
  const queryClient = useQueryClient();

  const [showNewTopic, setShowNewTopic] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newTags, setNewTags] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<bigint | null>(
    null,
  );

  const { data: topContributor, isLoading: topContributorLoading } =
    useQuery<UserReputation | null>({
      queryKey: ["forum", "topContributorOfWeek"],
      queryFn: async () => {
        if (!actor) return null;
        return actor.getTopContributorOfWeek();
      },
      enabled: isReady,
      staleTime: 5 * 60 * 1000, // 5 min
    });

  const { data: categories = [], isLoading: catsLoading } = useQuery<
    ForumCategoryPublic[]
  >({
    queryKey: ["forum", "categories"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCategories();
    },
    enabled: isReady,
  });

  const { data: recentTopics = [], isLoading: topicsLoading } = useQuery<
    ForumTopicSummary[]
  >({
    queryKey: ["forum", "recent", 10],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRecentTopics(BigInt(10));
    },
    enabled: isReady,
  });

  const createTopicMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const catId = selectedCategoryId ?? categories[0]?.id ?? BigInt(0);
      const tags = newTags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      const lang = language === "sw" ? Language.swahili : Language.english;
      const result = await actor.createTopic(
        catId,
        newTitle,
        newBody,
        tags,
        lang,
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

  const isLoading = catsLoading || topicsLoading;
  const canSubmit = newTitle.trim().length > 0 && newBody.trim().length > 0;

  return (
    <Layout>
      <div className="min-h-screen bg-background" data-ocid="forum.page">
        {/* Header */}
        <div className="bg-card border-b px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            <div className="flex items-center gap-2">
              <MessageSquare className="text-primary" size={22} />
              <h1 className="text-lg font-bold text-foreground">
                {t("communityForum")}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/leaderboard" data-ocid="forum.leaderboard_link">
                <button
                  type="button"
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-colors duration-200"
                >
                  <Trophy size={13} />
                  {language === "sw" ? "Ubora" : "Leaderboard"}
                </button>
              </Link>
              <Button
                size="sm"
                onClick={() => setShowNewTopic(true)}
                data-ocid="forum.start_discussion_button"
              >
                <PlusCircle size={14} className="mr-1" />
                {t("newTopic")}
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-4 space-y-5">
          {/* Welcome banner */}
          <div className="bg-primary/10 border border-primary/20 rounded-xl px-4 py-3">
            <p className="text-sm font-semibold text-primary">
              {t("forumWelcome")}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {t("forumWelcomeSub")}
            </p>
          </div>

          {/* Top Contributor of the Week */}
          {topContributorLoading ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4 animate-pulse h-24" />
          ) : topContributor ? (
            <div
              className="relative rounded-2xl border border-amber-300/70 bg-gradient-to-br from-amber-50 to-yellow-50 shadow-sm overflow-hidden"
              data-ocid="forum.top_contributor.card"
            >
              {/* Decorative glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/5 via-yellow-400/10 to-amber-400/5 pointer-events-none" />
              <div className="relative px-4 py-3 flex items-start gap-3">
                {/* Crown icon */}
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center shadow-sm">
                  <Crown size={20} className="text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-600 mb-0.5">
                    {t("topContributorTitle")}
                  </p>
                  <Link
                    to="/user/$userId"
                    params={{ userId: topContributor.userId.toText() }}
                    data-ocid="forum.top_contributor.name_link"
                  >
                    <p className="text-sm font-bold text-foreground hover:text-primary transition-colors duration-200 truncate">
                      {topContributor.userName}
                    </p>
                  </Link>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <Badge
                      className={`text-[10px] border-0 py-0 px-1.5 ${
                        ROLE_COLORS[topContributor.userRole as UserRole] ||
                        "bg-muted text-muted-foreground"
                      }`}
                    >
                      {t(topContributor.userRole as "farmer")}
                    </Badge>
                    {topContributor.region && (
                      <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                        <MapPin size={9} />
                        {topContributor.region}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span className="text-xs font-semibold text-amber-700">
                      {Number(topContributor.reputationScore).toLocaleString()}{" "}
                      {t("topContributorScore")}
                    </span>
                    {topContributor.badges.slice(0, 3).map((badge) => {
                      const meta = SPOTLIGHT_BADGE_META[badge];
                      if (!meta) return null;
                      const Icon = meta.icon;
                      return (
                        <span
                          key={badge}
                          className={`inline-flex items-center ${meta.color}`}
                        >
                          <Icon size={12} />
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="rounded-2xl border border-amber-200/50 bg-amber-50/30 px-4 py-3 flex items-center gap-3"
              data-ocid="forum.top_contributor.empty_state"
            >
              <Crown size={18} className="text-amber-400 flex-shrink-0" />
              <p className="text-xs text-amber-700/70 italic">
                {t("topContributorEmpty")}
              </p>
            </div>
          )}

          {/* Categories Grid */}
          <div>
            <h2 className="text-base font-bold text-foreground mb-3">
              {t("categories")}
            </h2>
            {isLoading ? (
              <div className="grid grid-cols-2 gap-3">
                {[0, 1, 2, 3, 4, 5].map((k) => (
                  <Skeleton key={k} className="rounded-xl h-28" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {categories.length > 0
                  ? categories.map((cat) => {
                      const display = getCategoryDisplay(cat);
                      const Icon = display.icon;
                      const catName =
                        language === "sw" ? cat.nameSwahili : cat.name;
                      const catDesc =
                        language === "sw"
                          ? cat.descriptionSwahili
                          : cat.description;
                      return (
                        <Link
                          key={cat.id.toString()}
                          to="/forum/category/$categoryId"
                          params={{ categoryId: cat.id.toString() }}
                          data-ocid={`forum.category.${display.slug}`}
                        >
                          <div className="bg-card border rounded-xl p-3 hover:shadow-md transition-smooth cursor-pointer h-full">
                            <div
                              className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 ${display.color}`}
                            >
                              <Icon size={18} />
                            </div>
                            <p className="font-semibold text-sm text-foreground">
                              {catName}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                              {catDesc}
                            </p>
                            <p className="text-[10px] text-primary mt-1.5 font-medium">
                              {Number(cat.postCount)} {t("discussions")}
                            </p>
                          </div>
                        </Link>
                      );
                    })
                  : null}
              </div>
            )}
          </div>

          {/* Recent Discussions */}
          <div>
            <h2 className="text-base font-bold text-foreground mb-3">
              {t("recentDiscussions")}
            </h2>
            {isLoading ? (
              <div className="space-y-3">
                {[0, 1, 2, 3].map((k) => (
                  <Skeleton key={k} className="h-20 rounded-xl" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {recentTopics.map((topic, i) => (
                  <Link
                    key={topic.id.toString()}
                    to="/forum/topic/$topicId"
                    params={{ topicId: topic.id.toString() }}
                    data-ocid={`forum.topic.item.${i + 1}`}
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
                            <span>{timeAgo(topic.createdAt, language)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
                {recentTopics.length === 0 && (
                  <div
                    className="text-center py-10"
                    data-ocid="forum.recent.empty_state"
                  >
                    <MessageSquare
                      className="mx-auto text-muted-foreground/40 mb-3"
                      size={40}
                    />
                    <p className="text-muted-foreground text-sm">
                      {t("noTopicsYet")}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
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
                    htmlFor="ntopic-category"
                    className="text-xs font-medium text-muted-foreground"
                  >
                    {t("category")} *
                  </label>
                  <select
                    id="ntopic-category"
                    value={selectedCategoryId?.toString() ?? ""}
                    onChange={(e) =>
                      setSelectedCategoryId(
                        e.target.value ? BigInt(e.target.value) : null,
                      )
                    }
                    className="w-full mt-1 border border-input rounded-xl px-3 py-2 bg-background text-foreground text-sm"
                    data-ocid="forum.new_topic.category.select"
                  >
                    <option value="">
                      {language === "sw" ? "Chagua kitengo" : "Select category"}
                    </option>
                    {categories.map((cat) => (
                      <option key={cat.id.toString()} value={cat.id.toString()}>
                        {language === "sw" ? cat.nameSwahili : cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="ntopic-title"
                    className="text-xs font-medium text-muted-foreground"
                  >
                    {t("topicTitle")} *
                  </label>
                  <input
                    id="ntopic-title"
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
                    htmlFor="ntopic-body"
                    className="text-xs font-medium text-muted-foreground"
                  >
                    {t("topicBody")} *
                  </label>
                  <textarea
                    id="ntopic-body"
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
                    htmlFor="ntopic-tags"
                    className="text-xs font-medium text-muted-foreground"
                  >
                    {t("addTags")}
                  </label>
                  <input
                    id="ntopic-tags"
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
