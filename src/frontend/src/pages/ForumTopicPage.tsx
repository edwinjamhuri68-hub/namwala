import type {
  ForumReplyPublic,
  ForumReplyWithUpvotes,
  ForumTopicPublic,
  UserReputation,
} from "@/backend";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useBackend } from "@/hooks/useBackend";
import { ROLE_COLORS } from "@/pages/ForumPage";
import { useAuthStore } from "@/store/authStore";
import { type TranslationKey, useLanguageStore } from "@/store/languageStore";
import { triggerBadgeNotification } from "@/store/notificationStore";
import type { UserRole } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  MessageSquare,
  Send,
  Star,
  ThumbsUp,
  Trophy,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

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

// Badge label → translation key and icon
export const BADGE_META: Record<
  string,
  {
    key: "badgeHelpfulExpert" | "badgeTrustedAdvisor" | "badgeCommunityLeader";
    icon: React.ElementType;
    color: string;
  }
> = {
  "Helpful Expert": {
    key: "badgeHelpfulExpert",
    icon: Star,
    color: "bg-amber-100 text-amber-700",
  },
  "Mtaalamu Msaada": {
    key: "badgeHelpfulExpert",
    icon: Star,
    color: "bg-amber-100 text-amber-700",
  },
  "Trusted Advisor": {
    key: "badgeTrustedAdvisor",
    icon: Award,
    color: "bg-purple-100 text-purple-700",
  },
  "Mshauri wa Kuaminiwa": {
    key: "badgeTrustedAdvisor",
    icon: Award,
    color: "bg-purple-100 text-purple-700",
  },
  "Community Leader": {
    key: "badgeCommunityLeader",
    icon: Trophy,
    color: "bg-rose-100 text-rose-700",
  },
  "Kiongozi wa Jamii": {
    key: "badgeCommunityLeader",
    icon: Trophy,
    color: "bg-rose-100 text-rose-700",
  },
};

export function ReputationBadges({
  badges,
  t,
}: { badges: string[]; t: (k: TranslationKey) => string }) {
  if (!badges.length) return null;
  return (
    <>
      {badges.map((raw) => {
        const meta = BADGE_META[raw];
        if (!meta) return null;
        const Icon = meta.icon;
        return (
          <span
            key={raw}
            className={`inline-flex items-center gap-0.5 text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${meta.color}`}
          >
            <Icon size={9} />
            {t(meta.key)}
          </span>
        );
      })}
    </>
  );
}

