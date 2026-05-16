import { k as createLucideIcon, a as useLanguageStore, r as reactExports, j as jsxRuntimeExports, I as Input, l as Textarea, X, B as Button, m as Badge, b as useNavigate, n as Skeleton, P as Package, M as MessageCircle, u as useAuthStore, d as useNotificationStore, g as getWeatherForLocation, o as CROP_LISTINGS, p as Sprout, T as TrendingUp, L as Layout, c as Camera, q as Microscope, s as Leaf, A as AI_DIAGNOSES, F as FARM_RECORDS, i as MARKET_PRICES, t as BookOpen, v as MapPinned, w as ChartNoAxesColumn, x as FileText, W as Wallet } from "./index-BUVIgngH.js";
import { g as generateFarmerReminders, a as generatePredictiveReminders, b as getFarmerSuggestedQuestions, A as ArrowRight, P as PredictiveReminderCards, c as AIAdvisorWidget, U as UpcomingTasksWidget, R as Radio, d as generateFarmerResponse } from "./UpcomingTasksWidget-fR615UnW.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-Coi4Z4Fu.js";
import { L as Label } from "./label-BTY_QCm0.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C7D5N9Bz.js";
import { I as ImagePlus } from "./image-plus-Bmg-yBgt.js";
import { F as ForecastCard } from "./ForecastCard-Co0q0dcV.js";
import { I as IrrigationRecommendationCard } from "./IrrigationRecommendationCard-DpUhm_fZ.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-Cumv3Uzu.js";
import { P as Plus } from "./plus-DMsGFanj.js";
import { P as Pen } from "./pen-D11l_exL.js";
import { C as CirclePause, a as CirclePlay } from "./circle-play-BucC6o4u.js";
import { T as Trash2 } from "./trash-2-BRLnMANv.js";
import { A as AlertBanner } from "./AlertBanner-gHy4kgBH.js";
import { M as MarketPriceCard } from "./MarketPriceCard-BEDWrgkq.js";
import { S as SearchBar } from "./SearchBar-B1PvrUkg.js";
import { S as StatCard } from "./StatCard-vQlqcd7B.js";
import { W as WeatherWidget } from "./WeatherWidget-BNJSz6vI.js";
import { u as ue } from "./index-c308oYmR.js";
import { D as Droplets } from "./droplets-Wf5xpwFg.js";
import { T as TriangleAlert } from "./triangle-alert-CqH2Gyzq.js";
import { S as ShoppingBasket } from "./shopping-basket-8nt8_ggH.js";
import { B as Briefcase } from "./briefcase-WOQc6aU0.js";
import { S as Shield } from "./shield-tHD7Q_gt.js";
import { G as Gavel } from "./gavel-CIxzjL7N.js";
import { S as Satellite } from "./satellite-DpdL2XDS.js";
import "./sparkles-CaU8FUVB.js";
import "./lightbulb-BbCrq2Ko.js";
import "./chevron-up-CnJPygwE.js";
import "./send-B_LO1ymC.js";
import "./calendarTypes-ZI3l1TGg.js";
import "./refresh-cw-BNbremAW.js";
import "./index-BpD0H2hM.js";
import "./index-BoFiBQpD.js";
import "./Combination-D9wAFE8R.js";
import "./index-D6ql0bBU.js";
import "./index-Cg_2nNnI.js";
import "./index-ob0xpmgs.js";
import "./index-Oh98DbrD.js";
import "./check-Byk4lD13.js";
import "./BarChart-CLPOFkNj.js";
import "./calendar-DegZ54HI.js";
import "./bell-off-81ci_3rP.js";
import "./trending-down-B-P0A2rN.js";
import "./minus-BAwtOhGD.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode);
const CROP_OPTIONS = [
  { value: "Maize", labelEn: "Maize", labelSw: "Mahindi" },
  { value: "Beans", labelEn: "Beans", labelSw: "Maharagwe" },
  { value: "Groundnuts", labelEn: "Groundnuts", labelSw: "Karanga" },
  { value: "Sorghum", labelEn: "Sorghum", labelSw: "Mtama" },
  { value: "Cassava", labelEn: "Cassava", labelSw: "Muhogo" },
  { value: "Sweet Potato", labelEn: "Sweet Potato", labelSw: "Viazi vitamu" },
  { value: "Rice", labelEn: "Rice", labelSw: "Mchele" },
  { value: "Sunflower", labelEn: "Sunflower", labelSw: "Alizeti" },
  { value: "Other", labelEn: "Other", labelSw: "Nyingine" }
];
const UNIT_OPTIONS = [
  { value: "kg", label: "kg" },
  { value: "bags", label: "bags" },
  { value: "tonnes", label: "tonnes" }
];
const QUALITY_OPTIONS = [
  { value: "excellent", labelEn: "Excellent", labelSw: "Bora Sana" },
  { value: "good", labelEn: "Good", labelSw: "Nzuri" },
  { value: "fair", labelEn: "Fair", labelSw: "Ya Kawaida" }
];
const empty = {
  cropType: "",
  quantity: 0,
  unit: "kg",
  pricePerUnit: 0,
  location: "",
  quality: "good",
  description: "",
  imagePreview: void 0
};
function AddProductModal({
  open,
  onClose,
  onSubmit,
  editListing
}) {
  const { language } = useLanguageStore();
  const isEdit = !!editListing;
  const [form, setForm] = reactExports.useState(
    () => editListing ? {
      cropType: editListing.cropType,
      quantity: editListing.quantity,
      unit: editListing.unit,
      pricePerUnit: editListing.pricePerUnit,
      location: editListing.location,
      quality: editListing.quality,
      description: editListing.description ?? "",
      imagePreview: editListing.imageUrl
    } : { ...empty }
  );
  const [errors, setErrors] = reactExports.useState({});
  const [submitting, setSubmitting] = reactExports.useState(false);
  const fileRef = reactExports.useRef(null);
  const lbl = (en, sw) => language === "sw" ? sw : en;
  function set(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: void 0 }));
  }
  function handleFile(e) {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setForm((prev) => {
        var _a2;
        return {
          ...prev,
          imagePreview: (_a2 = ev.target) == null ? void 0 : _a2.result
        };
      });
    };
    reader.readAsDataURL(file);
  }
  function validate() {
    const e = {};
    if (!form.cropType)
      e.cropType = lbl("Select a crop type", "Chagua aina ya zao");
    if (!form.quantity || form.quantity <= 0)
      e.quantity = lbl("Enter a valid quantity", "Ingiza kiasi halisi");
    if (!form.pricePerUnit || form.pricePerUnit <= 0)
      e.pricePerUnit = lbl("Enter a valid price", "Ingiza bei halisi");
    if (!form.location.trim())
      e.location = lbl("Enter a location", "Ingiza mahali");
    setErrors(e);
    return Object.keys(e).length === 0;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await onSubmit(form);
      setForm({ ...empty });
      setErrors({});
    } finally {
      setSubmitting(false);
    }
  }
  function handleClose() {
    setForm(
      editListing ? {
        cropType: editListing.cropType,
        quantity: editListing.quantity,
        unit: editListing.unit,
        pricePerUnit: editListing.pricePerUnit,
        location: editListing.location,
        quality: editListing.quality,
        description: editListing.description ?? "",
        imagePreview: editListing.imageUrl
      } : { ...empty }
    );
    setErrors({});
    onClose();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && handleClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-md max-h-[90dvh] overflow-y-auto",
      "data-ocid": "farmer.add_product_modal",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-base font-display", children: isEdit ? lbl("Edit Listing", "Hariri Orodha") : lbl("Add Product for Sale", "Ongeza Bidhaa ya Kuuza") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs font-medium", children: [
              lbl("Crop Type", "Aina ya Zao"),
              " *"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.cropType,
                onValueChange: (v) => set("cropType", v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      "data-ocid": "farmer.product_crop_select",
                      className: errors.cropType ? "border-destructive" : "",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: lbl("Select crop", "Chagua zao") })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CROP_OPTIONS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.value, children: language === "sw" ? c.labelSw : c.labelEn }, c.value)) })
                ]
              }
            ),
            errors.cropType && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs text-destructive",
                "data-ocid": "farmer.product_crop_select.field_error",
                children: errors.cropType
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs font-medium", children: [
                lbl("Quantity", "Kiasi"),
                " *"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  min: 1,
                  value: form.quantity || "",
                  onChange: (e) => set("quantity", Number(e.target.value)),
                  placeholder: "e.g. 500",
                  "data-ocid": "farmer.product_quantity_input",
                  className: errors.quantity ? "border-destructive" : ""
                }
              ),
              errors.quantity && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-destructive",
                  "data-ocid": "farmer.product_quantity_input.field_error",
                  children: errors.quantity
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-medium", children: lbl("Unit", "Kipimo") }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.unit, onValueChange: (v) => set("unit", v), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "farmer.product_unit_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: UNIT_OPTIONS.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: u.value, children: u.label }, u.value)) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs font-medium", children: [
              lbl("Price per Unit (TSh)", "Bei kwa Kipimo (TSh)"),
              " *"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                min: 1,
                value: form.pricePerUnit || "",
                onChange: (e) => set("pricePerUnit", Number(e.target.value)),
                placeholder: "e.g. 950",
                "data-ocid": "farmer.product_price_input",
                className: errors.pricePerUnit ? "border-destructive" : ""
              }
            ),
            errors.pricePerUnit && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs text-destructive",
                "data-ocid": "farmer.product_price_input.field_error",
                children: errors.pricePerUnit
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs font-medium", children: [
              lbl("Location", "Mahali"),
              " *"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.location,
                onChange: (e) => set("location", e.target.value),
                placeholder: lbl("e.g. Mbeya Town", "k.m. Mji wa Mbeya"),
                "data-ocid": "farmer.product_location_input",
                className: errors.location ? "border-destructive" : ""
              }
            ),
            errors.location && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs text-destructive",
                "data-ocid": "farmer.product_location_input.field_error",
                children: errors.location
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-medium", children: lbl("Quality / Condition", "Hali ya Ubora") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.quality,
                onValueChange: (v) => set("quality", v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "farmer.product_quality_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: QUALITY_OPTIONS.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: q.value, children: language === "sw" ? q.labelSw : q.labelEn }, q.value)) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-medium", children: lbl(
              "Description (health / quality details)",
              "Maelezo (hali ya afya / ubora)"
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                rows: 3,
                value: form.description,
                onChange: (e) => set("description", e.target.value),
                placeholder: lbl(
                  "e.g. Freshly harvested, well dried, no pests...",
                  "k.m. Imevunwa hivi karibuni, imekaushwa vizuri..."
                ),
                "data-ocid": "farmer.product_description_textarea"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-medium", children: lbl("Product Image", "Picha ya Bidhaa") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: fileRef,
                type: "file",
                accept: "image/*",
                className: "hidden",
                onChange: handleFile
              }
            ),
            form.imagePreview ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: form.imagePreview,
                  alt: "preview",
                  className: "w-full h-36 object-cover rounded-lg border border-border"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setForm((prev) => ({ ...prev, imagePreview: void 0 })),
                  className: "absolute top-1.5 right-1.5 bg-background/80 rounded-full p-0.5 text-muted-foreground hover:text-foreground",
                  "aria-label": "Remove image",
                  "data-ocid": "farmer.product_image_remove_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
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
                className: "w-full h-28 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors",
                "data-ocid": "farmer.product_image_upload_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "w-6 h-6" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: lbl("Tap to upload image", "Gusa ili kupakia picha") })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                className: "flex-1",
                onClick: handleClose,
                disabled: submitting,
                "data-ocid": "farmer.add_product_cancel_button",
                children: lbl("Cancel", "Ghairi")
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "submit",
                className: "flex-1 gap-1.5",
                disabled: submitting,
                "data-ocid": "farmer.add_product_submit_button",
                children: [
                  submitting && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                  isEdit ? lbl("Save Changes", "Hifadhi Mabadiliko") : lbl("List Product", "Orodhesha Bidhaa")
                ]
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
function QualityBadge({
  quality,
  lang
}) {
  const map = {
    excellent: {
      en: "Excellent",
      sw: "Bora Sana",
      cls: "bg-accent/15 text-accent border-accent/30"
    },
    good: {
      en: "Good",
      sw: "Nzuri",
      cls: "bg-primary/15 text-primary border-primary/30"
    },
    fair: {
      en: "Fair",
      sw: "Ya Kawaida",
      cls: "bg-muted text-muted-foreground border-border"
    }
  };
  const q = map[quality] ?? map.fair;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: `text-[10px] px-1.5 py-0.5 ${q.cls}`, children: lang === "sw" ? q.sw : q.en });
}
function MyListingsSection({
  listings,
  loading,
  onAdd,
  onEdit,
  onPauseResume,
  onDelete
}) {
  const { language } = useLanguageStore();
  const navigate = useNavigate();
  const lbl = (en, sw) => language === "sw" ? sw : en;
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "farmer.my_listings_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { onAdd, lbl }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-xl" }, i)) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "farmer.my_listings_section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { onAdd, lbl, count: listings.length }),
    listings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-dashed border-border rounded-xl p-8 flex flex-col items-center gap-3 text-center",
        "data-ocid": "farmer.my_listings_empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-10 h-10 text-muted-foreground/50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: lbl("No listings yet", "Hakuna orodha bado") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: lbl(
              "Add your first product to start selling in the marketplace",
              "Ongeza bidhaa yako ya kwanza kuanza kuuza sokoni"
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              onClick: onAdd,
              className: "gap-1.5",
              "data-ocid": "farmer.my_listings_add_first_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
                lbl("Add Product", "Ongeza Bidhaa")
              ]
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: listings.map((listing, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      ListingCard,
      {
        listing,
        index: i + 1,
        lang: language,
        lbl,
        onEdit: () => onEdit(listing),
        onPauseResume: () => onPauseResume(listing),
        onDeleteRequest: () => setDeleteTarget(listing.id),
        onInquiryClick: () => navigate({
          to: "/messages",
          search: { recipientId: void 0 }
        })
      },
      listing.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: !!deleteTarget,
        onOpenChange: (v) => !v && setDeleteTarget(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "farmer.delete_listing_dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: lbl("Remove Listing?", "Futa Orodha?") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: lbl(
              "This listing will be permanently removed from the marketplace.",
              "Orodha hii itafutwa kabisa kutoka sokoni."
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "farmer.delete_listing_cancel_button", children: lbl("Cancel", "Ghairi") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                "data-ocid": "farmer.delete_listing_confirm_button",
                onClick: () => {
                  if (deleteTarget) onDelete(deleteTarget);
                  setDeleteTarget(null);
                },
                children: lbl("Delete", "Futa")
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
function SectionHeader({
  onAdd,
  lbl,
  count
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-semibold text-foreground flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4 text-primary" }),
      lbl("My Listings", "Orodha Zangu"),
      count !== void 0 && count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-medium", children: count })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        size: "sm",
        className: "gap-1 h-7 text-xs px-2.5",
        onClick: onAdd,
        "data-ocid": "farmer.add_product_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
          lbl("Sell Product", "Uza Bidhaa")
        ]
      }
    )
  ] });
}
function ListingCard({
  listing,
  index,
  lang,
  lbl,
  onEdit,
  onPauseResume,
  onDeleteRequest,
  onInquiryClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "bg-card border border-border rounded-xl overflow-hidden",
      "data-ocid": `farmer.listing.item.${index}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-24 h-24 flex-shrink-0 relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: listing.imageUrl ?? "/assets/generated/hero-agriculture.dim_800x500.jpg",
              alt: listing.cropType,
              className: "w-full h-full object-cover"
            }
          ),
          !listing.isActive && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/60 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-semibold text-muted-foreground uppercase tracking-wide", children: lbl("Paused", "Imesimamishwa") }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2.5 flex-1 min-w-0 flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground truncate", children: listing.cropType }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
                listing.quantity,
                " ",
                listing.unit,
                " · TSh",
                " ",
                listing.pricePerUnit.toLocaleString(),
                "/",
                lbl("unit", "kipimo")
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground truncate", children: [
                "📍 ",
                listing.location
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-1 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: `text-[10px] px-1.5 py-0.5 ${listing.isActive ? "bg-accent/15 text-accent border-accent/30" : "bg-muted text-muted-foreground border-border"}`,
                  children: listing.isActive ? lbl("Active", "Inatumika") : lbl("Paused", "Imesimamishwa")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(QualityBadge, { quality: listing.quality, lang })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-auto pt-1", children: [
            listing.inquiryCount > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: onInquiryClick,
                className: "flex items-center gap-1 text-[10px] text-primary hover:underline font-medium",
                "data-ocid": `farmer.listing.inquiries.${index}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-3 h-3" }),
                  listing.inquiryCount,
                  " ",
                  lbl("inquiries", "maswali")
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: lbl("0 inquiries", "0 maswali") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onEdit,
                  className: "p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors",
                  "aria-label": "Edit listing",
                  "data-ocid": `farmer.listing.edit_button.${index}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onPauseResume,
                  className: `p-1.5 rounded-lg transition-colors ${listing.isActive ? "hover:bg-amber-100 text-muted-foreground hover:text-amber-700" : "hover:bg-accent/10 text-muted-foreground hover:text-accent"}`,
                  "aria-label": listing.isActive ? "Pause listing" : "Resume listing",
                  "data-ocid": `farmer.listing.pause_button.${index}`,
                  children: listing.isActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePause, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "w-3.5 h-3.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onDeleteRequest,
                  className: "p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors",
                  "aria-label": "Delete listing",
                  "data-ocid": `farmer.listing.delete_button.${index}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                }
              )
            ] })
          ] })
        ] })
      ] })
    }
  );
}
function FarmerDashboard() {
  const { user } = useAuthStore();
  const { t, language } = useLanguageStore();
  const { notifications } = useNotificationStore();
  const weather = getWeatherForLocation((user == null ? void 0 : user.location) ?? "Mbeya");
  const criticalAlerts = notifications.filter(
    (n) => n.priority === "critical" && !n.read
  );
  const navigate = useNavigate();
  const cropTypes = (user == null ? void 0 : user.cropTypes) ?? ["Maize", "Beans"];
  const userLocation = (user == null ? void 0 : user.location) ?? "Mbeya";
  const month = (/* @__PURE__ */ new Date()).getMonth();
  const simulatedSeason = month >= 9 || month <= 1 ? "planting" : month >= 2 && month <= 4 ? "growing" : month >= 5 && month <= 6 ? "harvesting" : "dry";
  const simulatedWeather = month >= 9 || month <= 4 ? "rainy" : month >= 5 && month <= 7 ? "dry" : "sunny";
  const farmerContext = {
    role: "farmer",
    location: userLocation,
    cropTypes,
    farmSize: user == null ? void 0 : user.farmSize,
    weatherCondition: simulatedWeather,
    season: simulatedSeason
  };
  const farmerReminders = generateFarmerReminders(farmerContext, language);
  const farmerPredictiveReminders = generatePredictiveReminders(
    farmerContext,
    language
  );
  const farmerSuggestedQuestions = getFarmerSuggestedQuestions(
    farmerContext,
    language
  );
  const [myListings, setMyListings] = reactExports.useState(
    () => CROP_LISTINGS.filter((l) => l.farmerId === ((user == null ? void 0 : user.id) ?? "u1")).map((l) => ({
      ...l,
      isActive: true,
      inquiryCount: Math.floor(Math.random() * 4)
    }))
  );
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [editTarget, setEditTarget] = reactExports.useState(null);
  const lbl = (en, sw) => language === "sw" ? sw : en;
  async function handleAddSubmit(data) {
    const newListing = {
      id: `cl_${Date.now()}`,
      farmerId: (user == null ? void 0 : user.id) ?? "u1",
      farmerName: (user == null ? void 0 : user.name) ?? "Farmer",
      cropType: data.cropType,
      quantity: data.quantity,
      unit: data.unit,
      pricePerUnit: data.pricePerUnit,
      location: data.location,
      quality: data.quality,
      availableFrom: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      imageUrl: data.imagePreview,
      description: data.description,
      isActive: true,
      inquiryCount: 0
    };
    setMyListings((prev) => [newListing, ...prev]);
    setModalOpen(false);
    ue.success(lbl("Product listed successfully!", "Bidhaa imeorodheshwa!"));
  }
  async function handleEditSubmit(data) {
    if (!editTarget) return;
    setMyListings(
      (prev) => prev.map(
        (l) => l.id === editTarget.id ? {
          ...l,
          cropType: data.cropType,
          quantity: data.quantity,
          unit: data.unit,
          pricePerUnit: data.pricePerUnit,
          location: data.location,
          quality: data.quality,
          description: data.description,
          imageUrl: data.imagePreview ?? l.imageUrl
        } : l
      )
    );
    setEditTarget(null);
    ue.success(lbl("Listing updated!", "Orodha imesasishwa!"));
  }
  function handlePauseResume(listing) {
    setMyListings(
      (prev) => prev.map(
        (l) => l.id === listing.id ? { ...l, isActive: !l.isActive } : l
      )
    );
    ue(
      listing.isActive ? lbl("Listing paused", "Orodha imesimamishwa") : lbl("Listing resumed", "Orodha imeendelea")
    );
  }
  function handleDelete(id) {
    setMyListings((prev) => prev.filter((l) => l.id !== id));
    ue.success(lbl("Listing removed", "Orodha imefutwa"));
  }
  const FARMER_TIPS = [
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sprout, { className: "w-3.5 h-3.5 text-primary" }),
      title: language === "sw" ? "Wakati wa Kupanda" : "Planting Window",
      advice: language === "sw" ? `Mvua inatarajiwa wiki ijayo huko ${userLocation}. Panda ${cropTypes[0]} mapema.` : `Rain expected next week in ${userLocation}. Plant ${cropTypes[0]} now for best yields.`
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { className: "w-3.5 h-3.5 text-blue-500" }),
      title: language === "sw" ? "Afya ya Udongo" : "Soil Health Tip",
      advice: language === "sw" ? `Weka mbolea ya DAP (50kg/ekari) kabla ya mvua ili kuboresha mavuno ya ${cropTypes[0]}.` : `Apply DAP fertilizer (50kg/acre) before rain to boost ${cropTypes[0]} yield by up to 30%.`
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3.5 h-3.5 text-accent" }),
      title: language === "sw" ? "Bei ya Soko" : "Market Alert",
      advice: language === "sw" ? "Bei ya mahindi inapanda huko Dar es Salaam — fikiria kuuza baada ya wiki mbili." : "Maize prices rising in Dar es Salaam — consider selling in 2 weeks for 15% premium."
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5 text-amber-500" }),
      title: language === "sw" ? "Tahadhari ya Wadudu" : "Pest Warning",
      advice: language === "sw" ? "Msimu huu una hatari ya viwavi. Kagua mashamba yako kila siku na uwasiliane na mtaalamu." : "Fall armyworm risk is elevated this season. Scout fields daily and contact a specialist early."
    }
  ];
  const getFarmerResponse = (q, history) => {
    const lowerQ = q.toLowerCase();
    const isReminderQuery = /(reminder|kumbusho|show|nionyeshe|weather advice|ushauri wa hewa|upcoming|kazi zijazo)/.test(
      lowerQ
    );
    if (isReminderQuery && farmerPredictiveReminders.length > 0) {
      const topReminders = farmerPredictiveReminders.filter((r) => r.urgency === "high").slice(0, 2);
      if (topReminders.length > 0) {
        const base = generateFarmerResponse(
          q,
          history,
          farmerContext,
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
    return generateFarmerResponse(q, history, farmerContext, language);
  };
  const ACTIONS = [
    {
      icon: Camera,
      label: language === "sw" ? "Gundua Ugonjwa" : "Detect Disease",
      color: "bg-destructive/10 text-destructive",
      onClick: () => navigate({ to: "/diagnosis" })
    },
    {
      icon: ShoppingBasket,
      label: language === "sw" ? "Soko la Kilimo" : "Marketplace",
      color: "bg-accent/10 text-accent",
      onClick: () => navigate({ to: "/marketplace" })
    },
    {
      icon: MessageCircle,
      label: language === "sw" ? "Ujumbe" : "Messages",
      color: "bg-primary/10 text-primary",
      onClick: () => navigate({ to: "/messages", search: { recipientId: void 0 } })
    },
    {
      icon: Microscope,
      label: language === "sw" ? "Uchunguzi wa Udongo" : "Soil Analysis",
      color: "bg-amber-100 text-amber-700",
      onClick: () => navigate({ to: "/dashboard/weather-soil" })
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-4 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-xl overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "/assets/generated/farmer-dashboard.dim_800x400.jpg",
          alt: "Farm",
          className: "w-full h-32 object-cover"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-display font-bold text-white", children: language === "sw" ? "Dashibodi ya Mkulima" : "Farmer Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-white/80", children: [
          user == null ? void 0 : user.name,
          " · ",
          user == null ? void 0 : user.location
        ] })
      ] }) })
    ] }),
    criticalAlerts.slice(0, 1).map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(AlertBanner, { message: n.body, priority: "critical" }, n.id)),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SearchBar, { placeholder: t("searchPlaceholder") }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          title: t("cropsGrowing"),
          value: "3",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sprout, { className: "w-4 h-4" }),
          colorClass: "bg-green-50 text-green-600"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          title: t("farmArea"),
          value: "7.5 ac",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "🌾" }),
          colorClass: "bg-amber-50 text-amber-600"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          title: t("activeAlerts"),
          value: String(criticalAlerts.length),
          trend: criticalAlerts.length > 0 ? "up" : "stable",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "⚠️" }),
          colorClass: "bg-destructive/10 text-destructive"
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
          "data-ocid": `farmer.action_${label.toLowerCase().replace(/\s+/g, "_")}`,
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "farmer.ai_diagnosis_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-semibold text-foreground flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-4 h-4 text-primary" }),
          language === "sw" ? "Uchunguzi wa Mazao wa AI" : "AI Crop Diagnosis"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => navigate({ to: "/diagnosis" }),
            className: "text-xs text-primary font-medium hover:underline flex items-center gap-0.5",
            "data-ocid": "farmer.diagnosis_view_all_button",
            children: [
              language === "sw" ? "Ona Zaidi" : "View All",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [AI_DIAGNOSES.crop_blight].map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": `farmer.recent_diagnosis.${i + 1}`,
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
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-[10px] px-2 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/30 font-medium shrink-0", children: language === "sw" ? "Imethibitishwa" : "Confirmed" })
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
            "data-ocid": "farmer.new_diagnosis_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-4 h-4" }),
              language === "sw" ? "Uchunguzi Mpya" : "New Diagnosis"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PredictiveReminderCards, { userProfile: farmerContext, type: "farmer" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "farmer.irrigation_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-semibold text-foreground flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { className: "w-4 h-4 text-cyan-600" }),
          language === "sw" ? "Umwagiliaji Mahiri" : "Smart Irrigation"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => navigate({ to: "/irrigation" }),
            className: "text-xs text-cyan-700 font-medium hover:underline flex items-center gap-0.5",
            "data-ocid": "farmer.irrigation_view_all_button",
            children: [
              language === "sw" ? "Angalia Zaidi" : "Full Schedule",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        IrrigationRecommendationCard,
        {
          recommendation: {
            id: "dash_irr_01",
            userId: (user == null ? void 0 : user.id) ?? "u1",
            cropType: cropTypes[0] ?? "Maize",
            region: userLocation,
            schedule: {
              frequencyPerWeek: 3,
              durationMinutes: 45,
              bestTimeOfDay: "early_morning"
            },
            reasoning: language === "sw" ? `Joto kali linatarajiwa ${userLocation} — mwagilia ${cropTypes[0] ?? "mahindi"} mara 3/wiki kwa siku 10 zijazo.` : `High heat forecast in ${userLocation} — water ${cropTypes[0] ?? "maize"} 3×/week for next 10 days.`,
            estimatedWaterSavingPercent: 28,
            yieldImpactPercent: 19,
            basedOn: {
              soilMoisture: simulatedWeather === "dry" ? "low" : "moderate",
              weatherForecast: simulatedWeather === "dry" ? "dry" : "moderate",
              seasonalCondition: simulatedSeason === "dry" ? "dry" : simulatedSeason === "planting" ? "planting" : "growing"
            },
            createdAt: (/* @__PURE__ */ new Date()).toISOString(),
            validUntil: new Date(
              Date.now() + 10 * 24 * 60 * 60 * 1e3
            ).toISOString(),
            hasSetReminder: false
          },
          compact: true
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "farmer.forecast_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-semibold text-foreground flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-primary" }),
          language === "sw" ? "Utabiri wa Mavuno" : "Harvest Forecast"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => navigate({ to: "/forecasting" }),
            className: "text-xs text-primary font-medium hover:underline flex items-center gap-0.5",
            "data-ocid": "farmer.forecast_see_all_button",
            children: [
              language === "sw" ? "Ona Zaidi" : "See all forecasts",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ForecastCard,
        {
          forecast: {
            id: "farmer_dash_fc",
            userId: (user == null ? void 0 : user.id) ?? "u1",
            forecastType: "crop_yield",
            title: language === "sw" ? `Mavuno ya ${cropTypes[0]} — ${userLocation}` : `${cropTypes[0]} Yield — ${userLocation}`,
            predictedValue: 3.2,
            unit: "tons",
            confidenceScore: 85,
            keyDrivers: language === "sw" ? ["Mvua nzuri", "Mbolea DAP", "Kupanda mapema"] : ["Good rainfall", "DAP fertilizer", "Early planting"],
            monthlyBreakdown: [
              { month: "Jan", value: 0 },
              { month: "Feb", value: 0.1 },
              { month: "Mar", value: 0.4 },
              { month: "Apr", value: 0.9 },
              { month: "May", value: 1.2 },
              { month: "Jun", value: 0.6 }
            ],
            sensitivityNote: language === "sw" ? "Kupungua kwa mvua mwezi wa Machi-Aprili kunaweza kupunguza mavuno kwa hadi 18%." : "A 10% rainfall drop in March–April could reduce yield by up to 18%. Consider irrigation as backup.",
            basedOn: {
              weatherScore: 88,
              soilScore: 82,
              feedingScore: 70,
              historyScore: 91
            },
            createdAt: (/* @__PURE__ */ new Date()).toISOString(),
            validUntil: new Date(
              Date.now() + 60 * 24 * 3600 * 1e3
            ).toISOString()
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AIAdvisorWidget,
      {
        userName: (user == null ? void 0 : user.name) ?? "Farmer",
        tips: FARMER_TIPS,
        reminders: farmerReminders,
        getMockResponse: getFarmerResponse,
        widgetId: "farmer",
        userContext: farmerContext,
        suggestedQuestions: farmerSuggestedQuestions
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WeatherWidget, { data: weather, lang: language }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(UpcomingTasksWidget, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground mb-2", children: t("myFarm") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-3", children: FARM_RECORDS.map((farm, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": `farmer.farm.${i + 1}`,
          className: "bg-card border border-border rounded-xl overflow-hidden flex gap-0",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: farm.imageUrl,
                alt: farm.name,
                className: "w-24 h-24 object-cover flex-shrink-0"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground truncate", children: farm.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                farm.location,
                " · ",
                farm.size,
                " ",
                farm.sizeUnit
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 mt-2", children: farm.crops.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full",
                  children: c
                },
                c
              )) })
            ] })
          ]
        },
        farm.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground mb-2", children: t("marketPrices") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: MARKET_PRICES.filter((p) => p.category === "crop").slice(0, 3).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(MarketPriceCard, { price: p, lang: language }, p.commodity)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      MyListingsSection,
      {
        listings: myListings,
        onAdd: () => setModalOpen(true),
        onEdit: (listing) => setEditTarget(listing),
        onPauseResume: handlePauseResume,
        onDelete: handleDelete
      }
    ),
    (() => {
      const LOW_STOCK_ITEMS = [
        {
          name: language === "sw" ? "Mbegu za Mahindi" : "Maize Seeds",
          current: 2,
          unit: "bags"
        },
        {
          name: language === "sw" ? "Mbolea DAP" : "DAP Fertilizer",
          current: 1,
          unit: "bags"
        }
      ];
      const lowItems = LOW_STOCK_ITEMS.filter((i) => i.current <= 2);
      if (lowItems.length === 0) return null;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "farmer.inventory_alert",
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
                "data-ocid": "farmer.inventory_alert.view_button",
                children: language === "sw" ? "Angalia" : "View"
              }
            )
          ]
        }
      );
    })(),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "farmer.quick_access_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground mb-2", children: language === "sw" ? "Ufikiaji wa Haraka" : "Quick Access" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: [
        {
          icon: BookOpen,
          label: language === "sw" ? "Rekodi" : "Records",
          sub: language === "sw" ? "Historia ya shamba" : "Farm history",
          color: "bg-primary/10 text-primary",
          to: "/records",
          ocid: "farmer.quick_access.records"
        },
        {
          icon: Package,
          label: language === "sw" ? "Hifadhi" : "Inventory",
          sub: language === "sw" ? "Dhibiti hisa" : "Manage stock",
          color: "bg-amber-100 text-amber-700",
          to: "/inventory",
          ocid: "farmer.quick_access.inventory"
        },
        {
          icon: MapPinned,
          label: language === "sw" ? "Ramani" : "Farm Map",
          sub: language === "sw" ? "Mipaka ya shamba" : "Field boundaries",
          color: "bg-green-50 text-green-600",
          to: "/farm-map",
          ocid: "farmer.quick_access.farm_map"
        },
        {
          icon: ChartNoAxesColumn,
          label: language === "sw" ? "Uchambuzi" : "Analytics",
          sub: language === "sw" ? "Ripoti na mwelekeo" : "Reports & trends",
          color: "bg-blue-50 text-blue-600",
          to: "/analytics",
          ocid: "farmer.quick_access.analytics"
        },
        {
          icon: FileText,
          label: language === "sw" ? "Mikataba" : "Contracts",
          sub: language === "sw" ? "Makubaliano salama" : "Secure agreements",
          color: "bg-purple-50 text-purple-600",
          to: "/contracts",
          ocid: "farmer.quick_access.contracts"
        },
        {
          icon: Wallet,
          label: language === "sw" ? "Mikopo" : "Loans",
          sub: language === "sw" ? "Maombi ya fedha" : "Financing",
          color: "bg-accent/10 text-accent",
          to: "/loans",
          ocid: "farmer.quick_access.loans"
        },
        {
          icon: Radio,
          label: language === "sw" ? "Ramani ya Mlipuko" : "Outbreak Map",
          sub: language === "sw" ? "Magonjwa na wadudu" : "Diseases & pests",
          color: "bg-red-50 text-red-600",
          to: "/outbreak-map",
          ocid: "farmer.quick_access.outbreak_map"
        },
        {
          icon: Gavel,
          label: language === "sw" ? "Minada" : "Auctions",
          sub: language === "sw" ? "Zabuni za moja kwa moja" : "Live bidding",
          color: "bg-amber-50 text-amber-600",
          to: "/auctions",
          ocid: "farmer.quick_access.auctions"
        },
        {
          icon: Satellite,
          label: language === "sw" ? "Uchambuzi wa Ndege" : "Drone Analysis",
          sub: language === "sw" ? "Picha za anga" : "Aerial imagery",
          color: "bg-indigo-50 text-indigo-600",
          to: "/drone-analysis",
          ocid: "farmer.quick_access.drone_analysis"
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
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddProductModal,
      {
        open: modalOpen,
        onClose: () => setModalOpen(false),
        onSubmit: handleAddSubmit
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddProductModal,
      {
        open: !!editTarget,
        onClose: () => setEditTarget(null),
        onSubmit: handleEditSubmit,
        editListing: editTarget
      }
    ),
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
  FarmerDashboard as default
};
