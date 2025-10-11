import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { ImgGenClient } from "../../components/ImgGenClient/ImgGenClient";

export default async function AppPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("callback user:", user?.email);

  if (!user) redirect("/login");

  return (
    <section className="flex-1 mx-auto space-y-8 w-full flex flex-col items-center p-2">
      <h2 className="text-xl font-semibold">Witaj , {user.email}</h2>

      <ImgGenClient />
    </section>
  );
}
