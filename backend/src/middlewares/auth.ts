import { Request, Response, NextFunction } from "express";
import { verifyAccess } from "../utils/jwt";

export interface AuthRequest extends Request {
  user?: { sub: string; role: "ADMIN"|"AGENT"|"CLIENT" };
}

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Missing token" });
  try {
    const payload = verifyAccess(token);
    req.user = { sub: payload.sub, role: payload.role };
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const requireRole = (...roles: Array<"ADMIN"|"AGENT"|"CLIENT">) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) return res.status(403).json({ message: "Forbidden" });
    next();
  };
