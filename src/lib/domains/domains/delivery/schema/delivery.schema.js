import mongoose from "mongoose";
const { Schema } = mongoose;

const DeliverySchema = new Schema(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      unique: true,
      index: true,
    },
    driver: { type: Schema.Types.ObjectId, ref: "User" },

    status: {
      type: String,
      enum: [
        "unassigned",
        "assigned",
        "picked_up",
        "en_route",
        "delivered",
        "failed",
      ],
      default: "unassigned",
      index: true,
    },

    etaMinutes: { type: Number, min: 0 },
    notes: { type: String, trim: true },

    address: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Delivery =
  mongoose.models.Delivery || mongoose.model("Delivery", DeliverySchema);
export default Delivery;
