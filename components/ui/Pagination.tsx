"use client";
import { getPagination } from "@/lib/pagination";
import { useRouter } from "next/navigation";

import ArrowLeftIcon from "@/assets/icons/pag-left.svg";
import ArrowRightIcon from "@/assets/icons/pag-right.svg";

const Pagination = ({
  currentPage,
  totalPages,
  projectsShowing,
  totalProjects,
  loading,
}: {
  currentPage: number;
  totalPages: number;
  projectsShowing: number;
  totalProjects: number;
  loading: boolean;
}) => {
  const pages = getPagination(currentPage, totalPages);

  const router = useRouter();

  if (loading)
    return (
      <div className="w-full hidden md:flex items-center justify-end mt-12 gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-center w-8 h-8 text-label-SM font-bold border border-slate-light bg-white  text-slate-dark rounded-xs animate-pulse"
          ></div>
        ))}
      </div>
    );
  return (
    <div className="hidden md:flex items-center justify-between w-full mt-12">
      <p className="text-label-SM font-medium text-muted-body">
        Showing {projectsShowing + 1} of {totalProjects} active projects
      </p>

      {/* previous page button */}
      <div className="flex items-center gap-1">
        <button
          className={`w-8 h-8 flex items-center justify-center bg-white border border-slate-light text-slate-dark cursor-pointer disabled:cursor-not-allowed rounded-xs `}
          disabled={currentPage === 1}
          onClick={() => {
            router.replace(`/project?page=${currentPage - 1}`);
          }}
        >
          <ArrowLeftIcon />
        </button>

        {pages.map((page, index) =>
          page === "..." ? (
            <div
              key={index}
              className="flex items-center justify-center w-8 h-8 text-label-SM font-bold border border-slate-light bg-white text-slate-dark rounded-xs"
            >
              ...
            </div>
          ) : (
            <button
              key={index}
              className={`flex items-center justify-center w-8 h-8 text-label-SM font-bold ${
                page === currentPage
                  ? "bg-primary text-white rounded-xs"
                  : "border border-slate-light bg-white text-slate-dark rounded-xs "
              }`}
              onClick={() => router.replace(`/project?page=${page}`)}
            >
              {page}
            </button>
          ),
        )}
        {/* next page button */}
        <button
          className={`w-8 h-8 flex items-center justify-center bg-white border border-slate-light cursor-pointer disabled:cursor-not-allowed rounded-xs `}
          disabled={currentPage === totalPages}
          onClick={() => {
            router.replace(`/project?page=${currentPage + 1}`);
          }}
        >
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