export default function ForumTopicPage() {
  const { t, language } = useLanguageStore();
  const { user } = useAuthStore();
  const { actor, isReady } = useBackend();
  const queryClient = useQueryClient();
  const { topicId } = useParams({ strict: false }) as { topicId: string };
  const topicIdBigint = BigInt(topicId);

  const [replyText, setReplyText] = useState("");
  const [localAccepted, setLocalAccepted] = useState<Set<string>>(new Set());

  const { data: topic, isLoading: topicLoading } =
    useQuery<ForumTopicPublic | null>({
      queryKey: ["forum", "topic", topicId],
      queryFn: async () => {
        if (!actor) return null;
        return actor.getTopicById(topicIdBigint);
      },
      enabled: isReady,
    });

  const { data: replies = [], isLoading: repliesLoading } = useQuery<
    ForumReplyPublic[]
  >({
    queryKey: ["forum", "replies", topicId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRepliesByTopic(topicIdBigint);
    },
    enabled: isReady,
  });

  // Fetch upvote info for each reply (hasVoted + upvoteCount) via getForumReplyWithUpvotes
  const { data: replyUpvotes = {} } = useQuery<
    Record<string, ForumReplyWithUpvotes>
  >({
    queryKey: ["forum", "upvotes", topicId],
    queryFn: async () => {
      if (!actor || !replies.length) return {};
      const entries = await Promise.all(
        replies.map(async (r) => {
          const info = await actor.getForumReplyWithUpvotes(r.id);
          return [r.id.toString(), info] as [
            string,
            ForumReplyWithUpvotes | null,
          ];
        }),
      );
      const map: Record<string, ForumReplyWithUpvotes> = {};
      for (const [id, info] of entries) {
        if (info) map[id] = info;
      }
      return map;
    },
    enabled: isReady && replies.length > 0,
  });

  // Fetch reputation for each unique reply author
  const authorIds = Array.from(new Set(replies.map((r) => r.authorId)));
  const { data: authorReputations = {} } = useQuery<
    Record<string, UserReputation>
  >({
    queryKey: ["forum", "authorReputations", topicId],
    queryFn: async () => {
      if (!actor || !authorIds.length) return {};
      const entries = await Promise.all(
        authorIds.map(async (aid) => {
          const rep = await actor.getUserReputation(aid);
          return [aid.toText(), rep] as [string, UserReputation | null];
        }),
      );
      const map: Record<string, UserReputation> = {};
      for (const [id, rep] of entries) {
        if (rep) map[id] = rep;
      }
      return map;
    },
    enabled: isReady && authorIds.length > 0,
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
        queryKey: ["forum", "replies", topicId],
      });
      queryClient.invalidateQueries({ queryKey: ["forum", "topic", topicId] });
      setReplyText("");
      toast.success(t("replyPosted"));
    },
    onError: () => {
      toast.error(
        language === "sw" ? "Imeshindwa kutuma jibu" : "Failed to post reply",
      );
    },
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
      toast.success(t("resolved"));
    },
    onError: () => {
      toast.error(
        language === "sw"
          ? "Imeshindwa kuweka kama imetatuliwa"
          : "Failed to mark resolved",
      );
    },
  });

  const upvoteMutation = useMutation({
    mutationFn: async (replyId: bigint) => {
      if (!actor) throw new Error("Not connected");
      // Snapshot the reply author's current badges before the upvote lands
      const replyItem = replies.find((r) => r.id === replyId);
      const authorId = replyItem?.authorId;
      const authorIdText = authorId?.toText() ?? "";
      const prevBadges: string[] =
        authorReputations[authorIdText]?.badges ?? [];
      await actor.upvoteReply(replyId);
      return { authorId, authorIdText, prevBadges };
    },
    onSuccess: async ({ authorId, authorIdText, prevBadges }) => {
      // Invalidate so React Query re-fetches fresh reputation
      await queryClient.invalidateQueries({
        queryKey: ["forum", "upvotes", topicId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["forum", "authorReputations", topicId],
      });
      // Compare new badges vs old — fire a notification for every newly earned badge
      if (authorId && authorIdText && actor) {
        const freshRep = await actor.getUserReputation(authorId);
        const newBadges: string[] = freshRep?.badges ?? [];
        for (const badge of newBadges) {
          if (!prevBadges.includes(badge)) {
            const displayName =
              language === "sw"
                ? BADGE_META[badge]?.key === "badgeHelpfulExpert"
                  ? "Mtaalamu Msaada"
                  : BADGE_META[badge]?.key === "badgeTrustedAdvisor"
                    ? "Mshauri wa Kuaminiwa"
                    : "Kiongozi wa Jamii"
                : badge;
            triggerBadgeNotification(displayName, authorIdText, language);
          }
        }
      }
    },
    onError: () => {
      toast.error(
        language === "sw" ? "Imeshindwa kupiga kura" : "Failed to upvote",
      );
    },
  });

  function handleAcceptLocal(replyId: string) {
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
  const isTopicAuthor = user?.name === topic?.authorName;
  const isResolved = topic?.isResolved ?? false;

  if (!isLoading && !topic) {
    return (
      <Layout>
        <div
          className="flex flex-col items-center justify-center min-h-screen"
          data-ocid="forum.topic.error_state"
        >
          <MessageSquare className="text-muted-foreground/40 mb-3" size={48} />
          <p className="text-muted-foreground">{t("noData")}</p>
          <Link to="/forum">
            <Button variant="outline" className="mt-4">
              {t("communityForum")}
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background" data-ocid="forum.topic.page">
        {/* Header */}
        <div className="bg-card border-b px-4 py-3 sticky top-0 z-10">
          <div className="flex items-center gap-2 max-w-2xl mx-auto">
            <Link
              to="/forum/category/$categoryId"
              params={{
                categoryId: topic?.categoryId.toString() ?? "0",
              }}
            >
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Back"
              >
                <ArrowLeft size={20} />
              </button>
            </Link>
            <p className="text-sm font-semibold text-foreground truncate flex-1">
              {t("communityForum")}
            </p>
            {isResolved && (
              <Badge className="text-[10px] border-0 bg-emerald-100 text-emerald-700">
                <CheckCircle2 size={10} className="mr-0.5" />
                {t("resolved")}
              </Badge>
            )}
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
          {/* Original post */}
          {isLoading ? (
            <Skeleton className="h-40 rounded-xl" />
          ) : topic ? (
            <div
              className="bg-card border rounded-xl p-4 space-y-3"
              data-ocid="forum.topic.original_post"
            >
              <div className="flex items-start gap-2 flex-wrap">
                <Badge
                  className={`text-[10px] border-0 ${
                    ROLE_COLORS[topic.authorRole as UserRole] ||
                    "bg-muted text-muted-foreground"
                  }`}
                >
                  {t(topic.authorRole as "farmer")}
                </Badge>
                {isResolved && (
                  <Badge className="text-[10px] border-0 bg-emerald-100 text-emerald-700">
                    <CheckCircle2 size={10} className="mr-0.5" />
                    {t("resolved")}
                  </Badge>
                )}
              </div>
              <h2 className="text-base font-bold text-foreground">
                {topic.title}
              </h2>
              <p className="text-xs text-muted-foreground">
                {topic.authorName} · {timeAgo(topic.createdAt, language)}
              </p>
              <p className="text-sm text-foreground leading-relaxed">
                {topic.body}
              </p>
              {topic.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {topic.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
                <span>
                  <MessageSquare size={11} className="inline mr-0.5" />
                  {Number(topic.replyCount)} {t("replies")}
                </span>
              </div>

              {/* Mark resolved (topic author only) */}
              {isTopicAuthor && !isResolved && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => markResolvedMutation.mutate()}
                  disabled={markResolvedMutation.isPending}
                  data-ocid="forum.topic.mark_resolved_button"
                >
                  <CheckCircle2 size={13} className="mr-1" />
                  {t("markResolved")}
                </Button>
              )}
            </div>
          ) : null}

          {/* Replies */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground">
              {replies.length} {t("replies")}
            </h3>

            {isLoading ? (
              <div className="space-y-3">
                {[0, 1].map((k) => (
                  <Skeleton key={k} className="h-28 rounded-xl" />
                ))}
              </div>
            ) : replies.length === 0 ? (
              <div
                className="text-center py-10"
                data-ocid="forum.topic.no_replies_state"
              >
                <MessageSquare
                  className="mx-auto text-muted-foreground/30 mb-2"
                  size={36}
                />
                <p className="text-sm text-muted-foreground">
                  {t("noRepliesYet")}
                </p>
                <p className="text-xs text-muted-foreground/70">
                  {t("beFirstToReply")}
                </p>
              </div>
            ) : (
              replies.map((reply, i) => {
                const isAccepted =
                  reply.isAccepted || localAccepted.has(reply.id.toString());
                const upvoteInfo = replyUpvotes[reply.id.toString()];
                const hasVoted = upvoteInfo?.hasVoted ?? false;
                const upvoteCount = upvoteInfo
                  ? Number(upvoteInfo.upvoteCount)
                  : Number(reply.upvoteCount ?? 0);
                const authorRep = authorReputations[reply.authorId.toText()];
                const authorBadges = authorRep?.badges ?? [];

                return (
                  <div
                    key={reply.id.toString()}
                    className={`rounded-xl border p-4 space-y-2 ${
                      isAccepted
                        ? "bg-emerald-50 border-emerald-200"
                        : "bg-card"
                    }`}
                    data-ocid={`forum.topic.reply.item.${i + 1}`}
                  >
                    {/* Author row */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge
                        className={`text-[10px] border-0 ${
                          ROLE_COLORS[reply.authorRole as UserRole] ||
                          "bg-muted text-muted-foreground"
                        }`}
                      >
                        {t(reply.authorRole as "farmer")}
                      </Badge>
                      {/* Reputation badge pills */}
                      <ReputationBadges badges={authorBadges} t={t} />
                      {isAccepted && (
                        <Badge className="text-[10px] border-0 bg-emerald-100 text-emerald-700">
                          <CheckCircle2 size={10} className="mr-0.5" />
                          {t("acceptedAnswer")}
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground ml-auto flex items-center gap-1">
                        <Link
                          to="/user/$userId"
                          params={{ userId: reply.authorId.toText() }}
                          className="hover:text-primary transition-colors font-medium"
                          data-ocid={`forum.reply.author.link.${i + 1}`}
                        >
                          {reply.authorName}
                        </Link>
                        {" · "}
                        {timeAgo(reply.createdAt, language)}
                      </span>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">
                      {reply.body}
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      {/* Upvote button — calls backend */}
                      <button
                        type="button"
                        onClick={() => {
                          if (!hasVoted) upvoteMutation.mutate(reply.id);
                        }}
                        disabled={hasVoted || upvoteMutation.isPending}
                        aria-label={hasVoted ? t("upvoted") : t("upvote")}
                        className={`flex items-center gap-1 text-xs transition-colors disabled:cursor-not-allowed ${
                          hasVoted
                            ? "text-primary font-semibold"
                            : "text-muted-foreground hover:text-primary"
                        }`}
                        data-ocid={`forum.reply.like_button.${i + 1}`}
                      >
                        <ThumbsUp
                          size={13}
                          className={hasVoted ? "fill-primary" : ""}
                        />
                        <span>{upvoteCount}</span>
                      </button>
                      {isTopicAuthor && (
                        <button
                          type="button"
                          onClick={() => handleAcceptLocal(reply.id.toString())}
                          className={`flex items-center gap-1 text-xs ml-auto transition-colors ${
                            isAccepted
                              ? "text-emerald-600"
                              : "text-muted-foreground hover:text-emerald-600"
                          }`}
                          data-ocid={`forum.reply.accept_button.${i + 1}`}
                        >
                          <CheckCircle2 size={13} />
                          {isAccepted ? t("acceptedAnswer") : t("acceptAnswer")}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Reply box */}
          <div
            className="bg-card border rounded-xl p-4 space-y-3"
            data-ocid="forum.reply.compose"
          >
            <h3 className="text-sm font-semibold text-foreground">
              {t("postReply")}
            </h3>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={
                language === "sw"
                  ? "Andika jibu lako..."
                  : "Write your reply..."
              }
              rows={3}
              className="w-full border border-input rounded-xl px-3 py-2 bg-background text-foreground text-sm resize-none"
              data-ocid="forum.reply.textarea"
            />
            <Button
              className="w-full"
              disabled={!replyText.trim() || replyMutation.isPending}
              onClick={() => replyMutation.mutate()}
              data-ocid="forum.reply.submit_button"
            >
              <Send size={14} className="mr-1" />
              {replyMutation.isPending
                ? language === "sw"
                  ? "Inatuma..."
                  : "Posting..."
                : t("replyToTopic")}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
