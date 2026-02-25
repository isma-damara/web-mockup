import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NexaTech - Solusi Teknologi Masa Depan",
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
  icons: {
    icon: [
      {
        url: "/assets/company-profile/favicon/favicon-32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/assets/company-profile/favicon/favicon-64.png",
        sizes: "64x64",
        type: "image/png",
      },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    title: "NexaTech - Solusi Teknologi Masa Depan",
    description:
      "Perusahaan teknologi inovatif yang menghadirkan solusi digital terdepan untuk bisnis Anda.",
    type: "website",
    images: [
      {
        url: "/assets/company-profile/og/og-image-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "NexaTech company profile preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NexaTech - Solusi Teknologi Masa Depan",
    description:
      "Perusahaan teknologi inovatif yang menghadirkan solusi digital terdepan untuk bisnis Anda.",
    images: ["/assets/company-profile/og/og-image-1200x630.jpg"],
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
