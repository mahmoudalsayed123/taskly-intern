"use client";
import { logout } from "@/features/auth/api/logout";
import { toastFail } from "@/lib/toastFail";
import { toastSuccess } from "@/lib/toastSuccess";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SidebarFooter = ({
  collapse,
  setCollapse,
}: {
  collapse?: boolean;
  setCollapse?: (collapse: boolean) => void;
}) => {
  const router = useRouter();
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
    <div className="pt-6 flex flex-col gap-1 border-t border-t-[#C3C6D633]">
      <button
        onClick={() => setCollapse?.(!collapse)}
        className="py-2.5 px-3 w-full hidden lg:flex items-center gap-3 cursor-pointer"
      >
        {/* <Image
          src="/assets/icons/collapse.svg"
          alt="Collapse"
          width={11.77}
          height={20}
        /> */}
        <p
          className={` ${collapse ? "hidden" : "text-body-MD text-slate-dark font-medium"}`}
        >
          Collapse
        </p>
      </button>
      <button
        onClick={handleLogout}
        className="py-2.5 px-3 w-full flex items-center gap-3 cursor-pointer"
      >
        {/* <Image
          src="/assets/icons/logout.svg"
          alt="Logout"
          width={18}
          height={18}
        /> */}
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
