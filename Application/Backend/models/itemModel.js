const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    enum: ["Pizza", "Burger", "Wings", "Drink", "Dessert", "Sides", "Other"],
    default: "Other",
  },
  available: {
    type: Boolean,
    default: true,
  },
  imageUrl: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Item", itemSchema);
