"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Tasks } from "@/types/types";
import { getTasksList } from "../api/getTasksList";
import TaskListMobile from "./TaskListMobile";

type Props = {
  projectId: string;
  search?: string;
};

const LIMIT = 10;

export default function InfiniteTaskList({ projectId, search = "" }: Props) {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [totalTasks, setTotalTasks] = useState(0);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const isFetching = useRef(false);

  const hasMore = tasks.length < totalTasks;

  // fetch tasks
  const fetchTasks = useCallback(
    async (offset: number, reset = false) => {
      if (isFetching.current) return;

      isFetching.current = true;
      setLoading(true);

      try {
        const result = await getTasksList(projectId, LIMIT, offset, search);

        if (!result.success) {
          console.error("Failed to fetch tasks");
          return;
        }

        const newTasks = result.data;

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
    [projectId, search],
  );

  // initial fetch / search
  useEffect(() => {
    setTasks([]);
    setTotalTasks(0);

    fetchTasks(0, true);
  }, [fetchTasks]);

  // infinite scroll
  useEffect(() => {
    const element = observerRef.current;

    if (!element) return;

    if (!hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        if (isFetching.current) return;

        const nextOffset = tasks.length;

        fetchTasks(nextOffset);
      },
      {
        threshold: 0,
        rootMargin: "200px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [tasks.length, hasMore, fetchTasks]);

  return (
    <div className="flex flex-col gap-3 mt-10">
      <TaskListMobile projectId={projectId} tasks={tasks} />

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-primary animate-spin" />
        </div>
      )}

      {/* Intersection Observer Target */}
      {!loading && hasMore && <div ref={observerRef} className="h-10 w-full" />}

      {/* Optional: End Message */}
      {!loading && !hasMore && tasks.length > 0 && (
        <div className="py-6 text-center text-sm text-slate-400">
          No more tasks
        </div>
      )}
    </div>
  );
}
