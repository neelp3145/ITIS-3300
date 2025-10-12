import mongoose from "mongoose";
const { Schema } = mongoose;

const cartItemSchema = new Schema({
    item: { type: Schema.Types.ObjectId, ref: "MenuItem", required: true },
    quantity: { type: Number, required: true, min: 1 }
});

const cartSchema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    items: [cartItemSchema],
    totalPrice: { type: Number, required: true, min: 0 },
    restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant", required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }
);

const Cart = new mongoose.model("Cart", cartSchema);
export default Cart;