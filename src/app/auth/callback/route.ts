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
          //żeby odczytać istniejące cookiesy
          return req.cookies.getAll();
        },
        //żeby zapisać nowe cookies sesji
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // code jako STRING tymczasowy, jednorazowy kod autoryzacyjny,To nie jest token sesji, ani JWT zeby nie wrzucac w url http://localhost:3000/auth/callback?code=435ed8b9-36b2-428a-9ce3-36f3cd45b88a
  const code = req.nextUrl.searchParams.get("code");
  if (!code) {
    // brak kodu wróc na main page
    return NextResponse.redirect(new URL("/login", req.url));
  }

  //  wymiana code poprzez Supabase sesja ustawi cookies w 'res' ,tworzy cookies z access/refresh tokenami
  await supabase.auth.exchangeCodeForSession(code);

  //odczyt z cookies zwraca info o aktualnym użytkowniku
  const { data } = await supabase.auth.getUser();
  console.log("callback user route:", data.user?.email);

  return res;
}
