import { NextResponse } from "next/server";
import { signupCustomerController } from "../../../../lib/domains/customer/controller.js";

export async function POST(req) {
  try {
    const body = await req.json();
    const { status, body: payload } = await signupCustomerController(body);
    return NextResponse.json(payload, { status });
  } catch (err) {
    console.error("POST /api/customers error:", err);
    return NextResponse.json(
      { ok: false, msg: "Invalid JSON or server error" },
      { status: 400 }
    );
  }
}
