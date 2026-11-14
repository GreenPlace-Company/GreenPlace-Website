import { ImageResponse } from "next/og";

export const alt = "Green Place Solutions — a greener world";
export const size = { width: 1200, height: 630 };
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
          background: "#143028",
          color: "#f3efe6",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 6 }}>
          PENNSYLVANIA
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, lineHeight: 1 }}>Green Place Solutions</div>
          <div style={{ marginTop: 24, fontSize: 36, color: "#d7e4d4" }}>
            A greener world. Power, backup, and home charging.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
