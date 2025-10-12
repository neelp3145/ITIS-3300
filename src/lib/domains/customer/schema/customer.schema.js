import mongoose from "mongoose";
import User from "./user.base.js";

const { Schema } = mongoose;

const AddressSchema = new Schema(
  {
    street: { type: String },
    city:   { type: String },
    state:  { type: String },
    zip:    { type: String },
  },
  { _id: false }
);

const CustomerSchema = new Schema({
  phoneNumber: { type: String, required: true, trim: true },
  address: { type: AddressSchema, required: true },
  orderHistory: [{ type: Schema.Types.ObjectId, ref: "Order" }],
});

const Customer = User.discriminator("customer", CustomerSchema);
export default Customer;
