import { getInitials } from "@/lib/getInitials";
import { useEffect, useState } from "react";
import { getTaskDetails } from "../api/getTaskDetails";
import {  Tasks } from "@/types/types";

import CloseIcon from "@/assets/icons/close.svg";
import CorrectIcon from "@/assets/icons/task-correct.svg";
import EpicIcon from "@/assets/icons/epic-in-task.svg";
import CalendarIcon from "@/assets/icons/date.svg";
import NoUserIcon from "@/assets/icons/noUser.svg";
import { getProjectMember } from "@/features/member/api/getProjectMember";
import { formateDeadline } from "@/lib/helper";

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


  useEffect(() => {
    const fetchProjectMember = async () => {
      const { data, success } = await getProjectMember(projectId);
      if (success) {
      }
    };
    fetchProjectMember();
  }, []);

  if (!task)
    return (
      <div className="flex items-center justify-center py-10">
        <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-primary animate-spin" />
      </div>
    );

  return (
    <div
      className="flex flex-col gap-8 px-6 pb-30 fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-97.5 max-h-165 border-t border-t-surface-40 rounded-t-3xl bg-surface-70 shadow-[0px 25px 50px -12px #00000040]"
      style={{ backdropFilter: "blur(20px)" }}
    >
      <div className="w-full h-5 pb-4 pt-3 flex items-center justify-center">
        <div className="w-12 h-1.5 rounded-xl bg-slate-30 mx-auto"></div>
      </div>

      <div className="flex items-center justify-between pt-3">
        <h4 className="text-label-SM text-slate-dark font-bold">
          {task?.task_id}
        </h4>

        <CloseIcon onClick={closeModal} width={14} height={14} />
      </div>

      <div className="pt-2  flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <p className="text-heading-MD font-bold text-slate-dark">
            {task?.title}
          </p>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 py-2 px-3 rounded-xl bg-success">
              <div className="w-3 h-3">
                <CorrectIcon width={12} height={12} />
              </div>
              <p className="text-label-SM font-bold text-slate-dark">
                {task?.status}
              </p>
            </div>
            <div className="flex items-center gap-1.5 py-2 px-3 rounded-xl bg-surface-highest">
              <EpicIcon width={12} height={12} />
              <p className="text-label-SM font-bold text-slate-medium">
                {task?.epic?.epic_id}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* assignee, reporter due date, created at */}
      <div className="flex flex-col items-start gap-3">
        {/* assignee + due date */}
        <div className="flex items-center justify-start gap-3 w-full">
          {/* assignee */}
          <div className="p-4 rounded-lg bg-background-check-password flex flex-col gap-1">
            <p className="text-label-SM font-bold text-resend-timer">
              ASSINGEE
            </p>
            <div className="flex items-center">
              {initialsAssignee !== null ? (
                <>
                  <div className="rounded-full w-6 h-6 bg-surface-highest text-userName-epic-modal lg:bg-primary lg:text-white flex items-center justify-center text-label-XS font-bold ">
                    {getInitials(task?.assignee?.name) || ""}
                  </div>
                  <p className="text-body-MD font-medium text-slate-dark">
                    {task?.assignee?.name || "Unassigned"}
                  </p>
                </>
              ) : (
                <>
                  <div className="flex items-center">
                    <NoUserIcon width={24} height={24} />
                  </div>
                  <p className="text-body-MD font-medium text-slate-dark">
                    UNASSIGNED
                  </p>
                </>
              )}
            </div>
          </div>
          {/* due date */}
          <div className="p-4 rounded-lg bg-background-check-password flex flex-col gap-1">
            <p className="text-label-SM font-bold text-resend-timer">
              DUE DATE
            </p>
            <div className="flex items-center gap-3">
              <CalendarIcon width={24} height={24} />

              <p className="text-body-MD font-medium text-slate-dark">
                {formateDeadline(task?.due_date)}
              </p>
            </div>
          </div>
        </div>

        {/* created by + created at */}
        <div className="flex  items-center justify-start gap-3 w-full ">
          {/* reporter */}
          <div className="p-4 rounded-lg bg-background-check-password flex flex-col gap-1">
            <p className="text-label-SM font-bold text-resend-timer">
              CREATED BY
            </p>
            <div className="flex items-center">
              <div className="rounded-full w-6 h-6 bg-surface-highest text-userName-epic-modal lg:bg-primary lg:text-white flex items-center justify-center text-label-XS font-bold ">
                {initialsReporter}
              </div>
              <p className="text-body-MD font-medium text-slate-dark">
                {task?.created_by.name}
              </p>
            </div>
          </div>

          {/* created at */}
          <div className="p-4 rounded-lg bg-background-check-password flex flex-col gap-1">
            <p className="text-label-SM font-bold text-resend-timer">
              CREATED AT
            </p>
            <div className="flex items-center gap-3">
              <CalendarIcon width={24} height={24} />

              <p className="text-body-MD font-medium text-slate-dark">
                {formateDeadline(task?.created_at)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* description */}
      <div className="flex flex-col gap-3">
        <p className="text-resend-timer font-bold text-body-MD">DESCRIPTION</p>

        {task?.description ? (
          <div className="w-full p-5 rounded-lg bg-white border border-slate-10 shadow-[0px_1px_2px_0px_#0000000D] ">
            <p className="text-body-MD font-normal text-resend-timer">
              {task?.description}
            </p>
          </div>
        ) : (
          <div className="w-full p-5 rounded-lg bg-white border border-slate-10 shadow-[0px_1px_2px_0px_#0000000D] ">
            <p className="text-body-MD font-normal text-resend-timer">
              No description
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetailsModalMobile;
