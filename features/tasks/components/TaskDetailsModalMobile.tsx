import { getInitials } from "@/lib/getInitials";
import { useEffect, useState } from "react";
import { getTaskDetails } from "../api/getTaskDetails";
import { Tasks } from "@/types/types";

const TaskDetailsModalMobile = ({
  projectId,
  taskId,
  closeModal,
}: {
  projectId: string;
  taskId: string;
  closeModal: () => void;
}) => {
  const [task, setTask] = useState<Tasks | null>(null);
  const initialsReporter = getInitials(task?.created_by.name);
  const initialsAssignee = getInitials(task?.assignee.name);

  useEffect(() => {
    const fetchTask = async () => {
      const { data, success } = await getTaskDetails(projectId, taskId);
      if (success && data) {
        setTask(data);
      }
    };
    fetchTask();
  }, [projectId, taskId]);

  if (!task)
    return (
      <div className="flex items-center justify-center py-10">
        <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-primary animate-spin" />
      </div>
    );
  return (
    <section
      className="flex lg:hidden fixed bottom-0 left-1/2 -translate-x-1/2 w-97.5 h-165 border-t border-t-surface-40 rounded-t-3xl bg-red-400 shadow-[0px 25px 50px -12px #00000040]"
      style={{ backdropFilter: "blur(20px)" }}
    >
      <div className="lg:hidden w-12 h-1.5 rounded-xl bg-slate-30 mx-auto"></div>
    </section>
  );
};

export default TaskDetailsModalMobile;
