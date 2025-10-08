"use client";
import { useAuthActions } from "@/hooks/useAuthActions/useAuthActions";

export const AuthWithGoogle = () => {
  const { error, signInWithGoogle } = useAuthActions();
  return (
    <div className="space-y-2">
      <button
        onClick={signInWithGoogle}
        className="w-full rounded bg-black text-white py-2"
        aria-label="Continue with Google"
      >
        Continue with Google
      </button>
    </div>
  );
};
