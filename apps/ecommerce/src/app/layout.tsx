import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://urbanstyle.id"),
  title: "UrbanStyle | Toko Fashion Online",
  description:
    "UrbanStyle adalah mockup toko fashion online dengan pengalaman belanja lengkap: katalog produk, keranjang, checkout, dan pelacakan pesanan.",
  keywords: [
    "UrbanStyle",
    "fashion online",
    "toko online",
    "ecommerce",
    "belanja pakaian",
    "checkout",
    "track order",
  ],
  openGraph: {
    title: "UrbanStyle | Toko Fashion Online",
    description:
      "Belanja fashion dengan pengalaman e-commerce modern: produk, keranjang, checkout, dan tracking.",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "UrbanStyle - Toko Fashion Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UrbanStyle | Toko Fashion Online",
    description:
      "Belanja fashion dengan pengalaman e-commerce modern: produk, keranjang, checkout, dan tracking.",
    images: ["/opengraph-image"],
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
