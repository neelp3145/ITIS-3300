// Import Mongoose (ODM for MongoDB)
const mongoose = require("mongoose");

// --- Allowed roles for each employee ---
const ROLES = ["owner", "manager", "chef", "delivery_driver"];

// --- Main schema: Represents a restaurant employee ---
const employeeSchema = new mongoose.Schema(
  {
    // Employee's first name
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    // Employee's last name
    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    // Unique email used for contact or login
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Optional phone number for contact
    phone: {
      type: String,
      trim: true,
    },

    // Defines the employee's role in the restaurant
    role: {
      type: String,
      enum: ROLES,
      required: true,
    },

    // Whether the employee is currently working at the restaurant
    isActive: {
      type: Boolean,
      default: true,
    },

    // Date when the employee was hired
    hireDate: {
      type: Date,
      default: Date.now,
    },

    // (Optional) For authentication later: store password hash only
    // passwordHash: { type: String }
  }
);

module.exports = mongoose.model("Employee", employeeSchema);