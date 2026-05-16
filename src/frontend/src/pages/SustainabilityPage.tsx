import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/store/languageStore";
import type { SustainabilityRecord } from "@/types";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Leaf,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";

type PracticeType =
  | "Drip Irrigation"
  | "Organic Fertilizer"
  | "Crop Rotation"
  | "Composting"
  | "Water Harvesting"
  | "Agroforestry"
  | "Integrated Pest Management"
  | "Other";

const PRACTICE_IMPACT: Record<PracticeType, number> = {
  "Drip Irrigation": 9,
  "Organic Fertilizer": 8,
  "Crop Rotation": 9,
  Composting: 8,
  "Water Harvesting": 7,
  Agroforestry: 10,
  "Integrated Pest Management": 8,
  Other: 5,
};

const PRACTICE_COLORS: Record<PracticeType, string> = {
  "Drip Irrigation": "bg-sky-100 text-sky-700",
  "Organic Fertilizer": "bg-lime-100 text-lime-700",
  "Crop Rotation": "bg-emerald-100 text-emerald-700",
  Composting: "bg-amber-100 text-amber-700",
  "Water Harvesting": "bg-blue-100 text-blue-700",
  Agroforestry: "bg-green-100 text-green-700",
  "Integrated Pest Management": "bg-orange-100 text-orange-700",
  Other: "bg-muted text-muted-foreground",
};

const INITIAL_PRACTICES: SustainabilityRecord[] = [
  {
    id: "s1",
    userId: "u1",
    practice: "Crop Rotation",
    date: "2026-04-15",
    impactScore: 9,
    notes: "Rotated maize with legumes to restore soil nitrogen.",
    createdAt: "2026-04-15",
  },
  {
    id: "s2",
    userId: "u1",
    practice: "Composting",
    date: "2026-03-20",
    impactScore: 8,
    notes: "Made compost from crop residues and animal manure.",
    createdAt: "2026-03-20",
  },
  {
    id: "s3",
    userId: "u1",
    practice: "Drip Irrigation",
    date: "2026-02-10",
    impactScore: 9,
    notes:
      "Installed drip lines across the north field to cut water use by 40%.",
    createdAt: "2026-02-10",
  },
];

interface EducationCard {
  id: string;
  titleEn: string;
  titleSw: string;
  summaryEn: string;
  summarySw: string;
  bodyEn: string;
  bodySw: string;
  icon: string;
}

