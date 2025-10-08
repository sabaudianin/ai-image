"use client";
import { MagicLinkForm } from "@/components/MagicLinkForm/MagicLinkForm";
import { AuthWithGoogle } from "@/components/AuthWithGoogle/AuthWithGoogle";

export default function LoginPage() {
  return (
    <section className="grid place-items-center mx-auto space-y-4 bg-slate-400 p-8 h-screen">
      <div className="text-center bg-[var(--border)]">
        <h2 className="text-xl font-semibold">Log In</h2>
        <MagicLinkForm />
        <AuthWithGoogle />
      </div>
    </section>
  );
}
