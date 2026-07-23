"use server";
export const resetPassword = async (password: string, token: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/v1/user`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.API_KEY!,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.msg || "Failed to reset password");
    }

    const data = await res.json();

    return {
      success: true,
      data
    };
  } catch (error: any) {
    return {
      success: false,
      message: String(error),
    };
  }
};
