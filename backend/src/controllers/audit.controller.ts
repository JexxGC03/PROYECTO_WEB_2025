import { Request, Response } from "express";
import AuditLog from "../models/AuditLog";

export const listAudits = async (req: Request, res: Response) => {
  const { entity, entityId, userId } = req.query as { entity?: string; entityId?: string; userId?: string };
  const filter: any = {};
  if (entity) filter.entity = entity;
  if (entityId) filter.entityId = entityId;
  if (userId) filter.userId = userId;

  const data = await AuditLog.find(filter).sort({ createdAt: -1 }).limit(200);
  res.json(data);
};
