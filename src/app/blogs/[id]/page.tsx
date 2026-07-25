import getFormattedDate from "@/lib/getFormattedDate";
import { getSortedBlogsData, getBlogData } from "@/lib/blogs";
import { notFound } from "next/navigation";
import Link from "next/link";

export function generateStaticParams() {
  const blogs = getSortedBlogsData();

  return blogs.map((blog) => ({
    id: blog.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blogs = getSortedBlogsData();

  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  const ogImageUrl = `https://portfolio-developer-ten-pied.vercel.app/blogs/${id}/opengraph-image`;

  return {
    title: `${blog.title} | Rex`,
    description: blog.english_summary || `Read ${blog.title} on Rex's portfolio`,
    openGraph: {
      title: blog.title,
      description: blog.english_summary || `Read ${blog.title} on Rex's portfolio`,
      url: `https://portfolio-developer-ten-pied.vercel.app/blogs/${id}`,
      siteName: "Rex — Htoo Myat Aung",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.english_summary || `Read ${blog.title} on Rex's portfolio`,
      images: [ogImageUrl],
    },
  };
}

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blogs = getSortedBlogsData();

  if (!blogs.find((b) => b.id === id)) notFound();

  const blog = await getBlogData(id);

  const pubDate = getFormattedDate(blog.date);

  const blogIndex = blogs.findIndex((b) => b.id === id) + 1;

  return (
    <div className="pt-12 pb-10 max-w-3xl">
      {/* Meta */}
      <div className="flex items-center gap-4 mb-6">
        <span
          className="font-departure-mono text-[10px] font-bold border-2 border-black dark:border-white px-2 py-1 shadow-[2px_2px_0_0_rgba(0,0,0,1)] dark:shadow-[2px_2px_0_0_rgba(255,255,255,1)]"
          style={{
            backgroundColor: "var(--accent)",
            color: "var(--accent-contrast)",
          }}
        >
          [{blogIndex}] {blog.category}
        </span>
        {blog.readTime && (
          <span
            className="font-departure-mono text-[10px] uppercase tracking-widest"
            style={{ color: "var(--muted)" }}
          >
            {blog.readTime}
          </span>
        )}
        <span
          className="font-departure-mono text-[10px] uppercase tracking-widest"
          style={{ color: "var(--muted)" }}
        >
          {pubDate}
        </span>
      </div>

      {/* Title */}
      <h1 className="font-departure-mono text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
        {blog.title}
      </h1>

      {/* Summary */}
      {(blog.english_summary || blog.burmese_summary) && (
        <p
          className="font-tharlon text-base leading-7 mb-10 border-l-4 pl-4"
          style={{ color: "var(--muted)", borderColor: "var(--accent)" }}
        >
          {blog.english_summary && (
            <span className="font-departure-mono">{blog.english_summary}</span>
          )}
          {/* {blog.burmese_summary && (
            <span className="font-tharlon"> {blog.burmese_summary}</span>
          )} */}
        </p>
      )}

      {/* Markdown Body Content */}
      <article
        className="prose dark:prose-invert font-departure-mono max-w-none prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6 prose-a:text-[var(--accent)] prose-blockquote:border-l-[var(--accent)]"
        dangerouslySetInnerHTML={{ __html: blog.contentHtml }}
      />

      {/* Back button */}
      <div className="mt-12">
        <Link
          href="/blogs"
          className="inline-block px-5 py-2.5 font-departure-mono font-bold uppercase tracking-widest text-xs transition-all border-2 border-black dark:border-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0_0_rgba(255,255,255,1)] active:translate-y-1 active:translate-x-1 active:shadow-none"
          style={{
            backgroundColor: "var(--card-bg)",
            color: "var(--foreground)",
            borderColor: "var(--border)",
          }}
        >
          ← Back to Blogs
        </Link>
      </div>
    </div>
  );
}
