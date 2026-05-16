import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/store/authStore";
import { useLanguageStore } from "@/store/languageStore";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  Camera,
  CheckCircle,
  ChevronLeft,
  Clock,
  History,
  Mic,
  MicOff,
  Microscope,
  Upload,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// --- Web Speech API types ---
interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}
interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}
interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((e: SpeechRecognitionEvent) => void) | null;
  onerror: ((e: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}

function getSpeechRecognition(): (new () => SpeechRecognitionInstance) | null {
  if (typeof window === "undefined") return null;
  return ((window as unknown as Record<string, unknown>).SpeechRecognition ??
    (window as unknown as Record<string, unknown>).webkitSpeechRecognition ??
    null) as (new () => SpeechRecognitionInstance) | null;
}

function useVoiceInput({
  onTranscript,
  lang,
}: {
  onTranscript: (text: string) => void;
  lang: string;
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [interimText, setInterimText] = useState("");
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const stopTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!getSpeechRecognition()) setIsSupported(false);
    return () => {
      recognitionRef.current?.abort();
      if (stopTimeoutRef.current) clearTimeout(stopTimeoutRef.current);
    };
  }, []);

  const startRecording = useCallback(() => {
    const SR = getSpeechRecognition();
    if (!SR || isRecording) return;
    const recognition = new SR();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = lang;
    recognitionRef.current = recognition;

    recognition.onresult = (e: SpeechRecognitionEvent) => {
      let interim = "";
      let final = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const transcript = e.results[i][0].transcript;
        if (e.results[i].isFinal) final += transcript;
        else interim += transcript;
      }
      setInterimText(interim);
      if (final) {
        onTranscript(final);
        setInterimText("");
      }
    };

    recognition.onerror = (e: SpeechRecognitionErrorEvent) => {
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        setIsSupported(false);
      }
      setIsRecording(false);
      setInterimText("");
    };

    recognition.onend = () => {
      setIsRecording(false);
      setInterimText("");
      if (stopTimeoutRef.current) clearTimeout(stopTimeoutRef.current);
    };

    recognition.start();
    setIsRecording(true);
    stopTimeoutRef.current = setTimeout(() => recognition.stop(), 10000);
  }, [isRecording, lang, onTranscript]);

  const stopRecording = useCallback(() => {
    recognitionRef.current?.stop();
    if (stopTimeoutRef.current) clearTimeout(stopTimeoutRef.current);
    setIsRecording(false);
    setInterimText("");
  }, []);

  return {
    isRecording,
    interimText,
    isSupported,
    startRecording,
    stopRecording,
  };
}

type DiagnosisMode = "crop" | "animal";
type ReviewStatus =
  | "none"
  | "awaiting"
  | "confirmed"
  | "rejected"
  | "needs_assessment";

interface DiagnosisRecord {
  id: string;
  date: string;
  disease: string;
  confidence: number;
  status: ReviewStatus;
  type: DiagnosisMode;
  symptoms: string[];
}

interface DiagnosisResult {
  disease: string;
  confidence: number;
  cause: string;
  treatments: string[];
  prevention: string[];
  urgency: "immediate" | "within_24h" | "within_week" | "routine";
}

const CROP_SYMPTOMS = [
  { en: "Yellowing leaves", sw: "Majani ya njano" },
  { en: "Dark spots", sw: "Madoa meusi" },
  { en: "Wilting", sw: "Kunyauka" },
  { en: "Stunted growth", sw: "Ukuaji wa polepole" },
  { en: "White powder", sw: "Unga mweupe" },
  { en: "Root rot", sw: "Kuoza kwa mizizi" },
  { en: "Leaf curl", sw: "Majani kujikunja" },
  { en: "Brown patches", sw: "Madoa ya kahawia" },
];

