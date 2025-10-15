"use client";

import Link from "next/link";

export default function Home() {
  return (
    <section className="font-sans grid grid-rows-[20px_1fr] items-center justify-items-center min-h-[80dvh]  p-8 sm:p-20 ">
      <p className="text-xl font-bold">MICRO FRONTEND AI APP</p>
      <Link href="/login">LOGIN to continue(click here)</Link>
    </section>
  );
}
