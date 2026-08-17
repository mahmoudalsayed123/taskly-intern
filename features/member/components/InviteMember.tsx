import UserIcon from "@/assets/icons/user.svg";
import CloseIcon from "@/assets/icons/close.svg";
import EmailIcon from "@/assets/icons/email.svg";

const InviteMember = ({
  setOpenModal,
}: {
  setOpenModal: (value: boolean) => void;
}) => {
  return (
    <div className="w-full max-w-md lg:w-md rounded-t-4xl lg:rounded-lg p-8 flex flex-col gap-2.5 bg-white shadow-[0px -4px 24px 0px #041B3C0F] ">
      <div className="lg:hidden w-12 h-1.5 rounded-xl bg-slate-30 mx-auto"></div>
      {/* user icon + title + close */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1 lg:gap-2">
          <div className="w-12 h-12 rounded-lg bg-surface-low flex items-center justify-center">
            <UserIcon className="text-slate-dark" />
          </div>
          <h4 className="text-heading-MD text-slate-dark font-bold">
            Invite Team Member
          </h4>
        </div>
        <button className="cursor-pointer" onClick={() => setOpenModal(false)}>
          <CloseIcon />
        </button>
      </div>
      {/* description */}
      <p className="text-body-MD font-medium text-slate-medium">
        Send an invitation to join the Architectural Studio workspace.
      </p>
      {/* form invitation */}
      <form className="w-full h-56 lg:h-fit flex flex-col gap-6">
        {/* search email */}
        <div>
          <label className="label" htmlFor="email">
            Email
          </label>
          <div className="relative">
            <input
              className="input"
              type="email"
              name="email"
              id="email"
              placeholder="Enter email address"
            />
            <EmailIcon className="absolute right-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>
        {/* button send + close */}
        <div className="w-full pt-4 lg:pt-2 flex flex-col lg:flex-row-reverse gap-3">
          <button className="btn-primary-mobile">Send Invitation</button>
          <button
            onClick={() => setOpenModal(false)}
            className="btn-secondary-mobile"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default InviteMember;
