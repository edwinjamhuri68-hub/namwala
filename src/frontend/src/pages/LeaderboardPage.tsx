import type { UserReputation, UserRole } from "@/backend";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useBackend } from "@/hooks/useBackend";
import { BADGE_META, ReputationBadges } from "@/pages/ForumTopicPage";
import { type TranslationKey, useLanguageStore } from "@/store/languageStore";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Award, Clock, Crown, MapPin, Medal, Trophy } from "lucide-react";
import { useState } from "react";
import { ROLE_COLORS } from "./ForumPage";

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
  "Songwe",
];

const RANK_ICONS: Record<number, React.ReactNode> = {
  1: <Crown size={16} className="text-yellow-500" />,
  2: <Medal size={16} className="text-slate-400" />,
  3: <Award size={16} className="text-amber-600" />,
};

export default function LeaderboardPage() {
  const { t } = useLanguageStore();
  const { actor, isReady } = useBackend();

  const [activeTab, setActiveTab] = useState<"alltime" | "thisweek">("alltime");
  const [region, setRegion] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<
    "all" | "specialists" | "farmers"
  >("all");

  const roleFilterParam: string | null =
    roleFilter === "specialists"
      ? "specialists"
      : roleFilter === "farmers"
        ? "farmers"
        : null;

  const { data: leaderboard = [], isLoading: isLoadingAllTime } = useQuery<
    UserReputation[]
  >({
    queryKey: ["leaderboard", region, roleFilterParam],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLeaderboard(region, roleFilterParam);
    },
    enabled: isReady,
  });

  const { data: weeklyLeaderboard = [], isLoading: isLoadingWeekly } = useQuery<
    UserReputation[]
  >({
    queryKey: ["weeklyLeaderboard", region],
    queryFn: async () => {
      if (!actor) return [];
      const entries = await actor.getWeeklyLeaderboard(region);
      return entries.map((e) => ({
        userId: e.userId,
        userName: e.userName,
        userRole: e.userRole as unknown as UserRole,
        region: e.region,
        badges: e.badges,
        reputationScore: e.weeklyScore,
        earnedBadgesWithDates: [] as Array<[string, bigint]>,
      })) as UserReputation[];
    },
    enabled: isReady,
  });

  const filteredWeekly =
    roleFilter === "all"
      ? weeklyLeaderboard
      : weeklyLeaderboard.filter((u) => {
          if (roleFilter === "specialists") {
            return [
              "agri_specialist",
              "veterinarian",
              "weather_soil_specialist",
              "market_advisor",
            ].includes(u.userRole);
          }
          return ["farmer", "livestock_keeper"].includes(u.userRole);
        });

  const isLoading =
    activeTab === "alltime" ? isLoadingAllTime : isLoadingWeekly;

  function getRoleLabel(role: string): string {
    return t(role as Parameters<typeof t>[0]);
  }

  function renderUserCard(
    user: UserReputation,
    rank: number,
    scoreLabel: string,
  ) {
    const isTop3 = rank <= 3;
    const roleColor =
      ROLE_COLORS[user.userRole as UserRole] ||
      "bg-muted text-muted-foreground";

    return (
      <div
        key={`${user.userId.toString()}-${rank}`}
        data-ocid={`leaderboard.item.${rank}`}
        className={`bg-card border rounded-xl px-4 py-3 flex items-center gap-3 ${
          isTop3 ? "border-primary/30 shadow-sm" : "border-border"
        }`}
      >
        {/* Rank */}
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm ${
            rank === 1
              ? "bg-yellow-100 text-yellow-700"
              : rank === 2
                ? "bg-slate-100 text-slate-600"
                : rank === 3
                  ? "bg-amber-100 text-amber-700"
                  : "bg-muted text-muted-foreground"
          }`}
        >
          {RANK_ICONS[rank] ?? rank}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap mb-1">
            <Link
              to="/user/$userId"
              params={{ userId: user.userId.toText() }}
              className="font-semibold text-sm text-foreground truncate hover:text-primary transition-colors"
              data-ocid={`leaderboard.user.link.${rank}`}
            >
              {user.userName}
            </Link>
            <Badge
              className={`text-[10px] border-0 py-0 px-1.5 shrink-0 ${roleColor}`}
            >
              {getRoleLabel(user.userRole)}
            </Badge>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1.5">
            <MapPin size={11} />
            <span>{user.region || "Tanzania"}</span>
          </div>
          {/* Badges */}
          {user.badges.length > 0 && (
            <div className="flex flex-wrap gap-1">
              <ReputationBadges
                badges={user.badges}
                t={t as (k: TranslationKey) => string}
              />
            </div>
          )}
        </div>

        {/* Score */}
        <div className="text-right shrink-0">
          <p className="text-lg font-bold text-primary">
            {Number(user.reputationScore).toLocaleString()}
          </p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
            {scoreLabel}
          </p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background" data-ocid="leaderboard.page">
        {/* Header */}
        <div className="bg-card border-b px-4 py-4 sticky top-0 z-10">
          <div className="max-w-2xl mx-auto flex items-center gap-2">
            <Trophy className="text-primary" size={22} />
            <div>
              <h1 className="text-lg font-bold text-foreground leading-tight">
                {t("communityLeaderboard")}
              </h1>
              <p className="text-xs text-muted-foreground">
                {t("leaderboardSub")}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
          {/* Tabs */}
          <div
            className="flex gap-1 bg-muted/60 rounded-xl p-1"
            data-ocid="leaderboard.tabs"
          >
            <button
              type="button"
              onClick={() => setActiveTab("alltime")}
              data-ocid="leaderboard.alltime.tab"
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "alltime"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("leaderboardAllTime")}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("thisweek")}
              data-ocid="leaderboard.thisweek.tab"
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "thisweek"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("leaderboardThisWeek")}
            </button>
          </div>

          {/* Reset countdown label for This Week tab */}
          {activeTab === "thisweek" && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/40 rounded-lg px-3 py-2">
              <Clock size={12} className="shrink-0" />
              <span>{t("leaderboardResetsSunday")}</span>
            </div>
          )}

          {/* Filters */}
          <div className="flex gap-2 flex-wrap">
            {/* Region filter */}
            <div className="flex-1 min-w-[140px]">
              <label
                htmlFor="lb-region"
                className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide block mb-1"
              >
                {t("leaderboardRegion")}
              </label>
              <select
                id="lb-region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full border border-input rounded-xl px-3 py-2 bg-background text-foreground text-sm"
                data-ocid="leaderboard.region.select"
              >
                <option value="">{t("allRegions")}</option>
                {TZ_REGIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Role filter */}
            <div className="flex-1 min-w-[140px]">
              <label
                htmlFor="lb-role"
                className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide block mb-1"
              >
                {t("leaderboardRole")}
              </label>
              <select
                id="lb-role"
                value={roleFilter}
                onChange={(e) =>
                  setRoleFilter(
                    e.target.value as "all" | "specialists" | "farmers",
                  )
                }
                className="w-full border border-input rounded-xl px-3 py-2 bg-background text-foreground text-sm"
                data-ocid="leaderboard.role.select"
              >
                <option value="all">{t("leaderboardAll")}</option>
                <option value="specialists">
                  {t("leaderboardSpecialists")}
                </option>
                <option value="farmers">{t("leaderboardFarmers")}</option>
              </select>
            </div>
          </div>

          {/* Leaderboard list — All Time */}
          {activeTab === "alltime" &&
            (isLoading ? (
              <div className="space-y-3" data-ocid="leaderboard.loading_state">
                {[0, 1, 2, 3, 4].map((k) => (
                  <Skeleton key={k} className="h-20 rounded-xl" />
                ))}
              </div>
            ) : leaderboard.length === 0 ? (
              <div
                className="text-center py-16"
                data-ocid="leaderboard.empty_state"
              >
                <Trophy
                  className="mx-auto text-muted-foreground/30 mb-3"
                  size={48}
                />
                <p className="text-muted-foreground text-sm">
                  {t("leaderboardEmpty")}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {leaderboard
                  .slice(0, 20)
                  .map((user, idx) =>
                    renderUserCard(user, idx + 1, t("leaderboardScore")),
                  )}
              </div>
            ))}

          {/* Leaderboard list — This Week */}
          {activeTab === "thisweek" &&
            (isLoading ? (
              <div
                className="space-y-3"
                data-ocid="leaderboard.weekly.loading_state"
              >
                {[0, 1, 2, 3, 4].map((k) => (
                  <Skeleton key={k} className="h-20 rounded-xl" />
                ))}
              </div>
            ) : filteredWeekly.length === 0 ? (
              <div
                className="text-center py-16"
                data-ocid="leaderboard.weekly.empty_state"
              >
                <Trophy
                  className="mx-auto text-muted-foreground/30 mb-3"
                  size={48}
                />
                <p className="text-muted-foreground text-sm">
                  {t("leaderboardNoWeeklyActivity")}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredWeekly
                  .slice(0, 20)
                  .map((user, idx) =>
                    renderUserCard(user, idx + 1, t("leaderboardWeeklyScore")),
                  )}
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
}
