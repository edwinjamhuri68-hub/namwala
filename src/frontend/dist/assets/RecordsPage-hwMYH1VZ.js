import { a as useLanguageStore, r as reactExports, j as jsxRuntimeExports, L as Layout, x as FileText, B as Button, m as Badge, X } from "./index-BUVIgngH.js";
import { P as Plus } from "./plus-DMsGFanj.js";
import { P as Pencil } from "./pencil-CuGUdLiy.js";
import { T as Trash2 } from "./trash-2-BRLnMANv.js";
const RECORD_TYPES = [
  "harvest",
  "crop_planting",
  "health_event",
  "vaccination",
  "sale",
  "expense",
  "purchase",
  "breeding",
  "other"
];
const TYPE_STYLE = {
  harvest: "bg-emerald-100 text-emerald-700 border-emerald-200",
  crop_planting: "bg-lime-100 text-lime-700 border-lime-200",
  health_event: "bg-red-100 text-red-700 border-red-200",
  vaccination: "bg-blue-100 text-blue-700 border-blue-200",
  sale: "bg-yellow-100 text-yellow-700 border-yellow-200",
  expense: "bg-orange-100 text-orange-700 border-orange-200",
  purchase: "bg-purple-100 text-purple-700 border-purple-200",
  breeding: "bg-pink-100 text-pink-700 border-pink-200",
  other: "bg-muted text-muted-foreground border-border"
};
const INITIAL_RECORDS = [
  {
    id: "r1",
    userId: "u1",
    recordType: "harvest",
    date: "2026-04-20",
    title: "Maize Harvest — North Field",
    description: "Harvested 800 kg of maize from north field. Quality: excellent. Stored in main silo.",
    amount: 64e4,
    unit: "kg",
    createdAt: "2026-04-20"
  },
  {
    id: "r2",
    userId: "u1",
    recordType: "expense",
    date: "2026-04-10",
    title: "NPK Fertilizer Purchase",
    description: "Purchased 50 kg NPK 20-10-10 for the coming planting season.",
    amount: 45e3,
    unit: "kg",
    createdAt: "2026-04-10"
  },
  {
    id: "r3",
    userId: "u1",
    recordType: "vaccination",
    date: "2026-03-15",
    title: "Cattle FMD Vaccination",
    description: "Vaccinated 12 cattle against Foot-and-Mouth Disease. Next due: September 2026.",
    createdAt: "2026-03-15"
  },
  {
    id: "r4",
    userId: "u1",
    recordType: "sale",
    date: "2026-04-25",
    title: "Beans Sale — Dodoma Market",
    description: "Sold 200 kg of dry beans at TSh 1,200 per kg to buyer Amina Hassan.",
    amount: 24e4,
    unit: "kg",
    createdAt: "2026-04-25"
  },
  {
    id: "r5",
    userId: "u1",
    recordType: "crop_planting",
    date: "2026-02-05",
    title: "Sunflower Planting — East Plot",
    description: "Planted 2 acres of sunflower variety Hysun 33 on east plot.",
    unit: "acres",
    createdAt: "2026-02-05"
  }
];
const FILTER_TABS = [
  "all",
  "harvest",
  "sale",
  "expense",
  "vaccination",
  "crop_planting"
];
const emptyForm = () => ({
  recordType: "harvest",
  date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
  title: "",
  description: "",
  amount: "",
  unit: "",
  category: "",
  notes: ""
});
function RecordModal({
  open,
  initial,
  isEdit,
  onClose,
  onSave
}) {
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
  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  }
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
      "aria-label": isEdit ? t("edit_record") : t("add_record"),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-elevated max-h-[90vh] overflow-y-auto",
          "data-ocid": "records.dialog",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 pt-5 pb-3 border-b sticky top-0 bg-card z-10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-foreground text-base", children: isEdit ? lbl("Edit Record", "Hariri Rekodi") : t("add_record") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "p-1.5 rounded-full hover:bg-muted transition-colors",
                  "aria-label": t("cancel"),
                  "data-ocid": "records.dialog.close_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18 })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "p-5 space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    className: "text-sm font-medium text-foreground",
                    htmlFor: "rec-type",
                    children: t("record_type")
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "select",
                  {
                    className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                    value: form.recordType,
                    onChange: (e) => setForm((f) => ({
                      ...f,
                      recordType: e.target.value
                    })),
                    "data-ocid": "records.type.select",
                    id: "rec-type",
                    children: RECORD_TYPES.map((rt) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: rt, children: t(`record_${rt}`) }, rt))
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    className: "text-sm font-medium text-foreground",
                    htmlFor: "rec-date",
                    children: t("record_date")
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    ref: firstRef,
                    type: "date",
                    required: true,
                    className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                    value: form.date,
                    onChange: (e) => setForm((f) => ({ ...f, date: e.target.value })),
                    "data-ocid": "records.date.input",
                    id: "rec-date"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    className: "text-sm font-medium text-foreground",
                    htmlFor: "rec-title",
                    children: t("record_title")
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    required: true,
                    placeholder: lbl(
                      "E.g. Maize Harvest — North Field",
                      "Mfano: Mavuno ya Mahindi"
                    ),
                    className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                    value: form.title,
                    onChange: (e) => setForm((f) => ({ ...f, title: e.target.value })),
                    "data-ocid": "records.title.input",
                    id: "rec-title"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    className: "text-sm font-medium text-foreground",
                    htmlFor: "rec-desc",
                    children: t("record_description")
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "textarea",
                  {
                    rows: 3,
                    placeholder: lbl(
                      "Describe this record...",
                      "Elezea rekodi hii..."
                    ),
                    className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none",
                    value: form.description,
                    onChange: (e) => setForm((f) => ({ ...f, description: e.target.value })),
                    "data-ocid": "records.description.textarea",
                    id: "rec-desc"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      className: "text-sm font-medium text-foreground",
                      htmlFor: "rec-amount",
                      children: t("record_amount")
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "number",
                      min: "0",
                      placeholder: "0",
                      className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                      value: form.amount,
                      onChange: (e) => setForm((f) => ({ ...f, amount: e.target.value })),
                      "data-ocid": "records.amount.input",
                      id: "rec-amount"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      className: "text-sm font-medium text-foreground",
                      htmlFor: "rec-unit",
                      children: t("record_unit")
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "text",
                      placeholder: lbl("kg, liters, bags...", "kg, lita, magunia..."),
                      className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                      value: form.unit,
                      onChange: (e) => setForm((f) => ({ ...f, unit: e.target.value })),
                      "data-ocid": "records.unit.input",
                      id: "rec-unit"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    className: "flex-1",
                    onClick: onClose,
                    "data-ocid": "records.dialog.cancel_button",
                    children: t("cancel")
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    className: "flex-1",
                    "data-ocid": "records.dialog.submit_button",
                    children: t("save")
                  }
                )
              ] })
            ] })
          ]
        }
      )
    }
  );
}
function DeleteConfirm({
  open,
  title,
  onClose,
  onConfirm
}) {
  const { t, language } = useLanguageStore();
  if (!open) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4",
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
          className: "bg-card rounded-2xl shadow-elevated p-6 max-w-sm w-full space-y-4",
          "data-ocid": "records.delete.dialog",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-foreground", children: language === "sw" ? "Futa Rekodi?" : "Delete Record?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: language === "sw" ? `"${title}" itafutwa kabisa.` : `"${title}" will be permanently deleted.` }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  className: "flex-1",
                  onClick: onClose,
                  "data-ocid": "records.delete.cancel_button",
                  children: t("cancel")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "destructive",
                  className: "flex-1",
                  onClick: onConfirm,
                  "data-ocid": "records.delete.confirm_button",
                  children: t("delete")
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
function RecordsPage() {
  const { t } = useLanguageStore();
  const [records, setRecords] = reactExports.useState(INITIAL_RECORDS);
  const [activeType, setActiveType] = reactExports.useState("all");
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [editTarget, setEditTarget] = reactExports.useState(null);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const filtered = activeType === "all" ? records : records.filter((r) => r.recordType === activeType);
  function openAdd() {
    setEditTarget(null);
    setModalOpen(true);
  }
  function openEdit(rec) {
    setEditTarget(rec);
    setModalOpen(true);
  }
  function handleSave(data) {
    if (editTarget) {
      setRecords(
        (prev) => prev.map(
          (r) => r.id === editTarget.id ? {
            ...r,
            ...data,
            amount: data.amount ? Number(data.amount) : void 0,
            date: data.date
          } : r
        )
      );
    } else {
      const newRec = {
        id: `r${Date.now()}`,
        userId: "u1",
        recordType: data.recordType,
        date: data.date,
        title: data.title,
        description: data.description,
        amount: data.amount ? Number(data.amount) : void 0,
        unit: data.unit || void 0,
        category: data.category || void 0,
        createdAt: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
      };
      setRecords((prev) => [newRec, ...prev]);
    }
    setModalOpen(false);
  }
  function handleDelete() {
    if (!deleteTarget) return;
    setRecords((prev) => prev.filter((r) => r.id !== deleteTarget.id));
    setDeleteTarget(null);
  }
  const formInitial = editTarget ? {
    recordType: editTarget.recordType,
    date: editTarget.date,
    title: editTarget.title,
    description: editTarget.description,
    amount: editTarget.amount !== void 0 ? String(editTarget.amount) : "",
    unit: editTarget.unit ?? "",
    category: editTarget.category ?? "",
    notes: ""
  } : emptyForm();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "records.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b px-4 py-4 sticky top-0 z-10 shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "text-primary", size: 22 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold text-foreground", children: t("my_records") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", onClick: openAdd, "data-ocid": "records.add_button", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16, className: "mr-1" }),
        " ",
        t("add_record")
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-4 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: [
        {
          key: "harvest",
          count: records.filter((r) => r.recordType === "harvest").length
        },
        {
          key: "sale",
          count: records.filter((r) => r.recordType === "sale").length
        },
        {
          key: "expense",
          count: records.filter((r) => r.recordType === "expense").length
        }
      ].map(({ key, count }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setActiveType(key),
          className: `rounded-xl p-3 text-center border transition-colors ${activeType === key ? "border-primary/40 bg-primary/10" : "bg-card border-border"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-foreground", children: count }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t(`record_${key}`) })
          ]
        },
        key
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex gap-2 overflow-x-auto pb-1",
          "data-ocid": "records.filter.tab",
          children: FILTER_TABS.map((type) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setActiveType(type),
              className: `px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${activeType === type ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent/50"}`,
              "data-ocid": `records.type_filter.${type}`,
              children: type === "all" ? t("all_records") : t(`record_${type}`)
            },
            type
          ))
        }
      ),
      filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-16 space-y-3",
          "data-ocid": "records.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FileText,
              {
                className: "mx-auto text-muted-foreground/40",
                size: 48
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: t("no_records") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: t("add_first_record") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: openAdd, "data-ocid": "records.empty_add_button", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16, className: "mr-1" }),
              " ",
              t("add_record")
            ] })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filtered.map((record, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card rounded-xl border p-4 space-y-2 slide-up",
          "data-ocid": `records.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground truncate", children: record.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: record.date })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: `text-xs border ${TYPE_STYLE[record.recordType]}`,
                    children: t(
                      `record_${record.recordType}`
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => openEdit(record),
                    className: "p-1.5 rounded-lg hover:bg-muted transition-colors",
                    "aria-label": t("edit"),
                    "data-ocid": `records.edit_button.${i + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { size: 14, className: "text-muted-foreground" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setDeleteTarget(record),
                    className: "p-1.5 rounded-lg hover:bg-destructive/10 transition-colors",
                    "aria-label": t("delete"),
                    "data-ocid": `records.delete_button.${i + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14, className: "text-destructive" })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: record.description }),
            record.amount !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-primary", children: [
              "TSh ",
              record.amount.toLocaleString(),
              record.unit ? ` · ${record.unit}` : ""
            ] })
          ]
        },
        record.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      RecordModal,
      {
        open: modalOpen,
        initial: formInitial,
        isEdit: !!editTarget,
        onClose: () => setModalOpen(false),
        onSave: handleSave
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DeleteConfirm,
      {
        open: !!deleteTarget,
        title: (deleteTarget == null ? void 0 : deleteTarget.title) ?? "",
        onClose: () => setDeleteTarget(null),
        onConfirm: handleDelete
      }
    )
  ] }) });
}
export {
  RecordsPage as default
};
