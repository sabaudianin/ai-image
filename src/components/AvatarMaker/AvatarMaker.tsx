/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function AvatarMaker() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [shape, setShape] = useState<"square" | "circle">("circle");
  const [bg, setBg] = useState<"transparent" | "white" | "black">("transparent");
  const [error, setError] = useState<string | null>(null);

  const segRef = useRef<any | null>(null);

  useEffect(() => {
    return () => {
      previewUrl && URL.revokeObjectURL(previewUrl);
      avatarUrl && URL.revokeObjectURL(avatarUrl);
    };
  }, [previewUrl, avatarUrl]);

  const onPick = (f: File | null) => {
    setError(null);
    setAvatarUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(f);
    setPreviewUrl(f ? URL.createObjectURL(f) : null);
  };

  const ensureSegmentation = useCallback(async () => {
    if (segRef.current) return segRef.current;
    const { pipeline } = await import("@xenova/transformers");
    const p = await pipeline(
      "image-segmentation",
      "Xenova/segformer-b4-finetuned-ade-512-512"
      // { device: "webgpu" } // jeśli masz WebGPU – działa szybciej
    );
    segRef.current = p;
    return p;
  }, []);

  // pomocnicze: znajdź maskę osoby; jeśli brak etykiety, weź największy obszar
  const pickPersonMask = (out: any): HTMLCanvasElement | ImageData | string | null => {
    const arr = Array.isArray(out) ? out : out ? [out] : [];
    if (!arr.length) return null;

    // próbujemy po labelu
    const person = arr.find((x: any) =>
      typeof x?.label === "string" && /person|human/i.test(x.label)
    );
    if (person?.mask) return person.mask;

    // fallback: największa maska (po polu)
    let best: any = null;
    let bestArea = -1;

    for (const x of arr) {
      const m = x?.mask;
      if (!m) continue;

      // oszacuj "pole": jeśli canvas/imagedata mamy rozmiar, inaczej preferuj canvas
      if (m instanceof HTMLCanvasElement) {
        const area = m.width * m.height;
        if (area > bestArea) {
          bestArea = area;
          best = m;
        }
      } else if (m instanceof ImageData) {
        const area = m.width * m.height;
        if (area > bestArea) {
          bestArea = area;
          best = m;
        }
      } else if (typeof m === "string") {
        // dataURL – nie znamy pola; ustaw najmniejszy priorytet
        if (best === null) best = m;
      }
    }
    return best;
  };

  const makeAvatar = useCallback(async () => {
    if (!file) return;
    setLoading(true);
    setError(null);

    try {
      const seg = await ensureSegmentation();
      const out = await seg(file);

      const maskRaw = pickPersonMask(out);
      if (!maskRaw) throw new Error("Nie znaleziono sylwetki (maski). Spróbuj inne zdjęcie.");

      // wczytujemy obraz źródłowy
      const base = new Image();
      const baseUrl = URL.createObjectURL(file);
      await new Promise<void>((res, rej) => {
        base.onload = () => res();
        base.onerror = (e) => rej(e);
        base.src = baseUrl;
      });
      URL.revokeObjectURL(baseUrl);

      // rysujemy maskę w rozmiarze obrazu
      const W = base.naturalWidth || base.width;
      const H = base.naturalHeight || base.height;

      const maskCanvas = document.createElement("canvas");
      maskCanvas.width = W;
      maskCanvas.height = H;
      const mctx = maskCanvas.getContext("2d")!;

      if (maskRaw instanceof HTMLCanvasElement) {
        mctx.drawImage(maskRaw, 0, 0, W, H);
      } else if (maskRaw instanceof ImageData) {
        // przeskaluj ImageData do (W,H)
        const tmp = document.createElement("canvas");
        tmp.width = maskRaw.width;
        tmp.height = maskRaw.height;
        tmp.getContext("2d")!.putImageData(maskRaw, 0, 0);
        mctx.drawImage(tmp, 0, 0, W, H);
      } else if (typeof maskRaw === "string") {
        const mImg = new Image();
        mImg.src = maskRaw;
        await new Promise<void>((r, j) => {
          mImg.onload = () => r();
          mImg.onerror = (e) => j(e);
        });
        mctx.drawImage(mImg, 0, 0, W, H);
      }

      // nałożenie maski jako alpha + wyliczenie bbox sylwetki
      const scene = document.createElement("canvas");
      scene.width = W;
      scene.height = H;
      const sctx = scene.getContext("2d")!;
      sctx.drawImage(base, 0, 0, W, H);

      const imgData = sctx.getImageData(0, 0, W, H);
      const data = imgData.data;

      const mData = mctx.getImageData(0, 0, W, H).data;

      let minX = W, minY = H, maxX = 0, maxY = 0;

      for (let i = 0; i < data.length; i += 4) {
        const idx = i / 4;
        const x = idx % W;
        const y = Math.floor(idx / W);

        const val = (mData[i] + mData[i + 1] + mData[i + 2]) / 3; // 0..255
        data[i + 3] = val; // alpha

        if (val > 10) { // piksel należy do postaci
          if (x < minX) minX = x;
          if (y < minY) minY = y;
          if (x > maxX) maxX = x;
          if (y > maxY) maxY = y;
        }
      }
      sctx.putImageData(imgData, 0, 0);

      if (minX > maxX || minY > maxY) {
        throw new Error("Nie udało się wykryć sylwetki w masce.");
      }

      // przycięcie do kwadratu wokół sylwetki + lekki margines
      const pad = Math.floor(Math.max(W, H) * 0.05);
      let cx = Math.max(0, minX - pad);
      let cy = Math.max(0, minY - pad);
      let cw = Math.min(W - cx, maxX - minX + 2 * pad);
      let ch = Math.min(H - cy, maxY - minY + 2 * pad);

      // rozszerz do kwadratu
      const side = Math.max(cw, ch);
      // dopasuj wycinek, żeby nie wyjść poza obraz
      if (cw < side) {
        const add = side - cw;
        cx = Math.max(0, cx - Math.floor(add / 2));
        cw = Math.min(W - cx, side);
      }
      if (ch < side) {
        const add = side - ch;
        cy = Math.max(0, cy - Math.floor(add / 2));
        ch = Math.min(H - cy, side);
      }

      const target = document.createElement("canvas");
      const SIZE = 512;
      target.width = SIZE;
      target.height = SIZE;
      const tctx = target.getContext("2d")!;

      // tło (jeśli nie transparent)
      if (bg !== "transparent") {
        tctx.fillStyle = bg;
        tctx.fillRect(0, 0, SIZE, SIZE);
      }

      if (shape === "circle") {
        tctx.save();
        tctx.beginPath();
        tctx.arc(SIZE / 2, SIZE / 2, SIZE / 2, 0, Math.PI * 2);
        tctx.clip();
      }

      // rysuj wyciętą sylwetkę skalowaną do 512×512
      tctx.drawImage(scene, cx, cy, cw, ch, 0, 0, SIZE, SIZE);

      if (shape === "circle") {
        tctx.restore();
      }

      target.toBlob((blob) => {
        if (!blob) {
          setError("Export PNG failed");
          return;
        }
        const url = URL.createObjectURL(blob);
        setAvatarUrl((prev) => {
          prev && URL.revokeObjectURL(prev);
          return url;
        });
      }, "image/png");
    } catch (e: any) {
      setError(e?.message || "Avatar generation failed");
    } finally {
      setLoading(false);
    }
  }, [file, ensureSegmentation, shape, bg]);

  return (
    <section className="space-y-3 max-w-xl mx-auto">
      <div className="flex flex-col gap-2">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onPick(e.target.files?.[0] ?? null)}
        />

        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-1 text-sm">
            Kształt:
            <select value={shape} onChange={(e) => setShape(e.target.value as any)}>
              <option value="circle">Okrąg</option>
              <option value="square">Kwadrat</option>
            </select>
          </label>

          <label className="flex items-center gap-1 text-sm">
            Tło:
            <select value={bg} onChange={(e) => setBg(e.target.value as any)}>
              <option value="transparent">Przezroczyste</option>
              <option value="white">Białe</option>
              <option value="black">Czarne</option>
            </select>
          </label>

          <button
            onClick={makeAvatar}
            disabled={!file || loading}
            className="rounded-md border px-3 py-2 disabled:opacity-60"
          >
            {loading ? "Tworzę avatar…" : "Stwórz avatar 512×512"}
          </button>
        </div>
      </div>

      {previewUrl && (
        <img
          src={previewUrl}
          alt="Podgląd"
          className="w-64 h-64 object-contain border rounded bg-white"
        />
      )}

      {avatarUrl && (
        <div className="space-y-2">
          <img
            src={avatarUrl}
            alt="Avatar"
            className="w-64 h-64 object-contain border rounded"
          />
          <a className="rounded-md border px-3 py-2 inline-block" href={avatarUrl} download="avatar.png">
            Pobierz avatar
          </a>
        </div>
      )}

      {error && <p className="text-red-600">{error}</p>}
    </section>
  );
}
