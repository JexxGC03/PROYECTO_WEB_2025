import AuditLog from "../models/AuditLog";

interface AuditPayload {
  userId?: string;
  action: string;
  entity: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
}

export const recordAudit = async ({ userId, action, entity, entityId, metadata }: AuditPayload) => {
  try {
    await AuditLog.create({ userId, action, entity, entityId, metadata });
  } catch (err) {
    console.error("Failed to record audit log", err);
  }
};
