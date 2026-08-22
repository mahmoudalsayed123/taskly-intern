import UserIcon from "@/assets/icons/user.svg";
import CloseIcon from "@/assets/icons/close.svg";
import EmailIcon from "@/assets/icons/email.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inviteMemberSchema } from "@/lib/zodSchema";
import { toast } from "sonner";
import z from "zod";
import ErrorField from "@/components/ui/ErrorField";
import { inviteMember } from "../api/inviteMember";
import Spinner from "@/components/ui/Spinner";

const InviteMember = ({
  setOpenModal,
  projectId,
}: {
  setOpenModal: (value: boolean) => void;
  projectId: string;
}) => {
  type inviteMemberFormValues = z.infer<typeof inviteMemberSchema>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<inviteMemberFormValues>({
    mode: "onChange",
    resolver: zodResolver(inviteMemberSchema),
  });

  const onSubmit = async (data: { p_email: string }) => {
    try {
      const invitation = {
        p_email: data.p_email,
        p_project_id: projectId,
        p_app_url: "http://localhost:3000",
        p_base_url: "https://onlrxfthsuzjvlkwaddj.supabase.co",
      };
      const member = await inviteMember(invitation);
      if (member) {
        toast.success("Invitation sent successfully");
        reset();
        setOpenModal(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-56 lg:h-fit flex flex-col gap-6"
      >
        {/* search email */}
        <div>
          <label className="label" htmlFor="email">
            Email
          </label>
          <div className="relative">
            <input
              className="input"
              type="email"
              id="email"
              placeholder="Enter email address"
              {...register("p_email")}
            />
            <EmailIcon className="absolute right-4 top-1/2 -translate-y-1/2" />
          </div>
          <ErrorField message={errors.p_email?.message} />
        </div>
        {/* button send + close */}
        <div className="w-full pt-4 lg:pt-2 flex flex-col lg:flex-row-reverse gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary-mobile btn-primary-desktop"
          >
            {isSubmitting ? <Spinner content="Sending" /> : "Send Invitation"}
          </button>
          <button
            onClick={() => setOpenModal(false)}
            className="btn-secondary-mobile btn-secondary-desktop"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default InviteMember;
