import Image from "next/image";

const DaysList = () => {
  return (
    <div className="grid grid-cols-7 gap-3">
      <div className="col-span-1 h-[1fr] p-4 rounded-lg bg-white shadow-[0px_1px_2px_0px_#0000000D]">
        {/* heading */}
        <div className="flex flex-col pb-4">
          <p className="text-label-LG font-bold text-slate-dark-40">SUN</p>
          <p className="text-title-MD font-bold text-slate-dark-60">11 May</p>
        </div>
        {/* no tasks
        <div className="flex flex-col">
          <div className="pb-2">
            <Image
              src={"/assets/icons/no_task_day.svg"}
              alt="No Task"
              width={27}
              height={30}
            />
          </div>
          <p className="text-label-XS font-bold text-slate-dark">NO TASKS</p>
        </div> */}
        {/* tasks list */}
        <div className="h-fit flex flex-col gap-2">
          <div className="p-2 rounded-xs flex items-center justify-between w-full bg-slate-10">
            <p className=" text-label-SM font-bold text-resend-timer">TO DO</p>
            <p className="text-label-LG font-bold text-slate-dark">2</p>
          </div>
          <div className="p-2 rounded-xs flex items-center justify-between w-full bg-primary-10">
            <p className=" text-label-SM font-bold text-primary">IN PROGRESS</p>
            <p className="text-label-LG font-bold text-slate-dark">2</p>
          </div>
        </div>
      </div>
      <div className="col-span-1 p-4 rounded-lg bg-white shadow-[0px_1px_2px_0px_#0000000D]"></div>
      <div className="col-span-1 p-4 rounded-lg bg-white shadow-[0px_1px_2px_0px_#0000000D]"></div>
      <div className="col-span-1 p-4 rounded-lg bg-white shadow-[0px_1px_2px_0px_#0000000D]"></div>
      <div className="col-span-1 p-4 rounded-lg bg-white shadow-[0px_1px_2px_0px_#0000000D]"></div>
      <div className="col-span-1 p-4 rounded-lg bg-white shadow-[0px_1px_2px_0px_#0000000D]"></div>
      <div className="col-span-1 p-4 rounded-lg bg-white shadow-[0px_1px_2px_0px_#0000000D]"></div>
    </div>
  );
};

export default DaysList;
