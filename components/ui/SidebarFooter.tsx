"use client";
import Image from "next/image";

const SidebarFooter = ({
  collapse,
  setCollapse,
}: {
  collapse?: boolean;
  setCollapse?: (collapse: boolean) => void;
}) => {
  return (
    <div className="pt-6 flex flex-col gap-1 border-t border-t-[#C3C6D633]">
      <button
        onClick={() => setCollapse?.(!collapse)}
        className="py-2.5 px-3 w-full hidden lg:flex items-center gap-3 cursor-pointer"
      >
        <Image
          src="/assets/icons/collapse.svg"
          alt="Collapse"
          width={11.77}
          height={20}
        />
        <p
          className={` ${collapse ? "hidden" : "text-body-MD text-slate-dark font-medium"}`}
        >
          Collapse
        </p>
      </button>
      <button className="py-2.5 px-3 w-full flex items-center gap-3 cursor-pointer">
        <Image
          src="/assets/icons/logout.svg"
          alt="Logout"
          width={18}
          height={18}
        />
        <p
          className={` ${collapse ? "hidden" : "text-body-MD text-error font-medium"}`}
        >
          Logout
        </p>
      </button>
    </div>
  );
};

export default SidebarFooter;
