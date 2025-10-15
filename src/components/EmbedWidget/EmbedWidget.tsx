import React from "react";

export const EmbedWidget = () => {
  const hostUrl = process.env.VERCEL_URL || "micro-frontend-ai-neon.vercel.app";

  // finalny URL do osadzenia w iframe.

  const widgetUrl = `https://${hostUrl}`;

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
