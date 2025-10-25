import { loginEmployeeController } from "../../../../lib/domains/employee/controller.js";

export async function POST(req) {
  const body = await req.json();
  const { status, body: payload } = await loginEmployeeController(body);

  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
