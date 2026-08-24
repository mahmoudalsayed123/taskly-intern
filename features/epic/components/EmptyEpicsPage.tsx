import Link from "next/link";

import FlashIcon from "@/assets/icons/flash.svg";
import ImageNoEpic from "@/assets/icons/image-no-epic.svg";

const EmptyEpicPage = () => {
  return (
    <section className="p-6 lg:p-0 flex items-center justify-center ">
      <div className="flex flex-col items-center justify-center gap-6 w-full lg:max-w-2xl h-[calc(100vh-130px)]">
        <div className="w-full flex items-center justify-center">
          <ImageNoEpic />
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
              <FlashIcon />
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
