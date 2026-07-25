// posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type BlogPost = {
  id: string;
  title: string;
  date: string;
  category?: string;
  readTime?: string;
  english_summary?: string;
  burmese_summary?: string;
  english_content?: string;
  burmese_content?: string;
};

const blogsDirectory = path.join(process.cwd(), "public", "blogs");

export function getSortedBlogsData() {
  // Get file names under /blogs
  const fileNames = fs.readdirSync(blogsDirectory);
  const allBlogsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(blogsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    const blogPost: BlogPost = {
      id,
      title: matterResult.data.title || "",
      date: matterResult.data.date || "",
      category: matterResult.data.category || "",
      readTime: matterResult.data.readTime || "",
      english_summary: matterResult.data.english_summary || "",
      burmese_summary: matterResult.data.burmese_summary || "",
      english_content: matterResult.data.english_content || "",
      burmese_content: matterResult.data.burmese_content || "",
    };

    // Combine the data with the id
    return blogPost;
  });
  // Sort posts by date
  return allBlogsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getBlogData(id: string) {
  const fullPath = path.join(blogsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  const blogPostWithHTML: BlogPost & {
    contentHtml: string;
  } = {
    id,
    title: matterResult.data.title || "",
    date: matterResult.data.date || "",
    category: matterResult.data.category || "",
    readTime: matterResult.data.readTime || "",
    english_summary: matterResult.data.english_summary || "",
    burmese_summary: matterResult.data.burmese_summary || "",
    english_content: matterResult.data.english_content || "",
    burmese_content: matterResult.data.burmese_content || "",
    contentHtml,
  };

  // Combine the data with the id
  return blogPostWithHTML;
}
