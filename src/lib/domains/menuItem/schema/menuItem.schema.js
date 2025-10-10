// Import Mongoose (ODM for defining schema and interacting with MongoDB)
const mongoose = require("mongoose");

// --- Schema Definition: Represents a menu item in the restaurant ---
const itemSchema = new mongoose.Schema({
  // Name of the food item (e.g., "Pepperoni Pizza", "Cheeseburger")
  name: {
    type: String,
    required: true, 
    trim: true,
  },

  // Optional description for the item
  description: {
    type: String,
    trim: true,
  },

  // Price of the item in USD (or relevant currency)
  price: {
    type: Number,
    required: true,
    min: 0,        
  },

  // Category of the item for better organization or filtering
  category: {
    type: String,
    enum: [
      "Pizza",
      "Burger",
      "Wings",
      "Drink",
      "Dessert",
      "Sides",
      "Other",
    ],
    default: "Other",
  },

  // Indicates if the item is currently available to order
  available: {
    type: Boolean,
    default: true,
  },

  // Optional image URL to display in the frontend menu
  imageUrl: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Item", itemSchema);