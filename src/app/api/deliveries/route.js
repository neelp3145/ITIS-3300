import { NextResponse } from "next/server";
import {
  listDeliveriesController,
  createDeliveryController,
} from "../../../lib/domains/delivery/controller.js";
import { withJson, requireAuth } from "../../../lib/domains/user/guards.js";

export const GET = withJson(async () => {
  requireAuth("employee");
  const { status, body } = await listDeliveriesController();
  return NextResponse.json(body, { status });
});

export const POST = withJson(async (req) => {
  requireAuth("employee");
  const body = await req.json();
  const { status, body: payload } = await createDeliveryController(body);
  return NextResponse.json(payload, { status });
});
