const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  }
});

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true
    },
    items: [orderItemSchema],
    totalPrice: {
      type: Number,
      required: true,
      min: 0
    },
    status: {
      type: String,
      enum: ["pending", "preparing", "ready", "completed", "cancelled"],
      default: "pending"
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "online"],
      default: "cash"
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
