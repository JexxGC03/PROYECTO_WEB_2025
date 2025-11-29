"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordAudit = void 0;
const AuditLog_1 = __importDefault(require("../models/AuditLog"));
const recordAudit = async ({ userId, action, entity, entityId, metadata }) => {
    try {
        await AuditLog_1.default.create({ userId, action, entity, entityId, metadata });
    }
    catch (err) {
        console.error("Failed to record audit log", err);
    }
};
exports.recordAudit = recordAudit;
//# sourceMappingURL=audit.js.map