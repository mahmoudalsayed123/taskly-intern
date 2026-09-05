"use client";

import { navLinks } from "@/constants/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routesName = ["epics", "members", "tasks", "edit"];

const NavList = ({ collapse }: { collapse?: boolean }) => {
  const pathName = usePathname();
  const lastPathSegment = pathName.split("/").pop();
  const projectId = pathName.split("/")[2];
  return (
    <ul className="flex flex-col gap-1">
      {navLinks.map((item) => {
        return (
          <Link
            href={`${item.path === "/project" || item.path === "/my-statistics" ? item.path : `/project/${projectId}${item.path}`} `}
            key={item.id}
            className={`${item.path === "/project" || item.path === "/my-statistics" || routesName.includes(lastPathSegment || "") ? "flex " : "hidden"} ${
              item.name === lastPathSegment ||
              (lastPathSegment === "edit" && item.name === "details") ||
              (lastPathSegment === "project" && item.name === "projects")
                ? "bg-white text-slate-dark"
                : ""
            } py-2.5 px-3 rounded-sm items-center gap-3 cursor-pointer`}
          >
            <item.icon
              className={`${
                item.name === lastPathSegment ||
                (lastPathSegment === "edit" && item.name === "details") ||
                (lastPathSegment === "project" && item.name === "projects")
                  ? "text-primary"
                  : "text-slate-dark"
              }`}
            />
            <span
              className={`${collapse ? "hidden" : "text-body-MD font-medium"} capitalize`}
            >
              {item.name === "projects" || item.name === "My Statistics"
                ? item.name
                : `Project ${
                    item.name.charAt(0).toUpperCase() + item.name.slice(1)
                  }`}
            </span>
          </Link>
        );
      })}
    </ul>
  );
};

export default NavList;
