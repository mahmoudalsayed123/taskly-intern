import Image from "next/image";

const StatisticsAnalyst = () => {
  return (
    <div className="grid grid-cols-2 gap-8">
      {/* charts */}
      <div className="col-span-1 p-8 flex flex-col gap-12 w-full rounded-lg bg-white shadow-[0px_1px_2px_0px_#0000000D]">
        <h3 className="text-title-MD font-bold text-slate-dark">
          Tasks by Status
        </h3>
        <div className="flex items-center gap-10">
          <div>
            <Image
              src={"/assets/icons/chart.svg"}
              alt="chart"
              width={180}
              height={180}
            />
          </div>
          {/* status list */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              {/* color dot */}
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              {/* status text */}
              <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center justify-between">
                  <p className="text-label-LG  font-bold text-slate-dark-70">
                    TO DO
                  </p>
                  <p className="text-label-LG font-bold text-slate-dark">12</p>
                </div>
                <div className="relative w-full h-1 rounded-xl bg-background-check-password">
                  <div className="w-1/3 h-full absolute top-0 left-0 rounded-xl bg-primary"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* color dot */}
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              {/* status text */}
              <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center justify-between">
                  <p className="text-label-LG  font-bold text-slate-dark-70">
                    TO DO
                  </p>
                  <p className="text-label-LG font-bold text-slate-dark">12</p>
                </div>
                <div className="relative w-full h-1 rounded-xl bg-background-check-password">
                  <div className="w-1/3 h-full absolute top-0 left-0 rounded-xl bg-primary"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* color dot */}
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              {/* status text */}
              <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center justify-between">
                  <p className="text-label-LG  font-bold text-slate-dark-70">
                    TO DO
                  </p>
                  <p className="text-label-LG font-bold text-slate-dark">12</p>
                </div>
                <div className="relative w-full h-1 rounded-xl bg-background-check-password">
                  <div className="w-1/3 h-full absolute top-0 left-0 rounded-xl bg-primary"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* all projects */}
      <div className="col-span-1 p-8 flex flex-col gap-10 w-full rounded-lg bg-white shadow-[0px_1px_2px_0px_#0000000D]">
        <h3 className="text-title-MD font-bold text-slate-dark">
          All Projects
        </h3>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-label-LG font-bold text-slate-dark-70">
              Skyline Residency
            </p>
            <p className="text-label-LG font-bold text-slate-dark">23 Tasks</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-label-LG font-bold text-slate-dark-70">
              Skyline Residency
            </p>
            <p className="text-label-LG font-bold text-slate-dark">23 Tasks</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-label-LG font-bold text-slate-dark-70">
              Skyline Residency
            </p>
            <p className="text-label-LG font-bold text-slate-dark">23 Tasks</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsAnalyst;
