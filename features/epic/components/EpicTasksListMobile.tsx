import { EpicTasks } from "@/constants/constants";
import { getInitials } from "@/lib/getInitials";
import { formateDeadline } from "@/lib/helper";
import Image from "next/image";

const EpicTasksListMobile = ({ tasks }: { tasks: EpicTasks[] }) => {
  return (
    <div className="flex lg:hidden flex-col gap-3">
      {tasks.map(({ id, title, assignee, due_date }) => {
        const initials = getInitials(assignee?.name);
        return (
          <div
            key={id}
            className="flex flex-col gap-3 border border-background-check-password bg-white p-4 rounded-lg shadow-[0px 1px 2px 0px #0000000D]"
          >
            <h4 className="text-body-MD font-semibold text-slate-dark">
              {title}
            </h4>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {initials ? (
                  <>
                    <div className="rounded-xl w-6 h-6 lg:w-7 lg:h-7 bg-surface-highest text-userName-epic-modal lg:bg-primary lg:text-white flex items-center justify-center text-label-SM font-bold ">
                      {initials}
                    </div>
                    <p className="text-label-SM font-medium text-muted-body">
                      {assignee?.name}
                    </p>
                  </>
                ) : (
                  <>
                    {/* <Image
                      src="/assets/icons/noUser.svg"
                      width={15}
                      height={15}
                      alt="no user"
                    /> */}
                    <p className="text-label-SM font-medium text-muted-body">
                      Unassigned
                    </p>
                  </>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                {/* <Image
                  src="/assets/icons/date.svg"
                  alt="date"
                  width={10.5}
                  height={11.67}
                /> */}
                <p className="text-label-SM font-bold text-muted-body-70">
                  {formateDeadline(due_date)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EpicTasksListMobile;
