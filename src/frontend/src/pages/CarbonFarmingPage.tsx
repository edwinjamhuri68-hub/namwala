import type {
  CarbonCertification,
  CarbonPractice,
  PracticeType__1,
} from "@/backend";
import { CertificationLevel } from "@/backend";
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
import { Award, Leaf, Plus, TrendingUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const PRACTICE_TYPES: Record<string, string> = {
  soilConservation: "Soil Conservation",
  waterManagement: "Water Management",
  composting: "Composting",
  treePlanting: "Tree Planting",
  sustainableGrazing: "Sustainable Grazing",
  ecoPesticide: "Eco Pesticide",
};
const PRACTICE_TYPES_SW: Record<string, string> = {
  soilConservation: "Kuhifadhi Udongo",
  waterManagement: "Kusimamia Maji",
  composting: "Mboji",
  treePlanting: "Kupanda Miti",
  sustainableGrazing: "Malisho Endelevu",
  ecoPesticide: "Dawa ya Mazingira",
};

const CERT_THRESHOLDS: Record<string, number> = {
  soilSteward: 50,
  waterGuardian: 100,
  carbonChampion: 250,
};

const CERT_COLORS: Record<CertificationLevel, string> = {
  [CertificationLevel.soilSteward]:
    "bg-amber-100 text-amber-800 border-amber-300",
  [CertificationLevel.waterGuardian]:
    "bg-blue-100 text-blue-800 border-blue-300",
  [CertificationLevel.carbonChampion]:
    "bg-green-100 text-green-800 border-green-300",
};

export default function CarbonFarmingPage() {
  const { language } = useLanguageStore();
  const t = (en: string, sw: string) => (language === "sw" ? sw : en);
  const { actor } = useBackend();
  const qc = useQueryClient();

  const [showLogDialog, setShowLogDialog] = useState(false);
  const [practiceType, setPracticeType] = useState("soilConservation");
  const [practiceDesc, setPracticeDesc] = useState("");
  const [practiceDate, setPracticeDate] = useState("");
  const [carbonImpact, setCarbonImpact] = useState("");

  const { data: points, isLoading: pointsLoading } = useQuery<bigint>({
    queryKey: ["carbonPoints"],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getMyCarbonPoints();
    },
    enabled: !!actor,
  });

  const { data: certifications } = useQuery<CarbonCertification[]>({
    queryKey: ["carbonCerts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyCarbonCertifications();
    },
    enabled: !!actor,
  });

  const { data: practices, isLoading: practicesLoading } = useQuery<
    CarbonPractice[]
  >({
    queryKey: ["carbonPractices"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyCarbonPractices();
    },
    enabled: !!actor,
  });

  const logMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const pt = { [practiceType]: null } as unknown as PracticeType__1;
      const dateTs =
        BigInt(new Date(practiceDate).getTime()) * BigInt(1_000_000);
      const impactKg = BigInt(Math.round(Number.parseFloat(carbonImpact) || 0));
      return actor.logCarbonPractice(pt, practiceDesc, dateTs, impactKg);
    },
    onSuccess: () => {
      toast.success(t("Practice logged!", "Mazoea yamerekodiwa!"));
      qc.invalidateQueries({ queryKey: ["carbonPractices"] });
      qc.invalidateQueries({ queryKey: ["carbonPoints"] });
      qc.invalidateQueries({ queryKey: ["carbonCerts"] });
      setShowLogDialog(false);
      setPracticeDesc("");
      setPracticeDate("");
      setCarbonImpact("");
    },
    onError: () =>
      toast.error(t("Failed to log practice", "Imeshindwa kurekodi mazoea")),
  });

  const getPracticeLabel = (pt: PracticeType__1) => {
    const key = Object.keys(pt)[0];
    return language === "sw"
      ? (PRACTICE_TYPES_SW[key] ?? key)
      : (PRACTICE_TYPES[key] ?? key);
  };

  const totalPoints = Number(points ?? 0);
  const nextCert =
    totalPoints < 50
      ? {
          name: t("Soil Steward", "Mlindaji wa Udongo"),
          needed: 50 - totalPoints,
        }
      : totalPoints < 100
        ? {
            name: t("Water Guardian", "Mlindaji wa Maji"),
            needed: 100 - totalPoints,
          }
        : totalPoints < 250
          ? {
              name: t("Carbon Champion", "Bingwa wa Kaboni"),
              needed: 250 - totalPoints,
            }
          : null;

  const progressToNext = nextCert
    ? (totalPoints /
        CERT_THRESHOLDS[
          Object.keys(CERT_THRESHOLDS)[certifications?.length ?? 0] ??
            "soilSteward"
        ]) *
      100
    : 100;

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {t("Carbon Farming Rewards", "Tuzo za Kilimo cha Kaboni")}
            </h1>
            <p className="text-muted-foreground">
              {t(
                "Log sustainable practices and earn certification",
                "Rekodi mazoea endelevu na pata cheti",
              )}
            </p>
          </div>
          <Button
            onClick={() => setShowLogDialog(true)}
            data-ocid="carbon.log_button"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t("Log Practice", "Rekodi Mazoea")}
          </Button>
        </div>

        {/* Points overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="md:col-span-1">
            <CardContent className="p-6 text-center">
              {pointsLoading ? (
                <Skeleton className="h-16 w-24 mx-auto" />
              ) : (
                <>
                  <p className="text-5xl font-bold text-primary">
                    {totalPoints.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t("Carbon Points", "Pointi za Kaboni")}
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                {t(
                  "Progress to Next Certification",
                  "Maendeleo ya Cheti Kinachofuata",
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {nextCert ? (
                <>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-foreground">
                      {t("Next:", "Kinachofuata:")}{" "}
                      <strong>{nextCert.name}</strong>
                    </span>
                    <span className="text-muted-foreground">
                      {nextCert.needed} {t("pts needed", "pointi zinahitajika")}
                    </span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${Math.min(progressToNext, 100)}%` }}
                    />
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    {t("Certification Levels:", "Viwango vya Cheti:")}&nbsp;
                    <span className="text-amber-600">
                      {t("Soil Steward", "Mlindaji wa Udongo")} (50)
                    </span>{" "}
                    →&nbsp;
                    <span className="text-blue-600">
                      {t("Water Guardian", "Mlindaji wa Maji")} (100)
                    </span>{" "}
                    →&nbsp;
                    <span className="text-green-600">
                      {t("Carbon Champion", "Bingwa wa Kaboni")} (250)
                    </span>
                  </div>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {t(
                    "You have reached the highest certification level!",
                    "Umefika kiwango cha juu cha cheti!",
                  )}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Certifications */}
        {(certifications ?? []).length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-3">
              {t("Earned Certifications", "Vyeti Vilivyopatikana")}
            </h2>
            <div className="flex flex-wrap gap-3">
              {(certifications ?? []).map((cert) => (
                <div
                  key={cert.id.toString()}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium ${CERT_COLORS[cert.level]}`}
                  data-ocid="carbon.certification"
                >
                  <Award className="w-4 h-4" />
                  {cert.level === CertificationLevel.soilSteward &&
                    t("Soil Steward", "Mlindaji wa Udongo")}
                  {cert.level === CertificationLevel.waterGuardian &&
                    t("Water Guardian", "Mlindaji wa Maji")}
                  {cert.level === CertificationLevel.carbonChampion &&
                    t("Carbon Champion", "Bingwa wa Kaboni")}
                  <span className="text-xs opacity-75">
                    ({Number(cert.totalPoints)} pts)
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Practices list */}
        <div>
          <h2 className="text-lg font-semibold mb-3">
            {t("My Practices", "Mazoea Yangu")}
          </h2>
          {practicesLoading ? (
            <div className="space-y-3">
              {["s0", "s1", "s2"].map((k) => (
                <Skeleton key={k} className="h-24 w-full rounded-lg" />
              ))}
            </div>
          ) : (practices ?? []).length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Leaf className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p
                  className="text-muted-foreground"
                  data-ocid="carbon.empty_state"
                >
                  {t(
                    "No practices logged yet",
                    "Hakuna mazoea yaliyorekodiwa bado",
                  )}
                </p>
                <Button className="mt-4" onClick={() => setShowLogDialog(true)}>
                  {t("Log Your First Practice", "Rekodi Mazoea Yako ya Kwanza")}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {(practices ?? []).map((p, idx) => (
                <Card
                  key={p.id.toString()}
                  data-ocid={`carbon.practice.item.${idx + 1}`}
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <Badge variant="secondary">
                            {getPracticeLabel(p.practiceType)}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(
                              Number(p.dateLogged) / 1_000_000,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm line-clamp-2">{p.description}</p>
                      </div>
                      <div className="flex items-center gap-4 shrink-0">
                        <div className="text-center">
                          <p className="text-sm font-bold text-primary">
                            {Number(p.carbonImpactKg)} kg
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {t("CO₂ saved", "CO₂ iliyookoka")}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-bold text-foreground flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />+
                            {Number(p.pointsAwarded)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {t("points", "pointi")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Log Practice Dialog */}
        <Dialog open={showLogDialog} onOpenChange={setShowLogDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {t("Log Sustainable Practice", "Rekodi Mazoea Endelevu")}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>{t("Practice Type", "Aina ya Mazoea")}</Label>
                <Select value={practiceType} onValueChange={setPracticeType}>
                  <SelectTrigger data-ocid="carbon.practice_type_select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(PRACTICE_TYPES).map(([k, v]) => (
                      <SelectItem key={k} value={k}>
                        {language === "sw" ? PRACTICE_TYPES_SW[k] : v}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>{t("Description", "Maelezo")}</Label>
                <Textarea
                  value={practiceDesc}
                  onChange={(e) => setPracticeDesc(e.target.value)}
                  placeholder={t(
                    "Describe what you did...",
                    "Elezea ulichofanya...",
                  )}
                  data-ocid="carbon.description_input"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>{t("Date", "Tarehe")}</Label>
                  <Input
                    type="date"
                    value={practiceDate}
                    onChange={(e) => setPracticeDate(e.target.value)}
                    data-ocid="carbon.date_input"
                  />
                </div>
                <div>
                  <Label>
                    {t("Carbon Impact (kg CO₂)", "Athari ya Kaboni (kg CO₂)")}
                  </Label>
                  <Input
                    type="number"
                    value={carbonImpact}
                    onChange={(e) => setCarbonImpact(e.target.value)}
                    placeholder="50"
                    data-ocid="carbon.impact_input"
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowLogDialog(false)}
                  data-ocid="carbon.cancel_button"
                >
                  {t("Cancel", "Ghairi")}
                </Button>
                <Button
                  onClick={() => logMutation.mutate()}
                  disabled={
                    !practiceDesc ||
                    !practiceDate ||
                    !carbonImpact ||
                    logMutation.isPending
                  }
                  data-ocid="carbon.submit_button"
                >
                  {logMutation.isPending
                    ? t("Logging...", "Inarekodia...")
                    : t("Log Practice", "Rekodi Mazoea")}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
