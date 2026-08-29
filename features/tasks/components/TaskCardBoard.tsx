"use client";

import { useSortable } from "@dnd-kit/react/sortable";

import { getInitials } from "@/lib/getInitials";
import { formateDeadline } from "@/lib/helper";
import { Tasks } from "@/types/types";

const TaskCardBoard = ({
  task,
  index,
  status,
  openTaskModal,
}: {
  task: Tasks;
  index: number;
  status: string;
  openTaskModal: (task: Tasks) => void;
}) => {
  const sortable = useSortable({
    id: task.id,
    index,
    group: status,
  });

  const initials = task?.assignee?.name
    ? getInitials(task.assignee.name)
    : "Unassigned";

  return (
    <div
      ref={sortable.ref}
      onClick={() => {
        if (!sortable.isDragging) {
          openTaskModal(task);
        }
      }}
      className={`
        w-full
        flex
        flex-col
        gap-4
        p-4
        rounded-lg
        bg-white
        border
        border-slate-10
        shadow-[0px_2px_8px_0px_#00000005]
        cursor-grab
        ${sortable.isDragging ? "opacity-50" : ""}
      `}
    >
      <h5 className="text-body-MD font-medium text-slate-dark">{task.title}</h5>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <p className="text-label-XS font-normal text-task-date">
            {task.due_date ? formateDeadline(task.due_date) : "No Deadline"}
          </p>
        </div>

        {task?.assignee?.name ? (
          <div className="rounded-full w-6 h-6 bg-primary text-white flex items-center justify-center text-label-XS font-bold">
            {initials}
          </div>
        ) : (
          <p className="text-label-XS font-normal text-task-date">Unassigned</p>
        )}
      </div>
    </div>
  );
};

export default TaskCardBoard;
