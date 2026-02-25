import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NexaTech ? Solusi Teknologi Masa Depan",
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
    title: "NexaTech ? Solusi Teknologi Masa Depan",
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
    <html lang="id">
      <body
        className="font-sans antialiased"
        style={
          {
            "--font-geist-sans":
              "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            "--font-geist-mono":
              "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          } as React.CSSProperties
        }
      >
        {children}
      </body>
    </html>
  );
}
