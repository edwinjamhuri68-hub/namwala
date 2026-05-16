import { a as useLanguageStore, Z as useBackend, aA as useQueryClient, r as reactExports, aB as useQuery, j as jsxRuntimeExports, L as Layout, B as Button, n as Skeleton, aO as CertificationLevel, s as Leaf, m as Badge, T as TrendingUp, l as Textarea, I as Input } from "./index-BUVIgngH.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-ChCgH42_.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-Coi4Z4Fu.js";
import { L as Label } from "./label-BTY_QCm0.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C7D5N9Bz.js";
import { u as useMutation } from "./useMutation-BB6v1FNg.js";
import { u as ue } from "./index-c308oYmR.js";
import { P as Plus } from "./plus-DMsGFanj.js";
import { A as Award } from "./award-Btif5h59.js";
import "./index-BpD0H2hM.js";
import "./index-BoFiBQpD.js";
import "./Combination-D9wAFE8R.js";
import "./index-D6ql0bBU.js";
import "./index-Cg_2nNnI.js";
import "./index-ob0xpmgs.js";
import "./index-Oh98DbrD.js";
import "./check-Byk4lD13.js";
import "./chevron-up-CnJPygwE.js";
const PRACTICE_TYPES = {
  soilConservation: "Soil Conservation",
  waterManagement: "Water Management",
  composting: "Composting",
  treePlanting: "Tree Planting",
  sustainableGrazing: "Sustainable Grazing",
  ecoPesticide: "Eco Pesticide"
};
const PRACTICE_TYPES_SW = {
  soilConservation: "Kuhifadhi Udongo",
  waterManagement: "Kusimamia Maji",
  composting: "Mboji",
  treePlanting: "Kupanda Miti",
  sustainableGrazing: "Malisho Endelevu",
  ecoPesticide: "Dawa ya Mazingira"
};
const CERT_THRESHOLDS = {
  soilSteward: 50,
  waterGuardian: 100,
  carbonChampion: 250
};
const CERT_COLORS = {
  [CertificationLevel.soilSteward]: "bg-amber-100 text-amber-800 border-amber-300",
  [CertificationLevel.waterGuardian]: "bg-blue-100 text-blue-800 border-blue-300",
  [CertificationLevel.carbonChampion]: "bg-green-100 text-green-800 border-green-300"
};
function CarbonFarmingPage() {
  const { language } = useLanguageStore();
  const t = (en, sw) => language === "sw" ? sw : en;
  const { actor } = useBackend();
  const qc = useQueryClient();
  const [showLogDialog, setShowLogDialog] = reactExports.useState(false);
  const [practiceType, setPracticeType] = reactExports.useState("soilConservation");
  const [practiceDesc, setPracticeDesc] = reactExports.useState("");
  const [practiceDate, setPracticeDate] = reactExports.useState("");
  const [carbonImpact, setCarbonImpact] = reactExports.useState("");
  const { data: points, isLoading: pointsLoading } = useQuery({
    queryKey: ["carbonPoints"],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getMyCarbonPoints();
    },
    enabled: !!actor
  });
  const { data: certifications } = useQuery({
    queryKey: ["carbonCerts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyCarbonCertifications();
    },
    enabled: !!actor
  });
  const { data: practices, isLoading: practicesLoading } = useQuery({
    queryKey: ["carbonPractices"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyCarbonPractices();
    },
    enabled: !!actor
  });
  const logMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const pt = { [practiceType]: null };
      const dateTs = BigInt(new Date(practiceDate).getTime()) * BigInt(1e6);
      const impactKg = BigInt(Math.round(Number.parseFloat(carbonImpact) || 0));
      return actor.logCarbonPractice(pt, practiceDesc, dateTs, impactKg);
    },
    onSuccess: () => {
      ue.success(t("Practice logged!", "Mazoea yamerekodiwa!"));
      qc.invalidateQueries({ queryKey: ["carbonPractices"] });
      qc.invalidateQueries({ queryKey: ["carbonPoints"] });
      qc.invalidateQueries({ queryKey: ["carbonCerts"] });
      setShowLogDialog(false);
      setPracticeDesc("");
      setPracticeDate("");
      setCarbonImpact("");
    },
    onError: () => ue.error(t("Failed to log practice", "Imeshindwa kurekodi mazoea"))
  });
  const getPracticeLabel = (pt) => {
    const key = Object.keys(pt)[0];
    return language === "sw" ? PRACTICE_TYPES_SW[key] ?? key : PRACTICE_TYPES[key] ?? key;
  };
  const totalPoints = Number(points ?? 0);
  const nextCert = totalPoints < 50 ? {
    name: t("Soil Steward", "Mlindaji wa Udongo"),
    needed: 50 - totalPoints
  } : totalPoints < 100 ? {
    name: t("Water Guardian", "Mlindaji wa Maji"),
    needed: 100 - totalPoints
  } : totalPoints < 250 ? {
    name: t("Carbon Champion", "Bingwa wa Kaboni"),
    needed: 250 - totalPoints
  } : null;
  const progressToNext = nextCert ? totalPoints / CERT_THRESHOLDS[Object.keys(CERT_THRESHOLDS)[(certifications == null ? void 0 : certifications.length) ?? 0] ?? "soilSteward"] * 100 : 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: t("Carbon Farming Rewards", "Tuzo za Kilimo cha Kaboni") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: t(
          "Log sustainable practices and earn certification",
          "Rekodi mazoea endelevu na pata cheti"
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowLogDialog(true),
          "data-ocid": "carbon.log_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
            t("Log Practice", "Rekodi Mazoea")
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "md:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6 text-center", children: pointsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-24 mx-auto" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-5xl font-bold text-primary", children: totalPoints.toLocaleString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: t("Carbon Points", "Pointi za Kaboni") })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "md:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: t(
          "Progress to Next Certification",
          "Maendeleo ya Cheti Kinachofuata"
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: nextCert ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
              t("Next:", "Kinachofuata:"),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: nextCert.name })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
              nextCert.needed,
              " ",
              t("pts needed", "pointi zinahitajika")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full bg-primary rounded-full transition-all",
              style: { width: `${Math.min(progressToNext, 100)}%` }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 text-xs text-muted-foreground", children: [
            t("Certification Levels:", "Viwango vya Cheti:"),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-amber-600", children: [
              t("Soil Steward", "Mlindaji wa Udongo"),
              " (50)"
            ] }),
            " ",
            "→ ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-blue-600", children: [
              t("Water Guardian", "Mlindaji wa Maji"),
              " (100)"
            ] }),
            " ",
            "→ ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-green-600", children: [
              t("Carbon Champion", "Bingwa wa Kaboni"),
              " (250)"
            ] })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: t(
          "You have reached the highest certification level!",
          "Umefika kiwango cha juu cha cheti!"
        ) }) })
      ] })
    ] }),
    (certifications ?? []).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold mb-3", children: t("Earned Certifications", "Vyeti Vilivyopatikana") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3", children: (certifications ?? []).map((cert) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium ${CERT_COLORS[cert.level]}`,
          "data-ocid": "carbon.certification",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-4 h-4" }),
            cert.level === CertificationLevel.soilSteward && t("Soil Steward", "Mlindaji wa Udongo"),
            cert.level === CertificationLevel.waterGuardian && t("Water Guardian", "Mlindaji wa Maji"),
            cert.level === CertificationLevel.carbonChampion && t("Carbon Champion", "Bingwa wa Kaboni"),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs opacity-75", children: [
              "(",
              Number(cert.totalPoints),
              " pts)"
            ] })
          ]
        },
        cert.id.toString()
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold mb-3", children: t("My Practices", "Mazoea Yangu") }),
      practicesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["s0", "s1", "s2"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-lg" }, k)) }) : (practices ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-12 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-12 h-12 mx-auto mb-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-muted-foreground",
            "data-ocid": "carbon.empty_state",
            children: t(
              "No practices logged yet",
              "Hakuna mazoea yaliyorekodiwa bado"
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mt-4", onClick: () => setShowLogDialog(true), children: t("Log Your First Practice", "Rekodi Mazoea Yako ya Kwanza") })
      ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: (practices ?? []).map((p, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          "data-ocid": `carbon.practice.item.${idx + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: getPracticeLabel(p.practiceType) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: new Date(
                  Number(p.dateLogged) / 1e6
                ).toLocaleDateString() })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm line-clamp-2", children: p.description })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-primary", children: [
                  Number(p.carbonImpactKg),
                  " kg"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("CO₂ saved", "CO₂ iliyookoka") })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-foreground flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3 h-3" }),
                  "+",
                  Number(p.pointsAwarded)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("points", "pointi") })
              ] })
            ] })
          ] }) })
        },
        p.id.toString()
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showLogDialog, onOpenChange: setShowLogDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: t("Log Sustainable Practice", "Rekodi Mazoea Endelevu") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("Practice Type", "Aina ya Mazoea") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: practiceType, onValueChange: setPracticeType, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "carbon.practice_type_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.entries(PRACTICE_TYPES).map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: k, children: language === "sw" ? PRACTICE_TYPES_SW[k] : v }, k)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("Description", "Maelezo") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: practiceDesc,
              onChange: (e) => setPracticeDesc(e.target.value),
              placeholder: t(
                "Describe what you did...",
                "Elezea ulichofanya..."
              ),
              "data-ocid": "carbon.description_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("Date", "Tarehe") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: practiceDate,
                onChange: (e) => setPracticeDate(e.target.value),
                "data-ocid": "carbon.date_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("Carbon Impact (kg CO₂)", "Athari ya Kaboni (kg CO₂)") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                value: carbonImpact,
                onChange: (e) => setCarbonImpact(e.target.value),
                placeholder: "50",
                "data-ocid": "carbon.impact_input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setShowLogDialog(false),
              "data-ocid": "carbon.cancel_button",
              children: t("Cancel", "Ghairi")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: () => logMutation.mutate(),
              disabled: !practiceDesc || !practiceDate || !carbonImpact || logMutation.isPending,
              "data-ocid": "carbon.submit_button",
              children: logMutation.isPending ? t("Logging...", "Inarekodia...") : t("Log Practice", "Rekodi Mazoea")
            }
          )
        ] })
      ] })
    ] }) })
  ] }) });
}
export {
  CarbonFarmingPage as default
};
