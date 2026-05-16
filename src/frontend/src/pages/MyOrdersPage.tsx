import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatTSh } from "@/lib/mockData";
import { useLanguageStore } from "@/store/languageStore";
import type { PaymentMethod } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Lock,
  Package,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import React from "react";

type OrderStatus =
  | "pending"
  | "confirmed"
  | "in_transit"
  | "delivered"
  | "cancelled"
  | "held";

interface MockOrder {
  id: string;
  reference: string;
  listingTitle: string;
  listingId: string;
  sellerId: string;
  sellerName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  escrow?: boolean;
  createdAt: string;
}

const MOCK_ORDERS: MockOrder[] = [
  {
    id: "ord1",
    reference: "ORD-1715123456789",
    listingTitle: "NPK Fertilizer 50kg",
    listingId: "ml1",
    sellerId: "u5",
    sellerName: "Ally Agro Supplies",
    quantity: 5,
    unitPrice: 95000,
    totalPrice: 475000,
    paymentMethod: "mpesa",
    status: "delivered",
    createdAt: "2025-04-28T10:00:00Z",
  },
  {
    id: "ord2",
    reference: "ORD-1715223456790",
    listingTitle: "Hybrid Maize Seeds 5kg",
    listingId: "ml2",
    sellerId: "u5",
    sellerName: "Ally Agro Supplies",
    quantity: 10,
    unitPrice: 18500,
    totalPrice: 185000,
    paymentMethod: "crdb",
    status: "in_transit",
    createdAt: "2025-05-01T14:00:00Z",
  },
  {
    id: "ord3",
    reference: "ORD-1715323456791",
    listingTitle: "Tractor Plowing Service",
    listingId: "ml3",
    sellerId: "u6",
    sellerName: "Msigwa Farm Services",
    quantity: 3,
    unitPrice: 45000,
    totalPrice: 135000,
    paymentMethod: "cash",
    status: "confirmed",
    createdAt: "2025-05-03T09:00:00Z",
  },
  {
    id: "ord4",
    reference: "ORD-1715423456792",
    listingTitle: "Sahiwal Cross Cattle",
    listingId: "alf1",
    sellerId: "u2",
    sellerName: "Amina Hassan",
    quantity: 2,
    unitPrice: 850000,
    totalPrice: 1700000,
    paymentMethod: "nmb",
    status: "held",
    escrow: true,
    createdAt: "2025-05-05T11:00:00Z",
  },
  {
    id: "ord6",
    reference: "ORD-1715623456794",
    listingTitle: "Organic Tomatoes 10kg",
    listingId: "ml6",
    sellerId: "u8",
    sellerName: "Fatuma Organic Farm",
    quantity: 6,
    unitPrice: 8500,
    totalPrice: 51000,
    paymentMethod: "tigo_pesa",
    status: "held",
    escrow: true,
    createdAt: "2025-05-06T07:30:00Z",
  },
  {
    id: "ord5",
    reference: "ORD-1715523456793",
    listingTitle: "Dudu Kill Pesticide",
    listingId: "ip3",
    sellerId: "u5",
    sellerName: "Ally Agro Supplies",
    quantity: 4,
    unitPrice: 12000,
    totalPrice: 48000,
    paymentMethod: "mpesa",
    status: "delivered",
    createdAt: "2025-04-20T08:00:00Z",
  },
];

const STATUS_CONFIG: Record<
  OrderStatus,
  {
    label: string;
    labelSw: string;
    icon: React.ReactNode;
    badgeClass: string;
  }
> = {
  pending: {
    label: "Pending",
    labelSw: "Inasubiri",
    icon: <Clock className="w-3.5 h-3.5" />,
    badgeClass: "bg-amber-100 text-amber-700 border-amber-200",
  },
  confirmed: {
    label: "Confirmed",
    labelSw: "Imethibitishwa",
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    badgeClass: "bg-blue-100 text-blue-700 border-blue-200",
  },
  in_transit: {
    label: "In Transit",
    labelSw: "Safirishwa",
    icon: <Truck className="w-3.5 h-3.5" />,
    badgeClass: "bg-primary/10 text-primary border-primary/20",
  },
  delivered: {
    label: "Delivered",
    labelSw: "Imewasilishwa",
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    badgeClass: "bg-accent/15 text-accent-foreground border-accent/30",
  },
  cancelled: {
    label: "Cancelled",
    labelSw: "Imeghairiwa",
    icon: <Clock className="w-3.5 h-3.5" />,
    badgeClass: "bg-destructive/10 text-destructive border-destructive/20",
  },
  held: {
    label: "Payment Held",
    labelSw: "Malipo Yameshikiliwa",
    icon: <ShieldCheck className="w-3.5 h-3.5" />,
    badgeClass: "bg-amber-100 text-amber-700 border-amber-300",
  },
};

const PAYMENT_LABELS: Record<PaymentMethod, { en: string; sw: string }> = {
  mpesa: { en: "M-Pesa", sw: "M-Pesa" },
  tigo_pesa: { en: "Tigo Pesa", sw: "Tigo Pesa" },
  airtel_money: { en: "Airtel Money", sw: "Airtel Money" },
  crdb: { en: "CRDB Bank", sw: "Benki ya CRDB" },
  nmb: { en: "NMB Bank", sw: "Benki ya NMB" },
  cash: { en: "Cash on Delivery", sw: "Pesa Taslimu" },
};

