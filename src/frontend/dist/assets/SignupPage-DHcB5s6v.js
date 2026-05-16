import { r as reactExports, u as useAuthStore, a as useLanguageStore, b as useNavigate, j as jsxRuntimeExports, C as ChevronLeft, I as Input, B as Button, c as Camera } from "./index-BUVIgngH.js";
import { L as Label } from "./label-BTY_QCm0.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C7D5N9Bz.js";
import { U as User } from "./user-DumBjj6t.js";
import { I as Image } from "./image-C4RCaSjH.js";
import "./index-ob0xpmgs.js";
import "./index-BpD0H2hM.js";
import "./index-BoFiBQpD.js";
import "./Combination-D9wAFE8R.js";
import "./index-D6ql0bBU.js";
import "./index-Oh98DbrD.js";
import "./check-Byk4lD13.js";
import "./chevron-up-CnJPygwE.js";
const ROLE_ROUTES = {
  farmer: "/dashboard/farmer",
  livestock_keeper: "/dashboard/livestock",
  agri_specialist: "/dashboard/agri-specialist",
  veterinarian: "/dashboard/veterinarian",
  input_seller: "/dashboard/input-seller",
  input_service_provider: "/dashboard/input-service",
  weather_soil_specialist: "/dashboard/weather-soil",
  market_advisor: "/dashboard/market-advisor",
  transport_provider: "/dashboard/transport",
  buyer: "/dashboard/buyer"
};
const ROLES = [
  { value: "farmer", en: "Farmer", sw: "Mkulima" },
  { value: "livestock_keeper", en: "Livestock Keeper", sw: "Mfugaji" },
  {
    value: "agri_specialist",
    en: "Agricultural Specialist",
    sw: "Mtaalamu wa Kilimo"
  },
  { value: "veterinarian", en: "Veterinarian", sw: "Daktari wa Wanyama" },
  { value: "input_seller", en: "Input Seller", sw: "Muuzaji wa Pembejeo" },
  {
    value: "input_service_provider",
    en: "Service Provider",
    sw: "Mtoa Huduma"
  },
  {
    value: "weather_soil_specialist",
    en: "Weather & Soil Specialist",
    sw: "Mtaalamu wa Hali ya Hewa"
  },
  { value: "market_advisor", en: "Market Advisor", sw: "Mshauri wa Soko" },
  {
    value: "transport_provider",
    en: "Transport Provider",
    sw: "Mtoa Huduma za Usafiri"
  },
  { value: "buyer", en: "Buyer", sw: "Mnunuzi" }
];
function SignupPage() {
  const [step, setStep] = reactExports.useState(1);
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [location, setLocation] = reactExports.useState("");
  const [role, setRole] = reactExports.useState("farmer");
  const [farmSize, setFarmSize] = reactExports.useState("");
  const [otp, setOtp] = reactExports.useState("");
  const [_otpSent, setOtpSent] = reactExports.useState(false);
  const [profilePicture, setProfilePicture] = reactExports.useState(null);
  const [showPhotoOptions, setShowPhotoOptions] = reactExports.useState(false);
  const fileInputRef = reactExports.useRef(null);
  const { register, isLoading } = useAuthStore();
  const { t, language, toggle } = useLanguageStore();
  const navigate = useNavigate();
  const handleFileSelect = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicture(reader.result);
      setShowPhotoOptions(false);
    };
    reader.readAsDataURL(file);
  };
  const handleTakePhoto = async () => {
    var _a;
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
      for (const t2 of stream.getTracks()) t2.stop();
      setShowPhotoOptions(false);
    } catch {
      (_a = fileInputRef.current) == null ? void 0 : _a.click();
      setShowPhotoOptions(false);
    }
  };
  const handleSendOtp = (e) => {
    e.preventDefault();
    setOtpSent(true);
    setStep(2);
  };
  const handleVerify = async (e) => {
    e.preventDefault();
    await register({
      name,
      email,
      phone,
      role,
      location,
      language,
      farmSize: farmSize ? Number(farmSize) : void 0,
      password,
      avatarUrl: profilePicture ?? void 0
    });
    const { user } = useAuthStore.getState();
    if (user) navigate({ to: ROLE_ROUTES[user.role] ?? "/home" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex flex-col max-w-md mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary text-primary-foreground px-4 py-4 flex items-center gap-3", children: [
      step === 2 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setStep(1),
          className: "p-1",
          "aria-label": "Go back",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-5 h-5" })
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/login", className: "p-1", "aria-label": "Back to login", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-5 h-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "🌱" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-lg", children: "Namwala" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: toggle,
          "data-ocid": "lang.toggle",
          className: "ml-auto text-xs font-bold bg-primary-foreground/20 px-2 py-1 rounded-full",
          children: language === "en" ? "SW" : "EN"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 px-5 py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-6", children: [1, 2].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `h-1.5 flex-1 rounded-full transition-smooth ${s <= step ? "bg-primary" : "bg-muted"}`
        },
        s
      )) }),
      step === 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-semibold text-foreground mb-1", children: t("signup") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: language === "sw" ? "Unda akaunti yako mpya" : "Create your new account" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSendOtp, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", children: t("name") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "name",
                required: true,
                value: name,
                onChange: (e) => setName(e.target.value),
                placeholder: language === "sw" ? "Juma Mwangi" : "John Mwangi",
                "data-ocid": "signup.name_input",
                className: "h-11"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: t("email") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "email",
                type: "email",
                required: true,
                value: email,
                onChange: (e) => setEmail(e.target.value),
                placeholder: "juma@example.com",
                "data-ocid": "signup.email_input",
                className: "h-11"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "phone", children: t("phone") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "phone",
                type: "tel",
                value: phone,
                onChange: (e) => setPhone(e.target.value),
                placeholder: "+255 7xx xxx xxx",
                "data-ocid": "signup.phone_input",
                className: "h-11"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", children: t("password") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "password",
                type: "password",
                required: true,
                value: password,
                onChange: (e) => setPassword(e.target.value),
                placeholder: "••••••••",
                "data-ocid": "signup.password_input",
                className: "h-11"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("role") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: role,
                onValueChange: (v) => setRole(v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      "data-ocid": "signup.role_select",
                      className: "h-11",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ROLES.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r.value, children: language === "sw" ? r.sw : r.en }, r.value)) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "location", children: t("location") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "location",
                required: true,
                value: location,
                onChange: (e) => setLocation(e.target.value),
                placeholder: "Mbeya, Arusha, Dodoma...",
                "data-ocid": "signup.location_input",
                className: "h-11"
              }
            )
          ] }),
          role === "farmer" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "farmSize", children: language === "sw" ? "Ukubwa wa Shamba (ekari)" : "Farm Size (acres)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "farmSize",
                type: "number",
                value: farmSize,
                onChange: (e) => setFarmSize(e.target.value),
                placeholder: "5",
                "data-ocid": "signup.farmsize_input",
                className: "h-11"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              className: "w-full h-11 text-base",
              "data-ocid": "signup.send_otp_button",
              children: t("sendOtp")
            }
          )
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-semibold text-foreground mb-1", children: t("verifyOtp") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: language === "sw" ? `Nambari ya OTP imetumwa kwa ${phone || email}` : `OTP sent to ${phone || email}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleVerify, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": "signup.profile_picture_button",
                onClick: () => setShowPhotoOptions((v) => !v),
                className: "relative w-24 h-24 rounded-full bg-muted border-2 border-dashed border-border hover:border-primary transition-smooth overflow-hidden flex items-center justify-center group",
                "aria-label": t("addPhoto"),
                children: [
                  profilePicture ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: profilePicture,
                      alt: "Profile",
                      className: "w-full h-full object-cover"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-10 h-10 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-foreground/30 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-6 h-6 text-white" }) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: profilePicture ? t("changePhoto") : t("addPhoto") }),
            showPhotoOptions && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "w-full bg-card border border-border rounded-xl overflow-hidden shadow-sm",
                "data-ocid": "signup.photo_options",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      "data-ocid": "signup.take_photo_button",
                      onClick: handleTakePhoto,
                      className: "w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-sm",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-4 h-4 text-primary" }),
                        t("takePhoto")
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-border" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      "data-ocid": "signup.gallery_button",
                      onClick: () => {
                        var _a;
                        (_a = fileInputRef.current) == null ? void 0 : _a.click();
                        setShowPhotoOptions(false);
                      },
                      className: "w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-sm",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-4 h-4 text-accent" }),
                        t("chooseFromGallery")
                      ]
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: fileInputRef,
                type: "file",
                accept: "image/*",
                className: "hidden",
                onChange: handleFileSelect,
                "data-ocid": "signup.file_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "otp", children: "OTP" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "otp",
                type: "text",
                maxLength: 6,
                required: true,
                value: otp,
                onChange: (e) => setOtp(e.target.value),
                placeholder: "123456",
                "data-ocid": "signup.otp_input",
                className: "h-11 text-center text-lg tracking-widest"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: language === "sw" ? "Kwa maandamano, weka nambari yoyote 6." : "For demo, enter any 6-digit number." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              className: "w-full h-11 text-base",
              disabled: isLoading || otp.length < 6,
              "data-ocid": "signup.verify_button",
              children: isLoading ? t("loading") : t("registerNow")
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground mt-4", children: [
        t("alreadyHaveAccount"),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "/login",
            className: "text-primary font-medium hover:underline",
            "data-ocid": "signup.login_link",
            children: t("login")
          }
        )
      ] })
    ] })
  ] });
}
export {
  SignupPage as default
};
