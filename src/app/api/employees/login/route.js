import { NextResponse } from "next/server";
import { loginEmployeeController } from "../../../../lib/domains/employee/controller.js";
import {
  signToken,
  attachAuthCookie,
} from "../../../../lib/domains/user/auth.js";

export async function POST(req) {
  const body = await req.json();
  const { status, body: payload } = await loginEmployeeController(body);

  if (status === 200 && payload?.data) {
    const token = signToken({ _id: payload.data._id, role: "employee" });
    const res = NextResponse.json({ ok: true, user: payload.data }, { status });
    attachAuthCookie(res, token);
    return res;
  }
  return NextResponse.json(payload, { status });
}
