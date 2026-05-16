import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/store/languageStore";
import type { BulkBuyRequest, GroupMembership } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  Copy,
  LayoutList,
  Plus,
  ShoppingCart,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

const CURRENT_USER_ID = "u1";

const GROUP = {
  id: "g1",
  name: "Dodoma Maize Farmers Co-op",
  description:
    "Bulk buying seeds, fertilizer, and coordinating transport for maize farmers in Dodoma region.",
  adminId: "u1",
  inviteCode: "DMF2026",
};

const INITIAL_MEMBERS: GroupMembership[] = [
  { userId: "u1", groupId: "g1", role: "admin", joinedAt: "2026-01-10" },
  { userId: "u2", groupId: "g1", role: "member", joinedAt: "2026-01-12" },
  { userId: "u3", groupId: "g1", role: "member", joinedAt: "2026-01-18" },
  { userId: "u4", groupId: "g1", role: "member", joinedAt: "2026-02-03" },
  { userId: "u5", groupId: "g1", role: "member", joinedAt: "2026-02-20" },
];

const MEMBER_NAMES: Record<string, string> = {
  u1: "Juma Mwanafunzi",
  u2: "Amina Hassan",
  u3: "Peter Kimani",
  u4: "Grace Nyambura",
  u5: "Ali Bakari",
};

const INITIAL_BULK_REQUESTS: BulkBuyRequest[] = [
  {
    id: "br1",
    groupId: "g1",
    requesterId: "u1",
    itemName: "NPK Fertilizer",
    quantity: 500,
    unit: "kg",
    targetDate: "2026-06-01",
    status: "open",
    responses: ["u2", "u3"],
  },
  {
    id: "br2",
    groupId: "g1",
    requesterId: "u2",
    itemName: "Hybrid Maize Seeds SC403",
    quantity: 200,
    unit: "bags",
    targetDate: "2026-05-20",
    status: "fulfilled",
    responses: ["u1", "u2", "u3", "u4"],
  },
];

const GROUP_LISTINGS = [
  {
    id: "gl1",
    title: "Collective Maize — 3,000kg",
    description:
      "Combined harvest from 5 co-op members. Available immediately.",
    linkedCount: 5,
  },
];

type Tab = "members" | "bulk_buy" | "listings";

const REQUEST_STATUS_STYLES: Record<string, string> = {
  open: "bg-blue-100 text-blue-700",
  fulfilled: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-muted text-muted-foreground",
};

