"use server";
export async function fetchUser(access_token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/v1/user`, {
    headers: {
      "Content-Type": "application/json",
      apikey: process.env.API_KEY!,
      Authorization: `Bearer ${access_token}`,
    },
  });

  return res;
}
