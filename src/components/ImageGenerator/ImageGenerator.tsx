"use client";

import { useCallback, useRef, useState } from "react";

type Pipe = (prompt: string, opts?: Record<string, unknown>) => Promise<any>;

type RawImage = {
  toBlob?: () => Promise<Blob>;
  toDataURL?: () => string;
};

export const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const pipeRef = useRef<Pipe | null>(null);

  const ensurePipeline = useCallback(async () => {
    if (pipeRef.current) return pipeRef.current;
    setError(null);
    //lazy import
    const { pipeline } = await import("@xenova/transformers");
    // "stabilityai/sd-turbo" lub "Xenova/stable-diffusion-xl-turbo"

    const pipe = (await pipeline(
      "text-to-image" as any,
      "Xenova/stable-diffusion-xl-turbo"
    )) as unknown as Pipe;

    pipeRef.current = pipe as unknown as Pipe;

    return pipeRef.current;
  }, []);

  const generate = useCallback(async () => {
    setLoading(true);
    setError(null);
    setImgUrl(null);
    try {
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg || "Generated failed");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <section>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
        placeholder="Describe your image"
        className="w-full rounded-lg bg-white border border-[--color-border] px-3 py-2 placeholder:text-white
        focus:outline-none focus:ring-2 focus:ring-[--brand]"
      />
      <button
        onClick={generate}
        disabled={loading || !prompt.trim()}
      >
        {loading ? "Generating..." : "Generate Image"}
      </button>
    </section>
  );
};
