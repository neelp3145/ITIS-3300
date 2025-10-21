import mongoose from "mongoose";
const { Schema } = mongoose;

const inventoryItemSchema = new Schema({
  menuItem: { type: Schema.Types.ObjectId, ref: "MenuItem", required: true },
  currentStock: { type: Number, required: true, min: 0 },
  lowStockThreshold: { type: Number, default: 10 },
  lastUpdated: { type: Date, default: Date.now },
});

const inventorySchema = new Schema({
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  items: [inventoryItemSchema],
  updatedAt: { type: Date, default: Date.now },
});

const Inventory = mongoose.model("Inventory", inventorySchema);
export default Inventory;
