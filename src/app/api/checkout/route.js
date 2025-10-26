import { checkoutController } from "../../../lib/domains/checkout/contoller";
function cid(req) {
  return req.headers.get("x-customer-id");
}

export async function POST(req) {
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
  const out = await checkoutController(customerId, body || {});
  return new Response(JSON.stringify(out), {
    status: out.status || (out.ok ? 201 : 400),
    headers: { "Content-Type": "application/json" },
  });
}
