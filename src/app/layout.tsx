import type { Metadata } from "next";
import { Roboto, Noto_Sans } from "next/font/google";
import { Background } from "@/ui/background/Background";
import "./globals.css";

import { ToasterProvider } from "@/components/ToasterProvider/ToasterProvider";

export const metadata: Metadata = {
  title: "Ai Images Generator",
  description: "Generated Images from Description",
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
      <body className="antialiased min-h-dvh w-full bg-black font-roboto">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only fixed top-2 left-2 z-50 rounded px-3 py-1 border bg-[--background] text-[--foreground] shadow focus:outline-none focus:ring-2 focus:ring-[--brand]"
        >
          Skip to content
        </a>
        <Background />
        <div className="relative z-10 flex min-h-dvh flex-col">
          <header className="fixed inset-x-0 top-0 z-30 h-24 md:h-28 ">
            <div className="p-8 text-center text-xl lg:text-4xl font-bold font-noto">
              AI Image Generator
            </div>
          </header>
          <ToasterProvider />
          <main
            id="main-content"
            className="w-full flex-1 flex flex-col pt-24 md:pt-28"
          >
            {children}
          </main>
          <footer className=" p-8 text-center">Footer</footer>
        </div>
      </body>
    </html>
  );
}
