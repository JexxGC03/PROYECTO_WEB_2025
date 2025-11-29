"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUiPriority = exports.caseUpdateSchema = exports.caseCreateSchema = void 0;
const zod_1 = require("zod");
const Priority = zod_1.z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]);
const CaseType = zod_1.z.enum(["CIVIL", "PENAL", "LABORAL", "FAMILIA", "ADMINISTRATIVO", "OTRO"]);
exports.caseCreateSchema = zod_1.z.object({
    plaintiffName: zod_1.z.string().min(1, "Demandante requerido"),
    defendantName: zod_1.z.string().min(1, "Demandado requerido"),
    client: zod_1.z.string().optional(), // nombre o email
    caseType: CaseType,
    caseNumber: zod_1.z.string().min(3).regex(/^PROC-\d{4}-[A-Z0-9-]+$/i, "Formato PROC-YYYY-XXX"),
    priority: Priority.default("MEDIUM"),
    description: zod_1.z.string().optional()
});
exports.caseUpdateSchema = exports.caseCreateSchema.partial().extend({
    status: zod_1.z.enum(["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"]).optional()
});
// helper opcional para mapear etiqueta de UI (Baja/Media/Alta/Urgente) -> enum
const mapUiPriority = (label) => {
    const t = label.toLowerCase();
    if (t.includes("baja"))
        return "LOW";
    if (t.includes("media"))
        return "MEDIUM";
    if (t.includes("alta"))
        return "HIGH";
    if (t.includes("urg"))
        return "URGENT";
    return "MEDIUM";
};
exports.mapUiPriority = mapUiPriority;
//# sourceMappingURL=schemas.js.map