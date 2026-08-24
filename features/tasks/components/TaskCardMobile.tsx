import { formateDeadline } from "@/lib/helper";
import { getInitials } from "@/lib/getInitials";
import NoUser from "@/assets/icons/noUser.svg";
import { Tasks } from "@/types/types";

const TaskCardMobile = ({
  task,
  openTaskModal,
}: {
  task: Tasks;
  openTaskModal: (task: Tasks) => void;
}) => {
  const initials = getInitials(task.assignee?.name);
  return (
    <div
      onClick={() => openTaskModal(task)}
      className="p-3 rounded-lg bg-white flex flex-col gap-3 shadow-[0px 4px 24px 0px #041B3C0A]"
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <p className="text-label-SM text-bold text-muted-body-30">
            {task.task_id}
          </p>
          <h4 className="text-title-MD font-medium text-slate-dark">
            {task.title}
          </h4>
        </div>
        <p className="rounded-xs py-0.5 px-2 bg-success text-label-SM font-bold text-slate-dark">
          {task.status}
        </p>
      </div>
      <div
        className={`flex items-start gap-3`}
      >
        {task.assignee?.name ? (
          <div className="rounded-full w-6 h-6 bg-surface-highest text-userName-epic-modal lg:bg-primary lg:text-white flex items-center justify-center text-label-XS font-bold ">
            {initials}
          </div>
        ) : (
          <div className="rounded-full w-6 h-6 bg-surface-highest text-userName-epic-modal lg:bg-primary lg:text-white flex items-center justify-center text-label-XS font-bold">
            <div className="w-5 h-5 flex items-center justify-center">
              <NoUser
                width={20}
                height={20}
                className="flex items-center justify-center"
              />
            </div>
          </div>
        )}

        <div className="flex flex-col">
          {task.due_date !== null ? (
            <>
              <p className="text-label-SM font-bold text-muted-body-60">
                DUE DATE
              </p>
              <p className="text-label-LG font-medium text-slate-dark">
                {formateDeadline(task.due_date)}
              </p>
            </>
          ) : (
            <p className="text-label-LG font-medium text-slate-dark">
              No Due Date
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCardMobile;
