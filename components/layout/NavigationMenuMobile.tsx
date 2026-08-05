import { navLinks } from "@/constants/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavigationMenuMobile = () => {
  const pathName = usePathname();
  const lastPathSegment = pathName.split("/").pop();
  const projectId = pathName.split("/")[2];
  return (
    <div className="px-7 flex items-center justify-center gap-10 md:gap-15 bg-surface-low h-16 fixed bottom-0 left-0 w-full">
      {pathName.includes("/epics") ||
      pathName.includes("/members") ||
      pathName.includes("/tasks") ? (
        navLinks.map((item) => (
          <Link
            href={`${item.name === "projects" ? "/project" : `/project/${projectId}/${item.path}`} `}
            key={item.id}
            className={`flex flex-col items-center gap-0.5 cursor-pointer`}
          >
            <Image src={item.icon} alt={item.name} width={18} height={18} />
            <span className="text-body-MD font-medium capitalize">
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
          className="flex flex-col items-center gap-0.5 cursor-pointer"
        >
          <Image
            src="/assets/icons/project.svg"
            alt="project"
            width={18}
            height={18}
          />
          <span
            className={`text-label-SM capitalize ${pathName === "/project" ? "text-primary-container font-semibold" : "text-slate-dark-70 font-normal"}`}
          >
            Projects
          </span>
        </Link>
      )}
    </div>
  );
};

export default NavigationMenuMobile;
