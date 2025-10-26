import { listOrdersController } from "../../../lib/domains/order/controller.js";
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
  const url = new URL(req.url);
  const page = Number(url.searchParams.get("page") || 1);
  const limit = Number(url.searchParams.get("limit") || 20);
  const out = await listOrdersController(customerId, { page, limit });
  return new Response(JSON.stringify(out), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
