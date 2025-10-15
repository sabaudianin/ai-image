import React from "react";

export const EmbedWidget = () => {
  // jakby zmienne środowiskowe nie zostalywstrzykniete
  const FALLBACK_URL = "https://micro-frontend-ai-neon.vercel.app";

  const widgetUrl = process.env.NEXT_PUBLIC_API_URL
    ? `https://${process.env.NEXT_PUBLIC_API_URL}` // URL wstrzyknie Vercel
    : FALLBACK_URL; // Ostateczny fallback do publicznego URL

  return (
    <section className="w-full min-h-screen">
      <iframe
        src={widgetUrl}
        title="AI Widget"
        className="w-full min-h-screen"
        allow="clipboard-write"
      />
      <p className="mt-2 text-xs text-gray-500">
        Source: <code>{widgetUrl}</code>
      </p>
    </section>
  );
};
