const MainHeading = ({
  heading,
  title,
}: {
  heading: string;
  title: string;
}) => {
  return (
    <div className=" flex flex-col gap-1.72">
      <h1 className="text-heading-MD md:text-heading-LG font-semibold text-slate-dark">
        {heading}
      </h1>
      <p className=" text-body-MD font-normal text-muted-body ">{title}</p>
    </div>
  );
};

export default MainHeading;
