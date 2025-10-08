"use client";

import { useCallback, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export const useAuthActions = () => {
  const supabase = createClient();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signWithGoggle = useCallback(async () => {
    setError(null);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${location.origin}/auth/callback` },
    });
  }, [supabase]);

  const sendMagicLink = useCallback(async (email: string) => {
    setError(null);
    setSending(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${location.origin}/auth/callback` },
      });
      if (error) throw error;
      return true;
    } catch(e:any{
        setError(e?.message ?? "Login Failed")
        return false;

    }finally{
        setSending(false)
    }
  }, []);

  return { sending, error, setError, signWithGoggle, sendMagicLink };
};
