import HomeHandler from "@/components/ui/HomeHandler";
import { getUserInfo } from "@/features/auth/api/getUserInfo";
import { redirect } from "next/navigation";

export default async function MainPage() {
  const { success } = await getUserInfo();

  if (!success) return redirect("/login");

  return <HomeHandler isLogin={success} />;
}
