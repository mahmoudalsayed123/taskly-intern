import { Member } from "@/types/types";
import { getInitials } from "@/lib/getInitials";

const MemberCard = ({ member }: { member: Member }) => {
  const initials = getInitials(member?.metadata?.name);
  return (
    <div className="w-full p-4 flex items-center justify-between rounded-lg bg-white">
      <div className="flex items-center gap-4">
        <div className="rounded-xl w-12 h-12 bg-head-table flex items-center justify-center text-body-MD font-bold text-primary">
          {initials}
        </div>
        <div className="flex flex-col">
          <p className="text-body-MD  font-semibold text-slate-dark">
            {" "}
            {member?.metadata?.name}
          </p>
          <p className="text-label-SM font-normal text-muted-body max-w-29.75 truncate">
            {member?.email}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <p className="py-0.5 px-2 rounded-xs bg-surface-highest text-label-SM font-bold text-muted-body">
          {member.role}
        </p>
        {/* <Image src="/assets/icons/dots.svg" width={3} height={12} alt="dots" /> */}
      </div>
    </div>
  );
};

export default MemberCard;
