import MainHeading from "@/components/layout/MainHeading";
import Image from "next/image";

const MembersPage = () => {
  return (
    <section>
      <div>
        {/* main heading + breadcrumb */}
        <div className="">
          <MainHeading
            heading="Project Members"
            title=""
            sizeDesktop="title-MD"
            sizeMobile="heading-MD"
          />
        </div>
        <button className="btn-primary-desktop">
          <Image
            src="/assets/icons/user.svg"
            alt="invite"
            width={18.33}
            height={13.33}
          />
          <p>Invite Member</p>
        </button>
      </div>
    </section>
  );
};

export default MembersPage;
