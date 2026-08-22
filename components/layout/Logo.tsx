import LogoIcon from "@/assets/logo.svg";

const Logo = ({ collapse }: { collapse?: boolean }) => {
  return (
    <div
      className={`flex items-center gap-2 ${collapse ? "justify-center" : ""}`}
    >
      <LogoIcon />
      <span
        className={`block text-heading-MD font-bold text-slate-dark ${collapse ? "hidden" : ""}`}
      >
        TASKLY
      </span>
    </div>
  );
};

export default Logo;
