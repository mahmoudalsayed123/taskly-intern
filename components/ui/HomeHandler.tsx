"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomeHandler() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;

    if (hash.includes("type=recovery")) {
      const params = new URLSearchParams(hash.substring(1));

      const token = params.get("access_token");

      router.replace(`/reset-password?access_token=${token}`);
      return;
    }

    router.replace("/project");
  }, [router]);

  return null;
}