export default function GroupDetailPage() {
  const { t } = useLanguageStore();
  const navigate = useNavigate();
  const isAdmin = GROUP.adminId === CURRENT_USER_ID;

  const [activeTab, setActiveTab] = useState<Tab>("members");
  const [members, setMembers] = useState<GroupMembership[]>(INITIAL_MEMBERS);
  const [bulkRequests, setBulkRequests] = useState<BulkBuyRequest[]>(
    INITIAL_BULK_REQUESTS,
  );
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [codeCopied, setCodeCopied] = useState(false);

  // Bulk Buy form state
  const [brItem, setBrItem] = useState("");
  const [brQty, setBrQty] = useState("");
  const [brUnit, setBrUnit] = useState("kg");
  const [brDate, setBrDate] = useState("");

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  function copyCode() {
    navigator.clipboard.writeText(GROUP.inviteCode).catch(() => {});
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
    showToast(t("code_copied"));
  }

  function removeMember(userId: string) {
    setMembers((prev) => prev.filter((m) => m.userId !== userId));
  }

  function respondToBulkRequest(id: string) {
    setBulkRequests((prev) =>
      prev.map((r) =>
        r.id === id && !r.responses.includes(CURRENT_USER_ID)
          ? { ...r, responses: [...r.responses, CURRENT_USER_ID] }
          : r,
      ),
    );
    showToast(t("confirm"));
  }

  function createBulkRequest() {
    if (!brItem.trim() || !brQty || !brDate) return;
    const req: BulkBuyRequest = {
      id: `br${Date.now()}`,
      groupId: GROUP.id,
      requesterId: CURRENT_USER_ID,
      itemName: brItem.trim(),
      quantity: Number(brQty),
      unit: brUnit,
      targetDate: brDate,
      status: "open",
      responses: [],
    };
    setBulkRequests((prev) => [req, ...prev]);
    setBrItem("");
    setBrQty("");
    setBrUnit("kg");
    setBrDate("");
    setShowBulkModal(false);
    showToast(t("confirm"));
  }

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "members", label: t("group_members"), icon: <Users size={14} /> },
    { key: "bulk_buy", label: t("bulk_buy"), icon: <ShoppingCart size={14} /> },
    {
      key: "listings",
      label: t("group_listings"),
      icon: <LayoutList size={14} />,
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background" data-ocid="group_detail.page">
        {/* Header */}
        <div className="bg-card border-b px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center gap-3 max-w-2xl mx-auto">
            <button
              type="button"
              onClick={() => navigate({ to: "/groups" })}
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-ocid="group_detail.back_button"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="min-w-0">
              <h1 className="text-base font-bold text-foreground truncate">
                {GROUP.name}
              </h1>
              <p className="text-xs text-muted-foreground">
                {members.length} {t("members_count")}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
          {/* Group Info */}
          <div className="bg-card rounded-xl border p-4 space-y-2">
            <p className="text-sm text-muted-foreground">{GROUP.description}</p>
            {isAdmin && (
              <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2">
                <span className="text-xs text-muted-foreground">
                  {t("invite_code")}:
                </span>
                <span className="font-mono text-sm font-bold text-foreground">
                  {GROUP.inviteCode}
                </span>
                <button
                  type="button"
                  className="ml-auto text-muted-foreground hover:text-foreground transition-colors"
                  onClick={copyCode}
                  data-ocid="group_detail.copy_invite"
                >
                  <Copy size={14} />
                </button>
                {codeCopied && (
                  <CheckCircle2 size={14} className="text-emerald-600" />
                )}
              </div>
            )}
          </div>

          {/* Tabs */}
          <div
            className="flex gap-1 bg-muted rounded-xl p-1"
            data-ocid="group_detail.tabs"
          >
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                  activeTab === tab.key
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-ocid={`group_detail.tab.${tab.key}`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Members Tab */}
          {activeTab === "members" && (
            <div className="bg-card rounded-xl border divide-y">
              {members.map((m, i) => (
                <div
                  key={m.userId}
                  className="flex items-center justify-between px-4 py-3"
                  data-ocid={`group_detail.member.${i + 1}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {MEMBER_NAMES[m.userId]?.charAt(0) ?? "?"}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {MEMBER_NAMES[m.userId]}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t("calendar")} {m.joinedAt}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {m.role === "admin" ? (
                      <Badge className="text-xs bg-primary/10 text-primary border-primary/20">
                        {t("group_admin")}
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-xs">
                        {t("role")}
                      </Badge>
                    )}
                    {isAdmin && m.userId !== CURRENT_USER_ID && (
                      <button
                        type="button"
                        className="text-destructive/60 hover:text-destructive transition-colors"
                        onClick={() => removeMember(m.userId)}
                        data-ocid={`group_detail.remove_member.${i + 1}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bulk Buy Tab */}
          {activeTab === "bulk_buy" && (
            <div className="space-y-3">
              <div className="flex justify-end">
                <Button
                  size="sm"
                  onClick={() => setShowBulkModal(true)}
                  data-ocid="group_detail.bulk_buy_button"
                >
                  <Plus size={14} className="mr-1" /> {t("bulk_buy_request")}
                </Button>
              </div>
              {bulkRequests.length === 0 ? (
                <div
                  className="text-center py-12"
                  data-ocid="group_detail.bulk_buy_empty_state"
                >
                  <ShoppingCart
                    className="mx-auto text-muted-foreground/40"
                    size={40}
                  />
                  <p className="text-muted-foreground mt-3">
                    {t("no_records")}
                  </p>
                </div>
              ) : (
                bulkRequests.map((req, i) => (
                  <div
                    key={req.id}
                    className="bg-card rounded-xl border p-4 space-y-2"
                    data-ocid={`group_detail.bulk_request.${i + 1}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-foreground">
                        {req.itemName}
                      </p>
                      <Badge
                        className={`text-xs shrink-0 ${
                          REQUEST_STATUS_STYLES[req.status]
                        }`}
                      >
                        {req.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {req.quantity} {req.unit} · {t("eventDate")}:{" "}
                      {req.targetDate}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        {req.responses.length} {t("members_count")}{" "}
                        {t("confirm")}
                      </p>
                      {req.status === "open" &&
                        !req.responses.includes(CURRENT_USER_ID) && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => respondToBulkRequest(req.id)}
                            data-ocid={`group_detail.bulk_respond.${i + 1}`}
                          >
                            {t("confirm")}
                          </Button>
                        )}
                      {req.responses.includes(CURRENT_USER_ID) && (
                        <div className="flex items-center gap-1 text-xs text-emerald-600">
                          <CheckCircle2 size={12} /> {t("confirmed")}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Group Listings Tab */}
          {activeTab === "listings" && (
            <div className="space-y-3">
              <div className="flex justify-end">
                <Button
                  size="sm"
                  data-ocid="group_detail.create_listing_button"
                >
                  <Plus size={14} className="mr-1" /> {t("group_listings")}
                </Button>
              </div>
              {GROUP_LISTINGS.length === 0 ? (
                <div
                  className="text-center py-12"
                  data-ocid="group_detail.listings_empty_state"
                >
                  <LayoutList
                    className="mx-auto text-muted-foreground/40"
                    size={40}
                  />
                  <p className="text-muted-foreground mt-3">{t("noData")}</p>
                </div>
              ) : (
                GROUP_LISTINGS.map((listing, i) => (
                  <div
                    key={listing.id}
                    className="bg-card rounded-xl border p-4 space-y-2"
                    data-ocid={`group_detail.listing.${i + 1}`}
                  >
                    <p className="font-semibold text-foreground">
                      {listing.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {listing.description}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      {listing.linkedCount} {t("members_count")}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Leave Group */}
          <Button
            variant="outline"
            className="w-full text-destructive border-destructive/30 hover:bg-destructive/5"
            data-ocid="group_detail.leave_button"
            onClick={() => showToast(t("left_group"))}
          >
            {t("leave_group")}
          </Button>
        </div>

        {/* Bulk Buy Modal */}
        {showBulkModal && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
            <div
              className="bg-card border rounded-2xl w-full max-w-md shadow-xl"
              data-ocid="group_detail.bulk_buy_dialog"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b">
                <h2 className="font-bold text-foreground">
                  {t("bulk_buy_request")}
                </h2>
                <button
                  type="button"
                  onClick={() => setShowBulkModal(false)}
                  data-ocid="group_detail.bulk_buy_close_button"
                >
                  <X size={20} className="text-muted-foreground" />
                </button>
              </div>
              <div className="px-5 py-4 space-y-4">
                <div className="space-y-1.5">
                  <label
                    className="text-sm font-medium text-foreground"
                    htmlFor="bulk-item-input"
                  >
                    {t("item_category")}
                  </label>
                  <input
                    className="w-full bg-background border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                    placeholder="e.g. NPK Fertilizer"
                    value={brItem}
                    onChange={(e) => setBrItem(e.target.value)}
                    data-ocid="group_detail.bulk_item_input"
                    id="bulk-item-input"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label
                      className="text-sm font-medium text-foreground"
                      htmlFor="bulk-qty-input"
                    >
                      {t("quantity")}
                    </label>
                    <input
                      className="w-full bg-background border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                      type="number"
                      placeholder="500"
                      value={brQty}
                      onChange={(e) => setBrQty(e.target.value)}
                      data-ocid="group_detail.bulk_qty_input"
                      id="bulk-qty-input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label
                      className="text-sm font-medium text-foreground"
                      htmlFor="bulk-unit-select"
                    >
                      {t("record_unit")}
                    </label>
                    <select
                      className="w-full bg-background border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                      value={brUnit}
                      onChange={(e) => setBrUnit(e.target.value)}
                      data-ocid="group_detail.bulk_unit_select"
                      id="bulk-unit-select"
                    >
                      {["kg", "bags", "liters", "units"].map((u) => (
                        <option key={u} value={u}>
                          {u}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label
                    className="text-sm font-medium text-foreground"
                    htmlFor="bulk-date-input"
                  >
                    {t("eventDate")}
                  </label>
                  <input
                    className="w-full bg-background border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                    type="date"
                    value={brDate}
                    onChange={(e) => setBrDate(e.target.value)}
                    data-ocid="group_detail.bulk_date_input"
                    id="bulk-date-input"
                  />
                </div>
              </div>
              <div className="px-5 py-4 border-t flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowBulkModal(false)}
                  data-ocid="group_detail.bulk_cancel_button"
                >
                  {t("cancel")}
                </Button>
                <Button
                  className="flex-1"
                  onClick={createBulkRequest}
                  disabled={!brItem.trim() || !brQty || !brDate}
                  data-ocid="group_detail.bulk_submit_button"
                >
                  {t("sendRequest")}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Toast */}
        {toast && (
          <div
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-foreground text-background px-4 py-2 rounded-full text-sm shadow-lg"
            data-ocid="group_detail.toast"
          >
            {toast}
          </div>
        )}
      </div>
    </Layout>
  );
}
