"use server";
import { authorizedFetch } from "@/features/auth/api/authorizedFetch";

export async function getProject(projectId: string) {
  try {
    const res = await authorizedFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/rest/v1/projects?id=eq.${projectId}`,
      {
        method: "GET",
        headers: {
          Prefer: "count=exact",
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
