"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDroppable } from "@dnd-kit/react";

import { getTasksByStatus } from "../api/getTasksByStatus";
import { Tasks } from "@/types/types";

import PlusWithCircleIcon from "@/assets/icons/plus-with-circle.svg";
import PlusSecondaryIcon from "@/assets/icons/plus-slate.svg";

import { statusBackgroundColors } from "@/constants/constants";
import TasksListBoard from "./TasksListBoard";

type Status = {
  label: string;
  value: string;
};

const LIMIT = 10;

const TasksColumns = ({
  status,
  projectId,
  search = "",
  openTaskModal,
  isDrop,
  setIsDrop,
}: {
  status: Status;
  projectId: string;
  search?: string;
  openTaskModal: (task: Tasks) => void;
  isDrop: boolean;
  setIsDrop: (value: boolean) => void;
}) => {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [totalTasks, setTotalTasks] = useState(0);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const isFetching = useRef(false);

  const { ref: dropRef, isDropTarget } = useDroppable({
    id: `column-${status.value}`,
    collisionPriority: 1,
  });

  const hasMore = tasks.length < totalTasks;

  const fetchTasks = useCallback(
    async (offset: number, reset = false) => {
      if (isFetching.current) return;

      isFetching.current = true;
      setLoading(true);

      try {
        const result = await getTasksByStatus(
          projectId,
          LIMIT,
          offset,
          search,
          status.label,
        );

        if (!result.success) return;

        const newTasks = result.data ?? [];

        const total = Number(result.totalCount?.split("/")[1] ?? 0);

        setTotalTasks(total);

        if (reset) {
          setTasks(newTasks);
        } else {
          setTasks((prev) => [...prev, ...newTasks]);
        }
      } finally {
        setLoading(false);
        isFetching.current = false;
      }
    },
    [projectId, status.label, search],
  );

  useEffect(() => {
    setTasks([]);
    setTotalTasks(0);

    fetchTasks(0, true);
  }, [fetchTasks]);


  useEffect(() => {
    const element = observerRef.current;

    if (!element || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (isFetching.current) return;

        fetchTasks(tasks.length);
      },
      {
        threshold: 0,
        rootMargin: "150px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [tasks.length, hasMore, fetchTasks]);

  return (
    <div
      ref={dropRef}
      className={`
        w-72
        flex
        flex-col
        gap-4
        shrink-0
        rounded-lg
        transition
        ${isDropTarget ? "bg-surface-low" : ""}
      `}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              statusBackgroundColors[
                status.label as keyof typeof statusBackgroundColors
              ]
            }`}
          />

          <span className="text-label-SM font-bold text-task-label">
            {status.label}
          </span>

          <p
            className={`py-0.5 px-1.5 rounded-xs text-label-SM font-normal text-slate-dark ${
              statusBackgroundColors[
                status.label as keyof typeof statusBackgroundColors
              ]
            }`}
          >
            {totalTasks}
          </p>
        </div>

        <Link href={`/project/${projectId}/tasks/new?status=${status.value}`}>
          <PlusSecondaryIcon />
        </Link>
      </div>

      <Link
        href={`/project/${projectId}/tasks/new?status=${status.value}`}
        className="flex items-center justify-center gap-2 py-4 rounded-lg border-2 border-dashed border-slate-30"
      >
        <PlusWithCircleIcon />

        <p className="text-label-SM font-bold text-muted-body-60 uppercase">
          ADD NEW TASK
        </p>
      </Link>

      <TasksListBoard
        tasks={tasks}
        status={status.label}
        openTaskModal={openTaskModal}
      />

      {loading && (
        <div className="flex items-center justify-center py-4">
          <div className="w-6 h-6 rounded-full border-4 border-slate-200 border-t-primary animate-spin" />
        </div>
      )}

      {!loading && hasMore && <div ref={observerRef} className="h-10 w-full" />}
    </div>
  );
};

export default TasksColumns;
