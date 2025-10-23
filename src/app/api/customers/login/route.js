import { loginCustomerController } from "../../../../lib/domains/customer/controller.js";

export async function POST(req) {
  const body = await req.json();
  const { status, body: payload } = await loginCustomerController(body);
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
