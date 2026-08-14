import { ImageResponse } from "next/og";

export const alt = "Rex — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        background: "#0f1720",
        padding: "60px 70px",
        fontFamily: "monospace",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            "linear-gradient(rgba(130,182,231,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(130,182,231,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          display: "flex",
        }}
      />

      {/* Glow top-right */}
      <div
        style={{
          position: "absolute",
          right: -80,
          top: -80,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(130,182,231,0.18) 0%, transparent 70%)",
          display: "flex",
        }}
      />

      {/* Glow bottom-left */}
      <div
        style={{
          position: "absolute",
          left: -100,
          bottom: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(130,182,231,0.10) 0%, transparent 70%)",
          display: "flex",
        }}
      />

      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "auto",
        }}
      >
        <div
          style={{
            fontSize: 13,
            color: "#82b6e7",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            border: "2px solid #82b6e7",
            padding: "6px 14px",
            display: "flex",
          }}
        >
          Portfolio
        </div>
        <div
          style={{
            fontSize: 13,
            color: "#9fb0c2",
            letterSpacing: "0.2em",
            display: "flex",
          }}
        >
          htoomyataung.dev
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontSize: 13,
            color: "#82b6e7",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            marginBottom: 24,
            display: "flex",
          }}
        >
          [ Software Engineer ]
        </div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 900,
            color: "#f4f7fb",
            lineHeight: 1,
            letterSpacing: "-2px",
            marginBottom: 32,
            display: "flex",
          }}
        >
          Rex
        </div>
        <div
          style={{
            fontSize: 20,
            color: "#9fb0c2",
            lineHeight: 1.6,
            maxWidth: 560,
            letterSpacing: "0.02em",
            display: "flex",
          }}
        >
          Building interfaces, crafting systems, and writing about the small
          decisions that make products feel right.
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          paddingTop: 32,
          borderTop: "1px solid rgba(130,182,231,0.2)",
        }}
      >
        {["Projects", "Blogs", "Frontend Craft"].map((tag) => (
          <div
            key={tag}
            style={{
              fontSize: 12,
              color: "#9fb0c2",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            {tag}
          </div>
        ))}
      </div>
    </div>,
    { ...size }
  );
}
