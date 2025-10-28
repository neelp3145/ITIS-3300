import { connectDB } from "../../database/connect.js";
import Employee from "./schema/employee.schema.js";
import User from "../user/schema/user.schema.js";
import bcrypt from "bcryptjs";
//import { signToken } from "../user/auth.js";

function sanitizeUser(doc) {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : doc;
  delete obj.password;
  delete obj.__v;
  return obj;
}
function validateLoginData(body) {
  const errors = [];
  if (
    !body.email ||
    typeof body.email !== "string" ||
    !/\S+@\S+\.\S+/.test(body.email)
  ) {
    errors.push({ path: "email", msg: "Valid email required" });
  }
  if (!body.password || typeof body.password !== "string") {
    errors.push({ path: "password", msg: "Password is required" });
  }
  return errors;
}
function validateEmployeeData(body) {
  const errors = [];
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

  if (
    !body.email ||
    typeof body.email !== "string" ||
    !/\S+@\S+\.\S+/.test(body.email)
  ) {
    errors.push({ path: "email", msg: "Valid email required" });
  }

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
  const allowedRoles = ["owner", "manager", "chef"];
  if (!body.roleTitle || !allowedRoles.includes(body.roleTitle)) {
    errors.push({
      path: "roleTitle",
      msg: 'roleTitle must be one of: "owner", "manager", "chef"',
    });
  }

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

  const existing = await User.findOne({ email }).lean();
  if (existing) {
    return { status: 409, body: { ok: false, msg: "Email already in use" } };
  }

  try {
    const newEmployee = await Employee.create({
      firstName,
      lastName,
      email,
      password,
      roleTitle,
      hireDate: hireDate ? new Date(hireDate) : undefined,
      isActive,
    });

    // // Sign JWT
    // const token = signToken({
    //   sub: newEmployee._id.toString(),
    //   role: "employee",
    //   roleTitle: newEmployee.roleTitle,
    // });

    return {
      status: 201,
      body: {
        ok: true,
        msg: "Employee registered successfully",
        data: newEmployee.toJSON(),
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
export async function loginEmployeeController(bodyRaw) {
  await connectDB();

  const body = {
    ...bodyRaw,
    email:
      typeof bodyRaw.email === "string"
        ? bodyRaw.email.toLowerCase().trim()
        : bodyRaw.email,
  };

  const validationErrors = validateLoginData(body);
  if (validationErrors.length > 0) {
    return { status: 400, body: { ok: false, errors: validationErrors } };
  }

  const { email, password } = body;

  try {
    const employee = await Employee.findOne({ email }).select("+password");
    if (!employee) {
      return { status: 404, body: { ok: false, msg: "User not found" } };
    }

    if (typeof employee.password !== "string") {
      return {
        status: 400,
        body: { ok: false, msg: "Account has no password set" },
      };
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return { status: 401, body: { ok: false, msg: "Invalid credentials" } };
    }

    // const token = signToken({
    //   sub: employee._id.toString(),
    //   role: "employee",
    //   // roleTitle: employee.roleTitle
    // });

    return {
      status: 200,
      body: {
        ok: true,
        msg: "Login successful",
        data: sanitizeUser(employee),
        //token,
      },
    };
  } catch (err) {
    console.error("loginEmployeeController error:", err);
    return { status: 500, body: { ok: false, msg: "Server error" } };
  }
}
