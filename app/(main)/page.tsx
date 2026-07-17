import { getUser } from "@/features/auth/api/getUser";
import { redirect } from "next/navigation";

const MainPage = async () => {
  const user = await getUser();
  if (user) {
    redirect("/projects");
  }
  return <div className="rounded-xl bg-blue-500">Main Content of the app</div>;
};

export default MainPage;
