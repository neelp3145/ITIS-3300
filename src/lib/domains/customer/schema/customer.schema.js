// Import Mongoose (MongoDB ODM for schema-based modeling)
const mongoose = require("mongoose");

// Create a shortcut reference for defining schemas
const Schema = mongoose.Schema;

// Define the schema for Customer documents
const customerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, 
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6, 
    },

    // --- Address Object ---
    // Nested sub-document to store customer address details
    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      zip: { type: String, trim: true },
    },

    // --- Order History ---
    // Array of references to "Item" model (each ObjectId links to a purchased item)
    orderHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item", // reference to the Item collection
      },
    ],
  },
  {
    // Optional: collection name in MongoDB (default would be pluralized "customers")
    collection: "customers",

    // Optional: automatically add createdAt and updatedAt timestamps
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", customerSchema);