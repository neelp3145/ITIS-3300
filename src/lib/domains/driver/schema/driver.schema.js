import mongoose from "mongoose";
import User from "@/domains/user/schema/user.schema.js";

const { Schema } = mongoose;

const DriverSchema = new Schema({
  phoneNumber: { type: String, required: true, trim: true },
  deliveryHistory: [{ type: Schema.Types.ObjectId, ref: "Order" }],
});

const Driver = User.discriminator("driver", DriverSchema);
export default Driver;
