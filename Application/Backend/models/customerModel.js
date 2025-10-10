// Import Mongoose (MongoDB ODM for schema-based modeling)
const mongoose = require("mongoose");

// Create a shortcut reference for defining schemas
const Schema = mongoose.Schema;

// Define the schema for Customer documents
const customerSchema = new Schema(
  {
    // --- Basic Information ---
    name: {
      type: String,
      required: true, // name is mandatory
      trim: true,     // removes extra whitespace
    },

    email: {
      type: String,
      required: true, // email is mandatory
      unique: true,   // ensures no duplicate emails
      lowercase: true, // converts to lowercase before saving
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6, // ensures password has at least 6 characters (correct spelling)
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

// Export the schema as a Mongoose model
// This makes it importable as: const Customer = require("./models/customerModel");
module.exports = mongoose.model("Customer", customerSchema);
