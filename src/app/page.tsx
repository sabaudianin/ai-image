"use client";

import Link from "next/link";

export default function Home() {
  return (
    <section className="font-sans max-w-2xl text-center gap-8 p-6 flex flex-col justify-between items-between">
      <p className="w-full text-lg font-bold text-center">
        A microfrontend experiment enhanced by Gemini AI for smarter
        interactions.
      </p>

      <Link
        href="/login"
        className="inline-block  rounded bg-white/20 px-6 py-4 ring-2 ring-black/10 hover:ring-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/50 lg:text-2xl"
        aria-label="Go to login to prove you are human"
      >
        Continue to Verification (click here)
      </Link>
    </section>
  );
}
