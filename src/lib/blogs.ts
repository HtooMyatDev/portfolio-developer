import { supabase } from "@/lib/supabase";

export type BlogPost = {
  id: string;         // UUID from Supabase
  slug: string;       // URL-friendly slug
  title: string;
  date: string;
  category?: string;
  readTime?: string;
  english_summary?: string;
  burmese_summary?: string;
  english_content?: string;
  burmese_content?: string;
  status: "draft" | "published";
};

export async function getSortedBlogsData(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("date", { ascending: false });

  if (error || !data) return [];

  return data.map((row) => ({
    id: row.slug,   // Keep slug as "id" so existing [id] routes work without changes
    slug: row.slug,
    title: row.title,
    date: row.date,
    category: row.category ?? "",
    readTime: row.read_time ?? "",
    english_summary: row.english_summary ?? "",
    burmese_summary: row.burmese_summary ?? "",
    english_content: row.english_content ?? "",
    burmese_content: row.burmese_content ?? "",
    status: row.status,
  }));
}

export async function getBlogData(slug: string): Promise<
  BlogPost & { contentHtml: string }
> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) throw new Error(`Blog not found: ${slug}`);

  // Content is already HTML from TipTap — no remark conversion needed.
  // For legacy posts migrated from .md, content is also pre-converted to HTML.
  const contentHtml = data.english_content ?? "";

  return {
    id: data.slug,
    slug: data.slug,
    title: data.title,
    date: data.date,
    category: data.category ?? "",
    readTime: data.read_time ?? "",
    english_summary: data.english_summary ?? "",
    burmese_summary: data.burmese_summary ?? "",
    english_content: data.english_content ?? "",
    burmese_content: data.burmese_content ?? "",
    status: data.status,
    contentHtml,
  };
}
