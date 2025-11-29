"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const caseSchema = new mongoose_1.Schema({
    caseNumber: { type: String, required: true, unique: true, index: true }, // "PROC-2025-XXX"
    caseType: { type: String, enum: ["CIVIL", "PENAL", "LABORAL", "FAMILIA", "ADMINISTRATIVO", "OTRO"], required: true, index: true },
    plaintiff: { name: { type: String, required: true, trim: true } }, // Demandante
    defendant: { name: { type: String, required: true, trim: true } }, // Demandado
    // Cliente: referencia si existe usuario; si no, guardamos nombre/email “libre”
    client: {
        ref: { type: mongoose_1.Types.ObjectId, ref: "User" },
        name: { type: String, trim: true },
        email: { type: String, trim: true }
    },
    priority: { type: String, enum: ["LOW", "MEDIUM", "HIGH", "URGENT"], default: "MEDIUM", index: true },
    description: { type: String, default: "" },
    // operativos
    status: { type: String, enum: ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"], default: "OPEN", index: true },
    assignedTo: { type: mongoose_1.Types.ObjectId, ref: "User" }, // abogado/gestor
    createdBy: { type: mongoose_1.Types.ObjectId, ref: "User", required: true }, // quien crea
    // opcional: title derivado
    title: { type: String, default: "" }
}, { timestamps: true });
// índices para búsqueda rápida
caseSchema.index({ "plaintiff.name": "text", "defendant.name": "text", description: "text", caseNumber: "text", "client.name": "text", "client.email": "text" });
// título derivado si no viene
caseSchema.pre("save", function (next) {
    if (!this.title || this.title.trim() === "") {
        this.title = `${this.caseType} - ${this.plaintiff?.name ?? ""} vs ${this.defendant?.name ?? ""}`.trim();
    }
    next();
});
exports.default = (0, mongoose_1.model)("Case", caseSchema);
//# sourceMappingURL=Case.js.map