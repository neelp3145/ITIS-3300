import { NextResponse } from "next/server";
import {
  listDeliveriesController,
  createDeliveryController,
} from "@/domains/delivery/controller.js";
import { withJson, requireAuth } from "@/domains/user/auth.js";

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
