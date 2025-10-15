import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { EmbedWidget } from "@/components/EmbedWidget/EmbedWidget";

export default async function AppPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("callback user:", user?.email);

  if (!user) redirect("/login");

  const tempUser = user.email?.split("@")[0];

  return (
    <section className="mx-auto space-y-8 w-full flex flex-col items-center justify-center p-2">
      <h2 className="text-md lg:text-2xl font-semibold">
        Hello , {tempUser} !
      </h2>
      <EmbedWidget />
    </section>
  );
}
