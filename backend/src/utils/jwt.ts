import jwt from "jsonwebtoken";

export const signAccess = (payload: object) =>
  jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_EXPIRES_IN || "15m" });

export const verifyAccess = (token: string) =>
  jwt.verify(token, process.env.JWT_SECRET!) as any;

// opcional: refresh
export const signRefresh = (payload: object) =>
  jwt.sign(payload, process.env.REFRESH_SECRET!, { expiresIn: process.env.REFRESH_EXPIRES_IN || "7d" });

export const verifyRefresh = (token: string) =>
  jwt.verify(token, process.env.REFRESH_SECRET!) as any;
