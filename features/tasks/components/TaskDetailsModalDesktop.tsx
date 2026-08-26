"use client";

import { EpicTasks, Member, Tasks } from "@/types/types";
import { useEffect, useState } from "react";
import { getTaskDetails } from "../api/getTaskDetails";
import Select from "react-select";
import { epicSelectStyles } from "@/constants/selectStyle";
import CopyLink from "@/assets/icons/copy_link.svg";
import { getInitials } from "@/lib/getInitials";
import { formateDeadline } from "@/lib/helper";
import { getProjectEpics } from "@/features/epic/api/getProjectEpics";
import { status } from "@/constants/constants";
import { getProjectMember } from "@/features/member/api/getProjectMember";

import DateIcon from "@/assets/icons/date.svg";
import ArrowBottomIcon from "@/assets/icons/arrow-bottom.svg";
import EpicInTask from "@/assets/icons/epic-in-task.svg";

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
  const [epicOptions, setEpicOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [assigneeOptions, setAssigneeOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const initialsReporter = getInitials(task?.created_by.name);

  useEffect(() => {
    const fetchTask = async () => {
      const { data, success } = await getTaskDetails(projectId, taskId);
      if (success) {
        setTask(data);
      }
    };
    fetchTask();
  }, [projectId, taskId]);

  useEffect(() => {
    const fetchEpics = async () => {
      const { data, success } = await getProjectEpics(projectId);
      if (success) {
        setEpicOptions([
          {
            epic_id: null,
            value: null,
            label: "No Epic",
          },
          ...data.map((epic: EpicTasks) => ({
            epic_id: epic.epic_id,
            value: epic.id,
            label: epic.title,
          })),
        ]);
      }
    };
    fetchEpics();
  }, [projectId, taskId]);

  useEffect(() => {
    const fetchProjectMember = async () => {
      const { data, success } = await getProjectMember(projectId);
      if (success) {
        setAssigneeOptions([
          {
            value: null,
            label: "Unassigned",
          },
          ...data.map((member: Member) => ({
            value: member.user_id,
            label: member.metadata.name,
          })),
        ]);
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
    <div className="hidden lg:flex w-full items-start bg-white rounded-lg">
      {/* left side */}
      <div className="w-full min-w-0 flex flex-col">
        {/* task id, select, task title */}
        <div>
          <div className="flex flex-col gap-2 py-6 px-8 border-b border-background-check-password">
            <div className="flex items-center gap-3">
              {/* task id */}
              <p className="rounded-xs py-0.5 px-2 bg-surface-low text-label-LG font-bold text-primary">
                {task.task_id}
              </p>

              {/* epic select */}
              <Select
                options={epicOptions}
                value={epicOptions.find(
                  (item) => item.value === task?.epic?.id,
                )}
                formatOptionLabel={(option) => {
                  return (
                    <div className="flex items-center gap-2 ">
                      <EpicInTask />
                      <span>{option.label}</span>
                    </div>
                  );
                }}
                styles={epicSelectStyles}
              />
            </div>

            {/* task title */}
            <h4 className="text-display-LG font-bold text-slate-dark">
              {task.title}
            </h4>
          </div>

          {/* description */}
          <div className="p-8">
            <div className="flex flex-col gap-3">
              <p className="text-label-SM font-bold text-muted-body">
                Description
              </p>
              <textarea
                value={task.description}
                className="w-full h-118 rounded-xl p-3 border border-surface-highest text-body-MD font-normal text-slate-dark resize-none focus:border-slate-light"
              />
            </div>
          </div>
        </div>

        {/* copy link and close button */}
        <div className="py-4 px-8 bg-surface-low flex items-center justify-between">
          {/* copy link */}
          <div className="flex items-center gap-3 py-1.5 px-3 rounded-xs cursor-pointer">
            <CopyLink />
            <p className="text-body-MD font-medium text-muted-body">
              Copy link
            </p>
          </div>
          {/* close button */}
          <button
            onClick={closeModal}
            className="py-2 px-4 rounded-sm bg-surface-highest text-body-MD font-semibold text-slate-dark cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
      {/* right side */}
      <div className="sticky top-0 h-[90vh] w-80 shrink-0 p-8 flex flex-col gap-10 border-s border-background-check-password bg-surface-low">
        {/* status */}
        <div className="w-63.75 flex flex-col gap-4">
          <p className="text-label-LG font-bold text-muted-body">STATUS</p>
          <Select
            options={status}
            value={status.find((option) => option.label === task?.status)}
            styles={epicSelectStyles}
          />
        </div>
        {/* assignee + reporter */}
        <div className="w-63.75 flex flex-col gap-6 ">
          {/* assingee */}
          <div className="w-63.75 flex flex-col gap-3">
            <p className="text-label-LG font-bold text-muted-body">ASSIGNEE</p>
            <Select
              options={assigneeOptions}
              value={assigneeOptions.find(
                (option) => option.value === task?.assignee?.id,
              )}
              placeholder="Unassigned"
              styles={epicSelectStyles}
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
          <div className="flex flex-col gap-3">
            <p className="text-label-LG font-bold text-muted-body">DUE DATE</p>
            <div className="flex items-center justify-between gap-3 p-2 border border-surface-highest bg-white rounded-lg">
              <div className="flex items-center gap-2">
                <DateIcon />
                <p className="text-body-MD font-medium text-slate-dark">
                  {formateDeadline(task?.due_date)}
                </p>
              </div>
              <ArrowBottomIcon />
            </div>
            {/* <input
              type="date"
              value={formatDateForInput(task?.due_date)}
              id="due_date"
            /> */}
          </div>
          {/* create at */}
          <div className="flex items-center justify-between">
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
