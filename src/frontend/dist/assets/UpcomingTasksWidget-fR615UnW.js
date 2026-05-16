import { k as createLucideIcon, a as useLanguageStore, r as reactExports, j as jsxRuntimeExports, y as MapPin, G as Bell, B as Button, H as ChevronDown, J as Mic, X, K as Clock, N as CircleCheck, T as TrendingUp, u as useAuthStore, b as useNavigate, O as CalendarDays, m as Badge } from "./index-BUVIgngH.js";
import { S as Sparkles } from "./sparkles-CaU8FUVB.js";
import { L as Lightbulb } from "./lightbulb-BbCrq2Ko.js";
import { C as ChevronUp } from "./chevron-up-CnJPygwE.js";
import { S as Send } from "./send-B_LO1ymC.js";
import { T as TriangleAlert } from "./triangle-alert-CqH2Gyzq.js";
import { l as loadEvents, E as EVENT_TYPE_CONFIG } from "./calendarTypes-ZI3l1TGg.js";
import { R as RefreshCw } from "./refresh-cw-BNbremAW.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M12 8V4H8", key: "hb8ula" }],
  ["rect", { width: "16", height: "12", x: "4", y: "8", rx: "2", key: "enze0r" }],
  ["path", { d: "M2 14h2", key: "vft8re" }],
  ["path", { d: "M20 14h2", key: "4cs60a" }],
  ["path", { d: "M15 13v2", key: "1xurst" }],
  ["path", { d: "M9 13v2", key: "rq6x2g" }]
];
const Bot = createLucideIcon("bot", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M4.9 19.1C1 15.2 1 8.8 4.9 4.9", key: "1vaf9d" }],
  ["path", { d: "M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5", key: "u1ii0m" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
  ["path", { d: "M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5", key: "1j5fej" }],
  ["path", { d: "M19.1 4.9C23 8.8 23 15.1 19.1 19", key: "10b0cb" }]
];
const Radio = createLucideIcon("radio", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["path", { d: "M16 9a5 5 0 0 1 0 6", key: "1q6k2b" }],
  ["path", { d: "M19.364 18.364a9 9 0 0 0 0-12.728", key: "ijwkga" }]
];
const Volume2 = createLucideIcon("volume-2", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["line", { x1: "22", x2: "16", y1: "9", y2: "15", key: "1ewh16" }],
  ["line", { x1: "16", x2: "22", y1: "9", y2: "15", key: "5ykzw1" }]
];
const VolumeX = createLucideIcon("volume-x", __iconNode);
function getSpeechRecognition() {
  if (typeof window === "undefined") return null;
  return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null;
}
function speakText(text, lang, onEnd) {
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
const SEASON_LABELS = {
  planting: { en: "Planting Season", sw: "Msimu wa Kupanda" },
  growing: { en: "Growing Season", sw: "Msimu wa Ukuaji" },
  harvesting: { en: "Harvesting Season", sw: "Msimu wa Mavuno" },
  dry: { en: "Dry Season", sw: "Kiangazi" }
};
const WEATHER_LABELS = {
  sunny: { en: "Sunny", sw: "Jua", emoji: "☀️" },
  rainy: { en: "Rainy", sw: "Mvua", emoji: "🌧️" },
  dry: { en: "Dry", sw: "Kavu", emoji: "🌵" }
};
function AIAdvisorWidget({
  userName,
  tips,
  reminders,
  getMockResponse,
  widgetId,
  userContext,
  suggestedQuestions
}) {
  var _a, _b, _c, _d, _e;
  const { t, language } = useLanguageStore();
  const [chatOpen, setChatOpen] = reactExports.useState(false);
  const [messages, setMessages] = reactExports.useState([]);
  const msgIdRef = reactExports.useRef(0);
  const [input, setInput] = reactExports.useState("");
  const [thinking, setThinking] = reactExports.useState(false);
  const [activeTab, setActiveTab] = reactExports.useState("tips");
  const chatEndRef = reactExports.useRef(null);
  const [voiceState, setVoiceState] = reactExports.useState("idle");
  const [interimText, setInterimText] = reactExports.useState("");
  const [voiceSupported, setVoiceSupported] = reactExports.useState(true);
  const lastInputWasVoiceRef = reactExports.useRef(false);
  const recognitionRef = reactExports.useRef(null);
  const stopRecTimerRef = reactExports.useRef(null);
  const voiceLang = language === "sw" ? "sw-TZ" : "en-US";
  reactExports.useEffect(() => {
    if (!getSpeechRecognition()) setVoiceSupported(false);
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
    }
    return () => {
      var _a2, _b2;
      (_a2 = recognitionRef.current) == null ? void 0 : _a2.abort();
      if (stopRecTimerRef.current) clearTimeout(stopRecTimerRef.current);
      (_b2 = window.speechSynthesis) == null ? void 0 : _b2.cancel();
    };
  }, []);
  reactExports.useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = voiceLang;
    }
  }, [voiceLang]);
  const stopSpeakingNow = reactExports.useCallback(() => {
    var _a2;
    (_a2 = window.speechSynthesis) == null ? void 0 : _a2.cancel();
    setVoiceState("idle");
  }, []);
  const stopListening = reactExports.useCallback(() => {
    var _a2;
    (_a2 = recognitionRef.current) == null ? void 0 : _a2.stop();
    if (stopRecTimerRef.current) clearTimeout(stopRecTimerRef.current);
    setVoiceState("idle");
    setInterimText("");
  }, []);
  const firstName = userName.split(" ")[0];
  const speakResponse = reactExports.useCallback(
    (text) => {
      setVoiceState("speaking");
      speakText(text, voiceLang, () => setVoiceState("idle"));
    },
    [voiceLang]
  );
  const processQuestion = reactExports.useCallback(
    (q, fromVoice) => {
      if (!q || thinking) return;
      setInput("");
      lastInputWasVoiceRef.current = fromVoice;
      const userMsg = {
        id: ++msgIdRef.current,
        role: "user",
        text: q
      };
      setMessages((prev) => [...prev, userMsg]);
      setThinking(true);
      if (fromVoice) setVoiceState("processing");
      setMessages((prev) => {
        setTimeout(
          () => {
            setMessages((current) => {
              const response = getMockResponse(q, current);
              const advisorMsg = {
                id: ++msgIdRef.current,
                role: "advisor",
                text: response
              };
              const updated = [...current, advisorMsg];
              setThinking(false);
              setTimeout(
                () => {
                  var _a2;
                  return (_a2 = chatEndRef.current) == null ? void 0 : _a2.scrollIntoView({ behavior: "smooth" });
                },
                50
              );
              if (fromVoice) {
                speakResponse(response);
              } else {
                setVoiceState("idle");
              }
              return updated;
            });
          },
          1200 + Math.random() * 400
        );
        return prev;
      });
    },
    [thinking, getMockResponse, speakResponse]
  );
  const handleAsk = (question) => {
    const q = (question ?? input).trim();
    processQuestion(q, false);
  };
  const startListening = reactExports.useCallback(() => {
    var _a2;
    const SR = getSpeechRecognition();
    if (!SR || voiceState !== "idle") return;
    (_a2 = window.speechSynthesis) == null ? void 0 : _a2.cancel();
    const recognition = new SR();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = voiceLang;
    recognitionRef.current = recognition;
    let capturedFinal = "";
    setInput("");
    recognition.onresult = (e) => {
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
    recognition.onerror = (e) => {
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        setVoiceSupported(false);
        alert(t("micNotAvailable"));
      }
      setVoiceState("idle");
      setInterimText("");
    };
    recognition.onend = () => {
      if (stopRecTimerRef.current) clearTimeout(stopRecTimerRef.current);
      setVoiceState((prev) => prev === "listening" ? "idle" : prev);
      setInterimText("");
      if (capturedFinal) {
        setTimeout(() => processQuestion(capturedFinal, true), 150);
      }
    };
    recognition.start();
    setVoiceState("listening");
    stopRecTimerRef.current = setTimeout(() => recognition.stop(), 1e4);
  }, [voiceState, voiceLang, t, processQuestion]);
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };
  const isListening = voiceState === "listening";
  const isProcessing = voiceState === "processing";
  const isSpeaking = voiceState === "speaking";
  const greeting = language === "sw" ? `Habari ${firstName}! Hapa kuna ushauri wa leo:` : `Hello ${firstName}! Here are your personalized tips for today:`;
  const hasReminders = reminders && reminders.length > 0;
  const micButtonClass = isListening ? "bg-destructive/10 border-2 border-destructive text-destructive shadow-[0_0_0_3px_rgba(var(--destructive),0.15)]" : isProcessing || isSpeaking ? "bg-muted border border-border text-muted-foreground/40 cursor-not-allowed" : "bg-muted border border-border text-muted-foreground hover:text-foreground hover:bg-muted/80";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      "data-ocid": `${widgetId}.ai_advisor_section`,
      className: "rounded-2xl overflow-hidden border border-accent/20 bg-gradient-to-br from-background to-accent/5",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 pt-4 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-4 h-4 text-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-display font-semibold text-foreground", children: t("aiAdvisor") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: greeting })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-accent opacity-60" })
        ] }),
        userContext && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": `${widgetId}.context_badge`,
            className: "flex items-center flex-wrap gap-1.5 bg-accent/10 border border-accent/20 rounded-lg px-2.5 py-1.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-[10px] text-accent font-medium", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-2.5 h-2.5 flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: userContext.location })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent/40 text-[10px]", children: "·" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-accent font-medium", children: language === "sw" ? (_a = SEASON_LABELS[userContext.season]) == null ? void 0 : _a.sw : (_b = SEASON_LABELS[userContext.season]) == null ? void 0 : _b.en }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent/40 text-[10px]", children: "·" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-accent font-medium", children: [
                (_c = WEATHER_LABELS[userContext.weatherCondition]) == null ? void 0 : _c.emoji,
                " ",
                language === "sw" ? (_d = WEATHER_LABELS[userContext.weatherCondition]) == null ? void 0 : _d.sw : (_e = WEATHER_LABELS[userContext.weatherCondition]) == null ? void 0 : _e.en
              ] }),
              userContext.cropTypes && userContext.cropTypes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent/40 text-[10px]", children: "·" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-accent font-medium", children: userContext.cropTypes.slice(0, 2).join(", ") })
              ] }),
              userContext.animalTypes && userContext.animalTypes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent/40 text-[10px]", children: "·" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-accent font-medium", children: userContext.animalTypes.slice(0, 2).join(", ") })
              ] })
            ]
          }
        ) }),
        hasReminders && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 pb-2 flex gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": `${widgetId}.tips_tab`,
              onClick: () => setActiveTab("tips"),
              className: `flex-1 text-[11px] font-medium py-1.5 rounded-lg border transition-smooth ${activeTab === "tips" ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "w-3 h-3 inline mr-1" }),
                language === "sw" ? "Vidokezo" : "Tips"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": `${widgetId}.reminders_tab`,
              onClick: () => setActiveTab("reminders"),
              className: `flex-1 text-[11px] font-medium py-1.5 rounded-lg border transition-smooth ${activeTab === "reminders" ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-3 h-3 inline mr-1" }),
                language === "sw" ? "Vikumbusho" : "Reminders",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-destructive text-primary-foreground text-[8px] font-bold", children: reminders == null ? void 0 : reminders.length })
              ]
            }
          )
        ] }),
        (!hasReminders || activeTab === "tips") && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pb-3 space-y-2", children: tips.map((tip, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": `${widgetId}.ai_tip.${idx + 1}`,
            className: "bg-card border-l-4 border-primary rounded-lg px-3 py-2.5 flex items-start gap-2.5 shadow-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5", children: tip.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground truncate", children: tip.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground leading-snug mt-0.5", children: tip.advice })
              ] })
            ]
          },
          tip.title
        )) }),
        hasReminders && activeTab === "reminders" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pb-3 space-y-2", children: reminders == null ? void 0 : reminders.map((r, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": `${widgetId}.reminder.${idx + 1}`,
            className: "bg-card border-l-4 border-amber-400 rounded-lg px-3 py-2.5 flex items-start gap-2.5 shadow-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full bg-amber-400/15 flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-3.5 h-3.5 text-amber-500" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold text-amber-600 uppercase tracking-wide", children: r.dueLabel }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-foreground leading-snug mt-0.5", children: r.text })
              ] })
            ]
          },
          r.text
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            size: "sm",
            "data-ocid": `${widgetId}.ask_advisor_button`,
            onClick: () => setChatOpen((v) => !v),
            className: "w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-xs h-9",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-3.5 h-3.5" }),
              t("askAdvisor"),
              chatOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-3.5 h-3.5 ml-auto" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3.5 h-3.5 ml-auto" })
            ]
          }
        ) }),
        chatOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": `${widgetId}.ai_chat_panel`,
            className: "border-t border-accent/20 bg-card/80 px-3 pt-3 pb-3",
            children: [
              messages.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 mb-3 max-h-64 overflow-y-auto", children: [
                messages.map((msg) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`,
                    children: [
                      msg.role === "advisor" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-3 h-3 text-accent" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 max-w-[82%]", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: `rounded-xl px-3 py-2 text-xs leading-relaxed ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-muted text-foreground rounded-tl-sm"}`,
                            children: msg.text
                          }
                        ),
                        msg.role === "advisor" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            onClick: () => speakResponse(msg.text),
                            disabled: isSpeaking || isListening || isProcessing,
                            "data-ocid": `${widgetId}.speak_message.${msg.id}`,
                            "aria-label": t("listenToResponse"),
                            title: t("listenToResponse"),
                            className: "self-start flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-medium text-muted-foreground hover:text-accent hover:bg-accent/10 border border-transparent hover:border-accent/20 transition-smooth disabled:opacity-30 disabled:cursor-not-allowed",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "w-2.5 h-2.5" }),
                              t("listenToResponse")
                            ]
                          }
                        )
                      ] })
                    ]
                  },
                  msg.id
                )),
                (thinking || isProcessing) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-3 h-3 text-accent" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted rounded-xl rounded-tl-sm px-3 py-2 text-xs text-muted-foreground italic flex items-center gap-1.5", children: isProcessing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "inline-block w-3 h-3 rounded-full border-2 border-accent border-t-transparent animate-spin",
                        "aria-hidden": "true"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("voiceProcessing") })
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    t("advisorThinking"),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex gap-0.5 ml-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "animate-bounce",
                          style: { animationDelay: "0ms" },
                          children: "."
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "animate-bounce",
                          style: { animationDelay: "150ms" },
                          children: "."
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "animate-bounce",
                          style: { animationDelay: "300ms" },
                          children: "."
                        }
                      )
                    ] })
                  ] }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: chatEndRef })
              ] }),
              messages.length === 0 && !thinking && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground text-center mb-3", children: language === "sw" ? "Uliza mshauri wako swali lolote kuhusu shamba lako" : "Ask your advisor any question about your farm" }),
              suggestedQuestions && suggestedQuestions.length > 0 && messages.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mb-3", children: suggestedQuestions.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": `${widgetId}.quick_question`,
                  onClick: () => handleAsk(q),
                  className: "text-[10px] px-2.5 py-1 rounded-full bg-accent/10 border border-accent/25 text-accent font-medium hover:bg-accent/20 transition-smooth whitespace-nowrap",
                  children: q
                },
                q
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5 items-center", children: [
                voiceSupported ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: isListening ? stopListening : startListening,
                    disabled: isProcessing || isSpeaking || thinking,
                    "data-ocid": `${widgetId}.advisor_mic_button`,
                    "aria-label": isListening ? t("stopRecording") : t("tapToSpeak"),
                    title: isListening ? t("stopRecording") : t("tapToSpeak"),
                    className: `w-9 h-9 rounded-full flex items-center justify-center transition-smooth active:scale-95 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed relative ${micButtonClass}`,
                    children: isListening ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "absolute inset-0 rounded-full animate-ping bg-destructive/30",
                          "aria-hidden": "true"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "absolute inset-[-4px] rounded-full border-2 border-destructive/50 animate-pulse",
                          "aria-hidden": "true"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "w-4 h-4 relative text-destructive" })
                    ] }) : isSpeaking ? /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "w-4 h-4 text-primary animate-pulse" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "w-4 h-4" })
                  }
                ) : null,
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    value: isListening && interimText ? `${input}${input ? " " : ""}${interimText}` : input,
                    onChange: (e) => {
                      if (!isListening) setInput(e.target.value);
                    },
                    onKeyDown: handleKeyDown,
                    placeholder: isListening ? t("voiceListening") : isSpeaking ? t("voiceSpeaking") : isProcessing ? t("voiceProcessing") : t("typeQuestion"),
                    "data-ocid": `${widgetId}.advisor_input`,
                    className: `w-full h-9 px-3 text-xs rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors ${isListening ? "border-destructive/50 bg-destructive/5 text-muted-foreground placeholder:text-destructive/70 italic" : isSpeaking ? "border-primary/40 bg-primary/5 text-muted-foreground placeholder:text-primary/70 italic" : isProcessing ? "border-accent/40 bg-accent/5 text-muted-foreground placeholder:text-accent/70 italic" : "border-input bg-background"}`
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => handleAsk(),
                    disabled: !input.trim() || thinking || isListening || isProcessing,
                    "data-ocid": `${widgetId}.advisor_send_button`,
                    "aria-label": "Send",
                    className: "w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40 transition-smooth active:scale-95 shrink-0",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-3.5 h-3.5" })
                  }
                )
              ] }),
              !voiceSupported && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  "data-ocid": `${widgetId}.voice_not_supported`,
                  className: "mt-1 text-[10px] text-muted-foreground/60 text-center",
                  children: t("voiceNotSupported")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1.5 min-h-[1.25rem]", children: [
                isListening && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "flex items-center gap-1.5 text-[10px] text-destructive font-medium",
                    "data-ocid": `${widgetId}.listening_indicator`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2 w-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-destructive" })
                      ] }),
                      t("voiceListening")
                    ]
                  }
                ),
                isProcessing && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "flex items-center gap-1.5 text-[10px] text-accent font-medium",
                    "data-ocid": `${widgetId}.processing_indicator`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "inline-block w-2 h-2 rounded-full border border-accent border-t-transparent animate-spin",
                          "aria-hidden": "true"
                        }
                      ),
                      t("voiceProcessing")
                    ]
                  }
                ),
                isSpeaking && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "flex items-center gap-1.5 text-[10px] text-primary font-medium",
                    "data-ocid": `${widgetId}.speaking_indicator`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "w-3 h-3 animate-pulse" }),
                      t("voiceSpeaking")
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-1", children: [
                  isSpeaking && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: stopSpeakingNow,
                      "data-ocid": `${widgetId}.stop_speaking_button`,
                      "aria-label": t("stopSpeaking"),
                      title: t("stopSpeaking"),
                      className: "flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-destructive/10 text-destructive border border-destructive/30 hover:bg-destructive/20 transition-smooth",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(VolumeX, { className: "w-3 h-3" }),
                        t("stopSpeaking")
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        stopSpeakingNow();
                        stopListening();
                        setChatOpen(false);
                        setMessages([]);
                      },
                      "data-ocid": `${widgetId}.advisor_close_button`,
                      "aria-label": "Close chat",
                      className: "w-7 h-7 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-smooth shrink-0",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      ]
    }
  );
}
const HIGHLAND_REGIONS = [
  "Mbeya",
  "Iringa",
  "Njombe",
  "Kilimanjaro",
  "Arusha",
  "Ruvuma"
];
const COASTAL_REGIONS = ["Dar es Salaam", "Tanga", "Pwani", "Lindi", "Mtwara"];
const LAKE_REGIONS = ["Mwanza", "Kagera", "Mara", "Geita", "Simiyu", "Kigoma"];
function getTerrainType(location) {
  if (HIGHLAND_REGIONS.some((r) => location.includes(r))) return "highland";
  if (COASTAL_REGIONS.some((r) => location.includes(r))) return "coastal";
  if (LAKE_REGIONS.some((r) => location.includes(r))) return "lake";
  return "inland";
}
function detectTopic(q) {
  const t = q.toLowerCase();
  if (/(fertiliz|mbolea|urea|can|dap|npk)/.test(t)) return "fertilizer";
  if (/(disease|ugonjwa|infection|fungus|blight|rust|kutu)/.test(t))
    return "disease";
  if (/(pest|wadudu|armyworm|viwavi|aphid|caterpillar)/.test(t)) return "pest";
  if (/(market|bei|price|sell|soko|uza)/.test(t)) return "market";
  if (/(water|maji|irrigat|umwagiliaj|dry|kame)/.test(t)) return "water";
  if (/(plant|panda|sow|seed|mbegu)/.test(t)) return "planting";
  if (/(harvest|mavuno|pick|collect|vuna)/.test(t)) return "harvest";
  if (/(soil|udongo|ph|nitrogen|phosphorus|organic)/.test(t)) return "soil";
  if (/(weather|hali ya hewa|rain|mvua|forecast|reminder|kumbusho|show me|nionyeshe)/.test(
    t
  ))
    return "weather";
  if (/(vaccin|chanjo|fmd|ecf|blackquarter|brucell)/.test(t)) return "vaccine";
  if (/(feed|chakula|fodder|hay|silage|malisho)/.test(t)) return "feed";
  if (/(breed|mating|uzazi|reproduction|calf|lamb)/.test(t)) return "breed";
  if (/(health|mgonjwa|sick|afya|treatment|matibabu)/.test(t)) return "health";
  return "general";
}
function buildContextRef(history, lang, crop) {
  const lastAdvisorMsg = [...history].reverse().find((m) => m.role === "advisor");
  if (!lastAdvisorMsg) return "";
  const hasRef = lastAdvisorMsg.text.toLowerCase().includes(crop.toLowerCase());
  if (hasRef) {
    return lang === "sw" ? `Kama nilivyotaja kuhusu ${crop} wako, ` : `As I mentioned about your ${crop}, `;
  }
  return lang === "sw" ? "Kuongezea ushauri wangu wa awali, " : "Building on my earlier advice, ";
}
function generateFarmerResponse(question, history, ctx, lang) {
  var _a, _b;
  const topic = detectTopic(question);
  const crop = ((_a = ctx.cropTypes) == null ? void 0 : _a[0]) ?? "your crops";
  const allCrops = ((_b = ctx.cropTypes) == null ? void 0 : _b.join(", ")) ?? crop;
  const terrain = getTerrainType(ctx.location);
  const ref = history.length > 1 ? buildContextRef(history, lang, crop) : "";
  const isMultiTurn = history.filter((m) => m.role === "advisor").length > 0;
  const continuity = isMultiTurn && ref ? ref : "";
  const isRainy = ctx.weatherCondition === "rainy" || ctx.season === "planting";
  const isDry = ctx.weatherCondition === "dry" || ctx.season === "dry";
  const isHarvest = ctx.season === "harvesting";
  const isPlanting = ctx.season === "planting";
  if (topic === "fertilizer") {
    if (lang === "sw") {
      return `${continuity}Kwa ${crop} huko ${ctx.location}, ${isPlanting ? "wakati huu wa kupanda, weka DAP (50kg/ekari) shambani kabla ya kupanda. Hii itasaidia mizizi kukua vizuri." : isRainy ? "kwa sababu ya mvua, weka mbolea ya CAN (50kg/ekari) taratibu ili kuzuia kupotea kwa virutubisho." : isDry ? "wakati wa ukame, subiri mvua kwanza au mwagilie vizuri kabla ya kuweka mbolea." : "weka mbolea ya top-dress (CAN 50kg/ekari) mimea ikiwa urefu wa magoti."}`;
    }
    return `${continuity}For ${crop} in ${ctx.location}, ${isPlanting ? "at planting time, apply DAP (50kg/acre) in the planting furrow. This supports strong root development from the start." : isRainy ? "with rain coming, apply CAN (50kg/acre) in split doses to minimize nutrient leaching." : isDry ? "wait for rain or irrigate before applying fertilizer — dry soil leads to nutrient burn." : "top-dress with CAN (50kg/acre) when plants reach knee height for best uptake."} ${terrain === "highland" ? "Highland soils in your area benefit from added phosphorus." : ""}`;
  }
  if (topic === "disease" || topic === "pest") {
    const riskLevel = isRainy ? "high" : isDry ? "low" : "moderate";
    if (lang === "sw") {
      return `${continuity}Hatari ya magonjwa kwa ${crop} huko ${ctx.location} ni ${riskLevel === "high" ? "ya juu" : riskLevel === "low" ? "ya chini" : "ya wastani"} ${isRainy ? "kutokana na mvua nyingi" : isDry ? "wakati wa kiangazi" : "msimu huu"}. Angalia ${crop.toLowerCase().includes("maize") || crop.toLowerCase().includes("mahindi") ? "dalili za ugonjwa wa blight na viwavi (fall armyworm)" : crop.toLowerCase().includes("bean") || crop.toLowerCase().includes("maharagwe") ? "dalili za bean rust na aphids" : "dalili za magonjwa mapema"}. Pakia picha kwenye zana ya Gundua Ugonjwa kwa uchunguzi wa haraka.`;
    }
    return `${continuity}Disease risk for ${crop} in ${ctx.location} is currently ${riskLevel} ${isRainy ? "due to wet conditions" : isDry ? "during the dry period" : "this season"}. Watch for ${crop.toLowerCase().includes("maize") ? "fall armyworm, grey leaf spot, and blight" : crop.toLowerCase().includes("bean") ? "bean rust, angular leaf spot, and aphid infestations" : crop.toLowerCase().includes("rice") ? "rice blast and stem borers" : "early signs of fungal lesions or wilting"}. Use the AI Diagnosis tool for an instant photo-based assessment.`;
  }
  if (topic === "market") {
    if (lang === "sw") {
      return `${continuity}Bei za ${allCrops} huko ${ctx.location} ${isHarvest ? "zinaendelea kushuka wakati wa mavuno — subiri wiki 4–6 baada ya mavuno mengi kuisha ili kupata bei nzuri zaidi." : isPlanting ? "zinaendelea kupanda kwa sababu ya akiba ndogo — wakati huu ni mzuri wa kuuza kama una akiba." : "zina hali nzuri. Fuatilia soko la Dar es Salaam na Mwanza kwa bei za juu zaidi."}`;
    }
    return `${continuity}Market prices for ${allCrops} in ${ctx.location} ${isHarvest ? "tend to dip at peak harvest — hold stock for 4–6 weeks post-harvest to capture a 15–25% price premium." : isPlanting ? "are elevated due to low stocks — if you have stored produce, now is a good time to sell." : "are currently stable. Monitor Dar es Salaam and Mwanza markets for best buyer prices."} ${terrain === "highland" ? "Highland crops command quality premiums in urban markets." : ""}`;
  }
  if (topic === "water") {
    if (lang === "sw") {
      return `${continuity}${isDry ? `Wakati wa kiangazi huko ${ctx.location}, ${crop} unahitaji umwagiliaji wa kina (mm 25–30) kila wiki 1–2. Inashauriwa kumwagilia mara 3 kwa wiki kwa dakika 40–50 kila wakati, asubuhi mapema (saa 11–2am) kupunguza uvukizi kwa 40%. Matone ya umwagiliaji hupunguza upotevu wa maji kwa hadi 50%.` : isRainy ? `Kutokana na mvua, hakikisha mashamba yana mifereji mizuri ya maji. Maji mengi yanaweza kusababisha magonjwa ya mizizi kwa ${crop}. Subiri mvua ipungue kabla ya kuanza umwagiliaji tena.` : `Unyevu wa udongo uko wastani. Kabla ya kumwagilia, angalia unyevu kwa kuingiza vidole viwili sentimita 5 kwenye udongo. Kwa hali ya sasa, umwagiliaji wa mara 2 kwa wiki kwa ${crop} wako huko ${ctx.location} ni mzuri. Tembea kwenye ukurasa wa Umwagiliaji Mahiri kwa ratiba kamili.`}${isDry ? " Tembelea ukurasa wa Umwagiliaji Mahiri kwa ratiba ya kina na muda wa kila umwagiliaji." : ""}`;
    }
    return `${continuity}${isDry ? `During the dry spell in ${ctx.location}, ${crop} needs irrigation every 10–14 days (25–30mm). Recommended schedule: 3 times per week for 40–50 minutes each session, ideally between 5–7am to reduce evaporation by up to 40%. Drip irrigation cuts water use by 50% vs. flood irrigation.` : isRainy ? `With ongoing rains, ensure your fields have adequate drainage. Waterlogging is the main risk for ${crop} roots and can cause root rot within days. Hold off on additional irrigation until the rains subside.` : `Soil moisture looks adequate for now. Before irrigating, push two fingers 5cm into the soil — if dry at that depth, irrigate. For current conditions, ${crop} in ${ctx.location} benefits from 2x per week watering. Visit the Smart Irrigation page for a full personalised schedule.`}${isDry ? " Visit the Smart Irrigation page for a detailed schedule with exact timing and water volume recommendations." : ""}`;
  }
  if (topic === "planting") {
    if (lang === "sw") {
      return `${continuity}Wakati mzuri wa kupanda ${crop} huko ${ctx.location} ${isPlanting ? `ni sasa hivi — mvua za mwanzo zimewadia. Panda kwa kina cha cm 5–7 na nafasi ya ${crop.toLowerCase().includes("maize") ? "75cm × 30cm" : "45cm × 15cm"}.` : isDry ? "utakapokuja mwanzo wa mvua. Andaa mbegu sasa — sanitize na dawa ya mbegu kabla ya kupanda." : "unategemea sasa. Angalia utabiri wa hali ya hewa — mvua za kwanza za mwaka ni ishara ya kuanza kupanda."}`;
    }
    return `${continuity}Optimal planting time for ${crop} in ${ctx.location} ${isPlanting ? `is now — first rains have arrived. Plant at 5–7cm depth, spacing ${crop.toLowerCase().includes("maize") ? "75cm × 30cm" : "45cm × 15cm"} for maximum yield.` : isDry ? "will be at the start of the next rain season. Prepare your seeds now — treat with fungicide seed dressing before storage." : "is approaching. Monitor the first reliable rains — that is your planting signal for best germination rates."} ${terrain === "highland" ? "Highland areas get more reliable rains but can experience frost — plant after the last frost risk." : ""}`;
  }
  if (topic === "harvest") {
    if (lang === "sw") {
      return `${continuity}Mavuno ya ${crop} huko ${ctx.location} ${isHarvest ? "yako karibu au yanaendelea. Vuna asubuhi mapema kupunguza kupotea kwa unyevu. Kausha vizuri kabla ya kuhifadhi — unyevu chini ya 13% unazuia kutu." : "hayajakaribia bado. Endelea kutunza mazao na ufanye ukaguzi wa masamba kila wiki."}`;
    }
    return `${continuity}Harvest timing for ${crop} in ${ctx.location} ${isHarvest ? "is now or imminent. Harvest in the morning to reduce moisture loss. Dry to below 13% moisture before storage to prevent mould and losses." : "is still ahead. Continue good crop management and scout fields weekly for any issues that could reduce final yield."}`;
  }
  if (topic === "soil") {
    if (lang === "sw") {
      return `${continuity}Udongo huko ${ctx.location} ${terrain === "highland" ? `(ardhi ya juu) mara nyingi una asidi nyingi. Weka chokaa (2 tani/hekta) kila miaka 2–3 ili kusawazisha pH. Faida kubwa kwa ${crop}.` : terrain === "coastal" ? "(pwani) una chumvi ya juu. Weka viumbe vya udongo (mbolea ya samadi) kuimarisha muundo wa udongo." : "una afya nzuri kwa ujumla. Fanya uchunguzi wa udongo kila mwaka 2 kupata mapendekezo sahihi ya mbolea."}`;
    }
    return `${continuity}Soils in ${ctx.location} ${terrain === "highland" ? `(highland) are typically acidic. Apply lime (2 tonnes/ha) every 2–3 years to correct pH — this alone can improve ${crop} yields by up to 20%.` : terrain === "coastal" ? "(coastal) can have higher salinity. Work in compost or organic matter to improve soil structure and reduce salt stress." : "are generally productive. Conduct a soil test every 2 years for precise fertilizer recommendations tailored to your specific field."}`;
  }
  if (topic === "weather") {
    if (lang === "sw") {
      return `${continuity}Hali ya hewa huko ${ctx.location} ni ${ctx.weatherCondition === "rainy" ? "mvua — angalia mafuriko na magonjwa" : ctx.weatherCondition === "dry" ? "kame — weka mpango wa umwagiliaji" : `jua — hali nzuri kwa ukuaji wa ${crop}`}. Msimu wa sasa: ${SEASON_LABELS_SW[ctx.season]}. Angalia utabiri wako wa hali ya hewa kila siku.`;
    }
    return `${continuity}Current weather in ${ctx.location} is ${ctx.weatherCondition === "rainy" ? "rainy — monitor for flooding and fungal disease risk" : ctx.weatherCondition === "dry" ? "dry — prioritise irrigation and water conservation" : `sunny — ideal conditions for ${crop} photosynthesis and growth`}. We are in the ${ctx.season} season. Check the daily forecast in your Weather widget.`;
  }
  if (lang === "sw") {
    return `${continuity}Kulingana na shamba lako la ${allCrops} huko ${ctx.location} wakati wa ${SEASON_LABELS_SW[ctx.season]}, ninakushauri ${isRainy ? "kukagua magonjwa ya majani kila siku na kuhakikisha mifereji ya maji inafanya kazi vizuri" : isDry ? "kuangalia unyevu wa udongo na kupanga umwagiliaji mapema" : "kuendelea na ukaguzi wa kawaida wa shamba na kufuatilia bei za soko"}. Je, una swali mahususi kuhusu ${crop} wako?`;
  }
  return `${continuity}Based on your ${allCrops} farm in ${ctx.location} during ${ctx.season} season with current ${ctx.weatherCondition} conditions, I recommend ${isRainy ? "daily scouting for leaf diseases and ensuring drainage channels are clear" : isDry ? "monitoring soil moisture closely and scheduling irrigation before stress signs appear" : "continuing regular field scouting and tracking market prices for optimal selling timing"}. Do you have a specific question about your ${crop}?`;
}
function generateLivestockResponse(question, history, ctx, lang) {
  var _a, _b;
  const topic = detectTopic(question);
  const animal = ((_a = ctx.animalTypes) == null ? void 0 : _a[0]) ?? "your animals";
  const allAnimals = ((_b = ctx.animalTypes) == null ? void 0 : _b.join(", ")) ?? animal;
  const isDry = ctx.weatherCondition === "dry" || ctx.season === "dry";
  const isRainy = ctx.weatherCondition === "rainy" || ctx.season === "planting";
  const ref = history.length > 1 ? buildContextRef(history, lang, animal) : "";
  const continuity = history.filter((m) => m.role === "advisor").length > 0 && ref ? ref : "";
  if (topic === "vaccine") {
    if (lang === "sw") {
      return `${continuity}Ratiba ya chanjo kwa ${allAnimals} huko ${ctx.location}: FMD (kila miezi 6), Brucellosis (kila mwaka kwa majike), Black Quarter (kila mwaka). ${ctx.season === "dry" ? "Wakati wa kiangazi, mifugo inakusanyika karibu na maji — hatari ya kuambukizana inaongezeka. Hakikisha chanjo zote zimefanywa kabla ya kiangazi." : "Chanjo za msimu huu zinahusisha CBPP na LSD. Wasiliana na daktari wa mifugo kupitia app."}`;
    }
    return `${continuity}Vaccination schedule for ${allAnimals} in ${ctx.location}: FMD (every 6 months), Brucellosis (annually for females), Black Quarter (annually). ${isDry ? "During dry season, animals congregate at water points — disease transmission risk rises significantly. Ensure all vaccines are current before the dry season peaks." : "This season also includes CBPP and LSD boosters. Book a vet visit through the app to stay on schedule."}`;
  }
  if (topic === "feed") {
    if (lang === "sw") {
      return `${continuity}Chakula bora kwa ${animal} huko ${ctx.location}: ${isDry ? "Wakati wa kiangazi, nyasi inaisha — hifadhi silage au hay mapema. Mtiririko wa maji lazima udumishwe (lita 30–50/siku kwa ng'ombe)." : "Nyasi ya kijani iko vizuri msimu huu. Ongeza kiwango cha madini (mineral block) kwa uzalishaji bora wa maziwa."} Kiwango cha lishe: roughage 60–70%, concentrates 20–30%, madini 5%.`;
    }
    return `${continuity}Feeding requirements for ${animal} in ${ctx.location}: ${isDry ? "Dry season challenges are critical — secure silage or hay stockpiles now. Water access is vital: cattle need 30–50L/day; ensure troughs and boreholes are operational." : "Good green pasture is available this season. Supplement with a mineral block to improve milk yield and weight gain."} Balanced ratio: 60–70% roughage, 20–30% concentrates, 5–10% minerals.`;
  }
  if (topic === "health" || topic === "disease") {
    if (lang === "sw") {
      return `${continuity}Dalili za kawaida za ugonjwa kwa ${animal} huko ${ctx.location} msimu huu: ${isRainy ? "mvua zinaongeza hatari ya Lumpy Skin Disease na ECF. Angalia mapunye, homa, na macho ya mtiririko." : isDry ? "kiangazi kinaongeza hatari ya trypanosomiasis (nagana) na FMD. Angalia wanyama wanaopungua uzito haraka au kukimbia maji." : "angalia dalili kama vile kupungua kwa chakula, macho ya mtiririko, au homa juu ya 39.5°C."} Pakia picha kwenye zana ya Gundua Ugonjwa kwa uchunguzi wa haraka wa AI.`;
    }
    return `${continuity}Common health risks for ${animal} in ${ctx.location} this season: ${isRainy ? "wet season increases risk of Lumpy Skin Disease and ECF. Watch for skin nodules, fever, and nasal discharge." : isDry ? "dry conditions raise risk of trypanosomiasis and FMD as animals crowd at water points. Monitor for rapid weight loss or reluctance to drink." : "watch for signs of reduced appetite, nasal discharge, or fever above 39.5°C."} Use the AI Diagnosis tool for a photo-based health assessment.`;
  }
  if (topic === "market") {
    if (lang === "sw") {
      return `${continuity}Bei za ${allAnimals} huko ${ctx.location} ${ctx.season === "dry" ? "zinapanda kabla ya sikukuu — wakati mzuri wa kuuza ng'ombe wazima (TSh 850,000–1,200,000 kulingana na uzito)." : "ziko wastani sasa. Panga kuuza wakati ambapo maudhui ya lishe ya wanyama wako yako mazuri — hii huongeza thamani."} Panga mifugo yako vizuri (grading) kabla ya kuipeleka sokoni.`;
    }
    return `${continuity}${animal} market prices in ${ctx.location} ${isDry ? "are rising ahead of festive season — prime selling window for mature bulls (TSh 850,000–1,200,000 depending on weight and condition)." : "are at a moderate level. Plan sales when animals are in peak body condition — well-fed animals command significantly higher prices."} Grade your animals before bringing them to market for better negotiating power.`;
  }
  if (topic === "breed") {
    if (lang === "sw") {
      return `${continuity}Uzazi bora kwa ${animal} huko ${ctx.location}: ${animal.toLowerCase().includes("cattle") || animal.toLowerCase().includes("ng'ombe") ? "Muda mzuri wa kupandisha ni baada ya mwezi mmoja wa mavuno wakati lishe iko bora. Nguruwe / ng'ombe wa kuzaa lazima wawe na BCS ya 3.0–3.5." : animal.toLowerCase().includes("goat") || animal.toLowerCase().includes("mbuzi") ? "Mbuzi huzaa mara 2 kwa mwaka. Tandabui zizaliwe wakati wa mvua — lishe iko bora." : "Fuatilia mzunguko wa uzazi na uhakikishe lishe bora kabla ya kipindi cha mating."}`;
    }
    return `${continuity}Breeding management for ${animal} in ${ctx.location}: ${animal.toLowerCase().includes("cattle") ? "Best conception rates occur when cows have a BCS of 3.0–3.5. Target breeding after the main harvest when nutrition is good." : animal.toLowerCase().includes("goat") ? "Goats can kid twice a year. Time kidding to coincide with the rainy season when nutrition is best for does and kids." : "Track your breeding calendar and ensure good nutrition in the pre-mating period for maximum conception rates."}`;
  }
  if (topic === "water") {
    if (lang === "sw") {
      return `${continuity}${isDry ? `Wakati wa kiangazi huko ${ctx.location}, maji ni muhimu sana. Ng'ombe 1 anahitaji lita 30–50 kwa siku. Hakikisha visima na mabwawa vina maji ya kutosha. Fanya mpango mbadala wa maji (water point).
          Mbuzi na kondoo wanahitaji lita 3–5 kwa siku.` : "Wakati wa mvua, maji yanapatikana vizuri. Hata hivyo, angalia mabwawa yasije yakichafuka — maji machafu yanasababisha magonjwa ya matumbo."}`;
    }
    return `${continuity}${isDry ? `Water management is critical in ${ctx.location} during the dry season. Cattle need 30–50L/day; goats and sheep need 3–5L/day. Inspect and clean water troughs weekly and identify backup water sources.` : "During rains, water is plentiful — but watch for contamination. Dirty standing water causes gastrointestinal diseases. Keep troughs elevated and clean."}`;
  }
  if (lang === "sw") {
    return `${continuity}Kwa mifugo yako ya ${allAnimals} huko ${ctx.location} wakati wa ${ctx.season === "dry" ? "kiangazi" : ctx.season === "planting" ? "kupanda" : ctx.season === "growing" ? "ukuaji" : "mavuno"}, ninakushauri ${isDry ? "kuhakikisha maji na chakula vinatosha, na chanjo zote zimefanywa" : isRainy ? "kutazama dalili za magonjwa ya mvua na kuweka malisho kavu" : "kuendelea na ufuatiliaji wa kawaida wa afya na kumbukumbu za mifugo"}. Je, una swali mahususi?`;
  }
  return `${continuity}For your ${allAnimals} in ${ctx.location} during ${ctx.season} season, I recommend ${isDry ? "ensuring adequate water and feed supplies, and ensuring vaccination records are up to date" : isRainy ? "monitoring for wet-season diseases and keeping feed dry and protected" : "continuing regular health monitoring and maintaining accurate animal records"}. What specific aspect of your herd would you like advice on?`;
}
function generateFarmerReminders(ctx, lang) {
  var _a;
  const crop = ((_a = ctx.cropTypes) == null ? void 0 : _a[0]) ?? "crops";
  const reminders = [];
  if (ctx.season === "planting") {
    reminders.push({
      dueLabel: lang === "sw" ? "Wiki hii" : "This week",
      text: lang === "sw" ? `Andaa mbegu za ${crop} — fanya matibabu ya mbegu kabla ya kupanda.` : `Prepare ${crop} seeds — treat with fungicide seed dressing before planting.`
    });
    reminders.push({
      dueLabel: lang === "sw" ? "Baada ya wiki 2" : "In 2 weeks",
      text: lang === "sw" ? "Weka mbolea ya DAP wakati wa kupanda — 50kg/ekari kwenye mstari wa kupanda." : "Apply DAP fertilizer at planting — 50kg/acre in the planting furrow."
    });
  } else if (ctx.season === "growing") {
    reminders.push({
      dueLabel: lang === "sw" ? "Juma lijalo" : "Next week",
      text: lang === "sw" ? `Weka mbolea ya CAN (top-dressing) kwa ${crop} — mimea ikiwa urefu wa goti.` : `Apply CAN top-dressing for ${crop} — plants at knee height is ideal timing.`
    });
    reminders.push({
      dueLabel: lang === "sw" ? "Mwezi ujao" : "Next month",
      text: lang === "sw" ? "Kagua masamba kwa viwavi na wadudu wengine — ongeza dawa ikiwa inahitajika." : "Scout fields for fall armyworm and aphids — spray only if thresholds are exceeded."
    });
  } else if (ctx.season === "harvesting") {
    reminders.push({
      dueLabel: lang === "sw" ? "Sasa hivi" : "Now",
      text: lang === "sw" ? `Vuna ${crop} asubuhi — kausha hadi unyevu wa chini ya 13% kabla ya kuhifadhi.` : `Harvest ${crop} in the early morning — dry to below 13% moisture before storage.`
    });
    reminders.push({
      dueLabel: lang === "sw" ? "Wiki ijayo" : "Next week",
      text: lang === "sw" ? `Angalia bei za soko — usipeleke ghala kabla ya kujua bei za soko za ${crop}.` : `Check market prices before selling — compare Dar es Salaam and local market rates for ${crop}.`
    });
  } else {
    reminders.push({
      dueLabel: lang === "sw" ? "Mwezi huu" : "This month",
      text: lang === "sw" ? "Fanya uchunguzi wa udongo wa shamba lako kabla ya msimu wa kupanda." : "Conduct a soil test before the upcoming planting season to plan fertilizer correctly."
    });
    reminders.push({
      dueLabel: lang === "sw" ? "Mwezi ujao" : "Next month",
      text: lang === "sw" ? `Hifadhi mbegu bora za ${crop} — tenga mbegu za ubora kutoka mavuno ya mwisho.` : `Store quality ${crop} seeds — select the best grain from last harvest for replanting.`
    });
  }
  if (ctx.weatherCondition === "rainy") {
    reminders.push({
      dueLabel: lang === "sw" ? "Haraka" : "Urgent",
      text: lang === "sw" ? "Mvua nyingi — kagua mifereji ya maji kwenye mashamba leo ili kuzuia mafuriko." : "Heavy rain alert — check field drainage channels today to prevent waterlogging."
    });
  }
  return reminders.slice(0, 3);
}
function generateLivestockReminders(ctx, lang) {
  var _a;
  const animal = ((_a = ctx.animalTypes) == null ? void 0 : _a[0]) ?? "animals";
  const reminders = [];
  reminders.push({
    dueLabel: lang === "sw" ? "Mwezi ujao" : "Next month",
    text: lang === "sw" ? `Chanjo ya FMD kwa ${animal} — wasiliana na daktari wa mifugo kupanga ziara.` : `FMD vaccination due for ${animal} — contact a vet through the app to schedule a visit.`
  });
  if (ctx.season === "dry") {
    reminders.push({
      dueLabel: lang === "sw" ? "Wiki hii" : "This week",
      text: lang === "sw" ? "Kiangazi — hifadhi silage / hay ya ziada ili kuhakikisha lishe ya kutosha." : "Dry season — stockpile extra silage or hay now to ensure adequate feed through the dry period."
    });
    reminders.push({
      dueLabel: lang === "sw" ? "Sasa hivi" : "Now",
      text: lang === "sw" ? "Angalia vyanzo vya maji — visima na mabwawa yanatoa maji ya kutosha?" : `Check all water sources — are boreholes and dams providing enough water for your ${animal} herd?`
    });
  } else if (ctx.season === "planting") {
    reminders.push({
      dueLabel: lang === "sw" ? "Wiki ijayo" : "Next week",
      text: lang === "sw" ? "Angalia dalili za Lumpy Skin Disease — mvua nyingi zinaongeza hatari." : "Monitor for Lumpy Skin Disease — wet season significantly increases transmission risk."
    });
  } else {
    reminders.push({
      dueLabel: lang === "sw" ? "Wiki ijayo" : "Next week",
      text: lang === "sw" ? `Rekodi za uzito wa ${animal} — pima uzito kila miezi 2 kufuatilia maendeleo.` : `Record body weight for ${animal} — weigh every 2 months to track growth and condition.`
    });
  }
  reminders.push({
    dueLabel: lang === "sw" ? "Kila wiki" : "Weekly",
    text: lang === "sw" ? "Angalia hali ya afya ya mifugo kila asubuhi — homa, kutokula, au macho ya mtiririko." : `Daily health check for ${animal} — look for fever, not eating, nasal discharge, or lethargy.`
  });
  return reminders.slice(0, 3);
}
function getFarmerSuggestedQuestions(ctx, lang) {
  var _a;
  const crop = ((_a = ctx.cropTypes) == null ? void 0 : _a[0]) ?? "crops";
  if (lang === "sw") {
    return [
      `Ni lini wakati mzuri wa kupanda ${crop}?`,
      "Ni wadudu gani wa kuangalia msimu huu?",
      `Ninahitaji mbolea ngapi kwa ${crop}?`,
      `Bei ya ${crop} inaonekana vipi soko sasa?`,
      ctx.weatherCondition === "rainy" ? `Mvua nyingi zinathiri nini kwenye ${crop}?` : "Nitatumia maji kiasi gani kwa umwagiliaji?",
      `Ni magonjwa gani hatari kwa ${crop} msimu huu?`,
      "Hali ya udongo wangu ina athari gani kwa mavuno?",
      `Ni ratiba gani ya umwagiliaji inayofaa kwa ${crop} wakati huu?`,
      "Naweza kuokoa maji kiasi gani kwa kutumia umwagiliaji wa matone?"
    ].slice(0, 6);
  }
  return [
    `When should I plant ${crop}?`,
    "What pests should I watch for this season?",
    `How much fertilizer does ${crop} need?`,
    `What are ${crop} prices like right now?`,
    ctx.weatherCondition === "rainy" ? `How does the rain affect my ${crop}?` : "How often should I irrigate?",
    "What diseases should I look out for this season?",
    `How does my soil type affect ${crop} yields?`,
    `What is the best irrigation schedule for ${crop} right now?`,
    "How much water can I save with drip irrigation?"
  ].slice(0, 6);
}
function getLivestockSuggestedQuestions(ctx, lang) {
  var _a;
  const animal = ((_a = ctx.animalTypes) == null ? void 0 : _a[0]) ?? "animals";
  if (lang === "sw") {
    return [
      `Ni lini wakati mzuri wa kupandisha ${animal}?`,
      `Ninachohitaji kufanya kwa chanjo ya ${animal}?`,
      `Chakula kipi ni bora kwa ${animal} msimu huu?`,
      `Bei ya ${animal} iko vipi sokoni sasa?`,
      ctx.season === "dry" ? `Nitatoa maji kiasi gani kwa ${animal} wakati wa kiangazi?` : `Magonjwa gani ya mvua yanaweza kuathiri ${animal}?`,
      `Dalili za kwanza za ugonjwa kwa ${animal} ni zipi?`
    ].slice(0, 6);
  }
  return [
    `When is the best time to breed ${animal}?`,
    `What vaccinations does my ${animal} need?`,
    `What feed is best for ${animal} this season?`,
    `What are current ${animal} market prices?`,
    ctx.season === "dry" ? `How much water do ${animal} need in dry season?` : "What wet-season diseases should I watch for?",
    `What are early signs of illness in ${animal}?`
  ].slice(0, 6);
}
const SEASON_LABELS_SW = {
  planting: "msimu wa kupanda",
  growing: "msimu wa ukuaji",
  harvesting: "msimu wa mavuno",
  dry: "kiangazi"
};
function getForecastWeather() {
  const weekNum = Math.ceil((/* @__PURE__ */ new Date()).getDate() / 7);
  if (weekNum === 1 || weekNum >= 4) return "rain";
  if (weekNum === 2) return "dry";
  return "moderate";
}
function generatePredictiveReminders(ctx, lang) {
  var _a, _b, _c;
  const forecast = getForecastWeather();
  const crop = ((_a = ctx.cropTypes) == null ? void 0 : _a[0]) ?? (lang === "sw" ? "mazao" : "crops");
  const allCrops = ((_b = ctx.cropTypes) == null ? void 0 : _b.join(", ")) ?? crop;
  const animal = ((_c = ctx.animalTypes) == null ? void 0 : _c[0]) ?? (lang === "sw" ? "mifugo" : "animals");
  const isLivestock = ctx.role === "livestock_keeper";
  const reminders = [];
  if (isLivestock) {
    if (forecast === "rain") {
      reminders.push({
        id: "lv-weather-rain",
        type: "weather",
        title: lang === "sw" ? "Mvua Inatarajiwa Wiki Hii" : "Rain Forecast This Week",
        message: lang === "sw" ? `Mvua inatarajiwa wiki hii — hakikisha malago ya ${animal} ni kavu na yenye hewa ya kutosha ili kuzuia magonjwa ya ngozi.` : `Rain is forecast this week — ensure ${animal} shelters are dry and well-ventilated to prevent skin diseases.`,
        urgency: "high",
        icon: "🌧️",
        canSnooze: true
      });
      reminders.push({
        id: "lv-weather-lsd",
        type: "weather",
        title: lang === "sw" ? "Hatari ya Lumpy Skin Disease" : "Lumpy Skin Disease Risk",
        message: lang === "sw" ? `Mvua nyingi zinaongeza hatari ya Lumpy Skin Disease kwa ${animal}. Angalia mapunye kwenye ngozi na wasiliana na daktari ikiwa utagundua dalili.` : `Heavy rains increase Lumpy Skin Disease risk for ${animal}. Monitor for skin nodules and contact a vet immediately if symptoms appear.`,
        urgency: "high",
        icon: "⚠️",
        canSnooze: true
      });
    }
    if (forecast === "dry") {
      reminders.push({
        id: "lv-heat-stress",
        type: "weather",
        title: lang === "sw" ? "Tahadhari ya Joto" : "Heat Stress Alert",
        message: lang === "sw" ? `Ukame unatarajiwa — ongeza maji na kivuli kwa ${animal} wiki hii. Ng'ombe anahitaji lita 50 kwa siku katika hali ya joto.` : `Dry spell expected — provide additional water and shade for your ${animal} this week. Cattle need up to 50L/day in heat.`,
        urgency: "high",
        icon: "🌡️",
        canSnooze: true
      });
      reminders.push({
        id: "lv-feed-reserve",
        type: "seasonal",
        title: lang === "sw" ? "Hifadhi Malisho ya Ukame" : "Dry Season Feed Reserve",
        message: lang === "sw" ? `Kiangazi kinatarajiwa — nunua au hifadhi silage na hay sasa kwa ajili ya ${animal}. Bei zinaongezeka kadri ukame unavyozidi.` : `Dry conditions expected — stock up on silage or hay now for your ${animal}. Prices rise as the dry season deepens.`,
        urgency: "medium",
        icon: "🌾",
        canSnooze: true
      });
    }
    reminders.push({
      id: "lv-vaccine-ecf",
      type: "seasonal",
      title: lang === "sw" ? "Chanjo: East Coast Fever" : "Vaccination: East Coast Fever",
      message: lang === "sw" ? `Chanjo ya East Coast Fever kwa ${animal} inapaswa kufanywa mwezi ujao. Wasiliana na daktari wa wanyama kupanga ziara.` : `East Coast Fever vaccine is due next week for your ${animal}. Contact a vet through the app to schedule a visit.`,
      urgency: "high",
      icon: "💉",
      canSnooze: true
    });
    reminders.push({
      id: "lv-vaccine-fmd",
      type: "seasonal",
      title: lang === "sw" ? "Chanjo ya FMD Inakaribia" : "FMD Vaccination Due",
      message: lang === "sw" ? `Chanjo ya FMD (Foot and Mouth Disease) kwa ${animal} inahitajika kila miezi 6. Hakikisha rekodi za chanjo ziko sahihi.` : `FMD vaccination for ${animal} is due — schedule every 6 months. Ensure your vaccination records are up to date.`,
      urgency: "medium",
      icon: "🏥",
      canSnooze: true
    });
    reminders.push({
      id: "lv-water-check",
      type: "seasonal",
      title: lang === "sw" ? "Kagua Vyanzo vya Maji" : "Check Water Sources",
      message: lang === "sw" ? `Visima na mabwawa ya ${ctx.location} lazima vikaguliwe wiki hii. Uhakikishaji wa maji kwa wakati unaweza kuzuia vifo vya mifugo.` : `Check all boreholes and dams near ${ctx.location} this week. Proactive water security prevents livestock losses during dry spells.`,
      urgency: "medium",
      icon: "💧",
      canSnooze: true
    });
    if (ctx.season === "planting" || forecast === "rain") {
      reminders.push({
        id: "lv-market-festive",
        type: "market",
        title: lang === "sw" ? "Fursa ya Soko" : "Market Opportunity",
        message: lang === "sw" ? `Bei ya ${animal} inaendelea kupanda kabla ya sikukuu. Uuzaji wa sasa unaweza kuleta faida ya hadi 20% zaidi.` : `${animal} prices are rising ahead of the festive season. Selling now could yield up to 20% above baseline prices.`,
        urgency: "low",
        icon: "📈",
        canSnooze: true
      });
    }
  } else {
    if (forecast === "rain") {
      reminders.push({
        id: "fw-hold-spray",
        type: "weather",
        title: lang === "sw" ? "Usinyunyize Dawa — Mvua Inakuja" : "Hold Off on Spraying — Rain Coming",
        message: lang === "sw" ? `Kulingana na utabiri wa mvua wiki hii, subiri kupulizia dawa kwenye ${crop}. Mvua itaosha dawa kabla haijafanya kazi.` : `Based on forecasted rain this week, hold off on spraying your ${crop}. Rain will wash off pesticides before they take effect.`,
        urgency: "high",
        icon: "🌧️",
        canSnooze: true
      });
      reminders.push({
        id: "fw-drainage",
        type: "weather",
        title: lang === "sw" ? "Angalia Mifereji ya Maji" : "Check Field Drainage",
        message: lang === "sw" ? `Mvua nyingi inatarajiwa — kagua mifereji ya maji kwenye mashamba ya ${allCrops} sasa ili kuzuia mafuriko na kuoza kwa mizizi.` : `Heavy rain expected — inspect drainage channels in your ${allCrops} fields now to prevent waterlogging and root rot.`,
        urgency: "high",
        icon: "🌊",
        canSnooze: true
      });
    }
    if (forecast === "dry") {
      reminders.push({
        id: "fw-irrigation",
        type: "weather",
        title: lang === "sw" ? "Kipindi cha Ukame — Mwagilia" : "Dry Spell — Irrigate Now",
        message: lang === "sw" ? `Ukame unatarajiwa — fikiria umwagiliaji kwa ${crop} kwa siku 10 zijazo. Matone ya umwagiliaji hupunguza upotevu wa maji kwa 50%.` : `Dry spell expected — consider irrigation for your ${crop} over the next 10 days. Drip irrigation cuts water use by 50%.`,
        urgency: "high",
        icon: "💧",
        canSnooze: true
      });
    }
    if (ctx.season === "planting" || forecast === "rain") {
      reminders.push({
        id: "fw-planting-prep",
        type: "seasonal",
        title: lang === "sw" ? "Msimu wa Kupanda Unakaribia" : "Planting Season Approaching",
        message: lang === "sw" ? `Msimu wa kupanda ${crop} unaanza wiki 2 zijazo — andaa udongo wako sasa. Weka chokaa ikiwa pH ni chini ya 5.5.` : `Planting season for ${crop} starts in 2 weeks — prepare your soil now. Apply lime if soil pH is below 5.5.`,
        urgency: "medium",
        icon: "🌱",
        canSnooze: true
      });
    }
    reminders.push({
      id: "fw-fertilizer",
      type: "seasonal",
      title: lang === "sw" ? "Wakati wa Mbolea ya Juu" : "Top-Dressing Fertilizer Time",
      message: lang === "sw" ? `Weka mbolea ya CAN (50kg/ekari) kwa ${crop} — mimea ikiwa urefu wa goti ni wakati bora wa kulisha.` : `Apply CAN top-dressing (50kg/acre) to your ${crop} — knee-height stage is the optimal window for nutrient uptake.`,
      urgency: "medium",
      icon: "🌿",
      canSnooze: true
    });
    reminders.push({
      id: "fw-pest-scout",
      type: "pest",
      title: lang === "sw" ? "Angalia Viwavi wa Anguko" : "Scout for Fall Armyworm",
      message: lang === "sw" ? `Hatari ya viwavi (fall armyworm) ipo juu msimu huu kwa ${crop}. Kagua mashamba kila siku — angalia matundu kwenye majani na kinyesi cha viwavi.` : `Fall armyworm risk is elevated this season for ${crop}. Scout fields daily — look for leaf holes and frass trails. Act early before populations explode.`,
      urgency: forecast === "rain" ? "high" : "medium",
      icon: "🐛",
      canSnooze: true
    });
    reminders.push({
      id: "fw-soil-test",
      type: "seasonal",
      title: lang === "sw" ? "Fanya Uchunguzi wa Udongo" : "Conduct Soil Test",
      message: lang === "sw" ? "Uchunguzi wa udongo wa kila miaka 2 unakusaidia kupanga mbolea kwa usahihi. Wasiliana na mtaalamu wa udongo kupitia programu." : `A soil test every 2 years ensures precise fertilizer planning for ${crop}. Contact a soil specialist through the app.`,
      urgency: "low",
      icon: "🔬",
      canSnooze: true
    });
    reminders.push({
      id: "fw-market-timing",
      type: "market",
      title: lang === "sw" ? "Angalia Bei za Soko" : "Monitor Market Prices",
      message: lang === "sw" ? `Bei za ${allCrops} zinaendelea kupanda huko Dar es Salaam na Mwanza. Fuatilia soko kila wiki ili kujua wakati mzuri wa kuuza.` : `Prices for ${allCrops} are trending upward in Dar es Salaam and Mwanza markets. Track weekly to identify the optimal selling window.`,
      urgency: "low",
      icon: "📊",
      canSnooze: true
    });
  }
  return reminders.slice(0, isLivestock ? 6 : 8);
}
const DISMISSED_KEY = "namwala-dismissed-reminders";
const SNOOZED_KEY = "namwala-snoozed-reminders";
const SNOOZE_MS = 24 * 60 * 60 * 1e3;
function readSet(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? new Set(JSON.parse(raw)) : /* @__PURE__ */ new Set();
  } catch {
    return /* @__PURE__ */ new Set();
  }
}
function writeSet(key, set) {
  try {
    localStorage.setItem(key, JSON.stringify([...set]));
  } catch {
  }
}
function readSnoozeMap() {
  try {
    const raw = localStorage.getItem(SNOOZED_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
function writeSnoozeMap(map) {
  try {
    localStorage.setItem(SNOOZED_KEY, JSON.stringify(map));
  } catch {
  }
}
const URGENCY_STYLES = {
  high: {
    bar: "bg-destructive",
    badge: "bg-destructive/15 text-destructive border-destructive/30",
    glow: "border-destructive/30"
  },
  medium: {
    bar: "bg-amber-500",
    badge: "bg-amber-500/15 text-amber-700 border-amber-400/40",
    glow: "border-amber-400/40"
  },
  low: {
    bar: "bg-green-500",
    badge: "bg-green-500/15 text-green-700 border-green-400/40",
    glow: "border-green-400/40"
  }
};
function typeIcon(t) {
  switch (t) {
    case "weather":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3" });
    case "pest":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3" });
    case "market":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3 h-3" });
    default:
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-3 h-3" });
  }
}
function typeLabel(t, lang) {
  const map = {
    weather: { en: "Weather", sw: "Hewa" },
    seasonal: { en: "Seasonal", sw: "Msimu" },
    pest: { en: "Pest", sw: "Wadudu" },
    market: { en: "Market", sw: "Soko" }
  };
  return map[t][lang];
}
function ReminderCard({
  reminder,
  onDismiss,
  onSnooze
}) {
  const { t, language } = useLanguageStore();
  const styles = URGENCY_STYLES[reminder.urgency];
  const lang = language;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `predictive_reminders.card.${reminder.id}`,
      className: `relative flex-shrink-0 w-[280px] bg-card rounded-xl border ${styles.glow} shadow-sm overflow-hidden`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute left-0 top-0 bottom-0 w-1 ${styles.bar}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pl-3 pr-3 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg flex-shrink-0", "aria-hidden": "true", children: reminder.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: `inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full border ${styles.badge}`,
                children: [
                  typeIcon(reminder.type),
                  typeLabel(reminder.type, lang)
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto", children: reminder.urgency === "high" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-2 h-2 rounded-full bg-destructive animate-pulse" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground leading-snug mb-1", children: reminder.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground leading-snug line-clamp-3", children: reminder.message }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5 mt-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": `predictive_reminders.snooze_button.${reminder.id}`,
                onClick: () => onSnooze(reminder.id),
                className: "flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-lg bg-muted border border-border text-muted-foreground hover:text-foreground transition-smooth",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-2.5 h-2.5" }),
                  t("snooze")
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": `predictive_reminders.dismiss_button.${reminder.id}`,
                onClick: () => onDismiss(reminder.id),
                className: "flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-lg bg-muted border border-border text-muted-foreground hover:text-foreground transition-smooth",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-2.5 h-2.5" }),
                  t("dismiss")
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function PredictiveReminderCards({
  userProfile
}) {
  const { t, language } = useLanguageStore();
  const [dismissed, setDismissed] = reactExports.useState(
    () => readSet(DISMISSED_KEY)
  );
  const [snoozed, setSnoozed] = reactExports.useState(() => {
    const map = readSnoozeMap();
    const now = Date.now();
    return new Set(Object.keys(map).filter((id) => now < map[id]));
  });
  reactExports.useEffect(() => {
    const interval = setInterval(() => {
      const map = readSnoozeMap();
      const now = Date.now();
      setSnoozed(new Set(Object.keys(map).filter((id) => now < map[id])));
    }, 6e4);
    return () => clearInterval(interval);
  }, []);
  const allReminders = reactExports.useMemo(
    () => generatePredictiveReminders(userProfile, language),
    [userProfile, language]
  );
  const visible = allReminders.filter(
    (r) => !dismissed.has(r.id) && !snoozed.has(r.id)
  );
  function handleDismiss(id) {
    const next = new Set(dismissed).add(id);
    setDismissed(next);
    writeSet(DISMISSED_KEY, next);
  }
  function handleSnooze(id) {
    const map = readSnoozeMap();
    map[id] = Date.now() + SNOOZE_MS;
    writeSnoozeMap(map);
    const next = new Set(snoozed).add(id);
    setSnoozed(next);
  }
  if (visible.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      "data-ocid": "predictive_reminders.section",
      "aria-label": t("predictiveReminders"),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4 text-amber-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground", children: t("predictiveReminders") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center justify-center w-5 h-5 rounded-full bg-destructive text-primary-foreground text-[9px] font-bold", children: visible.length })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "data-ocid": "predictive_reminders.list",
            className: "flex gap-3 overflow-x-auto pb-1 snap-x snap-mandatory sm:grid sm:grid-cols-2 sm:overflow-visible scrollbar-none",
            style: { scrollbarWidth: "none" },
            children: visible.map((reminder) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "snap-start", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              ReminderCard,
              {
                reminder,
                onDismiss: handleDismiss,
                onSnooze: handleSnooze
              }
            ) }, reminder.id))
          }
        )
      ]
    }
  );
}
function todayStr() {
  const d = /* @__PURE__ */ new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function formatEventDate(dateStr, language) {
  const today = todayStr();
  const tomorrow = /* @__PURE__ */ new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];
  if (dateStr === today) return language === "sw" ? "Leo" : "Today";
  if (dateStr === tomorrowStr) return language === "sw" ? "Kesho" : "Tomorrow";
  return (/* @__PURE__ */ new Date(`${dateStr}T12:00:00`)).toLocaleDateString(
    language === "sw" ? "sw-TZ" : "en-US",
    { month: "short", day: "numeric" }
  );
}
function UpcomingTasksWidget() {
  const { user } = useAuthStore();
  const { t, language } = useLanguageStore();
  const navigate = useNavigate();
  const userId = (user == null ? void 0 : user.id) ?? "guest";
  const [events, setEvents] = reactExports.useState([]);
  reactExports.useEffect(() => {
    setEvents(loadEvents(userId));
  }, [userId]);
  const today = todayStr();
  const upcoming = events.filter((e) => e.date >= today).sort(
    (a, b) => (a.date + (a.time ?? "")).localeCompare(b.date + (b.time ?? ""))
  ).slice(0, 5);
  const overdue = events.filter((e) => e.date < today);
  const todayEvents = events.filter((e) => e.date === today);
  const badgeCount = todayEvents.length + overdue.length;
  const lbl = (en, sw) => language === "sw" ? sw : en;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "upcoming_tasks.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-semibold text-foreground flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-4 h-4 text-primary" }),
        t("upcomingTasks"),
        badgeCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-destructive text-destructive-foreground border-0 text-[10px] h-4 px-1 ml-0.5", children: badgeCount })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "sm",
          variant: "ghost",
          className: "h-7 text-xs px-2 gap-1 text-primary hover:text-primary",
          onClick: () => navigate({ to: "/calendar" }),
          "data-ocid": "upcoming_tasks.view_calendar_button",
          children: t("viewAll")
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: upcoming.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-2 py-6 px-4 text-center",
        "data-ocid": "upcoming_tasks.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-8 h-8 text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: lbl(
            "No upcoming tasks. Tap to add events.",
            "Hakuna kazi zijazo. Gusa kuongeza."
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "gap-1 h-7 text-xs",
              onClick: () => navigate({ to: "/calendar" }),
              "data-ocid": "upcoming_tasks.empty_state_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-3 h-3" }),
                t("calendarTitle")
              ]
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: upcoming.map((ev, idx) => {
      const cfg = EVENT_TYPE_CONFIG[ev.eventType];
      const isToday = ev.date === today;
      const isOverdue = ev.date < today;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "data-ocid": `upcoming_tasks.item.${idx + 1}`,
          onClick: () => navigate({ to: "/calendar" }),
          className: "w-full flex items-center gap-3 px-3 py-2.5 border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors text-left",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${cfg.bgClass}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: cfg.emoji })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground truncate", children: ev.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground", children: [
                lbl(cfg.labelEn, cfg.labelSw),
                ev.time && ` · ${ev.time}`,
                ev.recurring !== "none" && /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-2.5 h-2.5 inline ml-1" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-[10px] font-medium px-1.5 py-0.5 rounded-full ${isToday ? "bg-primary/15 text-primary" : isOverdue ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"}`,
                children: isOverdue ? lbl("Overdue", "Imechelewa") : formatEventDate(ev.date, language)
              }
            ) })
          ]
        },
        ev.id
      );
    }) }) })
  ] });
}
export {
  ArrowRight as A,
  PredictiveReminderCards as P,
  Radio as R,
  UpcomingTasksWidget as U,
  generatePredictiveReminders as a,
  getFarmerSuggestedQuestions as b,
  AIAdvisorWidget as c,
  generateFarmerResponse as d,
  generateLivestockReminders as e,
  getLivestockSuggestedQuestions as f,
  generateFarmerReminders as g,
  generateLivestockResponse as h
};
