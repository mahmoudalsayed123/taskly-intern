import { StylesConfig } from "react-select";

type OptionType = {
  value: string;
  label: string;
  icon?: string;
  width?: number;
  height?: number;
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

export const assigneeSelectStylesEpicModal: StylesConfig<OptionType, false> = {
  indicatorSeparator: () => ({
    display: "none",
  }),
  placeholder: (base) => ({
    ...base,
    fontSize: "11px",
    fontWeight: 500,
    color: "#667085",
  }),

  singleValue: (base) => ({
    ...base,
    fontSize: "11px",
    fontWeight: 500,
    color: "#667085",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "8px",
    border: "1px solid #E2E8F0",
    overflow: "hidden",
    boxShadow: "0px 8px 24px rgba(15, 23, 42, 0.08)",
  }),

  menuList: (base) => ({
    ...base,
    padding: "8px",
  }),

  option: (base, state) => ({
    ...base,
    display: "flex",
    alignItems: "center",
    marginTop: "8px",
    marginBottom: "8px",
    padding: "8px",
    borderRadius: "8px",
    fontSize: "11px",
    fontWeight: 500,
    cursor: "pointer",

    backgroundColor: state.isSelected
      ? "#f1f3ff"
      : state.isFocused
        ? "#F8FAFC"
        : "#FFFFFF",

    color: state.isSelected ? "#FFFFFF" : "#475467",

    ":active": {
      backgroundColor: "#E6F0FF",
    },
  }),

  noOptionsMessage: (base) => ({
    ...base,
    color: "#98A2B3",
    fontSize: "14px",
    padding: "12px",
  }),
};

export const taskViewSelectStyles: StylesConfig<OptionType, false> = {
  control: (state) => ({
    width: "fit-content",
    height: "fit-content",
    paddingLeft: "16px",
    paddingRight: "16px",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    border: "1px solid #EAECF0",
    borderRadius: "4px",
    boxShadow: state.isFocused
      ? "0px 4px 12px rgba(0,0,0,0.08)"
      : "0px 1px 2px rgba(0,0,0,0.08)",

    cursor: "pointer",

    ":hover": {
      border: "1px solid #EAECF0",
    },
  }),

  // valueContainer: (base) => ({
  //   ...base,
  //   padding: "0 24px",
  // }),

  singleValue: (base) => ({
    ...base,
    display: "flex",
    alignItems: "center",
    color: "#041b3c",
    fontSize: "14px",
    fontWeight: 500,
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),

  // dropdownIndicator: (base) => ({
  //   ...base,
  //   paddingRight: "24px",
  // }),

  menu: (base) => ({
    ...base,
    borderRadius: "12px",
    overflow: "hidden",
    border: "1px solid #EAECF0",
    boxShadow: "0px 12px 24px rgba(0,0,0,0.12)",
  }),

  // menuList: (base) => ({
  //   ...base,
  //   padding: "8px",
  // }),

  option: (base, state) => ({
    ...base,
    display: "flex",
    alignItems: "center",
    // padding: "14px 20px",
    borderRadius: "8px",
    cursor: "pointer",

    backgroundColor: state.isSelected
      ? "#F2F4F7"
      : state.isFocused
        ? "#F9FAFB"
        : "#FFFFFF",

    color: "#101828",

    fontSize: "14px",
    fontWeight: 500,
  }),
};
