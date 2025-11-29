"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAudits = void 0;
const AuditLog_1 = __importDefault(require("../models/AuditLog"));
const listAudits = async (req, res) => {
    const { entity, entityId, userId } = req.query;
    const filter = {};
    if (entity)
        filter.entity = entity;
    if (entityId)
        filter.entityId = entityId;
    if (userId)
        filter.userId = userId;
    const data = await AuditLog_1.default.find(filter).sort({ createdAt: -1 }).limit(200);
    res.json(data);
};
exports.listAudits = listAudits;
//# sourceMappingURL=audit.controller.js.map