import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguageStore } from "@/store/languageStore";
import type { BoundaryType, FarmBoundary } from "@/types";
import { Map as MapIcon, Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────────
interface Coord {
  lat: string;
  lng: string;
}

interface BoundaryForm {
  name: string;
  boundaryType: BoundaryType;
  areaLabel: string;
  color: string;
  coords: Coord[];
}

// ── Constants ──────────────────────────────────────────────────────────────────
const BOUNDARY_TYPE_LABELS: Record<BoundaryType, { en: string; sw: string }> = {
  farm_field: { en: "Farm Field", sw: "Shamba" },
  grazing_zone: { en: "Grazing Zone", sw: "Malisho" },
  orchard: { en: "Orchard", sw: "Bustani" },
  water_source: { en: "Water Source", sw: "Chanzo cha Maji" },
  other: { en: "Other", sw: "Nyingine" },
};

const PRESET_COLORS = [
  "#22c55e",
  "#f59e0b",
  "#8b5cf6",
  "#38bdf8",
  "#f43f5e",
  "#64748b",
];

const BOUNDARY_COLORS: Record<BoundaryType, string> = {
  farm_field: "#22c55e",
  grazing_zone: "#f59e0b",
  orchard: "#8b5cf6",
  water_source: "#38bdf8",
  other: "#94a3b8",
};

const INITIAL_BOUNDARIES: FarmBoundary[] = [
  {
    id: "b1",
    userId: "u1",
    name: "North Field",
    boundaryType: "farm_field",
    coordinates: [
      { lat: -8.912, lng: 33.4602 },
      { lat: -8.91, lng: 33.465 },
      { lat: -8.914, lng: 33.468 },
      { lat: -8.916, lng: 33.462 },
    ],
    areaHectares: 2.4,
    areaLabel: "N. Field",
    color: "#22c55e",
    createdAt: "2026-01-15",
    updatedAt: "2026-01-15",
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
      { lat: -8.926, lng: 33.462 },
    ],
    areaHectares: 5.1,
    areaLabel: "Cattle",
    color: "#f59e0b",
    createdAt: "2026-02-01",
    updatedAt: "2026-02-01",
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
      { lat: -8.908, lng: 33.472 },
    ],
    areaHectares: 1.2,
    areaLabel: "Mango",
    color: "#8b5cf6",
    createdAt: "2026-03-10",
    updatedAt: "2026-03-10",
  },
];

const EMPTY_FORM: BoundaryForm = {
  name: "",
  boundaryType: "farm_field",
  areaLabel: "",
  color: PRESET_COLORS[0],
  coords: [
    { lat: "", lng: "" },
    { lat: "", lng: "" },
    { lat: "", lng: "" },
    { lat: "", lng: "" },
  ],
};

// ── Helpers ────────────────────────────────────────────────────────────────────
function estimateHectares(coords: Coord[]): number {
  const valid = coords.filter((c) => c.lat !== "" && c.lng !== "");
  if (valid.length < 3) return 0;
  const lats = valid.map((c) => Number.parseFloat(c.lat));
  const lngs = valid.map((c) => Number.parseFloat(c.lng));
  const dLat = (Math.max(...lats) - Math.min(...lats)) * 111000;
  const dLng =
    (Math.max(...lngs) - Math.min(...lngs)) *
    111000 *
    Math.cos((lats[0] * Math.PI) / 180);
  return Math.round(((dLat * dLng) / 10000) * 10) / 10;
}

function toSvgPoint(
  lat: number,
  lng: number,
  latMin: number,
  latRange: number,
  lngMin: number,
  lngRange: number,
  W: number,
  H: number,
) {
  const x = ((lng - lngMin) / lngRange) * W;
  const y = H - ((lat - latMin) / latRange) * H;
  return { x, y };
}

interface FarmViewProps {
  boundaries: FarmBoundary[];
  selected: string | null;
  onSelect: (id: string) => void;
}

