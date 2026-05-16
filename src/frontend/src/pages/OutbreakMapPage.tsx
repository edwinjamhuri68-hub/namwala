import { Layout } from "@/components/Layout";
import { TanzaniaMapView } from "@/components/TanzaniaMapView";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useLanguageStore } from "@/store/languageStore";
import {
  AlertTriangle,
  Bug,
  CloudRain,
  Flame,
  MapPin,
  Plus,
  Stethoscope,
  Wheat,
} from "lucide-react";
import { useMemo, useState } from "react";

type OutbreakType =
  | "crop_disease"
  | "livestock_infection"
  | "pest_invasion"
  | "drought";
type OutbreakSeverity = "low" | "medium" | "high" | "critical";

interface OutbreakRecord {
  id: string;
  region: string;
  outbreakType: OutbreakType;
  diseaseName: string;
  severity: OutbreakSeverity;
  description: string;
  affectedArea: string;
  reportedAt: number;
  isActive: boolean;
  coordinates: null | { lat: number; lng: number };
}

const MOCK_OUTBREAKS: OutbreakRecord[] = [
  {
    id: "ob1",
    region: "Dodoma",
    outbreakType: "crop_disease",
    diseaseName: "Maize Blight",
    severity: "high",
    description: "Spread rapidly across northern farms",
    affectedArea: "Northern Dodoma",
    reportedAt: Date.now() - 2 * 86400000,
    isActive: true,
    coordinates: null,
  },
  {
    id: "ob2",
    region: "Dodoma",
    outbreakType: "drought",
    diseaseName: "Severe Drought",
    severity: "critical",
    description: "No rainfall for 3 weeks",
    affectedArea: "Central Dodoma",
    reportedAt: Date.now() - 5 * 86400000,
    isActive: true,
    coordinates: null,
  },
  {
    id: "ob3",
    region: "Arusha",
    outbreakType: "pest_invasion",
    diseaseName: "Fall Armyworm",
    severity: "medium",
    description: "Pest invasion detected on maize",
    affectedArea: "Arusha farms",
    reportedAt: Date.now() - 1 * 86400000,
    isActive: true,
    coordinates: null,
  },
  {
    id: "ob4",
    region: "Mwanza",
    outbreakType: "livestock_infection",
    diseaseName: "Foot and Mouth Disease",
    severity: "critical",
    description: "Rapid spread among cattle herds",
    affectedArea: "Lake Victoria region",
    reportedAt: Date.now() - 3 * 86400000,
    isActive: true,
    coordinates: null,
  },
  {
    id: "ob5",
    region: "Dar es Salaam",
    outbreakType: "crop_disease",
    diseaseName: "Cassava Mosaic Virus",
    severity: "medium",
    description: "Cassava crop disease detected",
    affectedArea: "Coastal belt",
    reportedAt: Date.now() - 7 * 86400000,
    isActive: true,
    coordinates: null,
  },
  {
    id: "ob6",
    region: "Mbeya",
    outbreakType: "livestock_infection",
    diseaseName: "Newcastle Disease",
    severity: "high",
    description: "Poultry losses reported in multiple farms",
    affectedArea: "Highland farms",
    reportedAt: Date.now() - 4 * 86400000,
    isActive: true,
    coordinates: null,
  },
  {
    id: "ob7",
    region: "Kilimanjaro",
    outbreakType: "pest_invasion",
    diseaseName: "Coffee Berry Borer",
    severity: "low",
    description: "Minor pest activity on coffee plants",
    affectedArea: "Kilimanjaro slopes",
    reportedAt: Date.now() - 10 * 86400000,
    isActive: true,
    coordinates: null,
  },
  {
    id: "ob8",
    region: "Mwanza",
    outbreakType: "crop_disease",
    diseaseName: "Rice Brown Spot",
    severity: "medium",
    description: "Rice disease spreading in paddies",
    affectedArea: "Lake Zone paddies",
    reportedAt: Date.now() - 6 * 86400000,
    isActive: true,
    coordinates: null,
  },
];

const TYPE_CONFIG: Record<
  OutbreakType,
  { labelEn: string; labelSw: string; color: string; icon: React.ReactNode }
