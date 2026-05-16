import type { TranslationKey } from "@/store/languageStore";
import { LayoutGrid, List, MapPin } from "lucide-react";

// ─── Tanzania Region Grid Layout ─────────────────────────────────────────────
// Arranged in a rough geographic grid (col, row) approximating real positions.
// Tanzania spans from the north (Kilimanjaro, Arusha) to south (Ruvuma, Mtwara)
// and west (Kigoma, Katavi) to east (Dar es Salaam, Tanga, Pwani).

interface RegionCell {
  name: string;
  col: number;
  row: number;
  abbr: string;
  nameSw: string;
}

export const TANZANIA_REGION_GRID: RegionCell[] = [
  // Row 1 — far north
  { name: "Kagera", nameSw: "Kagera", abbr: "KGR", col: 1, row: 1 },
  { name: "Mara", nameSw: "Mara", abbr: "MRA", col: 2, row: 1 },
  { name: "Arusha", nameSw: "Arusha", abbr: "ARU", col: 3, row: 1 },
  { name: "Kilimanjaro", nameSw: "Kilimanjaro", abbr: "KLM", col: 4, row: 1 },
  { name: "Tanga", nameSw: "Tanga", abbr: "TNG", col: 5, row: 1 },
  // Row 2 — north-central
  { name: "Geita", nameSw: "Geita", abbr: "GTA", col: 1, row: 2 },
  { name: "Mwanza", nameSw: "Mwanza", abbr: "MWZ", col: 2, row: 2 },
  { name: "Simiyu", nameSw: "Simiyu", abbr: "SMY", col: 3, row: 2 },
  { name: "Shinyanga", nameSw: "Shinyanga", abbr: "SHY", col: 4, row: 2 },
  { name: "Pwani", nameSw: "Pwani", abbr: "PWN", col: 5, row: 2 },
  // Row 3 — central
  { name: "Kigoma", nameSw: "Kigoma", abbr: "KGM", col: 1, row: 3 },
  { name: "Tabora", nameSw: "Tabora", abbr: "TBR", col: 2, row: 3 },
  { name: "Singida", nameSw: "Singida", abbr: "SGD", col: 3, row: 3 },
  { name: "Dodoma", nameSw: "Dodoma", abbr: "DDM", col: 4, row: 3 },
  {
    name: "Dar es Salaam",
    nameSw: "Dar es Salaam",
    abbr: "DAR",
    col: 5,
    row: 3,
  },
  // Row 4 — south-central
  { name: "Katavi", nameSw: "Katavi", abbr: "KTV", col: 1, row: 4 },
  { name: "Rukwa", nameSw: "Rukwa", abbr: "RKW", col: 2, row: 4 },
  { name: "Mbeya", nameSw: "Mbeya", abbr: "MBY", col: 3, row: 4 },
  { name: "Iringa", nameSw: "Iringa", abbr: "IRG", col: 4, row: 4 },
  { name: "Morogoro", nameSw: "Morogoro", abbr: "MRG", col: 5, row: 4 },
  // Row 5 — south
  { name: "Songwe", nameSw: "Songwe", abbr: "SGW", col: 2, row: 5 },
  { name: "Njombe", nameSw: "Njombe", abbr: "NJB", col: 3, row: 5 },
  { name: "Ruvuma", nameSw: "Ruvuma", abbr: "RVM", col: 4, row: 5 },
  { name: "Lindi", nameSw: "Lindi", abbr: "LND", col: 5, row: 5 },
  // Row 6 — far south
  { name: "Mtwara", nameSw: "Mtwara", abbr: "MTW", col: 5, row: 6 },
];

// ─── Color coding by listing count ───────────────────────────────────────────
function getTileColor(count: number, isSelected: boolean): string {
  if (isSelected)
    return "bg-primary text-primary-foreground border-primary shadow-lg scale-105";
  if (count === 0)
    return "bg-muted/50 text-muted-foreground border-border opacity-60";
  if (count <= 5)
    return "bg-accent/20 text-accent-foreground border-accent/40 hover:bg-accent/30";
  if (count <= 15)
    return "bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-700";
  return "bg-orange-100 text-orange-800 border-orange-300 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-200 dark:border-orange-700";
}

