import { EmergencyContactModal } from "@/components/EmergencyContactModal";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/store/authStore";
import { useLanguageStore } from "@/store/languageStore";
import { useNotificationStore } from "@/store/notificationStore";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart2,
  Bell,
  BookOpen,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  FileText,
  FlaskConical,
  Globe,
  Home,
  Leaf,
  MapPinned as MapIcon,
  Megaphone,
  MessageCircle,
  MessageSquare,
  Package,
  PhoneCall,
  Settings,
  Sprout,
  TrendingUp,
  Truck,
  Users,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  hideNav?: boolean;
}

const FARM_TOOLS_ITEMS = [
  { to: "/records", icon: BookOpen, labelKey: "my_records" as const },
  { to: "/inventory", icon: Package, labelKey: "inventory" as const },
  { to: "/farm-map", icon: MapIcon, labelKey: "farm_map" as const },
  { to: "/analytics", icon: BarChart2, labelKey: "analytics" as const },
];

const BUSINESS_ITEMS = [
  { to: "/contracts", icon: FileText, labelKey: "contracts" as const },
  { to: "/loans", icon: Wallet, labelKey: "my_loans" as const },
  { to: "/groups", icon: Users, labelKey: "my_groups" as const },
  {
    to: "/traceability",
    icon: FlaskConical,
    labelKey: "supply_chain" as const,
  },
];

const COMMUNITY_ITEMS = [
  { to: "/sustainability", icon: Leaf, labelKey: "sustainability" as const },
  { to: "/announcements", icon: Megaphone, labelKey: "announcements" as const },
  {
    to: "/business-intelligence",
    icon: TrendingUp,
    labelKey: "business_intelligence" as const,
  },
  { to: "/forum", icon: MessageSquare, labelKey: "communityForum" as const },
];

const NAV_ITEMS = [
  { to: "/home", icon: Home, labelKey: "home" as const },
  { to: "/messages", icon: MessageCircle, labelKey: "messages" as const },
  { to: "/calendar", icon: CalendarDays, labelKey: "calendar" as const },
  { to: "/notifications", icon: Bell, labelKey: "notifications" as const },
  { to: "/settings", icon: Settings, labelKey: "settings" as const },
];

