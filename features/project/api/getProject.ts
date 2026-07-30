"use server";
import { refreshToken } from "@/features/auth/api/refresh-token";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getProject(projectId: string) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      await refreshToken();
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/rest/v1/projects?id=eq.${projectId}`,
      {
        method: "GET",
        headers: {
          apikey: process.env.API_KEY!,
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.msg || "Failed to get project");
    }
    const data = await res.json();
    return {
      success: true,
      data,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: String(error),
    };
  }
}
