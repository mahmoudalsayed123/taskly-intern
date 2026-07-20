"use server";
export async function signUp(data: any) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/v1/signup`,
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
      throw new Error(errorData.msg as string);
    }

    const result = await res.json();
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      message: String(error),
    };
  }
}
