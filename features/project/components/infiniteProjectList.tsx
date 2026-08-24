"use client";

import { useEffect, useRef, useState } from "react";
import ProjectList from "./ProjectList";
import { Project } from "@/types/types";

type Props = {
  initialProjects: Project[];
  totalProjects: number;
};

export default function InfiniteProjectList({
  initialProjects,
  totalProjects,
}: Props) {
  const [projects, setProjects] = useState(initialProjects);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const isFetching = useRef(false);

  const hasMore = projects.length < totalProjects;

  useEffect(() => {
    if (!observerRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;

        if (isFetching.current) return;

        isFetching.current = true;

        setLoading(true);

        try {
          // Delay 3 seconds
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const res = await fetch(`/api/projects?page=${page}`);
          const result = await res.json();
          if (result.success) {
            setProjects((prev) => [...prev, ...result.data]);
            setPage((prev) => prev + 1);
          }
        } finally {
          setLoading(false);
          isFetching.current = false;
        }
      },
      {
        threshold: 0.5,
      },
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [page, hasMore]);

  return (
    <>
      <ProjectList projects={projects} />

      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-primary animate-spin" />
        </div>
      )}

      {hasMore && <div ref={observerRef} className="h-10 w-full" />}
    </>
  );
}
