"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCasePriority = exports.updateCaseStatus = exports.assignCase = void 0;
const Case_1 = __importDefault(require("../models/Case"));
const User_1 = __importDefault(require("../models/User"));
const audit_1 = require("../utils/audit");
const allowedStatus = new Set(["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"]);
const allowedPriority = new Set(["LOW", "MEDIUM", "HIGH", "URGENT"]);
const assignCase = async (req, res) => {
    const { id } = req.params;
    const { assignedTo } = req.body;
    const user = await User_1.default.findById(assignedTo).select("role");
    if (!user)
        return res.status(404).json({ message: "Assignee not found" });
    if (user.role === "CLIENT")
        return res.status(400).json({ message: "Cannot assign to client" });
    const doc = await Case_1.default.findByIdAndUpdate(id, { assignedTo }, { new: true });
    if (!doc)
        return res.status(404).json({ message: "Case not found" });
    await (0, audit_1.recordAudit)({ userId: req.user?.sub, action: "ASSIGN", entity: "Case", entityId: id, metadata: { assignedTo } });
    res.json(doc);
};
exports.assignCase = assignCase;
const updateCaseStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!allowedStatus.has(status))
        return res.status(400).json({ message: "Invalid status" });
    const doc = await Case_1.default.findByIdAndUpdate(id, { status }, { new: true });
    if (!doc)
        return res.status(404).json({ message: "Case not found" });
    await (0, audit_1.recordAudit)({ userId: req.user?.sub, action: "STATUS", entity: "Case", entityId: id, metadata: { status } });
    res.json(doc);
};
exports.updateCaseStatus = updateCaseStatus;
const updateCasePriority = async (req, res) => {
    const { id } = req.params;
    const { priority } = req.body;
    if (!allowedPriority.has(priority))
        return res.status(400).json({ message: "Invalid priority" });
    const doc = await Case_1.default.findByIdAndUpdate(id, { priority }, { new: true });
    if (!doc)
        return res.status(404).json({ message: "Case not found" });
    await (0, audit_1.recordAudit)({ userId: req.user?.sub, action: "PRIORITY", entity: "Case", entityId: id, metadata: { priority } });
    res.json(doc);
};
exports.updateCasePriority = updateCasePriority;
//# sourceMappingURL=caseOperations.controller.js.map