"use server";

import { cookies } from "next/headers";
import { refreshToken } from "./refresh-token";
import { redirect } from "next/navigation";

export async function getUser() {
  const cookieStore = await cookies();

  let accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) return;

  try {
    let res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/v1/user`, {
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.status === 401 || res.status === 403) {
      const refreshed = await refreshToken();

      if (!refreshed) {
        redirect("/login");
      }

      accessToken = refreshed.access_token;

      res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/v1/user`, {
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
    if (!res.ok) {
      return {
        success: false,
        error: "Failed to get user",
      };
    }

    const data = await res.json();

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
}
