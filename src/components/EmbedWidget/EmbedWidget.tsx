import React from "react";

export const EmbedWidget = () => {
  //  Next domyslnie  ustawia NODE_ENV
  const isDevelopment = process.env.NODE_ENV !== "production";

  const widgetUrl = isDevelopment
    ? "http://localhost:5173"
    : "https://ai-widget.netlify.app";

  return (
    <section className="w-full flex-1 flex flex-col">
      <iframe
        src={widgetUrl}
        title="AI Widget"
        className="w-full flex-1 min-h-[600px] lg:min-h-[900px]"
        allow="clipboard-write"
      />
      <p className="mt-2 text-xs text-white">
        Source: <code>{widgetUrl}</code>
      </p>
    </section>
  );
};