const EDUCATION: EducationCard[] = [
  {
    id: "e1",
    titleEn: "Soil Conservation",
    titleSw: "Uhifadhi wa Udongo",
    summaryEn: "Protect topsoil to maintain long-term farm productivity.",
    summarySw:
      "Linda tabaka la juu la udongo ili kudumisha tija ya shamba kwa muda mrefu.",
    bodyEn:
      "Soil erosion is one of the biggest threats to Tanzanian agriculture. Techniques such as contour farming, cover cropping, and minimum tillage help prevent topsoil loss. Keeping soil covered with organic matter improves water retention and reduces the need for chemical inputs. Even small actions like leaving crop residues on the field after harvest can make a significant difference over multiple seasons.",
    bodySw:
      "Mmomonyoko wa udongo ni mojawapo ya vitisho vikubwa kwa kilimo cha Tanzania. Mbinu kama vile kilimo cha kupanda kwa mistari ya ngazi, kupanda mazao ya kufunika, na kulima kidogo husaidia kuzuia upotevu wa tabaka la juu la udongo. Kuweka udongo ukifunikwa na viumbe hai huboresha uhifadhi wa maji na kupunguza haja ya pembejeo za kemikali.",
    icon: "🌱",
  },
  {
    id: "e2",
    titleEn: "Water Management",
    titleSw: "Usimamizi wa Maji",
    summaryEn: "Use water wisely to sustain crops through dry seasons.",
    summarySw:
      "Tumia maji kwa busara ili kudumisha mazao katika kipindi cha ukame.",
    bodyEn:
      "Water scarcity is increasing across Tanzania due to climate change. Drip irrigation can reduce water use by up to 50% compared to flood irrigation. Rainwater harvesting — collecting runoff from roofs or catchment pits — can provide a critical buffer during dry spells. Mulching around plants reduces evaporation from the soil surface. Scheduling irrigation during the cooler parts of the day also cuts water loss significantly.",
    bodySw:
      "Uhaba wa maji unaongezeka Tanzania nzima kutokana na mabadiliko ya tabianchi. Umwagiliaji wa tone unaweza kupunguza matumizi ya maji kwa hadi 50% ikilinganishwa na umwagiliaji wa mafuriko. Uvunaji wa maji ya mvua — kukusanya maji ya mvua kutoka mapaa au mashimo ya kukusanyia — unaweza kutoa akiba muhimu wakati wa ukame.",
    icon: "💧",
  },
  {
    id: "e3",
    titleEn: "Organic Fertilizer",
    titleSw: "Mbolea ya Asili",
    summaryEn: "Feed your soil naturally for healthier, cheaper harvests.",
    summarySw:
      "Lisa udongo wako kwa njia ya asili kwa mavuno ya afya na ya bei nafuu.",
    bodyEn:
      "Compost, manure, and green manure are powerful alternatives to costly chemical fertilizers. They improve soil structure, increase microbial activity, and release nutrients slowly — exactly when plants need them. Composting crop waste and kitchen scraps takes as little as 6–8 weeks and can fully replace chemical fertilizers for many smallholder farms. Vermicomposting (using earthworms) produces an even richer amendment in the same timeframe.",
    bodySw:
      "Mboji, samadi, na mbolea ya kijani ni mbadala mzuri wa mbolea za kemikali zenye gharama kubwa. Zinaboresha muundo wa udongo, kuongeza shughuli za viumbe hai, na kutoa virutubisho polepole — hasa wakati mimea inahitaji. Kutengeneza mboji kutoka kwa taka za mazao na jikoni inachukua wiki 6–8 tu na inaweza kubadilisha kabisa mbolea za kemikali kwa mashamba mengi madogo.",
    icon: "♻️",
  },
  {
    id: "e4",
    titleEn: "Sustainable Grazing",
    titleSw: "Malisho ya Endelevu",
    summaryEn: "Rotate your livestock to keep pastures healthy year-round.",
    summarySw:
      "Zungusha mifugo yako ili kulinda malisho kuwa na afya mwaka mzima.",
    bodyEn:
      "Overgrazing is a leading cause of land degradation in Tanzania's pastoral areas. Rotational grazing divides land into paddocks, allowing each section to recover before being grazed again. This maintains grass cover, prevents erosion, and actually increases the carrying capacity of the land over time. Rest periods of 4–6 weeks are typically sufficient for most grasses to regenerate fully. Fencing is not always necessary — temporary herding boundaries work equally well.",
    bodySw:
      "Malisho kupita kiasi ni sababu kuu ya uharibifu wa ardhi katika maeneo ya ufugaji Tanzania. Malisho ya kuzungushwa hugawanya ardhi katika mabanda, kuruhusu kila sehemu kupumzika kabla ya kuchunga tena. Hii hudumisha mfunika wa nyasi, kuzuia mmomonyoko, na kuongeza uwezo wa kubeba mifugo kwa muda mrefu.",
    icon: "🐄",
  },
  {
    id: "e5",
    titleEn: "Crop Rotation",
    titleSw: "Mzunguko wa Mazao",
    summaryEn: "Alternate crops each season to boost yields and reduce pests.",
    summarySw:
      "Badilisha mazao kila msimu ili kuongeza mavuno na kupunguza wadudu.",
    bodyEn:
      "Planting the same crop in the same field season after season depletes specific nutrients and allows pests and diseases to build up in the soil. Rotating between cereal crops (maize, sorghum) and legumes (beans, groundnuts) naturally restores nitrogen to the soil and breaks pest cycles. A simple two-year rotation — maize followed by beans — can increase yields by 15–25% without any additional inputs. Three-year rotations with a fallow or cover crop year are even more effective.",
    bodySw:
      "Kupanda zao moja moja baada ya nyingine katika shamba moja msimu baada ya msimu hupunguza virutubisho maalum na kuruhusu wadudu na magonjwa kukua kwenye udongo. Kuzungusha kati ya mazao ya nafaka (mahindi, mtama) na mikunde (maharagwe, karanga) hurudisha nitrojeni kwa asili na kuvunja mzunguko wa wadudu. Mzunguko rahisi wa miaka miwili — mahindi ikifuatwa na maharagwe — unaweza kuongeza mavuno kwa 15–25% bila pembejeo yoyote ya ziada.",
    icon: "🔄",
  },
];

