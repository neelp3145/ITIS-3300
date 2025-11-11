import { NextResponse } from "next/server";
import { clearAuthCookie } from "../../../../lib/domains/user/auth.js";

export async function POST() {
  const res = NextResponse.json({ ok: true, msg: "Logged out" });
  clearAuthCookie(res);
  return res;
}
