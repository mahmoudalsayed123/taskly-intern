"use client";
import { Epic, EpicTasks, Member } from "@/constants/constants";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { getEpicDetails } from "../api/getEpicDetails";
import { getInitials } from "@/lib/getInitials";
import { getProjectMember } from "@/features/member/api/getProjectMember";
import { formateDeadline } from "@/lib/helper";
import { updateEpic } from "../api/updateEpic";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateEpicSchema } from "@/lib/zodSchema";
import ErrorField from "@/components/ui/ErrorField";
import { getEpicTasks } from "../api/getEpicTasks";
import EpicTasksListMobile from "./EpicTasksListMobile";
import Link from "next/link";
import EpicTasksListDesktop from "./EpicTasksListDesktop";

const EpicModal = ({
  projectId,
  epicId,
  openModal,
  setOpenModal,
}: {
  projectId: string;
  epicId: string;
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [epic, setEpic] = useState<Epic | null>(null);
  const [tasks, setTasks] = useState<EpicTasks[]>([]);
  const [selectedAssignee, setSelectedAssignee] = useState<any>(null);
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    [],
  );
  const [updateTitle, setUpdateTitle] = useState(false);
  const [updateDescription, setUpdateDescription] = useState(false);
  const [dataUpdated, setDataUpdated] = useState<{
    title?: string;
    description?: string;
    assignee_id?: string;
    deadline?: string;
  }>({});
  const [updateDeadline, setUpdateDeadline] = useState(false);

  const initials = epic ? getInitials(epic.created_by.name) : "";

  type updateEpicFormValues = z.infer<typeof updateEpicSchema>;
  const {
    register,
    formState: { errors },
  } = useForm<updateEpicFormValues>({
    mode: "onChange",
    resolver: zodResolver(updateEpicSchema),
  });

  useEffect(() => {
    async function getEpic() {
      const epicResponse = await getEpicDetails(projectId, epicId);
      if (epicResponse.success) {
        setEpic(epicResponse?.data);
      }

      const memberResponse = await getProjectMember(projectId);
      if (memberResponse.success) {
        setOptions([
          {
            value: null,
            label: "Unassigned",
            initials: "",
          },
          ...memberResponse.data.map((member: Member) => ({
            value: member.user_id,
            label: member.metadata.name,
            initials: getInitials(member.metadata.name),
          })),
        ]);
      }
    }
    getEpic();
  }, [projectId, epicId]);

  useEffect(() => {
    async function epicTasks() {
      const tasksResponse = await getEpicTasks(epicId);
      if (tasksResponse.success) {
        console.log(tasksResponse?.data);
        setTasks(tasksResponse?.data);
      }
    }
    epicTasks();
  }, [epicId]);

  useEffect(() => {
    async function epicUpdated() {
      const res = await updateEpic(epicId, dataUpdated);
      if (res.success) {
        setEpic((prev) => ({ ...prev!, ...dataUpdated }));
        setUpdateTitle(false);
        setUpdateDescription(false);
        setUpdateDeadline(false);
        const selected =
          options.find((option) => option.value === dataUpdated.assignee_id) ??
          options[0];
        setSelectedAssignee(selected);
      }
    }
    epicUpdated();
  }, [dataUpdated]);

  useEffect(() => {
    if (epic && options.length) {
      const selected =
        options.find((option) => option.value === epic?.assignee?.sub) ??
        options[0];
      setSelectedAssignee(selected);
    }
  }, [options]);

  return (
    <div
      className={` w-full  max-w-md max-h-198.75 lg:w-2xl lg:max-w-2xl lg:min-h-230.25  bg-white rounded-lg shadow-[0px_25px_50px_-12px_#00000040] z-200  ${openModal ? "block" : "hidden"} `}
    >
      {/* main heading */}
      <div className="p-6 pb-4 lg:p-8  rounded-lg flex flex-col gap-3  lg:border-b lg:border-slate-15 lg:bg-white">
        {/* epic id, copy link, close */}
        <div className="w-full  flex items-center justify-between">
          {/* epic id */}
          <p className=" text-label-SM font-bold text-primary-container">
            {epic?.epic_id}
          </p>
          {/* copy link, close */}
          <div className="flex items-center gap-3">
            {/* copy link */}
            <div className="flex items-center gap-1 p-1.5">
              {/* <Image
                src={"/assets/icons/copy-link.svg"}
                alt="link"
                width={15}
                height={7.5}
              /> */}
              <p className="text-label-SM font-medium text-muted-body">Copy</p>
            </div>

            {/* close */}
            {/* <Image
              src={"/assets/icons/close.svg"}
              alt="close"
              width={14}
              height={14}
              className="cursor-pointer"
              onClick={() => setOpenModal(false)}
            /> */}
          </div>
        </div>
        {/* epic title  */}
        {updateTitle ? (
          <>
            <input
              type="text"
              defaultValue={epic?.title}
              {...register("title")}
              onBlur={(e) => {
                if (!e.target.value) {
                  setUpdateTitle(false);
                  return;
                }
                setUpdateTitle(false);
                setDataUpdated({ title: e.target.value });
              }}
              className="w-full outline-none text-body-MD p-2 border border-slate-50 rounded-lg font-semibold text-primary-container"
            />
            <ErrorField message={errors.title?.message} />
          </>
        ) : (
          <h3
            className="w-full text-body-MD font-semibold text-slate-dark p-2 border border-slate-50 rounded-lg"
            onClick={() => {
              setUpdateTitle(true);
            }}
          >
            {epic?.title}
          </h3>
        )}
      </div>

      {/* main content */}
      <div className="p-6 lg:p-8 flex flex-col gap-5">
        {/* description */}
        <div className="flex flex-col gap-2">
          <p className="lg:hidden text-label-SM font-bold text-slate-medium">
            DESCRIPTION
          </p>
          <div
            className={`cursor-pointer w-full h-27.5 rounded-lg  border border-slate-50 ${updateDescription ? "p-0" : "p-2"}`}
          >
            {updateDescription ? (
              <>
                <textarea
                  defaultValue={epic?.description}
                  {...register("description")}
                  onBlur={(e) => {
                    if (!e.target.value) {
                      setUpdateDescription(false);
                      return;
                    }
                    setUpdateDescription(false);
                    setDataUpdated({ description: e.target.value });
                  }}
                  className={`resize-none cursor-pointer outline-none w-full h-full rounded-lg p-2 border border-slate-50 text-body-MD font-normal  ${updateDescription ? "text-slate-medium" : "text-slate-dark"}`}
                />
                <ErrorField message={errors.description?.message} />
              </>
            ) : (
              <p
                onClick={() => setUpdateDescription(true)}
                className="w-full h-full text-label-SM lg:text-body-MD font-normal text-slate-dark"
              >
                {epic?.description
                  ? epic?.description
                  : "No description provided"}
              </p>
            )}
          </div>
        </div>

        {/* created by, assignee, deadline, created at in mobile screen */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {/* created by */}
          <div className="w-full flex flex-col gap-2 col-span-1 ">
            <p className="text-label-SM font-bold text-slate-medium">
              Created By
            </p>
            <div className="flex items-center gap-2">
              <div className="rounded-xl w-6 h-6 lg:w-7 lg:h-7 bg-surface-highest text-userName-epic-modal lg:bg-primary lg:text-white flex items-center justify-center text-label-SM font-bold ">
                {initials}
              </div>
              <p className="text-label-SM lg:text-body-MD font-medium text-slate-dark">
                {epic?.created_by.name}
              </p>
            </div>
          </div>
          {/* assignee */}
          <div className="w-full flex flex-col gap-2 col-span-1 ">
            <p className="text-label-SM font-bold text-slate-medium">
              ASSIGNEE
            </p>
            <Select
              options={options}
              value={selectedAssignee}
              {...register("assignee_id")}
              onChange={(e) => {
                if (e?.value === null) {
                  setDataUpdated({
                    assignee_id: "",
                  });
                  return;
                }
                setDataUpdated({
                  assignee_id: e?.value,
                });
              }}
              placeholder="Unassigned"
              formatOptionLabel={(option) =>
                option?.value === null ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-head-table flex items-center justify-center">
                      {/* <Image
                        src="/assets/icons/noUser.svg"
                        alt="Unassigned"
                        width={11.56}
                        height={11.56}
                      /> */}
                    </div>

                    <span className="text-label-SM lg:text-body-MD font-medium text-slate-medium">
                      {option.label}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="rounded-xl w-6 h-6 lg:w-7 lg:h-7 bg-surface-highest text-userName-epic-modal lg:bg-primary lg:text-white flex items-center justify-center text-label-SM font-bold ">
                      {initials}
                    </div>
                    <span className="text-label-SM lg:text-body-MD font-medium text-slate-dark">
                      {option?.label}
                    </span>
                  </div>
                )
              }
              styles={{
                indicatorSeparator: () => ({
                  display: "none",
                }),
                placeholder: (base) => ({
                  ...base,
                  fontSize: "11px",
                  fontWeight: 500,
                  color: "#667085",
                }),

                singleValue: (base) => ({
                  ...base,
                  fontSize: "11px",
                  fontWeight: 500,
                  color: "#667085",
                }),
                menu: (base) => ({
                  ...base,
                  borderRadius: "8px",
                  border: "1px solid #E2E8F0",
                  overflow: "hidden",
                  boxShadow: "0px 8px 24px rgba(15, 23, 42, 0.08)",
                }),

                menuList: (base) => ({
                  ...base,
                  padding: "8px",
                }),

                option: (base, state) => ({
                  ...base,
                  display: "flex",
                  alignItems: "center",
                  marginTop: "8px",
                  marginBottom: "8px",
                  padding: "8px",
                  borderRadius: "8px",
                  fontSize: "11px",
                  fontWeight: 500,
                  cursor: "pointer",

                  backgroundColor: state.isSelected
                    ? "#f1f3ff"
                    : state.isFocused
                      ? "#F8FAFC"
                      : "#FFFFFF",

                  color: state.isSelected ? "#FFFFFF" : "#475467",

                  ":active": {
                    backgroundColor: "#E6F0FF",
                  },
                }),

                noOptionsMessage: (base) => ({
                  ...base,
                  color: "#98A2B3",
                  fontSize: "14px",
                  padding: "12px",
                }),
              }}
            />
            <ErrorField message={errors.assignee_id?.message} />
          </div>

          {/* deadline */}
          <div
            onClick={() => {
              setUpdateDeadline(true);
              if (inputRef.current) {
                inputRef.current.showPicker?.();
              }
            }}
            className="w-full flex flex-col gap-2 col-span-1 pt-2 lg:pt-0"
          >
            <p className="text-label-SM font-bold text-slate-medium">
              DEADLINE
            </p>
            <div className="w-37.75 h-10 flex items-center justify-between border border-slate-50 rounded-lg p-2 ">
              <div className="flex items-center gap-2">
                {/* <Image
                  src="/assets/icons/date-primary.svg"
                  alt="date"
                  width={13.5}
                  height={15}
                  className="cursor-pointer"
                /> */}
                {updateDeadline ? (
                  <>
                    <input
                      {...register("deadline")}
                      ref={inputRef}
                      onChange={(e) => {
                        if (!e.target.value) {
                          setUpdateDeadline(false);
                          return;
                        }
                        setUpdateDeadline(false);
                        setDataUpdated({ deadline: e.target.value });
                      }}
                      onBlur={(e) => {
                        console.log("blurring", e.target.value);
                        if (!e.target.value) {
                          setUpdateDeadline(false);
                          return;
                        }
                        setUpdateDeadline(false);
                        setDataUpdated({ deadline: e.target.value });
                      }}
                      id="deadline"
                      type="date"
                      value={formateDeadline(epic?.deadline || "")}
                      className="text-label-SM text-muted-body font-medium outline-none"
                    />
                    <ErrorField message={errors.deadline?.message} />
                  </>
                ) : (
                  <p
                    onClick={() => {
                      setUpdateDeadline(true);
                      if (inputRef.current) {
                        inputRef.current.showPicker?.();
                      }
                    }}
                    className="text-label-SM lg:text-body-MD text-slate-dark font-medium"
                  >
                    {formateDeadline(epic?.deadline || "")}
                  </p>
                )}
              </div>
              {/* <Image
                src="/assets/icons/arrow-bottom.svg"
                alt="calendar"
                width={20}
                height={20}
              /> */}
            </div>
          </div>

          {/* created at */}
          <div className="w-full flex flex-col gap-2 col-span-1 pt-2 lg:pt-0">
            <p className="text-label-SM font-bold text-slate-medium">
              Created AT
            </p>
            <div className="flex items-center gap-2">
              {/* <Image
                src="/assets/icons/date-primary.svg"
                alt="date"
                width={13.5}
                height={15}
              /> */}
              <p className="text-label-SM lg:text-body-MD font-medium text-slate-dark">
                {formateDeadline(epic?.created_at || "")}
              </p>
            </div>
          </div>
        </div>

        {/* container tasks */}
        <div className="flex flex-col gap-4 lg:gap-6">
          {/* container no tasks */}
          <div className="flex items-center justify-between">
            <p className="text-label-SM font-bold text-slate-medium lg:text-title-MD">
              Tasks
            </p>
            <div className="py-0.5 px-2 lg:p-0 rounded-xl bg-head-table lg:bg-transparent">
              <p className="lg:hidden text-label-SM font-bold text-muted-body">
                <span>0</span> TASKS
              </p>
              <div className="lg:flex hidden py-1.5 px-3 items-center gap-1 rounded-xs cursor-pointer ">
                {/* <Image
                  src="/assets/icons/plus-primary.svg"
                  alt="add"
                  width={10.5}
                  height={10.5}
                /> */}
                <p className="text-body-MD font-bold text-primary-container">
                  ADD TASK
                </p>
              </div>
            </div>
          </div>

          {/* epic task container */}
          {tasks.length === 0 && (
            <div className="w-full flex flex-col p-8 lg:p-12 border-dashed border-2 border-slate-30 bg-surface-low-50 rounded-lg">
              {/* icon container */}
              <div className="w-full h-15 flex items-center justify-center mb-4 lg:mb-0">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-head-table">
                  {/* <Image
                    src="/assets/icons/list.svg"
                    alt="list"
                    width={18}
                    height={16}
                  /> */}
                </div>
              </div>
              {/* text container */}
              <div className="w-full mb-4 flex items-center  justify-center">
                <p className="w-50 lg:w-full text-center text-body-MD font-normal text-slate-medium lg:text-body-LG lg:text-slate-dark lg:line-clamp-1">
                  No tasks have been added to this epic yet
                </p>
              </div>
              {/* button container */}
              <div className="w-full flex items-center justify-center">
                <button
                  className="w-fit flex items-center gap-2 py-2 lg:py-2.5 px-4 lg:px-6 rounded-xs shadow-shadow-btn text-white cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(99.3deg, var(--color-primary) 0%, var(--color-primary-container) 100%)",
                  }}
                >
                  {/* <Image
                    src="/assets/icons/plus.svg"
                    alt="add"
                    width={10.5}
                    height={10.5}
                    className="w-[10.5px] h-[10.5px] lg:w-3.5 lg:h-3.5"
                  /> */}
                  <span className="text-label-SM lg:text-body-LG font-bold">
                    Add task
                  </span>
                </button>
              </div>
            </div>
          )}

          <div className="w-full flex flex-col lg:border lg:border-slate-15 rounded-lg ">
            {/* task card container mobile */}
            {tasks && <EpicTasksListMobile tasks={tasks} />}

            {/* button add task in mobile screen only */}
            <Link
              href={`/project/${projectId}/tasks?epic_id=${epicId}`}
              className="mt-3 flex items-center justify-center gap-2 lg:hidden py-4 rounded-lg border-2 border-dashed border-slate-30"
            >
              {/* <Image
                src="/assets/icons/plus-with-circle.svg"
                alt="add"
                width={15}
                height={15}
              /> */}
              <p className="text-label-SM font-bold text-muted-body-60 uppercase">
                ADD NEW TASK
              </p>
            </Link>
            {/* button container */}
            <Link
              href={`/project/${projectId}/tasks/new?epic_id=${epic?.id}`}
              className="w-full flex items-center justify-center"
            >
              <button
                className="w-fit flex items-center gap-2 py-2 lg:py-2.5 px-4 lg:px-6 rounded-xs shadow-shadow-btn text-white cursor-pointer"
                style={{
                  background:
                    "linear-gradient(99.3deg, var(--color-primary) 0%, var(--color-primary-container) 100%)",
                }}
              >
                <Image
                  src="/assets/icons/plus.svg"
                  alt="add"
                  width={10.5}
                  height={10.5}
                  className="w-[10.5px] h-[10.5px] lg:w-3.5 lg:h-3.5"
                />
                <span className="text-label-SM lg:text-body-LG font-bold">
                  Add task
                </span>
              </button>
            </Link>

            {/* task card container desktop */}
            {tasks && <EpicTasksListDesktop tasks={tasks} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpicModal;
