const MainHeading = ({
  heading,
  title,
  resetSection,
}: {
  heading: string;
  title: string;
  resetSection: boolean;
}) => {
  return (
    <div className=" flex flex-col md:text-center gap-1.72">
      <h1 className="text-[28px] md:text-[30px] font-semibold text-slate-dark">
        {heading}
      </h1>
      <p className=" text-body-MD font-normal text-muted-body">{title}</p>
    </div>
  );
};

export default MainHeading;
