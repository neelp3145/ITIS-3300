
import {
  getCartController,
  putCartController,
  clearCartController,
} from "../../../lib/domains/cart/controller.js";

function cid(req) {
  return req.headers.get("x-customer-id");
}

export async function GET(req) {
  const customerId = cid(req);
  if (!customerId)
    return new Response(
      JSON.stringify({ ok: false, msg: "Missing x-customer-id" }),
      { status: 401 }
    );
  const out = await getCartController(customerId);
  return new Response(JSON.stringify(out), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function PUT(req) {
  const customerId = cid(req);
  if (!customerId)
    return new Response(
      JSON.stringify({ ok: false, msg: "Missing x-customer-id" }),
      { status: 401 }
    );
  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, msg: "Invalid JSON" }), {
      status: 400,
    });
  }
  const { items = [], updatedAt: clientUpdatedAt } = body || {};
  try {
    const out = await putCartController(customerId, items, clientUpdatedAt);
    return new Response(JSON.stringify(out), {
      status: out.status || 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, msg: e.message }), {
      status: 400,
    });
  }
}

export async function DELETE(req) {
  const customerId = cid(req);
  if (!customerId)
    return new Response(
      JSON.stringify({ ok: false, msg: "Missing x-customer-id" }),
      { status: 401 }
    );
  const out = await clearCartController(customerId);
  return new Response(JSON.stringify(out), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
