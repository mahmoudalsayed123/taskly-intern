"use client";
import { useRouter } from "next/navigation";
import ErrorIcon from "@/assets/icons/error-project.svg";

const ErrorPage = () => {
  const router = useRouter();
  return (
    <section className="p-6 lg:p-0 flex items-center justify-center ">
      <div className="w-full h-[calc(100vh-130px)] flex flex-col items-center justify-center gap-5 ">
        <div className="w-16 h-16 bg-invalid rounded-xl flex items-center justify-center">
          <ErrorIcon width={27.5} height={24.75} />
        </div>
        <h2 className="text-heading-SM font-semibold text-slate-dark text-center">
          Something went wrong
        </h2>
        <p className="w-full lg:max-w-md text-center text-body-MD text-muted-body">
          We're having trouble retrieving your projects right now. Please try
          again in a moment.
        </p>
        <button
          onClick={() => router.refresh()}
          className="btn-primary-desktop btn-primary-mobile w-fit!
 "
        >
          <p className="text-body-MD font-medium text-white ">
            Retry Connection
          </p>
        </button>
      </div>
    </section>
  );
};

export default ErrorPage;
