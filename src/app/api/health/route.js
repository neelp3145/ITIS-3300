import { connectDB } from "../../../lib/database/connect";

export async function GET() {
  try {
    await connectDB();
    return new Response(JSON.stringify({ ok: true, db: "connected" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ ok: false, db: "error", msg: e.message }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      }
    );
  }
}
