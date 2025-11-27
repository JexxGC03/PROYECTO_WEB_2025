import { Schema, model, Types } from "mongoose";

const auditLogSchema = new Schema({
  userId: { type: Types.ObjectId, ref: "User" },
  action: { type: String, required: true },
  entity: { type: String, required: true },
  entityId: { type: Types.ObjectId },
  metadata: { type: Object }
}, { timestamps: true });

auditLogSchema.index({ createdAt: -1 });

auditLogSchema.index({ entity: 1, entityId: 1 });

auditLogSchema.index({ userId: 1 });

export default model("AuditLog", auditLogSchema);
