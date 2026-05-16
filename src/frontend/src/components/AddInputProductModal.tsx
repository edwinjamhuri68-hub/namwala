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
import type { InputProduct } from "@/types";
import { ImagePlus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface FormData {
  name: string;
  category: string;
  description: string;
  price: string;
  unit: string;
  stock: string;
  location: string;
  imageUrl: string;
}

const EMPTY_FORM: FormData = {
  name: "",
  category: "",
  description: "",
  price: "",
  unit: "",
  stock: "",
  location: "",
  imageUrl: "",
};

const CATEGORIES = [
  { value: "seeds", label: "Seeds", labelSw: "Mbegu" },
  { value: "fertilizer", label: "Fertilizer", labelSw: "Mbolea" },
  { value: "pesticide", label: "Pesticides", labelSw: "Dawa za Wadudu" },
  { value: "feed", label: "Animal Feed", labelSw: "Chakula cha Mifugo" },
  { value: "equipment", label: "Equipment", labelSw: "Vifaa" },
  { value: "other", label: "Other", labelSw: "Nyingine" },
];

const UNITS = [
  { value: "kg", label: "kg" },
  { value: "bags", label: "bags / magunia" },
  { value: "litres", label: "litres / lita" },
  { value: "pieces", label: "pieces / vipande" },
  { value: "packs", label: "packs / pakiti" },
  { value: "tonnes", label: "tonnes / tani" },
];

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (
    data: Omit<InputProduct, "id" | "sellerId" | "sellerName">,
  ) => Promise<void>;
  editProduct?: InputProduct | null;
  language: "en" | "sw";
}

