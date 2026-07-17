import Image from "next/image";

const Logo = ({ collapse }: { collapse?: boolean }) => {
  return (
    <div
      className={`flex items-center gap-2 ${collapse ? "justify-center" : ""}`}
    >
      <Image src="/assets/logo.svg" alt="Taskly Logo" width={18} height={20} />
      <span
        className={`block text-[20px] font-bold text-slate-dark ${collapse ? "hidden" : ""}`}
      >
        TASKLY
      </span>
    </div>
  );
};

export default Logo;
