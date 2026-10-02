import { ImageResponse } from "next/og"

export const alt = "Lokl — London Marketing & Creative Agency"
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
          justifyContent: "space-between",
          background: "#0a090d",
          backgroundImage:
            "radial-gradient(900px circle at 78% 12%, rgba(200,169,98,0.20), transparent 62%)",
          padding: "84px 96px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ display: "flex", width: 10, height: 10, borderRadius: 10, background: "#c8a962" }} />
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#c8a962",
              letterSpacing: "0.26em",
            }}
          >
            LONDON · MARKETING &amp; CREATIVE
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              color: "#f5f2ec",
              letterSpacing: "-0.045em",
              lineHeight: 1.02,
            }}
          >
            Brands the world
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              color: "#c8a962",
              letterSpacing: "-0.045em",
              lineHeight: 1.02,
            }}
          >
            takes seriously
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            borderTop: "1px solid #221f29",
            paddingTop: 34,
          }}
        >
          <div style={{ display: "flex", fontSize: 76, color: "#f5f2ec", letterSpacing: "-0.05em" }}>
            <span>lokl</span>
            <span style={{ color: "#c8a962" }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#938d85",
              letterSpacing: "0.14em",
            }}
          >
            WEB · ADS · PR · APPS
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
