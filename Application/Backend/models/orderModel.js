// Import Mongoose (ODM for MongoDB)
const mongoose = require("mongoose");

// --- Sub-schema: Represents an individual item within an order ---
const orderItemSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId, // references an Item document
    ref: "Item",                          // link to Item model
    required: true,                       // every order item must have an item
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,       // must order at least one item
    default: 1,   // defaults to 1 if not provided
  },
});

// --- Main schema: Represents a customer order ---
const orderSchema = new mongoose.Schema(
  {
    // Reference to the customer who placed the order
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",  // link to Customer model
      required: true,
    },

    // Array of ordered items (each using the orderItemSchema defined above)
    items: [orderItemSchema],

    // Total price for the order (calculated at checkout)
    totalPrice: {
      type: Number,
      required: true,
      min: 0, // cannot be negative
    },

    // Current status of the order
    status: {
      type: String,
      enum: ["pending", "preparing", "ready", "completed", "cancelled"], // only these states allowed
      default: "pending",
    },

    // Payment method chosen by the customer
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "online"], // accepted payment methods
      default: "cash",
    },

    // Time the order was created
    createdAt: {
      type: Date,
      default: Date.now, // automatically sets current timestamp
    },
  },
  {
    // Adds automatic `createdAt` and `updatedAt` fields for auditing
    timestamps: true,
  }
);

// Export the schema as a model to use in routes/controllers
// Usage example: const Order = require("./models/orderModel");
module.exports = mongoose.model("Order", orderSchema);
