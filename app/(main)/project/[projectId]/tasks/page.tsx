import MainHeading from "@/components/layout/MainHeading";
import BreadCrumb from "@/components/ui/BreadCrumb";
import { getProject } from "@/features/project/api/getProject";
import SelectTaskView from "@/features/tasks/components/SelectTaskView";
import TasksBoardView from "@/features/tasks/components/TasksBoardView";

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

        <div className="lg:flex flex-col lg:flex-row gap-3 lg:gap-8 lg:items-center">
          <div className="relative">
            <input
              type="text"
              name="search"
              placeholder="Search for epics..."
              className="input lg:w-64! lg:mt-0! py-2.5! pe-4! ps-10! rounded-md!"
            />
            {/* <Image
              src="/assets/icons/search.svg"
              alt="search"
              width={13.5}
              height={13.5}
              className="h-full absolute top-1/2 left-3 -translate-y-1/2"
            /> */}
          </div>
          <SelectTaskView view={view} projectId={projectId} />
          {/* button to create task */}
          {/* <Link href={`/project/${projectId}/tasks/new`}>
            <button className="btn-primary-desktop lg:flex! items-center! justify-center! hidden!">
              <Image
                src="/assets/icons/plus.svg"
                alt="create task"
                width={10.5}
                height={10.5}
              />
              <span className="text-body-MD font-bold text-white">
                New Task
              </span>
            </button>
          </Link> */}
        </div>
      </div>

      {view === "board" ? <TasksBoardView projectId={projectId} /> : ""}
    </section>
  );
};

export default TasksPage;
