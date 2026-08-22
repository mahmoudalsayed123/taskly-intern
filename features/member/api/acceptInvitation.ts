"use server";
import { authorizedFetch } from "@/features/auth/api/authorizedFetch";

interface acceptInvitationData {
  p_token: string;
}

export async function acceptInvitation(data: acceptInvitationData) {
  try {
    const res = await authorizedFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/rest/v1/rpc/accept_invitation`,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.msg || "Failed to accept invitation");
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
