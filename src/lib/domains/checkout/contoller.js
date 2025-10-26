// src/lib/domains/checkout/controller.js
import { connectDB } from "../../database/connect.js";
import Cart from "../cart/schema/cart.schema.js"
import MenuItem from "../menuItem/schema/menuItem.schema.js";
import Order from "../order/schemas/order.schema.js";
import mongoose from "mongoose";

export async function checkoutController(customerId, payload = {}) {
  await connectDB();

  const cart = await Cart.findOne({ customer: customerId });
  if (!cart || cart.items.length === 0) {
    return { ok: false, status: 400, msg: "Cart is empty" };
  }

  const ids = cart.items.map((l) => new mongoose.Types.ObjectId(l.item));
  const docs = await MenuItem.find(
    { _id: { $in: ids } },
    { _id: 1, price: 1, available: 1, restaurant: 1 }
  ).lean();

  const byId = new Map(docs.map((d) => [d._id.toString(), d]));
  let restaurantId = null;
  let total = 0;

  for (const line of cart.items) {
    const d = byId.get(String(line.item));
    if (!d)
      return {
        ok: false,
        status: 409,
        msg: "An item was removed from the menu",
      };
    if (d.available === false)
      return { ok: false, status: 409, msg: "An item became unavailable" };
    if (!restaurantId) restaurantId = d.restaurant?.toString();
    if (!restaurantId || d.restaurant?.toString() !== restaurantId) {
      return {
        ok: false,
        status: 409,
        msg: "Cart contains items from multiple restaurants",
      };
    }
    total += Number(d.price) * Number(line.quantity);
  }

  total = Math.round((total + Number.EPSILON) * 100) / 100;

  const orderDoc = await Order.create({
    customer: cart.customer,
    items: cart.items.map((l) => ({ item: l.item, quantity: l.quantity })),
    totalPrice: total,
    paymentMethod: payload.paymentMethod || "cash",
    status: "pending",
  });

  cart.items = [];
  cart.totalPrice = 0;
  cart.updatedAt = new Date();
  await cart.save();

  return {
    ok: true,
    orderId: orderDoc._id,
    totalPrice: orderDoc.totalPrice,
    status: orderDoc.status,
    createdAt: orderDoc.createdAt,
  };
}
