"use client";

import { logout } from "@/features/auth/api/logout";
import { getInitials } from "@/lib/getInitials";
import { toastFail } from "@/lib/toastFail";
import { toastSuccess } from "@/lib/toastSuccess";
import { useRouter } from "next/navigation";
import { useState } from "react";

import LogoutIcon from "@/assets/icons/logout.svg";

const UserInfo = ({
  user,
  loading,
}: {
  user: { name: string; department: string };
  loading: boolean;
}) => {
  const [openDrop, setOpenDrop] = useState(false);

  const router = useRouter();
  if (!user) return;
  const initials = getInitials(user.name);

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      toastSuccess(result.message);
      router.replace("/login");
    } else {
      toastFail(result.message);
    }
  };

  if (loading) {
    return (
      <div className="relative flex items-center gap-3 transition-all duration-300 cursor-pointer">
        <div className="hidden lg:flex flex-col lg:items-end gap-1">
          <div className="w-26.25 h-5 animate-pulse bg-background-check-password rounded-md"></div>
          <div className="animate-pulse bg-background-check-password rounded-md w-29 h-5"></div>
        </div>
        <div className="rounded-lg w-10 h-10 animate-pulse bg-background-check-password"></div>
      </div>
    );
  }

  return (
    <div
      onClick={() => setOpenDrop(!openDrop)}
      className="relative flex items-center gap-3 transition-all duration-300 cursor-pointer"
    >
      <div className="hidden lg:flex flex-col lg:items-end gap-1">
        <p className="text-body-MD text-slate-dark font-bold">{user.name}</p>
        <p className="text-label-XS text-primary font-bold">
          {user.department}
        </p>
      </div>
      <div className="rounded-lg w-10 h-10 bg-primary-container flex items-center justify-center text-body-LG text-white">
        {initials}
      </div>
      {openDrop && (
        <button
          onClick={handleLogout}
          className="absolute top-13 w-35 h-12 right-1/2 flex items-center justify-center gap-3 px-4 py-2 bg-white shadow-drop rounded-lg cursor-pointer"
        >
          <LogoutIcon width={18} height={18} fill="#921717" />
          <p className="text-body-MD text-error font-medium">Logout</p>
        </button>
      )}
    </div>
  );
};

export default UserInfo;
