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
  const [task, setTask] = useState<Tasks  | null>(null);
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
  return <div>TaskDetailsModalMobile</div>;
};

export default TaskDetailsModalMobile;
