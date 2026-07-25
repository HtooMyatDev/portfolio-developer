import Link from "next/link";
import type { BlogPost } from "@/lib/blogs";

type Props = {
  blog: BlogPost;
  index?: number;
};

export default function ListItem({ blog, index }: Props) {
  return (
    <Link
      href={`/blogs/${blog.id}`}
      key={blog.id}
      className="border-2 border-black dark:border-white bg-background p-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0_0_rgba(255,255,255,1)] hover:-translate-y-1 transition-all cursor-pointer"
    >
      <article>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {index !== undefined && (
              <span
                className="font-departure-mono text-[10px] font-bold"
                style={{ color: "var(--accent)" }}
              >
                [{index}]
              </span>
            )}
            <span
              className="font-departure-mono text-[10px] uppercase tracking-[0.25em]"
              style={{ color: "var(--accent)" }}
            >
              {blog.category}
            </span>
          </div>
          <span
            className="font-departure-mono text-[10px] uppercase tracking-[0.25em]"
            style={{ color: "var(--muted)" }}
          >
            {blog.readTime}
          </span>
        </div>
        <h2 className="mt-4 font-departure-mono text-2xl leading-tight">
          {blog.title}
        </h2>
        <p className="mt-3 text-sm leading-7" style={{ color: "var(--muted)" }}>
          <span className="font-departure-mono"> {blog.english_summary}</span>
        </p>
      </article>
    </Link>
  );
}
