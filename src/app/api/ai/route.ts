import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});
const MODEL_ID = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const WIDGET_ORIGIN = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}` //  produkcja,VERCEL_URL jest automatycznie dostarczany przez Vercel
  : process.env.WIDGET_ORIGIN || "http://localhost:5173"; // Użyj lokalnego URL dla dev

const requestSchema = z.object({
  prompt: z.string().min(3).max(200),
});

//generacja nagłówków CORS
function corsHeaders(origin: string | null) {
  const isAllow = origin === WIDGET_ORIGIN ? origin : "";
  return {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    ...(isAllow ? { "Access-Control-Allow-Origin": origin! } : {}),
  };
}

//preflight requests
export function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  const headers = corsHeaders(origin);
  //zwracasz pusta odpowiedz i staus 204
  return new NextResponse(null, { status: 204, headers });
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  const headers = corsHeaders(origin); //nagłowki dla wszystkich odp

  try {
    //tylko widget  wywoła API
    if (WIDGET_ORIGIN && origin !== WIDGET_ORIGIN) {
      // wbudowany NextResponse.json(),nie trzeba JSON.stringify
      return NextResponse.json(
        { error: "Origin not allowed" },
        { status: 403, headers }
      );
    }
    //body i walidacja
    const body = await req.json().catch(() => null);
    const parsed = requestSchema.safeParse(body);
    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message ?? "Invalid request body";
      return NextResponse.json({ error: msg }, { status: 400, headers });
    }
    //wywołanie modelu
    const response = await ai.models.generateContent({
      model: MODEL_ID,
      contents: [{ role: "user", parts: [{ text: parsed.data.prompt }] }],
    });

    const text = (response.text ?? "").trim();
    //odpowiedz koncowa
    return NextResponse.json({ text }, { status: 200, headers });
  } catch (err: unknown) {
    console.error("Gemini Api Error", err);
    const message =
      err instanceof Error ? err.message : "Internal server Error";
    return NextResponse.json({ error: message }, { status: 500, headers });
  }
}
