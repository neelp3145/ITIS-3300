import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const TOKEN_NAME = "fb_session";
const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_TTL = process.env.JWT_EXPIRES_IN || "7d";

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in .env.local");
}

export async function hashPassword(plain) {
  return bcrypt.hash(plain, 10);
}
export async function verifyPassword(plain, hashed) {
  return bcrypt.compare(plain, hashed);
}

export function signToken(userLike) {
  const payload = {
    sub: String(userLike._id || userLike.id),
    role: userLike.role || userLike.type || "customer",
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_TTL });
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

export function attachAuthCookie(res, token) {
  res.cookies.set({
    name: TOKEN_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}

export function clearAuthCookie(res) {
  res.cookies.set({
    name: TOKEN_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return res;
}

export function requireUserFromCookies(cookiesStore) {
  const token = cookiesStore.get(TOKEN_NAME)?.value;
  if (!token) return { ok: false, status: 401, error: "No session" };
  try {
    const decoded = verifyToken(token);
    return { ok: true, userId: decoded.sub, role: decoded.role, decoded };
  } catch {
    return { ok: false, status: 401, error: "Invalid session" };
  }
}
