"use client";
import ArrowLeftIcon from "@/assets/icons/pag-left.svg";
import ArrowRightIcon from "@/assets/icons/pag-right.svg";
import { useRouter } from "next/navigation";

const PaginationTasks = ({
  projectId,
  totalPages,
  currentPage,
  showing,
  totalTasks,
  search,
}: {
  projectId: string;
  totalPages: number;
  currentPage: number;
  showing: number;
  totalTasks: number;
  search?: string;
}) => {
  const router = useRouter();
  // console.log("showing", showing + 1);
  // console.log("totalTasks", totalTasks);
  // console.log("totalPages", totalPages);
  return (
    <div className="flex items-center justify-between px-6 py-4">
      <p className="text-label-SM font-normal text-muted-body">
        Showing {showing + 1} of {totalTasks} tasks
      </p>
      <div className="flex items-center">
        {/* previous page button */}
        <button
          onClick={() => {
            router.push(
              `${search ? `/project/${projectId}/tasks?view=list&page=${currentPage - 1}&search=${search}` : `/project/${projectId}/tasks?view=list&page=${currentPage - 1}`}`,
            );
          }}
          disabled={currentPage === 1}
          className="w-5 h-5 p-1 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center"
        >
          <ArrowLeftIcon width={5} height={7} />
        </button>
        <p className="px-2 text-label-LG font-medium text-muted-body">
          page {currentPage} of {totalPages}
        </p>
        {/* next page button */}
        <button
          onClick={() => {
            router.push(
              `${search ? `/project/${projectId}/tasks?view=list&page=${currentPage + 1}&search=${search}` : `/project/${projectId}/tasks?view=list&page=${currentPage + 1}`}`,
            );
          }}
          disabled={currentPage === totalPages}
          className="w-5 h-5 p-1 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center"
        >
          <ArrowRightIcon width={5} height={7} />
        </button>
      </div>
    </div>
  );
};

export default PaginationTasks;
