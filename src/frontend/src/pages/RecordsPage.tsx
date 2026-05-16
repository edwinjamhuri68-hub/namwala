import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/store/languageStore";
import type { DigitalRecord, RecordType } from "@/types";
import { FileText, Pencil, Plus, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const RECORD_TYPES: RecordType[] = [
  "harvest",
  "crop_planting",
  "health_event",
  "vaccination",
  "sale",
  "expense",
  "purchase",
  "breeding",
  "other",
];

const TYPE_STYLE: Record<RecordType, string> = {
  harvest: "bg-emerald-100 text-emerald-700 border-emerald-200",
  crop_planting: "bg-lime-100 text-lime-700 border-lime-200",
  health_event: "bg-red-100 text-red-700 border-red-200",
  vaccination: "bg-blue-100 text-blue-700 border-blue-200",
  sale: "bg-yellow-100 text-yellow-700 border-yellow-200",
  expense: "bg-orange-100 text-orange-700 border-orange-200",
  purchase: "bg-purple-100 text-purple-700 border-purple-200",
  breeding: "bg-pink-100 text-pink-700 border-pink-200",
  other: "bg-muted text-muted-foreground border-border",
};

const INITIAL_RECORDS: DigitalRecord[] = [
  {
    id: "r1",
    userId: "u1",
    recordType: "harvest",
    date: "2026-04-20",
    title: "Maize Harvest — North Field",
    description:
      "Harvested 800 kg of maize from north field. Quality: excellent. Stored in main silo.",
    amount: 640000,
    unit: "kg",
    createdAt: "2026-04-20",
  },
  {
    id: "r2",
    userId: "u1",
    recordType: "expense",
    date: "2026-04-10",
    title: "NPK Fertilizer Purchase",
    description: "Purchased 50 kg NPK 20-10-10 for the coming planting season.",
    amount: 45000,
    unit: "kg",
    createdAt: "2026-04-10",
  },
  {
    id: "r3",
    userId: "u1",
    recordType: "vaccination",
    date: "2026-03-15",
    title: "Cattle FMD Vaccination",
    description:
      "Vaccinated 12 cattle against Foot-and-Mouth Disease. Next due: September 2026.",
    createdAt: "2026-03-15",
  },
  {
    id: "r4",
    userId: "u1",
    recordType: "sale",
    date: "2026-04-25",
    title: "Beans Sale — Dodoma Market",
    description:
      "Sold 200 kg of dry beans at TSh 1,200 per kg to buyer Amina Hassan.",
    amount: 240000,
    unit: "kg",
    createdAt: "2026-04-25",
  },
  {
    id: "r5",
    userId: "u1",
    recordType: "crop_planting",
    date: "2026-02-05",
    title: "Sunflower Planting — East Plot",
    description: "Planted 2 acres of sunflower variety Hysun 33 on east plot.",
    unit: "acres",
    createdAt: "2026-02-05",
  },
];

const FILTER_TABS: (RecordType | "all")[] = [
  "all",
  "harvest",
  "sale",
  "expense",
  "vaccination",
  "crop_planting",
];

interface RecordFormData {
  recordType: RecordType;
  date: string;
  title: string;
  description: string;
  amount: string;
  unit: string;
  category: string;
  notes: string;
}

const emptyForm = (): RecordFormData => ({
  recordType: "harvest",
  date: new Date().toISOString().slice(0, 10),
  title: "",
  description: "",
  amount: "",
  unit: "",
  category: "",
  notes: "",
});

interface RecordModalProps {
  open: boolean;
  initial: RecordFormData;
  isEdit: boolean;
  onClose: () => void;
  onSave: (data: RecordFormData) => void;
}

function RecordModal({
  open,
  initial,
  isEdit,
  onClose,
  onSave,
}: RecordModalProps) {
  const { t, language } = useLanguageStore();
  const [form, setForm] = useState<RecordFormData>(initial);
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setForm(initial);
  }, [initial]);

  useEffect(() => {
    if (open) setTimeout(() => firstRef.current?.focus(), 50);
  }, [open]);

  if (!open) return null;

  const lbl = (en: string, sw: string) => (language === "sw" ? sw : en);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 px-0 sm:px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
      aria-modal="true"
      aria-label={
        isEdit ? t("edit_record" as Parameters<typeof t>[0]) : t("add_record")
      }
    >
      <div
        className="bg-card w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-elevated max-h-[90vh] overflow-y-auto"
        data-ocid="records.dialog"
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b sticky top-0 bg-card z-10">
          <h2 className="font-bold text-foreground text-base">
            {isEdit ? lbl("Edit Record", "Hariri Rekodi") : t("add_record")}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-muted transition-colors"
            aria-label={t("cancel")}
            data-ocid="records.dialog.close_button"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Record Type */}
          <div className="space-y-1.5">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="rec-type"
            >
              {t("record_type")}
            </label>
            <select
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              value={form.recordType}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  recordType: e.target.value as RecordType,
                }))
              }
              data-ocid="records.type.select"
              id="rec-type"
            >
              {RECORD_TYPES.map((rt) => (
                <option key={rt} value={rt}>
                  {t(`record_${rt}` as Parameters<typeof t>[0])}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="space-y-1.5">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="rec-date"
            >
              {t("record_date")}
            </label>
            <input
              ref={firstRef}
              type="date"
              required
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              data-ocid="records.date.input"
              id="rec-date"
            />
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="rec-title"
            >
              {t("record_title")}
            </label>
            <input
              type="text"
              required
              placeholder={lbl(
                "E.g. Maize Harvest — North Field",
                "Mfano: Mavuno ya Mahindi",
              )}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
              data-ocid="records.title.input"
              id="rec-title"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="rec-desc"
            >
              {t("record_description")}
            </label>
            <textarea
              rows={3}
              placeholder={lbl(
                "Describe this record...",
                "Elezea rekodi hii...",
              )}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              data-ocid="records.description.textarea"
              id="rec-desc"
            />
          </div>

          {/* Amount & Unit */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label
                className="text-sm font-medium text-foreground"
                htmlFor="rec-amount"
              >
                {t("record_amount")}
              </label>
              <input
                type="number"
                min="0"
                placeholder="0"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={form.amount}
                onChange={(e) =>
                  setForm((f) => ({ ...f, amount: e.target.value }))
                }
                data-ocid="records.amount.input"
                id="rec-amount"
              />
            </div>
            <div className="space-y-1.5">
              <label
                className="text-sm font-medium text-foreground"
                htmlFor="rec-unit"
              >
                {t("record_unit")}
              </label>
              <input
                type="text"
                placeholder={lbl("kg, liters, bags...", "kg, lita, magunia...")}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={form.unit}
                onChange={(e) =>
                  setForm((f) => ({ ...f, unit: e.target.value }))
                }
                data-ocid="records.unit.input"
                id="rec-unit"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
              data-ocid="records.dialog.cancel_button"
            >
              {t("cancel")}
            </Button>
            <Button
              type="submit"
              className="flex-1"
              data-ocid="records.dialog.submit_button"
            >
              {t("save")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface DeleteConfirmProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onConfirm: () => void;
}

function DeleteConfirm({
  open,
  title,
  onClose,
  onConfirm,
}: DeleteConfirmProps) {
  const { t, language } = useLanguageStore();
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
      aria-modal="true"
    >
      <div
        className="bg-card rounded-2xl shadow-elevated p-6 max-w-sm w-full space-y-4"
        data-ocid="records.delete.dialog"
      >
        <h3 className="font-bold text-foreground">
          {language === "sw" ? "Futa Rekodi?" : "Delete Record?"}
        </h3>
        <p className="text-sm text-muted-foreground">
          {language === "sw"
            ? `"${title}" itafutwa kabisa.`
            : `"${title}" will be permanently deleted.`}
        </p>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            data-ocid="records.delete.cancel_button"
          >
            {t("cancel")}
          </Button>
          <Button
            variant="destructive"
            className="flex-1"
            onClick={onConfirm}
            data-ocid="records.delete.confirm_button"
          >
            {t("delete")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function RecordsPage() {
  const { t } = useLanguageStore();
  const [records, setRecords] = useState<DigitalRecord[]>(INITIAL_RECORDS);
  const [activeType, setActiveType] = useState<RecordType | "all">("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<DigitalRecord | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DigitalRecord | null>(null);

  const filtered =
    activeType === "all"
      ? records
      : records.filter((r) => r.recordType === activeType);

  function openAdd() {
    setEditTarget(null);
    setModalOpen(true);
  }

  function openEdit(rec: DigitalRecord) {
    setEditTarget(rec);
    setModalOpen(true);
  }

  function handleSave(data: RecordFormData) {
    if (editTarget) {
      setRecords((prev) =>
        prev.map((r) =>
          r.id === editTarget.id
            ? {
                ...r,
                ...data,
                amount: data.amount ? Number(data.amount) : undefined,
                date: data.date,
              }
            : r,
        ),
      );
    } else {
      const newRec: DigitalRecord = {
        id: `r${Date.now()}`,
        userId: "u1",
        recordType: data.recordType,
        date: data.date,
        title: data.title,
        description: data.description,
        amount: data.amount ? Number(data.amount) : undefined,
        unit: data.unit || undefined,
        category: data.category || undefined,
        createdAt: new Date().toISOString().slice(0, 10),
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

  const formInitial: RecordFormData = editTarget
    ? {
        recordType: editTarget.recordType,
        date: editTarget.date,
        title: editTarget.title,
        description: editTarget.description,
        amount:
          editTarget.amount !== undefined ? String(editTarget.amount) : "",
        unit: editTarget.unit ?? "",
        category: editTarget.category ?? "",
        notes: "",
      }
    : emptyForm();

  return (
    <Layout>
      <div className="min-h-screen bg-background" data-ocid="records.page">
        {/* Header */}
        <div className="bg-card border-b px-4 py-4 sticky top-0 z-10 shadow-subtle">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            <div className="flex items-center gap-2">
              <FileText className="text-primary" size={22} />
              <h1 className="text-lg font-bold text-foreground">
                {t("my_records")}
              </h1>
            </div>
            <Button size="sm" onClick={openAdd} data-ocid="records.add_button">
              <Plus size={16} className="mr-1" /> {t("add_record")}
            </Button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
          {/* Summary chips */}
          <div className="grid grid-cols-3 gap-2">
            {[
              {
                key: "harvest" as RecordType,
                count: records.filter((r) => r.recordType === "harvest").length,
              },
              {
                key: "sale" as RecordType,
                count: records.filter((r) => r.recordType === "sale").length,
              },
              {
                key: "expense" as RecordType,
                count: records.filter((r) => r.recordType === "expense").length,
              },
            ].map(({ key, count }) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveType(key)}
                className={`rounded-xl p-3 text-center border transition-colors ${
                  activeType === key
                    ? "border-primary/40 bg-primary/10"
                    : "bg-card border-border"
                }`}
              >
                <p className="text-lg font-bold text-foreground">{count}</p>
                <p className="text-xs text-muted-foreground">
                  {t(`record_${key}` as Parameters<typeof t>[0])}
                </p>
              </button>
            ))}
          </div>

          {/* Filter tabs */}
          <div
            className="flex gap-2 overflow-x-auto pb-1"
            data-ocid="records.filter.tab"
          >
            {FILTER_TABS.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setActiveType(type)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  activeType === type
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent/50"
                }`}
                data-ocid={`records.type_filter.${type}`}
              >
                {type === "all"
                  ? t("all_records")
                  : t(`record_${type}` as Parameters<typeof t>[0])}
              </button>
            ))}
          </div>

          {/* Records list */}
          {filtered.length === 0 ? (
            <div
              className="text-center py-16 space-y-3"
              data-ocid="records.empty_state"
            >
              <FileText
                className="mx-auto text-muted-foreground/40"
                size={48}
              />
              <p className="font-medium text-foreground">{t("no_records")}</p>
              <p className="text-sm text-muted-foreground">
                {t("add_first_record")}
              </p>
              <Button onClick={openAdd} data-ocid="records.empty_add_button">
                <Plus size={16} className="mr-1" /> {t("add_record")}
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((record, i) => (
                <div
                  key={record.id}
                  className="bg-card rounded-xl border p-4 space-y-2 slide-up"
                  data-ocid={`records.item.${i + 1}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-foreground truncate">
                        {record.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {record.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Badge
                        className={`text-xs border ${TYPE_STYLE[record.recordType]}`}
                      >
                        {t(
                          `record_${record.recordType}` as Parameters<
                            typeof t
                          >[0],
                        )}
                      </Badge>
                      <button
                        type="button"
                        onClick={() => openEdit(record)}
                        className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                        aria-label={t("edit")}
                        data-ocid={`records.edit_button.${i + 1}`}
                      >
                        <Pencil size={14} className="text-muted-foreground" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(record)}
                        className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors"
                        aria-label={t("delete")}
                        data-ocid={`records.delete_button.${i + 1}`}
                      >
                        <Trash2 size={14} className="text-destructive" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {record.description}
                  </p>
                  {record.amount !== undefined && (
                    <p className="text-sm font-semibold text-primary">
                      TSh {record.amount.toLocaleString()}
                      {record.unit ? ` · ${record.unit}` : ""}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <RecordModal
          open={modalOpen}
          initial={formInitial}
          isEdit={!!editTarget}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />

        <DeleteConfirm
          open={!!deleteTarget}
          title={deleteTarget?.title ?? ""}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
        />
      </div>
    </Layout>
  );
}
