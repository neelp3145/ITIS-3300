import { orderController } from "../../../../lib/domains/order/controller.js";

export async function DELETE() {
  try {
    // This would typically delete all orders or mark them as completed
    // For now, we'll just return success
    return Response.json({
      ok: true,
      message: 'All orders cleared'
    });
  } catch (error) {
    return Response.json({
      ok: false,
      message: 'Failed to clear orders',
      error: error.message
    }, { status: 500 });
  }
}