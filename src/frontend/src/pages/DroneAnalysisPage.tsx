import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthStore } from "@/store/authStore";
import { useLanguageStore } from "@/store/languageStore";
import {
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  CloudUpload,
  Cpu,
  FlaskConical,
  ImageIcon,
  Leaf,
  Satellite,
  ShieldAlert,
  Tractor,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

type Severity = "critical" | "high" | "medium" | "low";
type AnalysisType =
  | "crop_health"
  | "irrigation_coverage"
  | "grazing_conditions"
  | "disease_spread";
type ImageType = "drone" | "satellite";
type AnalysisStatus = "pending" | "processing" | "complete" | "failed";

interface AiInsight {
  category: string;
  finding: string;
  severity: Severity;
  recommendation: string;
}

interface DroneAnalysis {
  id: string;
  status: AnalysisStatus;
  imageType: ImageType;
  analysisDate: string;
  userId: string;
  aiInsights: AiInsight[];
  analysisType: AnalysisType;
  imageUrl?: string;
  overallHealthScore?: number;
  farmId?: string;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_PAST: DroneAnalysis[] = [
  {
    id: "da_01",
    status: "complete",
    imageType: "drone",
    analysisType: "crop_health",
    analysisDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    userId: "u1",
    overallHealthScore: 74,
    aiInsights: [
      {
        category: "Nitrogen Deficiency",
        finding:
          "Yellowing detected on approximately 18% of the maize canopy in the northern section.",
        severity: "medium",
        recommendation:
          "Apply urea-based fertiliser at 45 kg/ha within the next 7 days to correct the deficiency.",
      },
      {
        category: "Irrigation Coverage",
        finding:
          "Western corner shows dry soil patches indicating poor sprinkler reach.",
        severity: "low",
        recommendation:
          "Reposition the sprinkler head in the western corner by approximately 3 metres to achieve full coverage.",
      },
    ],
  },
  {
    id: "da_02",
    status: "complete",
    imageType: "satellite",
    analysisType: "disease_spread",
    analysisDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    userId: "u1",
    overallHealthScore: 56,
    aiInsights: [
      {
        category: "Fall Armyworm",
        finding:
          "Pest infestation signatures detected across 31% of the field, concentrated in the central rows.",
        severity: "high",
        recommendation:
          "Apply registered insecticide (e.g., Emamectin benzoate) immediately and monitor for 14 days.",
      },
      {
        category: "Leaf Blight",
        finding:
          "Fungal blight lesions visible on 12% of crop area, highest risk near the drainage canal.",
        severity: "critical",
        recommendation:
          "Apply systemic fungicide within 48 hours. Improve drainage around the canal perimeter to reduce humidity.",
      },
      {
        category: "Soil Moisture",
        finding:
          "Moisture distribution is uneven but within acceptable range overall.",
        severity: "low",
        recommendation:
          "Continue current irrigation schedule. Re-evaluate after next rainfall event.",
      },
    ],
  },
  {
    id: "da_03",
    status: "complete",
    imageType: "drone",
    analysisType: "grazing_conditions",
    analysisDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    userId: "u1",
    overallHealthScore: 88,
    aiInsights: [
      {
        category: "Pasture Coverage",
        finding:
          "Grass coverage is dense and uniform across 92% of the grazing zone.",
        severity: "low",
        recommendation:
          "Rotate livestock to the eastern paddock next week to allow western pasture to recover.",
      },
    ],
  },
];

const SEVERITY_COLORS: Record<Severity, string> = {
  critical: "bg-red-100 text-red-700 border-red-200",
  high: "bg-orange-100 text-orange-700 border-orange-200",
  medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
  low: "bg-green-100 text-green-700 border-green-200",
};

const ANALYSIS_TYPE_ICONS: Record<AnalysisType, React.ReactNode> = {
  crop_health: <Leaf className="w-3.5 h-3.5" />,
  irrigation_coverage: <FlaskConical className="w-3.5 h-3.5" />,
  grazing_conditions: <Tractor className="w-3.5 h-3.5" />,
  disease_spread: <ShieldAlert className="w-3.5 h-3.5" />,
};

// ─── Health score ring ────────────────────────────────────────────────────────

function HealthRing({ score }: { score: number }) {
  const r = 38;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = score >= 75 ? "#16a34a" : score >= 50 ? "#d97706" : "#dc2626";
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="100" height="100" viewBox="0 0 100 100" role="img">
        <title>Health Score</title>
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
        <text
          x="50"
          y="54"
          textAnchor="middle"
          fontSize="22"
          fontWeight="bold"
          fill={color}
        >
          {score}
        </text>
      </svg>
    </div>
  );
}

// ─── Insight card ─────────────────────────────────────────────────────────────

function InsightCard({
  insight,
  language,
}: {
  insight: AiInsight;
  language: string;
}) {
  const lbl = (en: string, sw: string) => (language === "sw" ? sw : en);
  return (
    <div className="bg-card border border-border rounded-xl p-3.5 space-y-1.5">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span className="text-xs font-semibold text-foreground">
          {insight.category}
        </span>
        <Badge
          variant="outline"
          className={`text-[10px] px-1.5 py-0 ${SEVERITY_COLORS[insight.severity]}`}
        >
          {lbl(
            insight.severity.charAt(0).toUpperCase() +
              insight.severity.slice(1),
            insight.severity === "critical"
              ? "Muhimu Sana"
              : insight.severity === "high"
                ? "Juu"
                : insight.severity === "medium"
                  ? "Wastani"
                  : "Chini",
          )}
        </Badge>
      </div>
      <p className="text-[11px] text-muted-foreground leading-relaxed">
        <span className="font-medium text-foreground">
          {lbl("Finding:", "Matokeo:")}{" "}
        </span>
        {insight.finding}
      </p>
      <p className="text-[11px] text-primary leading-relaxed">
        <span className="font-medium">
          {lbl("Recommendation:", "Pendekezo:")}{" "}
        </span>
        {insight.recommendation}
      </p>
    </div>
  );
}

// ─── Past analysis card ───────────────────────────────────────────────────────

function PastAnalysisCard({
  analysis,
  language,
  index,
}: {
  analysis: DroneAnalysis;
  language: string;
  index: number;
}) {
  const lbl = (en: string, sw: string) => (language === "sw" ? sw : en);
  const [expanded, setExpanded] = useState(false);

  const analysisTypeLabel: Record<AnalysisType, string> = {
    crop_health: lbl("Crop Health", "Afya ya Mazao"),
    irrigation_coverage: lbl("Irrigation Coverage", "Umwagiliaji"),
    grazing_conditions: lbl("Grazing Conditions", "Hali ya Malisho"),
    disease_spread: lbl("Disease Spread", "Kuenea kwa Magonjwa"),
  };

  return (
    <div
      className="bg-card border border-border rounded-xl overflow-hidden"
      data-ocid={`drone.past_analyses.item.${index}`}
    >
      <button
        type="button"
        className="w-full p-3.5 flex items-center gap-3 text-left hover:bg-muted/30 transition-colors"
        onClick={() => setExpanded((p) => !p)}
        data-ocid={`drone.past_analyses.expand_button.${index}`}
      >
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          {analysis.imageType === "satellite" ? (
            <Satellite className="w-4 h-4 text-primary" />
          ) : (
            <CloudUpload className="w-4 h-4 text-primary" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-semibold text-foreground">
              {analysisTypeLabel[analysis.analysisType]}
            </span>
            <Badge variant="outline" className="text-[10px] px-1.5 py-0">
              {analysis.imageType === "drone"
                ? lbl("Drone", "Ndege")
                : lbl("Satellite", "Setilaiti")}
            </Badge>
          </div>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            {new Date(analysis.analysisDate).toLocaleDateString(
              language === "sw" ? "sw-TZ" : "en-TZ",
              { day: "numeric", month: "short", year: "numeric" },
            )}
          </p>
        </div>
        {analysis.overallHealthScore !== undefined && (
          <div className="text-right flex-shrink-0">
            <span
              className={`text-sm font-bold ${
                analysis.overallHealthScore >= 75
                  ? "text-green-600"
                  : analysis.overallHealthScore >= 50
                    ? "text-amber-600"
                    : "text-red-600"
              }`}
            >
              {analysis.overallHealthScore}
            </span>
            <p className="text-[10px] text-muted-foreground">
              {lbl("score", "alama")}
            </p>
          </div>
        )}
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        )}
      </button>
      {expanded && (
        <div className="border-t border-border p-3 space-y-2">
          {analysis.aiInsights.map((ins) => (
            <InsightCard
              key={`${ins.category}-${ins.finding.slice(0, 10)}`}
              insight={ins}
              language={language}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function DroneAnalysisPage() {
  const { user } = useAuthStore();
  const { language } = useLanguageStore();
  const lbl = (en: string, sw: string) => (language === "sw" ? sw : en);

  const fileRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageType, setImageType] = useState<ImageType>("drone");
  const [analysisType, setAnalysisType] = useState<AnalysisType>("crop_health");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<DroneAnalysis | null>(null);
  const [pastAnalyses, setPastAnalyses] = useState<DroneAnalysis[]>(MOCK_PAST);

  // Role guard
  const allowedRoles = ["farmer", "livestock_keeper"];
  if (user && !allowedRoles.includes(user.role)) {
    return (
      <Layout>
        <div className="px-4 py-10 max-w-md mx-auto flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
          <h1 className="text-lg font-semibold text-foreground text-center">
            {lbl("Access Restricted", "Ufikiaji Umezuiwa")}
          </h1>
          <p className="text-sm text-muted-foreground text-center">
            {lbl(
              "Drone & Satellite Analysis is available for Farmers and Livestock Keepers only.",
              "Uchambuzi wa Ndege na Setilaiti unapatikana kwa Wakulima na Wafugaji pekee.",
            )}
          </p>
        </div>
      </Layout>
    );
  }

  async function handleSubmit() {
    if (!selectedFile) return;
    setAnalyzing(true);
    setResult(null);
    // Simulate AI analysis
    await new Promise((res) => setTimeout(res, 2000));
    const mockResult: DroneAnalysis = {
      id: `da_${Date.now()}`,
      status: "complete",
      imageType,
      analysisType,
      analysisDate: new Date().toISOString(),
      userId: user?.id ?? "u1",
      overallHealthScore: Math.floor(Math.random() * 30) + 60,
      aiInsights: [
        {
          category:
            analysisType === "crop_health"
              ? lbl("Canopy Coverage", "Mfuniko wa Mazao")
              : analysisType === "irrigation_coverage"
                ? lbl("Water Distribution", "Usambazaji wa Maji")
                : analysisType === "grazing_conditions"
                  ? lbl("Pasture Quality", "Ubora wa Malisho")
                  : lbl("Pathogen Detection", "Ugunduzi wa Vimelea"),
          finding: lbl(
            "AI analysis detected moderate variation across the scanned area. Overall conditions appear stable with localised areas of concern requiring attention.",
            "Uchambuzi wa AI uligundua tofauti ya wastani katika eneo lililochunguzwa. Hali ya jumla inaonekana thabiti na maeneo fulani yanayohitaji uangalifu.",
          ),
          severity: "medium",
          recommendation: lbl(
            "Monitor the flagged area over the next 7 days and re-scan if conditions worsen. Consider targeted intervention in high-risk zones.",
            "Fuatilia eneo lililoorodheshwa kwa siku 7 zijazo na upige picha tena ikiwa hali itazidi kuwa mbaya. Fikiria hatua maalum katika maeneo yenye hatari kubwa.",
          ),
        },
        {
          category: lbl("Boundary Assessment", "Tathmini ya Mipaka"),
          finding: lbl(
            "Field edges show no signs of encroachment or structural damage. Perimeter vegetation appears healthy.",
            "Mipaka ya shamba haonyeshi dalili za uvamizi au uharibifu wa kimuundo. Mimea ya mipaka inaonekana yenye afya.",
          ),
          severity: "low",
          recommendation: lbl(
            "No immediate action required. Maintain regular boundary checks every 30 days.",
            "Hakuna hatua ya haraka inayohitajika. Endelea na ukaguzi wa kawaida wa mipaka kila siku 30.",
          ),
        },
      ],
    };
    setResult(mockResult);
    setPastAnalyses((prev) => [mockResult, ...prev]);
    setAnalyzing(false);
    toast.success(lbl("Analysis complete!", "Uchambuzi umekamilika!"));
  }

  const analysisTypeOptions: { value: AnalysisType; label: string }[] = [
    { value: "crop_health", label: lbl("Crop Health", "Afya ya Mazao") },
    {
      value: "irrigation_coverage",
      label: lbl("Irrigation Coverage", "Umwagiliaji"),
    },
    {
      value: "grazing_conditions",
      label: lbl("Grazing Conditions", "Hali ya Malisho"),
    },
    {
      value: "disease_spread",
      label: lbl("Disease Spread", "Kuenea kwa Magonjwa"),
    },
  ];

  return (
    <Layout>
      <div className="px-4 py-4 space-y-5 max-w-md mx-auto">
        {/* Header */}
        <div
          className="bg-gradient-to-r from-violet-600 to-indigo-600 p-5 rounded-xl"
          data-ocid="drone.page"
        >
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
              <Satellite className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-display font-bold text-white">
                {lbl(
                  "Drone & Satellite Analysis",
                  "Uchambuzi wa Ndege na Setilaiti",
                )}
              </h1>
              <p className="text-xs text-white/80">
                {lbl(
                  "AI-powered image analysis for your farm",
                  "Uchambuzi wa picha kwa AI kwa shamba lako",
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Upload section */}
        <section
          className="bg-card border border-border rounded-xl p-4 space-y-4"
          data-ocid="drone.upload_section"
        >
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
            <CloudUpload className="w-4 h-4 text-primary" />
            {lbl("Upload Image for Analysis", "Pakia Picha kwa Uchambuzi")}
          </h2>

          {/* File picker */}
          <div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              data-ocid="drone.upload_button"
              className="w-full border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center gap-2 hover:border-primary/50 hover:bg-primary/5 transition-colors"
            >
              <ImageIcon className="w-8 h-8 text-muted-foreground/50" />
              {selectedFile ? (
                <p className="text-sm font-medium text-primary truncate max-w-full px-2">
                  {selectedFile.name}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {lbl(
                    "Click to select an image file",
                    "Bonyeza kuchagua faili la picha",
                  )}
                </p>
              )}
              <p className="text-[10px] text-muted-foreground/70">
                {lbl(
                  "Drone or satellite images supported",
                  "Picha za ndege au setilaiti zinakubaliwa",
                )}
              </p>
            </button>
          </div>

          {/* Image type */}
          <div>
            <Label className="text-xs mb-1 block">
              {lbl("Image Type", "Aina ya Picha")}
            </Label>
            <Select
              value={imageType}
              onValueChange={(v) => setImageType(v as ImageType)}
            >
              <SelectTrigger data-ocid="drone.image_type_select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="drone">
                  {lbl("Drone Image", "Picha ya Ndege")}
                </SelectItem>
                <SelectItem value="satellite">
                  {lbl("Satellite Image", "Picha ya Setilaiti")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Analysis type */}
          <div>
            <Label className="text-xs mb-1 block">
              {lbl("Analysis Type", "Aina ya Uchambuzi")}
            </Label>
            <Select
              value={analysisType}
              onValueChange={(v) => setAnalysisType(v as AnalysisType)}
            >
              <SelectTrigger data-ocid="drone.analysis_type_select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {analysisTypeOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    <span className="flex items-center gap-1.5">
                      {ANALYSIS_TYPE_ICONS[opt.value]}
                      {opt.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Submit */}
          <Button
            className="w-full bg-violet-600 hover:bg-violet-700 text-white gap-2"
            disabled={!selectedFile || analyzing}
            onClick={handleSubmit}
            data-ocid="drone.submit_button"
          >
            {analyzing ? (
              <>
                <Cpu className="w-4 h-4 animate-pulse" />
                {lbl("Analyzing...", "Inachambua...")}
              </>
            ) : (
              <>
                <Satellite className="w-4 h-4" />
                {lbl("Submit for Analysis", "Wasilisha kwa Uchambuzi")}
              </>
            )}
          </Button>
        </section>

        {/* Results section */}
        {result && (
          <section
            className="bg-card border border-border rounded-xl p-4 space-y-4"
            data-ocid="drone.results_section"
          >
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-violet-600" />
              {lbl("Analysis Results", "Matokeo ya Uchambuzi")}
            </h2>

            {result.overallHealthScore !== undefined && (
              <div className="flex flex-col items-center gap-1">
                <HealthRing score={result.overallHealthScore} />
                <p className="text-xs text-muted-foreground">
                  {lbl("Overall Health Score", "Alama ya Afya ya Jumla")}
                </p>
              </div>
            )}

            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                {lbl("AI Insights", "Maarifa ya AI")} (
                {result.aiInsights.length})
              </h3>
              {result.aiInsights.map((ins) => (
                <InsightCard
                  key={`${ins.category}-${ins.finding.slice(0, 10)}-result`}
                  insight={ins}
                  language={language}
                />
              ))}
            </div>
          </section>
        )}

        {/* Past analyses */}
        <section data-ocid="drone.past_analyses_section">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-1.5 mb-2">
            <ImageIcon className="w-4 h-4 text-primary" />
            {lbl("Past Analyses", "Uchambuzi wa Awali")}
          </h2>

          {pastAnalyses.length === 0 ? (
            <div
              className="bg-card border border-border rounded-xl p-8 text-center"
              data-ocid="drone.past_analyses.empty_state"
            >
              <Satellite className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                {lbl(
                  "No analyses yet. Upload an image to get started.",
                  "Hakuna uchambuzi bado. Pakia picha kuanza.",
                )}
              </p>
            </div>
          ) : (
            <div className="space-y-2" data-ocid="drone.past_analyses.list">
              {pastAnalyses.map((a, i) => (
                <PastAnalysisCard
                  key={a.id}
                  analysis={a}
                  language={language}
                  index={i + 1}
                />
              ))}
            </div>
          )}
        </section>

        <div className="text-center text-xs text-muted-foreground pt-2 pb-4">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            className="hover:text-primary"
            target="_blank"
            rel="noreferrer"
          >
            caffeine.ai
          </a>
        </div>
      </div>
    </Layout>
  );
}
