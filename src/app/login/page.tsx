"use client";
import { MagicLinkForm } from "@/components/MagicLinkForm/MagicLinkForm";
import { AuthWithGoogle } from "@/components/AuthWithGoogle/AuthWithGoogle";

export default function LoginPage() {
  return (
    <section className=" flex-1 grid place-items-center mx-auto space-y-8 w-full ">
      <div className="flex flex-col gap-4 text-center bg-black/50 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold p-4">To Start</h2>
        <p className="text-sm md:text-xl">
          We'll send a one-time code to your email just to verify you are human.
          We won't store your email for marketing without your consent.
        </p>
        <MagicLinkForm />

        <p className="text-sm md:text-xl"> or continue with </p>
        <AuthWithGoogle />
      </div>
    </section>
  );
}
