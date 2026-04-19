import { ImageResponse } from "next/og"
import { portfolioData } from "./data"

export const alt = "Roger Moore Sangol — Full-Stack Developer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background:
            "linear-gradient(135deg, #0a0f1e 0%, #111827 50%, #1a1f35 100%)",
          color: "#e2e8f0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #3b82f6, #a855f7, #ec4899)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 28,
              fontWeight: 700,
              fontFamily: "monospace",
            }}
          >
            R
          </div>
          <div
            style={{
              fontSize: 24,
              fontFamily: "monospace",
              color: "#94a3b8",
            }}
          >
            roger.dev
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 24,
              color: "#3b82f6",
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: 4,
            }}
          >
            Full-Stack Developer
          </div>
          <div
            style={{
              fontSize: 88,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              backgroundImage:
                "linear-gradient(90deg, #3b82f6, #a855f7, #ec4899)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {portfolioData.name}
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#94a3b8",
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            React Native · Next.js · FastAPI · AWS — building scalable mobile and web applications.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            fontSize: 20,
            color: "#94a3b8",
          }}
        >
          {["React Native", "Next.js", "TypeScript", "FastAPI"].map(tag => (
            <div
              key={tag}
              style={{
                border: "1px solid #1e293b",
                borderRadius: 999,
                padding: "8px 16px",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  )
}
