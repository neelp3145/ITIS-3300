import { NextResponse } from "next/server";
import { signupEmployeeController } from "../../../../lib/domains/employee/controller.js";
import {
  signToken,
  attachAuthCookie,
} from "../../../../lib/domains/user/auth.js";

export async function POST(req) {
  try {
    const body = await req.json();
    const { status, body: payload } = await signupEmployeeController(body);

    if ((status === 201 || status === 200) && payload?.data) {
      const token = signToken({ _id: payload.data._id, role: "employee" });
      const res = NextResponse.json(
        { ok: true, user: payload.data },
        { status }
      );
      attachAuthCookie(res, token);
      return res;
    }
    return NextResponse.json(payload, { status });
  } catch (err) {
    console.error("POST /api/employees error:", err);
    return NextResponse.json(
      { ok: false, msg: "Invalid JSON or server error" },
      { status: 400 }
    );
  }
}
