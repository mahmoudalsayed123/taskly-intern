"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "../api/login";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toastFail } from "@/lib/toastFail";
import { toastSuccess } from "@/lib/toastSuccess";
import { loginSchema } from "@/lib/zodSchema";
import ShowPassword from "@/components/ui/ShowPassword";
import ErrorField from "@/components/ui/ErrorField";
import Link from "next/link";

import ArrowRightIcon from "@/assets/icons/arrow-right.svg";
import Spinner from "@/components/ui/Spinner";

const FormLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  type loginFormValues = z.infer<typeof loginSchema>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<loginFormValues>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const submitForm = async (data: loginFormValues) => {
    const res = await login(data);
    if (res.success) {
      toastSuccess("Login successfully");
      reset();
      router.push("/project");
    } else {
      toastFail(res.message || "Failed to login");
    }
  };
  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="flex flex-col gap-6 pb-4 w-full h-full md:mt-0 "
    >
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
        <ErrorField message={errors.email?.message} />
      </div>
      {/* password */}
      <div className="relative w-full min-h-[78.5px]">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="label">
            Password
          </label>
          <p className="md:hidden block text-label-SM font-bold text-primary cursor-pointer">
            Forgot?
          </p>
        </div>
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
      {/* Remember me && forget password */}
      <div className="py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="remmber-me"
            className="w-4 h-4 rounded-xs border bg-surface-low border-slate-light cursor-pointer"
            {...register("rememberMe")}
          />
          <p className="text-body-MD font-medium text-muted-body">
            Remember Me
          </p>
        </div>
        <Link
          href="/forgot-password"
          className="hidden md:block text-body-MD font-medium text-primary cursor-pointer"
        >
          Forgot Password?
        </Link>
      </div>
      {/* Login successfully */}
      <div className="w-full flex justify-center items-center">
        <button
          className="btn-primary-desktop btn-primary-mobile"
          type="submit"
        >
          {isSubmitting ? (
            <Spinner content="login" />
          ) : (
            <p className="hidden lg:block text-body-MD font-semibold">Login</p>
          )}
          <div className="flex lg:hidden w-full items-center justify-center gap-2">
            {isSubmitting ? (
              <Spinner content="login" />
            ) : (
              <>
                <ArrowRightIcon />
                <p className="text-body-MD font-semibold">Sign in</p>
              </>
            )}
          </div>
        </button>
      </div>
    </form>
  );
};

export default FormLogin;
