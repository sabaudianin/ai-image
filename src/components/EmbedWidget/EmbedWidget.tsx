import React from "react";

export const EmbedWidget = () => {
  const widgetUrl =
    process.env.NEXT_PUBLIC_WIDGET_URL ?? "https://localhost:5173";
  return (
    <article className="min-h-screen">
      <section className="mx-auto max-w-5xl">
        <div className="rounded p-4">
          <h2>AI WIdget(microfronted)</h2>
          <p className="text-sm">
            {" "}
            Embed <code>&lt;iframe&gt;</code> from exterior bundler (Vite).
            Request to API sended to <code>/api/ai</code> in Next. Powered by
            Gemini.
          </p>
        </div>
      </section>
      <section className="rounded">
        <iframe
          src={widgetUrl}
          title="AI Widget"
          className="h-[720px] w-full rounded-xl border"
          allow="clipboard-write"
        />
        <p className="mt-2 text-xs text-zinc-500">
          Source: <code>{widgetUrl}</code>
        </p>
      </section>
    </article>
  );
};
