import { k as createLucideIcon, a as useLanguageStore, r as reactExports, j as jsxRuntimeExports, X, I as Input, l as Textarea, U as Upload, B as Button, b as useNavigate, y as MapPin, m as Badge, z as formatTSh, M as MessageCircle, u as useAuthStore, d as useNotificationStore, g as getWeatherForLocation, D as ANIMAL_RECORDS, E as ANIMAL_LISTINGS_FULL, T as TrendingUp, L as Layout, c as Camera, s as Leaf, A as AI_DIAGNOSES, i as MARKET_PRICES, P as Package, t as BookOpen, v as MapPinned, w as ChartNoAxesColumn, x as FileText, W as Wallet } from "./index-BUVIgngH.js";
import { e as generateLivestockReminders, a as generatePredictiveReminders, f as getLivestockSuggestedQuestions, A as ArrowRight, P as PredictiveReminderCards, c as AIAdvisorWidget, U as UpcomingTasksWidget, R as Radio, h as generateLivestockResponse } from "./UpcomingTasksWidget-fR615UnW.js";
import { L as Label } from "./label-BTY_QCm0.js";
import { F as ForecastCard } from "./ForecastCard-Co0q0dcV.js";
import { P as Pen } from "./pen-D11l_exL.js";
import { P as Pause, a as Play } from "./play-CswM2M6J.js";
import { T as Trash2 } from "./trash-2-BRLnMANv.js";
import { A as AlertBanner } from "./AlertBanner-gHy4kgBH.js";
import { M as MarketPriceCard } from "./MarketPriceCard-BEDWrgkq.js";
import { S as StatCard } from "./StatCard-vQlqcd7B.js";
import { W as WeatherWidget } from "./WeatherWidget-BNJSz6vI.js";
import { u as ue } from "./index-c308oYmR.js";
import { S as Syringe } from "./syringe-CUQ027P-.js";
import { S as ShieldCheck } from "./shield-check-CYiHWttZ.js";
import { S as Stethoscope } from "./stethoscope-BgimVgvv.js";
import { S as ShoppingBasket } from "./shopping-basket-8nt8_ggH.js";
import { B as Briefcase } from "./briefcase-WOQc6aU0.js";
import { S as Shield } from "./shield-tHD7Q_gt.js";
import { P as Plus } from "./plus-DMsGFanj.js";
import { H as HeartPulse } from "./heart-pulse-D78PpmMA.js";
import { G as Gavel } from "./gavel-CIxzjL7N.js";
import { D as Droplets } from "./droplets-Wf5xpwFg.js";
import { S as Satellite } from "./satellite-DpdL2XDS.js";
import "./sparkles-CaU8FUVB.js";
import "./lightbulb-BbCrq2Ko.js";
import "./chevron-up-CnJPygwE.js";
import "./send-B_LO1ymC.js";
import "./triangle-alert-CqH2Gyzq.js";
import "./calendarTypes-ZI3l1TGg.js";
import "./refresh-cw-BNbremAW.js";
import "./index-ob0xpmgs.js";
import "./BarChart-CLPOFkNj.js";
import "./trending-down-B-P0A2rN.js";
import "./minus-BAwtOhGD.js";
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
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ]
];
const Heart = createLucideIcon("heart", __iconNode$1);
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
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode);
const ANIMAL_TYPES = ["Cattle", "Goats", "Sheep", "Poultry", "Pigs", "Other"];
const HEALTH_STATUS_OPTIONS = ["Excellent", "Good", "Fair", "Needs Attention"];
const EMPTY_FORM = {
  animalType: "Cattle",
  breed: "",
  ageValue: "",
  ageUnit: "months",
  count: "",
  pricePerHead: "",
  location: "",
  healthStatus: "Excellent",
  healthDescription: "",
  specialQualities: "",
  imagePreview: null
};
function AddLivestockModal({
  open,
  existing,
  onClose,
  onSubmit
}) {
  const { language } = useLanguageStore();
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const [errors, setErrors] = reactExports.useState({});
  const fileRef = reactExports.useRef(null);
  const isEdit = !!existing;
  reactExports.useEffect(() => {
    if (existing) {
      const [ageV, ageU] = (existing.age ?? "").split(" ");
      setForm({
        animalType: existing.animalType,
        breed: existing.breed ?? "",
        ageValue: ageV ?? "",
        ageUnit: ageU === "years" ? "years" : "months",
        count: String(existing.count),
        pricePerHead: String(existing.pricePerHead),
        location: existing.location,
        healthStatus: existing.healthStatus,
        healthDescription: existing.healthDescription ?? "",
        specialQualities: existing.specialQualities ?? "",
        imagePreview: existing.imageUrl ?? null
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
  }, [existing]);
  if (!open) return null;
  const L = {
    title: isEdit ? language === "sw" ? "Hariri Orodha ya Mnyama" : "Edit Livestock Listing" : language === "sw" ? "Ongeza Mnyama kwa Kuuza" : "Add Livestock for Sale",
    animalType: language === "sw" ? "Aina ya Mnyama" : "Animal Type",
    breed: language === "sw" ? "Aina ya Mbari" : "Breed",
    age: language === "sw" ? "Umri" : "Age",
    count: language === "sw" ? "Idadi" : "Quantity",
    price: language === "sw" ? "Bei kwa Kichwa (TSh)" : "Price per Head (TSh)",
    location: language === "sw" ? "Eneo" : "Location",
    healthStatus: language === "sw" ? "Hali ya Afya" : "Health Status",
    healthDesc: language === "sw" ? "Maelezo ya Afya" : "Health Description",
    special: language === "sw" ? "Sifa Maalum" : "Special Qualities",
    image: language === "sw" ? "Picha" : "Image",
    addImage: language === "sw" ? "Ongeza Picha" : "Upload Image",
    submit: isEdit ? language === "sw" ? "Hifadhi Mabadiliko" : "Save Changes" : language === "sw" ? "Weka Orodha" : "List Animal",
    cancel: language === "sw" ? "Ghairi" : "Cancel",
    required: language === "sw" ? "Inahitajika" : "Required",
    months: language === "sw" ? "miezi" : "months",
    years: language === "sw" ? "miaka" : "years"
  };
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const handleImage = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      var _a2;
      return set("imagePreview", (_a2 = ev.target) == null ? void 0 : _a2.result);
    };
    reader.readAsDataURL(file);
  };
  const validate = () => {
    const errs = {};
    if (!form.breed.trim()) errs.breed = L.required;
    if (!form.ageValue || Number(form.ageValue) <= 0)
      errs.ageValue = L.required;
    if (!form.count || Number(form.count) <= 0) errs.count = L.required;
    if (!form.pricePerHead || Number(form.pricePerHead) <= 0)
      errs.pricePerHead = L.required;
    if (!form.location.trim()) errs.location = L.required;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      animalType: form.animalType,
      breed: form.breed.trim(),
      age: `${form.ageValue} ${form.ageUnit}`,
      count: Number(form.count),
      pricePerHead: Number(form.pricePerHead),
      location: form.location.trim(),
      healthStatus: form.healthStatus,
      healthDescription: form.healthDescription.trim(),
      specialQualities: form.specialQualities.trim(),
      imageUrl: form.imagePreview ?? void 0
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50",
      onClick: (e) => {
        if (e.target === e.currentTarget) onClose();
      },
      onKeyDown: (e) => {
        if (e.key === "Escape") onClose();
      },
      role: "presentation",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[92dvh] flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-base text-foreground", children: L.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              className: "p-1.5 rounded-full hover:bg-muted transition-colors",
              "data-ocid": "add_livestock_modal.close_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "overflow-y-auto flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold", children: L.animalType }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: ANIMAL_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => set("animalType", t),
                  className: `px-3 py-1 rounded-full text-xs font-medium border transition-colors ${form.animalType === t ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground border-border hover:border-primary/40"}`,
                  children: [
                    t === "Cattle" ? "🐄" : t === "Goats" ? "🐐" : t === "Sheep" ? "🐑" : t === "Poultry" ? "🐔" : t === "Pigs" ? "🐷" : "🐾",
                    " ",
                    t
                  ]
                },
                t
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "al-breed", className: "text-xs font-semibold", children: [
                L.breed,
                " *"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "al-breed",
                  value: form.breed,
                  onChange: (e) => set("breed", e.target.value),
                  placeholder: language === "sw" ? "mfano: Sahiwal Cross" : "e.g. Sahiwal Cross",
                  className: "text-sm",
                  "data-ocid": "add_livestock_modal.breed_input"
                }
              ),
              errors.breed && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.breed })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "al-age", className: "text-xs font-semibold", children: [
                  L.age,
                  " *"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "al-age",
                      type: "number",
                      min: "1",
                      value: form.ageValue,
                      onChange: (e) => set("ageValue", e.target.value),
                      className: "text-sm flex-1 min-w-0",
                      placeholder: "12",
                      "data-ocid": "add_livestock_modal.age_input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "select",
                    {
                      value: form.ageUnit,
                      onChange: (e) => set("ageUnit", e.target.value),
                      className: "border border-input rounded-md px-2 text-xs bg-background text-foreground",
                      "data-ocid": "add_livestock_modal.age_unit_select",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "months", children: L.months }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "years", children: L.years })
                      ]
                    }
                  )
                ] }),
                errors.ageValue && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.ageValue })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "al-count", className: "text-xs font-semibold", children: [
                  L.count,
                  " *"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "al-count",
                    type: "number",
                    min: "1",
                    value: form.count,
                    onChange: (e) => set("count", e.target.value),
                    className: "text-sm",
                    placeholder: "10",
                    "data-ocid": "add_livestock_modal.count_input"
                  }
                ),
                errors.count && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.count })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "al-price", className: "text-xs font-semibold", children: [
                L.price,
                " *"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "al-price",
                  type: "number",
                  min: "1",
                  value: form.pricePerHead,
                  onChange: (e) => set("pricePerHead", e.target.value),
                  placeholder: "850000",
                  className: "text-sm",
                  "data-ocid": "add_livestock_modal.price_input"
                }
              ),
              errors.pricePerHead && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.pricePerHead })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "al-location", className: "text-xs font-semibold", children: [
                L.location,
                " *"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "al-location",
                  value: form.location,
                  onChange: (e) => set("location", e.target.value),
                  placeholder: language === "sw" ? "mfano: Arusha" : "e.g. Arusha",
                  className: "text-sm",
                  "data-ocid": "add_livestock_modal.location_input"
                }
              ),
              errors.location && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.location })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold", children: L.healthStatus }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: HEALTH_STATUS_OPTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => set("healthStatus", s),
                  className: `px-3 py-1 rounded-full text-xs font-medium border transition-colors ${form.healthStatus === s ? s === "Excellent" || s === "Good" ? "bg-green-600 text-white border-green-600" : s === "Fair" ? "bg-amber-500 text-white border-amber-500" : "bg-destructive text-white border-destructive" : "bg-muted text-muted-foreground border-border hover:border-primary/40"}`,
                  "data-ocid": `add_livestock_modal.health_${s.toLowerCase().replace(" ", "_")}`,
                  children: s
                },
                s
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "al-healthdesc", className: "text-xs font-semibold", children: L.healthDesc }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "al-healthdesc",
                  value: form.healthDescription,
                  onChange: (e) => set("healthDescription", e.target.value),
                  placeholder: language === "sw" ? "Elezea hali ya afya ya mnyama..." : "Describe health condition, vaccinations...",
                  rows: 2,
                  className: "text-sm resize-none",
                  "data-ocid": "add_livestock_modal.health_desc_textarea"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "al-special", className: "text-xs font-semibold", children: L.special }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "al-special",
                  value: form.specialQualities,
                  onChange: (e) => set("specialQualities", e.target.value),
                  placeholder: language === "sw" ? "mfano: Anatosha maziwa mengi, amechanjwa..." : "e.g. High milk producer, fully vaccinated...",
                  rows: 2,
                  className: "text-sm resize-none",
                  "data-ocid": "add_livestock_modal.special_qualities_textarea"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold", children: L.image }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  ref: fileRef,
                  type: "file",
                  accept: "image/*",
                  onChange: handleImage,
                  className: "hidden",
                  "data-ocid": "add_livestock_modal.image_file_input"
                }
              ),
              form.imagePreview ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full h-36 rounded-xl overflow-hidden bg-muted", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: form.imagePreview,
                    alt: "Preview",
                    className: "w-full h-full object-cover"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => set("imagePreview", null),
                    className: "absolute top-2 right-2 bg-black/60 rounded-full p-1",
                    "data-ocid": "add_livestock_modal.remove_image_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3 text-white" })
                  }
                )
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    var _a;
                    return (_a = fileRef.current) == null ? void 0 : _a.click();
                  },
                  className: "w-full h-28 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 hover:border-primary/60 transition-colors bg-muted/30",
                  "data-ocid": "add_livestock_modal.upload_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4 text-primary" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: L.addImage })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 px-4 py-3 border-t border-border shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                className: "flex-1",
                onClick: onClose,
                "data-ocid": "add_livestock_modal.cancel_button",
                children: L.cancel
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                className: "flex-1",
                "data-ocid": "add_livestock_modal.submit_button",
                children: L.submit
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
const HEALTH_BADGE = {
  Excellent: "bg-green-50 text-green-700 border-green-200",
  Good: "bg-green-50 text-green-600 border-green-200",
  Fair: "bg-amber-50 text-amber-700 border-amber-200",
  "Needs Attention": "bg-destructive/10 text-destructive border-destructive/20"
};
const ANIMAL_EMOJI = {
  Cattle: "🐄",
  Goats: "🐐",
  Sheep: "🐑",
  Poultry: "🐔",
  Pigs: "🐷"
};
function LivestockListingCard({
  listing,
  index,
  onEdit,
  onPauseResume,
  onDelete
}) {
  const { language } = useLanguageStore();
  const navigate = useNavigate();
  const healthBadgeClass = HEALTH_BADGE[listing.healthStatus] ?? "bg-muted text-muted-foreground border-border";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `livestock.listing.${index}`,
      className: `bg-card border border-border rounded-xl overflow-hidden transition-smooth ${!listing.isActive ? "opacity-60" : ""}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0", children: listing.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: listing.imageUrl,
              alt: listing.animalType,
              className: "w-full h-full object-cover"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center text-3xl", children: ANIMAL_EMOJI[listing.animalType] ?? "🐾" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-sm text-foreground truncate", children: [
                  listing.animalType,
                  " ",
                  listing.breed ? `— ${listing.breed}` : ""
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 text-muted-foreground shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: listing.location })
                ] })
              ] }),
              !listing.isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "text-[10px] px-1.5 py-0 shrink-0",
                  children: language === "sw" ? "Imesimamishwa" : "Paused"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-1.5 mt-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-[10px] px-2 py-0.5 rounded-full border font-medium ${healthBadgeClass}`,
                  children: listing.healthStatus
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
                language === "sw" ? "Idadi:" : "Qty:",
                " ",
                listing.count
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold text-primary", children: formatTSh(listing.pricePerHead) })
            ] }),
            listing.inquiries > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => navigate({
                  to: "/messages",
                  search: { recipientId: void 0 }
                }),
                className: "mt-1.5 flex items-center gap-1 text-[10px] text-primary font-medium hover:underline",
                "data-ocid": `livestock.listing.${index}.inquiry_badge`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-3 h-3" }),
                  listing.inquiries,
                  " ",
                  language === "sw" ? "maswali" : "inquiries"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex border-t border-border divide-x divide-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => onEdit(listing),
              className: "flex-1 flex items-center justify-center gap-1.5 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors",
              "data-ocid": `livestock.listing.${index}.edit_button`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5" }),
                language === "sw" ? "Hariri" : "Edit"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => onPauseResume(listing.id, listing.isActive),
              className: "flex-1 flex items-center justify-center gap-1.5 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors",
              "data-ocid": `livestock.listing.${index}.pause_button`,
              children: listing.isActive ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "w-3.5 h-3.5" }),
                language === "sw" ? "Simamisha" : "Pause"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3.5 h-3.5" }),
                language === "sw" ? "Endelea" : "Resume"
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => onDelete(listing.id),
              className: "flex-1 flex items-center justify-center gap-1.5 py-2 text-xs text-destructive hover:bg-destructive/10 transition-colors",
              "data-ocid": `livestock.listing.${index}.delete_button`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
                language === "sw" ? "Futa" : "Delete"
              ]
            }
          )
        ] })
      ]
    }
  );
}
const HEALTH_COLORS = {
  healthy: "bg-green-50 text-green-600 border-green-200",
  sick: "bg-destructive/10 text-destructive border-destructive/20",
  under_treatment: "bg-amber-50 text-amber-700 border-amber-200",
  recovered: "bg-blue-50 text-blue-600 border-blue-200"
};
function LivestockDashboard() {
  const { user } = useAuthStore();
  const { t, language } = useLanguageStore();
  const { notifications } = useNotificationStore();
  const weather = getWeatherForLocation((user == null ? void 0 : user.location) ?? "Arusha");
  const critical = notifications.filter(
    (n) => n.priority === "critical" && !n.read
  );
  const navigate = useNavigate();
  const totalAnimals = ANIMAL_RECORDS.reduce((s, a) => s + a.count, 0);
  const healthyCount = ANIMAL_RECORDS.filter(
    (a) => a.healthStatus === "healthy"
  ).length;
  const animalTypes = (user == null ? void 0 : user.animalTypes) ?? ["Cattle", "Goats"];
  const userLocation = (user == null ? void 0 : user.location) ?? "Arusha";
  const month = (/* @__PURE__ */ new Date()).getMonth();
  const simulatedSeason = month >= 9 || month <= 1 ? "planting" : month >= 2 && month <= 4 ? "growing" : month >= 5 && month <= 6 ? "harvesting" : "dry";
  const simulatedWeather = month >= 9 || month <= 4 ? "rainy" : month >= 5 && month <= 7 ? "dry" : "sunny";
  const livestockContext = {
    role: "livestock_keeper",
    location: userLocation,
    animalTypes,
    weatherCondition: simulatedWeather,
    season: simulatedSeason
  };
  const livestockReminders = generateLivestockReminders(
    livestockContext,
    language
  );
  const livestockPredictiveReminders = generatePredictiveReminders(
    livestockContext,
    language
  );
  const livestockSuggestedQuestions = getLivestockSuggestedQuestions(
    livestockContext,
    language
  );
  const myId = (user == null ? void 0 : user.id) ?? "u2";
  const initial = ANIMAL_LISTINGS_FULL.filter((l) => l.keeperId === myId);
  const [listings, setListings] = reactExports.useState(
    initial.length > 0 ? initial : ANIMAL_LISTINGS_FULL
  );
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [editTarget, setEditTarget] = reactExports.useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = reactExports.useState(null);
  const handleAddOrEdit = (data) => {
    if (editTarget) {
      setListings(
        (prev) => prev.map((l) => l.id === editTarget.id ? { ...l, ...data } : l)
      );
      ue.success(
        language === "sw" ? "Orodha imesasishwa" : "Listing updated"
      );
    } else {
      const newItem = {
        ...data,
        id: `alf${Date.now()}`,
        keeperId: myId,
        keeperName: (user == null ? void 0 : user.name) ?? "Keeper",
        isActive: true,
        inquiries: 0,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      setListings((prev) => [newItem, ...prev]);
      ue.success(
        language === "sw" ? "Mnyama amewekwa sokoni!" : "Livestock listed for sale!"
      );
    }
    setModalOpen(false);
    setEditTarget(null);
  };
  const handleEdit = (listing) => {
    setEditTarget(listing);
    setModalOpen(true);
  };
  const handlePauseResume = (id, isActive) => {
    setListings(
      (prev) => prev.map((l) => l.id === id ? { ...l, isActive: !isActive } : l)
    );
    ue(
      isActive ? language === "sw" ? "Orodha imesimamishwa" : "Listing paused" : language === "sw" ? "Orodha imeendelea" : "Listing resumed"
    );
  };
  const handleDeleteConfirm = (id) => {
    setDeleteConfirmId(id);
  };
  const handleDeleteExecute = () => {
    if (!deleteConfirmId) return;
    setListings((prev) => prev.filter((l) => l.id !== deleteConfirmId));
    setDeleteConfirmId(null);
    ue.success(language === "sw" ? "Orodha imefutwa" : "Listing removed");
  };
  const LIVESTOCK_TIPS = [
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Syringe, { className: "w-3.5 h-3.5 text-blue-500" }),
      title: language === "sw" ? "Kumbusho la Chanjo" : "Vaccination Reminder",
      advice: language === "sw" ? `Chanjo ya FMD kwa ${animalTypes[0]} inahitajika mwezi ujao. Wasiliana na daktari wa wanyama.` : `FMD vaccination for ${animalTypes[0]} is due next month. Book a vet visit through the app now.`
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-3.5 h-3.5 text-destructive" }),
      title: language === "sw" ? "Afya ya Wanyama" : "Animal Health Tip",
      advice: language === "sw" ? "Wanyama wanaostawi wanahitaji maji safi kila wakati. Angalia dalili za ugonjwa asubuhi na jioni." : `Healthy ${animalTypes[0]} need fresh water daily. Check for fever, loss of appetite, or discharge each morning.`
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3.5 h-3.5 text-accent" }),
      title: language === "sw" ? "Wakati wa Kuuza" : "Market Timing",
      advice: language === "sw" ? "Bei ya ng'ombe inapanda kabla ya msimu wa harusi. Fikiria kuuza mwezi ujao kwa faida nzuri." : `${animalTypes[0]} prices are rising ahead of festive season. Ideal selling window is the next 3-4 weeks.`
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3.5 h-3.5 text-primary" }),
      title: language === "sw" ? "Ushauri wa Malisho" : "Feeding Advice",
      advice: language === "sw" ? `Nyongeza ya madini (mineral block) inaboresha uzalishaji wa maziwa na ukuaji kwa ${animalTypes[0]}.` : `Mineral block supplementation can improve milk yield and growth rates for ${animalTypes[0]} by 20%.`
    }
  ];
  const getLivestockResponse = (q, history) => {
    const lowerQ = q.toLowerCase();
    const isReminderQuery = /(reminder|kumbusho|show|nionyeshe|weather advice|ushauri wa hewa|upcoming|kazi zijazo)/.test(
      lowerQ
    );
    if (isReminderQuery && livestockPredictiveReminders.length > 0) {
      const topReminders = livestockPredictiveReminders.filter((r) => r.urgency === "high").slice(0, 2);
      if (topReminders.length > 0) {
        const base = generateLivestockResponse(
          q,
          history,
          livestockContext,
          language
        );
        const reminderLines = topReminders.map((r) => `• ${r.title}: ${r.message}`).join("\n");
        return language === "sw" ? `${base}

Vikumbusho vya sasa:
${reminderLines}` : `${base}

Current smart reminders:
${reminderLines}`;
      }
    }
    return generateLivestockResponse(q, history, livestockContext, language);
  };
  const ACTIONS = [
    {
      icon: Camera,
      label: language === "sw" ? "Gundua Ugonjwa" : "Diagnose Animal",
      color: "bg-destructive/10 text-destructive",
      onClick: () => navigate({ to: "/diagnosis" })
    },
    {
      icon: Stethoscope,
      label: language === "sw" ? "Daktari wa Wanyama" : "Call Vet",
      color: "bg-blue-50 text-blue-600",
      onClick: () => navigate({ to: "/search", search: { q: "veterinarian" } })
    },
    {
      icon: ShoppingBasket,
      label: language === "sw" ? "Soko" : "Marketplace",
      color: "bg-accent/10 text-accent",
      onClick: () => navigate({ to: "/dashboard/livestock" })
    },
    {
      icon: MessageCircle,
      label: language === "sw" ? "Ujumbe" : "Messages",
      color: "bg-primary/10 text-primary",
      onClick: () => navigate({ to: "/messages", search: { recipientId: void 0 } })
    },
    {
      icon: Briefcase,
      label: language === "sw" ? "Soko la Kazi" : "Job Marketplace",
      color: "bg-blue-100 text-blue-700",
      onClick: () => navigate({ to: "/jobs" })
    },
    {
      icon: Shield,
      label: language === "sw" ? "Bima" : "Insurance",
      color: "bg-indigo-100 text-indigo-700",
      onClick: () => navigate({ to: "/insurance" })
    },
    {
      icon: Leaf,
      label: language === "sw" ? "Tuzo za Kaboni" : "Carbon Rewards",
      color: "bg-emerald-100 text-emerald-700",
      onClick: () => navigate({ to: "/carbon-farming" })
    },
    {
      icon: TrendingUp,
      label: language === "sw" ? "Maarifa ya Mafanikio" : "Success Insights",
      color: "bg-violet-100 text-violet-700",
      onClick: () => navigate({ to: "/success-insights" })
    }
  ];
  const activeListings = listings.filter((l) => l.isActive).length;
  const totalInquiries = listings.reduce((s, l) => s + l.inquiries, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-4 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-xl overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: "/assets/generated/livestock-hero.dim_800x500.jpg",
            alt: "Livestock",
            className: "w-full h-32 object-cover"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-amber-900/80 to-transparent flex items-end p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-display font-bold text-white", children: language === "sw" ? "Dashibodi ya Mfugaji" : "Livestock Dashboard" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-white/80", children: [
            user == null ? void 0 : user.name,
            " · ",
            user == null ? void 0 : user.location
          ] })
        ] }) })
      ] }),
      critical.slice(0, 1).map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(AlertBanner, { message: n.body, priority: "critical" }, n.id)),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            title: t("animalsRegistered"),
            value: totalAnimals,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "🐄" }),
            colorClass: "bg-amber-50 text-amber-700"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            title: t("healthScore"),
            value: `${Math.round(healthyCount / ANIMAL_RECORDS.length * 100)}%`,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-4 h-4" }),
            colorClass: "bg-green-50 text-green-600",
            trend: "up",
            trendValue: "+2%"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            title: t("lastCheck"),
            value: "Leo",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Syringe, { className: "w-4 h-4" }),
            colorClass: "bg-blue-50 text-blue-600"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground mb-2", children: t("quickActions") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2", children: ACTIONS.map(({ icon: Icon, label, color, onClick }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick,
            "data-ocid": `livestock.action_${label.toLowerCase().replace(/\s+/g, "_")}`,
            className: "flex flex-col items-center gap-1.5 p-2 bg-card border border-border rounded-xl hover:shadow-sm transition-smooth active:scale-95",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-10 h-10 rounded-full flex items-center justify-center ${color}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-center text-muted-foreground leading-tight", children: label })
            ]
          },
          label
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "livestock.my_listings_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-semibold text-foreground flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-4 h-4 text-primary" }),
              language === "sw" ? "Mifugo Wangu Sokoni" : "My Livestock Listings"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: [
              activeListings,
              " ",
              language === "sw" ? "zinazotumika" : "active",
              " ",
              "· ",
              totalInquiries,
              " ",
              language === "sw" ? "maswali" : "inquiries"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              className: "gap-1.5 h-8 text-xs px-3",
              onClick: () => {
                setEditTarget(null);
                setModalOpen(true);
              },
              "data-ocid": "livestock.add_listing_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
                language === "sw" ? "Ongeza Mnyama" : "Add Livestock"
              ]
            }
          )
        ] }),
        listings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "livestock.listings_empty_state",
            className: "bg-card border border-border border-dashed rounded-xl p-6 flex flex-col items-center gap-3 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-6 h-6 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: language === "sw" ? "Hakuna mifugo sokoni" : "No listings yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: language === "sw" ? "Anza kuuza mifugo wako leo kwa kuongeza orodha" : "Start selling your livestock by adding your first listing" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  className: "gap-1.5",
                  onClick: () => {
                    setEditTarget(null);
                    setModalOpen(true);
                  },
                  "data-ocid": "livestock.empty_state_add_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
                    language === "sw" ? "Ongeza Mnyama wa Kwanza" : "Add First Listing"
                  ]
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: listings.map((listing, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          LivestockListingCard,
          {
            listing,
            index: i + 1,
            onEdit: handleEdit,
            onPauseResume: handlePauseResume,
            onDelete: handleDeleteConfirm
          },
          listing.id
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "livestock.ai_diagnosis_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-semibold text-foreground flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(HeartPulse, { className: "w-4 h-4 text-destructive" }),
            language === "sw" ? "Uchunguzi wa Afya ya Mnyama" : "AI Animal Diagnosis"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => navigate({ to: "/diagnosis" }),
              className: "text-xs text-primary font-medium hover:underline flex items-center gap-0.5",
              "data-ocid": "livestock.diagnosis_view_all_button",
              children: [
                language === "sw" ? "Ona Zaidi" : "View All",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [AI_DIAGNOSES.animal_fmd].map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": `livestock.recent_diagnosis.${i + 1}`,
              className: "flex items-center justify-between py-2 border-b border-border last:border-0",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: d.diagnosis }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
                    d.confidence,
                    "%",
                    " ",
                    language === "sw" ? "uhakika" : "confidence"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-medium shrink-0", children: language === "sw" ? "Inasubiri" : "Awaiting" })
              ]
            },
            d.requestId
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              className: "w-full gap-2",
              onClick: () => navigate({ to: "/diagnosis" }),
              "data-ocid": "livestock.new_diagnosis_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-4 h-4" }),
                language === "sw" ? "Uchunguzi Mpya" : "New Diagnosis"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PredictiveReminderCards,
        {
          userProfile: livestockContext,
          type: "livestock"
        }
      ),
      (() => {
        const milkForecast = {
          id: "lf1",
          userId: "local",
          forecastType: "milk_production",
          title: language === "sw" ? "Utabiri wa Uzalishaji wa Maziwa" : "Monthly Milk Production Forecast",
          predictedValue: 450,
          unit: "L/month",
          confidenceScore: 78,
          keyDrivers: language === "sw" ? [
            "Ubora wa chakula",
            "Malisho ya msimu",
            "Wastani wa Friesian",
            "Hali ya hewa"
          ] : [
            "Feed quality",
            "Seasonal pasture",
            "Friesian breed average",
            "Current weather"
          ],
          monthlyBreakdown: [
            { month: "Jan", value: 420 },
            { month: "Feb", value: 445 },
            { month: "Mar", value: 460 },
            { month: "Apr", value: 450 },
            { month: "May", value: 435 },
            { month: "Jun", value: 410 }
          ],
          sensitivityNote: language === "sw" ? "Kama ubora wa chakula utashuka kwa 10%, uzalishaji unaweza kupungua kwa 8%" : "If feed quality drops 10%, production may decrease by 8%",
          basedOn: {
            weatherScore: 75,
            soilScore: 60,
            feedingScore: 85,
            historyScore: 80
          },
          createdAt: new Date(Date.now() - 864e5).toISOString(),
          validUntil: new Date(Date.now() + 6048e5).toISOString()
        };
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "livestock.forecast_section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-semibold text-foreground flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-accent" }),
              language === "sw" ? "Utabiri wa Uzalishaji" : "Production Forecast"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => navigate({ to: "/forecasting" }),
                className: "text-xs text-primary font-medium hover:underline flex items-center gap-0.5",
                "data-ocid": "livestock.forecast_view_all_button",
                children: [
                  language === "sw" ? "Ona utabiri wote" : "See all forecasts",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ForecastCard, { forecast: milkForecast })
        ] });
      })(),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AIAdvisorWidget,
        {
          userName: (user == null ? void 0 : user.name) ?? "Keeper",
          tips: LIVESTOCK_TIPS,
          reminders: livestockReminders,
          getMockResponse: getLivestockResponse,
          widgetId: "livestock",
          userContext: livestockContext,
          suggestedQuestions: livestockSuggestedQuestions
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground mb-2", children: t("myAnimals") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ANIMAL_RECORDS.map((animal, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": `livestock.animal.${i + 1}`,
            className: "bg-card border border-border rounded-xl p-3 flex items-center gap-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-xl flex-shrink-0", children: animal.animalType === "Cattle" ? "🐄" : animal.animalType === "Goats" ? "🐐" : "🐔" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: animal.animalType }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  language === "sw" ? "Idadi:" : "Count:",
                  " ",
                  animal.count
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-[11px] px-2 py-0.5 rounded-full border font-medium ${HEALTH_COLORS[animal.healthStatus]}`,
                  children: animal.healthStatus === "healthy" ? language === "sw" ? "Mzima" : "Healthy" : animal.healthStatus === "sick" ? language === "sw" ? "Mgonjwa" : "Sick" : animal.healthStatus === "under_treatment" ? language === "sw" ? "Matibabu" : "Treatment" : "Recovered"
                }
              )
            ]
          },
          animal.id
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(WeatherWidget, { data: weather, lang: language }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(UpcomingTasksWidget, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground mb-2", children: t("marketPrices") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: MARKET_PRICES.filter((p) => p.category === "livestock").map(
          (p) => /* @__PURE__ */ jsxRuntimeExports.jsx(MarketPriceCard, { price: p, lang: language }, p.commodity)
        ) })
      ] }),
      (() => {
        const LOW_STOCK_ITEMS = [
          {
            name: language === "sw" ? "Chanjo ya FMD" : "FMD Vaccine",
            current: 3,
            unit: "doses"
          },
          {
            name: language === "sw" ? "Madini ya Mifugo" : "Mineral Blocks",
            current: 1,
            unit: "blocks"
          }
        ];
        const lowItems = LOW_STOCK_ITEMS.filter((i) => i.current <= 3);
        if (lowItems.length === 0) return null;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "livestock.inventory_alert",
            className: "bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-amber-800", children: language === "sw" ? "Tahadhari ya Hifadhi Ndogo" : "Low Stock Alert" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-amber-700 mt-0.5", children: lowItems.map((i) => `${i.name} (${i.current} ${i.unit})`).join(" · ") })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => navigate({ to: "/inventory" }),
                  className: "text-[11px] font-semibold text-amber-700 hover:underline whitespace-nowrap flex-shrink-0",
                  "data-ocid": "livestock.inventory_alert.view_button",
                  children: language === "sw" ? "Angalia" : "View"
                }
              )
            ]
          }
        );
      })(),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "livestock.quick_access_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground mb-2", children: language === "sw" ? "Ufikiaji wa Haraka" : "Quick Access" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: [
          {
            icon: BookOpen,
            label: language === "sw" ? "Rekodi" : "Records",
            sub: language === "sw" ? "Historia ya mifugo" : "Herd history",
            color: "bg-primary/10 text-primary",
            to: "/records",
            ocid: "livestock.quick_access.records"
          },
          {
            icon: Package,
            label: language === "sw" ? "Hifadhi" : "Inventory",
            sub: language === "sw" ? "Dawa na chakula" : "Medicine & feed",
            color: "bg-amber-100 text-amber-700",
            to: "/inventory",
            ocid: "livestock.quick_access.inventory"
          },
          {
            icon: MapPinned,
            label: language === "sw" ? "Ramani" : "Farm Map",
            sub: language === "sw" ? "Maeneo ya malisho" : "Grazing zones",
            color: "bg-green-50 text-green-600",
            to: "/farm-map",
            ocid: "livestock.quick_access.farm_map"
          },
          {
            icon: ChartNoAxesColumn,
            label: language === "sw" ? "Uchambuzi" : "Analytics",
            sub: language === "sw" ? "Utendaji wa mifugo" : "Performance data",
            color: "bg-blue-50 text-blue-600",
            to: "/analytics",
            ocid: "livestock.quick_access.analytics"
          },
          {
            icon: FileText,
            label: language === "sw" ? "Mikataba" : "Contracts",
            sub: language === "sw" ? "Makubaliano salama" : "Agreements",
            color: "bg-purple-50 text-purple-600",
            to: "/contracts",
            ocid: "livestock.quick_access.contracts"
          },
          {
            icon: Wallet,
            label: language === "sw" ? "Mikopo" : "Loans",
            sub: language === "sw" ? "Maombi ya fedha" : "Financing",
            color: "bg-accent/10 text-accent",
            to: "/loans",
            ocid: "livestock.quick_access.loans"
          },
          {
            icon: Radio,
            label: language === "sw" ? "Ramani ya Mlipuko" : "Outbreak Map",
            sub: language === "sw" ? "Magonjwa na mifugo" : "Livestock diseases",
            color: "bg-red-50 text-red-600",
            to: "/outbreak-map",
            ocid: "livestock.quick_access.outbreak_map"
          },
          {
            icon: Gavel,
            label: language === "sw" ? "Minada" : "Auctions",
            sub: language === "sw" ? "Zabuni za moja kwa moja" : "Live bidding",
            color: "bg-amber-50 text-amber-600",
            to: "/auctions",
            ocid: "livestock.quick_access.auctions"
          },
          {
            icon: Droplets,
            label: language === "sw" ? "Umwagiliaji" : "Irrigation",
            sub: language === "sw" ? "Ratiba ya maji" : "Water schedule",
            color: "bg-cyan-50 text-cyan-600",
            to: "/irrigation",
            ocid: "livestock.quick_access.irrigation"
          },
          {
            icon: Satellite,
            label: language === "sw" ? "Uchambuzi wa Ndege" : "Drone Analysis",
            sub: language === "sw" ? "Picha za anga" : "Aerial imagery",
            color: "bg-indigo-50 text-indigo-600",
            to: "/drone-analysis",
            ocid: "livestock.quick_access.drone_analysis"
          }
        ].map(({ icon: Icon, label, sub, color, to, ocid }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => navigate({ to }),
            "data-ocid": ocid,
            className: "bg-card border border-border rounded-xl p-3 flex flex-col items-center gap-1.5 hover:shadow-sm hover:border-primary/30 transition-smooth active:scale-95 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-9 h-9 rounded-full flex items-center justify-center ${color}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4.5 h-4.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground leading-tight", children: label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground leading-tight", children: sub })
            ]
          },
          ocid
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
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddLivestockModal,
      {
        open: modalOpen,
        existing: editTarget,
        onClose: () => {
          setModalOpen(false);
          setEditTarget(null);
        },
        onSubmit: handleAddOrEdit
      }
    ),
    deleteConfirmId && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4",
        onClick: (e) => {
          if (e.target === e.currentTarget) setDeleteConfirmId(null);
        },
        onKeyDown: (e) => {
          if (e.key === "Escape") setDeleteConfirmId(null);
        },
        role: "presentation",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card rounded-2xl shadow-2xl p-6 w-full max-w-sm",
            "data-ocid": "livestock.delete_dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-base text-foreground mb-1", children: language === "sw" ? "Futa Orodha" : "Delete Listing" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: language === "sw" ? "Una uhakika unataka kufuta orodha hii? Kitendo hiki hakiwezi kurudishwa." : "Are you sure you want to delete this listing? This action cannot be undone." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    className: "flex-1",
                    onClick: () => setDeleteConfirmId(null),
                    "data-ocid": "livestock.delete_dialog.cancel_button",
                    children: language === "sw" ? "Ghairi" : "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "destructive",
                    className: "flex-1",
                    onClick: handleDeleteExecute,
                    "data-ocid": "livestock.delete_dialog.confirm_button",
                    children: language === "sw" ? "Futa" : "Delete"
                  }
                )
              ] })
            ]
          }
        )
      }
    )
  ] });
}
export {
  LivestockDashboard as default
};
