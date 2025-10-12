// src/lib/domains/user/schema/user.schema.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

/* ---------- Subdocuments ---------- */
const AddressSchema = new Schema(
  {
    street: { type: String, trim: true },
    city:   { type: String, trim: true },
    state:  { type: String, trim: true },
    zip:    { type: String, trim: true },
  },
  { _id: false }
);

/* ---------- Main User Schema (single collection for all roles) ---------- */
const UserSchema = new Schema(
  {
    // Common
    firstName: { type: String, required: true, trim: true },
    lastName:  { type: String, required: true, trim: true },
    email:     { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    password:  { type: String, required: true, minlength: 6, select: false }, // hashed
    role:      { type: String, enum: ["customer", "driver", "employee"], required: true, index: true },

    // Shared optional
    phoneNumber: {
      type: String,
      trim: true,
      // Required if role is customer or driver
      required: function () {
        return this.role === "customer" || this.role === "driver";
      },
    },

    // Customer-only
    address: {
      type: AddressSchema,
      required: function () {
        return this.role === "customer";
      },
    },
    orderHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
        // Only meaningful for customers, but stored as empty array otherwise
      },
    ],

    // Driver-only
    deliveryHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],

    // Employee-only
    employeeRole: {
      type: String,
      enum: ["owner", "manager", "chef"],
      required: function () {
        return this.role === "employee";
      },
    },
    hireDate: {
      type: Date,
      default: function () {
        return this.role === "employee" ? new Date() : undefined;
      },
    },
    isActive: {
      type: Boolean,
      default: function () {
        return this.role === "employee" ? true : undefined;
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, transform: (_doc, ret) => { delete ret.password; delete ret.__v; return ret; } },
    toObject: { virtuals: true },
  }
);

/* ---------- Virtuals ---------- */
UserSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`.trim();
});

/* ---------- Password hashing ---------- */
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

/* ---------- Methods ---------- */
UserSchema.methods.comparePassword = function (candidate) {
  // Note: ensure you've selected '+password' when querying if needed
  return bcrypt.compare(candidate, this.password);
};

/* ---------- Helpful Indexes ---------- */
// Example combined index for quick lookups of drivers/employees
UserSchema.index({ role: 1, lastName: 1, firstName: 1 });

/* ---------- Model ---------- */
const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
