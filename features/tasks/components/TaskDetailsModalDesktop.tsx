"use client";

import { Tasks } from "@/types/types";
import { useEffect, useState } from "react";
import { getTaskDetails } from "../api/getTaskDetails";
import Select from "react-select";
import { taskViewSelectStyles } from "@/constants/selectStyle";
import CopyLink from "@/assets/icons/copy_link.svg";
import { getInitials } from "@/lib/getInitials";
import { formateDeadline } from "@/lib/helper";

const TaskDetailsModalDesktop = ({
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
    <div className="w-4xl max-w-4xl h-217.5 bg-white rounded-lg max-h-[90vh] overflow-y-auto flex items-center">
      {/* left side */}
      <div className="w-full h-full">
        <div className="flex flex-col gap-2 py-6 px-8 border-b border-background-check-password">
          <div className="flex items-center gap-3">
            <p className="rounded-xs py-0.5 px-2 bg-surface-low text-label-LG font-bold text-primary">
              {task.task_id}
            </p>
            <Select
              // options={viewOptions}
              // value={viewOptions.find(
              //   (option) => option.value === selectedView,
              // )}
              placeholder="Board View"
              // onChange={(option) => {
              //   const newView = option?.value;
              //   router.push(`/project/${projectId}/tasks?view=${newView}`);
              // }}
              //   formatOptionLabel={(option) => {
              //     return (
              //       <div className="flex items-center gap-4">
              //         {/* <Image
              //   src={option.icon || "/assets/icons/board.svg"}
              //   alt="icon"
              //   width={option.width}
              //   height={option.height}
              // /> */}

              //         <span>{option.label}</span>
              //       </div>
              //     );
              //   }}
              styles={taskViewSelectStyles}
            />
          </div>
          <h4 className="text-display-LG font-bold text-slate-dark">
            {task.title}
          </h4>
        </div>
        <div className="p-8">
          <div className="flex flex-col gap-3">
            <p className="text-label-SM font-bold text-muted-body">
              Description
            </p>
            <textarea
              rows={6}
              value={task.description}
              className="w-full h-118 rounded-xl p-3 border border-surface-highest text-body-MD font-normal text-slate-dark resize-none focus:border-slate-light"
            />
          </div>
        </div>
        <div className="py-4 px-8 bg-surface-low flex items-center justify-between">
          <div className="flex items-center gap-3 py-1.5 px-3 rounded-xs cursor-pointer">
            <CopyLink />
            <p className="text-body-MD font-medium text-muted-body">
              Copy link
            </p>
          </div>
          <button
            onClick={closeModal}
            className="py-2 px-4 rounded-sm bg-surface-highest text-body-MD font-semibold text-slate-dark cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
      {/* right side */}
      <div className="w-[320px] h-full p-8 flex flex-col gap-10 border-s border-background-check-password bg-surface-low">
        {/* status */}
        <div className="w-63.75 flex flex-col gap-4">
          <p className="text-label-LG font-bold text-muted-body">STATUS</p>
          <Select
            // options={viewOptions}
            // value={viewOptions.find(
            //   (option) => option.value === selectedView,
            // )}
            placeholder="Board View"
            // onChange={(option) => {
            //   const newView = option?.value;
            //   router.push(`/project/${projectId}/tasks?view=${newView}`);
            // }}
            //   formatOptionLabel={(option) => {
            //     return (
            //       <div className="flex items-center gap-4">
            //         {/* <Image
            //   src={option.icon || "/assets/icons/board.svg"}
            //   alt="icon"
            //   width={option.width}
            //   height={option.height}
            // /> */}

            //         <span>{option.label}</span>
            //       </div>
            //     );
            //   }}
            styles={taskViewSelectStyles}
          />
        </div>
        {/* assignee + reporter */}
        <div className="w-63.75 flex flex-col gap-6 ">
          {/* assingee */}
          <div className="w-63.75 flex flex-col gap-3">
            <p className="text-label-LG font-bold text-muted-body">ASSIGNEE</p>
            <Select
              // options={viewOptions}
              // value={viewOptions.find(
              //   (option) => option.value === selectedView,
              // )}
              placeholder="Board View"
              // onChange={(option) => {
              //   const newView = option?.value;
              //   router.push(`/project/${projectId}/tasks?view=${newView}`);
              // }}
              //   formatOptionLabel={(option) => {
              //     return (
              //       <div className="flex items-center gap-4">
              //         {/* <Image
              //   src={option.icon || "/assets/icons/board.svg"}
              //   alt="icon"
              //   width={option.width}
              //   height={option.height}
              // /> */}

              //         <span>{option.label}</span>
              //       </div>
              //     );
              //   }}
              styles={taskViewSelectStyles}
            />
          </div>
          {/* reporter */}
          <div className="w-63.75 flex flex-col gap-3">
            <p className="text-label-LG font-bold text-muted-body">REPORTER</p>
            <div className="flex items-center gap-3">
              <div className="rounded-full w-6 h-6 bg-surface-highest text-userName-epic-modal lg:bg-primary lg:text-white flex items-center justify-center text-label-XS font-bold ">
                {initialsReporter}
              </div>
              <p className="text-body-MD font-medium text-slate-dark">
                {task.created_by.name}
              </p>
            </div>
          </div>
        </div>

        {/* due date + create at */}
        <div className="w-63.75 flex flex-col gap-4 border-t border-slate-20 pt-4">
          {/* due date */}
          <div>
            <p className="text-label-LG font-bold text-muted-body">DUE DATE</p>
            <input
              type="date"
              value={formateDeadline(task.due_date)}
              className="input"
            />
          </div>
          {/* create at */}
          <div>
            <p className="text-label-LG font-bold text-muted-body">
              CREATED AT
            </p>
            <p className="text-body-MD font-medium text-slate-dark">
              {formateDeadline(task.created_at)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModalDesktop;
