"use client";
import { signUp } from "@/features/auth/api/signup";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const FormSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const signUpSchema = z
    .object({
      fullName: z
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters")
        .max(50, "Name must not exceed 50 characters")
        .regex(
          /^(?!.*\s{2,})[\p{L}]+(?:\s[\p{L}]+)*$/u,
          "Name can only contain letters and single spaces",
        ),

      email: z.string().trim().email("Please enter a valid email address"),

      password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(64, "Password must not exceed 64 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(
          /[!@#$%^&*(),.?":{}|<>]/,
          "Password must contain at least one special character",
        )
        .regex(/^\S+$/, "Password must not contain spaces"),

      confirmPassword: z.string(),

      jobTitle: z
        .string()
        .trim()
        .max(100, "Job title must not exceed 100 characters")
        .optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

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

  const passwordChecks = {
    hasMinLength: password?.length >= 8,

    hasUppercase: /[A-Z]/.test(password),

    hasLowercase: /[a-z]/.test(password),

    hasNumber: /[0-9]/.test(password),

    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

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
    console.log("result", result);
    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="flex flex-col gap-6 pb-4 w-full h-full md:mt-0 "
    >
      {/* full name */}
      <div className="relative w-full min-h-[78.5px]">
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
        {errors.fullName && (
          <p className="ps-1 pt-1 text-label-SM font-normal text-error">
            {errors.fullName.message}
          </p>
        )}
        <p className="ps-1 pt-1 text-label-SM font-normal text-slate-light">
          3-50 characters, letters only.
        </p>
      </div>
      {/* email */}
      <div className="relative w-full min-h-[78.5px]">
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
        {errors.email && (
          <p className="ps-1 pt-1 text-label-SM font-normal text-error">
            {errors.email.message}
          </p>
        )}
      </div>
      {/* job title */}
      <div className="relative w-full min-h-[78.5px]">
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
        {errors.jobTitle && (
          <p className="ps-1 pt-1 text-label-SM font-normal text-error">
            {errors.jobTitle.message}
          </p>
        )}
      </div>
      {/* password and confirm password */}
      <div className="flex flex-col md:flex-row gap-6 ">
        {/* password */}
        <div className="relative w-full min-h-[78.5px]">
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
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? (
                <Image
                  src="/assets/icons/eye-open.svg"
                  alt="eye-open"
                  width={22}
                  height={15}
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <Image
                  src="/assets/icons/eye-close.svg"
                  alt="eye-close"
                  width={22}
                  height={15}
                  onClick={() => setShowPassword(true)}
                />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="ps-1 pt-1 text-label-SM font-normal text-error">
              {errors.password.message}
            </p>
          )}
        </div>
        {/* confirm password */}
        <div className="relative w-full min-h-[78.5px]">
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
          {errors.confirmPassword && (
            <p className="ps-1 pt-1 text-label-SM font-normal text-error">
              {errors.confirmPassword.message}
            </p>
          )}
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
