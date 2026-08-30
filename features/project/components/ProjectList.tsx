"use client";
import ProjectCard from "./ProjectCard";
import Link from "next/link";
import { Project } from "@/types/types";

import PlusIcon from "@/assets/icons/plus-dark.svg";
import LoadingProjectCard from "./LoadingProjectCard";

const ProjectList = ({
  projects,
  loading,
}: {
  projects: Project[];
  loading: boolean;
}) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 justify-between gap-6 mt-10">
      {loading &&
        Array.from({ length: 10 }).map((_, index) => (
          <LoadingProjectCard key={index} />
        ))}
      {projects?.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
      <Link
        href={`/project/add`}
        className="p-6 lg:h-55 lg:w-76 rounded-lg flex items-center justify-center  gap-4 shadow-[0px 1px 2px 0px #0000000D] bg-white "
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-12 h-12 bg-background-container rounded-xl flex items-center justify-center">
            <PlusIcon />
          </div>
          <p className="text-body-MD font-bold text-slate-medium">
            ADD PROJECT
          </p>
        </div>
      </Link>
    </section>
  );
};

export default ProjectList;
