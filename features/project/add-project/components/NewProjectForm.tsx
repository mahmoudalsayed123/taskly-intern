"use client";
import MainHeading from "@/components/layout/MainHeading";
import ErrorField from "@/components/ui/ErrorField";
import { createProjectSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { toastSuccess } from "@/lib/toastSuccess";
import { toastFail } from "@/lib/toastFail";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createProject } from "../api/createProject";

const NewProjectForm = () => {
  const router = useRouter();
  type createProjectFormValues = z.infer<typeof createProjectSchema>;
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<createProjectFormValues>({
    mode: "onChange",
    resolver: zodResolver(createProjectSchema),
  });
  const description = watch("description");
  const descriptionLength = description?.length || 0;
  const submitForm = async (data: createProjectFormValues) => {
    const res = await createProject(data);
    if (res.success) {
      toastSuccess("Project created successfully");
      reset();
    } else {
      toastFail(res.message || `Failed to create project: ${res.message}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="flex flex-col gap-6 lg:gap-0 pb-4 w-full h-full md:mt-0 "
    >
      {/* main heading in form container - desktop */}
      <div className="hidden lg:flex items-center gap-4  lg:pt-8 lg:px-8 lg:pb-10 border-b border-b-surface-low">
        <div className="w-11.5 h-11 p-3 flex items-center justify-center rounded-sm bg-primary-10">
          <Image
            src="/assets/icons/init-project.svg"
            alt="back"
            width={22}
            height={22}
          />
        </div>
        <div className=" flex flex-col">
          <h1 className="lg:text-heading-MD font-semibold text-slate-dark">
            Initialize New Project
          </h1>
          <p className=" text-body-MD font-normal text-slate-medium">
            Define the scope and foundational details of your project.
          </p>
        </div>
      </div>
      <div className="lg:pt-8 lg:px-8 lg:pb-10 flex flex-col gap-8">
        {/* name */}
        <div className="relative w-full min-h-[78.5px] ">
          <label htmlFor="name" className="label">
            <span>Project TITLE</span>{" "}
            {errors.name && <span className="text-error">*</span>}
          </label>
          <input
            className="input h-13! lg:h-13!"
            type="text"
            id="name"
            placeholder="Enter your name"
            {...register("name")}
          />
          <ErrorField message={errors.name?.message} />
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
              placeholder="Provide a high-level overview of the project's architectural objectives and 
key milestones..."
              {...register("description")}
            />
            <p className="w-full text-right pt-2 text-slate-medium text-label-SM">
              {descriptionLength}/500
            </p>
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
        {/* creat project and back buttons */}
        <div className="w-full pt-4 lg:pt-0 flex flex-col gap-4 lg:gap-0 justify-center items-center  lg:flex-row-reverse lg:justify-between">
          <button
            className="w-full lg:w-40.5! lg:h-11! btn-primary lg:px-8! lg:py-3! lg:rounded-sm! shadow-[0px_1px_2px_0px_#0000000D] font-bold! text-body-MD! "
            style={{
              background: "linear-gradient(99.3deg, #003D9B 0%, #0052CC 100%)",
            }}
            type="submit"
          >
            Create Project
          </button>
          <button
            onClick={() => router.back()}
            className="w-full lg:w-24! lg:h-11! lg:pt-3! lg:px-4! font-bold! text-body-MD! text-slate-medium! cursor-pointer"
          >
            Back
          </button>
        </div>
      </div>
    </form>
  );
};

export default NewProjectForm;
