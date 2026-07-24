import MainHeading from "@/components/layout/MainHeading";
import FormEditProject from "@/features/project/edit-project/components/FormEditProject";

const EditProjectPage = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const { projectId } = await params;

  return (
    <section className="pt-8 px-6 pb-13 lg:p-0">
      {/* main heading for desktop */}
      <div className=" hidden lg:block lg:h-16 lg:mb-10">
        <MainHeading
          heading="Edit Project"
          title="Define the scope and foundational details of your project."
        />
      </div>
      {/* main heading for mobile section */}
      <div className="lg:hidden pb-8 w-full">
        <MainHeading
          heading="Edit Project"
          title="Define the scope and foundational details of your project."
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
