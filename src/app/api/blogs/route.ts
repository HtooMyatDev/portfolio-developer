import { NextRequest, NextResponse } from "next/server";
import { supabase, getServiceSupabase } from "@/lib/supabase";
import { verifyAdminSession } from "@/lib/auth";

// GET /api/blogs — public list of published posts
export async function GET() {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("date", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST /api/blogs — admin only, create a new post
export async function POST(request: NextRequest) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const db = getServiceSupabase();

    const { data, error } = await db
      .from("blog_posts")
      .insert([
        {
          slug: body.slug,
          title: body.title,
          date: body.date,
          category: body.category || null,
          read_time: body.read_time || null,
          english_summary: body.english_summary || null,
          burmese_summary: body.burmese_summary || null,
          english_content: body.english_content || null,
          burmese_content: body.burmese_content || null,
          status: body.status || "draft",
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
