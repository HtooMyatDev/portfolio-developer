import { NextRequest, NextResponse } from "next/server";
import { supabase, getServiceSupabase } from "@/lib/supabase";
import { verifyAdminSession } from "@/lib/auth";

// GET /api/blogs/[id] — fetch single post by slug (public)
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}

// PUT /api/blogs/[id] — admin only, update a post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const db = getServiceSupabase();

    const { data, error } = await db
      .from("blog_posts")
      .update({
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
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}

// DELETE /api/blogs/[id] — admin only, delete a post
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const db = getServiceSupabase();

  const { error } = await db.from("blog_posts").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
