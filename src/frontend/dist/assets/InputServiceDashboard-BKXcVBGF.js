import { k as createLucideIcon, u as useAuthStore, a as useLanguageStore, Z as useBackend, r as reactExports, j as jsxRuntimeExports, L as Layout, T as TrendingUp, z as formatTSh, B as Button, m as Badge, M as MessageCircle, I as Input, l as Textarea, X, U as Upload, _ as SERVICE_LISTINGS } from "./index-BUVIgngH.js";
import { S as StatCard } from "./StatCard-vQlqcd7B.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-Cumv3Uzu.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-Coi4Z4Fu.js";
import { L as Label } from "./label-BTY_QCm0.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C7D5N9Bz.js";
import { u as ue } from "./index-c308oYmR.js";
import { W as Wrench } from "./wrench-BsBPj7OM.js";
import { C as Calendar } from "./calendar-DegZ54HI.js";
import { P as Plus } from "./plus-DMsGFanj.js";
import { P as Pen } from "./pen-D11l_exL.js";
import { P as Pause, a as Play } from "./play-CswM2M6J.js";
import { T as Trash2 } from "./trash-2-BRLnMANv.js";
import "./trending-down-B-P0A2rN.js";
import "./minus-BAwtOhGD.js";
import "./index-BpD0H2hM.js";
import "./index-BoFiBQpD.js";
import "./Combination-D9wAFE8R.js";
import "./index-D6ql0bBU.js";
import "./index-Cg_2nNnI.js";
import "./index-ob0xpmgs.js";
import "./index-Oh98DbrD.js";
import "./check-Byk4lD13.js";
import "./chevron-up-CnJPygwE.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.5", key: "1uzm8b" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const SquareCheckBig = createLucideIcon("square-check-big", __iconNode);
const INITIAL_BOOKINGS = [
  {
    id: "b1",
    client: "Juma Mwangi",
    service: "Tractor Plowing",
    scheduledDate: "2025-05-07",
    location: "Mbeya Rural, 3 acres",
    status: "confirmed",
    totalPrice: 135e3
  },
  {
    id: "b2",
    client: "Anna Sanga",
    service: "Pesticide Spraying",
    scheduledDate: "2025-05-08",
    location: "Singida, 5 acres",
    status: "pending",
    totalPrice: 125e3,
    notes: "Client needs herbicide spraying too"
  },
  {
    id: "b3",
    client: "David Mushi",
    service: "Tractor Plowing",
    scheduledDate: "2025-05-10",
    location: "Dodoma, 2 acres",
    status: "pending",
    totalPrice: 9e4
  },
  {
    id: "b4",
    client: "Grace Kimaro",
    service: "Irrigation Setup",
    scheduledDate: "2025-05-12",
    location: "Arusha, 4 acres",
    status: "confirmed",
    totalPrice: 32e4
  }
];
const EMPTY_FORM = {
  name: "",
  serviceType: "",
  description: "",
  priceMin: "",
  priceMax: "",
  priceUnit: "",
  availability: "",
  coverageArea: "",
  equipmentDetails: "",
  imagePreview: null
};
const SERVICE_TYPE_LABELS = {
  plowing: { en: "Land Preparation / Plowing", sw: "Kulima kwa Trekta" },
  spraying: { en: "Spraying / Pest Control", sw: "Kunyunyizia Dawa" },
  irrigation: { en: "Irrigation", sw: "Umwagiliaji" },
  harvesting: { en: "Harvesting", sw: "Kuvuna" },
  transport: { en: "Transport", sw: "Usafiri" },
  machinery_rental: { en: "Machinery Rental", sw: "Kukodisha Mashine" },
  other: { en: "Other", sw: "Nyingine" }
};
const PRICE_UNIT_LABELS = {
  per_acre: { en: "Per Acre", sw: "Kwa Ekari" },
  per_hour: { en: "Per Hour", sw: "Kwa Saa" },
  per_day: { en: "Per Day", sw: "Kwa Siku" },
  per_trip: { en: "Per Trip", sw: "Kwa Safari" },
  negotiable: { en: "Negotiable", sw: "Jadiliana" }
};
const SERVICE_COLORS = {
  plowing: "bg-amber-50 text-amber-700",
  spraying: "bg-green-50 text-green-700",
  irrigation: "bg-blue-50 text-blue-700",
  harvesting: "bg-orange-50 text-orange-700",
  transport: "bg-purple-50 text-purple-700",
  machinery_rental: "bg-teal-50 text-teal-700",
  other: "bg-muted text-muted-foreground"
};
const STATUS_COLORS = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  confirmed: "bg-green-50 text-green-700 border-green-200",
  completed: "bg-muted text-muted-foreground border-border",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20"
};
function initListings() {
  return SERVICE_LISTINGS.slice(0, 3).map((s, i) => ({
    ...s,
    isActive: true,
    bookingCount: [4, 7, 2][i] ?? 0,
    priceMin: s.price * 0.9,
    priceMax: s.price * 1.1
  }));
}
function InputServiceDashboard() {
  const { user } = useAuthStore();
  const { language } = useLanguageStore();
  const { actor } = useBackend();
  const [listings, setListings] = reactExports.useState(initListings);
  const [bookings, setBookings] = reactExports.useState(INITIAL_BOOKINGS);
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [editTarget, setEditTarget] = reactExports.useState(null);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const [formErrors, setFormErrors] = reactExports.useState({});
  const fileInputRef = reactExports.useRef(null);
  const lang = language;
  const sw = lang === "sw";
  const activeCount = listings.filter((l) => l.isActive).length;
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter((b) => b.status === "pending").length;
  const completedEarnings = bookings.filter((b) => b.status === "completed").reduce((s, b) => s + b.totalPrice, 0);
  function openAddModal() {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setFormErrors({});
    setModalOpen(true);
  }
  function openEditModal(listing) {
    setEditTarget(listing);
    setForm({
      name: listing.title,
      serviceType: listing.serviceType ?? "",
      description: listing.description,
      priceMin: String(listing.priceMin ?? listing.price),
      priceMax: String(listing.priceMax ?? listing.price),
      priceUnit: listing.priceUnit.replace("per_", "") === listing.priceUnit ? listing.priceUnit : listing.priceUnit,
      availability: listing.availability,
      coverageArea: listing.location,
      equipmentDetails: "",
      imagePreview: listing.imageUrl ?? null
    });
    setFormErrors({});
    setModalOpen(true);
  }
  function handleImageChange(e) {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setForm((f) => {
        var _a2;
        return { ...f, imagePreview: (_a2 = ev.target) == null ? void 0 : _a2.result };
      });
    };
    reader.readAsDataURL(file);
  }
  function validate() {
    const errors = {};
    if (!form.name.trim())
      errors.name = sw ? "Jina linahitajika" : "Name is required";
    if (!form.serviceType)
      errors.serviceType = sw ? "Chagua aina ya huduma" : "Select a service type";
    if (!form.description.trim())
      errors.description = sw ? "Maelezo yanahitajika" : "Description is required";
    if (!form.priceMin || Number(form.priceMin) <= 0)
      errors.priceMin = sw ? "Bei ya chini inahitajika" : "Minimum price is required";
    if (!form.priceMax || Number(form.priceMax) <= 0)
      errors.priceMax = sw ? "Bei ya juu inahitajika" : "Maximum price is required";
    if (!form.priceUnit)
      errors.priceUnit = sw ? "Chagua kitengo" : "Select a price unit";
    if (!form.availability.trim())
      errors.availability = sw ? "Upatikanaji unahitajika" : "Availability is required";
    if (!form.coverageArea.trim())
      errors.coverageArea = sw ? "Eneo linahitajika" : "Coverage area is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const areas = form.coverageArea.split(",").map((s) => s.trim()).filter(Boolean);
      const equipment = form.equipmentDetails.split(",").map((s) => s.trim()).filter(Boolean);
      const priceMin = Number(form.priceMin);
      const priceMax = Number(form.priceMax);
      let newListing;
      if (editTarget) {
        if (actor) {
          await actor.updateServiceListing(
            BigInt(editTarget.id.replace(/\D/g, "") || 0),
            form.description,
            priceMin,
            priceMax,
            areas,
            equipment
          );
        }
        setListings(
          (prev) => prev.map(
            (l) => l.id === editTarget.id ? {
              ...l,
              title: form.name,
              serviceType: form.serviceType,
              description: form.description,
              price: priceMin,
              priceMin,
              priceMax,
              priceUnit: form.priceUnit,
              availability: form.availability,
              location: areas[0] ?? l.location,
              imageUrl: form.imagePreview ?? l.imageUrl
            } : l
          )
        );
        ue.success(
          sw ? "Huduma imesasishwa" : "Service updated successfully"
        );
      } else {
        if (actor) {
          await actor.addServiceListing(
            form.serviceType,
            form.description,
            priceMin,
            priceMax,
            areas,
            equipment
          );
        }
        newListing = {
          id: `sl${Date.now()}`,
          providerId: (user == null ? void 0 : user.id) ?? "u6",
          providerName: (user == null ? void 0 : user.businessName) ?? (user == null ? void 0 : user.name) ?? "My Service",
          serviceType: form.serviceType,
          title: form.name,
          price: priceMin,
          priceMin,
          priceMax,
          priceUnit: form.priceUnit,
          availability: form.availability,
          location: areas[0] ?? form.coverageArea,
          description: form.description,
          imageUrl: form.imagePreview ?? void 0,
          isActive: true,
          bookingCount: 0
        };
        setListings((prev) => [newListing, ...prev]);
        ue.success(sw ? "Huduma imeongezwa" : "Service listed successfully");
      }
      setModalOpen(false);
      setForm(EMPTY_FORM);
      setEditTarget(null);
    } catch {
      ue.error(
        sw ? "Imeshindwa. Jaribu tena." : "Failed. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }
  async function togglePause(listing) {
    const id = BigInt(listing.id.replace(/\D/g, "") || 0);
    try {
      if (listing.isActive) {
        if (actor) await actor.pauseServiceListing(id);
        setListings(
          (prev) => prev.map(
            (l) => l.id === listing.id ? { ...l, isActive: false } : l
          )
        );
        ue.success(sw ? "Huduma imesimamishwa" : "Service paused");
      } else {
        if (actor) await actor.resumeServiceListing(id);
        setListings(
          (prev) => prev.map((l) => l.id === listing.id ? { ...l, isActive: true } : l)
        );
        ue.success(sw ? "Huduma imeanza tena" : "Service resumed");
      }
    } catch {
      ue.error(sw ? "Imeshindwa" : "Operation failed");
    }
  }
  async function confirmDelete() {
    if (!deleteTarget) return;
    const id = BigInt(deleteTarget.id.replace(/\D/g, "") || 0);
    try {
      if (actor) await actor.deleteServiceListing(id);
      setListings((prev) => prev.filter((l) => l.id !== deleteTarget.id));
      ue.success(sw ? "Huduma imefutwa" : "Service deleted");
    } catch {
      ue.error(sw ? "Imeshindwa kufuta" : "Failed to delete");
    } finally {
      setDeleteTarget(null);
    }
  }
  async function handleBookingAction(bookingId, action) {
    const statusMap = {
      confirm: "confirmed",
      decline: "cancelled",
      complete: "completed"
    };
    const newStatus = statusMap[action];
    setBookings(
      (prev) => prev.map((b) => b.id === bookingId ? { ...b, status: newStatus } : b)
    );
    const messages = {
      confirm: { en: "Booking confirmed", sw: "Ombi limethibitishwa" },
      decline: { en: "Booking declined", sw: "Ombi limekataliwa" },
      complete: { en: "Booking marked complete", sw: "Kazi imekamilika" }
    };
    ue.success(sw ? messages[action].sw : messages[action].en);
  }
  const formatPriceRange = (l) => {
    const min = l.priceMin ?? l.price;
    const max = l.priceMax ?? l.price;
    if (min === max) return formatTSh(min);
    return `${formatTSh(min)} – ${formatTSh(max)}`;
  };
  const getServiceLabel = (type) => {
    var _a;
    return ((_a = SERVICE_TYPE_LABELS[type]) == null ? void 0 : _a[lang]) ?? type;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-4 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-xl overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: "/assets/generated/service-provider.dim_800x400.jpg",
            alt: "Service Provider",
            className: "w-full h-32 object-cover"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-teal-900/80 to-transparent flex items-end p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-display font-bold text-white", children: sw ? "Mtoa Huduma za Kilimo" : "Input Service Provider" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/80", children: (user == null ? void 0 : user.businessName) ?? (user == null ? void 0 : user.name) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            title: sw ? "Huduma Hai" : "Active Services",
            value: String(activeCount),
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "w-4 h-4" }),
            colorClass: "bg-teal-50 text-teal-600"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            title: sw ? "Vikao Vyote" : "Total Bookings",
            value: String(totalBookings),
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
            colorClass: "bg-primary/10 text-primary"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            title: sw ? "Zinasubiri" : "Pending",
            value: String(pendingBookings),
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SquareCheckBig, { className: "w-4 h-4" }),
            colorClass: "bg-amber-50 text-amber-600"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            title: sw ? "Mapato" : "Earned",
            value: completedEarnings > 0 ? formatTSh(completedEarnings) : "TSh 0",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4" }),
            colorClass: "bg-green-50 text-green-600"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          className: "w-full",
          "data-ocid": "service.add_button",
          onClick: openAddModal,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
            sw ? "Ongeza Huduma" : "Add New Service"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground mb-2", children: sw ? "Huduma Zangu" : "My Services" }),
        listings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "service.empty_state",
            className: "bg-card border border-dashed border-border rounded-xl p-6 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "w-8 h-8 mx-auto text-muted-foreground mb-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: sw ? "Bado hujaorodhesha huduma yoyote." : "No services listed yet." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  className: "mt-3",
                  onClick: openAddModal,
                  "data-ocid": "service.empty_state.add_button",
                  children: sw ? "Ongeza Huduma" : "Add First Service"
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: listings.map((svc, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": `service.listing.${i + 1}`,
            className: "bg-card border border-border rounded-xl overflow-hidden",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
                svc.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: svc.imageUrl,
                    alt: svc.title,
                    className: "w-20 h-20 object-cover flex-shrink-0"
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 bg-muted flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "w-6 h-6 text-muted-foreground" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm truncate", children: svc.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 shrink-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          className: `text-[10px] ${SERVICE_COLORS[svc.serviceType] ?? "bg-muted text-muted-foreground"}`,
                          children: getServiceLabel(svc.serviceType)
                        }
                      ),
                      !svc.isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          variant: "outline",
                          className: "text-[10px] text-muted-foreground",
                          children: sw ? "Imesimamishwa" : "Paused"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-primary mt-0.5", children: [
                    formatPriceRange(svc),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-normal ml-1", children: [
                      "/",
                      svc.priceUnit.replace("per_", "")
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
                    svc.availability,
                    " · ",
                    svc.location
                  ] }),
                  svc.bookingCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: svc.bookingCount }),
                    " ",
                    sw ? "vikao" : "bookings"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5 px-3 pb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "text-xs h-7 px-2 flex-1",
                    "data-ocid": `service.edit_button.${i + 1}`,
                    onClick: () => openEditModal(svc),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3 h-3 mr-1" }),
                      sw ? "Hariri" : "Edit"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "text-xs h-7 px-2 flex-1",
                    "data-ocid": `service.pause_button.${i + 1}`,
                    onClick: () => togglePause(svc),
                    children: svc.isActive ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "w-3 h-3 mr-1" }),
                      sw ? "Simamisha" : "Pause"
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3 h-3 mr-1" }),
                      sw ? "Endesha" : "Resume"
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "ghost",
                    className: "text-xs h-7 px-2 text-destructive hover:text-destructive",
                    "data-ocid": `service.delete_button.${i + 1}`,
                    onClick: () => setDeleteTarget(svc),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" })
                  }
                )
              ] })
            ]
          },
          svc.id
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground mb-2", children: sw ? "Maombi ya Vikao" : "Booking Requests" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: bookings.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": `service.booking.${i + 1}`,
            className: "bg-card border border-border rounded-xl p-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm truncate", children: b.client }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: b.service }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    b.location,
                    " · ",
                    b.scheduledDate
                  ] }),
                  b.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground italic mt-0.5", children: b.notes })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-1 shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: `text-[10px] border ${STATUS_COLORS[b.status]}`,
                      children: b.status === "pending" ? sw ? "Inasubiri" : "Pending" : b.status === "confirmed" ? sw ? "Imethibitishwa" : "Confirmed" : b.status === "completed" ? sw ? "Imekamilika" : "Completed" : sw ? "Imekataliwa" : "Cancelled"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-primary", children: formatTSh(b.totalPrice) })
                ] })
              ] }),
              (b.status === "pending" || b.status === "confirmed") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1 border-t border-border", children: [
                b.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "data-ocid": `service.confirm_button.${i + 1}`,
                      className: "flex-1 text-xs text-green-600 font-semibold py-1 rounded-lg bg-green-50 hover:bg-green-100 transition-colors",
                      onClick: () => handleBookingAction(b.id, "confirm"),
                      children: sw ? "Thibitisha" : "Confirm"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "data-ocid": `service.decline_button.${i + 1}`,
                      className: "flex-1 text-xs text-destructive font-semibold py-1 rounded-lg bg-destructive/10 hover:bg-destructive/20 transition-colors",
                      onClick: () => handleBookingAction(b.id, "decline"),
                      children: sw ? "Kataa" : "Decline"
                    }
                  )
                ] }),
                b.status === "confirmed" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      "data-ocid": `service.complete_button.${i + 1}`,
                      className: "flex-1 text-xs text-primary font-semibold py-1 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors",
                      onClick: () => handleBookingAction(b.id, "complete"),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SquareCheckBig, { className: "w-3 h-3 inline mr-1" }),
                        sw ? "Kamilisha" : "Mark Done"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "data-ocid": `service.message_button.${i + 1}`,
                      className: "px-3 text-xs text-primary py-1 rounded-lg border border-border hover:bg-muted/50 transition-colors",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-3.5 h-3.5" })
                    }
                  )
                ] })
              ] })
            ]
          },
          b.id
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
      Dialog,
      {
        open: modalOpen,
        onOpenChange: (open) => {
          if (!submitting) setModalOpen(open);
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "max-w-sm mx-auto max-h-[90vh] overflow-y-auto",
            "data-ocid": "service.dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: editTarget ? sw ? "Hariri Huduma" : "Edit Service" : sw ? "Ongeza Huduma Mpya" : "Add New Service" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 pb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "svc-name", children: [
                    sw ? "Jina la Huduma" : "Service Name",
                    " *"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "svc-name",
                      "data-ocid": "service.name_input",
                      placeholder: sw ? "Mfano: Trekta ya Kulima" : "e.g. Tractor Plowing Service",
                      value: form.name,
                      onChange: (e) => setForm((f) => ({ ...f, name: e.target.value }))
                    }
                  ),
                  formErrors.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      "data-ocid": "service.name_input.field_error",
                      className: "text-xs text-destructive",
                      children: formErrors.name
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
                    sw ? "Aina ya Huduma" : "Service Type",
                    " *"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Select,
                    {
                      value: form.serviceType,
                      onValueChange: (v) => setForm((f) => ({ ...f, serviceType: v })),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "service.type_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          SelectValue,
                          {
                            placeholder: sw ? "Chagua aina" : "Select type"
                          }
                        ) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.keys(SERVICE_TYPE_LABELS).map(
                          (type) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: type, children: SERVICE_TYPE_LABELS[type][lang] }, type)
                        ) })
                      ]
                    }
                  ),
                  formErrors.serviceType && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      "data-ocid": "service.type_select.field_error",
                      className: "text-xs text-destructive",
                      children: formErrors.serviceType
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "svc-desc", children: [
                    sw ? "Maelezo" : "Description",
                    " *"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      id: "svc-desc",
                      "data-ocid": "service.description_textarea",
                      placeholder: sw ? "Elezea huduma, vifaa unavyotumia, n.k." : "Describe the service, equipment, experience, etc.",
                      value: form.description,
                      onChange: (e) => setForm((f) => ({ ...f, description: e.target.value })),
                      rows: 3
                    }
                  ),
                  formErrors.description && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      "data-ocid": "service.description_textarea.field_error",
                      className: "text-xs text-destructive",
                      children: formErrors.description
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
                    sw ? "Mstari wa Bei (TSh)" : "Price Range (TSh)",
                    " *"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          type: "number",
                          "data-ocid": "service.price_min_input",
                          placeholder: sw ? "Bei ya chini" : "Min price",
                          value: form.priceMin,
                          min: 0,
                          onChange: (e) => setForm((f) => ({ ...f, priceMin: e.target.value }))
                        }
                      ),
                      formErrors.priceMin && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          "data-ocid": "service.price_min_input.field_error",
                          className: "text-xs text-destructive mt-0.5",
                          children: formErrors.priceMin
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          type: "number",
                          "data-ocid": "service.price_max_input",
                          placeholder: sw ? "Bei ya juu" : "Max price",
                          value: form.priceMax,
                          min: 0,
                          onChange: (e) => setForm((f) => ({ ...f, priceMax: e.target.value }))
                        }
                      ),
                      formErrors.priceMax && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          "data-ocid": "service.price_max_input.field_error",
                          className: "text-xs text-destructive mt-0.5",
                          children: formErrors.priceMax
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
                    sw ? "Kitengo cha Bei" : "Pricing Unit",
                    " *"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Select,
                    {
                      value: form.priceUnit,
                      onValueChange: (v) => setForm((f) => ({ ...f, priceUnit: v })),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "service.price_unit_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          SelectValue,
                          {
                            placeholder: sw ? "Chagua kitengo" : "Select unit"
                          }
                        ) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.keys(PRICE_UNIT_LABELS).map(
                          (unit) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: unit, children: PRICE_UNIT_LABELS[unit][lang] }, unit)
                        ) })
                      ]
                    }
                  ),
                  formErrors.priceUnit && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      "data-ocid": "service.price_unit_select.field_error",
                      className: "text-xs text-destructive",
                      children: formErrors.priceUnit
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "svc-avail", children: [
                    sw ? "Wakati wa Upatikanaji" : "Availability",
                    " *"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "svc-avail",
                      "data-ocid": "service.availability_input",
                      placeholder: sw ? "Mfano: Jumatatu-Jumamosi, 6am-6pm" : "e.g. Mon-Sat, 6am-6pm",
                      value: form.availability,
                      onChange: (e) => setForm((f) => ({ ...f, availability: e.target.value }))
                    }
                  ),
                  formErrors.availability && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      "data-ocid": "service.availability_input.field_error",
                      className: "text-xs text-destructive",
                      children: formErrors.availability
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "svc-area", children: [
                    sw ? "Maeneo Yanayofikiwa" : "Coverage Area",
                    " *"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "svc-area",
                      "data-ocid": "service.coverage_area_input",
                      placeholder: sw ? "Mfano: Morogoro, Dodoma, Mbeya" : "e.g. Morogoro, Dodoma, Mbeya",
                      value: form.coverageArea,
                      onChange: (e) => setForm((f) => ({ ...f, coverageArea: e.target.value }))
                    }
                  ),
                  formErrors.coverageArea && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      "data-ocid": "service.coverage_area_input.field_error",
                      className: "text-xs text-destructive",
                      children: formErrors.coverageArea
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "svc-equip", children: sw ? "Maelezo ya Vifaa" : "Equipment Details" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      id: "svc-equip",
                      "data-ocid": "service.equipment_textarea",
                      placeholder: sw ? "Mfano: Trekta John Deere 4WD, Pampu ya dawa ya kunyunyizia" : "e.g. John Deere tractor 4WD, GPS-guided sprayer",
                      value: form.equipmentDetails,
                      onChange: (e) => setForm((f) => ({ ...f, equipmentDetails: e.target.value })),
                      rows: 2
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: sw ? "Picha ya Huduma" : "Service Image" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: "w-full border-2 border-dashed border-border rounded-lg p-3 text-center cursor-pointer hover:border-primary/50 transition-colors",
                      onClick: () => {
                        var _a;
                        return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                      },
                      "data-ocid": "service.image_upload_button",
                      children: form.imagePreview ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "img",
                          {
                            src: form.imagePreview,
                            alt: "Preview",
                            className: "w-full h-28 object-cover rounded-md"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            className: "absolute top-1 right-1 bg-card rounded-full p-0.5 shadow",
                            onClick: (e) => {
                              e.stopPropagation();
                              setForm((f) => ({ ...f, imagePreview: null }));
                            },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
                          }
                        )
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-6 h-6 mx-auto text-muted-foreground mb-1" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: sw ? "Gusa kupakia picha" : "Tap to upload image" })
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      ref: fileInputRef,
                      type: "file",
                      accept: "image/*",
                      className: "hidden",
                      "data-ocid": "service.image_file_input",
                      onChange: handleImageChange
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
                      "data-ocid": "service.cancel_button",
                      onClick: () => setModalOpen(false),
                      disabled: submitting,
                      children: sw ? "Ghairi" : "Cancel"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      className: "flex-1",
                      "data-ocid": "service.submit_button",
                      disabled: submitting,
                      children: submitting ? sw ? "Inatuma..." : "Saving..." : editTarget ? sw ? "Hifadhi" : "Save Changes" : sw ? "Orodhesha" : "List Service"
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: !!deleteTarget,
        onOpenChange: (open) => {
          if (!open) setDeleteTarget(null);
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "service.delete_dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: sw ? "Futa Huduma" : "Delete Service" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: sw ? `Una uhakika wa kufuta "${deleteTarget == null ? void 0 : deleteTarget.title}"? Hatua hii haiwezi kurudishwa.` : `Are you sure you want to delete "${deleteTarget == null ? void 0 : deleteTarget.title}"? This cannot be undone.` })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "service.delete_cancel_button", children: sw ? "Ghairi" : "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                "data-ocid": "service.delete_confirm_button",
                className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                onClick: confirmDelete,
                children: sw ? "Futa" : "Delete"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  InputServiceDashboard as default
};
