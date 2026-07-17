import { getInitials } from "@/lib/getInitials";

const UserInfo = ({ user }: { user: { name: string; department: string } }) => {
  if (!user) return;
  const initials = getInitials(user.name);
  return (
    <div className=" flex items-center gap-3">
      <div className="hidden lg:flex flex-col lg:items-end gap-1">
        <p className="text-body-MD text-slate-dark font-bold">{user.name}</p>
        <p className="text-label-SM text-primary font-bold">
          {user.department}
        </p>
      </div>
      <div className="rounded-lg w-10 h-10 bg-primary-container flex items-center justify-center text-body-MD text-white">
        {initials}
      </div>
    </div>
  );
};

export default UserInfo;
