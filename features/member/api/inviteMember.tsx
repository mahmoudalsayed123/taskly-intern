"use server";
import { authorizedFetch } from "@/features/auth/api/authorizedFetch";

interface inviteMemberData {
  p_email: string;
  p_project_id: string;
  p_app_url: string;
  p_base_url: string;
}

export async function inviteMember(data: inviteMemberData) {
  try {
    const res = await authorizedFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/rest/v1/rpc/invite_member`,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.msg || "Failed to send invitation");
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
