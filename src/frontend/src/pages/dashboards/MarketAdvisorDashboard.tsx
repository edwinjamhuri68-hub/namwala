import { Layout } from "@/components/Layout";
import { MarketPriceCard } from "@/components/ui/MarketPriceCard";
import { StatCard } from "@/components/ui/StatCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MARKET_PRICES } from "@/lib/mockData";
import { useAuthStore } from "@/store/authStore";
import { useLanguageStore } from "@/store/languageStore";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  MessageCircle,
  TrendingUp,
} from "lucide-react";

const INSIGHTS = [
  {
    commodity: "Maize",
    insight_en:
      "Prices rising due to dry season demand. Sell within 2 weeks for best returns.",
    insight_sw:
      "Bei zinapanda kwa sababu ya ukame. Uza ndani ya wiki 2 kwa mapato mazuri.",
    action: "sell",
    confidence: 85,
  },
  {
    commodity: "Coffee",
    insight_en:
      "Export demand high from Moshi. Current price TSh 4,500/kg — optimal sell window.",
    insight_sw:
      "Mahitaji ya nje ni makubwa kutoka Moshi. Bei TSh 4,500/kg — wakati mzuri wa kuuza.",
    action: "sell",
    confidence: 92,
  },
  {
    commodity: "Rice",
    insight_en:
      "Oversupply in Mwanza market. Hold stock for 3 weeks before selling.",
    insight_sw: "Ziada ya bidhaa Mwanza. Subiri wiki 3 kabla ya kuuza.",
    action: "hold",
    confidence: 78,
  },
];

export default function MarketAdvisorDashboard() {
  const { user } = useAuthStore();
  const { language } = useLanguageStore();

  return (
    <Layout>
      <div className="px-4 py-4 space-y-4">
        {/* Hero */}
        <div className="relative rounded-xl overflow-hidden">
          <img
            src="/assets/generated/market-advisor.dim_800x400.jpg"
            alt="Market"
            className="w-full h-32 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent flex items-end p-3">
            <div>
              <h1 className="text-lg font-display font-bold text-white">
                {language === "sw" ? "Mshauri wa Soko" : "Market Advisor"}
              </h1>
              <p className="text-xs text-white/80">
                {user?.name} · {user?.specialization}
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <StatCard
            title={
              language === "sw" ? "Soko Zinazofuatiliwa" : "Markets Tracked"
            }
            value="12"
            icon={<BarChart3 className="w-4 h-4" />}
            colorClass="bg-purple-50 text-purple-600"
          />
          <StatCard
            title={language === "sw" ? "Ushauri Leo" : "Advisories"}
            value="5"
            icon={<TrendingUp className="w-4 h-4" />}
            colorClass="bg-green-50 text-green-600"
          />
          <StatCard
            title={language === "sw" ? "Watumiaji" : "Users Helped"}
            value="38"
            icon={<Bell className="w-4 h-4" />}
            colorClass="bg-primary/10 text-primary"
          />
        </div>

        {/* Market insights */}
        <section>
          <h2 className="text-sm font-semibold text-foreground mb-2">
            {language === "sw" ? "Ushauri wa Soko" : "Market Insights"}
          </h2>
          <div className="space-y-3">
            {INSIGHTS.map((insight, i) => (
              <div
                key={insight.commodity}
                data-ocid={`market.insight.${i + 1}`}
                className="bg-card border border-border rounded-xl p-4"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="font-semibold text-sm">{insight.commodity}</p>
                  <div className="flex items-center gap-1">
                    <Badge
                      variant={
                        insight.action === "sell" ? "default" : "secondary"
                      }
                      className="text-[10px]"
                    >
                      {insight.action === "sell"
                        ? language === "sw"
                          ? "↑ Uza Sasa"
                          : "↑ Sell Now"
                        : language === "sw"
                          ? "→ Subiri"
                          : "→ Hold"}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground">
                      {insight.confidence}% conf.
                    </span>
                  </div>
                </div>
                <p className="text-xs text-foreground leading-relaxed">
                  {language === "sw" ? insight.insight_sw : insight.insight_en}
                </p>
                <div className="flex gap-2 mt-3">
                  <Button
                    size="sm"
                    className="flex-1 text-xs"
                    data-ocid={`market.publish_button.${i + 1}`}
                  >
                    {language === "sw"
                      ? "Chapisha Ushauri"
                      : "Publish Advisory"}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs h-8 px-2"
                    data-ocid={`market.share_button.${i + 1}`}
                  >
                    <MessageCircle className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Price board */}
        <section>
          <h2 className="text-sm font-semibold text-foreground mb-2">
            {language === "sw" ? "Bei za Soko" : "Current Market Prices"}
          </h2>
          <div className="space-y-2">
            {MARKET_PRICES.map((p) => (
              <MarketPriceCard key={p.commodity} price={p} lang={language} />
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
