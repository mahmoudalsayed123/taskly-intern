"use server";
import { authorizedFetch } from "@/features/auth/api/authorizedFetch";

export async function getEpicDetails(projectId: string, epicId: string) {
  try {
    const res = await authorizedFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/rest/v1/project_epics?project_id=eq.${projectId}&id=eq.${epicId}`,
      {
        method: "GET",
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.msg || "Failed to get epic details");
    }

    const data = await res.json();

    return {
      success: true,
      data: data[0],
    };
  } catch (error) {
    return {
      success: false,
      message: String(error),
    };
  }
}
