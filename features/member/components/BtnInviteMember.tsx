"use client";
import { useState } from "react";
import InviteMemberModal from "./InviteMemberModal";

import UserIcon from "@/assets/icons/user.svg";

const BtnInviteMember = ({ projectId }: { projectId: string }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpenModal((e) => !e)}
        className="fixed bottom-20 right-10 lg:static lg:flex! btn-primary-desktop lg:gap-2 w-10! h-10! lg:w-fit! lg:h-fit! flex items-center justify-center rounded-lg py-3 px-6"
      >
        <UserIcon />
        <p className="hidden lg:block text-body-MD font-bold">Invite Member</p>
      </button>

      <div className={openModal ? "block" : "hidden"}>
        {/* Overlay */}
        <div
          className="fixed inset-0 z-100 bg-overlay/40 backdrop-blur-md"
          onClick={() => setOpenModal(false)}
        />

        <div className="w-full fixed bottom-0 left-1/2 -translate-x-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:w-md lg:max-w-md z-200 bg-red-400">
          <InviteMemberModal
            setOpenModal={setOpenModal}
            projectId={projectId}
          />
        </div>
      </div>
    </>
  );
};

export default BtnInviteMember;
