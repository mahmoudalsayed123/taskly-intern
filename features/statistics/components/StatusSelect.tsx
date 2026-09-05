"use client";

import { status } from "@/constants/constants";
import { epicSelectStyles } from "@/constants/selectStyle";
import { useEffect, useState } from "react";
import Select from "react-select";

type Option = {
  label: string;
  value: string;
};

const StatusSelect = () => {
  const [statusOptions, setStatusOptions] = useState<Option[]>([]);
  const [statusSelected, setStatusSelected] = useState<string>("");
  useEffect(() => {
    setStatusOptions([
      {
        label: "All Status",
        value: "All Status",
      },
      ...status.map((item: { label: string; value: string }) => {
        return {
          label: item.label,
          value: item.value,
        };
      }),
    ]);
  }, []);

  return (
    <Select
      options={statusOptions}
      value={{
        label: statusSelected || "All Status",
        value: statusSelected || "All Status",
      }}
      onChange={(e) => {
        setStatusSelected(e?.label || "All Status");
      }}
      placeholder="Status"
      styles={epicSelectStyles}
    />
  );
};

export default StatusSelect;
