const MainHeading = ({
  heading,
  title,
  sizeDesktop,
  sizeMobile,
}: {
  heading: string;
  title: string;
  sizeDesktop?: string;
  sizeMobile?: string;
}) => {
  return (
    <div className=" flex flex-col gap-1.72">
      <h1
        className={`text-${sizeMobile} md:text-${sizeDesktop} font-semibold text-slate-dark`}
      >
        {heading}
      </h1>
      <p className="text-body-MD font-normal text-muted-body ">{title}</p>
    </div>
  );
};

export default MainHeading;
