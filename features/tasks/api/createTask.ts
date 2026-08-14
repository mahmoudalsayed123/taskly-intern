"use server";
import { authorizedFetch } from "@/features/auth/api/authorizedFetch";
import { createTaskSchema } from "@/lib/zodSchema";
import { z } from "zod";

export async function createTask(data: z.infer<typeof createTaskSchema>) {
  try {
    const res = await authorizedFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/rest/v1/tasks`,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.msg || "Failed to create new task");
    }
    return {
      success: true,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: String(error),
    };
  }
}
