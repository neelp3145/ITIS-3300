
import { connectDB } from "../../database/connect.js";
import Cart from "./schema/cart.schema.js";
import MenuItem from "../menuItem/schema/menuItem.schema.js";
import mongoose from "mongoose";

async function validateCartLines(clientLines) {
  if (!Array.isArray(clientLines) || clientLines.length === 0) {
    return { ok: true, items: [], restaurantId: null, totalPrice: 0 };
  }

  const ids = clientLines.map((l) => new mongoose.Types.ObjectId(l.item));
  const docs = await MenuItem.find(
    { _id: { $in: ids } },
    { _id: 1, price: 1, available: 1, restaurant: 1 }
  ).lean();

  const byId = new Map(docs.map((d) => [d._id.toString(), d]));
  let restaurantId = null;
  let total = 0;

  for (const line of clientLines) {
    const qty = Number(line.quantity);
    if (!Number.isInteger(qty) || qty < 1)
      throw new Error("Quantity must be a positive integer");

    const doc = byId.get(String(line.item));
    if (!doc) throw new Error("One or more items not found");
    if (doc.available === false) throw new Error("An item is unavailable");

    if (!restaurantId) restaurantId = doc.restaurant?.toString();
    if (!restaurantId || doc.restaurant?.toString() !== restaurantId) {
      throw new Error("All items must be from the same restaurant");
    }

    total += Number(doc.price) * qty;
  }
  total = Math.round((total + Number.EPSILON) * 100) / 100;

  return { ok: true, items: clientLines, restaurantId, totalPrice: total };
}

export async function getCartController(customerId) {
  await connectDB();
  let cart = await Cart.findOne({ customer: customerId }).lean();
  if (!cart) {
    return {
      ok: true,
      cart: {
        id: null,
        items: [],
        totalPrice: 0,
        restaurant: null,
        updatedAt: null,
      },
    };
  }
  return {
    ok: true,
    cart: {
      id: cart._id,
      items: cart.items.map((i) => ({ item: i.item, quantity: i.quantity })),
      totalPrice: cart.totalPrice,
      restaurant: cart.restaurant,
      updatedAt: cart.updatedAt,
    },
  };
}

export async function putCartController(
  customerId,
  clientItems,
  clientUpdatedAt
) {
  await connectDB();

  const { ok, items, restaurantId, totalPrice } =
    await validateCartLines(clientItems);
  if (!ok) return { ok: false, status: 400, msg: "Invalid cart" };

  let cart = await Cart.findOne({ customer: customerId });
  if (!cart) {
    cart = new Cart({
      customer: customerId,
      items,
      totalPrice,
      restaurant: restaurantId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await cart.save();
    return {
      ok: true,
      cart: {
        id: cart._id,
        items,
        totalPrice,
        restaurant: restaurantId,
        updatedAt: cart.updatedAt,
      },
    };
  }

  if (
    clientUpdatedAt &&
    new Date(clientUpdatedAt).getTime() !== new Date(cart.updatedAt).getTime()
  ) {
    return {
      ok: false,
      status: 409,
      msg: "Cart changed on server",
      serverCart: {
        id: cart._id,
        items: cart.items.map((i) => ({ item: i.item, quantity: i.quantity })),
        totalPrice: cart.totalPrice,
        restaurant: cart.restaurant,
        updatedAt: cart.updatedAt,
      },
    };
  }

  cart.items = items;
  cart.totalPrice = totalPrice;
  cart.restaurant = restaurantId;
  cart.updatedAt = new Date();
  await cart.save();

  return {
    ok: true,
    cart: {
      id: cart._id,
      items,
      totalPrice,
      restaurant: restaurantId,
      updatedAt: cart.updatedAt,
    },
  };
}

export async function clearCartController(customerId) {
  await connectDB();
  const cart = await Cart.findOne({ customer: customerId });
  if (!cart)
    return {
      ok: true,
      cart: {
        id: null,
        items: [],
        totalPrice: 0,
        restaurant: null,
        updatedAt: null,
      },
    };
  cart.items = [];
  cart.totalPrice = 0;
  cart.restaurant = cart.restaurant ?? null;
  cart.updatedAt = new Date();
  await cart.save();
  return {
    ok: true,
    cart: {
      id: cart._id,
      items: [],
      totalPrice: 0,
      restaurant: cart.restaurant,
      updatedAt: cart.updatedAt,
    },
  };
}
