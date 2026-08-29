"use client";

import dynamic from "next/dynamic";

const SelectTaskView = dynamic(
  () => import("@/features/tasks/components/SelectTaskView"),
  {
    ssr: false,
  },
);

export default SelectTaskView;
