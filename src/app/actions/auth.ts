"use server";

import { z } from "zod";
import { connectDB } from "../../lib/database/connect";
import { createSession, deleteSession } from "../../lib/session";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import User from "@/lib/domains/user/schema/user.schema";

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

  try {
    await connectDB();
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return { errors: { email: ["Invalid email or password"] } };
    }

    if (user.role == "customer") {
      const res = await fetch("/api/customers/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
    } else if (user.role == "employee") {
      const res = await fetch("/api/employees/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
    }

  } catch (err) {
    console.error("Login error:", err);
    return { errors: { general: ["Unexpected error during login. Please try again."] } };
  }
      
}

export async function logout() {
  await deleteSession();
  redirect("/");
}
