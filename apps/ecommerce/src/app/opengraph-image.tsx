import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          background: "linear-gradient(135deg, #ecfdf5 0%, #ccfbf1 45%, #d9f99d 100%)",
          color: "#0f172a",
          fontFamily: "Segoe UI, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            borderRadius: 999,
            background: "rgba(16, 185, 129, 0.12)",
            border: "1px solid rgba(16, 185, 129, 0.25)",
            color: "#047857",
            fontSize: 28,
            fontWeight: 700,
            padding: "14px 24px",
          }}
        >
          UrbanStyle Store
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.08,
            }}
          >
            <div>Belanja Fashion</div>
            <div>Lebih Mudah</div>
          </div>
          <div style={{ fontSize: 34, color: "#334155" }}>
            Katalog produk, checkout, dan tracking pesanan dalam satu pengalaman.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: "#0f766e",
            fontWeight: 700,
          }}
        >
          <div>urbanstyle.id</div>
          <div>Mockup E-commerce</div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
