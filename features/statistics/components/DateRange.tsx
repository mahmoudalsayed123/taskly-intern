"use client";

import { formatDateRange, getCurrentWeek } from "@/lib/helper";
import { useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import "react-day-picker/style.css";

import ArrowLeftIcon from "@/assets/icons/pag-left.svg";
import ArrowRightIcon from "@/assets/icons/pag-right.svg";

export default function DateRange() {
  const [openPicker, setOpenPicker] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>(getCurrentWeek());
  console.log(range);

  return (
    <div>
      <div
        onClick={() => setOpenPicker(!openPicker)}
        className="flex items-center justify-start gap-3 w-full cursor-pointer "
      >
        <button className="flex items-center justify-center p-1.5 rounded-xs ">
          <ArrowLeftIcon width={7.4} height={12} />
        </button>
        <p className="text-body-MD font-bold text-slate-dark">
          {formatDateRange(range)}
        </p>
        <button className="flex items-center justify-center p-1.5 rounded-xs">
          <ArrowRightIcon width={7.4} height={12} />
        </button>
      </div>
      <div
        className={`${openPicker ? "" : "hidden"} flex flex-col gap-4 absolute top-full left-0 z-100`}
      >
        <DayPicker
          mode="range"
          selected={range}
          onSelect={setRange}
          className="rdp-range-picker"
        />

        <div className={`date-range-actions ${openPicker ? "" : "hidden"}`}>
          <button type="button" onClick={() => setRange(undefined)}>
            Cancel
          </button>

          <button
            type="button"
            onClick={() => {
              console.log(range);
            }}
          >
            Apply Range
          </button>
        </div>
      </div>
    </div>
  );
}
