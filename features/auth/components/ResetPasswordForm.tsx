"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toastFail } from "@/lib/toastFail";
import { toastSuccess } from "@/lib/toastSuccess";
import { resetPasswordSchema } from "@/lib/zodSchema";
import ShowPassword from "@/components/ui/ShowPassword";
import ErrorField from "@/components/ui/ErrorField";
import { checkPassword } from "@/lib/checkPassword";
import { resetPassword } from "../api/resetPassword";
import Spinner from "@/components/ui/Spinner";

const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("access_token");
  const router = useRouter();
  type resetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
  
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<resetPasswordFormValues>({
    mode: "onChange",
    resolver: zodResolver(resetPasswordSchema),
  });

  const password = watch("password");

  const passwordChecks = checkPassword(password);
  const submitForm = async (data: resetPasswordFormValues) => {
    setLoading(true);
    const res = await resetPassword(data.password, token as string);
    if (res.success) {
      setLoading(false);
      toastSuccess("Your password has been updated successfully.");
      reset();
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } else {
      setLoading(false);
      toastFail(res.message || "Failed to reset password");
    }
  };

  if (!token) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-error font-medium text-heading-LG">
          Invalid or expired reset link.
        </p>
      </div>
    );
  }
  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="flex flex-col gap-6 p-8 md:p-0 pb-12 w-full h-full md:mt-0 "
    >
      {/* email */}
      <div className="relative w-full min-h-[78.5px]">
        <label htmlFor="email" className="label">
          NEW PASSWORD
        </label>
        <div className="relative">
          <input
            className="input h-12! rounded-xs! border! border-border-form!"
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
      {/* password */}
      <div className="relative w-full min-h-[78.5px]">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="label">
            CONFIRM PASSWORD
          </label>
        </div>
        <div className="relative">
          <input
            className="input h-12! rounded-xs! border! border-border-form!"
            type="password"
            id="confirmPassword"
            placeholder="Enter your confirm password"
            {...register("confirmPassword")}
          />
        </div>
        <ErrorField message={errors.confirmPassword?.message} />
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
      {/* reset password successfully */}
      <button
        className="w-full btn-primary h-12! rounded-xs! shadow-btn text-body-MD font-semibold "
        style={{
          background: "linear-gradient(99.3deg, #003D9B 0%, #0052CC 100%)",
        }}
        disabled={loading}
        type="submit"
      >
        {loading ? <Spinner content={"Update Password"} /> : "Update Password"}
      </button>

      {/* back to login */}
      <div className="pt-2 flex items-center justify-center w-full">
        <p className="text-body-MD font-medium text-primary">Back to login</p>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
