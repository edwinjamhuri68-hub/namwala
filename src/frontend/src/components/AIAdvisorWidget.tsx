import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/store/languageStore";
import {
  Bell,
  Bot,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  MapPin,
  Mic,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Web Speech API helpers ───────────────────────────────────────────────────

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

function speakText(
  text: string,
  lang: string,
  onEnd?: () => void,
): SpeechSynthesisUtterance | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  const voices = window.speechSynthesis.getVoices();
  const match = voices.find((v) => v.lang.startsWith(lang.split("-")[0]));
  if (match) utter.voice = match;
  utter.rate = 0.95;
  if (onEnd) utter.onend = onEnd;
  window.speechSynthesis.speak(utter);
  return utter;
}

// ─── Types ──────────────────────────────────────────────────────────────────

export interface AdvisorUserContext {
  role: "farmer" | "livestock_keeper";
  location: string;
  cropTypes?: string[];
  animalTypes?: string[];
  farmSize?: number;
  weatherCondition: "sunny" | "rainy" | "dry";
  season: "planting" | "growing" | "harvesting" | "dry";
}

export interface AdvisorReminder {
  dueLabel: string;
  text: string;
}

export interface AdvisorTip {
  icon: React.ReactNode;
  title: string;
  advice: string;
}

export interface QAMessage {
  id: number;
  role: "user" | "advisor";
  text: string;
}

export interface AIAdvisorWidgetProps {
  userName: string;
  tips: AdvisorTip[];
  reminders?: AdvisorReminder[];
  getMockResponse: (question: string, history: QAMessage[]) => string;
  widgetId: string;
  userContext?: AdvisorUserContext;
  suggestedQuestions?: string[];
}

// ─── Season / weather label helpers ─────────────────────────────────────────

const SEASON_LABELS: Record<string, { en: string; sw: string }> = {
  planting: { en: "Planting Season", sw: "Msimu wa Kupanda" },
  growing: { en: "Growing Season", sw: "Msimu wa Ukuaji" },
  harvesting: { en: "Harvesting Season", sw: "Msimu wa Mavuno" },
  dry: { en: "Dry Season", sw: "Kiangazi" },
};

const WEATHER_LABELS: Record<
  string,
  { en: string; sw: string; emoji: string }
> = {
  sunny: { en: "Sunny", sw: "Jua", emoji: "☀️" },
  rainy: { en: "Rainy", sw: "Mvua", emoji: "🌧️" },
  dry: { en: "Dry", sw: "Kavu", emoji: "🌵" },
};

// ─── Component ──────────────────────────────────────────────────────────────

