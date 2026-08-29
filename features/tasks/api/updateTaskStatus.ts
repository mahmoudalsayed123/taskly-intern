"use server";

import { authorizedFetch } from "@/features/auth/api/authorizedFetch";

export async function updateTaskStatus(taskId: string, newStatus: string) {
  try {
    const res = await authorizedFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/rest/v1/tasks?id=eq.${taskId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      },
    );

    const data = await res.json();

    console.log("UPDATE TASK RESPONSE:", {
      status: res.status,
      data,
    });

    if (!res.ok) {
      throw new Error(
        data?.message || data?.msg || "Failed to update task status",
      );
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("UPDATE TASK ERROR:", error);

    return {
      success: false,
      message: String(error),
    };
  }
}
