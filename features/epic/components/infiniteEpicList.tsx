"use client";

import { useEffect, useRef, useState } from "react";
import { Epic } from "@/constants/constants";
import EpicList from "./EpicList";

type Props = {
  initialEpics: Epic[];
  totalEpics: number;
};

export default function InfiniteEpicList({ initialEpics, totalEpics }: Props) {
  const [epics, setEpics] = useState(initialEpics);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const isFetching = useRef(false);

  const hasMore = epics.length < totalEpics;

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
          const res = await fetch(`/api/epic?page=${page}`);
          const result = await res.json();
          if (result.success) {
            setEpics((prev) => [...prev, ...result.data]);
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
      <EpicList epics={epics} />

      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-primary animate-spin" />
        </div>
      )}

      {hasMore && <div ref={observerRef} className="h-10 w-full" />}
    </>
  );
}
