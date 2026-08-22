import { Tasks } from "@/constants/constants";
import { getInitials } from "@/lib/getInitials";
import { formateDeadline } from "@/lib/helper";

import UserIcon from "@/assets/icons/user.svg";

const TasksListRow = ({ task }: { task: Tasks }) => {
  const initials = getInitials(task?.assignee?.name);
  return (
    <tr className="flex w-full items-center justify-center border-t border-background-check-password">
      {/* task id */}
      <td className=" flex items-center">
        <p className="w-43.75 py-4.75 px-6 text-label-LG font-normal text-primary">
          {task.task_id}
        </p>
      </td>
      <td className=" flex items-center w-full ">
        <p className="w-88.75 py-6.5 px-6 text-body-MD font-medium text-slate-dark">
          {task.title}
        </p>
      </td>
      <td className="flex items-center w-full">
        <div className="w-34.5 py-4 px-6">
          <p className="w-fit py-1 px-2 text-label-SM font-bold text-muted-body rounded-lg bg-success">
            {task.status}
          </p>
        </div>
      </td>
      <td className=" flex items-center w-full ">
        {task?.due_date !== null ? (
          <p className="w-32.5 py-4.5 px-6 text-body-MD font-normal text-muted-body">
            {formateDeadline(task?.due_date)}
          </p>
        ) : (
          <p className="w-32.5 py-4.5 px-6 text-body-MD font-normal text-muted-body">
            No Due Date
          </p>
        )}
      </td>
      <td className=" flex items-center w-full">
        {task?.assignee?.name !== null ? (
          <div className="w-35 px-6 flex items-center gap-3 ps-6">
            <div className="w-7 h-7 flex items-center justify-center rounded-xl bg-surface-highest text-label-SM font-bold text-slate-dark">
              {initials}
            </div>
            <p className="text-body-MD font-normal text-slate-dark">
              {task.assignee.name}
            </p>
          </div>
        ) : (
          <div className="w-35 px-6 flex items-center gap-3 ps-6">
            <div className="w-7 h-7 flex items-center justify-center rounded-xl bg-surface-highest text-label-SM font-bold text-slate-dark">
              <UserIcon />
            </div>
            <p className="text-body-MD font-normal text-slate-dark">
              UnAssigned
            </p>
          </div>
        )}
      </td>
    </tr>
  );
};

export default TasksListRow;
