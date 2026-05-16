import { k as createLucideIcon, a as useLanguageStore, Z as useBackend, aA as useQueryClient, r as reactExports, aB as useQuery, j as jsxRuntimeExports, L as Layout, B as Button, S as Search, I as Input, n as Skeleton, m as Badge, y as MapPin, K as Clock, aa as Star, l as Textarea } from "./index-BUVIgngH.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-ChCgH42_.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-Coi4Z4Fu.js";
import { L as Label } from "./label-BTY_QCm0.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C7D5N9Bz.js";
import { u as useMutation } from "./useMutation-BB6v1FNg.js";
import { u as ue } from "./index-c308oYmR.js";
import { P as Plus } from "./plus-DMsGFanj.js";
import { B as Briefcase } from "./briefcase-WOQc6aU0.js";
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
  ["line", { x1: "12", x2: "12", y1: "2", y2: "22", key: "7eqyqh" }],
  ["path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", key: "1b0p4s" }]
];
const DollarSign = createLucideIcon("dollar-sign", __iconNode);
const JOB_TYPES = {
  planting: "Planting",
  harvesting: "Harvesting",
  spraying: "Spraying",
  livestockCare: "Livestock Care",
  transport: "Transport",
  other: "Other"
};
const JOB_TYPES_SW = {
  planting: "Kupanda",
  harvesting: "Kuvuna",
  spraying: "Kunyunyiza",
  livestockCare: "Kutunza Mifugo",
  transport: "Usafiri",
  other: "Nyingine"
};
function JobMarketplacePage() {
  const { language } = useLanguageStore();
  const t = (en, sw) => language === "sw" ? sw : en;
  const { actor } = useBackend();
  const qc = useQueryClient();
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [filterType, setFilterType] = reactExports.useState("all");
  const [showPostDialog, setShowPostDialog] = reactExports.useState(false);
  const [showWorkerDialog, setShowWorkerDialog] = reactExports.useState(false);
  const [showApplyDialog, setShowApplyDialog] = reactExports.useState(
    null
  );
  const [activeTab, setActiveTab] = reactExports.useState("jobs");
  const [jobTitle, setJobTitle] = reactExports.useState("");
  const [jobDesc, setJobDesc] = reactExports.useState("");
  const [jobType, setJobType] = reactExports.useState("planting");
  const [payRate, setPayRate] = reactExports.useState("");
  const [jobLocation, setJobLocation] = reactExports.useState("");
  const [jobDeadline, setJobDeadline] = reactExports.useState("");
  const [jobSkills, setJobSkills] = reactExports.useState("");
  const [coverNote, setCoverNote] = reactExports.useState("");
  const [workerName, setWorkerName] = reactExports.useState("");
  const [workerSkills, setWorkerSkills] = reactExports.useState("");
  const [workerArea, setWorkerArea] = reactExports.useState("");
  const [workerAvail, setWorkerAvail] = reactExports.useState("");
  const [workerBio, setWorkerBio] = reactExports.useState("");
  const { data: jobs, isLoading: jobsLoading } = useQuery({
    queryKey: ["jobs", filterType],
    queryFn: async () => {
      if (!actor) return [];
      const typeFilter = filterType !== "all" ? { [filterType]: null } : null;
      return actor.listJobs(typeFilter, null, null);
    },
    enabled: !!actor
  });
  const { data: workers, isLoading: workersLoading } = useQuery({
    queryKey: ["workers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listWorkerProfiles(null, null);
    },
    enabled: !!actor
  });
  const { data: myApplications } = useQuery({
    queryKey: ["myJobApplications"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyJobApplications();
    },
    enabled: !!actor
  });
  const postJobMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const deadlineTs = BigInt(new Date(jobDeadline).getTime()) * BigInt(1e6);
      const skills = jobSkills.split(",").map((s) => s.trim()).filter(Boolean);
      const jt = { [jobType]: null };
      return actor.createJobListing(
        jobTitle,
        jobDesc,
        jt,
        payRate,
        jobLocation,
        deadlineTs,
        skills
      );
    },
    onSuccess: () => {
      ue.success(t("Job posted successfully!", "Kazi imewekwa!"));
      qc.invalidateQueries({ queryKey: ["jobs"] });
      setShowPostDialog(false);
      setJobTitle("");
      setJobDesc("");
      setPayRate("");
      setJobLocation("");
      setJobDeadline("");
      setJobSkills("");
    },
    onError: () => ue.error(t("Failed to post job", "Imeshindwa kuweka kazi"))
  });
  const createWorkerMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const skills = workerSkills.split(",").map((s) => s.trim()).filter(Boolean);
      return actor.createWorkerProfile(
        workerName,
        skills,
        workerArea,
        workerAvail,
        workerBio
      );
    },
    onSuccess: () => {
      ue.success(
        t("Worker profile created!", "Wasifu wa mfanyakazi umeundwa!")
      );
      qc.invalidateQueries({ queryKey: ["workers"] });
      setShowWorkerDialog(false);
    },
    onError: () => ue.error(t("Failed to create profile", "Imeshindwa kuunda wasifu"))
  });
  const applyMutation = useMutation({
    mutationFn: async (jobId) => {
      if (!actor) throw new Error("Not connected");
      return actor.applyToJob(jobId, coverNote);
    },
    onSuccess: () => {
      ue.success(t("Application submitted!", "Maombi yamewasilishwa!"));
      qc.invalidateQueries({ queryKey: ["myJobApplications"] });
      setShowApplyDialog(null);
      setCoverNote("");
    },
    onError: () => ue.error(t("Failed to apply", "Imeshindwa kuomba"))
  });
  const appliedJobIds = new Set(
    (myApplications ?? []).map((a) => a.jobId.toString())
  );
  const filteredJobs = (jobs ?? []).filter((j) => {
    const search = searchTerm.toLowerCase();
    return !search || j.title.toLowerCase().includes(search) || j.location.toLowerCase().includes(search);
  });
  const filteredWorkers = (workers ?? []).filter((w) => {
    const search = searchTerm.toLowerCase();
    return !search || w.name.toLowerCase().includes(search) || w.serviceArea.toLowerCase().includes(search);
  });
  const getJobTypeLabel = (jt) => {
    const key = Object.keys(jt)[0];
    return language === "sw" ? JOB_TYPES_SW[key] ?? key : JOB_TYPES[key] ?? key;
  };
  const getStatusColor = (s) => {
    const key = Object.keys(s)[0];
    if (key === "open") return "default";
    if (key === "filled") return "secondary";
    if (key === "completed") return "outline";
    return "destructive";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: t("Job & Labor Marketplace", "Soko la Kazi na Wafanyakazi") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: t(
          "Find workers or post jobs for agricultural tasks",
          "Pata wafanyakazi au weka kazi za kilimo"
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => setShowPostDialog(true),
            "data-ocid": "job.post_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
              t("Post a Job", "Weka Kazi")
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: () => setShowWorkerDialog(true),
            "data-ocid": "job.create_worker_button",
            children: t("Create Worker Profile", "Unda Wasifu wa Mfanyakazi")
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: `px-4 py-2 text-sm font-medium transition-colors ${activeTab === "jobs" ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"}`,
          onClick: () => setActiveTab("jobs"),
          "data-ocid": "job.jobs_tab",
          children: [
            t("Jobs", "Kazi"),
            " ",
            jobs ? `(${jobs.length})` : ""
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: `px-4 py-2 text-sm font-medium transition-colors ${activeTab === "workers" ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"}`,
          onClick: () => setActiveTab("workers"),
          "data-ocid": "job.workers_tab",
          children: [
            t("Workers", "Wafanyakazi"),
            " ",
            workers ? `(${workers.length})` : ""
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            className: "pl-9",
            placeholder: t(
              "Search jobs or workers...",
              "Tafuta kazi au wafanyakazi..."
            ),
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value),
            "data-ocid": "job.search_input"
          }
        )
      ] }),
      activeTab === "jobs" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: filterType, onValueChange: setFilterType, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            className: "w-full sm:w-48",
            "data-ocid": "job.type_filter_select",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: t("All Types", "Aina Zote") })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: t("All Types", "Aina Zote") }),
          Object.entries(JOB_TYPES).map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: k, children: language === "sw" ? JOB_TYPES_SW[k] : v }, k))
        ] })
      ] })
    ] }),
    activeTab === "jobs" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: jobsLoading ? ["s0", "s1", "s2"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full rounded-lg" }, k)) : filteredJobs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-12 h-12 mx-auto mb-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: t("No jobs found", "Hakuna kazi zilizopatikana") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          className: "mt-4",
          onClick: () => setShowPostDialog(true),
          "data-ocid": "job.empty_state",
          children: t("Post the First Job", "Weka Kazi ya Kwanza")
        }
      )
    ] }) }) : filteredJobs.map((job, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": `job.item.${idx + 1}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground truncate", children: job.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: getStatusColor(job.status), children: job.status }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: getJobTypeLabel(job.jobType) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-2 mb-2", children: job.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3" }),
            job.location
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "w-3 h-3" }),
            job.payRate
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
            t("Deadline", "Mwisho"),
            ":",
            " ",
            new Date(
              Number(job.deadline) / 1e6
            ).toLocaleDateString()
          ] })
        ] }),
        job.requiredSkills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 mt-2", children: job.requiredSkills.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: "secondary",
            className: "text-xs",
            children: s
          },
          s
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 shrink-0", children: appliedJobIds.has(job.id.toString()) ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: t("Applied", "Umeomba") }) : Object.keys(job.status)[0] === "open" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "sm",
          onClick: () => setShowApplyDialog(job),
          "data-ocid": `job.apply_button.${idx + 1}`,
          children: t("Apply", "Omba")
        }
      ) : null })
    ] }) }) }, job.id.toString())) }),
    activeTab === "workers" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4", children: workersLoading ? ["s0", "s1", "s2", "s3", "s4", "s5"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full rounded-lg" }, k)) : filteredWorkers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-muted-foreground",
          "data-ocid": "job.workers_empty_state",
          children: t(
            "No worker profiles yet",
            "Hakuna wasifu wa wafanyakazi bado"
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          className: "mt-4",
          onClick: () => setShowWorkerDialog(true),
          children: t("Create First Profile", "Unda Wasifu wa Kwanza")
        }
      )
    ] }) }) }) : filteredWorkers.map((w, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        "data-ocid": `job.worker.item.${idx + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: w.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 fill-yellow-400 text-yellow-400" }),
              w.rating.toFixed(1),
              " (",
              Number(w.ratingCount),
              " ",
              t("reviews", "maoni"),
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3" }),
              w.serviceArea
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: w.availability }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm line-clamp-2", children: w.bio }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: w.skills.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: s }, s)) })
          ] })
        ]
      },
      w.id.toString()
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showPostDialog, onOpenChange: setShowPostDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: t("Post a Job", "Weka Kazi") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("Job Title", "Kichwa cha Kazi") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: jobTitle,
              onChange: (e) => setJobTitle(e.target.value),
              placeholder: t(
                "e.g. Harvesting workers needed",
                "mf. Wahitaji wa kuvuna"
              ),
              "data-ocid": "job.title_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("Description", "Maelezo") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: jobDesc,
              onChange: (e) => setJobDesc(e.target.value),
              placeholder: t("Describe the job...", "Elezea kazi..."),
              "data-ocid": "job.description_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("Job Type", "Aina ya Kazi") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: jobType, onValueChange: setJobType, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "job.type_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.entries(JOB_TYPES).map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: k, children: language === "sw" ? JOB_TYPES_SW[k] : v }, k)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("Pay Rate", "Kiwango cha Malipo") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: payRate,
                onChange: (e) => setPayRate(e.target.value),
                placeholder: "TSh 30,000/day",
                "data-ocid": "job.pay_rate_input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("Location", "Mahali") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: jobLocation,
                onChange: (e) => setJobLocation(e.target.value),
                placeholder: "Dodoma",
                "data-ocid": "job.location_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("Deadline", "Mwisho") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: jobDeadline,
                onChange: (e) => setJobDeadline(e.target.value),
                "data-ocid": "job.deadline_input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t(
            "Required Skills (comma-separated)",
            "Ujuzi Unaohitajika (tenganisha kwa koma)"
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: jobSkills,
              onChange: (e) => setJobSkills(e.target.value),
              placeholder: "weeding, tractor, manual labor",
              "data-ocid": "job.skills_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setShowPostDialog(false),
              "data-ocid": "job.cancel_button",
              children: t("Cancel", "Ghairi")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: () => postJobMutation.mutate(),
              disabled: !jobTitle || !jobDeadline || postJobMutation.isPending,
              "data-ocid": "job.submit_button",
              children: postJobMutation.isPending ? t("Posting...", "Inaweka...") : t("Post Job", "Weka Kazi")
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showWorkerDialog, onOpenChange: setShowWorkerDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: t("Create Worker Profile", "Unda Wasifu wa Mfanyakazi") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("Your Name", "Jina Lako") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: workerName,
              onChange: (e) => setWorkerName(e.target.value),
              "data-ocid": "job.worker_name_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("Skills (comma-separated)", "Ujuzi (tenganisha kwa koma)") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: workerSkills,
              onChange: (e) => setWorkerSkills(e.target.value),
              placeholder: "planting, harvesting",
              "data-ocid": "job.worker_skills_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("Service Area", "Eneo la Huduma") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: workerArea,
                onChange: (e) => setWorkerArea(e.target.value),
                "data-ocid": "job.worker_area_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("Availability", "Upatikanaji") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: workerAvail,
                onChange: (e) => setWorkerAvail(e.target.value),
                placeholder: "Mon–Sat",
                "data-ocid": "job.worker_avail_input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("Bio", "Kuhusu Mimi") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: workerBio,
              onChange: (e) => setWorkerBio(e.target.value),
              "data-ocid": "job.worker_bio_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setShowWorkerDialog(false),
              "data-ocid": "job.worker_cancel_button",
              children: t("Cancel", "Ghairi")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: () => createWorkerMutation.mutate(),
              disabled: !workerName || createWorkerMutation.isPending,
              "data-ocid": "job.worker_submit_button",
              children: createWorkerMutation.isPending ? t("Creating...", "Inaunda...") : t("Create Profile", "Unda Wasifu")
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!showApplyDialog,
        onOpenChange: () => setShowApplyDialog(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
            t("Apply for Job", "Omba Kazi"),
            ": ",
            showApplyDialog == null ? void 0 : showApplyDialog.title
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("Cover Note", "Barua ya Maombi") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  value: coverNote,
                  onChange: (e) => setCoverNote(e.target.value),
                  placeholder: t(
                    "Tell the employer why you're the right person...",
                    "Mwambie mwajiri kwa nini wewe ni mtu sahihi..."
                  ),
                  rows: 4,
                  "data-ocid": "job.cover_note_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  onClick: () => setShowApplyDialog(null),
                  "data-ocid": "job.apply_cancel_button",
                  children: t("Cancel", "Ghairi")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: () => showApplyDialog && applyMutation.mutate(showApplyDialog.id),
                  disabled: !coverNote || applyMutation.isPending,
                  "data-ocid": "job.apply_submit_button",
                  children: applyMutation.isPending ? t("Applying...", "Inaomba...") : t("Submit Application", "Wasilisha Maombi")
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
  JobMarketplacePage as default
};
