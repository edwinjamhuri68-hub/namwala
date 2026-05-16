import { AddInputProductModal } from "@/components/AddInputProductModal";
import { Layout } from "@/components/Layout";
import { StatCard } from "@/components/ui/StatCard";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { INPUT_PRODUCTS, formatTSh } from "@/lib/mockData";
import { useAuthStore } from "@/store/authStore";
import { useLanguageStore } from "@/store/languageStore";
import type { InputProduct } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  Edit,
  MessageCircle,
  Package,
  PauseCircle,
  PlayCircle,
  Plus,
  Search,
  ShoppingCart,
  Trash2,
  TrendingUp,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const CATEGORY_COLORS: Record<string, string> = {
  seeds: "bg-green-50 text-green-700 border-green-200",
  fertilizer: "bg-amber-50 text-amber-700 border-amber-200",
  pesticide: "bg-red-50 text-red-700 border-red-200",
  feed: "bg-blue-50 text-blue-700 border-blue-200",
  equipment: "bg-purple-50 text-purple-700 border-purple-200",
  other: "bg-muted text-muted-foreground border-border",
};

export default function InputSellerDashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { language } = useLanguageStore();

  const isSw = language === "sw";

  const [products, setProducts] = useState<InputProduct[]>(() =>
    INPUT_PRODUCTS.map((p) => ({
      ...p,
      isActive: p.isActive ?? true,
      inquiries: p.inquiries ?? 0,
    })),
  );
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<InputProduct | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<InputProduct | null>(null);

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.category.toLowerCase().includes(search.toLowerCase()) ||
          p.location.toLowerCase().includes(search.toLowerCase()),
      ),
    [products, search],
  );

  const stats = useMemo(
    () => ({
      total: products.length,
      active: products.filter((p) => p.isActive).length,
      paused: products.filter((p) => !p.isActive).length,
      inquiries: products.reduce((sum, p) => sum + (p.inquiries ?? 0), 0),
    }),
    [products],
  );

  async function handleSubmit(
    data: Omit<InputProduct, "id" | "sellerId" | "sellerName">,
  ) {
    if (editProduct) {
      // Try backend update, fallback to local state
      setProducts((prev) =>
        prev.map((p) => (p.id === editProduct.id ? { ...p, ...data } : p)),
      );
      toast.success(
        isSw ? "Bidhaa imesasishwa" : "Product updated successfully",
      );
    } else {
      const newProduct: InputProduct = {
        id: `ip${Date.now()}`,
        sellerId: user?.id ?? "u5",
        sellerName: user?.businessName ?? user?.name ?? "Seller",
        ...data,
        isActive: true,
        inquiries: 0,
      };
      setProducts((prev) => [newProduct, ...prev]);
      toast.success(
        isSw ? "Bidhaa imeongezwa" : "Product added to marketplace",
      );
    }
    setEditProduct(null);
  }

  function handleEdit(product: InputProduct) {
    setEditProduct(product);
    setModalOpen(true);
  }

  function handleTogglePause(product: InputProduct) {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === product.id ? { ...p, isActive: !p.isActive } : p,
      ),
    );
    const wasActive = product.isActive;
    toast.success(
      wasActive
        ? isSw
          ? "Bidhaa imesimamishwa"
          : "Listing paused"
        : isSw
          ? "Bidhaa imeendelea"
          : "Listing resumed",
    );
  }

  function handleDeleteConfirm() {
    if (!deleteTarget) return;
    setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    toast.success(isSw ? "Bidhaa imefutwa" : "Product deleted");
    setDeleteTarget(null);
  }

  function openAddModal() {
    setEditProduct(null);
    setModalOpen(true);
  }

  return (
    <Layout>
      <div className="px-4 py-4 space-y-4">
        {/* Hero */}
        <div className="relative rounded-xl overflow-hidden">
          <img
            src="/assets/generated/inputs-market.dim_800x400.jpg"
            alt="Inputs"
            className="w-full h-32 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-orange-900/80 to-transparent flex items-end p-3">
            <div>
              <h1 className="text-lg font-display font-bold text-white">
                {isSw ? "Muuzaji wa Pembejeo" : "Input Seller Dashboard"}
              </h1>
              <p className="text-xs text-white/80">
                {user?.businessName ?? user?.name}
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2">
          <StatCard
            title={isSw ? "Bidhaa Zote" : "Total Products"}
            value={String(stats.total)}
            icon={<Package className="w-4 h-4" />}
            colorClass="bg-orange-50 text-orange-600"
          />
          <StatCard
            title={isSw ? "Zinazotumika" : "Active"}
            value={String(stats.active)}
            icon={<TrendingUp className="w-4 h-4" />}
            colorClass="bg-green-50 text-green-600"
          />
          <StatCard
            title={isSw ? "Zilizosimamishwa" : "Paused"}
            value={String(stats.paused)}
            icon={<PauseCircle className="w-4 h-4" />}
            colorClass="bg-muted text-muted-foreground"
          />
          <StatCard
            title={isSw ? "Maswali Yote" : "Total Inquiries"}
            value={String(stats.inquiries)}
            icon={<MessageCircle className="w-4 h-4" />}
            colorClass="bg-primary/10 text-primary"
          />
        </div>

        {/* Search + Add */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder={isSw ? "Tafuta bidhaa..." : "Search products..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-ocid="seller.search_input"
            />
          </div>
          <Button
            onClick={openAddModal}
            data-ocid="seller.add_product_button"
            className="shrink-0"
          >
            <Plus className="w-4 h-4 mr-1" />
            {isSw ? "Ongeza" : "Add"}
          </Button>
        </div>

        {/* Products list */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-foreground">
              {isSw ? "Bidhaa Zangu" : "My Products"}
            </h2>
            <span className="text-xs text-muted-foreground">
              {filtered.length} {isSw ? "bidhaa" : "products"}
            </span>
          </div>

          {filtered.length === 0 ? (
            <div
              data-ocid="seller.products.empty_state"
              className="bg-card border border-border rounded-xl p-8 flex flex-col items-center justify-center text-center gap-3"
            >
              <Package className="w-12 h-12 text-muted-foreground/40" />
              <p className="text-sm font-medium text-muted-foreground">
                {isSw
                  ? "Hakuna bidhaa. Ongeza bidhaa ya kwanza!"
                  : "No products yet. Add your first product!"}
              </p>
              <Button
                size="sm"
                onClick={openAddModal}
                data-ocid="seller.empty_state.add_button"
              >
                <Plus className="w-4 h-4 mr-1" />
                {isSw ? "Ongeza Bidhaa" : "Add Product"}
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((product, i) => (
                <div
                  key={product.id}
                  data-ocid={`seller.product.${i + 1}`}
                  className={`bg-card border rounded-xl overflow-hidden ${
                    product.isActive
                      ? "border-border"
                      : "border-border/50 opacity-75"
                  }`}
                >
                  <div className="flex">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-20 h-20 object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-20 h-20 flex-shrink-0 bg-muted flex items-center justify-center">
                        <Package className="w-8 h-8 text-muted-foreground/40" />
                      </div>
                    )}
                    <div className="p-3 flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <p className="font-semibold text-sm truncate">
                          {product.name}
                        </p>
                        <div className="flex items-center gap-1 shrink-0">
                          <Badge
                            className={`text-[10px] border ${
                              CATEGORY_COLORS[product.category] ?? "bg-muted"
                            }`}
                            variant="outline"
                          >
                            {product.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-sm font-bold text-primary">
                          {formatTSh(product.price)}/{product.unit}
                        </p>
                        <Badge
                          variant={product.isActive ? "default" : "secondary"}
                          className="text-[9px] h-4 px-1"
                        >
                          {product.isActive
                            ? isSw
                              ? "Hai"
                              : "Active"
                            : isSw
                              ? "Imesimamishwa"
                              : "Paused"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 mt-0.5 text-xs text-muted-foreground">
                        <span>
                          {isSw ? "Hisa:" : "Stock:"} {product.stock}{" "}
                          {product.unit}
                        </span>
                        <span>📍 {product.location}</span>
                      </div>
                      {(product.inquiries ?? 0) > 0 && (
                        <button
                          type="button"
                          className="mt-1 flex items-center gap-1 text-xs text-primary hover:underline"
                          onClick={() => {
                            navigate({
                              to: "/messages",
                              search: { recipientId: undefined },
                            });
                          }}
                          data-ocid={`seller.inquiry_link.${i + 1}`}
                        >
                          <MessageCircle className="w-3 h-3" />
                          {product.inquiries} {isSw ? "maswali" : "inquiries"}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Action row */}
                  <div className="border-t border-border/50 px-3 py-2 flex gap-2 bg-muted/20">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs px-2 gap-1"
                      onClick={() => handleEdit(product)}
                      data-ocid={`seller.edit_button.${i + 1}`}
                    >
                      <Edit className="w-3 h-3" />
                      {isSw ? "Hariri" : "Edit"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs px-2 gap-1"
                      onClick={() => handleTogglePause(product)}
                      data-ocid={`seller.pause_button.${i + 1}`}
                    >
                      {product.isActive ? (
                        <>
                          <PauseCircle className="w-3 h-3" />
                          {isSw ? "Simamisha" : "Pause"}
                        </>
                      ) : (
                        <>
                          <PlayCircle className="w-3 h-3" />
                          {isSw ? "Endelea" : "Resume"}
                        </>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 text-xs px-2 gap-1 text-destructive hover:bg-destructive/10 hover:text-destructive ml-auto"
                      onClick={() => setDeleteTarget(product)}
                      data-ocid={`seller.delete_button.${i + 1}`}
                    >
                      <Trash2 className="w-3 h-3" />
                      {isSw ? "Futa" : "Delete"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Recent orders */}
        <section>
          <h2 className="text-sm font-semibold text-foreground mb-2">
            {isSw ? "Maagizo ya Hivi Karibuni" : "Recent Orders"}
          </h2>
          {[
            {
              label: "Juma Mwangi • NPK Fertilizer 2 bags",
              status: isSw ? "Inasubiri" : "Pending",
            },
            {
              label: "Anna Sanga • Hybrid Maize Seeds 5 packs",
              status: isSw ? "Imethibitishwa" : "Confirmed",
            },
            {
              label: "Peter Kamau • Pesticide 3 litres",
              status: isSw ? "Imetumwa" : "Delivered",
            },
          ].map((order, i) => (
            <div
              key={order.label}
              data-ocid={`seller.order.${i + 1}`}
              className="bg-card border border-border rounded-xl p-3 flex items-center justify-between mb-2"
            >
              <div className="flex items-center gap-2 min-w-0">
                <ShoppingCart className="w-4 h-4 text-muted-foreground shrink-0" />
                <p className="text-sm text-foreground truncate">
                  {order.label}
                </p>
              </div>
              <Badge variant="secondary" className="text-[10px] shrink-0 ml-2">
                {order.status}
              </Badge>
            </div>
          ))}
        </section>

        <div className="text-center text-xs text-muted-foreground pt-2 pb-4">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            className="hover:text-primary"
            target="_blank"
            rel="noreferrer"
          >
            caffeine.ai
          </a>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AddInputProductModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditProduct(null);
        }}
        onSubmit={handleSubmit}
        editProduct={editProduct}
        language={language}
      />

      {/* Delete confirm dialog */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(v) => !v && setDeleteTarget(null)}
      >
        <AlertDialogContent data-ocid="seller.delete_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isSw ? "Futa Bidhaa?" : "Delete Product?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {isSw
                ? `Bidhaa "${deleteTarget?.name}" itafutwa kabisa. Huwezi kubatilisha hatua hii.`
                : `"${deleteTarget?.name}" will be permanently deleted. This action cannot be undone.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="seller.delete_dialog.cancel_button">
              {isSw ? "Ghairi" : "Cancel"}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive hover:bg-destructive/90"
              data-ocid="seller.delete_dialog.confirm_button"
            >
              {isSw ? "Futa" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
}
