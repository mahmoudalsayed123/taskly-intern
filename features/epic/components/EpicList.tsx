"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Epic } from "@/types/types";
import EpicCard from "./EpicCard";
import EpicModal from "./EpicModal";
import { getEpicByTitle } from "../api/getEpicByTitle";

const EpicList = ({
  projectId,
  epics,
}: {
  projectId: string;
  epics: Epic[];
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filterEpics, setFilterEpics] = useState(epics);
  const [openModal, setOpenModal] = useState(false);
  const [selectedEpic, setSelectedEpic] = useState<Epic | null>(null);
  const search = useSearchParams();

  const searchEpic = search.get("title");

  useEffect(() => {
    async function getEpics() {
      if (searchEpic) {
        setLoading(true);
        const { data, success, message } = await getEpicByTitle(
          projectId,
          searchEpic,
        );
        if (success) {
          setFilterEpics(data);
        } else {
          setError(message || "Failed to search epics");
        }
        setLoading(false);
      } else {
        setFilterEpics(epics);
      }
    }
    getEpics();
  }, [searchEpic]);

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
      {loading ? (
        <div className="col-span-2 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-primary animate-spin" />
        </div>
      ) : (
        filterEpics.map((epic) => (
          <EpicCard
            key={epic.id}
            epic={epic}
            openEpicModal={handleOpenEpicModal}
          />
        ))
      )}

      {filterEpics.length === 0 && searchEpic && (
        <div className="col-span-2 flex items-center justify-center">
          <p className="text-slate-medium">
            No epics found matching your search
          </p>
        </div>
      )}

      {error && (
        <div className="col-span-2 flex items-center justify-center">
          <p className="text-slate-medium">{error}</p>
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
