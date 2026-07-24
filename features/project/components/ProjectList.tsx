import { Projects } from "@/constants/constants";
import ProjectCard from "./ProjectCard";

const ProjectList = ({ projects }: { projects?: Projects[] }) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects?.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </section>
  );
};

export default ProjectList;
