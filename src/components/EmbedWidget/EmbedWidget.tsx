import React from "react";

export const EmbedWidget = () => {
  //  Next domyslnie  ustawia NODE_ENV
  const isDevelopment = process.env.NODE_ENV !== "production";

  const widgetUrl = isDevelopment
    ? "http://localhost:5173"
    : "https://ai-widget.netlify.app";

  return (
    <section className="w-full flex-1">
      <iframe
        src={widgetUrl}
        title="AI Widget"
        className="w-full h-screen"
        allow="clipboard-write"
      />
      <p className="mt-2 text-xs text-gray-500">
        Source: <code>{widgetUrl}</code>
      </p>
    </section>
  );
};
