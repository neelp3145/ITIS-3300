import { orderController } from "../../../../../lib/domains/order/controller.js";

export async function GET(request, { params }) {
  try {
    const { orderNumber } = params;

    const result = await orderController.getAllOrders({ orderNumber });

    if (result.ok && result.data.length > 0) {
      return Response.json({
        ok: true,
        data: result.data[0]
      });
    } else {
      return Response.json({
        ok: false,
        message: 'Order not found'
      }, { status: 404 });
    }
  } catch (error) {
    return Response.json({
      ok: false,
      message: 'Server error',
      error: error.message
    }, { status: 500 });
  }
}