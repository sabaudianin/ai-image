import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});
const MODEL_ID = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const WIDGET_ORIGIN = process.env.WIDGET_ORIGIN;

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
  return new NextResponse(null, { status: 204, headers });
}
