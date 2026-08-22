import { Tasks } from "@/constants/constants";
import TaskCardBoard from "./TaskCardBoard";

const TasksListBoard = ({
  tasks,
  openTaskModal,
}: {
  tasks?: Tasks[];
  openTaskModal: (task: Tasks) => void;
}) => {
  return (
    <div className="w-full flex flex-col gap-2">
      {tasks?.map((task) => (
        <TaskCardBoard
          key={task.id}
          task={task}
          openTaskModal={openTaskModal}
        />
      ))}
    </div>
  );
};

export default TasksListBoard;
