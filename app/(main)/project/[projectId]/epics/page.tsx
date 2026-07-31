import MainHeading from "@/components/layout/MainHeading";
import { getProjectEpics } from "@/features/epic/api/getProjectEpics";
import EpicList from "@/features/epic/components/EpicList";
import Image from "next/image";
import Link from "next/link";

const Epicspage = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const { projectId } = await params;

  const { data } = await getProjectEpics(projectId);

  return (
    <section>
      {/* main headig and breadcrumb + search + create epic button  */}
      <div className="lg:flex lg:items-center lg:justify-between pt-4 px-6 pb-32 lg:p-0">
        {/* main heading */}
        <div className="hidden lg:block text-display-MD lg:flex-1">
          <MainHeading
            heading="Project Epics"
            title=""
            sizeDesktop="display-MD"
            sizeMobile="display-MD"
          />
        </div>

        <div className="lg:flex lg:gap-8 lg:items-center ">
          <div className="relative ">
            <input
              type="text"
              name="search"
              placeholder="Search for epics..."
              className="input w-full! lg:w-75.75! h-12! rounded-xs! py-1.5! px-3! ps-7!"
            />
            <Image
              src="/assets/icons/search.svg"
              alt="search"
              width={10.5}
              height={10.5}
              className="absolute top-1/2 -translate-y-1/2 left-3"
            />
          </div>
          <Link href={`/project/${projectId}/epics/new`}>
            <button className="btn-primary-desktop lg:flex! items-center! justify-center! hidden!">
              <Image
                src="/assets/icons/plus.svg"
                alt="create epic"
                width={10.5}
                height={10.5}
              />
              <span className="text-body-MD font-bold text-white">
                New Epic
              </span>
            </button>
          </Link>
        </div>
      </div>

      {/* epics list  */}
      <EpicList epics={data} />
    </section>
  );
};

export default Epicspage;
