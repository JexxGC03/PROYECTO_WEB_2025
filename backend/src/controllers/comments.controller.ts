import { Response } from "express";
import Comment from "../models/Comment";
import { AuthRequest } from "../middlewares/auth";
import { recordAudit } from "../utils/audit";

export const addComment = async (req: AuthRequest, res: Response) => {
  const { caseId, body } = req.body as { caseId: string; body: string };
  const doc = await Comment.create({ caseId, body, authorId: req.user!.sub });
  await recordAudit({ userId: req.user?.sub, action: "COMMENT", entity: "Case", entityId: caseId });
  res.status(201).json(doc);
};

export const listComments = async (req: AuthRequest, res: Response) => {
  const { caseId } = req.params;
  const data = await Comment.find({ caseId }).populate("authorId","fullName");
  res.json(data);
};
