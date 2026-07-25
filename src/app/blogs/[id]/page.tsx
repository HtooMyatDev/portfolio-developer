"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { blogs } from "@/data/blogs";

export default function BlogDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const post = blogs.find((p) => p.id === Number(id));
  const router = useRouter();

  if (!post) {
    return (
      <div className="min-h-screen pt-24 pb-10">
        <Header title="Post not found" subtitle="404 Error" />
        <p
          className="mt-6 font-departure-mono text-sm text-center"
          style={{ color: "var(--muted)" }}
        >
          The blog post you are looking for doesn&apos;t exist.
        </p>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-10 max-w-3xl">
      {/* Meta */}
      <div className="flex items-center gap-4 mb-6">
        <span
          className="font-departure-mono text-[10px] uppercase tracking-widest border-2 border-black dark:border-white px-2 py-1 shadow-[2px_2px_0_0_rgba(0,0,0,1)] dark:shadow-[2px_2px_0_0_rgba(255,255,255,1)]"
          style={{
            backgroundColor: "var(--accent)",
            color: "var(--accent-contrast)",
          }}
        >
          {post.category}
        </span>
        <span
          className="font-departure-mono text-[10px] uppercase tracking-widest"
          style={{ color: "var(--muted)" }}
        >
          {post.readTime}
        </span>
      </div>

      {/* Title */}
      <h1 className="font-departure-mono text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
        {post.title}
      </h1>

      {/* Summary */}
      <p
        className="font-tharlon text-base leading-7 mb-10 border-l-4 pl-4"
        style={{ color: "var(--muted)", borderColor: "var(--accent)" }}
      >
        <span className="font-departure-mono">{post.english_summary}</span>
        <span className="font-tharlon">{post.burmese_summary}</span>
      </p>

      {/* Content */}
      <div className="flex flex-col gap-5">
        {post.english_content?.split("\n\n").map((paragraph, i) => (
          <p
            key={i}
            className="font-departure-mono text-[15px] sm:text-[16px] leading-8"
            style={{ color: "var(--foreground)" }}
          >
            {paragraph}
          </p>
        ))}
        {post.burmese_content &&
          post.burmese_content.trim() !== "" &&
          post.burmese_content.split("\n\n").map((paragraph, i) => (
            <p
              key={`bm-${i}`}
              className="font-tharlon text-[15px] sm:text-[16px] leading-8"
              style={{ color: "var(--foreground)" }}
            >
              {paragraph}
            </p>
          ))}
      </div>

      {/* Back button */}
      <div className="mt-12">
        <button
          onClick={() => router.push("/blogs")}
          className="px-5 py-2.5 font-departure-mono font-bold uppercase tracking-widest text-xs cursor-pointer transition-all border-2 border-black dark:border-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0_0_rgba(255,255,255,1)] active:translate-y-1 active:translate-x-1 active:shadow-none"
          style={{
            backgroundColor: "var(--card-bg)",
            color: "var(--foreground)",
            borderColor: "var(--border)",
          }}
        >
          ← Back to Blogs
        </button>
      </div>
    </div>
  );
}