function getDotColor(count: number): string {
  if (count === 0) return "bg-muted-foreground/40";
  if (count <= 5) return "bg-accent";
  if (count <= 15) return "bg-amber-500";
  return "bg-orange-500";
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface TanzaniaMapViewProps {
  listingCountByRegion: Record<string, number>;
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
  lang: string;
  t: (key: TranslationKey) => string;
  totalFilteredCount: number;
}

// ─── Component ────────────────────────────────────────────────────────────────
export function TanzaniaMapView({
  listingCountByRegion,
  selectedRegion,
  onSelectRegion,
  lang,
  t,
  totalFilteredCount,
}: TanzaniaMapViewProps) {
  const COLS = 5;
  const ROWS = 6;

  // Build a cell lookup: "col-row" -> RegionCell
  const cellMap: Record<string, RegionCell> = {};
  for (const cell of TANZANIA_REGION_GRID) {
    cellMap[`${cell.col}-${cell.row}`] = cell;
  }

  const totalListings = Object.values(listingCountByRegion).reduce(
    (sum, c) => sum + c,
    0,
  );

  return (
    <div className="space-y-3" data-ocid="marketplace.map_view">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">
            {t("regionMap")}
          </h2>
        </div>
        <span className="text-xs text-muted-foreground">
          {totalFilteredCount} {t("listingsCount")}
        </span>
      </div>

      {/* Instruction */}
      <p className="text-xs text-muted-foreground">{t("selectRegion")}</p>

      {/* Grid map */}
      <div
        className="relative border border-border rounded-xl overflow-hidden bg-card p-3"
        style={{ aspectRatio: `${COLS}/${ROWS}` }}
        aria-label={t("regionMap")}
      >
        {/* Background: very light topographic feel */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3 pointer-events-none" />

        {/* Grid cells */}
        <div
          className="relative w-full h-full"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gridTemplateRows: `repeat(${ROWS}, 1fr)`,
            gap: "3px",
          }}
        >
          {Array.from({ length: ROWS }, (_, rowIdx) =>
            Array.from({ length: COLS }, (_, colIdx) => {
              const col = colIdx + 1;
              const row = rowIdx + 1;
              const key = `${col}-${row}`;
              const cell = cellMap[key];

              if (!cell) {
                // Empty grid cell — ocean/void space
                return (
                  <div
                    key={key}
                    className="rounded-md bg-primary/3 border border-border/30"
                  />
                );
              }

              const count = listingCountByRegion[cell.name] ?? 0;
              const isSelected =
                selectedRegion === cell.name ||
                (selectedRegion === "All Regions" && false);
              const colorCls = getTileColor(count, isSelected);
              const dotCls = getDotColor(count);
              const displayName = lang === "sw" ? cell.nameSw : cell.name;

              return (
                <button
                  key={key}
                  type="button"
                  data-ocid={`marketplace.map_region.${cell.abbr.toLowerCase()}`}
                  onClick={() => onSelectRegion(cell.name)}
                  className={`relative rounded-md border text-center flex flex-col items-center justify-center transition-all duration-200 cursor-pointer p-0.5 ${colorCls}`}
                  aria-label={`${displayName}: ${count} ${t("listingsCount")}`}
                  title={`${displayName}: ${count} ${t("listingsCount")}`}
                >
                  {/* Count dot */}
                  {count > 0 && (
                    <span
                      className={`absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full text-[7px] font-bold flex items-center justify-center text-white ${dotCls}`}
                    >
                      {count > 99 ? "99+" : count}
                    </span>
                  )}
                  <span className="text-[8px] font-bold leading-tight block">
                    {cell.abbr}
                  </span>
                  <span className="text-[6px] leading-tight block truncate w-full px-0.5 hidden sm:block">
                    {displayName}
                  </span>
                </button>
              );
            }),
          )}
        </div>
      </div>

      {/* Selected region banner */}
      {selectedRegion !== "All Regions" && (
        <div
          data-ocid="marketplace.map_region_banner"
          className="flex items-center justify-between bg-primary/10 border border-primary/20 rounded-xl px-3 py-2"
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary">
              {t("viewingRegion")} {selectedRegion}
            </span>
            <span className="text-xs text-muted-foreground">
              ({listingCountByRegion[selectedRegion] ?? 0} {t("listingsCount")})
            </span>
          </div>
          <button
            type="button"
            data-ocid="marketplace.map_clear_region"
            onClick={() => onSelectRegion("All Regions")}
            className="text-[10px] text-primary/70 hover:text-primary font-medium underline underline-offset-2"
          >
            {t("backToAllRegions")}
          </button>
        </div>
      )}

      {/* Legend */}
      <div className="bg-muted/30 border border-border rounded-xl px-3 py-2.5">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">
          {lang === "sw" ? "Ufafanuzi" : "Legend"}
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-muted/50 border border-border" />
            <span className="text-[10px] text-muted-foreground">
              {lang === "sw" ? "Hakuna bidhaa" : "No listings"}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-accent/20 border border-accent/40" />
            <span className="text-[10px] text-muted-foreground">
              1–5 {t("listingsCount")}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-amber-100 border border-amber-300 dark:bg-amber-900/30 dark:border-amber-700" />
            <span className="text-[10px] text-muted-foreground">
              6–15 {t("listingsCount")}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-orange-100 border border-orange-300 dark:bg-orange-900/30 dark:border-orange-700" />
            <span className="text-[10px] text-muted-foreground">
              16+ {t("listingsCount")}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-[10px] text-muted-foreground">
              {lang === "sw" ? "Umechaguliwa" : "Selected"}
            </span>
          </div>
        </div>
        <p className="text-[9px] text-muted-foreground/60 mt-2">
          {lang === "sw"
            ? `Jumla ya bidhaa ${totalListings} katika ${Object.values(listingCountByRegion).filter((c) => c > 0).length} mikoa`
            : `${totalListings} total listings across ${Object.values(listingCountByRegion).filter((c) => c > 0).length} regions`}
        </p>
      </div>
    </div>
  );
}

// ─── View Toggle ──────────────────────────────────────────────────────────────
export function MapListToggle({
  viewMode,
  onToggle,
  t,
}: {
  viewMode: "list" | "map";
  onToggle: () => void;
  lang: string;
  t: (key: TranslationKey) => string;
}) {
  return (
    <fieldset
      className="flex items-center gap-0.5 bg-muted/40 border border-border rounded-full p-0.5"
      aria-label="View mode toggle"
    >
      <button
        type="button"
        data-ocid="marketplace.toggle_list_view"
        onClick={() => viewMode !== "list" && onToggle()}
        className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-smooth ${
          viewMode === "list"
            ? "bg-card text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-pressed={viewMode === "list"}
      >
        <List className="w-3 h-3" />
        <span className="hidden xs:inline">{t("listView")}</span>
      </button>
      <button
        type="button"
        data-ocid="marketplace.toggle_map_view"
        onClick={() => viewMode !== "map" && onToggle()}
        className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-smooth ${
          viewMode === "map"
            ? "bg-card text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-pressed={viewMode === "map"}
      >
        <LayoutGrid className="w-3 h-3" />
        <span className="hidden xs:inline">{t("mapView")}</span>
      </button>
    </fieldset>
  );
}
