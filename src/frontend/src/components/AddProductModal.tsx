import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { useLanguageStore } from "@/store/languageStore";
import type { CropListing } from "@/types";
import { ImagePlus, Loader2, X } from "lucide-react";
import { useRef, useState } from "react";

const CROP_OPTIONS = [
  { value: "Maize", labelEn: "Maize", labelSw: "Mahindi" },
  { value: "Beans", labelEn: "Beans", labelSw: "Maharagwe" },
  { value: "Groundnuts", labelEn: "Groundnuts", labelSw: "Karanga" },
  { value: "Sorghum", labelEn: "Sorghum", labelSw: "Mtama" },
  { value: "Cassava", labelEn: "Cassava", labelSw: "Muhogo" },
  { value: "Sweet Potato", labelEn: "Sweet Potato", labelSw: "Viazi vitamu" },
  { value: "Rice", labelEn: "Rice", labelSw: "Mchele" },
  { value: "Sunflower", labelEn: "Sunflower", labelSw: "Alizeti" },
  { value: "Other", labelEn: "Other", labelSw: "Nyingine" },
];

const UNIT_OPTIONS = [
  { value: "kg", label: "kg" },
  { value: "bags", label: "bags" },
  { value: "tonnes", label: "tonnes" },
];

const QUALITY_OPTIONS = [
  { value: "excellent", labelEn: "Excellent", labelSw: "Bora Sana" },
  { value: "good", labelEn: "Good", labelSw: "Nzuri" },
  { value: "fair", labelEn: "Fair", labelSw: "Ya Kawaida" },
] as const;

export interface ProductFormData {
  cropType: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  location: string;
  quality: "excellent" | "good" | "fair";
  description: string;
  imagePreview?: string;
}

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormData) => Promise<void>;
  editListing?: CropListing | null;
}

const empty: ProductFormData = {
  cropType: "",
  quantity: 0,
  unit: "kg",
  pricePerUnit: 0,
  location: "",
  quality: "good",
  description: "",
  imagePreview: undefined,
};

