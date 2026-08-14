"use client";
import ErrorField from "@/components/ui/ErrorField";
import { createEpicSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { toastSuccess } from "@/lib/toastSuccess";
import { toastFail } from "@/lib/toastFail";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createEpic } from "../api/createEpic";
import { useEffect, useState } from "react";
import { getProjectMember } from "@/features/member/api/getProjectMember";
import { Member } from "@/constants/constants";
import { formatDateForApi } from "@/lib/helper";

const FormNewEpic = ({ projectId }: { projectId: string }) => {
  const [assignee, setAssignee] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function getAssignees() {
      const res = await getProjectMember(projectId);

      if (res.success) {
        setAssignee(res.data);
      }
    }
    getAssignees();
  }, []);
  type createEpicFormValues = z.infer<typeof createEpicSchema>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createEpicFormValues>({
    mode: "onChange",
    resolver: zodResolver(createEpicSchema),
  });

  const submitForm = async (data: createEpicFormValues) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const formatedDate = formatDateForApi(today);
    const newEpic = {
      title: data?.title,
      description: data?.description,
      assignee_id: data?.assignee_id || "",
      project_id: projectId,
      deadline: data?.deadline || formatedDate,
    };

    const res = await createEpic(newEpic);
    if (res.success) {
      toastSuccess("Epic created successfully");
      reset();
    } else {
      toastFail(res.message || `Failed to create epic: ${res.message}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="flex flex-col gap-6 lg:gap-0 pb-4 w-full h-full md:mt-0 "
    >
      <div className="md:pt-8 md:px-8 md:pb-10 flex flex-col gap-8">
        {/* name */}
        <div className="relative w-full min-h-[78.5px] flex flex-col ">
          <label htmlFor="title" className="label">
            <span>TITLE</span>{" "}
            {errors.title && <span className="text-error">*</span>}
          </label>
          <input
            className="input h-13! "
            type="text"
            id="title"
            placeholder="e.g. Structural Schematic Phase"
            {...register("title")}
          />
          <ErrorField message={errors.title?.message} />
        </div>
        {/* description */}
        <div className="relative w-full min-h-[78.5px]">
          <div className="flex items-center justify-between">
            <label htmlFor="description" className="label">
              Description
            </label>
          </div>
          <div className="relative">
            <textarea
              className="input h-44! lg:h-37! placeholder:text-body-MD"
              id="description"
              placeholder="Describe the scope and objectives of this epic..."
              {...register("description")}
            />
          </div>
          {errors.description && (
            <div className="flex items-center gap-1 mt-2">
              {/* <Image
                src="/assets/icons/exclamation-mark-error.svg"
                alt="error"
                width={13}
                height={13}
              /> */}
              <ErrorField message={errors.description?.message} />
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row lg-items-center lg:justify-between gap-8">
          {/* select assignee */}
          <div className="w-full min-h-[78.5px]">
            <label htmlFor="assignee_id" className="label">
              Assignee
            </label>
            <div className="relative">
              <select
                id="assignee_id"
                className="input h-13!"
                {...register("assignee_id")}
              >
                <option value="">select an member...</option>
                {assignee?.map((item: Member) => (
                  <option key={item.user_id} value={item?.user_id}>
                    {item.metadata?.name}
                  </option>
                ))}
              </select>
              {/* <Image
                src="/assets/icons/arrow-bottom.svg"
                alt="arrow"
                width={24}
                height={24}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              /> */}
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
                id="deadline"
                {...register("deadline")}
              />
              {/* <Image
                src="/assets/icons/date.svg"
                alt="date"
                width={10.5}
                height={11.67}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              /> */}
            </div>
            <ErrorField message={errors.deadline?.message} />
          </div>
        </div>
        {/* creat project and back buttons */}
        <div className="flex items-center justify-end">
          <div className="w-full lg:w-fit flex flex-col gap-4 lg:flex-row-reverse lg:items-center lg:justify-end lg:pt-8 lg:border-t lg:border-border-slate-10">
            <button
              className="btn-primary-mobile w-full! lg:w-fit! lg:btn-primary-desktop"
              type="submit"
            >
              Create Epic
            </button>
            <button
              onClick={() => router.back()}
              className="btn-secondary-mobile w-full! lg:w-fit! lg:btn-secondary-desktop"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormNewEpic;
