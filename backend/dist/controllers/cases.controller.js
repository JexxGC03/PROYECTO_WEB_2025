"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCase = exports.updateCase = exports.getCase = exports.listCases = exports.createCase = void 0;
const Case_1 = __importDefault(require("../models/Case"));
const client_1 = require("../utils/client");
const audit_1 = require("../utils/audit");
function buildFilter(qs) {
    const { q, status, caseType, priority, assignedTo, createdBy, caseNumber } = qs;
    const filter = {};
    if (status)
        filter.status = status;
    if (caseType)
        filter.caseType = caseType;
    if (priority)
        filter.priority = priority;
    if (assignedTo)
        filter.assignedTo = assignedTo;
    if (createdBy)
        filter.createdBy = createdBy;
    if (caseNumber)
        filter.caseNumber = caseNumber;
    if (q)
        filter.$text = { $search: String(q) };
    return filter;
}
const createCase = async (req, res) => {
    const { plaintiffName, defendantName, client, caseType, caseNumber, priority, description } = req.body;
    const dup = await Case_1.default.findOne({ caseNumber });
    if (dup)
        return res.status(409).json({ message: "caseNumber ya existe" });
    const clientObj = await (0, client_1.resolveClientValue)(client);
    const doc = await Case_1.default.create({
        caseNumber,
        caseType,
        plaintiff: { name: plaintiffName },
        defendant: { name: defendantName },
        client: clientObj,
        priority,
        description,
        createdBy: req.user.sub
    });
    await (0, audit_1.recordAudit)({ userId: req.user?.sub, action: "CREATE", entity: "Case", entityId: String(doc._id) });
    res.status(201).json(doc);
};
exports.createCase = createCase;
const listCases = async (req, res) => {
    const page = Math.max(parseInt(String(req.query.page ?? "1"), 10), 1);
    const pageSize = Math.min(Math.max(parseInt(String(req.query.pageSize ?? "10"), 10), 1), 100);
    const sort = String(req.query.sort ?? "-createdAt");
    const filter = buildFilter(req.query);
    const [data, total] = await Promise.all([
        Case_1.default.find(filter)
            .populate("assignedTo", "fullName email")
            .populate("createdBy", "fullName email")
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .sort(sort),
        Case_1.default.countDocuments(filter)
    ]);
    res.json({
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
        data
    });
};
exports.listCases = listCases;
const getCase = async (req, res) => {
    const doc = await Case_1.default.findById(req.params.id)
        .populate("assignedTo", "fullName email")
        .populate("createdBy", "fullName email");
    if (!doc)
        return res.status(404).json({ message: "No encontrado" });
    res.json(doc);
};
exports.getCase = getCase;
const updateCase = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    if (body.caseNumber) {
        const dup = await Case_1.default.findOne({ caseNumber: body.caseNumber, _id: { $ne: id } });
        if (dup)
            return res.status(409).json({ message: "caseNumber ya existe" });
    }
    const patch = {};
    if (body.plaintiffName)
        patch["plaintiff.name"] = body.plaintiffName;
    if (body.defendantName)
        patch["defendant.name"] = body.defendantName;
    if (typeof body.client === "string") {
        const clientObj = await (0, client_1.resolveClientValue)(body.client);
        patch["client"] = clientObj;
    }
    if (body.caseType)
        patch.caseType = body.caseType;
    if (body.caseNumber)
        patch.caseNumber = body.caseNumber;
    if (body.priority)
        patch.priority = body.priority;
    if (body.status)
        patch.status = body.status;
    if (body.description !== undefined)
        patch.description = body.description;
    if (body.assignedTo !== undefined)
        patch.assignedTo = body.assignedTo;
    const doc = await Case_1.default.findByIdAndUpdate(id, patch, { new: true });
    if (!doc)
        return res.status(404).json({ message: "No encontrado" });
    await (0, audit_1.recordAudit)({ userId: req.user?.sub, action: "UPDATE", entity: "Case", entityId: id, metadata: patch });
    res.json(doc);
};
exports.updateCase = updateCase;
const deleteCase = async (req, res) => {
    const doc = await Case_1.default.findByIdAndDelete(req.params.id);
    if (!doc)
        return res.status(404).json({ message: "No encontrado" });
    await (0, audit_1.recordAudit)({ userId: req.user?.sub, action: "DELETE", entity: "Case", entityId: req.params.id });
    res.status(204).send();
};
exports.deleteCase = deleteCase;
//# sourceMappingURL=cases.controller.js.map