export function AddProductModal({
  open,
  onClose,
  onSubmit,
  editListing,
}: AddProductModalProps) {
  const { language } = useLanguageStore();
  const isEdit = !!editListing;

  const [form, setForm] = useState<ProductFormData>(() =>
    editListing
      ? {
          cropType: editListing.cropType,
          quantity: editListing.quantity,
          unit: editListing.unit,
          pricePerUnit: editListing.pricePerUnit,
          location: editListing.location,
          quality: editListing.quality,
          description: editListing.description ?? "",
          imagePreview: editListing.imageUrl,
        }
      : { ...empty },
  );
  const [errors, setErrors] = useState<
    Partial<Record<keyof ProductFormData, string>>
  >({});
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const lbl = (en: string, sw: string) => (language === "sw" ? sw : en);

  function set(key: keyof ProductFormData, value: string | number) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setForm((prev) => ({
        ...prev,
        imagePreview: ev.target?.result as string,
      }));
    };
    reader.readAsDataURL(file);
  }

  function validate(): boolean {
    const e: Partial<Record<keyof ProductFormData, string>> = {};
    if (!form.cropType)
      e.cropType = lbl("Select a crop type", "Chagua aina ya zao");
    if (!form.quantity || form.quantity <= 0)
      e.quantity = lbl("Enter a valid quantity", "Ingiza kiasi halisi");
    if (!form.pricePerUnit || form.pricePerUnit <= 0)
      e.pricePerUnit = lbl("Enter a valid price", "Ingiza bei halisi");
    if (!form.location.trim())
      e.location = lbl("Enter a location", "Ingiza mahali");
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await onSubmit(form);
      setForm({ ...empty });
      setErrors({});
    } finally {
      setSubmitting(false);
    }
  }

  function handleClose() {
    setForm(
      editListing
        ? {
            cropType: editListing.cropType,
            quantity: editListing.quantity,
            unit: editListing.unit,
            pricePerUnit: editListing.pricePerUnit,
            location: editListing.location,
            quality: editListing.quality,
            description: editListing.description ?? "",
            imagePreview: editListing.imageUrl,
          }
        : { ...empty },
    );
    setErrors({});
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent
        className="max-w-md max-h-[90dvh] overflow-y-auto"
        data-ocid="farmer.add_product_modal"
      >
        <DialogHeader>
          <DialogTitle className="text-base font-display">
            {isEdit
              ? lbl("Edit Listing", "Hariri Orodha")
              : lbl("Add Product for Sale", "Ongeza Bidhaa ya Kuuza")}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-1">
          {/* Crop Type */}
          <div className="space-y-1">
            <Label className="text-xs font-medium">
              {lbl("Crop Type", "Aina ya Zao")} *
            </Label>
            <Select
              value={form.cropType}
              onValueChange={(v) => set("cropType", v)}
            >
              <SelectTrigger
                data-ocid="farmer.product_crop_select"
                className={errors.cropType ? "border-destructive" : ""}
              >
                <SelectValue placeholder={lbl("Select crop", "Chagua zao")} />
              </SelectTrigger>
              <SelectContent>
                {CROP_OPTIONS.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {language === "sw" ? c.labelSw : c.labelEn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.cropType && (
              <p
                className="text-xs text-destructive"
                data-ocid="farmer.product_crop_select.field_error"
              >
                {errors.cropType}
              </p>
            )}
          </div>

          {/* Quantity + Unit */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs font-medium">
                {lbl("Quantity", "Kiasi")} *
              </Label>
              <Input
                type="number"
                min={1}
                value={form.quantity || ""}
                onChange={(e) => set("quantity", Number(e.target.value))}
                placeholder="e.g. 500"
                data-ocid="farmer.product_quantity_input"
                className={errors.quantity ? "border-destructive" : ""}
              />
              {errors.quantity && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="farmer.product_quantity_input.field_error"
                >
                  {errors.quantity}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-medium">
                {lbl("Unit", "Kipimo")}
              </Label>
              <Select value={form.unit} onValueChange={(v) => set("unit", v)}>
                <SelectTrigger data-ocid="farmer.product_unit_select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {UNIT_OPTIONS.map((u) => (
                    <SelectItem key={u.value} value={u.value}>
                      {u.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Price */}
          <div className="space-y-1">
            <Label className="text-xs font-medium">
              {lbl("Price per Unit (TSh)", "Bei kwa Kipimo (TSh)")} *
            </Label>
            <Input
              type="number"
              min={1}
              value={form.pricePerUnit || ""}
              onChange={(e) => set("pricePerUnit", Number(e.target.value))}
              placeholder="e.g. 950"
              data-ocid="farmer.product_price_input"
              className={errors.pricePerUnit ? "border-destructive" : ""}
            />
            {errors.pricePerUnit && (
              <p
                className="text-xs text-destructive"
                data-ocid="farmer.product_price_input.field_error"
              >
                {errors.pricePerUnit}
              </p>
            )}
          </div>

          {/* Location */}
          <div className="space-y-1">
            <Label className="text-xs font-medium">
              {lbl("Location", "Mahali")} *
            </Label>
            <Input
              value={form.location}
              onChange={(e) => set("location", e.target.value)}
              placeholder={lbl("e.g. Mbeya Town", "k.m. Mji wa Mbeya")}
              data-ocid="farmer.product_location_input"
              className={errors.location ? "border-destructive" : ""}
            />
            {errors.location && (
              <p
                className="text-xs text-destructive"
                data-ocid="farmer.product_location_input.field_error"
              >
                {errors.location}
              </p>
            )}
          </div>

          {/* Quality */}
          <div className="space-y-1">
            <Label className="text-xs font-medium">
              {lbl("Quality / Condition", "Hali ya Ubora")}
            </Label>
            <Select
              value={form.quality}
              onValueChange={(v) =>
                set("quality", v as "excellent" | "good" | "fair")
              }
            >
              <SelectTrigger data-ocid="farmer.product_quality_select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {QUALITY_OPTIONS.map((q) => (
                  <SelectItem key={q.value} value={q.value}>
                    {language === "sw" ? q.labelSw : q.labelEn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <Label className="text-xs font-medium">
              {lbl(
                "Description (health / quality details)",
                "Maelezo (hali ya afya / ubora)",
              )}
            </Label>
            <Textarea
              rows={3}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder={lbl(
                "e.g. Freshly harvested, well dried, no pests...",
                "k.m. Imevunwa hivi karibuni, imekaushwa vizuri...",
              )}
              data-ocid="farmer.product_description_textarea"
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-1">
            <Label className="text-xs font-medium">
              {lbl("Product Image", "Picha ya Bidhaa")}
            </Label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFile}
            />
            {form.imagePreview ? (
              <div className="relative">
                <img
                  src={form.imagePreview}
                  alt="preview"
                  className="w-full h-36 object-cover rounded-lg border border-border"
                />
                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({ ...prev, imagePreview: undefined }))
                  }
                  className="absolute top-1.5 right-1.5 bg-background/80 rounded-full p-0.5 text-muted-foreground hover:text-foreground"
                  aria-label="Remove image"
                  data-ocid="farmer.product_image_remove_button"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="w-full h-28 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                data-ocid="farmer.product_image_upload_button"
              >
                <ImagePlus className="w-6 h-6" />
                <span className="text-xs">
                  {lbl("Tap to upload image", "Gusa ili kupakia picha")}
                </span>
              </button>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={handleClose}
              disabled={submitting}
              data-ocid="farmer.add_product_cancel_button"
            >
              {lbl("Cancel", "Ghairi")}
            </Button>
            <Button
              type="submit"
              className="flex-1 gap-1.5"
              disabled={submitting}
              data-ocid="farmer.add_product_submit_button"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {isEdit
                ? lbl("Save Changes", "Hifadhi Mabadiliko")
                : lbl("List Product", "Orodhesha Bidhaa")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Quality badge helper
export function QualityBadge({
  quality,
  lang,
}: { quality: string; lang: string }) {
  const map: Record<string, { en: string; sw: string; cls: string }> = {
    excellent: {
      en: "Excellent",
      sw: "Bora Sana",
      cls: "bg-accent/15 text-accent border-accent/30",
    },
    good: {
      en: "Good",
      sw: "Nzuri",
      cls: "bg-primary/15 text-primary border-primary/30",
    },
    fair: {
      en: "Fair",
      sw: "Ya Kawaida",
      cls: "bg-muted text-muted-foreground border-border",
    },
  };
  const q = map[quality] ?? map.fair;
  return (
    <Badge variant="outline" className={`text-[10px] px-1.5 py-0.5 ${q.cls}`}>
      {lang === "sw" ? q.sw : q.en}
    </Badge>
  );
}
