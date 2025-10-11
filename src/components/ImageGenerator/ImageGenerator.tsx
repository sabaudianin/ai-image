/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const pipeRef = useRef<any | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const ensurePipeline = useCallback(async () => {
    if (pipeRef.current) return pipeRef.current;
    setError(null);

    const { pipeline } = await import("@xenova/transformers");

    // sanity check pipeline powinien być funkcją
    const raw = await (
      pipeline as unknown as (
        t: string,
        m?: string,
        o?: any
      ) => Promise<unknown>
    )(
      "text-to-image",
      "Xenova/stable-diffusion-xl-turbo",
      // WebGPU jeśli dostępne
      { device: "webgpu" }
    );
    if (typeof raw !== "function") {
      console.error("Unexpected pipeline result:", raw);
      throw new Error(
        "Nie udało się zainicjalizować pipeline (nie jest funkcją). " +
          "Sprawdź nazwę taska ('text-to-image'), model oraz wersję @xenova/transformers."
      );
    }

    pipeRef.current = raw as (
      prompt: string,
      opts?: Record<string, unknown>
    ) => Promise<unknown>;
    return pipeRef.current;
  }, []);

  useEffect(() => {
    return () => {
      if (imgUrl) URL.revokeObjectURL(imgUrl);
    };
  }, [imgUrl]);

  const pickFirstImage = (result: any) => {
    if (result?.images && Array.isArray(result.images)) return result.images[0];
    if (Array.isArray(result)) return result[0];
    return result;
  };

  const toBlobAny = async (img: any): Promise<Blob | null> => {
    if (!img) return null;
    if (img instanceof Blob) return img;
    if (typeof img.toBlob === "function") return await img.toBlob();
    if (typeof img.toDataURL === "function") {
      const dataUrl = img.toDataURL();
      if (!dataUrl || typeof dataUrl !== "string") return null;
      const res = await fetch(dataUrl);
      return await res.blob();
    }
    return null;
  };

  const generate = useCallback(async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    if (imgUrl) {
      URL.revokeObjectURL(imgUrl);
      setImgUrl(null);
    }

    try {
      const pipe = await ensurePipeline();
      const result: any = await pipe(prompt, {
        num_inference_steps: 2,
        guidance_scale: 0,
        width: 512,
        height: 512,
        signal: controller.signal,
      });

      const first = pickFirstImage(result);
      const blob = await toBlobAny(first);
      if (!blob) throw new Error("Image build failed");

      const url = URL.createObjectURL(blob);
      setImgUrl(url);
    } catch (e: any) {
      if (e?.name === "AbortError") return;
      setError(e?.message || "Generation failed");
    } finally {
      setLoading(false);
    }
  }, [prompt, ensurePipeline, imgUrl]);

  return (
    <section className="space-y-3 w-full mx-auto">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
        placeholder="Describe you picture....."
        className="w-full rounded-lg bg-white border border-[--color-border] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[--brand] text-black"
      />

      <div className="flex  justify-center items-center gap-2">
        <button
          onClick={generate}
          disabled={loading || !prompt.trim()}
          aria-busy={loading}
          className="rounded-md border px-4 py-2 disabled:opacity-60"
        >
          {loading ? "Generating Image..." : "Generate Image"}
        </button>

        <a
          href={imgUrl ?? "#"}
          download="image.png"
          aria-disabled={!imgUrl}
          className={`rounded-md border px-4 py-2 ${
            imgUrl ? "" : "pointer-events-none opacity-60"
          }`}
        >
          Download Picture
        </a>
      </div>

      {error && <p className="text-red-600 text-center">{error}</p>}

      {imgUrl && (
        <div className="mt-2">
          <Image
            src={imgUrl}
            alt="Generated Picture"
            width={512}
            height={512}
            unoptimized
            className="rounded-lg border"
          />
        </div>
      )}
    </section>
  );
}
