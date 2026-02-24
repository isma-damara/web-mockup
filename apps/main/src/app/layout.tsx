import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NexaTech — Solusi Teknologi Masa Depan",
  description:
    "NexaTech adalah perusahaan teknologi inovatif yang menyediakan solusi digital terdepan. Web Development, Mobile App, Cloud Computing, AI & Machine Learning.",
  keywords: [
    "NexaTech",
    "teknologi",
    "software development",
    "web development",
    "mobile app",
    "cloud computing",
    "AI",
    "machine learning",
  ],
  openGraph: {
    title: "NexaTech — Solusi Teknologi Masa Depan",
    description:
      "Perusahaan teknologi inovatif yang menghadirkan solusi digital terdepan untuk bisnis Anda.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