export function AddInputProductModal({
  open,
  onClose,
  onSubmit,
  editProduct,
  language,
}: Props) {
  const isSw = language === "sw";
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editProduct) {
      setForm({
        name: editProduct.name,
        category: editProduct.category,
        description: editProduct.description,
        price: String(editProduct.price),
        unit: editProduct.unit,
        stock: String(editProduct.stock),
        location: editProduct.location,
        imageUrl: editProduct.imageUrl ?? "",
      });
      setImagePreview(editProduct.imageUrl ?? null);
    } else {
      setForm(EMPTY_FORM);
      setImagePreview(null);
    }
    setErrors({});
  }, [editProduct]);

  const set = (key: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  function validate(): boolean {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.name.trim())
      e.name = isSw ? "Jina linahitajika" : "Name is required";
    if (!form.category)
      e.category = isSw ? "Chagua jamii" : "Select a category";
    if (
      !form.price ||
      Number.isNaN(Number(form.price)) ||
      Number(form.price) <= 0
    )
      e.price = isSw ? "Bei sahihi inahitajika" : "Valid price required";
    if (!form.unit) e.unit = isSw ? "Chagua kipimo" : "Select a unit";
    if (
      !form.stock ||
      Number.isNaN(Number(form.stock)) ||
      Number(form.stock) < 0
    )
      e.stock = isSw
        ? "Kiasi sahihi kinahitajika"
        : "Valid stock quantity required";
    if (!form.location.trim())
      e.location = isSw ? "Mahali panahitajika" : "Location is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setImagePreview(result);
      set("imageUrl", result);
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await onSubmit({
        name: form.name.trim(),
        category: form.category as InputProduct["category"],
        description: form.description.trim(),
        price: Number(form.price),
        unit: form.unit,
        stock: Number(form.stock),
        location: form.location.trim(),
        imageUrl: form.imageUrl || undefined,
      });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  }

  const title = editProduct
    ? isSw
      ? "Hariri Bidhaa"
      : "Edit Product"
    : isSw
      ? "Ongeza Bidhaa Mpya"
      : "Add New Product";

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="max-w-lg max-h-[90vh] overflow-y-auto"
        data-ocid="seller.product_modal"
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image upload */}
          <div className="space-y-1">
            <Label>{isSw ? "Picha ya Bidhaa" : "Product Image"}</Label>
            <button
              type="button"
              className="w-full border-2 border-dashed border-border rounded-lg overflow-hidden cursor-pointer relative bg-muted/30 text-left"
              onClick={() => fileRef.current?.click()}
              aria-label={isSw ? "Pakia picha" : "Upload image"}
            >
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-40 object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-0.5"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImagePreview(null);
                      set("imageUrl", "");
                    }}
                    aria-label="Remove image"
                    data-ocid="seller.modal.remove_image_button"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="h-32 flex flex-col items-center justify-center text-muted-foreground gap-1">
                  <ImagePlus className="w-8 h-8" />
                  <span className="text-xs">
                    {isSw ? "Bonyeza kupakia picha" : "Click to upload image"}
                  </span>
                </div>
              )}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImage}
              data-ocid="seller.modal.image_upload"
            />
          </div>

          {/* Name */}
          <div className="space-y-1">
            <Label htmlFor="prod-name">
              {isSw ? "Jina la Bidhaa" : "Product Name"}{" "}
              <span className="text-destructive">*</span>
            </Label>
            <Input
              id="prod-name"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder={
                isSw ? "Mfano: NPK 17-17-17" : "e.g. NPK 17-17-17 Fertilizer"
              }
              data-ocid="seller.modal.name_input"
            />
            {errors.name && (
              <p
                className="text-destructive text-xs"
                data-ocid="seller.modal.name_field_error"
              >
                {errors.name}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-1">
            <Label>
              {isSw ? "Jamii" : "Category"}{" "}
              <span className="text-destructive">*</span>
            </Label>
            <Select
              value={form.category}
              onValueChange={(v) => set("category", v)}
            >
              <SelectTrigger data-ocid="seller.modal.category_select">
                <SelectValue
                  placeholder={isSw ? "Chagua jamii" : "Select category"}
                />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {isSw ? c.labelSw : c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p
                className="text-destructive text-xs"
                data-ocid="seller.modal.category_field_error"
              >
                {errors.category}
              </p>
            )}
          </div>

          {/* Price + Unit row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="prod-price">
                {isSw ? "Bei (TSh)" : "Price (TSh)"}{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="prod-price"
                type="number"
                min="0"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
                placeholder="0"
                data-ocid="seller.modal.price_input"
              />
              {errors.price && (
                <p
                  className="text-destructive text-xs"
                  data-ocid="seller.modal.price_field_error"
                >
                  {errors.price}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label>
                {isSw ? "Kipimo" : "Unit"}{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Select value={form.unit} onValueChange={(v) => set("unit", v)}>
                <SelectTrigger data-ocid="seller.modal.unit_select">
                  <SelectValue placeholder={isSw ? "Chagua" : "Select"} />
                </SelectTrigger>
                <SelectContent>
                  {UNITS.map((u) => (
                    <SelectItem key={u.value} value={u.value}>
                      {u.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.unit && (
                <p
                  className="text-destructive text-xs"
                  data-ocid="seller.modal.unit_field_error"
                >
                  {errors.unit}
                </p>
              )}
            </div>
          </div>

          {/* Stock + Location row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="prod-stock">
                {isSw ? "Hisa" : "Stock Qty"}{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="prod-stock"
                type="number"
                min="0"
                value={form.stock}
                onChange={(e) => set("stock", e.target.value)}
                placeholder="0"
                data-ocid="seller.modal.stock_input"
              />
              {errors.stock && (
                <p
                  className="text-destructive text-xs"
                  data-ocid="seller.modal.stock_field_error"
                >
                  {errors.stock}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="prod-location">
                {isSw ? "Mahali" : "Location"}{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="prod-location"
                value={form.location}
                onChange={(e) => set("location", e.target.value)}
                placeholder="e.g. Mwanza"
                data-ocid="seller.modal.location_input"
              />
              {errors.location && (
                <p
                  className="text-destructive text-xs"
                  data-ocid="seller.modal.location_field_error"
                >
                  {errors.location}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <Label htmlFor="prod-desc">
              {isSw ? "Maelezo" : "Description"}
            </Label>
            <Textarea
              id="prod-desc"
              rows={3}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder={
                isSw
                  ? "Elezea ubora au sifa maalum..."
                  : "Describe quality, health status, special qualities..."
              }
              data-ocid="seller.modal.description_textarea"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
              data-ocid="seller.modal.cancel_button"
            >
              {isSw ? "Ghairi" : "Cancel"}
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isSubmitting}
              data-ocid="seller.modal.submit_button"
            >
              {isSubmitting
                ? isSw
                  ? "Inahifadhi..."
                  : "Saving..."
                : editProduct
                  ? isSw
                    ? "Hifadhi Mabadiliko"
                    : "Save Changes"
                  : isSw
                    ? "Ongeza Bidhaa"
                    : "Add Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { CATEGORIES };
