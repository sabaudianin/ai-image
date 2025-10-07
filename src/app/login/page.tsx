"use client";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  async function signWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${location.origin}/auth/callback` },
    });
  }
  //   async function signWithGitHub() {
  //     await supabase.auth.signInWithOAuth({
  //       provider: "github",
  //       options: { redirectTo: `${location.origin}/auth/callback` },
  //     });
  //   }

  async function sendMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    });
    setSending(false);
    if (error) return alert(error.message);
    alert("Login link sended, check inbox and spam");
  }
  return (
    <section className="max-w-sm mx-auto space-y-4">
      <h2 className="text-xl font-semibold">Log In</h2>
      <button
        onClick={signWithGoogle}
        className="w-full rounded bg-black text-white py-2"
      >
        Continue with Google
      </button>
      <div className="bg-gray-200">
        <form
          onSubmit={sendMagicLink}
          className="space-y-2"
        >
          <input
            type="email"
            required
            placeholder="Write your email here..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded p-2"
          />
          <button
            disabled={sending}
            className="w-full rounded bg-black text-white py-2 disabled:opacity-60"
          >
            {sending ? "Sending" : "Send magic Link"}
          </button>
        </form>
      </div>
    </section>
  );
}
