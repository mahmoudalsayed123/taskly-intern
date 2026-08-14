"use client";
import { viewOptions } from "@/constants/constants";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, ChangeEventHandler } from "react";

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
    <select
      name="view"
      id="view"
      onChange={handleViewChange}
      className="bg-white border-none outline-none py-2 px-4 rounded-md border border-slate-20 shadow-[0px 1px 2px 0px #0000000D]"
    >
      <div className="bg-white py-2 px-4 rounded-md border border-slate-20 shadow-[0px 1px 2px 0px #0000000D]">
        {viewOptions.map((option) => (
          <option
            className="bg-white py-2 px-4 rounded-md border border-slate-20 shadow-[0px 1px 2px 0px #0000000D] flex justify-center items-center gap-2.5"
            key={option.value}
            value={option.value}
            selected={selectedView === option.value}
          >
            {/* <Image
              src={option.icon}
              alt="icon"
              width={Number(option.width)}
              height={Number(option.height)}
            /> */}
            <span className="text-body-MD font-normal text-resend-timer">
              {option.label}
            </span>
            {/* <Image
              src="/assets/icons/arrow-bottom.svg"
              alt="arrow bottom"
              width={9}
              height={5.55}
            /> */}
          </option>
        ))}
      </div>
    </select>
  );
};

export default SelectTaskView;
