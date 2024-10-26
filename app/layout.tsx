import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";

import { Toaster } from "sonner";

import Navbar from "@/components/Navbar";
import QueryProviders from "@/libs/query-provides";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Popular movies from TMDB",
  description: "Made by github.com/farhan2077",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} relative font-[family-name:var(--font-geist-sans)] antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system">
          <Toaster position="top-center" richColors />
          <Navbar />
          <QueryProviders>{children}</QueryProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
