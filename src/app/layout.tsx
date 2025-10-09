import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Background } from "@/ui/background/Background";
import "./globals.css";

import { ToasterProvider } from "@/components/ToasterProvider/ToasterProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ai Images Generator",
  description: "Generated Images from Description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh w-full bg-black`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only fixed top-2 left-2 z-50 rounded px-3 py-1 border bg-[--background] text-[--foreground] shadow focus:outline-none focus:ring-2 focus:ring-[--brand]"
        >
          Skip to content
        </a>
        <Background />
        <div className="relative z-10 flex min-h-dvh flex-col">
          <header className="p-8">
            <div className="p-8 text-center">HEADER</div>
          </header>
          <ToasterProvider />
          <main
            id="main-content"
            className="w-full flex-1"
          >
            {children}
          </main>
          <footer className=" p-8  text-center">Footer</footer>
        </div>
      </body>
    </html>
  );
}
