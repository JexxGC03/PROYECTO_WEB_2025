import { Request, Response } from "express";
import User from "../models/User";
import { hashPassword } from "../utils/password";
import { AuthRequest } from "../middlewares/auth";
import { recordAudit } from "../utils/audit";

export const listUsers = async (_req: Request, res: Response) => {
  const users = await User.find().select("fullName email role isActive createdAt");
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const { fullName, email, password, role } = req.body as {
    fullName: string;
    email: string;
    password: string;
    role?: "ADMIN" | "AGENT" | "CLIENT";
  };

  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: "Email already registered" });

  const passwordHash = await hashPassword(password);
  const user = await User.create({ fullName, email, passwordHash, role });
  await recordAudit({ userId: (req as AuthRequest).user?.sub, action: "CREATE", entity: "User", entityId: String(user._id) });

  res.status(201).json({ id: user._id, fullName: user.fullName, email: user.email, role: user.role });
};

export const getUser = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  if (req.user?.role !== "ADMIN" && req.user?.sub !== id) return res.status(403).json({ message: "Forbidden" });
  const user = await User.findById(id).select("fullName email role isActive createdAt updatedAt");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

export const updateUser = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  if (req.user?.role !== "ADMIN" && req.user?.sub !== id) return res.status(403).json({ message: "Forbidden" });

  const body = req.body as { fullName?: string; password?: string; role?: "ADMIN"|"AGENT"|"CLIENT"; isActive?: boolean };
  const patch: any = {};
  if (body.fullName) patch.fullName = body.fullName;
  if (body.password) patch.passwordHash = await hashPassword(body.password);
  if (body.role && req.user?.role === "ADMIN") patch.role = body.role;
  if (typeof body.isActive === "boolean" && req.user?.role === "ADMIN") patch.isActive = body.isActive;

  const updated = await User.findByIdAndUpdate(id, patch, { new: true }).select("fullName email role isActive");
  if (!updated) return res.status(404).json({ message: "User not found" });

  await recordAudit({ userId: req.user?.sub, action: "UPDATE", entity: "User", entityId: id, metadata: patch });
  res.json(updated);
};

export const deactivateUser = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const updated = await User.findByIdAndUpdate(id, { isActive: false }, { new: true }).select("fullName email role isActive");
  if (!updated) return res.status(404).json({ message: "User not found" });
  await recordAudit({ userId: req.user?.sub, action: "DEACTIVATE", entity: "User", entityId: id });
  res.json(updated);
};
