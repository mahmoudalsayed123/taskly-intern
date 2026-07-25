"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toastFail } from "@/lib/toastFail";
import { forgotPasswordSchema } from "@/lib/zodSchema";
import ErrorField from "@/components/ui/ErrorField";
import { forgotPassword } from "../api/forgot-password";
import { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "@/components/ui/Loader";

type ForgotPasswordFormProps = {
  setSuccessMessage: (message: string | null) => void;
  setTimeLeft: (time: number) => void;
  resendCount: number;
  timeLeft: number;
  setResendCount: (count: (prev: number) => number) => void;
};

const ForgotPasswordForm = ({
  setSuccessMessage,
  setTimeLeft,
  resendCount,
  timeLeft,
  setResendCount,
}: ForgotPasswordFormProps) => {
  const [loading, setLoading] = useState(false);
  const [remaindCodeTime, setRemaindCodeTime] = useState<number | null>(null);

  // read localStorage
  useEffect(() => {
    const data = localStorage.getItem("forgetPassword");
    setRemaindCodeTime(data ? JSON.parse(data).remaindCodeTime : null);
  }, []);

  // schema validation
  type forgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

  // form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<forgotPasswordFormValues>({
    mode: "onChange",
    resolver: zodResolver(forgotPasswordSchema),
  });

  // submit form
  const submitForm = async (data: forgotPasswordFormValues) => {
    setLoading(true);
    if (resendCount >= 3) {
      setLoading(false);
      toastFail("You have exceeded the maximum number of resend attempts");
      return;
    }

    // api call
    const res = await forgotPassword(data.email);
    if (res.success) {
      const expireAt = Date.now() + 42 * 1000;

      setResendCount((prev) => prev + 1);

      localStorage.setItem(
        "forgetPassword",
        JSON.stringify({
          expireAt,
          resendCount: resendCount + 1,
          email: data.email,
        }),
      );

      setTimeLeft(42);
      setLoading(false);
      setSuccessMessage(
        "If an account exists with this email, we've sent a password reset link.",
      );
    } else {
      setLoading(false);
      setSuccessMessage(res?.message || "Failed to send reset password email");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="flex flex-col gap-6 w-full h-full md:mt-0 "
    >
      {/* email */}
      <div className="relative w-full min-h-[78.5px]">
        <label htmlFor="email" className="label">
          Email
        </label>
        <input
          className="input py-3.5! px-4! rounded-xs!"
          type="email"
          id="email"
          placeholder="Enter your email"
          {...register("email")}
        />
        <ErrorField message={errors.email?.message} />
      </div>
      {/* send email */}
      <button
        disabled={loading || timeLeft !== 0}
        className="w-full btn-primary mb-4! shadow-btn text-body-MD font-semibold flex items-center justify-center disabled:opacity-50"
        style={{
          background: "linear-gradient(99.3deg, #003D9B 0%, #0052CC 100%)",
        }}
        type="submit"
      >
        {loading ? <Loading /> : "Send Reset Link"}
      </button>

      <div className="pt-6 flex items-center gap-2 text-primary mx-auto">
        <Image
          src="/assets/icons/arrow-left.svg"
          alt="arrow-left"
          width={12}
          height={12}
        />
        <Link href="/login" className="text-body-MD font-medium">
          Back to log in
        </Link>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
