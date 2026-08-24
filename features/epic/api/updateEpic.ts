"use server";
import { authorizedFetch } from "@/features/auth/api/authorizedFetch";
import { updateEpicSchema } from "@/lib/zodSchema";
import { z } from "zod";

export async function updateEpic(
  epicId: string,
  data: z.infer<typeof updateEpicSchema>,
) {
  try {
    const res = await authorizedFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/rest/v1/epics?id=eq.${epicId}`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.msg || "Failed to update epic");
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
