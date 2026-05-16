import { a as useLanguageStore, b as useNavigate, r as reactExports, j as jsxRuntimeExports, L as Layout, Q as Users, B as Button, m as Badge, X } from "./index-BUVIgngH.js";
import { P as Plus } from "./plus-DMsGFanj.js";
import { C as Copy } from "./copy-Y2yuhiRg.js";
const CURRENT_USER_ID = "u1";
const SAMPLE_GROUPS = [
  {
    id: "g1",
    name: "Dodoma Maize Farmers Co-op",
    description: "Bulk buying seeds, fertilizer, and coordinating transport for maize farmers in Dodoma region.",
    adminId: "u1",
    memberIds: ["u1", "u2", "u3", "u4", "u5"],
    inviteCode: "DMF2026",
    createdAt: "2026-01-10"
  },
  {
    id: "g2",
    name: "Central Livestock Keepers",
    description: "Coordinating veterinary visits and collective livestock sales for better market prices.",
    adminId: "u2",
    memberIds: ["u1", "u2", "u3"],
    inviteCode: "CLK2026",
    createdAt: "2026-02-15"
  }
];
function GroupsPage() {
  const { t } = useLanguageStore();
  const navigate = useNavigate();
  const [groups, setGroups] = reactExports.useState(SAMPLE_GROUPS);
  const [showCreate, setShowCreate] = reactExports.useState(false);
  const [showJoin, setShowJoin] = reactExports.useState(false);
  const [newName, setNewName] = reactExports.useState("");
  const [newDesc, setNewDesc] = reactExports.useState("");
  const [joinCode, setJoinCode] = reactExports.useState("");
  const [_copiedId, setCopiedId] = reactExports.useState(null);
  const [toast, setToast] = reactExports.useState(null);
  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 3e3);
  }
  function handleCreate() {
    if (!newName.trim()) return;
    const newGroup = {
      id: `g${Date.now()}`,
      name: newName.trim(),
      description: newDesc.trim(),
      adminId: CURRENT_USER_ID,
      memberIds: [CURRENT_USER_ID],
      inviteCode: newName.slice(0, 3).toUpperCase() + String(Date.now()).slice(-4),
      createdAt: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
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
  function copyCode(code, id) {
    navigator.clipboard.writeText(code).catch(() => {
    });
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2e3);
    showToast(t("code_copied"));
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "groups.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b px-4 py-4 sticky top-0 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "text-primary", size: 22 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold text-foreground", children: t("my_groups") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setShowJoin(true),
            "data-ocid": "groups.join_button",
            children: t("join_group")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            onClick: () => setShowCreate(true),
            "data-ocid": "groups.create_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16, className: "mr-1" }),
              t("create_group")
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto px-4 py-4 space-y-4", children: groups.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-16 space-y-3",
        "data-ocid": "groups.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "mx-auto text-muted-foreground/40", size: 48 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium", children: t("no_groups") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: t("create_first_group") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center gap-2 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => setShowJoin(true),
                children: t("join_with_code")
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", onClick: () => setShowCreate(true), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14, className: "mr-1" }),
              " ",
              t("create_group")
            ] })
          ] })
        ]
      }
    ) : groups.map((group, i) => {
      const isAdmin = group.adminId === CURRENT_USER_ID;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card rounded-xl border p-4 space-y-3",
          "data-ocid": `groups.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground", children: group.name }),
                isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs bg-primary/10 text-primary border-primary/20", children: t("group_admin") })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: group.description })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 12, className: "mr-1" }),
                group.memberIds.length,
                " ",
                t("members_count")
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: group.createdAt }),
              isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 bg-muted px-2 py-1 rounded text-xs font-mono", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  t("invite_code"),
                  ": ",
                  group.inviteCode
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "ml-1 text-muted-foreground hover:text-foreground transition-colors",
                    onClick: () => copyCode(group.inviteCode, group.id),
                    "data-ocid": `groups.copy_code.${i + 1}`,
                    title: t("copy_invite_code"),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 12 })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "w-full",
                onClick: () => navigate({
                  to: "/groups/$groupId",
                  params: { groupId: group.id }
                }),
                "data-ocid": `groups.view_button.${i + 1}`,
                children: t("viewProfile")
              }
            )
          ]
        },
        group.id
      );
    }) }),
    showCreate && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border rounded-2xl w-full max-w-md shadow-xl",
        "data-ocid": "groups.create_dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-foreground", children: t("create_group") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setShowCreate(false),
                "data-ocid": "groups.create_close_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20, className: "text-muted-foreground" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "groups-name-input",
                  className: "text-sm font-medium text-foreground",
                  children: t("group_name")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "groups-name-input",
                  className: "w-full bg-background border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/40",
                  placeholder: t("group_name"),
                  value: newName,
                  onChange: (e) => setNewName(e.target.value),
                  "data-ocid": "groups.name_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "groups-desc-textarea",
                  className: "text-sm font-medium text-foreground",
                  children: t("group_description")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  id: "groups-desc-textarea",
                  className: "w-full bg-background border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/40 resize-none",
                  rows: 3,
                  placeholder: t("group_description"),
                  value: newDesc,
                  onChange: (e) => setNewDesc(e.target.value),
                  "data-ocid": "groups.description_textarea"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-t flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "flex-1",
                onClick: () => setShowCreate(false),
                "data-ocid": "groups.create_cancel_button",
                children: t("cancel")
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "flex-1",
                onClick: handleCreate,
                disabled: !newName.trim(),
                "data-ocid": "groups.create_submit_button",
                children: t("create_group")
              }
            )
          ] })
        ]
      }
    ) }),
    showJoin && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border rounded-2xl w-full max-w-md shadow-xl",
        "data-ocid": "groups.join_dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-foreground", children: t("join_with_code") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setShowJoin(false),
                "data-ocid": "groups.join_close_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20, className: "text-muted-foreground" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: t("enter_invite_code") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: "w-full bg-background border rounded-lg px-3 py-3 text-center text-xl font-mono tracking-widest text-foreground uppercase placeholder:text-muted-foreground/50 outline-none focus:ring-2 focus:ring-primary/40",
                placeholder: "------",
                maxLength: 8,
                value: joinCode,
                onChange: (e) => setJoinCode(e.target.value.toUpperCase()),
                "data-ocid": "groups.invite_code_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-t flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "flex-1",
                onClick: () => setShowJoin(false),
                "data-ocid": "groups.join_cancel_button",
                children: t("cancel")
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "flex-1",
                onClick: handleJoin,
                disabled: joinCode.length < 4,
                "data-ocid": "groups.join_confirm_button",
                children: t("join_group")
              }
            )
          ] })
        ]
      }
    ) }),
    toast && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-foreground text-background px-4 py-2 rounded-full text-sm shadow-lg",
        "data-ocid": "groups.toast",
        children: toast
      }
    )
  ] }) });
}
export {
  GroupsPage as default
};
