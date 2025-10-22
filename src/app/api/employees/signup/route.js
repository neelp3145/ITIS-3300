import { NextResponse } from "next/server";
import { postSignupEmployee } from "../../../../lib/domains/employee/routes.js";

export async function POST(req) {
  const data = await req.json();
  const { status, body } = await postSignupEmployee(data);
  return NextResponse.json(body, { status });
}

