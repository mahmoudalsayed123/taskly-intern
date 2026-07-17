"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "../api/login";
import { useRouter } from "next/navigation";
import { useState } from "react";

const FormLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const loginSchema = z.object({
    email: z.string().trim().email("Please enter a valid email address"),
    password: z.string().min(8, "Password is required"),
    rememberMe: z.boolean().optional(),
  });
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
      reset();
      router.push("/");
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
        {errors.email && (
          <p className="ps-1 pt-1 text-label-SM font-normal text-error">
            {errors.email.message}
          </p>
        )}
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
        <p className="hidden md:block text-body-MD font-medium text-primary cursor-pointer">
          Forgot Password?
        </p>
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
