import { ComponentType } from "react";
import { StylesConfig } from "react-select";

type OptionType = {
  value: string;
  label: string;

  icon?: ComponentType;
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
    padding: "8px",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    border: "1px solid #D7E2FF",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: 500,
    color: "#434654",
    cursor: "pointer",
  }),

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
    overflow: "hidden",
    border: "1px solid #EAECF0",
    boxShadow: "0px 12px 24px rgba(0,0,0,0.12)",
  }),

  menuList: (base) => ({
    ...base,
    padding: "8px",
  }),

  // option: (base, state) => ({
  //   ...base,
  //   display: "flex",
  //   alignItems: "center",
  //   // padding: "14px 20px",
  //   borderRadius: "8px",
  //   cursor: "pointer",

  //   backgroundColor: state.isSelected
  //     ? "#F2F4F7"
  //     : state.isFocused
  //       ? "#F9FAFB"
  //       : "#FFFFFF",

  //   color: "#101828",

  //   fontSize: "14px",
  //   fontWeight: 500,
  // }),
};

export const epicSelectStyles: StylesConfig<OptionType, false> = {
  // =========================
  // SELECT CONTROL
  // =========================
  control: (base, state) => ({
    ...base,

    width: "255px",
    minHeight: "44px",
    height: "44px",

    backgroundColor: "#fff",

    border: state.isFocused ? "1px solid #B8C5FF" : "1px solid #C9D3FF",

    borderRadius: "8px",

    boxShadow: "none",

    cursor: "pointer",

    ":hover": {
      border: "1px solid #B8C5FF",
    },
  }),

  // =========================
  // SELECTED VALUE
  // =========================
  valueContainer: (base) => ({
    ...base,

    padding: "0 8px",
  }),

  singleValue: (base) => ({
    ...base,

    margin: 0,

    color: "#344054",

    fontSize: "14px",
    fontWeight: 500,

    lineHeight: "20px",
  }),

  // =========================
  // PLACEHOLDER
  // =========================
  placeholder: (base) => ({
    ...base,

    color: "#98A2B3",

    fontSize: "14px",
    fontWeight: 400,
  }),

  // =========================
  // REMOVE SEPARATOR
  // =========================
  indicatorSeparator: () => ({
    display: "none",
  }),

  // =========================
  // ARROW
  // =========================
  dropdownIndicator: (base) => ({
    ...base,

    color: "#667085",

    padding: "0 12px 0 4px",

    ":hover": {
      color: "#344054",
    },
  }),

  // =========================
  // DROPDOWN MENU
  // =========================
  menu: (base) => ({
    ...base,

    width: "255px",

    marginTop: "4px",

    backgroundColor: "#FFFFFF",

    borderRadius: "8px",

    border: "1px solid #E4E7EC",

    boxShadow: "0px 8px 24px rgba(16, 24, 40, 0.10)",

    overflow: "hidden",

    zIndex: 100,
  }),

  // =========================
  // MENU LIST
  // =========================
  menuList: (base) => ({
    ...base,

    padding: "8px 0",

    maxHeight: "220px",

    overflowY: "auto",

    "::-webkit-scrollbar": {
      width: "4px",
    },

    "::-webkit-scrollbar-thumb": {
      backgroundColor: "#D0D5DD",
      borderRadius: "4px",
    },
  }),

  // =========================
  // SEARCH INPUT
  // =========================
  input: (base) => ({
    ...base,

    color: "#344054",

    fontSize: "14px",
    fontWeight: 400,

    margin: 0,

    padding: 0,

    caretColor: "#344054",
  }),

  // =========================
  // OPTIONS
  // =========================
  option: (base, state) => ({
    ...base,

    position: "relative",

    display: "flex",
    alignItems: "center",

    minHeight: "32px",

    padding: "7px 24px",

    backgroundColor: state.isFocused ? "#F8FAFC" : "#FFFFFF",

    color: "#344054",

    fontSize: "14px",
    fontWeight: 400,

    cursor: "pointer",

    borderBottom: state.isSelected ? "none" : "1px solid #E4E7EC",

    ":active": {
      backgroundColor: "#F2F4F7",
    },
  }),

  // =========================
  // NO OPTIONS
  // =========================
  noOptionsMessage: (base) => ({
    ...base,

    color: "#98A2B3",

    fontSize: "13px",

    padding: "12px",
  }),
};
