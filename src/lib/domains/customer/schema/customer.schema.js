import mongoose from "mongoose";
import User from "../../user/schema/user.schema.js";

const { Schema } = mongoose;

const AddressSchema = new Schema(
  {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
  },
  { _id: false }
);

const CustomerSchema = new Schema({
  phoneNumber: { type: String, required: true, trim: true, match: /^[0-9]{10}$/ },
  address: { type: AddressSchema, required: true },
  orderHistory: [{ type: Schema.Types.ObjectId, ref: "Order" }],
});

const discriminatorName = "customer";

let Customer =
  (User.discriminators && User.discriminators[discriminatorName]) ||
  mongoose.models[discriminatorName];

if (!Customer) {
  Customer = User.discriminator(discriminatorName, CustomerSchema);
}

export default Customer;
