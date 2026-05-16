import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthStore } from "@/store/authStore";
import { useLanguageStore } from "@/store/languageStore";
import type { UserRole } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import { Camera, ChevronLeft, ImageIcon, User } from "lucide-react";
import { useRef, useState } from "react";

const ROLE_ROUTES: Record<string, string> = {
  farmer: "/dashboard/farmer",
  livestock_keeper: "/dashboard/livestock",
  agri_specialist: "/dashboard/agri-specialist",
  veterinarian: "/dashboard/veterinarian",
  input_seller: "/dashboard/input-seller",
  input_service_provider: "/dashboard/input-service",
  weather_soil_specialist: "/dashboard/weather-soil",
  market_advisor: "/dashboard/market-advisor",
  transport_provider: "/dashboard/transport",
  buyer: "/dashboard/buyer",
};

const ROLES: { value: UserRole; en: string; sw: string }[] = [
  { value: "farmer", en: "Farmer", sw: "Mkulima" },
  { value: "livestock_keeper", en: "Livestock Keeper", sw: "Mfugaji" },
  {
    value: "agri_specialist",
    en: "Agricultural Specialist",
    sw: "Mtaalamu wa Kilimo",
  },
  { value: "veterinarian", en: "Veterinarian", sw: "Daktari wa Wanyama" },
  { value: "input_seller", en: "Input Seller", sw: "Muuzaji wa Pembejeo" },
  {
    value: "input_service_provider",
    en: "Service Provider",
    sw: "Mtoa Huduma",
  },
  {
    value: "weather_soil_specialist",
    en: "Weather & Soil Specialist",
    sw: "Mtaalamu wa Hali ya Hewa",
  },
  { value: "market_advisor", en: "Market Advisor", sw: "Mshauri wa Soko" },
  {
    value: "transport_provider",
    en: "Transport Provider",
    sw: "Mtoa Huduma za Usafiri",
  },
  { value: "buyer", en: "Buyer", sw: "Mnunuzi" },
];

