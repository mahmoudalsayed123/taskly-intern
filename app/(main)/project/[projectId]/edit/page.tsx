import MainHeading from "@/components/layout/MainHeading";
import BreadCrumb from "@/components/ui/BreadCrumb";
import { getProject } from "@/features/project/api/getProject";
import FormEditProject from "@/features/project/edit-project/components/FormEditProject";

const EditProjectPage = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const { projectId } = await params;

  const { data: project } = await getProject(projectId);
  return (
    <section className="pt-8 px-6 pb-13 lg:p-0">
      {/* main heading for desktop */}
      <div className=" hidden lg:flex lg:flex-col gap-4 lg:h-16 lg:mb-10">
        <BreadCrumb
          items={[
            { label: "Project", href: "/project" },
            {
              label: project?.[0]?.name,
              href: `/project/${projectId}`,
              noRedirect: true,
            },
            { label: "Edit", href: `/project/${projectId}/edit` },
          ]}
        />
        <MainHeading
          heading="Edit Project"
          title="Define the scope and foundational details of your project."
          sizeDesktop="no-project"
          sizeMobile="heading-MD"
        />
      </div>
      {/* main heading for mobile section */}
      <div className="lg:hidden pb-8 w-full">
        <MainHeading
          heading="Edit Project"
          title="Define the scope and foundational details of your project."
          sizeDesktop="no-project"
          sizeMobile="heading-MD"
        />
      </div>

      {/* form */}
      <section className="lg:w-full lg:flex lg:items-center lg:justify-center lg:p-1">
        <div className="lg:bg-white lg:rounded-lg lg:w-2xl lg:max-w-2xl shadow-form">
          <FormEditProject projectId={projectId} />
        </div>
      </section>
    </section>
  );
};

export default EditProjectPage;
