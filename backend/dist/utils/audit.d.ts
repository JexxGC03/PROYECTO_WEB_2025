interface AuditPayload {
    userId?: string;
    action: string;
    entity: string;
    entityId?: string;
    metadata?: Record<string, unknown>;
}
export declare const recordAudit: ({ userId, action, entity, entityId, metadata }: AuditPayload) => Promise<void>;
export {};
//# sourceMappingURL=audit.d.ts.map