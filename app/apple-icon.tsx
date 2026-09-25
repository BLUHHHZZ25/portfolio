import { ImageResponse } from "next/og"
import { LOGO_R_PATH } from "@/lib/logo"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%" }}>
        {/* viewBox 0 0 32 32 scaled to 180 — iOS applies its own corner mask. */}
        <svg width="180" height="180" viewBox="0 0 32 32">
          <defs>
            <linearGradient id="b" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="32" height="32" fill="url(#b)" />
          <path
            d={LOGO_R_PATH}
            fill="none"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    size,
  )
}
