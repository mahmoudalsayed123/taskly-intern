import Image from "next/image";
import Link from "next/link";
import TasksListBoard from "./TasksListBoard";
import { getTasksByStatus } from "../api/getTasksByStatus";
type Status = {
  label: string;
  value: string;
  color: string;
  numTasksColor: string;
};
const TasksColumns = async ({
  status,
  projectId,
}: {
  status: Status;
  projectId: string;
}) => {
  const statusValue = status.value.replace("_", " ");
  const { data: tasks, success } = await getTasksByStatus(
    projectId,
    status.label,
  );
  return (
    <div className="w-72 flex flex-col gap-4 shrink-0">
      {/* status title, plus add task */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 ">
          <div className={`w-2 h-2 rounded-full ${status.color}`}></div>
          <span className="text-label-SM font-bold text-task-label">
            {status.label}
          </span>
          <p
            className={`py-0.5 px-1.5 rounded-xs text-label-SM font-normal text-slate-dark ${status.numTasksColor}`}
          >
            {" "}
            2
          </p>
        </div>
        <button>
          {/* <Image
            src="/assets/icons/plus-slate.svg"
            alt="add task"
            width={10.5}
            height={10.5}
          /> */}
        </button>
      </div>
      <Link
        // href={`/project/${projectId}/tasks?epic_id=${epicId}`}
        href={"/"}
        className="flex items-center justify-center gap-2 py-4 rounded-lg border-2 border-dashed border-slate-30"
      >
        {/* <Image
          src="/assets/icons/plus-with-circle.svg"
          alt="add"
          width={15}
          height={15}
        /> */}
        <p className="text-label-SM font-bold text-muted-body-60 uppercase">
          ADD NEW TASK
        </p>
      </Link>
      {/* tasks list */}
      <TasksListBoard tasks={tasks} />
    </div>
  );
};

export default TasksColumns;
