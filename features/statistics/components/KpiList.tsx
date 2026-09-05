import Image from "next/image";

const KpiList = () => {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-1 flex items-center justify-between rounded-lg p-6 bg-white">
        <div className="flex flex-col gap-1">
          <p className="text-label-LG font-bold text-slate-60">TOTAL TASKS</p>
          <h3 className="text-display-MD font-bold text-slate-dark">12</h3>
        </div>
        <div className="w-12 h-12 flex items-center justify-center bg-primary-10 rounded-xs">
          <Image
            src={"/assets/icons/total_task.svg"}
            alt="total task"
            width={18}
            height={20}
          />
        </div>
      </div>
      <div className="col-span-1 flex items-center justify-between rounded-lg p-6 bg-white">
        <div className="flex flex-col gap-1">
          <p className="text-label-LG font-bold text-slate-60">
            COMPLETED TASKS
          </p>
          <h3 className="text-display-MD font-bold text-slate-dark">12</h3>
        </div>
        <div className="w-12 h-12 flex items-center justify-center bg-success-20 rounded-xs">
          <Image
            src={"/assets/icons/correct_success.svg"}
            alt="completed task"
            width={20}
            height={20}
          />
        </div>
      </div>
      <div className="col-span-1 flex items-center justify-between rounded-lg p-6 bg-white">
        <div className="flex flex-col gap-1">
          <p className="text-label-LG font-bold text-slate-60">OVERDUE TASKS</p>
          <h3 className="text-display-MD font-bold text-slate-dark">12</h3>
        </div>
        <div className="w-12 h-12 flex items-center justify-center bg-error-10 rounded-xs">
          <Image
            src={"/assets/icons/overdue_task.svg"}
            alt="overdue task"
            width={22}
            height={19}
          />
        </div>
      </div>
    </div>
  );
};

export default KpiList;
