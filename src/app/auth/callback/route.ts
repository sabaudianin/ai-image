import { NextResponse, NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function GET(req: NextRequest) {
  const res = NextResponse.redirect(new URL("/generate", req.url));

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // code jako STRING
  const code = req.nextUrl.searchParams.get("code");
  if (!code) {
    // brak kodu wróc na main page
    return NextResponse.redirect(new URL("/login", req.url));
  }

  //  wymiana code -> sesja ustawi cookies w 'res'
  await supabase.auth.exchangeCodeForSession(code);

  const { data } = await supabase.auth.getUser();
  console.log("callback user route:", data.user?.email);

  return res;
}
