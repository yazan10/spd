import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex-arabic",
  subsets: ["arabic"],
  weight: ["700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "yaz SPD - UniSPD FRP Tools",
  description: "أداة yaz SPD الاحترافية لفك FRP وإزالة القفل لأجهزة Unisoc Spreadtrum | 25 جهاز مدعوم | 4 كريدت لكل جهاز ($4)",
  keywords: ["yaz SPD", "FRP", "Unisoc", "Spreadtrum", "Infinix", "Realme", "Techno"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl" className={`${geistSans.variable} ${geistMono.variable} ${ibmPlexArabic.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-zinc-50" style={{ fontFamily: "var(--font-ibm-plex-arabic), var(--font-geist-sans), system-ui, sans-serif" }}>{children}</body>
    </html>
  );
}
