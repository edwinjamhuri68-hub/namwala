import { k as createLucideIcon, r as reactExports, j as jsxRuntimeExports, X, I as Input, l as Textarea, B as Button, b as useNavigate, u as useAuthStore, a as useLanguageStore, V as INPUT_PRODUCTS, L as Layout, P as Package, T as TrendingUp, M as MessageCircle, S as Search, m as Badge, z as formatTSh, Y as ShoppingCart } from "./index-BUVIgngH.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-Coi4Z4Fu.js";
import { L as Label } from "./label-BTY_QCm0.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C7D5N9Bz.js";
import { I as ImagePlus } from "./image-plus-Bmg-yBgt.js";
import { S as StatCard } from "./StatCard-vQlqcd7B.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-Cumv3Uzu.js";
import { u as ue } from "./index-c308oYmR.js";
import { C as CirclePause, a as CirclePlay } from "./circle-play-BucC6o4u.js";
import { P as Plus } from "./plus-DMsGFanj.js";
import { T as Trash2 } from "./trash-2-BRLnMANv.js";
import "./index-BpD0H2hM.js";
import "./index-BoFiBQpD.js";
import "./Combination-D9wAFE8R.js";
import "./index-D6ql0bBU.js";
import "./index-Cg_2nNnI.js";
import "./index-ob0xpmgs.js";
import "./index-Oh98DbrD.js";
import "./check-Byk4lD13.js";
import "./chevron-up-CnJPygwE.js";
import "./trending-down-B-P0A2rN.js";
import "./minus-BAwtOhGD.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7", key: "1m0v6g" }],
  [
    "path",
    {
      d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
      key: "ohrbg2"
    }
  ]
];
const SquarePen = createLucideIcon("square-pen", __iconNode);
const EMPTY_FORM = {
  name: "",
  category: "",
  description: "",
  price: "",
  unit: "",
  stock: "",
  location: "",
  imageUrl: ""
};
const CATEGORIES = [
  { value: "seeds", label: "Seeds", labelSw: "Mbegu" },
  { value: "fertilizer", label: "Fertilizer", labelSw: "Mbolea" },
  { value: "pesticide", label: "Pesticides", labelSw: "Dawa za Wadudu" },
  { value: "feed", label: "Animal Feed", labelSw: "Chakula cha Mifugo" },
  { value: "equipment", label: "Equipment", labelSw: "Vifaa" },
  { value: "other", label: "Other", labelSw: "Nyingine" }
];
const UNITS = [
  { value: "kg", label: "kg" },
  { value: "bags", label: "bags / magunia" },
  { value: "litres", label: "litres / lita" },
  { value: "pieces", label: "pieces / vipande" },
  { value: "packs", label: "packs / pakiti" },
  { value: "tonnes", label: "tonnes / tani" }
];
function AddInputProductModal({
  open,
  onClose,
  onSubmit,
  editProduct,
  language
}) {
  const isSw = language === "sw";
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const [errors, setErrors] = reactExports.useState(
    {}
  );
  const [imagePreview, setImagePreview] = reactExports.useState(null);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const fileRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (editProduct) {
      setForm({
        name: editProduct.name,
        category: editProduct.category,
        description: editProduct.description,
        price: String(editProduct.price),
        unit: editProduct.unit,
        stock: String(editProduct.stock),
        location: editProduct.location,
        imageUrl: editProduct.imageUrl ?? ""
      });
      setImagePreview(editProduct.imageUrl ?? null);
    } else {
      setForm(EMPTY_FORM);
      setImagePreview(null);
    }
    setErrors({});
  }, [editProduct]);
  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  function validate() {
    const e = {};
    if (!form.name.trim())
      e.name = isSw ? "Jina linahitajika" : "Name is required";
    if (!form.category)
      e.category = isSw ? "Chagua jamii" : "Select a category";
    if (!form.price || Number.isNaN(Number(form.price)) || Number(form.price) <= 0)
      e.price = isSw ? "Bei sahihi inahitajika" : "Valid price required";
    if (!form.unit) e.unit = isSw ? "Chagua kipimo" : "Select a unit";
    if (!form.stock || Number.isNaN(Number(form.stock)) || Number(form.stock) < 0)
      e.stock = isSw ? "Kiasi sahihi kinahitajika" : "Valid stock quantity required";
    if (!form.location.trim())
      e.location = isSw ? "Mahali panahitajika" : "Location is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }
  function handleImage(e) {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      var _a2;
      const result = (_a2 = ev.target) == null ? void 0 : _a2.result;
      setImagePreview(result);
      set("imageUrl", result);
    };
    reader.readAsDataURL(file);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await onSubmit({
        name: form.name.trim(),
        category: form.category,
        description: form.description.trim(),
        price: Number(form.price),
        unit: form.unit,
        stock: Number(form.stock),
        location: form.location.trim(),
        imageUrl: form.imageUrl || void 0
      });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  }
  const title = editProduct ? isSw ? "Hariri Bidhaa" : "Edit Product" : isSw ? "Ongeza Bidhaa Mpya" : "Add New Product";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-lg max-h-[90vh] overflow-y-auto",
      "data-ocid": "seller.product_modal",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: title }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: isSw ? "Picha ya Bidhaa" : "Product Image" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "w-full border-2 border-dashed border-border rounded-lg overflow-hidden cursor-pointer relative bg-muted/30 text-left",
                onClick: () => {
                  var _a;
                  return (_a = fileRef.current) == null ? void 0 : _a.click();
                },
                "aria-label": isSw ? "Pakia picha" : "Upload image",
                children: imagePreview ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: imagePreview,
                      alt: "Preview",
                      className: "w-full h-40 object-cover"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: "absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-0.5",
                      onClick: (e) => {
                        e.stopPropagation();
                        setImagePreview(null);
                        set("imageUrl", "");
                      },
                      "aria-label": "Remove image",
                      "data-ocid": "seller.modal.remove_image_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                    }
                  )
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-32 flex flex-col items-center justify-center text-muted-foreground gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "w-8 h-8" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: isSw ? "Bonyeza kupakia picha" : "Click to upload image" })
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: fileRef,
                type: "file",
                accept: "image/*",
                className: "hidden",
                onChange: handleImage,
                "data-ocid": "seller.modal.image_upload"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "prod-name", children: [
              isSw ? "Jina la Bidhaa" : "Product Name",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "prod-name",
                value: form.name,
                onChange: (e) => set("name", e.target.value),
                placeholder: isSw ? "Mfano: NPK 17-17-17" : "e.g. NPK 17-17-17 Fertilizer",
                "data-ocid": "seller.modal.name_input"
              }
            ),
            errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-destructive text-xs",
                "data-ocid": "seller.modal.name_field_error",
                children: errors.name
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
              isSw ? "Jamii" : "Category",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.category,
                onValueChange: (v) => set("category", v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "seller.modal.category_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectValue,
                    {
                      placeholder: isSw ? "Chagua jamii" : "Select category"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.value, children: isSw ? c.labelSw : c.label }, c.value)) })
                ]
              }
            ),
            errors.category && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-destructive text-xs",
                "data-ocid": "seller.modal.category_field_error",
                children: errors.category
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "prod-price", children: [
                isSw ? "Bei (TSh)" : "Price (TSh)",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "prod-price",
                  type: "number",
                  min: "0",
                  value: form.price,
                  onChange: (e) => set("price", e.target.value),
                  placeholder: "0",
                  "data-ocid": "seller.modal.price_input"
                }
              ),
              errors.price && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-destructive text-xs",
                  "data-ocid": "seller.modal.price_field_error",
                  children: errors.price
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
                isSw ? "Kipimo" : "Unit",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.unit, onValueChange: (v) => set("unit", v), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "seller.modal.unit_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: isSw ? "Chagua" : "Select" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: UNITS.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: u.value, children: u.label }, u.value)) })
              ] }),
              errors.unit && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-destructive text-xs",
                  "data-ocid": "seller.modal.unit_field_error",
                  children: errors.unit
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "prod-stock", children: [
                isSw ? "Hisa" : "Stock Qty",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "prod-stock",
                  type: "number",
                  min: "0",
                  value: form.stock,
                  onChange: (e) => set("stock", e.target.value),
                  placeholder: "0",
                  "data-ocid": "seller.modal.stock_input"
                }
              ),
              errors.stock && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-destructive text-xs",
                  "data-ocid": "seller.modal.stock_field_error",
                  children: errors.stock
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "prod-location", children: [
                isSw ? "Mahali" : "Location",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "prod-location",
                  value: form.location,
                  onChange: (e) => set("location", e.target.value),
                  placeholder: "e.g. Mwanza",
                  "data-ocid": "seller.modal.location_input"
                }
              ),
              errors.location && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-destructive text-xs",
                  "data-ocid": "seller.modal.location_field_error",
                  children: errors.location
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "prod-desc", children: isSw ? "Maelezo" : "Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "prod-desc",
                rows: 3,
                value: form.description,
                onChange: (e) => set("description", e.target.value),
                placeholder: isSw ? "Elezea ubora au sifa maalum..." : "Describe quality, health status, special qualities...",
                "data-ocid": "seller.modal.description_textarea"
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
                "data-ocid": "seller.modal.cancel_button",
                children: isSw ? "Ghairi" : "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                className: "flex-1",
                disabled: isSubmitting,
                "data-ocid": "seller.modal.submit_button",
                children: isSubmitting ? isSw ? "Inahifadhi..." : "Saving..." : editProduct ? isSw ? "Hifadhi Mabadiliko" : "Save Changes" : isSw ? "Ongeza Bidhaa" : "Add Product"
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
const CATEGORY_COLORS = {
  seeds: "bg-green-50 text-green-700 border-green-200",
  fertilizer: "bg-amber-50 text-amber-700 border-amber-200",
  pesticide: "bg-red-50 text-red-700 border-red-200",
  feed: "bg-blue-50 text-blue-700 border-blue-200",
  equipment: "bg-purple-50 text-purple-700 border-purple-200",
  other: "bg-muted text-muted-foreground border-border"
};
function InputSellerDashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { language } = useLanguageStore();
  const isSw = language === "sw";
  const [products, setProducts] = reactExports.useState(
    () => INPUT_PRODUCTS.map((p) => ({
      ...p,
      isActive: p.isActive ?? true,
      inquiries: p.inquiries ?? 0
    }))
  );
  const [search, setSearch] = reactExports.useState("");
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [editProduct, setEditProduct] = reactExports.useState(null);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const filtered = reactExports.useMemo(
    () => products.filter(
      (p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase())
    ),
    [products, search]
  );
  const stats = reactExports.useMemo(
    () => ({
      total: products.length,
      active: products.filter((p) => p.isActive).length,
      paused: products.filter((p) => !p.isActive).length,
      inquiries: products.reduce((sum, p) => sum + (p.inquiries ?? 0), 0)
    }),
    [products]
  );
  async function handleSubmit(data) {
    if (editProduct) {
      setProducts(
        (prev) => prev.map((p) => p.id === editProduct.id ? { ...p, ...data } : p)
      );
      ue.success(
        isSw ? "Bidhaa imesasishwa" : "Product updated successfully"
      );
    } else {
      const newProduct = {
        id: `ip${Date.now()}`,
        sellerId: (user == null ? void 0 : user.id) ?? "u5",
        sellerName: (user == null ? void 0 : user.businessName) ?? (user == null ? void 0 : user.name) ?? "Seller",
        ...data,
        isActive: true,
        inquiries: 0
      };
      setProducts((prev) => [newProduct, ...prev]);
      ue.success(
        isSw ? "Bidhaa imeongezwa" : "Product added to marketplace"
      );
    }
    setEditProduct(null);
  }
  function handleEdit(product) {
    setEditProduct(product);
    setModalOpen(true);
  }
  function handleTogglePause(product) {
    setProducts(
      (prev) => prev.map(
        (p) => p.id === product.id ? { ...p, isActive: !p.isActive } : p
      )
    );
    const wasActive = product.isActive;
    ue.success(
      wasActive ? isSw ? "Bidhaa imesimamishwa" : "Listing paused" : isSw ? "Bidhaa imeendelea" : "Listing resumed"
    );
  }
  function handleDeleteConfirm() {
    if (!deleteTarget) return;
    setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    ue.success(isSw ? "Bidhaa imefutwa" : "Product deleted");
    setDeleteTarget(null);
  }
  function openAddModal() {
    setEditProduct(null);
    setModalOpen(true);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-4 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-xl overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: "/assets/generated/inputs-market.dim_800x400.jpg",
            alt: "Inputs",
            className: "w-full h-32 object-cover"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-orange-900/80 to-transparent flex items-end p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-display font-bold text-white", children: isSw ? "Muuzaji wa Pembejeo" : "Input Seller Dashboard" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/80", children: (user == null ? void 0 : user.businessName) ?? (user == null ? void 0 : user.name) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            title: isSw ? "Bidhaa Zote" : "Total Products",
            value: String(stats.total),
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4" }),
            colorClass: "bg-orange-50 text-orange-600"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            title: isSw ? "Zinazotumika" : "Active",
            value: String(stats.active),
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4" }),
            colorClass: "bg-green-50 text-green-600"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            title: isSw ? "Zilizosimamishwa" : "Paused",
            value: String(stats.paused),
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePause, { className: "w-4 h-4" }),
            colorClass: "bg-muted text-muted-foreground"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            title: isSw ? "Maswali Yote" : "Total Inquiries",
            value: String(stats.inquiries),
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }),
            colorClass: "bg-primary/10 text-primary"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              className: "pl-9",
              placeholder: isSw ? "Tafuta bidhaa..." : "Search products...",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              "data-ocid": "seller.search_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: openAddModal,
            "data-ocid": "seller.add_product_button",
            className: "shrink-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1" }),
              isSw ? "Ongeza" : "Add"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground", children: isSw ? "Bidhaa Zangu" : "My Products" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            filtered.length,
            " ",
            isSw ? "bidhaa" : "products"
          ] })
        ] }),
        filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "seller.products.empty_state",
            className: "bg-card border border-border rounded-xl p-8 flex flex-col items-center justify-center text-center gap-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-12 h-12 text-muted-foreground/40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: isSw ? "Hakuna bidhaa. Ongeza bidhaa ya kwanza!" : "No products yet. Add your first product!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  onClick: openAddModal,
                  "data-ocid": "seller.empty_state.add_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1" }),
                    isSw ? "Ongeza Bidhaa" : "Add Product"
                  ]
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filtered.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": `seller.product.${i + 1}`,
            className: `bg-card border rounded-xl overflow-hidden ${product.isActive ? "border-border" : "border-border/50 opacity-75"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
                product.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: product.imageUrl,
                    alt: product.name,
                    className: "w-20 h-20 object-cover flex-shrink-0"
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 flex-shrink-0 bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-8 h-8 text-muted-foreground/40" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm truncate", children: product.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        className: `text-[10px] border ${CATEGORY_COLORS[product.category] ?? "bg-muted"}`,
                        variant: "outline",
                        children: product.category
                      }
                    ) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-primary", children: [
                      formatTSh(product.price),
                      "/",
                      product.unit
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: product.isActive ? "default" : "secondary",
                        className: "text-[9px] h-4 px-1",
                        children: product.isActive ? isSw ? "Hai" : "Active" : isSw ? "Imesimamishwa" : "Paused"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-0.5 text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      isSw ? "Hisa:" : "Stock:",
                      " ",
                      product.stock,
                      " ",
                      product.unit
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "📍 ",
                      product.location
                    ] })
                  ] }),
                  (product.inquiries ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      className: "mt-1 flex items-center gap-1 text-xs text-primary hover:underline",
                      onClick: () => {
                        navigate({
                          to: "/messages",
                          search: { recipientId: void 0 }
                        });
                      },
                      "data-ocid": `seller.inquiry_link.${i + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-3 h-3" }),
                        product.inquiries,
                        " ",
                        isSw ? "maswali" : "inquiries"
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border/50 px-3 py-2 flex gap-2 bg-muted/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "h-7 text-xs px-2 gap-1",
                    onClick: () => handleEdit(product),
                    "data-ocid": `seller.edit_button.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "w-3 h-3" }),
                      isSw ? "Hariri" : "Edit"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "h-7 text-xs px-2 gap-1",
                    onClick: () => handleTogglePause(product),
                    "data-ocid": `seller.pause_button.${i + 1}`,
                    children: product.isActive ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePause, { className: "w-3 h-3" }),
                      isSw ? "Simamisha" : "Pause"
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "w-3 h-3" }),
                      isSw ? "Endelea" : "Resume"
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "ghost",
                    className: "h-7 text-xs px-2 gap-1 text-destructive hover:bg-destructive/10 hover:text-destructive ml-auto",
                    onClick: () => setDeleteTarget(product),
                    "data-ocid": `seller.delete_button.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" }),
                      isSw ? "Futa" : "Delete"
                    ]
                  }
                )
              ] })
            ]
          },
          product.id
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground mb-2", children: isSw ? "Maagizo ya Hivi Karibuni" : "Recent Orders" }),
        [
          {
            label: "Juma Mwangi • NPK Fertilizer 2 bags",
            status: isSw ? "Inasubiri" : "Pending"
          },
          {
            label: "Anna Sanga • Hybrid Maize Seeds 5 packs",
            status: isSw ? "Imethibitishwa" : "Confirmed"
          },
          {
            label: "Peter Kamau • Pesticide 3 litres",
            status: isSw ? "Imetumwa" : "Delivered"
          }
        ].map((order, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": `seller.order.${i + 1}`,
            className: "bg-card border border-border rounded-xl p-3 flex items-center justify-between mb-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-4 h-4 text-muted-foreground shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground truncate", children: order.label })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-[10px] shrink-0 ml-2", children: order.status })
            ]
          },
          order.label
        ))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-xs text-muted-foreground pt-2 pb-4", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        ". Built with love using",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
            className: "hover:text-primary",
            target: "_blank",
            rel: "noreferrer",
            children: "caffeine.ai"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddInputProductModal,
      {
        open: modalOpen,
        onClose: () => {
          setModalOpen(false);
          setEditProduct(null);
        },
        onSubmit: handleSubmit,
        editProduct,
        language
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: !!deleteTarget,
        onOpenChange: (v) => !v && setDeleteTarget(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "seller.delete_dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: isSw ? "Futa Bidhaa?" : "Delete Product?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: isSw ? `Bidhaa "${deleteTarget == null ? void 0 : deleteTarget.name}" itafutwa kabisa. Huwezi kubatilisha hatua hii.` : `"${deleteTarget == null ? void 0 : deleteTarget.name}" will be permanently deleted. This action cannot be undone.` })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "seller.delete_dialog.cancel_button", children: isSw ? "Ghairi" : "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                onClick: handleDeleteConfirm,
                className: "bg-destructive hover:bg-destructive/90",
                "data-ocid": "seller.delete_dialog.confirm_button",
                children: isSw ? "Futa" : "Delete"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  InputSellerDashboard as default
};
