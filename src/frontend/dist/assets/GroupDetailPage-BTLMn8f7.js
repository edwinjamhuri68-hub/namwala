import { k as createLucideIcon, a as useLanguageStore, b as useNavigate, r as reactExports, j as jsxRuntimeExports, Q as Users, Y as ShoppingCart, L as Layout, N as CircleCheck, m as Badge, B as Button, X } from "./index-BUVIgngH.js";
import { A as ArrowLeft } from "./arrow-left-BIW276yu.js";
import { C as Copy } from "./copy-Y2yuhiRg.js";
import { T as Trash2 } from "./trash-2-BRLnMANv.js";
import { P as Plus } from "./plus-DMsGFanj.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1", key: "1g98yp" }],
  ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1", key: "1bb6yr" }],
  ["path", { d: "M14 4h7", key: "3xa0d5" }],
  ["path", { d: "M14 9h7", key: "1icrd9" }],
  ["path", { d: "M14 15h7", key: "1mj8o2" }],
  ["path", { d: "M14 20h7", key: "11slyb" }]
];
const LayoutList = createLucideIcon("layout-list", __iconNode);
const CURRENT_USER_ID = "u1";
const GROUP = {
  id: "g1",
  name: "Dodoma Maize Farmers Co-op",
  description: "Bulk buying seeds, fertilizer, and coordinating transport for maize farmers in Dodoma region.",
  inviteCode: "DMF2026"
};
const INITIAL_MEMBERS = [
  { userId: "u1", groupId: "g1", role: "admin", joinedAt: "2026-01-10" },
  { userId: "u2", groupId: "g1", role: "member", joinedAt: "2026-01-12" },
  { userId: "u3", groupId: "g1", role: "member", joinedAt: "2026-01-18" },
  { userId: "u4", groupId: "g1", role: "member", joinedAt: "2026-02-03" },
  { userId: "u5", groupId: "g1", role: "member", joinedAt: "2026-02-20" }
];
const MEMBER_NAMES = {
  u1: "Juma Mwanafunzi",
  u2: "Amina Hassan",
  u3: "Peter Kimani",
  u4: "Grace Nyambura",
  u5: "Ali Bakari"
};
const INITIAL_BULK_REQUESTS = [
  {
    id: "br1",
    groupId: "g1",
    requesterId: "u1",
    itemName: "NPK Fertilizer",
    quantity: 500,
    unit: "kg",
    targetDate: "2026-06-01",
    status: "open",
    responses: ["u2", "u3"]
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
    responses: ["u1", "u2", "u3", "u4"]
  }
];
const GROUP_LISTINGS = [
  {
    id: "gl1",
    title: "Collective Maize — 3,000kg",
    description: "Combined harvest from 5 co-op members. Available immediately.",
    linkedCount: 5
  }
];
const REQUEST_STATUS_STYLES = {
  open: "bg-blue-100 text-blue-700",
  fulfilled: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-muted text-muted-foreground"
};
function GroupDetailPage() {
  const { t } = useLanguageStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = reactExports.useState("members");
  const [members, setMembers] = reactExports.useState(INITIAL_MEMBERS);
  const [bulkRequests, setBulkRequests] = reactExports.useState(
    INITIAL_BULK_REQUESTS
  );
  const [showBulkModal, setShowBulkModal] = reactExports.useState(false);
  const [toast, setToast] = reactExports.useState(null);
  const [codeCopied, setCodeCopied] = reactExports.useState(false);
  const [brItem, setBrItem] = reactExports.useState("");
  const [brQty, setBrQty] = reactExports.useState("");
  const [brUnit, setBrUnit] = reactExports.useState("kg");
  const [brDate, setBrDate] = reactExports.useState("");
  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 3e3);
  }
  function copyCode() {
    navigator.clipboard.writeText(GROUP.inviteCode).catch(() => {
    });
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2e3);
    showToast(t("code_copied"));
  }
  function removeMember(userId) {
    setMembers((prev) => prev.filter((m) => m.userId !== userId));
  }
  function respondToBulkRequest(id) {
    setBulkRequests(
      (prev) => prev.map(
        (r) => r.id === id && !r.responses.includes(CURRENT_USER_ID) ? { ...r, responses: [...r.responses, CURRENT_USER_ID] } : r
      )
    );
    showToast(t("confirm"));
  }
  function createBulkRequest() {
    if (!brItem.trim() || !brQty || !brDate) return;
    const req = {
      id: `br${Date.now()}`,
      groupId: GROUP.id,
      requesterId: CURRENT_USER_ID,
      itemName: brItem.trim(),
      quantity: Number(brQty),
      unit: brUnit,
      targetDate: brDate,
      status: "open",
      responses: []
    };
    setBulkRequests((prev) => [req, ...prev]);
    setBrItem("");
    setBrQty("");
    setBrUnit("kg");
    setBrDate("");
    setShowBulkModal(false);
    showToast(t("confirm"));
  }
  const tabs = [
    { key: "members", label: t("group_members"), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 14 }) },
    { key: "bulk_buy", label: t("bulk_buy"), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { size: 14 }) },
    {
      key: "listings",
      label: t("group_listings"),
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutList, { size: 14 })
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "group_detail.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b px-4 py-4 sticky top-0 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => navigate({ to: "/groups" }),
          className: "text-muted-foreground hover:text-foreground transition-colors",
          "data-ocid": "group_detail.back_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 20 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-base font-bold text-foreground truncate", children: GROUP.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          members.length,
          " ",
          t("members_count")
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-4 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border p-4 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: GROUP.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            t("invite_code"),
            ":"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm font-bold text-foreground", children: GROUP.inviteCode }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "ml-auto text-muted-foreground hover:text-foreground transition-colors",
              onClick: copyCode,
              "data-ocid": "group_detail.copy_invite",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 14 })
            }
          ),
          codeCopied && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 14, className: "text-emerald-600" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex gap-1 bg-muted rounded-xl p-1",
          "data-ocid": "group_detail.tabs",
          children: tabs.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setActiveTab(tab.key),
              className: `flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-colors ${activeTab === tab.key ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
              "data-ocid": `group_detail.tab.${tab.key}`,
              children: [
                tab.icon,
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: tab.label })
              ]
            },
            tab.key
          ))
        }
      ),
      activeTab === "members" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-xl border divide-y", children: members.map((m, i) => {
        var _a;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between px-4 py-3",
            "data-ocid": `group_detail.member.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm", children: ((_a = MEMBER_NAMES[m.userId]) == null ? void 0 : _a.charAt(0)) ?? "?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: MEMBER_NAMES[m.userId] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    t("calendar"),
                    " ",
                    m.joinedAt
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                m.role === "admin" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs bg-primary/10 text-primary border-primary/20", children: t("group_admin") }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: t("role") }),
                m.userId !== CURRENT_USER_ID && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "text-destructive/60 hover:text-destructive transition-colors",
                    onClick: () => removeMember(m.userId),
                    "data-ocid": `group_detail.remove_member.${i + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 })
                  }
                )
              ] })
            ]
          },
          m.userId
        );
      }) }),
      activeTab === "bulk_buy" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            onClick: () => setShowBulkModal(true),
            "data-ocid": "group_detail.bulk_buy_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14, className: "mr-1" }),
              " ",
              t("bulk_buy_request")
            ]
          }
        ) }),
        bulkRequests.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "text-center py-12",
            "data-ocid": "group_detail.bulk_buy_empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ShoppingCart,
                {
                  className: "mx-auto text-muted-foreground/40",
                  size: 40
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-3", children: t("no_records") })
            ]
          }
        ) : bulkRequests.map((req, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card rounded-xl border p-4 space-y-2",
            "data-ocid": `group_detail.bulk_request.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: req.itemName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: `text-xs shrink-0 ${REQUEST_STATUS_STYLES[req.status]}`,
                    children: req.status
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                req.quantity,
                " ",
                req.unit,
                " · ",
                t("eventDate"),
                ":",
                " ",
                req.targetDate
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  req.responses.length,
                  " ",
                  t("members_count"),
                  " ",
                  t("confirm")
                ] }),
                req.status === "open" && !req.responses.includes(CURRENT_USER_ID) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    onClick: () => respondToBulkRequest(req.id),
                    "data-ocid": `group_detail.bulk_respond.${i + 1}`,
                    children: t("confirm")
                  }
                ),
                req.responses.includes(CURRENT_USER_ID) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-emerald-600", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 12 }),
                  " ",
                  t("confirmed")
                ] })
              ] })
            ]
          },
          req.id
        ))
      ] }),
      activeTab === "listings" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            "data-ocid": "group_detail.create_listing_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14, className: "mr-1" }),
              " ",
              t("group_listings")
            ]
          }
        ) }),
        GROUP_LISTINGS.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "text-center py-12",
            "data-ocid": "group_detail.listings_empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                LayoutList,
                {
                  className: "mx-auto text-muted-foreground/40",
                  size: 40
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-3", children: t("noData") })
            ]
          }
        ) : GROUP_LISTINGS.map((listing, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card rounded-xl border p-4 space-y-2",
            "data-ocid": `group_detail.listing.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: listing.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: listing.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
                listing.linkedCount,
                " ",
                t("members_count")
              ] })
            ]
          },
          listing.id
        ))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          className: "w-full text-destructive border-destructive/30 hover:bg-destructive/5",
          "data-ocid": "group_detail.leave_button",
          onClick: () => showToast(t("left_group")),
          children: t("leave_group")
        }
      )
    ] }),
    showBulkModal && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border rounded-2xl w-full max-w-md shadow-xl",
        "data-ocid": "group_detail.bulk_buy_dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-foreground", children: t("bulk_buy_request") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setShowBulkModal(false),
                "data-ocid": "group_detail.bulk_buy_close_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20, className: "text-muted-foreground" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  className: "text-sm font-medium text-foreground",
                  htmlFor: "bulk-item-input",
                  children: t("item_category")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  className: "w-full bg-background border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40",
                  placeholder: "e.g. NPK Fertilizer",
                  value: brItem,
                  onChange: (e) => setBrItem(e.target.value),
                  "data-ocid": "group_detail.bulk_item_input",
                  id: "bulk-item-input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    className: "text-sm font-medium text-foreground",
                    htmlFor: "bulk-qty-input",
                    children: t("quantity")
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    className: "w-full bg-background border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40",
                    type: "number",
                    placeholder: "500",
                    value: brQty,
                    onChange: (e) => setBrQty(e.target.value),
                    "data-ocid": "group_detail.bulk_qty_input",
                    id: "bulk-qty-input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    className: "text-sm font-medium text-foreground",
                    htmlFor: "bulk-unit-select",
                    children: t("record_unit")
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "select",
                  {
                    className: "w-full bg-background border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40",
                    value: brUnit,
                    onChange: (e) => setBrUnit(e.target.value),
                    "data-ocid": "group_detail.bulk_unit_select",
                    id: "bulk-unit-select",
                    children: ["kg", "bags", "liters", "units"].map((u) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: u, children: u }, u))
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  className: "text-sm font-medium text-foreground",
                  htmlFor: "bulk-date-input",
                  children: t("eventDate")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  className: "w-full bg-background border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40",
                  type: "date",
                  value: brDate,
                  onChange: (e) => setBrDate(e.target.value),
                  "data-ocid": "group_detail.bulk_date_input",
                  id: "bulk-date-input"
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
                onClick: () => setShowBulkModal(false),
                "data-ocid": "group_detail.bulk_cancel_button",
                children: t("cancel")
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "flex-1",
                onClick: createBulkRequest,
                disabled: !brItem.trim() || !brQty || !brDate,
                "data-ocid": "group_detail.bulk_submit_button",
                children: t("sendRequest")
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
        "data-ocid": "group_detail.toast",
        children: toast
      }
    )
  ] }) });
}
export {
  GroupDetailPage as default
};
