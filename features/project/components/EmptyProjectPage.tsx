import Image from "next/image";
import Link from "next/link";

const EmptyProjectPage = () => {
  return (
    <section className="p-6 lg:p-0 flex items-center justify-center ">
      <div className="flex flex-col items-center justify-center gap-6 w-full lg:w-200 h-[calc(100vh-130px)]">
        <div className="w-full flex items-center justify-center">
          <Image
            src="/assets/icons/no-project.svg"
            alt="no project"
            width={288}
            height={288}
          />
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
            <button
              className="h-12 flex items-center justify-center gap-2 px-6 py-3 shadow-[0px 1px 2px 0px #0000000D] rounded-xs cursor-pointer
 "
              style={{
                background:
                  "linear-gradient(99.3deg, #003D9B 0%, #0052CC 100%)",
              }}
            >
              <Image
                src="/assets/icons/plus.svg"
                alt="add"
                width={10.5}
                height={10.5}
              />
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
