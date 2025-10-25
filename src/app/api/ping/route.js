export async function GET() {
  return new Response(JSON.stringify({ ok: true, msg: "pong" }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}
