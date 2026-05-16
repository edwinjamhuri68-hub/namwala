import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/store/languageStore";
import type { AnalyticsPeriod } from "@/types";
import { BarChart3, RefreshCw, TrendingDown, TrendingUp } from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const PERIODS: { key: AnalyticsPeriod; labelKey: string }[] = [
  { key: "monthly", labelKey: "period_monthly" },
  { key: "quarterly", labelKey: "period_quarterly" },
  { key: "yearly", labelKey: "period_yearly" },
];

const MONTHLY_DATA = [
  {
    month: "Jan",
    maize: 240,
    beans: 110,
    sunflower: 80,
    revenue: 780000,
    expenses: 210000,
  },
  {
    month: "Feb",
    maize: 280,
    beans: 130,
    sunflower: 95,
    revenue: 920000,
    expenses: 240000,
  },
  {
    month: "Mar",
    maize: 320,
    beans: 150,
    sunflower: 115,
    revenue: 1050000,
    expenses: 260000,
  },
  {
    month: "Apr",
    maize: 370,
    beans: 175,
    sunflower: 130,
    revenue: 1180000,
    expenses: 290000,
  },
  {
    month: "May",
    maize: 430,
    beans: 200,
    sunflower: 150,
    revenue: 1360000,
    expenses: 310000,
  },
  {
    month: "Jun",
    maize: 480,
    beans: 220,
    sunflower: 170,
    revenue: 1520000,
    expenses: 320000,
  },
];

const QUARTERLY_DATA = [
  {
    month: "Q1",
    maize: 840,
    beans: 390,
    sunflower: 290,
    revenue: 2750000,
    expenses: 710000,
  },
  {
    month: "Q2",
    maize: 1280,
    beans: 595,
    sunflower: 450,
    revenue: 4060000,
    expenses: 920000,
  },
];

const YEARLY_DATA = [
  {
    month: "2023",
    maize: 1600,
    beans: 680,
    sunflower: 520,
    revenue: 4800000,
    expenses: 1350000,
  },
  {
    month: "2024",
    maize: 2200,
    beans: 900,
    sunflower: 720,
    revenue: 6900000,
    expenses: 1750000,
  },
  {
    month: "2025",
    maize: 2900,
    beans: 1200,
    sunflower: 950,
    revenue: 9100000,
    expenses: 2100000,
  },
];

const CROP_PROFITABILITY = [
  { name: "Maize / Mahindi", revenue: 4200000 },
  { name: "Beans / Maharagwe", revenue: 2800000 },
  { name: "Sunflower / Alizeti", revenue: 1900000 },
  { name: "Cassava / Muhogo", revenue: 950000 },
];

const ANIMAL_PROFITABILITY = [
  { name: "Cattle / Ng'ombe", revenue: 3600000 },
  { name: "Goats / Mbuzi", revenue: 1400000 },
  { name: "Poultry / Kuku", revenue: 780000 },
];

const SNAPSHOT = {
  monthly: {
    totalCropsHarvested: 1645,
    totalLivestockSold: 14,
    totalSalesRevenue: 8810000,
    totalExpenses: 1630000,
    netProfit: 7180000,
    revenueTrend: "up" as const,
    profitTrend: "up" as const,
  },
  quarterly: {
    totalCropsHarvested: 3805,
    totalLivestockSold: 32,
    totalSalesRevenue: 16200000,
    totalExpenses: 3900000,
    netProfit: 12300000,
    revenueTrend: "up" as const,
    profitTrend: "up" as const,
  },
  yearly: {
    totalCropsHarvested: 9300,
    totalLivestockSold: 96,
    totalSalesRevenue: 48000000,
    totalExpenses: 10400000,
    netProfit: 37600000,
    revenueTrend: "up" as const,
    profitTrend: "up" as const,
  },
};

