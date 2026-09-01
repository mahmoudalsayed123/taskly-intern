"use client";

import BtnAdd from "@/components/ui/BtnAdd";
import EpicList from "./EpicList";
import InfiniteEpicList from "./infiniteEpicList";
import Pagination from "@/components/ui/Pagination";
import { useEffect, useState } from "react";
import { Epic } from "@/types/types";
import { getProjectEpics } from "../api/getProjectEpics";
import { useSearchParams } from "next/navigation";

const EpicsPageContainer = ({
  projectId,
  page,
}: {
  projectId: string;
  page: string;
}) => {
  const [epics, setEpics] = useState<Epic[]>([]);
  const [totalEpics, setTotalEpics] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [epicsShowing, setEpicsShowing] = useState<number>(0);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const search = useSearchParams();
  const searchEpics = search.get("title");

  useEffect(() => {
    const fetchEpics = async () => {
      const currentPage = searchEpics ? 1 : Number(page || 1);
      setCurrentPage(currentPage);
      const limit = 10;

      const offset = (currentPage - 1) * limit;

      setLoading(true);
      setEpics([]);
      const { success, data, totalCount, message } = await getProjectEpics(
        projectId,
        limit,
        offset,
        searchEpics || "",
      );
      if (success) {
        setEpics(data);
        setTotalEpics(Number(totalCount?.split("/")[1]));
        const epicShowing = Number(totalCount?.split("/")[0]?.split("-")[1]);
        setEpicsShowing(epicShowing || 0);
        if (searchEpics) {
          setTotalPages(Math.ceil(Number(totalCount?.split("/")[1]) / limit));
        } else {
          setTotalPages(Math.ceil(Number(totalCount?.split("/")[1]) / limit));
        }
        setError("");
      } else {
        setError(message || "Failed to fetch epics");
      }
      setLoading(false);
    };
    fetchEpics();
  }, [searchEpics, page]);

  return (
    <>
      <div className="hidden lg:block">
        <EpicList
          projectId={projectId}
          epics={epics}
          epicsError={error}
          searchEpics={searchEpics}
          loading={loading}
        />
      </div>
      <div className="lg:hidden">
        <InfiniteEpicList
          initialEpics={epics}
          totalEpics={totalEpics}
          projectId={projectId}
        />
      </div>

      <BtnAdd path={`/project/${projectId}/epics/new`} />

      {/* pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          numberOfShowing={epicsShowing || 0}
          totalItems={totalEpics}
          route={`/project/${projectId}/epics`}
          searchEpics={searchEpics || ""}
          loading={loading}
        />
      )}
    </>
  );
};

export default EpicsPageContainer;