const ANIMAL_SYMPTOMS = [
  { en: "Loss of appetite", sw: "Kukosa hamu ya kula" },
  { en: "Skin lesions", sw: "Vidonda vya ngozi" },
  { en: "Limping", sw: "Kuchomeka" },
  { en: "Nasal discharge", sw: "Maji ya pua" },
  { en: "High fever", sw: "Homa kali" },
  { en: "Swollen joints", sw: "Viungo vilivyovimba" },
  { en: "Diarrhea", sw: "Kuhara" },
  { en: "Mouth blisters", sw: "Malengelenge mdomoni" },
];

const MOCK_CROP_RESULT: DiagnosisResult = {
  disease: "Early Blight (Alternaria solani)",
  confidence: 87,
  cause:
    "Fungal infection caused by Alternaria solani, spread by warm humid conditions and overhead irrigation.",
  treatments: [
    "Apply copper-based fungicide (e.g. Ridomil Gold) at 2.5g/L water",
    "Remove and destroy all infected leaves immediately",
    "Avoid overhead irrigation — use drip if possible",
    "Repeat fungicide application every 7 days for 3 cycles",
  ],
  prevention: [
    "Use certified disease-resistant seed varieties",
    "Maintain adequate spacing for air circulation",
    "Rotate crops annually with non-host species",
  ],
  urgency: "within_24h",
};

const MOCK_ANIMAL_RESULT: DiagnosisResult = {
  disease: "Foot and Mouth Disease (FMD) Suspected",
  confidence: 73,
  cause:
    "Highly contagious viral disease spread through direct animal contact or contaminated equipment.",
  treatments: [
    "Isolate affected animals immediately from the herd",
    "Apply antiseptic to mouth and hoof lesions twice daily",
    "Provide soft feed, clean water and electrolytes",
    "Contact a veterinarian for professional assessment within 24 hours",
  ],
  prevention: [
    "Vaccinate herd against FMD annually",
    "Report any outbreak to local livestock office",
    "Disinfect all equipment and entry points",
  ],
  urgency: "immediate",
};

const MOCK_HISTORY: DiagnosisRecord[] = [
  {
    id: "dh1",
    date: "2025-05-02",
    disease: "Early Blight (Alternaria solani)",
    confidence: 87,
    status: "confirmed",
    type: "crop",
    symptoms: ["Yellowing leaves", "Dark spots"],
  },
  {
    id: "dh2",
    date: "2025-04-18",
    disease: "Nitrogen Deficiency",
    confidence: 91,
    status: "confirmed",
    type: "crop",
    symptoms: ["Yellowing leaves", "Stunted growth"],
  },
  {
    id: "dh3",
    date: "2025-04-05",
    disease: "Powdery Mildew",
    confidence: 65,
    status: "needs_assessment",
    type: "crop",
    symptoms: ["White powder", "Leaf curl"],
  },
  {
    id: "dh4",
    date: "2025-05-01",
    disease: "FMD Suspected",
    confidence: 73,
    status: "awaiting",
    type: "animal",
    symptoms: ["Mouth blisters", "Loss of appetite"],
  },
];

function ConfidenceBar({ value }: { value: number }) {
  const colorClass =
    value >= 80
      ? "bg-accent"
      : value >= 60
        ? "bg-primary/70"
        : "bg-destructive";
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">AI Confidence</span>
        <span className="font-semibold text-foreground">{value}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${colorClass}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function ReviewBadge({
  status,
  lang,
}: {
  status: ReviewStatus;
  lang: "en" | "sw";
}) {
  if (status === "confirmed") {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/30">
        <CheckCircle className="w-3 h-3" />
        {lang === "sw" ? "Imethibitishwa" : "Confirmed by Specialist"}
      </span>
    );
  }
  if (status === "needs_assessment") {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-destructive/10 text-destructive border border-destructive/20">
        <AlertCircle className="w-3 h-3" />
        {lang === "sw" ? "Inahitaji Uchunguzi" : "Needs Further Assessment"}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
      <Clock className="w-3 h-3" />
      {lang === "sw" ? "Inasubiri Mapitio" : "Awaiting Review"}
    </span>
  );
}