export function AIAdvisorWidget({
  userName,
  tips,
  reminders,
  getMockResponse,
  widgetId,
  userContext,
  suggestedQuestions,
}: AIAdvisorWidgetProps) {
  const { t, language } = useLanguageStore();
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<QAMessage[]>([]);
  const msgIdRef = useRef(0);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [activeTab, setActiveTab] = useState<"tips" | "reminders">("tips");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Voice state
  type VoiceState = "idle" | "listening" | "processing" | "speaking";
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [interimText, setInterimText] = useState("");
  const [voiceSupported, setVoiceSupported] = useState(true);
  // Track whether the last input came via voice to auto-read the response
  const lastInputWasVoiceRef = useRef(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const stopRecTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const voiceLang = language === "sw" ? "sw-TZ" : "en-US";

  useEffect(() => {
    if (!getSpeechRecognition()) setVoiceSupported(false);
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
    }
    return () => {
      recognitionRef.current?.abort();
      if (stopRecTimerRef.current) clearTimeout(stopRecTimerRef.current);
      window.speechSynthesis?.cancel();
    };
  }, []);

  // Update recognition lang whenever language changes
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = voiceLang;
    }
  }, [voiceLang]);

  const stopSpeakingNow = useCallback(() => {
    window.speechSynthesis?.cancel();
    setVoiceState("idle");
  }, []);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    if (stopRecTimerRef.current) clearTimeout(stopRecTimerRef.current);
    setVoiceState("idle");
    setInterimText("");
  }, []);

  const firstName = userName.split(" ")[0];

  const speakResponse = useCallback(
    (text: string) => {
      setVoiceState("speaking");
      speakText(text, voiceLang, () => setVoiceState("idle"));
    },
    [voiceLang],
  );

  const processQuestion = useCallback(
    (q: string, fromVoice: boolean) => {
      if (!q || thinking) return;
      setInput("");
      lastInputWasVoiceRef.current = fromVoice;
      const userMsg: QAMessage = {
        id: ++msgIdRef.current,
        role: "user",
        text: q,
      };
      setMessages((prev) => [...prev, userMsg]);
      setThinking(true);
      if (fromVoice) setVoiceState("processing");
      setMessages((prev) => {
        setTimeout(
          () => {
            setMessages((current) => {
              const response = getMockResponse(q, current);
              const advisorMsg: QAMessage = {
                id: ++msgIdRef.current,
                role: "advisor",
                text: response,
              };
              const updated = [...current, advisorMsg];
              setThinking(false);
              setTimeout(
                () =>
                  chatEndRef.current?.scrollIntoView({ behavior: "smooth" }),
                50,
              );
              if (fromVoice) {
                speakResponse(response);
              } else {
                setVoiceState("idle");
              }
              return updated;
            });
          },
          1200 + Math.random() * 400,
        );
        return prev;
      });
    },
    [thinking, getMockResponse, speakResponse],
  );

  const handleAsk = (question?: string) => {
    const q = (question ?? input).trim();
    processQuestion(q, false);
  };

  const startListening = useCallback(() => {
    const SR = getSpeechRecognition();
    if (!SR || voiceState !== "idle") return;
    // Stop any ongoing speech before listening
    window.speechSynthesis?.cancel();
    const recognition = new SR();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = voiceLang;
    recognitionRef.current = recognition;
    let capturedFinal = "";
    setInput(""); // Clear input when starting voice

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
        capturedFinal = final.trim();
        setInput(capturedFinal);
        setInterimText("");
      }
    };

    recognition.onerror = (e: SpeechRecognitionErrorEvent) => {
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        setVoiceSupported(false);
        alert(t("micNotAvailable"));
      }
      setVoiceState("idle");
      setInterimText("");
    };

    recognition.onend = () => {
      if (stopRecTimerRef.current) clearTimeout(stopRecTimerRef.current);
      setVoiceState((prev) => (prev === "listening" ? "idle" : prev));
      setInterimText("");
      if (capturedFinal) {
        setTimeout(() => processQuestion(capturedFinal, true), 150);
      }
    };

    recognition.start();
    setVoiceState("listening");
    // Auto-stop after 10s
    stopRecTimerRef.current = setTimeout(() => recognition.stop(), 10000);
  }, [voiceState, voiceLang, t, processQuestion]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  const isListening = voiceState === "listening";
  const isProcessing = voiceState === "processing";
  const isSpeaking = voiceState === "speaking";

  const greeting =
    language === "sw"
      ? `Habari ${firstName}! Hapa kuna ushauri wa leo:`
      : `Hello ${firstName}! Here are your personalized tips for today:`;

  const hasReminders = reminders && reminders.length > 0;

  // Determine mic button visual state
  const micButtonClass = isListening
    ? "bg-destructive/10 border-2 border-destructive text-destructive shadow-[0_0_0_3px_rgba(var(--destructive),0.15)]"
    : isProcessing || isSpeaking
      ? "bg-muted border border-border text-muted-foreground/40 cursor-not-allowed"
      : "bg-muted border border-border text-muted-foreground hover:text-foreground hover:bg-muted/80";

  return (
    <section
      data-ocid={`${widgetId}.ai_advisor_section`}
      className="rounded-2xl overflow-hidden border border-accent/20 bg-gradient-to-br from-background to-accent/5"
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 pt-4 pb-2">
        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
          <Bot className="w-4 h-4 text-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-display font-semibold text-foreground">
            {t("aiAdvisor")}
          </h2>
          <p className="text-[10px] text-muted-foreground">{greeting}</p>
        </div>
        <Sparkles className="w-4 h-4 text-accent opacity-60" />
      </div>

      {/* Context badge */}
      {userContext && (
        <div className="px-3 pb-2">
          <div
            data-ocid={`${widgetId}.context_badge`}
            className="flex items-center flex-wrap gap-1.5 bg-accent/10 border border-accent/20 rounded-lg px-2.5 py-1.5"
          >
            <div className="flex items-center gap-1 text-[10px] text-accent font-medium">
              <MapPin className="w-2.5 h-2.5 flex-shrink-0" />
              <span>{userContext.location}</span>
            </div>
            <span className="text-accent/40 text-[10px]">·</span>
            <span className="text-[10px] text-accent font-medium">
              {language === "sw"
                ? SEASON_LABELS[userContext.season]?.sw
                : SEASON_LABELS[userContext.season]?.en}
            </span>
            <span className="text-accent/40 text-[10px]">·</span>
            <span className="text-[10px] text-accent font-medium">
              {WEATHER_LABELS[userContext.weatherCondition]?.emoji}{" "}
              {language === "sw"
                ? WEATHER_LABELS[userContext.weatherCondition]?.sw
                : WEATHER_LABELS[userContext.weatherCondition]?.en}
            </span>
            {userContext.cropTypes && userContext.cropTypes.length > 0 && (
              <>
                <span className="text-accent/40 text-[10px]">·</span>
                <span className="text-[10px] text-accent font-medium">
                  {userContext.cropTypes.slice(0, 2).join(", ")}
                </span>
              </>
            )}
            {userContext.animalTypes && userContext.animalTypes.length > 0 && (
              <>
                <span className="text-accent/40 text-[10px]">·</span>
                <span className="text-[10px] text-accent font-medium">
                  {userContext.animalTypes.slice(0, 2).join(", ")}
                </span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Tab switcher — Tips / Reminders */}
      {hasReminders && (
        <div className="px-3 pb-2 flex gap-1">
          <button
            type="button"
            data-ocid={`${widgetId}.tips_tab`}
            onClick={() => setActiveTab("tips")}
            className={`flex-1 text-[11px] font-medium py-1.5 rounded-lg border transition-smooth ${
              activeTab === "tips"
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border text-muted-foreground"
            }`}
          >
            <Lightbulb className="w-3 h-3 inline mr-1" />
            {language === "sw" ? "Vidokezo" : "Tips"}
          </button>
          <button
            type="button"
            data-ocid={`${widgetId}.reminders_tab`}
            onClick={() => setActiveTab("reminders")}
            className={`flex-1 text-[11px] font-medium py-1.5 rounded-lg border transition-smooth ${
              activeTab === "reminders"
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border text-muted-foreground"
            }`}
          >
            <Bell className="w-3 h-3 inline mr-1" />
            {language === "sw" ? "Vikumbusho" : "Reminders"}
            <span className="ml-1 inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-destructive text-primary-foreground text-[8px] font-bold">
              {reminders?.length}
            </span>
          </button>
        </div>
      )}

      {/* Tips view */}
      {(!hasReminders || activeTab === "tips") && (
        <div className="px-3 pb-3 space-y-2">
          {tips.map((tip, idx) => (
            <div
              key={tip.title}
              data-ocid={`${widgetId}.ai_tip.${idx + 1}`}
              className="bg-card border-l-4 border-primary rounded-lg px-3 py-2.5 flex items-start gap-2.5 shadow-sm"
            >
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                {tip.icon}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-foreground truncate">
                  {tip.title}
                </p>
                <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">
                  {tip.advice}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reminders view */}
      {hasReminders && activeTab === "reminders" && (
        <div className="px-3 pb-3 space-y-2">
          {reminders?.map((r, idx) => (
            <div
              key={r.text}
              data-ocid={`${widgetId}.reminder.${idx + 1}`}
              className="bg-card border-l-4 border-amber-400 rounded-lg px-3 py-2.5 flex items-start gap-2.5 shadow-sm"
            >
              <div className="w-7 h-7 rounded-full bg-amber-400/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Bell className="w-3.5 h-3.5 text-amber-500" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold text-amber-600 uppercase tracking-wide">
                  {r.dueLabel}
                </p>
                <p className="text-[11px] text-foreground leading-snug mt-0.5">
                  {r.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Ask Advisor toggle */}
      <div className="px-3 pb-3">
        <Button
          type="button"
          size="sm"
          data-ocid={`${widgetId}.ask_advisor_button`}
          onClick={() => setChatOpen((v) => !v)}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-xs h-9"
        >
          <Bot className="w-3.5 h-3.5" />
          {t("askAdvisor")}
          {chatOpen ? (
            <ChevronUp className="w-3.5 h-3.5 ml-auto" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 ml-auto" />
          )}
        </Button>
      </div>

      {/* Inline Chat */}
      {chatOpen && (
        <div
          data-ocid={`${widgetId}.ai_chat_panel`}
          className="border-t border-accent/20 bg-card/80 px-3 pt-3 pb-3"
        >
          {/* Message history */}
          {messages.length > 0 && (
            <div className="space-y-2 mb-3 max-h-64 overflow-y-auto">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {msg.role === "advisor" && (
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot className="w-3 h-3 text-accent" />
                    </div>
                  )}
                  <div className="flex flex-col gap-1 max-w-[82%]">
                    <div
                      className={`rounded-xl px-3 py-2 text-xs leading-relaxed ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-sm"
                          : "bg-muted text-foreground rounded-tl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                    {/* Per-message speak button for advisor messages */}
                    {msg.role === "advisor" && (
                      <button
                        type="button"
                        onClick={() => speakResponse(msg.text)}
                        disabled={isSpeaking || isListening || isProcessing}
                        data-ocid={`${widgetId}.speak_message.${msg.id}`}
                        aria-label={t("listenToResponse")}
                        title={t("listenToResponse")}
                        className="self-start flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-medium text-muted-foreground hover:text-accent hover:bg-accent/10 border border-transparent hover:border-accent/20 transition-smooth disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Volume2 className="w-2.5 h-2.5" />
                        {t("listenToResponse")}
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {/* Thinking / Processing indicator */}
              {(thinking || isProcessing) && (
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3 h-3 text-accent" />
                  </div>
                  <div className="bg-muted rounded-xl rounded-tl-sm px-3 py-2 text-xs text-muted-foreground italic flex items-center gap-1.5">
                    {isProcessing ? (
                      <>
                        <span
                          className="inline-block w-3 h-3 rounded-full border-2 border-accent border-t-transparent animate-spin"
                          aria-hidden="true"
                        />
                        <span>{t("voiceProcessing")}</span>
                      </>
                    ) : (
                      <>
                        {t("advisorThinking")}
                        <span className="inline-flex gap-0.5 ml-1">
                          <span
                            className="animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          >
                            .
                          </span>
                          <span
                            className="animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          >
                            .
                          </span>
                          <span
                            className="animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          >
                            .
                          </span>
                        </span>
                      </>
                    )}
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          )}

          {messages.length === 0 && !thinking && (
            <p className="text-[11px] text-muted-foreground text-center mb-3">
              {language === "sw"
                ? "Uliza mshauri wako swali lolote kuhusu shamba lako"
                : "Ask your advisor any question about your farm"}
            </p>
          )}

          {/* Quick question chips */}
          {suggestedQuestions &&
            suggestedQuestions.length > 0 &&
            messages.length === 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    type="button"
                    data-ocid={`${widgetId}.quick_question`}
                    onClick={() => handleAsk(q)}
                    className="text-[10px] px-2.5 py-1 rounded-full bg-accent/10 border border-accent/25 text-accent font-medium hover:bg-accent/20 transition-smooth whitespace-nowrap"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

          {/* Input row */}
          <div className="flex gap-1.5 items-center">
            {/* Mic button — three visual states */}
            {voiceSupported ? (
              <button
                type="button"
                onClick={isListening ? stopListening : startListening}
                disabled={isProcessing || isSpeaking || thinking}
                data-ocid={`${widgetId}.advisor_mic_button`}
                aria-label={isListening ? t("stopRecording") : t("tapToSpeak")}
                title={isListening ? t("stopRecording") : t("tapToSpeak")}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-smooth active:scale-95 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed relative ${micButtonClass}`}
              >
                {isListening ? (
                  <>
                    {/* Animated pulse ring */}
                    <span
                      className="absolute inset-0 rounded-full animate-ping bg-destructive/30"
                      aria-hidden="true"
                    />
                    <span
                      className="absolute inset-[-4px] rounded-full border-2 border-destructive/50 animate-pulse"
                      aria-hidden="true"
                    />
                    <Mic className="w-4 h-4 relative text-destructive" />
                  </>
                ) : isSpeaking ? (
                  <Volume2 className="w-4 h-4 text-primary animate-pulse" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </button>
            ) : null}

            <div className="flex-1 min-w-0 relative">
              <input
                type="text"
                value={
                  isListening && interimText
                    ? `${input}${input ? " " : ""}${interimText}`
                    : input
                }
                onChange={(e) => {
                  if (!isListening) setInput(e.target.value);
                }}
                onKeyDown={handleKeyDown}
                placeholder={
                  isListening
                    ? t("voiceListening")
                    : isSpeaking
                      ? t("voiceSpeaking")
                      : isProcessing
                        ? t("voiceProcessing")
                        : t("typeQuestion")
                }
                data-ocid={`${widgetId}.advisor_input`}
                className={`w-full h-9 px-3 text-xs rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors ${
                  isListening
                    ? "border-destructive/50 bg-destructive/5 text-muted-foreground placeholder:text-destructive/70 italic"
                    : isSpeaking
                      ? "border-primary/40 bg-primary/5 text-muted-foreground placeholder:text-primary/70 italic"
                      : isProcessing
                        ? "border-accent/40 bg-accent/5 text-muted-foreground placeholder:text-accent/70 italic"
                        : "border-input bg-background"
                }`}
              />
              {/* Interim transcript shown in grayed-out overlay style is handled by value above */}
            </div>

            <button
              type="button"
              onClick={() => handleAsk()}
              disabled={
                !input.trim() || thinking || isListening || isProcessing
              }
              data-ocid={`${widgetId}.advisor_send_button`}
              aria-label="Send"
              className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40 transition-smooth active:scale-95 shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Voice not supported note */}
          {!voiceSupported && (
            <p
              data-ocid={`${widgetId}.voice_not_supported`}
              className="mt-1 text-[10px] text-muted-foreground/60 text-center"
            >
              {t("voiceNotSupported")}
            </p>
          )}

          {/* Voice status bar */}
          <div className="flex items-center gap-2 mt-1.5 min-h-[1.25rem]">
            {isListening && (
              <span
                className="flex items-center gap-1.5 text-[10px] text-destructive font-medium"
                data-ocid={`${widgetId}.listening_indicator`}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive" />
                </span>
                {t("voiceListening")}
              </span>
            )}
            {isProcessing && (
              <span
                className="flex items-center gap-1.5 text-[10px] text-accent font-medium"
                data-ocid={`${widgetId}.processing_indicator`}
              >
                <span
                  className="inline-block w-2 h-2 rounded-full border border-accent border-t-transparent animate-spin"
                  aria-hidden="true"
                />
                {t("voiceProcessing")}
              </span>
            )}
            {isSpeaking && (
              <span
                className="flex items-center gap-1.5 text-[10px] text-primary font-medium"
                data-ocid={`${widgetId}.speaking_indicator`}
              >
                <Volume2 className="w-3 h-3 animate-pulse" />
                {t("voiceSpeaking")}
              </span>
            )}

            <div className="ml-auto flex items-center gap-1">
              {isSpeaking && (
                <button
                  type="button"
                  onClick={stopSpeakingNow}
                  data-ocid={`${widgetId}.stop_speaking_button`}
                  aria-label={t("stopSpeaking")}
                  title={t("stopSpeaking")}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-destructive/10 text-destructive border border-destructive/30 hover:bg-destructive/20 transition-smooth"
                >
                  <VolumeX className="w-3 h-3" />
                  {t("stopSpeaking")}
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  stopSpeakingNow();
                  stopListening();
                  setChatOpen(false);
                  setMessages([]);
                }}
                data-ocid={`${widgetId}.advisor_close_button`}
                aria-label="Close chat"
                className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-smooth shrink-0"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
