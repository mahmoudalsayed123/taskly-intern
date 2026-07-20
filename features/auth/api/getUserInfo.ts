"use server";

import { cookies } from "next/headers";
import { refreshToken } from "./refresh-token";
import { redirect } from "next/navigation";
import { fetchUser } from "./fetchUser";

export async function getUserInfo() {
  const cookieStore = await cookies();

  let accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) redirect("/login");

  try {
    let res = await fetchUser(accessToken);

    if (res.status === 401 || res.status === 403) {
      const refreshed = await refreshToken();

      if (!refreshed?.success) {
        redirect("/login");
      }

      res = await fetchUser(accessToken);
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
