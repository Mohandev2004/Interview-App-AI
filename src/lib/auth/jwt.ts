import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function generateToken(userId: string): string {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not defined");
  }
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): { id: string } {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not defined");
  }
  return jwt.verify(token, JWT_SECRET) as { id: string };
}

export const TOKEN_COOKIE_NAME = "token";
export const TOKEN_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds
