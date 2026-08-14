import BlogPostForm from "@/components/admin/BlogPostForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "New Blog Post — Admin" };

export default function NewPostPage() {
  return <BlogPostForm />;
}
