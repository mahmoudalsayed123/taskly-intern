import { getTasksList } from "../api/getTasksList";
import TasksListRow from "./TasksListRow";
import { Tasks } from "@/types/types";

const TasksListTable = async ({ projectId }: { projectId: string }) => {
  const { success, data: tasks } = await getTasksList(projectId);
  return (
    <table className="hidden lg:block rounded-lg w-full mt-6 shadow-[0px 1px 2px 0px #0000000D] p-1 rounded-lg">
      <thead className="block w-full h-full surface-low-50 border border-slate-10">
        <tr className="flex w-full items-center justify-center">
          <td className=" flex items-center w-full">
            <p className="w-43.75 py-4.75 px-6 text-label-SM font-bold text-muted-body">
              Task ID
            </p>
          </td>
          <td className=" flex items-center w-full">
            <p className="w-88.75 py-6.5 px-6 text-label-SM font-bold text-muted-body">
              Title
            </p>
          </td>
          <td className=" flex items-center w-full">
            <p className="w-34.5 py-4 px-6 text-label-SM font-bold text-muted-body">
              STATUS
            </p>
          </td>
          <td className=" flex items-center w-full ">
            <p className="w-32.5 py-4.5 px-6 text-label-SM font-bold text-muted-body">
              DUE DATE
            </p>
          </td>
          <td className=" flex items-center w-full ">
            <p className="w-35 px-6 py-4.5 text-label-SM font-bold text-muted-body">
              ASSIGNEE
            </p>
          </td>
        </tr>
      </thead>
      <tbody className="block w-full h-full bg-white">
        {tasks?.map((task: Tasks) => (
          <TasksListRow key={task.id} task={task} />
        ))}
      </tbody>
    </table>
  );
};

export default TasksListTable;
