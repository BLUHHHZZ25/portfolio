import { ImageResponse } from "next/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #3b82f6, #a855f7, #ec4899)",
          color: "#fff",
          fontSize: 110,
          fontWeight: 700,
          fontFamily: "monospace",
        }}
      >
        R
      </div>
    ),
    size,
  )
}
