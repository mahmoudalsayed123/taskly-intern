
import Link from "next/link";
import NoProject from "@/assets/icons/no-project.svg";

const EmptyProjectPage = () => {
  return (
    <section className="p-6 lg:p-0 flex items-center justify-center ">
      <div className="flex flex-col items-center justify-center gap-6 w-full lg:w-200 h-[calc(100vh-130px)]">
        <div className="w-full flex items-center justify-center">
          <NoProject className="w-72 h-72" />
        </div>
        <h2 className="text-no-project font-semibold text-slate-dark text-center">
          No Projects
        </h2>
        <p className="w-full lg:max-w-md text-center text-body-MD text-muted-body">
          Your do not have any project yet. start by defining your first
          architectural workspace to tracking tasks and epics.
        </p>
        <div className="w-full flex items-center justify-center">
          <Link href="/project/add" className="hidden md:block">
            <button className="btn-primary-desktop lg:flex! items-center! justify-center! hidden!">
              {/* <Image
                src="/assets/icons/plus.svg"
                alt="add"
                width={10.5}
                height={10.5}
              /> */}
              <p className="text-body-MD font-medium text-white ">
                Create Project
              </p>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EmptyProjectPage;
