import { StylesConfig } from "react-select";

type OptionType = {
  value: string;
  label: string;
};

export const selectStyles: StylesConfig<OptionType, false> = {
  control: (base) => ({
    ...base,
    backgroundColor: "var(--color-surface-highest)",
    border: "none",
    borderRadius: "4px",
    maxHeight: "48px",
    boxShadow: "none",
    padding: "8px",
    cursor: "pointer",
  }),

  valueContainer: (base) => ({
    ...base,
    padding: "0 8px",
  }),

  placeholder: (base) => ({
    ...base,
    color: "var(--color-slate-medium)",
    fontSize: "14px",
    fontWeight: 500,
  }),

  singleValue: (base) => ({
    ...base,
    color: "var(--color-slate-dark)",
    fontSize: "14px",
    fontWeight: 500,
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),

  dropdownIndicator: (base) => ({
    ...base,
    color: "var(--color-slate-dark)",
    paddingRight: "8px",
  }),

  menu: (base) => ({
    ...base,
    backgroundColor: "#FFFFFF",
    borderRadius: "10px",
    border: "1px solid #E2E8F0",
    boxShadow: "0px 8px 24px rgba(15, 23, 42, 0.08)",
    marginTop: "6px",
    overflow: "hidden",
  }),
  menuList: (base) => ({
    ...base,
    padding: "6px",
  }),

  option: (base, state) => ({
    ...base,
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 12px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: 500,
    cursor: "pointer",

    backgroundColor: state.isSelected
      ? "#E6F0FF" // selected
      : state.isFocused
        ? "#F8FAFC" // hover
        : "#FFFFFF",

    color: "#1E293B",

    ":active": {
      backgroundColor: "#DCEAFE",
    },
  }),
};