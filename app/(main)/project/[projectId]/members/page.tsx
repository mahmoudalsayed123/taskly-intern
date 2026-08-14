import MainHeading from "@/components/layout/MainHeading";
import BreadCrumb from "@/components/ui/BreadCrumb";
import { getProjectMember } from "@/features/member/api/getProjectMember";
import ListMember from "@/features/member/components/ListMember";
import MembersTable from "@/features/member/components/MembersTable";
import { getProject } from "@/features/project/api/getProject";
import Image from "next/image";
import Link from "next/link";

const MembersPage = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const { projectId } = await params;
  const { data: projectMember } = await getProjectMember(projectId);

  const { data: project } = await getProject(projectId);
  return (
    <section className="flex flex-col gap-3">
      {/* main heading and breadcrumb + invite member button */}
      <div className="flex items-end justify-center lg:justify-between">
        {/* main heading + breadcrumb */}
        <div className="lg:flex lg:flex-col gap-4">
          <BreadCrumb
            items={[
              { label: "Project", href: "/project" },
              {
                label: project?.[0]?.name,
                href: `/project/${projectId}`,
                noRedirect: true,
              },
              { label: "Members", href: `/project/${projectId}/members` },
            ]}
          />
          {/* main heading */}
          <div>
            <MainHeading
              heading="Project Members"
              title=""
              sizeDesktop="no-project"
              sizeMobile="heading-LG"
            />
          </div>
        </div>
        <button className="hidden! lg:flex! btn-primary-desktop">
          {/* <Image
            src="/assets/icons/user.svg"
            alt="invite"
            width={18.33}
            height={13.33}
          /> */}
          <p>Invite Member</p>
        </button>
      </div>
      {/* table for desktop */}
      <section className="flex items-center justify-center w-full mt-19.75">
        <MembersTable members={projectMember} />

        {/* list member for mobile */}
        <ListMember members={projectMember} />
      </section>

      {/* link add project mobile screen */}
      <Link
        href="/project/add"
        className="block lg:hidden fixed bottom-6 right-6"
      >
        <button
          className="h-10 w-10 flex items-center justify-center gap-2 shadow-[0px 4px 6px -4px #0000001A] shadow-[0px 10px 15px -3px #0000001A] rounded-xl cursor-pointer
 "
          style={{
            background: "linear-gradient(99.3deg, #003D9B 0%, #0052CC 100%)",
          }}
        >
          {/* <Image
            src="/assets/icons/user.svg"
            alt="invite"
            width={18.33}
            height={13.33}
          /> */}
        </button>
      </Link>
    </section>
  );
};

export default MembersPage;
