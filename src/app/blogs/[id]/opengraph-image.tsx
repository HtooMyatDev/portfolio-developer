import { ImageResponse } from "next/og";
import { getSortedBlogsData } from "@/lib/blogs";

export const alt = "Blog Post — Rex";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blogs = getSortedBlogsData();
  const blog = blogs.find((b) => b.id === id);

  const title = blog?.title ?? "Blog Post";
  const summary =
    blog?.english_summary ??
    "Notes on frontend craft and software engineering.";
  const category = blog?.category ?? "Engineering";
  const readTime = blog?.readTime ?? "";
  const dateStr = blog?.date
    ? new Date(blog.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const shortSummary =
    summary.length > 140 ? summary.slice(0, 137) + "..." : summary;
  const titleFontSize = title.length > 40 ? 52 : 68;

  return new ImageResponse(
    (
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
        {/* Grid */}
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
            width: 480,
            height: 480,
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
            left: -60,
            bottom: -60,
            width: 360,
            height: 360,
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
          }}
        >
          <div
            style={{
              fontSize: 13,
              color: "#0f1720",
              background: "#82b6e7",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              fontWeight: 700,
              padding: "6px 14px",
              display: "flex",
            }}
          >
            {category}
          </div>
          <div
            style={{
              fontSize: 13,
              color: "#9fb0c2",
              letterSpacing: "0.2em",
              display: "flex",
            }}
          >
            Rex · htoomyataung.dev/blogs
          </div>
        </div>

        {/* Main */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            paddingTop: 20,
            paddingBottom: 20,
          }}
        >
          <div
            style={{
              fontSize: 12,
              color: "#82b6e7",
              letterSpacing: "0.45em",
              textTransform: "uppercase",
              marginBottom: 22,
              display: "flex",
            }}
          >
            [ Blog Post ]
          </div>

          <div
            style={{
              fontSize: titleFontSize,
              fontWeight: 900,
              color: "#f4f7fb",
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
              marginBottom: 28,
              maxWidth: 900,
              display: "flex",
            }}
          >
            {title}
          </div>

          <div
            style={{
              fontSize: 18,
              color: "#9fb0c2",
              lineHeight: 1.6,
              maxWidth: 720,
              paddingLeft: 20,
              borderLeft: "3px solid #82b6e7",
              display: "flex",
            }}
          >
            {shortSummary}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 28,
            borderTop: "1px solid rgba(130,182,231,0.2)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div
              style={{
                fontSize: 13,
                color: "#f4f7fb",
                fontWeight: 700,
                letterSpacing: "0.05em",
                display: "flex",
              }}
            >
              Htoo Myat Aung
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#9fb0c2",
                letterSpacing: "0.1em",
                display: "flex",
              }}
            >
              {dateStr}
            </div>
          </div>
          <div
            style={{
              fontSize: 13,
              color: "#82b6e7",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              border: "1px solid rgba(130,182,231,0.4)",
              padding: "4px 12px",
              display: "flex",
            }}
          >
            {readTime}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
