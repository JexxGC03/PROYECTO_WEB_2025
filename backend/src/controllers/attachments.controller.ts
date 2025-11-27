import { Request, Response } from "express";
import Attachment from "../models/Attachment";
import Case from "../models/Case";
import { AuthRequest } from "../middlewares/auth";
import { recordAudit } from "../utils/audit";

export const listAttachments = async (req: Request, res: Response) => {
  const { caseId } = req.params;
  const data = await Attachment.find({ caseId }).populate("uploadedBy", "fullName email");
  res.json(data);
};

export const addAttachment = async (req: AuthRequest, res: Response) => {
  const { caseId, fileName, url, size, mimeType } = req.body as { caseId: string; fileName: string; url: string; size?: number; mimeType?: string };
  const exists = await Case.exists({ _id: caseId });
  if (!exists) return res.status(404).json({ message: "Case not found" });

  const doc = await Attachment.create({ caseId, fileName, url, size, mimeType, uploadedBy: req.user!.sub });
  await recordAudit({ userId: req.user?.sub, action: "ATTACH", entity: "Attachment", entityId: String(doc._id), metadata: { caseId } });
  res.status(201).json(doc);
};

export const deleteAttachment = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const doc = await Attachment.findById(id);
  if (!doc) return res.status(404).json({ message: "Attachment not found" });
  if (req.user?.role !== "ADMIN" && String(doc.uploadedBy) !== req.user?.sub) {
    return res.status(403).json({ message: "Forbidden" });
  }
  await Attachment.findByIdAndDelete(id);
  await recordAudit({ userId: req.user?.sub, action: "DELETE", entity: "Attachment", entityId: id, metadata: { caseId: doc.caseId } });
  res.status(204).send();
};
