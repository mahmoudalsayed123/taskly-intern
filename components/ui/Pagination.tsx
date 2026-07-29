"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Pagination = ({
  currentPage,
  offset,
  totalPages,
  totalProjects,
  projectsShowing,
}: {
  currentPage: number;
  offset: number;
  totalPages: number;
  totalProjects: number;
  projectsShowing: number;
}) => {
  const router = useRouter();
  return (
    <div className="hidden md:flex items-center justify-between w-full mt-12">
      <p className="text-label font-medium text-slate-medium">
        Showing {projectsShowing + 1} of {totalProjects} active projects
      </p>
      {/* previous page button */}
      <div className="flex items-center gap-1">
        <button
          className={`w-8 h-8 flex items-center justify-center border border-slate-light text-slate-dark cursor-pointer disabled:cursor-not-allowed `}
          disabled={currentPage === 1}
          onClick={() => {
            router.push(`/project?page=${currentPage - 1}`);
          }}
        >
          {" "}
          <Image
            src="/assets/icons/pag-left.svg"
            alt="right"
            width={5}
            height={7}
          />
        </button>
        {Array.from({ length: totalPages }).map((_, pageNum) => (
          <button
            key={pageNum}
            className={`flex items-center justify-center w-8 h-8 text-label font-bold ${
              pageNum + 1 === currentPage
                ? "bg-primary-container text-white"
                : "border border-slate-light text-slate-dark"
            } cursor-pointer`}
            onClick={() => {
              router.push(`/project?page=${pageNum + 1}`);
            }}
          >
            {pageNum + 1}
          </button>
        ))}
        {/* next page button */}
        <button
          className={`w-8 h-8 flex items-center justify-center border border-slate-light cursor-pointer disabled:cursor-not-allowed `}
          disabled={currentPage === totalPages}
          onClick={() => {
            router.push(`/project?page=${currentPage + 1}`);
          }}
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
