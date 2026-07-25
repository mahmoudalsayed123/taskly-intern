import { Projects } from "@/constants/constants";
import { SquarePen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProjectCard = ({ project }: { project: Projects }) => {
  return (
    <Link
      href={`/project/${project.id}/epics`}
      className="p-6 lg:h-55 lg:w-76 rounded-lg flex flex-col items-start justify-between gap-4 shadow-[0px 1px 2px 0px #0000000D] bg-white "
    >
      <div className="w-full flex items-center justify-between">
        <h2 className="text-title-MD font-semibold text-slate-dark">
          {project.name}
        </h2>
        <Link href={`/project/${project.id}/edit`} className="cursor-pointer">
          <SquarePen className="text-slate-dark" size={15} />
        </Link>
      </div>
      <p className="text-body-MD font-normal text-slate-dark mt-9.5 lg:mt-1 line-clamp-2 lg:line-clamp-3">
        {project.description}
      </p>
      <div className="w-full lg:hidden flex items-center gap-1.5 pt-5 lg:pt-6 border-t border-border-slate-10">
        <Image
          src="/assets/icons/date.svg"
          alt="avatar"
          width={10.5}
          height={11.67}
          className="lg:hidden"
        />
        <p className="text-label-SM font-normal text-slate-dark">
          {new Date(project.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <div className="hidden lg:w-full lg:flex items-center justify-between pt-5 lg:pt-6 border-t border-border-slate-10">
        <p className="text-label-SM font-bold text-slate-medium">Created At</p>
        <p className="text-label-SM font-normal text-slate-medium">
          {new Date(project.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </Link>
  );
};

export default ProjectCard;
