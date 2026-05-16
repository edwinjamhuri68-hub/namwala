import { u as useAuthStore, a as useLanguageStore, d as useNotificationStore, r as reactExports, j as jsxRuntimeExports, L as Layout, K as Clock, Q as Users, m as Badge, H as ChevronDown, c as Camera, l as Textarea, B as Button, R as CircleCheckBig } from "./index-BUVIgngH.js";
import { A as AlertBanner } from "./AlertBanner-gHy4kgBH.js";
import { S as StatCard } from "./StatCard-vQlqcd7B.js";
import { S as Syringe } from "./syringe-CUQ027P-.js";
import { H as HeartPulse } from "./heart-pulse-D78PpmMA.js";
import { C as ChevronUp } from "./chevron-up-CnJPygwE.js";
import { I as ImagePlus } from "./image-plus-Bmg-yBgt.js";
import { T as Trash2 } from "./trash-2-BRLnMANv.js";
import { C as CircleX } from "./circle-x-bCVEqfs_.js";
import { S as Stethoscope } from "./stethoscope-BgimVgvv.js";
import "./triangle-alert-CqH2Gyzq.js";
import "./trending-down-B-P0A2rN.js";
import "./minus-BAwtOhGD.js";
const VET_PENDING_CASES = [
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
      "Provide soft feed and clean water"
    ]
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
      "Emergency PPR vaccination for unaffected animals"
    ]
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
      "Dispose of dead birds hygienically"
    ]
  }
];
function VeterinarianDashboard() {
  const { user } = useAuthStore();
  const { language } = useLanguageStore();
  const { notifications } = useNotificationStore();
  const critical = notifications.filter(
    (n) => n.priority === "critical" && !n.read
  );
  const [expandedCase, setExpandedCase] = reactExports.useState(null);
  const [reviewState, setReviewState] = reactExports.useState(
    () => Object.fromEntries(
      VET_PENDING_CASES.map((c) => [
        c.id,
        { status: null, notes: "", photos: [] }
      ])
    )
  );
  const cameraInputRef = reactExports.useRef(null);
  const galleryInputRef = reactExports.useRef(null);
  const [activePhotoCase, setActivePhotoCase] = reactExports.useState(null);
  function handleReview(caseId, action) {
    setReviewState((prev) => ({
      ...prev,
      [caseId]: { ...prev[caseId], status: action }
    }));
    setExpandedCase(null);
  }
  function handleNotesChange(caseId, notes) {
    setReviewState((prev) => ({
      ...prev,
      [caseId]: { ...prev[caseId], notes }
    }));
  }
  function handlePhotoUpload(caseId, e) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    for (const file of files) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        var _a;
        const dataUrl = (_a = ev.target) == null ? void 0 : _a.result;
        setReviewState((prev) => {
          var _a2;
          return {
            ...prev,
            [caseId]: {
              ...prev[caseId],
              photos: [...((_a2 = prev[caseId]) == null ? void 0 : _a2.photos) ?? [], dataUrl]
            }
          };
        });
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  }
  function handleDeletePhoto(caseId, photoIndex) {
    setReviewState((prev) => ({
      ...prev,
      [caseId]: {
        ...prev[caseId],
        photos: prev[caseId].photos.filter((_, i) => i !== photoIndex)
      }
    }));
  }
  function triggerCamera(caseId) {
    var _a;
    setActivePhotoCase(caseId);
    (_a = cameraInputRef.current) == null ? void 0 : _a.click();
  }
  function triggerGallery(caseId) {
    var _a;
    setActivePhotoCase(caseId);
    (_a = galleryInputRef.current) == null ? void 0 : _a.click();
  }
  const pendingCount = VET_PENDING_CASES.filter(
    (c) => {
      var _a;
      return ((_a = reviewState[c.id]) == null ? void 0 : _a.status) === null;
    }
  ).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-4 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-xl overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "/assets/generated/vet-dashboard.dim_800x400.jpg",
          alt: "Veterinarian",
          className: "w-full h-32 object-cover"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-red-900/70 to-transparent flex items-end p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-display font-bold text-white", children: language === "sw" ? "Dashibodi ya Daktari" : "Veterinarian Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-white/80", children: [
          user == null ? void 0 : user.name,
          " · ",
          user == null ? void 0 : user.specialization
        ] })
      ] }) })
    ] }),
    critical.slice(0, 1).map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(AlertBanner, { message: n.body, priority: "critical" }, n.id)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          title: language === "sw" ? "Zinazosubiri" : "Pending Review",
          value: String(pendingCount),
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }),
          colorClass: "bg-amber-50 text-amber-700"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          title: language === "sw" ? "Wafugaji" : "Keepers",
          value: "18",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
          colorClass: "bg-blue-50 text-blue-600"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          title: language === "sw" ? "Chanjo Leo" : "Vaccinations",
          value: "5",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Syringe, { className: "w-4 h-4" }),
          colorClass: "bg-purple-50 text-purple-600"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-semibold text-foreground flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(HeartPulse, { className: "w-4 h-4 text-destructive" }),
          language === "sw" ? "Kesi za Afya Zinazongoja" : "Pending Animal Health Cases"
        ] }),
        pendingCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold bg-amber-100 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded-full", children: pendingCount })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: VET_PENDING_CASES.map((c, i) => {
        const review = reviewState[c.id];
        const isExpanded = expandedCase === c.id;
        const isReviewed = (review == null ? void 0 : review.status) !== null;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": `vet.pending_case.${i + 1}`,
            className: `bg-card border rounded-xl overflow-hidden transition-all ${isReviewed ? "border-border opacity-70" : "border-border"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: c.imageUrl,
                    alt: c.animalType,
                    className: "w-14 h-14 object-cover rounded-lg flex-shrink-0"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground truncate", children: c.keeper }),
                    isReviewed ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-[10px] px-2 py-0.5 rounded-full border font-medium shrink-0 ${review.status === "confirmed" ? "bg-accent/15 text-accent border-accent/30" : "bg-destructive/10 text-destructive border-destructive/20"}`,
                        children: review.status === "confirmed" ? language === "sw" ? "Imethibitishwa" : "Confirmed" : language === "sw" ? "Imekataliwa" : "Rejected"
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-[10px] shrink-0 bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100", children: language === "sw" ? "Inasubiri" : "Pending" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    c.animalType,
                    " (",
                    c.animalCount,
                    ") · ",
                    c.location
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground mt-0.5 truncate", children: c.disease }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
                    language === "sw" ? "Uhakika" : "AI confidence",
                    ":",
                    " ",
                    c.confidence,
                    "%"
                  ] })
                ] }),
                !isReviewed && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setExpandedCase(isExpanded ? null : c.id),
                    "aria-label": "Toggle case details",
                    "data-ocid": `vet.review_toggle.${i + 1}`,
                    className: "p-1.5 rounded-lg hover:bg-muted transition-colors",
                    children: isExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground" })
                  }
                )
              ] }),
              isReviewed && (review.notes || review.photos.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border p-3 space-y-2 bg-muted/10", children: [
                review.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-0.5", children: language === "sw" ? "Maelezo ya Daktari" : "Vet Notes" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground", children: review.notes })
                ] }),
                review.photos.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1", children: language === "sw" ? "Picha za Daktari" : "Specialist Photos" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-1", children: review.photos.map((src, pi) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src,
                      alt: `Specialist attachment ${pi + 1}`,
                      className: "shrink-0 w-16 h-16 rounded-lg object-cover border border-border"
                    },
                    src
                  )) })
                ] })
              ] }),
              isExpanded && !isReviewed && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "border-t border-border p-4 space-y-4 bg-muted/20",
                  "data-ocid": `vet.case_detail.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground mb-1.5", children: language === "sw" ? "Dalili Zilizotajwa" : "Reported Symptoms" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: c.symptoms.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-[11px] bg-background border border-border px-2 py-0.5 rounded-full",
                          children: s
                        },
                        s
                      )) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground mb-1.5", children: language === "sw" ? "Mapendekezo ya AI" : "AI Treatment Recommendations" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: c.recommendations.map((r, ri) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "li",
                        {
                          className: "flex gap-2 text-xs text-foreground",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-bold shrink-0", children: [
                              ri + 1,
                              "."
                            ] }),
                            r
                          ]
                        },
                        r
                      )) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground mb-2", children: language === "sw" ? "Picha Zilizambatanishwa" : "Photo Attachments" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          ref: cameraInputRef,
                          type: "file",
                          accept: "image/*",
                          capture: "environment",
                          className: "hidden",
                          "aria-label": "Camera capture",
                          onChange: (e) => activePhotoCase ? handlePhotoUpload(activePhotoCase, e) : void 0
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          ref: galleryInputRef,
                          type: "file",
                          accept: "image/*",
                          multiple: true,
                          className: "hidden",
                          "aria-label": "Gallery upload",
                          onChange: (e) => activePhotoCase ? handlePhotoUpload(activePhotoCase, e) : void 0
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mb-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            onClick: () => triggerCamera(c.id),
                            "data-ocid": `vet.capture_photo_button.${i + 1}`,
                            className: "flex items-center gap-1.5 px-3 py-2.5 min-h-[48px] rounded-lg border border-border bg-background text-xs font-medium text-foreground hover:bg-muted transition-colors flex-1 justify-center",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-4 h-4 text-primary" }),
                              language === "sw" ? "Piga Picha" : "Capture Photo"
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            onClick: () => triggerGallery(c.id),
                            "data-ocid": `vet.add_photo_button.${i + 1}`,
                            className: "flex items-center gap-1.5 px-3 py-2.5 min-h-[48px] rounded-lg border border-border bg-background text-xs font-medium text-foreground hover:bg-muted transition-colors flex-1 justify-center",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "w-4 h-4 text-primary" }),
                              language === "sw" ? "Ongeza Picha" : "Add Photo"
                            ]
                          }
                        )
                      ] }),
                      review.photos.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "flex gap-2 overflow-x-auto pb-1 scrollbar-thin",
                          "data-ocid": `vet.photo_gallery.${i + 1}`,
                          children: review.photos.map((src, pi) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              className: "relative shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-border",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "img",
                                  {
                                    src,
                                    alt: `Attachment ${pi + 1}`,
                                    className: "w-full h-full object-cover"
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    onClick: () => handleDeletePhoto(c.id, pi),
                                    "aria-label": "Remove photo",
                                    "data-ocid": `vet.delete_photo_button.${i + 1}`,
                                    className: "absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-destructive flex items-center justify-center",
                                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-2.5 h-2.5 text-white" })
                                  }
                                )
                              ]
                            },
                            src
                          ))
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: `vet-notes-${c.id}`,
                          className: "text-xs font-semibold text-foreground block mb-1",
                          children: language === "sw" ? "Maelezo ya Daktari (hiari)" : "Vet Notes (optional)"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Textarea,
                        {
                          id: `vet-notes-${c.id}`,
                          placeholder: language === "sw" ? "Ongeza maelezo, mabadiliko ya dawa..." : "Add notes, treatment modifications...",
                          value: review.notes,
                          onChange: (e) => handleNotesChange(c.id, e.target.value),
                          rows: 2,
                          className: "text-xs resize-none",
                          "data-ocid": `vet.review_notes.${i + 1}`
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          type: "button",
                          size: "sm",
                          className: "flex-1 gap-1.5 bg-accent hover:bg-accent/90 text-accent-foreground",
                          onClick: () => handleReview(c.id, "confirmed"),
                          "data-ocid": `vet.confirm_button.${i + 1}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5" }),
                            language === "sw" ? "Thibitisha Utambuzi" : "Confirm Diagnosis"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          type: "button",
                          size: "sm",
                          variant: "outline",
                          className: "flex-1 gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/5",
                          onClick: () => handleReview(c.id, "rejected"),
                          "data-ocid": `vet.reject_button.${i + 1}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5" }),
                            language === "sw" ? "Kataa" : "Reject"
                          ]
                        }
                      )
                    ] })
                  ]
                }
              )
            ]
          },
          c.id
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "w-4 h-4 text-blue-600" }),
        language === "sw" ? "Muhtasari wa Afya" : "Health Overview"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: [
        {
          label: language === "sw" ? "Ng'ombe" : "Cattle",
          emoji: "🐄",
          count: 12,
          health: 85
        },
        {
          label: language === "sw" ? "Mbuzi" : "Goats",
          emoji: "🐐",
          count: 35,
          health: 70
        },
        {
          label: language === "sw" ? "Kuku" : "Chickens",
          emoji: "🐔",
          count: 150,
          health: 55
        },
        {
          label: language === "sw" ? "Kondoo" : "Sheep",
          emoji: "🐑",
          count: 20,
          health: 90
        }
      ].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": `vet.health_overview.${i + 1}`,
          className: "bg-card border border-border rounded-xl p-3 space-y-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: item.emoji }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: item.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  item.count,
                  " ",
                  language === "sw" ? "wanyama" : "animals"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px] text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: language === "sw" ? "Afya" : "Health" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  item.health,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-muted rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `h-full rounded-full ${item.health >= 80 ? "bg-accent" : item.health >= 60 ? "bg-amber-400" : "bg-destructive"}`,
                  style: { width: `${item.health}%` }
                }
              ) })
            ] })
          ]
        },
        item.label
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-xs text-muted-foreground pt-2 pb-4", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      ". Built with love using",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
          className: "hover:text-primary",
          target: "_blank",
          rel: "noreferrer",
          children: "caffeine.ai"
        }
      )
    ] })
  ] }) });
}
export {
  VeterinarianDashboard as default
};
