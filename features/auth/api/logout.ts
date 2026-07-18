export async function logout() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/v1/logout`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
      },
      credentials: "include",
    },
  );
}
