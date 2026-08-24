import MemberCard from "./MemberCard";
import { Member } from "@/types/types";

const ListMember = ({ members }: { members: Member[] }) => {
  return (
    <section className="flex flex-col gap-6 lg:hidden w-lg h-full items-center">
      {members?.map((member) => (
        <MemberCard key={member.user_id} member={member} />
      ))}
    </section>
  );
};

export default ListMember;
