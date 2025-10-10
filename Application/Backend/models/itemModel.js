// Import Mongoose (ODM for defining schema and interacting with MongoDB)
const mongoose = require("mongoose");

// --- Schema Definition: Represents a menu item in the restaurant ---
const itemSchema = new mongoose.Schema({
  // Name of the food item (e.g., "Pepperoni Pizza", "Cheeseburger")
  name: {
    type: String,
    required: true, // every item must have a name
    trim: true,     // removes extra spaces from beginning and end
  },

  // Optional description for the item
  description: {
    type: String,
    trim: true, // keeps description text clean
  },

  // Price of the item in USD (or relevant currency)
  price: {
    type: Number,
    required: true, // price is mandatory
    min: 0,         // prevents negative values
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
    ], // restricts to valid categories only
    default: "Other",
  },

  // Indicates if the item is currently available to order
  available: {
    type: Boolean,
    default: true, // true = available by default
  },

  // Optional image URL to display in the frontend menu
  imageUrl: {
    type: String,
    trim: true,
  },
});

// Export the model for use in routes/controllers
// Usage example: const Item = require("./models/itemModel");
module.exports = mongoose.model("Item", itemSchema);
