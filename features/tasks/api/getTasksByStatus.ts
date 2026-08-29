"use server";
import { authorizedFetch } from "@/features/auth/api/authorizedFetch";

export async function getTasksByStatus(
  projectId: string,
  limit: number = 10,
  offset: number = 0,
  search: string = "",
  status: string = "",
) {
  try {
    const res = await authorizedFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/rest/v1/project_tasks?project_id=eq.${projectId}&limit=${limit}&offset=${offset}&title=ilike.%25${search}%25&status=eq.${status}`,
      {
        method: "GET",
        headers: {
          Prefer: "count=exact",
        },
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.msg || "Failed to get tasks");
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
