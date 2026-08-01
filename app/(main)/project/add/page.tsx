import MainHeading from "@/components/layout/MainHeading";
import BreadCrumb from "@/components/ui/BreadCrumb";
import NewProjectForm from "@/features/project/add-project/components/NewProjectForm";
import { getProject } from "@/features/project/api/getProject";

const AddProjectPage = async () => {
  return (
    <section className="pt-8 px-6 pb-13 lg:p-0">
      {/* main heading for desktop */}
      <div className=" hidden lg:block lg:h-16 lg:mb-10 lg:text-no-project">
        <BreadCrumb
          items={[
            { label: "Project", href: "/project" },
            { label: "Add New Project", href: "/project/add" },
          ]}
        />
        <MainHeading
          heading="Add New Project"
          title=""
          sizeDesktop="no-project"
          sizeMobile="heading-MD"
        />
      </div>
      {/* main heading for mobile section */}
      <div className="lg:hidden pb-8 w-full">
        <MainHeading
          heading="Initialize New Project"
          title="Define the scope and foundational details of your project."
          sizeDesktop="no-project"
          sizeMobile="heading-MD"
        />
      </div>

      {/* form */}
      <section className="lg:w-full lg:flex lg:items-center lg:justify-center lg:p-1">
        <div className="lg:bg-white lg:rounded-lg lg:w-2xl lg:max-w-2xl shadow-form">
          <NewProjectForm />
        </div>
      </section>
    </section>
  );
};

export default AddProjectPage;
