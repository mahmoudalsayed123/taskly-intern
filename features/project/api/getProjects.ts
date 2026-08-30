"use server";
import { authorizedFetch } from "@/features/auth/api/authorizedFetch";

export async function getProjects(limit = 10, offset = 0) {
  try {
    const res = await authorizedFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/rest/v1/rpc/get_projects?limit=${limit}&offset=${offset}`,
      {
        method: "GET",
        headers: {
          Prefer: "count=exact",
        },
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.msg || "Failed to create project");
    }
    const data = await res.json();

    const totalCount = res.headers.get("Content-Range");
    return {
      success: true,
      data,
      totalCount,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: String(error),
    };
  }
}
