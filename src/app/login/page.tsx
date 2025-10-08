"use client";
import { MagicLinkForm } from "@/components/MagicLinkForm/MagicLinkForm";
import { AuthWithGoogle } from "@/components/AuthWithGoogle/AuthWithGoogle";

export default function LoginPage() {
  return (
    <section className="grid place-items-center max-w-sm mx-auto space-y-4 bg-slate-500">
      <h2 className="text-xl font-semibold">Log In</h2>
      <MagicLinkForm />
      <AuthWithGoogle />
    </section>
  );
}
