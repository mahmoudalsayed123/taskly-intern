"use client";
import Link from "next/link";
import TasksListBoard from "./TasksListBoard";
import { getTasksByStatus } from "../api/getTasksByStatus";
import { Tasks } from "@/types/types";
import { useEffect, useState } from "react";

import PlusWithCircleIcon from "@/assets/icons/plus-with-circle.svg";
import PlusSecondaryIcon from "@/assets/icons/plus-slate.svg";
import { statusBackgroundColors } from "@/constants/constants";

type Status = {
  label: string;
  value: string;
};
const TasksColumns = ({
  status,
  projectId,
  openTaskModal,
}: {
  status: Status;
  projectId: string;
  openTaskModal: (task: Tasks) => void;
}) => {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  useEffect(() => {
    const fetchTasks = async () => {
      const { data, success } = await getTasksByStatus(projectId, status.label);
      if (success && data) {
        setTasks(data);
      }
    };
    fetchTasks();
  }, [projectId, status.label]);

  return (
    <div className="w-72 flex flex-col gap-4 shrink-0">
      {/* status title, plus add task */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 ">
          <div
            className={`w-2 h-2 rounded-full ${statusBackgroundColors[status.label as keyof typeof statusBackgroundColors]}`}
          ></div>
          <span className="text-label-SM font-bold text-task-label">
            {status.label}
          </span>
          <p
            className={`py-0.5 px-1.5 rounded-xs text-label-SM font-normal text-slate-dark`}
          >
            {tasks.length}
          </p>
        </div>
        <Link href={`/project/${projectId}/tasks/new?status=${status.value}`}>
          <PlusSecondaryIcon />
        </Link>
      </div>
      <Link
        href={`/project/${projectId}/tasks/new?status=${status.value}`}
        className="flex items-center justify-center gap-2 py-4 rounded-lg border-2 border-dashed border-slate-30"
      >
        <PlusWithCircleIcon />
        <p className="text-label-SM font-bold text-muted-body-60 uppercase">
          ADD NEW TASK
        </p>
      </Link>
      {/* tasks list */}
      <TasksListBoard tasks={tasks} openTaskModal={openTaskModal} />
    </div>
  );
};

export default TasksColumns;
