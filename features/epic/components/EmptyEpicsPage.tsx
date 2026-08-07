import Image from "next/image";
import Link from "next/link";

const EmptyEpicPage = () => {
  return (
    <section className="p-6 lg:p-0 flex items-center justify-center ">
      <div className="flex flex-col items-center justify-center gap-6 w-full lg:max-w-2xl h-[calc(100vh-130px)]">
        <div className="w-full flex items-center justify-center">
          <Image
            src="/assets/icons/image-no-epic.svg"
            alt="no epic"
            width={224}
            height={224}
          />
        </div>
        <h2 className="text-no-project font-semibold text-slate-dark text-center">
          No epics in this project yet.
        </h2>
        <p className="w-full lg:max-w-md text-center text-body-MD text-muted-body">
          Break down your large project into manageable epics to track progress
          better and maintain architectural clarity.
        </p>
        <div className="w-full flex items-center justify-center">
          <Link href="/project/add" className="hidden md:block">
            <button className="btn-primary-desktop lg:flex! items-center! justify-center! hidden!">
              <Image
                src="/assets/icons/flash.svg"
                alt="add"
                width={16}
                height={20}
              />
              <p className="text-body-MD font-medium text-white ">
                Create First Epic
              </p>
            </button>
          </Link>
        </div>
        <div>
          <div></div>
        </div>
      </div>
    </section>
  );
};

export default EmptyEpicPage;
