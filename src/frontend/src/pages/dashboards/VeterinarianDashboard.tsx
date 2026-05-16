import { Layout } from "@/components/Layout";
import { AlertBanner } from "@/components/ui/AlertBanner";
import { StatCard } from "@/components/ui/StatCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/store/authStore";
import { useLanguageStore } from "@/store/languageStore";
import { useNotificationStore } from "@/store/notificationStore";
import {
  Camera,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  Clock,
  HeartPulse,
  ImagePlus,
  Stethoscope,
  Syringe,
  Trash2,
  Users,
  XCircle,
} from "lucide-react";
import { useRef, useState } from "react";

interface VetCase {
  id: string;
  keeper: string;
  location: string;
  animalType: string;
  animalCount: number;
  disease: string;
  confidence: number;
  submittedDate: string;
  symptoms: string[];
  imageUrl: string;
  recommendations: string[];
}

const VET_PENDING_CASES: VetCase[] = [
  {
    id: "vc1",
    keeper: "Amina Hassan",
    location: "Arusha",
    animalType: "Cattle",
    animalCount: 12,
    disease: "Foot and Mouth Disease (FMD) Suspected",
    confidence: 73,
    submittedDate: "2025-05-05",
    symptoms: ["Mouth blisters", "Limping", "Loss of appetite"],
    imageUrl: "/assets/generated/livestock-hero.dim_800x500.jpg",
    recommendations: [
      "Isolate affected animals immediately",
      "Apply antiseptic to mouth and hoof lesions",
      "Provide soft feed and clean water",
    ],
  },
  {
    id: "vc2",
    keeper: "Msafiri Juma",
    location: "Dodoma",
    animalType: "Goats",
    animalCount: 8,
    disease: "Peste des Petits Ruminants (PPR)",
    confidence: 65,
    submittedDate: "2025-05-04",
    symptoms: ["Nasal discharge", "Diarrhea", "High fever"],
    imageUrl: "/assets/generated/livestock-hero.dim_800x500.jpg",
    recommendations: [
      "Administer anti-fever medication",
      "Oral rehydration therapy",
      "Emergency PPR vaccination for unaffected animals",
    ],
  },
  {
    id: "vc3",
    keeper: "Grace Mollel",
    location: "Moshi",
    animalType: "Chickens",
    animalCount: 50,
    disease: "Newcastle Disease (ND)",
    confidence: 82,
    submittedDate: "2025-05-03",
    symptoms: ["Loss of appetite", "Nasal discharge", "High fever"],
    imageUrl: "/assets/generated/livestock-hero.dim_800x500.jpg",
    recommendations: [
      "No specific treatment — supportive care only",
      "Vaccinate healthy birds immediately with La Sota vaccine",
      "Dispose of dead birds hygienically",
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

export default function VeterinarianDashboard() {
  const { user } = useAuthStore();
  const { language } = useLanguageStore();
  const { notifications } = useNotificationStore();
  const critical = notifications.filter(
    (n) => n.priority === "critical" && !n.read,
  );
  const [expandedCase, setExpandedCase] = useState<string | null>(null);
  const [reviewState, setReviewState] = useState<ReviewState>(() =>
    Object.fromEntries(
      VET_PENDING_CASES.map((c) => [
        c.id,
        { status: null, notes: "", photos: [] },
      ]),
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

  const pendingCount = VET_PENDING_CASES.filter(
    (c) => reviewState[c.id]?.status === null,
  ).length;

  return (
    <Layout>
      <div className="px-4 py-4 space-y-4">
        {/* Hero */}
        <div className="relative rounded-xl overflow-hidden">
          <img
            src="/assets/generated/vet-dashboard.dim_800x400.jpg"
            alt="Veterinarian"
            className="w-full h-32 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-red-900/70 to-transparent flex items-end p-3">
            <div>
              <h1 className="text-lg font-display font-bold text-white">
                {language === "sw"
                  ? "Dashibodi ya Daktari"
                  : "Veterinarian Dashboard"}
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
            title={language === "sw" ? "Wafugaji" : "Keepers"}
            value="18"
            icon={<Users className="w-4 h-4" />}
            colorClass="bg-blue-50 text-blue-600"
          />
          <StatCard
            title={language === "sw" ? "Chanjo Leo" : "Vaccinations"}
            value="5"
            icon={<Syringe className="w-4 h-4" />}
            colorClass="bg-purple-50 text-purple-600"
          />
        </div>

        {/* Pending Animal Health Cases */}
        <section>
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <HeartPulse className="w-4 h-4 text-destructive" />
              {language === "sw"
                ? "Kesi za Afya Zinazongoja"
                : "Pending Animal Health Cases"}
            </h2>
            {pendingCount > 0 && (
              <span className="text-[10px] font-bold bg-amber-100 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded-full">
                {pendingCount}
              </span>
            )}
          </div>
          <div className="space-y-3">
            {VET_PENDING_CASES.map((c, i) => {
              const review = reviewState[c.id];
              const isExpanded = expandedCase === c.id;
              const isReviewed = review?.status !== null;

              return (
                <div
                  key={c.id}
                  data-ocid={`vet.pending_case.${i + 1}`}
                  className={`bg-card border rounded-xl overflow-hidden transition-all ${
                    isReviewed ? "border-border opacity-70" : "border-border"
                  }`}
                >
                  {/* Case header */}
                  <div className="flex items-center gap-3 p-3">
                    <img
                      src={c.imageUrl}
                      alt={c.animalType}
                      className="w-14 h-14 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <p className="font-semibold text-sm text-foreground truncate">
                          {c.keeper}
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
                        {c.animalType} ({c.animalCount}) · {c.location}
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
                        data-ocid={`vet.review_toggle.${i + 1}`}
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

                  {/* Reviewed state: show notes + photo gallery */}
                  {isReviewed && (review.notes || review.photos.length > 0) && (
                    <div className="border-t border-border p-3 space-y-2 bg-muted/10">
                      {review.notes && (
                        <div>
                          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">
                            {language === "sw"
                              ? "Maelezo ya Daktari"
                              : "Vet Notes"}
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
                              ? "Picha za Daktari"
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
                      data-ocid={`vet.case_detail.${i + 1}`}
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

                      {/* AI treatment recommendations */}
                      <div>
                        <p className="text-xs font-semibold text-foreground mb-1.5">
                          {language === "sw"
                            ? "Mapendekezo ya AI"
                            : "AI Treatment Recommendations"}
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
                            data-ocid={`vet.capture_photo_button.${i + 1}`}
                            className="flex items-center gap-1.5 px-3 py-2.5 min-h-[48px] rounded-lg border border-border bg-background text-xs font-medium text-foreground hover:bg-muted transition-colors flex-1 justify-center"
                          >
                            <Camera className="w-4 h-4 text-primary" />
                            {language === "sw" ? "Piga Picha" : "Capture Photo"}
                          </button>
                          <button
                            type="button"
                            onClick={() => triggerGallery(c.id)}
                            data-ocid={`vet.add_photo_button.${i + 1}`}
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
                            data-ocid={`vet.photo_gallery.${i + 1}`}
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
                                  data-ocid={`vet.delete_photo_button.${i + 1}`}
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
                          htmlFor={`vet-notes-${c.id}`}
                          className="text-xs font-semibold text-foreground block mb-1"
                        >
                          {language === "sw"
                            ? "Maelezo ya Daktari (hiari)"
                            : "Vet Notes (optional)"}
                        </label>
                        <Textarea
                          id={`vet-notes-${c.id}`}
                          placeholder={
                            language === "sw"
                              ? "Ongeza maelezo, mabadiliko ya dawa..."
                              : "Add notes, treatment modifications..."
                          }
                          value={review.notes}
                          onChange={(e) =>
                            handleNotesChange(c.id, e.target.value)
                          }
                          rows={2}
                          className="text-xs resize-none"
                          data-ocid={`vet.review_notes.${i + 1}`}
                        />
                      </div>

                      {/* Confirm / Reject */}
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          size="sm"
                          className="flex-1 gap-1.5 bg-accent hover:bg-accent/90 text-accent-foreground"
                          onClick={() => handleReview(c.id, "confirmed")}
                          data-ocid={`vet.confirm_button.${i + 1}`}
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          {language === "sw"
                            ? "Thibitisha Utambuzi"
                            : "Confirm Diagnosis"}
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          className="flex-1 gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/5"
                          onClick={() => handleReview(c.id, "rejected")}
                          data-ocid={`vet.reject_button.${i + 1}`}
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

        {/* Health overview */}
        <section>
          <h2 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5">
            <Stethoscope className="w-4 h-4 text-blue-600" />
            {language === "sw" ? "Muhtasari wa Afya" : "Health Overview"}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                label: language === "sw" ? "Ng'ombe" : "Cattle",
                emoji: "🐄",
                count: 12,
                health: 85,
              },
              {
                label: language === "sw" ? "Mbuzi" : "Goats",
                emoji: "🐐",
                count: 35,
                health: 70,
              },
              {
                label: language === "sw" ? "Kuku" : "Chickens",
                emoji: "🐔",
                count: 150,
                health: 55,
              },
              {
                label: language === "sw" ? "Kondoo" : "Sheep",
                emoji: "🐑",
                count: 20,
                health: 90,
              },
            ].map((item, i) => (
              <div
                key={item.label}
                data-ocid={`vet.health_overview.${i + 1}`}
                className="bg-card border border-border rounded-xl p-3 space-y-2"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{item.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground">
                      {item.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.count} {language === "sw" ? "wanyama" : "animals"}
                    </p>
                  </div>
                </div>
                <div className="space-y-0.5">
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>{language === "sw" ? "Afya" : "Health"}</span>
                    <span>{item.health}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full">
                    <div
                      className={`h-full rounded-full ${
                        item.health >= 80
                          ? "bg-accent"
                          : item.health >= 60
                            ? "bg-amber-400"
                            : "bg-destructive"
                      }`}
                      style={{ width: `${item.health}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
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
