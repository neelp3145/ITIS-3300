import { connectDB } from "../../database/connect.js";
import Order from "./schemas/order.schema.js";

export async function listOrdersController(
  customerId,
  { limit = 20, page = 1 } = {}
) {
  await connectDB();

  const orders = await Order.find({ customer: customerId })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  return { ok: true, orders };
}

export async function getOrderController(customerId, orderId) {
  await connectDB();

  const order = await Order.findOne({
    _id: orderId,
    customer: customerId,
  }).lean();
  if (!order) {
    return { ok: false, status: 404, msg: "Order not found" };
  }

  return { ok: true, order };
}
