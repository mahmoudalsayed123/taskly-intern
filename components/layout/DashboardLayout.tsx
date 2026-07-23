"use client";

import { useState } from "react";
import SidebarLg from "./SidebarLg";
import Topbar from "./Topbar";
import SidebarMobile from "./SidebarMobile";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapse, setCollapse] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);

  return (
    <>
      <SidebarLg collapse={collapse} setCollapse={setCollapse} />
      <SidebarMobile openMobile={openMobile} />

      <div
        className={`transition-all duration-300 min-h-screen flex flex-col ${
          collapse ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        <div
          onClick={() => setOpenMobile(false)}
          className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 lg:hidden ${
            openMobile
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        />
        <Topbar openMobile={openMobile} setOpenMobile={setOpenMobile} />

        <main className="flex-1 p-4 lg:p-8 overflow-y-auto max-w-7xl">
          {children}
        </main>
      </div>
    </>
  );
}
