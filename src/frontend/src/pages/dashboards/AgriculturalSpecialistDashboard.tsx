import { Layout } from "@/components/Layout";
import { AlertBanner } from "@/components/ui/AlertBanner";
import { StatCard } from "@/components/ui/StatCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AI_DIAGNOSES } from "@/lib/mockData";
import { useAuthStore } from "@/store/authStore";
import { useLanguageStore } from "@/store/languageStore";
import { useNotificationStore } from "@/store/notificationStore";
import {
  AlertTriangle,
  Camera,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  Clock,
  ImagePlus,
  Leaf,
  Trash2,
  Users,
  XCircle,
} from "lucide-react";
import { useRef, useState } from "react";

interface PendingCase {
  id: string;
  farmer: string;
  location: string;
  crop: string;
  disease: string;
  confidence: number;
  submittedDate: string;
  symptoms: string[];
  imageUrl: string;
  recommendations: string[];
}

const PENDING_CASES: PendingCase[] = [
  {
    id: "pc1",
    farmer: "Juma Mwangi",
    location: "Mbeya",
    crop: "Maize",
    disease: "Early Blight (Alternaria solani)",
    confidence: 87,
    submittedDate: "2025-05-05",
    symptoms: ["Yellowing leaves", "Dark spots", "Wilting"],
    imageUrl: "/assets/generated/hero-agriculture.dim_800x500.jpg",
    recommendations: [
      "Apply copper-based fungicide within 48 hours",
      "Remove and destroy infected leaves",
      "Avoid overhead irrigation",
    ],
  },
  {
    id: "pc2",
    farmer: "Anna Sanga",
    location: "Singida",
    crop: "Sunflower",
    disease: "Sunflower Rust (Puccinia helianthi)",
    confidence: 68,
    submittedDate: "2025-05-04",
    symptoms: ["Brown patches", "White powder"],
    imageUrl: "/assets/generated/hero-agriculture.dim_800x500.jpg",
    recommendations: [
      "Apply propiconazole fungicide at recommended rates",
      "Improve air circulation between rows",
    ],
  },
  {
    id: "pc3",
    farmer: "David Mushi",
    location: "Mwanza",
    crop: "Beans",
    disease: "Bean Common Mosaic Virus",
    confidence: 59,
    submittedDate: "2025-05-03",
    symptoms: ["Leaf curl", "Stunted growth", "Yellowing leaves"],
    imageUrl: "/assets/generated/hero-agriculture.dim_800x500.jpg",
    recommendations: [
      "Remove and destroy affected plants",
      "Control aphid vectors with insecticide",
    ],
  },
];

type ReviewState = {
  [caseId: string]: {
    status: "confirmed" | "rejected" | null;
    notes: string;
    photos: string[];
  };
};

