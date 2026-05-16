import type { JobListing, JobStatus, JobType, WorkerProfile } from "@/backend";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useBackend } from "@/hooks/useBackend";
import { useLanguageStore } from "@/store/languageStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Briefcase,
  Clock,
  DollarSign,
  MapPin,
  Plus,
  Search,
  Star,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const JOB_TYPES: Record<string, string> = {
  planting: "Planting",
  harvesting: "Harvesting",
  spraying: "Spraying",
  livestockCare: "Livestock Care",
  transport: "Transport",
  other: "Other",
};

const JOB_TYPES_SW: Record<string, string> = {
  planting: "Kupanda",
  harvesting: "Kuvuna",
  spraying: "Kunyunyiza",
  livestockCare: "Kutunza Mifugo",
  transport: "Usafiri",
  other: "Nyingine",
};

export default function JobMarketplacePage() {
  const { language } = useLanguageStore();
  const t = (en: string, sw: string) => (language === "sw" ? sw : en);
  const { actor } = useBackend();
  const qc = useQueryClient();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [showPostDialog, setShowPostDialog] = useState(false);
  const [showWorkerDialog, setShowWorkerDialog] = useState(false);
  const [showApplyDialog, setShowApplyDialog] = useState<JobListing | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState<"jobs" | "workers">("jobs");

  // Post job form
  const [jobTitle, setJobTitle] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobType, setJobType] = useState("planting");
  const [payRate, setPayRate] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobDeadline, setJobDeadline] = useState("");
  const [jobSkills, setJobSkills] = useState("");
  const [coverNote, setCoverNote] = useState("");

  // Worker profile form
  const [workerName, setWorkerName] = useState("");
  const [workerSkills, setWorkerSkills] = useState("");
  const [workerArea, setWorkerArea] = useState("");
  const [workerAvail, setWorkerAvail] = useState("");
  const [workerBio, setWorkerBio] = useState("");

  const { data: jobs, isLoading: jobsLoading } = useQuery<JobListing[]>({
    queryKey: ["jobs", filterType],
    queryFn: async () => {
      if (!actor) return [];
      const typeFilter =
        filterType !== "all"
          ? ({ [filterType]: null } as unknown as JobType)
          : null;
      return actor.listJobs(typeFilter, null, null);
    },
    enabled: !!actor,
  });

  const { data: workers, isLoading: workersLoading } = useQuery<
    WorkerProfile[]
  >({
    queryKey: ["workers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listWorkerProfiles(null, null);
    },
    enabled: !!actor,
  });

  const { data: myApplications } = useQuery({
    queryKey: ["myJobApplications"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyJobApplications();
    },
    enabled: !!actor,
  });

  const postJobMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const deadlineTs =
        BigInt(new Date(jobDeadline).getTime()) * BigInt(1_000_000);
      const skills = jobSkills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const jt = { [jobType]: null } as unknown as JobType;
      return actor.createJobListing(
        jobTitle,
        jobDesc,
        jt,
        payRate,
        jobLocation,
        deadlineTs,
        skills,
      );
    },
    onSuccess: () => {
      toast.success(t("Job posted successfully!", "Kazi imewekwa!"));
      qc.invalidateQueries({ queryKey: ["jobs"] });
      setShowPostDialog(false);
      setJobTitle("");
      setJobDesc("");
      setPayRate("");
      setJobLocation("");
      setJobDeadline("");
      setJobSkills("");
    },
    onError: () =>
      toast.error(t("Failed to post job", "Imeshindwa kuweka kazi")),
  });

  const createWorkerMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const skills = workerSkills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      return actor.createWorkerProfile(
        workerName,
        skills,
        workerArea,
        workerAvail,
        workerBio,
      );
    },
    onSuccess: () => {
      toast.success(
        t("Worker profile created!", "Wasifu wa mfanyakazi umeundwa!"),
      );
      qc.invalidateQueries({ queryKey: ["workers"] });
      setShowWorkerDialog(false);
    },
    onError: () =>
      toast.error(t("Failed to create profile", "Imeshindwa kuunda wasifu")),
  });

  const applyMutation = useMutation({
    mutationFn: async (jobId: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.applyToJob(jobId, coverNote);
    },
    onSuccess: () => {
      toast.success(t("Application submitted!", "Maombi yamewasilishwa!"));
      qc.invalidateQueries({ queryKey: ["myJobApplications"] });
      setShowApplyDialog(null);
      setCoverNote("");
    },
    onError: () => toast.error(t("Failed to apply", "Imeshindwa kuomba")),
  });

  const appliedJobIds = new Set(
    (myApplications ?? []).map((a) => a.jobId.toString()),
  );

  const filteredJobs = (jobs ?? []).filter((j) => {
    const search = searchTerm.toLowerCase();
    return (
      !search ||
      j.title.toLowerCase().includes(search) ||
      j.location.toLowerCase().includes(search)
    );
  });

  const filteredWorkers = (workers ?? []).filter((w) => {
    const search = searchTerm.toLowerCase();
    return (
      !search ||
      w.name.toLowerCase().includes(search) ||
      w.serviceArea.toLowerCase().includes(search)
    );
  });

  const getJobTypeLabel = (jt: JobType) => {
    const key = Object.keys(jt)[0];
    return language === "sw"
      ? (JOB_TYPES_SW[key] ?? key)
      : (JOB_TYPES[key] ?? key);
  };

  const getStatusColor = (
    s: JobStatus,
  ): "default" | "secondary" | "outline" | "destructive" => {
    const key = Object.keys(s as unknown as object)[0];
    if (key === "open") return "default";
    if (key === "filled") return "secondary";
    if (key === "completed") return "outline";
    return "destructive";
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {t("Job & Labor Marketplace", "Soko la Kazi na Wafanyakazi")}
            </h1>
            <p className="text-muted-foreground">
              {t(
                "Find workers or post jobs for agricultural tasks",
                "Pata wafanyakazi au weka kazi za kilimo",
              )}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setShowPostDialog(true)}
              data-ocid="job.post_button"
            >
              <Plus className="w-4 h-4 mr-2" />
              {t("Post a Job", "Weka Kazi")}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowWorkerDialog(true)}
              data-ocid="job.create_worker_button"
            >
              {t("Create Worker Profile", "Unda Wasifu wa Mfanyakazi")}
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "jobs"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab("jobs")}
            data-ocid="job.jobs_tab"
          >
            {t("Jobs", "Kazi")} {jobs ? `(${jobs.length})` : ""}
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "workers"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab("workers")}
            data-ocid="job.workers_tab"
          >
            {t("Workers", "Wafanyakazi")} {workers ? `(${workers.length})` : ""}
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder={t(
                "Search jobs or workers...",
                "Tafuta kazi au wafanyakazi...",
              )}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              data-ocid="job.search_input"
            />
          </div>
          {activeTab === "jobs" && (
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger
                className="w-full sm:w-48"
                data-ocid="job.type_filter_select"
              >
                <SelectValue placeholder={t("All Types", "Aina Zote")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {t("All Types", "Aina Zote")}
                </SelectItem>
                {Object.entries(JOB_TYPES).map(([k, v]) => (
                  <SelectItem key={k} value={k}>
                    {language === "sw" ? JOB_TYPES_SW[k] : v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Jobs Tab */}
        {activeTab === "jobs" && (
          <div className="space-y-4">
            {jobsLoading ? (
              ["s0", "s1", "s2"].map((k) => (
                <Skeleton key={k} className="h-32 w-full rounded-lg" />
              ))
            ) : filteredJobs.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Briefcase className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    {t("No jobs found", "Hakuna kazi zilizopatikana")}
                  </p>
                  <Button
                    className="mt-4"
                    onClick={() => setShowPostDialog(true)}
                    data-ocid="job.empty_state"
                  >
                    {t("Post the First Job", "Weka Kazi ya Kwanza")}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              filteredJobs.map((job, idx) => (
                <Card key={job.id.toString()} data-ocid={`job.item.${idx + 1}`}>
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground truncate">
                            {job.title}
                          </h3>
                          <Badge variant={getStatusColor(job.status)}>
                            {job.status}
                          </Badge>
                          <Badge variant="outline">
                            {getJobTypeLabel(job.jobType)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                          {job.description}
                        </p>
                        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            {job.payRate}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {t("Deadline", "Mwisho")}:{" "}
                            {new Date(
                              Number(job.deadline) / 1_000_000,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        {job.requiredSkills.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {job.requiredSkills.map((s) => (
                              <Badge
                                key={s}
                                variant="secondary"
                                className="text-xs"
                              >
                                {s}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 shrink-0">
                        {appliedJobIds.has(job.id.toString()) ? (
                          <Badge variant="secondary">
                            {t("Applied", "Umeomba")}
                          </Badge>
                        ) : Object.keys(job.status as unknown as object)[0] ===
                          "open" ? (
                          <Button
                            size="sm"
                            onClick={() => setShowApplyDialog(job)}
                            data-ocid={`job.apply_button.${idx + 1}`}
                          >
                            {t("Apply", "Omba")}
                          </Button>
                        ) : null}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Workers Tab */}
        {activeTab === "workers" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {workersLoading ? (
              ["s0", "s1", "s2", "s3", "s4", "s5"].map((k) => (
                <Skeleton key={k} className="h-48 w-full rounded-lg" />
              ))
            ) : filteredWorkers.length === 0 ? (
              <div className="col-span-full">
                <Card>
                  <CardContent className="py-12 text-center">
                    <p
                      className="text-muted-foreground"
                      data-ocid="job.workers_empty_state"
                    >
                      {t(
                        "No worker profiles yet",
                        "Hakuna wasifu wa wafanyakazi bado",
                      )}
                    </p>
                    <Button
                      className="mt-4"
                      onClick={() => setShowWorkerDialog(true)}
                    >
                      {t("Create First Profile", "Unda Wasifu wa Kwanza")}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ) : (
              filteredWorkers.map((w, idx) => (
                <Card
                  key={w.id.toString()}
                  data-ocid={`job.worker.item.${idx + 1}`}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{w.name}</CardTitle>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {w.rating.toFixed(1)} ({Number(w.ratingCount)}{" "}
                      {t("reviews", "maoni")})
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {w.serviceArea}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {w.availability}
                    </p>
                    <p className="text-sm line-clamp-2">{w.bio}</p>
                    <div className="flex flex-wrap gap-1">
                      {w.skills.map((s) => (
                        <Badge key={s} variant="secondary" className="text-xs">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Post Job Dialog */}
        <Dialog open={showPostDialog} onOpenChange={setShowPostDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{t("Post a Job", "Weka Kazi")}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>{t("Job Title", "Kichwa cha Kazi")}</Label>
                <Input
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder={t(
                    "e.g. Harvesting workers needed",
                    "mf. Wahitaji wa kuvuna",
                  )}
                  data-ocid="job.title_input"
                />
              </div>
              <div>
                <Label>{t("Description", "Maelezo")}</Label>
                <Textarea
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                  placeholder={t("Describe the job...", "Elezea kazi...")}
                  data-ocid="job.description_input"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>{t("Job Type", "Aina ya Kazi")}</Label>
                  <Select value={jobType} onValueChange={setJobType}>
                    <SelectTrigger data-ocid="job.type_select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(JOB_TYPES).map(([k, v]) => (
                        <SelectItem key={k} value={k}>
                          {language === "sw" ? JOB_TYPES_SW[k] : v}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>{t("Pay Rate", "Kiwango cha Malipo")}</Label>
                  <Input
                    value={payRate}
                    onChange={(e) => setPayRate(e.target.value)}
                    placeholder="TSh 30,000/day"
                    data-ocid="job.pay_rate_input"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>{t("Location", "Mahali")}</Label>
                  <Input
                    value={jobLocation}
                    onChange={(e) => setJobLocation(e.target.value)}
                    placeholder="Dodoma"
                    data-ocid="job.location_input"
                  />
                </div>
                <div>
                  <Label>{t("Deadline", "Mwisho")}</Label>
                  <Input
                    type="date"
                    value={jobDeadline}
                    onChange={(e) => setJobDeadline(e.target.value)}
                    data-ocid="job.deadline_input"
                  />
                </div>
              </div>
              <div>
                <Label>
                  {t(
                    "Required Skills (comma-separated)",
                    "Ujuzi Unaohitajika (tenganisha kwa koma)",
                  )}
                </Label>
                <Input
                  value={jobSkills}
                  onChange={(e) => setJobSkills(e.target.value)}
                  placeholder="weeding, tractor, manual labor"
                  data-ocid="job.skills_input"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowPostDialog(false)}
                  data-ocid="job.cancel_button"
                >
                  {t("Cancel", "Ghairi")}
                </Button>
                <Button
                  onClick={() => postJobMutation.mutate()}
                  disabled={
                    !jobTitle || !jobDeadline || postJobMutation.isPending
                  }
                  data-ocid="job.submit_button"
                >
                  {postJobMutation.isPending
                    ? t("Posting...", "Inaweka...")
                    : t("Post Job", "Weka Kazi")}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Create Worker Profile Dialog */}
        <Dialog open={showWorkerDialog} onOpenChange={setShowWorkerDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {t("Create Worker Profile", "Unda Wasifu wa Mfanyakazi")}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>{t("Your Name", "Jina Lako")}</Label>
                <Input
                  value={workerName}
                  onChange={(e) => setWorkerName(e.target.value)}
                  data-ocid="job.worker_name_input"
                />
              </div>
              <div>
                <Label>
                  {t("Skills (comma-separated)", "Ujuzi (tenganisha kwa koma)")}
                </Label>
                <Input
                  value={workerSkills}
                  onChange={(e) => setWorkerSkills(e.target.value)}
                  placeholder="planting, harvesting"
                  data-ocid="job.worker_skills_input"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>{t("Service Area", "Eneo la Huduma")}</Label>
                  <Input
                    value={workerArea}
                    onChange={(e) => setWorkerArea(e.target.value)}
                    data-ocid="job.worker_area_input"
                  />
                </div>
                <div>
                  <Label>{t("Availability", "Upatikanaji")}</Label>
                  <Input
                    value={workerAvail}
                    onChange={(e) => setWorkerAvail(e.target.value)}
                    placeholder="Mon–Sat"
                    data-ocid="job.worker_avail_input"
                  />
                </div>
              </div>
              <div>
                <Label>{t("Bio", "Kuhusu Mimi")}</Label>
                <Textarea
                  value={workerBio}
                  onChange={(e) => setWorkerBio(e.target.value)}
                  data-ocid="job.worker_bio_input"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowWorkerDialog(false)}
                  data-ocid="job.worker_cancel_button"
                >
                  {t("Cancel", "Ghairi")}
                </Button>
                <Button
                  onClick={() => createWorkerMutation.mutate()}
                  disabled={!workerName || createWorkerMutation.isPending}
                  data-ocid="job.worker_submit_button"
                >
                  {createWorkerMutation.isPending
                    ? t("Creating...", "Inaunda...")
                    : t("Create Profile", "Unda Wasifu")}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Apply Dialog */}
        <Dialog
          open={!!showApplyDialog}
          onOpenChange={() => setShowApplyDialog(null)}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {t("Apply for Job", "Omba Kazi")}: {showApplyDialog?.title}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>{t("Cover Note", "Barua ya Maombi")}</Label>
                <Textarea
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  placeholder={t(
                    "Tell the employer why you're the right person...",
                    "Mwambie mwajiri kwa nini wewe ni mtu sahihi...",
                  )}
                  rows={4}
                  data-ocid="job.cover_note_input"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowApplyDialog(null)}
                  data-ocid="job.apply_cancel_button"
                >
                  {t("Cancel", "Ghairi")}
                </Button>
                <Button
                  onClick={() =>
                    showApplyDialog && applyMutation.mutate(showApplyDialog.id)
                  }
                  disabled={!coverNote || applyMutation.isPending}
                  data-ocid="job.apply_submit_button"
                >
                  {applyMutation.isPending
                    ? t("Applying...", "Inaomba...")
                    : t("Submit Application", "Wasilisha Maombi")}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
