"use server";

import { cookies } from "next/headers";
import { deleteCookies } from "@/lib/deleteCookies";
import { redirect } from "next/navigation";

export async function refreshToken() {
  const cookieStore = await cookies();

  const deleteCookiesAndGoToLogin = async () => {
    await deleteCookies();
    redirect("/login");
  };

  try {
    const refreshToken = cookieStore.get("refresh_token")?.value;

    if (!refreshToken) {
      redirect("/login");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/v1/token?grant_type=refresh_token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.API_KEY!,
        },
        body: JSON.stringify({
          refresh_token: refreshToken,
        }),
      },
    );

    if (!response.ok) {
      deleteCookiesAndGoToLogin();
    }

    const result = await response.json();

    if (result.code === 400 || !result.access_token || !result.refresh_token) {
      deleteCookiesAndGoToLogin();
    }

    if (result) {
      await deleteCookies();

      cookieStore.set("access_token", result.access_token, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: result.expires_in,
      });

      cookieStore.set("refresh_token", result.refresh_token, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: result.expires_in,
      });
    }

    return {
      success: true,
      data: result,
    };
  } catch (error: unknown) {
    deleteCookiesAndGoToLogin();
  }
}
