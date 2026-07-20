"use server";

import { cookies } from "next/headers";
import { deleteCookies } from "@/lib/deleteCookies";
import { redirect } from "next/navigation";

export async function logout() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) redirect("/login");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/v1/logout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.API_KEY!,
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.msg || "Failed to logout");
    }

    await deleteCookies();

    return {
      success: true,
      message: "Logged out successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: String(error),
    };
  }
}
