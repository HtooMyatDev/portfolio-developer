import { cookies } from "next/headers";
import { createHmac } from "crypto";

const SESSION_COOKIE = "admin_session";
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET ?? "fallback-secret";

function signToken(payload: string): string {
  const hmac = createHmac("sha256", SESSION_SECRET);
  hmac.update(payload);
  return `${payload}.${hmac.digest("hex")}`;
}

function verifyToken(token: string): boolean {
  const lastDot = token.lastIndexOf(".");
  if (lastDot === -1) return false;
  const payload = token.slice(0, lastDot);
  const expected = signToken(payload);
  return token === expected;
}

/** Called from /api/admin/login — sets a signed HTTP-only cookie */
export function createAdminSessionCookie(): string {
  const payload = `admin:${Date.now()}`;
  return signToken(payload);
}

/** Called from middleware / server components — validates the session cookie */
export async function verifyAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  return verifyToken(token);
}

export { SESSION_COOKIE };
