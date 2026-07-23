import MainHeading from "@/components/layout/MainHeading";
import ResetPasswordForm from "@/features/auth/_components/ResetPasswordForm";
const ResetPassword = () => {
  return (
    <section className="flex flex-col px-6 pb-18.5 min:h-[calc(100vh-24px)] md:min-h-[calc(100vh-70px)]">
      <div className="pt-8 mb-10 md:hidden">
        <MainHeading
          heading="Create a New Password"
          title="Create a new, strong password to secure your workstation access."
          resetSection={true}
        />
      </div>
      {/* form sign up container for desktop's */}
      <section className="md:w-full md:mt-17.5 md:flex md:items-center md:justify-center md:pb-10 ">
        <div className="w-full md:p-12 rounded-lg flex md:flex-col md:items-center gap-2 md:max-w-120 md:shadow-form bg-white">
          {/* main heading for desktop */}
          <div className="hidden mb-10 md:flex justify-center items-center">
            <MainHeading
              heading="Create a New Password"
              title="Create a new, strong password to secure your workstation access."
              resetSection={true}
            />
          </div>
          <ResetPasswordForm />
        </div>
      </section>
    </section>
  );
};

export default ResetPassword;
