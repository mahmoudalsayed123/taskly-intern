import { Member } from "@/types/types";
import MemberRow from "./MemberRow";

const MembersTable = ({ members }: { members: Member[] }) => {
  return (
    <table className="hidden lg:block rounded-lg bg-surface-low w-196.25 shadow-[0px 1px 2px 0px #0000000D] p-1">
      <thead className="block w-full h-full ">
        <tr className="flex  justify-between text-white w-full ">
          <td className="flex-1 py-5 px-8 text-label-SM font-bold text-muted-body flex items-start justify-start ">
            MEMEBER
          </td>
          <td className="flex-1 py-5 px-8 text-label-SM font-bold text-muted-body flex items-center lg:justify-end xl:justify-end">
            ROLE
          </td>
          <td className="flex-1 py-5 px-8 text-label-SM font-bold text-muted-body flex items-end justify-end ">
            ACTION
          </td>
        </tr>
      </thead>
      <tbody className="block w-full h-full bg-white">
        {members?.map((member) => (
          <MemberRow key={member.user_id} member={member} />
        ))}
      </tbody>
    </table>
  );
};

export default MembersTable;
