import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { requireUserFromCookies } from "../../../../lib/domains/user/auth.js";

export async function GET() {
  const result = requireUserFromCookies(cookies());
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, msg: result.error },
      { status: result.status }
    );
  }
  if (result.role !== "customer") {
    return NextResponse.json({ ok: false, msg: "Forbidden" }, { status: 403 });
  }
  return NextResponse.json({
    ok: true,
    userId: result.userId,
    role: result.role,
  });
}
