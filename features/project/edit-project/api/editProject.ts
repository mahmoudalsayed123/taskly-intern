"use server";
import { refreshToken } from "@/features/auth/api/refresh-token";
import { createProjectSchema } from "@/lib/zodSchema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function editProject(
  projectId: string,
  data: z.infer<typeof createProjectSchema>,
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      await refreshToken();
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/rest/v1/projects?id=eq.${projectId}`,
      {
        method: "PATCH",
        headers: {
          apikey: process.env.API_KEY!,
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.msg || "Failed to update project");
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
