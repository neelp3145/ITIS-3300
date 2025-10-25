import { NextResponse } from "next/server";
import {
  getMenuItemController,
  updateMenuItemController,
  deleteMenuItemController,
} from "../../../../lib/domains/menuItem/controller.js";


export async function GET(_req, ctx) {
  const { id } = await ctx.params;       
  const { status, body } = await getMenuItemController(id);
  return NextResponse.json(body, { status });
}

export async function PUT(req, ctx) {
  const { id } = await ctx.params;  
  const json = await req.json();
  const { status, body } = await updateMenuItemController(id, json);
  return NextResponse.json(body, { status });
}

export async function DELETE(_req, ctx) {
  const { id } = await ctx.params; 
  const { status, body } = await deleteMenuItemController(id);
  return NextResponse.json(body, { status });
}
