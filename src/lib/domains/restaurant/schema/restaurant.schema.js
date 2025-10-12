import mongoose from "mongoose";
const { Schema } = mongoose;

const restaurantSchema = new Schema({
    name: { type: String, required: true, trim: true },
    address: {
        street: { type: String, trim: true },
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        zip: { type: String, trim: true },
    },
    category: { type: String, trim: true },
    isOpen: { type: Boolean, default: true },
    inventory: { type: Schema.Types.ObjectId, ref: "Inventory" }
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;