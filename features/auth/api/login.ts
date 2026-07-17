"use server";
import { cookies } from "next/headers";

export async function login(data: any) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/v1/token?grant_type=password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
        },
        body: JSON.stringify(data),
      },
    );

    if (!res.ok) {
      console.log("Error logging in");
      return;
    }

    const result = await res.json();

    const cookieStore = await cookies();

    // Access Token
    cookieStore.set("access_token", result.access_token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: data.rememberMe ? 60 * 60 * 24 * 30 : undefined,
    });

    // Refresh Token
    cookieStore.set("refresh_token", result.refresh_token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: data.rememberMe ? 60 * 60 * 24 * 30 : undefined,
    });

    return {
      success: true,
      data: result,
    };
  } catch (error: unknown) {
    console.log(error);
    return {
      success: false,
      data: null,
      error: error,
    };
  }
}
