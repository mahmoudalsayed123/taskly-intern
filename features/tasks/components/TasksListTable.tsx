"use client";

import { useEffect, useState } from "react";
import { getTasksList } from "../api/getTasksList";
import TasksListRow from "./TasksListRow";
import { Tasks } from "@/types/types";
import { useSearchParams } from "next/navigation";

const TasksListTable = ({ projectId }: { projectId: string }) => {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const searchTask = searchParams.get("search");
  console.log("searchTask", searchTask);

  useEffect(() => {
    async function getTasks() {
      setLoading(true);
      if (searchTask) {
        const {
          success,
          data: tasks,
          message,
        } = await getTasksList(projectId, searchTask);
        if (success) {
          setTasks(tasks);
          console.log("filterd tasks", tasks);
          setLoading(false);
          setError("");
        } else {
          setError(message || "Failed to search tasks");
          setLoading(false);
        }
      } else {
        const {
          data: tasks,
          success,
          message,
        } = await getTasksList(projectId, "");
        if (success) {
          setTasks(tasks);
          console.log("all tasks", tasks);
          setLoading(false);
          setError("");
        } else {
          setError(message || "Failed to fetch tasks");
          setLoading(false);
        }
      }
    }
    getTasks();
  }, [searchTask]);

  return (
    <section>
      {loading ? (
        <div className="col-span-2 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-primary animate-spin" />
        </div>
      ) : (
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
      )}

      {tasks.length === 0 && searchTask && (
        <div className="col-span-2 flex items-center justify-center">
          <p className="text-slate-medium">
            No tasks found matching your search
          </p>
        </div>
      )}

      {error && (
        <div className="col-span-2 flex items-center justify-center">
          <p className="text-slate-medium">{error}</p>
        </div>
      )}
    </section>
  );
};

export default TasksListTable;
