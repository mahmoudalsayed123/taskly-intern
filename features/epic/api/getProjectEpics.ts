"use server";
import { refreshToken } from "@/features/auth/api/refresh-token";
import { cookies } from "next/headers";

export async function getProjectEpics(projectId: string) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      await refreshToken();
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/rest/v1/project_epics?project_id=eq.${projectId}`,
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
      throw new Error(errorData.msg || "Failed to get project members");
    }

    const data = await res.json();

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      message: String(error),
    };
  }
}
