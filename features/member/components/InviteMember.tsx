import UserIcon from "@/assets/icons/user.svg";
import CloseIcon from "@/assets/icons/close.svg";
import { SetStateAction } from "react";

const InviteMember = ({
  setOpenModal,
}: {
  setOpenModal: (value: boolean) => void;
}) => {
  return (
    <div className="w-full max-w-md rounded-t-4xl p-8 flex flex-col gap-2.5 bg-white shadow-[0px -4px 24px 0px #041B3C0F]">
      <div className="w-12 h-1.5 rounded-xl bg-slate-30 mx-auto"></div>
      {/* user icon + title + close */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="w-12 h-12 rounded-lg bg-surface-low flex items-center justify-center">
            <UserIcon />
          </div>
          <h4 className="text-heading-MD text-slate-dark font-bold">
            Invite Team Member
          </h4>
        </div>
        <button onClick={() => setOpenModal(false)}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

export default InviteMember;
