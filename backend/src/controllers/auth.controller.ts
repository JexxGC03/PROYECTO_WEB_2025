import { Request, Response } from "express";
import User from "../models/User";
import RefreshToken from "../models/RefreshToken";
import { hashPassword, verifyPassword } from "../utils/password";
import { signAccess, signRefresh } from "../utils/jwt";
import { computeExpiryDate } from "../utils/duration";
import { recordAudit } from "../utils/audit";
import { AuthRequest } from "../middlewares/auth";

export const register = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body as { fullName: string; email: string; password: string };
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: "Email already registered" });
  const passwordHash = await hashPassword(password);
  const user = await User.create({ fullName, email, passwordHash });
  await recordAudit({ userId: String(user._id), action: "REGISTER", entity: "User", entityId: String(user._id) });
  return res.status(201).json({ id: user._id, fullName: user.fullName, email: user.email });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };
  const user = await User.findOne({ email });
  if (!user || !user.isActive) return res.status(401).json({ message: "Invalid credentials" });
  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const accessToken = signAccess({ sub: String(user._id), role: user.role });
  const refreshToken = signRefresh({ sub: String(user._id) });
  const expiresAt = computeExpiryDate(process.env.REFRESH_EXPIRES_IN, 7);
  await RefreshToken.create({ userId: user._id, token: refreshToken, expiresAt });
  await recordAudit({ userId: String(user._id), action: "LOGIN", entity: "User", entityId: String(user._id) });

  return res.json({ accessToken, refreshToken, user: { id: user._id, fullName: user.fullName, role: user.role } });
};

export const me = async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.user!.sub).select("_id fullName email role createdAt isActive");
  return res.json(user);
};
