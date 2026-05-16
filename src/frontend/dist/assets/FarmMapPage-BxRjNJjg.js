import { k as createLucideIcon, a as useLanguageStore, r as reactExports, j as jsxRuntimeExports, L as Layout, B as Button, X, m as Badge, I as Input } from "./index-BUVIgngH.js";
import { L as Label } from "./label-BTY_QCm0.js";
import { P as Plus } from "./plus-DMsGFanj.js";
import { P as Pencil } from "./pencil-CuGUdLiy.js";
import { T as Trash2 } from "./trash-2-BRLnMANv.js";
import "./index-ob0xpmgs.js";
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
      d: "M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",
      key: "169xi5"
    }
  ],
  ["path", { d: "M15 5.764v15", key: "1pn4in" }],
  ["path", { d: "M9 3.236v15", key: "1uimfh" }]
];
const Map = createLucideIcon("map", __iconNode);
const BOUNDARY_TYPE_LABELS = {
  farm_field: { en: "Farm Field", sw: "Shamba" },
  grazing_zone: { en: "Grazing Zone", sw: "Malisho" },
  orchard: { en: "Orchard", sw: "Bustani" },
  water_source: { en: "Water Source", sw: "Chanzo cha Maji" },
  other: { en: "Other", sw: "Nyingine" }
};
const PRESET_COLORS = [
  "#22c55e",
  "#f59e0b",
  "#8b5cf6",
  "#38bdf8",
  "#f43f5e",
  "#64748b"
];
const BOUNDARY_COLORS = {
  farm_field: "#22c55e",
  grazing_zone: "#f59e0b",
  orchard: "#8b5cf6",
  water_source: "#38bdf8",
  other: "#94a3b8"
};
const INITIAL_BOUNDARIES = [
  {
    id: "b1",
    userId: "u1",
    name: "North Field",
    boundaryType: "farm_field",
    coordinates: [
      { lat: -8.912, lng: 33.4602 },
      { lat: -8.91, lng: 33.465 },
      { lat: -8.914, lng: 33.468 },
      { lat: -8.916, lng: 33.462 }
    ],
    areaHectares: 2.4,
    areaLabel: "N. Field",
    color: "#22c55e",
    createdAt: "2026-01-15",
    updatedAt: "2026-01-15"
  },
  {
    id: "b2",
    userId: "u1",
    name: "Cattle Grazing Zone",
    boundaryType: "grazing_zone",
    coordinates: [
      { lat: -8.92, lng: 33.458 },
      { lat: -8.918, lng: 33.468 },
      { lat: -8.924, lng: 33.472 },
      { lat: -8.926, lng: 33.462 }
    ],
    areaHectares: 5.1,
    areaLabel: "Cattle",
    color: "#f59e0b",
    createdAt: "2026-02-01",
    updatedAt: "2026-02-01"
  },
  {
    id: "b3",
    userId: "u1",
    name: "Mango Orchard",
    boundaryType: "orchard",
    coordinates: [
      { lat: -8.905, lng: 33.47 },
      { lat: -8.904, lng: 33.474 },
      { lat: -8.907, lng: 33.476 },
      { lat: -8.908, lng: 33.472 }
    ],
    areaHectares: 1.2,
    areaLabel: "Mango",
    color: "#8b5cf6",
    createdAt: "2026-03-10",
    updatedAt: "2026-03-10"
  }
];
const EMPTY_FORM = {
  name: "",
  boundaryType: "farm_field",
  areaLabel: "",
  color: PRESET_COLORS[0],
  coords: [
    { lat: "", lng: "" },
    { lat: "", lng: "" },
    { lat: "", lng: "" },
    { lat: "", lng: "" }
  ]
};
function estimateHectares(coords) {
  const valid = coords.filter((c) => c.lat !== "" && c.lng !== "");
  if (valid.length < 3) return 0;
  const lats = valid.map((c) => Number.parseFloat(c.lat));
  const lngs = valid.map((c) => Number.parseFloat(c.lng));
  const dLat = (Math.max(...lats) - Math.min(...lats)) * 111e3;
  const dLng = (Math.max(...lngs) - Math.min(...lngs)) * 111e3 * Math.cos(lats[0] * Math.PI / 180);
  return Math.round(dLat * dLng / 1e4 * 10) / 10;
}
function toSvgPoint(lat, lng, latMin, latRange, lngMin, lngRange, W, H) {
  const x = (lng - lngMin) / lngRange * W;
  const y = H - (lat - latMin) / latRange * H;
  return { x, y };
}
function FarmSvgView({ boundaries, selected, onSelect }) {
  const W = 600;
  const H = 340;
  const padding = 24;
  const allCoords = boundaries.flatMap((b) => b.coordinates);
  if (allCoords.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full flex items-center justify-center flex-col gap-2 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Map, { size: 48, className: "opacity-20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "No boundaries to display" })
    ] });
  }
  const lats = allCoords.map((c) => c.lat);
  const lngs = allCoords.map((c) => c.lng);
  const latMin = Math.min(...lats) - 2e-3;
  const latMax = Math.max(...lats) + 2e-3;
  const lngMin = Math.min(...lngs) - 3e-3;
  const lngMax = Math.max(...lngs) + 3e-3;
  const latRange = latMax - latMin;
  const lngRange = lngMax - lngMin;
  const vW = W - padding * 2;
  const vH = H - padding * 2;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: `0 0 ${W} ${H}`,
      className: "w-full h-full rounded-xl",
      style: { background: "linear-gradient(135deg,#e8f5e9 0%,#f1f8e9 100%)" },
      role: "img",
      "aria-label": "Farm boundary map",
      children: [
        [0.25, 0.5, 0.75].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "line",
            {
              x1: padding + vW * f,
              y1: padding,
              x2: padding + vW * f,
              y2: H - padding,
              stroke: "#c8e6c9",
              strokeWidth: 0.5,
              strokeDasharray: "4 4"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "line",
            {
              x1: padding,
              y1: padding + vH * f,
              x2: W - padding,
              y2: padding + vH * f,
              stroke: "#c8e6c9",
              strokeWidth: 0.5,
              strokeDasharray: "4 4"
            }
          )
        ] }, f)),
        boundaries.map((b) => {
          if (b.coordinates.length < 3) return null;
          const pts = b.coordinates.map((c) => {
            const p = toSvgPoint(
              c.lat,
              c.lng,
              latMin,
              latRange,
              lngMin,
              lngRange,
              vW,
              vH
            );
            return `${p.x + padding},${p.y + padding}`;
          }).join(" ");
          const color = b.color ?? BOUNDARY_COLORS[b.boundaryType];
          const isSelected = selected === b.id;
          const cx = b.coordinates.reduce((s, c) => s + c.lng, 0) / b.coordinates.length;
          const cy = b.coordinates.reduce((s, c) => s + c.lat, 0) / b.coordinates.length;
          const svgC = toSvgPoint(
            cy,
            cx,
            latMin,
            latRange,
            lngMin,
            lngRange,
            vW,
            vH
          );
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "g",
            {
              onClick: () => onSelect(b.id),
              style: { cursor: "pointer" },
              onKeyDown: (e) => {
                if (e.key === "Enter") onSelect(b.id);
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "polygon",
                  {
                    points: pts,
                    fill: color,
                    fillOpacity: isSelected ? 0.55 : 0.35,
                    stroke: color,
                    strokeWidth: isSelected ? 2.5 : 1.5
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "text",
                  {
                    x: svgC.x + padding,
                    y: svgC.y + padding + 4,
                    textAnchor: "middle",
                    fontSize: 10,
                    fontWeight: 600,
                    fill: color,
                    stroke: "white",
                    strokeWidth: 2.5,
                    paintOrder: "stroke",
                    children: b.areaLabel ?? b.name
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "text",
                  {
                    x: svgC.x + padding,
                    y: svgC.y + padding + 17,
                    textAnchor: "middle",
                    fontSize: 9,
                    fill: "#555",
                    stroke: "white",
                    strokeWidth: 2,
                    paintOrder: "stroke",
                    children: [
                      b.areaHectares,
                      "ha"
                    ]
                  }
                )
              ]
            },
            b.id
          );
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "marker",
          {
            id: "arrow",
            markerWidth: "6",
            markerHeight: "6",
            refX: "3",
            refY: "6",
            orient: "auto",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M0,0 L6,0 L3,6 z", fill: "#78909c" })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: W - 30,
            y: 26,
            fontSize: 10,
            fill: "#78909c",
            fontWeight: 700,
            textAnchor: "middle",
            children: "N"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: W - 30,
            y1: 28,
            x2: W - 30,
            y2: 40,
            stroke: "#78909c",
            strokeWidth: 1.5,
            markerEnd: "url(#arrow)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("text", { x: 20, y: H - 8, fontSize: 9, fill: "#78909c", children: [
          "≈",
          Math.round(latRange * 111 * 1e3),
          "m"
        ] })
      ]
    }
  );
}
function FarmMapPage() {
  const { t, language } = useLanguageStore();
  const [boundaries, setBoundaries] = reactExports.useState(INITIAL_BOUNDARIES);
  const [selected, setSelected] = reactExports.useState(null);
  const [showModal, setShowModal] = reactExports.useState(false);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const [estimatedArea, setEstimatedArea] = reactExports.useState(null);
  const [deleteId, setDeleteId] = reactExports.useState(null);
  const totalArea = boundaries.reduce((s, b) => s + (b.areaHectares ?? 0), 0);
  const L = (en, sw) => language === "sw" ? sw : en;
  function openAdd() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setEstimatedArea(null);
    setShowModal(true);
  }
  function openEdit(b) {
    setEditingId(b.id);
    setForm({
      name: b.name,
      boundaryType: b.boundaryType,
      areaLabel: b.areaLabel ?? "",
      color: b.color ?? BOUNDARY_COLORS[b.boundaryType],
      coords: b.coordinates.length > 0 ? b.coordinates.map((c) => ({
        lat: String(c.lat),
        lng: String(c.lng)
      })) : [
        { lat: "", lng: "" },
        { lat: "", lng: "" },
        { lat: "", lng: "" },
        { lat: "", lng: "" }
      ]
    });
    setEstimatedArea(b.areaHectares ?? null);
    setShowModal(true);
  }
  function closeModal() {
    setShowModal(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
    setEstimatedArea(null);
  }
  function handleCoordChange(idx, field, val) {
    setForm((f) => {
      const coords = [...f.coords];
      coords[idx] = { ...coords[idx], [field]: val };
      return { ...f, coords };
    });
    setEstimatedArea(null);
  }
  function addCoordRow() {
    setForm((f) => ({ ...f, coords: [...f.coords, { lat: "", lng: "" }] }));
  }
  function removeCoordRow(idx) {
    setForm((f) => ({ ...f, coords: f.coords.filter((_, i) => i !== idx) }));
  }
  function handleEstimate() {
    setEstimatedArea(estimateHectares(form.coords));
  }
  function handleSave() {
    if (!form.name.trim()) return;
    const ha = estimatedArea ?? estimateHectares(form.coords);
    const validCoords = form.coords.filter((c) => c.lat !== "" && c.lng !== "").map((c) => ({
      lat: Number.parseFloat(c.lat),
      lng: Number.parseFloat(c.lng)
    }));
    if (editingId) {
      setBoundaries(
        (bs) => bs.map(
          (b) => b.id === editingId ? {
            ...b,
            name: form.name,
            boundaryType: form.boundaryType,
            areaLabel: form.areaLabel || form.name,
            color: form.color,
            coordinates: validCoords,
            areaHectares: ha,
            updatedAt: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
          } : b
        )
      );
    } else {
      const newB = {
        id: `b${Date.now()}`,
        userId: "u1",
        name: form.name,
        boundaryType: form.boundaryType,
        areaLabel: form.areaLabel || form.name,
        color: form.color,
        coordinates: validCoords,
        areaHectares: ha,
        createdAt: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
        updatedAt: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
      };
      setBoundaries((bs) => [...bs, newB]);
    }
    closeModal();
  }
  function confirmDelete() {
    if (deleteId) {
      setBoundaries((bs) => bs.filter((b) => b.id !== deleteId));
      if (selected === deleteId) setSelected(null);
      setDeleteId(null);
    }
  }
  const selectedBoundary = boundaries.find((b) => b.id === selected);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background pb-8",
      "data-ocid": "farm_map.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b px-4 py-4 sticky top-0 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between max-w-3xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Map, { className: "text-primary", size: 22 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold text-foreground", children: t("farm_map") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              onClick: openAdd,
              "data-ocid": "farm_map.draw_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 15, className: "mr-1" }),
                L("Add Boundary", "Ongeza Mipaka")
              ]
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-5 space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border p-3 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-primary", children: totalArea.toFixed(1) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: L("Total Hectares", "Jumla ya Hekta") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border p-3 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground", children: boundaries.length }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: L("Boundaries", "Mipaka") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border p-3 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-emerald-600", children: boundaries.filter((b) => b.boundaryType === "farm_field").length }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: L("Farm Fields", "Mashamba") })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "bg-card rounded-xl border overflow-hidden",
              style: { height: 340 },
              "data-ocid": "farm_map.svg_view",
              children: boundaries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full flex items-center justify-center flex-col gap-3 text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Map, { size: 48, className: "opacity-30" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: t("no_boundaries") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", children: t("draw_first_boundary") })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                FarmSvgView,
                {
                  boundaries,
                  selected,
                  onSelect: (id) => setSelected(selected === id ? null : id)
                }
              )
            }
          ),
          selectedBoundary && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-primary/5 border border-primary/30 rounded-xl p-4",
              "data-ocid": "farm_map.selected_detail",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-4 h-4 rounded",
                        style: {
                          backgroundColor: selectedBoundary.color ?? BOUNDARY_COLORS[selectedBoundary.boundaryType]
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: selectedBoundary.name })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setSelected(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16, className: "text-muted-foreground" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 grid grid-cols-3 gap-3 text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: L("Type", "Aina") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs mt-0.5", children: BOUNDARY_TYPE_LABELS[selectedBoundary.boundaryType][language] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("area_hectares") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-foreground", children: [
                      selectedBoundary.areaHectares ?? "—",
                      " ha"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: L("Coord Points", "Alama") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground", children: selectedBoundary.coordinates.length })
                  ] })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide", children: L("Legend", "Mwongozo") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3", children: Object.entries(BOUNDARY_TYPE_LABELS).map(([type, labels]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-3 h-3 rounded-sm",
                  style: { backgroundColor: BOUNDARY_COLORS[type] }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: labels[language] })
            ] }, type)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
              L("Saved Boundaries", "Mipaka Iliyohifadhiwa"),
              " (",
              boundaries.length,
              ")"
            ] }),
            boundaries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-muted/40 rounded-xl border-dashed border-2 border-muted p-8 text-center",
                "data-ocid": "farm_map.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Map,
                    {
                      size: 32,
                      className: "mx-auto text-muted-foreground mb-2"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: t("no_boundaries") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: t("draw_first_boundary") })
                ]
              }
            ) : boundaries.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `bg-card rounded-xl border p-3 flex items-center justify-between transition-colors cursor-pointer ${selected === b.id ? "border-primary bg-primary/5" : "hover:border-primary/40"}`,
                onClick: () => setSelected(selected === b.id ? null : b.id),
                onKeyDown: (e) => {
                  if (e.key === "Enter" || e.key === " ")
                    setSelected(selected === b.id ? null : b.id);
                },
                "data-ocid": `farm_map.boundary.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-5 h-5 rounded shrink-0",
                        style: {
                          backgroundColor: b.color ?? BOUNDARY_COLORS[b.boundaryType]
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: b.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                        b.areaHectares ?? "—",
                        " ha · ",
                        b.createdAt
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "secondary",
                        className: "text-xs hidden sm:inline-flex",
                        children: BOUNDARY_TYPE_LABELS[b.boundaryType][language]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "p-1.5 rounded hover:bg-accent",
                        onClick: (e) => {
                          e.stopPropagation();
                          openEdit(b);
                        },
                        "aria-label": "Edit",
                        "data-ocid": `farm_map.edit_button.${i + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { size: 13, className: "text-muted-foreground" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "p-1.5 rounded hover:bg-destructive/10",
                        onClick: (e) => {
                          e.stopPropagation();
                          setDeleteId(b.id);
                        },
                        "aria-label": "Delete",
                        "data-ocid": `farm_map.delete_button.${i + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 13, className: "text-rose-500" })
                      }
                    )
                  ] })
                ]
              },
              b.id
            ))
          ] })
        ] }),
        showModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4",
            "data-ocid": "farm_map.dialog",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl w-full max-w-md max-h-[92vh] overflow-y-auto shadow-xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 pt-5 pb-3 border-b", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-foreground text-base", children: editingId ? L("Edit Boundary", "Hariri Mipaka") : L("Add Boundary", "Ongeza Mipaka") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: closeModal,
                    "data-ocid": "farm_map.close_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18, className: "text-muted-foreground" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold", children: t("boundary_name") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      placeholder: L(
                        "e.g. North Field",
                        "mf. Shamba la Kaskazini"
                      ),
                      value: form.name,
                      onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
                      "data-ocid": "farm_map.name.input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold", children: t("boundary_type") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: Object.entries(BOUNDARY_TYPE_LABELS).map(([type, labels]) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setForm((f) => ({
                        ...f,
                        boundaryType: type,
                        color: BOUNDARY_COLORS[type]
                      })),
                      className: `px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${form.boundaryType === type ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground border-transparent hover:border-primary/40"}`,
                      "data-ocid": `farm_map.type.${type}`,
                      children: labels[language]
                    },
                    type
                  )) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold", children: L(
                    "Area Label (shown on map)",
                    "Lebo ya Eneo (inaonekana kwenye ramani)"
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      placeholder: L(
                        "Short label, e.g. N.Field",
                        "Lebo fupi, mf. Shamba N."
                      ),
                      value: form.areaLabel,
                      onChange: (e) => setForm((f) => ({ ...f, areaLabel: e.target.value })),
                      "data-ocid": "farm_map.area_label.input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold", children: L("Boundary Color", "Rangi ya Mipaka") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: PRESET_COLORS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setForm((f) => ({ ...f, color: c })),
                      className: `w-7 h-7 rounded-full border-2 transition-transform ${form.color === c ? "scale-125 border-foreground" : "border-transparent"}`,
                      style: { backgroundColor: c },
                      "aria-label": c
                    },
                    c
                  )) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold", children: L("Coordinates (Lat / Lng)", "Kuratibu (Lat / Lng)") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: addCoordRow,
                        className: "text-xs text-primary hover:underline",
                        children: [
                          "+ ",
                          L("Add point", "Ongeza alama")
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: form.coords.map((c, ci) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-2",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground w-5 shrink-0", children: [
                          ci + 1,
                          "."
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Input,
                          {
                            placeholder: "Lat (-8.91)",
                            value: c.lat,
                            onChange: (e) => handleCoordChange(ci, "lat", e.target.value),
                            className: "h-8 text-xs",
                            "data-ocid": `farm_map.coord_lat.${ci + 1}`
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Input,
                          {
                            placeholder: "Lng (33.46)",
                            value: c.lng,
                            onChange: (e) => handleCoordChange(ci, "lng", e.target.value),
                            className: "h-8 text-xs",
                            "data-ocid": `farm_map.coord_lng.${ci + 1}`
                          }
                        ),
                        form.coords.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => removeCoordRow(ci),
                            className: "text-rose-500 hover:text-rose-700 shrink-0",
                            "aria-label": "Remove point",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 })
                          }
                        )
                      ]
                    },
                    String(ci) + c.lat + c.lng
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "sm",
                        variant: "outline",
                        type: "button",
                        onClick: handleEstimate,
                        "data-ocid": "farm_map.estimate_button",
                        children: L("Calculate Area", "Hesabu Eneo")
                      }
                    ),
                    estimatedArea !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-primary", children: [
                      "≈ ",
                      estimatedArea,
                      " ha"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      className: "flex-1",
                      onClick: closeModal,
                      "data-ocid": "farm_map.cancel_button",
                      children: t("cancel")
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      className: "flex-1",
                      onClick: handleSave,
                      disabled: !form.name.trim(),
                      "data-ocid": "farm_map.save_button",
                      children: t("save_boundary")
                    }
                  )
                ] })
              ] })
            ] })
          }
        ),
        deleteId && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4",
            "data-ocid": "farm_map.delete_dialog",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl w-full max-w-xs p-6 shadow-xl space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-bold text-foreground", children: t("delete_boundary") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: L(
                "Are you sure you want to delete this boundary? This cannot be undone.",
                "Una uhakika wa kufuta mipaka hii? Hatua hii haiwezi kurudishwa."
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    className: "flex-1",
                    onClick: () => setDeleteId(null),
                    "data-ocid": "farm_map.delete_cancel",
                    children: t("cancel")
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "destructive",
                    className: "flex-1",
                    onClick: confirmDelete,
                    "data-ocid": "farm_map.delete_confirm",
                    children: t("delete")
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
  FarmMapPage as default
};
