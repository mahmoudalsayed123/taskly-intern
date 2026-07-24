"use server";
import { cookies } from "next/headers";

export async function getProjects() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      throw new Error("Unauthorized! Token not found");
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/rest/v1/rpc/get_projects`,
      {
        method: "GET",
        headers: {
          apikey: process.env.API_KEY!,
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.msg || "Failed to create project");
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
