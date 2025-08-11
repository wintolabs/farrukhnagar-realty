// src/lib/auth.ts

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export interface JWTPayload {
  userId: string;
  role: string;
  iat: number;
  exp: number;
}

export async function verifyToken(): Promise<JWTPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin-token")?.value;
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
    return decoded;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const payload = await verifyToken();
  return payload !== null;
}
