"use client";
import { viewOptions } from "@/constants/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";
import Select from "react-select";

import ArrowBottomIcon from "@/assets/icons/arrow-bottom.svg";
import { assigneeSelectStylesEpicModal } from "@/constants/selectStyle";

const SelectTaskView = ({
  view,
  projectId,
}: {
  view: string;
  projectId: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedView = searchParams.get("view") || "board";

  const handleViewChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newView = e.target.value;
    router.push(`/project/${projectId}/tasks?view=${newView}`);
  };
  return (
    <Select
      options={viewOptions}
      value={viewOptions.find((option) => option.value === view)}
      onChange={(selectedOption) => {
        const newView = selectedOption?.value || "board";
        router.push(`/project/${projectId}/tasks?view=${newView}`);
      }}
      formatOptionLabel={(option) => {
        const Icon = option.icon;

        return (
          <div className="flex items-center gap-2">
            {Icon && <Icon />}
            <span className="text-body-MD font-normal text-resend-timer">
              {option.label}
            </span>
          </div>
        );
      }}
      styles={assigneeSelectStylesEpicModal}
    />
  );
};

export default SelectTaskView;
