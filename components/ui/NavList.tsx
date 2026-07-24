"use client";

import { navLinks } from "@/constants/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavList = ({ collapse }: { collapse?: boolean }) => {
  const pathName = usePathname();
  const lastPathSegment = pathName.split("/").pop();
  const projectId = pathName.split("/")[2];
  return (
    // <ul className="flex flex-col gap-1">
    //   {navLinks.map((item) => (
    //     <Link
    //       href={item.path}
    //       key={item.id}
    //       className={`py-2.5 px-3 rounded-sm flex items-center gap-3 ${
    //         pathName === item.path
    //           ? "bg-white shadow-[0px_1px_2px_0px_#0000000D]"
    //           : ""
    //       }`}
    //     >
    //       <Image
    //         src={item.icon}
    //         alt={item.name}
    //         width={21.5}
    //         height={16}
    //         className={`${pathName === item.path ? "" : ""}`}
    //       />
    //       <p
    //         className={`capitalize ${collapse ? "hidden" : "text-body-MD font-medium"} ${
    //           pathName === item.path ? "text-primary" : "text-slate-dark"
    //         }`}
    //       >
    //         {item.name}
    //       </p>
    //     </Link>
    //   ))}
    // </ul>
    <ul className="flex flex-col gap-1 ">
      {pathName.includes("/epics") ||
      pathName.includes("/members") ||
      pathName.includes("/tasks") ? (
        navLinks.map((item) => (
          <Link
            href={`${item.name === "projects" ? "/project" : `/project/${projectId}/${item.name}`} `}
            key={item.id}
            className={`${lastPathSegment === item.name ? "bg-white" : ""} py-2.5 px-3 rounded-sm flex items-center gap-3 cursor-pointer`}
          >
            <Image
              src={item.icon}
              alt={item.name}
              width={21.5}
              height={16}
              className={`${pathName === item.path ? "" : ""}`}
            />
            <span
              className={`${collapse ? "hidden" : "text-body-MD font-medium"} capitalize`}
            >
              {item.name === "projects"
                ? "Projects"
                : `Project ${
                    item.name.charAt(0).toUpperCase() + item.name.slice(1)
                  }`}
            </span>
          </Link>
        ))
      ) : (
        <Link
          href="/project"
          className={`${pathName === "/project" ? "bg-white" : ""} py-2.5 px-3 rounded-sm flex items-center gap-3 cursor-pointer`}
        >
          <Image
            src="/assets/icons/project.svg"
            alt="project"
            width={21.5}
            height={16}
          />
          <span className={` text-body font-medium text-slate-dark`}>
            Projects
          </span>
        </Link>
      )}
    </ul>
  );
};

export default NavList;
