"use server";
import { cookies } from "next/headers";

export async function login(data: any) {
  try {
    const cookieStore = await cookies();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/v1/token?grant_type=password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.API_KEY!,
        },
        body: JSON.stringify(data),
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.msg || "Failed to sign up");
    }

    const result = await res.json();

    // Access Token
    cookieStore.set("access_token", result.access_token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: result.expires_in,
    });

    // Refresh Token
    cookieStore.set("refresh_token", result.refresh_token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: result.expires_in,
    });

    return {
      success: true,
      data: result,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: String(error),
    };
  }
}
