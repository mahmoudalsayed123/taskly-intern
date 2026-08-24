"use client";
import { status } from "@/constants/constants";
import TasksColumns from "./TasksColumns";
import { useState } from "react";
import TaskDetailsModalDesktop from "./TaskDetailsModalDesktop";
import { Tasks } from "@/types/types";

const TasksBoardView = ({ projectId }: { projectId: string }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Tasks | null>(null);

  const handleOpenTaskModal = (task: Tasks) => {
    setSelectedTask(task);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
    setOpenModal(false);
  };
  return (
    <section className="hidden mt-15 px-8 pb-8 pt-0 lg:flex items-center gap-6 overflow-x-scroll board-scroll ">
      <div className="flex items-start gap-6 min-w-max">
        {status.map((status) => (
          <TasksColumns
            key={status.value}
            status={status}
            projectId={projectId}
            openTaskModal={handleOpenTaskModal}
          />
        ))}
      </div>

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
    </section>
  );
};

export default TasksBoardView;
