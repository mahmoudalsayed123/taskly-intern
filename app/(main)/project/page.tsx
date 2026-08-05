import MainHeading from "@/components/layout/MainHeading";
import { getProjects } from "@/features/project/api/getProjects";
import ErrorProjectPage from "@/features/project/components/ErrorProjectPage";
import EmptyProjectPage from "@/features/project/components/EmptyProjectPage";
import ProjectList from "@/features/project/components/ProjectList";
import Image from "next/image";
import Link from "next/link";
import Pagination from "@/components/ui/Pagination";
import BtnAdd from "@/components/ui/BtnAdd";
import InfiniteProjectList from "@/features/project/components/infiniteProjectList";

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
    return <ErrorProjectPage />;
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
          <button
            className="h-12 flex items-center justify-center gap-2 px-6 py-3 shadow-[0px 1px 2px 0px #0000000D] rounded-xs cursor-pointer
 "
            style={{
              background: "linear-gradient(99.3deg, #003D9B 0%, #0052CC 100%)",
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalProjects={totalProjects}
        projectsShowing={projectsShowing || 0}
      />
    </section>
  );
};

export default ProjectPage;
