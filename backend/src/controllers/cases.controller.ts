import { Request, Response } from "express";
import Case from "../models/Case";
import { AuthRequest } from "../middlewares/auth";
import { resolveClientValue } from "../utils/client";
import { recordAudit } from "../utils/audit";

function buildFilter(qs: Request["query"]) {
  const { q, status, caseType, priority, assignedTo, createdBy, caseNumber } = qs as any;
  const filter: any = {};
  if (status) filter.status = status;
  if (caseType) filter.caseType = caseType;
  if (priority) filter.priority = priority;
  if (assignedTo) filter.assignedTo = assignedTo;
  if (createdBy) filter.createdBy = createdBy;
  if (caseNumber) filter.caseNumber = caseNumber;
  if (q) filter.$text = { $search: String(q) };
  return filter;
}

export const createCase = async (req: AuthRequest, res: Response) => {
  const {
    plaintiffName, defendantName, client, caseType, caseNumber, priority, description
  } = req.body as {
    plaintiffName: string;
    defendantName: string;
    client?: string;
    caseType: string;
    caseNumber: string;
    priority?: string;
    description?: string;
  };

  const dup = await Case.findOne({ caseNumber });
  if (dup) return res.status(409).json({ message: "caseNumber ya existe" });

  const clientObj = await resolveClientValue(client);

  const doc = await Case.create({
    caseNumber,
    caseType,
    plaintiff: { name: plaintiffName },
    defendant: { name: defendantName },
    client: clientObj,
    priority,
    description,
    createdBy: req.user!.sub
  });

  await recordAudit({ userId: req.user?.sub, action: "CREATE", entity: "Case", entityId: String(doc._id) });
  res.status(201).json(doc);
};

export const listCases = async (req: AuthRequest, res: Response) => {
  const page = Math.max(parseInt(String(req.query.page ?? "1"), 10), 1);
  const pageSize = Math.min(
    Math.max(parseInt(String(req.query.pageSize ?? "10"), 10), 1),
    100
  );
  const sort = String(req.query.sort ?? "-createdAt");

  const filter = buildFilter(req.query);

  const [data, total] = await Promise.all([
    Case.find(filter)
      .populate("assignedTo", "fullName email")
      .populate("createdBy", "fullName email")
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort(sort),
    Case.countDocuments(filter)
  ]);

  res.json({
    page,
    pageSize,
    total,
    totalPages: Math.ceil(total / pageSize),
    data
  });
};

export const getCase = async (req: AuthRequest, res: Response) => {
  const doc = await Case.findById(req.params.id)
    .populate("assignedTo", "fullName email")
    .populate("createdBy", "fullName email");

  if (!doc) return res.status(404).json({ message: "No encontrado" });
  res.json(doc);
};

export const updateCase = async (req: AuthRequest, res: Response) => {
  const id = req.params.id;
  const body = req.body as {
    plaintiffName?: string;
    defendantName?: string;
    client?: string;
    caseType?: string;
    caseNumber?: string;
    priority?: string;
    status?: string;
    description?: string;
    assignedTo?: string;
  };

  if (body.caseNumber) {
    const dup = await Case.findOne({ caseNumber: body.caseNumber, _id: { $ne: id } });
    if (dup) return res.status(409).json({ message: "caseNumber ya existe" });
  }

  const patch: any = {};
  if (body.plaintiffName) patch["plaintiff.name"] = body.plaintiffName;
  if (body.defendantName) patch["defendant.name"] = body.defendantName;

  if (typeof body.client === "string") {
    const clientObj = await resolveClientValue(body.client);
    patch["client"] = clientObj;
  }
  if (body.caseType) patch.caseType = body.caseType;
  if (body.caseNumber) patch.caseNumber = body.caseNumber;
  if (body.priority) patch.priority = body.priority;
  if (body.status) patch.status = body.status;
  if (body.description !== undefined) patch.description = body.description;
  if (body.assignedTo !== undefined) patch.assignedTo = body.assignedTo;

  const doc = await Case.findByIdAndUpdate(id, patch, { new: true });
  if (!doc) return res.status(404).json({ message: "No encontrado" });
  await recordAudit({ userId: req.user?.sub, action: "UPDATE", entity: "Case", entityId: id, metadata: patch });
  res.json(doc);
};

export const deleteCase = async (req: AuthRequest, res: Response) => {
  const doc = await Case.findByIdAndDelete(req.params.id);
  if (!doc) return res.status(404).json({ message: "No encontrado" });
  await recordAudit({ userId: req.user?.sub, action: "DELETE", entity: "Case", entityId: req.params.id });
  res.status(204).send();
};
