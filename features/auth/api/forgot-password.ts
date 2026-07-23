"use server";
export async function forgotPassword(email: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/v1/recover`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.API_KEY!,
        },
        body: JSON.stringify({ email }),
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.msg || "Failed to forgot password");
    }

    return {
      success: true,
      message: "Reset password email has been sent",
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: String(error),
    };
  }
}
