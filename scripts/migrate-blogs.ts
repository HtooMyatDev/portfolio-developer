/**
 * Migration script: converts existing .md files from public/blogs/
 * into Supabase blog_posts table rows.
 *
 * Run with:
 *   npx ts-node --project tsconfig.json scripts/migrate-blogs.ts
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load .env.local
dotenv.config({ path: path.join(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error("❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const db = createClient(supabaseUrl, serviceKey);
const blogsDir = path.join(process.cwd(), "public", "blogs");

async function migrateBlogs() {
  const files = fs.readdirSync(blogsDir).filter((f) => f.endsWith(".md"));

  console.log(`\n📂 Found ${files.length} markdown files in public/blogs/\n`);

  for (const fileName of files) {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(blogsDir, fileName);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(raw);

    // Convert markdown body to HTML
    const processed = await remark().use(html).process(content);
    const contentHtml = processed.toString();

    const row = {
      slug,
      title: data.title ?? slug,
      date: data.date ?? new Date().toISOString().split("T")[0],
      category: data.category ?? null,
      read_time: data.readTime ?? null,
      english_summary: data.english_summary ?? data.summary ?? null,
      burmese_summary: data.burmese_summary ?? null,
      english_content: contentHtml,
      burmese_content: data.burmese_content ?? null,
      status: "published" as const,
    };

    const { error } = await db
      .from("blog_posts")
      .upsert(row, { onConflict: "slug" });

    if (error) {
      console.error(`❌ Failed to migrate "${slug}":`, error.message);
    } else {
      console.log(`✅ Migrated: ${slug}`);
    }
  }

  console.log("\n🎉 Migration complete!\n");
}

migrateBlogs().catch(console.error);
