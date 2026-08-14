import { logout } from "@/features/auth/api/logout";
import { getInitials } from "@/lib/getInitials";
import { toastFail } from "@/lib/toastFail";
import { toastSuccess } from "@/lib/toastSuccess";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const UserInfo = ({ user }: { user: { name: string; department: string } }) => {
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
  return (
    <div
      onClick={() => setOpenDrop(!openDrop)}
      className="relative flex items-center gap-3 transition-all duration-300 cursor-pointer"
    >
      <div className="hidden lg:flex flex-col lg:items-end gap-1">
        <p className="text-body-MD text-slate-dark font-bold">{user.name}</p>
        <p className="text-label-SM text-primary font-bold">
          {user.department}
        </p>
      </div>
      <div className="rounded-lg w-10 h-10 bg-primary-container flex items-center justify-center text-body-MD text-white">
        {initials}
      </div>
      {openDrop && (
        <button
          onClick={handleLogout}
          className="absolute top-13 w-35 h-12 right-1/2 flex items-center justify-center gap-3 px-4 py-2 bg-white shadow-drop rounded-lg cursor-pointer"
        >
          {/* <Image
            src="/assets/icons/logout.svg"
            alt="Logout"
            width={18}
            height={18}
          /> */}
          <p className="text-body-MD text-error font-medium">Logout</p>
        </button>
      )}
    </div>
  );
};

export default UserInfo;
