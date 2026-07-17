export async function signUp(data: any) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/v1/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
        },
        body: JSON.stringify(data),
      },
    );

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error signing up:", error);
  }
}
