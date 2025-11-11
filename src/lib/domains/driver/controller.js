import { connectDB } from "../../database/connect.js";
import Driver from "./schema/driver.schema.js";
import Delivery from "../delivery/schema/delivery.schema.js";

export async function listDriversController() {
  await connectDB();
  const drivers = await Driver.find().populate("assignedDeliveries");
  return { status: 200, body: { ok: true, data: drivers } };
}

export async function createDriverController(body) {
  await connectDB();
  const driver = await Driver.create(body);
  return { status: 201, body: { ok: true, data: driver } };
}

export async function updateDriverController(id, body) {
  await connectDB();
  const updated = await Driver.findByIdAndUpdate(id, body, { new: true });
  if (!updated)
    return { status: 404, body: { ok: false, msg: "Driver not found" } };
  return { status: 200, body: { ok: true, data: updated } };
}

export async function assignDeliveryToDriverController(driverId, deliveryId) {
  await connectDB();

  const driver = await Driver.findById(driverId);
  if (!driver)
    return { status: 404, body: { ok: false, msg: "Driver not found" } };

  const delivery = await Delivery.findByIdAndUpdate(
    deliveryId,
    { driverId, status: "picked_up" },
    { new: true }
  );

  driver.assignedDeliveries.push(delivery._id);
  await driver.save();

  return {
    status: 200,
    body: { ok: true, msg: "Delivery assigned", data: delivery },
  };
}
