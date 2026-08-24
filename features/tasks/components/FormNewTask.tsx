"use client";
import { taskStatus } from "@/constants/constants";
import { toastFail } from "@/lib/toastFail";
import { toastSuccess } from "@/lib/toastSuccess";
import { createTaskSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import z from "zod";
import { createTask } from "../api/createTask";
import ErrorField from "@/components/ui/ErrorField";
import { useRouter } from "next/navigation";
import Select from "react-select";
import { useEffect, useState } from "react";
import { selectStyles } from "@/constants/selectStyle";
import { Member } from "@/types/types";

const FormNewTask = ({
  projectId,
  epicId,
  epics,
  members,
}: {
  projectId: string;
  epicId?: string;
  epics: { id: string; epic_id: string; title: string }[];
  members: Member[];
}) => {
  const [selectedAssignee, setSelectedAssignee] = useState<any>(null);
  const [assigneeOptions, setAssigneeOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [selectedStatus, setSelectedStatus] = useState<any>(null);
  const [statusOptions, setStatusOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [selectedEpic, setSelectedEpic] = useState<any>(null);
  const [epicOptions, setEpicOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const router = useRouter();
  type createTaskFormValues = z.infer<typeof createTaskSchema>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createTaskFormValues>({
    mode: "onChange",
    resolver: zodResolver(createTaskSchema),
  });

  useEffect(() => {
    if (members.length) {
      setAssigneeOptions([
        {
          value: "",
          label: "Unassigned",
        },
        ...members.map((member: Member) => ({
          value: member.user_id,
          label: member.metadata.name,
        })),
      ]);
      setStatusOptions([
        ...taskStatus.map((status: string) => ({
          value: status,
          label: status.replace("_", " "),
        })),
      ]);
      setEpicOptions([
        {
          value: "",
          label: "UnSelect Epic...",
        },
        ...epics.map((epic) => ({
          value: epic.id,
          label: epic.epic_id + " " + epic.title,
        })),
      ]);
      const selectedEpic = epicOptions.find(
        (option) => option.value === epicId,
      );
      setSelectedEpic(selectedEpic || epicId);
    }
  }, [members, epics]);

  const submitForm = async (data: createTaskFormValues) => {
    if (data?.due_date === "") {
      delete data.due_date;
    }
    if (data?.description === "") {
      delete data.description;
    }

    const newTask = {
      project_id: projectId,
      assignee_id: selectedAssignee?.value || null,
      status: selectedStatus?.value || "TO_DO",
      epic_id: selectedEpic?.value || null,
      ...data,
    };

    const res = await createTask(newTask);
    if (res.success) {
      toastSuccess("Task created successfully");
      reset();
    } else {
      toastFail(res.message || `Failed to create task: ${res.message}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="flex flex-col gap-6 lg:gap-0 w-full h-full md:mt-0 "
    >
      <div>
        <div className="md:pt-8 md:px-8 md:pb-10 pb-4 flex flex-col gap-8">
          {/* title */}
          <div className="relative w-full min-h-[78.5px] flex flex-col ">
            <label htmlFor="title" className="label">
              <span>TITLE</span>{" "}
              {/* {errors.title && <span className="text-error">*</span>} */}
            </label>
            <input
              className="input h-13! "
              type="text"
              id="title"
              placeholder="e.g., Finalize structural schematics"
              {...register("title")}
            />
            <ErrorField message={errors.title?.message} />
          </div>

          {/* select status and assignee */}
          <div className="flex flex-col lg:flex-row lg-items-center lg:justify-between gap-8">
            {/* select status */}
            <div className="w-full min-h-[78.5px]">
              <label htmlFor="status" className="label">
                Status
              </label>
              <div className="relative">
                <Select
                  options={statusOptions}
                  value={selectedStatus || statusOptions[0]}
                  onChange={(selected) => {
                    setSelectedStatus(selected);
                  }}
                  styles={selectStyles}
                />
                <ErrorField message={errors.status?.message} />
              </div>
            </div>
            {/* select assignee */}
            <div className="w-full min-h-[78.5px]">
              <label htmlFor="assignee_id" className="label">
                Assignee
              </label>
              <div className="relative">
                <Select
                  options={assigneeOptions}
                  value={selectedAssignee}
                  onChange={(selected) => {
                    setSelectedAssignee(selected);
                  }}
                  styles={selectStyles}
                />
                <ErrorField message={errors.assignee_id?.message} />
              </div>
            </div>
          </div>

          {/* select epic */}
          <div className="w-full min-h-[78.5px]">
            <label htmlFor="epic_id" className="label">
              Epic
            </label>
            <div className="relative">
              <Select
                options={epicOptions}
                value={selectedEpic}
                onChange={(selected) => {
                  setSelectedEpic(selected);
                }}
                styles={selectStyles}
              />
              <ErrorField message={errors.epic_id?.message} />
            </div>
          </div>

          {/* select date */}
          <div className="w-full min-h-[78.5px]">
            <label htmlFor="deadline" className="label">
              <span>DEADLINE</span>
            </label>
            <div className="relative">
              <input
                onClick={(e) => {
                  e.currentTarget.showPicker?.();
                }}
                className="input h-13!"
                type="date"
                id="due_date"
                {...register("due_date")}
              />
              <Image
                src="/assets/icons/date.svg"
                alt="date"
                width={10.5}
                height={11.67}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              />
              <ErrorField message={errors.due_date?.message} />
            </div>
          </div>

          {/* description */}
          <div className="relative w-full">
            <div className="flex items-center justify-between">
              <label htmlFor="description" className="label">
                Description
              </label>
            </div>
            <div className="relative">
              <textarea
                className="input pt-3! lg:pb-27! pb-21! px-4! rounded-sm! placeholder:text-body-MD resize-none"
                id="description"
                placeholder="Describe the scope and objectives of this epic..."
                {...register("description")}
              />
            </div>
            {errors.description && (
              <div className="flex items-center gap-1 mt-2">
                <Image
                  src="/assets/icons/exclamation-mark-error.svg"
                  alt="error"
                  width={13}
                  height={13}
                />
                <ErrorField message={errors.description?.message} />
              </div>
            )}
          </div>
        </div>
        {/* creat project and back buttons */}
        <div className="w-full p-4 flex items-center justify-end gap-3 shadow-[0px_-8px_24px_0px_#041B3C0F] backdrop-blur-24px bg-[#FFFFFFCC] lg:shadow-none lg:bg-transparent lg:backdrop-blur-none ">
          <div className="w-full lg:w-fit flex flex-col gap-4 lg:flex-row-reverse lg:items-center lg:justify-end lg:pt-8 lg:border-t lg:border-border-slate-10">
            <button
              className="btn-primary-mobile w-full! lg:w-fit! btn-primary-desktop h-14! lg:h-fit!"
              type="submit"
            >
              Create Task
            </button>
            <button
              onClick={() => router.back()}
              className="btn-secondary-mobile w-full! lg:w-fit! lg:btn-secondary-desktop h-12! lg:h-fit!"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormNewTask;
