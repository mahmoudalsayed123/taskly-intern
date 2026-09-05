"use client";

import { useEffect, useState } from "react";
import Select from "react-select";
import { getProjects } from "@/features/project/api/getProjects";
import { Project } from "@/types/types";
import { epicSelectStyles } from "@/constants/selectStyle";

const ProjectsSelect = () => {
  const [projects, setProjects] = useState<{ label: string; value: string }[]>(
    [],
  );
  const [projectSelected, setProjectSelected] = useState<string>("");

  useEffect(() => {
    const getAllProjects = async () => {
      const { success, data } = await getProjects();
      if (success) {
        setProjects([
          {
            label: "All Projects",
            value: "all",
          },
          ...data.map((project: Project) => ({
            label: project.name,
            value: project.id,
          })),
        ]);
      }
    };

    getAllProjects();
  }, []);

  return (
    <Select
      options={projects}
      value={{
        label: projectSelected || "All Projects",
        value: projectSelected || "all",
      }}
      onChange={(e) => {
        setProjectSelected(e?.label || "All Projcts");
      }}
      placeholder="All Projects"
      styles={epicSelectStyles}
    />
  );
};

export default ProjectsSelect;
