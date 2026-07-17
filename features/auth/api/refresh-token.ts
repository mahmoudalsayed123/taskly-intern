"use server";

import { cookies } from "next/headers";

export async function refreshToken() {
  try {
    const cookieStore = await cookies();

    const refreshToken = cookieStore.get("refresh_token")?.value;

    if (!refreshToken) {
      return false;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/v1/token?grant_type=refresh_token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
        },
        body: JSON.stringify({
          refresh_token: refreshToken,
        }),
      },
    );

    if (!response.ok) {
      return false;
    }

    const result = await response.json();

    cookieStore.set("access_token", result.access_token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });

    cookieStore.set("refresh_token", result.refresh_token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
