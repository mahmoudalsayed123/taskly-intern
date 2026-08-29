"use client";

import { DragDropProvider } from "@dnd-kit/react";
import { status } from "@/constants/constants";
import TasksColumns from "./TasksColumns";
import { useState } from "react";
import TaskDetailsModalDesktop from "./TaskDetailsModalDesktop";
import { Tasks } from "@/types/types";

import { updateTaskStatus } from "../api/updateTaskStatus";

const TasksBoardView = ({
  projectId,
  search,
}: {
  projectId: string;
  search: string;
}) => {
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

  const handleDragEnd = async (event: any) => {
    if (event.canceled) return;

    const { source, target } = event.operation;

    if (!source || !target) return;

    const taskId = String(source.id);
    const targetId = String(target.id);

    let newStatus = "";

    if (targetId.startsWith("column-")) {
      newStatus = targetId.replace("column-", "");
    } else {
      newStatus = target.group;
    }
    console.log("NEW STATUS:", newStatus);
    if (!newStatus) return;

    console.log("TASK:", taskId);
    console.log("NEW STATUS:", newStatus);

    const result = await updateTaskStatus(taskId, newStatus);

    console.log("UPDATE RESULT:", result);

    if (!result.success) {
      console.error(result.message);
    }
  };
  return (
    <section className="hidden mt-15 px-8 pb-8 pt-0 lg:flex items-center gap-6 overflow-x-scroll board-scroll ">
      <DragDropProvider onDragEnd={handleDragEnd}>
        <div className="flex items-start gap-6 min-w-max">
          {status.map((item) => (
            <TasksColumns
              key={item.value}
              status={item}
              projectId={projectId}
              search={search}
              openTaskModal={handleOpenTaskModal}
            />
          ))}
        </div>
      </DragDropProvider>

      {openModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-overlay/40 backdrop-blur-md"
            onClick={handleCloseModal}
          />
          {/* Modal */}
          <div
            className="fixed top-1/2 left-1/2 z-200 h-212.5 max-h-[90vh] w-4xl max-w-[90vw] -translate-x-1/2 -translate-y-1/2 overflow-y-auto overflow-x-hidden rounded-lg custom-scrollbar bg-red-400 lg:bg-blue-400
  "
          >
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
