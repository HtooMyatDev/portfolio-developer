import { NextResponse } from "next/server";
import { supabase, getServiceSupabase } from "@/lib/supabase";

// GET /api/views — returns current visitor count (public)
export async function GET() {
  const { data, error } = await supabase
    .from("page_views")
    .select("count")
    .eq("id", "portfolio")
    .single();

  if (error || !data) {
    return NextResponse.json({ count: 0 });
  }

  return NextResponse.json({ count: data.count });
}

// POST /api/views — atomically increments the visitor count
// Called client-side on every portfolio homepage visit
export async function POST() {
  const db = getServiceSupabase();

  const { data, error } = await db.rpc("increment_page_views", {
    row_id: "portfolio",
  });

  if (error) {
    console.error("Failed to increment page views:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ count: data });
}
