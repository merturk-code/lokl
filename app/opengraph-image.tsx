import { ImageResponse } from "next/og"

export const alt = "Lokl — Web design for local businesses in London"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// Branded Open Graph card, generated at build time (no external asset needed).
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#f4f2ec",
          padding: "96px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 150,
            color: "#1a1a17",
            letterSpacing: "-0.05em",
          }}
        >
          <span>lokl</span>
          <span style={{ color: "#d96535" }}>.</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 52,
            color: "#1a1a17",
            marginTop: 28,
          }}
        >
          Web design for local businesses
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#6b6760",
            marginTop: 28,
            letterSpacing: "0.18em",
          }}
        >
          LONDON · AI-FAST, HUMAN-FINISHED
        </div>
      </div>
    ),
    { ...size }
  )
}
