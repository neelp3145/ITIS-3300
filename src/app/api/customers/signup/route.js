import { NextResponse } from "next/server";
import { signupCustomerController } from "../../../../lib/domains/customer/controller.js";
import {
  signToken,
  attachAuthCookie,
} from "../../../../lib/domains/user/auth.js";

export async function POST(req) {
  console.log("HIT /api/customers/signup");

  try {
    const body = await req.json();
    const { status, body: payload } = await signupCustomerController(body);
    console.log("Reqest body:", body);

    if ((status === 201 || status === 200) && payload?.data) {
      const token = signToken({ _id: payload.data._id, role: "customer" });
      const res = NextResponse.json(
        { ok: true, user: payload.data },
        { status }
      );
      attachAuthCookie(res, token);
      return res;
    }
    return NextResponse.json(payload, { status });
  } catch (err) {
    console.error("POST /api/customers error:", err);
    return NextResponse.json(
      { ok: false, msg: "Invalid JSON or server error" },
      { status: 400 }
    );
  }
}
