import { orderController } from "../../../../lib/domains/order/controller.js";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const result = await orderController.getOrderById(id);

    if (!result.ok) {
      return Response.json(result, { status: 404 });
    }

    return Response.json(result);
  } catch (error) {
    return Response.json({
      ok: false,
      message: 'Server error',
      error: error.message
    }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    let result;
    if (body.driverId) {
      result = await orderController.assignDriver(id, body.driverId, body.driverName);
    } else {
      result = await orderController.updateOrderStatus(
        id,
        body.status,
        body.kitchenNotes || ''
      );
    }

    if (!result.ok) {
      return Response.json(result, { status: 400 });
    }

    return Response.json(result);
  } catch (error) {
    return Response.json({
      ok: false,
      message: 'Server error',
      error: error.message
    }, { status: 500 });
  }
}