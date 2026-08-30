"use client";
import { Project } from "@/types/types";
import { SquarePen } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import DateIcon from "@/assets/icons/date.svg";
import { formatCreatedAt } from "@/lib/helper";
import { useState } from "react";

const ProjectCard = ({ project }: { project: Project }) => {
  const [isHover, setIsHover] = useState(false);
  const router = useRouter();

  if (!project) return null;
  return (
    <Link
      onMouseEnter={(e) => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
      href={`/project/${project.id}/epics`}
      className="p-6 min-h-55  rounded-lg  flex flex-col justify-between items-start shadow-[0px 1px 2px 0px #0000000D] bg-white cursor-pointer"
    >
      <div className="w-full flex flex-col gap-3.5">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-title-MD font-semibold text-slate-dark text-wrap">
            {project.name}
          </h2>
          <Link
            href={`/project/${project.id}/edit`}
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/project/${project.id}/edit`);
            }}
            className={`${isHover ? "block cursor-pointer w-5 h-5" : "hidden"} `}
          >
            <SquarePen className="text-slate-dark" size={15} />
          </Link>
        </div>

        <p className="text-body-MD font-normal text-slate-dark mt-9.5 lg:mt-1 text-wrap">
          {project.description}
        </p>
      </div>

      <div className="w-full lg:hidden flex items-center gap-1.5 pt-5 border-t border-border-slate-10">
        <DateIcon />
        <p className="text-label-SM font-normal text-slate-dark">
          {formatCreatedAt(project.created_at)}
        </p>
      </div>
      <div className="hidden lg:w-full lg:flex lg:items-center lg:justify-between lg:pt-6 border-t border-border-slate-10">
        <p className="text-label-SM font-bold text-slate-medium">Created At</p>
        <p className="text-body-MD font-normal text-slate-medium">
          {formatCreatedAt(project.created_at)}
        </p>
      </div>
    </Link>
  );
};

export default ProjectCard;
