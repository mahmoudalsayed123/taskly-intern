"use client";

import { getInitials } from "@/lib/getInitials";
import { formatCreatedAt, formateDeadline } from "@/lib/helper";

import HorizontalDots from "@/assets/icons/dots-horizontal.svg";
import Dots from "@/assets/icons/dots.svg";

import User from "@/assets/icons/user-dark.svg";
import Date from "@/assets/icons/date.svg";
import { Epic } from "@/types/types";

import NoUserIcon from "@/assets/icons/noUser.svg";

const EpicCard = ({
  epic,
  openEpicModal,
}: {
  epic: Epic;
  openEpicModal: (epic: Epic) => void;
}) => {
  const initials = getInitials(epic.assignee.name);
  return (
    <>
      <div
        onClick={() => openEpicModal(epic)}
        className="col-span-1 p-5 gap-3 lg:gap-0 lg:p-4 rounded-lg flex flex-col bg-white lg:border-s-4 lg:border-border-epic shadow-btn cursor-pointer"
      >
        <div
          className="flex items-center justify-between lg:pb-4
"
        >
          <p className=" py-1 px-2.5 rounded-xs bg-surface-highest lg:bg-success lg:text-success-message text-label-SM font-bold text-primary uppercase">
            {epic.epic_id}
          </p>
          <HorizontalDots className="block lg:hidden" />
          <Dots className="hidden lg:block" />
        </div>
        <h3 className="text-title-MD lg:text-heading-SM font-semibold text-slate-dark lg:pb-3">
          {epic.title}
        </h3>
        {/* assignee + date (mobile) */}
        <div className="flex lg:hidden items-center justify-between pt-1.5 lg:gap-6 ">
          {/* assignee */}
          {epic.assignee.name ? (
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
          ) : (
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 flex items-center justify-center bg-background-check-password rounded-xl ">
                <NoUserIcon width={10.5} height={10.5} />
              </div>
              <p className="text-label-SM font-semibold text-resend-timer">
                Unassigned
              </p>
            </div>
          )}

          {/* date (mobile) */}
          <div className="flex flex-col">
            <p className="text-label-SM font-bold text-resend-timer">
              Deadline
            </p>
            <p className="text-label-SM font-medium text-slate-dark">
              {formateDeadline(epic.deadline)}
            </p>
          </div>
        </div>

        {/* assignee + date (desktop) */}
        <div className="hidden lg:flex lg:flex-col  lg:items-between lg:gap-6 border-t border-border-slate-10">
          {/* assignee */}
          {epic.assignee.name ? (
            <div className="flex items-center gap-3">
              <div className="py-2.5 w-10 h-10 rounded-xl bg-primary-container lg:bg-assignee-container flex items-center justify-center text-label-SM font-bold text-assignee-epic-card">
                {initials}
              </div>
              <div className="flex flex-col">
                <p className="text-body-MD lg:text-body-MD font-medium text-slate-dark">
                  {epic.assignee.name}
                </p>
                <p className="text-label-LG font-normal text-resend-timer">
                  Assignee
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 flex items-center justify-center bg-background-check-password rounded-xl ">
                <NoUserIcon width={10.5} height={10.5} />
              </div>
              <p className="text-label-SM font-semibold text-resend-timer">
                Unassigned
              </p>
            </div>
          )}
          {/* created by */}
          <div className="flex items-center justify-between lg:pt-4 border-t border-t-surface-low">
            <div className="flex items-center gap-2">
              <User />
              <p className="text-label-SM font-semibold text-muted-body-30">
                Created By:
              </p>
              <p className="text-label-SM font-semibold text-slate-dark">
                {epic.created_by.name}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Date />
              <p className="text-label-SM font-normal text-muted-body-30">
                {formatCreatedAt(epic.created_at)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EpicCard;
