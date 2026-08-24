"use client";
import { viewOptions } from "@/constants/constants";
import { taskViewSelectStyles } from "@/constants/selectStyle";
import { useRouter, useSearchParams } from "next/navigation";
import Select from "react-select";

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
  return (
    <Select
      options={viewOptions}
      value={viewOptions.find((option) => option.value === selectedView)}
      placeholder="Board View"
      onChange={(option) => {
        const newView = option?.value;
        router.push(`/project/${projectId}/tasks?view=${newView}`);
      }}
      formatOptionLabel={(option) => {
        return (
          <div className="flex items-center gap-4">
            {/* <Image
              src={option.icon || ""}
              alt="icon"
              width={option.width}
              height={option.height}
            /> */}

            <span>{option.label}</span>
          </div>
        );
      }}
      styles={taskViewSelectStyles}
    />
  );
};

export default SelectTaskView;
