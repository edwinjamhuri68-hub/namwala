import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/store/languageStore";
import type { AnnouncementType, GovtNGOAnnouncement } from "@/types";
import {
  Bell,
  BellOff,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Megaphone,
  Phone,
  X,
} from "lucide-react";
import { useState } from "react";

const TANZANIA_REGIONS = [
  "All Regions",
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
  "Pemba North",
  "Pemba South",
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

const TYPE_COLORS: Record<AnnouncementType, string> = {
  training: "bg-blue-100 text-blue-700",
  subsidy: "bg-emerald-100 text-emerald-700",
  emergency: "bg-red-100 text-red-700",
  policy: "bg-purple-100 text-purple-700",
  market_info: "bg-yellow-100 text-yellow-700",
  weather_advisory: "bg-sky-100 text-sky-700",
  general: "bg-muted text-muted-foreground",
};

const SAMPLE: GovtNGOAnnouncement[] = [
  {
    id: "a1",
    authorId: "gov1",
    authorName: "Ministry of Agriculture",
    authorOrganization: "Government of Tanzania",
    announcementType: "subsidy",
    titleEn: "Subsidized Fertilizer Distribution — April 2026",
    titleSw: "Usambazaji wa Mbolea ya Ruzuku — Aprili 2026",
    bodyEn:
      "The Ministry of Agriculture is distributing subsidized DAP and Urea fertilizer to registered smallholder farmers. Collect your allocation at your district agricultural office with your national ID and farm registration card. Quantities are limited — early collection is advised. Eligible farmers who have registered with the National Farmers Database will receive priority allocation.",
    bodySw:
      "Wizara ya Kilimo inasambaza mbolea ya DAP na Urea ya ruzuku kwa wakulima wadogo waliosajiliwa. Chukua mbolea yako katika ofisi ya kilimo ya wilaya yako na kitambulisho cha taifa na kadi ya usajili wa shamba. Kiasi ni kidogo — inashauriwa kuchukua mapema. Wakulima wenye haki ambao wamesajiliwa katika Hifadhidata ya Wakulima wa Taifa watapewa kipaumbele.",
    region: "All Regions",
    startDate: "2026-04-01",
    endDate: "2026-04-30",
    contactInfo: "+255 800 123 456",
    createdAt: "2026-03-25",
    isActive: true,
  },
  {
    id: "a2",
    authorId: "ngo1",
    authorName: "AGRA Tanzania",
    authorOrganization: "Alliance for a Green Revolution in Africa",
    announcementType: "training",
    titleEn: "Free Farmer Training — Digital Tools for Agriculture",
    titleSw: "Mafunzo ya Bure kwa Wakulima — Zana za Kidijitali za Kilimo",
    bodyEn:
      "AGRA Tanzania is hosting free training sessions on using digital tools to improve farm management, market access, and record-keeping. Sessions run every Saturday from 9am–1pm in Dodoma (at the Regional Agriculture Office) and Morogoro (at Sokoine University Community Hall). All participants will receive a digital farming toolkit and certificate of completion. Lunch and transport allowance provided.",
    bodySw:
      "AGRA Tanzania inafanya mafunzo ya bure kuhusu kutumia zana za kidijitali kuboresha usimamizi wa shamba, ufikiaji wa soko, na uhifadhi wa rekodi. Vikao vinafanyika kila Jumamosi saa 3 asubuhi hadi saa 7 mchana Dodoma (katika Ofisi ya Kilimo ya Mkoa) na Morogoro (katika Ukumbi wa Jumuiya wa Chuo Kikuu cha Sokoine). Washiriki wote watapata kifaa cha kilimo cha kidijitali na cheti cha kukamilika.",
    region: "Dodoma, Morogoro",
    startDate: "2026-05-01",
    endDate: "2026-06-30",
    contactInfo: "training@agra.org",
    createdAt: "2026-04-20",
    isActive: true,
  },
  {
    id: "a3",
    authorId: "gov2",
    authorName: "Tanzania Meteorological Authority",
    authorOrganization: "Government of Tanzania",
    announcementType: "weather_advisory",
    titleEn: "Seasonal Rainfall Advisory — May to August 2026",
    titleSw: "Ushauri wa Mvua ya Msimu — Mei hadi Agosti 2026",
    bodyEn:
      "Above-normal rainfall is expected in most of Tanzania from May to August 2026. Farmers are strongly advised to prepare drainage channels, raise planting beds, and avoid planting in known flood-prone areas. Livestock keepers should move animals to higher ground in low-lying areas. The TMA will issue weekly updates throughout the season — follow official channels for the latest forecasts.",
    bodySw:
      "Mvua zaidi ya kawaida inatarajiwa katika sehemu kubwa ya Tanzania kutoka Mei hadi Agosti 2026. Wakulima wanashauriwa sana kuandaa mifereji ya maji, kupandisha vitanda vya upandaji, na kuepuka kupanda katika maeneo yanayojulikana kufurikia. Wafugaji wanapaswa kuhamisha wanyama kwenye maeneo ya juu zaidi katika maeneo ya chini. TMA itatoa masasisho kila wiki katika msimu wote.",
    region: "All Regions",
    startDate: "2026-04-25",
    createdAt: "2026-04-25",
    isActive: true,
  },
  {
    id: "a4",
    authorId: "ngo2",
    authorName: "CARE International Tanzania",
    authorOrganization: "CARE International",
    announcementType: "emergency",
    titleEn: "Emergency Drought Relief — Southern Regions",
    titleSw: "Msaada wa Dharura wa Ukame — Mikoa ya Kusini",
    bodyEn:
      "CARE International Tanzania is distributing emergency food assistance and drought-resistant seed varieties to affected communities in Lindi, Mtwara, and Ruvuma regions. Beneficiary registration is open until May 15, 2026. Please bring proof of residence and household size to your nearest distribution point. Water trucking services are also available — contact your ward agricultural officer.",
    bodySw:
      "CARE International Tanzania inagawa msaada wa dharura wa chakula na aina za mbegu zinazostahimili ukame kwa jamii zilizoathiriwa katika mikoa ya Lindi, Mtwara, na Ruvuma. Usajili wa wanufaika unafunguliwa hadi Mei 15, 2026. Tafadhali lete uthibitisho wa makazi na ukubwa wa kaya kwenye kituo chako cha karibu cha usambazaji.",
    region: "Lindi, Mtwara, Ruvuma",
    startDate: "2026-04-15",
    endDate: "2026-05-15",
    contactInfo: "+255 766 445 678",
    createdAt: "2026-04-14",
    isActive: true,
  },
  {
    id: "a5",
    authorId: "gov3",
    authorName: "Ministry of Livestock and Fisheries",
    authorOrganization: "Government of Tanzania",
    announcementType: "policy",
    titleEn: "New Livestock Registration Policy — Effective June 2026",
    titleSw: "Sera Mpya ya Usajili wa Mifugo — Inafaa Kuanzia Juni 2026",
    bodyEn:
      "All livestock keepers with more than 5 cattle, 10 goats, or 20 poultry birds are required to register their animals in the National Livestock Database by June 30, 2026. Registration enables access to subsidized vaccines, veterinary services, and government support programs. Unregistered animals will be ineligible for emergency assistance from July 2026 onward. Registration is free at all district veterinary offices.",
    bodySw:
      "Wafugaji wote wenye ng'ombe zaidi ya 5, mbuzi 10, au kuku 20 wanahitajika kusajili wanyama wao katika Hifadhidata ya Taifa ya Mifugo ifikapo Juni 30, 2026. Usajili unawezesha kupata chanjo za ruzuku, huduma za mifugo, na programu za msaada wa serikali. Wanyama wasiosajiliwa hawatastahili msaada wa dharura kuanzia Julai 2026. Usajili ni bure katika ofisi zote za mifugo za wilaya.",
    region: "All Regions",
    startDate: "2026-05-01",
    endDate: "2026-06-30",
    contactInfo: "+255 800 789 012",
    createdAt: "2026-04-30",
    isActive: true,
  },
];

const CATEGORY_TABS: {
  key: AnnouncementType | "all";
  labelEn: string;
  labelSw: string;
}[] = [
  { key: "all", labelEn: "All", labelSw: "Zote" },
  { key: "training", labelEn: "Training", labelSw: "Mafunzo" },
  { key: "subsidy", labelEn: "Subsidy", labelSw: "Ruzuku" },
  { key: "emergency", labelEn: "Emergency", labelSw: "Dharura" },
  { key: "policy", labelEn: "Policy Update", labelSw: "Sera" },
  { key: "weather_advisory", labelEn: "Weather", labelSw: "Hewa" },
];

export default function AnnouncementsPage() {
  const { t, language } = useLanguageStore();
  const [activeType, setActiveType] = useState<AnnouncementType | "all">("all");
  const [regionFilter, setRegionFilter] = useState("All Regions");
  const [selectedAnn, setSelectedAnn] = useState<GovtNGOAnnouncement | null>(
    null,
  );
  const [subscribedRegions, setSubscribedRegions] = useState<Set<string>>(
    new Set(),
  );

  const filtered = SAMPLE.filter((a) => {
    const typeMatch = activeType === "all" || a.announcementType === activeType;
    const regionMatch =
      regionFilter === "All Regions" ||
      a.region === "All Regions" ||
      a.region.includes(regionFilter);
    return typeMatch && regionMatch;
  });

  function toggleSubscribe(region: string) {
    setSubscribedRegions((prev) => {
      const next = new Set(prev);
      if (next.has(region)) next.delete(region);
      else next.add(region);
      return next;
    });
  }

  const typeLabel = (t: AnnouncementType | "all") => {
    const found = CATEGORY_TABS.find((c) => c.key === t);
    if (!found) return t;
    return language === "sw" ? found.labelSw : found.labelEn;
  };

  return (
    <Layout>
      <div
        className="min-h-screen bg-background"
        data-ocid="announcements.page"
      >
        {/* Header */}
        <div className="bg-card border-b px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center gap-2 max-w-2xl mx-auto">
            <Megaphone className="text-primary" size={22} />
            <h1 className="text-lg font-bold text-foreground">
              {t("announcements")}
            </h1>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
          {/* Region filter */}
          <div className="flex items-center gap-2">
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="flex-1 border border-input rounded-xl px-3 py-2 bg-background text-foreground text-sm"
              data-ocid="announcements.region.select"
            >
              {TANZANIA_REGIONS.map((r) => (
                <option key={r} value={r}>
                  {r === "All Regions"
                    ? language === "sw"
                      ? "Mikoa Yote"
                      : "All Regions"
                    : r}
                </option>
              ))}
            </select>
            {regionFilter !== "All Regions" && (
              <Button
                size="sm"
                variant={
                  subscribedRegions.has(regionFilter) ? "secondary" : "outline"
                }
                onClick={() => toggleSubscribe(regionFilter)}
                data-ocid="announcements.subscribe_button"
              >
                {subscribedRegions.has(regionFilter) ? (
                  <>
                    <CheckCircle2 size={14} className="mr-1" />{" "}
                    {language === "sw" ? "Umejisajili" : "Subscribed"}
                  </>
                ) : (
                  <>
                    <Bell size={14} className="mr-1" />{" "}
                    {language === "sw"
                      ? `Jiandikishe: ${regionFilter}`
                      : `Subscribe: ${regionFilter}`}
                  </>
                )}
              </Button>
            )}
          </div>

          {/* Category tabs */}
          <div
            className="flex gap-2 overflow-x-auto pb-1"
            data-ocid="announcements.filter.tab"
          >
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveType(tab.key)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  activeType === tab.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                }`}
                data-ocid={`announcements.type_filter.${tab.key}`}
              >
                {language === "sw" ? tab.labelSw : tab.labelEn}
              </button>
            ))}
          </div>

          {/* Subscribed badge */}
          {regionFilter !== "All Regions" &&
            subscribedRegions.has(regionFilter) && (
              <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-xl px-3 py-2">
                <Bell size={14} className="text-primary" />
                <p className="text-xs text-primary">
                  {language === "sw"
                    ? `Unaupokea matangazo ya ${regionFilter}`
                    : `Subscribed to ${regionFilter} updates`}
                </p>
                <button
                  type="button"
                  className="ml-auto text-muted-foreground"
                  onClick={() => toggleSubscribe(regionFilter)}
                  aria-label="Unsubscribe"
                >
                  <BellOff size={13} />
                </button>
              </div>
            )}

          {/* List */}
          {filtered.length === 0 ? (
            <div
              className="text-center py-16"
              data-ocid="announcements.empty_state"
            >
              <Megaphone
                className="mx-auto text-muted-foreground/40"
                size={48}
              />
              <p className="text-muted-foreground mt-3">
                {t("no_announcements")}
              </p>
            </div>
          ) : (
            filtered.map((ann, i) => (
              <AnnouncementCard
                key={ann.id}
                ann={ann}
                index={i}
                language={language}
                typeLabel={typeLabel}
                onReadMore={() => setSelectedAnn(ann)}
              />
            ))
          )}
        </div>

        {/* Detail Modal */}
        {selectedAnn && (
          <div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
            data-ocid="announcements.dialog"
          >
            <div className="bg-card w-full max-w-md rounded-t-2xl p-5 space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <Badge
                    className={`text-xs mb-2 border-0 ${
                      TYPE_COLORS[selectedAnn.announcementType]
                    }`}
                  >
                    {typeLabel(selectedAnn.announcementType)}
                  </Badge>
                  <h3 className="font-bold text-foreground text-base">
                    {language === "sw"
                      ? selectedAnn.titleSw
                      : selectedAnn.titleEn}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {selectedAnn.authorName} · {selectedAnn.authorOrganization}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedAnn(null)}
                  className="text-muted-foreground shrink-0"
                  data-ocid="announcements.close_button"
                >
                  <X size={20} />
                </button>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {language === "sw" ? selectedAnn.bodySw : selectedAnn.bodyEn}
              </p>

              <div className="space-y-2 border-t pt-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CalendarDays size={13} />
                  <span>
                    {selectedAnn.startDate}
                    {selectedAnn.endDate && ` → ${selectedAnn.endDate}`}
                  </span>
                </div>
                {selectedAnn.contactInfo && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Phone size={13} />
                    <span>{selectedAnn.contactInfo}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Megaphone size={13} />
                  <span>📍 {selectedAnn.region}</span>
                </div>
              </div>

              <Button
                className="w-full"
                onClick={() => setSelectedAnn(null)}
                data-ocid="announcements.confirm_button"
              >
                {t("confirm")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

function AnnouncementCard({
  ann,
  index,
  language,
  typeLabel,
  onReadMore,
}: {
  ann: GovtNGOAnnouncement;
  index: number;
  language: string;
  typeLabel: (t: AnnouncementType | "all") => string;
  onReadMore: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const body = language === "sw" ? ann.bodySw : ann.bodyEn;
  const title = language === "sw" ? ann.titleSw : ann.titleEn;
  const isLong = body.length > 140;

  return (
    <div
      className="bg-card rounded-xl border p-4 space-y-3"
      data-ocid={`announcements.item.${index + 1}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-bold text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {ann.authorName} · {ann.authorOrganization}
          </p>
        </div>
        <Badge
          className={`text-xs shrink-0 border-0 ${
            TYPE_COLORS[ann.announcementType]
          }`}
        >
          {typeLabel(ann.announcementType)}
        </Badge>
      </div>

      <p className="text-sm text-muted-foreground">
        {isLong && !expanded ? `${body.slice(0, 140)}…` : body}
      </p>

      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>📍 {ann.region}</span>
          {ann.contactInfo && <span>📞 {ann.contactInfo}</span>}
        </div>
        <div className="flex items-center gap-2">
          {isLong && (
            <button
              type="button"
              onClick={() => setExpanded((e) => !e)}
              className="flex items-center gap-1 text-xs text-primary font-medium"
            >
              {expanded ? (
                <>
                  <ChevronUp size={13} /> {language === "sw" ? "Funga" : "Less"}
                </>
              ) : (
                <>
                  <ChevronDown size={13} />{" "}
                  {language === "sw" ? "Soma Zaidi" : "Read More"}
                </>
              )}
            </button>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={onReadMore}
            data-ocid={`announcements.read_more.${index + 1}`}
          >
            {language === "sw" ? "Maelezo" : "Details"}
          </Button>
        </div>
      </div>

      {ann.endDate && (
        <p className="text-xs text-muted-foreground">
          <CalendarDays size={11} className="inline mr-1" />
          {ann.startDate} → {ann.endDate}
        </p>
      )}
    </div>
  );
}
