"use client";

import { navLinks } from "@/constants/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavList = ({ collapse }: { collapse?: boolean }) => {
  const pathName = usePathname();
  return (
    <ul className="flex flex-col gap-1">
      {navLinks.map((item) => (
        <Link
          href={item.path}
          key={item.id}
          className={`py-2.5 px-3 rounded-sm flex items-center gap-3 ${
            pathName === item.path
              ? "bg-white shadow-[0px_1px_2px_0px_#0000000D]"
              : ""
          }`}
        >
          <Image
            src={item.icon}
            alt={item.name}
            width={21.5}
            height={16}
            className={`${pathName === item.path ? "" : ""}`}
          />
          <p
            className={`capitalize ${collapse ? "hidden" : "text-body-MD font-medium"} ${
              pathName === item.path ? "text-primary" : "text-slate-dark"
            }`}
          >
            {item.name}
          </p>
        </Link>
      ))}
    </ul>
  );
};

export default NavList;
