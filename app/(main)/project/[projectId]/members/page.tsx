import MainHeading from "@/components/layout/MainHeading";
import BreadCrumb from "@/components/ui/BreadCrumb";
import { getProjectMember } from "@/features/member/api/getProjectMember";
import ListMember from "@/features/member/components/ListMember";
import MembersTable from "@/features/member/components/MembersTable";
import { getProject } from "@/features/project/api/getProject";

import MemberIcon from "@/assets/icons/members.svg";
import BtnInviteMember from "@/features/member/components/BtnInviteMember";

const MembersPage = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const { projectId } = await params;
  const { data: projectMember } = await getProjectMember(projectId);
  console.log("project member", projectMember);

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
        <BtnInviteMember projectId={projectId} />
      </div>
      {/* table for desktop */}
      <section className="flex items-center  justify-center w-full mt-19.75">
        <MembersTable members={projectMember} />

        {/* list member for mobile */}
        <ListMember members={projectMember} />
      </section>

      {/* link add project mobile screen */}
      <button className="block lg:hidden fixed bottom-6 right-6">
        <button className="btn-primary-mobile">
          <MemberIcon />
        </button>
      </button>
    </section>
  );
};

export default MembersPage;
