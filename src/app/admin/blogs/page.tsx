import { getServiceSupabase } from "@/lib/supabase";
import type { BlogPostRow } from "@/lib/supabase";
import Link from "next/link";
import AdminLogoutButton from "./LogoutButton";

export const dynamic = "force-dynamic";

export default async function AdminBlogsPage() {
  const db = getServiceSupabase();
  const { data: posts, error } = await db
    .from("blog_posts")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    return (
      <div
        className="min-h-screen p-8"
        style={{ backgroundColor: "var(--background)" }}
      >
        <p
          className="font-departure-mono text-sm"
          style={{ color: "#ef4444" }}
        >
          Error loading posts: {error.message}
        </p>
      </div>
    );
  }

  const published = posts?.filter((p) => p.status === "published") ?? [];
  const drafts = posts?.filter((p) => p.status === "draft") ?? [];

  return (
    <div
      className="min-h-screen p-6 lg:p-10"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-10 gap-4 flex-wrap">
        <div>
          <p
            className="font-departure-mono text-[10px] uppercase tracking-[0.4em] mb-2"
            style={{ color: "var(--accent)" }}
          >
            [ Admin CMS ]
          </p>
          <h1
            className="font-departure-mono text-3xl font-black"
            style={{ color: "var(--foreground)" }}
          >
            Blog Posts
          </h1>
          <p
            className="font-departure-mono text-xs mt-1"
            style={{ color: "var(--muted)" }}
          >
            {published.length} published · {drafts.length} drafts
          </p>
        </div>

        <div className="flex items-center gap-3">
          <AdminLogoutButton />
          <Link
            id="admin-new-post-btn"
            href="/admin/blogs/new"
            className="inline-block px-5 py-2.5 font-departure-mono font-bold uppercase tracking-widest text-xs border-2 border-black dark:border-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0_0_rgba(255,255,255,1)] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all"
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--accent-contrast)",
            }}
          >
            + New Post
          </Link>
        </div>
      </div>

      {/* Posts table */}
      {!posts || posts.length === 0 ? (
        <div
          className="border-2 p-12 text-center shadow-[4px_4px_0_0_var(--border)]"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--card-bg)",
          }}
        >
          <p
            className="font-departure-mono text-sm"
            style={{ color: "var(--muted)" }}
          >
            No blog posts yet.{" "}
            <Link
              href="/admin/blogs/new"
              className="underline"
              style={{ color: "var(--accent)" }}
            >
              Write your first post →
            </Link>
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post: BlogPostRow) => (
            <PostRow key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

function PostRow({ post }: { post: BlogPostRow }) {
  const date = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 border-2 hover:shadow-[4px_4px_0_0_var(--border)] transition-all"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--card-bg)",
      }}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1 flex-wrap">
          <span
            className={`font-departure-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 border ${
              post.status === "published"
                ? "border-emerald-500 text-emerald-500 bg-emerald-500/10"
                : "border-amber-500 text-amber-500 bg-amber-500/10"
            }`}
          >
            {post.status}
          </span>
          {post.category && (
            <span
              className="font-departure-mono text-[9px] uppercase tracking-widest"
              style={{ color: "var(--accent)" }}
            >
              {post.category}
            </span>
          )}
          <span
            className="font-departure-mono text-[9px] uppercase tracking-widest"
            style={{ color: "var(--muted)" }}
          >
            {date}
          </span>
          {post.read_time && (
            <span
              className="font-departure-mono text-[9px] uppercase tracking-widest"
              style={{ color: "var(--muted)" }}
            >
              · {post.read_time}
            </span>
          )}
        </div>
        <p
          className="font-departure-mono text-sm font-bold truncate"
          style={{ color: "var(--foreground)" }}
        >
          {post.title}
        </p>
        <p
          className="font-departure-mono text-[10px] mt-0.5 truncate"
          style={{ color: "var(--muted)" }}
        >
          /blogs/{post.slug}
        </p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {post.status === "published" && (
          <Link
            href={`/blogs/${post.slug}`}
            target="_blank"
            className="px-3 py-1.5 font-departure-mono text-[10px] uppercase tracking-widest border hover:opacity-70 transition-opacity"
            style={{
              borderColor: "var(--border)",
              color: "var(--muted)",
            }}
          >
            View ↗
          </Link>
        )}
        <Link
          id={`admin-edit-${post.slug}`}
          href={`/admin/blogs/${post.id}`}
          className="px-3 py-1.5 font-departure-mono text-[10px] font-bold uppercase tracking-widest border-2 hover:opacity-80 transition-opacity"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--card-bg)",
            color: "var(--foreground)",
          }}
        >
          Edit
        </Link>
      </div>
    </div>
  );
}
