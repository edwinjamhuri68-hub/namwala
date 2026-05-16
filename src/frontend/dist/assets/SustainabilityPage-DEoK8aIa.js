import { a as useLanguageStore, r as reactExports, j as jsxRuntimeExports, L as Layout, s as Leaf, B as Button, m as Badge, t as BookOpen, H as ChevronDown, X } from "./index-BUVIgngH.js";
import { P as Plus } from "./plus-DMsGFanj.js";
import { T as Trash2 } from "./trash-2-BRLnMANv.js";
import { C as ChevronUp } from "./chevron-up-CnJPygwE.js";
const PRACTICE_IMPACT = {
  "Drip Irrigation": 9,
  "Organic Fertilizer": 8,
  "Crop Rotation": 9,
  Composting: 8,
  "Water Harvesting": 7,
  Agroforestry: 10,
  "Integrated Pest Management": 8,
  Other: 5
};
const PRACTICE_COLORS = {
  "Drip Irrigation": "bg-sky-100 text-sky-700",
  "Organic Fertilizer": "bg-lime-100 text-lime-700",
  "Crop Rotation": "bg-emerald-100 text-emerald-700",
  Composting: "bg-amber-100 text-amber-700",
  "Water Harvesting": "bg-blue-100 text-blue-700",
  Agroforestry: "bg-green-100 text-green-700",
  "Integrated Pest Management": "bg-orange-100 text-orange-700",
  Other: "bg-muted text-muted-foreground"
};
const INITIAL_PRACTICES = [
  {
    id: "s1",
    userId: "u1",
    practice: "Crop Rotation",
    date: "2026-04-15",
    impactScore: 9,
    notes: "Rotated maize with legumes to restore soil nitrogen.",
    createdAt: "2026-04-15"
  },
  {
    id: "s2",
    userId: "u1",
    practice: "Composting",
    date: "2026-03-20",
    impactScore: 8,
    notes: "Made compost from crop residues and animal manure.",
    createdAt: "2026-03-20"
  },
  {
    id: "s3",
    userId: "u1",
    practice: "Drip Irrigation",
    date: "2026-02-10",
    impactScore: 9,
    notes: "Installed drip lines across the north field to cut water use by 40%.",
    createdAt: "2026-02-10"
  }
];
const EDUCATION = [
  {
    id: "e1",
    titleEn: "Soil Conservation",
    titleSw: "Uhifadhi wa Udongo",
    summaryEn: "Protect topsoil to maintain long-term farm productivity.",
    summarySw: "Linda tabaka la juu la udongo ili kudumisha tija ya shamba kwa muda mrefu.",
    bodyEn: "Soil erosion is one of the biggest threats to Tanzanian agriculture. Techniques such as contour farming, cover cropping, and minimum tillage help prevent topsoil loss. Keeping soil covered with organic matter improves water retention and reduces the need for chemical inputs. Even small actions like leaving crop residues on the field after harvest can make a significant difference over multiple seasons.",
    bodySw: "Mmomonyoko wa udongo ni mojawapo ya vitisho vikubwa kwa kilimo cha Tanzania. Mbinu kama vile kilimo cha kupanda kwa mistari ya ngazi, kupanda mazao ya kufunika, na kulima kidogo husaidia kuzuia upotevu wa tabaka la juu la udongo. Kuweka udongo ukifunikwa na viumbe hai huboresha uhifadhi wa maji na kupunguza haja ya pembejeo za kemikali.",
    icon: "🌱"
  },
  {
    id: "e2",
    titleEn: "Water Management",
    titleSw: "Usimamizi wa Maji",
    summaryEn: "Use water wisely to sustain crops through dry seasons.",
    summarySw: "Tumia maji kwa busara ili kudumisha mazao katika kipindi cha ukame.",
    bodyEn: "Water scarcity is increasing across Tanzania due to climate change. Drip irrigation can reduce water use by up to 50% compared to flood irrigation. Rainwater harvesting — collecting runoff from roofs or catchment pits — can provide a critical buffer during dry spells. Mulching around plants reduces evaporation from the soil surface. Scheduling irrigation during the cooler parts of the day also cuts water loss significantly.",
    bodySw: "Uhaba wa maji unaongezeka Tanzania nzima kutokana na mabadiliko ya tabianchi. Umwagiliaji wa tone unaweza kupunguza matumizi ya maji kwa hadi 50% ikilinganishwa na umwagiliaji wa mafuriko. Uvunaji wa maji ya mvua — kukusanya maji ya mvua kutoka mapaa au mashimo ya kukusanyia — unaweza kutoa akiba muhimu wakati wa ukame.",
    icon: "💧"
  },
  {
    id: "e3",
    titleEn: "Organic Fertilizer",
    titleSw: "Mbolea ya Asili",
    summaryEn: "Feed your soil naturally for healthier, cheaper harvests.",
    summarySw: "Lisa udongo wako kwa njia ya asili kwa mavuno ya afya na ya bei nafuu.",
    bodyEn: "Compost, manure, and green manure are powerful alternatives to costly chemical fertilizers. They improve soil structure, increase microbial activity, and release nutrients slowly — exactly when plants need them. Composting crop waste and kitchen scraps takes as little as 6–8 weeks and can fully replace chemical fertilizers for many smallholder farms. Vermicomposting (using earthworms) produces an even richer amendment in the same timeframe.",
    bodySw: "Mboji, samadi, na mbolea ya kijani ni mbadala mzuri wa mbolea za kemikali zenye gharama kubwa. Zinaboresha muundo wa udongo, kuongeza shughuli za viumbe hai, na kutoa virutubisho polepole — hasa wakati mimea inahitaji. Kutengeneza mboji kutoka kwa taka za mazao na jikoni inachukua wiki 6–8 tu na inaweza kubadilisha kabisa mbolea za kemikali kwa mashamba mengi madogo.",
    icon: "♻️"
  },
  {
    id: "e4",
    titleEn: "Sustainable Grazing",
    titleSw: "Malisho ya Endelevu",
    summaryEn: "Rotate your livestock to keep pastures healthy year-round.",
    summarySw: "Zungusha mifugo yako ili kulinda malisho kuwa na afya mwaka mzima.",
    bodyEn: "Overgrazing is a leading cause of land degradation in Tanzania's pastoral areas. Rotational grazing divides land into paddocks, allowing each section to recover before being grazed again. This maintains grass cover, prevents erosion, and actually increases the carrying capacity of the land over time. Rest periods of 4–6 weeks are typically sufficient for most grasses to regenerate fully. Fencing is not always necessary — temporary herding boundaries work equally well.",
    bodySw: "Malisho kupita kiasi ni sababu kuu ya uharibifu wa ardhi katika maeneo ya ufugaji Tanzania. Malisho ya kuzungushwa hugawanya ardhi katika mabanda, kuruhusu kila sehemu kupumzika kabla ya kuchunga tena. Hii hudumisha mfunika wa nyasi, kuzuia mmomonyoko, na kuongeza uwezo wa kubeba mifugo kwa muda mrefu.",
    icon: "🐄"
  },
  {
    id: "e5",
    titleEn: "Crop Rotation",
    titleSw: "Mzunguko wa Mazao",
    summaryEn: "Alternate crops each season to boost yields and reduce pests.",
    summarySw: "Badilisha mazao kila msimu ili kuongeza mavuno na kupunguza wadudu.",
    bodyEn: "Planting the same crop in the same field season after season depletes specific nutrients and allows pests and diseases to build up in the soil. Rotating between cereal crops (maize, sorghum) and legumes (beans, groundnuts) naturally restores nitrogen to the soil and breaks pest cycles. A simple two-year rotation — maize followed by beans — can increase yields by 15–25% without any additional inputs. Three-year rotations with a fallow or cover crop year are even more effective.",
    bodySw: "Kupanda zao moja moja baada ya nyingine katika shamba moja msimu baada ya msimu hupunguza virutubisho maalum na kuruhusu wadudu na magonjwa kukua kwenye udongo. Kuzungusha kati ya mazao ya nafaka (mahindi, mtama) na mikunde (maharagwe, karanga) hurudisha nitrojeni kwa asili na kuvunja mzunguko wa wadudu. Mzunguko rahisi wa miaka miwili — mahindi ikifuatwa na maharagwe — unaweza kuongeza mavuno kwa 15–25% bila pembejeo yoyote ya ziada.",
    icon: "🔄"
  }
];
function SustainabilityPage() {
  const { t, language } = useLanguageStore();
  const [practices, setPractices] = reactExports.useState(INITIAL_PRACTICES);
  const [showModal, setShowModal] = reactExports.useState(false);
  const [expandedCard, setExpandedCard] = reactExports.useState(null);
  const [formPractice, setFormPractice] = reactExports.useState("Crop Rotation");
  const [formDesc, setFormDesc] = reactExports.useState("");
  const [formDate, setFormDate] = reactExports.useState(
    (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
  );
  const totalScore = practices.length > 0 ? Math.min(
    100,
    Math.round(
      practices.reduce((sum, p) => sum + p.impactScore, 0) / (practices.length * 10) * 100
    )
  ) : 0;
  const scoreColor = totalScore >= 80 ? "text-emerald-600" : totalScore >= 50 ? "text-amber-500" : "text-red-500";
  const trackColor = totalScore >= 80 ? "#10b981" : totalScore >= 50 ? "#f59e0b" : "#ef4444";
  function handleAddPractice() {
    if (!formDate) return;
    const rec = {
      id: `s${Date.now()}`,
      userId: "u1",
      practice: formPractice,
      date: formDate,
      impactScore: PRACTICE_IMPACT[formPractice],
      notes: formDesc || void 0,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    setPractices((prev) => [rec, ...prev]);
    setShowModal(false);
    setFormDesc("");
    setFormDate((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
    setFormPractice("Crop Rotation");
  }
  function handleDelete(id) {
    setPractices((prev) => prev.filter((p) => p.id !== id));
  }
  const circumference = 2 * Math.PI * 44;
  const dashOffset = circumference - totalScore / 100 * circumference;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background",
      "data-ocid": "sustainability.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b px-4 py-4 sticky top-0 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between max-w-2xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "text-primary", size: 22 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold text-foreground", children: t("sustainability") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              onClick: () => setShowModal(true),
              "data-ocid": "sustainability.log_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16, className: "mr-1" }),
                " ",
                t("log_practice")
              ]
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-5 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card rounded-2xl border p-5 flex flex-col items-center gap-3",
              "data-ocid": "sustainability.impact_score",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: t("impact_score") }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-28 h-28", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "svg",
                    {
                      className: "w-28 h-28 -rotate-90",
                      viewBox: "0 0 100 100",
                      role: "img",
                      "aria-label": "Impact score progress",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "circle",
                          {
                            cx: "50",
                            cy: "50",
                            r: "44",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "10",
                            className: "text-muted/30"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "circle",
                          {
                            cx: "50",
                            cy: "50",
                            r: "44",
                            fill: "none",
                            stroke: trackColor,
                            strokeWidth: "10",
                            strokeLinecap: "round",
                            strokeDasharray: circumference,
                            strokeDashoffset: dashOffset,
                            style: { transition: "stroke-dashoffset 0.6s ease" }
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-3xl font-extrabold ${scoreColor}`, children: totalScore }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "/100" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: language === "sw" ? `Inategemea mazoea ${practices.length} yaliyorekodiwa` : `Based on ${practices.length} logged practice${practices.length !== 1 ? "s" : ""}` })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold text-foreground mb-3", children: t("my_practices") }),
            practices.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "text-center py-12",
                "data-ocid": "sustainability.practices.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "mx-auto text-muted-foreground/40", size: 48 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-3", children: t("no_practices") })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: practices.map((p, i) => {
              const color = PRACTICE_COLORS[p.practice] ?? "bg-muted text-muted-foreground";
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "bg-card rounded-xl border p-4",
                  "data-ocid": `sustainability.practice.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `text-xs mb-1 border-0 ${color}`, children: p.practice }),
                      p.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: p.notes }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: p.date })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: t("impact_score") }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-primary", children: [
                          "+",
                          p.impactScore
                        ] }) })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => handleDelete(p.id),
                          className: "text-destructive hover:text-destructive/80 p-1",
                          "aria-label": t("delete"),
                          "data-ocid": `sustainability.delete_button.${i + 1}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 15 })
                        }
                      )
                    ] })
                  ] })
                },
                p.id
              );
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-bold text-foreground mb-3 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { size: 16, className: "text-primary" }),
              t("sustainability_tips")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: EDUCATION.map((card, i) => {
              const isExpanded = expandedCard === card.id;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "bg-card rounded-xl border overflow-hidden",
                  "data-ocid": `sustainability.content.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "w-full text-left p-4",
                        onClick: () => setExpandedCard(isExpanded ? null : card.id),
                        "data-ocid": `sustainability.learn_more.${i + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", "aria-hidden": "true", children: card.icon }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: language === "sw" ? card.titleSw : card.titleEn }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 line-clamp-1", children: language === "sw" ? card.summarySw : card.summaryEn })
                            ] })
                          ] }),
                          isExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                            ChevronUp,
                            {
                              size: 16,
                              className: "text-muted-foreground shrink-0"
                            }
                          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                            ChevronDown,
                            {
                              size: 16,
                              className: "text-muted-foreground shrink-0"
                            }
                          )
                        ] })
                      }
                    ),
                    isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-4 border-t bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-3 leading-relaxed", children: language === "sw" ? card.bodySw : card.bodyEn }) })
                  ]
                },
                card.id
              );
            }) })
          ] })
        ] }),
        showModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "fixed inset-0 z-50 flex items-end justify-center bg-black/50",
            "data-ocid": "sustainability.dialog",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card w-full max-w-md rounded-t-2xl p-5 space-y-4 max-h-[90vh] overflow-y-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-foreground", children: t("log_practice") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowModal(false),
                    className: "text-muted-foreground",
                    "data-ocid": "sustainability.close_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20 })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "sustain-practice-select",
                    className: "text-sm font-medium text-foreground block mb-1",
                    children: language === "sw" ? "Aina ya Mazoea" : "Practice Type"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "select",
                  {
                    id: "sustain-practice-select",
                    value: formPractice,
                    onChange: (e) => setFormPractice(e.target.value),
                    className: "w-full border border-input rounded-lg px-3 py-2 bg-background text-foreground text-sm",
                    "data-ocid": "sustainability.practice_type.select",
                    children: [
                      "Drip Irrigation",
                      "Organic Fertilizer",
                      "Crop Rotation",
                      "Composting",
                      "Water Harvesting",
                      "Agroforestry",
                      "Integrated Pest Management",
                      "Other"
                    ].map((pt) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: pt, children: pt }, pt))
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "sustain-desc-textarea",
                    className: "text-sm font-medium text-foreground block mb-1",
                    children: language === "sw" ? "Maelezo" : "Description"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "textarea",
                  {
                    id: "sustain-desc-textarea",
                    value: formDesc,
                    onChange: (e) => setFormDesc(e.target.value),
                    rows: 3,
                    placeholder: language === "sw" ? "Elezea mazoea yako..." : "Describe your practice...",
                    className: "w-full border border-input rounded-lg px-3 py-2 bg-background text-foreground text-sm resize-none",
                    "data-ocid": "sustainability.description.textarea"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "sustain-date-input",
                    className: "text-sm font-medium text-foreground block mb-1",
                    children: language === "sw" ? "Tarehe Iliyotekelezwa" : "Date Implemented"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "sustain-date-input",
                    type: "date",
                    value: formDate,
                    onChange: (e) => setFormDate(e.target.value),
                    className: "w-full border border-input rounded-lg px-3 py-2 bg-background text-foreground text-sm",
                    "data-ocid": "sustainability.date.input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 rounded-xl p-3 flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: language === "sw" ? "Mchango wa Alama" : "Impact Contribution" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-bold text-primary", children: [
                  "+",
                  PRACTICE_IMPACT[formPractice]
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    className: "flex-1",
                    onClick: () => setShowModal(false),
                    "data-ocid": "sustainability.cancel_button",
                    children: t("cancel")
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    className: "flex-1",
                    onClick: handleAddPractice,
                    "data-ocid": "sustainability.submit_button",
                    children: t("save")
                  }
                )
              ] })
            ] })
          }
        )
      ]
    }
  ) });
}
export {
  SustainabilityPage as default
};
