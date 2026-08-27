"use client";
import SearchIcon from "@/assets/icons/search.svg";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SearchTask = ({ projectId }: { projectId: string }) => {
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }
      router.push(`/project/${projectId}/tasks?${params.toString()}`);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="relative">
      <input
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        type="text"
        name="search"
        value={search}
        placeholder="Search for tasks..."
        className="input lg:m-0! w-full! lg:w-75.75! h-12! rounded-xs! py-1.5! px-3! ps-7! placeholder:text-body-MD placeholder:font-normal placeholder:text-resend-timer"
      />
      <SearchIcon className="text-slate-medium cursor-pointer absolute top-1/2 left-3 -translate-y-1/2" />
    </div>
  );
};

export default SearchTask;
