import { a as useLanguageStore, r as reactExports, j as jsxRuntimeExports, L as Layout, P as Package, B as Button, m as Badge, X } from "./index-BUVIgngH.js";
import { P as Plus } from "./plus-DMsGFanj.js";
import { T as TriangleAlert } from "./triangle-alert-CqH2Gyzq.js";
import { P as Pencil } from "./pencil-CuGUdLiy.js";
import { T as Trash2 } from "./trash-2-BRLnMANv.js";
const CATEGORIES = [
  "seeds",
  "fertilizer",
  "pesticide",
  "feed",
  "medicine",
  "equipment",
  "other"
];
const CATEGORY_KEY = {
  seeds: "inv_seeds",
  fertilizer: "inv_fertilizer",
  pesticide: "inv_pesticide",
  feed: "inv_feed",
  medicine: "inv_medicine",
  equipment: "inv_equipment",
  other: "inv_other"
};
const CATEGORY_COLOR = {
  seeds: "bg-lime-100 text-lime-700",
  fertilizer: "bg-emerald-100 text-emerald-700",
  pesticide: "bg-yellow-100 text-yellow-700",
  feed: "bg-orange-100 text-orange-700",
  medicine: "bg-blue-100 text-blue-700",
  equipment: "bg-purple-100 text-purple-700",
  other: "bg-muted text-muted-foreground"
};
const INITIAL_ITEMS = [
  {
    id: "i1",
    ownerId: "u1",
    name: "NPK Fertilizer 20-10-10",
    category: "fertilizer",
    quantity: 8,
    unit: "bags",
    reorderLevel: 10,
    supplierContact: "+255 712 345 678",
    lastRestockedAt: "2026-04-01",
    createdAt: "2026-01-01"
  },
  {
    id: "i2",
    ownerId: "u1",
    name: "Hybrid Maize Seeds SC403",
    category: "seeds",
    quantity: 25,
    unit: "kg",
    reorderLevel: 5,
    supplierContact: "+255 654 321 987",
    lastRestockedAt: "2026-03-15",
    createdAt: "2026-01-01"
  },
  {
    id: "i3",
    ownerId: "u1",
    name: "Buparvaquone Injection",
    category: "medicine",
    quantity: 3,
    unit: "vials",
    reorderLevel: 5,
    supplierContact: "+255 700 111 222",
    createdAt: "2026-02-10"
  },
  {
    id: "i4",
    ownerId: "u1",
    name: "Copper Fungicide",
    category: "pesticide",
    quantity: 15,
    unit: "liters",
    reorderLevel: 5,
    createdAt: "2026-02-01"
  },
  {
    id: "i5",
    ownerId: "u1",
    name: "Sunflower Cattle Feed",
    category: "feed",
    quantity: 4,
    unit: "bags",
    reorderLevel: 8,
    supplierContact: "+255 767 890 123",
    lastRestockedAt: "2026-03-20",
    createdAt: "2026-01-15"
  },
  {
    id: "i6",
    ownerId: "u1",
    name: "Garden Sprayer Pump",
    category: "equipment",
    quantity: 2,
    unit: "units",
    reorderLevel: 1,
    createdAt: "2025-11-01"
  }
];
function stockStatus(qty, reorder) {
  if (qty <= reorder) return "low";
  if (qty <= reorder * 1.5) return "warning";
  return "good";
}
const STATUS_BAR = {
  good: "bg-accent",
  warning: "bg-warning",
  low: "bg-destructive"
};
const STATUS_TEXT = {
  good: "text-accent",
  warning: "text-warning",
  low: "text-destructive"
};
function emptyItemForm() {
  return {
    name: "",
    category: "seeds",
    quantity: "",
    unit: "",
    reorderLevel: "",
    supplierContact: ""
  };
}
function ItemModal({ open, initial, isEdit, onClose, onSave }) {
  const { t, language } = useLanguageStore();
  const [form, setForm] = reactExports.useState(initial);
  const firstRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    setForm(initial);
  }, [initial]);
  reactExports.useEffect(() => {
    if (open) setTimeout(() => {
      var _a;
      return (_a = firstRef.current) == null ? void 0 : _a.focus();
    }, 50);
  }, [open]);
  if (!open) return null;
  const lbl = (en, sw) => language === "sw" ? sw : en;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 px-0 sm:px-4",
      onClick: (e) => {
        if (e.target === e.currentTarget) onClose();
      },
      onKeyDown: (e) => {
        if (e.key === "Escape") onClose();
      },
      "aria-modal": "true",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-elevated max-h-[90vh] overflow-y-auto",
          "data-ocid": "inventory.dialog",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 pt-5 pb-3 border-b sticky top-0 bg-card z-10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-foreground text-base", children: isEdit ? lbl("Edit Item", "Hariri Bidhaa") : t("add_item") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "p-1.5 rounded-full hover:bg-muted transition-colors",
                  "data-ocid": "inventory.dialog.close_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18 })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "form",
              {
                onSubmit: (e) => {
                  e.preventDefault();
                  onSave(form);
                },
                className: "p-5 space-y-4",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        className: "text-sm font-medium text-foreground",
                        htmlFor: "inv-name",
                        children: lbl("Item Name", "Jina la Bidhaa")
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        ref: firstRef,
                        required: true,
                        type: "text",
                        placeholder: lbl(
                          "E.g. NPK Fertilizer, Maize Seeds...",
                          "Mfano: Mbolea NPK, Mbegu za Mahindi..."
                        ),
                        className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                        value: form.name,
                        onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
                        "data-ocid": "inventory.name.input",
                        id: "inv-name"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        className: "text-sm font-medium text-foreground",
                        htmlFor: "inv-category",
                        children: t("item_category")
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "select",
                      {
                        className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                        value: form.category,
                        onChange: (e) => setForm((f) => ({
                          ...f,
                          category: e.target.value
                        })),
                        "data-ocid": "inventory.category.select",
                        id: "inv-category",
                        children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: cat, children: t(CATEGORY_KEY[cat]) }, cat))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          className: "text-sm font-medium text-foreground",
                          htmlFor: "inv-qty",
                          children: t("stock_level")
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          required: true,
                          type: "number",
                          min: "0",
                          className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                          value: form.quantity,
                          onChange: (e) => setForm((f) => ({ ...f, quantity: e.target.value })),
                          "data-ocid": "inventory.quantity.input",
                          id: "inv-qty"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          className: "text-sm font-medium text-foreground",
                          htmlFor: "inv-unit",
                          children: lbl("Unit", "Kitengo")
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "text",
                          placeholder: lbl("kg, bags, liters...", "kg, magunia, lita..."),
                          className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                          value: form.unit,
                          onChange: (e) => setForm((f) => ({ ...f, unit: e.target.value })),
                          "data-ocid": "inventory.unit.input",
                          id: "inv-unit"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        className: "text-sm font-medium text-foreground",
                        htmlFor: "inv-reorder",
                        children: t("reorder_level")
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        required: true,
                        type: "number",
                        min: "0",
                        placeholder: lbl(
                          "Alert me when stock falls below this amount",
                          "Niarifu hifadhi ikishuka chini ya hii"
                        ),
                        className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                        value: form.reorderLevel,
                        onChange: (e) => setForm((f) => ({ ...f, reorderLevel: e.target.value })),
                        "data-ocid": "inventory.reorder.input",
                        id: "inv-reorder"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        className: "text-sm font-medium text-foreground",
                        htmlFor: "inv-supplier",
                        children: t("supplier_contact")
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "text",
                        placeholder: "+255 7XX XXX XXX",
                        className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                        value: form.supplierContact,
                        onChange: (e) => setForm((f) => ({ ...f, supplierContact: e.target.value })),
                        "data-ocid": "inventory.supplier.input",
                        id: "inv-supplier"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "outline",
                        className: "flex-1",
                        onClick: onClose,
                        "data-ocid": "inventory.dialog.cancel_button",
                        children: t("cancel")
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "submit",
                        className: "flex-1",
                        "data-ocid": "inventory.dialog.submit_button",
                        children: t("save")
                      }
                    )
                  ] })
                ]
              }
            )
          ]
        }
      )
    }
  );
}
function RestockModal({ open, item, onClose, onRestock }) {
  const { t, language } = useLanguageStore();
  const [custom, setCustom] = reactExports.useState("");
  if (!open || !item) return null;
  const lbl = (en, sw) => language === "sw" ? sw : en;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 px-0 sm:px-4",
      onClick: (e) => {
        if (e.target === e.currentTarget) onClose();
      },
      onKeyDown: (e) => {
        if (e.key === "Escape") onClose();
      },
      "aria-modal": "true",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card w-full sm:max-w-sm rounded-t-2xl sm:rounded-2xl shadow-elevated p-5 space-y-4",
          "data-ocid": "inventory.restock.dialog",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-bold text-foreground", children: [
                t("restock"),
                " — ",
                item.name
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "p-1.5 rounded-full hover:bg-muted",
                  "data-ocid": "inventory.restock.close_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18 })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: lbl(
              `Current: ${item.quantity} ${item.unit}`,
              `Sasa hivi: ${item.quantity} ${item.unit}`
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: [10, 25, 50].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => onRestock(n),
                className: "flex-1 py-2 rounded-lg bg-muted text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors",
                "data-ocid": `inventory.restock_quick.${n}`,
                children: [
                  "+",
                  n
                ]
              },
              n
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "number",
                  min: "1",
                  placeholder: lbl("Custom amount", "Idadi maalum"),
                  className: "flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                  value: custom,
                  onChange: (e) => setCustom(e.target.value),
                  "data-ocid": "inventory.restock_custom.input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: () => {
                    if (custom && Number(custom) > 0) onRestock(Number(custom));
                  },
                  "data-ocid": "inventory.restock_custom.button",
                  children: lbl("Add", "Ongeza")
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
function InventoryPage() {
  const { t } = useLanguageStore();
  const [items, setItems] = reactExports.useState(INITIAL_ITEMS);
  const [categoryFilter, setCategoryFilter] = reactExports.useState("all");
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [editTarget, setEditTarget] = reactExports.useState(null);
  const [restockTarget, setRestockTarget] = reactExports.useState(
    null
  );
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const lowStockItems = items.filter(
    (i) => stockStatus(i.quantity, i.reorderLevel) === "low"
  );
  const filteredItems = categoryFilter === "all" ? items : items.filter((i) => i.category === categoryFilter);
  function openAdd() {
    setEditTarget(null);
    setModalOpen(true);
  }
  function openEdit(item) {
    setEditTarget(item);
    setModalOpen(true);
  }
  function handleSave(data) {
    if (editTarget) {
      setItems(
        (prev) => prev.map(
          (i) => i.id === editTarget.id ? {
            ...i,
            name: data.name,
            category: data.category,
            quantity: Number(data.quantity),
            unit: data.unit,
            reorderLevel: Number(data.reorderLevel),
            supplierContact: data.supplierContact || void 0
          } : i
        )
      );
    } else {
      const newItem = {
        id: `i${Date.now()}`,
        ownerId: "u1",
        name: data.name,
        category: data.category,
        quantity: Number(data.quantity),
        unit: data.unit,
        reorderLevel: Number(data.reorderLevel),
        supplierContact: data.supplierContact || void 0,
        createdAt: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
      };
      setItems((prev) => [newItem, ...prev]);
    }
    setModalOpen(false);
  }
  function handleRestock(amount) {
    if (!restockTarget) return;
    setItems(
      (prev) => prev.map(
        (i) => i.id === restockTarget.id ? {
          ...i,
          quantity: i.quantity + amount,
          lastRestockedAt: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
        } : i
      )
    );
    setRestockTarget(null);
  }
  function handleDelete() {
    if (!deleteTarget) return;
    setItems((prev) => prev.filter((i) => i.id !== deleteTarget.id));
    setDeleteTarget(null);
  }
  const formInitial = editTarget ? {
    name: editTarget.name,
    category: editTarget.category,
    quantity: String(editTarget.quantity),
    unit: editTarget.unit,
    reorderLevel: String(editTarget.reorderLevel),
    supplierContact: editTarget.supplierContact ?? ""
  } : emptyItemForm();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "inventory.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b px-4 py-4 sticky top-0 z-10 shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "text-primary", size: 22 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold text-foreground", children: t("inventory") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          onClick: openAdd,
          "data-ocid": "inventory.add_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16, className: "mr-1" }),
            " ",
            t("add_item")
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-4 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border rounded-xl p-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-foreground", children: items.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("inventory") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-destructive/10 border border-destructive/20 rounded-xl p-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-destructive", children: lowStockItems.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive/80", children: t("low_stock") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-accent/10 border border-accent/20 rounded-xl p-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-accent", children: items.length - lowStockItems.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-accent/80", children: t("healthy") })
        ] })
      ] }),
      lowStockItems.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-destructive/5 border border-destructive/20 rounded-xl p-3 flex items-start gap-3",
          "data-ocid": "inventory.low_stock_alert",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TriangleAlert,
              {
                size: 18,
                className: "text-destructive shrink-0 mt-0.5"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-destructive", children: t("low_stock_alert") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: lowStockItems.map((i) => i.name).join(", ") })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex gap-2 overflow-x-auto pb-1",
          "data-ocid": "inventory.filter.tab",
          children: ["all", ...CATEGORIES].map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setCategoryFilter(cat),
              className: `px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${categoryFilter === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent/50"}`,
              "data-ocid": `inventory.cat_filter.${cat}`,
              children: cat === "all" ? t("searchAll") : t(CATEGORY_KEY[cat])
            },
            cat
          ))
        }
      ),
      filteredItems.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-16 space-y-3",
          "data-ocid": "inventory.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "mx-auto text-muted-foreground/40", size: 48 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: t("no_inventory") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: t("add_first_item") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: openAdd, "data-ocid": "inventory.empty_add_button", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16, className: "mr-1" }),
              " ",
              t("add_item")
            ] })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filteredItems.map((item, i) => {
        const status = stockStatus(item.quantity, item.reorderLevel);
        const pct = Math.min(
          100,
          item.quantity / (item.reorderLevel * 3) * 100
        );
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card rounded-xl border p-4 slide-up",
            "data-ocid": `inventory.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground truncate", children: item.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        className: `text-xs ${CATEGORY_COLOR[item.category]}`,
                        children: t(
                          CATEGORY_KEY[item.category]
                        )
                      }
                    ),
                    item.supplierContact && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: item.supplierContact })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                  status === "low" && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs bg-destructive/10 text-destructive border-destructive/20", children: t("low_stock") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => openEdit(item),
                      className: "p-1.5 rounded-lg hover:bg-muted transition-colors",
                      "data-ocid": `inventory.edit_button.${i + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { size: 14, className: "text-muted-foreground" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setDeleteTarget(item),
                      className: "p-1.5 rounded-lg hover:bg-destructive/10 transition-colors",
                      "data-ocid": `inventory.delete_button.${i + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14, className: "text-destructive" })
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: t("stock_level") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: `font-semibold ${STATUS_TEXT[status]}`,
                      children: [
                        item.quantity,
                        " ",
                        item.unit
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `h-full rounded-full transition-all ${STATUS_BAR[status]}`,
                    style: { width: `${pct}%` }
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                    t("reorder_level"),
                    ": ",
                    item.reorderLevel,
                    " ",
                    item.unit,
                    item.lastRestockedAt && ` · ${t("last_restocked")}: ${item.lastRestockedAt}`
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      onClick: () => setRestockTarget(item),
                      "data-ocid": `inventory.restock_button.${i + 1}`,
                      children: t("restock")
                    }
                  )
                ] })
              ] })
            ]
          },
          item.id
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ItemModal,
      {
        open: modalOpen,
        initial: formInitial,
        isEdit: !!editTarget,
        onClose: () => setModalOpen(false),
        onSave: handleSave
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      RestockModal,
      {
        open: !!restockTarget,
        item: restockTarget,
        onClose: () => setRestockTarget(null),
        onRestock: handleRestock
      }
    ),
    deleteTarget && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4",
        onClick: () => setDeleteTarget(null),
        onKeyDown: (e) => {
          if (e.key === "Escape") setDeleteTarget(null);
        },
        "aria-modal": "true",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card rounded-2xl shadow-elevated p-6 max-w-sm w-full space-y-4",
            "data-ocid": "inventory.delete.dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-foreground", children: [
                t("delete"),
                " — ",
                deleteTarget.name
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: t("language") === "sw" ? "Bidhaa hii itafutwa kabisa." : "This item will be permanently removed from your inventory." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    className: "flex-1",
                    onClick: () => setDeleteTarget(null),
                    "data-ocid": "inventory.delete.cancel_button",
                    children: t("cancel")
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "destructive",
                    className: "flex-1",
                    onClick: handleDelete,
                    "data-ocid": "inventory.delete.confirm_button",
                    children: t("delete")
                  }
                )
              ] })
            ]
          }
        )
      }
    )
  ] }) });
}
export {
  InventoryPage as default
};
