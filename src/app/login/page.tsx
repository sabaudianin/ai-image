"use client";
import { MagicLinkForm } from "@/components/MagicLinkForm/MagicLinkForm";
import { AuthWithGoogle } from "@/components/AuthWithGoogle/AuthWithGoogle";

export default function LoginPage() {
  return (
    <section className="grid place-items-center mx-auto space-y-8 ">
      <div className="text-center bg-white/10 p-8 rounded">
        <h2 className="text-xl font-semibold p-4">Log In</h2>
        <MagicLinkForm />
        <AuthWithGoogle />
      </div>
    </section>
  );
}
