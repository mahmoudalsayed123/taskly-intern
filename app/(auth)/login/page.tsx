import MainHeading from "@/components/layout/MainHeading";
import FormLogin from "@/features/auth/components/FormLogin";
import Link from "next/link";
const login = () => {
  return (
    <section className="flex flex-col px-6 pb-18.5 h-[calc(100vh-24px)] md:min-h-[calc(100vh-70px)]">
      <div className="pt-8 mb-10 md:hidden">
        <MainHeading
          heading="Welcome Back"
          title="Please enter your details to access your workspace"
          sizeDesktop="display-MD"
          sizeMobile="heading-MD"
        />
      </div>
      {/* form sign up container for desktop's */}
      <section className="md:w-full md:mt-17.5 md:flex md:items-center md:justify-center md:pb-10 ">
        <div className="w-full md:p-12 rounded-lg flex md:flex-col md:items-center gap-2 md:max-w-120 md:shadow-[0px_24px_48px_0px_#041B3C0F] md:bg-white">
          {/* main heading for desktop */}
          <div className="hidden mb-10 md:flex justify-center items-center">
            <MainHeading
              heading="Welcome Back"
              title="Please enter your details to access your workspace"
              sizeDesktop="display-MD"
              sizeMobile="heading-MD"
            />
          </div>
          <FormLogin />
        </div>
      </section>
    </section>
  );
};

export default login;
