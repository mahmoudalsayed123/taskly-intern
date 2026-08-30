import Link from "next/link";

import ArrowIcon from "@/assets/icons/arrow-right-bread-crumb.svg";
interface BreadcrumbProps {
  items: {
    label: string;
    href: string;
    noRedirect?: boolean;
  }[];
}

const BreadCrumb = ({ items }: BreadcrumbProps) => {
  return (
    <div className="hidden lg:flex items-center gap-2">
      {items.map((item, index) => (
        <Link
          href={item.href}
          key={index}
          className={`flex items-center gap-2 cursor-pointer ${
            item.noRedirect ? "pointer-events-none" : ""
          }`}
        >
          <span
            className={`text-label-SM font-bold  ${index === items.length - 1 ? "text-primary" : "text-muted-body-60"}`}
          >
            {item.label}
          </span>
          {index !== items.length - 1 && (
            <span className="text-label-SM font-bold text-muted-body-60">
              <ArrowIcon width={3.7} height={6} />
            </span>
          )}
        </Link>
      ))}
    </div>
  );
};

export default BreadCrumb;
