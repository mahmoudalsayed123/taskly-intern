import { EpicTasks } from "@/constants/constants";
import { formateDeadline } from "@/lib/helper";
import { getInitials } from "@/lib/getInitials";

import NoUser from "@/assets/icons/noUser.svg";
import Date from "@/assets/icons/date.svg";

const EpicTasksListDesktop = ({ tasks }: { tasks: EpicTasks[] }) => {
  return (
    <div className="w-full flex flex-col lg:border lg:border-slate-15 rounded-lg">
      {tasks.map(({ id, title, assignee, due_date }) => {
        const initialize = getInitials(assignee?.name);
        return (
          <div
            key={id}
            className="w-full flex items-center justify-between gap-1 p-4 border-b border-b-slate-15"
          >
            <div className="flex flex-col gap-1">
              <h4 className="text-body-LG font-medium text-slate-dark">
                {title}
              </h4>
              <div className="flex items-center gap-2">
                {initialize ? (
                  <>
                    <div className="rounded-xl w-5 h-5 bg-surface-highest text-userName-epic-modal text-initialize flex items-center justify-center font-bold">
                      {initialize}
                    </div>
                    <p className="text-label-LG text-slate-dark-60 font-normal">
                      {assignee?.name}
                    </p>
                  </>
                ) : (
                  <>
                    <NoUser />
                    <p className="text-label-SM font-medium text-muted-body">
                      Unassigned
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Date />
              <p className="text-label-SM font-bold text-muted-body-70">
                {formateDeadline(due_date)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EpicTasksListDesktop;
