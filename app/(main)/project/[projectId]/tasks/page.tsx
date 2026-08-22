import MainHeading from "@/components/layout/MainHeading";
import BreadCrumb from "@/components/ui/BreadCrumb";
import { getProject } from "@/features/project/api/getProject";
import SelectTaskView from "@/features/tasks/components/SelectTaskView";
import TasksBoardView from "@/features/tasks/components/TasksBoardView";
import Link from "next/link";

import SearchIcon from "@/assets/icons/search.svg";
import TasksListTable from "@/features/tasks/components/TasksListTable";
import PlusIcon from "@/assets/icons/plus.svg";
import TaskListMobile from "@/features/tasks/components/TaskListMobile";

const TasksPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ projectId: string }>;
  searchParams: Promise<{ view?: string }>;
}) => {
  const { projectId } = await params;
  const { data: project } = await getProject(projectId);
  const { view = "board" } = await searchParams;

  return (
    <section className="pt-4 px-6 pb-32 lg:p-0">
      {/* main headig and breadcrumb + search + create epic button  */}
      <div className="lg:flex lg:items-center lg:justify-between">
        {/* main heading */}
        <div className="hidden lg:flex flex-col gap-4 text-display-MD lg:flex-1">
          <BreadCrumb
            items={[
              { label: "Project", href: "/project" },
              {
                label: project?.[0]?.name,
                href: `/project/${projectId}`,
                noRedirect: true,
              },
              { label: "Tasks", href: `/project/${projectId}/tasks` },
            ]}
          />
          <MainHeading
            heading="Active Workboard"
            title="Curating Project Alpha's production pipeline and milestones."
            sizeDesktop="display-MD"
            sizeMobile="display-MD"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-5 lg:gap-8 lg:items-center">
          <div className="relative">
            <input
              type="text"
              name="search"
              placeholder="Search for tasks..."
              className="input lg:w-64! mt-0! py-2.5! pe-4! ps-10! rounded-md! placeholder:text-body-MD!"
            />
            <SearchIcon className="text-slate-medium cursor-pointer absolute top-1/2 left-3 -translate-y-1/2" />
          </div>
          <div className="w-full hidden lg:block">
            <SelectTaskView view={view} projectId={projectId} />
          </div>
          {/* button to create task */}
          {view === "list" && (
            <Link
              className="fixed bottom-20 right-10"
              href={`/project/${projectId}/tasks/new`}
            >
              <button className="btn-primary-mobile lg:hidden">
                <PlusIcon />
              </button>
            </Link>
          )}
        </div>
      </div>

      {view === "board" ? (
        <TasksBoardView projectId={projectId} />
      ) : (
        <TasksListTable projectId={projectId} />
      )}

      <TaskListMobile projectId={projectId} />
    </section>
  );
};

export default TasksPage;
