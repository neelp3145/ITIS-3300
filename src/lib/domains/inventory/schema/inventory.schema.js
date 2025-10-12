const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inventoryItemSchema = new mongoose.Schema({
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem", required: true },
    currentStock: { type: Number, required: true, min: 0 },
    lowStockThreshold: { type: Number, default: 10 },
    lastUpdated: { type: Date, default: Date.now }
});

const inventorySchema = new mongoose.Schema({
    restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant", required: true },
    items: [inventoryItemSchema],
    updatedAt: { type: Date, default: Date.now }
});

const Inventory = mongoose.model("Inventory", inventorySchema);
export default Inventory;