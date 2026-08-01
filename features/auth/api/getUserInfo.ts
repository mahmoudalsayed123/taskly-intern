"use server";

import { authorizedFetch } from "./authorizedFetch";

export async function getUserInfo() {
  try {
    const res = await authorizedFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/v1/user`,
      {
        method: "GET",
      },
    );
    if (!res.ok) {
      return {
        success: false,
        error: "Failed to get user",
      };
    }

    const data = await res.json();

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
}
