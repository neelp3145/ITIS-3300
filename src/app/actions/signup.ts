"use server";

import { z } from "zod";
import { connectDB } from "../../lib/database/connect";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import Customer from "@/lib/domains/customer/schema/customer.schema";

const signupSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }).trim(),
  lastName: z.string().min(1, { message: "Last name is required" }).trim(),
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(/[a-zA-Z]/, { message: "Must contain at least one letter" })
    .regex(/[0-9]/, { message: "Must contain at least one number" })
    .trim(),
  phone: z
    .string()
    .regex(/^[0-9]{10}$/, { message: "Phone must be 10 digits" }),
  street: z.string().min(1, { message: "Street is required" }).trim(),
  city: z.string().min(1, { message: "City is required" }).trim(),
  state: z.string().min(1, { message: "State is required" }).trim(),
  zip: z.string().min(1, { message: "ZIP code is required" }).trim(),
});

export async function signup(prevState: any, formData: FormData) {
  const result = signupSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    street,
    city,
    state,
    zip,
  } = result.data;

  try {
    console.log("Attempting to connect to DB...");
    await connectDB();
    console.log("DB connected successfully");

    const existingUser = await Customer.findOne({ email });
    if (existingUser) {
      return { errors: { email: ["User with this email already exists"] } };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new customer
    console.log("Creating customer with data:", {
      firstName,
      lastName,
      email,
      phone,
      address: { street, city, state, zip },
    });

    const newCustomer = await Customer.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber: phone,
      address: {
        street,
        city,
        state,
        zip,
      },
      orderHistory: [],
    });

    await newCustomer.save();
    console.log("New customer saved successfully:", newCustomer);

    redirect("/");
  } catch (err) {
    console.error("Signup error:", err);
    return {
      errors: { form: ["Unexpected error during signup. Please try again."] },
    };
  }
}
