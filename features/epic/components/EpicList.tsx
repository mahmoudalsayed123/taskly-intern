"use client";
import { Epic } from "@/constants/constants";
import EpicCard from "./EpicCard";
import { useState } from "react";
import EpicModal from "./EpicModal";

const EpicList = ({
  projectId,
  epics,
}: {
  projectId: string;
  epics: Epic[];
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
    <section className="mt-6 lg:mt-10 grid gird-cols-1 lg:grid-cols-2  gap-6">
      {epics.map((epic) => (
        <EpicCard
          key={epic.id}
          epic={epic}
          openEpicModal={handleOpenEpicModal}
        />
      ))}

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
