import { getSortedBlogsData } from "@/lib/blogs";
import Header from "@/components/Header";
import ListItem from "./ListItem";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Notes, ideas, and lessons on frontend craft and software engineering.",
  openGraph: {
    title: "Blogs",
    description:
      "Notes, ideas, and lessons on frontend craft and software engineering.",
    url: "https://portfolio-developer-ten-pied.vercel.app/blogs",
    siteName: "Htoo Myat Aung",
    images: [
      {
        url: "https://portfolio-developer-ten-pied.vercel.app/blogs/og-image.png",
        width: 1200,
        height: 630,
        alt: "Blogs - Htoo Myat Aung",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogs",
    description:
      "Notes, ideas, and lessons on frontend craft and software engineering.",
    images: ["https://htoomyataung.com/blogs/og-image.png"],
  },
};

export default function Blogs() {
  const blogs = getSortedBlogsData();

  return (
    <section className="mt-6 mx-auto">
      <div className="space-y-8 pb-10">
        {/* Intro block */}
        <div
          className="border-2 border-black dark:border-white p-8 shadow-[6px_6px_0_0_rgba(0,0,0,1)] dark:shadow-[6px_6px_0_0_rgba(255,255,255,1)] flex flex-col sm:flex-row sm:items-end justify-between gap-6"
          style={{ backgroundColor: "var(--card-bg)" }}
        >
          <div>
            <p
              className="font-departure-mono text-[10px] uppercase tracking-widest mb-2"
              style={{ color: "var(--accent)" }}
            >
              [ Posts Written ]
            </p>
            <span
              className="font-doto text-[80px] sm:text-[120px] leading-none font-black"
              style={{ color: "var(--accent)" }}
            >
              0{blogs.length}
            </span>
          </div>
          <p
            className="font-departure-mono text-sm leading-7 max-w-xs"
            style={{ color: "var(--muted)" }}
          >
            Short notes on craft, systems, and the small decisions that make
            products feel right.
          </p>
        </div>

        <Header title="Blogs" subtitle="notes, ideas & lessons" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {blogs.map((blog, index) => (
            <ListItem key={blog.id} blog={blog} index={index + 1} />
          ))}
        </div>

        <div className="border-2 border-black dark:border-white bg-background p-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)]">
          <p
            className="font-departure-mono text-xs uppercase tracking-[0.3em]"
            style={{ color: "var(--accent)" }}
          >
            More coming soon
          </p>
          <p
            className="mt-3 font-departure-mono text-sm leading-7"
            style={{ color: "var(--muted)" }}
          >
            I&apos;m writing more regularly about frontend craft, useful
            systems, and the small decisions that make products feel polished.
          </p>
        </div>
      </div>
    </section>
  );
}
