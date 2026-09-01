import MainHeading from "@/components/layout/MainHeading";
import EmptyProjectPage from "@/features/project/components/EmptyProjectPage";
import Link from "next/link";
import ErrorPage from "@/components/layout/ErrorPage";

import Plus from "@/assets/icons/plus.svg";
import ProjectsPageContainer from "@/features/project/components/ProjectsPageContainer";
import { getProjects } from "@/features/project/api/getProjects";

const ProjectPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const { page } = await searchParams;

  const currentPage = Number(page ?? "1");

  const limit = 10;

  const offset = (currentPage - 1) * limit;

  const { success, data } = await getProjects(limit, offset);

  if (!data) {
    return <EmptyProjectPage />;
  }

  if (success === false) {
    return <ErrorPage />;
  }

  return (
    <section className="lg:relative">
      <div className="w-full flex items-center justify-between mb-6 lg:mb-10">
        <MainHeading
          heading="Projects"
          title="Manage and curate your projects"
          sizeDesktop="display-MD"
          sizeMobile="heading-MD"
        />
        <Link href="/project/add" className="hidden lg:block">
          <button className="btn-primary-desktop lg:gap-2! lg:text-body-LG! lg:font-medium!">
            <Plus className="text-label-XS " />
            <p className="text-body-MD font-medium text-white ">
              Create New Project
            </p>
          </button>
        </Link>
      </div>

      <ProjectsPageContainer
        limit={limit}
        offset={offset}
        currentPage={currentPage}
      />
    </section>
  );
};

export default ProjectPage;
