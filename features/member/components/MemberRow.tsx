import { getInitials } from "@/lib/getInitials";
import { Member } from "@/types/types";

import DotsIcon from "@/assets/icons/dots.svg";

const MemberRow = ({ member }: { member: Member }) => {
  const initials = getInitials(member?.metadata?.name);
  return (
    <tr className="flex w-full items-center justify-center px-8 border-t border-background-check-password">
      <td className="flex-1 h-22.25 flex items-center">
        {" "}
        <div className="flex items-center gap-4">
          <div className="rounded-xl w-12 h-12 bg-head-table flex items-center justify-center text-body-MD font-bold text-primary">
            {initials}
          </div>
          <div className="flex flex-col">
            <p className="text-body-MD  font-semibold text-slate-dark">
              {" "}
              {member?.metadata?.name}
            </p>
            <p className="text-label-SM font-normal text-muted-body">
              {member?.email}
            </p>
          </div>
        </div>
      </td>
      <td className=" flex items-center justify-end flex-1 w-full h-22.25">
        <span className="w-16.25 h-5 flex items-center justify-center text-body-MD font-normal text-white py-1 px-3 bg-primary rounded-xl">
          {member.role}
        </span>
      </td>
      <td className=" flex items-center justify-end flex-1 w-full h-22.25">
        <DotsIcon />
      </td>
    </tr>
  );
};

export default MemberRow;
