"use server";
import { authorizedFetch } from "@/features/auth/api/authorizedFetch";

export async function getKpiData(data: any) {
  try {
    const res = await authorizedFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/rest/v1/rpc/get_tasks_calendar_stats`,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.msg || "Failed to get kpi data");
    }
    return {
      success: true,
      data: await res.json(),
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: String(error),
    };
  }
}
