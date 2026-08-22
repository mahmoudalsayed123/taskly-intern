"use client";
import UserInfo from "../ui/UserInfo";
import { getUserInfo } from "@/features/auth/api/getUserInfo";
import { useEffect, useState } from "react";

import BurgerIcon from "@/assets/icons/burger.svg";

const Topbar = ({
  openMobile,
  setOpenMobile,
}: {
  openMobile: boolean;
  setOpenMobile: (openMobile: boolean) => void;
}) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    async function fetchUser() {
      const res = await getUserInfo();

      if (res?.data) {
        const userInfo = {
          name: res?.data?.user_metadata?.name,
          department: res?.data?.user_metadata?.department,
        };
        setUser(userInfo);
      }
    }
    fetchUser();
  }, []);

  return (
    <header className="sticky top-0 z-20 h-16 bg-background-container border-b px-4 py-3 flex items-center justify-between border-b-[#0000001A]">
      <div className="flex items-center gap-4 ">
        <BurgerIcon
          onClick={() => setOpenMobile(!openMobile)}
          className="lg:hidden cursor-pointer"
        />
        <p className="text-heading-MD font-bold text-slate-dark lg:hidden">
          TASKLY
        </p>
      </div>
      <UserInfo user={user as { name: string; department: string }} />
    </header>
  );
};

export default Topbar;
