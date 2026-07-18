"use client";
import Image from "next/image";
import UserInfo from "../ui/UserInfo";
import { getUser } from "@/features/auth/api/getUser";
import { useEffect, useState } from "react";

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
      const res = await getUser();

      if (res?.data) {
        const userInfo = {
          name: res.data.identities[0].identity_data.name,
          department: res.data.identities[0].identity_data.department,
        };
        setUser(userInfo);
      }
    }
    fetchUser();
  }, []);

  return (
    <header className="sticky top-0 z-20 h-16 bg-background-container border-b px-4 py-3 flex items-center justify-between border-b-[#0000001A]">
      <div className="flex items-center gap-4 ">
        <Image
          src="/assets/icons/burger.svg"
          alt="Toggle"
          width={18}
          height={12}
          onClick={() => setOpenMobile(!openMobile)}
          className="lg:hidden"
        />
        <p className="text-[20px] font-bold text-slate-dark lg:hidden">
          TASKLY
        </p>
      </div>
      <UserInfo user={user as { name: string; department: string }} />
    </header>
  );
};

export default Topbar;
