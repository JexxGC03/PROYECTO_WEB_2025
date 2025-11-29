"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listComments = exports.addComment = void 0;
const Comment_1 = __importDefault(require("../models/Comment"));
const audit_1 = require("../utils/audit");
const addComment = async (req, res) => {
    const { caseId, body } = req.body;
    const doc = await Comment_1.default.create({ caseId, body, authorId: req.user.sub });
    await (0, audit_1.recordAudit)({ userId: req.user?.sub, action: "COMMENT", entity: "Case", entityId: caseId });
    res.status(201).json(doc);
};
exports.addComment = addComment;
const listComments = async (req, res) => {
    const { caseId } = req.params;
    const data = await Comment_1.default.find({ caseId }).populate("authorId", "fullName");
    res.json(data);
};
exports.listComments = listComments;
//# sourceMappingURL=comments.controller.js.map