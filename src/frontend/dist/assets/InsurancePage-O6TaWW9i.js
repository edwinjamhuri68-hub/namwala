import { a as useLanguageStore, Z as useBackend, aA as useQueryClient, r as reactExports, aB as useQuery, j as jsxRuntimeExports, L as Layout, B as Button, aN as CircleAlert, n as Skeleton, m as Badge, x as FileText, l as Textarea, I as Input } from "./index-BUVIgngH.js";
import { C as Card, a as CardContent } from "./card-ChCgH42_.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-Coi4Z4Fu.js";
import { L as Label } from "./label-BTY_QCm0.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C7D5N9Bz.js";
import { u as useMutation } from "./useMutation-BB6v1FNg.js";
import { u as ue } from "./index-c308oYmR.js";
import { P as Plus } from "./plus-DMsGFanj.js";
import { S as Shield } from "./shield-tHD7Q_gt.js";
import "./index-BpD0H2hM.js";
import "./index-BoFiBQpD.js";
import "./Combination-D9wAFE8R.js";
import "./index-D6ql0bBU.js";
import "./index-Cg_2nNnI.js";
import "./index-ob0xpmgs.js";
import "./index-Oh98DbrD.js";
import "./check-Byk4lD13.js";
import "./chevron-up-CnJPygwE.js";
const COVERAGE_TYPES = {
  crop: "Crop",
  livestock: "Livestock",
  equipment: "Equipment",
  other: "Other"
};
const COVERAGE_TYPES_SW = {
  crop: "Mazao",
  livestock: "Mifugo",
  equipment: "Vifaa",
  other: "Nyingine"
};
const CLAIM_TYPES = {
  drought: "Drought",
  flood: "Flood",
  pestDisease: "Pest / Disease",
  theft: "Theft",
  other: "Other"
};
const CLAIM_TYPES_SW = {
  drought: "Ukame",
  flood: "Mafuriko",
  pestDisease: "Wadudu/Ugonjwa",
  theft: "Wizi",
  other: "Nyingine"
};
const STATUS_COLORS = {
  pending: "secondary",
  approved: "default",
  rejected: "destructive",
  filed: "secondary",
  underReview: "outline",
  paid: "default"
};
function InsurancePage() {
  const { language } = useLanguageStore();
  const t = (en, sw) => language === "sw" ? sw : en;
  const { actor } = useBackend();
  const qc = useQueryClient();
  const [activeTab, setActiveTab] = reactExports.useState(
    "applications"
  );
  const [showAppDialog, setShowAppDialog] = reactExports.useState(false);
  const [showClaimDialog, setShowClaimDialog] = reactExports.useState(null);
  const [coverageType, setCoverageType] = reactExports.useState("crop");
  const [appDesc, setAppDesc] = reactExports.useState("");
  const [estValue, setEstValue] = reactExports.useState("");
  const [supportNotes, setSupportNotes] = reactExports.useState("");
  const [claimType, setClaimType] = reactExports.useState("drought");
  const [damageDesc, setDamageDesc] = reactExports.useState("");
  const [estLoss, setEstLoss] = reactExports.useState("");
  const [evidenceNotes, setEvidenceNotes] = reactExports.useState("");
  const { data: applications, isLoading: appsLoading } = useQuery({
    queryKey: ["myInsuranceApplications"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyInsuranceApplications(null);
    },
    enabled: !!actor
  });
  const { data: claims, isLoading: claimsLoading } = useQuery(
    {
      queryKey: ["myInsuranceClaims"],
      queryFn: async () => {
        if (!actor) return [];
        return actor.listMyInsuranceClaims(null);
      },
      enabled: !!actor
    }
  );
  const submitAppMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const ct = {
        [coverageType]: null
      };
      const val = BigInt(Math.round(Number.parseFloat(estValue) || 0));
      return actor.submitInsuranceApplication(ct, appDesc, val, supportNotes);
    },
    onSuccess: () => {
      ue.success(t("Application submitted!", "Maombi yamewasilishwa!"));
      qc.invalidateQueries({ queryKey: ["myInsuranceApplications"] });
      setShowAppDialog(false);
      setAppDesc("");
      setEstValue("");
      setSupportNotes("");
    },
    onError: () => ue.error(
      t("Failed to submit application", "Imeshindwa kuwasilisha maombi")
    )
  });
  const fileClaimMutation = useMutation({
    mutationFn: async (appId) => {
      if (!actor) throw new Error("Not connected");
      const ct = { [claimType]: null };
      const loss = BigInt(Math.round(Number.parseFloat(estLoss) || 0));
      return actor.fileInsuranceClaim(
        appId,
        ct,
        damageDesc,
        loss,
        evidenceNotes
      );
    },
    onSuccess: () => {
      ue.success(t("Claim filed!", "Madai yamefunguliwa!"));
      qc.invalidateQueries({ queryKey: ["myInsuranceClaims"] });
      setShowClaimDialog(null);
      setDamageDesc("");
      setEstLoss("");
      setEvidenceNotes("");
    },
    onError: () => ue.error(t("Failed to file claim", "Imeshindwa kufungua madai"))
  });
  const getCoverageLabel = (ct) => {
    const key = Object.keys(ct)[0];
    return language === "sw" ? COVERAGE_TYPES_SW[key] ?? key : COVERAGE_TYPES[key] ?? key;
  };
  const getClaimLabel = (ct) => {
    const key = Object.keys(ct)[0];
    return language === "sw" ? CLAIM_TYPES_SW[key] ?? key : CLAIM_TYPES[key] ?? key;
  };
  const approvedApps = (applications ?? []).filter(
    (a) => Object.keys(a.status)[0] === "approved"
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: t("Agricultural Insurance", "Bima ya Kilimo") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: t(
          "Apply for coverage and manage your claims",
          "Omba bima na simamia madai yako"
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => setShowAppDialog(true),
            "data-ocid": "insurance.apply_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
              t("Apply for Insurance", "Omba Bima")
            ]
          }
        ),
        approvedApps.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            onClick: () => setShowClaimDialog(approvedApps[0]),
            "data-ocid": "insurance.file_claim_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 mr-2" }),
              t("File a Claim", "Fungua Madai")
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground", children: (applications == null ? void 0 : applications.length) ?? 0 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("Applications", "Maombi") })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-primary", children: approvedApps.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("Approved", "Zilizoidhinishwa") })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground", children: (claims == null ? void 0 : claims.length) ?? 0 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("Claims Filed", "Madai Yaliyofunguliwa") })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground", children: (claims ?? []).filter(
          (c) => Object.keys(c.status)[0] === "paid"
        ).length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("Claims Paid", "Madai Yaliyolipwa") })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: `px-4 py-2 text-sm font-medium transition-colors ${activeTab === "applications" ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"}`,
          onClick: () => setActiveTab("applications"),
          "data-ocid": "insurance.applications_tab",
          children: t("Applications", "Maombi")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: `px-4 py-2 text-sm font-medium transition-colors ${activeTab === "claims" ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"}`,
          onClick: () => setActiveTab("claims"),
          "data-ocid": "insurance.claims_tab",
          children: t("Claims", "Madai")
        }
      )
    ] }),
    activeTab === "applications" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: appsLoading ? ["s0", "s1", "s2"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 w-full rounded-lg" }, k)) : (applications ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-12 h-12 mx-auto mb-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-muted-foreground",
          "data-ocid": "insurance.apps_empty_state",
          children: t(
            "No insurance applications yet",
            "Hakuna maombi ya bima bado"
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          className: "mt-4",
          onClick: () => setShowAppDialog(true),
          children: t("Apply Now", "Omba Sasa")
        }
      )
    ] }) }) : (applications ?? []).map((app, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        "data-ocid": `insurance.app.item.${idx + 1}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold", children: [
                getCoverageLabel(app.coverageType),
                " ",
                t("Insurance", "Bima")
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: STATUS_COLORS[Object.keys(app.status)[0]] ?? "outline",
                  children: Object.keys(app.status)[0]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-2 mb-1", children: app.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              t("Estimated Value", "Thamani Inayokadiriwa"),
              ": TSh",
              " ",
              Number(app.estimatedValue).toLocaleString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              t("Applied", "Iliomba"),
              ":",
              " ",
              new Date(
                Number(app.createdAt) / 1e6
              ).toLocaleDateString()
            ] })
          ] }),
          Object.keys(app.status)[0] === "approved" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "outline",
              onClick: () => setShowClaimDialog(app),
              "data-ocid": `insurance.file_claim_button.${idx + 1}`,
              children: t("File Claim", "Fungua Madai")
            }
          )
        ] }) })
      },
      app.id.toString()
    )) }),
    activeTab === "claims" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: claimsLoading ? ["s0", "s1", "s2"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 w-full rounded-lg" }, k)) : (claims ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-12 h-12 mx-auto mb-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-muted-foreground",
          "data-ocid": "insurance.claims_empty_state",
          children: t(
            "No claims filed yet",
            "Hakuna madai yaliyofunguliwa bado"
          )
        }
      )
    ] }) }) : (claims ?? []).map((claim, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        "data-ocid": `insurance.claim.item.${idx + 1}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold", children: [
              getClaimLabel(claim.claimType),
              " ",
              t("Claim", "Dai")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: STATUS_COLORS[Object.keys(claim.status)[0]] ?? "outline",
                children: Object.keys(claim.status)[0]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-2 mb-1", children: claim.damageDescription }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            t("Estimated Loss", "Hasara Inayokadiriwa"),
            ": TSh",
            " ",
            Number(claim.estimatedLoss).toLocaleString()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            t("Filed", "Ilifunguliwa"),
            ":",
            " ",
            new Date(
              Number(claim.createdAt) / 1e6
            ).toLocaleDateString()
          ] })
        ] })
      },
      claim.id.toString()
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showAppDialog, onOpenChange: setShowAppDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: t("Apply for Insurance", "Omba Bima") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("Coverage Type", "Aina ya Bima") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: coverageType, onValueChange: setCoverageType, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "insurance.coverage_type_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.entries(COVERAGE_TYPES).map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: k, children: language === "sw" ? COVERAGE_TYPES_SW[k] : v }, k)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("Description", "Maelezo") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: appDesc,
              onChange: (e) => setAppDesc(e.target.value),
              placeholder: t(
                "Describe what you want to insure...",
                "Elezea unachotaka kuhakikishia..."
              ),
              "data-ocid": "insurance.description_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("Estimated Value (TSh)", "Thamani Inayokadiriwa (TSh)") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              value: estValue,
              onChange: (e) => setEstValue(e.target.value),
              placeholder: "500000",
              "data-ocid": "insurance.value_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("Supporting Notes", "Maelezo ya Ziada") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: supportNotes,
              onChange: (e) => setSupportNotes(e.target.value),
              placeholder: t(
                "Any additional information...",
                "Taarifa yoyote ya ziada..."
              ),
              "data-ocid": "insurance.notes_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setShowAppDialog(false),
              "data-ocid": "insurance.app_cancel_button",
              children: t("Cancel", "Ghairi")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: () => submitAppMutation.mutate(),
              disabled: !appDesc || !estValue || submitAppMutation.isPending,
              "data-ocid": "insurance.app_submit_button",
              children: submitAppMutation.isPending ? t("Submitting...", "Inawasilisha...") : t("Submit Application", "Wasilisha Maombi")
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!showClaimDialog,
        onOpenChange: () => setShowClaimDialog(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: t("File a Claim", "Fungua Madai") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("Claim Type", "Aina ya Madai") }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: claimType, onValueChange: setClaimType, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "insurance.claim_type_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.entries(CLAIM_TYPES).map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: k, children: language === "sw" ? CLAIM_TYPES_SW[k] : v }, k)) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("Damage Description", "Maelezo ya Uharibifu") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  value: damageDesc,
                  onChange: (e) => setDamageDesc(e.target.value),
                  placeholder: t(
                    "Describe the damage...",
                    "Elezea uharibifu..."
                  ),
                  "data-ocid": "insurance.damage_desc_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("Estimated Loss (TSh)", "Hasara Inayokadiriwa (TSh)") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  value: estLoss,
                  onChange: (e) => setEstLoss(e.target.value),
                  "data-ocid": "insurance.loss_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("Evidence Notes", "Maelezo ya Ushahidi") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  value: evidenceNotes,
                  onChange: (e) => setEvidenceNotes(e.target.value),
                  placeholder: t(
                    "Describe any evidence...",
                    "Elezea ushahidi wowote..."
                  ),
                  "data-ocid": "insurance.evidence_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  onClick: () => setShowClaimDialog(null),
                  "data-ocid": "insurance.claim_cancel_button",
                  children: t("Cancel", "Ghairi")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: () => showClaimDialog && fileClaimMutation.mutate(showClaimDialog.id),
                  disabled: !damageDesc || !estLoss || fileClaimMutation.isPending,
                  "data-ocid": "insurance.claim_submit_button",
                  children: fileClaimMutation.isPending ? t("Filing...", "Inafungua...") : t("File Claim", "Fungua Madai")
                }
              )
            ] })
          ] })
        ] })
      }
    )
  ] }) });
}
export {
  InsurancePage as default
};
