import mongoose from "mongoose";
import User from "../../user/schema/user.schema.js";

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  roleTitle: { type: String, enum: ["owner", "manager", "chef"], required: true },
  hireDate:  { type: Date, default: Date.now },
  isActive:  { type: Boolean, default: true },
});

const Employee = User.discriminator("employee", EmployeeSchema);
export default Employee;
