"use client";
import BtnAdd from "@/components/ui/BtnAdd";
import ProjectList from "./ProjectList";
import Pagination from "@/components/ui/Pagination";
import { Project } from "@/types/types";
import { useEffect, useState } from "react";
import { getProjects } from "../api/getProjects";
import InfiniteProjectList from "./infiniteProjectList";

const ProjectsPageContainer = ({
  limit,
  offset,
  currentPage,
}: {
  limit: number;
  offset: number;
  currentPage: number;
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [totalProjects, setTotalProjects] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [projectsShowing, setProjectsShowing] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setProjects([]);
      const { success, data, totalCount } = await getProjects(limit, offset);
      if (success) {
        setProjects(data);
        setTotalProjects(Number(totalCount?.split("/")[1]));
        const projectShowing = Number(totalCount?.split("/")[0]?.split("-")[1]);
        setProjectsShowing(projectShowing || 0);
        setTotalPages(Math.ceil(Number(totalCount?.split("/")[1]) / limit));
      }
      setLoading(false);
    };
    fetchProjects();
  }, [offset, currentPage]);

  return (
    <section className="w-full h-full">
      <div className="hidden lg:block w-full">
        <ProjectList projects={projects} loading={loading} />
      </div>
      {/* infinite project list for mobile */}
      <div className="lg:hidden">
        <InfiniteProjectList
          initialProjects={projects}
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
          numberOfShowing={projectsShowing || 0}
          totalItems={totalProjects}
          loading={loading}
        />
      )}
    </section>
  );
};

export default ProjectsPageContainer;
