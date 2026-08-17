"use client";
import MemberIcon from "@/assets/icons/members.svg";
import { useState } from "react";
import InviteMember from "./InviteMember";

const BtnInviteMember = ({ projectId }: { projectId: string }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpenModal((e) => !e)}
        className="hidden! lg:flex! btn-primary-desktop lg:gap-2"
      >
        <MemberIcon />
        <p>Invite Member</p>
      </button>

      <div className={openModal ? "block" : "hidden"}>
        {/* Overlay */}
        <div
          className="fixed inset-0 z-100 bg-overlay/40 backdrop-blur-md"
          onClick={() => setOpenModal(false)}
        />

        <div className="w-full p-4 absolute bottom-0 left-1/2 -translate-x-1/2 max-w-md lg:w-2xl lg:max-w-2xl z-200">
          <InviteMember setOpenModal={setOpenModal} />
        </div>
      </div>
    </>
  );
};

export default BtnInviteMember;
