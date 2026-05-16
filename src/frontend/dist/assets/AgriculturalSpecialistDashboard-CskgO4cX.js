import { k as createLucideIcon, u as useAuthStore, a as useLanguageStore, d as useNotificationStore, r as reactExports, j as jsxRuntimeExports, L as Layout, K as Clock, Q as Users, s as Leaf, m as Badge, H as ChevronDown, c as Camera, l as Textarea, B as Button, R as CircleCheckBig } from "./index-BUVIgngH.js";
import { A as AlertBanner } from "./AlertBanner-gHy4kgBH.js";
import { S as StatCard } from "./StatCard-vQlqcd7B.js";
import { C as ChevronUp } from "./chevron-up-CnJPygwE.js";
import { I as ImagePlus } from "./image-plus-Bmg-yBgt.js";
import { T as Trash2 } from "./trash-2-BRLnMANv.js";
import { C as CircleX } from "./circle-x-bCVEqfs_.js";
import "./triangle-alert-CqH2Gyzq.js";
import "./trending-down-B-P0A2rN.js";
import "./minus-BAwtOhGD.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "M12 11h4", key: "1jrz19" }],
  ["path", { d: "M12 16h4", key: "n85exb" }],
  ["path", { d: "M8 11h.01", key: "1dfujw" }],
  ["path", { d: "M8 16h.01", key: "18s6g9" }]
];
const ClipboardList = createLucideIcon("clipboard-list", __iconNode);
const PENDING_CASES = [
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
      "Avoid overhead irrigation"
    ]
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
      "Improve air circulation between rows"
    ]
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
      "Control aphid vectors with insecticide"
    ]
  }
];
function AgriculturalSpecialistDashboard() {
  const { user } = useAuthStore();
  const { language } = useLanguageStore();
  const { notifications } = useNotificationStore();
  const critical = notifications.filter(
    (n) => n.priority === "critical" && !n.read
  );
  const [expandedCase, setExpandedCase] = reactExports.useState(null);
  const [reviewState, setReviewState] = reactExports.useState(
    () => Object.fromEntries(
      PENDING_CASES.map((c) => [c.id, { status: null, notes: "", photos: [] }])
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
  const pendingCount = PENDING_CASES.filter(
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
          src: "/assets/generated/hero-agriculture.dim_800x500.jpg",
          alt: "Specialist",
          className: "w-full h-32 object-cover"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent flex items-end p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-display font-bold text-white", children: language === "sw" ? "Mtaalamu wa Kilimo" : "Agricultural Specialist" }),
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
          title: language === "sw" ? "Wakulima" : "Farmers",
          value: "24",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
          colorClass: "bg-green-50 text-green-600"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          title: language === "sw" ? "Zimesuluhiwa" : "Resolved",
          value: String(PENDING_CASES.length - pendingCount),
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "w-4 h-4" }),
          colorClass: "bg-blue-50 text-blue-600"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-semibold text-foreground flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-4 h-4 text-primary" }),
          language === "sw" ? "Kesi Zinazongoja Mapitio" : "Pending Cases"
        ] }),
        pendingCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold bg-amber-100 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded-full", children: pendingCount })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: PENDING_CASES.map((c, i) => {
        const review = reviewState[c.id];
        const isExpanded = expandedCase === c.id;
        const isReviewed = (review == null ? void 0 : review.status) !== null;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": `agri.pending_case.${i + 1}`,
            className: `bg-card border rounded-xl overflow-hidden transition-all ${isReviewed ? "border-border opacity-70" : "border-border"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: c.imageUrl,
                    alt: c.crop,
                    className: "w-14 h-14 object-cover rounded-lg flex-shrink-0"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground truncate", children: c.farmer }),
                    isReviewed ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-[10px] px-2 py-0.5 rounded-full border font-medium shrink-0 ${review.status === "confirmed" ? "bg-accent/15 text-accent border-accent/30" : "bg-destructive/10 text-destructive border-destructive/20"}`,
                        children: review.status === "confirmed" ? language === "sw" ? "Imethibitishwa" : "Confirmed" : language === "sw" ? "Imekataliwa" : "Rejected"
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-[10px] shrink-0 bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100", children: language === "sw" ? "Inasubiri" : "Pending" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    c.crop,
                    " · ",
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
                    "data-ocid": `agri.review_toggle.${i + 1}`,
                    className: "p-1.5 rounded-lg hover:bg-muted transition-colors",
                    children: isExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground" })
                  }
                )
              ] }),
              isReviewed && (review.notes || review.photos.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border p-3 space-y-2 bg-muted/10", children: [
                review.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-0.5", children: language === "sw" ? "Maelezo ya Mtaalamu" : "Specialist Notes" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground", children: review.notes })
                ] }),
                review.photos.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1", children: language === "sw" ? "Picha za Mtaalamu" : "Specialist Photos" }),
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
                  "data-ocid": `agri.case_detail.${i + 1}`,
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
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground mb-1.5", children: language === "sw" ? "Mapendekezo ya AI" : "AI Recommendations" }),
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
                            "data-ocid": `agri.capture_photo_button.${i + 1}`,
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
                            "data-ocid": `agri.add_photo_button.${i + 1}`,
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
                          "data-ocid": `agri.photo_gallery.${i + 1}`,
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
                                    "data-ocid": `agri.delete_photo_button.${i + 1}`,
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
                          htmlFor: `notes-${c.id}`,
                          className: "text-xs font-semibold text-foreground block mb-1",
                          children: language === "sw" ? "Maelezo ya Mtaalamu (hiari)" : "Specialist Notes (optional)"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Textarea,
                        {
                          id: `notes-${c.id}`,
                          placeholder: language === "sw" ? "Ongeza maelezo au mabadiliko..." : "Add notes or corrections...",
                          value: review.notes,
                          onChange: (e) => handleNotesChange(c.id, e.target.value),
                          rows: 2,
                          className: "text-xs resize-none",
                          "data-ocid": `agri.review_notes.${i + 1}`
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
                          "data-ocid": `agri.confirm_button.${i + 1}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5" }),
                            language === "sw" ? "Thibitisha" : "Confirm"
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
                          "data-ocid": `agri.reject_button.${i + 1}`,
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
  AgriculturalSpecialistDashboard as default
};
