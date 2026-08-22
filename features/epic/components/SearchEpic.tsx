"use client";
import SearchIcon from "@/assets/icons/search.svg";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SearchEpic = ({
  projectId,
}: {
  projectId: string;
}) => {
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("title") || "");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearch) {
      params.set("title", debouncedSearch.replace(" ", ""));
    } else {
      params.delete("title");
    }
    router.push(`/project/${projectId}/epics?${params.toString()}`);
  }, [debouncedSearch]);
  return (
    <div className="relative">
      <input
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        type="text"
        name="title"
        value={debouncedSearch}
        placeholder="Search for epics..."
        className="input lg:m-0! w-full! lg:w-75.75! h-12! rounded-xs! py-1.5! px-3! ps-7! placeholder:text-body-MD placeholder:font-normal placeholder:text-resend-timer"
      />
      <SearchIcon className="text-slate-medium cursor-pointer absolute top-1/2 left-3 -translate-y-1/2" />
    </div>
  );
};

export default SearchEpic;
