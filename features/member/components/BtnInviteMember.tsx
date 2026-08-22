"use client";
import MemberIcon from "@/assets/icons/members.svg";
import { useState } from "react";
import InviteMemberModal from "./InviteMemberModal";

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

        <div className="w-full absolute bottom-0 left-1/2 -translate-x-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:w-md lg:max-w-md z-200">
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
