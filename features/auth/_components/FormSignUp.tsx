"use client";
import ErrorField from "@/components/ui/ErrorField";
import ShowPassword from "@/components/ui/ShowPassword";
import { signUp } from "@/features/auth/api/signup";
import { checkPassword } from "@/lib/checkPassword";
import { toastFail } from "@/lib/toastFail";
import { toastSuccess } from "@/lib/toastSuccess";
import { signUpSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { useRouter } from "next/navigation";

const FormSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  type SignUpFormValues = z.infer<typeof signUpSchema>;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    mode: "onChange",
    resolver: zodResolver(signUpSchema),
  });

  const password = watch("password");

  const passwordChecks = checkPassword(password);

  const submitForm = async (data: SignUpFormValues) => {
    const body = {
      email: data.email,
      password: data.password,
      data: {
        name: data.fullName,
        department: data.jobTitle,
      },
    };
    const result = await signUp(body);

    if (!result.success) {
      toastFail(result.message || "Faild to sign-up");
    }

    if (result.success) {
      toastSuccess(result.message || "Sign-up successfully");
      reset();
      router.replace("/login");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="flex flex-col gap-6 pb-4 w-full h-full md:mt-0 "
    >
      {/* full name */}
      <div className="relative w-full min-h-20">
        <label htmlFor="full-name" className="label">
          Full Name
        </label>
        <input
          className="input"
          type="text"
          id="full-name"
          placeholder="Enter your full name"
          {...register("fullName")}
        />
        <ErrorField message={errors.fullName?.message} />
        <p className="ps-1 pt-1 text-label-SM font-normal text-slate-light">
          3-50 characters, letters only.
        </p>
      </div>
      {/* email */}
      <div className="relative w-full min-h-20">
        <label htmlFor="email" className="label">
          Email
        </label>
        <input
          className="input"
          type="email"
          id="email"
          placeholder="Enter your email"
          {...register("email")}
        />
        <ErrorField message={errors.email?.message} />
      </div>
      {/* job title */}
      <div className="relative w-full min-h-20">
        <label htmlFor="job-title" className="label">
          Job Title
        </label>
        <input
          className="input"
          type="text"
          id="job-title"
          placeholder="Enter your job title"
          {...register("jobTitle")}
        />
        <ErrorField message={errors.jobTitle?.message} />
      </div>
      {/* password and confirm password */}
      <div className="flex flex-col md:flex-row gap-6 ">
        {/* password */}
        <div className="relative w-full min-h-20">
          <label htmlFor="password" className="label">
            Password
          </label>
          <div className="relative">
            <input
              className="input"
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              {...register("password")}
            />
            <ShowPassword
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          </div>
          <ErrorField message={errors.password?.message} />
        </div>
        {/* confirm password */}
        <div className="relative w-full min-h-20">
          <label htmlFor="confirm-password" className="label">
            Confirm Password
          </label>
          <input
            className="input"
            type="password"
            id="password"
            placeholder="Enter your password"
            {...register("confirmPassword")}
          />
          <ErrorField message={errors.confirmPassword?.message} />
        </div>
      </div>
      {/* rules of password */}
      <div className="p-4 rounded-lg flex flex-col gap-2 bg-background-check-password w-full">
        <div className="flex items-center gap-2 w-full">
          <Image
            src={
              passwordChecks.hasMinLength
                ? "/assets/icons/check-true.svg"
                : "/assets/icons/check-pending.svg"
            }
            alt="check"
            width={11.67}
            height={11.67}
          />
          <p className="text-label-SM text-muted-body font-normal">
            At least 8 characters
          </p>
        </div>
        <div className="flex items-center gap-2 w-full">
          <Image
            src={
              passwordChecks.hasUppercase &&
              passwordChecks.hasLowercase &&
              passwordChecks.hasNumber
                ? "/assets/icons/check-true.svg"
                : "/assets/icons/check-pending.svg"
            }
            alt="check"
            width={11.67}
            height={11.67}
          />
          <p className="text-label-SM text-muted-body font-normal">
            One uppercase, lowercase, and digit
          </p>
        </div>
        <div className="flex items-center gap-2 w-full">
          <Image
            src={
              passwordChecks.hasSpecialChar
                ? "/assets/icons/check-true.svg"
                : "/assets/icons/check-pending.svg"
            }
            alt="check"
            width={11.67}
            height={11.67}
          />
          <p className="text-label-SM text-muted-body font-normal">
            One special character
          </p>
        </div>
      </div>
      {/* create account button */}
      <div className="w-full flex justify-center items-center">
        <button
          className="w-full btn-primary shadow-[0px_1px_2px_0px_#0000000D] "
          style={{
            background: "linear-gradient(99.3deg, #003D9B 0%, #0052CC 100%)",
          }}
          type="submit"
        >
          Create Account
        </button>
      </div>
    </form>
  );
};

export default FormSignUp;
