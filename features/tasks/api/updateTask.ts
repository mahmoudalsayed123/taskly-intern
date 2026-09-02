"use server";
import { authorizedFetch } from "@/features/auth/api/authorizedFetch";
import z from "zod";
import { updateTaskSchema } from "@/lib/zodSchema";

export async function updateTask(
  taskId: string,
  data: Partial<z.infer<typeof updateTaskSchema>>,
) {
  try {
    const res = await authorizedFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/rest/v1/tasks?id=eq.${taskId}`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.msg || "Failed to update task");
    }

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: String(error),
    };
  }
}
