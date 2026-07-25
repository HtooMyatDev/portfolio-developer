import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Blogs — Rex";
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

      {/* Accent glows */}
      <div
        style={{
          position: "absolute",
          right: -60,
          top: -60,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(130,182,231,0.15) 0%, transparent 70%)",
          display: "flex",
        }}
      />

      {/* Top label */}
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
          Blogs
        </div>
        <div
          style={{
            fontSize: 13,
            color: "#9fb0c2",
            letterSpacing: "0.2em",
            display: "flex",
          }}
        >
          Rex · htoomyataung.dev
        </div>
      </div>

      {/* Main */}
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
          [ Notes & Ideas ]
        </div>
        <div
          style={{
            fontSize: 76,
            fontWeight: 900,
            color: "#f4f7fb",
            lineHeight: 1,
            letterSpacing: "-2px",
            marginBottom: 28,
            display: "flex",
          }}
        >
          Writing blogs
        </div>
        <div
          style={{
            fontSize: 20,
            color: "#9fb0c2",
            lineHeight: 1.6,
            maxWidth: 600,
            display: "flex",
          }}
        >
          Notes, ideas, and lessons on frontend craft and software engineering.
          Short reads on the decisions that matter.
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
        {["Frontend", "Systems", "Craft", "Engineering"].map((tag) => (
          <div
            key={tag}
            style={{
              fontSize: 12,
              color: "#82b6e7",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              padding: "4px 10px",
              border: "1px solid rgba(130,182,231,0.3)",
              display: "flex",
            }}
          >
            {tag}
          </div>
        ))}
      </div>
    </div>,
    { ...size },
  );
}
