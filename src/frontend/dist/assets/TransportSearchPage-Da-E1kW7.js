import { k as createLucideIcon, a as useLanguageStore, b as useNavigate, r as reactExports, af as TANZANIA_REGION_GRID, ag as TRANSPORT_PROVIDERS, j as jsxRuntimeExports, L as Layout, f as Truck, ah as MapListToggle, I as Input, ai as TanzaniaMapView, y as MapPin, B as Button, z as formatTSh, aj as MessageSquare, l as Textarea, aa as Star, m as Badge, N as CircleCheck, K as Clock } from "./index-BUVIgngH.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-Coi4Z4Fu.js";
import { L as Label } from "./label-BTY_QCm0.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C7D5N9Bz.js";
import { S as Separator } from "./separator-CtEo6eCY.js";
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
  ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2", key: "1nb95v" }],
  ["line", { x1: "8", x2: "16", y1: "6", y2: "6", key: "x4nwl0" }],
  ["line", { x1: "16", x2: "16", y1: "14", y2: "18", key: "wjye3r" }],
  ["path", { d: "M16 10h.01", key: "1m94wz" }],
  ["path", { d: "M12 10h.01", key: "1nrarc" }],
  ["path", { d: "M8 10h.01", key: "19clt8" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }]
];
const Calculator = createLucideIcon("calculator", __iconNode);
const AVAIL_CONFIG = {
  available: {
    className: "bg-green-500/10 text-green-700 border-green-500/30 dark:text-green-400",
    dot: "bg-green-500",
    labelKey: "availableSlots"
  },
  limited: {
    className: "bg-yellow-500/10 text-yellow-700 border-yellow-500/30 dark:text-yellow-400",
    dot: "bg-yellow-500",
    labelKey: "limitedSlots"
  },
  full: {
    className: "bg-destructive/10 text-destructive border-destructive/30",
    dot: "bg-destructive",
    labelKey: "fullyBooked"
  }
};
function getAvailabilityStatus(provider) {
  var _a;
  if (provider.availabilityStatus) return provider.availabilityStatus;
  const count = ((_a = provider.timeSlots) == null ? void 0 : _a.length) ?? 0;
  if (count === 0) return "full";
  if (count <= 3) return "limited";
  return "available";
}
const VEHICLE_BADGE_COLOR = {
  truck: "bg-primary/10 text-primary border-primary/20",
  pickup: "bg-accent/10 text-accent-foreground border-accent/20",
  motorcycle: "bg-secondary text-secondary-foreground border-border",
  cart: "bg-muted text-muted-foreground border-border",
  minivan: "bg-primary/15 text-primary border-primary/25"
};
const VEHICLE_EMOJI = {
  truck: "🚛",
  pickup: "🛻",
  motorcycle: "🏍️",
  cart: "🛒",
  minivan: "🚐"
};
const STATUS_BADGE = {
  pending: {
    label: "Pending",
    labelSw: "Inasubiri",
    className: "bg-secondary text-secondary-foreground border-border"
  },
  confirmed: {
    label: "Confirmed",
    labelSw: "Imethibitishwa",
    className: "bg-green-500/10 text-green-700 border-green-500/30 dark:text-green-400"
  },
  in_transit: {
    label: "In Transit",
    labelSw: "Njiani",
    className: "bg-primary/10 text-primary border-primary/20"
  },
  delivered: {
    label: "Delivered",
    labelSw: "Imefikishwa",
    className: "bg-muted text-muted-foreground border-border"
  },
  cancelled: {
    label: "Cancelled",
    labelSw: "Imeghairiwa",
    className: "bg-destructive/10 text-destructive border-destructive/20"
  }
};
const LS_KEY = "namwala_transport_bookings";
function loadBookings() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
  }
  return SEED_BOOKINGS;
}
function saveBookings(bookings) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(bookings));
  } catch {
  }
}
function genRef() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}
const SEED_BOOKINGS = [
  {
    id: "tb-seed-1",
    providerId: "tp1",
    providerName: "Kariuki Transport Services",
    status: "confirmed",
    pickupLocation: "Namwala Market",
    deliveryLocation: "Dodoma Grain Store",
    scheduledDate: "2026-05-12",
    notes: "2,000 kg maize in 40-kg bags",
    totalCost: 375e3,
    createdAt: "2026-05-05T10:00:00Z"
  },
  {
    id: "tb-seed-2",
    providerId: "tp3",
    providerName: "Msomi Motorcycle Deliveries",
    status: "delivered",
    pickupLocation: "Niko Village",
    deliveryLocation: "Namwala Health Centre",
    scheduledDate: "2026-05-03",
    notes: "Urgent medicine delivery",
    totalCost: 12e3,
    createdAt: "2026-05-02T08:00:00Z"
  }
];
const EMPTY_FORM = {
  pickupLocation: "",
  deliveryLocation: "",
  scheduledDate: "",
  estimatedDistanceKm: "",
  selectedTimeSlot: "",
  notes: ""
};
function AvailabilityBadge({ provider }) {
  const { t } = useLanguageStore();
  const status = getAvailabilityStatus(provider);
  const cfg = AVAIL_CONFIG[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${cfg.className}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-1.5 h-1.5 rounded-full ${cfg.dot}` }),
        t(cfg.labelKey)
      ]
    }
  );
}
function CostCalculator({
  provider,
  distanceKm,
  onDistanceChange
}) {
  const { t } = useLanguageStore();
  const cost = distanceKm ? provider.pricePerKm * Number(distanceKm) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/50 border border-border rounded-xl p-4 space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Calculator, { className: "w-4 h-4 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: t("costCalculator") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: t("distanceKm") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            min: "1",
            placeholder: "e.g. 150",
            "data-ocid": "transport_booking.distance_input",
            value: distanceKm,
            onChange: (e) => onDistanceChange(e.target.value),
            className: "h-9"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: t("ratePerKm") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 flex items-center px-3 bg-card border border-border rounded-md text-sm font-semibold text-foreground", children: formatTSh(provider.pricePerKm) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "transport_booking.cost_readout",
        className: `rounded-lg px-4 py-3 flex items-center justify-between border ${cost !== null && cost > 0 ? "bg-primary/10 border-primary/20" : "bg-muted/60 border-border"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `text-sm font-medium ${cost !== null && cost > 0 ? "text-primary" : "text-muted-foreground"}`,
              children: t("estimatedCostLabel")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `text-lg font-bold ${cost !== null && cost > 0 ? "text-primary" : "text-muted-foreground"}`,
              children: cost !== null && cost > 0 ? formatTSh(cost) : "—"
            }
          )
        ]
      }
    )
  ] });
}
function TimeSlotPicker({
  provider,
  selectedSlot,
  onSelect
}) {
  const { t } = useLanguageStore();
  const slots = provider.timeSlots ?? [];
  const status = getAvailabilityStatus(provider);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-semibold text-foreground", children: t("timeSlots") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AvailabilityBadge, { provider })
    ] }),
    status === "full" || slots.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground bg-muted/40 rounded-lg px-3 py-2", children: t("noSlotsAvailable") }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-1.5", children: slots.map((slot) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "label",
      {
        className: `flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition-colors ${selectedSlot === slot ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/40"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "radio",
              name: "timeSlot",
              value: slot,
              checked: selectedSlot === slot,
              onChange: () => onSelect(slot),
              className: "accent-primary"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: slot })
        ]
      },
      slot
    )) })
  ] });
}
function ProviderCard({ provider, index, onBook }) {
  var _a;
  const { t, language } = useLanguageStore();
  const navigate = useNavigate();
  const badgeClass = VEHICLE_BADGE_COLOR[provider.vehicleType] ?? "bg-muted text-muted-foreground border-border";
  const emoji = VEHICLE_EMOJI[provider.vehicleType] ?? "🚗";
  const vehicleLabel = provider.vehicleType.charAt(0).toUpperCase() + provider.vehicleType.slice(1);
  const avStatus = getAvailabilityStatus(provider);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `transport_provider.item.${index}`,
      className: "bg-card border border-border rounded-xl p-4 flex flex-col gap-3 hover:shadow-md transition-shadow duration-200",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl shrink-0", children: emoji }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground truncate", children: provider.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `inline-block text-xs font-medium px-2 py-0.5 rounded-full border mt-0.5 ${badgeClass}`,
                  children: vehicleLabel
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5 fill-yellow-400 text-yellow-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: provider.rating.toFixed(1) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "(",
              provider.ratingCount,
              " ",
              t("ratingCount"),
              ")"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AvailabilityBadge, { provider }),
          avStatus !== "full" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            ((_a = provider.timeSlots) == null ? void 0 : _a.length) ?? 0,
            " ",
            language === "sw" ? "nyakati" : "slots"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/50 rounded-lg p-2 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("capacityFilter") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-foreground", children: [
              provider.capacityTons,
              " t"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/50 rounded-lg p-2 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("pricePerKm") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground", children: formatTSh(provider.pricePerKm) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("coverageAreas") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
            provider.coverageAreas.slice(0, 3).map((area) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "text-xs px-1.5 py-0 border-border text-foreground",
                children: area
              },
              area
            )),
            provider.coverageAreas.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "outline",
                className: "text-xs px-1.5 py-0 border-border text-muted-foreground",
                children: [
                  "+",
                  provider.coverageAreas.length - 3
                ]
              }
            )
          ] })
        ] }),
        provider.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2", children: provider.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-auto pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              className: "flex-1 gap-1.5",
              "data-ocid": `transport_provider.message_button.${index}`,
              onClick: () => navigate({
                to: "/messages",
                search: { recipientId: provider.id }
              }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-3.5 h-3.5" }),
                language === "sw" ? "Ujumbe" : t("message")
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              size: "sm",
              className: "flex-1 gap-1.5",
              "data-ocid": `transport_provider.book_button.${index}`,
              onClick: () => onBook(provider),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-3.5 h-3.5" }),
                t("bookNow")
              ]
            }
          )
        ] })
      ]
    }
  );
}
function BookingSuccessView({
  success,
  onClose
}) {
  const { t } = useLanguageStore();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "transport_booking.success_state",
      className: "text-center space-y-5 py-2",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-16 h-16 text-green-500" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-foreground", children: t("bookingConfirmed") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: t("bookingSuccessDesc") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/10 border border-primary/20 rounded-xl p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: t("bookingReference") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-mono font-bold text-primary tracking-widest", children: success.reference })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 text-left space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: t("costBreakdown") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: success.providerName }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: t("selectedSlot") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: success.selectedSlot || "—" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: t("pickupAddress") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground truncate max-w-[60%]", children: success.pickupLocation })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: t("deliveryAddress") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground truncate max-w-[60%]", children: success.deliveryLocation })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-base font-bold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: t("estimatedCostLabel") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: success.totalCost > 0 ? formatTSh(success.totalCost) : "—" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            className: "w-full",
            "data-ocid": "transport_booking.close_button",
            onClick: onClose,
            children: t("confirm")
          }
        )
      ]
    }
  );
}
function TransportSearchPage() {
  const { t, language } = useLanguageStore();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = reactExports.useState("list");
  const [query, setQuery] = reactExports.useState("");
  const [vehicleFilter, setVehicleFilter] = reactExports.useState("all");
  const [capacityFilter, setCapacityFilter] = reactExports.useState("any");
  const [selectedRegion, setSelectedRegion] = reactExports.useState("All Regions");
  const [bookingProvider, setBookingProvider] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [bookingSuccess, setBookingSuccess] = reactExports.useState(
    null
  );
  const [myBookings, setMyBookings] = reactExports.useState(loadBookings);
  reactExports.useEffect(() => {
    saveBookings(myBookings);
  }, [myBookings]);
  const tanzaniaRegionNames = reactExports.useMemo(
    () => new Set(TANZANIA_REGION_GRID.map((r) => r.name)),
    []
  );
  const filtered = reactExports.useMemo(() => {
    return TRANSPORT_PROVIDERS.filter((p) => {
      const q = query.toLowerCase();
      const matchesQuery = !q || p.name.toLowerCase().includes(q) || p.coverageAreas.some((a) => a.toLowerCase().includes(q));
      const matchesVehicle = vehicleFilter === "all" || p.vehicleType === vehicleFilter;
      const matchesCapacity = capacityFilter === "any" || capacityFilter === "under1" && p.capacityTons < 1 || capacityFilter === "1to5" && p.capacityTons >= 1 && p.capacityTons <= 5 || capacityFilter === "over5" && p.capacityTons > 5;
      const matchesRegion = selectedRegion === "All Regions" || p.coverageAreas.some(
        (a) => a.toLowerCase() === selectedRegion.toLowerCase()
      );
      return matchesQuery && matchesVehicle && matchesCapacity && matchesRegion;
    });
  }, [query, vehicleFilter, capacityFilter, selectedRegion]);
  const providerCountByRegion = reactExports.useMemo(() => {
    const counts = {};
    for (const provider of TRANSPORT_PROVIDERS) {
      for (const area of provider.coverageAreas) {
        if (tanzaniaRegionNames.has(area)) {
          counts[area] = (counts[area] ?? 0) + 1;
        }
      }
    }
    return counts;
  }, [tanzaniaRegionNames]);
  const estimatedCost = bookingProvider && form.estimatedDistanceKm ? bookingProvider.pricePerKm * Number(form.estimatedDistanceKm) : null;
  function handleBookSubmit(e) {
    e.preventDefault();
    if (!bookingProvider) return;
    const avStatus = getAvailabilityStatus(bookingProvider);
    if (avStatus === "full") return;
    setSubmitting(true);
    setTimeout(() => {
      const ref = genRef();
      const newBooking = {
        id: `tb-${Date.now()}`,
        providerId: bookingProvider.id,
        providerName: bookingProvider.name,
        status: "confirmed",
        pickupLocation: form.pickupLocation,
        deliveryLocation: form.deliveryLocation,
        scheduledDate: form.scheduledDate,
        notes: form.notes || void 0,
        totalCost: estimatedCost ?? 0,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      setMyBookings((prev) => [newBooking, ...prev]);
      setBookingSuccess({
        reference: ref,
        providerName: bookingProvider.name,
        totalCost: estimatedCost ?? 0,
        selectedSlot: form.selectedTimeSlot,
        pickupLocation: form.pickupLocation,
        deliveryLocation: form.deliveryLocation
      });
      setSubmitting(false);
    }, 900);
  }
  function closeBookingModal() {
    setBookingProvider(null);
    setBookingSuccess(null);
    setForm(EMPTY_FORM);
  }
  function handleRegionSelect(region) {
    setSelectedRegion(region);
  }
  function clearAllFilters() {
    setQuery("");
    setVehicleFilter("all");
    setCapacityFilter("any");
    setSelectedRegion("All Regions");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "transport_search.page",
        className: "min-h-screen bg-background",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border shadow-sm px-4 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-primary/10 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-5 h-5 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: t("findTransport") })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                MapListToggle,
                {
                  viewMode,
                  onToggle: () => setViewMode((v) => v === "list" ? "map" : "list"),
                  lang: language,
                  t: (key) => {
                    if (key === "listView") return t("transportListView");
                    if (key === "mapView") return t("transportMapView");
                    return t(key);
                  }
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground pl-[52px]", children: t("findTransportSub") })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 py-6 space-y-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "section",
              {
                "data-ocid": "transport_search.filters",
                className: "bg-card border border-border rounded-xl p-4 space-y-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        "data-ocid": "transport_search.search_input",
                        placeholder: t("searchByNameOrLocation"),
                        value: query,
                        onChange: (e) => setQuery(e.target.value),
                        className: "pl-9"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none", children: "🔍" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: t("vehicleType") }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: vehicleFilter, onValueChange: setVehicleFilter, children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          SelectTrigger,
                          {
                            "data-ocid": "transport_search.vehicle_select",
                            className: "h-9 text-sm",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: t("allVehicles") }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "truck", children: "🚛 Truck" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "pickup", children: "🛻 Pickup" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "minivan", children: "🚐 Minivan" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "motorcycle", children: "🏍️ Motorcycle" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "cart", children: "🛒 Cart" })
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: t("capacityFilter") }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Select,
                        {
                          value: capacityFilter,
                          onValueChange: setCapacityFilter,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              SelectTrigger,
                              {
                                "data-ocid": "transport_search.capacity_select",
                                className: "h-9 text-sm",
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "any", children: t("anyCapacity") }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "under1", children: t("under1ton") }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "1to5", children: t("oneToFiveTons") }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "over5", children: t("over5tons") })
                            ] })
                          ]
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      filtered.length,
                      " ",
                      language === "sw" ? "wamepatikana" : t("searchResults"),
                      selectedRegion !== "All Regions" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 font-medium text-primary", children: [
                        "· ",
                        selectedRegion
                      ] })
                    ] }),
                    (query || vehicleFilter !== "all" || capacityFilter !== "any" || selectedRegion !== "All Regions") && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": "transport_search.clear_filters",
                        onClick: clearAllFilters,
                        className: "text-xs text-primary hover:underline font-medium",
                        children: t("searchClearQuery")
                      }
                    )
                  ] })
                ]
              }
            ),
            viewMode === "map" && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "data-ocid": "transport_search.map_view", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              TanzaniaMapView,
              {
                listingCountByRegion: providerCountByRegion,
                selectedRegion,
                onSelectRegion: handleRegionSelect,
                lang: language,
                t: (key) => {
                  if (key === "listingsCount")
                    return t("transportProvidersCount");
                  if (key === "selectRegion") return t("transportSelectRegion");
                  if (key === "viewingRegion")
                    return t("transportViewingRegion");
                  if (key === "backToAllRegions")
                    return t("transportBackToAll");
                  return t(key);
                },
                totalFilteredCount: filtered.length
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "transport_provider.list", children: [
              viewMode === "list" && selectedRegion !== "All Regions" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": "transport_search.region_banner",
                  className: "flex items-center justify-between bg-primary/10 border border-primary/20 rounded-xl px-3 py-2 mb-4",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 text-primary" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-primary", children: [
                        t("transportViewingRegion"),
                        " ",
                        selectedRegion
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                        "(",
                        filtered.length,
                        " ",
                        t("transportProvidersCount"),
                        ")"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": "transport_search.clear_region",
                        onClick: () => setSelectedRegion("All Regions"),
                        className: "text-[10px] text-primary/70 hover:text-primary font-medium underline underline-offset-2",
                        children: t("transportBackToAll")
                      }
                    )
                  ]
                }
              ),
              filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": "transport_provider.empty_state",
                  className: "bg-card border border-border rounded-xl p-10 text-center",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl block mb-3", children: "🚧" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: selectedRegion !== "All Regions" ? t("transportNoProvidersInRegion") : t("noProvidersFound") }),
                    selectedRegion !== "All Regions" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: selectedRegion }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "ghost",
                        size: "sm",
                        className: "mt-3",
                        onClick: clearAllFilters,
                        children: t("searchClearQuery")
                      }
                    )
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: filtered.map((provider, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                ProviderCard,
                {
                  provider,
                  index: idx + 1,
                  onBook: setBookingProvider
                },
                provider.id
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "transport_requests.section", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-6" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold text-foreground mb-4", children: t("myBookings") }),
              myBookings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": "transport_requests.empty_state",
                  className: "bg-muted/40 border border-border rounded-xl p-8 text-center",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl block mb-2", children: "📦" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: t("noBookingsYet") })
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: myBookings.map((booking, idx) => {
                const status = STATUS_BADGE[booking.status];
                const statusLabel = language === "sw" ? status.labelSw : status.label;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    "data-ocid": `transport_requests.item.${idx + 1}`,
                    className: "bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-foreground truncate", children: booking.providerName }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: `text-xs font-medium px-2 py-0.5 rounded-full border ${status.className}`,
                              children: statusLabel
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                          t("routeSummary"),
                          ": ",
                          booking.pickupLocation,
                          " →",
                          " ",
                          booking.deliveryLocation
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                          "📅 ",
                          booking.scheduledDate,
                          booking.totalCost > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                            " · ",
                            formatTSh(booking.totalCost)
                          ] })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          type: "button",
                          variant: "outline",
                          size: "sm",
                          className: "gap-1.5 shrink-0",
                          "data-ocid": `transport_requests.message_button.${idx + 1}`,
                          onClick: () => navigate({
                            to: "/messages",
                            search: { recipientId: booking.providerId }
                          }),
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-3.5 h-3.5" }),
                            t("messageProvider")
                          ]
                        }
                      )
                    ]
                  },
                  booking.id
                );
              }) })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!bookingProvider,
        onOpenChange: (open) => {
          if (!open) closeBookingModal();
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            "data-ocid": "transport_booking.dialog",
            className: "max-w-lg max-h-[92vh] overflow-y-auto",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: bookingSuccess ? t("bookingConfirmed") : `${t("bookNow")} — ${bookingProvider == null ? void 0 : bookingProvider.name}` }) }),
              bookingSuccess ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                BookingSuccessView,
                {
                  success: bookingSuccess,
                  onClose: closeBookingModal
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleBookSubmit, className: "space-y-5", children: [
                bookingProvider && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CostCalculator,
                  {
                    provider: bookingProvider,
                    distanceKm: form.estimatedDistanceKm,
                    onDistanceChange: (v) => setForm((f) => ({ ...f, estimatedDistanceKm: v }))
                  }
                ),
                bookingProvider && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TimeSlotPicker,
                  {
                    provider: bookingProvider,
                    selectedSlot: form.selectedTimeSlot,
                    onSelect: (slot) => setForm((f) => ({ ...f, selectedTimeSlot: slot }))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pickup", children: t("pickupAddress") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "pickup",
                      "data-ocid": "transport_booking.pickup_input",
                      required: true,
                      placeholder: language === "sw" ? "mfano: Soko la Namwala" : "e.g. Namwala Market",
                      value: form.pickupLocation,
                      onChange: (e) => setForm((f) => ({ ...f, pickupLocation: e.target.value }))
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "delivery", children: t("deliveryAddress") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "delivery",
                      "data-ocid": "transport_booking.delivery_input",
                      required: true,
                      placeholder: language === "sw" ? "mfano: Ghala la Nafaka Dodoma" : "e.g. Dodoma Grain Store",
                      value: form.deliveryLocation,
                      onChange: (e) => setForm((f) => ({ ...f, deliveryLocation: e.target.value }))
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "date", children: t("scheduledDate") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "date",
                      type: "date",
                      "data-ocid": "transport_booking.date_input",
                      required: true,
                      min: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
                      value: form.scheduledDate,
                      onChange: (e) => setForm((f) => ({ ...f, scheduledDate: e.target.value }))
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "notes", children: t("notes") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      id: "notes",
                      "data-ocid": "transport_booking.notes_textarea",
                      rows: 2,
                      placeholder: language === "sw" ? "mfano: magunia 50 ya mahindi" : "e.g. 2,000 kg maize in 40 kg bags",
                      value: form.notes,
                      onChange: (e) => setForm((f) => ({ ...f, notes: e.target.value }))
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      className: "flex-1",
                      "data-ocid": "transport_booking.cancel_button",
                      onClick: closeBookingModal,
                      children: t("cancel")
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      className: "flex-1",
                      "data-ocid": "transport_booking.submit_button",
                      disabled: submitting || (bookingProvider ? getAvailabilityStatus(bookingProvider) === "full" : false),
                      children: submitting ? t("loading") : t("bookNow")
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      }
    )
  ] });
}
export {
  TransportSearchPage as default
};
