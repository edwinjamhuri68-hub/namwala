import { k as createLucideIcon, j as jsxRuntimeExports, r as reactExports, $ as useComposedRefs, a0 as cn, u as useAuthStore, a as useLanguageStore, b as useNavigate, L as Layout, I as Input, B as Button, ac as ChevronRight, G as Bell, ad as Globe, s as Leaf } from "./index-BUVIgngH.js";
import { L as Label } from "./label-BTY_QCm0.js";
import { S as Separator } from "./separator-CtEo6eCY.js";
import { u as useControllableState, P as Primitive, c as composeEventHandlers, b as createContextScope } from "./index-BpD0H2hM.js";
import { u as usePrevious, a as useSize } from "./index-Oh98DbrD.js";
import { U as User } from "./user-DumBjj6t.js";
import { L as Lock } from "./lock-Vof0dJDf.js";
import "./index-ob0xpmgs.js";
import "./index-BoFiBQpD.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const CircleHelp = createLucideIcon("circle-help", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode);
const ROLE_COLORS = {
  farmer: "bg-green-100 text-green-700",
  livestock_keeper: "bg-amber-100 text-amber-700",
  agri_specialist: "bg-blue-100 text-blue-700",
  veterinarian: "bg-red-100 text-red-700",
  input_seller: "bg-orange-100 text-orange-700",
  input_service_provider: "bg-teal-100 text-teal-700",
  weather_soil_specialist: "bg-sky-100 text-sky-700",
  market_advisor: "bg-purple-100 text-purple-700",
  transport_provider: "bg-indigo-100 text-indigo-700",
  buyer: "bg-pink-100 text-pink-700"
};
const ROLE_ICONS = {
  farmer: "🌾",
  livestock_keeper: "🐄",
  agri_specialist: "🔬",
  veterinarian: "💉",
  input_seller: "🛒",
  input_service_provider: "🚜",
  weather_soil_specialist: "🌦️",
  market_advisor: "📊",
  transport_provider: "🚛",
  buyer: "🏪"
};
const SIZES = {
  sm: "w-8 h-8 text-sm",
  md: "w-12 h-12 text-lg",
  lg: "w-16 h-16 text-2xl"
};
const BADGE_SIZES = {
  sm: "w-4 h-4 text-[8px]",
  md: "w-5 h-5 text-[9px]",
  lg: "w-7 h-7 text-sm"
};
function RoleAvatar({
  name,
  role,
  size = "md",
  imageUrl
}) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const colors = ROLE_COLORS[role];
  const icon = ROLE_ICONS[role];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "role.avatar", className: "relative inline-flex", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `${SIZES[size]} rounded-full flex items-center justify-center font-semibold ${colors} overflow-hidden`,
        children: imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: imageUrl,
            alt: name,
            className: "w-full h-full object-cover"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: initials })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `${BADGE_SIZES[size]} absolute -bottom-0.5 -right-0.5 bg-card border border-border rounded-full flex items-center justify-center`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: icon })
      }
    )
  ] });
}
var SWITCH_NAME = "Switch";
var [createSwitchContext] = createContextScope(SWITCH_NAME);
var [SwitchProvider, useSwitchContext] = createSwitchContext(SWITCH_NAME);
var Switch$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSwitch,
      name,
      checked: checkedProp,
      defaultChecked,
      required,
      disabled,
      value = "on",
      onCheckedChange,
      form,
      ...switchProps
    } = props;
    const [button, setButton] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
    const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
    const isFormControl = button ? form || !!button.closest("form") : true;
    const [checked, setChecked] = useControllableState({
      prop: checkedProp,
      defaultProp: defaultChecked ?? false,
      onChange: onCheckedChange,
      caller: SWITCH_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(SwitchProvider, { scope: __scopeSwitch, checked, disabled, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": checked,
          "aria-required": required,
          "data-state": getState(checked),
          "data-disabled": disabled ? "" : void 0,
          disabled,
          value,
          ...switchProps,
          ref: composedRefs,
          onClick: composeEventHandlers(props.onClick, (event) => {
            setChecked((prevChecked) => !prevChecked);
            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
              if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
          })
        }
      ),
      isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwitchBubbleInput,
        {
          control: button,
          bubbles: !hasConsumerStoppedPropagationRef.current,
          name,
          value,
          checked,
          required,
          disabled,
          form,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Switch$1.displayName = SWITCH_NAME;
var THUMB_NAME = "SwitchThumb";
var SwitchThumb = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSwitch, ...thumbProps } = props;
    const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        "data-state": getState(context.checked),
        "data-disabled": context.disabled ? "" : void 0,
        ...thumbProps,
        ref: forwardedRef
      }
    );
  }
);
SwitchThumb.displayName = THUMB_NAME;
var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
var SwitchBubbleInput = reactExports.forwardRef(
  ({
    __scopeSwitch,
    control,
    checked,
    bubbles = true,
    ...props
  }, forwardedRef) => {
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(ref, forwardedRef);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = ref.current;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        setChecked.call(input, checked);
        input.dispatchEvent(event);
      }
    }, [prevChecked, checked, bubbles]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: checked,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
SwitchBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
  return checked ? "checked" : "unchecked";
}
var Root = Switch$1;
var Thumb = SwitchThumb;
function Switch({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "switch",
      className: cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Thumb,
        {
          "data-slot": "switch-thumb",
          className: cn(
            "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
          )
        }
      )
    }
  );
}
function SettingsPage() {
  const { user, logout, updateProfile } = useAuthStore();
  const { t, language, toggle } = useLanguageStore();
  const navigate = useNavigate();
  const [editing, setEditing] = reactExports.useState(false);
  const [name, setName] = reactExports.useState((user == null ? void 0 : user.name) ?? "");
  const [loc, setLoc] = reactExports.useState((user == null ? void 0 : user.location) ?? "");
  const [notifOn, setNotifOn] = reactExports.useState(true);
  const [priceAlerts, setPriceAlerts] = reactExports.useState(true);
  const [diseaseAlerts, setDiseaseAlerts] = reactExports.useState(true);
  const [biometricEnabled, setBiometricEnabled] = reactExports.useState(
    typeof window !== "undefined" && localStorage.getItem("biometricEnabled") === "true"
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary px-4 pt-5 pb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(RoleAvatar, { name: user.name, role: user.role, size: "lg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-display font-bold text-primary-foreground truncate", children: user.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary-foreground/80", children: user.email }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-primary-foreground/70 mt-0.5", children: [
          t(user.role),
          " · ",
          user.location
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card mx-4 -mt-4 rounded-xl border border-border p-4 shadow-xs", children: editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: t("name") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: name,
            onChange: (e) => setName(e.target.value),
            "data-ocid": "settings.name_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: t("location") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: loc,
            onChange: (e) => setLoc(e.target.value),
            "data-ocid": "settings.location_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            onClick: handleSave,
            "data-ocid": "settings.save_button",
            className: "flex-1",
            children: t("save")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "outline",
            onClick: () => setEditing(false),
            "data-ocid": "settings.cancel_button",
            className: "flex-1",
            children: t("cancel")
          }
        )
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        className: "w-full flex items-center justify-between",
        onClick: () => setEditing(true),
        "data-ocid": "settings.edit_profile_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: t("editProfile") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-2 px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold", children: t("notificationPreferences") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm", children: language === "sw" ? "Arifa zote" : "All notifications" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                checked: notifOn,
                onCheckedChange: setNotifOn,
                "data-ocid": "settings.notifications_switch"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm", children: language === "sw" ? "Tahadhari za Ugonjwa" : "Disease Alerts" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                checked: diseaseAlerts,
                onCheckedChange: setDiseaseAlerts,
                "data-ocid": "settings.disease_alerts_switch"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm", children: language === "sw" ? "Mabadiliko ya Bei" : "Price Updates" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                checked: priceAlerts,
                onCheckedChange: setPriceAlerts,
                "data-ocid": "settings.price_alerts_switch"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-xl border border-border p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: t("language") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: toggle,
            "data-ocid": "settings.language_toggle",
            children: language === "en" ? "English" : "Kiswahili"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold", children: language === "sw" ? "Taarifa za Kazi" : "Role Information" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t(user.role) }),
        user.farmSize && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
          language === "sw" ? "Ukubwa:" : "Farm size:",
          " ",
          user.farmSize,
          " ",
          "acres"
        ] }),
        user.animalTypes && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
          language === "sw" ? "Mifugo:" : "Animals:",
          " ",
          user.animalTypes.join(", ")
        ] })
      ] }),
      (() => {
        const biometricSupported = typeof window !== "undefined" && "PublicKeyCredential" in window;
        const handleEnrollBiometric = async () => {
          try {
            const cred = await navigator.credentials.create({
              publicKey: {
                challenge: new Uint8Array(32),
                rp: { name: "Namwala" },
                user: {
                  id: new Uint8Array(16),
                  name: "user",
                  displayName: "User"
                },
                pubKeyCredParams: [
                  { type: "public-key", alg: -7 }
                ],
                timeout: 6e4
              }
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
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border p-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: language === "sw" ? "Kuingia kwa Alama za Mwili" : "Biometric Login" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: language === "sw" ? "Tumia alama za vidole au uso wako kuingia haraka na kwa usalama." : "Use fingerprint or face recognition for quick and secure sign-in." }),
          biometricSupported ? biometricEnabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "settings.biometric_disable_button",
              onClick: handleDisableBiometric,
              className: "text-sm text-destructive font-medium",
              children: language === "sw" ? "Zima Utambuzi" : "Disable Biometric"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "settings.biometric_enable_button",
              onClick: handleEnrollBiometric,
              className: "text-sm text-primary font-medium",
              children: language === "sw" ? "Washa Utambuzi" : "Enable Biometric"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: language === "sw" ? "Kifaa chako hakitumii utambuzi wa biometriki." : "Your device does not support biometric authentication." })
        ] });
      })(),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "data-ocid": "settings.change_password_button",
          className: "w-full bg-card rounded-xl border border-border p-4 flex items-center justify-between hover:bg-muted/20 transition-smooth",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: t("changePassword") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "data-ocid": "settings.help_button",
          className: "w-full bg-card rounded-xl border border-border p-4 flex items-center justify-between hover:bg-muted/20 transition-smooth",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: "w-4 h-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: t("helpSupport") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: handleLogout,
          "data-ocid": "settings.logout_button",
          className: "w-full bg-card rounded-xl border border-border p-4 flex items-center gap-2 hover:bg-destructive/5 transition-smooth text-destructive",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: t("logout") })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground mt-6", children: [
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
  ] }) });
}
export {
  SettingsPage as default
};
