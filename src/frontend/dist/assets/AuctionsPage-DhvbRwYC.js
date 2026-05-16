import { r as reactExports, j as jsxRuntimeExports, $ as useComposedRefs, a0 as cn, a as useLanguageStore, u as useAuthStore, L as Layout, B as Button, S as Search, I as Input, X, l as Textarea, y as MapPin, m as Badge, T as TrendingUp, e as Link, K as Clock } from "./index-BUVIgngH.js";
import { P as Primitive, u as useControllableState, c as composeEventHandlers, b as createContextScope } from "./index-BpD0H2hM.js";
import { u as usePrevious, a as useSize } from "./index-Oh98DbrD.js";
import { P as Presence } from "./index-Cg_2nNnI.js";
import { C as Check } from "./check-Byk4lD13.js";
import { L as Label } from "./label-BTY_QCm0.js";
import { G as Gavel } from "./gavel-CIxzjL7N.js";
import { P as Plus } from "./plus-DMsGFanj.js";
import "./index-BoFiBQpD.js";
import "./index-ob0xpmgs.js";
var CHECKBOX_NAME = "Checkbox";
var [createCheckboxContext] = createContextScope(CHECKBOX_NAME);
var [CheckboxProviderImpl, useCheckboxContext] = createCheckboxContext(CHECKBOX_NAME);
function CheckboxProvider(props) {
  const {
    __scopeCheckbox,
    checked: checkedProp,
    children,
    defaultChecked,
    disabled,
    form,
    name,
    onCheckedChange,
    required,
    value = "on",
    // @ts-expect-error
    internal_do_not_use_render
  } = props;
  const [checked, setChecked] = useControllableState({
    prop: checkedProp,
    defaultProp: defaultChecked ?? false,
    onChange: onCheckedChange,
    caller: CHECKBOX_NAME
  });
  const [control, setControl] = reactExports.useState(null);
  const [bubbleInput, setBubbleInput] = reactExports.useState(null);
  const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
  const isFormControl = control ? !!form || !!control.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    true
  );
  const context = {
    checked,
    disabled,
    setChecked,
    control,
    setControl,
    name,
    form,
    value,
    hasConsumerStoppedPropagationRef,
    required,
    defaultChecked: isIndeterminate(defaultChecked) ? false : defaultChecked,
    isFormControl,
    bubbleInput,
    setBubbleInput
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CheckboxProviderImpl,
    {
      scope: __scopeCheckbox,
      ...context,
      children: isFunction(internal_do_not_use_render) ? internal_do_not_use_render(context) : children
    }
  );
}
var TRIGGER_NAME = "CheckboxTrigger";
var CheckboxTrigger = reactExports.forwardRef(
  ({ __scopeCheckbox, onKeyDown, onClick, ...checkboxProps }, forwardedRef) => {
    const {
      control,
      value,
      disabled,
      checked,
      required,
      setControl,
      setChecked,
      hasConsumerStoppedPropagationRef,
      isFormControl,
      bubbleInput
    } = useCheckboxContext(TRIGGER_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setControl);
    const initialCheckedStateRef = reactExports.useRef(checked);
    reactExports.useEffect(() => {
      const form = control == null ? void 0 : control.form;
      if (form) {
        const reset = () => setChecked(initialCheckedStateRef.current);
        form.addEventListener("reset", reset);
        return () => form.removeEventListener("reset", reset);
      }
    }, [control, setChecked]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": isIndeterminate(checked) ? "mixed" : checked,
        "aria-required": required,
        "data-state": getState(checked),
        "data-disabled": disabled ? "" : void 0,
        disabled,
        value,
        ...checkboxProps,
        ref: composedRefs,
        onKeyDown: composeEventHandlers(onKeyDown, (event) => {
          if (event.key === "Enter") event.preventDefault();
        }),
        onClick: composeEventHandlers(onClick, (event) => {
          setChecked((prevChecked) => isIndeterminate(prevChecked) ? true : !prevChecked);
          if (bubbleInput && isFormControl) {
            hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
            if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
          }
        })
      }
    );
  }
);
CheckboxTrigger.displayName = TRIGGER_NAME;
var Checkbox$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeCheckbox,
      name,
      checked,
      defaultChecked,
      required,
      disabled,
      value,
      onCheckedChange,
      form,
      ...checkboxProps
    } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CheckboxProvider,
      {
        __scopeCheckbox,
        checked,
        defaultChecked,
        disabled,
        required,
        onCheckedChange,
        name,
        form,
        value,
        internal_do_not_use_render: ({ isFormControl }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxTrigger,
            {
              ...checkboxProps,
              ref: forwardedRef,
              __scopeCheckbox
            }
          ),
          isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxBubbleInput,
            {
              __scopeCheckbox
            }
          )
        ] })
      }
    );
  }
);
Checkbox$1.displayName = CHECKBOX_NAME;
var INDICATOR_NAME = "CheckboxIndicator";
var CheckboxIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeCheckbox, forceMount, ...indicatorProps } = props;
    const context = useCheckboxContext(INDICATOR_NAME, __scopeCheckbox);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Presence,
      {
        present: forceMount || isIndeterminate(context.checked) || context.checked === true,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            "data-state": getState(context.checked),
            "data-disabled": context.disabled ? "" : void 0,
            ...indicatorProps,
            ref: forwardedRef,
            style: { pointerEvents: "none", ...props.style }
          }
        )
      }
    );
  }
);
CheckboxIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "CheckboxBubbleInput";
var CheckboxBubbleInput = reactExports.forwardRef(
  ({ __scopeCheckbox, ...props }, forwardedRef) => {
    const {
      control,
      hasConsumerStoppedPropagationRef,
      checked,
      defaultChecked,
      required,
      disabled,
      name,
      value,
      form,
      bubbleInput,
      setBubbleInput
    } = useCheckboxContext(BUBBLE_INPUT_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setBubbleInput);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = bubbleInput;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      const bubbles = !hasConsumerStoppedPropagationRef.current;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        input.indeterminate = isIndeterminate(checked);
        setChecked.call(input, isIndeterminate(checked) ? false : checked);
        input.dispatchEvent(event);
      }
    }, [bubbleInput, prevChecked, checked, hasConsumerStoppedPropagationRef]);
    const defaultCheckedRef = reactExports.useRef(isIndeterminate(checked) ? false : checked);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.input,
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: defaultChecked ?? defaultCheckedRef.current,
        required,
        disabled,
        name,
        value,
        form,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0,
          // We transform because the input is absolutely positioned but we have
          // rendered it **after** the button. This pulls it back to sit on top
          // of the button.
          transform: "translateX(-100%)"
        }
      }
    );
  }
);
CheckboxBubbleInput.displayName = BUBBLE_INPUT_NAME;
function isFunction(value) {
  return typeof value === "function";
}
function isIndeterminate(checked) {
  return checked === "indeterminate";
}
function getState(checked) {
  return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Checkbox$1,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CheckboxIndicator,
        {
          "data-slot": "checkbox-indicator",
          className: "flex items-center justify-center text-current transition-none",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3.5" })
        }
      )
    }
  );
}
const now = /* @__PURE__ */ new Date();
const iso = (offsetMs) => new Date(Date.now() + offsetMs).toISOString();
const MOCK_AUCTIONS = [
  {
    id: "a1",
    sellerId: "u1",
    listingType: "crop",
    title: "Premium Maize Harvest",
    description: "High quality maize from Dodoma, well-stored",
    startingPrice: 5e4,
    currentBid: 85e3,
    currentBidderId: "u3",
    bidCount: 7,
    endTime: iso(2 * 36e5),
    startTime: iso(-24 * 36e5),
    quantity: 500,
    unit: "kg",
    images: [],
    region: "Dodoma",
    status: "active",
    isAnonymousBidding: false
  },
  {
    id: "a2",
    sellerId: "u2",
    listingType: "livestock",
    title: "3 Friesian Dairy Cows",
    description: "Healthy Friesian cows, 5L/day average production",
    startingPrice: 12e5,
    currentBid: 145e4,
    currentBidderId: "u3",
    bidCount: 4,
    endTime: iso(18 * 36e5),
    startTime: iso(-6 * 36e5),
    quantity: 3,
    unit: "head",
    images: [],
    region: "Arusha",
    status: "active",
    isAnonymousBidding: true
  },
  {
    id: "a3",
    sellerId: "u1",
    listingType: "crop",
    title: "Organic Beans Harvest",
    description: "Certified organic red kidney beans",
    startingPrice: 75e3,
    currentBid: 75e3,
    bidCount: 0,
    endTime: iso(5 * 24 * 36e5),
    startTime: iso(-12 * 36e5),
    quantity: 200,
    unit: "kg",
    images: [],
    region: "Mbeya",
    status: "active",
    isAnonymousBidding: false
  },
  {
    id: "a4",
    sellerId: "u2",
    listingType: "livestock",
    title: "10 Boer Goats",
    description: "Well-fed Boer goats, ready for market",
    startingPrice: 8e5,
    currentBid: 95e4,
    currentBidderId: "u5",
    bidCount: 3,
    endTime: iso(3 * 24 * 36e5),
    startTime: iso(-2 * 24 * 36e5),
    quantity: 10,
    unit: "head",
    images: [],
    region: "Mwanza",
    status: "active",
    isAnonymousBidding: false
  },
  {
    id: "a5",
    sellerId: "u1",
    listingType: "crop",
    title: "Sunflower Seeds Lot",
    description: "200kg dried sunflower seeds for oil extraction",
    startingPrice: 12e4,
    currentBid: 175e3,
    currentBidderId: "u3",
    bidCount: 12,
    endTime: iso(-36e5),
    startTime: iso(-7 * 24 * 36e5),
    quantity: 200,
    unit: "kg",
    images: [],
    region: "Kilimanjaro",
    status: "ended",
    isAnonymousBidding: false
  },
  {
    id: "a6",
    sellerId: "u2",
    listingType: "livestock",
    title: "50 Local Chickens",
    description: "Free-range chickens, vaccinated",
    startingPrice: 3e5,
    currentBid: 38e4,
    currentBidderId: "u5",
    bidCount: 5,
    endTime: iso(7 * 24 * 36e5),
    startTime: now.toISOString(),
    quantity: 50,
    unit: "birds",
    images: [],
    region: "Dar es Salaam",
    status: "active",
    isAnonymousBidding: true
  }
];
function useCountdown(endTimeIso) {
  const endMs = new Date(endTimeIso).getTime();
  const [remaining, setRemaining] = reactExports.useState(() => endMs - Date.now());
  reactExports.useEffect(() => {
    const id = setInterval(() => setRemaining(endMs - Date.now()), 1e3);
    return () => clearInterval(id);
  }, [endMs]);
  if (remaining <= 0) return "Ended";
  const d = Math.floor(remaining / 864e5);
  const h = Math.floor(remaining % 864e5 / 36e5);
  const m = Math.floor(remaining % 36e5 / 6e4);
  const s = Math.floor(remaining % 6e4 / 1e3);
  if (d > 0) return `${d}d ${h}h ${m}m`;
  if (h > 0) return `${h}h ${m}m ${s}s`;
  return `${m}m ${s}s`;
}
function StatusBadge({ status }) {
  const map = {
    active: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30",
    ended: "bg-yellow-500/15 text-yellow-600 border-yellow-500/30",
    completed: "bg-muted text-muted-foreground border-border",
    cancelled: "bg-destructive/15 text-destructive border-destructive/30",
    upcoming: "bg-blue-500/15 text-blue-600 border-blue-500/30"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border capitalize ${map[status]}`,
      children: [
        status === "active" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-1 h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" }),
        status
      ]
    }
  );
}
function CountdownBadge({ endTime }) {
  const label = useCountdown(endTime);
  const ended = label === "Ended";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `flex items-center gap-1 text-xs font-medium ${ended ? "text-muted-foreground" : "text-accent"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
        label
      ]
    }
  );
}
function AuctionCard({ auction }) {
  const { t, language } = useLanguageStore();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "auctions.item",
      className: "group bg-card border border-border rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow duration-200",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 px-4 pt-4 pb-3 flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: auction.status }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CountdownBadge, { endTime: auction.endTime })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 px-4 py-3 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground leading-snug line-clamp-2", children: auction.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3 text-muted-foreground shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: auction.region }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: `text-xs capitalize ${auction.listingType === "crop" ? "border-emerald-500/40 text-emerald-600" : "border-blue-500/40 text-blue-600"}`,
                children: auction.listingType
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-2 space-y-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-bold text-accent tabular-nums", children: [
            auction.currentBid.toLocaleString(),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-muted-foreground", children: "TSh" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            t("startingPrice"),
            ": ",
            auction.startingPrice.toLocaleString(),
            " TSh"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3 w-3" }),
            auction.bidCount,
            " ",
            language === "sw" ? "zabuni" : "bids"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-4 pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/auctions/$auctionId",
            params: { auctionId: auction.id },
            "data-ocid": "auctions.bid_now_link",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "w-full",
                variant: auction.status === "active" ? "default" : "outline",
                size: "sm",
                disabled: auction.status !== "active",
                children: auction.status === "active" ? t("bidNow") : t("auctionEnded") ?? "Ended"
              }
            )
          }
        ) })
      ]
    }
  );
}
const DURATION_OPTIONS = [
  { label: "1 day", value: 1 },
  { label: "2 days", value: 2 },
  { label: "3 days", value: 3 },
  { label: "5 days", value: 5 },
  { label: "7 days", value: 7 }
];
const INITIAL_FORM = {
  title: "",
  description: "",
  listingType: "crop",
  startingPrice: "",
  quantity: "",
  unit: "kg",
  durationDays: 3,
  isAnonymousBidding: false
};
function AuctionsPage() {
  const { t, language } = useLanguageStore();
  const { user } = useAuthStore();
  const [auctions, setAuctions] = reactExports.useState(MOCK_AUCTIONS);
  const [filterTab, setFilterTab] = reactExports.useState(
    "all"
  );
  const [search, setSearch] = reactExports.useState("");
  const [showCreateModal, setShowCreateModal] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState(INITIAL_FORM);
  const dialogRef = reactExports.useRef(null);
  const canCreate = (user == null ? void 0 : user.role) === "farmer" || (user == null ? void 0 : user.role) === "livestock_keeper";
  reactExports.useEffect(() => {
    if (!showCreateModal) return;
    const handleKey = (e) => {
      if (e.key === "Escape") setShowCreateModal(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [showCreateModal]);
  const filtered = auctions.filter((a) => {
    if (filterTab !== "all" && a.listingType !== filterTab) return false;
    if (search) {
      const q = search.toLowerCase();
      return a.title.toLowerCase().includes(q) || a.region.toLowerCase().includes(q);
    }
    return true;
  });
  function handleSubmit(e) {
    e.preventDefault();
    const nowTs = Date.now();
    const newAuction = {
      id: `a${nowTs}`,
      sellerId: (user == null ? void 0 : user.id) ?? "unknown",
      listingType: form.listingType,
      title: form.title,
      description: form.description,
      startingPrice: Number(form.startingPrice),
      currentBid: Number(form.startingPrice),
      bidCount: 0,
      endTime: new Date(nowTs + form.durationDays * 24 * 36e5).toISOString(),
      startTime: new Date(nowTs).toISOString(),
      quantity: Number(form.quantity),
      unit: form.unit,
      images: [],
      region: "Dodoma",
      status: "active",
      isAnonymousBidding: form.isAnonymousBidding
    };
    setAuctions((prev) => [newAuction, ...prev]);
    setForm(INITIAL_FORM);
    setShowCreateModal(false);
  }
  const TABS = [
    { key: "all", label: t("liveAuctions") ?? "All" },
    { key: "crop", label: language === "sw" ? "Mazao" : "Crops" },
    {
      key: "livestock",
      label: language === "sw" ? "Mifugo" : "Livestock"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-8 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Gavel, { className: "h-5 w-5 text-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: t("liveAuctions") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              filtered.length,
              " auctions available"
            ] })
          ] })
        ] }),
        canCreate && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            "data-ocid": "auctions.create_button",
            onClick: () => setShowCreateModal(true),
            className: "gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
              t("createAuction")
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex bg-muted/40 rounded-xl p-1 gap-1", children: TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": `auctions.filter.${tab.key}`,
            onClick: () => setFilterTab(tab.key),
            className: `px-4 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150 ${filterTab === tab.key ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
            children: tab.label
          },
          tab.key
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "auctions.search_input",
              placeholder: "Search auctions...",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "pl-9"
            }
          )
        ] })
      ] }),
      filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "auctions.empty_state",
          className: "text-center py-20 text-muted-foreground",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Gavel, { className: "h-12 w-12 mx-auto mb-3 opacity-30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-medium", children: language === "sw" ? "Hakuna minada iliyopatikana" : "No auctions found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: language === "sw" ? "Jaribu kubadilisha vichujio vyako" : "Try adjusting your filters" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: filtered.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(AuctionCard, { auction: a }, a.id)) })
    ] }),
    showCreateModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm",
        onClick: (e) => {
          if (e.target === e.currentTarget) setShowCreateModal(false);
        },
        onKeyDown: (e) => e.key === "Escape" && setShowCreateModal(false),
        role: "presentation",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "dialog",
          {
            ref: dialogRef,
            open: true,
            "data-ocid": "auctions.create_modal",
            className: "bg-card border border-border rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto",
            "aria-labelledby": "create-auction-title",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h2",
                  {
                    id: "create-auction-title",
                    className: "text-lg font-semibold text-foreground",
                    children: t("createAuction")
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "auctions.create_modal_close_button",
                    onClick: () => setShowCreateModal(false),
                    className: "h-8 w-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors",
                    "aria-label": "Close",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4 text-muted-foreground" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "px-6 py-4 space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ca-title", children: "Title" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "ca-title",
                      "data-ocid": "auctions.create_title_input",
                      required: true,
                      value: form.title,
                      onChange: (e) => setForm((p) => ({ ...p, title: e.target.value })),
                      placeholder: "e.g. Premium Maize Harvest"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ca-desc", children: "Description" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      id: "ca-desc",
                      "data-ocid": "auctions.create_description_textarea",
                      required: true,
                      rows: 3,
                      value: form.description,
                      onChange: (e) => setForm((p) => ({ ...p, description: e.target.value })),
                      placeholder: "Describe your product quality, condition, storage..."
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ca-type", children: "Product Type" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "select",
                      {
                        id: "ca-type",
                        "data-ocid": "auctions.create_type_select",
                        className: "w-full h-9 rounded-md border border-input bg-transparent px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent",
                        value: form.listingType,
                        onChange: (e) => setForm((p) => ({
                          ...p,
                          listingType: e.target.value
                        })),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "crop", children: "Crop" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "livestock", children: "Livestock" })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ca-duration", children: "Duration" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "select",
                      {
                        id: "ca-duration",
                        "data-ocid": "auctions.create_duration_select",
                        className: "w-full h-9 rounded-md border border-input bg-transparent px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent",
                        value: form.durationDays,
                        onChange: (e) => setForm((p) => ({
                          ...p,
                          durationDays: Number(e.target.value)
                        })),
                        children: DURATION_OPTIONS.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o.value, children: o.label }, o.value))
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ca-price", children: "Starting Price (TSh)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "ca-price",
                        "data-ocid": "auctions.create_price_input",
                        type: "number",
                        min: 1,
                        required: true,
                        value: form.startingPrice,
                        onChange: (e) => setForm((p) => ({ ...p, startingPrice: e.target.value })),
                        placeholder: "50000"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ca-qty", children: "Quantity" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "ca-qty",
                        "data-ocid": "auctions.create_quantity_input",
                        type: "number",
                        min: 1,
                        required: true,
                        value: form.quantity,
                        onChange: (e) => setForm((p) => ({ ...p, quantity: e.target.value })),
                        placeholder: "100"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ca-unit", children: "Unit" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "ca-unit",
                      "data-ocid": "auctions.create_unit_input",
                      value: form.unit,
                      onChange: (e) => setForm((p) => ({ ...p, unit: e.target.value })),
                      placeholder: "kg, head, birds..."
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Checkbox,
                    {
                      id: "ca-anon",
                      "data-ocid": "auctions.create_anonymous_checkbox",
                      checked: form.isAnonymousBidding,
                      onCheckedChange: (v) => setForm((p) => ({ ...p, isAnonymousBidding: !!v }))
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ca-anon", className: "cursor-pointer", children: t("anonymousBidding") ?? "Anonymous Bidding" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2 border-t border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      className: "flex-1",
                      "data-ocid": "auctions.create_cancel_button",
                      onClick: () => setShowCreateModal(false),
                      children: language === "sw" ? "Ghairi" : "Cancel"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      className: "flex-1",
                      "data-ocid": "auctions.create_submit_button",
                      children: t("createAuction")
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      }
    )
  ] });
}
export {
  AuctionsPage as default
};
