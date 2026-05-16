import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/store/languageStore";
import type { InventoryCategory, InventoryItem } from "@/types";
import { AlertTriangle, Package, Pencil, Plus, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const CATEGORIES: InventoryCategory[] = [
  "seeds",
  "fertilizer",
  "pesticide",
  "feed",
  "medicine",
  "equipment",
  "other",
];

const CATEGORY_KEY: Record<InventoryCategory, string> = {
  seeds: "inv_seeds",
  fertilizer: "inv_fertilizer",
  pesticide: "inv_pesticide",
  feed: "inv_feed",
  medicine: "inv_medicine",
  equipment: "inv_equipment",
  other: "inv_other",
};

const CATEGORY_COLOR: Record<InventoryCategory, string> = {
  seeds: "bg-lime-100 text-lime-700",
  fertilizer: "bg-emerald-100 text-emerald-700",
  pesticide: "bg-yellow-100 text-yellow-700",
  feed: "bg-orange-100 text-orange-700",
  medicine: "bg-blue-100 text-blue-700",
  equipment: "bg-purple-100 text-purple-700",
  other: "bg-muted text-muted-foreground",
};

const INITIAL_ITEMS: InventoryItem[] = [
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
    createdAt: "2026-01-01",
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
    createdAt: "2026-01-01",
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
    createdAt: "2026-02-10",
  },
  {
    id: "i4",
    ownerId: "u1",
    name: "Copper Fungicide",
    category: "pesticide",
    quantity: 15,
    unit: "liters",
    reorderLevel: 5,
    createdAt: "2026-02-01",
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
    createdAt: "2026-01-15",
  },
  {
    id: "i6",
    ownerId: "u1",
    name: "Garden Sprayer Pump",
    category: "equipment",
    quantity: 2,
    unit: "units",
    reorderLevel: 1,
    createdAt: "2025-11-01",
  },
];

function stockStatus(qty: number, reorder: number): "good" | "warning" | "low" {
  if (qty <= reorder) return "low";
  if (qty <= reorder * 1.5) return "warning";
  return "good";
}

const STATUS_BAR: Record<string, string> = {
  good: "bg-accent",
  warning: "bg-warning",
  low: "bg-destructive",
};

const STATUS_TEXT: Record<string, string> = {
  good: "text-accent",
  warning: "text-warning",
  low: "text-destructive",
};

interface ItemFormData {
  name: string;
  category: InventoryCategory;
  quantity: string;
  unit: string;
  reorderLevel: string;
  supplierContact: string;
}

function emptyItemForm(): ItemFormData {
  return {
    name: "",
    category: "seeds",
    quantity: "",
    unit: "",
    reorderLevel: "",
    supplierContact: "",
  };
}

interface ItemModalProps {
  open: boolean;
  initial: ItemFormData;
  isEdit: boolean;
  onClose: () => void;
  onSave: (data: ItemFormData) => void;
}

