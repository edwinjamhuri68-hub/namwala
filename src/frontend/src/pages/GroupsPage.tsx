import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useLanguageStore } from "@/store/languageStore";
import type { FarmingGroup } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import { Copy, Plus, Users, X } from "lucide-react";
import { useState } from "react";

const CURRENT_USER_ID = "u1";

const SAMPLE_GROUPS: FarmingGroup[] = [
  {
    id: "g1",
    name: "Dodoma Maize Farmers Co-op",
    description:
      "Bulk buying seeds, fertilizer, and coordinating transport for maize farmers in Dodoma region.",
    adminId: "u1",
    memberIds: ["u1", "u2", "u3", "u4", "u5"],
    inviteCode: "DMF2026",
    createdAt: "2026-01-10",
  },
  {
    id: "g2",
    name: "Central Livestock Keepers",
    description:
      "Coordinating veterinary visits and collective livestock sales for better market prices.",
    adminId: "u2",
    memberIds: ["u1", "u2", "u3"],
    inviteCode: "CLK2026",
    createdAt: "2026-02-15",
  },
];

export default function GroupsPage() {
  const { t } = useLanguageStore();
  const navigate = useNavigate();
  const [groups, setGroups] = useState<FarmingGroup[]>(SAMPLE_GROUPS);
  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [_copiedId, setCopiedId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  function handleCreate() {
    if (!newName.trim()) return;
    const newGroup: FarmingGroup = {
      id: `g${Date.now()}`,
      name: newName.trim(),
      description: newDesc.trim(),
      adminId: CURRENT_USER_ID,
      memberIds: [CURRENT_USER_ID],
      inviteCode:
        newName.slice(0, 3).toUpperCase() + String(Date.now()).slice(-4),
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setGroups((prev) => [newGroup, ...prev]);
    setNewName("");
    setNewDesc("");
    setShowCreate(false);
    showToast(t("group_created"));
  }

  function handleJoin() {
    if (joinCode.length < 4) return;
    setJoinCode("");
    setShowJoin(false);
    showToast(t("joined_group"));
  }

  function copyCode(code: string, id: string) {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    showToast(t("code_copied"));
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background" data-ocid="groups.page">
        {/* Header */}
        <div className="bg-card border-b px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            <div className="flex items-center gap-2">
              <Users className="text-primary" size={22} />
              <h1 className="text-lg font-bold text-foreground">
                {t("my_groups")}
              </h1>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowJoin(true)}
                data-ocid="groups.join_button"
              >
                {t("join_group")}
              </Button>
              <Button
                size="sm"
                onClick={() => setShowCreate(true)}
                data-ocid="groups.create_button"
              >
                <Plus size={16} className="mr-1" />
                {t("create_group")}
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
          {groups.length === 0 ? (
            <div
              className="text-center py-16 space-y-3"
              data-ocid="groups.empty_state"
            >
              <Users className="mx-auto text-muted-foreground/40" size={48} />
              <p className="text-foreground font-medium">{t("no_groups")}</p>
              <p className="text-sm text-muted-foreground">
                {t("create_first_group")}
              </p>
              <div className="flex justify-center gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowJoin(true)}
                >
                  {t("join_with_code")}
                </Button>
                <Button size="sm" onClick={() => setShowCreate(true)}>
                  <Plus size={14} className="mr-1" /> {t("create_group")}
                </Button>
              </div>
            </div>
          ) : (
            groups.map((group, i) => {
              const isAdmin = group.adminId === CURRENT_USER_ID;
              return (
                <div
                  key={group.id}
                  className="bg-card rounded-xl border p-4 space-y-3"
                  data-ocid={`groups.item.${i + 1}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-bold text-foreground">
                          {group.name}
                        </p>
                        {isAdmin && (
                          <Badge className="text-xs bg-primary/10 text-primary border-primary/20">
                            {t("group_admin")}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {group.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    <Badge variant="secondary">
                      <Users size={12} className="mr-1" />
                      {group.memberIds.length} {t("members_count")}
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      {group.createdAt}
                    </p>
                    {isAdmin && (
                      <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded text-xs font-mono">
                        <span>
                          {t("invite_code")}: {group.inviteCode}
                        </span>
                        <button
                          type="button"
                          className="ml-1 text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() => copyCode(group.inviteCode, group.id)}
                          data-ocid={`groups.copy_code.${i + 1}`}
                          title={t("copy_invite_code")}
                        >
                          <Copy size={12} />
                        </button>
                      </div>
                    )}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() =>
                      navigate({
                        to: "/groups/$groupId",
                        params: { groupId: group.id },
                      })
                    }
                    data-ocid={`groups.view_button.${i + 1}`}
                  >
                    {t("viewProfile")}
                  </Button>
                </div>
              );
            })
          )}
        </div>

        {/* Create Group Modal */}
        {showCreate && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
            <div
              className="bg-card border rounded-2xl w-full max-w-md shadow-xl"
              data-ocid="groups.create_dialog"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b">
                <h2 className="font-bold text-foreground">
                  {t("create_group")}
                </h2>
                <button
                  type="button"
                  onClick={() => setShowCreate(false)}
                  data-ocid="groups.create_close_button"
                >
                  <X size={20} className="text-muted-foreground" />
                </button>
              </div>
              <div className="px-5 py-4 space-y-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="groups-name-input"
                    className="text-sm font-medium text-foreground"
                  >
                    {t("group_name")}
                  </label>
                  <input
                    id="groups-name-input"
                    className="w-full bg-background border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/40"
                    placeholder={t("group_name")}
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    data-ocid="groups.name_input"
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="groups-desc-textarea"
                    className="text-sm font-medium text-foreground"
                  >
                    {t("group_description")}
                  </label>
                  <textarea
                    id="groups-desc-textarea"
                    className="w-full bg-background border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                    rows={3}
                    placeholder={t("group_description")}
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    data-ocid="groups.description_textarea"
                  />
                </div>
              </div>
              <div className="px-5 py-4 border-t flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowCreate(false)}
                  data-ocid="groups.create_cancel_button"
                >
                  {t("cancel")}
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleCreate}
                  disabled={!newName.trim()}
                  data-ocid="groups.create_submit_button"
                >
                  {t("create_group")}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Join Group Modal */}
        {showJoin && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
            <div
              className="bg-card border rounded-2xl w-full max-w-md shadow-xl"
              data-ocid="groups.join_dialog"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b">
                <h2 className="font-bold text-foreground">
                  {t("join_with_code")}
                </h2>
                <button
                  type="button"
                  onClick={() => setShowJoin(false)}
                  data-ocid="groups.join_close_button"
                >
                  <X size={20} className="text-muted-foreground" />
                </button>
              </div>
              <div className="px-5 py-4 space-y-3">
                <p className="text-sm text-muted-foreground">
                  {t("enter_invite_code")}
                </p>
                <input
                  className="w-full bg-background border rounded-lg px-3 py-3 text-center text-xl font-mono tracking-widest text-foreground uppercase placeholder:text-muted-foreground/50 outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder="------"
                  maxLength={8}
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  data-ocid="groups.invite_code_input"
                />
              </div>
              <div className="px-5 py-4 border-t flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowJoin(false)}
                  data-ocid="groups.join_cancel_button"
                >
                  {t("cancel")}
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleJoin}
                  disabled={joinCode.length < 4}
                  data-ocid="groups.join_confirm_button"
                >
                  {t("join_group")}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Toast */}
        {toast && (
          <div
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-foreground text-background px-4 py-2 rounded-full text-sm shadow-lg"
            data-ocid="groups.toast"
          >
            {toast}
          </div>
        )}
      </div>
    </Layout>
  );
}
