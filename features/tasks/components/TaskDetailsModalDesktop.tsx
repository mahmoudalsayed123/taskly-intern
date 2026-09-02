"use client";

import { EpicTasks, Member, Tasks } from "@/types/types";
import { useEffect, useRef, useState } from "react";
import { getTaskDetails } from "../api/getTaskDetails";
import Select from "react-select";
import { epicSelectStyles } from "@/constants/selectStyle";
import CopyLink from "@/assets/icons/copy_link.svg";
import { getInitials } from "@/lib/getInitials";
import { formatDateForInput, formateDeadline } from "@/lib/helper";
import { getProjectEpics } from "@/features/epic/api/getProjectEpics";
import { status } from "@/constants/constants";
import { getProjectMember } from "@/features/member/api/getProjectMember";

import DateIcon from "@/assets/icons/date.svg";
import ArrowBottomIcon from "@/assets/icons/arrow-bottom.svg";
import EpicInTask from "@/assets/icons/epic-in-task.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateTaskSchema } from "@/lib/zodSchema";
import z from "zod";
import { updateTask } from "../api/updateTask";
import { toastFail } from "@/lib/toastFail";
import ErrorField from "@/components/ui/ErrorField";

const TaskDetailsModalDesktop = ({
  projectId,
  taskId,
  closeModal,
}: {
  projectId: string;
  taskId: string;
  closeModal: () => void;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [task, setTask] = useState<Tasks | null>(null);
  const [editTitle, setEditTitle] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editDueDate, setEditDueDate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState<{
    title?: string;
    description?: string | null;
    assignee_id?: string | null;
    epic_id?: string | null;
    status?: string | null;
    due_date?: string | null;
  }>({});

  const [epicOptions, setEpicOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [statusSelected, setStatusSelected] = useState<{
    value: string;
    label: string;
  }>({
    value: "",
    label: "",
  });
  const [assigneeSelected, setAssigneeSelected] = useState<{
    value: string | null;
    label: string;
  }>({
    value: null,
    label: "",
  });
  const [epicSelected, setEpicSelected] = useState<{
    value: string | null;
    label: string;
  }>({
    value: null,
    label: "",
  });
  const [assigneeOptions, setAssigneeOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const initialsReporter = getInitials(task?.created_by.name);
  type updateTaskFormValues = z.infer<typeof updateTaskSchema>;
  const {
    register,
    formState: { errors },
  } = useForm<updateTaskFormValues>({
    mode: "onChange",
    resolver: zodResolver(updateTaskSchema),
  });

  // fetch task
  useEffect(() => {
    const fetchTask = async () => {
      const { data, success } = await getTaskDetails(projectId, taskId);
      if (success) {
        setTask(data);
      }
    };
    fetchTask();
  }, [projectId, taskId]);

  // fetch epic
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

  // fetch assignee
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

  // update task
  useEffect(() => {
    async function updatedTask() {
      const res = await updateTask(taskId, dataUpdate);
      if (res.success) {
        setTask((prev) => ({ ...prev!, ...dataUpdate }) as Tasks);
        setEditTitle(false);
        setEditDescription(false);
      }
    }
    updatedTask();
  }, [dataUpdate]);

  // set status selected
  useEffect(() => {
    if (dataUpdate.status) {
      setStatusSelected(
        status.find((item) => item.label === dataUpdate.status) as {
          value: string;
          label: string;
        },
      );
    } else {
      setStatusSelected(
        status.find((item) => item.label === task?.status) as {
          value: string;
          label: string;
        },
      );
    }
  }, [status, task?.status, dataUpdate]);

  // set assignee selected
  useEffect(() => {
    if (dataUpdate.assignee_id) {
      setAssigneeSelected(
        assigneeOptions.find(
          (item) => item.value === dataUpdate.assignee_id,
        ) as {
          value: string;
          label: string;
        },
      );
    } else if (
      task?.assignee?.id &&
      !dataUpdate.assignee_id &&
      dataUpdate.assignee_id !== null
    ) {
      setAssigneeSelected(
        assigneeOptions.find((item) => item.value === task?.assignee?.id) as {
          value: string;
          label: string;
        },
      );
    } else {
      setAssigneeSelected({ value: null, label: "Unassigned" });
    }
  }, [assigneeOptions, task?.assignee?.id, dataUpdate.assignee_id]);

  // set epic selected
  useEffect(() => {
    if (dataUpdate.epic_id) {
      setEpicSelected(
        epicOptions.find((item) => item.value === dataUpdate.epic_id) as {
          value: string | null;
          label: string;
        },
      );
    } else {
      setEpicSelected(
        epicOptions.find((item) => item.value === task?.epic?.id) as {
          value: string | null;
          label: string;
        },
      );
    }
  }, [epicOptions, task?.epic?.id, dataUpdate]);

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
                value={epicSelected}
                {...register("epic_id")}
                onChange={(e) => {
                  if (e?.value === null) {
                    setDataUpdate({ epic_id: null });
                  } else {
                    setDataUpdate({ epic_id: e?.value as string });
                  }
                }}
                formatOptionLabel={(option) => {
                  return (
                    <div className="flex items-center gap-2 ">
                      <EpicInTask />
                      <span>{option.label}</span>
                    </div>
                  );
                }}
                // styles={epicSelectStyles}
              />

              <ErrorField message={errors.epic_id?.message} />
            </div>

            {/* task title */}
            <ErrorField message={errors.title?.message} />
            {editTitle ? (
              <input
                type="text"
                defaultValue={task.title}
                {...register("title")}
                onBlur={(e) => {
                  if (!e.target.value) {
                    setEditTitle(false);
                    return;
                  }
                  setDataUpdate({ title: e.target.value });
                }}
                className="text-display-LG font-bold text-slate-dark w-full focus:outline-none"
              />
            ) : (
              <h4
                onClick={() => setEditTitle(true)}
                className="text-display-LG font-bold text-slate-dark"
              >
                {task.title}
              </h4>
            )}
          </div>

          {/* description */}
          <div className="p-8">
            <div className="flex flex-col gap-3">
              <p className="text-label-SM font-bold text-muted-body">
                Description
              </p>
              <textarea
                disabled={editDescription}
                defaultValue={task?.description || "No Description Provided"}
                {...register("description")}
                onBlur={(e) => {
                  if (!e.target.value) {
                    setEditDescription(false);
                    return;
                  }
                  setDataUpdate({ description: e.target.value });
                }}
                className="w-full h-118 rounded-xl p-3 border border-surface-highest text-body-MD font-normal text-slate-dark resize-none focus:border-slate-light"
              />
              <ErrorField message={errors.description?.message} />
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
            value={statusSelected}
            onChange={(e) => {
              if (!e) return;
              setDataUpdate({ status: e.label });
            }}
            styles={epicSelectStyles}
          />
          <ErrorField message={errors.status?.message} />
        </div>
        {/* assignee + reporter */}
        <div className="w-63.75 flex flex-col gap-6 ">
          {/* assingee */}
          <div className="w-63.75 flex flex-col gap-3">
            <p className="text-label-LG font-bold text-muted-body">ASSIGNEE</p>
            <Select
              options={assigneeOptions}
              value={assigneeSelected}
              onChange={(e) => {
                if (!e) return;
                setDataUpdate({ assignee_id: e.value });
              }}
              placeholder="Unassigned"
              // styles={epicSelectStyles}
            />
            <ErrorField message={errors.assignee_id?.message} />
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
              <div
                onClick={() => {
                  setEditDueDate(true);
                  if (inputRef.current) {
                    inputRef.current.showPicker?.();
                  }
                }}
                className="w-full h-full flex items-center gap-2"
              >
                {!task.due_date && (
                  <p className="text-body-MD font-medium text-slate-dark">
                    No Due Date
                  </p>
                )}
                {task.due_date && <DateIcon />}
                {editDueDate && task.due_date ? (
                  <input
                    type="date"
                    {...register("due_date")}
                    ref={inputRef}
                    defaultValue={formatDateForInput(task?.due_date)}
                    value={formatDateForInput(task?.due_date)}
                    onChange={(e) => {
                      if (!e.target.value) {
                        setEditDueDate(false);
                        return;
                      }
                      setEditDueDate(false);
                      setDataUpdate({ due_date: e.target.value });
                    }}
                    onBlur={(e) => {
                      if (!e.target.value) {
                        setEditDueDate(false);
                        return;
                      }
                      setEditDueDate(false);
                      setDataUpdate({ due_date: e.target.value });
                    }}
                    className="w-full h-full text-body-MD font-medium text-slate-dark border-none outline-none focus:border-none focus:outline-none"
                  />
                ) : (
                  <>
                    <p
                      onClick={() => {
                        setEditDueDate(true);
                        if (inputRef.current) {
                          inputRef.current.showPicker?.();
                        }
                      }}
                      className="text-body-MD font-medium text-slate-dark"
                    >
                      {formateDeadline(task?.due_date)}
                    </p>
                  </>
                )}
                <ErrorField message={errors.due_date?.message} />
                {task.due_date && <ArrowBottomIcon />}
              </div>
            </div>
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
