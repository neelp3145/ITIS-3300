"use server";

import { z } from "zod";
import { connectDB } from "../../lib/database/connect";
import { createSession, deleteSession } from "../../lib/session";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import User from "@/lib/domains/user/schema/user.schema";

// Static test user for demo, works with the login form
const testUser = {
  id: "1",
  email: "demoman123@fastbite.com",
  password: "demoman123",
};

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .trim(),
});

export async function login(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const { email, password } = result.data;
  await connectDB();

  const user = await User.findOne({ email }).select("+password");
  console.log(user);
  if (!user) {
    return { errors: { email: ["Invalid email or password"] } };
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return { errors: { email: ["Invalid email or password"] } };
  }

  await createSession(user._id.toString());
  redirect("/");
}

const signupSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }).trim(),
  lastName: z.string().min(1, { message: "Last name is required" }).trim(),
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .trim(),
});

export async function signup(prevState: any, formData: FormData) {
  const result = signupSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const { firstName, lastName, email, password } = result.data;
  await connectDB();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return { errors: { email: ["Email is already registered"] } };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  await createSession(newUser._id.toString());
  redirect("/login");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