> = {
  crop_disease: {
    labelEn: "Crop Disease",
    labelSw: "Ugonjwa wa Mazao",
    color: "bg-green-100 text-green-800 border-green-300",
    icon: <Wheat className="h-3 w-3" />,
  },
  livestock_infection: {
    labelEn: "Livestock Infection",
    labelSw: "Maambukizi ya Mifugo",
    color: "bg-red-100 text-red-800 border-red-300",
    icon: <Stethoscope className="h-3 w-3" />,
  },
  pest_invasion: {
    labelEn: "Pest Invasion",
    labelSw: "Uvamizi wa Wadudu",
    color: "bg-orange-100 text-orange-800 border-orange-300",
    icon: <Bug className="h-3 w-3" />,
  },
  drought: {
    labelEn: "Drought",
    labelSw: "Ukame",
    color: "bg-yellow-100 text-yellow-800 border-yellow-300",
    icon: <CloudRain className="h-3 w-3" />,
  },
};

const SEVERITY_CONFIG: Record<
  OutbreakSeverity,
  { labelEn: string; labelSw: string; color: string }
> = {
  critical: {
    labelEn: "Critical",
    labelSw: "Hatari Kuu",
    color: "bg-red-600 text-white",
  },
  high: { labelEn: "High", labelSw: "Juu", color: "bg-orange-500 text-white" },
  medium: {
    labelEn: "Medium",
    labelSw: "Kati",
    color: "bg-yellow-500 text-white",
  },
  low: { labelEn: "Low", labelSw: "Chini", color: "bg-blue-500 text-white" },
};

const TANZANIAN_REGIONS = [
  "Arusha",
  "Dar es Salaam",
  "Dodoma",
  "Geita",
  "Iringa",
  "Kagera",
  "Katavi",
  "Kigoma",
  "Kilimanjaro",
  "Lindi",
  "Manyara",
  "Mara",
  "Mbeya",
  "Morogoro",
  "Mtwara",
  "Mwanza",
  "Njombe",
  "Pwani",
  "Rukwa",
  "Ruvuma",
  "Shinyanga",
  "Simiyu",
  "Singida",
  "Songwe",
  "Tabora",
  "Tanga",
  "Zanzibar North",
  "Zanzibar South",
  "Zanzibar West",
];

