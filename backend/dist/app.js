"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const cases_routes_1 = __importDefault(require("./routes/cases.routes"));
const comments_routes_1 = __importDefault(require("./routes/comments.routes"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const clients_routes_1 = __importDefault(require("./routes/clients.routes"));
const caseOperations_routes_1 = __importDefault(require("./routes/caseOperations.routes"));
const attachments_routes_1 = __importDefault(require("./routes/attachments.routes"));
const sessions_routes_1 = __importDefault(require("./routes/sessions.routes"));
const audit_routes_1 = __importDefault(require("./routes/audit.routes"));
const health_routes_1 = __importDefault(require("./routes/health.routes"));
const error_1 = require("./middlewares/error");
const app = (0, express_1.default)();
// Middlewares
app.use((0, helmet_1.default)({
// si ves errores de CSP muy estricta, puedes desactivar CSP:
// contentSecurityPolicy: false,
}));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
// Rutas API
app.use("/api/auth", auth_routes_1.default);
app.use("/api/cases", cases_routes_1.default);
app.use("/api/comments", comments_routes_1.default);
app.use("/api/users", users_routes_1.default);
app.use("/api/clients", clients_routes_1.default);
app.use("/api/case-ops", caseOperations_routes_1.default);
app.use("/api/attachments", attachments_routes_1.default);
app.use("/api/sessions", sessions_routes_1.default);
app.use("/api/audit", audit_routes_1.default);
app.use("/api/health", health_routes_1.default);
// Path al build del frontend (funciona en src y en dist)
const frontendPath = path_1.default.resolve(__dirname, "..", "..", "frontend", "build");
if (fs_1.default.existsSync(frontendPath)) {
    console.log("Serving frontend from:", frontendPath);
    // Archivos estáticos (JS, CSS, imágenes, etc.)
    app.use(express_1.default.static(frontendPath));
    // ⬅️ OJO: aquí está el cambio importante
    // Usar RegExp en vez de "*" para el catch-all
    app.get(/.*/, (req, res, next) => {
        if (req.path.startsWith("/api")) {
            return next();
        }
        return res.sendFile(path_1.default.join(frontendPath, "index.html"));
    });
}
else {
    console.warn("Frontend build directory not found. Skipping static file serving.", frontendPath);
}
// Manejo de errores
app.use(error_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map