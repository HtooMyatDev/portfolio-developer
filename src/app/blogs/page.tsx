import Header from "@/components/Header";
import Link from "next/link";
import { blogs } from "@/data/blogs";

export default function BlogsPage() {
  return (
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

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {blogs.map((post) => (
          <Link
            href={`/blogs/${post.id}`}
            key={post.id}
            className="border-2 border-black dark:border-white bg-background p-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0_0_rgba(255,255,255,1)] hover:-translate-y-1 transition-all cursor-pointer"
          >
            <article>
              <div className="flex items-center justify-between gap-3">
                <span
                  className="font-departure-mono text-[10px] uppercase tracking-[0.25em]"
                  style={{ color: "var(--accent)" }}
                >
                  {post.category}
                </span>
                <span
                  className="font-departure-mono text-[10px] uppercase tracking-[0.25em]"
                  style={{ color: "var(--muted)" }}
                >
                  {post.readTime}
                </span>
              </div>
              <h2 className="mt-4 font-departure-mono text-2xl leading-tight">
                {post.title}
              </h2>
              <p
                className="mt-3 text-sm leading-7"
                style={{ color: "var(--muted)" }}
              >
                <span className="font-departure-mono">
                  {" "}
                  {post.english_summary}
                </span>
                <span className="font-tharlon">
                  {post.burmese_summary + " "}
                </span>
              </p>
            </article>
          </Link>
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
          I&apos;m writing more regularly about frontend craft, useful systems,
          and the small decisions that make products feel polished.
        </p>
      </div>
    </div>
  );
}
