import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function AppPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("callback user:", user?.email);

  if (!user) redirect("/login");

  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold">Witaj , {user.email}</h2>

      <p>Tu bedzie generator obrazów.</p>
    </section>
  );
}
