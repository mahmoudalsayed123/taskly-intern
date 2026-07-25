"use client";
import Image from "next/image";

const Pagination = () => {
  return (
    <div className="hidden md:flex items-center justify-between w-full mt-12">
      <p className="text-label font-medium text-slate-medium">
        Showing 1 of 10 active projects
      </p>
      <div className="flex items-center gap-1">
        <button
          className={`w-8 h-8 flex items-center justify-center border border-slate-light text-slate-dark`}
        >
          {" "}
          <Image
            src="/assets/icons/pag-left.svg"
            alt="right"
            width={5}
            height={7}
          />
        </button>
        {Array.from({ length: 3 }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            className={`flex items-center justify-center w-8 h-8 text-label font-bold ${
              pageNum === 1
                ? "bg-primary-container text-white"
                : "border border-slate-light text-slate-dark"
            } cursor-pointer`}
          >
            {pageNum}
          </button>
        ))}
        <button
          className={`w-8 h-8 flex items-center justify-center border border-slate-light`}
        >
          <Image
            src="/assets/icons/pag-right.svg"
            alt="right"
            width={5}
            height={7}
          />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
