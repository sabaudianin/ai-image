"use client";

import { useCallback, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export const useAuthActions = () => {
  const supabase = createClient();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signInWithGoogle = useCallback(async () => {
    setError(null);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${location.origin}/auth/callback` },
    });
  }, [supabase]);

  const sendMagicLink = useCallback(
    async (email: string) => {
      setError(null);
      setSending(true);
      console.count("sendMagicLink called");

      try {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: { emailRedirectTo: `${location.origin}/auth/callback` },
        });
        if (error) throw error;
        return true;
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        setError(msg || "Login Failed");
        return false;
      } finally {
        setSending(false);
      }
    },
    [supabase]
  );

  return { sending, error, setError, signInWithGoogle, sendMagicLink };
};
