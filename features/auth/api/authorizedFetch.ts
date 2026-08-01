"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { refreshToken } from "@/features/auth/api/refresh-token";

export async function authorizedFetch(url: string, options: RequestInit = {}) {
  const cookieStore = await cookies();

  let accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    await refreshToken();

    accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      redirect("/login");
    }
  }

  let response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
      apikey: process.env.API_KEY!,
      "Content-Type": "application/json",
    },
  });

  if (response.status === 401 || response.status === 403) {
    await refreshToken();

    accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      redirect("/login");
    }

    response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
        apikey: process.env.API_KEY!,
        "Content-Type": "application/json",
      },
    });
  }

  return response;
}
