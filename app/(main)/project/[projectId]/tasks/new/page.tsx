import MainHeading from "@/components/layout/MainHeading";
import BreadCrumb from "@/components/ui/BreadCrumb";
import { Member } from "@/constants/constants";
import { getProjectEpics } from "@/features/epic/api/getProjectEpics";
import { getProjectMember } from "@/features/member/api/getProjectMember";
import { getProject } from "@/features/project/api/getProject";
import FormNewTask from "@/features/tasks/components/FormNewTask";

const NewTask = async ({
  params,
  searchParams,
}: {
  params: Promise<{ projectId: string }>;
  searchParams: Promise<{ epic_id?: string }>;
}) => {
  const { projectId } = await params;
  const { epic_id } = await searchParams;

  const { data: project } = await getProject(projectId);
  const { data: epics } = await getProjectEpics(projectId);
  const { data: members } = await getProjectMember(projectId);

  return (
    <section className="pt-8 px-6 pb-13 lg:p-2">
      {/* main heading for desktop */}
      <div className="mb-6 w-85.5 md:w-lg lg:mb-10 lg:flex lg:flex-col gap-4">
        <BreadCrumb
          items={[
            { label: "Project", href: "/project" },
            {
              label: project?.[0]?.name,
              href: `/project/${projectId}`,
              noRedirect: true,
            },
            { label: "Tasks", href: `/project/${projectId}/tasks` },
            { label: "New Task", href: `/project/${projectId}/tasks/new` },
          ]}
        />
        <MainHeading
          heading="Create New Task"
          title="Initialize a new work item within the Architectural Workspace ecosystem."
          sizeDesktop="no-project"
          sizeMobile="heading-MD"
        />
      </div>

      {/* form */}
      <section className="lg:w-full lg:flex lg:items-center lg:justify-center lg:p-8">
        <div className="lg:bg-white lg:rounded-lg lg:w-213 lg:max-w-213 shadow-form">
          <FormNewTask
            projectId={projectId}
            epicId={epic_id}
            epics={epics as { id: string; epic_id: string; title: string }[]}
            members={members as Member[]}
          />
        </div>
      </section>
    </section>
  );
};

export default NewTask;
