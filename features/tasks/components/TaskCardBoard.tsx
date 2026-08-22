import { Tasks } from "@/constants/constants";
import { getInitials } from "@/lib/getInitials";
import { formateDeadline } from "@/lib/helper";
import Image from "next/image";

const TaskCardBoard = ({ task, openTaskModal }: {
  task: Tasks;
  openTaskModal: (task: Tasks) => void;
}) => {
  const initials = task?.assignee?.name
    ? getInitials(task?.assignee?.name)
    : "Unassigneed";

  const today = new Date();
    today.setHours(0, 0, 0, 0);
    

  return (
    <div
      onClick={() => openTaskModal(task)}
      className="w-full flex flex-col gap-4 p-4 rounded-lg bg-white border border-slate-10 shadow-[0px 2px 8px 0px #00000005] cursor-pointer
"
    >
      <h5 className="text-body-MD font-medium text-slate-dark">{task.title}</h5>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {task.due_date !== null ? (
            <>
              {/* <Image
                src={"/assets/icons/date.svg"}
                alt="date"
                width={9}
                height={10}
              /> */}
              <p className="text-label-XS font-normal text-task-date">
                {new Date(task?.due_date) === today
                  ? "Today"
                  : formateDeadline(task?.due_date)}
              </p>
            </>
          ) : (
            <p className="text-label-XS font-normal text-task-date">
              No Deadline
            </p>
          )}
        </div>
        {task?.assignee?.name !== null ? (
          <div className="rounded-full w-6 h-6 bg-surface-highest text-userName-epic-modal lg:bg-primary lg:text-white flex items-center justify-center text-label-XS font-bold ">
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
