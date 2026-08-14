"use client";
import { getPagination } from "@/lib/pagination";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Pagination = ({
  currentPage,
  totalPages,
  totalProjects,
  projectsShowing,
}: {
  currentPage: number;
  totalPages: number;
  totalProjects: number;
  projectsShowing: number;
}) => {
  const pages = getPagination(currentPage, totalPages);

  const router = useRouter();
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
            router.push(`/project?page=${currentPage - 1}`);
          }}
        >
          {" "}
          {/* <Image
            src="/assets/icons/pag-left.svg"
            alt="right"
            width={5}
            height={7}
          /> */}
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
              key={page}
              className={`flex items-center justify-center w-8 h-8 text-label-SM font-bold ${
                page === currentPage
                  ? "bg-primary text-white rounded-xs"
                  : "border border-slate-light bg-white text-slate-dark rounded-xs "
              }`}
              onClick={() => router.push(`/project?page=${page}`)}
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
            router.push(`/project?page=${currentPage + 1}`);
          }}
        >
          {/* <Image
            src="/assets/icons/pag-right.svg"
            alt="right"
            width={5}
            height={7}
          /> */}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
