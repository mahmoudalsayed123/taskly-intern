import { status } from "@/constants/constants";
import TasksColumns from "./TasksColumns";

const TasksBoardView = ({ projectId }: { projectId: string }) => {
  return (
    <section className="hidden mt-15 px-8 pb-8 pt-0 lg:flex items-center gap-6 overflow-x-scroll board-scroll ">
      <div className="flex items-start gap-6 min-w-max">
        {status.map((status) => (
          <TasksColumns
            key={status.value}
            status={status}
            projectId={projectId}
          />
        ))}
      </div>
    </section>
  );
};

export default TasksBoardView;
