"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ErrorPage = () => {
  const router = useRouter();
  return (
    <section className="p-6 lg:p-0 flex items-center justify-center ">
      <div className="w-full h-[calc(100vh-130px)] flex flex-col items-center justify-center gap-5 ">
        <div className="w-16 h-16 bg-invalid rounded-xl flex items-center justify-center">
          <Image
            src="/assets/icons/error-project.svg"
            alt="error"
            width={27.5}
            height={24.75}
          />
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
          className="h-12 flex items-center justify-center gap-2 px-6 py-3 shadow-[0px 1px 2px 0px #0000000D] rounded-xs cursor-pointer
 "
          style={{
            background: "linear-gradient(99.3deg, #003D9B 0%, #0052CC 100%)",
          }}
        >
          <Image
            src="/assets/icons/plus.svg"
            alt="add"
            width={10.5}
            height={10.5}
          />
          <p className="text-body-MD font-medium text-white ">
            Retry Connection
          </p>
        </button>
      </div>
    </section>
  );
};

export default ErrorPage;
