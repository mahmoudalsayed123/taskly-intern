import MainHeading from "@/components/layout/MainHeading";
import BreadCrumb from "@/components/ui/BreadCrumb";
import FormNewEpic from "@/features/epic/components/FormNewEpic";
import { getProject } from "@/features/project/api/getProject";

const NewEpicPage = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const { projectId } = await params;

  const { data: project } = await getProject(projectId);
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
            { label: "Epics", href: `/project/${projectId}/epics` },
            { label: "New Epic", href: `/project/${projectId}/epics/new` },
          ]}
        />
        <MainHeading
          heading="Create New Epic"
          title="Define a major project phase or high-level milestone to group
          related tasks and track architectural progress."
          sizeDesktop="no-project"
          sizeMobile="heading-MD"
        />
      </div>

      {/* form */}
      <section className="lg:w-full lg:flex lg:items-center lg:justify-center lg:p-8">
        <div className="lg:bg-white lg:rounded-lg lg:w-213 lg:max-w-213 shadow-form">
          <FormNewEpic projectId={projectId} />
        </div>
      </section>
    </section>
  );
};

export default NewEpicPage;
