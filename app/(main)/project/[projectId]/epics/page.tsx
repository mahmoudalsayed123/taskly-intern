import MainHeading from "@/components/layout/MainHeading";
import BreadCrumb from "@/components/ui/BreadCrumb";
import BtnAdd from "@/components/ui/BtnAdd";
import { getProjectEpics } from "@/features/epic/api/getProjectEpics";
import EpicList from "@/features/epic/components/EpicList";
import Image from "next/image";
import Link from "next/link";
import { getProject } from "@/features/project/api/getProject";

const Epicspage = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const { projectId } = await params;

  const { data } = await getProjectEpics(projectId);

  const { data: project } = await getProject(projectId);

  return (
    <section className="pt-4 px-6 pb-32 lg:p-0">
      {/* main headig and breadcrumb + search + create epic button  */}
      <div className="lg:flex lg:items-center lg:justify-between">
        {/* main heading */}
        <div className="hidden lg:flex flex-col gap-4 text-display-MD lg:flex-1">
          <BreadCrumb
            items={[
              { label: "Project", href: "/project" },
              {
                label: project?.[0]?.name,
                href: `/project/${projectId}`,
                noRedirect: true,
              },
              { label: "Epics", href: `/project/${projectId}/epics` },
            ]}
          />
          <MainHeading
            heading="Project Epics"
            title=""
            sizeDesktop="display-MD"
            sizeMobile="display-MD"
          />
        </div>

        <div className="lg:flex lg:gap-8 lg:items-center ">
          <div className="relative">
            <input
              type="text"
              name="search"
              placeholder="Search for epics..."
              className="input w-full! lg:w-75.75! h-12! rounded-xs! py-1.5! px-3! ps-7! placeholder:text-body-MD placeholder:font-normal placeholder:text-resend-timer"
            />
            <Image
              src="/assets/icons/search.svg"
              alt="search"
              width={10.5}
              height={10.5}
              className="absolute top-1/2 left-3 -translate-y-1/2 "
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

      <BtnAdd path={`/project/${projectId}/epics/new`} />
    </section>
  );
};

export default Epicspage;
