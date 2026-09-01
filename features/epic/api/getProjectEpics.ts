"use server";
import { authorizedFetch } from "@/features/auth/api/authorizedFetch";
import { refreshToken } from "@/features/auth/api/refresh-token";
import { cookies } from "next/headers";

export async function getProjectEpics(
  projectId: string,
  limit: number = 10,
  offset: number = 0,
  search: string = "",
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      await refreshToken();
    }

    const res = await authorizedFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/rest/v1/project_epics?project_id=eq.${projectId}&limit=${limit}&offset=${offset}&title=ilike.%25${search}%25`,
      {
        method: "GET",
        headers: {
          Prefer: "count=exact",
        },
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.msg || "Failed to get project members");
    }

    const data = await res.json();
    const totalCount = res.headers.get("Content-Range");

    return {
      success: true,
      data,
      totalCount,
    };
  } catch (error) {
    return {
      success: false,
      message: String(error),
    };
  }
}
