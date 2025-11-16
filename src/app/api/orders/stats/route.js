import { orderController } from "../../../../lib/domains/order/controller.js";

export async function GET() {
  try {
    const result = await orderController.getKitchenStats();
    return Response.json(result);
  } catch (error) {
    return Response.json({
      ok: false,
      message: 'Server error',
      error: error.message
    }, { status: 500 });
  }
}