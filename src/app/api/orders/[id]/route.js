// src/app/api/orders/[id]/route.js
import { getOrderController } from "../../../../lib/domains/order/controller.js";
function cid(req) {
  return req.headers.get("x-customer-id");
}

export async function GET(req, { params }) {
  const customerId = cid(req);
  if (!customerId)
    return new Response(
      JSON.stringify({ ok: false, msg: "Missing x-customer-id" }),
      { status: 401 }
    );
  const out = await getOrderController(customerId, params.id);
  return new Response(JSON.stringify(out), {
    status: out.status || 200,
    headers: { "Content-Type": "application/json" },
  });
}
