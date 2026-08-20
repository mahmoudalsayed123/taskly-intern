import { Tasks } from "@/constants/constants";
import TaskCardBoard from "./TaskCardBoard";

const TasksListBoard = ({ tasks }: { tasks?: Tasks[] }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      {tasks?.map((task) => (
        <TaskCardBoard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TasksListBoard;
