"use client";
import { useAuthActions } from "@/hooks/useAuthActions/useAuthActions";

export const AuthWithGoogle = () => {
  const { error, signInWithGoogle } = useAuthActions();
  return (
    <div className="space-y-2">
      <button
        onClick={signInWithGoogle}
        className="w-full rounded-lg bg-[--brand] text-white py-2 px-4
           hover:bg-[--brand-hover] disabled:opacity-60
           focus-visible:outline-2 focus-visible:outline-[--brand]"
        aria-label="Continue with Google"
      >
        Continue with Google
      </button>
    </div>
  );
};
