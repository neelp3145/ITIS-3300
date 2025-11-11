import { NextResponse } from "next/server";
import { loginCustomerController } from "../../../../lib/domains/customer/controller.js";
import {
  signToken,
  attachAuthCookie,
} from "../../../../lib/domains/user/auth.js";

export async function POST(req) {
  const body = await req.json();
  const { status, body: payload } = await loginCustomerController(body);

  if (status === 200 && payload?.data) {
    const token = signToken({ _id: payload.data._id, role: "customer" });
    const res = NextResponse.json({ ok: true, user: payload.data }, { status });
    attachAuthCookie(res, token);
    return res;
  }
  return NextResponse.json(payload, { status });
}
