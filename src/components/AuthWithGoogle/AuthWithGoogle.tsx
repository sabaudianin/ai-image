"use client";
import { useAuthActions } from "@/hooks/useAuthActions/useAuthActions";

export const AuthWithGoogle = () => {
  const { error, signInWithGoogle } = useAuthActions();
  return (
    <div className="">
      <button
        onClick={signInWithGoogle}
        className="w-full lg:w-1/4 rounded-lg  text-white py-2 px-4 hover:bg-[--brand-hover] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-[--brand] font-semibold bg-white/20 border  border-[var(--brand)]"
        aria-label="Continue with Google"
      >
        Continue with Google
      </button>
    </div>
  );
};
