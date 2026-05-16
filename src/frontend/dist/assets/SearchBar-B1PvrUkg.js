import { r as reactExports, j as jsxRuntimeExports, S as Search } from "./index-BUVIgngH.js";
function SearchBar({
  placeholder = "Search...",
  onSearch,
  value: controlled,
  onChange
}) {
  const [internal, setInternal] = reactExports.useState("");
  const value = controlled ?? internal;
  const handleChange = (v) => {
    if (onChange) onChange(v);
    else setInternal(v);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch == null ? void 0 : onSearch(value);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "search",
        value,
        onChange: (e) => handleChange(e.target.value),
        placeholder,
        "data-ocid": "search.input",
        className: "w-full bg-card border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth",
        "aria-label": placeholder
      }
    )
  ] });
}
export {
  SearchBar as S
};
