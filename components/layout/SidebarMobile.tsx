"use client";
import NavList from "../ui/NavList";
import Logo from "./Logo";
import SidebarFooter from "../ui/SidebarFooter";

const SidebarMobile = ({ openMobile }: { openMobile: boolean }) => {
  return (
    <aside
      className={` flex fixed left-0 top-0 z-50  h-screen flex-col justify-between bg-surface-low p-4 transition-all duration-300 ease-in-out w-62.5 ${
        openMobile ? "translate-x-0" : "-translate-x-62.5"
      }`}
    >
      <div className="mb-8">
        <Logo />
      </div>
      <div className="flex-1 w-full">
        <NavList />
      </div>
      <SidebarFooter />
    </aside>
  );
};

export default SidebarMobile;
