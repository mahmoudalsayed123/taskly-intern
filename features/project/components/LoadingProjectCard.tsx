const LoadingProjectCard = () => {
  return (
    <div className="p-6 lg:h-55 lg:w-76 rounded-lg flex flex-col items-start justify-between gap-4 shadow-[0px 1px 2px 0px #0000000D] bg-white">
      <div className=" h-32 animate-pulse rounded-sm bg-background-check-password w-full"></div>
      <div className="w-47 h-6 animate-pulse rounded-sm bg-background-check-password"></div>
      <div className="w-31.75 h-4 animate-pulse rounded-sm bg-background-check-password"></div>
    </div>
  );
};

export default LoadingProjectCard;