export default function DiagnosisPage() {
  const { user } = useAuthStore();
  const { language, t } = useLanguageStore();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mode: DiagnosisMode =
    user?.role === "livestock_keeper" ? "animal" : "crop";
  const symptoms = mode === "crop" ? CROP_SYMPTOMS : ANIMAL_SYMPTOMS;

  const [activeTab, setActiveTab] = useState<"diagnose" | "history">(
    "diagnose",
  );
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [reviewStatus, setReviewStatus] = useState<ReviewStatus>("none");
  const [diagnosisId] = useState(() => `diag-${Date.now()}`);
  const [specialistPhotos, setSpecialistPhotos] = useState<string[]>([]);

  // Bridge cross-role flow: read specialist photos written by vet/agronomist dashboards
  useEffect(() => {
    function loadSpecialistPhotos() {
      try {
        const raw = localStorage.getItem(`specialist_photos_${diagnosisId}`);
        if (raw) {
          const parsed = JSON.parse(raw) as string[];
          if (parsed.length > 0) setSpecialistPhotos(parsed);
        }
      } catch {
        /* ignore */
      }
    }
    loadSpecialistPhotos();
    // Poll for updates every 3 s in case specialist submits while page is open
    const interval = setInterval(loadSpecialistPhotos, 3000);
    return () => clearInterval(interval);
  }, [diagnosisId]);

  const voiceLang = language === "sw" ? "sw-TZ" : "en-US";
  const handleVoiceTranscript = useCallback((text: string) => {
    setDescription((prev) =>
      prev ? `${prev.trimEnd()} ${text.trim()}` : text.trim(),
    );
  }, []);
  const {
    isRecording,
    interimText,
    isSupported,
    startRecording,
    stopRecording,
  } = useVoiceInput({ onTranscript: handleVoiceTranscript, lang: voiceLang });

  const title =
    mode === "crop"
      ? language === "sw"
        ? "Gundua Ugonjwa wa Mazao"
        : "Crop Disease Detection"
      : language === "sw"
        ? "Uchunguzi wa Afya ya Mnyama"
        : "Animal Health Diagnosis";

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  function handleCameraCapture() {
    // Simulate camera capture with file input
    fileInputRef.current?.click();
  }

  function toggleSymptom(label: string) {
    setSelectedSymptoms((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label],
    );
  }

  async function handleAnalyze() {
    if (!imagePreview && selectedSymptoms.length === 0 && !description.trim())
      return;
    setIsAnalyzing(true);
    setResult(null);
    await new Promise((r) => setTimeout(r, 2500));
    setResult(mode === "crop" ? MOCK_CROP_RESULT : MOCK_ANIMAL_RESULT);
    setIsAnalyzing(false);
    setReviewStatus("none");
  }

  function handleReset() {
    setImagePreview(null);
    setSelectedSymptoms([]);
    setDescription("");
    setResult(null);
    setReviewStatus("none");
  }

  const historyToShow =
    mode === "crop"
      ? MOCK_HISTORY.filter((h) => h.type === "crop")
      : MOCK_HISTORY.filter((h) => h.type === "animal");

  const canSubmit =
    (imagePreview !== null ||
      selectedSymptoms.length > 0 ||
      description.trim().length > 0) &&
    !isAnalyzing;

  return (
    <Layout>
      <div className="px-4 py-4 space-y-4 max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate({ to: "/home" })}
            aria-label={language === "sw" ? "Rudi" : "Go back"}
            className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
            data-ocid="diagnosis.back_button"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex items-center gap-2">
            <Microscope className="w-5 h-5 text-primary" />
            <h1 className="text-base font-display font-bold text-foreground">
              {title}
            </h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-muted rounded-xl p-1 gap-1" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "diagnose"}
            onClick={() => setActiveTab("diagnose")}
            data-ocid="diagnosis.diagnose_tab"
            className={`flex-1 text-sm font-medium py-2 rounded-lg transition-colors ${
              activeTab === "diagnose"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {language === "sw" ? "Gundua" : "Diagnose"}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "history"}
            onClick={() => setActiveTab("history")}
            data-ocid="diagnosis.history_tab"
            className={`flex-1 text-sm font-medium py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === "history"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <History className="w-3.5 h-3.5" />
            {language === "sw" ? "Historia" : "History"}
          </button>
        </div>

        {/* Diagnose Tab */}
        {activeTab === "diagnose" && (
          <div className="space-y-4">
            {/* Image capture */}
            <div className="bg-card border border-border rounded-xl p-4 space-y-3">
              <h2 className="text-sm font-semibold text-foreground">
                {language === "sw" ? "Picha" : "Image"}
              </h2>

              {imagePreview ? (
                <div className="relative rounded-xl overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Uploaded"
                    className="w-full h-48 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setImagePreview(null)}
                    aria-label="Remove image"
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-foreground/70 flex items-center justify-center"
                    data-ocid="diagnosis.remove_image_button"
                  >
                    <X className="w-4 h-4 text-background" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleFileUpload}
                    className="hidden"
                    aria-label="Camera capture"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 gap-2"
                    onClick={handleCameraCapture}
                    data-ocid="diagnosis.take_photo_button"
                  >
                    <Camera className="w-4 h-4" />
                    {language === "sw" ? "Piga Picha" : "Take Photo"}
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="upload-input"
                    aria-label="Upload image"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 gap-2"
                    onClick={() =>
                      document.getElementById("upload-input")?.click()
                    }
                    data-ocid="diagnosis.upload_image_button"
                  >
                    <Upload className="w-4 h-4" />
                    {language === "sw" ? "Pakia Picha" : "Upload Image"}
                  </Button>
                </div>
              )}
            </div>

            {/* Symptom tags */}
            <div className="bg-card border border-border rounded-xl p-4 space-y-3">
              <h2 className="text-sm font-semibold text-foreground">
                {language === "sw" ? "Dalili za Kawaida" : "Common Symptoms"}
              </h2>
              <div className="flex flex-wrap gap-2">
                {symptoms.map((s) => {
                  const label = language === "sw" ? s.sw : s.en;
                  const selected = selectedSymptoms.includes(label);
                  return (
                    <button
                      key={s.en}
                      type="button"
                      onClick={() => toggleSymptom(label)}
                      data-ocid={`diagnosis.symptom_${s.en.toLowerCase().replace(/\s+/g, "_")}`}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                        selected
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-foreground border-border hover:border-primary/50"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Description textarea + voice input */}
            <div className="bg-card border border-border rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="symptom-description"
                  className="text-sm font-semibold text-foreground"
                >
                  {language === "sw" ? "Elezea Dalili" : "Describe Symptoms"}
                </label>
                {isSupported && (
                  <button
                    type="button"
                    aria-label={
                      isRecording ? t("stopRecording") : t("tapToSpeak")
                    }
                    onClick={isRecording ? stopRecording : startRecording}
                    data-ocid={
                      isRecording
                        ? "diagnosis.stop_recording_button"
                        : "diagnosis.start_recording_button"
                    }
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      isRecording
                        ? "bg-destructive/10 text-destructive border border-destructive/30 hover:bg-destructive/20"
                        : "bg-muted text-muted-foreground border border-border hover:bg-muted/80 hover:text-foreground"
                    }`}
                  >
                    {isRecording ? (
                      <>
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive" />
                        </span>
                        <MicOff className="w-3.5 h-3.5" />
                        {t("stopRecording")}
                      </>
                    ) : (
                      <>
                        <Mic className="w-3.5 h-3.5" />
                        {t("tapToSpeak")}
                      </>
                    )}
                  </button>
                )}
              </div>

              {isRecording && (
                <div
                  className="flex items-center gap-2 text-xs text-destructive font-medium px-1"
                  data-ocid="diagnosis.listening_indicator"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive" />
                  </span>
                  {t("listening")}
                </div>
              )}

              <Textarea
                id="symptom-description"
                placeholder={
                  language === "sw"
                    ? "Elezea dalili unazoziona kwa undani zaidi..."
                    : "Describe the symptoms you are observing in detail..."
                }
                value={
                  isRecording && interimText
                    ? `${description}${description ? " " : ""}${interimText}`
                    : description
                }
                onChange={(e) => {
                  if (!isRecording) setDescription(e.target.value);
                }}
                rows={3}
                className={`resize-none text-sm transition-colors ${
                  isRecording
                    ? interimText
                      ? "border-destructive/40 bg-destructive/5 text-muted-foreground"
                      : "border-destructive/40 bg-destructive/5"
                    : ""
                }`}
                data-ocid="diagnosis.symptom_textarea"
              />

              {!isSupported && (
                <p
                  className="text-[11px] text-muted-foreground flex items-center gap-1 px-1"
                  data-ocid="diagnosis.voice_unsupported_note"
                >
                  <MicOff className="w-3 h-3 shrink-0" />
                  {t("voiceNotSupported")}
                </p>
              )}
            </div>

            {/* Analyze button */}
            {!result && (
              <Button
                type="button"
                className="w-full gap-2 h-12 text-base font-semibold"
                onClick={handleAnalyze}
                disabled={!canSubmit}
                data-ocid="diagnosis.analyze_button"
              >
                {isAnalyzing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-primary-foreground/50 border-t-primary-foreground rounded-full animate-spin" />
                    {language === "sw" ? "Inachunguza..." : "Analyzing…"}
                  </>
                ) : (
                  <>
                    <Microscope className="w-5 h-5" />
                    {language === "sw" ? "Changanua na AI" : "Analyze with AI"}
                  </>
                )}
              </Button>
            )}

            {/* Loading skeleton */}
            {isAnalyzing && (
              <div className="space-y-3" data-ocid="diagnosis.loading_state">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-24 w-full rounded-xl" />
                <Skeleton className="h-16 w-full rounded-xl" />
              </div>
            )}

            {/* Results */}
            {result && !isAnalyzing && (
              <div className="space-y-4" data-ocid="diagnosis.result_panel">
                {/* Disease header */}
                <div className="bg-card border border-border rounded-xl p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display font-bold text-foreground text-base leading-tight">
                      {result.disease}
                    </h3>
                    <Badge
                      variant={
                        result.urgency === "immediate"
                          ? "destructive"
                          : "outline"
                      }
                      className="shrink-0 text-xs"
                    >
                      {result.urgency === "immediate"
                        ? language === "sw"
                          ? "Haraka!"
                          : "Urgent!"
                        : result.urgency === "within_24h"
                          ? language === "sw"
                            ? "Ndani ya Saa 24"
                            : "Act Soon"
                          : language === "sw"
                            ? "Kawaida"
                            : "Routine"}
                    </Badge>
                  </div>
                  <ConfidenceBar value={result.confidence} />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">
                      {language === "sw" ? "Sababu: " : "Likely cause: "}
                    </span>
                    {result.cause}
                  </p>
                </div>

                {/* Treatment steps */}
                <div className="bg-card border border-border rounded-xl p-4 space-y-2">
                  <h4 className="text-sm font-semibold text-foreground">
                    {language === "sw"
                      ? "Hatua za Matibabu"
                      : "Treatment Steps"}
                  </h4>
                  <ol className="space-y-2">
                    {result.treatments.map((step, i) => (
                      <li
                        key={step}
                        className="flex gap-2.5 text-xs text-foreground"
                      >
                        <span className="w-5 h-5 rounded-full bg-primary/15 text-primary text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Prevention tips */}
                <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 space-y-2">
                  <h4 className="text-sm font-semibold text-foreground">
                    {language === "sw" ? "Kinga" : "Prevention Tips"}
                  </h4>
                  <ul className="space-y-1.5">
                    {result.prevention.map((tip) => (
                      <li
                        key={tip}
                        className="flex gap-2 text-xs text-foreground"
                      >
                        <span className="text-accent mt-0.5">✓</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Review status and action */}
                <div className="bg-card border border-border rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">
                      {language === "sw"
                        ? "Mapitio ya Mtaalamu"
                        : "Specialist Review"}
                    </span>
                    {reviewStatus !== "none" && (
                      <ReviewBadge status={reviewStatus} lang={language} />
                    )}
                  </div>
                  {reviewStatus === "none" ? (
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full gap-2 text-sm border-primary/40 text-primary hover:bg-primary/5"
                      onClick={() => {
                        setReviewStatus("awaiting");
                        setTimeout(() => setReviewStatus("confirmed"), 3000);
                      }}
                      data-ocid="diagnosis.request_review_button"
                    >
                      <CheckCircle className="w-4 h-4" />
                      {language === "sw"
                        ? "Omba Mtaalamu Akagundua"
                        : "Request Specialist Review"}
                    </Button>
                  ) : reviewStatus === "awaiting" ? (
                    <p
                      className="text-xs text-muted-foreground text-center py-1"
                      data-ocid="diagnosis.review_requested_state"
                    >
                      {language === "sw"
                        ? "Ombi limetumwa. Mtaalamu atachakata hivi karibuni."
                        : "Review request sent. A specialist will respond shortly."}
                    </p>
                  ) : (
                    <div className="space-y-3">
                      <p
                        className="text-xs text-accent text-center py-1 font-medium"
                        data-ocid="diagnosis.review_confirmed_state"
                      >
                        {language === "sw"
                          ? "Imethibitishwa na mtaalamu."
                          : "Confirmed by specialist."}
                      </p>
                      {specialistPhotos.length > 0 && (
                        <div data-ocid="diagnosis.specialist_photos">
                          <p className="text-xs font-semibold text-foreground mb-2">
                            {language === "sw"
                              ? "Picha za Mtaalamu"
                              : "Specialist Photos"}
                          </p>
                          <div className="flex gap-2 overflow-x-auto pb-1">
                            {specialistPhotos.map((src, pi) => (
                              <img
                                key={src}
                                src={src}
                                alt={`Specialist attachment ${pi + 1}`}
                                className="shrink-0 w-20 h-20 rounded-xl object-cover border border-border"
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* New diagnosis button */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleReset}
                  data-ocid="diagnosis.new_diagnosis_button"
                >
                  {language === "sw" ? "Uchunguzi Mpya" : "New Diagnosis"}
                </Button>
              </div>
            )}
          </div>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <div className="space-y-3" data-ocid="diagnosis.history_list">
            {historyToShow.length === 0 ? (
              <div
                className="text-center py-10 text-muted-foreground"
                data-ocid="diagnosis.history_empty_state"
              >
                <History className="w-10 h-10 mx-auto mb-2 opacity-40" />
                <p className="text-sm">
                  {language === "sw"
                    ? "Hakuna historia ya uchunguzi"
                    : "No diagnosis history yet"}
                </p>
              </div>
            ) : (
              historyToShow.map((record, i) => (
                <div
                  key={record.id}
                  data-ocid={`diagnosis.history_item.${i + 1}`}
                  className="bg-card border border-border rounded-xl p-4 space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-sm text-foreground leading-tight">
                      {record.disease}
                    </p>
                    <ReviewBadge status={record.status} lang={language} />
                  </div>
                  <div className="flex items-center gap-3">
                    <ConfidenceBar value={record.confidence} />
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {record.symptoms.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    {new Date(record.date).toLocaleDateString(
                      language === "sw" ? "sw-TZ" : "en-TZ",
                      { year: "numeric", month: "long", day: "numeric" },
                    )}
                  </p>
                </div>
              ))
            )}
          </div>
        )}

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
