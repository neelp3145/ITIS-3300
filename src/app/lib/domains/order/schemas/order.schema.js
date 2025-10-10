// Import Mongoose (ODM for MongoDB)
const mongoose = require("mongoose");

// --- Sub-schema: Represents an individual item within an order ---
const orderItemSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "MenuItem",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
});

// --- Main schema: Represents a customer order ---
const orderSchema = new mongoose.Schema(
  {
    // Reference to the customer who placed the order
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    // Array of ordered items (each using the orderItemSchema defined above)
    items: [orderItemSchema],

    // Total price for the order (calculated at checkout)
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    // Current status of the order
    status: {
      type: String,
      enum: ["pending", "preparing", "ready", "completed", "cancelled"],
      default: "pending",
    },

    // Payment method chosen by the customer
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "online"],
      default: "cash",
    },

    // Time the order was created
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    // Adds automatic `createdAt` and `updatedAt` fields for auditing
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);