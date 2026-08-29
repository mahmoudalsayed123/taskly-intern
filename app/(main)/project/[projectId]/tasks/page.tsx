import MainHeading from "@/components/layout/MainHeading";
import BreadCrumb from "@/components/ui/BreadCrumb";
import { getProject } from "@/features/project/api/getProject";
import SelectTaskView from "@/components/ui/ClientTaskSelectView";
import TasksBoardView from "@/features/tasks/components/TasksBoardView";
import Link from "next/link";

import TasksListTable from "@/features/tasks/components/TasksListTable";
import PlusIcon from "@/assets/icons/plus.svg";
import SearchTask from "@/features/tasks/components/SearchTask";
import InfiniteTaskList from "@/features/tasks/components/infiniteTaskList";

const TasksPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ projectId: string }>;
  searchParams: Promise<{ view?: string; search?: string; page?: string }>;
}) => {
  const { projectId } = await params;

  // fetch project id for breadcrumb
  const { data: project } = await getProject(projectId);
  const { view = "board", page, search } = await searchParams;

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
          <SearchTask projectId={projectId} />
          <div className="w-full hidden lg:block">
            <SelectTaskView projectId={projectId} />
          </div>
          {/* button to create task */}
          {view === "list" && (
            <Link
              className="w-14 h-14 fixed bottom-20 right-11"
              href={`/project/${projectId}/tasks/new`}
            >
              <button className="w-full! h-full! p-0! rounded-lg! btn-primary-mobile lg:hidden">
                <div className="flex items-center justify-center w-4 h-4">
                  <PlusIcon width={15} height={15} />
                </div>
              </button>
            </Link>
          )}
        </div>
      </div>

      {view === "board" ? (
        <TasksBoardView projectId={projectId} search={search || ""} />
      ) : (
        <TasksListTable
          projectId={projectId}
          searchForTask={search}
          page={page}
        />
      )}

      <div className="lg:hidden">
        <InfiniteTaskList projectId={projectId} search={search} />
      </div>
    </section>
  );
};

export default TasksPage;
