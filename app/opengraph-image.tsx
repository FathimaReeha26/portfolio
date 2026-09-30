import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — Portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

/* Sketch-style social card, generated at build time. */
export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 24,
          padding: 80,
          background: "#F4EDE0",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            background: "#FFFFFF",
            border: "4px dashed rgba(17,24,39,0.72)",
            borderRadius: 32,
            padding: 56,
          }}
        >
          <div style={{ fontSize: 84, color: "#111827" }}>{site.name}</div>
          <div
            style={{
              width: 220,
              height: 10,
              background: "#1DAD97",
              borderRadius: 999,
            }}
          />
          <div style={{ fontSize: 36, color: "#111827" }}>{site.tagline}</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
