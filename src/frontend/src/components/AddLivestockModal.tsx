import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguageStore } from "@/store/languageStore";
import type { AnimalListingFull } from "@/types";
import { Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ANIMAL_TYPES = ["Cattle", "Goats", "Sheep", "Poultry", "Pigs", "Other"];
const HEALTH_STATUS_OPTIONS = ["Excellent", "Good", "Fair", "Needs Attention"];

interface FormState {
  animalType: string;
  breed: string;
  ageValue: string;
  ageUnit: "months" | "years";
  count: string;
  pricePerHead: string;
  location: string;
  healthStatus: string;
  healthDescription: string;
  specialQualities: string;
  imagePreview: string | null;
}

const EMPTY_FORM: FormState = {
  animalType: "Cattle",
  breed: "",
  ageValue: "",
  ageUnit: "months",
  count: "",
  pricePerHead: "",
  location: "",
  healthStatus: "Excellent",
  healthDescription: "",
  specialQualities: "",
  imagePreview: null,
};

interface Props {
  open: boolean;
  existing?: AnimalListingFull | null;
  onClose: () => void;
  onSubmit: (
    data: Omit<
      AnimalListingFull,
      "id" | "keeperId" | "keeperName" | "inquiries" | "isActive" | "createdAt"
    >,
  ) => void;
}

export function AddLivestockModal({
  open,
  existing,
  onClose,
  onSubmit,
}: Props) {
  const { language } = useLanguageStore();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const fileRef = useRef<HTMLInputElement>(null);

  const isEdit = !!existing;

  useEffect(() => {
    if (existing) {
      const [ageV, ageU] = (existing.age ?? "").split(" ");
      setForm({
        animalType: existing.animalType,
        breed: existing.breed ?? "",
        ageValue: ageV ?? "",
        ageUnit: (ageU === "years" ? "years" : "months") as "months" | "years",
        count: String(existing.count),
        pricePerHead: String(existing.pricePerHead),
        location: existing.location,
        healthStatus: existing.healthStatus,
        healthDescription: existing.healthDescription ?? "",
        specialQualities: existing.specialQualities ?? "",
        imagePreview: existing.imageUrl ?? null,
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
  }, [existing]);

  if (!open) return null;

  const L = {
    title: isEdit
      ? language === "sw"
        ? "Hariri Orodha ya Mnyama"
        : "Edit Livestock Listing"
      : language === "sw"
        ? "Ongeza Mnyama kwa Kuuza"
        : "Add Livestock for Sale",
    animalType: language === "sw" ? "Aina ya Mnyama" : "Animal Type",
    breed: language === "sw" ? "Aina ya Mbari" : "Breed",
    age: language === "sw" ? "Umri" : "Age",
    count: language === "sw" ? "Idadi" : "Quantity",
    price: language === "sw" ? "Bei kwa Kichwa (TSh)" : "Price per Head (TSh)",
    location: language === "sw" ? "Eneo" : "Location",
    healthStatus: language === "sw" ? "Hali ya Afya" : "Health Status",
    healthDesc: language === "sw" ? "Maelezo ya Afya" : "Health Description",
    special: language === "sw" ? "Sifa Maalum" : "Special Qualities",
    image: language === "sw" ? "Picha" : "Image",
    addImage: language === "sw" ? "Ongeza Picha" : "Upload Image",
    submit: isEdit
      ? language === "sw"
        ? "Hifadhi Mabadiliko"
        : "Save Changes"
      : language === "sw"
        ? "Weka Orodha"
        : "List Animal",
    cancel: language === "sw" ? "Ghairi" : "Cancel",
    required: language === "sw" ? "Inahitajika" : "Required",
    months: language === "sw" ? "miezi" : "months",
    years: language === "sw" ? "miaka" : "years",
  };

  const set = (k: keyof FormState, v: string | null) =>
    setForm((p) => ({ ...p, [k]: v }));

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => set("imagePreview", ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const errs: Partial<Record<keyof FormState, string>> = {};
    if (!form.breed.trim()) errs.breed = L.required;
    if (!form.ageValue || Number(form.ageValue) <= 0)
      errs.ageValue = L.required;
    if (!form.count || Number(form.count) <= 0) errs.count = L.required;
    if (!form.pricePerHead || Number(form.pricePerHead) <= 0)
      errs.pricePerHead = L.required;
    if (!form.location.trim()) errs.location = L.required;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      animalType: form.animalType,
      breed: form.breed.trim(),
      age: `${form.ageValue} ${form.ageUnit}`,
      count: Number(form.count),
      pricePerHead: Number(form.pricePerHead),
      location: form.location.trim(),
      healthStatus: form.healthStatus,
      healthDescription: form.healthDescription.trim(),
      specialQualities: form.specialQualities.trim(),
      imageUrl: form.imagePreview ?? undefined,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
      role="presentation"
    >
      <div className="bg-card w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[92dvh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
          <h2 className="font-display font-bold text-base text-foreground">
            {L.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-muted transition-colors"
            data-ocid="add_livestock_modal.close_button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1">
          <div className="px-4 py-3 space-y-4">
            {/* Animal Type */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">{L.animalType}</Label>
              <div className="flex flex-wrap gap-2">
                {ANIMAL_TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => set("animalType", t)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                      form.animalType === t
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-muted text-muted-foreground border-border hover:border-primary/40"
                    }`}
                  >
                    {t === "Cattle"
                      ? "🐄"
                      : t === "Goats"
                        ? "🐐"
                        : t === "Sheep"
                          ? "🐑"
                          : t === "Poultry"
                            ? "🐔"
                            : t === "Pigs"
                              ? "🐷"
                              : "🐾"}{" "}
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Breed */}
            <div className="space-y-1.5">
              <Label htmlFor="al-breed" className="text-xs font-semibold">
                {L.breed} *
              </Label>
              <Input
                id="al-breed"
                value={form.breed}
                onChange={(e) => set("breed", e.target.value)}
                placeholder={
                  language === "sw"
                    ? "mfano: Sahiwal Cross"
                    : "e.g. Sahiwal Cross"
                }
                className="text-sm"
                data-ocid="add_livestock_modal.breed_input"
              />
              {errors.breed && (
                <p className="text-xs text-destructive">{errors.breed}</p>
              )}
            </div>

            {/* Age + Count row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="al-age" className="text-xs font-semibold">
                  {L.age} *
                </Label>
                <div className="flex gap-1">
                  <Input
                    id="al-age"
                    type="number"
                    min="1"
                    value={form.ageValue}
                    onChange={(e) => set("ageValue", e.target.value)}
                    className="text-sm flex-1 min-w-0"
                    placeholder="12"
                    data-ocid="add_livestock_modal.age_input"
                  />
                  <select
                    value={form.ageUnit}
                    onChange={(e) => set("ageUnit", e.target.value)}
                    className="border border-input rounded-md px-2 text-xs bg-background text-foreground"
                    data-ocid="add_livestock_modal.age_unit_select"
                  >
                    <option value="months">{L.months}</option>
                    <option value="years">{L.years}</option>
                  </select>
                </div>
                {errors.ageValue && (
                  <p className="text-xs text-destructive">{errors.ageValue}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="al-count" className="text-xs font-semibold">
                  {L.count} *
                </Label>
                <Input
                  id="al-count"
                  type="number"
                  min="1"
                  value={form.count}
                  onChange={(e) => set("count", e.target.value)}
                  className="text-sm"
                  placeholder="10"
                  data-ocid="add_livestock_modal.count_input"
                />
                {errors.count && (
                  <p className="text-xs text-destructive">{errors.count}</p>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="space-y-1.5">
              <Label htmlFor="al-price" className="text-xs font-semibold">
                {L.price} *
              </Label>
              <Input
                id="al-price"
                type="number"
                min="1"
                value={form.pricePerHead}
                onChange={(e) => set("pricePerHead", e.target.value)}
                placeholder="850000"
                className="text-sm"
                data-ocid="add_livestock_modal.price_input"
              />
              {errors.pricePerHead && (
                <p className="text-xs text-destructive">
                  {errors.pricePerHead}
                </p>
              )}
            </div>

            {/* Location */}
            <div className="space-y-1.5">
              <Label htmlFor="al-location" className="text-xs font-semibold">
                {L.location} *
              </Label>
              <Input
                id="al-location"
                value={form.location}
                onChange={(e) => set("location", e.target.value)}
                placeholder={
                  language === "sw" ? "mfano: Arusha" : "e.g. Arusha"
                }
                className="text-sm"
                data-ocid="add_livestock_modal.location_input"
              />
              {errors.location && (
                <p className="text-xs text-destructive">{errors.location}</p>
              )}
            </div>

            {/* Health Status */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">{L.healthStatus}</Label>
              <div className="flex gap-2 flex-wrap">
                {HEALTH_STATUS_OPTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => set("healthStatus", s)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                      form.healthStatus === s
                        ? s === "Excellent" || s === "Good"
                          ? "bg-green-600 text-white border-green-600"
                          : s === "Fair"
                            ? "bg-amber-500 text-white border-amber-500"
                            : "bg-destructive text-white border-destructive"
                        : "bg-muted text-muted-foreground border-border hover:border-primary/40"
                    }`}
                    data-ocid={`add_livestock_modal.health_${s.toLowerCase().replace(" ", "_")}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Health Description */}
            <div className="space-y-1.5">
              <Label htmlFor="al-healthdesc" className="text-xs font-semibold">
                {L.healthDesc}
              </Label>
              <Textarea
                id="al-healthdesc"
                value={form.healthDescription}
                onChange={(e) => set("healthDescription", e.target.value)}
                placeholder={
                  language === "sw"
                    ? "Elezea hali ya afya ya mnyama..."
                    : "Describe health condition, vaccinations..."
                }
                rows={2}
                className="text-sm resize-none"
                data-ocid="add_livestock_modal.health_desc_textarea"
              />
            </div>

            {/* Special Qualities */}
            <div className="space-y-1.5">
              <Label htmlFor="al-special" className="text-xs font-semibold">
                {L.special}
              </Label>
              <Textarea
                id="al-special"
                value={form.specialQualities}
                onChange={(e) => set("specialQualities", e.target.value)}
                placeholder={
                  language === "sw"
                    ? "mfano: Anatosha maziwa mengi, amechanjwa..."
                    : "e.g. High milk producer, fully vaccinated..."
                }
                rows={2}
                className="text-sm resize-none"
                data-ocid="add_livestock_modal.special_qualities_textarea"
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">{L.image}</Label>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
                data-ocid="add_livestock_modal.image_file_input"
              />
              {form.imagePreview ? (
                <div className="relative w-full h-36 rounded-xl overflow-hidden bg-muted">
                  <img
                    src={form.imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => set("imagePreview", null)}
                    className="absolute top-2 right-2 bg-black/60 rounded-full p-1"
                    data-ocid="add_livestock_modal.remove_image_button"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="w-full h-28 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 hover:border-primary/60 transition-colors bg-muted/30"
                  data-ocid="add_livestock_modal.upload_button"
                >
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <Upload className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {L.addImage}
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-2 px-4 py-3 border-t border-border shrink-0">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
              data-ocid="add_livestock_modal.cancel_button"
            >
              {L.cancel}
            </Button>
            <Button
              type="submit"
              className="flex-1"
              data-ocid="add_livestock_modal.submit_button"
            >
              {L.submit}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
