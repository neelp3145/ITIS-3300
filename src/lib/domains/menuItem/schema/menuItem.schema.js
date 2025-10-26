import mongoose from "mongoose";
const { Schema } = mongoose;

const menuItemSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true, // Prevents duplicates at database level
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
}, {
  timestamps: true
});

// Add compound unique index for name + category (optional)
menuItemSchema.index({ name: 1, category: 1 }, { unique: true });

export default mongoose.models.MenuItem || mongoose.model("MenuItem", menuItemSchema);