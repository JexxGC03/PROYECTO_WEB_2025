import { Response } from "express";
import Case from "../models/Case";
import User from "../models/User";
import { AuthRequest } from "../middlewares/auth";
import { recordAudit } from "../utils/audit";

const allowedStatus = new Set(["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"]);
const allowedPriority = new Set(["LOW", "MEDIUM", "HIGH", "URGENT"]);

export const assignCase = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { assignedTo } = req.body as { assignedTo: string };
  const user = await User.findById(assignedTo).select("role");
  if (!user) return res.status(404).json({ message: "Assignee not found" });
  if (user.role === "CLIENT") return res.status(400).json({ message: "Cannot assign to client" });

  const doc = await Case.findByIdAndUpdate(id, { assignedTo }, { new: true });
  if (!doc) return res.status(404).json({ message: "Case not found" });

  await recordAudit({ userId: req.user?.sub, action: "ASSIGN", entity: "Case", entityId: id, metadata: { assignedTo } });
  res.json(doc);
};

export const updateCaseStatus = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { status } = req.body as { status: string };
  if (!allowedStatus.has(status)) return res.status(400).json({ message: "Invalid status" });
  const doc = await Case.findByIdAndUpdate(id, { status }, { new: true });
  if (!doc) return res.status(404).json({ message: "Case not found" });
  await recordAudit({ userId: req.user?.sub, action: "STATUS", entity: "Case", entityId: id, metadata: { status } });
  res.json(doc);
};

export const updateCasePriority = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { priority } = req.body as { priority: string };
  if (!allowedPriority.has(priority)) return res.status(400).json({ message: "Invalid priority" });
  const doc = await Case.findByIdAndUpdate(id, { priority }, { new: true });
  if (!doc) return res.status(404).json({ message: "Case not found" });
  await recordAudit({ userId: req.user?.sub, action: "PRIORITY", entity: "Case", entityId: id, metadata: { priority } });
  res.json(doc);
};
