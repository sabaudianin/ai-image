import type { Metadata } from "next";
import { Roboto, Noto_Sans } from "next/font/google";
import { Background } from "@/ui/background/Background";
import "./globals.css";

import { ToasterProvider } from "@/components/ToasterProvider/ToasterProvider";

export const metadata: Metadata = {
  title: "Mini Frontend AI",
  description: "Mini Fronted App with Gemini Ai",
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${notoSans.variable}`}
    >
      <body className="antialiased w-full bg-black font-roboto min-h-dvh flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only fixed top-2 left-2 z-50 rounded px-3 py-1 border bg-[--background] text-[--foreground] shadow focus:outline-none focus:ring-2 focus:ring-[--brand]"
        >
          Skip to content
        </a>
        <Background />
        <div className="relative z-10 flex flex-col flex-1">
          <ToasterProvider />
          <main
            id="main-content"
            className="flex-1 w-full p-4 flex justify-center items-center"
          >
            {children}
          </main>
          <footer className="p-4 text-center sticky lg:text-xl">
            Integrates a microfrontend built with Vite, embedded via iframe,
            while all API requests are handled through Next.js endpoints.
            Powered by Gemini AI.
          </footer>
        </div>
      </body>
    </html>
  );
}
