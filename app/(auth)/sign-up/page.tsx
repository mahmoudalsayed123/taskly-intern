import MainHeading from "@/components/layout/MainHeading";
import FormSignUp from "@/features/auth/components/FormSignUp";
import Link from "next/link";

const signUp = () => {
  return (
    <section className="flex flex-col px-6 pb-18.5 h-[calc(100vh-24px)] md:min-h-[calc(100vh-70px)]">
      <div className="pt-8 mb-10 md:hidden">
        <MainHeading
          heading="Create Account"
          title="Join the editorial approach to task management."
          sizeDesktop="display-MD"
          sizeMobile="display-SM"
        />
      </div>
      {/* form sign up container for desktop's */}
      <section className="md:w-full md:mt-17.5 md:flex md:items-center md:justify-center md:pb-10 ">
        <div className="w-full md:p-12 rounded-lg flex md:flex-col md:items-center gap-2 md:max-w-xl md:shadow-form md:bg-white">
          {/* main heading for desktop */}
          <div className="hidden mb-10 md:flex md:flex-col gap-2 ">
            <MainHeading
              heading="Create Your Workspace"
              title="Join the curated environment for institutional trust
and task precision."
              sizeDesktop="display-MD"
              sizeMobile="display-SM"
            />
          </div>
          <FormSignUp />
          <div className="hidden md:block pt-8 w-full ">
            <div className="w-full flex items-center justify-center gap-2">
              <p className="text-body-MD text-muted-body font-normal">
                Aleardy have an account?
              </p>
              <Link
                href="/login"
                className="cursor-pointer text-primary text-body-MD font-semibold "
              >
                log in
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="md:hidden block pt-12 pb-8 w-full">
        <div className="w-full flex items-center justify-center gap-2">
          <p className="text-body-MD text-muted-body font-normal">
            Aleardy have an account?
          </p>
          <Link
            href="/login"
            className="cursor-pointer text-primary text-body-MD font-semibold "
          >
            log in
          </Link>
        </div>
      </div>
    </section>
  );
};

export default signUp;
