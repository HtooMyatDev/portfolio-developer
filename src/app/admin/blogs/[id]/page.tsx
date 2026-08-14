import { getServiceSupabase } from "@/lib/supabase";
import BlogPostForm from "@/components/admin/BlogPostForm";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edit Blog Post — Admin" };

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const db = getServiceSupabase();

  const { data: post, error } = await db
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !post) notFound();

  return <BlogPostForm initialData={post} postId={post.id} />;
}
