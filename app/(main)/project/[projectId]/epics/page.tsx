import MainHeading from "@/components/layout/MainHeading";
import BreadCrumb from "@/components/ui/BreadCrumb";
import BtnAdd from "@/components/ui/BtnAdd";
import { getProjectEpics } from "@/features/epic/api/getProjectEpics";
import EpicList from "@/features/epic/components/EpicList";
import Image from "next/image";
import Link from "next/link";
import { getProject } from "@/features/project/api/getProject";
import Pagination from "@/components/ui/Pagination";
import InfiniteEpicList from "@/features/epic/components/infiniteEpicList";
import EmptyProjectPage from "@/features/project/components/EmptyProjectPage";
import ErrorPage from "@/components/layout/ErrorPage";
import EmptyEpicPage from "@/features/epic/components/EmptyEpicsPage";

import SearchIcon from "@/assets/icons/search.svg";
import PlusIcon from "@/assets/icons/plus.svg";

const Epicspage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ projectId: string }>;
  searchParams: Promise<{ page?: string }>;
}) => {
  const { projectId } = await params;

  const { page } = await searchParams;

  const currentPage = Number(page ?? "1");

  const limit = 10;

  const offset = (currentPage - 1) * limit;

  const { success, data, totalCount } = await getProjectEpics(
    projectId,
    limit,
    offset,
  );

  const totalEpics = Number(totalCount?.split("/")[1]);

  const epicsShowing = totalCount
    ?.split("/")[0]
    ?.split("-")
    ?.reduce((cur, acc) => Number(acc) - Number(cur), 0);

  const totalPages = Math.ceil(totalEpics / limit);

  const { data: project } = await getProject(projectId);

  if (!data) {
    return <EmptyEpicPage />;
  }

  if (success === false) {
    return <ErrorPage />;
  }

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
              className="input lg:m-0! w-full! lg:w-75.75! h-12! rounded-xs! py-1.5! px-3! ps-7! placeholder:text-body-MD placeholder:font-normal placeholder:text-resend-timer"
            />
            <SearchIcon className="text-slate-medium cursor-pointer absolute top-1/2 left-3 -translate-y-1/2" />
          </div>
          <Link href={`/project/${projectId}/epics/new`}>
            <button className="btn-primary-desktop lg:gap-2!">
              <PlusIcon />
              <span className="text-body-MD font-bold text-white">
                New Epic
              </span>
            </button>
          </Link>
        </div>
      </div>

      {/* epics list  */}
      <div className="hidden lg:block">
        <EpicList projectId={projectId} epics={data} />
      </div>
      <div className="lg:hidden">
        <InfiniteEpicList initialEpics={data} totalEpics={totalEpics} />
      </div>

      <BtnAdd path={`/project/${projectId}/epics/new`} />

      {/* pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalProjects={totalEpics}
          projectsShowing={epicsShowing || 0}
        />
      )}


      
    </section>
  );
};

export default Epicspage;
