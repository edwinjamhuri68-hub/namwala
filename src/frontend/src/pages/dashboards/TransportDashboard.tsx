import { Layout } from "@/components/Layout";
import { StatCard } from "@/components/ui/StatCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatTSh } from "@/lib/mockData";
import { useAuthStore } from "@/store/authStore";
import { useLanguageStore } from "@/store/languageStore";
import {
  Calendar,
  CheckCircle,
  MapPin,
  MessageCircle,
  Plus,
  Truck,
} from "lucide-react";

const TRANSPORT_REQUESTS = [
  {
    id: "tr1",
    client: "Juma Mwangi",
    from: "Mbeya",
    to: "Dar es Salaam",
    cargo: "Maize 2000kg",
    date: "2025-05-08",
    price: 350000,
    status: "confirmed",
  },
  {
    id: "tr2",
    client: "Anna Sanga",
    from: "Singida",
    to: "Mwanza",
    cargo: "Sunflower 3000kg",
    date: "2025-05-09",
    price: 280000,
    status: "pending",
  },
  {
    id: "tr3",
    client: "David Mushi",
    from: "Arusha",
    to: "Moshi",
    cargo: "Coffee 500kg",
    date: "2025-05-11",
    price: 120000,
    status: "confirmed",
  },
];

export default function TransportDashboard() {
  const { user } = useAuthStore();
  const { language } = useLanguageStore();

  return (
    <Layout>
      <div className="px-4 py-4 space-y-4">
        {/* Hero */}
        <div className="relative rounded-xl overflow-hidden">
          <img
            src="/assets/generated/transport-provider.dim_800x400.jpg"
            alt="Transport"
            className="w-full h-32 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-transparent flex items-end p-3">
            <div>
              <h1 className="text-lg font-display font-bold text-white">
                {language === "sw"
                  ? "Mtoa Huduma za Usafiri"
                  : "Transport Provider"}
              </h1>
              <p className="text-xs text-white/80">
                {user?.name} · {user?.vehicleType}
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <StatCard
            title={language === "sw" ? "Safari Zilizopangwa" : "Trips Planned"}
            value="3"
            icon={<Truck className="w-4 h-4" />}
            colorClass="bg-indigo-50 text-indigo-600"
          />
          <StatCard
            title={language === "sw" ? "Maombi" : "Requests"}
            value="5"
            icon={<Calendar className="w-4 h-4" />}
            colorClass="bg-amber-50 text-amber-600"
          />
          <StatCard
            title={language === "sw" ? "Mapato" : "Earnings"}
            value="TSh 750K"
            icon={<span className="text-sm">💰</span>}
            colorClass="bg-green-50 text-green-600"
            trend="up"
            trendValue="+25%"
          />
        </div>

        {/* Vehicle info */}
        <div className="bg-card border border-border rounded-xl p-4">
          <h2 className="text-sm font-semibold mb-2">
            {language === "sw" ? "Gari Langu" : "My Vehicle"}
          </h2>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center">
              <Truck className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="font-semibold text-sm">
                {user?.vehicleType ?? "Truck 5T"}
              </p>
              <p className="text-xs text-muted-foreground">
                {language === "sw" ? "Maeneo:" : "Coverage:"}{" "}
                {user?.serviceArea?.join(", ") ?? "Arusha, Moshi"}
              </p>
            </div>
            <Badge variant="default" className="ml-auto text-[10px]">
              {language === "sw" ? "Inapatikana" : "Available"}
            </Badge>
          </div>
        </div>

        {/* Add service listing */}
        <Button className="w-full" data-ocid="transport.add_button">
          <Plus className="w-4 h-4 mr-2" />
          {language === "sw" ? "Toa Huduma" : "List Service"}
        </Button>

        {/* Transport requests */}
        <section>
          <h2 className="text-sm font-semibold text-foreground mb-2">
            {language === "sw" ? "Maombi ya Usafiri" : "Transport Requests"}
          </h2>
          <div className="space-y-3">
            {TRANSPORT_REQUESTS.map((req, i) => (
              <div
                key={req.id}
                data-ocid={`transport.request.${i + 1}`}
                className="bg-card border border-border rounded-xl p-3"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="font-semibold text-sm">{req.client}</p>
                  <Badge
                    variant={req.status === "confirmed" ? "default" : "outline"}
                    className="text-[10px] shrink-0"
                  >
                    {req.status === "confirmed"
                      ? language === "sw"
                        ? "Imethibitishwa"
                        : "Confirmed"
                      : language === "sw"
                        ? "Inasubiri"
                        : "Pending"}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                  <MapPin className="w-3 h-3" />
                  <span>
                    {req.from} → {req.to}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {req.cargo} · {req.date}
                </p>
                <p className="text-sm font-bold text-primary mt-1">
                  {formatTSh(req.price)}
                </p>
                <div className="flex gap-2 mt-2">
                  {req.status === "pending" && (
                    <Button
                      size="sm"
                      className="text-xs h-7 px-2"
                      data-ocid={`transport.accept_button.${i + 1}`}
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {language === "sw" ? "Kubali" : "Accept"}
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs h-7 px-2 text-primary"
                    data-ocid={`transport.message_button.${i + 1}`}
                  >
                    <MessageCircle className="w-3 h-3 mr-1" />
                    {language === "sw" ? "Wasiliana" : "Contact"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
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
    </Layout>
  );
}
