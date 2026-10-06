import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — Portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

/* Folio social card, generated at build time. */
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
          gap: 28,
          padding: 90,
          background: "#FAF6EF",
        }}
      >
        <div
          style={{
            width: 72,
            height: 8,
            background: "#B45309",
            borderRadius: 999,
          }}
        />
        <div
          style={{
            fontSize: 92,
            lineHeight: 1,
            color: "#201A15",
            fontFamily: "Georgia, serif",
          }}
        >
          {site.name}
        </div>
        <div style={{ fontSize: 34, color: "#201A15" }}>{site.tagline}</div>
      </div>
    ),
    { ...size }
  );
}
