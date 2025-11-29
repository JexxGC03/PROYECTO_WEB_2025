"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAttachment = exports.addAttachment = exports.listAttachments = void 0;
const Attachment_1 = __importDefault(require("../models/Attachment"));
const Case_1 = __importDefault(require("../models/Case"));
const audit_1 = require("../utils/audit");
const listAttachments = async (req, res) => {
    const { caseId } = req.params;
    const data = await Attachment_1.default.find({ caseId }).populate("uploadedBy", "fullName email");
    res.json(data);
};
exports.listAttachments = listAttachments;
const addAttachment = async (req, res) => {
    const { caseId, fileName, url, size, mimeType } = req.body;
    const exists = await Case_1.default.exists({ _id: caseId });
    if (!exists)
        return res.status(404).json({ message: "Case not found" });
    const doc = await Attachment_1.default.create({ caseId, fileName, url, size, mimeType, uploadedBy: req.user.sub });
    await (0, audit_1.recordAudit)({ userId: req.user?.sub, action: "ATTACH", entity: "Attachment", entityId: String(doc._id), metadata: { caseId } });
    res.status(201).json(doc);
};
exports.addAttachment = addAttachment;
const deleteAttachment = async (req, res) => {
    const { id } = req.params;
    const doc = await Attachment_1.default.findById(id);
    if (!doc)
        return res.status(404).json({ message: "Attachment not found" });
    if (req.user?.role !== "ADMIN" && String(doc.uploadedBy) !== req.user?.sub) {
        return res.status(403).json({ message: "Forbidden" });
    }
    await Attachment_1.default.findByIdAndDelete(id);
    await (0, audit_1.recordAudit)({ userId: req.user?.sub, action: "DELETE", entity: "Attachment", entityId: id, metadata: { caseId: doc.caseId } });
    res.status(204).send();
};
exports.deleteAttachment = deleteAttachment;
//# sourceMappingURL=attachments.controller.js.map