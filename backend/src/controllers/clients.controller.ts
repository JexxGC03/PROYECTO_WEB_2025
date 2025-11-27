import { Request, Response } from "express";
import Case from "../models/Case";
import User from "../models/User";
import { resolveClientValue } from "../utils/client";
import { AuthRequest } from "../middlewares/auth";
import { recordAudit } from "../utils/audit";

export const listClients = async (_req: Request, res: Response) => {
  const raw = await Case.aggregate([
    { $match: { $or: [ { "client.ref": { $exists: true } }, { "client.name": { $exists: true } }, { "client.email": { $exists: true } } ] } },
    { $group: {
      _id: { ref: "$client.ref", name: "$client.name", email: "$client.email" },
      caseCount: { $sum: 1 },
      caseIds: { $push: "$_id" }
    } },
    { $project: {
      ref: "$_id.ref",
      name: "$_id.name",
      email: "$_id.email",
      caseCount: 1,
      caseIds: 1,
      _id: 0
    } }
  ]);

  const refs = raw.filter(r => r.ref).map(r => r.ref);
  const users = await User.find({ _id: { $in: refs } }).select("fullName email");
  const usersMap = new Map(users.map(u => [String(u._id), u]));

  const data = raw.map(r => ({
    ref: r.ref,
    name: r.name ?? usersMap.get(String(r.ref))?.fullName,
    email: r.email ?? usersMap.get(String(r.ref))?.email,
    caseCount: r.caseCount,
    caseIds: r.caseIds
  }));

  res.json(data);
};

export const updateCaseClient = async (req: AuthRequest, res: Response) => {
  const { caseId } = req.params;
  const { client } = req.body as { client?: string };
  const clientObj = await resolveClientValue(client);
  const doc = await Case.findByIdAndUpdate(caseId, { client: clientObj }, { new: true });
  if (!doc) return res.status(404).json({ message: "Case not found" });
  await recordAudit({ userId: req.user?.sub, action: "UPDATE", entity: "CaseClient", entityId: caseId, metadata: clientObj });
  res.json(doc);
};

export const getClientCases = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email } = req.query as { email?: string };
  const filter: any = {};
  if (id && id !== "undefined") filter["client.ref"] = id;
  if (email) filter["client.email"] = email;
  const cases = await Case.find(filter).select("caseNumber caseType status priority client createdAt");
  res.json(cases);
};
