import type {
  FarmBenchmark,
  ImprovementSuggestion,
  MarketGap,
  TopSeller,
  TrendingCrop,
} from "@/backend";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useBackend } from "@/hooks/useBackend";
import { useLanguageStore } from "@/store/languageStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  BarChart2,
  Lightbulb,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const REGIONS = [
  "Dodoma",
  "Arusha",
  "Kilimanjaro",
  "Tanga",
  "Morogoro",
  "Pwani",
  "Dar es Salaam",
  "Lindi",
  "Mtwara",
  "Ruvuma",
  "Iringa",
  "Mbeya",
  "Singida",
  "Tabora",
  "Rukwa",
  "Kigoma",
  "Shinyanga",
  "Kagera",
  "Mwanza",
  "Mara",
  "Manyara",
  "Geita",
  "Simiyu",
  "Njombe",
  "Katavi",
  "Songwe",
];

export default function SuccessInsightsPage() {
  const { language } = useLanguageStore();
  const t = (en: string, sw: string) => (language === "sw" ? sw : en);
  const { actor } = useBackend();
  const qc = useQueryClient();

  const [selectedRegion, setSelectedRegion] = useState("Dodoma");
  const [activeTab, setActiveTab] = useState<
    "sellers" | "crops" | "gaps" | "benchmark" | "suggestions"
  >("sellers");
  const [showSuggestionDialog, setShowSuggestionDialog] = useState(false);
  const [suggestionText, setSuggestionText] = useState("");
  const [suggestionCategory, setSuggestionCategory] = useState("general");

  const { data: topSellers, isLoading: sellersLoading } = useQuery<TopSeller[]>(
    {
      queryKey: ["topSellers", selectedRegion],
      queryFn: async () => {
        if (!actor) return [];
        return actor.getTopSellersByRegion(selectedRegion, BigInt(10));
      },
      enabled: !!actor,
    },
  );

  const { data: trendingCrops, isLoading: cropsLoading } = useQuery<
    TrendingCrop[]
  >({
    queryKey: ["trendingCrops"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTrendingCrops(BigInt(8));
    },
    enabled: !!actor,
  });

  const { data: marketGaps, isLoading: gapsLoading } = useQuery<MarketGap[]>({
    queryKey: ["marketGaps"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMarketGaps(BigInt(6));
    },
    enabled: !!actor,
  });

  const { data: benchmark, isLoading: benchmarkLoading } =
    useQuery<FarmBenchmark | null>({
      queryKey: ["farmBenchmark", selectedRegion],
      queryFn: async () => {
        if (!actor) return null;
        return actor.getMyFarmBenchmark(selectedRegion);
      },
      enabled: !!actor,
    });

  const { data: suggestions, isLoading: suggestionsLoading } = useQuery<
    ImprovementSuggestion[]
  >({
    queryKey: ["improvementSuggestions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyImprovementSuggestions();
    },
    enabled: !!actor,
  });

  const addSuggestionMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.addImprovementSuggestion(suggestionText, suggestionCategory);
    },
    onSuccess: () => {
      toast.success(t("Suggestion added!", "Pendekezo limeongezwa!"));
      qc.invalidateQueries({ queryKey: ["improvementSuggestions"] });
      setShowSuggestionDialog(false);
      setSuggestionText("");
    },
    onError: () =>
      toast.error(
        t("Failed to add suggestion", "Imeshindwa kuongeza pendekezo"),
      ),
  });

  const renderTrend = (growth: bigint) => {
    const val = Number(growth);
    if (val > 0)
      return (
        <span className="flex items-center gap-1 text-green-600 text-xs">
          <TrendingUp className="w-3 h-3" />+{val}%
        </span>
      );
    if (val < 0)
      return (
        <span className="flex items-center gap-1 text-red-500 text-xs">
          <TrendingDown className="w-3 h-3" />
          {val}%
        </span>
      );
    return (
      <span className="flex items-center gap-1 text-muted-foreground text-xs">
        <Minus className="w-3 h-3" />
        0%
      </span>
    );
  };

  const TABS = [
    {
      key: "sellers" as const,
      label: t("Top Sellers", "Wauzaji Bora"),
      labelSw: "Wauzaji Bora",
    },
    {
      key: "crops" as const,
      label: t("Trending Crops", "Mazao Yanayotambaa"),
      labelSw: "Mazao Yanayotambaa",
    },
    {
      key: "gaps" as const,
      label: t("Market Gaps", "Pengo la Soko"),
      labelSw: "Pengo la Soko",
    },
    {
      key: "benchmark" as const,
      label: t("My Benchmark", "Kiwango Changu"),
      labelSw: "Kiwango Changu",
    },
    {
      key: "suggestions" as const,
      label: t("Suggestions", "Mapendekezo"),
      labelSw: "Mapendekezo",
    },
  ];

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {t("Success Insights", "Maarifa ya Mafanikio")}
            </h1>
            <p className="text-muted-foreground">
              {t(
                "Data-driven insights to grow your agricultural business",
                "Maarifa yanayotegemea data kukua kwa biashara yako ya kilimo",
              )}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger
                className="w-40"
                data-ocid="insights.region_select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {REGIONS.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveTab(tab.key)}
              data-ocid={`insights.${tab.key}_tab`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Top Sellers */}
        {activeTab === "sellers" && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {t(
                `Top sellers in ${selectedRegion}`,
                `Wauzaji bora huko ${selectedRegion}`,
              )}
            </p>
            {sellersLoading ? (
              ["s0", "s1", "s2", "s3", "s4"].map((k) => (
                <Skeleton key={k} className="h-20 w-full rounded-lg" />
              ))
            ) : (topSellers ?? []).length === 0 ? (
              <Card>
                <CardContent className="py-10 text-center">
                  <p
                    className="text-muted-foreground"
                    data-ocid="insights.sellers_empty_state"
                  >
                    {t(
                      "No seller data for this region yet",
                      "Hakuna data ya wauzaji kwa mkoa huu bado",
                    )}
                  </p>
                </CardContent>
              </Card>
            ) : (
              (topSellers ?? []).map((s, idx) => (
                <Card
                  key={s.sellerName}
                  data-ocid={`insights.seller.item.${idx + 1}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                          #{idx + 1}
                        </div>
                        <div>
                          <p className="font-semibold">{s.sellerName}</p>
                          <p className="text-xs text-muted-foreground">
                            {s.region}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="text-center">
                          <p className="font-bold text-foreground">
                            {Number(s.salesVolume).toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {t("Sales", "Mauzo")}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="font-bold text-foreground flex items-center gap-1 justify-center">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            {s.averageRating.toFixed(1)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {t("Rating", "Ukadiriaji")}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="font-bold text-foreground">
                            {Number(s.listingCount)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {t("Listings", "Orodha")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Trending Crops */}
        {activeTab === "crops" && (
          <div className="space-y-4">
            {cropsLoading ? (
              ["s0", "s1", "s2", "s3"].map((k) => (
                <Skeleton key={k} className="h-20 w-full rounded-lg" />
              ))
            ) : (trendingCrops ?? []).length === 0 ? (
              <Card>
                <CardContent className="py-10 text-center">
                  <p
                    className="text-muted-foreground"
                    data-ocid="insights.crops_empty_state"
                  >
                    {t(
                      "No crop trend data yet",
                      "Hakuna data ya mwenendo wa mazao bado",
                    )}
                  </p>
                </CardContent>
              </Card>
            ) : (
              (trendingCrops ?? []).map((c, idx) => (
                <Card
                  key={c.category}
                  data-ocid={`insights.crop.item.${idx + 1}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold capitalize">{c.category}</p>
                        <p className="text-xs text-muted-foreground">
                          {Number(c.listingCount)} {t("listings", "orodha")}
                        </p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="font-bold">
                            TSh {Number(c.averagePrice).toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {t("avg price", "bei ya wastani")}
                          </p>
                        </div>
                        <div>{renderTrend(c.priceGrowthPct)}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Market Gaps */}
        {activeTab === "gaps" && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {t(
                "High demand, low supply = opportunity",
                "Mahitaji mengi, ugavi mdogo = fursa",
              )}
            </p>
            {gapsLoading ? (
              ["s0", "s1", "s2", "s3"].map((k) => (
                <Skeleton key={k} className="h-20 w-full rounded-lg" />
              ))
            ) : (marketGaps ?? []).length === 0 ? (
              <Card>
                <CardContent className="py-10 text-center">
                  <p
                    className="text-muted-foreground"
                    data-ocid="insights.gaps_empty_state"
                  >
                    {t(
                      "No market gap data yet",
                      "Hakuna data ya pengo la soko bado",
                    )}
                  </p>
                </CardContent>
              </Card>
            ) : (
              (marketGaps ?? []).map((g, idx) => (
                <Card
                  key={g.category}
                  data-ocid={`insights.gap.item.${idx + 1}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-orange-500 shrink-0" />
                        <div>
                          <p className="font-semibold capitalize">
                            {g.category}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {Number(g.supplyCount)}{" "}
                            {t("suppliers", "wasambazaji")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="font-bold text-foreground">
                            {Number(g.demandScore)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {t("demand", "mahitaji")}
                          </p>
                        </div>
                        <div className="text-center">
                          <Badge
                            variant={
                              Number(g.opportunityScore) > 70
                                ? "default"
                                : "secondary"
                            }
                          >
                            {Number(g.opportunityScore)} {t("opp.", "fur.")}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Benchmark */}
        {activeTab === "benchmark" && (
          <div className="space-y-4">
            {benchmarkLoading ? (
              <Skeleton className="h-48 w-full rounded-lg" />
            ) : !benchmark ? (
              <Card>
                <CardContent className="py-10 text-center">
                  <BarChart2 className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p
                    className="text-muted-foreground"
                    data-ocid="insights.benchmark_empty_state"
                  >
                    {t(
                      "No benchmark data available yet",
                      "Hakuna data ya kiwango bado",
                    )}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {t(
                      "Your Farm vs Regional Average",
                      "Shamba Lako dhidi ya Wastani wa Mkoa",
                    )}{" "}
                    — {benchmark.region}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        {t("Your Listings", "Orodha Zako")}
                      </p>
                      <div className="flex items-end gap-2">
                        <p className="text-3xl font-bold text-foreground">
                          {Number(benchmark.listingCount)}
                        </p>
                        <p className="text-sm text-muted-foreground pb-1">
                          {t("vs", "dhidi ya")}{" "}
                          {Number(benchmark.regionalAvgListings)}{" "}
                          {t("avg", "wastani")}
                        </p>
                      </div>
                      <div className="h-2 bg-muted rounded-full mt-2 overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{
                            width: `${Math.min((Number(benchmark.listingCount) / Math.max(Number(benchmark.regionalAvgListings), 1)) * 100, 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        {t("Your Orders", "Maagizo Yako")}
                      </p>
                      <div className="flex items-end gap-2">
                        <p className="text-3xl font-bold text-foreground">
                          {Number(benchmark.orderCount)}
                        </p>
                        <p className="text-sm text-muted-foreground pb-1">
                          {t("vs", "dhidi ya")}{" "}
                          {Number(benchmark.regionalAvgOrders)}{" "}
                          {t("avg", "wastani")}
                        </p>
                      </div>
                      <div className="h-2 bg-muted rounded-full mt-2 overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{
                            width: `${Math.min((Number(benchmark.orderCount) / Math.max(Number(benchmark.regionalAvgOrders), 1)) * 100, 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {Number(benchmark.listingCount) <
                    Number(benchmark.regionalAvgListings) && (
                    <p className="text-sm text-orange-600 bg-orange-50 rounded-md p-3">
                      {t(
                        `You have ${Number(benchmark.regionalAvgListings) - Number(benchmark.listingCount)} fewer listings than average. Consider adding more products to reach more buyers.`,
                        `Una orodha ${Number(benchmark.regionalAvgListings) - Number(benchmark.listingCount)} chache kuliko wastani. Fikiria kuongeza bidhaa zaidi.`,
                      )}
                    </p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Suggestions */}
        {activeTab === "suggestions" && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <Button
                onClick={() => setShowSuggestionDialog(true)}
                variant="outline"
                size="sm"
                data-ocid="insights.add_suggestion_button"
              >
                <Plus className="w-4 h-4 mr-2" />
                {t("Add Suggestion", "Ongeza Pendekezo")}
              </Button>
            </div>
            {suggestionsLoading ? (
              ["s0", "s1", "s2"].map((k) => (
                <Skeleton key={k} className="h-20 w-full rounded-lg" />
              ))
            ) : (suggestions ?? []).length === 0 ? (
              <Card>
                <CardContent className="py-10 text-center">
                  <Lightbulb className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p
                    className="text-muted-foreground"
                    data-ocid="insights.suggestions_empty_state"
                  >
                    {t(
                      "No improvement suggestions yet",
                      "Hakuna mapendekezo ya uboreshaji bado",
                    )}
                  </p>
                </CardContent>
              </Card>
            ) : (
              (suggestions ?? []).map((s, idx) => (
                <Card
                  key={s.id.toString()}
                  data-ocid={`insights.suggestion.item.${idx + 1}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge
                            variant="outline"
                            className="text-xs capitalize"
                          >
                            {s.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(
                              Number(s.createdAt) / 1_000_000,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm">{s.suggestionText}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Add Suggestion Dialog */}
        <Dialog
          open={showSuggestionDialog}
          onOpenChange={setShowSuggestionDialog}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {t(
                  "Add Improvement Suggestion",
                  "Ongeza Pendekezo la Uboreshaji",
                )}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>{t("Category", "Aina")}</Label>
                <Select
                  value={suggestionCategory}
                  onValueChange={setSuggestionCategory}
                >
                  <SelectTrigger data-ocid="insights.suggestion_category_select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">
                      {t("General", "Jumla")}
                    </SelectItem>
                    <SelectItem value="crops">{t("Crops", "Mazao")}</SelectItem>
                    <SelectItem value="livestock">
                      {t("Livestock", "Mifugo")}
                    </SelectItem>
                    <SelectItem value="market">
                      {t("Market", "Soko")}
                    </SelectItem>
                    <SelectItem value="finance">
                      {t("Finance", "Fedha")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>{t("Suggestion", "Pendekezo")}</Label>
                <Textarea
                  value={suggestionText}
                  onChange={(e) => setSuggestionText(e.target.value)}
                  placeholder={t(
                    "Share your improvement idea...",
                    "Shiriki wazo lako la uboreshaji...",
                  )}
                  rows={4}
                  data-ocid="insights.suggestion_input"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowSuggestionDialog(false)}
                  data-ocid="insights.suggestion_cancel_button"
                >
                  {t("Cancel", "Ghairi")}
                </Button>
                <Button
                  onClick={() => addSuggestionMutation.mutate()}
                  disabled={!suggestionText || addSuggestionMutation.isPending}
                  data-ocid="insights.suggestion_submit_button"
                >
                  {addSuggestionMutation.isPending
                    ? t("Adding...", "Inaongeza...")
                    : t("Add Suggestion", "Ongeza Pendekezo")}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