function ItemModal({ open, initial, isEdit, onClose, onSave }: ItemModalProps) {
  const { t, language } = useLanguageStore();
  const [form, setForm] = useState<ItemFormData>(initial);
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setForm(initial);
  }, [initial]);
  useEffect(() => {
    if (open) setTimeout(() => firstRef.current?.focus(), 50);
  }, [open]);

  if (!open) return null;

  const lbl = (en: string, sw: string) => (language === "sw" ? sw : en);

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
    >
      <div
        className="bg-card w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-elevated max-h-[90vh] overflow-y-auto"
        data-ocid="inventory.dialog"
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b sticky top-0 bg-card z-10">
          <h2 className="font-bold text-foreground text-base">
            {isEdit ? lbl("Edit Item", "Hariri Bidhaa") : t("add_item")}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-muted transition-colors"
            data-ocid="inventory.dialog.close_button"
          >
            <X size={18} />
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(form);
          }}
          className="p-5 space-y-4"
        >
          <div className="space-y-1.5">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="inv-name"
            >
              {lbl("Item Name", "Jina la Bidhaa")}
            </label>
            <input
              ref={firstRef}
              required
              type="text"
              placeholder={lbl(
                "E.g. NPK Fertilizer, Maize Seeds...",
                "Mfano: Mbolea NPK, Mbegu za Mahindi...",
              )}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              data-ocid="inventory.name.input"
              id="inv-name"
            />
          </div>
          <div className="space-y-1.5">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="inv-category"
            >
              {t("item_category")}
            </label>
            <select
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              value={form.category}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  category: e.target.value as InventoryCategory,
                }))
              }
              data-ocid="inventory.category.select"
              id="inv-category"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {t(CATEGORY_KEY[cat] as Parameters<typeof t>[0])}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label
                className="text-sm font-medium text-foreground"
                htmlFor="inv-qty"
              >
                {t("stock_level")}
              </label>
              <input
                required
                type="number"
                min="0"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={form.quantity}
                onChange={(e) =>
                  setForm((f) => ({ ...f, quantity: e.target.value }))
                }
                data-ocid="inventory.quantity.input"
                id="inv-qty"
              />
            </div>
            <div className="space-y-1.5">
              <label
                className="text-sm font-medium text-foreground"
                htmlFor="inv-unit"
              >
                {lbl("Unit", "Kitengo")}
              </label>
              <input
                type="text"
                placeholder={lbl("kg, bags, liters...", "kg, magunia, lita...")}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={form.unit}
                onChange={(e) =>
                  setForm((f) => ({ ...f, unit: e.target.value }))
                }
                data-ocid="inventory.unit.input"
                id="inv-unit"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="inv-reorder"
            >
              {t("reorder_level")}
            </label>
            <input
              required
              type="number"
              min="0"
              placeholder={lbl(
                "Alert me when stock falls below this amount",
                "Niarifu hifadhi ikishuka chini ya hii",
              )}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              value={form.reorderLevel}
              onChange={(e) =>
                setForm((f) => ({ ...f, reorderLevel: e.target.value }))
              }
              data-ocid="inventory.reorder.input"
              id="inv-reorder"
            />
          </div>
          <div className="space-y-1.5">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="inv-supplier"
            >
              {t("supplier_contact")}
            </label>
            <input
              type="text"
              placeholder="+255 7XX XXX XXX"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              value={form.supplierContact}
              onChange={(e) =>
                setForm((f) => ({ ...f, supplierContact: e.target.value }))
              }
              data-ocid="inventory.supplier.input"
              id="inv-supplier"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
              data-ocid="inventory.dialog.cancel_button"
            >
              {t("cancel")}
            </Button>
            <Button
              type="submit"
              className="flex-1"
              data-ocid="inventory.dialog.submit_button"
            >
              {t("save")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface RestockModalProps {
  open: boolean;
  item: InventoryItem | null;
  onClose: () => void;
  onRestock: (amount: number) => void;
}

function RestockModal({ open, item, onClose, onRestock }: RestockModalProps) {
  const { t, language } = useLanguageStore();
  const [custom, setCustom] = useState("");
  if (!open || !item) return null;
  const lbl = (en: string, sw: string) => (language === "sw" ? sw : en);

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
    >
      <div
        className="bg-card w-full sm:max-w-sm rounded-t-2xl sm:rounded-2xl shadow-elevated p-5 space-y-4"
        data-ocid="inventory.restock.dialog"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-foreground">
            {t("restock")} — {item.name}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-muted"
            data-ocid="inventory.restock.close_button"
          >
            <X size={18} />
          </button>
        </div>
        <p className="text-sm text-muted-foreground">
          {lbl(
            `Current: ${item.quantity} ${item.unit}`,
            `Sasa hivi: ${item.quantity} ${item.unit}`,
          )}
        </p>
        <div className="flex gap-2">
          {[10, 25, 50].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => onRestock(n)}
              className="flex-1 py-2 rounded-lg bg-muted text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
              data-ocid={`inventory.restock_quick.${n}`}
            >
              +{n}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="number"
            min="1"
            placeholder={lbl("Custom amount", "Idadi maalum")}
            className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            data-ocid="inventory.restock_custom.input"
          />
          <Button
            onClick={() => {
              if (custom && Number(custom) > 0) onRestock(Number(custom));
            }}
            data-ocid="inventory.restock_custom.button"
          >
            {lbl("Add", "Ongeza")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function InventoryPage() {
  const { t } = useLanguageStore();
  const [items, setItems] = useState<InventoryItem[]>(INITIAL_ITEMS);
  const [categoryFilter, setCategoryFilter] = useState<
    InventoryCategory | "all"
  >("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<InventoryItem | null>(null);
  const [restockTarget, setRestockTarget] = useState<InventoryItem | null>(
    null,
  );
  const [deleteTarget, setDeleteTarget] = useState<InventoryItem | null>(null);

  const lowStockItems = items.filter(
    (i) => stockStatus(i.quantity, i.reorderLevel) === "low",
  );
  const filteredItems =
    categoryFilter === "all"
      ? items
      : items.filter((i) => i.category === categoryFilter);

  function openAdd() {
    setEditTarget(null);
    setModalOpen(true);
  }
  function openEdit(item: InventoryItem) {
    setEditTarget(item);
    setModalOpen(true);
  }

  function handleSave(data: ItemFormData) {
    if (editTarget) {
      setItems((prev) =>
        prev.map((i) =>
          i.id === editTarget.id
            ? {
                ...i,
                name: data.name,
                category: data.category,
                quantity: Number(data.quantity),
                unit: data.unit,
                reorderLevel: Number(data.reorderLevel),
                supplierContact: data.supplierContact || undefined,
              }
            : i,
        ),
      );
    } else {
      const newItem: InventoryItem = {
        id: `i${Date.now()}`,
        ownerId: "u1",
        name: data.name,
        category: data.category,
        quantity: Number(data.quantity),
        unit: data.unit,
        reorderLevel: Number(data.reorderLevel),
        supplierContact: data.supplierContact || undefined,
        createdAt: new Date().toISOString().slice(0, 10),
      };
      setItems((prev) => [newItem, ...prev]);
    }
    setModalOpen(false);
  }

  function handleRestock(amount: number) {
    if (!restockTarget) return;
    setItems((prev) =>
      prev.map((i) =>
        i.id === restockTarget.id
          ? {
              ...i,
              quantity: i.quantity + amount,
              lastRestockedAt: new Date().toISOString().slice(0, 10),
            }
          : i,
      ),
    );
    setRestockTarget(null);
  }

  function handleDelete() {
    if (!deleteTarget) return;
    setItems((prev) => prev.filter((i) => i.id !== deleteTarget.id));
    setDeleteTarget(null);
  }

  const formInitial: ItemFormData = editTarget
    ? {
        name: editTarget.name,
        category: editTarget.category,
        quantity: String(editTarget.quantity),
        unit: editTarget.unit,
        reorderLevel: String(editTarget.reorderLevel),
        supplierContact: editTarget.supplierContact ?? "",
      }
    : emptyItemForm();

  return (
    <Layout>
      <div className="min-h-screen bg-background" data-ocid="inventory.page">
        {/* Header */}
        <div className="bg-card border-b px-4 py-4 sticky top-0 z-10 shadow-subtle">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            <div className="flex items-center gap-2">
              <Package className="text-primary" size={22} />
              <h1 className="text-lg font-bold text-foreground">
                {t("inventory")}
              </h1>
            </div>
            <Button
              size="sm"
              onClick={openAdd}
              data-ocid="inventory.add_button"
            >
              <Plus size={16} className="mr-1" /> {t("add_item")}
            </Button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
          {/* Summary bar */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-card border rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-foreground">
                {items.length}
              </p>
              <p className="text-xs text-muted-foreground">{t("inventory")}</p>
            </div>
            <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-destructive">
                {lowStockItems.length}
              </p>
              <p className="text-xs text-destructive/80">{t("low_stock")}</p>
            </div>
            <div className="bg-accent/10 border border-accent/20 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-accent">
                {items.length - lowStockItems.length}
              </p>
              <p className="text-xs text-accent/80">{t("healthy")}</p>
            </div>
          </div>

          {/* Low stock alert */}
          {lowStockItems.length > 0 && (
            <div
              className="bg-destructive/5 border border-destructive/20 rounded-xl p-3 flex items-start gap-3"
              data-ocid="inventory.low_stock_alert"
            >
              <AlertTriangle
                size={18}
                className="text-destructive shrink-0 mt-0.5"
              />
              <div className="min-w-0">
                <p className="text-sm font-medium text-destructive">
                  {t("low_stock_alert")}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {lowStockItems.map((i) => i.name).join(", ")}
                </p>
              </div>
            </div>
          )}

          {/* Category filter */}
          <div
            className="flex gap-2 overflow-x-auto pb-1"
            data-ocid="inventory.filter.tab"
          >
            {(["all", ...CATEGORIES] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  categoryFilter === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent/50"
                }`}
                data-ocid={`inventory.cat_filter.${cat}`}
              >
                {cat === "all"
                  ? t("searchAll")
                  : t(CATEGORY_KEY[cat] as Parameters<typeof t>[0])}
              </button>
            ))}
          </div>

          {/* Items */}
          {filteredItems.length === 0 ? (
            <div
              className="text-center py-16 space-y-3"
              data-ocid="inventory.empty_state"
            >
              <Package className="mx-auto text-muted-foreground/40" size={48} />
              <p className="font-medium text-foreground">{t("no_inventory")}</p>
              <p className="text-sm text-muted-foreground">
                {t("add_first_item")}
              </p>
              <Button onClick={openAdd} data-ocid="inventory.empty_add_button">
                <Plus size={16} className="mr-1" /> {t("add_item")}
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredItems.map((item, i) => {
                const status = stockStatus(item.quantity, item.reorderLevel);
                const pct = Math.min(
                  100,
                  (item.quantity / (item.reorderLevel * 3)) * 100,
                );
                return (
                  <div
                    key={item.id}
                    className="bg-card rounded-xl border p-4 slide-up"
                    data-ocid={`inventory.item.${i + 1}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-foreground truncate">
                          {item.name}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge
                            className={`text-xs ${CATEGORY_COLOR[item.category]}`}
                          >
                            {t(
                              CATEGORY_KEY[item.category] as Parameters<
                                typeof t
                              >[0],
                            )}
                          </Badge>
                          {item.supplierContact && (
                            <span className="text-xs text-muted-foreground">
                              {item.supplierContact}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {status === "low" && (
                          <Badge className="text-xs bg-destructive/10 text-destructive border-destructive/20">
                            {t("low_stock")}
                          </Badge>
                        )}
                        <button
                          type="button"
                          onClick={() => openEdit(item)}
                          className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                          data-ocid={`inventory.edit_button.${i + 1}`}
                        >
                          <Pencil size={14} className="text-muted-foreground" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(item)}
                          className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors"
                          data-ocid={`inventory.delete_button.${i + 1}`}
                        >
                          <Trash2 size={14} className="text-destructive" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">
                          {t("stock_level")}
                        </span>
                        <span
                          className={`font-semibold ${STATUS_TEXT[status]}`}
                        >
                          {item.quantity} {item.unit}
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${STATUS_BAR[status]}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {t("reorder_level")}: {item.reorderLevel} {item.unit}
                          {item.lastRestockedAt &&
                            ` · ${t("last_restocked")}: ${item.lastRestockedAt}`}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setRestockTarget(item)}
                          data-ocid={`inventory.restock_button.${i + 1}`}
                        >
                          {t("restock")}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <ItemModal
          open={modalOpen}
          initial={formInitial}
          isEdit={!!editTarget}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
        <RestockModal
          open={!!restockTarget}
          item={restockTarget}
          onClose={() => setRestockTarget(null)}
          onRestock={handleRestock}
        />

        {deleteTarget && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
            onClick={() => setDeleteTarget(null)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setDeleteTarget(null);
            }}
            aria-modal="true"
          >
            <div
              className="bg-card rounded-2xl shadow-elevated p-6 max-w-sm w-full space-y-4"
              data-ocid="inventory.delete.dialog"
            >
              <h3 className="font-bold text-foreground">
                {t("delete")} — {deleteTarget.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t("language") === "sw"
                  ? "Bidhaa hii itafutwa kabisa."
                  : "This item will be permanently removed from your inventory."}
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setDeleteTarget(null)}
                  data-ocid="inventory.delete.cancel_button"
                >
                  {t("cancel")}
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={handleDelete}
                  data-ocid="inventory.delete.confirm_button"
                >
                  {t("delete")}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
