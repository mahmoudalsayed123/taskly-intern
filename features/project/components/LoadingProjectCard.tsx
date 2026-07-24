const LoadingProjectCard = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
      <div className="w-76 h-62.5 flex flex-col gap-3 border p-6 rounded-lg shadow-[0px 1px 2px 0px #0000000D] bg-white border-border-slate-10 ">
        <div className=" h-32 animate-pulse rounded-sm bg-background-check-password w-full"></div>
        <div className="w-47 h-6 animate-pulse rounded-sm bg-background-check-password"></div>
        <div className="w-31.75 h-4 animate-pulse rounded-sm bg-background-check-password"></div>
      </div>
    </section>
  );
};

export default LoadingProjectCard;
