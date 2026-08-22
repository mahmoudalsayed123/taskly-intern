"use client";
import { Tasks } from "@/constants/constants";

import { getTasksList } from "../api/getTasksList";
import TaskCardMobile from "./TaskCardMobile";
import { useState, useEffect } from "react";
import TaskDetailsModalDesktop from "./TaskDetailsModalDesktop";

const TaskListMobile = ({ projectId }: { projectId: string }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Tasks | null>(null);
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [loading, setLoading] = useState(true);
  const [successFetch, setSuccessFetch] = useState(false);
  const handleOpenTaskModal = (task: Tasks) => {
    setSelectedTask(task);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
    setOpenModal(false);
  };

  useEffect(() => {
    async function getTasks() {
      const { data, success } = await getTasksList(projectId);
      if (success) {
        setLoading(false);
        setTasks(data);
        setSuccessFetch(true);
      }
      setLoading(false);
    }
    getTasks();
  }, []);

  if (!successFetch) {
    return (
      <div className="flex items-center justify-center py-10">
        <p className="text-error-red">Failed to load tasks</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex lg:hidden flex-col gap-3 mt-10">
      {tasks?.map((task: Tasks) => {
        return (
          <TaskCardMobile
            key={task.id}
            task={task}
            openTaskModal={handleOpenTaskModal}
          />
        );
      })}

      {openModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-overlay/40 backdrop-blur-md"
            onClick={handleCloseModal}
          />

          {/* Modal */}
          <div className="w-full p-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md lg:w-2xl lg:max-w-2xl z-200">
            <TaskDetailsModalDesktop
              projectId={projectId}
              taskId={selectedTask!.id}
              closeModal={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskListMobile;
