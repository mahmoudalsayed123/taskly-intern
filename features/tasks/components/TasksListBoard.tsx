import { Tasks } from "@/types/types";
import TaskCardBoard from "./TaskCardBoard";

const TasksListBoard = ({
  tasks,
  status,
  openTaskModal,
}: {
  tasks?: Tasks[];
  status: string;
  openTaskModal: (task: Tasks) => void;
}) => {
  return (
    <div className="w-full flex flex-col gap-2">
      {tasks?.map((task, index) => (
        <TaskCardBoard
          key={task.id}
          task={task}
          index={index}
          status={status}
          openTaskModal={openTaskModal}
        />
      ))}
    </div>
  );
};

export default TasksListBoard;
