import type {
  ClaimType,
  InsuranceApplication,
  InsuranceClaim,
} from "@/backend";
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
import { AlertCircle, FileText, Plus, Shield } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const COVERAGE_TYPES: Record<string, string> = {
  crop: "Crop",
  livestock: "Livestock",
  equipment: "Equipment",
  other: "Other",
};
const COVERAGE_TYPES_SW: Record<string, string> = {
  crop: "Mazao",
  livestock: "Mifugo",
  equipment: "Vifaa",
  other: "Nyingine",
};
const CLAIM_TYPES: Record<string, string> = {
  drought: "Drought",
  flood: "Flood",
  pestDisease: "Pest / Disease",
  theft: "Theft",
  other: "Other",
};
const CLAIM_TYPES_SW: Record<string, string> = {
  drought: "Ukame",
  flood: "Mafuriko",
  pestDisease: "Wadudu/Ugonjwa",
  theft: "Wizi",
  other: "Nyingine",
};

const STATUS_COLORS: Record<
  string,
  "default" | "secondary" | "destructive" | "outline"
> = {
  pending: "secondary",
  approved: "default",
  rejected: "destructive",
  filed: "secondary",
  underReview: "outline",
  paid: "default",
};

export default function InsurancePage() {
  const { language } = useLanguageStore();
  const t = (en: string, sw: string) => (language === "sw" ? sw : en);
  const { actor } = useBackend();
  const qc = useQueryClient();

  const [activeTab, setActiveTab] = useState<"applications" | "claims">(
    "applications",
  );
  const [showAppDialog, setShowAppDialog] = useState(false);
  const [showClaimDialog, setShowClaimDialog] =
    useState<InsuranceApplication | null>(null);

  // Application form
  const [coverageType, setCoverageType] = useState("crop");
  const [appDesc, setAppDesc] = useState("");
  const [estValue, setEstValue] = useState("");
  const [supportNotes, setSupportNotes] = useState("");

  // Claim form
  const [claimType, setClaimType] = useState("drought");
  const [damageDesc, setDamageDesc] = useState("");
  const [estLoss, setEstLoss] = useState("");
  const [evidenceNotes, setEvidenceNotes] = useState("");

  const { data: applications, isLoading: appsLoading } = useQuery<
    InsuranceApplication[]
  >({
    queryKey: ["myInsuranceApplications"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyInsuranceApplications(null);
    },
    enabled: !!actor,
  });

  const { data: claims, isLoading: claimsLoading } = useQuery<InsuranceClaim[]>(
    {
      queryKey: ["myInsuranceClaims"],
      queryFn: async () => {
        if (!actor) return [];
        return actor.listMyInsuranceClaims(null);
      },
      enabled: !!actor,
    },
  );

  const submitAppMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const ct = {
        [coverageType]: null,
      } as unknown as InsuranceApplication["coverageType"];
      const val = BigInt(Math.round(Number.parseFloat(estValue) || 0));
      return actor.submitInsuranceApplication(ct, appDesc, val, supportNotes);
    },
    onSuccess: () => {
      toast.success(t("Application submitted!", "Maombi yamewasilishwa!"));
      qc.invalidateQueries({ queryKey: ["myInsuranceApplications"] });
      setShowAppDialog(false);
      setAppDesc("");
      setEstValue("");
      setSupportNotes("");
    },
    onError: () =>
      toast.error(
        t("Failed to submit application", "Imeshindwa kuwasilisha maombi"),
      ),
  });

  const fileClaimMutation = useMutation({
    mutationFn: async (appId: bigint) => {
      if (!actor) throw new Error("Not connected");
      const ct = { [claimType]: null } as unknown as ClaimType;
      const loss = BigInt(Math.round(Number.parseFloat(estLoss) || 0));
      return actor.fileInsuranceClaim(
        appId,
        ct,
        damageDesc,
        loss,
        evidenceNotes,
      );
    },
    onSuccess: () => {
      toast.success(t("Claim filed!", "Madai yamefunguliwa!"));
      qc.invalidateQueries({ queryKey: ["myInsuranceClaims"] });
      setShowClaimDialog(null);
      setDamageDesc("");
      setEstLoss("");
      setEvidenceNotes("");
    },
    onError: () =>
      toast.error(t("Failed to file claim", "Imeshindwa kufungua madai")),
  });

  const getCoverageLabel = (ct: unknown) => {
    const key = Object.keys(ct as object)[0];
    return language === "sw"
      ? (COVERAGE_TYPES_SW[key] ?? key)
      : (COVERAGE_TYPES[key] ?? key);
  };

  const getClaimLabel = (ct: unknown) => {
    const key = Object.keys(ct as object)[0];
    return language === "sw"
      ? (CLAIM_TYPES_SW[key] ?? key)
      : (CLAIM_TYPES[key] ?? key);
  };

  const approvedApps = (applications ?? []).filter(
    (a) => Object.keys(a.status as unknown as object)[0] === "approved",
  );

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {t("Agricultural Insurance", "Bima ya Kilimo")}
            </h1>
            <p className="text-muted-foreground">
              {t(
                "Apply for coverage and manage your claims",
                "Omba bima na simamia madai yako",
              )}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setShowAppDialog(true)}
              data-ocid="insurance.apply_button"
            >
              <Plus className="w-4 h-4 mr-2" />
              {t("Apply for Insurance", "Omba Bima")}
            </Button>
            {approvedApps.length > 0 && (
              <Button
                variant="outline"
                onClick={() => setShowClaimDialog(approvedApps[0])}
                data-ocid="insurance.file_claim_button"
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                {t("File a Claim", "Fungua Madai")}
              </Button>
            )}
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">
                {applications?.length ?? 0}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("Applications", "Maombi")}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">
                {approvedApps.length}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("Approved", "Zilizoidhinishwa")}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">
                {claims?.length ?? 0}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("Claims Filed", "Madai Yaliyofunguliwa")}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">
                {
                  (claims ?? []).filter(
                    (c) =>
                      Object.keys(c.status as unknown as object)[0] === "paid",
                  ).length
                }
              </p>
              <p className="text-xs text-muted-foreground">
                {t("Claims Paid", "Madai Yaliyolipwa")}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === "applications" ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"}`}
            onClick={() => setActiveTab("applications")}
            data-ocid="insurance.applications_tab"
          >
            {t("Applications", "Maombi")}
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === "claims" ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"}`}
            onClick={() => setActiveTab("claims")}
            data-ocid="insurance.claims_tab"
          >
            {t("Claims", "Madai")}
          </button>
        </div>

        {/* Applications */}
        {activeTab === "applications" && (
          <div className="space-y-4">
            {appsLoading ? (
              ["s0", "s1", "s2"].map((k) => (
                <Skeleton key={k} className="h-28 w-full rounded-lg" />
              ))
            ) : (applications ?? []).length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Shield className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p
                    className="text-muted-foreground"
                    data-ocid="insurance.apps_empty_state"
                  >
                    {t(
                      "No insurance applications yet",
                      "Hakuna maombi ya bima bado",
                    )}
                  </p>
                  <Button
                    className="mt-4"
                    onClick={() => setShowAppDialog(true)}
                  >
                    {t("Apply Now", "Omba Sasa")}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              (applications ?? []).map((app, idx) => (
                <Card
                  key={app.id.toString()}
                  data-ocid={`insurance.app.item.${idx + 1}`}
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="font-semibold">
                            {getCoverageLabel(app.coverageType)}{" "}
                            {t("Insurance", "Bima")}
                          </h3>
                          <Badge
                            variant={
                              STATUS_COLORS[
                                Object.keys(app.status as unknown as object)[0]
                              ] ?? "outline"
                            }
                          >
                            {Object.keys(app.status as unknown as object)[0]}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-1">
                          {app.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t("Estimated Value", "Thamani Inayokadiriwa")}: TSh{" "}
                          {Number(app.estimatedValue).toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t("Applied", "Iliomba")}:{" "}
                          {new Date(
                            Number(app.createdAt) / 1_000_000,
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      {Object.keys(app.status as unknown as object)[0] ===
                        "approved" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setShowClaimDialog(app)}
                          data-ocid={`insurance.file_claim_button.${idx + 1}`}
                        >
                          {t("File Claim", "Fungua Madai")}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Claims */}
        {activeTab === "claims" && (
          <div className="space-y-4">
            {claimsLoading ? (
              ["s0", "s1", "s2"].map((k) => (
                <Skeleton key={k} className="h-28 w-full rounded-lg" />
              ))
            ) : (claims ?? []).length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p
                    className="text-muted-foreground"
                    data-ocid="insurance.claims_empty_state"
                  >
                    {t(
                      "No claims filed yet",
                      "Hakuna madai yaliyofunguliwa bado",
                    )}
                  </p>
                </CardContent>
              </Card>
            ) : (
              (claims ?? []).map((claim, idx) => (
                <Card
                  key={claim.id.toString()}
                  data-ocid={`insurance.claim.item.${idx + 1}`}
                >
                  <CardContent className="p-4">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-semibold">
                        {getClaimLabel(claim.claimType)} {t("Claim", "Dai")}
                      </h3>
                      <Badge
                        variant={
                          STATUS_COLORS[
                            Object.keys(claim.status as unknown as object)[0]
                          ] ?? "outline"
                        }
                      >
                        {Object.keys(claim.status as unknown as object)[0]}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-1">
                      {claim.damageDescription}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("Estimated Loss", "Hasara Inayokadiriwa")}: TSh{" "}
                      {Number(claim.estimatedLoss).toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("Filed", "Ilifunguliwa")}:{" "}
                      {new Date(
                        Number(claim.createdAt) / 1_000_000,
                      ).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Apply Dialog */}
        <Dialog open={showAppDialog} onOpenChange={setShowAppDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{t("Apply for Insurance", "Omba Bima")}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>{t("Coverage Type", "Aina ya Bima")}</Label>
                <Select value={coverageType} onValueChange={setCoverageType}>
                  <SelectTrigger data-ocid="insurance.coverage_type_select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(COVERAGE_TYPES).map(([k, v]) => (
                      <SelectItem key={k} value={k}>
                        {language === "sw" ? COVERAGE_TYPES_SW[k] : v}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>{t("Description", "Maelezo")}</Label>
                <Textarea
                  value={appDesc}
                  onChange={(e) => setAppDesc(e.target.value)}
                  placeholder={t(
                    "Describe what you want to insure...",
                    "Elezea unachotaka kuhakikishia...",
                  )}
                  data-ocid="insurance.description_input"
                />
              </div>
              <div>
                <Label>
                  {t("Estimated Value (TSh)", "Thamani Inayokadiriwa (TSh)")}
                </Label>
                <Input
                  type="number"
                  value={estValue}
                  onChange={(e) => setEstValue(e.target.value)}
                  placeholder="500000"
                  data-ocid="insurance.value_input"
                />
              </div>
              <div>
                <Label>{t("Supporting Notes", "Maelezo ya Ziada")}</Label>
                <Textarea
                  value={supportNotes}
                  onChange={(e) => setSupportNotes(e.target.value)}
                  placeholder={t(
                    "Any additional information...",
                    "Taarifa yoyote ya ziada...",
                  )}
                  data-ocid="insurance.notes_input"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowAppDialog(false)}
                  data-ocid="insurance.app_cancel_button"
                >
                  {t("Cancel", "Ghairi")}
                </Button>
                <Button
                  onClick={() => submitAppMutation.mutate()}
                  disabled={
                    !appDesc || !estValue || submitAppMutation.isPending
                  }
                  data-ocid="insurance.app_submit_button"
                >
                  {submitAppMutation.isPending
                    ? t("Submitting...", "Inawasilisha...")
                    : t("Submit Application", "Wasilisha Maombi")}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* File Claim Dialog */}
        <Dialog
          open={!!showClaimDialog}
          onOpenChange={() => setShowClaimDialog(null)}
        >
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{t("File a Claim", "Fungua Madai")}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>{t("Claim Type", "Aina ya Madai")}</Label>
                <Select value={claimType} onValueChange={setClaimType}>
                  <SelectTrigger data-ocid="insurance.claim_type_select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(CLAIM_TYPES).map(([k, v]) => (
                      <SelectItem key={k} value={k}>
                        {language === "sw" ? CLAIM_TYPES_SW[k] : v}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>{t("Damage Description", "Maelezo ya Uharibifu")}</Label>
                <Textarea
                  value={damageDesc}
                  onChange={(e) => setDamageDesc(e.target.value)}
                  placeholder={t(
                    "Describe the damage...",
                    "Elezea uharibifu...",
                  )}
                  data-ocid="insurance.damage_desc_input"
                />
              </div>
              <div>
                <Label>
                  {t("Estimated Loss (TSh)", "Hasara Inayokadiriwa (TSh)")}
                </Label>
                <Input
                  type="number"
                  value={estLoss}
                  onChange={(e) => setEstLoss(e.target.value)}
                  data-ocid="insurance.loss_input"
                />
              </div>
              <div>
                <Label>{t("Evidence Notes", "Maelezo ya Ushahidi")}</Label>
                <Textarea
                  value={evidenceNotes}
                  onChange={(e) => setEvidenceNotes(e.target.value)}
                  placeholder={t(
                    "Describe any evidence...",
                    "Elezea ushahidi wowote...",
                  )}
                  data-ocid="insurance.evidence_input"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowClaimDialog(null)}
                  data-ocid="insurance.claim_cancel_button"
                >
                  {t("Cancel", "Ghairi")}
                </Button>
                <Button
                  onClick={() =>
                    showClaimDialog &&
                    fileClaimMutation.mutate(showClaimDialog.id)
                  }
                  disabled={
                    !damageDesc || !estLoss || fileClaimMutation.isPending
                  }
                  data-ocid="insurance.claim_submit_button"
                >
                  {fileClaimMutation.isPending
                    ? t("Filing...", "Inafungua...")
                    : t("File Claim", "Fungua Madai")}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
