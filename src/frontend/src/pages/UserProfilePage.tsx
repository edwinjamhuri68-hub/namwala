import type { UserReputation } from "@/backend";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useBackend } from "@/hooks/useBackend";
import { ROLE_COLORS } from "@/pages/ForumPage";
import { BADGE_META } from "@/pages/ForumTopicPage";
import { useLanguageStore } from "@/store/languageStore";
import type { UserRole } from "@/types";
import { Principal } from "@icp-sdk/core/principal";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Award,
  MapPin,
  ShieldCheck,
  Star,
  ThumbsUp,
  Trophy,
  UserCircle2,
} from "lucide-react";

// Bilingual badge descriptions
const BADGE_DESCRIPTIONS: Record<
  string,
  { en: string; sw: string; nameEn: string; nameSw: string }
> = {
  badgeHelpfulExpert: {
    nameEn: "Helpful Expert",
    nameSw: "Mshauri Msaada",
    en: "Awarded for receiving 5 or more upvotes on forum replies — your answers are making a real difference.",
    sw: "Inatunukiwa kwa kupata kura 5 au zaidi kwenye majibu ya jukwaa — majibu yako yanafanya tofauti kubwa.",
  },
  badgeTrustedAdvisor: {
    nameEn: "Trusted Advisor",
    nameSw: "Mshauri Wa Kuaminika",
    en: "Earned at 20 upvotes — the community trusts your knowledge and expertise.",
    sw: "Inapatikana kwa kura 20 — jamii inaamini maarifa na ujuzi wako.",
  },
  badgeCommunityLeader: {
    nameEn: "Community Leader",
    nameSw: "Kiongozi wa Jamii",
    en: "Granted at 50+ upvotes — you are a pillar of the Namwala farming community.",
    sw: "Inatolewa kwa kura 50+ — wewe ni nguzo ya jamii ya wakulima wa Namwala.",
  },
};

