"use client";
import { useEffect, useState } from "react";
import MainHeading from "@/components/layout/MainHeading";
import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";
import { forgotPassword } from "@/features/auth/api/forgot-password";

import ForgotPasswordLock from "@/assets/icons/forgetPass_lock.svg"
import ForgotPasswordCorrect from "@/assets/icons/forgot-pass-correct.svg"
import Clock from "@/assets/icons/clock.svg"

const ForgotPasword = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [resendCount, setResendCount] = useState(0);
  const [data, setData] = useState<string | null>(null);

  // read localStorage
  useEffect(() => {
    const dataFromStorage = localStorage.getItem("forgetPassword");
    if (!dataFromStorage) return;
    setData(dataFromStorage);
    setSuccessMessage(
      "If an account exists with this email, we've sent a password reset link.",
    );

    try {
      const { expireAt, resendCount } = JSON.parse(dataFromStorage);

      const remaining = Math.max(0, Math.floor((expireAt - Date.now()) / 1000));

      setTimeLeft(remaining);
      setResendCount(resendCount);
    } catch {
      localStorage.removeItem("forgetPassword");
    }
  }, [data, successMessage, resendCount]);

  // timer countdown
  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  // resend code function
  const handleResend = async () => {
    console.log("resendCount from page", resendCount);
    const data = localStorage.getItem("forgetPassword");
    if (!data) return;

    const { email } = JSON.parse(data);

    const res = await forgotPassword(email);
    if (res.success) {
      const expireAt = Date.now() + 42 * 1000;

      setResendCount((prev) => prev + 1);

      localStorage.setItem(
        "forgetPassword",
        JSON.stringify({
          expireAt,
          resendCount: resendCount + 1,
          email,
        }),
      );

      setTimeLeft(42);
    }
  };

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  const canResend = timeLeft === 0 && resendCount < 3;

  return (
    <section className="flex flex-col md:items-center gap-6 px-6 pt-13 pb-29 min:h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)]">
      {/* main heading + form  */}
      <div className=" max-w-md p-8 md:p-10 md:flex md:flex-col md:gap-8 rounded-lg shadow-form md:border border-border-form bg-white">
        {/* icon */}
        <div className="w-12 mb-6 mx-auto md:hidden block">
          <div className="w-12 h-12 rounded-xl bg-surface-highest flex items-center justify-center">
             <ForgotPasswordLock className="w-5 h-5" />
          </div>
        </div>
        <div className="text-center md:text-left">
          {" "}
          <MainHeading
            heading="Forgot Password?"
            title="No worries, we'll send you reset
instructions."
            sizeDesktop="heading-LG"
            sizeMobile="heading-MD"
          />
        </div>
        {/* form */}
        <ForgotPasswordForm
          setSuccessMessage={setSuccessMessage}
          setTimeLeft={setTimeLeft}
          resendCount={resendCount}
          timeLeft={timeLeft}
          setResendCount={setResendCount}
        />

        {/* container resend in large screen */}
        {successMessage && data && (
          <div className="hidden md:flex flex-col items-center gap-6 pt-10 ">
            {/* message */}
            {resendCount < 3 && (
              <div className="flex items-start gap-3 p-4 rounded-lg bg-success-20">
                 <ForgotPasswordCorrect className="w-5 h-5" />
                <p className="text-label-SM font-medium text-success-message">
                  {successMessage}
                </p>
              </div>
            )}

            {/* did not recive email + resend timer + action resend button + max resend message */}
            <div className="flex flex-col items-center gap-3 w-full">
              {resendCount < 3 && (
                <p className="text-label-SM font-bold text-muted-body">
                  {" "}
                  Didn't receive the email?
                </p>
              )}
              <div className="flex items-center justify-center gap-2 p-2 bg-surface-low w-full h-12 rounded-sm">
                <ForgotPasswordLock className={ `w-4.5 h-25 ${resendCount <= 3 && `hidden`}`} />
                <button
                  className="text-body-LG font-semibold text-primary"
                  disabled={!canResend}
                  onClick={handleResend}
                >
                  {resendCount > 3 ? (
                    <p className="text-error">
                      You have exceeded the maximum number of resend attempts
                    </p>
                  ) : canResend ? (
                    `Resend (${3 - resendCount} left)`
                  ) : (
                    `Resend in ${minutes}:${seconds}`
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* popup resend in mobile screen */}
      {successMessage && data && (
        <div className="flex md:hidden flex-col gap-3 p-4 rounded-sm bg-success-20">
          {/* message */}
          {resendCount < 3 && (
            <div className="flex items-start gap-3">
              <p className="text-label-SM font-medium text-success-message">
                If an account exists with this email, we've sent a password
                reset link.
              </p>
            </div>
          )}
          {/* resend */}
          <div className="pt-3 flex items-center justify-between border-t border-t-success-border">
            {resendCount < 3 && (
              <p className="text-label-SM font-bold text-do-not-recive">
                Didn't receive email?
              </p>
            )}
            <button
              className="text-label-MD font-semibold text-primary"
              disabled={!canResend}
              onClick={handleResend}
            >
              {resendCount > 3 ? (
                <p className="text-error">
                  You have exceeded the maximum number of resend attempts
                </p>
              ) : canResend ? (
                `Resend (${resendCount} left)`
              ) : (
                `Resend in ${minutes}:${seconds}`
              )}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ForgotPasword;
