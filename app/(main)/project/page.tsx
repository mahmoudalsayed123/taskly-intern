import MainHeading from "@/components/layout/MainHeading";
import { getProjects } from "@/features/project/api/getProjects";
import ErrorProjectPage from "@/features/project/components/ErrorProjectPage";
import EmptyProjectPage from "@/features/project/components/EmptyProjectPage";
import ProjectList from "@/features/project/components/ProjectList";
import Image from "next/image";
import Link from "next/link";

const ProjectPage = async () => {
  const { success, data } = await getProjects();

  if (!data) {
    return <EmptyProjectPage />;
  }

  if (success === false) {
    return <ErrorProjectPage />;
  }

  return (
    <section className="p-6 lg:p-0">
      <div className="flex items-center justify-between">
        <MainHeading
          heading="Projects"
          title="Manage and curate your projects"
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
      <ProjectList projects={data} />
    </section>
  );
};

export default ProjectPage;