export function Layout({ children, hideNav = false }: LayoutProps) {
  const { unreadCount } = useNotificationStore();
  const { user } = useAuthStore();
  const { t, language, toggle } = useLanguageStore();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const [farmToolsOpen, setFarmToolsOpen] = useState(false);
  const [businessOpen, setBusinessOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const [emergencyOpen, setEmergencyOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background max-w-md mx-auto relative">
      {/* Top Header */}
      <header className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <span className="text-sm">🌱</span>
          </div>
          <span className="font-display font-semibold text-lg tracking-wide">
            Namwala
          </span>
        </div>
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <button
            type="button"
            onClick={toggle}
            data-ocid="lang.toggle"
            className="text-xs font-bold bg-primary-foreground/20 hover:bg-primary-foreground/30 transition-smooth px-2 py-1 rounded-full"
            aria-label={`Switch to ${language === "en" ? "Swahili" : "English"}`}
          >
            {language === "en" ? "SW" : "EN"}
          </button>
          {/* Notification Bell */}
          <Link
            to="/notifications"
            data-ocid="nav.notifications_bell"
            className="relative"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-4 min-w-4 px-1 text-[10px] bg-destructive text-destructive-foreground border-0 rounded-full flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </Badge>
            )}
          </Link>
        </div>
      </header>

      {/* User role banner */}
      {user && (
        <div className="bg-primary/10 border-b border-primary/20 px-4 py-1.5 flex items-center gap-2">
          <span className="text-xs text-primary font-medium truncate">
            {user.name} · {t(user.role as "farmer")}
          </span>
          <span className="ml-auto text-xs text-muted-foreground">
            {user.location}
          </span>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-36">{children}</main>

      {/* Floating Emergency Button */}
      <button
        type="button"
        onClick={() => setEmergencyOpen(true)}
        data-ocid="emergency.open_modal_button"
        aria-label={language === "sw" ? "Dharura" : "Emergency"}
        className="fixed bottom-40 right-3 z-50 flex flex-col items-center gap-0.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white rounded-2xl px-3 py-2.5 shadow-lg transition-all duration-200"
      >
        <PhoneCall className="w-5 h-5" />
        <span className="text-[10px] font-bold tracking-wide">
          {language === "sw" ? "Dharura" : "Emergency"}
        </span>
      </button>

      {/* Emergency Contact Modal */}
      <EmergencyContactModal
        open={emergencyOpen}
        onClose={() => setEmergencyOpen(false)}
      />

      {/* Bottom Navigation */}
      {!hideNav && (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-card border-t border-border z-40 shadow-lg">
          <div className="flex items-center justify-around py-2">
            {NAV_ITEMS.map(({ to, icon: Icon, labelKey }) => {
              const isActive =
                currentPath === to ||
                (to !== "/home" && currentPath.startsWith(to));
              return (
                <Link
                  key={to}
                  to={to}
                  data-ocid={`nav.${labelKey}`}
                  className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-smooth min-w-0 ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <div className="relative">
                    <Icon
                      className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : "stroke-[1.75]"}`}
                    />
                    {labelKey === "notifications" && unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
                    )}
                    {labelKey === "calendar" &&
                      (() => {
                        try {
                          const stored = localStorage.getItem(
                            `namwala_calendar_${useAuthStore.getState().user?.id ?? "guest"}`,
                          );
                          const events: Array<{ date: string }> = stored
                            ? JSON.parse(stored)
                            : [];
                          const td = new Date().toISOString().split("T")[0];
                          const count = events.filter(
                            (e) => e.date <= td,
                          ).length;
                          return count > 0 ? (
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
                          ) : null;
                        } catch {
                          return null;
                        }
                      })()}
                  </div>
                  <span
                    className={`text-[10px] ${isActive ? "font-semibold" : "font-normal"}`}
                  >
                    {t(labelKey)}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Expandable nav groups — Farm Tools, Business, Community */}
          <div className="border-t border-border/60 px-2 pb-1 pt-1 space-y-0.5">
            {/* Farm Tools */}
            <div>
              <button
                type="button"
                onClick={() => setFarmToolsOpen((o) => !o)}
                data-ocid="nav.farm_tools_toggle"
                className="w-full flex items-center justify-between px-2 py-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-smooth"
              >
                <span className="flex items-center gap-1.5 text-[10px] font-semibold">
                  <Sprout className="w-3.5 h-3.5" />
                  {language === "sw" ? "Zana za Shamba" : "Farm Tools"}
                </span>
                {farmToolsOpen ? (
                  <ChevronDown className="w-3 h-3" />
                ) : (
                  <ChevronRight className="w-3 h-3" />
                )}
              </button>
              {farmToolsOpen && (
                <div className="grid grid-cols-4 gap-0.5 mt-0.5 pb-0.5">
                  {FARM_TOOLS_ITEMS.map(({ to, icon: Icon, labelKey }) => {
                    const isActive = currentPath.startsWith(to);
                    return (
                      <Link
                        key={to}
                        to={to}
                        data-ocid={`nav.${labelKey}`}
                        className={`flex flex-col items-center gap-0.5 py-1.5 rounded-lg transition-smooth ${
                          isActive
                            ? "text-primary bg-primary/5"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-[9px] font-medium leading-tight text-center">
                          {t(labelKey)}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Business */}
            <div>
              <button
                type="button"
                onClick={() => setBusinessOpen((o) => !o)}
                data-ocid="nav.business_toggle"
                className="w-full flex items-center justify-between px-2 py-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-smooth"
              >
                <span className="flex items-center gap-1.5 text-[10px] font-semibold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {language === "sw" ? "Biashara" : "Business"}
                </span>
                {businessOpen ? (
                  <ChevronDown className="w-3 h-3" />
                ) : (
                  <ChevronRight className="w-3 h-3" />
                )}
              </button>
              {businessOpen && (
                <div className="grid grid-cols-4 gap-0.5 mt-0.5 pb-0.5">
                  {BUSINESS_ITEMS.map(({ to, icon: Icon, labelKey }) => {
                    const isActive = currentPath.startsWith(to);
                    return (
                      <Link
                        key={to}
                        to={to}
                        data-ocid={`nav.${labelKey}`}
                        className={`flex flex-col items-center gap-0.5 py-1.5 rounded-lg transition-smooth ${
                          isActive
                            ? "text-primary bg-primary/5"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-[9px] font-medium leading-tight text-center">
                          {t(labelKey)}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Community */}
            <div>
              <button
                type="button"
                onClick={() => setCommunityOpen((o) => !o)}
                data-ocid="nav.community_toggle"
                className="w-full flex items-center justify-between px-2 py-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-smooth"
              >
                <span className="flex items-center gap-1.5 text-[10px] font-semibold">
                  <Globe className="w-3.5 h-3.5" />
                  {language === "sw" ? "Jamii" : "Community"}
                </span>
                {communityOpen ? (
                  <ChevronDown className="w-3 h-3" />
                ) : (
                  <ChevronRight className="w-3 h-3" />
                )}
              </button>
              {communityOpen && (
                <div className="grid grid-cols-4 gap-0.5 mt-0.5 pb-0.5">
                  {COMMUNITY_ITEMS.map(({ to, icon: Icon, labelKey }) => {
                    const isActive = currentPath.startsWith(to);
                    return (
                      <Link
                        key={to}
                        to={to}
                        data-ocid={`nav.${labelKey}`}
                        className={`flex flex-col items-center gap-0.5 py-1.5 rounded-lg transition-smooth ${
                          isActive
                            ? "text-primary bg-primary/5"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-[9px] font-medium leading-tight text-center">
                          {t(labelKey)}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}
