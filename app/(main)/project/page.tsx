import MainHeading from "@/components/layout/MainHeading";
import { getProjects } from "@/features/project/api/getProjects";
import EmptyProjectPage from "@/features/project/components/EmptyProjectPage";
import ProjectList from "@/features/project/components/ProjectList";
import Link from "next/link";
import Pagination from "@/components/ui/Pagination";
import BtnAdd from "@/components/ui/BtnAdd";
import InfiniteProjectList from "@/features/project/components/infiniteProjectList";
import ErrorPage from "@/components/layout/ErrorPage";

import Plus from "@/assets/icons/plus.svg";

const ProjectPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const { page } = await searchParams;

  const currentPage = Number(page ?? "1");

  const limit = 10;

  const offset = (currentPage - 1) * limit;

  const { success, data, totalCount } = await getProjects(limit, offset);

  const totalProjects = Number(totalCount?.split("/")[1]);

  const projectsShowing = totalCount
    ?.split("/")[0]
    ?.split("-")
    ?.reduce((cur, acc) => Number(acc) - Number(cur), 0);

  const totalPages = Math.ceil(totalProjects / limit);
  if (!data) {
    return <EmptyProjectPage />;
  }

  if (success === false) {
    return <ErrorPage />;
  }

  return (
    <section className="lg:relative p-6 pb-20 lg:p-0">
      <div className="flex items-center justify-between">
        <MainHeading
          heading="Projects"
          title="Manage and curate your projects"
          sizeDesktop="display-MD"
          sizeMobile="heading-MD"
        />
        <Link href="/project/add" className="hidden md:block">
          <button className="btn-primary-desktop lg:gap-2! lg:text-body-LG! lg:font-medium!">
            <Plus className="text-label-XS " />
            <p className="text-body-MD font-medium text-white ">
              Create New Project
            </p>
          </button>
        </Link>
      </div>
      <div className="hidden lg:block">
        <ProjectList projects={data} />
      </div>
      {/* infinite project list for mobile */}
      <div className="lg:hidden">
        <InfiniteProjectList
          initialProjects={data}
          totalProjects={totalProjects}
        />
      </div>
      {/* link add project mobile screen */}
      <BtnAdd path="/project/add" />

      {/* pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalProjects={totalProjects}
          projectsShowing={projectsShowing || 0}
        />
      )}
    </section>
  );
};

export default ProjectPage;
