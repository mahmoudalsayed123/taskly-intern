"use server";
import { authorizedFetch } from "@/features/auth/api/authorizedFetch";
import { createEpicSchema } from "@/lib/zodSchema";
import { z } from "zod";

export async function createEpic(data: z.infer<typeof createEpicSchema>) {
  try {
    const res = await authorizedFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/rest/v1/epics`,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.msg || "Failed to create new epic");
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
