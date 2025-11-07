import mongoose from "mongoose";

const { MONGO_URI } = process.env;
if (!MONGO_URI) throw new Error("Missing MONGO_URI in .env.local");

let cached = global._fastbyte_mongoose;
if (!cached) cached = (global._fastbyte_mongoose = { conn: null, promise: null });

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    mongoose.set("strictQuery", true);
    cached.promise = mongoose
      .connect(MONGO_URI, { dbName: "fastbyte" })
      .catch((err) => {
        console.error("MongoDB connection failed.");
        console.error("name:", err?.name);
        console.error("code:", err?.code);
        console.error("message:", err?.message);
        console.error("reason:", err?.reason?.message || err?.reason);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}