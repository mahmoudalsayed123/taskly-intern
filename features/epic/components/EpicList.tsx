"use client";

import { useState } from "react";

import { Epic } from "@/types/types";
import EpicCard from "./EpicCard";
import EpicModal from "./EpicModal";

const EpicList = ({
  projectId,
  epics,
  epicsError,
  searchEpics,
  loading,
}: {
  projectId: string;
  epics: Epic[];
  epicsError: string;
  searchEpics: string | null;
  loading: boolean;
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedEpic, setSelectedEpic] = useState<Epic | null>(null);

  const handleOpenEpicModal = (epic: Epic) => {
    setSelectedEpic(epic);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedEpic(null);
    setOpenModal(false);
  };

  return (
    <section className="mt-6 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 justify-between gap-6 lg:mt-10">
      {loading
        ? Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="col-span-1 p-5 gap-3 lg:gap-4 lg:p-4 rounded-lg flex flex-col bg-white lg:border-s-4 lg:border-border-epic shadow-btn cursor-pointer"
            >
              {/* epic_id, dots */}
              <div className="flex items-center justify-between">
                <div className="w-20 h-5 rounded-xs bg-background-check-password animate-pulse"></div>
                <div className="w-8 h-8 rounded-xl animate-pulse bg-background-check-password"></div>
              </div>
              {/* title */}
              <div className="w-full h-6 animate-pulse rounded-xs bg-background-check-password"></div>

              {/* assignee */}
              <div className="w-full pt-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl animate-pulse bg-background-check-password"></div>
                <div className="w-32 h-5 rounded-xs animate-pulse bg-background-check-password"></div>
              </div>
              {/* border + created by + date  */}
              <div className="flex flex-col pt-2 gap-2">
                <div className="w-full h-1.5 rounded-xs animate-pulse bg-background-check-password"></div>
                <div className="flex items-center justify-between">
                  <div className="w-12 h-3 rounded-xs animate-pulse bg-background-check-password"></div>
                  <div className="w-12 h-3 rounded-xs animate-pulse bg-background-check-password"></div>
                </div>
              </div>
            </div>
          ))
        : epics.map((epic) => (
            <EpicCard
              key={epic.id}
              epic={epic}
              openEpicModal={handleOpenEpicModal}
            />
          ))}

      {epics.length === 0 && searchEpics && (
        <div className="col-span-2 flex items-center justify-center">
          <p className="text-slate-medium">
            No epics found matching your search
          </p>
        </div>
      )}

      {epicsError && (
        <div className="col-span-2 flex items-center justify-center">
          <p className="text-slate-medium">{epicsError}</p>
        </div>
      )}

      {openModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-overlay/40 backdrop-blur-md"
            onClick={handleCloseModal}
          />

          {/* Modal */}
          <div className="w-full p-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md lg:w-2xl lg:max-w-2xl z-200">
            <EpicModal
              projectId={projectId}
              epicId={selectedEpic!.id}
              closeModal={handleCloseModal}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default EpicList;