export default function SustainabilityPage() {
  const { t, language } = useLanguageStore();
  const [practices, setPractices] =
    useState<SustainabilityRecord[]>(INITIAL_PRACTICES);
  const [showModal, setShowModal] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  // Form state
  const [formPractice, setFormPractice] =
    useState<PracticeType>("Crop Rotation");
  const [formDesc, setFormDesc] = useState("");
  const [formDate, setFormDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const totalScore =
    practices.length > 0
      ? Math.min(
          100,
          Math.round(
            (practices.reduce((sum, p) => sum + p.impactScore, 0) /
              (practices.length * 10)) *
              100,
          ),
        )
      : 0;

  const scoreColor =
    totalScore >= 80
      ? "text-emerald-600"
      : totalScore >= 50
        ? "text-amber-500"
        : "text-red-500";
  const trackColor =
    totalScore >= 80 ? "#10b981" : totalScore >= 50 ? "#f59e0b" : "#ef4444";

  function handleAddPractice() {
    if (!formDate) return;
    const rec: SustainabilityRecord = {
      id: `s${Date.now()}`,
      userId: "u1",
      practice: formPractice,
      date: formDate,
      impactScore: PRACTICE_IMPACT[formPractice],
      notes: formDesc || undefined,
      createdAt: new Date().toISOString(),
    };
    setPractices((prev) => [rec, ...prev]);
    setShowModal(false);
    setFormDesc("");
    setFormDate(new Date().toISOString().split("T")[0]);
    setFormPractice("Crop Rotation");
  }

  function handleDelete(id: string) {
    setPractices((prev) => prev.filter((p) => p.id !== id));
  }

  const circumference = 2 * Math.PI * 44;
  const dashOffset = circumference - (totalScore / 100) * circumference;

  return (
    <Layout>
      <div
        className="min-h-screen bg-background"
        data-ocid="sustainability.page"
      >
        {/* Header */}
        <div className="bg-card border-b px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            <div className="flex items-center gap-2">
              <Leaf className="text-primary" size={22} />
              <h1 className="text-lg font-bold text-foreground">
                {t("sustainability")}
              </h1>
            </div>
            <Button
              size="sm"
              onClick={() => setShowModal(true)}
              data-ocid="sustainability.log_button"
            >
              <Plus size={16} className="mr-1" /> {t("log_practice")}
            </Button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-5 space-y-6">
          {/* Impact Score Card */}
          <div
            className="bg-card rounded-2xl border p-5 flex flex-col items-center gap-3"
            data-ocid="sustainability.impact_score"
          >
            <p className="text-sm font-semibold text-foreground">
              {t("impact_score")}
            </p>
            <div className="relative w-28 h-28">
              <svg
                className="w-28 h-28 -rotate-90"
                viewBox="0 0 100 100"
                role="img"
                aria-label="Impact score progress"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="10"
                  className="text-muted/30"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke={trackColor}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                  style={{ transition: "stroke-dashoffset 0.6s ease" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-3xl font-extrabold ${scoreColor}`}>
                  {totalScore}
                </span>
                <span className="text-[10px] text-muted-foreground">/100</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              {language === "sw"
                ? `Inategemea mazoea ${practices.length} yaliyorekodiwa`
                : `Based on ${practices.length} logged practice${practices.length !== 1 ? "s" : ""}`}
            </p>
          </div>

          {/* My Practices */}
          <section>
            <h2 className="text-sm font-bold text-foreground mb-3">
              {t("my_practices")}
            </h2>
            {practices.length === 0 ? (
              <div
                className="text-center py-12"
                data-ocid="sustainability.practices.empty_state"
              >
                <Leaf className="mx-auto text-muted-foreground/40" size={48} />
                <p className="text-muted-foreground mt-3">
                  {t("no_practices")}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {practices.map((p, i) => {
                  const color =
                    PRACTICE_COLORS[p.practice as PracticeType] ??
                    "bg-muted text-muted-foreground";
                  return (
                    <div
                      key={p.id}
                      className="bg-card rounded-xl border p-4"
                      data-ocid={`sustainability.practice.${i + 1}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <Badge className={`text-xs mb-1 border-0 ${color}`}>
                            {p.practice}
                          </Badge>
                          {p.notes && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {p.notes}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground mt-1">
                            {p.date}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="flex flex-col items-center">
                            <span className="text-[10px] text-muted-foreground">
                              {t("impact_score")}
                            </span>
                            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-sm font-bold text-primary">
                                +{p.impactScore}
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDelete(p.id)}
                            className="text-destructive hover:text-destructive/80 p-1"
                            aria-label={t("delete")}
                            data-ocid={`sustainability.delete_button.${i + 1}`}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Learn More Section */}
          <section>
            <h2 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <BookOpen size={16} className="text-primary" />
              {t("sustainability_tips")}
            </h2>
            <div className="space-y-3">
              {EDUCATION.map((card, i) => {
                const isExpanded = expandedCard === card.id;
                return (
                  <div
                    key={card.id}
                    className="bg-card rounded-xl border overflow-hidden"
                    data-ocid={`sustainability.content.${i + 1}`}
                  >
                    <button
                      type="button"
                      className="w-full text-left p-4"
                      onClick={() =>
                        setExpandedCard(isExpanded ? null : card.id)
                      }
                      data-ocid={`sustainability.learn_more.${i + 1}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-2xl" aria-hidden="true">
                            {card.icon}
                          </span>
                          <div className="min-w-0">
                            <p className="font-semibold text-foreground">
                              {language === "sw" ? card.titleSw : card.titleEn}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                              {language === "sw"
                                ? card.summarySw
                                : card.summaryEn}
                            </p>
                          </div>
                        </div>
                        {isExpanded ? (
                          <ChevronUp
                            size={16}
                            className="text-muted-foreground shrink-0"
                          />
                        ) : (
                          <ChevronDown
                            size={16}
                            className="text-muted-foreground shrink-0"
                          />
                        )}
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 border-t bg-muted/30">
                        <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                          {language === "sw" ? card.bodySw : card.bodyEn}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Log Practice Modal */}
        {showModal && (
          <div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
            data-ocid="sustainability.dialog"
          >
            <div className="bg-card w-full max-w-md rounded-t-2xl p-5 space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-foreground">
                  {t("log_practice")}
                </h3>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-muted-foreground"
                  data-ocid="sustainability.close_button"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Practice Type */}
              <div>
                <label
                  htmlFor="sustain-practice-select"
                  className="text-sm font-medium text-foreground block mb-1"
                >
                  {language === "sw" ? "Aina ya Mazoea" : "Practice Type"}
                </label>
                <select
                  id="sustain-practice-select"
                  value={formPractice}
                  onChange={(e) =>
                    setFormPractice(e.target.value as PracticeType)
                  }
                  className="w-full border border-input rounded-lg px-3 py-2 bg-background text-foreground text-sm"
                  data-ocid="sustainability.practice_type.select"
                >
                  {(
                    [
                      "Drip Irrigation",
                      "Organic Fertilizer",
                      "Crop Rotation",
                      "Composting",
                      "Water Harvesting",
                      "Agroforestry",
                      "Integrated Pest Management",
                      "Other",
                    ] as PracticeType[]
                  ).map((pt) => (
                    <option key={pt} value={pt}>
                      {pt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="sustain-desc-textarea"
                  className="text-sm font-medium text-foreground block mb-1"
                >
                  {language === "sw" ? "Maelezo" : "Description"}
                </label>
                <textarea
                  id="sustain-desc-textarea"
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  rows={3}
                  placeholder={
                    language === "sw"
                      ? "Elezea mazoea yako..."
                      : "Describe your practice..."
                  }
                  className="w-full border border-input rounded-lg px-3 py-2 bg-background text-foreground text-sm resize-none"
                  data-ocid="sustainability.description.textarea"
                />
              </div>

              {/* Date */}
              <div>
                <label
                  htmlFor="sustain-date-input"
                  className="text-sm font-medium text-foreground block mb-1"
                >
                  {language === "sw"
                    ? "Tarehe Iliyotekelezwa"
                    : "Date Implemented"}
                </label>
                <input
                  id="sustain-date-input"
                  type="date"
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                  className="w-full border border-input rounded-lg px-3 py-2 bg-background text-foreground text-sm"
                  data-ocid="sustainability.date.input"
                />
              </div>

              {/* Impact Preview */}
              <div className="bg-primary/5 rounded-xl p-3 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {language === "sw"
                    ? "Mchango wa Alama"
                    : "Impact Contribution"}
                </span>
                <span className="text-lg font-bold text-primary">
                  +{PRACTICE_IMPACT[formPractice]}
                </span>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowModal(false)}
                  data-ocid="sustainability.cancel_button"
                >
                  {t("cancel")}
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleAddPractice}
                  data-ocid="sustainability.submit_button"
                >
                  {t("save")}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