function formatDate(ts: bigint, language: string): string {
  const ms = Number(ts / 1_000_000n);
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
      "Des",
    ];
    return `${d.getDate()} ${swMonths[d.getMonth()]} ${d.getFullYear()}`;
  }
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function UserProfilePage() {
  const { t, language } = useLanguageStore();
  const { actor, isReady } = useBackend();
  const { userId } = useParams({ strict: false }) as { userId: string };

  let principal: Principal | null = null;
  try {
    principal = Principal.fromText(userId);
  } catch {
    principal = null;
  }

  const {
    data: reputation,
    isLoading,
    isError,
  } = useQuery<UserReputation | null>({
    queryKey: ["userReputation", userId],
    queryFn: async () => {
      if (!actor || !principal) return null;
      return actor.getUserReputation(principal);
    },
    enabled: isReady && !!principal,
  });

  const isSw = language === "sw";

  if (!isLoading && (!reputation || isError)) {
    return (
      <Layout>
        <div
          className="flex flex-col items-center justify-center min-h-screen gap-4"
          data-ocid="user.profile.error_state"
        >
          <UserCircle2 className="text-muted-foreground/30" size={56} />
          <p className="text-muted-foreground font-medium">
            {isSw ? "Mtumiaji hakupatikana" : "User not found"}
          </p>
          <Link to="/leaderboard">
            <Button variant="outline" data-ocid="user.profile.back_button">
              <ArrowLeft size={14} className="mr-1" />
              {isSw ? "Rudi Ubora" : "Back to Leaderboard"}
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const roleColor =
    ROLE_COLORS[(reputation?.userRole ?? "") as UserRole] ||
    "bg-muted text-muted-foreground";

  const earnedBadgesWithDates = reputation?.earnedBadgesWithDates ?? [];
  const score = reputation ? Number(reputation.reputationScore) : 0;
  const badgeCount = earnedBadgesWithDates.length;

  return (
    <Layout>
      <div className="min-h-screen bg-background" data-ocid="user.profile.page">
        {/* Header */}
        <div className="bg-card border-b px-4 py-3 sticky top-0 z-10">
          <div className="max-w-2xl mx-auto flex items-center gap-2">
            <Link to="/leaderboard">
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Back"
                data-ocid="user.profile.back_button"
              >
                <ArrowLeft size={20} />
              </button>
            </Link>
            <p className="text-sm font-semibold text-foreground flex-1 truncate">
              {isSw ? "Profaili ya Mtumiaji" : "User Profile"}
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
          {/* Profile hero card */}
          {isLoading ? (
            <Skeleton className="h-40 rounded-2xl" />
          ) : reputation ? (
            <div
              className="bg-card border rounded-2xl p-5 space-y-4"
              data-ocid="user.profile.card"
            >
              {/* Avatar + name row */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center shrink-0">
                  <UserCircle2 className="text-primary" size={32} />
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-lg font-bold text-foreground truncate">
                    {reputation.userName}
                  </h1>
                  <div className="flex items-center gap-1.5 flex-wrap mt-1">
                    <Badge className={`text-[11px] border-0 ${roleColor}`}>
                      {t(reputation.userRole as "farmer")}
                    </Badge>
                    {reputation.region && (
                      <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                        <MapPin size={11} />
                        {reputation.region}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-2xl font-bold text-primary">
                    {score.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                    {isSw ? "Alama" : "Score"}
                  </p>
                </div>
              </div>

              {/* Stats row */}
              <div
                className="grid grid-cols-2 gap-3 pt-1"
                data-ocid="user.profile.stats"
              >
                <div className="bg-muted/40 rounded-xl px-4 py-3 flex items-center gap-3">
                  <ThumbsUp className="text-primary shrink-0" size={18} />
                  <div>
                    <p className="text-lg font-bold text-foreground leading-tight">
                      {score.toLocaleString()}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {isSw ? "Kura Zilizopokelewa" : "Upvotes Received"}
                    </p>
                  </div>
                </div>
                <div className="bg-muted/40 rounded-xl px-4 py-3 flex items-center gap-3">
                  <Award className="text-primary shrink-0" size={18} />
                  <div>
                    <p className="text-lg font-bold text-foreground leading-tight">
                      {badgeCount}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {isSw ? "Tuzo Zilizopatikana" : "Badges Earned"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {/* Badge Showcase */}
          <div data-ocid="user.profile.badges_section">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="text-primary" size={18} />
              <h2 className="text-base font-bold text-foreground">
                {isSw ? "Onyesho la Tuzo" : "Badge Showcase"}
              </h2>
            </div>

            {isLoading ? (
              <div className="space-y-3">
                {[0, 1].map((k) => (
                  <Skeleton key={k} className="h-24 rounded-xl" />
                ))}
              </div>
            ) : earnedBadgesWithDates.length === 0 ? (
              <div
                className="bg-card border rounded-xl py-10 text-center"
                data-ocid="user.profile.badges.empty_state"
              >
                <Trophy
                  className="mx-auto text-muted-foreground/30 mb-3"
                  size={40}
                />
                <p className="font-medium text-foreground text-sm">
                  {isSw ? "Bado hakuna tuzo" : "No badges yet"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {isSw
                    ? "Jibu maswali kwenye jukwaa na pata kura kupata tuzo."
                    : "Answer questions in the forum and earn upvotes to unlock badges."}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {earnedBadgesWithDates.map(([badgeName, earnedAt]) => {
                  const meta = BADGE_META[badgeName];
                  if (!meta) return null;
                  const desc = BADGE_DESCRIPTIONS[meta.key];
                  const Icon = meta.icon;
                  return (
                    <div
                      key={`${badgeName}-${earnedAt.toString()}`}
                      className="bg-card border rounded-xl p-4 flex items-start gap-4"
                      data-ocid={`user.profile.badge.item.${badgeName.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${meta.color}`}
                      >
                        <Icon size={22} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 flex-wrap">
                          <div>
                            <p className="font-bold text-sm text-foreground">
                              {isSw ? desc?.nameSw : desc?.nameEn}
                            </p>
                            <p className="font-medium text-xs text-foreground/70">
                              {isSw ? desc?.nameEn : desc?.nameSw}
                            </p>
                          </div>
                          <span
                            className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${meta.color}`}
                          >
                            <Star size={9} />
                            {isSw ? "Imepatikana" : "Earned"}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                          {isSw ? desc?.sw : desc?.en}
                        </p>
                        <p className="text-[10px] text-muted-foreground/70 mt-2">
                          {isSw ? "Tarehe:" : "Earned on:"}{" "}
                          <span className="font-medium text-muted-foreground">
                            {formatDate(earnedAt, language)}
                          </span>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Reputation History note */}
          {!isLoading && reputation && earnedBadgesWithDates.length > 0 && (
            <div className="bg-muted/30 border rounded-xl px-4 py-3 text-xs text-muted-foreground">
              <p>
                {isSw
                  ? `${reputation.userName} amepata tuzo ${badgeCount} kwa jumla ya kura ${score.toLocaleString()} kutoka kwa wanajamii wa Namwala.`
                  : `${reputation.userName} has earned ${badgeCount} badge${badgeCount !== 1 ? "s" : ""} with a total of ${score.toLocaleString()} upvote${score !== 1 ? "s" : ""} from the Namwala community.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
