import { NextResponse } from "next/server";
import {
  listMenuItemsController,
  createMenuItemController,
} from "../../../lib/domains/menuItem/controller";


export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = Object.fromEntries(searchParams);
  const { status, body } = await listMenuItemsController(query);
  return NextResponse.json(body, { status });
}

export async function POST(req) {
  const json = await req.json();
  const { status, body } = await createMenuItemController(json);
  return NextResponse.json(body, { status });
}