function FarmSvgView({ boundaries, selected, onSelect }: FarmViewProps) {
  const W = 600;
  const H = 340;
  const padding = 24;

  const allCoords = boundaries.flatMap((b) => b.coordinates);
  if (allCoords.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center flex-col gap-2 text-muted-foreground">
        <MapIcon size={48} className="opacity-20" />
        <span className="text-sm">No boundaries to display</span>
      </div>
    );
  }

  const lats = allCoords.map((c) => c.lat);
  const lngs = allCoords.map((c) => c.lng);
  const latMin = Math.min(...lats) - 0.002;
  const latMax = Math.max(...lats) + 0.002;
  const lngMin = Math.min(...lngs) - 0.003;
  const lngMax = Math.max(...lngs) + 0.003;
  const latRange = latMax - latMin;
  const lngRange = lngMax - lngMin;
  const vW = W - padding * 2;
  const vH = H - padding * 2;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-full rounded-xl"
      style={{ background: "linear-gradient(135deg,#e8f5e9 0%,#f1f8e9 100%)" }}
      role="img"
      aria-label="Farm boundary map"
    >
      {[0.25, 0.5, 0.75].map((f) => (
        <g key={f}>
          <line
            x1={padding + vW * f}
            y1={padding}
            x2={padding + vW * f}
            y2={H - padding}
            stroke="#c8e6c9"
            strokeWidth={0.5}
            strokeDasharray="4 4"
          />
          <line
            x1={padding}
            y1={padding + vH * f}
            x2={W - padding}
            y2={padding + vH * f}
            stroke="#c8e6c9"
            strokeWidth={0.5}
            strokeDasharray="4 4"
          />
        </g>
      ))}

      {boundaries.map((b) => {
        if (b.coordinates.length < 3) return null;
        const pts = b.coordinates
          .map((c) => {
            const p = toSvgPoint(
              c.lat,
              c.lng,
              latMin,
              latRange,
              lngMin,
              lngRange,
              vW,
              vH,
            );
            return `${p.x + padding},${p.y + padding}`;
          })
          .join(" ");
        const color = b.color ?? BOUNDARY_COLORS[b.boundaryType];
        const isSelected = selected === b.id;
        const cx =
          b.coordinates.reduce((s, c) => s + c.lng, 0) / b.coordinates.length;
        const cy =
          b.coordinates.reduce((s, c) => s + c.lat, 0) / b.coordinates.length;
        const svgC = toSvgPoint(
          cy,
          cx,
          latMin,
          latRange,
          lngMin,
          lngRange,
          vW,
          vH,
        );
        return (
          <g
            key={b.id}
            onClick={() => onSelect(b.id)}
            style={{ cursor: "pointer" }}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSelect(b.id);
            }}
          >
            <polygon
              points={pts}
              fill={color}
              fillOpacity={isSelected ? 0.55 : 0.35}
              stroke={color}
              strokeWidth={isSelected ? 2.5 : 1.5}
            />
            <text
              x={svgC.x + padding}
              y={svgC.y + padding + 4}
              textAnchor="middle"
              fontSize={10}
              fontWeight={600}
              fill={color}
              stroke="white"
              strokeWidth={2.5}
              paintOrder="stroke"
            >
              {b.areaLabel ?? b.name}
            </text>
            <text
              x={svgC.x + padding}
              y={svgC.y + padding + 17}
              textAnchor="middle"
              fontSize={9}
              fill="#555"
              stroke="white"
              strokeWidth={2}
              paintOrder="stroke"
            >
              {b.areaHectares}ha
            </text>
          </g>
        );
      })}

      <defs>
        <marker
          id="arrow"
          markerWidth="6"
          markerHeight="6"
          refX="3"
          refY="6"
          orient="auto"
        >
          <path d="M0,0 L6,0 L3,6 z" fill="#78909c" />
        </marker>
      </defs>
      <text
        x={W - 30}
        y={26}
        fontSize={10}
        fill="#78909c"
        fontWeight={700}
        textAnchor="middle"
      >
        N
      </text>
      <line
        x1={W - 30}
        y1={28}
        x2={W - 30}
        y2={40}
        stroke="#78909c"
        strokeWidth={1.5}
        markerEnd="url(#arrow)"
      />
      <text x={20} y={H - 8} fontSize={9} fill="#78909c">
        ≈{Math.round(latRange * 111 * 1000)}m
      </text>
    </svg>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function FarmMapPage() {
  const { t, language } = useLanguageStore();
  const [boundaries, setBoundaries] =
    useState<FarmBoundary[]>(INITIAL_BOUNDARIES);
  const [selected, setSelected] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<BoundaryForm>(EMPTY_FORM);
  const [estimatedArea, setEstimatedArea] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const totalArea = boundaries.reduce((s, b) => s + (b.areaHectares ?? 0), 0);
  const L = (en: string, sw: string) => (language === "sw" ? sw : en);

  function openAdd() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setEstimatedArea(null);
    setShowModal(true);
  }

  function openEdit(b: FarmBoundary) {
    setEditingId(b.id);
    setForm({
      name: b.name,
      boundaryType: b.boundaryType,
      areaLabel: b.areaLabel ?? "",
      color: b.color ?? BOUNDARY_COLORS[b.boundaryType],
      coords:
        b.coordinates.length > 0
          ? b.coordinates.map((c) => ({
              lat: String(c.lat),
              lng: String(c.lng),
            }))
          : [
              { lat: "", lng: "" },
              { lat: "", lng: "" },
              { lat: "", lng: "" },
              { lat: "", lng: "" },
            ],
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

  function handleCoordChange(idx: number, field: "lat" | "lng", val: string) {
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

  function removeCoordRow(idx: number) {
    setForm((f) => ({ ...f, coords: f.coords.filter((_, i) => i !== idx) }));
  }

  function handleEstimate() {
    setEstimatedArea(estimateHectares(form.coords));
  }

  function handleSave() {
    if (!form.name.trim()) return;
    const ha = estimatedArea ?? estimateHectares(form.coords);
    const validCoords = form.coords
      .filter((c) => c.lat !== "" && c.lng !== "")
      .map((c) => ({
        lat: Number.parseFloat(c.lat),
        lng: Number.parseFloat(c.lng),
      }));

    if (editingId) {
      setBoundaries((bs) =>
        bs.map((b) =>
          b.id === editingId
            ? {
                ...b,
                name: form.name,
                boundaryType: form.boundaryType,
                areaLabel: form.areaLabel || form.name,
                color: form.color,
                coordinates: validCoords,
                areaHectares: ha,
                updatedAt: new Date().toISOString().split("T")[0],
              }
            : b,
        ),
      );
    } else {
      const newB: FarmBoundary = {
        id: `b${Date.now()}`,
        userId: "u1",
        name: form.name,
        boundaryType: form.boundaryType,
        areaLabel: form.areaLabel || form.name,
        color: form.color,
        coordinates: validCoords,
        areaHectares: ha,
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
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

  return (
    <Layout>
      <div
        className="min-h-screen bg-background pb-8"
        data-ocid="farm_map.page"
      >
        {/* Header */}
        <div className="bg-card border-b px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            <div className="flex items-center gap-2">
              <MapIcon className="text-primary" size={22} />
              <h1 className="text-lg font-bold text-foreground">
                {t("farm_map")}
              </h1>
            </div>
            <Button
              size="sm"
              onClick={openAdd}
              data-ocid="farm_map.draw_button"
            >
              <Plus size={15} className="mr-1" />
              {L("Add Boundary", "Ongeza Mipaka")}
            </Button>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-5 space-y-5">
          {/* Summary strip */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-card rounded-xl border p-3 text-center">
              <p className="text-2xl font-bold text-primary">
                {totalArea.toFixed(1)}
              </p>
              <p className="text-xs text-muted-foreground">
                {L("Total Hectares", "Jumla ya Hekta")}
              </p>
            </div>
            <div className="bg-card rounded-xl border p-3 text-center">
              <p className="text-2xl font-bold text-foreground">
                {boundaries.length}
              </p>
              <p className="text-xs text-muted-foreground">
                {L("Boundaries", "Mipaka")}
              </p>
            </div>
            <div className="bg-card rounded-xl border p-3 text-center">
              <p className="text-2xl font-bold text-emerald-600">
                {
                  boundaries.filter((b) => b.boundaryType === "farm_field")
                    .length
                }
              </p>
              <p className="text-xs text-muted-foreground">
                {L("Farm Fields", "Mashamba")}
              </p>
            </div>
          </div>

          {/* SVG Map Viewer */}
          <div
            className="bg-card rounded-xl border overflow-hidden"
            style={{ height: 340 }}
            data-ocid="farm_map.svg_view"
          >
            {boundaries.length === 0 ? (
              <div className="h-full flex items-center justify-center flex-col gap-3 text-muted-foreground">
                <MapIcon size={48} className="opacity-30" />
                <p className="text-sm font-medium">{t("no_boundaries")}</p>
                <p className="text-xs">{t("draw_first_boundary")}</p>
              </div>
            ) : (
              <FarmSvgView
                boundaries={boundaries}
                selected={selected}
                onSelect={(id) => setSelected(selected === id ? null : id)}
              />
            )}
          </div>

          {/* Selected detail panel */}
          {selectedBoundary && (
            <div
              className="bg-primary/5 border border-primary/30 rounded-xl p-4"
              data-ocid="farm_map.selected_detail"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded"
                    style={{
                      backgroundColor:
                        selectedBoundary.color ??
                        BOUNDARY_COLORS[selectedBoundary.boundaryType],
                    }}
                  />
                  <p className="font-semibold text-foreground">
                    {selectedBoundary.name}
                  </p>
                </div>
                <button type="button" onClick={() => setSelected(null)}>
                  <X size={16} className="text-muted-foreground" />
                </button>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="text-xs text-muted-foreground">
                    {L("Type", "Aina")}
                  </p>
                  <Badge variant="secondary" className="text-xs mt-0.5">
                    {
                      BOUNDARY_TYPE_LABELS[selectedBoundary.boundaryType][
                        language as "en" | "sw"
                      ]
                    }
                  </Badge>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    {t("area_hectares")}
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    {selectedBoundary.areaHectares ?? "—"} ha
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    {L("Coord Points", "Alama")}
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    {selectedBoundary.coordinates.length}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="bg-card rounded-xl border p-3">
            <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
              {L("Legend", "Mwongozo")}
            </p>
            <div className="flex flex-wrap gap-3">
              {(
                Object.entries(BOUNDARY_TYPE_LABELS) as [
                  BoundaryType,
                  { en: string; sw: string },
                ][]
              ).map(([type, labels]) => (
                <div key={type} className="flex items-center gap-1.5">
                  <div
                    className="w-3 h-3 rounded-sm"
                    style={{ backgroundColor: BOUNDARY_COLORS[type] }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {labels[language as "en" | "sw"]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Boundary list */}
          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground">
              {L("Saved Boundaries", "Mipaka Iliyohifadhiwa")} (
              {boundaries.length})
            </p>
            {boundaries.length === 0 ? (
              <div
                className="bg-muted/40 rounded-xl border-dashed border-2 border-muted p-8 text-center"
                data-ocid="farm_map.empty_state"
              >
                <MapIcon
                  size={32}
                  className="mx-auto text-muted-foreground mb-2"
                />
                <p className="text-sm text-muted-foreground">
                  {t("no_boundaries")}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {t("draw_first_boundary")}
                </p>
              </div>
            ) : (
              boundaries.map((b, i) => (
                <div
                  key={b.id}
                  className={`bg-card rounded-xl border p-3 flex items-center justify-between transition-colors cursor-pointer ${selected === b.id ? "border-primary bg-primary/5" : "hover:border-primary/40"}`}
                  onClick={() => setSelected(selected === b.id ? null : b.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      setSelected(selected === b.id ? null : b.id);
                  }}
                  data-ocid={`farm_map.boundary.${i + 1}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-5 h-5 rounded shrink-0"
                      style={{
                        backgroundColor:
                          b.color ?? BOUNDARY_COLORS[b.boundaryType],
                      }}
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {b.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {b.areaHectares ?? "—"} ha · {b.createdAt}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge
                      variant="secondary"
                      className="text-xs hidden sm:inline-flex"
                    >
                      {
                        BOUNDARY_TYPE_LABELS[b.boundaryType][
                          language as "en" | "sw"
                        ]
                      }
                    </Badge>
                    <button
                      type="button"
                      className="p-1.5 rounded hover:bg-accent"
                      onClick={(e) => {
                        e.stopPropagation();
                        openEdit(b);
                      }}
                      aria-label="Edit"
                      data-ocid={`farm_map.edit_button.${i + 1}`}
                    >
                      <Pencil size={13} className="text-muted-foreground" />
                    </button>
                    <button
                      type="button"
                      className="p-1.5 rounded hover:bg-destructive/10"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteId(b.id);
                      }}
                      aria-label="Delete"
                      data-ocid={`farm_map.delete_button.${i + 1}`}
                    >
                      <Trash2 size={13} className="text-rose-500" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Add / Edit Modal */}
        {showModal && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4"
            data-ocid="farm_map.dialog"
          >
            <div className="bg-card rounded-2xl w-full max-w-md max-h-[92vh] overflow-y-auto shadow-xl">
              <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b">
                <h2 className="font-bold text-foreground text-base">
                  {editingId
                    ? L("Edit Boundary", "Hariri Mipaka")
                    : L("Add Boundary", "Ongeza Mipaka")}
                </h2>
                <button
                  type="button"
                  onClick={closeModal}
                  data-ocid="farm_map.close_button"
                >
                  <X size={18} className="text-muted-foreground" />
                </button>
              </div>

              <div className="px-5 py-4 space-y-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">
                    {t("boundary_name")}
                  </Label>
                  <Input
                    placeholder={L(
                      "e.g. North Field",
                      "mf. Shamba la Kaskazini",
                    )}
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    data-ocid="farm_map.name.input"
                  />
                </div>

                {/* Type */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">
                    {t("boundary_type")}
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {(
                      Object.entries(BOUNDARY_TYPE_LABELS) as [
                        BoundaryType,
                        { en: string; sw: string },
                      ][]
                    ).map(([type, labels]) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() =>
                          setForm((f) => ({
                            ...f,
                            boundaryType: type,
                            color: BOUNDARY_COLORS[type],
                          }))
                        }
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                          form.boundaryType === type
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-muted text-muted-foreground border-transparent hover:border-primary/40"
                        }`}
                        data-ocid={`farm_map.type.${type}`}
                      >
                        {labels[language as "en" | "sw"]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Area Label */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">
                    {L(
                      "Area Label (shown on map)",
                      "Lebo ya Eneo (inaonekana kwenye ramani)",
                    )}
                  </Label>
                  <Input
                    placeholder={L(
                      "Short label, e.g. N.Field",
                      "Lebo fupi, mf. Shamba N.",
                    )}
                    value={form.areaLabel}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, areaLabel: e.target.value }))
                    }
                    data-ocid="farm_map.area_label.input"
                  />
                </div>

                {/* Color picker */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">
                    {L("Boundary Color", "Rangi ya Mipaka")}
                  </Label>
                  <div className="flex gap-2">
                    {PRESET_COLORS.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, color: c }))}
                        className={`w-7 h-7 rounded-full border-2 transition-transform ${
                          form.color === c
                            ? "scale-125 border-foreground"
                            : "border-transparent"
                        }`}
                        style={{ backgroundColor: c }}
                        aria-label={c}
                      />
                    ))}
                  </div>
                </div>

                {/* Coordinates */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-semibold">
                      {L("Coordinates (Lat / Lng)", "Kuratibu (Lat / Lng)")}
                    </Label>
                    <button
                      type="button"
                      onClick={addCoordRow}
                      className="text-xs text-primary hover:underline"
                    >
                      + {L("Add point", "Ongeza alama")}
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {form.coords.map((c, ci) => (
                      <div
                        key={String(ci) + c.lat + c.lng}
                        className="flex items-center gap-2"
                      >
                        <span className="text-xs text-muted-foreground w-5 shrink-0">
                          {ci + 1}.
                        </span>
                        <Input
                          placeholder="Lat (-8.91)"
                          value={c.lat}
                          onChange={(e) =>
                            handleCoordChange(ci, "lat", e.target.value)
                          }
                          className="h-8 text-xs"
                          data-ocid={`farm_map.coord_lat.${ci + 1}`}
                        />
                        <Input
                          placeholder="Lng (33.46)"
                          value={c.lng}
                          onChange={(e) =>
                            handleCoordChange(ci, "lng", e.target.value)
                          }
                          className="h-8 text-xs"
                          data-ocid={`farm_map.coord_lng.${ci + 1}`}
                        />
                        {form.coords.length > 3 && (
                          <button
                            type="button"
                            onClick={() => removeCoordRow(ci)}
                            className="text-rose-500 hover:text-rose-700 shrink-0"
                            aria-label="Remove point"
                          >
                            <X size={14} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 pt-1">
                    <Button
                      size="sm"
                      variant="outline"
                      type="button"
                      onClick={handleEstimate}
                      data-ocid="farm_map.estimate_button"
                    >
                      {L("Calculate Area", "Hesabu Eneo")}
                    </Button>
                    {estimatedArea !== null && (
                      <span className="text-sm font-semibold text-primary">
                        ≈ {estimatedArea} ha
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={closeModal}
                    data-ocid="farm_map.cancel_button"
                  >
                    {t("cancel")}
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={handleSave}
                    disabled={!form.name.trim()}
                    data-ocid="farm_map.save_button"
                  >
                    {t("save_boundary")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirm */}
        {deleteId && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            data-ocid="farm_map.delete_dialog"
          >
            <div className="bg-card rounded-2xl w-full max-w-xs p-6 shadow-xl space-y-4">
              <p className="text-base font-bold text-foreground">
                {t("delete_boundary")}
              </p>
              <p className="text-sm text-muted-foreground">
                {L(
                  "Are you sure you want to delete this boundary? This cannot be undone.",
                  "Una uhakika wa kufuta mipaka hii? Hatua hii haiwezi kurudishwa.",
                )}
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setDeleteId(null)}
                  data-ocid="farm_map.delete_cancel"
                >
                  {t("cancel")}
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={confirmDelete}
                  data-ocid="farm_map.delete_confirm"
                >
                  {t("delete")}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
