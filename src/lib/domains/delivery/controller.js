import { connectDB } from "../../database/connect.js";
import Delivery from "./schema/delivery.schema.js";

export async function listDeliveriesController() {
  await connectDB();
  const deliveries = await Delivery.find()
    .populate("driverId")
    .populate("orderId");
  return { status: 200, body: { ok: true, data: deliveries } };
}

export async function createDeliveryController(body) {
  await connectDB();
  const delivery = await Delivery.create(body);
  return { status: 201, body: { ok: true, data: delivery } };
}

export async function updateDeliveryStatusController(id, status) {
  await connectDB();
  const updated = await Delivery.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
  if (!updated)
    return { status: 404, body: { ok: false, msg: "Delivery not found" } };
  return { status: 200, body: { ok: true, data: updated } };
}

export async function getDeliveryByOrderIdController(orderId) {
  await connectDB();
  const delivery = await Delivery.findOne({ orderId }).populate("driverId");
  if (!delivery)
    return {
      status: 404,
      body: { ok: false, msg: "No delivery for this order" },
    };
  return { status: 200, body: { ok: true, data: delivery } };
}
