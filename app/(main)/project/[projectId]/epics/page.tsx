import MainHeading from "@/components/layout/MainHeading";
import BreadCrumb from "@/components/ui/BreadCrumb";
import BtnAdd from "@/components/ui/BtnAdd";
import { getProjectEpics } from "@/features/epic/api/getProjectEpics";
import EpicList from "@/features/epic/components/EpicList";
import Link from "next/link";
import { getProject } from "@/features/project/api/getProject";
import Pagination from "@/components/ui/Pagination";
import InfiniteEpicList from "@/features/epic/components/infiniteEpicList";
import ErrorPage from "@/components/layout/ErrorPage";
import EmptyEpicPage from "@/features/epic/components/EmptyEpicsPage";

import PlusIcon from "@/assets/icons/plus.svg";
import SearchEpic from "@/features/epic/components/SearchEpic";
import EpicPageContainer from "@/features/epic/components/EpicsPageContainer";
import EpicsPageContainer from "@/features/epic/components/EpicsPageContainer";

const Epicspage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ projectId: string }>;
  searchParams: Promise<{ page?: string; title?: string }>;
}) => {
  const { projectId } = await params;

  const { page, title } = await searchParams;
  console.log("page form server", page);

  // const { success, data, totalCount } = await getProjectEpics(
  //   projectId,
  //   limit,
  //   offset,
  // );

  const { data: project } = await getProject(projectId);

  // if (!data) {
  //   return <EmptyEpicPage />;
  // }

  // if (success === false) {
  //   return <ErrorPage />;
  // }

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
          <SearchEpic projectId={projectId} />
          <Link
            className="hidden lg:block"
            href={`/project/${projectId}/epics/new`}
          >
            <button className="btn-primary-desktop lg:gap-2!">
              <PlusIcon />
              <span className="text-body-MD font-bold text-white">
                New Epic
              </span>
            </button>
          </Link>
        </div>
      </div>

      <EpicsPageContainer projectId={projectId} page={page || ""} />
    </section>
  );
};

export default Epicspage;
