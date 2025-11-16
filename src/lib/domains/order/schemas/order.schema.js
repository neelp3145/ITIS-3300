import mongoose from "mongoose";
const { Schema } = mongoose;

const orderItemSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
  specialInstructions: { type: String }
});

const orderSchema = new Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    customer: { type: Schema.Types.ObjectId, ref: "Customer" },
    items: [orderItemSchema],
    total: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["pending", "confirmed", "preparing", "ready", "out-for-delivery", "delivered", "cancelled"],
      default: "pending",
    },
    orderType: {
      type: String,
      enum: ["delivery", "pickup", "dine-in"],
      required: true
    },
    estimatedPrepTime: { type: Number, min: 0, default: 15 }, // Default 15 minutes
    remainingTime: { type: Number, min: 0 }, // Live remaining time in minutes
    kitchenNotes: { type: String, default: "" },
    tableNumber: { type: Number },
    address: { type: String },
    assignedDriver: { type: String },
    driverName: { type: String },
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "online"],
      default: "cash",
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);