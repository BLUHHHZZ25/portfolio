"use client";

import { useEffect, useState } from "react";

// Sparkline data for the revenue chart
const sparkData = [30, 45, 28, 60, 42, 70, 55, 80, 65, 90];

function Sparkline({ data }: { data: number[] }) {
  const width = 80;
  const height = 20;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#4ade80" stopOpacity="1" />
        </linearGradient>
      </defs>
      <polyline
        fill="none"
        stroke="url(#lineGrad)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}

export default function ProfileCard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      style={{
        minHeight: "auto",
        backgroundColor: "#070b18",
        display: "flex",
        // alignItems: "center",
        // justifyContent: "center",
        fontFamily: "'DM Sans', sans-serif",
        // padding: "2rem",
      }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(251,146,60,0.5); }
          70%  { box-shadow: 0 0 0 8px rgba(251,146,60,0); }
          100% { box-shadow: 0 0 0 0 rgba(251,146,60,0); }
        }
        @keyframes count-up {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }

        .profile-card {
          animation: fadeUp 0.6s ease both;
        }
        .badge-revenue {
          animation: fadeUp 0.7s 0.2s ease both;
        }
        .badge-flash {
          animation: fadeUp 0.7s 0.1s ease both;
        }
        .badge-rating {
          animation: fadeUp 0.7s 0.35s ease both;
        }
        .flash-btn {
          animation: pulse-ring 2.5s infinite;
        }
        .revenue-value {
          animation: count-up 0.5s 0.5s ease both;
          display: inline-block;
        }
      `}</style>

      {/* Card */}
      <div
        className="profile-card"
        style={{
          position: "relative",
          width: 320,
          borderRadius: 24,
          border: "1px solid rgba(255,255,255,0.08)",
          background: "linear-gradient(160deg,#1a1f35 0%,#0d1120 100%)",
          boxShadow:
            "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset",
          overflow: "hidden",
        }}
      >
        {/* Inner photo frame */}
        <div
          style={{
            margin: "12px 12px 0",
            borderRadius: 16,
            overflow: "hidden",
            position: "relative",
            height: 380,
            background: "#e86c2c",
          }}
        >
          {/* Replace src with your actual image */}
          <img
            src="https://fmblbxbwvaemmzhuiwou.supabase.co/storage/v1/object/public/portfolio/625073464_18122104645571381_7275390027139124944_n.webp"
            alt="Profile"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              display: "block",
            }}
          />

          {/* Subtle gradient overlay at bottom */}
          <div
            style={{
              position: "absolute",
              inset: 1,
              background:
                "linear-gradient(to bottom, transparent 60%, rgba(10,14,30,0.55) 100%)",
            }}
          />

          {/* ── Flash Button (top-right) ── */}
          <button
            className="flash-btn badge-flash"
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #fb923c 0%, #ef4444 100%)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M9 1L3 9h5l-1 6 7-8H9l1-6z"
                fill="#fff"
                stroke="#fff"
                strokeWidth="0.5"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* ── Satisfaction Badge (bottom-right) ── */}
          <div
            className="badge-rating"
            style={{
              position: "absolute",
              bottom: 14,
              right: 14,
              background: "rgba(12,16,28,0.82)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              padding: "9px 12px",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            {/* Avatar-like icon */}
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#7c3aed,#a855f7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="6" r="2.5" fill="rgba(255,255,255,0.9)" />
                <path d="M3 13c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: 18, fontWeight: 700, color: "#fff", lineHeight: 1 }}>4.9</span>
                <span style={{ color: "#f59e0b", fontSize: 13, lineHeight: 1 }}>★</span>
              </div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.45)", letterSpacing: "0.07em", textTransform: "uppercase", marginTop: 2 }}>
                Client Satisfaction
              </div>
            </div>
          </div>
        </div>

        {/* Bottom padding */}
        <div style={{ height: 14 }} />
      </div>
    </div>
  );
}