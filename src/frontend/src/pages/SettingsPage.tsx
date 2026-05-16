import { Layout } from "@/components/Layout";
import { RoleAvatar } from "@/components/ui/RoleAvatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useAuthStore } from "@/store/authStore";
import { useLanguageStore } from "@/store/languageStore";
import { useNavigate } from "@tanstack/react-router";
import {
  Bell,
  ChevronRight,
  Globe,
  HelpCircle,
  Leaf,
  Lock,
  LogOut,
  User,
} from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const { user, logout, updateProfile } = useAuthStore();
  const { t, language, toggle } = useLanguageStore();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name ?? "");
  const [loc, setLoc] = useState(user?.location ?? "");
  const [notifOn, setNotifOn] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [diseaseAlerts, setDiseaseAlerts] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(
    typeof window !== "undefined" &&
      localStorage.getItem("biometricEnabled") === "true",
  );

  const handleSave = () => {
    updateProfile({ name, location: loc });
    setEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  if (!user) return null;

  return (
    <Layout>
      <div className="pb-6">
        {/* Profile card */}
        <div className="bg-primary px-4 pt-5 pb-6">
          <div className="flex items-center gap-3">
            <RoleAvatar name={user.name} role={user.role} size="lg" />
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-display font-bold text-primary-foreground truncate">
                {user.name}
              </h2>
              <p className="text-xs text-primary-foreground/80">{user.email}</p>
              <p className="text-xs text-primary-foreground/70 mt-0.5">
                {t(user.role as "farmer")} · {user.location}
              </p>
            </div>
          </div>
        </div>

        {/* Edit profile */}
        <div className="bg-card mx-4 -mt-4 rounded-xl border border-border p-4 shadow-xs">
          {editing ? (
            <div className="space-y-3">
              <div className="space-y-1">
                <Label className="text-xs">{t("name")}</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  data-ocid="settings.name_input"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">{t("location")}</Label>
                <Input
                  value={loc}
                  onChange={(e) => setLoc(e.target.value)}
                  data-ocid="settings.location_input"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleSave}
                  data-ocid="settings.save_button"
                  className="flex-1"
                >
                  {t("save")}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setEditing(false)}
                  data-ocid="settings.cancel_button"
                  className="flex-1"
                >
                  {t("cancel")}
                </Button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              className="w-full flex items-center justify-between"
              onClick={() => setEditing(true)}
              data-ocid="settings.edit_profile_button"
            >
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">{t("editProfile")}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>

        <div className="mt-4 space-y-2 px-4">
          {/* Notification settings */}
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center gap-2 mb-3">
              <Bell className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold">
                {t("notificationPreferences")}
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm">
                  {language === "sw" ? "Arifa zote" : "All notifications"}
                </Label>
                <Switch
                  checked={notifOn}
                  onCheckedChange={setNotifOn}
                  data-ocid="settings.notifications_switch"
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <Label className="text-sm">
                  {language === "sw"
                    ? "Tahadhari za Ugonjwa"
                    : "Disease Alerts"}
                </Label>
                <Switch
                  checked={diseaseAlerts}
                  onCheckedChange={setDiseaseAlerts}
                  data-ocid="settings.disease_alerts_switch"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm">
                  {language === "sw" ? "Mabadiliko ya Bei" : "Price Updates"}
                </Label>
                <Switch
                  checked={priceAlerts}
                  onCheckedChange={setPriceAlerts}
                  data-ocid="settings.price_alerts_switch"
                />
              </div>
            </div>
          </div>

          {/* Language */}
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">{t("language")}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={toggle}
                data-ocid="settings.language_toggle"
              >
                {language === "en" ? "English" : "Kiswahili"}
              </Button>
            </div>
          </div>

          {/* Role info */}
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold">
                {language === "sw" ? "Taarifa za Kazi" : "Role Information"}
              </h3>
            </div>
            <p className="text-xs text-muted-foreground">
              {t(user.role as "farmer")}
            </p>
            {user.farmSize && (
              <p className="text-xs text-muted-foreground mt-1">
                {language === "sw" ? "Ukubwa:" : "Farm size:"} {user.farmSize}{" "}
                acres
              </p>
            )}
            {user.animalTypes && (
              <p className="text-xs text-muted-foreground mt-1">
                {language === "sw" ? "Mifugo:" : "Animals:"}{" "}
                {user.animalTypes.join(", ")}
              </p>
            )}
          </div>

          {/* Biometric Login */}
          {(() => {
            const biometricSupported =
              typeof window !== "undefined" && "PublicKeyCredential" in window;
            const handleEnrollBiometric = async () => {
              try {
                const cred = await navigator.credentials.create({
                  publicKey: {
                    challenge: new Uint8Array(32),
                    rp: { name: "Namwala" },
                    user: {
                      id: new Uint8Array(16),
                      name: "user",
                      displayName: "User",
                    },
                    pubKeyCredParams: [
                      { type: "public-key" as const, alg: -7 },
                    ],
                    timeout: 60000,
                  },
                });
                if (cred) {
                  localStorage.setItem("biometricEnabled", "true");
                  setBiometricEnabled(true);
                }
              } catch (e) {
                console.error(e);
              }
            };
            const handleDisableBiometric = () => {
              localStorage.removeItem("biometricEnabled");
              setBiometricEnabled(false);
            };
            return (
              <div className="bg-card rounded-xl border border-border p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {language === "sw"
                      ? "Kuingia kwa Alama za Mwili"
                      : "Biometric Login"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {language === "sw"
                    ? "Tumia alama za vidole au uso wako kuingia haraka na kwa usalama."
                    : "Use fingerprint or face recognition for quick and secure sign-in."}
                </p>
                {biometricSupported ? (
                  biometricEnabled ? (
                    <button
                      type="button"
                      data-ocid="settings.biometric_disable_button"
                      onClick={handleDisableBiometric}
                      className="text-sm text-destructive font-medium"
                    >
                      {language === "sw"
                        ? "Zima Utambuzi"
                        : "Disable Biometric"}
                    </button>
                  ) : (
                    <button
                      type="button"
                      data-ocid="settings.biometric_enable_button"
                      onClick={handleEnrollBiometric}
                      className="text-sm text-primary font-medium"
                    >
                      {language === "sw"
                        ? "Washa Utambuzi"
                        : "Enable Biometric"}
                    </button>
                  )
                ) : (
                  <p className="text-xs text-muted-foreground">
                    {language === "sw"
                      ? "Kifaa chako hakitumii utambuzi wa biometriki."
                      : "Your device does not support biometric authentication."}
                  </p>
                )}
              </div>
            );
          })()}

          {/* Security */}
          <button
            type="button"
            data-ocid="settings.change_password_button"
            className="w-full bg-card rounded-xl border border-border p-4 flex items-center justify-between hover:bg-muted/20 transition-smooth"
          >
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">{t("changePassword")}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>

          {/* Help */}
          <button
            type="button"
            data-ocid="settings.help_button"
            className="w-full bg-card rounded-xl border border-border p-4 flex items-center justify-between hover:bg-muted/20 transition-smooth"
          >
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">{t("helpSupport")}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            data-ocid="settings.logout_button"
            className="w-full bg-card rounded-xl border border-border p-4 flex items-center gap-2 hover:bg-destructive/5 transition-smooth text-destructive"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">{t("logout")}</span>
          </button>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            className="hover:text-primary"
            target="_blank"
            rel="noreferrer"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </Layout>
  );
}
