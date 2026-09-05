import MainHeading from "@/components/layout/MainHeading";
import DateRange from "@/features/statistics/components/DateRange";
import DaysList from "@/features/statistics/components/DaysList";
import KpiList from "@/features/statistics/components/KpiList";
import ProjectsSelect from "@/features/statistics/components/ProjectsSelect";
import StatisticsAnalyst from "@/features/statistics/components/StatisticsAnalyst";
import StatusSelect from "@/features/statistics/components/StatusSelect";

const MyStatisticsPage = () => {
  return (
    <section className="flex flex-col gap-8">
      {/* main heading */}
      <div>
        <MainHeading
          title="Manage your deadlines and track team velocity."
          heading="Weekly Planner"
          sizeMobile="text-lg"
          sizeDesktop="display-MD"
        />
      </div>

      {/* date picker + projects filter + status filter */}
      <div className="relative p-4 rounded-lg flex items-center justify-between bg-surface-low">
        {/* date picker */}
        <DateRange />
        {/*  projects filter + status filter */}
        <div className="flex items-center gap-2">
          <ProjectsSelect />
          <StatusSelect />
        </div>
      </div>

      {/* kpi list */}
      <KpiList />

      {/* days list */}
      <DaysList />

      {/* statistics analyst */}
      <StatisticsAnalyst />
    </section>
  );
};

export default MyStatisticsPage;
