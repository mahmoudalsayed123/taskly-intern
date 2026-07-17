"use client";
import NavList from "../ui/NavList";
import Logo from "./Logo";
import SidebarFooter from "../ui/SidebarFooter";

const SidebarLg = ({
  collapse,
  setCollapse,
}: {
  collapse: boolean;
  setCollapse: (collapse: boolean) => void;
}) => {
  return (
    <aside
      className={`hidden lg:flex fixed left-0 top-0 z-30  h-screen flex-col justify-between bg-surface-low p-4 transition-all duration-300 ease-in-out ${
        collapse ? "w-20 border-r border-r-[#0000001A]" : "w-64"
      }`}
    >
      <div className="mb-8">
        <Logo collapse={collapse} />
      </div>
      <div className="flex-1 w-full">
        <NavList collapse={collapse} />
      </div>
      <SidebarFooter collapse={collapse} setCollapse={setCollapse} />
    </aside>
  );
};

export default SidebarLg;