function formatTSh(val: number): string {
  if (val >= 1_000_000) return `TSh ${(val / 1_000_000).toFixed(1)}M`;
  if (val >= 1_000) return `TSh ${(val / 1_000).toFixed(0)}K`;
  return `TSh ${val}`;
}

function TrendIcon({ direction }: { direction: "up" | "down" | "stable" }) {
  if (direction === "up")
    return <TrendingUp size={14} className="text-emerald-500" />;
  if (direction === "down")
    return <TrendingDown size={14} className="text-rose-500" />;
  return <span className="text-muted-foreground text-xs">—</span>;
}

export default function AnalyticsPage() {
  const { t, language } = useLanguageStore();
  const [period, setPeriod] = useState<AnalyticsPeriod>("monthly");
  const [refreshing, setRefreshing] = useState(false);

  const snap = SNAPSHOT[period];
  const chartData =
    period === "monthly"
      ? MONTHLY_DATA
      : period === "quarterly"
        ? QUARTERLY_DATA
        : YEARLY_DATA;

  const xLabel = language === "sw" ? "Mwezi" : "Month";
  const harvestLabel = language === "sw" ? "Mavuno (kg)" : "Harvest (kg)";
  const revenueLabel = language === "sw" ? "Mapato (TSh)" : "Revenue (TSh)";
  const expenseLabel = language === "sw" ? "Gharama (TSh)" : "Expenses (TSh)";

  function handleRefresh() {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  }

  return (
    <Layout>
      <div
        className="min-h-screen bg-background pb-8"
        data-ocid="analytics.page"
      >
        {/* Header */}
        <div className="bg-card border-b px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            <div className="flex items-center gap-2">
              <BarChart3 className="text-primary" size={22} />
              <h1 className="text-lg font-bold text-foreground">
                {t("analytics")}
              </h1>
            </div>
            <Button
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
              data-ocid="analytics.generate_button"
            >
              <RefreshCw
                size={14}
                className={`mr-1.5 ${refreshing ? "animate-spin" : ""}`}
              />
              {t("generate_report")}
            </Button>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-5 space-y-6">
          {/* Period selector */}
          <div className="flex gap-2" data-ocid="analytics.period.tab">
            {PERIODS.map((p) => (
              <button
                key={p.key}
                type="button"
                onClick={() => setPeriod(p.key)}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  period === p.key
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                }`}
                data-ocid={`analytics.period.${p.key}`}
              >
                {t(p.labelKey as Parameters<typeof t>[0])}
              </button>
            ))}
          </div>

          {/* KPI Summary Cards */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              {
                label:
                  language === "sw"
                    ? "Jumla ya Mazao (kg)"
                    : "Total Harvest (kg)",
                value: snap.totalCropsHarvested.toLocaleString(),
                sub: language === "sw" ? "kg zilizovunwa" : "kg harvested",
                trend: snap.revenueTrend,
                color: "text-emerald-600",
                bg: "bg-emerald-50 dark:bg-emerald-950/30",
                ocid: "analytics.stat.harvest",
              },
              {
                label:
                  language === "sw" ? "Mifugo Iliyouzwa" : "Livestock Sold",
                value: snap.totalLivestockSold.toString(),
                sub: language === "sw" ? "wanyama" : "animals",
                trend: snap.revenueTrend,
                color: "text-amber-600",
                bg: "bg-amber-50 dark:bg-amber-950/30",
                ocid: "analytics.stat.livestock",
              },
              {
                label: t("total_sales"),
                value: formatTSh(snap.totalSalesRevenue),
                sub: language === "sw" ? "mapato yote" : "total revenue",
                trend: snap.revenueTrend,
                color: "text-primary",
                bg: "bg-primary/10",
                ocid: "analytics.stat.revenue",
              },
              {
                label: t("net_profit"),
                value: formatTSh(snap.netProfit),
                sub:
                  language === "sw"
                    ? "faida baada ya gharama"
                    : "after expenses",
                trend: snap.profitTrend,
                color: "text-emerald-600",
                bg: "bg-emerald-50 dark:bg-emerald-950/30",
                ocid: "analytics.stat.profit",
              },
            ].map(({ label, value, sub, trend, color, bg, ocid }) => (
              <div
                key={label}
                className={`${bg} rounded-xl border p-3 flex flex-col gap-1`}
                data-ocid={ocid}
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground leading-tight">
                    {label}
                  </p>
                  <TrendIcon direction={trend} />
                </div>
                <p className={`text-xl font-bold ${color}`}>{value}</p>
                <p className="text-xs text-muted-foreground">{sub}</p>
              </div>
            ))}
          </div>

          {/* Crop Production Trends – Line Chart */}
          <div
            className="bg-card rounded-xl border p-4"
            data-ocid="analytics.crop_trends.section"
          >
            <p className="text-sm font-semibold text-foreground mb-4">
              {t("crop_trends")}
            </p>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart
                data={chartData}
                margin={{ top: 4, right: 8, left: 0, bottom: 4 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                  label={{
                    value: xLabel,
                    position: "insideBottom",
                    offset: -2,
                    fontSize: 10,
                    fill: "var(--muted-foreground)",
                  }}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                  label={{
                    value: harvestLabel,
                    angle: -90,
                    position: "insideLeft",
                    offset: 10,
                    fontSize: 10,
                    fill: "var(--muted-foreground)",
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  formatter={(value: number, name: string) => [
                    `${value} kg`,
                    name,
                  ]}
                />
                <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
                <Line
                  type="monotone"
                  dataKey="maize"
                  stroke="#22c55e"
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                  name={language === "sw" ? "Mahindi" : "Maize"}
                />
                <Line
                  type="monotone"
                  dataKey="beans"
                  stroke="#f59e0b"
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                  name={language === "sw" ? "Maharagwe" : "Beans"}
                />
                <Line
                  type="monotone"
                  dataKey="sunflower"
                  stroke="#8b5cf6"
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                  name={language === "sw" ? "Alizeti" : "Sunflower"}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Financial Summary – Bar Chart */}
          <div
            className="bg-card rounded-xl border p-4"
            data-ocid="analytics.financial.section"
          >
            <p className="text-sm font-semibold text-foreground mb-4">
              {t("financial_summary")}
            </p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={chartData}
                margin={{ top: 4, right: 8, left: 0, bottom: 4 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                />
                <YAxis
                  tickFormatter={(v: number) =>
                    v >= 1_000_000
                      ? `${(v / 1_000_000).toFixed(0)}M`
                      : v >= 1000
                        ? `${(v / 1000).toFixed(0)}K`
                        : String(v)
                  }
                  tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                  label={{
                    value: "TSh",
                    angle: -90,
                    position: "insideLeft",
                    offset: 12,
                    fontSize: 10,
                    fill: "var(--muted-foreground)",
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  formatter={(value: number, name: string) => [
                    formatTSh(value),
                    name,
                  ]}
                />
                <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
                <Bar
                  dataKey="revenue"
                  name={revenueLabel}
                  fill="var(--primary)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="expenses"
                  name={expenseLabel}
                  fill="#f97316"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Two horizontal bars side by side */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Top Crops Profitability */}
            <div
              className="bg-card rounded-xl border p-4"
              data-ocid="analytics.top_crops.section"
            >
              <p className="text-sm font-semibold text-foreground mb-4">
                {t("top_crops")}
              </p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart
                  layout="vertical"
                  data={CROP_PROFITABILITY}
                  margin={{ top: 0, right: 44, left: 0, bottom: 0 }}
                >
                  <XAxis
                    type="number"
                    tickFormatter={(v: number) =>
                      v >= 1_000_000
                        ? `${(v / 1_000_000).toFixed(0)}M`
                        : `${(v / 1000).toFixed(0)}K`
                    }
                    tick={{ fontSize: 9, fill: "var(--muted-foreground)" }}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={90}
                    tick={{ fontSize: 9, fill: "var(--muted-foreground)" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      fontSize: 11,
                    }}
                    formatter={(v: number) => [
                      formatTSh(v),
                      language === "sw" ? "Mapato" : "Revenue",
                    ]}
                  />
                  <Bar dataKey="revenue" radius={[0, 4, 4, 0]}>
                    {CROP_PROFITABILITY.map((item) => (
                      <Cell
                        key={item.name}
                        fill={
                          ["#22c55e", "#16a34a", "#4ade80", "#86efac"][
                            CROP_PROFITABILITY.findIndex((x) => x === item) % 4
                          ]
                        }
                      />
                    ))}
                    <LabelList
                      dataKey="revenue"
                      position="right"
                      formatter={(v: number) => formatTSh(v)}
                      style={{ fontSize: 9, fill: "var(--muted-foreground)" }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Top Animals Profitability */}
            <div
              className="bg-card rounded-xl border p-4"
              data-ocid="analytics.top_animals.section"
            >
              <p className="text-sm font-semibold text-foreground mb-4">
                {t("top_animals")}
              </p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart
                  layout="vertical"
                  data={ANIMAL_PROFITABILITY}
                  margin={{ top: 0, right: 44, left: 0, bottom: 0 }}
                >
                  <XAxis
                    type="number"
                    tickFormatter={(v: number) =>
                      v >= 1_000_000
                        ? `${(v / 1_000_000).toFixed(0)}M`
                        : `${(v / 1000).toFixed(0)}K`
                    }
                    tick={{ fontSize: 9, fill: "var(--muted-foreground)" }}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={90}
                    tick={{ fontSize: 9, fill: "var(--muted-foreground)" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      fontSize: 11,
                    }}
                    formatter={(v: number) => [
                      formatTSh(v),
                      language === "sw" ? "Mapato" : "Revenue",
                    ]}
                  />
                  <Bar dataKey="revenue" radius={[0, 4, 4, 0]}>
                    {ANIMAL_PROFITABILITY.map((item) => (
                      <Cell
                        key={item.name}
                        fill={
                          ["#f59e0b", "#d97706", "#fbbf24"][
                            ANIMAL_PROFITABILITY.findIndex((x) => x === item) %
                              3
                          ]
                        }
                      />
                    ))}
                    <LabelList
                      dataKey="revenue"
                      position="right"
                      formatter={(v: number) => formatTSh(v)}
                      style={{ fontSize: 9, fill: "var(--muted-foreground)" }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Expense breakdown */}
          <div
            className="bg-card rounded-xl border p-4"
            data-ocid="analytics.expense.section"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-foreground">
                {t("total_expenses")}
              </p>
              <span className="text-sm font-bold text-rose-500">
                {formatTSh(snap.totalExpenses)}
              </span>
            </div>
            <div className="space-y-2">
              {[
                {
                  label: language === "sw" ? "Mbolea" : "Fertilizer",
                  pct: 35,
                  color: "#f97316",
                },
                {
                  label: language === "sw" ? "Mbegu" : "Seeds",
                  pct: 25,
                  color: "#22c55e",
                },
                {
                  label: language === "sw" ? "Dawa ya Wadudu" : "Pesticides",
                  pct: 20,
                  color: "#8b5cf6",
                },
                {
                  label: language === "sw" ? "Usafiri" : "Transport",
                  pct: 12,
                  color: "#38bdf8",
                },
                {
                  label: language === "sw" ? "Mengine" : "Other",
                  pct: 8,
                  color: "#94a3b8",
                },
              ].map(({ label, pct, color }, i) => (
                <div
                  key={label}
                  className="flex items-center gap-3"
                  data-ocid={`analytics.expense.${i + 1}`}
                >
                  <span className="text-xs text-muted-foreground w-24 shrink-0">
                    {label}
                  </span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${pct}%`, backgroundColor: color }}
                    />
                  </div>
                  <span className="text-xs font-medium text-foreground w-8 text-right">
                    {pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
