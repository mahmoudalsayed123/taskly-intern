import { Epic } from "@/constants/constants";
import { getInitials } from "@/lib/getInitials";
import Image from "next/image";

const EpicCard = ({ epic }: { epic: Epic }) => {
  const initials = getInitials(epic.assignee.name);
  return (
    <div className="col-span-1 p-5 gap-3 lg:p-4 rounded-lg flex flex-col bg-white lg:border-s-4 lg:border-border-epic shadow-btn">
      <div
        className="flex items-center justify-between lg:pb-4
"
      >
        <p className="w-fit h-6.5 py-1 px-2 rounded-xs bg-surface-highest lg:bg-success lg:text-success-message text-label-SM font-bold text-primary uppercase">
          {epic.epic_id}
        </p>
        <Image
          src="/assets/icons/dots-horizontal.svg"
          alt="dots"
          width={4}
          height={16}
          className="block lg:hidden"
        />
        <Image
          src="/assets/icons/dots.svg"
          alt="dots"
          width={4}
          height={16}
          className="hidden lg:block"
        />
      </div>
      <h3 className="text-title-MD lg:text-heading-SM font-semibold text-slate-dark lg:pb-3">
        {epic.title}
      </h3>
      {/* assignee + date (mobile) */}
      <div className="flex items-center justify-between pt-1.5 lg:pb-6">
        {/* assignee */}
        <div className="flex items-center gap-3">
          <div className="py-1.5 w-7 h-7 rounded-xl bg-primary-container lg:bg-assignee-container flex items-center justify-center text-label-SM font-bold text-white">
            {initials}
          </div>
          <div className="flex flex-col">
            <p className="text-label-SM lg:text-body-MD font-medium text-slate-dark">
              {epic.assignee.name}
            </p>
            <p className="text-label-SM font-normal text-resend-timer">
              Assignee
            </p>
          </div>
        </div>

        {/* date (mobile) */}
        <div className="flex flex-col lg:hidden">
          <p className="text-label-SM font-bold text-resend-timer">Deadline</p>
          <p className="text-label-SM font-medium text-slate-dark">
            Oct 24, 23
          </p>
        </div>
      </div>

      {/* date (desktop) */}
      <div className="hidden lg:flex lg:items-center lg:justify-between border-t border-border-slate-10">
        {/* created by */}
        <div className="flex items-center gap-2">
          <Image
            src={"/assets/icons/user-dark.svg"}
            alt=""
            width={11}
            height={10}
          />
          <p className="text-label-SM font-semibold text-muted-body-30">
            Created By:
          </p>
          <p className="text-label-SM font-semibold text-slate-dark">
            {epic.created_by.name}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Image
            src={"/assets/icons/date.svg"}
            alt="date"
            width={10.5}
            height={11.67}
          />
          <p className="text-label-SM font-normal text-muted-body-30">
            22 Oct 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default EpicCard;
