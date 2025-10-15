import React from "react";

export const EmbedWidget = () => {
  const widgetUrl = "https://micro-frontend-ai-neon.vercel.app";

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
