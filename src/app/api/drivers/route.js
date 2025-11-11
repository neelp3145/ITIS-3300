import { NextResponse } from "next/server";
import {
  listDriversController,
  createDriverController,
} from "../../../lib/domains/driver/controller.js";
import { withJson, requireAuth } from "../../../lib/domains/user/guards.js";

export const GET = withJson(async () => {
  requireAuth("employee"); // only employees can list
  const { status, body } = await listDriversController();
  return NextResponse.json(body, { status });
});

export const POST = withJson(async (req) => {
  requireAuth("employee");
  const body = await req.json();
  const { status, body: payload } = await createDriverController(body);
  return NextResponse.json(payload, { status });
});