function formatDate(iso: string, lang: string) {
  const d = new Date(iso);
  return lang === "sw"
    ? d.toLocaleDateString("sw-TZ", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
}

export default function MyOrdersPage() {
  const { t, language } = useLanguageStore();
  const navigate = useNavigate();
  const lang = language;
  const [orders, setOrders] = React.useState<MockOrder[]>(MOCK_ORDERS);

  const confirmDelivery = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status: "delivered" as const } : o,
      ),
    );
  };

  return (
    <Layout>
      <div data-ocid="my_orders.page" className="px-4 py-4 pb-10 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            data-ocid="my_orders.back_button"
            onClick={() => navigate({ to: "/marketplace" })}
            className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary/40 transition-smooth"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <div>
            <h1 className="font-display text-lg font-bold text-foreground">
              {t("myOrders")}
            </h1>
            <p className="text-xs text-muted-foreground">
              {orders.length} {lang === "sw" ? "maagizo" : "orders"}
            </p>
          </div>
        </div>

        {/* Summary chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {(
            [
              "all",
              "held",
              "pending",
              "confirmed",
              "in_transit",
              "delivered",
            ] as const
          ).map((s) => {
            const count =
              s === "all"
                ? orders.length
                : orders.filter((o) => o.status === s).length;
            return (
              <div
                key={s}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium ${
                  s === "held"
                    ? "bg-amber-50 border-amber-200 text-amber-700"
                    : "bg-card border-border text-muted-foreground"
                }`}
              >
                <span>{count}</span>
                <span>
                  {s === "all"
                    ? lang === "sw"
                      ? "Yote"
                      : "All"
                    : lang === "sw"
                      ? STATUS_CONFIG[s as OrderStatus]?.labelSw
                      : STATUS_CONFIG[s as OrderStatus]?.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Orders list */}
        {orders.length === 0 ? (
          <div
            data-ocid="my_orders.empty_state"
            className="bg-card border border-border rounded-xl py-14 text-center"
          >
            <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="font-semibold text-foreground">{t("noOrders")}</p>
            <p className="text-sm text-muted-foreground mt-1 max-w-xs mx-auto">
              {t("noOrdersDesc")}
            </p>
            <Button
              data-ocid="my_orders.go_to_marketplace_button"
              variant="outline"
              className="mt-4"
              onClick={() => navigate({ to: "/marketplace" })}
            >
              {t("goToMarketplace")}
            </Button>
          </div>
        ) : (
          <div className="space-y-3" data-ocid="my_orders.list">
            {orders.map((order, i) => {
              const status = STATUS_CONFIG[order.status];
              const isDelivered = order.status === "delivered";
              const isHeld = order.status === "held";
              return (
                <div
                  key={order.id}
                  data-ocid={`my_orders.item.${i + 1}`}
                  className="bg-card border border-border rounded-xl overflow-hidden"
                >
                  {/* Status bar */}
                  <div
                    className={`px-4 py-2 flex items-center justify-between border-b border-border ${
                      isHeld
                        ? "bg-amber-50"
                        : isDelivered
                          ? "bg-accent/8"
                          : "bg-muted/20"
                    }`}
                  >
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {order.reference}
                    </span>
                    <div
                      className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-semibold ${status.badgeClass}`}
                    >
                      {status.icon}
                      {lang === "sw" ? status.labelSw : status.label}
                    </div>
                  </div>

                  {/* Order body */}
                  <div className="p-4">
                    <div className="flex gap-3 items-start">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Package className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-foreground leading-tight">
                          {order.listingTitle}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {t("seller")}: {order.sellerName}
                        </p>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                          <span className="text-xs text-muted-foreground">
                            {t("quantity")}:{" "}
                            <strong className="text-foreground">
                              {order.quantity}
                            </strong>
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {
                              PAYMENT_LABELS[order.paymentMethod][
                                lang === "sw" ? "sw" : "en"
                              ]
                            }
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-bold text-primary text-sm">
                          {formatTSh(order.totalPrice)}
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          {formatDate(order.createdAt, lang)}
                        </p>
                      </div>
                    </div>

                    {/* Held escrow actions */}
                    {isHeld && (
                      <div className="mt-3 pt-3 border-t border-amber-200 space-y-2">
                        <div className="flex items-start gap-2 bg-amber-50 rounded-lg px-3 py-2">
                          <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <p className="text-xs text-amber-700 leading-relaxed">
                            {lang === "sw"
                              ? "Fedha zako zimeshikiliwa salama. Zitatolewa kwa muuzaji ukithibitisha utoaji."
                              : "Your funds are held securely. They will be released to the seller once you confirm delivery."}
                          </p>
                        </div>
                        <Button
                          data-ocid={`my_orders.confirm_delivery_button.${i + 1}`}
                          size="sm"
                          className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xs gap-1.5"
                          onClick={() => confirmDelivery(order.id)}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {lang === "sw"
                            ? "Thibitisha Utoaji & Toa Fedha"
                            : "Confirm Delivery & Release Funds"}
                        </Button>
                      </div>
                    )}

                    {/* Delivered actions */}
                    {isDelivered && (
                      <div className="mt-3 pt-3 border-t border-border flex gap-2">
                        <Button
                          data-ocid={`my_orders.rate_seller_button.${i + 1}`}
                          variant="outline"
                          size="sm"
                          className="flex-1 text-xs gap-1.5"
                          onClick={() =>
                            navigate({
                              to: "/seller/$sellerId/reviews",
                              params: { sellerId: order.sellerId },
                            })
                          }
                        >
                          <Star className="w-3.5 h-3.5" />
                          {t("rateSeller")}
                        </Button>
                        <Button
                          data-ocid={`my_orders.view_details_button.${i + 1}`}
                          variant="ghost"
                          size="sm"
                          className="flex-1 text-xs text-muted-foreground"
                          onClick={() => navigate({ to: "/marketplace" })}
                        >
                          {lang === "sw" ? "Nunua Tena" : "Buy Again"}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer */}
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
    </Layout>
  );
}
