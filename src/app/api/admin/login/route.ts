import { NextRequest, NextResponse } from "next/server";
import { createAdminSessionCookie, SESSION_COOKIE } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Admin password not configured" },
        { status: 500 }
      );
    }

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    const token = createAdminSessionCookie();

    const response = NextResponse.json({ success: true });
    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
