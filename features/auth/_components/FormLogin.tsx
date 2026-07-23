"use client";
import Image from "next/image";
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

const FormLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  type loginFormValues = z.infer<typeof loginSchema>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<loginFormValues>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });
  const submitForm = async (data: loginFormValues) => {
    const res = await login(data);
    if (res?.success) {
      toastSuccess("Login successfully");
      reset();
      router.push("/projects");
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
          className="w-full btn-primary shadow-[0px_1px_2px_0px_#0000000D] "
          style={{
            background: "linear-gradient(99.3deg, #003D9B 0%, #0052CC 100%)",
          }}
          type="submit"
        >
          <p className="hidden md:block text-body-MD font-semibold">Login</p>
          <div className="flex md:hidden w-full items-center justify-center gap-2">
            <Image
              src="/assets/icons/arrow-right.svg"
              alt="arrow-right"
              width={10}
              height={10}
            />
            <p className="text-body-MD font-semibold">Sign in</p>
          </div>
        </button>
      </div>
    </form>
  );
};

export default FormLogin;
