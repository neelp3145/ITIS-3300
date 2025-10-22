import { connectDB } from "../../database/connect.js";
import Employee from "./schema/employee.schema.js";
import User from "../user/schema/user.schema.js";
import { signToken } from "../user/auth.js";

/**
 * Validate employee signup payload
 */
function validateEmployeeData(body) {
  const errors = [];

  // Required string fields
  if (
    !body.firstName ||
    typeof body.firstName !== "string" ||
    !body.firstName.trim()
  ) {
    errors.push({ path: "firstName", msg: "firstName is required" });
  }

  if (
    !body.lastName ||
    typeof body.lastName !== "string" ||
    !body.lastName.trim()
  ) {
    errors.push({ path: "lastName", msg: "lastName is required" });
  }

  // Email
  if (
    !body.email ||
    typeof body.email !== "string" ||
    !/\S+@\S+\.\S+/.test(body.email)
  ) {
    errors.push({ path: "email", msg: "Valid email required" });
  }

  // Password
  if (
    !body.password ||
    typeof body.password !== "string" ||
    body.password.length < 6
  ) {
    errors.push({
      path: "password",
      msg: "Password must be at least 6 characters",
    });
  }

  // RoleTitle (enum)
  const allowedRoles = ["owner", "manager", "chef"];
  if (!body.roleTitle || !allowedRoles.includes(body.roleTitle)) {
    errors.push({
      path: "roleTitle",
      // eslint-disable-next-line quotes
      msg: 'roleTitle must be one of: "owner", "manager", "chef"',
    });
  }

  // Optional fields
  if (body.isActive !== undefined && typeof body.isActive !== "boolean") {
    errors.push({ path: "isActive", msg: "isActive must be a boolean" });
  }

  if (body.hireDate !== undefined && Number.isNaN(Date.parse(body.hireDate))) {
    errors.push({
      path: "hireDate",
      msg: "hireDate must be a valid date string",
    });
  }

  return errors;
}

/**
 * Employee sign-up logic
 */
export async function signupEmployeeController(bodyRaw) {
  await connectDB();

  const body = {
    ...bodyRaw,
    email:
      typeof bodyRaw.email === "string"
        ? bodyRaw.email.toLowerCase().trim()
        : bodyRaw.email,
  };

  const validationErrors = validateEmployeeData(body);
  if (validationErrors.length > 0) {
    return { status: 400, body: { ok: false, errors: validationErrors } };
  }

  const {
    firstName,
    lastName,
    email,
    password,
    roleTitle,
    hireDate,
    isActive,
  } = body;

  // Check for existing user (unique email)
  const existing = await User.findOne({ email }).lean();
  if (existing) {
    return { status: 409, body: { ok: false, msg: "Email already in use" } };
  }

  try {
    // pre-save hook in User schema handles password hashing
    const newEmployee = await Employee.create({
      firstName,
      lastName,
      email,
      password,
      roleTitle,
      hireDate: hireDate ? new Date(hireDate) : undefined,
      isActive,
    });

    // Sign JWT
    const token = signToken({
      sub: newEmployee._id.toString(),
      role: "employee",
      roleTitle: newEmployee.roleTitle,
    });

    return {
      status: 201,
      body: {
        ok: true,
        msg: "Employee registered successfully",
        data: newEmployee.toJSON(),
        token,
      },
    };
  } catch (err) {
    if (err?.code === 11000) {
      return { status: 409, body: { ok: false, msg: "Email already in use" } };
    }
    console.error("signupEmployeeController error:", err);
    return { status: 500, body: { ok: false, msg: "Server error" } };
  }
}