export default function SignupPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState<UserRole>("farmer");
  const [farmSize, setFarmSize] = useState("");
  const [otp, setOtp] = useState("");
  const [_otpSent, setOtpSent] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { register, isLoading } = useAuthStore();
  const { t, language, toggle } = useLanguageStore();
  const navigate = useNavigate();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicture(reader.result as string);
      setShowPhotoOptions(false);
    };
    reader.readAsDataURL(file);
  };

  const handleTakePhoto = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement("video");
      video.srcObject = stream;
      await video.play();
      const canvas = document.createElement("canvas");
      canvas.width = 320;
      canvas.height = 320;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, 320, 320);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
        setProfilePicture(dataUrl);
      }
      for (const t of stream.getTracks()) t.stop();
      setShowPhotoOptions(false);
    } catch {
      // Camera not available — fall back to file picker
      fileInputRef.current?.click();
      setShowPhotoOptions(false);
    }
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpSent(true);
    setStep(2);
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    await register({
      name,
      email,
      phone,
      role,
      location,
      language,
      farmSize: farmSize ? Number(farmSize) : undefined,
      password,
      avatarUrl: profilePicture ?? undefined,
    });
    const { user } = useAuthStore.getState();
    if (user) navigate({ to: ROLE_ROUTES[user.role] ?? "/home" });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-4 py-4 flex items-center gap-3">
        {step === 2 ? (
          <button
            type="button"
            onClick={() => setStep(1)}
            className="p-1"
            aria-label="Go back"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        ) : (
          <a href="/login" className="p-1" aria-label="Back to login">
            <ChevronLeft className="w-5 h-5" />
          </a>
        )}
        <div className="flex items-center gap-2">
          <span className="text-xl">🌱</span>
          <span className="font-display font-semibold text-lg">Namwala</span>
        </div>
        <button
          type="button"
          onClick={toggle}
          data-ocid="lang.toggle"
          className="ml-auto text-xs font-bold bg-primary-foreground/20 px-2 py-1 rounded-full"
        >
          {language === "en" ? "SW" : "EN"}
        </button>
      </div>

      <div className="flex-1 px-5 py-6">
        {/* Progress indicator */}
        <div className="flex items-center gap-2 mb-6">
          {[1, 2].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-smooth ${s <= step ? "bg-primary" : "bg-muted"}`}
            />
          ))}
        </div>

        {step === 1 ? (
          <>
            <h2 className="text-xl font-display font-semibold text-foreground mb-1">
              {t("signup")}
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              {language === "sw"
                ? "Unda akaunti yako mpya"
                : "Create your new account"}
            </p>
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">{t("name")}</Label>
                <Input
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={
                    language === "sw" ? "Juma Mwangi" : "John Mwangi"
                  }
                  data-ocid="signup.name_input"
                  className="h-11"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">{t("email")}</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="juma@example.com"
                  data-ocid="signup.email_input"
                  className="h-11"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">{t("phone")}</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+255 7xx xxx xxx"
                  data-ocid="signup.phone_input"
                  className="h-11"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">{t("password")}</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  data-ocid="signup.password_input"
                  className="h-11"
                />
              </div>
              <div className="space-y-1.5">
                <Label>{t("role")}</Label>
                <Select
                  value={role}
                  onValueChange={(v) => setRole(v as UserRole)}
                >
                  <SelectTrigger
                    data-ocid="signup.role_select"
                    className="h-11"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLES.map((r) => (
                      <SelectItem key={r.value} value={r.value}>
                        {language === "sw" ? r.sw : r.en}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="location">{t("location")}</Label>
                <Input
                  id="location"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Mbeya, Arusha, Dodoma..."
                  data-ocid="signup.location_input"
                  className="h-11"
                />
              </div>
              {role === "farmer" && (
                <div className="space-y-1.5">
                  <Label htmlFor="farmSize">
                    {language === "sw"
                      ? "Ukubwa wa Shamba (ekari)"
                      : "Farm Size (acres)"}
                  </Label>
                  <Input
                    id="farmSize"
                    type="number"
                    value={farmSize}
                    onChange={(e) => setFarmSize(e.target.value)}
                    placeholder="5"
                    data-ocid="signup.farmsize_input"
                    className="h-11"
                  />
                </div>
              )}
              <Button
                type="submit"
                className="w-full h-11 text-base"
                data-ocid="signup.send_otp_button"
              >
                {t("sendOtp")}
              </Button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-xl font-display font-semibold text-foreground mb-1">
              {t("verifyOtp")}
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              {language === "sw"
                ? `Nambari ya OTP imetumwa kwa ${phone || email}`
                : `OTP sent to ${phone || email}`}
            </p>
            <form onSubmit={handleVerify} className="space-y-4">
              {/* Profile Picture Upload */}
              <div className="flex flex-col items-center gap-3 py-2">
                <button
                  type="button"
                  data-ocid="signup.profile_picture_button"
                  onClick={() => setShowPhotoOptions((v) => !v)}
                  className="relative w-24 h-24 rounded-full bg-muted border-2 border-dashed border-border hover:border-primary transition-smooth overflow-hidden flex items-center justify-center group"
                  aria-label={t("addPhoto")}
                >
                  {profilePicture ? (
                    <img
                      src={profilePicture}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-10 h-10 text-muted-foreground" />
                  )}
                  <div className="absolute inset-0 bg-foreground/30 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </button>
                <p className="text-xs text-muted-foreground">
                  {profilePicture ? t("changePhoto") : t("addPhoto")}
                </p>

                {/* Photo options popup */}
                {showPhotoOptions && (
                  <div
                    className="w-full bg-card border border-border rounded-xl overflow-hidden shadow-sm"
                    data-ocid="signup.photo_options"
                  >
                    <button
                      type="button"
                      data-ocid="signup.take_photo_button"
                      onClick={handleTakePhoto}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-sm"
                    >
                      <Camera className="w-4 h-4 text-primary" />
                      {t("takePhoto")}
                    </button>
                    <div className="h-px bg-border" />
                    <button
                      type="button"
                      data-ocid="signup.gallery_button"
                      onClick={() => {
                        fileInputRef.current?.click();
                        setShowPhotoOptions(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-sm"
                    >
                      <ImageIcon className="w-4 h-4 text-accent" />
                      {t("chooseFromGallery")}
                    </button>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelect}
                  data-ocid="signup.file_input"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="otp">OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  maxLength={6}
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  data-ocid="signup.otp_input"
                  className="h-11 text-center text-lg tracking-widest"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {language === "sw"
                  ? "Kwa maandamano, weka nambari yoyote 6."
                  : "For demo, enter any 6-digit number."}
              </p>
              <Button
                type="submit"
                className="w-full h-11 text-base"
                disabled={isLoading || otp.length < 6}
                data-ocid="signup.verify_button"
              >
                {isLoading ? t("loading") : t("registerNow")}
              </Button>
            </form>
          </>
        )}

        <p className="text-center text-sm text-muted-foreground mt-4">
          {t("alreadyHaveAccount")}{" "}
          <a
            href="/login"
            className="text-primary font-medium hover:underline"
            data-ocid="signup.login_link"
          >
            {t("login")}
          </a>
        </p>
      </div>
    </div>
  );
}