function formatDate(ts: number, lang: string): string {
  return new Date(ts).toLocaleDateString(lang === "sw" ? "sw-TZ" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function OutbreakMapPage() {
  const { language: lang, t } = useLanguageStore();
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [reportOpen, setReportOpen] = useState(false);
  const [reportForm, setReportForm] = useState({
    region: "",
    outbreakType: "crop_disease" as OutbreakType,
    diseaseName: "",
    severity: "medium" as OutbreakSeverity,
    description: "",
  });

  const filteredOutbreaks = useMemo(() => {
    let list = MOCK_OUTBREAKS;
    if (typeFilter !== "all")
      list = list.filter((o) => o.outbreakType === typeFilter);
    if (dateFilter === "7d")
      list = list.filter((o) => o.reportedAt >= Date.now() - 7 * 86400000);
    if (dateFilter === "30d")
      list = list.filter((o) => o.reportedAt >= Date.now() - 30 * 86400000);
    return list;
  }, [typeFilter, dateFilter]);

  const outbreakCountByRegion = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const o of filteredOutbreaks) {
      counts[o.region] = (counts[o.region] ?? 0) + 1;
    }
    return counts;
  }, [filteredOutbreaks]);

  const visibleOutbreaks = useMemo(() => {
    if (!selectedRegion) return filteredOutbreaks;
    return filteredOutbreaks.filter((o) => o.region === selectedRegion);
  }, [filteredOutbreaks, selectedRegion]);

  const criticalCount = filteredOutbreaks.filter(
    (o) => o.severity === "critical",
  ).length;
  const regionsAffected = new Set(filteredOutbreaks.map((o) => o.region)).size;

  function handleReport(e: React.FormEvent) {
    e.preventDefault();
    setReportOpen(false);
    setReportForm({
      region: "",
      outbreakType: "crop_disease",
      diseaseName: "",
      severity: "medium",
      description: "",
    });
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Page Header */}
        <div className="bg-card border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-destructive/10">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  {lang === "sw"
                    ? "Ramani ya Milipuko ya Magonjwa"
                    : "Disease Outbreak Map"}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {lang === "sw"
                    ? "Fuatilia na ripoti milipuko ya magonjwa Tanzania"
                    : "Monitor and report disease outbreaks across Tanzania"}
                </p>
              </div>
            </div>
            <Dialog open={reportOpen} onOpenChange={setReportOpen}>
              <DialogTrigger asChild>
                <Button
                  data-ocid="outbreak.open_modal_button"
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  {lang === "sw" ? "Ripoti Mlipuko" : "Report Outbreak"}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {lang === "sw"
                      ? "Ripoti Mlipuko Mpya"
                      : "Report New Outbreak"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleReport} className="space-y-4">
                  <div className="space-y-1">
                    <Label>{lang === "sw" ? "Mkoa" : "Region"}</Label>
                    <Select
                      value={reportForm.region}
                      onValueChange={(v) =>
                        setReportForm((f) => ({ ...f, region: v }))
                      }
                    >
                      <SelectTrigger data-ocid="outbreak.region.select">
                        <SelectValue
                          placeholder={
                            lang === "sw" ? "Chagua mkoa" : "Select region"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {TANZANIAN_REGIONS.map((r) => (
                          <SelectItem key={r} value={r}>
                            {r}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label>
                      {lang === "sw" ? "Aina ya Mlipuko" : "Outbreak Type"}
                    </Label>
                    <Select
                      value={reportForm.outbreakType}
                      onValueChange={(v) =>
                        setReportForm((f) => ({
                          ...f,
                          outbreakType: v as OutbreakType,
                        }))
                      }
                    >
                      <SelectTrigger data-ocid="outbreak.type.select">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {(Object.keys(TYPE_CONFIG) as OutbreakType[]).map(
                          (type) => (
                            <SelectItem key={type} value={type}>
                              {lang === "sw"
                                ? TYPE_CONFIG[type].labelSw
                                : TYPE_CONFIG[type].labelEn}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label>
                      {lang === "sw" ? "Jina la Ugonjwa" : "Disease Name"}
                    </Label>
                    <Input
                      data-ocid="outbreak.disease_name.input"
                      value={reportForm.diseaseName}
                      onChange={(e) =>
                        setReportForm((f) => ({
                          ...f,
                          diseaseName: e.target.value,
                        }))
                      }
                      placeholder={
                        lang === "sw"
                          ? "e.g., Blight ya Mahindi"
                          : "e.g., Maize Blight"
                      }
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>
                      {lang === "sw" ? "Kiwango cha Hatari" : "Severity"}
                    </Label>
                    <Select
                      value={reportForm.severity}
                      onValueChange={(v) =>
                        setReportForm((f) => ({
                          ...f,
                          severity: v as OutbreakSeverity,
                        }))
                      }
                    >
                      <SelectTrigger data-ocid="outbreak.severity.select">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {(
                          Object.keys(SEVERITY_CONFIG) as OutbreakSeverity[]
                        ).map((s) => (
                          <SelectItem key={s} value={s}>
                            {lang === "sw"
                              ? SEVERITY_CONFIG[s].labelSw
                              : SEVERITY_CONFIG[s].labelEn}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label>{lang === "sw" ? "Maelezo" : "Description"}</Label>
                    <Textarea
                      data-ocid="outbreak.description.textarea"
                      value={reportForm.description}
                      onChange={(e) =>
                        setReportForm((f) => ({
                          ...f,
                          description: e.target.value,
                        }))
                      }
                      placeholder={
                        lang === "sw"
                          ? "Elezea hali ya mlipuko..."
                          : "Describe the outbreak situation..."
                      }
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-2 pt-1">
                    <Button
                      type="submit"
                      data-ocid="outbreak.submit_button"
                      className="flex-1"
                    >
                      {lang === "sw" ? "Ripoti" : "Submit Report"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      data-ocid="outbreak.cancel_button"
                      onClick={() => setReportOpen(false)}
                    >
                      {lang === "sw" ? "Ghairi" : "Cancel"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
          {/* Filter Bar */}
          <div className="flex flex-wrap gap-3 items-center bg-card border rounded-lg p-3">
            <Flame className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="flex flex-wrap gap-3 flex-1">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger
                  data-ocid="outbreak.type_filter.select"
                  className="w-48"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {lang === "sw" ? "Aina Zote" : "All Types"}
                  </SelectItem>
                  {(Object.keys(TYPE_CONFIG) as OutbreakType[]).map((type) => (
                    <SelectItem key={type} value={type}>
                      {lang === "sw"
                        ? TYPE_CONFIG[type].labelSw
                        : TYPE_CONFIG[type].labelEn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger
                  data-ocid="outbreak.date_filter.select"
                  className="w-36"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {lang === "sw" ? "Wakati Wote" : "All Time"}
                  </SelectItem>
                  <SelectItem value="7d">
                    {lang === "sw" ? "Siku 7" : "Last 7 days"}
                  </SelectItem>
                  <SelectItem value="30d">
                    {lang === "sw" ? "Siku 30" : "Last 30 days"}
                  </SelectItem>
                </SelectContent>
              </Select>
              {selectedRegion && (
                <Button
                  variant="outline"
                  size="sm"
                  data-ocid="outbreak.clear_region.button"
                  onClick={() => setSelectedRegion(null)}
                  className="gap-1 text-xs"
                >
                  <MapPin className="h-3 w-3" />
                  {selectedRegion} ×
                </Button>
              )}
            </div>
          </div>

          {/* Stats Row */}
          <div
            className="grid grid-cols-3 gap-4"
            data-ocid="outbreak.stats.section"
          >
            <Card className="border">
              <CardContent className="pt-4 pb-3">
                <p className="text-2xl font-bold text-foreground">
                  {filteredOutbreaks.length}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {lang === "sw" ? "Milipuko Yote" : "Total Outbreaks"}
                </p>
              </CardContent>
            </Card>
            <Card className="border border-destructive/40 bg-destructive/5">
              <CardContent className="pt-4 pb-3">
                <p className="text-2xl font-bold text-destructive">
                  {criticalCount}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {lang === "sw" ? "Hatari Kuu" : "Critical"}
                </p>
              </CardContent>
            </Card>
            <Card className="border">
              <CardContent className="pt-4 pb-3">
                <p className="text-2xl font-bold text-foreground">
                  {regionsAffected}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {lang === "sw" ? "Mikoa Iliyoathiriwa" : "Regions Affected"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Map */}
          <Card data-ocid="outbreak.map.section">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                {lang === "sw" ? "Ramani ya Tanzania" : "Tanzania Outbreak Map"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TanzaniaMapView
                listingCountByRegion={outbreakCountByRegion}
                selectedRegion={selectedRegion ?? ""}
                onSelectRegion={(r) =>
                  setSelectedRegion((prev) => (prev === r ? null : r))
                }
                lang={lang ?? "en"}
                t={t}
                totalFilteredCount={filteredOutbreaks.length}
              />
              <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className="inline-block w-3 h-3 rounded-sm bg-red-500" />
                  {lang === "sw" ? "Hatari Kuu / Juu" : "Critical / High"}
                </span>
                <span className="flex items-center gap-1">
                  <span className="inline-block w-3 h-3 rounded-sm bg-orange-400" />
                  {lang === "sw" ? "Kati" : "Medium"}
                </span>
                <span className="flex items-center gap-1">
                  <span className="inline-block w-3 h-3 rounded-sm bg-yellow-400" />
                  {lang === "sw" ? "Chini" : "Low"}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Outbreak Cards */}
          <div data-ocid="outbreak.list">
            <h2 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              {selectedRegion
                ? lang === "sw"
                  ? `Milipuko katika ${selectedRegion}`
                  : `Outbreaks in ${selectedRegion}`
                : lang === "sw"
                  ? "Milipuko Yote"
                  : "All Outbreaks"}
              <span className="text-xs font-normal text-muted-foreground">
                ({visibleOutbreaks.length})
              </span>
            </h2>

            {visibleOutbreaks.length === 0 ? (
              <div
                data-ocid="outbreak.empty_state"
                className="text-center py-12 text-muted-foreground bg-muted/20 rounded-lg border border-dashed"
              >
                <AlertTriangle className="h-10 w-10 mx-auto mb-2 opacity-30" />
                <p className="font-medium">
                  {lang === "sw"
                    ? "Hakuna milipuko iliyopatikana"
                    : "No outbreaks found"}
                </p>
                <p className="text-xs mt-1">
                  {lang === "sw"
                    ? "Jaribu kubadilisha vichujio"
                    : "Try adjusting your filters"}
                </p>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {visibleOutbreaks.map((outbreak, idx) => {
                  const typeCfg = TYPE_CONFIG[outbreak.outbreakType];
                  const sevCfg = SEVERITY_CONFIG[outbreak.severity];
                  return (
                    <Card
                      key={outbreak.id}
                      data-ocid={`outbreak.item.${idx + 1}`}
                      className="border hover:shadow-md transition-shadow"
                    >
                      <CardContent className="pt-4 pb-4 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-semibold text-sm text-foreground leading-tight">
                            {outbreak.diseaseName}
                          </p>
                          <Badge
                            className={`text-xs shrink-0 border ${typeCfg.color}`}
                            variant="outline"
                          >
                            <span className="mr-1">{typeCfg.icon}</span>
                            {lang === "sw" ? typeCfg.labelSw : typeCfg.labelEn}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge className={`text-xs ${sevCfg.color}`}>
                            {lang === "sw" ? sevCfg.labelSw : sevCfg.labelEn}
                          </Badge>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {outbreak.region}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {outbreak.description}
                        </p>
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-xs text-muted-foreground">
                            {outbreak.affectedArea}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(outbreak.reportedAt, lang)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