export default function AgriculturalSpecialistDashboard() {
  const { user } = useAuthStore();
  const { language } = useLanguageStore();
  const { notifications } = useNotificationStore();
  const critical = notifications.filter(
    (n) => n.priority === "critical" && !n.read,
  );
  const [expandedCase, setExpandedCase] = useState<string | null>(null);
  const [reviewState, setReviewState] = useState<ReviewState>(() =>
    Object.fromEntries(
      PENDING_CASES.map((c) => [c.id, { status: null, notes: "", photos: [] }]),
    ),
  );
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const [activePhotoCase, setActivePhotoCase] = useState<string | null>(null);

  function handleReview(caseId: string, action: "confirmed" | "rejected") {
    setReviewState((prev) => ({
      ...prev,
      [caseId]: { ...prev[caseId], status: action },
    }));
    setExpandedCase(null);
  }

  function handleNotesChange(caseId: string, notes: string) {
    setReviewState((prev) => ({
      ...prev,
      [caseId]: { ...prev[caseId], notes },
    }));
  }

  function handlePhotoUpload(
    caseId: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    for (const file of files) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target?.result as string;
        setReviewState((prev) => ({
          ...prev,
          [caseId]: {
            ...prev[caseId],
            photos: [...(prev[caseId]?.photos ?? []), dataUrl],
          },
        }));
      };
      reader.readAsDataURL(file);
    }

    e.target.value = "";
  }

  function handleDeletePhoto(caseId: string, photoIndex: number) {
    setReviewState((prev) => ({
      ...prev,
      [caseId]: {
        ...prev[caseId],
        photos: prev[caseId].photos.filter((_, i) => i !== photoIndex),
      },
    }));
  }

  function triggerCamera(caseId: string) {
    setActivePhotoCase(caseId);
    cameraInputRef.current?.click();
  }

  function triggerGallery(caseId: string) {
    setActivePhotoCase(caseId);
    galleryInputRef.current?.click();
  }

  const pendingCount = PENDING_CASES.filter(
    (c) => reviewState[c.id]?.status === null,
  ).length;

  return (
    <Layout>
      <div className="px-4 py-4 space-y-4">
        {/* Hero */}
        <div className="relative rounded-xl overflow-hidden">
          <img
            src="/assets/generated/hero-agriculture.dim_800x500.jpg"
            alt="Specialist"
            className="w-full h-32 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent flex items-end p-3">
            <div>
              <h1 className="text-lg font-display font-bold text-white">
                {language === "sw"
                  ? "Mtaalamu wa Kilimo"
                  : "Agricultural Specialist"}
              </h1>
              <p className="text-xs text-white/80">
                {user?.name} · {user?.specialization}
              </p>
            </div>
          </div>
        </div>

        {critical.slice(0, 1).map((n) => (
          <AlertBanner key={n.id} message={n.body} priority="critical" />
        ))}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <StatCard
            title={language === "sw" ? "Zinazosubiri" : "Pending Review"}
            value={String(pendingCount)}
            icon={<Clock className="w-4 h-4" />}
            colorClass="bg-amber-50 text-amber-700"
          />
          <StatCard
            title={language === "sw" ? "Wakulima" : "Farmers"}
            value="24"
            icon={<Users className="w-4 h-4" />}
            colorClass="bg-green-50 text-green-600"
          />
          <StatCard
            title={language === "sw" ? "Zimesuluhiwa" : "Resolved"}
            value={String(PENDING_CASES.length - pendingCount)}
            icon={<ClipboardList className="w-4 h-4" />}
            colorClass="bg-blue-50 text-blue-600"
          />
        </div>

        {/* Pending Cases */}
        <section>
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <Leaf className="w-4 h-4 text-primary" />
              {language === "sw" ? "Kesi Zinazongoja Mapitio" : "Pending Cases"}
            </h2>
            {pendingCount > 0 && (
              <span className="text-[10px] font-bold bg-amber-100 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded-full">
                {pendingCount}
              </span>
            )}
          </div>
          <div className="space-y-3">
            {PENDING_CASES.map((c, i) => {
              const review = reviewState[c.id];
              const isExpanded = expandedCase === c.id;
              const isReviewed = review?.status !== null;

              return (
                <div
                  key={c.id}
                  data-ocid={`agri.pending_case.${i + 1}`}
                  className={`bg-card border rounded-xl overflow-hidden transition-all ${
                    isReviewed ? "border-border opacity-70" : "border-border"
                  }`}
                >
                  {/* Case header */}
                  <div className="flex items-center gap-3 p-3">
                    <img
                      src={c.imageUrl}
                      alt={c.crop}
                      className="w-14 h-14 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <p className="font-semibold text-sm text-foreground truncate">
                          {c.farmer}
                        </p>
                        {isReviewed ? (
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full border font-medium shrink-0 ${
                              review.status === "confirmed"
                                ? "bg-accent/15 text-accent border-accent/30"
                                : "bg-destructive/10 text-destructive border-destructive/20"
                            }`}
                          >
                            {review.status === "confirmed"
                              ? language === "sw"
                                ? "Imethibitishwa"
                                : "Confirmed"
                              : language === "sw"
                                ? "Imekataliwa"
                                : "Rejected"}
                          </span>
                        ) : (
                          <Badge className="text-[10px] shrink-0 bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100">
                            {language === "sw" ? "Inasubiri" : "Pending"}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {c.crop} · {c.location}
                      </p>
                      <p className="text-xs font-medium text-foreground mt-0.5 truncate">
                        {c.disease}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {language === "sw" ? "Uhakika" : "AI confidence"}:{" "}
                        {c.confidence}%
                      </p>
                    </div>
                    {!isReviewed && (
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedCase(isExpanded ? null : c.id)
                        }
                        aria-label="Toggle case details"
                        data-ocid={`agri.review_toggle.${i + 1}`}
                        className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Reviewed state: notes + photo gallery */}
                  {isReviewed && (review.notes || review.photos.length > 0) && (
                    <div className="border-t border-border p-3 space-y-2 bg-muted/10">
                      {review.notes && (
                        <div>
                          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">
                            {language === "sw"
                              ? "Maelezo ya Mtaalamu"
                              : "Specialist Notes"}
                          </p>
                          <p className="text-xs text-foreground">
                            {review.notes}
                          </p>
                        </div>
                      )}
                      {review.photos.length > 0 && (
                        <div>
                          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                            {language === "sw"
                              ? "Picha za Mtaalamu"
                              : "Specialist Photos"}
                          </p>
                          <div className="flex gap-2 overflow-x-auto pb-1">
                            {review.photos.map((src, pi) => (
                              <img
                                key={src}
                                src={src}
                                alt={`Specialist attachment ${pi + 1}`}
                                className="shrink-0 w-16 h-16 rounded-lg object-cover border border-border"
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Expanded review panel */}
                  {isExpanded && !isReviewed && (
                    <div
                      className="border-t border-border p-4 space-y-4 bg-muted/20"
                      data-ocid={`agri.case_detail.${i + 1}`}
                    >
                      {/* Symptoms */}
                      <div>
                        <p className="text-xs font-semibold text-foreground mb-1.5">
                          {language === "sw"
                            ? "Dalili Zilizotajwa"
                            : "Reported Symptoms"}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {c.symptoms.map((s) => (
                            <span
                              key={s}
                              className="text-[11px] bg-background border border-border px-2 py-0.5 rounded-full"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* AI recommendations */}
                      <div>
                        <p className="text-xs font-semibold text-foreground mb-1.5">
                          {language === "sw"
                            ? "Mapendekezo ya AI"
                            : "AI Recommendations"}
                        </p>
                        <ul className="space-y-1">
                          {c.recommendations.map((r, ri) => (
                            <li
                              key={r}
                              className="flex gap-2 text-xs text-foreground"
                            >
                              <span className="text-primary font-bold shrink-0">
                                {ri + 1}.
                              </span>
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Photo Attachments */}
                      <div>
                        <p className="text-xs font-semibold text-foreground mb-2">
                          {language === "sw"
                            ? "Picha Zilizambatanishwa"
                            : "Photo Attachments"}
                        </p>
                        {/* Hidden inputs */}
                        <input
                          ref={cameraInputRef}
                          type="file"
                          accept="image/*"
                          capture="environment"
                          className="hidden"
                          aria-label="Camera capture"
                          onChange={(e) =>
                            activePhotoCase
                              ? handlePhotoUpload(activePhotoCase, e)
                              : undefined
                          }
                        />
                        <input
                          ref={galleryInputRef}
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          aria-label="Gallery upload"
                          onChange={(e) =>
                            activePhotoCase
                              ? handlePhotoUpload(activePhotoCase, e)
                              : undefined
                          }
                        />
                        {/* Upload buttons */}
                        <div className="flex gap-2 mb-2">
                          <button
                            type="button"
                            onClick={() => triggerCamera(c.id)}
                            data-ocid={`agri.capture_photo_button.${i + 1}`}
                            className="flex items-center gap-1.5 px-3 py-2.5 min-h-[48px] rounded-lg border border-border bg-background text-xs font-medium text-foreground hover:bg-muted transition-colors flex-1 justify-center"
                          >
                            <Camera className="w-4 h-4 text-primary" />
                            {language === "sw" ? "Piga Picha" : "Capture Photo"}
                          </button>
                          <button
                            type="button"
                            onClick={() => triggerGallery(c.id)}
                            data-ocid={`agri.add_photo_button.${i + 1}`}
                            className="flex items-center gap-1.5 px-3 py-2.5 min-h-[48px] rounded-lg border border-border bg-background text-xs font-medium text-foreground hover:bg-muted transition-colors flex-1 justify-center"
                          >
                            <ImagePlus className="w-4 h-4 text-primary" />
                            {language === "sw" ? "Ongeza Picha" : "Add Photo"}
                          </button>
                        </div>
                        {/* Preview grid */}
                        {review.photos.length > 0 && (
                          <div
                            className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin"
                            data-ocid={`agri.photo_gallery.${i + 1}`}
                          >
                            {review.photos.map((src, pi) => (
                              <div
                                key={src}
                                className="relative shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-border"
                              >
                                <img
                                  src={src}
                                  alt={`Attachment ${pi + 1}`}
                                  className="w-full h-full object-cover"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleDeletePhoto(c.id, pi)}
                                  aria-label="Remove photo"
                                  data-ocid={`agri.delete_photo_button.${i + 1}`}
                                  className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-destructive flex items-center justify-center"
                                >
                                  <Trash2 className="w-2.5 h-2.5 text-white" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Notes */}
                      <div>
                        <label
                          htmlFor={`notes-${c.id}`}
                          className="text-xs font-semibold text-foreground block mb-1"
                        >
                          {language === "sw"
                            ? "Maelezo ya Mtaalamu (hiari)"
                            : "Specialist Notes (optional)"}
                        </label>
                        <Textarea
                          id={`notes-${c.id}`}
                          placeholder={
                            language === "sw"
                              ? "Ongeza maelezo au mabadiliko..."
                              : "Add notes or corrections..."
                          }
                          value={review.notes}
                          onChange={(e) =>
                            handleNotesChange(c.id, e.target.value)
                          }
                          rows={2}
                          className="text-xs resize-none"
                          data-ocid={`agri.review_notes.${i + 1}`}
                        />
                      </div>

                      {/* Confirm / Reject */}
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          size="sm"
                          className="flex-1 gap-1.5 bg-accent hover:bg-accent/90 text-accent-foreground"
                          onClick={() => handleReview(c.id, "confirmed")}
                          data-ocid={`agri.confirm_button.${i + 1}`}
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          {language === "sw" ? "Thibitisha" : "Confirm"}
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          className="flex-1 gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/5"
                          onClick={() => handleReview(c.id, "rejected")}
                          data-ocid={`agri.reject_button.${i + 1}`}
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          {language === "sw" ? "Kataa" : "Reject"}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
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
