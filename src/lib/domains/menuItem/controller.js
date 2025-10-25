import { connectDB } from "../../database/connect.js";
import MenuItem from "./schema/menuItem.schema.js";

function assertId(id) {
  if (!id || typeof id !== "string") throw new Error("Invalid id");
}

function pickMenuFields(body = {}) {
  const out = {};
  if (body.name !== undefined) out.name = body.name;
  if (body.description !== undefined) out.description = body.description;
  if (body.price !== undefined) out.price = body.price;
  if (body.category !== undefined) out.category = body.category;
  if (body.available !== undefined) out.available = body.available;
  if (body.imageUrl !== undefined) out.imageUrl = body.imageUrl;
  return out;
}

export async function listMenuItemsController(query = {}) {
  await connectDB();
  const filter = {};
  if (query.category) filter.category = query.category;
  if (query.available !== undefined)
    filter.available = query.available === "true";
  const items = await MenuItem.find(filter).sort({ createdAt: -1 });
  return { status: 200, body: { ok: true, data: items } };
}

export async function getMenuItemController(id) {
  await connectDB();
  assertId(id);
  const item = await MenuItem.findById(id);
  if (!item)
    return { status: 404, body: { ok: false, msg: "Menu item not found" } };
  return { status: 200, body: { ok: true, data: item } };
}

export async function createMenuItemController(body) {
  await connectDB();
  const payload = pickMenuFields(body);
  if (!payload.name)
    return { status: 400, body: { ok: false, msg: "name is required" } };
  if (payload.price == null)
    return { status: 400, body: { ok: false, msg: "price is required" } };
  const created = await MenuItem.create(payload);
  return { status: 201, body: { ok: true, data: created } };
}

export async function updateMenuItemController(id, body) {
  await connectDB();
  assertId(id);
  const payload = pickMenuFields(body);
  const updated = await MenuItem.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!updated)
    return { status: 404, body: { ok: false, msg: "Menu item not found" } };
  return { status: 200, body: { ok: true, data: updated } };
}

export async function deleteMenuItemController(id) {
  await connectDB();
  assertId(id);
  const deleted = await MenuItem.findByIdAndDelete(id);
  if (!deleted)
    return { status: 404, body: { ok: false, msg: "Menu item not found" } };
  return { status: 200, body: { ok: true, data: deleted } };
}
