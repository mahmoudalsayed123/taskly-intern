"use client";
import Logo from "@/components/layout/Logo";
import InviteCardIcon from "@/assets/icons/invite-card.svg";
import { acceptInvitation } from "@/features/member/api/acceptInvitation";
import { toastSuccess } from "@/lib/toastSuccess";
import { redirect } from "next/navigation";
import { toastFail } from "@/lib/toastFail";
import BtnAcceptInvite from "@/features/member/components/BtnAcceptInvite";

const AcceptInvitePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) => {
  const { token } = await searchParams;

  return (
    <section className="section_invite_page h-screen w-full p-6 lg:p-0 flex items-center justify-center">
      <div className="w-xl max-w-xl flex flex-col items-center gap-12">
        <Logo />
        <div className="w-full p-12 rounded-lg bg-white shadow-[0px 24px 48px -12px #041B3C0F] border-t-4 border-t-primary flex flex-col">
          <div className="mb-6 w-fit flex items-center gap-1.5 rounded-xl py-1 px-3 bg-head-table mx-auto">
            <InviteCardIcon />
            <p className="text-label-SM font-bold text-muted-body ">
              New Project Invitation
            </p>
          </div>
          <p className="mb-4 w-fit mx-auto text-body-MD lg:text-display-MD font-semibold text-slate-dark text-center">
            You've been invited to join new project
          </p>
          <BtnAcceptInvite token={token} />
        </div>
      </div>
    </section>
  );
};

export default AcceptInvitePage;
