"use server";
import { authorizedFetch } from "@/features/auth/api/authorizedFetch";

export async function getEpicTasks(epicId: string) {
  try {
    const res = await authorizedFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/rest/v1/project_tasks?epic_id=eq.${epicId}`,
      {
        method: "GET",
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.msg || "Failed to get epic tasks");
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
