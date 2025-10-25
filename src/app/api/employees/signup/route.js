import { NextResponse } from "next/server";
import { signupEmployeeController } from "../../../../lib/domains/employee/controller.js";

export async function POST(req) {
  try {
    const body = await req.json();
    const { status, body: payload } = await signupEmployeeController(body);
    return NextResponse.json(payload, { status });
  } catch (err) {
    console.error("POST /api/employees error:", err);
    return NextResponse.json(
      { ok: false, msg: "Invalid JSON or server error" },
      { status: 400 }
    );
  }
}
