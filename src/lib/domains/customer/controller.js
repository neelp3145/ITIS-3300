import { connectDB } from "../../database/connect.js";
import Customer from "./schema/customer.schema.js";
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

function validateCustomerData(body) {
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

  if (
    !body.phoneNumber ||
    typeof body.phoneNumber !== "string" ||
    !body.phoneNumber.trim()
  ) {
    errors.push({ path: "phoneNumber", msg: "phoneNumber is required" });
  }

  const addr = body.address;
  if (!addr || typeof addr !== "object") {
    errors.push({ path: "address", msg: "address is required" });
  } else {
    if (
      !addr.street ||
      typeof addr.street !== "string" ||
      !addr.street.trim()
    ) {
      errors.push({ path: "address.street", msg: "street is required" });
    }
    if (!addr.city || typeof addr.city !== "string" || !addr.city.trim()) {
      errors.push({ path: "address.city", msg: "city is required" });
    }
    if (!addr.state || typeof addr.state !== "string" || !addr.state.trim()) {
      errors.push({ path: "address.state", msg: "state is required" });
    }
    if (!addr.zip || typeof addr.zip !== "string" || !addr.zip.trim()) {
      errors.push({ path: "address.zip", msg: "zip is required" });
    }
  }

  if (body.orderHistory !== undefined && !Array.isArray(body.orderHistory)) {
    errors.push({ path: "orderHistory", msg: "orderHistory must be an array" });
  }

  return errors;
}

export async function signupCustomerController(bodyRaw) {
  await connectDB();

  const body = {
    ...bodyRaw,
    email:
      typeof bodyRaw.email === "string"
        ? bodyRaw.email.toLowerCase().trim()
        : bodyRaw.email,
  };

  const validationErrors = validateCustomerData(body);
  if (validationErrors.length > 0) {
    return { status: 400, body: { ok: false, errors: validationErrors } };
  }

  const {
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    address,
    orderHistory,
  } = body;

  const existing = await User.findOne({ email }).lean();
  if (existing) {
    return { status: 409, body: { ok: false, msg: "Email already in use" } };
  }

  try {
    const hashed = await bcrypt.hash(password, 10);
    const newCustomer = await Customer.create({
      firstName,
      lastName,
      email,
      password: hashed,
      phoneNumber,
      address,
      orderHistory,
    });

    return {
      status: 201,
      body: {
        ok: true,
        msg: "Customer registered successfully",
        data: newCustomer.toJSON(),
        data: sanitizeUser(newCustomer),
      },
    };
  } catch (err) {
    if (err?.code === 11000) {
      return { status: 409, body: { ok: false, msg: "Email already in use" } };
    }
    console.error("signupCustomerController error:", err);
    return { status: 500, body: { ok: false, msg: "Server error" } };
  }
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
export async function loginCustomerController(bodyRaw) {
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
    const customer = await Customer.findOne({ email }).select("+password");
    if (!customer) {
      return { status: 404, body: { ok: false, msg: "User not found" } };
    }

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return { status: 401, body: { ok: false, msg: "Invalid credentials" } };
    }

    return {
      status: 200,
      body: {
        ok: true,
        msg: "Login successful",
        data: sanitizeUser(customer),
        //token,
      },
    };
  } catch (err) {
    console.error("loginCustomerController error:", err);
    return { status: 500, body: { ok: false, msg: "Server error" } };
  }
}
